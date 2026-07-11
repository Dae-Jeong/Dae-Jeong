from pathlib import Path
from tempfile import TemporaryDirectory
import unittest

from scripts.validate_workspace import validate


class ValidateWorkspaceTest(unittest.TestCase):
    def test_rejects_absolute_user_path_in_active_markdown(self):
        with TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / "profile").mkdir()
            (root / "profile" / "identity.md").write_text(
                "---\ntype: profile\n---\n/Users/marin/workspace/x\n",
                encoding="utf-8",
            )
            self.assertTrue(any("absolute path" in error for error in validate(root)))

    def test_rejects_duplicate_claim_ids(self):
        with TemporaryDirectory() as tmp:
            root = Path(tmp)
            claims = root / "evidence" / "claims"
            claims.mkdir(parents=True)
            body = """schema_version: 1
project: x
claims:
  - id: x.same
    statement: x
    strength: owned
    confidence: high
    public: true
    evidence: []
    allowed_copy: [x]
    forbidden_copy: []
    verified_at: 2026-07-11
"""
            (claims / "a.yaml").write_text(body, encoding="utf-8")
            (claims / "b.yaml").write_text(body, encoding="utf-8")
            self.assertTrue(any("duplicate claim" in error for error in validate(root)))

    def test_accepts_valid_minimal_workspace(self):
        with TemporaryDirectory() as tmp:
            root = Path(tmp)
            profile = root / "profile"
            profile.mkdir()
            (profile / "identity.md").write_text(
                "---\ntype: profile\n---\n# Identity\n",
                encoding="utf-8",
            )
            self.assertEqual([], validate(root))

    def test_rejects_unknown_product_claim_id(self):
        with TemporaryDirectory() as tmp:
            root = Path(tmp)
            product = root / "products" / "portfolio"
            product.mkdir(parents=True)
            (product / "case.md").write_text(
                "---\ntype: portfolio-case\nclaim_ids: [missing.claim]\n---\n# Case\n",
                encoding="utf-8",
            )
            self.assertTrue(any("product claim" in error for error in validate(root)))


if __name__ == "__main__":
    unittest.main()
