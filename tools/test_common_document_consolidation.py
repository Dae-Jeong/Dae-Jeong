"""Current common package is three documents; historical application types remain valid."""
import copy
import unittest
from build_application_projection import ARTIFACT_KEYS, validate_common_package_data

class CommonConsolidationTest(unittest.TestCase):
    def package(self):
        return {"schema_version": 1, "updated_at": "2026-09-29", "package": {"id": "common", "artifacts": {
            name: {"required": True, "state": "active", "route": route, "visibility": "public"}
            for name, route in [("resume", "/resume"), ("career-description", "/career"), ("cv", "/cv")]
        }}}
    def test_three_documents_are_valid(self):
        self.assertEqual(validate_common_package_data(self.package()), [])
    def test_missing_career_is_rejected(self):
        data = self.package()
        del data["package"]["artifacts"]["career-description"]
        self.assertTrue(any("must contain exactly" in e for e in validate_common_package_data(data)))
    def test_retired_common_portfolio_is_rejected_but_application_type_remains(self):
        data = self.package()
        data["package"]["artifacts"]["portfolio"] = copy.deepcopy(data["package"]["artifacts"]["resume"])
        self.assertTrue(any("must contain exactly" in e for e in validate_common_package_data(data)))
        self.assertIn("portfolio", ARTIFACT_KEYS)

if __name__ == "__main__":
    unittest.main()
