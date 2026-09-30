import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

import yaml

from validate_workspace import LAYER_SENTINELS, REQUIRED_INPUTS, _validate_manifest_layers, validate


class KnowledgeRootTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.repo = Path(self.temp.name).resolve()
        self.wiki = self.repo / "wiki"
        for relative in self.required_files():
            path = self.wiki / relative
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text("canonical\n")

    @staticmethod
    def required_files():
        return (*[f"{layer}/{sentinel}" for layer, sentinel in LAYER_SENTINELS.items()], *REQUIRED_INPUTS)

    def test_each_sentinel_and_required_input_fails_before_scans(self):
        for relative in self.required_files():
            with self.subTest(relative=relative):
                path = self.wiki / relative
                original = path.read_bytes()
                path.unlink()
                with patch("validate_workspace._validate_metadata") as scan:
                    errors = validate(self.repo)
                    scan.assert_not_called()
                self.assertTrue(any(relative in error for error in errors), errors)
                path.write_bytes(original)

    def test_each_missing_layer_fails(self):
        for layer in LAYER_SENTINELS:
            with self.subTest(layer=layer):
                directory = self.wiki / layer
                saved = self.repo / f"saved-{layer}"
                directory.rename(saved)
                self.assertTrue(any(f"wiki/{layer}" in error for error in validate(self.repo)))
                saved.rename(directory)


class ManifestLayerTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.repo = Path(self.temp.name).resolve()
        self.wiki = self.repo / "wiki"
        for name in LAYER_SENTINELS:
            (self.wiki / name).mkdir(parents=True)
        self.manifest = {
            "external_knowledge": {"layers": list(LAYER_SENTINELS)},
            "layers": {name: {} for name in (*LAYER_SENTINELS, "app", "skills", "operations")},
        }

    def check(self):
        (self.wiki / "context/manifest.yaml").write_text(yaml.safe_dump(self.manifest))
        return _validate_manifest_layers(self.repo)

    def test_external_wiki_symlink_and_repository_owners_are_valid(self):
        canonical = self.repo / "canonical-wiki"
        self.wiki.rename(canonical)
        self.wiki.symlink_to(canonical, target_is_directory=True)
        self.assertEqual(self.check(), [])

    def test_removed_owner_and_unlisted_physical_layer_fail(self):
        self.manifest["layers"]["docs"] = {"canonical": True}
        self.assertTrue(any("ownership" in e for e in self.check()))
        del self.manifest["layers"]["docs"]
        (self.wiki / "archive").mkdir()
        self.assertTrue(any("physical directories" in e for e in self.check()))

    def test_missing_and_duplicate_layer_declarations_fail(self):
        self.manifest["external_knowledge"]["layers"].pop()
        self.assertTrue(self.check())
        self.manifest["external_knowledge"]["layers"] = [*LAYER_SENTINELS, "context"]
        self.assertTrue(self.check())


if __name__ == "__main__":
    unittest.main()
