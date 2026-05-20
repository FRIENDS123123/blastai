# BlastAI — Project Memory

This file is your persistent context. Read it at the start of every session. When the user gives you instructions, follow these rules unless explicitly overridden.

## What we're building

BlastAI is a multi-channel marketing automation platform for Indian SMBs. Vision: one tool for email, WhatsApp, and SMS with AI personalization, priced for Indian businesses (₹599–₹3,499/mo).

**MVP scope (4 weeks):** Email channel only. WhatsApp and SMS appear on the landing page as "coming soon" with waitlist signups.
- Week 1: Foundation (auth, landing, dashboard shell)
- Week 2: Contacts + Templates (CSV upload, template editor)
- Week 3: Sending + Tracking (Resend integration, Claude personalization, BullMQ queue, webhooks)
- Week 4: Onboarding, plan limits, manual invoicing, first 3 paying customers

## Founder context

- Sinuu (Pruthviraj Pawar), non-technical founder, Chandigarh-based.
- Previous project AutoFlow AI failed due to over-ambitious scope and mock data. Lesson burned in: ship ONE real working feature at a time.
- Budget: under $5,000 total.
- Uses Windows 10 + PowerShell. Communicates via screenshots when stuck.

## Non-negotiable rules

1. **No mocks, no fakes, no placeholders presented as real.** If a feature isn't built, it shows "Coming [date]" — never fake data.
2. **No AutoFlow AI code or references.** This is a clean start.
3. **Windows PowerShell only.** Never use && to chain commands. Use ; or separate lines.
4. **No scope creep.** If a feature isn't in the current week's plan, add it to BACKLOG.md instead of building it.
5. **Stop and ask when blocked.** Don't loop trying random fixes. Two failed attempts = stop and surface to founder.
6. **Every commit message follows format:** `Day N: <what shipped>` (e.g., `Day 1: foundation deployed`).
7. **No secrets in code.** All API keys go in .env.local (gitignored) and Vercel env vars.

## Tech stack (locked — do not suggest alternatives)

- **Framework:** Next.js 14 (App Router, src/ directory, TypeScript)
- **Styling:** Tailwind CSS
- **Database + Auth:** Supabase (free tier)
- **Email sending:** Resend (Week 3)
- **AI personalization:** Anthropic Claude API, model `claude-sonnet-4-6` (Week 3, Pro-tier customers only)
- **Job queue:** BullMQ + Upstash Redis free tier (Week 3)
- **CSV parsing:** Papaparse (Week 2)
- **Hosting:** Vercel
- **Payments:** Razorpay (Month 2 — manual invoicing for first 5 customers in Week 4)
- **Icons:** lucide-react

## Project structure
blastai/
├── CLAUDE.md                    # this file
├── BACKLOG.md                   # parked feature ideas
├── README.md
├── .env.local                   # gitignored
├── .env.example                 # template, committed
├── src/
│   ├── app/
│   │   ├── (marketing)/         # landing page
│   │   ├── (auth)/              # login, signup, reset-password
│   │   └── (app)/               # dashboard, campaigns, contacts, templates, settings (protected)
│   ├── lib/
│   │   └── supabase/            # client.ts, server.ts
│   ├── components/
│   │   ├── ui/                  # shared components
│   │   ├── marketing/           # landing-only
│   │   └── app/                 # dashboard-only
│   └── middleware.ts            # auth session refresh

## Pricing tiers (for limits enforcement in Week 4)

- **Free:** 100 emails/mo, no AI personalization, BlastAI footer in emails
- **Starter (₹599/mo):** 5,000 emails/mo, no AI personalization, no footer
- **Pro (₹1,499/mo):** 25,000 emails/mo, AI personalization ON, priority sending
- **Business (₹3,499/mo):** unlimited emails (fair use 100K), AI personalization ON, multi-user

## Status
## Status

**Current:** Week 1, Day 2 — Supabase Auth implementation.

**Completed:**
- Day 1: Foundation deployed. Next.js 14 + Tailwind + Supabase clients + landing page (multi-channel pitch with WhatsApp/SMS waitlist) + placeholder routes + pricing table. Live at https://blastai-six.vercel.app. Repo: github.com/FRIENDS123123/blastai. Metadata fixed for production.

**Next:** Day 2 — Supabase Auth (signup, login, password reset, /dashboard protected route).
## How to work with me (the founder)

- Give numbered step-by-step instructions for anything requiring manual action outside the terminal.
- If a step needs me to create something (Supabase project, GitHub repo, Vercel env var), pause and wait for me to confirm done.
- Be brutally honest if I propose scope creep — push back, cite this CLAUDE.md.
- Treat Claude Code credits like cash. No exploratory rewrites without asking.
- End every day by updating the "Status" section of this CLAUDE.md and committing with `Day N: <summary>`.
