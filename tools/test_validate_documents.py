import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from validate_documents import is_superseded_review, validate_documents


class SupersededReviewTests(unittest.TestCase):
    def test_only_verified_later_submission_supersedes_local_draft(self):
        draft = {"visibility": "local", "approved": False, "revision": "20260910-R1"}
        attempt = {
            "artifact_state": "frozen",
            "snapshot": {"verification": "verified"},
            "artifacts": {"resume": {"route": "/resume/example?revision=20260912-R3"}},
        }
        self.assertTrue(is_superseded_review(draft, attempt))
        for revision in ("20260912-R3", "20260913-R1", "invalid"):
            self.assertFalse(is_superseded_review({**draft, "revision": revision}, attempt))
        self.assertFalse(is_superseded_review(draft, {**attempt, "artifact_state": "mutable"}))
        self.assertFalse(is_superseded_review(draft, {**attempt, "snapshot": {"verification": "partial"}}))
        self.assertFalse(is_superseded_review(draft, {**attempt, "artifacts": {}}))
        self.assertFalse(is_superseded_review({**draft, "visibility": "public"}, attempt))

    def test_revision_numbers_are_compared_numerically(self):
        draft = {"visibility": "local", "approved": False, "revision": "20260912-R9"}
        attempt = {
            "artifact_state": "frozen",
            "snapshot": {"verification": "verified"},
            "artifacts": {"resume": {"route": "/resume/example?revision=20260912-R10"}},
        }
        self.assertTrue(is_superseded_review(draft, attempt))


    def test_missing_company_owner_or_claim_map_cannot_skip_to_pass(self):
        with tempfile.TemporaryDirectory() as temp:
            repo = Path(temp)
            base = repo / "app/fe/content/documents/companies"
            base.mkdir(parents=True)
            for slug in ("miridih", "toss-place"):
                (base / slug).mkdir()
                for kind in ("resume", "career", "portfolio"):
                    (base / slug / f"{kind}.json").write_text(json.dumps({"applicationId": slug, "document": kind, "content": {}}))
            attempts = [{"id": slug, "source_path": f"wiki/products/{slug}/README.md"} for slug in ("miridih", "toss-place")]
            with patch("validate_documents.subprocess.run") as exporter:
                errors = validate_documents(repo, [], {}, attempts)
            self.assertEqual(len(errors), 4)
            self.assertTrue(all("required source missing" in error for error in errors))
            exporter.assert_not_called()



if __name__ == "__main__":
    unittest.main()
