const lessons = [
  {
    id: "reading",
    category: "reading",
    type: "Reading",
    title: "Comprehension strategy",
    minutes: 35,
    tone: "teal",
    text: "Move from gist to proof: title, first sentence, key names, then evidence.",
    points: ["Main idea", "True or false proof", "Pronoun reference"],
  },
  {
    id: "conditionals",
    category: "grammar",
    type: "Grammar",
    title: "Conditionals",
    minutes: 25,
    tone: "coral",
    text: "Zero, first, second, and third conditional forms with exam-style meaning.",
    points: ["If + present", "If + past", "If + had + past participle"],
  },
  {
    id: "reported",
    category: "grammar",
    type: "Grammar",
    title: "Reported speech",
    minutes: 30,
    tone: "coral",
    text: "Backshift tense, adjust pronouns, and keep the reporting verb clean.",
    points: ["Statements", "Questions", "Requests"],
  },
  {
    id: "vocab",
    category: "themes",
    type: "Themes",
    title: "Vocabulary clusters",
    minutes: 20,
    tone: "leaf",
    text: "Core topic language for youth, citizenship, environment, technology, and culture.",
    points: ["Collocations", "Word families", "Useful examples"],
  },
  {
    id: "writing",
    category: "writing",
    type: "Writing",
    title: "Opinion paragraphs",
    minutes: 40,
    tone: "teal",
    text: "Build a direct position with reasons, examples, contrast, and a final sentence.",
    points: ["Topic sentence", "Example bank", "Conclusion"],
  },
  {
    id: "linkers",
    category: "writing",
    type: "Writing",
    title: "Linking words",
    minutes: 18,
    tone: "leaf",
    text: "Use connectors for addition, contrast, result, example, and conclusion.",
    points: ["Moreover", "However", "Therefore"],
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
    type: "Vocabulary",
    question: "Which word best completes: Sustainable development protects resources for ____ generations.",
    answers: ["previous", "future", "careless", "temporary"],
    correct: 1,
    note: "The common collocation is future generations.",
  },
  {
    type: "Reported speech",
    question: "Direct: She said, “I am revising English.” Reported speech:",
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
];

const flashcards = [
  ["Brain drain", "The movement of skilled people from one country to another."],
  ["Civic duty", "A responsibility that helps the community or country."],
  ["To raise awareness", "To make people know more about an issue."],
  ["Renewable energy", "Energy from sources that can be naturally replaced."],
  ["In my view", "A clean phrase for introducing your opinion."],
  ["Although", "A connector that introduces contrast."],
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
];

const state = {
  completedLessons: JSON.parse(localStorage.getItem("completedLessons") || "[]"),
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
    const matchesFilter = state.activeFilter === "all" || lesson.category === state.activeFilter;
    const haystack = `${lesson.type} ${lesson.title} ${lesson.text} ${lesson.points.join(" ")}`.toLowerCase();
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
    : `<ul>${lesson.points.map((point) => `<li>${point}</li>`).join("")}</ul>`;

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
