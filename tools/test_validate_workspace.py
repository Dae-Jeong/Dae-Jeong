import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from validate_workspace import LAYER_SENTINELS, REQUIRED_INPUTS, validate


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


if __name__ == "__main__":
    unittest.main()
