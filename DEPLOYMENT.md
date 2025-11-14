# GitHub Pages Deployment Guide

This guide will help you deploy your Next.js Travel Agency website to GitHub Pages.

## Prerequisites

1. A GitHub account
2. Your project pushed to a GitHub repository

## Step-by-Step Deployment

### 1. Push Your Code to GitHub

If you haven't already, create a repository on GitHub and push your code:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

**Important:** Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name.

### 2. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section (in the left sidebar)
4. Under **Source**, select **GitHub Actions**
5. Save the settings

### 3. Configure Repository Name (Important!)

The deployment workflow will automatically detect your repository name. However, if your repository name is different from what's expected, you can set it manually:

1. Go to repository **Settings** → **Pages**
2. Note your repository name
3. If needed, create a `.env.local` file (for local testing) with:
   ```
   NEXT_PUBLIC_BASE_PATH=your-repo-name
   ```

### 4. Trigger the Deployment

The deployment will automatically trigger when you:
- Push to the `main` or `master` branch
- Or manually trigger it from the **Actions** tab

### 5. Access Your Site

Once deployed, your site will be available at:
- `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

If your repository is named `username.github.io`, it will be at:
- `https://YOUR_USERNAME.github.io/`

## Manual Deployment (Alternative)

If you prefer to deploy manually:

1. Build the project:
   ```bash
   npm run export
   ```

2. The static files will be in the `out/` directory

3. Push the `out/` directory to the `gh-pages` branch:
   ```bash
   git subtree push --prefix out origin gh-pages
   ```

## Troubleshooting

### Images Not Loading
- Make sure `images.unoptimized: true` is set in `next.config.js` (already configured)
- Check that image URLs are using absolute paths

### 404 Errors on Routes
- Ensure `trailingSlash: true` is set in `next.config.js` (already configured)
- All routes should end with a trailing slash

### Base Path Issues
- If your site is not loading correctly, check the `basePath` in `next.config.js`
- The base path should match your repository name (without `.github.io`)

### Build Failures
- Check the **Actions** tab in GitHub for error messages
- Ensure all dependencies are listed in `package.json`
- Make sure there are no server-side only features (API routes won't work on GitHub Pages)

## Notes

- **API Routes**: GitHub Pages only serves static files. If you have API routes, they won't work. Consider using a separate backend service or serverless functions.
- **Environment Variables**: For GitHub Pages, use `NEXT_PUBLIC_` prefix for client-side variables
- **Backend Server**: The `/server` directory won't be deployed to GitHub Pages. You'll need to deploy it separately (e.g., Heroku, Railway, Render)

## Support

If you encounter any issues, check:
1. GitHub Actions logs in the **Actions** tab
2. Browser console for client-side errors
3. Network tab for failed resource loads

