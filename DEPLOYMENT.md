# How to Share Your Esdeath Chatbox

## Quick Deploy to Vercel (Recommended)

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login (you can use your GitHub account)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variable:
     - Name: `OPENAI_API_KEY`
     - Value: Your OpenAI API key (from `.env.local`)
   - Click "Deploy"

3. **Share the link:**
   - Once deployed, Vercel will give you a URL like: `your-project.vercel.app`
   - Share this link with your friend!

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```
   - Follow the prompts
   - When asked for environment variables, add `OPENAI_API_KEY`

3. **Share the link:**
   - Vercel will give you a deployment URL
   - Share it with your friend!

## Important Notes

- **OpenAI API Key**: Make sure to add your `OPENAI_API_KEY` in Vercel's environment variables
- **File Size**: Your `background-music.mp3` (1.9MB) will be included in the deployment
- **Free Tier**: Vercel's free tier is perfect for this project
- **Custom Domain**: You can add a custom domain later if you want

## Alternative: Share Locally (For Testing)

If you just want to test with a friend on the same network:

1. **Find your local IP:**
   ```bash
   # On Mac/Linux:
   ifconfig | grep "inet " | grep -v 127.0.0.1
   
   # On Windows:
   ipconfig
   ```

2. **Run the dev server:**
   ```bash
   npm run dev
   ```

3. **Share the URL:**
   - Your friend can access: `http://YOUR_LOCAL_IP:3000`
   - Make sure you're on the same WiFi network

## Troubleshooting

- **Music not playing?** Make sure the file is named exactly `background-music.mp3` in the `public` folder
- **API errors?** Check that `OPENAI_API_KEY` is set correctly in Vercel
- **Build fails?** Make sure all dependencies are in `package.json`

