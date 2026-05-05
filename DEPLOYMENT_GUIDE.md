# 🚀 Netlify Auto-Deployment Guide

## 📋 কিভাবে কাজ করে
GitHub-এ code push করলে → Netlify auto-detect → Auto-build → Live deploy

## 🔧 Setup Requirements
- ✅ GitHub repository connected
- ✅ Netlify build settings configured
- ✅ Build command: `npm run build`
- ✅ Publish directory: `dist`

## 📤 Code Update Process

### ১. Local Development
```bash
# Code edit করুন
# Test locally
npm run dev
```

### ২. Git Commit & Push
```bash
# Changes add করুন
git add .

# Commit করুন
git commit -m "Your descriptive message"

# GitHub-এ push করুন
git push origin main
```

### ৩. Netlify Auto-Magic
- 🤖 Netlify GitHub webhook detect করবে
- 🔨 Auto build শুরু হবে (`npm run build`)
- 🚀 Auto deploy হবে `dist` folder
- ✅ Live site update হবে

## ⏱️ Timeline
- **Push**: Immediate
- **Build**: 1-3 minutes
- **Deploy**: 30 seconds
- **Live**: 2-5 minutes total

## 🎯 Best Practices

### Commit Messages
```bash
# Good examples
git commit -m "Fix: Navigation mobile responsiveness"
git commit -m "Add: Google Analytics tracking"
git commit -m "Update: Hero section content"

# Bad examples
git commit -m "update"
git commit -m "fix bug"
```

### Branch Strategy
```bash
# Main branch for production
git checkout main

# Feature branch for development
git checkout -b new-feature
git add .
git commit -m "Add: New feature"
git push origin new-feature
```

## 🔍 Troubleshooting

### Build Failed?
```bash
# Local test করুন
npm run build

# Fix errors এবং re-push
git add .
git commit -m "Fix: Build errors"
git push origin main
```

### Deploy Delay?
- Check Netlify deploy logs
- Verify build settings
- Clear Netlify cache

## 📊 Monitoring
- **Netlify Dashboard**: Deploy status
- **GitHub Actions**: Build logs
- **Live Site**: https://cosmoschool-history.netlify.app

## 🎉 Success Checklist
- [ ] Code tested locally
- [ ] Build passes without errors
- [ ] Git push successful
- [ ] Netlify build complete
- [ ] Site updated live

---
**Remember**: Git push = Auto deploy = Live update! 🚀
