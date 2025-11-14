/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
// Check if we're deploying to GitHub Pages (static export) or Railway/server (dynamic)
// Use static export only for GitHub Actions (GitHub Pages deployment)
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true'
// Get repository name from environment or use default
// For GitHub Pages: if repo is username.github.io, use '' (empty)
// Otherwise, use '/repo-name'
const repoName = process.env.NEXT_PUBLIC_BASE_PATH || process.env.GITHUB_REPOSITORY?.split('/')[1] || ''
const basePath = repoName && !repoName.includes('.github.io') ? `/${repoName}` : ''

const nextConfig = {
  reactStrictMode: true,
  // Only use static export for GitHub Pages, not for Railway or other servers
  ...(isGitHubPages ? { output: 'export', distDir: 'out' } : {}),
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
  // Only set basePath for GitHub Pages, not for Railway or other servers
  basePath: isGitHubPages && isProd ? basePath : '',
  assetPrefix: isGitHubPages && isProd ? basePath : '',
  trailingSlash: true,
}

module.exports = nextConfig

