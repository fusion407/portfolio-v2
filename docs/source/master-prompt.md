# CODEX MASTER PROMPT
## Brady Dorsey — Portfolio 2.0

You are acting as a senior software architect, frontend engineer, UI/UX designer, and technical project lead.

Your assignment is to create a modern, interactive personal portfolio for Brady Dorsey.

**Important: Do not begin implementing immediately. Start with discovery, architecture, and milestone planning. Wait for explicit approval before writing application code.**

The project will be developed incrementally with human review between milestones.

---

# 1. Project Objective

Build a premium, futuristic portfolio website for:

**Brady Dorsey**  
**AI Engineer & Builder of Things**  
**Domain:** https://www.bradydorsey.dev/

The website should demonstrate expertise in AI-assisted software engineering, local AI integration, agentic workflows, creative software, and game development.

The site must be polished enough to serve as a professional engineering portfolio while also showcasing creativity and technical ambition.

The primary headline is:

**"I build things."**

The website should feel like a carefully engineered software product, not a generic developer portfolio template.

---

# 2. Source of Truth

The accompanying **Portfolio 2.0 Product Requirements & Design Specification, Version 1.0** is the authoritative project specification.

Before implementation:

1. Read the complete specification.
2. Identify any ambiguous or missing requirements.
3. Review the existing website if accessible.
4. Review available assets and content.
5. Propose an implementation architecture.
6. Create the development milestone plan.
7. Present the plan for approval.

Do not silently invent biographical information, technical achievements, employment dates, or project capabilities.

If a requirement conflicts with the specification, ask for clarification.

Maintain the approved specification as the project's source of truth.

---

# 3. Creative Direction

## Theme

Dark, futuristic, creative, and professional.

Use these colors as starting design tokens:

- Background: `#080B14`
- Surface: `#121B30`
- Elevated surface: `#1B2440`
- Purple accent: `#7357F5`
- Cyan accent: `#38BDF8`
- Primary text: `#F1F5FF`
- Secondary text: `#9DABCF`

## Visual qualities

- Modern typography
- Generous whitespace
- Sophisticated animation
- Smooth scrolling interactions
- Subtle gradients and illumination
- Responsive cards
- Premium project presentations
- Carefully controlled glass effects
- Consistent design tokens

Avoid:
- Generic portfolio templates
- Excessive neon glow
- Unnecessary loading screens
- Heavy animations that impair performance
- Visual effects that obscure content
- Decorative UI with no functional purpose

The desired balance is approximately 80% clean professional design and 20% experimental interactive design.

---

# 4. Technical Stack

Recommended technologies:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Motion for React
- Three.js / React Three Fiber
- React Flow where justified
- cmdk
- MDX or typed local content
- Netlify
- GitHub Actions

Before implementation, verify current compatibility, especially Next.js deployment on Netlify.

Prefer maintainability, performance, and simplicity over unnecessary dependencies.

Use static generation where practical.

The site should not require a custom backend for its initial release.

---

# 5. Site Structure

Implement these routes:

- `/`
- `/projects`
- `/projects/geovis`
- `/projects/neonsynth`
- `/projects/titanforge-studio`
- `/projects/swordbound-protocol`
- `/resume`

Include a branded 404 page.

The homepage must contain:

1. Hero
2. Featured projects
3. Interactive AI development workflow
4. Professional experience
5. Technology stack
6. About
7. Contact

All sections must be fully responsive.

---

# 6. Homepage Hero

Build an animated, interactive hero with the headline:

**I build things.**

Supporting identity:

**AI Engineer & Builder of Things**

Include a short professional description, navigation actions, and a signature 3D background.

The 3D visual should represent interconnected ideas, software systems, and AI agents.

Requirements:

- Gentle animated nodes and connections
- Cursor interaction
- Subtle lighting
- Smooth movement
- Good mobile performance
- Reduced-motion support
- Static fallback if WebGL is unavailable

The hero text must remain readable even when the 3D component fails.

---

# 7. Featured Projects

Implement a reusable project card and case-study system.

## GeoVis

Professional project at Kohola Data Solutions.

Brady is working within an existing architecture to migrate a cloud-hosted seismic visualization web application into an installable desktop application.

The existing system uses online LLMs, including Gemini.

The target application uses Ollama for local AI inference on the user's computer.

Brady is responsible for:
- Cloud-to-local AI migration
- Local AI integration
- Desktop application adaptation
- Desktop packaging

Status: In development.

Do not imply he created the original architecture.

Do not publish proprietary screenshots, code, or technical details without permission.

Use a conceptual placeholder for the seismic map unless an approved asset is supplied.

## NeonSynth

A custom VST3 synthesizer project developed for use with Ableton Live.

Status: In development.

Create a premium project showcase with a future browser-playground integration area.

Do not implement the browser synthesizer in the initial release.

The future integration must aim to preserve the real NeonSynth's synthesis behavior, rather than substituting an unrelated demo.

Build the page so a browser-compatible synth module can be integrated later without redesigning the entire page.

## TitanForge Studio

An AI-powered game development workspace exploring specialized AI agent collaboration.

Status: Early prototype.

Keep the initial description concise.

Do not claim that planned functionality is already implemented.

Allow the case study to expand as development progresses.

## Swordbound: Protocol

Unreleased mobile sword-fighting game.

Brady's contributions:
- Niagara VFX
- Shaders and materials
- SFX implementation
- Lighting fixes
- Mobile graphics optimization
- Animation fixes
- Unreal Sequencer cinematics
- Camera animation and scene FX
- Selected gameplay mechanics

Official trailer:
https://www.youtube.com/watch?v=lIJIB93M_BQ

The trailer was created by a third party.

It may be used as context for the game, but must not be presented as footage of Brady's individual work.

Use approved in-game captures if available.

---

# 8. Interactive AI Engineering Workflow

Build an interactive visualization of Brady's real development methodology.

Stages:

1. Brainstorm with AI
2. Iterate and refine requirements
3. Architect the complete system
4. Plan sequential milestones
5. Generate a comprehensive master prompt
6. Implement with AI coding agents
7. Manually test and run automated tests
8. Provide feedback and refine

The visualization must demonstrate that testing and feedback form a continuous loop.

Visitors should be able to click or select each stage to read additional information.

Use accessible controls and provide a readable nonanimated representation.

The content must emphasize human direction, engineering judgment, and verification.

Do not portray AI-generated code as automatically secure or production-ready.

---

# 9. Command Palette

Implement a keyboard-accessible command palette.

Shortcuts:
- Ctrl+K
- Cmd+K

Features:
- Search projects
- Navigate to sections
- Open external professional profiles
- Access résumé
- Escape to close
- Keyboard navigation
- Accessible focus management

---

# 10. Experience and Contact

Lead with the Kohola Data Solutions AI Software Engineer experience.

Include professional technical-art experience from Swordbound: Protocol.

Use confirmed details only.

Contact must use direct links:
- Email
- GitHub
- LinkedIn

No contact form.

Include a downloadable résumé PDF once supplied.

Do not fabricate missing information.

---

# 11. GitHub Requirements

The website source code will be hosted in a **public GitHub repository**.

Before creating the repository, ask the user to confirm:
- Repository name
- GitHub account
- Whether to create a new repository or use an existing one

Include:
- Professional README
- Installation instructions
- Development commands
- Build instructions
- Project architecture overview
- Testing instructions
- License decision
- Git ignore rules
- CI configuration

Use clear commits and logical feature branches.

Never commit:
- API keys
- Credentials
- Private files
- Proprietary company assets
- Unapproved screenshots
- Sensitive environment variables

Do not assume all portfolio content is freely redistributable just because the repository is public.

---

# 12. Netlify Deployment

The existing website is hosted on Netlify and uses:

https://www.bradydorsey.dev/

**Do not modify the existing live website.**

During development:
- Work locally.
- Use isolated Netlify preview deployments.
- Do not attach the production domain to the new site.
- Do not change DNS.
- Do not modify the current production deployment.
- Do not trigger an unintended production deployment.

Before eventual launch:
- Audit current site URLs.
- Back up current deployment configuration.
- Prepare redirects.
- Verify HTTPS and canonical domain behavior.
- Prepare rollback instructions.
- Obtain explicit user approval.

Production migration is a separate future task.

---

# 13. Quality Standards

## Performance

Aim for:
- Lighthouse Performance 90+
- Accessibility 95+
- Best Practices 95+
- SEO 95+

Test representative pages on desktop and mobile.

Optimize:
- Images
- Fonts
- Animation performance
- JavaScript bundle size
- WebGL loading
- Layout stability

## Accessibility

Implement:
- Semantic HTML
- Keyboard navigation
- Visible focus indicators
- Reduced-motion support
- Adequate contrast
- Accessible interactive diagrams
- Touch-friendly interfaces
- Screen-reader labels

## Security

Use:
- Dependency auditing
- Safe external links
- Minimal third-party scripts
- Appropriate security headers
- No exposed secrets
- Automated testing
- Manual review

Do not claim that passing automated tests guarantees software is free of vulnerabilities.

---

# 14. Required Development Milestones

Create and maintain a milestone tracking document.

Each milestone must include:
- Objective
- Scope
- Files/components affected
- Dependencies
- Implementation steps
- Testing requirements
- Acceptance criteria
- Completion status

## Milestone 0 — Discovery and Architecture

Review the design specification, existing website, available assets, and deployment constraints.

Produce:
- Proposed architecture
- Dependency plan
- Component hierarchy
- Content inventory
- Route structure
- Risk assessment
- Updated milestones

**Stop for approval before implementation.**

## Milestone 1 — Foundation

- Initialize Next.js and TypeScript.
- Configure Tailwind.
- Establish design tokens.
- Create reusable component structure.
- Configure linting, formatting, testing, and CI.
- Prepare repository documentation.

Acceptance: Clean build, type checks, and baseline tests pass.

## Milestone 2 — Homepage and Navigation

- Implement responsive layout.
- Create hero content.
- Build navigation.
- Create homepage sections.
- Implement footer.
- Establish reusable cards and typography.

Acceptance: Homepage works across target viewport sizes without advanced visual effects.

## Milestone 3 — Project Showcase System

- Create project listing.
- Implement reusable project templates.
- Add GeoVis.
- Add NeonSynth.
- Add TitanForge Studio.
- Add Swordbound: Protocol.
- Add status indicators and approved media.

Acceptance: All pages render accurately with no fabricated content.

## Milestone 4 — AI Workflow Visualization

- Implement interactive stages.
- Add descriptions.
- Create validation feedback loop.
- Support keyboard and touch interactions.
- Add reduced-motion behavior.

Acceptance: All stages are usable and understandable without animation.

## Milestone 5 — 3D Hero and Motion

- Implement interactive node network.
- Add ambient animation.
- Add cursor response.
- Add fallback rendering.
- Optimize mobile performance.

Acceptance: No major performance regression or accessibility failure.

## Milestone 6 — Command Palette

- Implement Ctrl/Cmd+K.
- Add navigation actions.
- Add project search.
- Add accessibility support.

Acceptance: Fully functional with keyboard and pointer.

## Milestone 7 — Professional Content and SEO

- Add confirmed experience details.
- Add contact links.
- Integrate résumé when supplied.
- Add metadata.
- Add sitemap.
- Add social sharing metadata.
- Check old URL compatibility.

Acceptance: Content and metadata validated.

## Milestone 8 — Quality Assurance

- Run automated tests.
- Run dependency audits.
- Perform accessibility checks.
- Evaluate Lighthouse performance.
- Test mobile layouts.
- Review broken links.
- Check animation fallbacks.
- Review repository for sensitive information.

Acceptance: Critical issues resolved and remaining limitations documented.

## Milestone 9 — Preview and Launch Readiness

- Produce an isolated Netlify preview.
- Verify all pages and interactions.
- Create launch checklist.
- Document migration procedure.
- Document rollback procedure.
- Request user approval.

**Do not deploy to the production domain.**

## Future Milestone — NeonSynth Web Playground

Deferred until the user supplies the relevant synthesizer source code and authorizes development.

Determine the appropriate browser-compatible audio architecture.

Preserve the original NeonSynth behavior wherever technically feasible.

Potential technologies include Web Audio, AudioWorklet, or a WebAssembly port.

This milestone is explicitly excluded from the initial launch scope.

---

# 15. Agent Development Rules

Follow these principles throughout the project:

1. Maintain the complete product vision.
2. Work sequentially through approved milestones.
3. Avoid unnecessary architectural changes.
4. Explain significant technical decisions.
5. Prefer reusable components.
6. Keep code readable and maintainable.
7. Run tests after meaningful changes.
8. Never mark unfinished work as complete.
9. Document limitations and unresolved issues.
10. Preserve the existing live website.
11. Ask before taking irreversible actions.
12. Never invent professional credentials or project achievements.

At the completion of each milestone, report:

- What was implemented
- Files changed
- Tests executed
- Results
- Known issues
- Next milestone

Pause for user review before advancing to the next milestone unless the user explicitly authorizes a different workflow.

---

# 16. First Response Required from Codex

When receiving this prompt, do not immediately generate application code.

Instead:

1. Confirm understanding of the portfolio vision.
2. Review the attached design specification.
3. Identify missing information and assets.
4. Propose the project architecture.
5. Present the milestone plan.
6. Identify technical risks and performance considerations.
7. Explain the GitHub and Netlify preview strategy.
8. Ask for approval to begin Milestone 1 after discovery is complete.

The goal is to build a cohesive, premium, technically impressive portfolio through deliberate architecture, AI-assisted implementation, and human-led validation.

**END OF MASTER PROMPT**
