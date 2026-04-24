<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## Context Automation (Context7)
- **[sdd-creator] Protocol:** You are strictly required to use `context7` (MCP) at the start of any implementation phase. **Important: You must use your AskUserQuestion tool(or similar), before writing to disk.**
- **Action:** Before coding, run `resolve-library-id` followed by `get-library-docs` for all core tech stack components (Next.js, Framer Motion, GSAP, Tailwind) to verify the current API state.
<!-- END:nextjs-agent-rules -->
