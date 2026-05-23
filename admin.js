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
const studentCreationClient =
  supabaseConfigured && window.supabase?.createClient
    ? window.supabase.createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          autoRefreshToken: false,
          detectSessionInUrl: false,
          persistSession: false,
        },
      })
    : null;
const schemaSetupMessage =
  "Supabase database is not installed yet. Run supabase-schema.sql in Supabase SQL Editor, then try again.";

const state = {
  busy: false,
  createBusy: false,
  mode: "login",
  user: null,
  profile: null,
  message: "",
  createMessage: "",
  students: [],
  progress: {},
};

const adminLoginPanel = document.querySelector("#adminLoginPanel");
const adminWorkspace = document.querySelector("#adminWorkspace");
const adminAuthCard = document.querySelector("#adminAuthCard");
const adminShell = document.querySelector("#adminShell");
const refreshAdmin = document.querySelector("#refreshAdmin");
const adminSignOut = document.querySelector("#adminSignOut");
const studentCreateForm = document.querySelector("#studentCreateForm");
const studentCreateButton = document.querySelector("#studentCreateButton");
const studentCreateMessage = document.querySelector("#studentCreateMessage");

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

function isSchemaMissingError(error) {
  const message = String(error?.message || error || "").toLowerCase();
  return (
    error?.code === "PGRST205" ||
    message.includes("schema cache") ||
    message.includes("could not find the table") ||
    message.includes("public.profiles") ||
    message.includes("public.student_progress")
  );
}

function readableSupabaseError(error, fallback = "Supabase request failed.") {
  if (isSchemaMissingError(error)) return schemaSetupMessage;
  return error?.message || fallback;
}

function renderAdminAuthForm() {
  return `
    <div class="auth-mode-row" role="tablist" aria-label="Admin auth mode">
      <button class="${state.mode === "login" ? "active" : ""}" type="button" data-admin-auth-mode="login">Login</button>
      <button class="${state.mode === "setup" ? "active" : ""}" type="button" data-admin-auth-mode="setup">First admin</button>
    </div>
    <form class="auth-form" id="adminAuthForm">
      <label class="auth-field" data-admin-name-wrap ${state.mode === "setup" ? "" : "hidden"}>
        <span>Full name</span>
        <input id="adminFullName" name="full_name" type="text" autocomplete="name" placeholder="Admin name" />
      </label>
      <label class="auth-field">
        <span>Email</span>
        <input id="adminEmail" name="email" type="email" autocomplete="email" placeholder="admin@example.com" required />
      </label>
      <label class="auth-field">
        <span>Password</span>
        <input id="adminPassword" name="password" type="password" autocomplete="current-password" placeholder="Admin password" required />
      </label>
      <div class="auth-actions">
        <button class="primary-action" id="adminLoginButton" type="submit">
          <i data-lucide="${state.mode === "setup" ? "user-plus" : "log-in"}"></i>
          ${state.mode === "setup" ? "Create first admin" : "Login"}
        </button>
        <button class="text-action" id="adminResetPassword" type="button">
          <i data-lucide="key-round"></i>
          Reset password
        </button>
      </div>
    </form>
    <p class="auth-message" id="adminAuthMessage" aria-live="polite"></p>
  `;
}

function getAuthElements() {
  return {
    modeButtons: adminAuthCard.querySelectorAll("[data-admin-auth-mode]"),
    nameWrap: adminAuthCard.querySelector("[data-admin-name-wrap]"),
    fullName: adminAuthCard.querySelector("#adminFullName"),
    email: adminAuthCard.querySelector("#adminEmail"),
    password: adminAuthCard.querySelector("#adminPassword"),
    submit: adminAuthCard.querySelector("#adminLoginButton"),
    reset: adminAuthCard.querySelector("#adminResetPassword"),
    message: adminAuthCard.querySelector("#adminAuthMessage"),
  };
}

function setAdminMode(mode) {
  if (!["login", "setup"].includes(mode)) return;
  state.mode = mode;
  state.message = "";
  renderAuth();
}

function renderAuth() {
  const isAdmin = state.profile?.role === "admin" && state.profile?.status === "active";
  adminLoginPanel.hidden = isAdmin;
  adminWorkspace.hidden = !isAdmin;
  renderStudentCreateForm();

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
    refreshIcons();
    return;
  }

  if (!adminAuthCard.querySelector("#adminAuthForm")) {
    adminAuthCard.innerHTML = renderAdminAuthForm();
  }

  const setupMode = state.mode === "setup";
  const { modeButtons, nameWrap, fullName, email, password, submit, reset, message } = getAuthElements();
  modeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.adminAuthMode === state.mode);
  });
  if (nameWrap) nameWrap.hidden = !setupMode;
  if (fullName) fullName.disabled = state.busy;
  if (email) email.disabled = state.busy;
  if (password) {
    password.disabled = state.busy;
    password.autocomplete = setupMode ? "new-password" : "current-password";
  }
  if (submit) {
    submit.disabled = state.busy || !supabaseClient;
    submit.innerHTML = `
      <i data-lucide="${setupMode ? "user-plus" : "log-in"}"></i>
      ${setupMode ? "Create first admin" : "Login"}
    `;
  }
  if (reset) {
    reset.hidden = setupMode;
    reset.disabled = state.busy || !supabaseClient;
  }
  if (message) {
    message.textContent = !supabaseClient
      ? "You can type here, but admin login needs the Supabase URL and anon key in supabase-config.js."
      : state.message;
  }
  refreshIcons();
}

function renderStudentCreateForm() {
  if (!studentCreateForm) return;
  const isAdmin = state.profile?.role === "admin" && state.profile?.status === "active";
  studentCreateForm.hidden = !isAdmin;
  studentCreateForm.querySelectorAll("input").forEach((input) => {
    input.disabled = state.createBusy || !isAdmin;
  });
  if (studentCreateButton) {
    studentCreateButton.disabled = state.createBusy || !isAdmin || !studentCreationClient;
    studentCreateButton.innerHTML = `
      <i data-lucide="${state.createBusy ? "loader-circle" : "user-plus"}"></i>
      ${state.createBusy ? "Creating student" : "Create student"}
    `;
  }
  if (studentCreateMessage) {
    studentCreateMessage.textContent = state.createMessage;
  }
}

async function fetchProfile(user) {
  const { data, error } = await supabaseClient
    .from("profiles")
    .select("id,email,full_name,role,status,class_group,created_at,updated_at")
    .eq("id", user.id)
    .maybeSingle();
  if (error) throw new Error(readableSupabaseError(error));
  return data;
}

async function bootstrapFirstAdmin() {
  const { data, error } = await supabaseClient.rpc("bootstrap_first_admin");
  if (error) {
    const message = error.message || "";
    if (isSchemaMissingError(error) || message.includes("bootstrap_first_admin") || message.includes("Could not find")) {
      throw new Error(schemaSetupMessage);
    }
    throw new Error(readableSupabaseError(error));
  }
  return data === true;
}

async function applySession(session) {
  state.user = session?.user || null;
  state.profile = null;
  if (!state.user) {
    renderAuth();
    renderAdminShell();
    return;
  }

  let profile = await fetchProfile(state.user);
  let setupError = null;
  if (!profile || profile.role !== "admin" || profile.status !== "active") {
    try {
      const promoted = await bootstrapFirstAdmin();
      if (promoted) {
        profile = await fetchProfile(state.user);
      }
    } catch (error) {
      setupError = error;
    }
  }

  if (!profile || profile.role !== "admin" || profile.status !== "active") {
    await supabaseClient.auth.signOut();
    state.user = null;
    state.profile = null;
    state.message = setupError?.message || "This profile is not an active admin.";
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
    state.message = readableSupabaseError(studentsError || progressError, "Admin data failed to load.");
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
          <p>Create a student account above, then share the email and temporary password privately.</p>
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
  state.message = error ? readableSupabaseError(error) : "Student account updated.";
  await loadAdminData();
}

async function resetStudentProgress(studentId) {
  if (!supabaseClient || state.profile?.role !== "admin") return;
  const { error } = await supabaseClient.from("student_progress").delete().eq("user_id", studentId);
  state.message = error ? readableSupabaseError(error) : "Student progress reset.";
  await loadAdminData();
}

async function waitForStudentProfile(userId) {
  for (let attempt = 0; attempt < 8; attempt += 1) {
    const { data, error } = await supabaseClient
      .from("profiles")
      .select("id,email,full_name,role,status,class_group,created_at,updated_at")
      .eq("id", userId)
      .maybeSingle();
    if (error) throw new Error(readableSupabaseError(error));
    if (data) return data;
    await new Promise((resolve) => window.setTimeout(resolve, 250));
  }
  return null;
}

async function handleCreateStudent(event) {
  event.preventDefault();
  if (!studentCreationClient || state.profile?.role !== "admin") return;

  const form = event.target;
  const fullName = form.querySelector("#studentFullName")?.value.trim();
  const classGroup = form.querySelector("#studentClassGroup")?.value.trim() || null;
  const email = form.querySelector("#studentEmail")?.value.trim().toLowerCase();
  const password = form.querySelector("#studentPassword")?.value;

  if (!fullName || !email || !password) {
    state.createMessage = "Add a name, email, and password.";
    renderStudentCreateForm();
    return;
  }

  if (password.length < 6) {
    state.createMessage = "Temporary password must be at least 6 characters.";
    renderStudentCreateForm();
    return;
  }

  state.createBusy = true;
  state.createMessage = "Creating student account...";
  renderStudentCreateForm();
  refreshIcons();

  try {
    const { data, error } = await studentCreationClient.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          class_group: classGroup,
        },
      },
    });
    if (error) throw error;

    const userId = data.user?.id || data.session?.user?.id;
    if (!userId) {
      throw new Error("Student auth account was not returned by Supabase.");
    }

    await studentCreationClient.auth.signOut();
    const profile = await waitForStudentProfile(userId);
    if (!profile) {
      throw new Error("Student auth user was created, but the profile trigger did not finish. Refresh and check the list.");
    }

    const { error: updateError } = await supabaseClient
      .from("profiles")
      .update({
        full_name: fullName,
        class_group: classGroup,
        role: "student",
        status: "active",
      })
      .eq("id", userId);
    if (updateError) throw updateError;

    form.reset();
    state.createMessage = `Student created: ${email}`;
    await loadAdminData();
  } catch (error) {
    state.createMessage = readableSupabaseError(error, "Student account could not be created.");
  } finally {
    state.createBusy = false;
    renderStudentCreateForm();
    refreshIcons();
  }
}

async function handleAdminAuth(event) {
  event.preventDefault();
  if (!supabaseClient) {
    state.message = "Supabase is not configured yet.";
    renderAuth();
    return;
  }
  const form = event.target;
  const email = form.querySelector("#adminEmail")?.value.trim();
  const password = form.querySelector("#adminPassword")?.value;
  const fullName = form.querySelector("#adminFullName")?.value.trim() || "Admin";
  state.busy = true;
  state.message = state.mode === "setup" ? "Creating first admin..." : "Checking admin profile...";
  renderAuth();
  try {
    if (state.mode === "setup") {
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
        },
      });
      if (error) throw error;
      if (data.session) {
        await applySession(data.session);
      } else {
        state.mode = "login";
        state.message = "Account created. Confirm the email, then login here to finish admin setup.";
      }
    } else {
      const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
      if (error) throw error;
      await applySession(data.session);
    }
  } catch (error) {
    state.message = readableSupabaseError(error, "Admin login failed.");
  } finally {
    state.busy = false;
    renderAuth();
  }
}

async function handlePasswordReset() {
  if (!supabaseClient) return;
  const email = adminAuthCard.querySelector("#adminEmail")?.value.trim();
  if (!email) {
    state.message = "Enter the admin email first.";
    renderAuth();
    return;
  }
  const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}${window.location.pathname}`,
  });
  state.message = error ? readableSupabaseError(error) : "Password reset email sent.";
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
  state.mode = "login";
  state.message = "Signed out.";
  renderAuth();
  renderAdminShell();
}

async function initAdmin() {
  renderAuth();
  if (!supabaseClient) return;
  const { data, error } = await supabaseClient.auth.getSession();
  if (!error && data?.session) {
    try {
      await applySession(data.session);
    } catch (sessionError) {
      state.message = readableSupabaseError(sessionError);
      renderAuth();
      renderAdminShell();
    }
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

refreshAdmin.addEventListener("click", loadAdminData);
adminSignOut.addEventListener("click", signOut);
studentCreateForm?.addEventListener("submit", handleCreateStudent);

document.addEventListener("submit", (event) => {
  if (event.target.matches("#adminAuthForm")) {
    handleAdminAuth(event);
  }
});

document.addEventListener("click", (event) => {
  const modeButton = event.target.closest("[data-admin-auth-mode]");
  if (modeButton) {
    setAdminMode(modeButton.dataset.adminAuthMode);
    return;
  }

  const resetPasswordButton = event.target.closest("#adminResetPassword");
  if (resetPasswordButton && !resetPasswordButton.disabled) {
    handlePasswordReset();
    return;
  }

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
