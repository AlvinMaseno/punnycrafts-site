/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",          // static site: deploys to Cloudflare Pages with no server
  trailingSlash: true,
  images: { unoptimized: true },
};
export default nextConfig;
