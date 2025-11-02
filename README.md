# AI PowerPoint Generator

An AI-powered chat application that generates and edits PowerPoint presentations using Google's Gemini 2.0 Flash model and PptxGenJS library.

## 🌟 Features

- **AI-Powered Generation**: Create presentations from simple text prompts using Gemini AI
- **Interactive Chat Interface**: User-friendly chat interface similar to MagicSlides AI
- **Real-time Preview**: View your presentation slides as they're generated
- **Edit with Prompts**: Update and modify slides using natural language
- **Download PPTX**: Export your presentations as PowerPoint files
- **Chat History**: Keep track of all your prompts and edits
- **Progress Tracking**: Visual feedback showing AI's thought process
- **Professional Templates**: Beautiful slide layouts with customizable styling

## 🚀 Demo

[Live Demo Link](https://ppt-viewer-rust.vercel.app/)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn package manager
- A Google Gemini API key

## 🔧 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/ppt_viewer.git
cd ppt_viewer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

**How to get a Gemini API Key:**

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and paste it in your `.env.local` file

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Usage Instructions

### Creating a New Presentation

1. **Enter a Topic**: Type your presentation topic in the chat input
   - Example: "Create a presentation about Artificial Intelligence"
2. **Wait for Generation**: The AI will:

   - Search for relevant information
   - Structure the content
   - Generate slides with proper formatting

3. **Preview Slides**: View your presentation in the right panel

   - Navigate between slides using Previous/Next buttons
   - Check slide content and layout

4. **Download**: Click the "Edit Presentation" button to download as PPTX

### Editing an Existing Presentation

Once you have a presentation, you can edit it:

1. **Type Edit Instructions**:

   - "Add a slide about machine learning applications"
   - "Make the title slide more professional"
   - "Change the color scheme to blue"

2. **AI Updates**: The AI will modify your presentation while maintaining structure

3. **Preview Changes**: See updates in real-time

4. **Download Updated Version**: Export the edited presentation

## 🏗️ Project Structure

```
ppt_viewer/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts          # Gemini API integration
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main application page
├── components/
│   ├── ChatHistory.tsx           # Chat message display
│   ├── PresentationViewer.tsx    # Slide preview component
│   └── Thoughts.tsx              # AI progress indicator
├── lib/
│   └── pptGenerator.ts           # PPTX generation logic
├── types/
│   └── index.ts                  # TypeScript type definitions
├── .env.local                    # Environment variables (create this)
├── package.json                  # Project dependencies
└── README.md                     # This file
```

## 🛠️ Technologies Used

- **Next.js 15** - React framework for web applications
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Google Generative AI** - Gemini 2.0 Flash model
- **PptxGenJS** - PowerPoint generation library
- **Lucide React** - Icon library

## 🎨 Design Decisions

### Architecture Choices

1. **Next.js App Router**: Used for modern React patterns and API routes
2. **Client-Side State Management**: Simple React hooks for straightforward logic
3. **API Route Pattern**: Secure server-side API key management
4. **Component Modularity**: Separated concerns for maintainability

### Implementation Simplicity

- **Easy-to-understand code**: Prioritized readability over optimization
- **Straightforward data flow**: Clear state management with React hooks
- **Simple API design**: Single endpoint handles both creation and editing
- **Direct PPT generation**: No complex templating, straightforward slide creation

## 🔐 Environment Variables

| Variable         | Description                             | Required |
| ---------------- | --------------------------------------- | -------- |
| `GEMINI_API_KEY` | Google Gemini API key for AI generation | Yes      |

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**:

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy on Vercel**:

   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your repository
   - Add environment variable: `GEMINI_API_KEY`
   - Click "Deploy"

3. **Your app will be live** at `https://your-project.vercel.app`

### Deploy to Netlify

1. **Build Command**: `npm run build`
2. **Publish Directory**: `.next`
3. **Add Environment Variables** in Netlify dashboard

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 Assumptions Made

1. **API Key Security**: Users are responsible for keeping their Gemini API key secure
2. **Browser Compatibility**: Modern browsers with ES6+ support
3. **Internet Connection**: Required for AI model access
4. **Image Handling**: Currently uses placeholder for images (can be extended)
5. **Slide Limits**: No hard limit on slide count (dependent on AI response)

## 🐛 Known Limitations

- Images in slides are not fully implemented (placeholder support only)
- No offline mode
- Presentation templates are basic (can be extended)
- No user authentication (single-user application)

---

**Note**: Make sure to replace `your_gemini_api_key_here` in `.env.local` with your actual API key before running the application.
