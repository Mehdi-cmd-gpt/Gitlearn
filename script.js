const CATEGORIES = [
  { id: "all", label: "All", icon: "✨" },
  { id: "theme", label: "Themes", icon: "🌍" },
  { id: "grammar", label: "Grammar", icon: "🧩" },
  { id: "vocabulary", label: "Vocabulary", icon: "🔤" },
  { id: "function", label: "Functions", icon: "💬" },
  { id: "writing", label: "Writing", icon: "✍️" },
  { id: "reading", label: "Reading", icon: "📖" },
  { id: "revision", label: "Final Revision", icon: "✅" },
];

const lessons = [
  ...[
    ["gifts-youth", "Gifts of Youth", "Young people are linked to ambition, identity, responsibility, peer pressure, volunteering, creativity and social change."],
    ["humour", "Humour", "Humour helps communication, reduces stress, criticizes problems gently, and makes stories memorable when used respectfully."],
    ["education", "Education", "Compare formal, informal and non-formal education, lifelong learning, literacy, dropout, skills and equal opportunity."],
    ["culture-values", "Cultural Issues and Values", "Discuss identity, traditions, stereotypes, tolerance, diversity, Moroccan culture and cultural misunderstanding."],
    ["women-power", "Women and Power", "Focus on empowerment, equality, leadership, stereotypes, achievement and women’s participation in society."],
    ["science-technology", "Science and Technology", "Study inventions, AI, digital learning, health technology, reliable information and responsible use of devices."],
    ["sustainable-development", "Sustainable Development", "Connect progress with environment, recycling, renewable energy, water scarcity, awareness and civic action."],
    ["citizenship", "Citizenship", "Rights, duties, volunteering, solidarity, responsibility, community service and respect for public property."],
    ["international-organizations", "International Organizations", "Global cooperation, humanitarian aid, peace, health, children, refugees, development and relief work."],
    ["brain-drain", "Brain Drain", "Migration of skilled workers, push and pull factors, loss of talent, remittances, research and incentives."],
    ["migration", "Migration", "Reasons people move, integration, opportunities, challenges, refugees, identity and links with family and country."],
    ["human-rights", "Human Rights", "Dignity, equality, freedom, justice, children’s rights, women’s rights and responsibility toward others."],
    ["media-communication", "Media and Communication", "News, social media, misinformation, advertising, communication skills, privacy and responsible online behavior."],
  ].map(([id, title, summary]) => ({
    id,
    category: "theme",
    title,
    minutes: 25,
    summary,
    examExample: `In a reading text about ${title.toLowerCase()}, identify the main problem, the writer's attitude, and one solution mentioned in the text.`,
    commonMistakes: ["Writing general sentences without examples.", "Ignoring the exact question word.", "Using memorized paragraphs that do not answer the topic."],
    miniPractice: `Write one topic sentence and two supporting ideas about ${title.toLowerCase()}.`,
    answerKey: "A strong answer gives a clear opinion, one reason, one example, and uses simple accurate English.",
    tags: [title.toLowerCase(), "theme", "vocabulary", "writing"],
  })),
  {
    id: "exam-structure",
    category: "reading",
    title: "Bac English Exam Structure",
    minutes: 20,
    summary: "The English paper usually tests reading comprehension, language use and writing. Your answers must be short, justified and well organized.",
    examExample: "True/False with justification: quote only the proof that supports your answer, not the full paragraph.",
    commonMistakes: ["Writing long proof for True/False.", "Answering open questions without using the text.", "Starting writing before planning."],
    miniPractice: "Create a 3-part exam plan: reading time, language time, writing time.",
    answerKey: "Good strategy: read questions first, underline proof, answer language carefully, plan writing, proofread connectors and verb forms.",
    tags: ["exam", "reading", "strategy"],
  },
  {
    id: "reading-comprehension",
    category: "reading",
    title: "Reading Comprehension Strategy",
    minutes: 30,
    summary: "For reading questions, locate evidence, understand references, infer meaning from context and avoid copying too much.",
    examExample: "Reference: What does 'they' refer to? Look at the nearest plural noun that makes sense in the previous sentence.",
    commonMistakes: ["Guessing vocabulary without context.", "Confusing main idea with detail.", "Forgetting justification."],
    miniPractice: "Take any short paragraph and mark: main idea, two details, one reference word, one unknown word.",
    answerKey: "Correct reading answers are text-based, precise and supported by proof.",
    tags: ["reading", "comprehension", "reference", "true false"],
  },
  ...[
    ["tenses", "English Tenses Review", "Use tenses to locate time: present habits, past events, future plans and completed actions.", "She has revised three lessons this week."],
    ["gerund-infinitive", "Gerund and Infinitive", "Some verbs take -ing, some take to + verb, and some accept both.", "Students enjoy learning English but decide to revise grammar first."],
    ["modals", "Present and Past Modals", "Modals express ability, advice, possibility, obligation, deduction and regret.", "You should revise early. He must have forgotten the deadline."],
    ["passive", "Passive Voice", "Use passive when the action is more important than the doer.", "Many opportunities have been created for young people."],
    ["reported-speech", "Reported Speech", "Report statements and questions by changing tense, pronouns and time expressions.", "She said that she was preparing for the exam."],
    ["conditionals", "Conditional Sentences", "Zero, first, second and third conditionals express facts, real future, imaginary present and past regret.", "If I study regularly, I will improve."],
    ["relative-clauses", "Relative Clauses", "Use who for people, which for things, where for places and whose for possession.", "A volunteer who helps others builds citizenship."],
    ["linking-words", "Linking Words", "Connect ideas using addition, contrast, cause, result, purpose, example and conclusion.", "Technology is useful. However, it can distract students."],
    ["phrasal-verbs", "Phrasal Verbs", "Learn the whole meaning in context; do not translate word by word.", "Students should find out the meaning from context."],
    ["word-formation", "Word Formation", "Use prefixes and suffixes to build nouns, adjectives, verbs and opposites.", "responsible → responsibility; legal → illegal"],
  ].map(([id, title, summary, example]) => ({
    id,
    category: "grammar",
    title,
    minutes: 20,
    summary,
    examExample: example,
    commonMistakes: ["Translating directly from Arabic or French.", "Forgetting the form after the key word.", "Not checking tense consistency."],
    miniPractice: "Write five original sentences using this grammar point in Bac themes.",
    answerKey: "Check the trigger word, choose the correct form, then reread the full sentence for meaning.",
    tags: [title.toLowerCase(), "grammar", "language"],
  })),
  ...[
    ["opinion", "Expressing Opinion", "In my opinion, In my view, I believe that, Personally, I think that."],
    ["agreement", "Agreeing and Disagreeing", "I agree, I partly agree, I see your point but, I disagree because."],
    ["advice", "Giving Advice", "You should, You ought to, Why don’t you, It would be better to."],
    ["complaint", "Complaining Politely", "I am afraid there is a problem with, I would like to complain about."],
    ["apology", "Apologizing", "I am sorry for, I apologize for, Please accept my apology."],
    ["purpose", "Expressing Purpose", "to, in order to, so as to, so that."],
    ["cause-effect", "Cause and Effect", "because, due to, therefore, as a result, consequently."],
    ["clarification", "Asking for Clarification", "Could you explain that? What do you mean by? Do you mean that?"],
    ["suggestion", "Making Suggestions", "Let’s, Why don’t we, How about, I suggest that."],
    ["certainty", "Certainty and Uncertainty", "I am sure, certainly, probably, I doubt that, I am not sure."],
  ].map(([id, title, expressions]) => ({
    id,
    category: "function",
    title,
    minutes: 15,
    summary: `Useful expressions: ${expressions}`,
    examExample: `Complete the dialogue with a suitable expression for ${title.toLowerCase()}.`,
    commonMistakes: ["Using informal language in formal situations.", "Giving a grammar answer instead of a function.", "Forgetting politeness."],
    miniPractice: "Write a short two-line dialogue using this function.",
    answerKey: "The answer is correct when it matches the situation and sounds natural and polite.",
    tags: [title.toLowerCase(), "functions", "dialogue"],
  })),
  ...[
    ["paragraph", "Paragraph Writing", "Topic sentence, supporting idea, example and closing sentence."],
    ["essay", "Opinion Essay", "Introduction, arguments, balanced contrast and conclusion."],
    ["formal-letter", "Formal Letter", "Address politely, state purpose, explain problem/request, close formally."],
    ["informal-letter", "Informal Letter / Email", "Friendly greeting, reason for writing, details, personal closing."],
    ["article", "Article", "Catchy title, introduction, body with examples and final message."],
    ["report", "Report", "Title, purpose, facts/findings, recommendations."],
    ["review", "Book or Film Review", "Identify the work, summarize briefly, evaluate and recommend."],
    ["description", "Describing a Person or Place", "Use clear details, adjectives, organization and relevant examples."],
  ].map(([id, title, structure]) => ({
    id,
    category: "writing",
    title,
    minutes: 25,
    summary: structure,
    examExample: `Write 120-180 words using this structure: ${structure}`,
    commonMistakes: ["No clear opening sentence.", "Weak connectors.", "Many ideas but no organization.", "Not proofreading verbs and spelling."],
    miniPractice: "Write a quick outline before writing the full answer.",
    answerKey: "A good writing answer is relevant, organized, connected and proofread.",
    tags: [title.toLowerCase(), "writing", "production"],
  })),
  {
    id: "final-revision-method",
    category: "revision",
    title: "Final Revision Method",
    minutes: 30,
    summary: "Revise high-frequency grammar, connectors, functions and writing formats. Practise under time pressure and correct your own mistakes.",
    examExample: "Before the exam, write one paragraph, correct it, then rewrite it better.",
    commonMistakes: ["Only reading summaries without practice.", "Ignoring old mistakes.", "Learning long memorized texts."],
    miniPractice: "Pick three weak lessons and revise them using rule → example → exercise → correction.",
    answerKey: "The best final revision is active: answer, check, correct, repeat.",
    tags: ["final", "revision", "checklist"],
  },
];

const quizQuestions = [
  { type: "Grammar", q: "Choose the correct first conditional sentence.", a: ["If I will study, I pass.", "If I study, I will pass.", "If I studied, I will pass.", "If I had study, I pass."], c: 1, exp: "First conditional: If + present simple, will + base verb." },
  { type: "Grammar", q: "Passive voice: People respect responsible citizens.", a: ["Responsible citizens are respected.", "Responsible citizens respected.", "Responsible citizens is respect.", "Responsible citizens were respect."], c: 0, exp: "Present simple passive: am/is/are + past participle." },
  { type: "Grammar", q: "Choose the correct form: Students enjoy ____ in clubs.", a: ["participate", "to participate", "participating", "participated"], c: 2, exp: "Enjoy is followed by a gerund." },
  { type: "Grammar", q: "Use who, which, where or whose: The engineer ____ project won a prize returned home.", a: ["who", "which", "where", "whose"], c: 3, exp: "Whose shows possession." },
  { type: "Vocabulary", q: "Brain drain means:", a: ["waste recycling", "migration of skilled people", "a funny story", "a school club"], c: 1, exp: "Brain drain is the movement of educated or skilled workers to another country." },
  { type: "Vocabulary", q: "A stereotype is:", a: ["a fixed unfair idea about a group", "a useful invention", "a school report", "a type of exam"], c: 0, exp: "Stereotypes are simplified and often unfair beliefs." },
  { type: "Vocabulary", q: "Sustainable means:", a: ["damaging quickly", "able to continue without harming the future", "very funny", "private"], c: 1, exp: "Sustainable development protects future resources." },
  { type: "Function", q: "Best polite advice:", a: ["You are wrong.", "You should revise connectors before writing.", "Give me your paper.", "This is bad."], c: 1, exp: "Advice often uses should + base verb." },
  { type: "Function", q: "Best response to bad news: I failed the interview.", a: ["Congratulations!", "I am sorry to hear that. Better luck next time.", "That is amazing.", "I agree."], c: 1, exp: "Bad news requires sympathy and encouragement." },
  { type: "Function", q: "Which expression asks for clarification?", a: ["Could you explain what you mean?", "I completely agree.", "To sum up", "As a result"], c: 0, exp: "Clarification asks someone to explain more clearly." },
];

const writingPrompts = [
  "Some students think technology is the best way to learn English. Write an opinion essay.",
  "Write a formal letter to your school principal suggesting ways to reduce plastic waste.",
  "Write an article about how Moroccan youth can contribute to society.",
  "Write a report about a school volunteering campaign.",
  "Write an informal email to a friend describing a cultural festival you attended.",
  "Write a paragraph about the causes and effects of brain drain.",
  "Write a review of a film or book that teaches an important value.",
  "Write a paragraph about the importance of human rights in daily life.",
  "Write an essay about advantages and disadvantages of social media.",
  "Describe a person who has inspired you and explain why.",
];

const mockExams = [
  { title: "Mock Exam 1: Youth and Technology", tasks: ["Reading: identify main idea, reference words and vocabulary from context.", "Language: conditionals, modals and connectors.", "Writing: opinion paragraph about technology and youth."] },
  { title: "Mock Exam 2: Sustainable Development", tasks: ["Reading: true/false with justification and inference.", "Language: passive voice, cause/effect connectors and word formation.", "Writing: formal letter about an environmental problem."] },
  { title: "Mock Exam 3: Citizenship and Human Rights", tasks: ["Reading: purpose, details and author attitude.", "Language: reported speech, functions and relative clauses.", "Writing: article about responsible citizenship."] },
];

const revisionPlan = [
  ["Day 1", "Revise exam structure, reading strategy and True/False justification."],
  ["Day 2", "Revise tenses, modals, passive voice and reported speech."],
  ["Day 3", "Revise conditionals, relative clauses, linking words and word formation."],
  ["Day 4", "Revise functions: opinion, advice, complaint, apology, purpose and clarification."],
  ["Day 5", "Revise writing formats: paragraph, essay, formal letter, email, article, report and review."],
  ["Day 6", "Do one mock exam under timed conditions and correct mistakes."],
  ["Day 7", "Review weak points, connectors, vocabulary and final checklist. Sleep early."],
];

const highFrequency = {
  vocabulary: ["responsibility", "awareness", "empowerment", "diversity", "solidarity", "innovation", "sustainable", "migration", "cooperation", "equality"],
  connectors: ["Moreover", "However", "Although", "Because", "Therefore", "As a result", "For instance", "In order to", "On the other hand", "To sum up"],
  mistakes: ["Using will after if in first conditional", "Forgetting -s in present simple", "Writing passive without past participle", "Using informal words in formal letters", "No topic sentence in paragraph writing", "Copying too much text for justification"],
};

let activeFilter = "all";
let activePractice = "quiz";
let quizAnswered = new Set(JSON.parse(localStorage.getItem("bacQuizAnswered") || "[]"));
let completed = new Set(JSON.parse(localStorage.getItem("bacCompletedLessons") || "[]"));

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function saveProgress() {
  localStorage.setItem("bacCompletedLessons", JSON.stringify([...completed]));
  localStorage.setItem("bacQuizAnswered", JSON.stringify([...quizAnswered]));
}

function percent(value, total) {
  return total ? Math.round((value / total) * 100) : 0;
}

function setView(viewId) {
  $$(".view").forEach((view) => view.classList.toggle("active", view.id === viewId));
  $$('[data-view]').forEach((btn) => btn.classList.toggle("active", btn.dataset.view === viewId));
  location.hash = viewId;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderStats() {
  const lessonDone = completed.size;
  const lessonPct = percent(lessonDone, lessons.length);
  const quizPct = percent(quizAnswered.size, quizQuestions.length);
  const stats = [
    ["Lessons Completed", `${lessonDone}/${lessons.length}`, `${lessonPct}% revised`],
    ["Revision Progress", `${lessonPct}%`, "Saved in this browser"],
    ["Mock Exams", mockExams.length, "Timed practice sets"],
    ["Writing Practice", writingPrompts.length, "Exam-style prompts"],
  ];
  $("#statsCards").innerHTML = stats.map(([label, value, note]) => `
    <article class="stat-card">
      <span>${label}</span>
      <strong>${value}</strong>
      <small>${note}</small>
      <div class="mini-bar"><i style="width:${label === "Revision Progress" ? lessonPct : label === "Lessons Completed" ? lessonPct : label === "Writing Practice" ? 80 : 60}%"></i></div>
    </article>
  `).join("");
}

function renderCategories() {
  const counts = CATEGORIES.filter(c => c.id !== "all").map((cat) => ({ ...cat, count: lessons.filter(l => l.category === cat.id).length }));
  $("#categoryGrid").innerHTML = counts.map(cat => `
    <button class="category-card" type="button" data-jump-filter="${cat.id}">
      <span>${cat.icon}</span>
      <strong>${cat.label}</strong>
      <small>${cat.count} lessons</small>
    </button>
  `).join("");
}

function renderNextLesson() {
  const next = lessons.find((lesson) => !completed.has(lesson.id)) || lessons[0];
  $("#nextLesson").innerHTML = `
    <div class="next-lesson-card">
      <span class="pill">${next.category}</span>
      <h3>${next.title}</h3>
      <p>${next.summary}</p>
      <button class="primary-action" type="button" data-open-lesson="${next.id}">Open lesson</button>
    </div>
  `;
}

function renderFilters() {
  $("#filterRow").innerHTML = CATEGORIES.map(cat => `
    <button class="filter-btn ${cat.id === activeFilter ? "active" : ""}" type="button" data-filter="${cat.id}">${cat.icon} ${cat.label}</button>
  `).join("");
}

function renderLessons() {
  const query = ($("#lessonSearch")?.value || "").toLowerCase().trim();
  const filtered = lessons.filter((lesson) => {
    const matchesFilter = activeFilter === "all" || lesson.category === activeFilter;
    const haystack = `${lesson.title} ${lesson.summary} ${lesson.tags.join(" ")}`.toLowerCase();
    return matchesFilter && (!query || haystack.includes(query));
  });
  $("#lessonGrid").innerHTML = filtered.map(renderLessonCard).join("") || `<article class="empty-card">No lesson found. Try another keyword.</article>`;
}

function renderLessonCard(lesson) {
  const done = completed.has(lesson.id);
  return `
    <article class="lesson-card" id="lesson-${lesson.id}">
      <div class="lesson-head">
        <span class="pill">${lesson.category}</span>
        <span>${lesson.minutes} min</span>
      </div>
      <h2>${lesson.title}</h2>
      <p>${lesson.summary}</p>
      <details>
        <summary>Open exam card</summary>
        <div class="lesson-detail">
          <h3>Exam example</h3><p>${lesson.examExample}</p>
          <h3>Common mistakes</h3><ul>${lesson.commonMistakes.map(m => `<li>${m}</li>`).join("")}</ul>
          <h3>Mini practice</h3><p>${lesson.miniPractice}</p>
          <h3>Answer key</h3><p>${lesson.answerKey}</p>
        </div>
      </details>
      <div class="card-actions">
        <button class="complete-btn ${done ? "done" : ""}" type="button" data-complete="${lesson.id}">${done ? "Revised ✓" : "Mark as revised"}</button>
        <button class="ghost-action small" type="button" data-print="${lesson.id}">Print lesson</button>
      </div>
    </article>
  `;
}

function renderPractice() {
  const tabs = $$("#practiceTabs button");
  tabs.forEach(btn => btn.classList.toggle("active", btn.dataset.practice === activePractice));
  if (activePractice === "quiz") renderQuiz();
  if (activePractice === "writing") renderWritingPrompts();
  if (activePractice === "mock") renderMockExams();
}

function renderQuiz() {
  $("#practiceContent").innerHTML = `
    <div class="quiz-grid">
      ${quizQuestions.map((q, index) => `
        <article class="quiz-card ${quizAnswered.has(index) ? "answered" : ""}">
          <span class="pill">${q.type}</span>
          <h2>${q.q}</h2>
          <div class="answer-list">
            ${q.a.map((answer, answerIndex) => `<button type="button" data-quiz="${index}" data-answer="${answerIndex}">${answer}</button>`).join("")}
          </div>
          <p class="quiz-explanation" id="quiz-exp-${index}">${quizAnswered.has(index) ? `Answer: ${q.a[q.c]} — ${q.exp}` : "Choose an answer to reveal the explanation."}</p>
        </article>
      `).join("")}
    </div>
  `;
}

function renderWritingPrompts() {
  $("#practiceContent").innerHTML = `
    <div class="prompt-grid">
      ${writingPrompts.map((prompt, i) => `
        <article class="prompt-card">
          <span class="pill">Prompt ${i + 1}</span>
          <h2>${prompt}</h2>
          <ul>
            <li>Plan before writing.</li>
            <li>Use at least three connectors.</li>
            <li>Proofread verbs, spelling and punctuation.</li>
          </ul>
        </article>
      `).join("")}
    </div>
  `;
}

function renderMockExams() {
  $("#practiceContent").innerHTML = `
    <div class="mock-grid">
      ${mockExams.map(exam => `
        <article class="mock-card">
          <h2>${exam.title}</h2>
          <ol>${exam.tasks.map(task => `<li>${task}</li>`).join("")}</ol>
          <p><strong>Strategy:</strong> simulate exam conditions, correct mistakes, then rewrite your weakest writing answer.</p>
        </article>
      `).join("")}
    </div>
  `;
}

function renderChecklist() {
  $("#checklistContent").innerHTML = `
    <div class="checklist-layout">
      <article class="panel"><h2>7-day revision plan</h2><div class="timeline">${revisionPlan.map(([day, task]) => `<div><strong>${day}</strong><p>${task}</p></div>`).join("")}</div></article>
      <article class="panel"><h2>Night-before-exam checklist</h2><ul class="check-list"><li>Review connectors and function expressions.</li><li>Read corrected writing samples.</li><li>Prepare pens, ID and exam materials.</li><li>Sleep early. Do not start new heavy lessons.</li></ul></article>
      <article class="panel"><h2>Exam-day strategy</h2><ul class="check-list"><li>Read questions before the text.</li><li>Underline proof for reading answers.</li><li>Leave time for writing and proofreading.</li><li>Correct grammar before submitting.</li></ul></article>
      <article class="panel"><h2>High-frequency vocabulary</h2><div class="chip-row">${highFrequency.vocabulary.map(v => `<span>${v}</span>`).join("")}</div></article>
      <article class="panel"><h2>High-frequency connectors</h2><div class="chip-row">${highFrequency.connectors.map(v => `<span>${v}</span>`).join("")}</div></article>
      <article class="panel"><h2>Common mistakes</h2><ul class="check-list">${highFrequency.mistakes.map(v => `<li>${v}</li>`).join("")}</ul></article>
    </div>
  `;
}

function renderProgress() {
  const grouped = CATEGORIES.filter(c => c.id !== "all").map(cat => {
    const items = lessons.filter(l => l.category === cat.id);
    const done = items.filter(l => completed.has(l.id)).length;
    return { ...cat, items, done, pct: percent(done, items.length) };
  });
  $("#progressContent").innerHTML = `
    <div class="progress-hero panel">
      <strong>${percent(completed.size, lessons.length)}%</strong>
      <p>${completed.size} of ${lessons.length} lessons revised. ${quizAnswered.size} of ${quizQuestions.length} quiz questions attempted.</p>
      <div class="progress-bar"><span style="width:${percent(completed.size, lessons.length)}%"></span></div>
    </div>
    <div class="progress-list">${grouped.map(group => `
      <article class="progress-row">
        <div><strong>${group.icon} ${group.label}</strong><small>${group.done}/${group.items.length} complete</small></div>
        <div class="progress-bar"><span style="width:${group.pct}%"></span></div>
      </article>
    `).join("")}</div>
  `;
}

function printLesson(id) {
  const lesson = lessons.find(l => l.id === id);
  if (!lesson) return;
  const mount = $("#printMount");
  mount.innerHTML = `<article class="print-card"><h1>${lesson.title}</h1><p>${lesson.summary}</p><h2>Exam example</h2><p>${lesson.examExample}</p><h2>Common mistakes</h2><ul>${lesson.commonMistakes.map(m => `<li>${m}</li>`).join("")}</ul><h2>Mini practice</h2><p>${lesson.miniPractice}</p><h2>Answer key</h2><p>${lesson.answerKey}</p></article>`;
  window.print();
}

function handleClicks(event) {
  const viewBtn = event.target.closest("[data-view]");
  if (viewBtn) setView(viewBtn.dataset.view);

  const jumpFilter = event.target.closest("[data-jump-filter]");
  if (jumpFilter) { activeFilter = jumpFilter.dataset.jumpFilter; setView("lessons"); renderFilters(); renderLessons(); }

  const filter = event.target.closest("[data-filter]");
  if (filter) { activeFilter = filter.dataset.filter; renderFilters(); renderLessons(); }

  const complete = event.target.closest("[data-complete]");
  if (complete) {
    const id = complete.dataset.complete;
    completed.has(id) ? completed.delete(id) : completed.add(id);
    saveProgress();
    renderAll();
  }

  const print = event.target.closest("[data-print]");
  if (print) printLesson(print.dataset.print);

  const openLesson = event.target.closest("[data-open-lesson]");
  if (openLesson) {
    setView("lessons");
    setTimeout(() => document.querySelector(`#lesson-${openLesson.dataset.openLesson}`)?.scrollIntoView({ behavior: "smooth", block: "center" }), 80);
  }

  const practiceTab = event.target.closest("[data-practice]");
  if (practiceTab) { activePractice = practiceTab.dataset.practice; renderPractice(); }

  const quizAnswer = event.target.closest("[data-quiz]");
  if (quizAnswer) {
    const qi = Number(quizAnswer.dataset.quiz);
    const ai = Number(quizAnswer.dataset.answer);
    const q = quizQuestions[qi];
    const card = quizAnswer.closest(".quiz-card");
    card.querySelectorAll("button[data-answer]").forEach(btn => {
      const isCorrect = Number(btn.dataset.answer) === q.c;
      btn.classList.toggle("correct", isCorrect);
      btn.classList.toggle("wrong", Number(btn.dataset.answer) === ai && !isCorrect);
    });
    quizAnswered.add(qi);
    saveProgress();
    $(`#quiz-exp-${qi}`).textContent = `${ai === q.c ? "Correct" : "Correction"}: ${q.a[q.c]} — ${q.exp}`;
    renderStats();
    renderProgress();
  }
}

function renderAll() {
  renderStats();
  renderCategories();
  renderNextLesson();
  renderFilters();
  renderLessons();
  renderPractice();
  renderChecklist();
  renderProgress();
}

function initTheme() {
  const saved = localStorage.getItem("bacTheme") || "light";
  document.body.dataset.theme = saved;
  $("#themeToggle").textContent = saved === "dark" ? "☀️" : "🌙";
}

function init() {
  initTheme();
  renderAll();
  document.addEventListener("click", handleClicks);
  $("#lessonSearch").addEventListener("input", renderLessons);
  $("#printChecklist").addEventListener("click", () => window.print());
  $("#resetProgress").addEventListener("click", () => {
    if (!confirm("Reset all local progress?")) return;
    completed = new Set();
    quizAnswered = new Set();
    saveProgress();
    renderAll();
  });
  $("#themeToggle").addEventListener("click", () => {
    const next = document.body.dataset.theme === "dark" ? "light" : "dark";
    document.body.dataset.theme = next;
    localStorage.setItem("bacTheme", next);
    $("#themeToggle").textContent = next === "dark" ? "☀️" : "🌙";
  });
  if (location.hash) setView(location.hash.replace("#", ""));
}

init();
