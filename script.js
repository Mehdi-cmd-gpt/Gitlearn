const lessons = [
  {
    id: "youth",
    category: "themes",
    tags: ["themes", "grammar", "writing", "exam"],
    type: "Unit 1",
    title: "The Gift of Youth",
    minutes: 45,
    tone: "teal",
    text: "Study youth potential, challenges, dreams, role models, and responsible choices.",
    vocabulary: ["adolescence", "role model", "ambition", "peer pressure", "self-confidence"],
    functions: "Expressing opinion, agreeing, disagreeing, and agreeing partially.",
    grammar: "Gerund or infinitive after common verbs and expressions.",
    writing: "Describe a person or write an opinion paragraph about young people.",
    examTask: "Write three arguments about how Moroccan youth can contribute to society.",
    points: ["Opinion language", "Gerund / infinitive", "Person description"],
  },
  {
    id: "humour",
    category: "themes",
    tags: ["themes", "grammar", "writing", "exam"],
    type: "Unit 2",
    title: "Humour",
    minutes: 40,
    tone: "teal",
    text: "Learn how humour works in communication, culture, storytelling, and daily life.",
    vocabulary: ["joke", "sense of humour", "sarcasm", "laughter", "cartoon"],
    functions: "Expressing lack of understanding and asking for clarification.",
    grammar: "Modals in present and past meanings: can, could, may, might, must, should.",
    writing: "Write a funny story with a clear setting, problem, and ending.",
    examTask: "Rewrite modal sentences to show advice, possibility, obligation, or deduction.",
    points: ["Clarification", "Modals", "Funny story"],
  },
  {
    id: "education",
    category: "themes",
    tags: ["themes", "grammar", "writing", "exam"],
    type: "Unit 3",
    title: "Formal, Informal and Non-formal Education",
    minutes: 45,
    tone: "teal",
    text: "Compare school learning, life experience, training, literacy, and lifelong learning.",
    vocabulary: ["schooling", "dropout", "training", "skills", "lifelong learning"],
    functions: "Expressing purpose: to, in order to, so as to, so that.",
    grammar: "Past perfect for earlier past actions and cause-effect in narratives.",
    writing: "Write a report about a school activity, campaign, or learning problem.",
    examTask: "Complete a report plan: title, purpose, findings, and recommendation.",
    points: ["Purpose", "Past perfect", "Report writing"],
  },
  {
    id: "sustainable-development",
    category: "themes",
    tags: ["themes", "grammar", "writing", "exam"],
    type: "Unit 4",
    title: "Sustainable Development",
    minutes: 45,
    tone: "teal",
    text: "Focus on environment, resources, development, energy, recycling, and civic action.",
    vocabulary: ["renewable energy", "pollution", "recycle", "resources", "eco-friendly"],
    functions: "Expressing cause and effect: because, due to, therefore, as a result.",
    grammar: "Future perfect for actions completed before a future time.",
    writing: "Write a formal letter about an environmental issue or local campaign.",
    examTask: "Link five environmental problems to effects using correct connectors.",
    points: ["Cause / effect", "Future perfect", "Formal letter"],
  },
  {
    id: "women-power",
    category: "themes",
    tags: ["themes", "grammar", "writing", "exam"],
    type: "Unit 5",
    title: "Women and Power",
    minutes: 45,
    tone: "teal",
    text: "Discuss women's rights, leadership, equality, achievement, and social participation.",
    vocabulary: ["empowerment", "equality", "leadership", "achievement", "rights"],
    functions: "Expressing addition and concession: moreover, besides, although, however.",
    grammar: "Passive voice for processes, achievements, and formal statements.",
    writing: "Write a book or film review, or a short profile of an influential woman.",
    examTask: "Transform active sentences into passive sentences accurately.",
    points: ["Addition / concession", "Passive voice", "Review writing"],
  },
  {
    id: "culture",
    category: "themes",
    tags: ["themes", "grammar", "writing", "exam"],
    type: "Unit 6",
    title: "Cultural Issues and Values",
    minutes: 45,
    tone: "teal",
    text: "Explore Moroccan identity, cultural diversity, stereotypes, values, and tolerance.",
    vocabulary: ["identity", "tradition", "stereotype", "tolerance", "diversity"],
    functions: "Defining, apologising, and complaining politely.",
    grammar: "Phrasal verbs in everyday and social situations.",
    writing: "Write an informal letter or email about a cultural experience.",
    examTask: "Match phrasal verbs to meanings, then use three in meaningful sentences.",
    points: ["Definitions", "Phrasal verbs", "Informal letter"],
  },
  {
    id: "citizenship",
    category: "themes",
    tags: ["themes", "grammar", "writing", "exam"],
    type: "Unit 7",
    title: "Citizenship",
    minutes: 45,
    tone: "teal",
    text: "Study rights, responsibilities, volunteering, civic duties, and community service.",
    vocabulary: ["volunteer", "civic duty", "responsibility", "community", "solidarity"],
    functions: "Asking for and giving advice: should, had better, if I were you.",
    grammar: "Reported speech in statements, questions, requests, and advice.",
    writing: "Write an advice email or a paragraph about active citizenship.",
    examTask: "Report advice and requests while changing pronouns and tenses correctly.",
    points: ["Advice", "Reported speech", "Email writing"],
  },
  {
    id: "international-organisations",
    category: "themes",
    tags: ["themes", "grammar", "writing", "exam"],
    type: "Unit 8",
    title: "International Organizations",
    minutes: 45,
    tone: "teal",
    text: "Understand global cooperation, humanitarian work, peace, health, and development.",
    vocabulary: ["organization", "humanitarian", "aid", "cooperation", "peacekeeping"],
    functions: "Responding to good and bad news appropriately.",
    grammar: "Linking words for addition, contrast, cause, result, example, and conclusion.",
    writing: "Write a short report or article about an organization and its mission.",
    examTask: "Choose the best connector to make a paragraph logical and coherent.",
    points: ["News response", "Linking words", "Report / article"],
  },
  {
    id: "science-technology",
    category: "themes",
    tags: ["themes", "grammar", "writing", "exam"],
    type: "Unit 9",
    title: "Advances in Science and Technology",
    minutes: 45,
    tone: "teal",
    text: "Discuss inventions, digital life, artificial intelligence, health, and communication.",
    vocabulary: ["innovation", "device", "discovery", "digital", "artificial intelligence"],
    functions: "Expressing certainty and uncertainty: certainly, probably, I doubt that.",
    grammar: "Conditional sentences: zero, first, second, and third conditional.",
    writing: "Write an opinion essay about technology in education or daily life.",
    examTask: "Complete conditional sentences and explain the meaning of each type.",
    points: ["Certainty", "Conditionals", "Opinion essay"],
  },
  {
    id: "brain-drain",
    category: "themes",
    tags: ["themes", "grammar", "writing", "exam"],
    type: "Unit 10",
    title: "Brain Drain",
    minutes: 45,
    tone: "teal",
    text: "Analyze migration of skilled people, opportunities, loss, development, and solutions.",
    vocabulary: ["emigrate", "skilled workers", "opportunity", "shortage", "homeland"],
    functions: "Expressing wish and regret: I wish, if only, should have, regret.",
    grammar: "Relative clauses: restrictive and non-restrictive.",
    writing: "Write an argumentative paragraph about brain drain and national development.",
    examTask: "Join sentences using who, which, that, where, and whose.",
    points: ["Wish / regret", "Relative clauses", "Argumentative paragraph"],
  },
];

const questions = [
  {
    type: "Grammar",
    question: "Choose the correct sentence.",
    answers: [
      "If I will study, I pass.",
      "If I study, I will pass.",
      "If I studied, I will pass.",
      "If I had study, I pass.",
    ],
    correct: 1,
    note: "First conditional: If + present simple, will + base verb.",
  },
  {
    type: "Function",
    question: "Which expression shows partial agreement?",
    answers: [
      "I totally disagree with you.",
      "You are completely wrong.",
      "I see your point, but I think there is another side.",
      "What do you mean by that?",
    ],
    correct: 2,
    note: "Partial agreement accepts part of an idea before adding a different view.",
  },
  {
    type: "Vocabulary",
    question: "Which word best completes: Sustainable development protects resources for ____ generations.",
    answers: ["previous", "future", "careless", "temporary"],
    correct: 1,
    note: "The common collocation is future generations.",
  },
  {
    type: "Reported speech",
    question: "Direct: She said, \"I am revising English.\" Reported speech:",
    answers: [
      "She said that she revises English.",
      "She said that she was revising English.",
      "She said that I was revising English.",
      "She said that she has revising English.",
    ],
    correct: 1,
    note: "Present continuous usually backshifts to past continuous.",
  },
  {
    type: "Writing",
    question: "The best topic sentence is:",
    answers: [
      "Technology.",
      "I will talk about technology and it is good and bad.",
      "Technology can improve education when it is used with clear learning goals.",
      "Many people use phones.",
    ],
    correct: 2,
    note: "A strong topic sentence gives a clear position and direction.",
  },
  {
    type: "Grammar",
    question: "Choose the correct passive form: People use English worldwide.",
    answers: [
      "English is used worldwide.",
      "English used worldwide.",
      "English was use worldwide.",
      "English has use worldwide.",
    ],
    correct: 0,
    note: "Present simple passive: is/are + past participle.",
  },
  {
    type: "Function",
    question: "Choose the best response to bad news: \"I failed my driving test.\"",
    answers: [
      "Congratulations!",
      "I am sorry to hear that. Better luck next time.",
      "Could you clarify your point?",
      "I strongly agree.",
    ],
    correct: 1,
    note: "International Organizations includes responding appropriately to good and bad news.",
  },
  {
    type: "Grammar",
    question: "Complete: If I had prepared earlier, I ____ less stressed.",
    answers: ["will feel", "would feel", "would have felt", "feel"],
    correct: 2,
    note: "Third conditional: If + past perfect, would have + past participle.",
  },
  {
    type: "Grammar",
    question: "Join correctly: My sister is a doctor. She works in Rabat.",
    answers: [
      "My sister which works in Rabat is a doctor.",
      "My sister, who works in Rabat, is a doctor.",
      "My sister where works in Rabat is a doctor.",
      "My sister whose works in Rabat is a doctor.",
    ],
    correct: 1,
    note: "Use who for people. Non-restrictive extra information takes commas.",
  },
];

const flashcards = [
  ["Brain drain", "The movement of skilled people from one country to another."],
  ["Civic duty", "A responsibility that helps the community or country."],
  ["To raise awareness", "To make people know more about an issue."],
  ["Renewable energy", "Energy from sources that can be naturally replaced."],
  ["In my view", "A clean phrase for introducing your opinion."],
  ["Although", "A connector that introduces contrast."],
  ["Peer pressure", "Influence from people of the same age group."],
  ["Lifelong learning", "Learning that continues outside school and throughout life."],
  ["Empowerment", "Giving people power, confidence, and opportunity."],
  ["Humanitarian aid", "Help given to people in crisis or need."],
];

const prompts = [
  {
    text: "Some students prefer online learning, while others prefer classroom learning. Which one is better for 2BAC students?",
    tags: ["education", "technology", "opinion"],
  },
  {
    text: "Write a paragraph about how young people can help protect the environment in their city.",
    tags: ["environment", "citizenship", "examples"],
  },
  {
    text: "Many skilled people leave their country to work abroad. Discuss one advantage and one disadvantage of this choice.",
    tags: ["brain drain", "balance", "argument"],
  },
  {
    text: "Write an email to a friend giving advice about preparing for the English exam.",
    tags: ["email", "advice", "exam"],
  },
  {
    text: "Write a formal letter to your local council suggesting actions to reduce plastic waste in your city.",
    tags: ["formal letter", "sustainable development", "cause-effect"],
  },
  {
    text: "Write a short report about a school campaign that encouraged students to volunteer in the community.",
    tags: ["report", "citizenship", "school activity"],
  },
  {
    text: "Write an argumentative paragraph about whether technology makes students more independent learners.",
    tags: ["technology", "opinion", "conditionals"],
  },
  {
    text: "Write a paragraph about one disadvantage of brain drain and one possible solution for Morocco.",
    tags: ["brain drain", "argument", "solutions"],
  },
];

const validLessonIds = new Set(lessons.map((lesson) => lesson.id));
const savedCompletedLessons = JSON.parse(localStorage.getItem("completedLessons") || "[]")
  .filter((id) => validLessonIds.has(id));

const state = {
  completedLessons: savedCompletedLessons,
  answered: Number(localStorage.getItem("answered") || "0"),
  quizIndex: Number(localStorage.getItem("quizIndex") || "0") % questions.length,
  activeFilter: "all",
  timerSeconds: Number(localStorage.getItem("timerSeconds") || `${2 * 60 * 60}`),
  timerHandle: null,
  flashFlipped: false,
};

const views = document.querySelectorAll(".view");
const navButtons = document.querySelectorAll("[data-view-link]");
const lessonGrid = document.querySelector("#lessonGrid");
const todayBlocks = document.querySelector("#todayBlocks");
const lessonSearch = document.querySelector("#lessonSearch");
const filterButtons = document.querySelectorAll("[data-filter]");
const progressScore = document.querySelector("#progressScore");
const progressNote = document.querySelector("#progressNote");
const scoreFill = document.querySelector(".score-fill");
const questionType = document.querySelector("#questionType");
const questionText = document.querySelector("#questionText");
const answerGrid = document.querySelector("#answerGrid");
const feedback = document.querySelector("#feedback");
const nextQuestion = document.querySelector("#nextQuestion");
const skipQuestion = document.querySelector("#skipQuestion");
const quizMeter = document.querySelector("#quizMeter");
const quizCount = document.querySelector("#quizCount");
const flashcard = document.querySelector("#flashcard");
const flashLabel = document.querySelector("#flashLabel");
const flashFront = document.querySelector("#flashFront");
const flashBack = document.querySelector("#flashBack");
const newFlashcard = document.querySelector("#newFlashcard");
const writingPrompt = document.querySelector("#writingPrompt");
const promptTags = document.querySelector("#promptTags");
const newPrompt = document.querySelector("#newPrompt");
const timer = document.querySelector("#timer");
const startTimer = document.querySelector("#startTimer");
const pauseTimer = document.querySelector("#pauseTimer");
const resetTimer = document.querySelector("#resetTimer");
const resetProgress = document.querySelector("#resetProgress");

function saveState() {
  localStorage.setItem("completedLessons", JSON.stringify(state.completedLessons));
  localStorage.setItem("answered", String(state.answered));
  localStorage.setItem("quizIndex", String(state.quizIndex));
  localStorage.setItem("timerSeconds", String(state.timerSeconds));
}

function setView(viewId) {
  views.forEach((view) => view.classList.toggle("active", view.id === viewId));
  navButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.viewLink === viewId);
  });
  window.location.hash = viewId;
}

function updateProgress() {
  const lessonProgress = state.completedLessons.length / lessons.length;
  const quizProgress = Math.min(state.answered / questions.length, 1);
  const total = Math.round(((lessonProgress * 0.62) + (quizProgress * 0.38)) * 100);
  progressScore.textContent = `${total}%`;
  scoreFill.style.strokeDashoffset = String(314 - (314 * total) / 100);
  progressNote.textContent =
    total >= 80
      ? "You are in mock-exam territory. Keep the timer honest."
      : total >= 45
        ? "Good base. Add writing practice and timed reading next."
        : "Start with two lessons and one quiz round today.";
}

function renderLessons() {
  const query = lessonSearch.value.trim().toLowerCase();
  const filtered = lessons.filter((lesson) => {
    const lessonTags = lesson.tags || [lesson.category];
    const matchesFilter = state.activeFilter === "all" || lessonTags.includes(state.activeFilter);
    const haystack = [
      lesson.type,
      lesson.title,
      lesson.text,
      lesson.functions,
      lesson.grammar,
      lesson.writing,
      lesson.examTask,
      ...(lesson.vocabulary || []),
      ...(lesson.points || []),
    ].join(" ").toLowerCase();
    return matchesFilter && haystack.includes(query);
  });

  lessonGrid.innerHTML = filtered
    .map((lesson, index) => lessonCardMarkup(lesson, false, index))
    .join("");

  document.querySelectorAll("[data-complete]").forEach((button) => {
    button.addEventListener("click", () => toggleLesson(button.dataset.complete));
  });
}

function renderTodayBlocks() {
  todayBlocks.innerHTML = lessons
    .slice(0, 3)
    .map((lesson, index) => lessonCardMarkup(lesson, true, index))
    .join("");

  document.querySelectorAll("[data-complete]").forEach((button) => {
    button.addEventListener("click", () => toggleLesson(button.dataset.complete));
  });
}

function lessonCardMarkup(lesson, compact = false, index = 0) {
  const done = state.completedLessons.includes(lesson.id);
  const tagClass = compact ? "study-block" : "lesson-card";
  const points = compact
    ? ""
    : `
      <div class="lesson-details">
        <div><span>Vocabulary</span><p>${lesson.vocabulary.join(", ")}</p></div>
        <div><span>Function</span><p>${lesson.functions}</p></div>
        <div><span>Grammar</span><p>${lesson.grammar}</p></div>
        <div><span>Writing</span><p>${lesson.writing}</p></div>
        <div><span>Exam drill</span><p>${lesson.examTask}</p></div>
      </div>
    `;

  return `
    <article class="${tagClass}" data-tone="${lesson.tone}" style="--index: ${index}">
      <div class="${compact ? "block-top" : "lesson-top"}">
        <span class="${compact ? "block-badge" : "lesson-type"}">${lesson.type}</span>
        <span class="${compact ? "block-time" : "lesson-time"}">${lesson.minutes} min</span>
      </div>
      <h3>${lesson.title}</h3>
      <p>${lesson.text}</p>
      ${points}
      <button class="primary-action complete-btn ${done ? "done" : ""}" type="button" data-complete="${lesson.id}">
        <i data-lucide="${done ? "check" : "plus"}"></i>
        ${done ? "Completed" : "Mark done"}
      </button>
    </article>
  `;
}

function toggleLesson(lessonId) {
  if (state.completedLessons.includes(lessonId)) {
    state.completedLessons = state.completedLessons.filter((id) => id !== lessonId);
  } else {
    state.completedLessons.push(lessonId);
  }
  saveState();
  renderLessons();
  renderTodayBlocks();
  updateProgress();
  refreshIcons();
}

function renderQuestion() {
  const current = questions[state.quizIndex];
  questionType.textContent = current.type;
  questionText.textContent = current.question;
  feedback.textContent = "";
  nextQuestion.disabled = true;
  quizCount.textContent = `${state.quizIndex + 1} / ${questions.length}`;
  quizMeter.style.width = `${((state.quizIndex + 1) / questions.length) * 100}%`;

  answerGrid.innerHTML = current.answers
    .map((answer, index) => `
      <button class="answer-option" type="button" data-answer="${index}">
        ${answer}
      </button>
    `)
    .join("");

  document.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => checkAnswer(Number(button.dataset.answer)));
  });
}

function checkAnswer(index) {
  const current = questions[state.quizIndex];
  const buttons = document.querySelectorAll("[data-answer]");
  buttons.forEach((button) => {
    button.disabled = true;
    const answerIndex = Number(button.dataset.answer);
    button.classList.toggle("correct", answerIndex === current.correct);
    button.classList.toggle("wrong", answerIndex === index && index !== current.correct);
  });

  const correct = index === current.correct;
  feedback.textContent = correct ? `Correct. ${current.note}` : `Not quite. ${current.note}`;
  nextQuestion.disabled = false;
  state.answered = Math.min(state.answered + 1, questions.length);
  saveState();
  updateProgress();
}

function goNextQuestion() {
  state.quizIndex = (state.quizIndex + 1) % questions.length;
  saveState();
  renderQuestion();
}

function renderFlashcard(randomize = false) {
  if (randomize) {
    state.flashIndex = Math.floor(Math.random() * flashcards.length);
  } else {
    state.flashIndex = state.flashIndex || 0;
  }
  state.flashFlipped = false;
  const [front, back] = flashcards[state.flashIndex];
  flashLabel.textContent = "Phrase";
  flashFront.textContent = front;
  flashBack.textContent = "Tap to reveal meaning";
  flashcard.dataset.back = back;
}

function flipFlashcard() {
  state.flashFlipped = !state.flashFlipped;
  flashLabel.textContent = state.flashFlipped ? "Meaning" : "Phrase";
  flashBack.textContent = state.flashFlipped ? flashcard.dataset.back : "Tap to reveal meaning";
}

function renderPrompt() {
  const prompt = prompts[Math.floor(Math.random() * prompts.length)];
  writingPrompt.textContent = prompt.text;
  promptTags.innerHTML = prompt.tags.map((tag) => `<span>${tag}</span>`).join("");
}

function formatTime(totalSeconds) {
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

function renderTimer() {
  timer.textContent = formatTime(state.timerSeconds);
}

function startExamTimer() {
  if (state.timerHandle) return;
  state.timerHandle = window.setInterval(() => {
    state.timerSeconds = Math.max(0, state.timerSeconds - 1);
    saveState();
    renderTimer();
    if (state.timerSeconds === 0) {
      pauseExamTimer();
    }
  }, 1000);
}

function pauseExamTimer() {
  window.clearInterval(state.timerHandle);
  state.timerHandle = null;
}

function resetExamTimer() {
  pauseExamTimer();
  state.timerSeconds = 2 * 60 * 60;
  saveState();
  renderTimer();
}

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

navButtons.forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.viewLink));
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.activeFilter = button.dataset.filter;
    filterButtons.forEach((filter) => filter.classList.toggle("active", filter === button));
    renderLessons();
    refreshIcons();
  });
});

lessonSearch.addEventListener("input", () => {
  renderLessons();
  refreshIcons();
});

nextQuestion.addEventListener("click", goNextQuestion);
skipQuestion.addEventListener("click", goNextQuestion);
flashcard.addEventListener("click", flipFlashcard);
newFlashcard.addEventListener("click", () => renderFlashcard(true));
newPrompt.addEventListener("click", renderPrompt);
startTimer.addEventListener("click", startExamTimer);
pauseTimer.addEventListener("click", pauseExamTimer);
resetTimer.addEventListener("click", resetExamTimer);
resetProgress.addEventListener("click", () => {
  state.completedLessons = [];
  state.answered = 0;
  state.quizIndex = 0;
  saveState();
  renderLessons();
  renderTodayBlocks();
  renderQuestion();
  updateProgress();
  refreshIcons();
});

document.querySelectorAll("[data-exam-check]").forEach((checkbox, index) => {
  checkbox.checked = localStorage.getItem(`examCheck${index}`) === "true";
  checkbox.addEventListener("change", () => {
    localStorage.setItem(`examCheck${index}`, String(checkbox.checked));
  });
});

renderLessons();
renderTodayBlocks();
renderQuestion();
renderFlashcard(true);
renderPrompt();
renderTimer();
updateProgress();

const startingView = window.location.hash.replace("#", "");
if (startingView && document.getElementById(startingView)) {
  setView(startingView);
}

window.addEventListener("hashchange", () => {
  const view = window.location.hash.replace("#", "");
  if (view && document.getElementById(view)) {
    setView(view);
  }
});

refreshIcons();
