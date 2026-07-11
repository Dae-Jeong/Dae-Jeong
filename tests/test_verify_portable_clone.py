import unittest

from scripts.verify_portable_clone import tracked_path_errors


class TrackedPathErrorsTest(unittest.TestCase):
    def test_rejects_symlink(self):
        errors = tracked_path_errors([("120000", ".claude/skills/example")])
        self.assertTrue(any("symlink" in error for error in errors))

    def test_rejects_local_only_output(self):
        errors = tracked_path_errors([("100644", "products/jd/corpus/example.json")])
        self.assertTrue(any("local-only" in error for error in errors))

    def test_accepts_portable_tracked_file(self):
        self.assertEqual([], tracked_path_errors([("100644", "products/resume/README.md")]))


if __name__ == "__main__":
    unittest.main()
