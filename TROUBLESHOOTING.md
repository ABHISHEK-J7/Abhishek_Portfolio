# Netlify Deployment Troubleshooting Guide

## Common Issues & Solutions

### 1. 404 Errors on Page Refresh
**Problem**: Users get 404 errors when refreshing pages or navigating directly to URLs
**Solution**: ✅ **FIXED** - Added redirects in `netlify.toml` and `public/_redirects`

### 2. Build Fails
**Problem**: Netlify build process fails
**Solutions**:
- Ensure Node.js version 18+ is used
- Check `package.json` for all required dependencies
- Verify all imports are correct
- Run `npm run build` locally first

### 3. Assets Not Loading
**Problem**: CSS, JS, or images don't load in production
**Solution**: ✅ **FIXED** - Added `base: '/'` in `vite.config.mjs`

### 4. React Router Issues
**Problem**: Navigation doesn't work properly
**Solution**: ✅ **FIXED** - Routes are properly configured in `src/Routes.jsx`

### 5. Large Bundle Size
**Problem**: Build files are too large
**Solution**: ✅ **FIXED** - Added manual chunk splitting in `vite.config.mjs`

## Pre-Deployment Checklist

- [x] Project builds successfully locally (`npm run build`)
- [x] All routes work in development
- [x] All assets (images, CSS, JS) load correctly
- [x] Contact form works
- [x] Resume download works
- [x] No console errors in browser

## Deployment Steps

### Quick Deploy (Drag & Drop)
1. Run `./deploy.sh` or `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag `build` folder to deploy
4. Wait for deployment to complete
5. Test all functionality

### Git-based Deploy
1. Push code to GitHub/GitLab/Bitbucket
2. Connect repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `build`
5. Deploy automatically on push

## Testing After Deployment

1. **Homepage**: Verify it loads correctly
2. **Navigation**: Test all menu items
3. **Routes**: Test direct URL access
4. **Page Refresh**: Ensure no 404 errors
5. **Assets**: Check all images and styles load
6. **Forms**: Test contact form submission
7. **Downloads**: Verify resume download works
8. **Mobile**: Test responsive design

## Environment Variables (if needed)

Currently no environment variables are required. If you add any later:
1. Add them in Netlify dashboard
2. Prefix with `VITE_` for client-side access
3. Update `.env.example` file

## Support

If issues persist:
1. Check Netlify build logs
2. Verify all configuration files are present
3. Test locally with `npm run build`
4. Check browser console for errors
