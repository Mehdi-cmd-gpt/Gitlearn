const supabaseConfig = window.GITLEARN_SUPABASE || {};
const supabaseUrl = String(supabaseConfig.url || "").trim();
const supabaseAnonKey = String(supabaseConfig.anonKey || "").trim();
const supabaseConfigured =
  /^https:\/\/.+\.supabase\.co$/i.test(supabaseUrl) &&
  supabaseAnonKey.length > 40 &&
  !supabaseAnonKey.includes("YOUR_") &&
  !supabaseAnonKey.includes("PASTE_");
const supabaseClient =
  supabaseConfigured && window.supabase?.createClient
    ? window.supabase.createClient(supabaseUrl, supabaseAnonKey)
    : null;

const state = {
  busy: false,
  user: null,
  profile: null,
  message: "",
  students: [],
  progress: {},
};

const adminLoginPanel = document.querySelector("#adminLoginPanel");
const adminWorkspace = document.querySelector("#adminWorkspace");
const adminAuthCard = document.querySelector("#adminAuthCard");
const adminAuthForm = document.querySelector("#adminAuthForm");
const adminEmail = document.querySelector("#adminEmail");
const adminPassword = document.querySelector("#adminPassword");
const adminLoginButton = document.querySelector("#adminLoginButton");
const adminResetPassword = document.querySelector("#adminResetPassword");
const adminAuthMessage = document.querySelector("#adminAuthMessage");
const adminShell = document.querySelector("#adminShell");
const refreshAdmin = document.querySelector("#refreshAdmin");
const adminSignOut = document.querySelector("#adminSignOut");

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function renderAuth() {
  const isAdmin = state.profile?.role === "admin" && state.profile?.status === "active";
  adminLoginPanel.hidden = isAdmin;
  adminWorkspace.hidden = !isAdmin;
  adminLoginButton.disabled = state.busy || !supabaseClient;
  adminResetPassword.disabled = state.busy || !supabaseClient;
  adminEmail.disabled = state.busy || !supabaseClient;
  adminPassword.disabled = state.busy || !supabaseClient;
  adminAuthMessage.textContent = !supabaseClient
    ? "Add Supabase URL and anon key in supabase-config.js before using the portal."
    : state.message;

  if (isAdmin) {
    adminAuthCard.innerHTML = `
      <div class="session-card">
        <div class="session-mark">${escapeHtml((state.profile.full_name || "AD").slice(0, 2).toUpperCase())}</div>
        <div>
          <span class="eyebrow">admin</span>
          <h3>${escapeHtml(state.profile.full_name || "Admin")}</h3>
          <p>${escapeHtml(state.profile.email || state.user.email || "")}</p>
        </div>
      </div>
    `;
  }
  refreshIcons();
}

async function fetchProfile(user) {
  const { data, error } = await supabaseClient
    .from("profiles")
    .select("id,email,full_name,role,status,class_group,created_at,updated_at")
    .eq("id", user.id)
    .maybeSingle();
  if (error) throw error;
  return data;
}

async function applySession(session) {
  state.user = session?.user || null;
  state.profile = null;
  if (!state.user) {
    renderAuth();
    renderAdminShell();
    return;
  }

  const profile = await fetchProfile(state.user);
  if (!profile || profile.role !== "admin" || profile.status !== "active") {
    await supabaseClient.auth.signOut();
    state.user = null;
    state.profile = null;
    state.message = "This profile is not an active admin.";
    renderAuth();
    return;
  }

  state.profile = profile;
  state.message = "Admin session ready.";
  renderAuth();
  await loadAdminData();
}

function progressSummary(payload = {}) {
  const completed = Array.isArray(payload.completedLessons) ? payload.completedLessons.length : 0;
  const practice = payload.lessonPractice && typeof payload.lessonPractice === "object"
    ? Object.values(payload.lessonPractice).reduce((total, item) => total + Object.keys(item?.answered || {}).length, 0)
    : 0;
  const exams = payload.mockExamSubmitted && typeof payload.mockExamSubmitted === "object"
    ? Object.values(payload.mockExamSubmitted).filter(Boolean).length
    : 0;
  const savedAt = payload.savedAt ? new Date(payload.savedAt).toLocaleDateString() : "No sync";
  return { completed, practice, exams, savedAt };
}

async function loadAdminData() {
  if (!supabaseClient || state.profile?.role !== "admin") return;
  adminShell.innerHTML = `
    <article class="admin-empty">
      <span class="eyebrow">Loading</span>
      <h2>Checking student accounts.</h2>
      <p>This usually takes a moment.</p>
    </article>
  `;

  const [{ data: students, error: studentsError }, { data: progress, error: progressError }] = await Promise.all([
    supabaseClient
      .from("profiles")
      .select("id,email,full_name,role,status,class_group,created_at,updated_at")
      .order("created_at", { ascending: false }),
    supabaseClient.from("student_progress").select("user_id,payload,updated_at"),
  ]);

  if (studentsError || progressError) {
    state.message = studentsError?.message || progressError?.message || "Admin data failed to load.";
    renderAuth();
    renderAdminShell();
    return;
  }

  state.students = students || [];
  state.progress = (progress || []).reduce((map, row) => {
    map[row.user_id] = row;
    return map;
  }, {});
  renderAdminShell();
  renderAuth();
}

function renderAdminShell() {
  if (!adminShell) return;
  if (state.profile?.role !== "admin") {
    adminShell.innerHTML = "";
    return;
  }

  const students = state.students;
  const activeCount = students.filter((student) => student.status === "active").length;
  const adminCount = students.filter((student) => student.role === "admin").length;
  adminShell.innerHTML = `
    <div class="admin-summary">
      <article>
        <span>Total accounts</span>
        <strong>${students.length}</strong>
      </article>
      <article>
        <span>Active accounts</span>
        <strong>${activeCount}</strong>
      </article>
      <article>
        <span>Admins</span>
        <strong>${adminCount}</strong>
      </article>
    </div>
    <div class="admin-table" role="table" aria-label="Student accounts">
      ${students.length ? students.map(renderStudentRow).join("") : `
        <article class="admin-empty">
          <span class="eyebrow">No accounts yet</span>
          <h2>Students will appear here after signup.</h2>
          <p>Share the student site link after Supabase is configured.</p>
        </article>
      `}
    </div>
  `;
  refreshIcons();
}

function renderStudentRow(student) {
  const row = state.progress[student.id];
  const summary = progressSummary(row?.payload);
  const isSelf = student.id === state.user?.id;
  return `
    <article class="student-row" data-student-id="${student.id}">
      <div class="student-main">
        <div class="student-avatar">${escapeHtml((student.full_name || student.email || "ST").slice(0, 2).toUpperCase())}</div>
        <div>
          <h3>${escapeHtml(student.full_name || "Student")}</h3>
          <p>${escapeHtml(student.email)}</p>
          <div class="student-tags">
            <span>${escapeHtml(student.role)}</span>
            <span>${escapeHtml(student.status)}</span>
            <span>${escapeHtml(student.class_group || "No class")}</span>
            <span>${escapeHtml(summary.savedAt)}</span>
          </div>
        </div>
      </div>
      <div class="student-progress-mini">
        <span>${summary.completed} lessons</span>
        <span>${summary.practice} checks</span>
        <span>${summary.exams} exams</span>
      </div>
      <div class="student-actions">
        <button class="ghost-action small" type="button" data-admin-status="${student.status === "active" ? "disabled" : "active"}" ${isSelf ? "disabled" : ""}>
          <i data-lucide="${student.status === "active" ? "ban" : "check-circle"}"></i>
          ${student.status === "active" ? "Disable" : "Activate"}
        </button>
        <button class="ghost-action small" type="button" data-admin-role="${student.role === "admin" ? "student" : "admin"}" ${isSelf ? "disabled" : ""}>
          <i data-lucide="shield"></i>
          ${student.role === "admin" ? "Make student" : "Make admin"}
        </button>
        <button class="text-action" type="button" data-admin-reset-progress ${isSelf ? "disabled" : ""}>
          <i data-lucide="rotate-ccw"></i>
          Reset progress
        </button>
      </div>
    </article>
  `;
}

async function updateStudentAccount(studentId, patch) {
  if (!supabaseClient || state.profile?.role !== "admin") return;
  const { error } = await supabaseClient.from("profiles").update(patch).eq("id", studentId);
  state.message = error ? error.message : "Student account updated.";
  await loadAdminData();
}

async function resetStudentProgress(studentId) {
  if (!supabaseClient || state.profile?.role !== "admin") return;
  const { error } = await supabaseClient.from("student_progress").delete().eq("user_id", studentId);
  state.message = error ? error.message : "Student progress reset.";
  await loadAdminData();
}

async function handleLogin(event) {
  event.preventDefault();
  if (!supabaseClient) {
    state.message = "Supabase is not configured yet.";
    renderAuth();
    return;
  }
  state.busy = true;
  state.message = "Checking admin profile...";
  renderAuth();
  try {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: adminEmail.value.trim(),
      password: adminPassword.value,
    });
    if (error) throw error;
    await applySession(data.session);
  } catch (error) {
    state.message = error.message || "Admin login failed.";
  } finally {
    state.busy = false;
    renderAuth();
  }
}

async function handlePasswordReset() {
  if (!supabaseClient) return;
  const email = adminEmail.value.trim();
  if (!email) {
    state.message = "Enter the admin email first.";
    renderAuth();
    return;
  }
  const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}${window.location.pathname}`,
  });
  state.message = error ? error.message : "Password reset email sent.";
  renderAuth();
}

async function signOut() {
  if (supabaseClient) {
    await supabaseClient.auth.signOut();
  }
  state.user = null;
  state.profile = null;
  state.students = [];
  state.progress = {};
  state.message = "Signed out.";
  renderAuth();
  renderAdminShell();
}

async function initAdmin() {
  renderAuth();
  if (!supabaseClient) return;
  const { data, error } = await supabaseClient.auth.getSession();
  if (!error && data?.session) {
    await applySession(data.session);
  }
  supabaseClient.auth.onAuthStateChange((_event, session) => {
    if (!session) {
      state.user = null;
      state.profile = null;
      state.students = [];
      state.progress = {};
      renderAuth();
      renderAdminShell();
    }
  });
}

adminAuthForm.addEventListener("submit", handleLogin);
adminResetPassword.addEventListener("click", handlePasswordReset);
refreshAdmin.addEventListener("click", loadAdminData);
adminSignOut.addEventListener("click", signOut);

document.addEventListener("click", (event) => {
  const statusButton = event.target.closest("[data-admin-status]");
  if (statusButton && !statusButton.disabled) {
    const row = statusButton.closest("[data-student-id]");
    updateStudentAccount(row.dataset.studentId, { status: statusButton.dataset.adminStatus });
    return;
  }

  const roleButton = event.target.closest("[data-admin-role]");
  if (roleButton && !roleButton.disabled) {
    const row = roleButton.closest("[data-student-id]");
    updateStudentAccount(row.dataset.studentId, { role: roleButton.dataset.adminRole });
    return;
  }

  const resetButton = event.target.closest("[data-admin-reset-progress]");
  if (resetButton && !resetButton.disabled) {
    const row = resetButton.closest("[data-student-id]");
    resetStudentProgress(row.dataset.studentId);
  }
});

initAdmin();
