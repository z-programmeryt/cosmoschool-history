# কোয়ান্টাম কসমো স্কুল ও কলেজ ইতিহাস

## 📋 Project Overview

এটি একটি **React** (TypeScript + Vite) প্রজেক্ট যা কোয়ান্টাম কসমো স্কুল ও কলেজের ১৯৯৯ সাল থেকে ইতিহাস উপস্থাপন করে।

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Styling**: TailwindCSS
- **Deployment**: Netlify (auto-deploy from GitHub)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Git

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
cosmoschool-history/
├── src/
│   ├── main.tsx          # React app entry point
│   ├── App.tsx           # Main app component
│   └── index.css         # Global styles
├── dist/                 # Build output (don't edit)
├── public/               # Static assets
├── package.json          # Dependencies & scripts
├── vite.config.ts        # Vite configuration
└── README.md            # This file
```

## 🔧 Development Workflow

### 1. Code Changes
```bash
# Edit your code
# Test locally with npm run dev
```

### 2. Git Workflow
```bash
# Add changes
git add .

# Commit with descriptive message
git commit -m "Fix: Navigation mobile responsiveness"

# Push to GitHub
git push zprogrammer main
```

### 3. Auto-Deployment
- GitHub-এ push করলে Netlify auto-detect করবে
- Auto build হবে (npm run build)
- Deploy হবে `dist` folder
- Live site update হবে

## 🎯 Best Practices

### Commit Messages
```bash
# Good
git commit -m "Add: Hero section animation"
git commit -m "Fix: Mobile menu toggle issue"
git commit -m "Update: Footer contact information"

# Bad
git commit -m "update"
git commit -m "fix"
```

### Branch Strategy
```bash
# Feature branch for new work
git checkout -b feature/new-section
git add .
git commit -m "Add: New timeline section"
git push zprogrammer feature/new-section

# Merge to main when ready
git checkout main
git merge feature/new-section
git push zprogrammer main
```

## 🌐 Deployment

### Netlify Configuration
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Node Version**: 18+

### Environment Variables
No environment variables needed for this static site.

## 🔍 Troubleshooting

### Build Failed?
```bash
# Test locally first
npm run build

# Fix errors and re-push
git add .
git commit -m "Fix: Build errors"
git push zprogrammer main
```

### Deploy Delay?
- Check Netlify dashboard
- Clear Netlify cache
- Verify build settings

## 📊 Monitoring

- **Live Site**: https://cosmoschool-history.netlify.app
- **Netlify Dashboard**: Deploy status & logs
- **GitHub Repository**: Source code

## 🎉 Success Checklist

- [ ] Code tested locally (`npm run dev`)
- [ ] Build passes without errors (`npm run build`)
- [ ] Git commit with proper message
- [ ] Pushed to GitHub successfully
- [ ] Netlify build completed
- [ ] Site updated live

---

**Remember**: Git push = Auto deploy = Live update! 🚀
