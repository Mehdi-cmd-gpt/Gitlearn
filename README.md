# Morocco 2BAC English Exam Prep

A complete static study website for Moroccan 2nd Year Baccalaureate English exam preparation.

The content is original, student-friendly, and exam-focused. It summarizes only English lessons commonly needed for Moroccan Bac preparation: themes, grammar, vocabulary, functions, writing, reading strategy, practice exercises, mock exam-style sets, and final revision.

## What Is Included

- Homepage with progress tracking
- Units and lessons page
- Grammar summary page
- Vocabulary summary page
- Functions and communication page
- Writing guide page
- Exam strategy page
- Practice exercises page
- Practice section now includes 10 vocabulary, 10 grammar, 10 functions, 10 writing prompts, and 10 mock exam-style sets
- Final revision checklist page
- Printable/downloadable Markdown study guide
- Dark mode
- Homepage-only search and section filter across Units, Grammar, Vocabulary, Functions, Writing, Strategy, Practice, Checklist, and Guide
- Section progress cards for each lesson page
- Jump-to-lesson mini index on long pages
- Exam priority badges for high-frequency lessons
- Back-to-top button on long pages
- Mark as revised using local storage
- Print this lesson buttons

## Important Academic Note

This project does not copy textbook pages or copyrighted content. It uses original summaries based on common Moroccan 2BAC English themes and exam skills.

If you need official exam specifications, coefficients, timing, or current exam rules, verify them with the latest official Ministry of National Education or CNE documents. This project intentionally avoids inventing official rules.

## How To Run

Because the app loads JSON files from the `content` folder, open it through a local web server.

From this folder:

```powershell
python -m http.server 4173
```

Then open:

```text
http://localhost:4173
```

If Python is not available, any simple static server works.

## Project Structure

```text
.
├── index.html
├── README.md
├── study-guide.md
├── assets
│   ├── app.js
│   └── styles.css
└── content
    ├── functions.json
    ├── grammar.json
    ├── practice.json
    ├── site.json
    ├── themes.json
    └── writing.json
```

## How To Update Content

Edit the JSON files in `content`.

- `themes.json`: unit and vocabulary lessons
- `grammar.json`: grammar rules, examples, mistakes, exercises
- `functions.json`: communication functions and dialogues
- `writing.json`: writing formats and samples
- `practice.json`: exercises, answer keys, and mock sets
- `site.json`: exam structure, reading strategy, and revision checklist

Each content item has an `id`, `type`, and `title`. Keep IDs unique because local storage uses them to track revised lessons.

## Printing and PDF

Use the `Print this lesson` button on any lesson card to print only that lesson.

The file `study-guide.md` is a compact PDF-ready guide. Open it in any Markdown editor or browser extension and print/export to PDF.

## Target Students

- Science streams
- Technical streams
- Economics streams
- Arts and humanities streams
- Original education streams
- Any Moroccan 2nd year Bac student preparing for English written exams
