# Esdeath Chatbox

A real-time AI chatbox featuring Esdeath from Akame ga Kill, built with Next.js and deployable on Vercel.

## Features

- Real-time AI conversations using OpenAI GPT-4
- Accurate Esdeath personality and responses
- Beautiful ice-themed UI with animations
- Fully responsive design
- Deployable to Vercel

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file in the root directory:
```
OPENAI_API_KEY=your_openai_api_key_here
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

1. Push your code to GitHub

2. Import your repository to Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. Add environment variable:
   - In Vercel project settings, go to "Environment Variables"
   - Add `OPENAI_API_KEY` with your OpenAI API key

4. Deploy!

The site will be live at `your-project.vercel.app`

## Getting an OpenAI API Key

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new secret key
5. Copy and use it in your `.env.local` file or Vercel environment variables

## Adding Background Music

To add background music:

1. Place your audio file in the `public` folder with one of these names:
   - `background-music.mp3` (recommended)
   - `background-music.ogg`
   - `background-music.wav`

2. The music will automatically loop and can be controlled via the play/pause button and volume slider in the header.

3. Your music preferences (play/pause state and volume) are saved in localStorage and will persist across sessions.

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- OpenAI API (GPT-4)
- CSS3 with animations

