# 🚀 Quick Start Guide

## Step 1: Get Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the generated key

## Step 2: Set Up Environment Variables

1. In the project root, find the file `.env.local` (or create it if it doesn't exist)
2. Add your API key:
   ```
   GEMINI_API_KEY=paste_your_key_here
   ```
3. Save the file

## Step 3: Install & Run

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

## Step 4: Use the Application

1. Open [http://localhost:3000](http://localhost:3000)
2. Type a prompt like: "Create a presentation about Artificial Intelligence"
3. Wait for the AI to generate your slides
4. Preview and download your presentation!

## 🎯 Example Prompts

### Create New Presentations

- "Create a presentation about Climate Change"
- "Make a presentation on the History of Space Exploration"
- "Generate slides about Machine Learning basics"

### Edit Existing Presentations

- "Add a slide about applications"
- "Make the colors more professional"
- "Add more bullet points to slide 2"
- "Change the title to something catchier"

## ⚠️ Troubleshooting

**Error: "Gemini API key not configured"**

- Make sure `.env.local` exists in the root directory
- Verify the API key is correct
- Restart the development server after adding the key

**Slides not generating**

- Check your internet connection
- Verify your API key is valid
- Check the browser console for errors

## 📞 Need Help?

Check the full README.md for detailed documentation and troubleshooting guide.
