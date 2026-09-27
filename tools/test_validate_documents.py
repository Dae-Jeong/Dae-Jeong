import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from validate_documents import is_superseded_review, validate_documents


class SupersededReviewTests(unittest.TestCase):
    def test_registered_package_owner_does_not_require_historical_copy(self):
        with tempfile.TemporaryDirectory() as temp:
            repo = Path(temp)
            attempts = []
            owners = []
            for slug in ("miridih", "toss-place"):
                base = repo / "app/fe/content/documents/companies" / slug
                base.mkdir(parents=True)
                owner = repo / "wiki/products" / slug / "README.md"
                owner.parent.mkdir(parents=True)
                owner.write_text("---\napproved: false\nrevision: 20260910-R1\n---\nCurrent package\n")
                owners.append(owner)
                sections = [{"title": "기술", "text": "Claude Code Codex SQLAlchemy 2.0 async Sentry Jira", "claims": ["public.claim"]},
                            {"title": "Experience", "entries": [{"title": "Outcome"}]}]
                metadata = {"applicationId": slug, "slug": slug, "status": "draft", "visibility": "local", "approved": False, "revision": "20260910-R1"}
                routes = {}
                mapping = {"approved": False, "content_owners": {}, "sections": {}, "document_order": {"resume": ["Outcome"], "portfolio": ["Outcome"]}}
                for kind in ("resume", "career", "portfolio"):
                    key = "career-description" if kind == "career" else kind
                    content = {"role": "Backend", "sections": sections if kind != "portfolio" else [{"title": "1. Outcome", "claims": ["public.claim"]}]}
                    path = base / f"{kind}.json"
                    path.write_text(json.dumps({**metadata, "document": kind, "content": content}))
                    mapping["content_owners"][kind] = str(path.relative_to(repo))
                    mapping["sections"][key] = ["public.claim"]
                    routes[key] = {"mode": "tailored", "route": f"/{kind}/{slug}?revision=20260910-R1"}
                owner.with_name("claim-map.yaml").write_text(json.dumps(mapping))
                attempts.append({"id": slug, "source_path": str(owner.relative_to(repo)), "artifact_state": "mutable", "status": "pre-apply", "header_role": "Backend", "artifacts": routes})
            claims = [{"id": "public.claim", "public": True, "confidence": "high"}]
            self.assertEqual(validate_documents(repo, claims, {}, attempts), [])
            owners[0].write_text("---\napproved: true\nrevision: wrong\n---\nInvalid approval\n")
            self.assertTrue(any("approval/revision drift" in error for error in validate_documents(repo, claims, {}, attempts)))

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
