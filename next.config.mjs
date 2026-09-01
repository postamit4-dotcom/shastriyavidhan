import { site } from "./lib/site-data.js";
import { routeRedirects } from "./lib/site-registry.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  agentRules: false,
  trailingSlash: false,
  async redirects() {
    return [
      ...routeRedirects,
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "shastriyavidhan.com",
          },
        ],
        destination: `${site.productionUrl}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
