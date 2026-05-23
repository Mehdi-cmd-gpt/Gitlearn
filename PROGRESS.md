# 2BAC English Prep Website Progress

Date saved: 2026-05-23

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

GitHub Pages branch:

- `c39e510` Revamp GitHub Pages design
- `793a464` Add official 2BAC English lesson content
- `90ca918` Publish interactive full 2BAC lessons
- `9850420` Publish horizontal unit selector
- `78697fa` Publish dashboard lesson shortlist
- `aed1b51` Publish program bar removal
- `509789e` Publish dropdown unit selector
- `f39ba29` Publish mock exam simulator

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

Live checks:

- Confirmed the GitHub Pages site served the dashboard lesson shortlist.
- Confirmed the Program basis bar was removed from the live page.
- Confirmed the dropdown selector script and markup were live.

## Key Local Files

- `index.html`
- `styles.css`
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

## Source References Used

- Exam specifications 2014 mirror: https://eflcollective.com/wp-content/uploads/2022/08/Bac-Exam-Specs-2014.pdf
- English Baccalaureate Exam Specifications mirror: https://www.tawjihnet.net/actualites/wp-content/uploads/2016/05/tawjihnet-bac-ANGLAIS.pdf
- English guidelines: https://eflcollective.com/the-english-language-guidelines-for-middle-and-secondary-schools/
- MEN references: https://www.men.gov.ma/fr/r%C3%A9f%C3%A9rentiels-strat%C3%A9giques
- Lycee Numerique 2BAC English map: https://lyceenumerique.ma/home/course/ANGLAIS-2BAC/15
- Telmid 2BAC English overview: https://telmid.com/english-2-bac/
