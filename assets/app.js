(function () {
  const contentFiles = {
    site: "content/site.json",
    themes: "content/themes.json",
    grammar: "content/grammar.json",
    functions: "content/functions.json",
    writing: "content/writing.json",
    practice: "content/practice.json?v=practice-10"
  };

  const state = {
    data: null,
    route: "home",
    search: "",
    type: "all",
    revised: new Set(JSON.parse(localStorage.getItem("bacEnglishRevised") || "[]")),
    printables: new Map()
  };

  const app = document.getElementById("app");
  const searchInput = document.getElementById("search-input");
  const typeFilter = document.getElementById("type-filter");
  const clearFilters = document.getElementById("clear-filters");
  const themeToggle = document.getElementById("theme-toggle");
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("main-nav");
  const toolbar = document.querySelector(".toolbar");
  const backToTop = document.getElementById("back-to-top");

  const priorityLessonIds = new Set([
    "grammar-tenses",
    "grammar-modals",
    "grammar-passive",
    "grammar-reported-speech",
    "grammar-conditionals",
    "grammar-relative-clauses",
    "grammar-connectors",
    "grammar-word-formation",
    "function-opinion",
    "function-advice",
    "function-cause-effect",
    "writing-paragraph",
    "writing-essay",
    "writing-formal-letter",
    "writing-email",
    "writing-article",
    "writing-report",
    "writing-opinion-essay",
    "writing-argumentative",
    "strategy-true-false",
    "strategy-wh",
    "strategy-vocab-context",
    "exam-reading-comprehension",
    "mock-1",
    "mock-2",
    "mock-3",
    "mock-4",
    "mock-5",
    "mock-6",
    "mock-7",
    "mock-8",
    "mock-9",
    "mock-10"
  ]);

  const savedTheme = localStorage.getItem("bacEnglishTheme") || "light";
  document.documentElement.dataset.theme = savedTheme;
  themeToggle.textContent = savedTheme === "dark" ? "Light" : "Dark";

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function slug(value) {
    return String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function list(items) {
    return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
  }

  function ordered(items) {
    return `<ol>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol>`;
  }

  function paragraph(value) {
    return `<p>${escapeHtml(value).replaceAll("\n", "<br>")}</p>`;
  }

  function matches(item) {
    if (!item) return false;
    if (state.route !== "home") return true;
    if (state.type !== "all" && item.type !== state.type) return false;
    if (!state.search) return true;
    return JSON.stringify(item).toLowerCase().includes(state.search.toLowerCase());
  }

  function searchText(value) {
    return JSON.stringify(value).toLowerCase();
  }

  function searchMatches(item) {
    if (!item) return false;
    if (state.type !== "all" && item.category !== state.type) return false;
    if (!state.search) return true;
    return item.searchText.includes(state.search.toLowerCase());
  }

  function saveRevised() {
    localStorage.setItem("bacEnglishRevised", JSON.stringify([...state.revised]));
    updateProgress();
  }

  function allPracticeItems() {
    const practice = state.data.practice;
    return [
      ...practice.vocabularyExercises,
      ...practice.grammarExercises,
      ...practice.functionExercises,
      ...practice.writingPrompts,
      ...practice.mockExams
    ];
  }

  function allRevisableIds() {
    if (!state.data) return [];
    return [
      ...state.data.themes.map((item) => item.id),
      ...state.data.grammar.map((item) => item.id),
      ...state.data.functions.map((item) => item.id),
      ...state.data.writing.map((item) => item.id),
      ...state.data.site.readingStrategies.map((item) => item.id),
      ...state.data.site.examStructure.map((item) => `exam-${slug(item.section)}`),
      ...checklistItems().map((item) => item.id),
      "guide-printable-study-guide",
      ...allPracticeItems().map((item) => item.id)
    ];
  }

  function checklistItems() {
    const r = state.data.site.revision;
    return [
      ["7-day revision plan", r.sevenDayPlan],
      ["Night-before-exam checklist", r.nightBeforeChecklist],
      ["Exam-day strategy", r.examDayStrategy],
      ["Common mistakes list", r.commonMistakes],
      ["High-frequency vocabulary", r.highFrequencyVocabulary],
      ["High-frequency connectors", r.highFrequencyConnectors],
      ["High-frequency writing phrases", r.highFrequencyWritingPhrases],
      ["Final checklist", r.finalChecklist]
    ].map(([title, items]) => ({
      id: `checklist-${slug(title)}`,
      type: "Checklist",
      title,
      items
    }));
  }

  function searchIndex() {
    const d = state.data;
    const revision = d.site.revision;
    const examStructure = d.site.examStructure.map((item) => ({
      ...item,
      id: `exam-${slug(item.section)}`,
      type: "Strategy",
      title: item.section
    }));
    const readingStrategies = d.site.readingStrategies.map((item) => ({ ...item, type: "Strategy" }));
    const guideItem = {
      id: "guide-printable-study-guide",
      type: "Guide",
      title: "Printable Study Guide",
      summary: "Download or print the Markdown guide and learn how to update the project content.",
      route: "guide",
      category: "Guide"
    };
    const items = [
      ...d.themes.map((item) => ({
        id: item.id,
        title: item.title,
        category: "Units",
        route: "units",
        summary: item.explanation,
        source: item
      })),
      {
        id: "vocabulary-summary",
        title: "Vocabulary Summary",
        category: "Vocabulary",
        route: "vocabulary",
        summary: "High-frequency Bac vocabulary, connectors, collocations, and writing phrases.",
        source: {
          highFrequencyVocabulary: revision.highFrequencyVocabulary,
          highFrequencyConnectors: revision.highFrequencyConnectors,
          highFrequencyWritingPhrases: revision.highFrequencyWritingPhrases,
          themes: d.themes.map((theme) => theme.vocabulary)
        }
      },
      ...d.grammar.map((item) => ({
        id: item.id,
        title: item.title,
        category: "Grammar",
        route: "grammar",
        summary: item.explanation,
        source: item
      })),
      ...d.functions.map((item) => ({
        id: item.id,
        title: item.title,
        category: "Functions",
        route: "functions",
        summary: item.dialogue.join(" "),
        source: item
      })),
      ...d.writing.map((item) => ({
        id: item.id,
        title: item.title,
        category: "Writing",
        route: "writing",
        summary: item.sample,
        source: item
      })),
      ...examStructure.map((item) => ({
        id: item.id,
        title: item.title,
        category: "Strategy",
        route: "strategy",
        summary: item.whatToExpect.join(" "),
        source: item
      })),
      ...readingStrategies.map((item) => ({
        id: item.id,
        title: item.title,
        category: "Strategy",
        route: "strategy",
        summary: item.example,
        source: item
      })),
      ...allPracticeItems().map((item) => ({
        id: item.id,
        title: item.title,
        category: "Practice",
        route: "practice",
        summary: item.prompt || item.text || item.explanation || "Practice exercise with answer key.",
        source: item
      })),
      ...checklistItems().map((item) => ({
        id: item.id,
        title: item.title,
        category: "Checklist",
        route: "checklist",
        summary: item.items.slice(0, 2).join(" "),
        source: item
      })),
      guideItem
    ];
    return items.map((item) => ({
      ...item,
      searchText: searchText([item.title, item.category, item.summary, item.source || item])
    }));
  }

  function updateProgress() {
    const ids = allRevisableIds();
    const done = ids.filter((id) => state.revised.has(id)).length;
    const percent = ids.length ? Math.round((done / ids.length) * 100) : 0;
    document.getElementById("progress-percent").textContent = `${percent}%`;
    document.getElementById("progress-bar").style.width = `${percent}%`;
    document.getElementById("progress-count").textContent = `${done} of ${ids.length} lessons revised`;
  }

  function sectionTools(label, items) {
    const validItems = items.filter((item) => item && item.id && item.title);
    if (!validItems.length) return "";
    const total = validItems.length;
    const done = validItems.filter((item) => state.revised.has(item.id)).length;
    const percent = Math.round((done / total) * 100);
    return `
      <div class="section-tools">
        <aside class="section-progress-card" aria-label="${escapeHtml(label)} progress">
          <strong>${escapeHtml(label)} progress</strong>
          <div class="progress-track" aria-hidden="true"><span style="width: ${percent}%"></span></div>
          <p>${done} of ${total} revised</p>
        </aside>
        <nav class="mini-index" aria-label="${escapeHtml(label)} lesson index">
          <strong>Jump to lesson</strong>
          <div class="mini-index-links">
            ${validItems.map((item) => `<button type="button" data-jump="${escapeHtml(item.id)}">${escapeHtml(item.title)}</button>`).join("")}
          </div>
        </nav>
      </div>
    `;
  }

  function priorityTag(id) {
    return priorityLessonIds.has(id) ? `<span class="tag priority">Exam priority</span>` : "";
  }

  function setActiveNav() {
    document.querySelectorAll(".nav a").forEach((link) => {
      link.classList.toggle("active", link.dataset.route === state.route);
    });
  }

  function printButton(id) {
    const label = state.revised.has(id) ? "Revised" : "Mark as revised";
    const revisedClass = state.revised.has(id) ? " revised" : "";
    return `
      <div class="lesson-actions">
        <button class="lesson-action${revisedClass}" type="button" data-revise="${escapeHtml(id)}">${label}</button>
        <button class="lesson-action" type="button" data-print="${escapeHtml(id)}">Print this lesson</button>
      </div>
    `;
  }

  function card(item, bodyHtml) {
    const id = item.id || `item-${slug(item.title || item.section)}`;
    const title = item.title || item.section;
    const type = item.type || "Strategy";
    const html = `
      <article class="lesson-card" id="${escapeHtml(id)}">
        <header>
          <div>
            <div class="tag-row">
              <span class="tag">${escapeHtml(type)}</span>
              ${priorityTag(id)}
            </div>
            <h3>${escapeHtml(title)}</h3>
          </div>
          ${printButton(id)}
        </header>
        <div class="lesson-body">${bodyHtml}</div>
      </article>
    `;
    state.printables.set(id, { title, type, html: `<h1>${escapeHtml(title)}</h1>${bodyHtml}` });
    return html;
  }

  function sectionHead(title, copy) {
    return `
      <div class="section-head">
        <h2>${escapeHtml(title)}</h2>
        <p>${escapeHtml(copy)}</p>
      </div>
    `;
  }

  function renderHome() {
    const d = state.data;
    const isSearching = Boolean(state.search || state.type !== "all");
    const results = searchIndex().filter(searchMatches);
    const stats = [
      { label: "Theme summaries", value: d.themes.length },
      { label: "Grammar lessons", value: d.grammar.length },
      { label: "Writing guides", value: d.writing.length }
    ];
    return `
      ${sectionHead("Exam-Focused English Prep", "A complete static study app for Moroccan 2BAC English revision. Use the menu, search lessons, mark revised items, and print what you need.")}
      <div class="summary-row">
        ${stats.map((stat) => `
          <div class="summary-card">
            <div class="stat">${stat.value}</div>
            <h3>${escapeHtml(stat.label)}</h3>
            <p>Short, practical, original content written for Bac exam preparation.</p>
          </div>
        `).join("")}
      </div>
      <div class="grid">
        <div class="summary-card">
          <h3>What This Guide Covers</h3>
          <ul>
            <li>Reading comprehension strategy</li>
            <li>Language use: grammar, vocabulary, and functions</li>
            <li>Writing formats and original sample answers</li>
            <li>Practice exercises, mock sets, and answer keys</li>
          </ul>
        </div>
        <div class="summary-card">
          <h3>Important Note</h3>
          <p>${escapeHtml(d.site.meta.disclaimer)}</p>
          <div class="guide-actions">
            <a class="primary-button" href="#units">Start Units</a>
            <a class="secondary-button" href="study-guide.md" download>Download Markdown Guide</a>
          </div>
        </div>
      </div>
      <div class="section-head">
        <h2>${isSearching ? "Search Results" : "Search All Lessons"}</h2>
        <p>${isSearching ? `${results.length} result${results.length === 1 ? "" : "s"} found across Units, Grammar, Vocabulary, Functions, Writing, Strategy, Practice, Checklist, and Guide.` : "Use the search box above to find any lesson, grammar point, vocabulary item, writing format, practice set, checklist item, or guide page."}</p>
      </div>
      ${isSearching ? renderSearchResults(results) : renderSectionShortcuts()}
    `;
  }

  function renderSectionShortcuts() {
    const shortcuts = [
      ["Units", "Core themes and exam vocabulary", "units"],
      ["Grammar", "Rules, examples, mistakes, and mini exercises", "grammar"],
      ["Vocabulary", "High-frequency words and connectors", "vocabulary"],
      ["Functions", "Communication expressions and dialogues", "functions"],
      ["Writing", "Formats, samples, and checklists", "writing"],
      ["Strategy", "Reading and exam-answering methods", "strategy"],
      ["Practice", "Exercises, prompts, and mock sets", "practice"],
      ["Checklist", "7-day plan and final revision lists", "checklist"],
      ["Guide", "Printable Markdown study guide", "guide"]
    ];
    return `
      <div class="grid three">
        ${shortcuts.map(([title, summary, route]) => `
          <a class="summary-card search-result-card" href="#${route}">
            <span class="tag">${escapeHtml(title)}</span>
            <h3>${escapeHtml(title)}</h3>
            <p>${escapeHtml(summary)}</p>
          </a>
        `).join("")}
      </div>
    `;
  }

  function renderSearchResults(results) {
    if (!results.length) return emptyState();
    return `
      <div class="grid">
        ${results.map((item) => `
          <a class="summary-card search-result-card" href="#${escapeHtml(item.route)}" data-result-target="${escapeHtml(item.id)}">
            <span class="tag">${escapeHtml(item.category)}</span>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(String(item.summary || "")).slice(0, 220)}${String(item.summary || "").length > 220 ? "..." : ""}</p>
            <span class="search-result-meta">Open ${escapeHtml(item.category)} section</span>
          </a>
        `).join("")}
      </div>
    `;
  }

  function renderThemeCard(theme) {
    return card(theme, `
      <p>${escapeHtml(theme.explanation)}</p>
      <div class="mini-section"><h4>Key vocabulary</h4>
        <ul class="vocab-list">${theme.vocabulary.map((word) => `<li><strong>${escapeHtml(word.term)}:</strong> ${escapeHtml(word.definition)}</li>`).join("")}</ul>
      </div>
      <div class="mini-section"><h4>Useful collocations</h4><ul class="pill-list">${theme.collocations.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div>
      <div class="mini-section"><h4>Common expressions</h4>${list(theme.expressions)}</div>
      <div class="mini-section"><h4>Exam-style sentences</h4>${list(theme.examples)}</div>
      <div class="mini-section"><h4>Possible writing topics</h4>${list(theme.writingTopics)}</div>
      <div class="mini-section"><h4>Reading tips</h4>${list(theme.readingTips)}</div>
    `);
  }

  function renderUnits() {
    const items = state.data.themes;
    return `
      ${sectionHead("Units and Lessons", "Core 2BAC English themes with vocabulary, collocations, example sentences, writing topics, and reading tips.")}
      ${sectionTools("Units", items)}
      ${items.length ? `<div class="grid">${items.map(renderThemeCard).join("")}</div>` : emptyState()}
    `;
  }

  function renderGrammarCard(lesson) {
    return card(lesson, `
      <div class="mini-section"><h4>Rule</h4><p>${escapeHtml(lesson.rule)}</p></div>
      <div class="mini-section"><h4>Simple explanation</h4><p>${escapeHtml(lesson.explanation)}</p></div>
      <div class="mini-section"><h4>Correct examples</h4>${list(lesson.examples)}</div>
      <div class="mini-section"><h4>Common mistakes</h4>${list(lesson.commonMistakes)}</div>
      <details>
        <summary>Practice questions and answer key</summary>
        <div>
          <ol>${lesson.practice.map((item) => `<li><strong>${escapeHtml(item.q)}</strong><br>Answer: ${escapeHtml(item.a)}<br><small>${escapeHtml(item.explanation)}</small></li>`).join("")}</ol>
        </div>
      </details>
    `);
  }

  function renderGrammar() {
    const items = state.data.grammar;
    return `
      ${sectionHead("Grammar Summary", "Rules, examples, common mistakes, and five mini questions for each lesson.")}
      ${sectionTools("Grammar", items)}
      ${items.length ? `<div class="grid">${items.map(renderGrammarCard).join("")}</div>` : emptyState()}
    `;
  }

  function renderVocabulary() {
    const themes = state.data.themes;
    const revision = state.data.site.revision;
    return `
      ${sectionHead("Vocabulary Summary", "High-frequency words, theme vocabulary, collocations, and useful exam expressions.")}
      ${sectionTools("Vocabulary", themes)}
      <div class="summary-row">
        <div class="summary-card">
          <h3>High-frequency vocabulary</h3>
          ${list(revision.highFrequencyVocabulary)}
        </div>
        <div class="summary-card">
          <h3>High-frequency connectors</h3>
          ${list(revision.highFrequencyConnectors)}
        </div>
        <div class="summary-card">
          <h3>Writing phrases</h3>
          ${list(revision.highFrequencyWritingPhrases)}
        </div>
      </div>
      ${themes.length ? `<div class="grid">${themes.map(renderThemeCard).join("")}</div>` : emptyState()}
    `;
  }

  function renderFunctionCard(item) {
    return card(item, `
      <div class="mini-section"><h4>Formal expressions</h4>${list(item.expressions.formal)}</div>
      <div class="mini-section"><h4>Informal expressions</h4>${list(item.expressions.informal)}</div>
      <div class="mini-section"><h4>Short dialogue</h4>${list(item.dialogue)}</div>
      <details>
        <summary>Practice exercise and answer key</summary>
        <div>
          <p><strong>Task:</strong> ${escapeHtml(item.practice.task)}</p>
          <p><strong>Answer key:</strong> ${escapeHtml(item.practice.answerKey)}</p>
        </div>
      </details>
    `);
  }

  function renderFunctions() {
    const items = state.data.functions;
    return `
      ${sectionHead("Functions and Communication", "Useful expressions for common Bac situations, with formal and informal examples.")}
      ${sectionTools("Functions", items)}
      ${items.length ? `<div class="grid">${items.map(renderFunctionCard).join("")}</div>` : emptyState()}
    `;
  }

  function renderWritingCard(item) {
    return card(item, `
      <div class="mini-section"><h4>Structure</h4>${ordered(item.structure)}</div>
      <div class="mini-section"><h4>Useful phrases</h4>${list(item.usefulPhrases)}</div>
      <div class="mini-section"><h4>Sample outline</h4>${ordered(item.outline)}</div>
      <div class="mini-section"><h4>Original sample answer</h4>${paragraph(item.sample)}</div>
      <div class="mini-section"><h4>Common mistakes</h4>${list(item.commonMistakes)}</div>
      <div class="mini-section"><h4>Checklist before submitting</h4>${list(item.checklist)}</div>
    `);
  }

  function renderWriting() {
    const items = state.data.writing;
    return `
      ${sectionHead("Writing Guide", "Exam-ready structures, useful phrases, outlines, original samples, common mistakes, and checklists.")}
      ${sectionTools("Writing", items)}
      ${items.length ? `<div class="grid">${items.map(renderWritingCard).join("")}</div>` : emptyState()}
    `;
  }

  function renderStrategy() {
    const examItems = state.data.site.examStructure.map((item) => ({
      ...item,
      id: `exam-${slug(item.section)}`,
      type: "Strategy",
      title: item.section
    }));
    const reading = state.data.site.readingStrategies.map((item) => ({ ...item, type: "Strategy" }));
    const strategyItems = [...examItems, ...reading];
    const examCards = examItems.map((item) => card(item, `
      <p><strong>Weight:</strong> ${escapeHtml(item.weight)}</p>
      <div class="mini-section"><h4>What to expect</h4>${list(item.whatToExpect)}</div>
      <div class="mini-section"><h4>How to answer</h4>${list(item.howToAnswer)}</div>
    `)).join("");
    const readingCards = reading.map((item) => card(item, `
      <div class="mini-section"><h4>Steps</h4>${ordered(item.steps)}</div>
      <div class="mini-section"><h4>Example</h4><p>${escapeHtml(item.example)}</p></div>
    `)).join("");
    return `
      ${sectionHead("Exam Strategy", "How to handle reading comprehension, language use, and writing under exam conditions.")}
      ${sectionTools("Strategy", strategyItems)}
      ${examCards || readingCards ? `<div class="grid">${examCards}${readingCards}</div>` : emptyState()}
    `;
  }

  function renderExercise(item) {
    const questions = item.questions ? list(item.questions) : "";
    const options = item.options ? `<div class="mini-section"><h4>Options</h4>${list(item.options)}</div>` : "";
    const prompt = item.prompt ? `<p>${escapeHtml(item.prompt)}</p>${item.support ? list(item.support) : ""}` : "";
    return card(item, `
      ${prompt}
      ${questions ? `<div class="mini-section"><h4>Questions</h4>${questions}</div>` : ""}
      ${options}
      <details>
        <summary>Answer key and explanation</summary>
        <div>
          ${Array.isArray(item.answerKey) ? list(item.answerKey) : paragraph(item.answerKey || "Use the support points to write your answer.")}
          ${item.explanation ? `<p>${escapeHtml(item.explanation)}</p>` : ""}
        </div>
      </details>
    `);
  }

  function renderMock(item) {
    return card(item, `
      <div class="mini-section"><h4>Reading text</h4><p class="mock-text">${escapeHtml(item.text)}</p></div>
      <div class="mini-section"><h4>Reading questions</h4>${list(item.readingQuestions)}</div>
      <div class="mini-section"><h4>Language questions</h4>${list(item.languageQuestions)}</div>
      <div class="mini-section"><h4>Writing task</h4><p>${escapeHtml(item.writingTask)}</p></div>
      <details>
        <summary>Answer key</summary>
        <div>${list(item.answerKey)}</div>
      </details>
    `);
  }

  function renderPractice() {
    const practice = state.data.practice;
    const practiceItems = allPracticeItems();
    const groups = [
      ["Vocabulary exercises", practice.vocabularyExercises],
      ["Grammar exercises", practice.grammarExercises],
      ["Functions exercises", practice.functionExercises],
      ["Writing prompts", practice.writingPrompts],
      ["Mock exam-style practice sets", practice.mockExams]
    ];
    const html = groups.map(([title, items]) => {
      const filtered = items;
      if (!filtered.length) return "";
      const renderer = title.includes("Mock") ? renderMock : renderExercise;
      return `
        <div class="section-head"><h2>${escapeHtml(title)}</h2></div>
        <div class="grid">${filtered.map(renderer).join("")}</div>
      `;
    }).join("");
    return `
      ${sectionHead("Practice Exercises", "Vocabulary, grammar, functions, writing prompts, and three compact mock exam-style sets with answer keys.")}
      ${sectionTools("Practice", practiceItems)}
      ${html || emptyState()}
    `;
  }

  function renderChecklist() {
    const sections = checklistItems();
    return `
      ${sectionHead("Final Revision Checklist", "A practical last-week plan and high-frequency items to review before the exam.")}
      ${sectionTools("Checklist", sections)}
      <div class="grid">
        ${sections.map((item) => card(item, item.title.includes("7-day") ? ordered(item.items) : list(item.items))).join("")}
      </div>
    `;
  }

  function renderGuide() {
    const guideItems = [{
      id: "guide-printable-study-guide",
      type: "Guide",
      title: "Download or Print"
    }];
    return `
      ${sectionHead("Printable Study Guide", "The project includes a Markdown guide that is ready to print or convert to PDF.")}
      ${sectionTools("Guide", guideItems)}
      <div class="grid">
        ${card(guideItems[0], `
          <p>Use the Markdown file for a compact printable version of the guide. You can open it from the project folder or download it from this page.</p>
          <div class="guide-actions">
            <a class="primary-button" href="study-guide.md" download>Download study-guide.md</a>
            <button class="secondary-button" type="button" data-print-page="true">Print current page</button>
          </div>
        `)}
        <div class="summary-card">
          <h3>How to Update Content</h3>
          <p>Edit the JSON files in the content folder. The website reads those files on load, so themes, grammar, functions, writing guides, and practice can be updated separately.</p>
          <ul>
            <li>content/themes.json</li>
            <li>content/grammar.json</li>
            <li>content/functions.json</li>
            <li>content/writing.json</li>
            <li>content/practice.json</li>
          </ul>
        </div>
      </div>
    `;
  }

  function emptyState() {
    return `<div class="empty-state">No items match the current search and filter.</div>`;
  }

  function render() {
    if (!state.data) return;
    state.printables = new Map();
    setActiveNav();
    toolbar.hidden = state.route !== "home";
    const routes = {
      home: renderHome,
      units: renderUnits,
      grammar: renderGrammar,
      vocabulary: renderVocabulary,
      functions: renderFunctions,
      writing: renderWriting,
      strategy: renderStrategy,
      practice: renderPractice,
      checklist: renderChecklist,
      guide: renderGuide
    };
    app.innerHTML = (routes[state.route] || routes.home)();
    focusPendingResult();
    updateProgress();
  }

  function focusPendingResult() {
    const id = sessionStorage.getItem("bacEnglishPendingResult");
    if (!id || state.route === "home") return;
    sessionStorage.removeItem("bacEnglishPendingResult");
    window.setTimeout(() => {
      const target = document.getElementById(id);
      if (!target) return;
      target.classList.add("focused");
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => target.classList.remove("focused"), 1600);
    }, 60);
  }

  async function loadData() {
    try {
      const entries = await Promise.all(Object.entries(contentFiles).map(async ([key, url]) => {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Could not load ${url}`);
        return [key, await response.json()];
      }));
      state.data = Object.fromEntries(entries);
      render();
    } catch (error) {
      app.innerHTML = `
        <div class="empty-state">
          <h2>Could not load content files</h2>
          <p>This site reads JSON files from the content folder. Run it with a local web server, for example: <code>python -m http.server 4173</code>, then open <code>http://localhost:4173</code>.</p>
          <p>${escapeHtml(error.message)}</p>
        </div>
      `;
    }
  }

  function routeFromHash() {
    const next = (window.location.hash || "#home").replace("#", "");
    state.route = next || "home";
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    render();
  }

  function printLesson(id) {
    const item = state.printables.get(id);
    if (!item) return;
    const printArea = document.getElementById("print-area");
    printArea.innerHTML = `
      <article>
        <p><strong>Morocco 2BAC English Exam Prep</strong> - ${escapeHtml(item.type)}</p>
        ${item.html}
      </article>
    `;
    document.body.classList.add("printing-lesson");
    window.print();
    setTimeout(() => {
      document.body.classList.remove("printing-lesson");
      printArea.innerHTML = "";
    }, 250);
  }

  app.addEventListener("click", (event) => {
    const jumpButton = event.target.closest("[data-jump]");
    if (jumpButton) {
      const target = document.getElementById(jumpButton.dataset.jump);
      if (target) {
        target.classList.add("focused");
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        window.setTimeout(() => target.classList.remove("focused"), 1600);
      }
      return;
    }

    const searchResult = event.target.closest("[data-result-target]");
    if (searchResult) {
      sessionStorage.setItem("bacEnglishPendingResult", searchResult.dataset.resultTarget);
    }

    const reviseButton = event.target.closest("[data-revise]");
    if (reviseButton) {
      const id = reviseButton.dataset.revise;
      if (state.revised.has(id)) {
        state.revised.delete(id);
      } else {
        state.revised.add(id);
      }
      saveRevised();
      render();
      return;
    }

    const printTarget = event.target.closest("[data-print]");
    if (printTarget) {
      printLesson(printTarget.dataset.print);
      return;
    }

    if (event.target.closest("[data-print-page]")) {
      window.print();
    }
  });

  searchInput.addEventListener("input", (event) => {
    state.search = event.target.value.trim();
    render();
  });

  typeFilter.addEventListener("change", (event) => {
    state.type = event.target.value;
    render();
  });

  clearFilters.addEventListener("click", () => {
    state.search = "";
    state.type = "all";
    searchInput.value = "";
    typeFilter.value = "all";
    render();
  });

  themeToggle.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("bacEnglishTheme", next);
    themeToggle.textContent = next === "dark" ? "Light" : "Dark";
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 500);
  }, { passive: true });

  menuToggle.addEventListener("click", () => {
    const open = !nav.classList.contains("open");
    nav.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  window.addEventListener("hashchange", routeFromHash);
  routeFromHash();
  loadData();
})();
