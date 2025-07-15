# Co-Narrate

[Demo](https://co-narrate.netlify.app/)

An English-language practice app that combines storytelling with speech recognition to help English learners practice target phrases in context.

## Why This Exists

I created this based on my ~10 years' experience as an English language teacher. Once at intermediate and higher levels, students need tools to support the use of specific target language. This tool addresses a common challenge: **getting students to actually use the phrases they've learned** in more natural contexts.

Traditional language learning often focuses on recognition and comprehension, but lacks practice opportunities for **productive use** of target language. Students can understand "Suddenly," or "Out of the blue" when they read them, but struggle to incorporate them into their own speech.

Co-Narrate bridges this gap by **giving real-time feedback when students use target phrases**


## Features

- **Story Images**: Load random images from Unsplash to inspire storytelling
- **Speech Recognition**: Practice saying specific phrases organized by category (storytelling, meetings, etc.)
- **Real-time Feedback**: Get instant visual feedback when you use target phrases correctly


## Limitations & Niche Use

**Current limitations:**
- Speech recognition accuracy varies with accents/pronunciation
- Limited to English language (for now)
- Requires specific browser support
- Not suitable for large classroom settings (unless each small group has a computer)
- Phrase collection is manually curated (faaaar from comprehensive)
- See that 15sec. timeout timer when you load images? That's because Unsplash demo API allows for 50 requests/hr 😅

**This tool works best for:**
- Intermediate to advanced English learners
- Students comfortable with technology
- 1-on-1 or small group settings


## Tech Stack

- **React 19** built with Vite
- **Tailwind 4** - my first time
- **Web Speech API** via [react-speech-recognition](https://www.npmjs.com/package/react-speech-recognition)
- **Unsplash API** for random images


## Getting Started

[Demo](https://co-narrate.netlify.app/)

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build


## Other notes

An early portfolio project with lotta technical and design debt:

- Architecture: component structure could be cleaner;
- Code: Needs some optimization and memoization improvements;
- Design: No design system as such 💩