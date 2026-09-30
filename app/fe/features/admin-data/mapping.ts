import {
  buildApplicationsProjection,
  isApplicationsProjection,
} from "../applications/mapping.ts";
export const ADMIN_DATA = {
  applications: {
    blob: "admin-data/applications.json",
    source: "output/application-workspace/application-attempts.json",
    build: buildApplicationsProjection,
    valid: isApplicationsProjection,
  },
};
