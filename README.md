# Catalyst Program Website

## Live Site

[https://catalyst-projects-program.github.io/](https://catalyst-projects-program.github.io/)

## Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: CSS Variables + Inline Styles
- **Animations**: Framer Motion
- **3D Graphics**: Three.js + React Three Fiber
- **Smooth Scrolling**: Lenis

## Project Structure

```
src/
├── main.jsx              # App entry point with routing
├── App.jsx               # Main app with scroll handling & layout
├── index.css             # Global styles & CSS variables
├── App.css               # App-specific styles
│
├── components/
│   ├── Navbar.jsx        # Top navigation bar
│   ├── SideNav.jsx       # Right-side dot navigation
│   ├── Hero.jsx          # Hero section with email signup + globe
│   ├── CatalystImpact.jsx # Three.js animated globe
│   ├── AboutUs.jsx       # Mission/Vision/Values section
│   ├── Projects.jsx      # Projects showcase (coming soon)
│   ├── Calendar.jsx      # Schedule overview (coming soon)
│   ├── Testimonials.jsx  # Partner logos marquee
│   ├── FAQ.jsx           # Frequently asked questions
│   ├── ApplySection.jsx  # Student/Organization application CTAs
│   └── Footer.jsx        # Site footer with links
│
└── assets/               # Static assets
```

## Local Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/CatalystProgram.git
   cd CatalystProgram
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:5173`

### Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

## Deployment (GitHub Pages)

I'll set up the gh actions for this, otherwise, manually run ```npm run build``` and drop the files into the repo and it should work

### Email Collection

Email signups are collected via Google Apps Script and stored in a Google Sheet. The script URL is configured in `src/components/Hero.jsx`.

## Customization

### Colors
Edit CSS variables in `src/index.css`:
```css
:root {
  --color-primary: #1a5f7a;
  --color-background: #FDFBF7;
  /* ... */
}
```

### Content
- **FAQ questions**: Edit `src/components/FAQ.jsx`
- **Partner logos**: Edit `src/components/Testimonials.jsx`
- **About content**: Edit `src/components/AboutUs.jsx`

## Contact

- **Email**: catalyst.program.board@gmail.com
- **LinkedIn**: [Catalyst Projects Program](https://www.linkedin.com/company/catalyst-projects-program/)
