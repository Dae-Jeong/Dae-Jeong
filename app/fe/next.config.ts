import { ADMIN_REDIRECTS } from "./lib/routes";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Filesystem document discovery needs these assets in server deployment traces.
  outputFileTracingIncludes: {
    "/*": ["./content/common/*.json", "./content/documents/companies/**/*.json"],
  },
  // ngrok으로 외부에 dev 화면을 보여줄 때 (2026-09-03). 프로덕션 빌드에는 영향 없음.
  allowedDevOrigins: [
    "127.0.0.1",
    "*.ngrok-free.app",
    "2a0d-121-166-226-147.ngrok-free.app",
  ],
  async redirects() {
    if (process.env.NODE_ENV !== "production") return ADMIN_REDIRECTS;

    return [
      ...ADMIN_REDIRECTS,
      {
        source: "/resumes/mgrv-resume.pdf",
        destination: "/resume",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
