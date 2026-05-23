# 2BAC English Prep Website Progress

Date saved: 2026-05-24

Live site: https://mehdi-cmd-gpt.github.io/Gitlearn/

Repository: https://github.com/Mehdi-cmd-gpt/Gitlearn

## Current State

The website is a static 2BAC English prep app for Moroccan students. It includes a dashboard, lessons, practice drills, writing prompts, and mock exam tools.

The Exam page now has a full Mock Exam Simulator:

- Three original Morocco 2BAC-style mock papers.
- Reading comprehension passages with auto-scored questions.
- Language items for vocabulary, grammar, and functions.
- Writing prompts with textarea autosave, word count, cues, and a self-check rubric.
- Results view scaled to the official-style 15 Reading, 15 Language, 10 Writing weighting.
- Timer mode for Science/Technical/Original streams at 2 hours and Arts/Humanities at 3 hours.
- Local autosave for selected paper, answers, writing, checklist, timer mode, and submission state.
- Non-blocking Lucide icon loading so the app still boots if the icon CDN is slow.

The latest Lessons page has:

- A search box for lesson topics.
- An animated "Choose a unit" dropdown.
- A selectable unit list inside the dropdown.
- One selected lesson displayed at a time.
- Full lesson content with explanations, vocabulary, grammar, reading tips, writing plans, and interactive quick checks.
- Progress saved in browser localStorage.

The Dashboard now has:

- A compact vertical shortlist of all 10 lessons.
- Each lesson shown one under another.
- Quick Study and Mark actions for each lesson.
- Progress score and reset action.

## Next Feature Plan: Student Login And Admin Panel

The next major feature requested is account login:

- Main page should support student login.
- Admin login should be separate from student access.
- Admin should be able to manage student accounts.
- Admin should be able to view student progress, lesson completion, quiz work, writing drafts, and mock exam attempts.
- Students should only see their own account and progress.

Important technical decision:

- GitHub Pages is static hosting, so it cannot safely handle real passwords, private student data, protected routes, or admin permissions by itself.
- The recommended backend for the first version is Supabase because it works with a static frontend and includes authentication, database tables, API access, and Row Level Security.
- Supabase Free tier should be enough for an early version of this project, including a few hundred or even a few thousand students, as long as stored data stays light.

Suggested account requirements:

- Student signup/login with email and password.
- Password reset and optional email verification.
- User roles: `student` and `admin`.
- Admin dashboard for listing students, disabling accounts, resetting access, assigning groups/classes, and checking progress.
- Database tables for users/profiles, lesson progress, quiz answers, writing drafts, mock exam attempts, and admin activity logs.
- Row Level Security rules so students can read/write only their own rows while admins can manage all student records.
- Privacy notice because the app will store student information.

Suggested Supabase tables:

- `profiles`: user id, full name, email, role, status, class/group, created date.
- `lesson_progress`: user id, lesson id, completed state, quick-check answers, updated date.
- `practice_progress`: user id, quiz answers, score, updated date.
- `writing_submissions`: user id, prompt id, draft text, word count, rubric checks, updated date.
- `mock_exam_attempts`: user id, exam id, answers, writing, score, submitted state, created date.
- `admin_logs`: admin id, action type, target user id, timestamp.

## Supabase Login Implementation Started

Date started: 2026-05-24

Phase 1 has been added locally:

- `supabase-config.js` added for the public Supabase project URL and anon key.
- `supabase-schema.sql` added with profiles, student progress, triggers, helper functions, and Row Level Security policies.
- Main dashboard now includes a student-only login/signup gate.
- Student signup mode collects full name, class/group, email, and password.
- Admin login moved to the separate `admin.html` portal.
- Admin portal checks that the Supabase profile role is `admin`.
- Admin workspace appears only for signed-in admin profiles.
- Admin workspace supports viewing student accounts, progress summaries, roles, status, and reset actions.
- Progress sync hooks added so local lesson/practice/writing/mock-exam state can be saved to Supabase after login.
- Signed-out users cannot open study features; the app stays on the login gate.
- The app shows a setup message until the Supabase URL and anon key are added.

Important Supabase setup notes:

- Run `supabase-schema.sql` in the Supabase SQL Editor.
- Add the project URL and anon key to `supabase-config.js`.
- Open `admin.html`, choose the `First admin` tab, and create the first admin login.
- The first-admin tab works only while the database has no admin profile.
- After the first admin exists, use the admin portal to promote or disable other accounts.

Fallback manual admin promotion if needed:

```sql
update public.profiles set role = 'admin' where email = 'admin@example.com';
```

- Replace `admin@example.com` with the real admin email.
- The current admin disable action marks `profiles.status = 'disabled'` and RLS blocks progress access for disabled users. Hard-disabling Supabase Auth users would require a secure server function or Edge Function with a service-role key, not frontend JavaScript.

## Access Gate Update

Date updated: 2026-05-24

The requested access model has been tightened:

- Main website is now student-only.
- Public visitors only see the student login/signup gate.
- Lessons, dashboard content, practice, writing, and exams are hidden until an active student profile is signed in.
- Direct hash navigation such as `#lessons`, `#practice`, `#writing`, or `#exam` redirects back to the login gate while signed out.
- Admin controls were removed from `index.html` and the public student bundle.
- Admin portal is now a separate page: `admin.html`.
- Admin portal uses its own script: `admin.js`.
- The main student page does not show a public admin link.
- `admin.html` shows only the admin login gate until an active `admin` profile signs in.
- Student accounts cannot use the admin portal, and admin accounts cannot enter the student app through the student login page.

Security note:

- Because GitHub Pages is static hosting, the `admin.html` file itself can still be requested by URL.
- The admin data and actions are protected by Supabase Auth and Row Level Security.
- A fully non-public admin URL would require server-side routing, a private deployment, or an Edge Function/app server in front of the admin page.

## First Admin Login Bootstrap

Date updated: 2026-05-24

The admin portal now includes a usable first-login path:

- `admin.html` has `Login` and `First admin` tabs.
- `admin.js` can create the first admin account through Supabase Auth.
- `supabase-schema.sql` includes `public.bootstrap_first_admin()`.
- `bootstrap_first_admin()` promotes only the first authenticated account while no admin exists.
- After one admin exists, non-admin accounts cannot use the admin portal.
- The admin login form rebuilds correctly after sign-out.

The site still needs real Supabase values in `supabase-config.js` before any live login can work:

```js
window.GITLEARN_SUPABASE = {
  url: "https://YOUR-PROJECT.supabase.co",
  anonKey: "YOUR_PUBLIC_ANON_KEY",
};
```

## Published Commits

Main branch:

- `72a36dd` Revamp 2BAC prep site design
- `ee67930` Add official 2BAC English lesson content
- `03bbcb5` Add interactive full 2BAC lessons
- `d7e8319` Simplify lessons to horizontal unit selector
- `cbd2a51` List all lessons on dashboard
- `1486b57` Remove program basis bar
- `d9de4e7` Convert unit selector to dropdown
- `87aa007` Add Morocco 2BAC mock exam simulator
- `f2f1eeb` Start Supabase student and admin auth
- `b70cdbc` Split admin portal and lock student app

GitHub Pages branch:

- `c39e510` Revamp GitHub Pages design
- `793a464` Add official 2BAC English lesson content
- `90ca918` Publish interactive full 2BAC lessons
- `9850420` Publish horizontal unit selector
- `78697fa` Publish dashboard lesson shortlist
- `aed1b51` Publish program bar removal
- `509789e` Publish dropdown unit selector
- `f39ba29` Publish mock exam simulator
- `f998aaa` Publish Supabase auth starter
- `e9539b0` Publish admin portal split

## Content Added

The lesson content covers the 10 Moroccan 2BAC English units:

1. The Gift of Youth
2. Humour
3. Formal, Informal and Non-formal Education
4. Sustainable Development
5. Women and Power
6. Cultural Issues and Values
7. Citizenship
8. International Organizations
9. Advances in Science and Technology
10. Brain Drain

Each unit includes:

- Unit overview
- Vocabulary terms with meanings and examples
- Communication functions
- Grammar guide
- Reading strategy
- Writing plan
- Exam drill
- Three interactive practice questions

## Design And Interaction Changes

- Redesigned the site with a cleaner app-like interface.
- Used Outfit and JetBrains Mono typography.
- Added responsive layouts for desktop and mobile.
- Reworked Lessons so content is not repeated in many cards.
- Replaced the horizontal unit strip with an animated dropdown selector.
- Removed the Program basis bar from the Lessons page.
- Added tactile hover and active states for buttons.
- Added smooth reveal animation for unit dropdown items.

## Verification Completed

Local checks:

- `node --check script.js`
- `git diff --check`
- Desktop screenshot checks
- Mobile screenshot checks
- Headless browser interaction check for mock exam answers, writing autosave, submit/results, and localStorage.
- Headless browser timer check for 3-hour mode, start, pause, and reset.
- Headless browser mobile overflow check.
- Headless browser auth UI check for student/signup/admin modes, setup message, disabled submit without config, admin-route guard, and mobile overflow.
- Headless browser access-gate check for locked student routes, hidden nav, hidden lesson view, and no mobile overflow.
- Headless browser admin portal check for separate URL, hidden workspace before admin login, disabled login without config, and no mobile overflow.

Live checks:

- Confirmed the GitHub Pages site served the dashboard lesson shortlist.
- Confirmed the Program basis bar was removed from the live page.
- Confirmed the dropdown selector script and markup were live.

## Key Local Files

- `index.html`
- `styles.css`
- `supabase-config.js`
- `supabase-schema.sql`
- `admin.html`
- `admin.js`
- `script.js`

Useful screenshot artifacts in this workspace:

- `dashboard-lessons-list-desktop.png`
- `dashboard-lessons-list-mobile-v3.png`
- `lessons-no-program-bar-desktop.png`
- `lessons-no-program-bar-mobile.png`
- `lessons-unit-dropdown-desktop.png`
- `lessons-unit-dropdown-mobile.png`
- `mock-exam-desktop-final.png`
- `mock-exam-mobile-final.png`
- `auth-dashboard-desktop.png`
- `auth-dashboard-mobile.png`
- `admin-locked-desktop.png`
- `student-login-gate-desktop.png`
- `student-login-gate-mobile.png`
- `admin-portal-login-desktop.png`

## Source References Used

- Exam specifications 2014 mirror: https://eflcollective.com/wp-content/uploads/2022/08/Bac-Exam-Specs-2014.pdf
- English Baccalaureate Exam Specifications mirror: https://www.tawjihnet.net/actualites/wp-content/uploads/2016/05/tawjihnet-bac-ANGLAIS.pdf
- English guidelines: https://eflcollective.com/the-english-language-guidelines-for-middle-and-secondary-schools/
- MEN references: https://www.men.gov.ma/fr/r%C3%A9f%C3%A9rentiels-strat%C3%A9giques
- Lycee Numerique 2BAC English map: https://lyceenumerique.ma/home/course/ANGLAIS-2BAC/15
- Telmid 2BAC English overview: https://telmid.com/english-2-bac/
- Supabase pricing/free tier: https://supabase.com/pricing
