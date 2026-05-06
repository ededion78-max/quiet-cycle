
# Period Tracker - Comprehensive Upgrade

## Overview
Transform the existing period tracker into a full-featured, beautifully designed application with feminine aesthetics, multi-language support, navigation menu, health education, analytics, notes, and more.

## Changes

### 1. Design System Overhaul
- Replace teal/cream palette with feminine colors: soft rose, dusty pink, warm coral accents
- Modern gradient backgrounds, elegant card shadows
- Refined typography with a premium feel

### 2. Multi-Language Support
- Create a language context with translations for English (default), Albanian, Spanish, French, German, Turkish
- Language switcher in the header/menu

### 3. Navigation & Layout
- Sidebar menu with beautiful feminine styling
- Routes: Home (tracker), Health Tips, Analytics, Notes/Journal, About
- Smooth transitions between pages

### 4. Home Page Enhancements
- Tracking mode selector: Normal / Pregnancy Planning / Symptom Management
- PCOS/Endometriosis condition toggle with adapted predictions
- Enhanced symptom logging: energy level, headache, bloating, skin, cravings
- Separate "select date" from "toggle period" actions in calendar

### 5. Health Tips Page (`/tips`)
- How to ease period pain: positions, exercises, breathing
- What to eat and drink during your period
- What to avoid
- Tips organized in beautiful cards with icons

### 6. Analytics Page (`/analytics`)
- Cycle length trend chart (using Recharts)
- Symptom frequency analysis
- Mood pattern insights
- Monthly overview statistics

### 7. Notes/Journal Page (`/notes`)
- Date-linked journal entries
- Free-text notes with mood tags
- Searchable history

### 8. About Page (`/about`)
- Created by DS Interactive branding
- App version and features overview
- Privacy information (data stays on device)

### Technical Details
- All data persists in localStorage
- New route files: `tips.tsx`, `analytics.tsx`, `notes.tsx`, `about.tsx`
- Language context in `src/lib/i18n.tsx`
- Sidebar component in `src/components/AppSidebar.tsx`
- Updated `__root.tsx` with sidebar layout
