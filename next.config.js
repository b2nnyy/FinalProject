/** @type {import('next').NextConfig} */
const repo = process.env.GITHUB_REPOSITORY
  ? process.env.GITHUB_REPOSITORY.split("/")[1]
  : "";
const isUserSite = repo.endsWith(".github.io");
const basePath = isUserSite || !repo ? "" : `/${repo}`;

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
