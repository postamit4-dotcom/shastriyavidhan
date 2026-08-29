/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  agentRules: false,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "shastriyavidhan.com",
          },
        ],
        destination: "https://www.shastriyavidhan.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
