import unittest
from unittest.mock import patch
from types import SimpleNamespace

from render_review_preview import render_markdown, split_application_draft


class DraftSectionsTest(unittest.TestCase):
    def test_three_documents_keep_notes_separate(self):
        parts = split_application_draft("# Package\n\n## 검토\nprivate\n\n## 이력서 초안\n### Name\nresume\n### 경력\nexperience\n## 경력기술서 초안\n### Career\ncareer\n## 포트폴리오 초안\n### Portfolio\nportfolio\n## 사용자 검토 체크\nnotes\n")
        self.assertEqual(parts["draft"], "# Name\nresume\n## 경력\nexperience")
        self.assertEqual(parts["career"], "# Career\ncareer")
        self.assertEqual(parts["portfolio"], "# Portfolio\nportfolio")
        self.assertIn("private", parts["review"])
        self.assertIn("notes", parts["review"])
        self.assertNotIn("resume", parts["review"])

    def test_legacy_resume(self):
        parts = split_application_draft("# Package\n## 이력서 초안\n### Name\nresume\n## 검토\nnotes")
        self.assertEqual(parts["draft"], "# Name\nresume")
        self.assertEqual(parts["career"], "")
        self.assertEqual(parts["portfolio"], "")

    def test_document_titles_without_draft_suffix_keep_private_notes_separate(self):
        parts = split_application_draft("# Package\n## 이력서\n### Name\nresume\n## 경력기술서\n### Career\ncareer\n## 포트폴리오\n### Portfolio\nportfolio\n## 내부 검토 메타\nprivate\n")
        self.assertEqual(parts["draft"], "# Name\nresume")
        self.assertEqual(parts["career"], "# Career\ncareer")
        self.assertEqual(parts["portfolio"], "# Portfolio\nportfolio")
        self.assertIn("private", parts["review"])
        self.assertNotIn("private", parts["draft"])

    def test_unstructured_document(self):
        self.assertEqual(split_application_draft("# Name\nresume")["draft"], "# Name\nresume")

    def test_commented_headings_cannot_split_comment_delimiters(self):
        parts = split_application_draft("## 포트폴리오\n### Portfolio\npublic\n<!--\n## 내부 검토\nprivate claim\n-->\n")
        self.assertEqual(parts["portfolio"], "# Portfolio\npublic")
        self.assertFalse(any("<!--" in part or "private claim" in part for part in parts.values()))

    def test_provenance_comments_are_not_rendered(self):
        with patch("render_review_preview.shutil.which", return_value="pandoc"), patch("render_review_preview.subprocess.run", return_value=SimpleNamespace(stdout="<p>public</p>")) as run:
            render_markdown("public\n<!-- claims: private-source -->")
            self.assertNotIn("private-source", run.call_args.kwargs["input"])


if __name__ == "__main__":
    unittest.main()
