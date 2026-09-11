import subprocess
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from bootstrap_knowledge import LAYER_SENTINELS, REQUIRED_INPUTS, connect
from validate_workspace import validate


class KnowledgeBootstrapTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.repo = Path(self.temp.name).resolve() / "repo"
        self.repo.mkdir()
        self.vault = Path(self.temp.name).resolve() / "vault"
        self.knowledge = self.vault / "Wiki/sources/Dae-Jeong"
        self.wiki = self.knowledge / "wiki"
        for relative in self.required_files():
            path = self.wiki / relative
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text("canonical\n")

    @staticmethod
    def required_files():
        return (*[f"{layer}/{sentinel}" for layer, sentinel in LAYER_SENTINELS.items()], *REQUIRED_INPUTS)

    def test_single_link_is_idempotent_and_canonical_files_unchanged(self):
        before = {p.relative_to(self.wiki): p.read_bytes() for p in self.wiki.rglob("*") if p.is_file()}
        first = connect(self.repo, self.vault)
        self.assertEqual(first, [self.repo / "wiki"])
        self.assertEqual(first, connect(self.repo, self.vault))
        for layer, sentinel in LAYER_SENTINELS.items():
            self.assertEqual((self.repo / "wiki" / layer / sentinel).read_text(), "canonical\n")
            self.assertFalse((self.wiki / layer).is_symlink())
        after = {p.relative_to(self.wiki): p.read_bytes() for p in self.wiki.rglob("*") if p.is_file()}
        self.assertEqual(before, after)
        self.assertEqual(set(self.knowledge.iterdir()), {self.wiki})

    def test_existing_real_folder_and_file_are_preserved(self):
        existing = self.repo / "wiki"
        existing.mkdir()
        marker = existing / "keep.md"
        marker.write_text("user work")
        with self.assertRaisesRegex(ValueError, "refusing to replace"):
            connect(self.repo, self.vault)
        self.assertEqual(marker.read_text(), "user work")
        marker.unlink()
        existing.rmdir()
        existing.write_text("user file")
        with self.assertRaisesRegex(ValueError, "refusing to replace"):
            connect(self.repo, self.vault)
        self.assertEqual(existing.read_text(), "user file")

    def test_other_valid_broken_and_cyclic_links_are_preserved(self):
        link = self.repo / "wiki"
        other = self.repo / "other"
        other.mkdir()
        for target in (other, self.repo / "missing", link):
            with self.subTest(target=target):
                link.symlink_to(target)
                with self.assertRaisesRegex(ValueError, "refusing to retarget"):
                    connect(self.repo, self.vault)
                self.assertEqual(link.readlink(), target)
                link.unlink()

    def test_missing_vault_fails_without_setup(self):
        with self.assertRaisesRegex(ValueError, "knowledge root missing"):
            connect(self.repo, self.vault / "missing")
        self.assertFalse((self.repo / "wiki").is_symlink())

    def test_each_sentinel_and_required_input_fails_before_scans(self):
        for relative in self.required_files():
            with self.subTest(relative=relative):
                path = self.wiki / relative
                original = path.read_bytes()
                path.unlink()
                with self.assertRaisesRegex(ValueError, "knowledge root missing"):
                    connect(self.repo, self.vault)
                self.assertFalse((self.repo / "wiki").is_symlink())
                (self.repo / "wiki").symlink_to(self.wiki)
                with patch("validate_workspace._validate_metadata") as scan:
                    errors = validate(self.repo)
                    scan.assert_not_called()
                self.assertTrue(any(relative in error for error in errors), errors)
                (self.repo / "wiki").unlink()
                path.write_bytes(original)

    def test_each_missing_layer_fails(self):
        for layer in LAYER_SENTINELS:
            with self.subTest(layer=layer):
                directory = self.wiki / layer
                saved = self.knowledge / f"saved-{layer}"
                directory.rename(saved)
                with self.assertRaisesRegex(ValueError, "knowledge root missing"):
                    connect(self.repo, self.vault)
                (self.repo / "wiki").symlink_to(self.wiki)
                self.assertTrue(any(f"wiki/{layer}" in error for error in validate(self.repo)))
                (self.repo / "wiki").unlink()
                saved.rename(directory)

    def test_reverse_layer_links_are_rejected_without_mutation(self):
        for layer in LAYER_SENTINELS:
            with self.subTest(layer=layer):
                directory = self.wiki / layer
                saved = self.repo / layer
                directory.rename(saved)
                directory.symlink_to(saved)
                with self.assertRaisesRegex(ValueError, "must be a real directory"):
                    connect(self.repo, self.vault)
                self.assertEqual(directory.readlink(), saved)
                self.assertFalse((self.repo / "wiki").is_symlink())
                directory.unlink()
                saved.rename(directory)

    def test_canonical_wiki_reverse_link_is_rejected(self):
        saved = self.repo / "old-wiki"
        self.wiki.rename(saved)
        self.wiki.symlink_to(saved)
        with self.assertRaisesRegex(ValueError, "canonical wiki must be a real directory"):
            connect(self.repo, self.vault)
        self.assertEqual(self.wiki.readlink(), saved)

    def test_existing_vault_product_bridges_are_untouched(self):
        for name in ("app", "tools", "skills", "output", "AGENTS.md"):
            (self.knowledge / name).symlink_to(self.repo / name)
        connect(self.repo, self.vault)
        for name in ("app", "tools", "skills", "output", "AGENTS.md"):
            self.assertEqual((self.knowledge / name).readlink(), self.repo / name)

    def test_gitignore_excludes_single_symlink_and_backup(self):
        # Only a disposable repository; no add or product Git writes.
        subprocess.run(["git", "init", "--quiet", str(self.repo)], check=True)
        ignore = self.repo / ".gitignore"
        connect(self.repo, self.vault)
        ignore.write_text("/wiki/\n")
        result = subprocess.run(["git", "check-ignore", "--no-index", "wiki"], cwd=self.repo, capture_output=True)
        self.assertEqual(result.returncode, 1, "directory-only pattern must not cover a symlink")
        ignore.write_text((Path(__file__).resolve().parents[1] / ".gitignore").read_text())
        backup = self.repo / "wiki.pre-ssot-20260910"
        backup.mkdir()
        (backup / "keep.md").write_text("backup")
        for relative in ("wiki", "wiki.pre-ssot-20260910/keep.md"):
            result = subprocess.run(["git", "check-ignore", "--no-index", relative], cwd=self.repo, capture_output=True)
            self.assertEqual(result.returncode, 0, result.stderr)



if __name__ == "__main__":
    unittest.main()
