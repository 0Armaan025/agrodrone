# AgroDrone Feature Build Spec

## User Request
- Auto-fill dummy login details with single click
- Mobile responsive fixes (sidebar/text)
- Video AI demo works without real video upload
- Maps API key input in Settings
- AI recommendation flow: app simulates sending options (pesticide/fertilizer/etc) to drone operator notification

## Design Decisions
- Platform: React + Tailwind (existing stack)
- No backend: all simulated locally
- Mobile: sidebar hidden on mobile, text scaled properly
- Video AI: demo mode uses a simulated video element + mock analysis
- AI options: after analysis, show selectable recommendations (pesticide, fertilizer, spray elevation) that simulate notification to operator
- Maps key: input field in Settings screen

## Non-Goals
- Real drone control
- Real backend/API integration (except Gemini key which is optional)
