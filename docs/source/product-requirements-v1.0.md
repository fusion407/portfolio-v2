# BRADY DORSEY — PORTFOLIO 2.0
## Product Requirements & Design Specification
**Version:** 1.0  
**Status:** Approved creative direction; implementation not started  
**Website:** https://www.bradydorsey.dev/  
**Hosting:** Netlify  
**Source control:** Public GitHub repository

---

## 1. Product Vision

Create a premium, interactive personal portfolio positioning Brady Dorsey as an **AI Engineer & Builder of Things**.

The website must communicate the ability to design, architect, build, test, and deliver software using AI-assisted engineering workflows.

It should showcase professional AI integration, agentic software development, creative engineering, and real-time game development under one cohesive identity.

### Core messaging

**Primary headline:** I build things.

**Professional identity:** AI Engineer & Builder of Things.

**Supporting statement:**
"I turn ambitious ideas into working software through AI engineering, agentic development workflows, and creative problem-solving."

**Brand attributes:**
- Creative and technically capable
- Futuristic without sacrificing professionalism
- Experimental and interactive
- Design-first and detail-oriented
- Focused on building real software

### Target audience

- AI engineering recruiters and hiring managers
- Software engineering teams
- Potential collaborators and clients
- Game development studios
- Developers interested in agentic workflows

### Success criteria

Within the first few seconds, visitors should understand:
1. Who Brady is.
2. What kind of engineering he does.
3. Which projects demonstrate his abilities.
4. How he approaches AI-assisted development.
5. Where to contact him or view his work.

---

## 2. Visual Design System

### Theme

Dark, futuristic, creative, polished.

**Color tokens:**

| Token | Hex | Purpose |
|---|---|---|
| Background | #080B14 | Primary background |
| Surface | #121B30 | Cards and panels |
| Elevated | #1B2440 | Elevated surfaces |
| Purple | #7357F5 | Primary accent |
| Cyan | #38BDF8 | Secondary accent |
| Text | #F1F5FF | Primary text |
| Muted | #9DABCF | Secondary text |

Use restrained purple/cyan gradients, subtle illumination, thin borders, and carefully controlled glass effects.

### Typography

Use a modern, legible sans-serif family such as Geist or Inter. A monospace font can be used sparingly for technical labels, project metadata, and command-palette details.

### Layout

- Generous whitespace
- Responsive 12-column grid
- Strong typographic hierarchy
- Large project previews
- Rounded cards with subtle borders
- Consistent spacing tokens
- Mobile-first behavior

### Motion philosophy

Animations must reinforce usability and storytelling rather than distract from content.

Use smooth, restrained transitions, subtle parallax, hover responses, scroll reveals, and a signature interactive 3D hero.

Support reduced-motion preferences and provide a static fallback.

---

## 3. Website Architecture

### Routes

| Route | Purpose |
|---|---|
| `/` | Main portfolio |
| `/projects` | All featured projects |
| `/projects/geovis` | GeoVis case study |
| `/projects/neonsynth` | NeonSynth showcase |
| `/projects/titanforge-studio` | TitanForge preview |
| `/projects/swordbound-protocol` | Swordbound case study |
| `/resume` | Résumé information and download |
| `/404` | Branded not-found experience |

Optional additional routes should only be introduced if they provide clear value.

### Homepage sections

1. **Hero** — Name, headline, identity, interactive 3D scene, primary navigation actions.
2. **Featured Builds** — Four flagship project cards.
3. **How I Build** — Interactive AI engineering workflow.
4. **Experience** — Professional history and selected accomplishments.
5. **Technology Stack** — AI development tools, engineering technologies, and creative software.
6. **About** — Concise personal and professional introduction.
7. **Contact** — Email, GitHub, LinkedIn, and résumé download.

The homepage should function as a complete introduction while offering deeper project pages.

---

## 4. Signature Interactive Features

### 4.1 Interactive 3D Hero

Build an abstract network of interconnected nodes representing ideas, agents, and systems.

**Behavior:**
- Gentle ambient movement
- Cursor-responsive parallax
- Subtle purple/cyan illumination
- No aggressive camera movement
- Responsive sizing
- Reduced-motion fallback
- Static fallback for low-performance devices

Avoid making the 3D experience a prerequisite for reading the hero content.

### 4.2 Animated Project Showcases

Each featured project should have:
- High-quality cover artwork
- Smooth hover transitions
- Project title and summary
- Relevant technology labels
- Development status
- Link to dedicated project page

Provide touch-friendly equivalents to hover interactions.

### 4.3 Interactive AI Development Workflow

Present Brady's actual design-first methodology:

1. Brainstorm with AI.
2. Iterate and refine the design.
3. Architect the complete system.
4. Define sequential milestones.
5. Generate comprehensive master context.
6. Implement with AI coding agents.
7. Personally test and run automated checks.
8. Provide feedback and repeat until acceptable.

Represent these as interactive connected stages.

Each stage should explain its purpose, inputs, and outputs.

The validation stages should visibly loop back into implementation.

Do not imply that automated tests guarantee vulnerability-free software.

### 4.4 Command Palette

Keyboard shortcuts:
- `Ctrl + K` on Windows/Linux
- `Cmd + K` on macOS

Capabilities:
- Navigate sections and project pages
- Search project titles
- Open GitHub and LinkedIn
- Navigate to résumé download
- Close using Escape
- Full keyboard accessibility

### 4.5 General Motion

- Page transitions
- Scroll-triggered reveals
- Animated navigation indicators
- Card hover effects
- Button feedback
- Loading-state polish

Avoid unnecessary loading screens or animations that delay navigation.

---

## 5. Featured Project Content

### 5.1 GeoVis — Kohola Data Solutions

**Category:** Professional AI Engineering  
**Status:** In development  
**Role:** AI Software Engineer

**Description:**

Migrating an existing cloud-hosted seismic visualization web application into an installable desktop application with local AI inference.

The original application uses online LLM services, including Gemini. The target application runs locally on the user's computer, using Ollama for local AI capabilities.

**Actual responsibilities:**
- Work within an architecture originally developed by others.
- Adapt the application for local desktop execution.
- Replace cloud LLM dependencies with local Ollama-based inference.
- Package the software into an installable desktop application.
- Use Replit in the AI-assisted development process.

**Presentation:**
- One seismic-map cover image, only if explicitly approved.
- Otherwise use a clearly labeled conceptual placeholder.
- High-level cloud-to-local comparison.
- Clear explanation of individual contributions.
- No proprietary source code or internal system details.

**Important:** The migration is ongoing. Do not describe target functionality as already delivered without confirmation.

### 5.2 NeonSynth

**Category:** Creative Software Engineering  
**Status:** In development  
**Type:** VST3 synthesizer project  
**Development environment:** Ableton Live

**Description:**

A custom software synthesizer project for electronic music production, exploring sound synthesis, modulation, and audio-plugin development.

**Initial project page:**
- Strong visual showcase
- Actual approved screenshots when available
- Technical overview
- Development status
- Reserved space for future interactive synth

**Future enhancement: NeonSynth Web Playground**

Create a dedicated browser-compatible integration of NeonSynth that preserves the original synthesizer's behavior as closely as practical.

Potential features:
- Browser audio engine
- Playable piano keyboard
- Oscillator and modulation controls
- Presets
- Waveform and spectrum visualization
- Touch-friendly controls
- Audio performance safeguards

**Critical requirement:** Do not build a fake synthesizer or unrelated demo merely to simulate NeonSynth.

The existing VST3 cannot run directly in a normal browser. Future integration requires a compatible DSP port or implementation. The technical strategy must be determined from the actual NeonSynth codebase.

**Initial launch:** Project page and future integration area only. Do not implement the browser synth in the first release.

### 5.3 TitanForge Studio

**Category:** Agentic AI / Game Development Tools  
**Status:** Early prototype

**Description:**

An experimental AI-powered game development workspace exploring collaboration between specialized AI agents.

**Initial presentation:**
- Project title and concept
- Early-prototype status
- Brief design vision
- Conceptual visual if real screenshots are unavailable

Do not imply planned capabilities are implemented.

Detailed technical documentation, demonstrations, and feature breakdowns will be added after the project matures.

### 5.4 Swordbound: Protocol

**Category:** Professional Game Development  
**Status:** Unreleased  
**Role:** Technical Artist and Gameplay Contributor  
**Technology:** Unreal Engine / Niagara / Sequencer

**Responsibilities:**
- Created and implemented Niagara VFX systems.
- Created, imported, and implemented shaders.
- Imported and implemented sound effects.
- Fixed lighting issues.
- Optimized graphics for mobile hardware.
- Fixed animation issues.
- Created cinematics using Unreal Sequencer.
- Animated cinematic cameras and added scene effects.
- Designed and developed selected gameplay mechanics.

**Trailer:**
https://www.youtube.com/watch?v=lIJIB93M_BQ

The official trailer was produced by a third party and showcases the game generally. It must not be presented as Brady's own cinematic work.

The actual technical-art contributions appear in the game itself.

Use approved in-game captures to demonstrate individual contributions if available.

---

## 6. Experience and Technology Sections

### Experience

Lead with Kohola Data Solutions and the AI Software Engineer role.

Include Swordbound: Protocol technical-art experience.

Additional employment history, education, dates, and accomplishments must be verified against an updated résumé or confirmed by Brady.

Do not fabricate titles, employers, dates, or metrics.

### Technology stack

**Confirmed experience and tools:**
- Ollama
- Replit
- Claude Code
- OpenAI Codex
- Gemini / Google Antigravity
- Unreal Engine
- Niagara
- Sequencer
- VST3 development
- Ableton Live

Distinguish AI development tools from AI runtime technologies.

Do not list programming languages, frameworks, or libraries as personal skills without verification.

---

## 7. Contact and Résumé

Use direct contact links rather than a contact form.

Include:
- Email link — address to be supplied
- GitHub profile — URL to be supplied
- LinkedIn — https://www.linkedin.com/in/brady-dorsey-9a582279
- Downloadable PDF résumé — file to be supplied

Provide accessible external links and clear download labeling.

Do not invent missing contact information or résumé content.

---

## 8. Technical Architecture

### Recommended stack

- Next.js with App Router
- TypeScript
- Tailwind CSS
- Motion for React
- React Three Fiber / Three.js for the hero
- React Flow for workflow visualization, if justified
- cmdk for the command palette
- MDX or typed local content for project case studies
- Netlify for preview and production deployment
- GitHub for source control and CI

Prefer static generation for portfolio content wherever practical.

Keep heavy interactive features dynamically loaded and isolated.

### Code organization

Separate:
- Content and project data
- Layout and navigation
- Design-system components
- Motion components
- 3D components
- Project templates
- Future NeonSynth integration module
- Tests and configuration

Use reusable components rather than duplicating page implementations.

Avoid unnecessary backend services.

---

## 9. Quality Requirements

### Performance

- Target Lighthouse Performance score of 90+ on representative pages.
- Target Accessibility, Best Practices, and SEO scores of 95+.
- Optimize images and video previews.
- Lazy-load heavy visual components.
- Keep core content available without WebGL.
- Avoid layout shifts.
- Monitor mobile bundle size and interaction responsiveness.

Scores are targets, not guarantees.

### Accessibility

- Semantic headings and landmarks
- Keyboard-accessible navigation
- Visible focus indicators
- Adequate contrast
- Screen-reader labels
- Reduced-motion support
- Touch-friendly controls
- Responsive layouts
- Accessible command palette and workflow diagram

### SEO

- Unique page titles and descriptions
- Open Graph metadata
- Sitemap and robots.txt
- Canonical URLs
- Structured data where appropriate
- Descriptive image alternatives
- Preserve or redirect important existing URLs

### Security

- No secrets in the public repository
- No proprietary Kohola code or screenshots without permission
- Dependency auditing
- Safe external-link handling
- Minimal third-party scripts
- Appropriate security headers
- Automated tests and manual verification

---

## 10. GitHub and Deployment Strategy

Create a public GitHub repository for the portfolio.

Use:
- Clear README
- Documented setup commands
- Feature branches
- Pull requests where appropriate
- Automated linting, type checks, tests, and builds
- Netlify deploy previews

**Critical production safeguard:**

The existing website at `bradydorsey.dev` must remain live and unchanged during development.

Do not modify its DNS, production Netlify configuration, domain assignment, or production deployment without explicit authorization.

The new website should be reviewed through local development and isolated preview deployments.

Before launch:
1. Audit existing URLs.
2. Back up existing site content and configuration.
3. Verify all assets and permissions.
4. Test the new website.
5. Prepare redirects and rollback instructions.
6. Obtain explicit approval.
7. Deploy to production using a controlled migration process.

---

## 11. Development Milestones

| Phase | Deliverable |
|---|---|
| 0 | Discovery, asset inventory, existing-site audit |
| 1 | Repository, framework, design tokens, CI |
| 2 | Responsive homepage and navigation |
| 3 | Four project pages and content system |
| 4 | Interactive AI workflow |
| 5 | 3D hero and motion system |
| 6 | Command palette |
| 7 | Résumé, contact, SEO, accessibility |
| 8 | Testing, performance, security, polish |
| 9 | Netlify preview and launch-readiness report |
| Future | NeonSynth browser playground |
| Separate approval | Production migration to bradydorsey.dev |

Each milestone requires testing and review before proceeding.

---

## 12. Outstanding Inputs

Before final production publication, collect:

- GitHub profile URL
- Public contact email
- Updated résumé PDF
- Confirmed employment dates and education
- Actual NeonSynth screenshots
- TitanForge prototype screenshots when ready
- Approved Swordbound game captures, if available
- Kohola approval for public project details and map image
- Current Netlify configuration and existing URL inventory

Missing information should remain explicitly marked as pending rather than invented.

---

## 13. Definition of Done

The portfolio is launch-ready when:

- The visual design is consistent and responsive.
- All four featured projects are represented accurately.
- The AI engineering workflow is interactive and understandable.
- The 3D hero works with appropriate fallbacks.
- The command palette works on desktop.
- All links and navigation function correctly.
- The résumé is available if supplied.
- Tests and security checks pass.
- Accessibility and performance targets have been evaluated.
- The public repository contains no sensitive information.
- The Netlify preview has been reviewed and approved.
- Production deployment remains blocked pending explicit authorization.

**End of Design Specification — Version 1.0**
