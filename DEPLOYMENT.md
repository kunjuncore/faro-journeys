# Faro Holidays - Deployment Guide

## Prerequisites
- Vercel account (free tier works)
- Codewords API key

## Vercel Deployment Steps

### 1. Connect to Vercel
```bash
# Install Vercel CLI (optional)
npm i -g vercel

# Login to Vercel
vercel login
```

### 2. Configure Environment Variables
In your Vercel dashboard:
1. Go to Project Settings → Environment Variables
2. Add the following variable:
   - **Key**: `VITE_CODEWORDS_API_KEY`
   - **Value**: `cwk-c3e7a4acbbb2af2d821bc211436c031d5214c88bd2b88a5807e21353f3e022e0`
   - **Environments**: Production, Preview, Development

### 3. Deploy
```bash
# Deploy to production
vercel --prod

# Or connect your GitHub repo in Vercel dashboard for automatic deployments
```

## Build Configuration

The project includes a `vercel.json` file with optimal settings:
- Build command: `npm run build`
- Output directory: `dist`
- Framework: Vite
- SPA routing configured

## Environment Variables

### Required Variables
- `VITE_CODEWORDS_API_KEY`: Your Codewords API key for backend services

### Important Notes
- All environment variables for Vite MUST start with `VITE_`
- Never commit `.env` files with real API keys to version control
- Use `.env.example` as a template for local development

## Local Development
```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env and add your API key

# Run development server
npm run dev
```

## Performance Optimizations Included
- ✅ Image lazy loading
- ✅ Code splitting
- ✅ API response caching (via React Query)
- ✅ Mobile-first responsive design
- ✅ Optimized bundle size with Vite

## Troubleshooting

### Build fails on Vercel
- Ensure all TypeScript errors are resolved
- Check that all dependencies are in `package.json`
- Verify environment variables are set correctly

### API calls fail in production
- Confirm `VITE_CODEWORDS_API_KEY` is set in Vercel
- Check browser console for CORS or network errors
- Verify Codewords service IDs are correct

### Images not loading
- Images in `src/assets/` are bundled - use ES6 imports
- External images should be optimized and served via CDN

## Mobile Testing
Use Vercel's preview deployments to test on real devices:
1. Push changes to GitHub
2. Vercel creates preview deployment
3. Access preview URL on mobile device

## Post-Deployment Checklist
- [ ] Test all routes work correctly
- [ ] Verify API integration is functioning
- [ ] Check mobile responsiveness
- [ ] Test contact form submissions
- [ ] Validate SEO meta tags
- [ ] Test loading states and error handling
