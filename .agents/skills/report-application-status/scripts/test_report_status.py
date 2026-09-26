"""Behavioral checks for the three-day alert and read-only status report."""

from copy import deepcopy
from datetime import datetime
import unittest

from report_status import build_report
from build_application_projection import validate_registry_data


def attempt(attempt_id="a", status="pre-apply", kind="fixed", value="2026-09-21"):
    deadline = {"kind": kind, "source_url": "https://example.com/jobs/1", "checked_at": "2026-09-06"}
    if kind == "fixed":
        deadline["value"] = value
    return {
        "id": attempt_id, "company": attempt_id, "role": "Backend Engineer",
        "status": status, "tracking": None, "last_confirmed": "2026-09-03",
        "artifact_state": "approved", "source_path": "wiki/products/resume/tailored/example/README.md",
        "deadline": deadline,
    }


def registry(*attempts):
    return {"schema_version": 2, "updated_at": "2026-09-06", "attempts": list(attempts)}


def report(data, at="2026-09-18T12:00:00+09:00", overrides=None):
    return build_report(data, datetime.fromisoformat(at), overrides)


class ApplicationStatusTests(unittest.TestCase):
    def test_calendar_window_includes_three_days_and_today(self):
        for day, expected in ((17, False), (18, True), (19, True), (20, True), (21, True), (22, False)):
            with self.subTest(day=day):
                view = report(registry(attempt()), f"2026-09-{day}T00:01:00+09:00")
                self.assertEqual(bool(view["imminent_ids"]), expected)

    def test_date_only_stays_due_today_without_inventing_a_time(self):
        view = report(registry(attempt()), "2026-09-21T23:59:59+09:00")
        self.assertEqual(view["attempts"][0]["deadline"]["label"], "마감 임박 · D-day")

    def test_timed_deadline_expires_at_exact_instant(self):
        data = registry(attempt(value="2026-09-21T18:00:00+09:00"))
        before = report(data, "2026-09-21T17:59:59+09:00")
        after = report(data, "2026-09-21T18:00:00+09:00")
        self.assertEqual(before["imminent_ids"], ["a"])
        self.assertEqual(after["imminent_ids"], [])
        self.assertEqual(after["attempts"][0]["deadline"]["label"], "마감 지남")

    def test_utc_dates_are_converted_to_korean_calendar(self):
        data = registry(attempt(value="2026-09-21T16:00:00+00:00"))  # Sep 22 KST
        self.assertEqual(report(data, "2026-09-18T15:00:00+00:00")["imminent_ids"], ["a"])
        self.assertEqual(report(data, "2026-09-18T14:59:59+00:00")["imminent_ids"], [])

    def test_only_pre_apply_is_flagged_even_when_work_is_complete(self):
        for status in ("in-progress", "accepted", "declined", "rejected", "unknown"):
            with self.subTest(status=status):
                self.assertEqual(report(registry(attempt(status=status)))["imminent_ids"], [])
        ready = attempt()
        ready["work_session"] = {"state": "complete", "next_action": "제출"}
        self.assertEqual(report(registry(ready))["imminent_ids"], ["a"])

    def test_non_fixed_kinds_and_missing_deadline_do_not_alert(self):
        for kind in ("rolling", "unspecified", "unknown", "closed"):
            with self.subTest(kind=kind):
                view = report(registry(attempt(kind=kind)))
                self.assertEqual(view["imminent_ids"], [])
                self.assertIsNone(view["attempts"][0]["deadline"]["days_left"])
        legacy = attempt()
        del legacy["deadline"]
        self.assertEqual(report(registry(legacy))["attempts"][0]["deadline"]["kind"], "unknown")

    def test_expiry_does_not_change_application_status_or_input(self):
        data = registry(attempt())
        original = deepcopy(data)
        view = report(data, "2026-09-22T12:00:00+09:00")
        self.assertEqual(view["attempts"][0]["status"], "pre-apply")
        self.assertEqual(data, original)

    def test_overrides_change_only_the_report_and_keep_attempt_identity(self):
        data = registry(attempt("first"), attempt("second"))
        original = deepcopy(data)
        override = attempt(value="2026-09-19")["deadline"]
        view = report(data, overrides={"second": override})
        self.assertEqual(view["imminent_ids"], ["second", "first"])
        self.assertEqual(view["counts"]["pre-apply"], 2)
        self.assertEqual(data, original)
        with self.assertRaises(ValueError):
            report(data, overrides={"missing": override})

    def test_invalid_deadline_fails_registry_validation(self):
        for value in (None, "2026-02-30", "2026-09-21T18:00:00", 20260921):
            with self.subTest(value=value):
                self.assertTrue(validate_registry_data(registry(attempt(value=value))))
        known = attempt()
        del known["deadline"]["checked_at"]
        self.assertTrue(validate_registry_data(registry(known)))

    def test_new_and_legacy_records_are_valid(self):
        self.assertEqual(validate_registry_data(registry(attempt())), [])
        legacy = attempt()
        del legacy["deadline"]
        self.assertEqual(validate_registry_data(registry(legacy)), [])

    def test_report_rejects_ambiguous_reference_time(self):
        with self.assertRaises(ValueError):
            report(registry(attempt()), "2026-09-18T12:00:00")

    def test_empty_registry_is_a_valid_empty_report(self):
        view = report(registry())
        self.assertEqual(view["total"], 0)
        self.assertEqual(view["imminent_ids"], [])
        self.assertTrue(all(count == 0 for count in view["counts"].values()))


if __name__ == "__main__":
    unittest.main()
