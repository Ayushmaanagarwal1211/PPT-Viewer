# 📤 GitHub Setup Instructions

## Pushing Your Project to GitHub

Follow these simple steps to upload your project to GitHub:

### Step 1: Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name**: `ai-ppt-generator` (or your preferred name)
   - **Description**: "AI-powered PowerPoint presentation generator"
   - **Visibility**: Public
   - **Don't** initialize with README (we already have one)
5. Click **"Create repository"**

### Step 2: Initialize Git (Already Done)

The project already has git initialized. If you need to start fresh:

```bash
cd c:\Users\lovia\OneDrive\Desktop\ppt_viewer
git init
```

### Step 3: Add and Commit Files

```bash
# Add all files to git
git add .

# Commit with a message
git commit -m "Initial commit: AI PowerPoint Generator"
```

### Step 4: Connect to GitHub

Replace `YOUR_USERNAME` with your actual GitHub username:

```bash
# Set the main branch
git branch -M main

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/ai-ppt-generator.git

# Push to GitHub
git push -u origin main
```

### Step 5: Verify Upload

1. Refresh your GitHub repository page
2. You should see all your files uploaded
3. The README.md will display automatically

---

## 🔑 Important: Don't Commit API Keys!

The project is configured to exclude `.env.local` from git, so your API key stays safe.

**Files in .gitignore:**

- `.env.local`
- `node_modules/`
- `.next/`

**Safe to commit:**

- `.env.example` (template without real keys)

---

## 📝 Update README with Your Info

Before pushing, update these sections in `README.md`:

1. **GitHub URL**: Replace `yourusername` with your actual username
2. **Author Info**: Add your name and contact
3. **Demo Link**: Add after deploying

```markdown
## 👨‍💻 Author

Your Name

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com
```

---

## 🚀 After Pushing to GitHub

### Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Select your GitHub repository
4. Add environment variable: `GEMINI_API_KEY`
5. Click "Deploy"
6. Get your live URL!

### Update README with Deploy Link

```markdown
## 🌟 Demo

🔗 [Live Demo](https://your-app.vercel.app)
```

---

## 📋 Git Commands Reference

```bash
# Check status
git status

# View commit history
git log --oneline

# Make changes and update
git add .
git commit -m "Description of changes"
git push

# Create a new branch
git checkout -b feature-name

# Switch branches
git checkout main
```

---

## 🎯 Quick Copy-Paste Commands

Replace `YOUR_USERNAME` with your GitHub username:

```bash
# Full setup in one go
git add .
git commit -m "Initial commit: AI PowerPoint Generator"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ai-ppt-generator.git
git push -u origin main
```

---

## ✅ Checklist Before Pushing

- [ ] `.env.local` is in `.gitignore`
- [ ] All code is working and tested
- [ ] README.md is updated with your info
- [ ] No sensitive data in code
- [ ] `npm run build` succeeds
- [ ] All files are committed

---

## 🐛 Troubleshooting

### "remote origin already exists"

```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/ai-ppt-generator.git
```

### "Permission denied"

- Make sure you're logged into GitHub
- Check if you need to set up SSH keys
- Or use HTTPS with personal access token

### "Failed to push"

```bash
# Pull first, then push
git pull origin main --rebase
git push origin main
```

---

## 🎉 Success!

Once pushed, your project will be public on GitHub and ready to share!

**Your repository URL will be:**
`https://github.com/YOUR_USERNAME/ai-ppt-generator`
