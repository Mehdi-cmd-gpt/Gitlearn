# Morocco Bac English Revision

A static, mobile-first revision dashboard for Moroccan 2nd Year Baccalaureate English exam preparation.

The site is focused only on English exam preparation: reading comprehension, grammar, vocabulary, communication functions, writing, practice quizzes, mock exams and final revision.

## What Is Included

- Modern homepage dashboard
- Mobile sticky bottom navigation
- Lesson library with search and category filters
- Categories for Themes, Grammar, Vocabulary, Functions, Writing, Reading Strategy and Final Revision
- Local progress tracking using `localStorage`
- Mark-as-revised buttons for every lesson
- Progress percentage and section progress bars
- Dark mode toggle
- Printable lesson cards
- Printable final checklist
- Practice quizzes with answer explanations
- Writing prompts
- Mock exam-style practice sets
- 7-day final revision plan
- High-frequency vocabulary and connectors
- Common mistakes checklist

## Important Academic Note

This project does not copy textbook pages or copyrighted content. The lessons are original, short, exam-focused summaries based on common 2BAC English themes and exam skills.

If you need official coefficients, timing, exam specifications or new curriculum changes, verify them with the latest official Ministry/CNE documents before publishing.

## How To Run

Because this is a static client-side app, you can open `index.html` directly in a browser.

Recommended local server:

```powershell
python -m http.server 4173
```

Then open:

```text
http://localhost:4173
```

## Project Structure

```text
.
├── index.html
├── styles.css
├── script.js
└── README.md
```

## How To Update Lessons

Open `script.js` and edit the `lessons` array.

Each lesson has:

```js
{
  id: "unique-id",
  category: "grammar",
  title: "Lesson title",
  minutes: 20,
  summary: "Short exam-focused explanation",
  examExample: "Exam-style example",
  commonMistakes: ["Mistake 1", "Mistake 2"],
  miniPractice: "Short practice task",
  answerKey: "Correction or answer guidance",
  tags: ["search", "keywords"]
}
```

Supported categories:

- `theme`
- `grammar`
- `vocabulary`
- `function`
- `writing`
- `reading`
- `revision`

## How To Add Quiz Questions

Open `script.js` and edit the `quizQuestions` array.

```js
{
  type: "Grammar",
  q: "Question text",
  a: ["Choice A", "Choice B", "Choice C", "Choice D"],
  c: 1,
  exp: "Explanation shown after answering"
}
```

`c` is the zero-based index of the correct answer.

## How To Add Writing Prompts

Open `script.js` and add more text entries to `writingPrompts`.

## How To Add Mock Exams

Open `script.js` and add entries to `mockExams`:

```js
{
  title: "Mock Exam Title",
  tasks: [
    "Reading task",
    "Language task",
    "Writing task"
  ]
}
```

## Data and Privacy

No backend, database, login or Supabase is used. Student progress is saved only in the browser using `localStorage`.

## Deployment

This project can be deployed on GitHub Pages, Netlify, Vercel or any static hosting platform.
