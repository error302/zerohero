# KCSE Prep Academy - Form 3 Rescue Edition 🎯

**Helping students go from E to A in KCSE Mathematics, Biology, Chemistry & Physics**

## Features

### 🆕 Form 3 Rescue System
- **Prerequisite Checks**: Prevents students from attempting advanced topics without required foundations
- **Smart Redirects**: Automatically guides students to prerequisite topics they need to master first
- **Visual Warnings**: Red indicators on topics requiring foundation knowledge

### 📊 Progress Tracking
- **Daily Streaks**: Motivates consistent study habits
- **2-Minute Daily Challenge**: Quick warm-up questions to get started
- **E → A Progress Contract**: Visual roadmap showing the path from current grade to target A grade

### 📚 Full Curriculum Coverage
- **Mathematics**: Form 1-4 (Algebra, Geometry, Calculus, Statistics)
- **Biology**: Form 1-4 (Cell Biology, Genetics, Ecology, Human Anatomy)
- **Chemistry**: Form 1-4 (Atomic Structure, Mole Concept, Organic Chemistry)
- **Physics**: Form 1-4 (Forces, Electricity, Optics, Electromagnetic Induction)

### ✨ Study Features
- **Interactive Lessons**: Comprehensive notes following KLB textbook structure
- **KCSE-Style Quizzes**: Multiple choice questions with instant feedback
- **Study Timetable**: Pre-built schedule with proven strategies
- **Progress Tracking**: Visual progress bars and completion badges

## Quick Start with Docker 🐳

### Prerequisites
- Docker Desktop installed and running
- No need for Node.js or npm!

### Start the App
```powershell
# Option 1: Use the helper script
.\start-docker.ps1

# Option 2: Docker commands directly
docker run -d -p 3001:3000 --name kcse-prep kcse-prep-app
```

Then open: **http://localhost:3001**

### Stop the App
```powershell
# Option 1: Use the helper script
.\stop-docker.ps1

# Option 2: Docker commands directly
docker stop kcse-prep
docker rm kcse-prep
```

## How It Works

### The Problem
Students scoring E grades in Form 3 typically have massive gaps from Forms 1-2. When they try to learn Form 3 topics like **Mole Concept**, they fail because they haven't mastered **Chemical Formulae** (Form 2).

### The Solution
This app implements a **prerequisite-based learning system**:

1. **Diagnostic Check**: Before accessing any Form 3/4 topic, the app checks if required Form 1/2 foundations are complete
2. **Guided Learning**: If prerequisites are missing, student is redirected to the exact topic they need to master first
3. **Progressive Mastery**: Student builds knowledge systematically from Form 1 → Form 2 → Form 3 → Form 4

### Example Flow
```
Student clicks "Mole Concept" (Form 3 Chemistry)
        ↓
App checks: Has student mastered "Chemical Formulae" (Form 2)?
        ↓
NO → Redirects to Form 2 Chemical Formulae lesson
     "⚠️ Foundation Check Required
      Before Mole Concept, you need Chemical Formulae from Form 2"
        ↓
Student studies Chemical Formulae → Takes quiz → Passes
        ↓
Now can access Mole Concept and succeed!
```

## Study Strategies Built-In

### 1. Active Recall
- Close notes and recall what you just read
- 3× more effective than passive re-reading

### 2. Spaced Repetition
- Study today, review tomorrow, then in 3 days, then in a week
- Builds permanent memory

### 3. Feynman Technique
- Explain topics in simple English or Kiswahili
- Where you get stuck = what to re-study

### 4. Past Paper Practice
- Every topic links to relevant KCSE questions
- Examiner patterns repeat year after year

## For Your Sister (Form 3 Student)

### Week 1-2: Foundation Building
1. Start with **Form 1 Mathematics** - Natural Numbers, Fractions
2. Complete **Form 1 Biology** - Cell Structure, Classification
3. Take daily challenges to build streak

### Week 3-6: Form 2 Topics
1. Move to **Form 2 Chemistry** - Chemical Formulae, Atomic Structure
2. **Form 2 Physics** - Electricity, Magnetism
3. Maintain daily streak

### Week 7+: Ready for Form 3
1. Now ready for **Mole Concept**, **Linear Motion**, **Genetics**
2. Prerequisites ensure success, not frustration
3. Building momentum toward A grade

## Technical Details

### Docker Image
- **Base**: Node.js 20 Alpine (lightweight)
- **Size**: ~150MB
- **Port**: 3001 (host) → 3000 (container)

### No Database Required
- Progress saved to browser's localStorage
- Works offline after initial load
- Perfect for areas with unreliable internet

### Deployment
Can be deployed to:
- Docker Hub (for sharing)
- AWS ECS / Fargate
- Google Cloud Run
- Azure Container Instances
- Any VPS with Docker

## Development

### Build Docker Image
```bash
docker build -t kcse-prep-app .
```

### Run Locally (without Docker)
```bash
npm install
npm start
# Open http://localhost:3000
```

## Success Metrics

Track these to measure improvement:
- **Streak Count**: Days in a row studying
- **Topics Completed**: Form 1 → Form 4 progression
- **Quiz Scores**: Aim for 80%+ before marking done
- **Daily Challenges**: Consistency over intensity

## Support

For issues or questions:
1. Check Docker logs: `docker logs kcse-prep`
2. Verify container is running: `docker ps`
3. Restart if needed: `docker restart kcse-prep`

---

**Built with ❤️ to help Kenyan students achieve A grades in KCSE**

*"Education is the most powerful weapon which you can use to change the world." - Nelson Mandela*
