portfolio_demo
Radha Vaishnavi — Portfolio
Premium AI/ML Engineer portfolio. Dark hybrid theme with electric violet accents.

Folder Structure
vaishnavi-portfolio/
├── index.html       ← Main page (all sections)
├── styles.css       ← Design system + all styles
├── script.js        ← Nav, typewriter, scroll reveal
├── images/
│   ├── profile-picture.png   ← Copy from your existing repo
│   └── main-logo.png         ← Copy from your existing repo (optional, not used in new design)
└── README.md
Setup
No build system. No npm. No dependencies. Just open in a browser.

Local preview
Copy your images/ folder from the old repo into this folder.
Open index.html in any browser — or use VS Code Live Server.
# With Python (built-in)
python3 -m http.server 3000
# then open http://localhost:3000
Deployment — GitHub Pages
Option A: Replace existing repo files
Delete all old files in your repo (index.html, styles.css, script.js).
Upload the new index.html, styles.css, script.js.
Keep your images/ folder as-is.
Push to main branch.
GitHub Pages auto-deploys — live in ~60 seconds at: https://biyyapu5e5.github.io/vaishnavi-portfolio/
Option B: Via Git CLI
# Clone your repo
git clone https://github.com/biyyapu5E5/vaishnavi-portfolio.git
cd vaishnavi-portfolio

# Replace files
cp /path/to/new/index.html .
cp /path/to/new/styles.css .
cp /path/to/new/script.js .

# Push
git add -A
git commit -m "redesign: premium dark portfolio"
git push origin main
GitHub Pages settings (one-time check)
Go to repo → Settings → Pages
Source: Deploy from branch → main → / (root)
Save → wait ~1 min → your site is live
Customisation
What	Where
Name, bio, links	index.html — hero & contact sections
Resume URL	index.html — search drive.google.com (2 places)
Profile photo	images/profile-picture.png
Purple accent shade	styles.css → --purple: #8b5cf6
Add a project	Copy any .project-card block in index.html
Add a cert	Copy any .cert-card block in index.html
Features
Zero external dependencies (no jQuery, no Swiper, no Bootstrap)
Fully responsive: mobile → ultrawide
Scroll reveal with IntersectionObserver
Animated typewriter role text
Glassmorphic sticky nav with active link tracking
Floating purple orbs + grid background (GPU-light CSS only)
Respects prefers-reduced-motion
Keyboard accessible, semantic HTML
