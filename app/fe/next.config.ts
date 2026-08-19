import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    if (process.env.NODE_ENV !== "production") return [];

    return [
      {
        source: "/resumes/mgrv-resume.pdf",
        destination: "/resume",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
