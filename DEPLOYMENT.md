# 🚀 Deployment Guide

This guide will help you deploy your AI PowerPoint Generator to various platforms.

## 📦 Vercel (Recommended - Easiest)

### Prerequisites

- GitHub account
- Vercel account (free at [vercel.com](https://vercel.com))

### Steps

1. **Push to GitHub**

   ```bash
   git init
   git add .
   git commit -m "Initial commit - AI PPT Generator"
   git branch -M main
   git remote add origin https://github.com/yourusername/ppt-viewer.git
   git push -u origin main
   ```

2. **Connect to Vercel**

   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure Environment Variables**

   - In Vercel dashboard, go to "Settings" → "Environment Variables"
   - Add: `GEMINI_API_KEY` with your API key
   - Click "Save"

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your app will be live at `https://your-project.vercel.app`

### Auto-Deploy

Every push to `main` branch will automatically deploy!

---

## 🌐 Netlify

### Steps

1. **Build the project locally**

   ```bash
   npm run build
   ```

2. **Deploy to Netlify**

   - Go to [netlify.com](https://netlify.com)
   - Drag & drop the `.next` folder
   - Or connect GitHub repository

3. **Environment Variables**

   - Go to Site Settings → Environment Variables
   - Add `GEMINI_API_KEY`

4. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`

---

## ☁️ Railway

### Steps

1. **Connect GitHub**

   - Go to [railway.app](https://railway.app)
   - Create new project from GitHub repo

2. **Environment Variables**

   - Add `GEMINI_API_KEY` in project settings

3. **Deploy**
   - Railway will auto-detect Next.js and deploy

---

## 🐳 Docker (Self-Hosted)

### Create Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### Build and Run

```bash
docker build -t ppt-viewer .
docker run -p 3000:3000 -e GEMINI_API_KEY=your_key ppt-viewer
```

---

## 🔐 Security Checklist

Before deploying:

- [ ] Add `.env.local` to `.gitignore` (already done)
- [ ] Never commit API keys to GitHub
- [ ] Set environment variables in deployment platform
- [ ] Test with a non-production API key first
- [ ] Enable HTTPS (automatic on Vercel/Netlify)

---

## 📊 Post-Deployment

### Testing Your Deployment

1. Visit your deployed URL
2. Try creating a presentation
3. Check if download works
4. Test edit functionality
5. Verify responsive design on mobile

### Monitoring

- Vercel: Built-in analytics in dashboard
- Check logs for errors
- Monitor API usage in Google AI Studio

### Custom Domain (Optional)

1. Purchase a domain (Namecheap, GoDaddy, etc.)
2. In Vercel/Netlify, add custom domain
3. Update DNS records as instructed
4. Wait for SSL certificate (automatic)

---

## 🐛 Troubleshooting Deployment

### Build Fails

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### API Key Not Working

- Verify environment variable name is exactly `GEMINI_API_KEY`
- Check for extra spaces in the key
- Redeploy after adding environment variables

### TypeScript Errors

```bash
# Check for errors locally
npm run build
```

### Runtime Errors

- Check deployment logs
- Verify all dependencies are in `package.json`
- Ensure Node.js version compatibility

---

## 📈 Scaling Considerations

- **API Rate Limits**: Monitor Gemini API usage
- **Caching**: Consider caching common presentations
- **CDN**: Vercel/Netlify include CDN automatically
- **Database**: Add if you want to save user presentations

---

## 🎉 Success!

Once deployed, your application will be accessible worldwide!

Share your deployment:

- Add link to README.md
- Share on social media
- Submit to showcases

**Example Production URLs:**

- `https://ai-ppt-generator.vercel.app`
- `https://slides-ai.netlify.app`
- `https://yourapp.railway.app`
