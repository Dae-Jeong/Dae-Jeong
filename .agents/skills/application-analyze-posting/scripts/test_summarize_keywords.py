import unittest
from summarize_keywords import summarize


def observation(id_, keywords=(), role="backend", duplicate=None):
    return {"schema_version": 1, "id": id_, "company": "Fixture", "title": "Engineer",
            "role_category": role, "observed_at": "2026-09-07T21:00:00+09:00",
            "duplicate_of": duplicate, "keywords": [
                {"term": term, "kind": "technology", "section": section, "evidence": "Fixture evidence"}
                for term, section in keywords]}


class KeywordCountsTest(unittest.TestCase):
    def test_counts_postings_and_keeps_empty_in_denominator(self):
        result = summarize([observation("a", [("Python", "required")] * 2 + [("Python", "preferred")]),
                            observation("b")])
        self.assertEqual(result["total_postings"], 2)
        self.assertEqual(result["keywords"][0]["count"], 1)
        self.assertEqual(result["keywords"][0]["sections"]["preferred"], 1)

    def test_roles_and_confirmed_reposts(self):
        records = [observation("a", [("Python", "required")]), observation("b", duplicate="a"),
                   observation("c", [("LLM", "preferred")], role="ai-backend")]
        result = summarize(records, "backend")
        self.assertEqual(result["total_postings"], 1)
        self.assertEqual(result["duplicates_excluded"], 1)
        self.assertEqual([k["term"] for k in result["keywords"]], ["Python"])

    def test_invalid_ids_and_references_fail(self):
        for records in ([observation("a"), observation("a")],
                        [observation("a", duplicate="missing")],
                        [observation("a", duplicate="a")]):
            with self.assertRaises(ValueError):
                summarize(records)

    def test_no_evidence_fails(self):
        record = observation("a", [("Python", "required")])
        record["keywords"][0]["evidence"] = ""
        with self.assertRaises(ValueError):
            summarize([record])

    def test_empty(self):
        self.assertEqual(summarize([])["total_postings"], 0)
        self.assertEqual(summarize([])["keywords"], [])


if __name__ == "__main__":
    unittest.main()
