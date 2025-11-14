/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
// Get repository name from environment or use default
// For GitHub Pages: if repo is username.github.io, use '' (empty)
// Otherwise, use '/repo-name'
const repoName = process.env.NEXT_PUBLIC_BASE_PATH || process.env.GITHUB_REPOSITORY?.split('/')[1] || ''
const basePath = repoName && !repoName.includes('.github.io') ? `/${repoName}` : ''

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  basePath: isProd ? basePath : '',
  assetPrefix: isProd ? basePath : '',
  trailingSlash: true,
}

module.exports = nextConfig

