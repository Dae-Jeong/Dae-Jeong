"""Library availability must not force publication of every claim."""

import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

import validate_workspace as validator


class PortfolioLibraryTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.root = Path(self.directory.name)
        self.case = self.root / "wiki/products/portfolio/cases/example.md"
        self.case.parent.mkdir(parents=True)
        self.case.write_text("---\ntype: portfolio-case\nclaim_ids: [test.used, test.available]\n---\n")
        for path in (
            "app/fe/lib/cases.ts",
            "app/fe/app/portfolio/[case]/case-details.tsx",
            "app/fe/app/portfolio/[case]/system-details.tsx",
        ):
            target = self.root / path
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_text('claimIds: ["test.used"]')

    def validate(self):
        with patch.object(validator, "_load_claims", return_value=([
            {"id": "test.used", "public": True},
            {"id": "test.available", "public": True},
            {"id": "test.private", "public": False},
        ], [])):
            return validator._validate_portfolio_artifact_claims(self.root)

    def test_unselected_library_claim_does_not_require_publication(self):
        self.assertEqual(self.validate(), [])

    def test_prior_catalog_selection_can_differ_from_current_library(self):
        self.case.write_text("---\ntype: portfolio-case\nclaim_ids: [test.available]\n---\n")
        self.assertEqual(self.validate(), [])

    def test_public_catalog_still_requires_known_public_claim(self):
        (self.root / "app/fe/lib/cases.ts").write_text('claimIds: ["test.unknown", "test.private"]')
        errors = self.validate()
        self.assertTrue(any("unknown claimIds value test.unknown" in e for e in errors))
        self.assertTrue(any("claimIds value test.private is not public" in e for e in errors))

    def test_unknown_and_private_library_claims_are_rejected(self):
        self.case.write_text("---\ntype: portfolio-case\nclaim_ids: [test.used, test.private, test.unknown]\n---\n")
        errors = self.validate()
        self.assertTrue(any("unknown claim test.unknown" in e for e in errors))
        self.assertTrue(any("claim test.private is not public" in e for e in errors))

    def test_ready_case_requires_reuse_sections(self):
        self.case.write_text("---\ntype: portfolio-case\nlibrary_status: ready\nclaim_ids: [test.used]\n---\n")
        self.assertEqual(sum("missing section" in e for e in self.validate()), 5)


if __name__ == "__main__":
    unittest.main()
