import unittest

from validate_documents import is_superseded_review


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


if __name__ == "__main__":
    unittest.main()
