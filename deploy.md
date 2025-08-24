# Netlify Deployment Guide

## Prerequisites
- Your project is successfully building locally (`npm run build`)
- You have a Netlify account

## Deployment Steps

### Option 1: Drag & Drop (Recommended for first deployment)
1. Run `npm run build` locally
2. Go to [netlify.com](https://netlify.com) and sign in
3. Drag and drop the `build` folder to the Netlify dashboard
4. Your site will be deployed automatically

### Option 2: Git-based deployment
1. Push your code to GitHub/GitLab/Bitbucket
2. Connect your repository to Netlify
3. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
   - Node version: `18`

## Important Configuration Files

### netlify.toml
- Specifies build settings and redirects
- Handles SPA routing (redirects all routes to index.html)

### public/_redirects
- Alternative redirect method for SPA routing
- Ensures React Router works properly

## Common Issues & Solutions

### Issue: 404 errors on page refresh
**Solution**: The redirects are already configured in `netlify.toml` and `public/_redirects`

### Issue: Build fails
**Solution**: 
1. Ensure Node.js version 18+ is used
2. Run `npm install` before building
3. Check for any TypeScript errors

### Issue: Assets not loading
**Solution**: The `base: '/'` in vite.config.mjs ensures proper asset paths

## Testing Deployment
1. After deployment, test all routes work
2. Test page refreshes on all pages
3. Verify all assets (images, CSS, JS) load correctly
4. Test the contact form and resume download

## Build Output
Your project builds to the `build` directory with:
- `index.html` - Main entry point
- `assets/` - CSS, JS, and other assets
- Proper asset paths for production
