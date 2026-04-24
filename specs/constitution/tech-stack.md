# Project Constitution: Tech Stack

## Core Technologies
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Vanilla CSS for custom animations)
- **UI Components:** Shadcn UI

## Animation & Experience
- **GSAP (GreenSock):** For complex scroll-triggered animations and timelines.
- **Framer Motion:** For declarative UI transitions and spring physics.
- **Lenis:** For smooth scrolling across all browsers.
- **React Three Fiber:** (Optional) For 3D integrations like the ScrollSpiral.

## Media & Assets
- **Images:** High-resolution optimized assets (WebP/AVIF).
- **Icons:** Lucide React & Simple Icons.
- **Fonts:** Google Fonts (Inter, Playfair Display).

## Deployment & CI/CD
- **Hosting:** GitHub Pages.
- **CI/CD:** GitHub Actions (official Next.js workflow).

## AI & Context (MCP)
- **Context7:** Mandatory for real-time documentation retrieval.
  - **Rule:** Before implementing any new feature or using a third-party library (e.g., GSAP, Framer Motion, Next.js APIs), the `sdd-creator` agent **MUST** use `context7` to fetch the latest documentation and code examples. This ensures compliance with current API versions and prevents hallucinations.
