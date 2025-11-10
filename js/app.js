// Young Health LMS - Main Application Logic

class YouthHealthLMS {
  constructor() {
    this.currentView = "home";
    this.currentUser = null;
    this.selectedCourse = null;
    this.currentlessionIndex = 0;
    this.currentChapterIndex = 0;
    this.showQuiz = false;
    this.quizState = {
      currentQuestionIndex: 0,
      selectedAnswers: [],
      showResults: false,
      score: 0,
    };

    // Track confetti firing to avoid duplicates per lesson
    this._confettiFiredFor = new Set();

    this.init();
  }

  // Calculate module-based progress for a specific course
  // If the course has chapters: module = chapter; completed when all chapter lessons are done AND chapter quiz ("<chapterId>-quiz") is passed
  // If the course is flat (no chapters): treat each lesson as a module
  calculateCourseModuleProgress(course, completedIdsOpt) {
    try {
      const hasChapters = Array.isArray(course?.chapters) && course.chapters.length > 0;
      const progress = this.getUserProgress(course.id) || { completedlessions: [] };
      const doneSet = completedIdsOpt instanceof Set ? completedIdsOpt : new Set(progress.completedlessions || []);

      if (hasChapters) {
        const totalModules = course.chapters.length;
        let completedModules = 0;
        course.chapters.forEach((ch) => {
          const lessons = ch.lessons || [];
          const allContentDone = lessons.length ? lessons.every(ls => doneSet.has(ls.id)) : true;
          const quizPassed = doneSet.has(`${ch.id}-quiz`);
          if (allContentDone && quizPassed) completedModules += 1;
        });
        const percent = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;
        return { completedModules, totalModules, percent };
      } else {
        const lessons = course.lessons || course.lessions || [];
        const totalModules = lessons.length;
        const completedModules = lessons.reduce((acc, ls) => acc + (doneSet.has(ls.id) ? 1 : 0), 0);
        const percent = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;
        return { completedModules, totalModules, percent };
      }
    } catch (_) {
      return { completedModules: 0, totalModules: 0, percent: 0 };
    }
  }

  // Password complexity: at least 6 chars, include a digit and a special character
  isStrongPassword(pw) {
    try {
      if (!pw || pw.length < 6) return false;
      const hasDigit = /[0-9]/.test(pw);
      const hasSpecial = /[^A-Za-z0-9]/.test(pw);
      return hasDigit && hasSpecial;
    } catch (_) {
      return false;
    }
  }

  init() {
    try {
      const saved = localStorage.getItem("currentUser");
      if (saved) this.currentUser = JSON.parse(saved);
      // Restore last app state if logged in
      if (this.currentUser) {
        const stateRaw = localStorage.getItem("appState");
        if (stateRaw) {
          try {
            const state = JSON.parse(stateRaw);
            if (state && state.view) {
          const currentPw = (document.getElementById("profileCurrentPassword")?.value || "").trim();
          const newPw = (document.getElementById("profileNewPassword")?.value || "").trim();
          const confirmPw = (document.getElementById("profileConfirmPassword")?.value || "").trim();
          const wantsPwChange = !!(currentPw || newPw || confirmPw);
              this.currentView = state.view || this.currentView;
              if (state.courseId && Array.isArray(typeof coursesData !== 'undefined' ? coursesData : [])) {
                const course = coursesData.find((c) => c.id === state.courseId);
                if (course) this.selectedCourse = course;
              }
              if (Number.isInteger(state.currentChapterIndex)) this.currentChapterIndex = state.currentChapterIndex;
              if (Number.isInteger(state.currentLessonIndex)) this.currentLessonIndex = state.currentLessonIndex;
              this.showQuiz = !!state.showQuiz;
            }
          } catch (_) {}
        }
      }
    } catch (_) {}
    this.render();
  }

  navigateTo(view) {
    this.currentView = view;
    this.render();
    this.saveAppState();
  }

  // Initialize or refresh AOS animations after each render
  initAOS() {
    try {
      if (window.AOS) {
        if (!this._aosInitialized) {
          window.AOS.init({
            duration: 700,
            easing: "ease-out-cubic",
            once: false,
            offset: 40,
          });
          this._aosInitialized = true;
        } else {
          window.AOS.refreshHard();
        }
        setTimeout(() => window.AOS && window.AOS.refresh(), 250);
      }
    } catch (_) {}
  }
  // Image zoom overlay for elements with class 'img-zoom'
  initImageZoom() {
    try {
      // Create overlay lazily once
      if (!this._zoomOverlay) {
        const overlay = document.createElement("div");
        overlay.className = "zoom-overlay";
        overlay.setAttribute("role", "dialog");
        overlay.setAttribute("aria-modal", "true");
        overlay.setAttribute("aria-label", "Image preview");

        const img = document.createElement("img");
        img.className = "zoom-overlay__img";
        img.alt = "Preview";
        overlay.appendChild(img);

        // Close button (top-right)
        const closeBtn = document.createElement("button");
        closeBtn.className = "zoom-overlay__close";
        closeBtn.setAttribute("type", "button");
        closeBtn.setAttribute("aria-label", "Close image preview");
  // Use a simple multiplication sign as an accessible fallback icon
  closeBtn.innerHTML = '<span class="zoom-overlay__close-icon" aria-hidden="true">&times;</span>';
        overlay.appendChild(closeBtn);

        document.body.appendChild(overlay);
        this._zoomOverlay = overlay;
        this._zoomOverlayImg = img;
        this._zoomCloseBtn = closeBtn;

        // Prevent image click from closing via overlay handler
        try { this._zoomOverlayImg.addEventListener('click', (e)=> e.stopPropagation()); } catch (_) {}
      }

      const openZoom = (src, alt) => {
        if (!this._zoomOverlay || !this._zoomOverlayImg) return;
        this._zoomOverlayImg.src = src || "";
        this._zoomOverlayImg.alt = alt || "Preview";
        this._zoomOverlay.classList.add("active");
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";

        const onEsc = (e) => {
          if (e.key === "Escape") closeZoom();
        };
        const onClick = () => closeZoom();

        this._zoomEscHandler = onEsc;
        this._zoomClickHandler = onClick;
        document.addEventListener("keydown", onEsc);
        this._zoomOverlay.addEventListener("click", onClick);

        // Bind close button
        if (this._zoomCloseBtn && !this._zoomCloseBtn.dataset.bound) {
          this._zoomCloseBtn.addEventListener('click', (e) => { e.stopPropagation(); closeZoom(); });
          this._zoomCloseBtn.dataset.bound = 'true';
        }
        // Move focus to close button for accessibility
        try { this._zoomCloseBtn && this._zoomCloseBtn.focus(); } catch (_) {}
      };

      const closeZoom = () => {
        if (!this._zoomOverlay) return;
        this._zoomOverlay.classList.remove("active");
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
        if (this._zoomEscHandler) {
          document.removeEventListener("keydown", this._zoomEscHandler);
          this._zoomEscHandler = null;
        }
        if (this._zoomClickHandler) {
          this._zoomOverlay.removeEventListener("click", this._zoomClickHandler);
          this._zoomClickHandler = null;
        }
      };

      // Bind click handlers to images with class 'img-zoom'
      document.querySelectorAll("img.img-zoom").forEach((img) => {
        if (img.dataset.zoomBound) return;
        img.style.cursor = "zoom-in";
        img.addEventListener("click", (e) => {
          e.preventDefault();
          const src = img.getAttribute("data-zoom-src") || img.src;
          const alt = img.alt || "Preview";
          openZoom(src, alt);
        });
        img.dataset.zoomBound = "true";
      });
    } catch (_) {}
  }

  // Basic login: validates saved users and persists current user
  login(identifier, password) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const idLower = (identifier || "").trim().toLowerCase();
    const idPhoneE164 = this.normalizePhoneBD(identifier);

    const user = users.find((u) => {
      const emailMatch = (u.email || "").toLowerCase() === idLower;
      const phoneStored = this.normalizePhoneBD(u.phone);
      const phoneMatch = !!idPhoneE164 && phoneStored === idPhoneE164;
      return (emailMatch || phoneMatch) && u.password === password;
    });

    if (user) {
      this.currentUser = {
        id: user.id,
        email: user.email || null,
        phone: user.phone || null,
        name: user.name,
        registeredAt: user.registeredAt,
      };
      localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
      console.log(`✅ Login successful! User ID: ${user.id}`);
      this.navigateTo("dashboard");
      return { success: true };
    }
    return { success: false, error: "Invalid email/phone or password" };
  }

  // Generate unique user ID
  generateUniqueUserId() {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    const randomChars = Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();
    const userId = `YHAP-${timestamp}-${randomChars}-${randomNum}`;

    // Log ID generation (helpful for debugging)
    console.log(`🆔 Generated User ID: ${userId}`);

    return userId;
  }

  // Normalize and validate Bangladesh phone numbers to E.164 (+8801XXXXXXXXX)
  normalizePhoneBD(raw) {
    try {
      if (raw == null) return null;
      let t = String(raw).trim();
      // Remove spaces, dashes, parentheses; keep leading + if present
      const hasPlus = t.startsWith('+');
      t = t.replace(/[^\d+]/g, '');

      // Normalize common forms to E.164
      // +8801XXXXXXXXX (already normalized)
      if (/^\+8801[3-9]\d{8}$/.test(t)) return t;
      // 8801XXXXXXXXX (missing +)
      if (/^8801[3-9]\d{8}$/.test(t)) return '+' + t;
      // 01XXXXXXXXX (local with trunk 0)
      if (/^01[3-9]\d{8}$/.test(t)) return '+880' + t;
      // 1XXXXXXXXX (mobile without trunk 0)
      if (/^1[3-9]\d{8}$/.test(t)) return '+880' + t;

      return null;
    } catch (_) { return null; }
  }

  register(name, phone, email, password, confirmPassword) {
    // phone required, email optional
    if (!name || !phone || !password || !confirmPassword) {
      return { success: false, error: "Please fill in all required fields" };
    }

    if (password !== confirmPassword) {
      return { success: false, error: "Passwords do not match" };
    }

    if (password.length < 6) {
      return {
        success: false,
        error: "Password must be at least 6 characters",
      };
    }

    if (!this.isStrongPassword(password)) {
      return {
        success: false,
        error: "Password must include at least one digit and one special character",
      };
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const phoneE164 = this.normalizePhoneBD(phone);
    if (!phoneE164) {
      return { success: false, error: "Please enter a valid phone number (e.g., +8801XXXXXXXXX)" };
    }
    if (users.find((u) => this.normalizePhoneBD(u.phone) === phoneE164)) {
      return { success: false, error: "Phone already registered" };
    }
    if (email && users.find((u) => (u.email || "").toLowerCase() === email.toLowerCase())) {
      return { success: false, error: "Email already registered" };
    }

    // Generate unique user ID
    let userId = this.generateUniqueUserId();

    // Ensure the ID is unique (extremely unlikely to collide, but good practice)
    while (users.find((u) => u.id === userId)) {
      userId = this.generateUniqueUserId();
    }

    const registrationDate = new Date().toISOString();

    const newUser = {
      id: userId,
      name,
      phone: phoneE164,
      email: email || null,
      password,
      registeredAt: registrationDate,
      lastLogin: registrationDate,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    this.currentUser = {
      id: newUser.id,
      email: newUser.email || null,
      phone: newUser.phone || null,
      name: newUser.name,
      registeredAt: newUser.registeredAt,
    };
    localStorage.setItem("currentUser", JSON.stringify(this.currentUser));

    // Log registration success with unique ID
    console.log(`✅ Registration successful! User ID: ${userId}`);

    this.navigateTo("dashboard");

    return { success: true, userId: userId };
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem("currentUser");
    this.navigateTo("home");
  }

  // Course methods
  selectCourse(courseId) {
    this.selectedCourse = coursesData.find((c) => c.id === courseId);
    this.currentlessionIndex = 0;
    this.currentLessonIndex = 0;
    this.currentChapterIndex = 0;
    this.showQuiz = false;

    // Prefer chapter-based lesson system when available
    if (
      this.selectedCourse &&
      Array.isArray(this.selectedCourse.chapters) &&
      this.selectedCourse.chapters.length > 0
    ) {
      this.selectedCourse.lessons =
        this.selectedCourse.chapters[0].lessons || [];
      this.navigateTo("lesson-slider");
    } else if (
      this.selectedCourse.lessons &&
      this.selectedCourse.lessons.length > 0
    ) {
      // New lesson slider system
      this.navigateTo("lesson-slider");
    } else {
      // Old lession system
      // Load progress and find first incomplete lession
      const progress = this.getUserProgress(courseId);
      if (progress) {
        const firstIncomplete = this.selectedCourse.lessions.findIndex(
          (lession) => !progress.completedlessions.includes(lession.id)
        );
        if (firstIncomplete !== -1) {
          this.currentlessionIndex = firstIncomplete;
        }
      }

      this.navigateTo("course");
    }
    this.saveAppState();
  }

  viewCertificate(courseId) {
    // Navigate within SPA to certificate view
    const course = (typeof coursesData !== "undefined" ? coursesData : []).find(
      (c) => c.id === courseId
    );
    if (course) {
      this.selectedCourse = course;
      this.navigateTo("certificate");
    } else {
      alert("Course not found for certificate");
    }
  }

  // Progress tracking
  getUserProgress(courseId) {
    const key = `progress-${this.currentUser.id}-${courseId}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : null;
  }

  initializeProgress(courseId) {
    const progress = {
      userId: this.currentUser.id,
      courseId: courseId,
      completedlessions: [],
      quizScores: {},
      certificateIssued: false,
    };

    const key = `progress-${this.currentUser.id}-${courseId}`;
    localStorage.setItem(key, JSON.stringify(progress));
    return progress;
  }

  updateProgress(courseId, lessionId, score, passed) {
    const key = `progress-${this.currentUser.id}-${courseId}`;
    let progress = this.getUserProgress(courseId);

    if (!progress) {
      progress = this.initializeProgress(courseId);
    }

    progress.quizScores[lessionId] = score;

    if (passed && !progress.completedlessions.includes(lessionId)) {
      progress.completedlessions.push(lessionId);
      // Certificate issuance rules
      // If course has chapters, only issue certificate when ALL module quizzes are passed
      // Else, for flat lessons, issue when all lessons completed
      try {
        const selected = this.selectedCourse || (typeof coursesData !== 'undefined' ? coursesData.find(c=>c.id===courseId) : null);
        if (selected && Array.isArray(selected.chapters) && selected.chapters.length > 0) {
          const doneSet = new Set(progress.completedlessions || []);
          const allQuizzesPassed = selected.chapters.every(ch => doneSet.has(`${ch.id}-quiz`));
          progress.certificateIssued = !!allQuizzesPassed;
        } else {
          const total = selected?.lessons ? selected.lessons.length : selected?.lessions ? selected.lessions.length : 0;
          if (total > 0 && progress.completedlessions.length >= total) {
            progress.certificateIssued = true;
          }
        }
      } catch (_) {}
    }

    localStorage.setItem(key, JSON.stringify(progress));
    return progress;
  }

  calculateProgress(course) {
    const progress = this.getUserProgress(course.id);
    if (!progress) return 0;
    const total = course.lessons
      ? course.lessons.length
      : course.lessions
      ? course.lessions.length
      : 1;
    return (progress.completedlessions.length / total) * 100;
  }

  isCourseCompleted(courseId) {
    const progress = this.getUserProgress(courseId);
    return progress?.certificateIssued || false;
  }

  // Quiz methods
  startQuiz() {
    this.showQuiz = true;
    this.quizState = {
      currentQuestionIndex: 0,
      selectedAnswers: [],
      showResults: false,
      score: 0,
    };
    this.render();
  }

  selectAnswer(answerIndex) {
    this.quizState.selectedAnswers[this.quizState.currentQuestionIndex] =
      answerIndex;
    this.render();
  }

  nextQuestion() {
    const items = this.selectedCourse.lessons || this.selectedCourse.lessions;
    const idx = this.selectedCourse.lessons
      ? this.currentLessonIndex || 0
      : this.currentlessionIndex;
    const currentItem = items[idx];
    const isLastQuestion =
      this.quizState.currentQuestionIndex ===
      currentItem.quiz.questions.length - 1;

    if (isLastQuestion) {
      this.calculateQuizScore();
    } else {
      this.quizState.currentQuestionIndex++;
      this.render();
    }
  }

  previousQuestion() {
    if (this.quizState.currentQuestionIndex > 0) {
      this.quizState.currentQuestionIndex--;
      this.render();
    }
  }

  calculateQuizScore() {
    const items = this.selectedCourse.lessons || this.selectedCourse.lessions;
    const idx = this.selectedCourse.lessons
      ? this.currentLessonIndex || 0
      : this.currentlessionIndex;
    const currentItem = items[idx];
    let correct = 0;

    currentItem.quiz.questions.forEach((question, index) => {
      if (this.quizState.selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });

    const percentage = (correct / currentItem.quiz.questions.length) * 100;
    this.quizState.score = percentage;
    this.quizState.showResults = true;

    // Fire confetti once when passing
    try {
      const passed = percentage >= (currentItem.quiz?.passingScore || 0);
      const key = `${this.selectedCourse?.id || 'course'}:${currentItem?.id || idx}`;
      if (passed && typeof window !== 'undefined' && window.confetti && !this._confettiFiredFor.has(key)) {
        // Subtle celebratory burst
        const burst = (originX) => window.confetti({
          particleCount: 80,
          spread: 70,
          startVelocity: 35,
          gravity: 0.9,
          ticks: 200,
          scalar: 0.9,
          origin: { y: 0.2, x: originX }
        });
        burst(0.3); burst(0.7);
        this._confettiFiredFor.add(key);
      }
    } catch (_) {}
    this.render();
  }

  retryQuiz() {
    this.quizState = {
      currentQuestionIndex: 0,
      selectedAnswers: [],
      showResults: false,
      score: 0,
    };
    this.render();
  }

  finishQuiz() {
    const usingLessons = !!this.selectedCourse.lessons;
    const items = this.selectedCourse.lessons || this.selectedCourse.lessions;
    const idx = usingLessons
      ? this.currentLessonIndex || 0
      : this.currentlessionIndex;
    const currentItem = items[idx];
    const passed = this.quizState.score >= currentItem.quiz.passingScore;

    this.updateProgress(
      this.selectedCourse.id,
      currentItem.id,
      this.quizState.score,
      passed
    );
    this.showQuiz = false;

    if (passed && idx < items.length - 1) {
      setTimeout(() => {
        if (usingLessons) {
          this.currentLessonIndex = idx + 1;
        } else {
          this.currentlessionIndex = idx + 1;
        }
        this.render();
      }, 1500);
    } else {
      this.render();
    }
  }

  changelession(index) {
    const progress =
      this.getUserProgress(this.selectedCourse.id) ||
      this.initializeProgress(this.selectedCourse.id);
    const items = this.selectedCourse.lessons || this.selectedCourse.lessions;
    const unlocked =
      index === 0 || progress.completedlessions.includes(items[index - 1]?.id);

    if (unlocked) {
      this.currentlessionIndex = index;
      this.currentLessonIndex = index;
      this.showQuiz = false;
      this.render();
    }
  }

  // Render methods
  render() {
    const app = document.getElementById("app");

    switch (this.currentView) {
      case "home":
        app.innerHTML = this.renderHome();
        this.initHomeScripts();
        this.initAOS();
        break;
      case "login":
        app.innerHTML = this.renderLogin();
        this.initAOS();
        this.attachLoginHandlers();
        try { this.attachForgotPasswordHandlers(); } catch (_) {}
        break;
      case "register":
        app.innerHTML = this.renderRegister();
        this.initAOS();
        this.attachRegisterHandlers();
        break;
      case "dashboard":
        app.innerHTML = this.renderDashboard();
        this.initAOS();
        break;
      case "course":
        app.innerHTML = this.renderCourse();
        this.initAOS();
        this.initLessonAudio();
        break;
      case "lesson-slider":
        app.innerHTML = this.renderLessonSlider();
        // Initialize lesson audio controls/state after DOM is ready
        this.initLessonAudio();
        this.initAOS();
        // Initialize any lesson-specific interactive enhancements (charts, counters)
        try { this.initLessonEnhancements(); } catch (_) {}
        try {
          setTimeout(() => this.scrollActiveLessonIntoView(), 80);
        } catch (_) {}
        break;
      case "certificate":
        app.innerHTML = this.renderCertificate();
        this.initAOS();
        break;
      case "profile":
        app.innerHTML = this.renderProfile();
        this.initAOS();
        this.attachProfileHandlers();
        break;
    }

    // View-specific overflow handling
    // For lesson slider, allow horizontal overflow (auto) to avoid clipping wide content
    try {
      const htmlEl = document.documentElement;
      if (this.currentView === "lesson-slider") {
        if (htmlEl) htmlEl.style.overflowX = "visible";
        if (document.body) document.body.style.overflowX = "visible";
      } else {
        if (htmlEl) htmlEl.style.overflowX = ""; // revert to stylesheet (likely hidden)
        if (document.body) document.body.style.overflowX = "";
      }
    } catch (_) {
      /* no-op */
    }

    // Initialize image zoom bindings on every render
    try { this.initImageZoom(); } catch (_) {}

  // Initialize password show/hide toggles when present
  try { this.initPasswordToggles(); } catch (_) {}

    // Persist state after each render
    this.saveAppState();
  }

  // Persist minimal app state to survive refresh
  saveAppState() {
    try {
      const state = {
        view: this.currentView,
        courseId: this.selectedCourse?.id || null,
        currentChapterIndex: this.currentChapterIndex || 0,
        currentLessonIndex: this.currentLessonIndex || 0,
        showQuiz: !!this.showQuiz,
      };
      localStorage.setItem("appState", JSON.stringify(state));
    } catch (_) {}
  }

  // Initialize lesson-specific enhancements like counters and charts when elements are present
  initLessonEnhancements() {
    try {
      // Animated counter for global overview (90%)
      const counterEl = document.getElementById("globalCounter");
      if (counterEl && !counterEl.dataset.animated) {
        const target = Number(counterEl.getAttribute("data-target") || 90);
        let start = 0;
        const step = () => {
          start = Math.min(start + 1, target);
          counterEl.textContent = String(start);
          if (start < target) requestAnimationFrame(step);
          else counterEl.dataset.animated = "true";
        };
        // Trigger on intersect to avoid animating offscreen
        const obs = new IntersectionObserver((entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting && !counterEl.dataset.animated) {
              requestAnimationFrame(step);
              obs.disconnect();
            }
          });
        }, { threshold: 0.4 });
        obs.observe(counterEl);
      }

      // Animate chapter progress percent from 0 to target once per render
      const chapterEl = document.getElementById('chapterProgressValue');
      if (chapterEl && !chapterEl.dataset.animated) {
        const target = Math.max(0, Math.min(100, parseInt(chapterEl.getAttribute('data-target') || '0', 10)));
        let startTs = null;
        const duration = 900; // ms
        const tick = (ts) => {
          if (!startTs) startTs = ts;
          const t = Math.min(1, (ts - startTs) / duration);
          // easeOutCubic
          const eased = 1 - Math.pow(1 - t, 3);
          const val = Math.round(eased * target);
          chapterEl.textContent = String(val);
          if (t < 1) requestAnimationFrame(tick); else chapterEl.dataset.animated = 'true';
        };
        // Ensure initial 0 visible
        chapterEl.textContent = '0';
        requestAnimationFrame(tick);
      }

      // Initialize Chart.js population pyramid if canvas exists
      const pyramidCanvas = document.getElementById("populationPyramid");
      if (pyramidCanvas && !pyramidCanvas.dataset.chartInitialized && window.Chart) {
        try {
          // Apply responsive height via CSS class (small: 480px, large: 640px)
          try { pyramidCanvas.classList && pyramidCanvas.classList.add("chart-pyramid"); } catch (_) {}
          const ctx = pyramidCanvas.getContext("2d");
          const labels = [
            "0-4", "5-9", "10-14", "15-19", "20-24", "25-29", "30-34", "35-39",
            "40-44", "45-49", "50-54", "55-59", "60-64", "65-69", "70-74", "75-79",
            "80-84", "85-89", "90-94", "95-99", "100+"
          ];
          const highlightAges = new Set(["10-14", "15-19", "20-24"]);
          const maleBase = "#2563EB";      // blue-600
          const maleHighlight = "#1D4ED8";  // blue-700
          const femaleBase = "#F97316";    // orange-500
          const femaleHighlight = "#EA580C"; // orange-600

          const maleData = [-7.63, -7.41, -7.82, -8.5, -8.27, -7.92, -6.46, -6.68, -6.04, -4.92, -4.14, -3.78, -2.78, -2.59, -1.77, -1.26, -0.56, -0.18, -0.12, -0.06, -0.01];
          const femaleData = [7.95, 7.92, 8.51, 8.07, 6.72, 7.92, 6.46, 5.66, 6.04, 5.12, 4.13, 4.0, 2.96, 3.01, 2.15, 1.57, 0.67, 0.46, 0.17, 0.08, 0.01];

          const maleColors = labels.map(l => highlightAges.has(l) ? maleHighlight : maleBase);
          const femaleColors = labels.map(l => highlightAges.has(l) ? femaleHighlight : femaleBase);

          // Subtle outline for highlighted bars
          const maleBorderColors = labels.map(l => highlightAges.has(l) ? "#93C5FD" : "rgba(0,0,0,0.06)"); // blue-300 or faint gray
          const femaleBorderColors = labels.map(l => highlightAges.has(l) ? "#FDBA74" : "rgba(0,0,0,0.06)"); // orange-300 or faint gray
          const maleBorderWidths = labels.map(l => highlightAges.has(l) ? 2 : 0.5);
          const femaleBorderWidths = labels.map(l => highlightAges.has(l) ? 2 : 0.5);

          // Background band plugin to softly highlight selected age groups
          const ageBandHighlightBg = {
            id: "ageBandHighlightBg",
            beforeDatasetsDraw(chart) {
              try {
                const { ctx, chartArea } = chart;
                const yScale = chart.scales.y;
                if (!yScale || !chartArea) return;
                ctx.save();
                labels.forEach((lab, i) => {
                  if (!highlightAges.has(lab)) return;
                  const center = yScale.getPixelForValue(lab);
                  // Approximate category height using neighbor delta
                  const prev = yScale.getPixelForValue(labels[Math.max(0, i - 1)]);
                  const next = yScale.getPixelForValue(labels[Math.min(labels.length - 1, i + 1)]);
                  const step = Math.max(8, Math.abs(next - prev) / 2); // fallback minimum thickness
                  const top = center - step / 2;
                  const height = step;
                  ctx.fillStyle = "rgba(234, 88, 12, 0.08)"; // subtle orange wash
                  ctx.fillRect(chartArea.left, top, chartArea.right - chartArea.left, height);
                });
                ctx.restore();
              } catch (_) {}
            }
          };

          // Draw-time subtle shadow for highlighted bars
          const ageBarShadow = {
            id: "ageBarShadow",
            afterDatasetsDraw(chart) {
              try {
                const { ctx } = chart;
                const labs = chart.data.labels || [];
                ctx.save();
                // Dataset 0 (Male)
                const meta0 = chart.getDatasetMeta(0);
                if (meta0 && meta0.data) {
                  meta0.data.forEach((bar, i) => {
                    const lab = labs[i];
                    if (!highlightAges.has(lab)) return;
                    const x = bar.x, y = bar.y, base = bar.base;
                    const width = Math.abs((bar.x ?? 0) - (bar.base ?? 0));
                    const left = Math.min(x, base);
                    const top = y - (bar.height || 0) / 2;
                    const height = (bar.height || 0);
                    ctx.shadowBlur = 6;
                    ctx.shadowColor = "rgba(29, 78, 216, 0.25)"; // blue-700
                    ctx.shadowOffsetX = 0;
                    ctx.shadowOffsetY = 0;
                    ctx.fillStyle = "rgba(29, 78, 216, 0.05)";
                    ctx.fillRect(left, top, width, height);
                  });
                }
                // Dataset 1 (Female)
                const meta1 = chart.getDatasetMeta(1);
                if (meta1 && meta1.data) {
                  meta1.data.forEach((bar, i) => {
                    const lab = labs[i];
                    if (!highlightAges.has(lab)) return;
                    const x = bar.x, y = bar.y, base = bar.base;
                    const width = Math.abs((bar.x ?? 0) - (bar.base ?? 0));
                    const left = Math.min(x, base);
                    const top = y - (bar.height || 0) / 2;
                    const height = (bar.height || 0);
                    ctx.shadowBlur = 6;
                    ctx.shadowColor = "rgba(234, 88, 12, 0.25)"; // orange-600
                    ctx.shadowOffsetX = 0;
                    ctx.shadowOffsetY = 0;
                    ctx.fillStyle = "rgba(234, 88, 12, 0.05)";
                    ctx.fillRect(left, top, width, height);
                  });
                }
                ctx.restore();
              } catch (_) {}
            }
          };

          new window.Chart(ctx, {
            type: "bar",
            plugins: [ageBandHighlightBg, ageBarShadow],
            data: {
              labels,
              datasets: [
                {
                  label: "Male",
                  backgroundColor: maleColors,
                  borderColor: maleBorderColors,
                  borderWidth: maleBorderWidths,
                  borderSkipped: false,
                  data: maleData
                },
                {
                  label: "Female",
                  backgroundColor: femaleColors,
                  borderColor: femaleBorderColors,
                  borderWidth: femaleBorderWidths,
                  borderSkipped: false,
                  data: femaleData
                }
              ]
            },
            options: {
              indexAxis: "y",
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  ticks: {
                    callback: (val) => Math.abs(val)
                  },
                  title: { display: true, text: "Population (Millions)" }
                },
                y: {
                  ticks: {
                    autoSkip: false,
                    color: (ctx) => (highlightAges.has(ctx.tick.value) ? "#111827" : undefined), // darker for highlights
                    font: (ctx) => (highlightAges.has(ctx.tick.value) ? { weight: "bold" } : undefined)
                  }
                }
              },
              plugins: {
                legend: { position: "bottom" },
                subtitle: {
                  display: true,
                  text: "Highlighted age groups: 10–14, 15–19, 20–24",
                  padding: { top: 4, bottom: 8 },
                  color: "#374151"
                }
              }
            }
          });
          pyramidCanvas.dataset.chartInitialized = "true";
        } catch (_) {}
      }

      // Regional shares SVG map overlay (no image): shows all regions on a vector world-style backdrop
      const regionalCanvas = document.getElementById("regionalShareChart");
      if (regionalCanvas && !regionalCanvas.dataset.mapInitialized) {
        try {
          // Build a map wrapper to replace the canvas
          const regions = [
            { key: 'north-america', label: 'North America (4%)', top: '36%', left: '18%', color: '#60A5FA' },
            { key: 'latin-america', label: 'Latin America (8%)', top: '58%', left: '30%', color: '#F472B6' },
            { key: 'europe', label: 'Europe (6%)', top: '28%', left: '52%', color: '#A78BFA' },
            { key: 'mena', label: 'MENA (10%)', top: '40%', left: '54%', color: '#22D3EE' },
            { key: 'ssa', label: 'Sub-Saharan Africa (26%)', top: '60%', left: '52%', color: '#34D399' },
            { key: 'asia-pacific', label: 'Asia-Pacific (29%)', top: '44%', left: '74%', color: '#FBBF24' }
          ];

          const wrap = document.createElement('div');
          wrap.className = 'regional-map-wrap';
          // Accessibility
          wrap.setAttribute('role', 'img');
          wrap.setAttribute('aria-label', 'Regional youth shares world map');

          // Using a background image for the map as requested; no inline SVG backdrop needed

          // Build chips
          regions.forEach(r => {
            const chip = document.createElement('div');
            chip.className = `region-chip region-${r.key}`;
            chip.style.top = r.top;
            chip.style.left = r.left;
            chip.style.setProperty('--chip-color', r.color);
            chip.innerHTML = `<span class="chip-dot" aria-hidden="true"></span><span class="chip-text">${r.label}</span>`;
            wrap.appendChild(chip);
          });

          // Optional legend at bottom for screen readers and visibility
          const legend = document.createElement('ul');
          legend.className = 'region-legend';
          regions.forEach(r => {
            const li = document.createElement('li');
            li.innerHTML = `<span class="legend-swatch" style="background:${r.color}"></span>${r.label}`;
            legend.appendChild(li);
          });
          wrap.appendChild(legend);

          // Replace the canvas in-place
          regionalCanvas.replaceWith(wrap);
          wrap.dataset.mapInitialized = 'true';
        } catch (_) {}
      }

      // Toggle and Chart.js for Top 5 causes (Lesson 3)
      const causesCards = document.getElementById("topCausesCards");
      const causesChartWrap = document.getElementById("topCausesChartWrap");
      const causesToggleCards = document.getElementById("topCausesToggleCards");
      const causesToggleChart = document.getElementById("topCausesToggleChart");
      const causesControls = document.getElementById("topCausesControls");

      // Reusable plugin to draw value labels on bars (supports vertical & horizontal orientations)
      const barValueLabelsPlugin = {
        id: 'barValueLabels',
        afterDatasetsDraw(chart, args, opts) {
          try {
            const { ctx } = chart;
            const isHorizontal = chart.options.indexAxis === 'y';
            const formatter = (opts && typeof opts.formatter === 'function') ? opts.formatter : (v => String(v));
            chart.data.datasets.forEach((ds, dsIndex) => {
              const meta = chart.getDatasetMeta(dsIndex);
              if (!meta || !meta.data) return;
              meta.data.forEach((elem, i) => {
                const raw = ds.data[i];
                if (raw == null) return;
                const txt = formatter(raw, i, ds, chart);
                const pos = elem.tooltipPosition();
                ctx.save();
                ctx.font = '600 11px Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif';
                ctx.fillStyle = '#111827';
                ctx.textBaseline = 'middle';
                if (isHorizontal) {
                  // Place label slightly beyond bar end; handle negative gracefully
                  const isNeg = raw < 0;
                  ctx.textAlign = isNeg ? 'right' : 'left';
                  const base = elem.base != null ? elem.base : pos.x;
                  const endX = pos.x;
                  const delta = endX - base;
                  const labelX = base + delta + (isNeg ? -8 : 8);
                  ctx.fillText(txt, labelX, pos.y);
                } else {
                  // Vertical bars: place above bar top
                  ctx.textAlign = 'center';
                  // Attempt to derive top pixel (elem.y is center); use element properties when available
                  const topY = (elem.y - (elem.height ? elem.height / 2 : 0)) - 6;
                  ctx.fillText(txt, pos.x, topY);
                }
                ctx.restore();
              });
            });
          } catch (_) { /* silent */ }
        }
      };

      const ensureTopCausesChart = () => {
        const canvas = document.getElementById("top5CausesChart");
        if (!canvas || canvas.dataset.chartInitialized || !window.Chart) return;
        try {
          const ctx = canvas.getContext("2d");
          new window.Chart(ctx, {
            type: "bar",
            plugins: [barValueLabelsPlugin],
            data: {
              labels: [
                "Road traffic accident",
                "Suicide",
                "Violence",
                "Lower Respiratory Tract infection",
                "HIV/AIDS"
              ],
              datasets: [{
                label: "Relative rank (higher = more prominent)",
                data: [5, 4, 3, 2, 1],
                backgroundColor: [
                  "#FB923C", // orange-400
                  "#F472B6", // pink-400
                  "#34D399", // emerald-400
                  "#60A5FA", // blue-400
                  "#2DD4BF"  // teal-400
                ],
                borderRadius: 8,
                barPercentage: 0.7,
                categoryPercentage: 0.7
              }]
            },
            options: {
              indexAxis: "y",
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  suggestedMin: 0,
                  suggestedMax: 5,
                  title: { display: true, text: "Relative rank" },
                  ticks: { stepSize: 1 }
                }
              },
              plugins: {
                legend: { display: false },
                tooltip: {
                  callbacks: {
                    label: (ctx) => `Rank: ${ctx.parsed.x}`
                  }
                },
                barValueLabels: { formatter: v => v } // plain numeric rank
              }
            }
          });
          canvas.dataset.chartInitialized = "true";
        } catch (_) {}
      };

      if (causesControls && !causesControls.dataset.bound) {
        const showCards = () => {
          if (causesCards) causesCards.style.display = "";
          if (causesChartWrap) causesChartWrap.style.display = "none";
          if (causesToggleCards) causesToggleCards.classList.add("active");
          if (causesToggleChart) causesToggleChart.classList.remove("active");
        };
        const showChart = () => {
          if (causesCards) causesCards.style.display = "none";
          if (causesChartWrap) causesChartWrap.style.display = "";
          if (causesToggleChart) causesToggleChart.classList.add("active");
          if (causesToggleCards) causesToggleCards.classList.remove("active");
          ensureTopCausesChart();
          // Refresh AOS to account for layout change
          try { window.AOS && window.AOS.refreshHard && window.AOS.refreshHard(); } catch (_) {}
        };

        if (causesToggleCards) causesToggleCards.addEventListener("click", showCards);
        if (causesToggleChart) causesToggleChart.addEventListener("click", showChart);
        causesControls.dataset.bound = "true";
        // If chart is the default visible view, ensure it's initialized on first load
        try {
          const chartVisibleByDefault = causesChartWrap && causesChartWrap.style.display !== "none";
          if (chartVisibleByDefault) ensureTopCausesChart();
        } catch (_) {}
      } else if (causesControls) {
        // Controls already bound on a previous render; still ensure chart is ready if visible
        try {
          const chartVisible = causesChartWrap && causesChartWrap.style.display !== "none";
          if (chartVisible) ensureTopCausesChart();
        } catch (_) {}
      }

      // Bangladesh mortality donuts (Lesson 3b)
      const buildDonut = (canvasId, labels, data, colors) => {
        const el = document.getElementById(canvasId);
        if (!el || el.dataset.chartInitialized || !window.Chart) return;
        try {
          const ctx = el.getContext("2d");
          // Helper to convert hex color to rgba with alpha
          const hexToRgba = (hex, alpha) => {
            try {
              const h = hex.replace('#','');
              const bigint = parseInt(h.length === 3 ? h.split('').map(ch => ch+ch).join('') : h, 16);
              const r = (bigint >> 16) & 255;
              const g = (bigint >> 8) & 255;
              const b = bigint & 255;
              return `rgba(${r}, ${g}, ${b}, ${alpha})`;
            } catch (_) { return hex; }
          };

          const baseColors = Array.isArray(colors) ? colors.slice() : [];

          // Center text plugin per-chart
          const centerTextPlugin = {
            id: 'centerTextDonut',
            afterDatasetsDraw(chart, args, pluginOptions) {
              const ds = chart.data?.datasets?.[0];
              if (!ds) return;
              const labelsArr = chart.data.labels || [];
              const values = ds.data || [];
              const sel = chart.$selected instanceof Set ? chart.$selected : null;
              const hoverIdx = chart.$hoverIndex;
              let show = false;
              let title = '';
              let value = 0;
              let percent = 0;

              const total = values.reduce((a, b) => a + (Number(b) || 0), 0) || 0;
              if (sel && sel.size > 0) {
                // If multiple selected, sum them
                const idxs = Array.from(sel);
                value = idxs.reduce((acc, i) => acc + (Number(values[i]) || 0), 0);
                percent = total ? (value / total) * 100 : 0;
                title = sel.size === 1 ? (labelsArr[idxs[0]] || '') : 'Selected';
                show = true;
              } else if (hoverIdx != null && hoverIdx > -1) {
                value = Number(values[hoverIdx]) || 0;
                percent = total ? (value / total) * 100 : 0;
                title = labelsArr[hoverIdx] || '';
                show = true;
              }

              if (!show) return;

              const { ctx } = chart;
              const { left, right, top, bottom } = chart.chartArea;
              const cx = (left + right) / 2;
              const cy = (top + bottom) / 2;
              ctx.save();
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              // Title
              ctx.fillStyle = '#111827';
              ctx.font = '600 14px Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif';
              ctx.fillText(String(title), cx, cy - 8);
              // Value + percent
              ctx.fillStyle = '#374151';
              ctx.font = '500 12px Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif';
              const pctStr = total ? ` (${percent.toFixed(1)}%)` : '';
              ctx.fillText(`${value}${pctStr}`, cx, cy + 10);
              ctx.restore();
            }
          };

          new window.Chart(ctx, {
            type: "doughnut",
            data: { 
              labels, 
              datasets: [{ 
                data, 
                // Dynamic styling based on a selected segment index stored on chart instance
                backgroundColor: (c) => {
                  const i = c.dataIndex;
                  const chart = c.chart;
                  const sel = chart.$selected instanceof Set ? chart.$selected : null;
                  const hoverIdx = chart.$hoverIndex;
                  const color = baseColors[i % baseColors.length] || '#999';
                  if (sel && sel.size > 0) {
                    return sel.has(i) ? color : hexToRgba(color, 0.25);
                  }
                  // no selection: on hover, emphasize hovered, keep others normal
                  if (hoverIdx != null && hoverIdx > -1) {
                    return i === hoverIdx ? color : hexToRgba(color, 0.6);
                  }
                  return color;
                },
                borderColor: (c) => {
                  const chart = c.chart;
                  const i = c.dataIndex;
                  const sel = chart.$selected instanceof Set ? chart.$selected : null;
                  const hoverIdx = chart.$hoverIndex;
                  const isFocus = (sel && sel.size > 0) ? sel.has(i) : (hoverIdx === i);
                  return isFocus ? "#111827" : "#ffffff";
                },
                borderWidth: (c) => {
                  const chart = c.chart;
                  const i = c.dataIndex;
                  const sel = chart.$selected instanceof Set ? chart.$selected : null;
                  const hoverIdx = chart.$hoverIndex;
                  const isFocus = (sel && sel.size > 0) ? sel.has(i) : (hoverIdx === i);
                  return isFocus ? 4 : 2;
                },
                offset: (c) => {
                  const chart = c.chart;
                  const i = c.dataIndex;
                  const sel = chart.$selected instanceof Set ? chart.$selected : null;
                  const hoverIdx = chart.$hoverIndex;
                  const isFocus = (sel && sel.size > 0) ? sel.has(i) : (hoverIdx === i);
                  return isFocus ? 20 : 0;
                }
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              cutout: "60%",
              onHover: (evt, activeElements, chart) => {
                try {
                  const idx = activeElements && activeElements.length ? activeElements[0].index : null;
                  const prev = chart.$hoverIndex;
                  chart.$hoverIndex = (idx != null ? idx : null);
                  if (prev !== chart.$hoverIndex && (!chart.$selected || chart.$selected.size === 0)) {
                    // avoid animating on simple hover updates for snappier UI
                    chart.update('none');
                  }
                } catch (_) {}
              },
              // Click on slice to (multi-)select like legend
              onClick: (e, activeElements, chart) => {
                try {
                  const idx = activeElements && activeElements.length ? activeElements[0].index : null;
                  if (idx == null) return;
                  const evt = e && (e.native || e);
                  const ctrl = !!(evt && (evt.ctrlKey || evt.metaKey));
                  const shift = !!(evt && evt.shiftKey);
                  if (!(chart.$selected instanceof Set)) chart.$selected = new Set();
                  const sel = chart.$selected;
                  if (shift && Number.isInteger(chart.$lastIndex)) {
                    const start = Math.min(chart.$lastIndex, idx);
                    const end = Math.max(chart.$lastIndex, idx);
                    for (let i = start; i <= end; i++) sel.add(i);
                  } else if (ctrl) {
                    if (sel.has(idx)) sel.delete(idx); else sel.add(idx);
                  } else {
                    if (sel.size === 1 && sel.has(idx)) sel.clear(); else { sel.clear(); sel.add(idx); }
                  }
                  chart.$lastIndex = idx;
                  chart.update();
                } catch (_) {}
              },
              plugins: {
                legend: { 
                  position: "bottom",
                  // Override click to highlight instead of hide
                  onClick: (e, legendItem, legend) => {
                    try {
                      const chart = legend.chart;
                      const idx = legendItem.index;
                      const evt = e && (e.native || e);
                      const ctrl = !!(evt && (evt.ctrlKey || evt.metaKey));
                      const shift = !!(evt && evt.shiftKey);
                      if (!(chart.$selected instanceof Set)) chart.$selected = new Set();
                      const sel = chart.$selected;

                      if (shift && Number.isInteger(chart.$lastIndex)) {
                        const start = Math.min(chart.$lastIndex, idx);
                        const end = Math.max(chart.$lastIndex, idx);
                        for (let i = start; i <= end; i++) sel.add(i);
                      } else if (ctrl) {
                        if (sel.has(idx)) sel.delete(idx); else sel.add(idx);
                      } else {
                        // Single-selection toggle
                        if (sel.size === 1 && sel.has(idx)) sel.clear(); else { sel.clear(); sel.add(idx); }
                      }
                      chart.$lastIndex = idx;
                      chart.update();
                    } catch (_) {}
                  }
                },
                tooltip: {
                  callbacks: {
                    label: (ctx) => {
                      try {
                        const chart = ctx.chart;
                        const ds = chart.data.datasets[0];
                        const values = ds.data || [];
                        const totalFull = values.reduce((a, b) => a + (Number(b) || 0), 0) || 0;
                        const sel = chart.$selected instanceof Set ? chart.$selected : null;
                        const basis = (sel && sel.size > 0) ? Array.from(sel).reduce((acc, i) => acc + (Number(values[i]) || 0), 0) : totalFull;
                        const val = Number(ctx.parsed) || 0;
                        const pct = basis ? ((val / basis) * 100).toFixed(1) : '0.0';
                        return `${ctx.label}: ${val} (${pct}%)`;
                      } catch (_) {
                        return `${ctx.label}: ${ctx.parsed}`;
                      }
                    }
                  }
                }
              },
              animation: {
                duration: 500,
                easing: 'easeOutCubic'
              }
            },
            plugins: [centerTextPlugin]
          });
          el.dataset.chartInitialized = "true";
        } catch (_) {}
      };

      const bdLabels = [
        "Heart disease",
        "Stroke",
        "Respiratory",
        "Infection",
        "Cancer",
        "Obstetric",
        "Road traffic",
        "Drowning & accidents",
        "Other"
      ];

      // Relative weights (illustrative; replace with official splits when available)
      const bdAdolData = [4, 2, 3, 6, 4, 0, 10, 9, 6];
      const bdYAData   = [14, 6, 2, 3, 4, 1, 10, 5, 2];
      const bdColors   = [
        "#F472B6", // pink
        "#A78BFA", // violet
        "#60A5FA", // blue
        "#34D399", // emerald
        "#F59E0B", // amber
        "#FB7185", // rose
        "#F97316", // orange
        "#22D3EE", // cyan
        "#9CA3AF"  // gray
      ];

      buildDonut("bdMortalityAdolescents", bdLabels, bdAdolData, bdColors);
      buildDonut("bdMortalityYoungAdults", bdLabels, bdYAData, bdColors);

      // FIG.4 Child marriage prevalence chart (Lesson 5)
      const cmCanvas = document.getElementById("cmFigure4Chart");
      if (cmCanvas && !cmCanvas.dataset.chartInitialized && window.Chart) {
        try {
          const ctx = cmCanvas.getContext("2d");
          // Adaptive horizontal bar chart (Chart.js v2 & v3+ compatible)
          const labelsHM = ["Bangladesh","Nepal","Afghanistan","India","Bhutan","Pakistan","Sri Lanka","Maldives", "South Asia", "World"]; 
          const valuesHM = [51, 40, 28, 27, 26, 18, 10, 2, 29, 20];
          // Wrap long labels into multiple lines for readability
          const wrapLabel = (str, max = 10) => {
            try {
              if (!str || typeof str !== 'string') return str;
              if (str.length <= max) return str;
              const words = str.split(' ');
              if (words.length === 1) return str; // can't wrap
              const lines = [];
              let line = '';
              words.forEach(w => {
                const test = line ? (line + ' ' + w) : w;
                if (test.length > max) { if (line) lines.push(line); line = w; } else { line = test; }
              });
              if (line) lines.push(line);
              return lines;
            } catch(_) { return str; }
          };
          const labelsHMWrap = labelsHM.map(l => wrapLabel(l, 10));

          // Compute top-3 indices for highlight
          const top3Idx = valuesHM
            .map((v, i) => [v, i])
            .sort((a, b) => b[0] - a[0])
            .slice(0, 3)
            .map(([, i]) => i);
          const paletteHM = [
            "#ff0000ff", // Bangladesh
            "#A78BFA", // Nepal
            "#34D399", // Afghanistan
            "#60A5FA", // India
            "#F59E0B", // Bhutan
            "#FB7185", // Pakistan
            "#F97316", // Sri Lanka
            "#22D3EE", // Maldives
            "#2563EB", // South Asia
            "#9CA3AF"  // World
          ];
          // Render as vertical bars (categories on x-axis)
          const chartConfig = {
            type: 'bar',
            plugins: [barValueLabelsPlugin],
            data: {
              labels: labelsHMWrap,
              values: valuesHM,
              datasets: [{
                label: '% of women 20–24 first married/union before 18',
                data: valuesHM,
                backgroundColor: paletteHM,
                borderColor: (ctx) => top3Idx.includes(ctx.dataIndex) ? '#000000ff' : 'rgba(0,0,0,0.15)',
                borderWidth: (ctx) => top3Idx.includes(ctx.dataIndex) ? 3 : 1,
                borderSkipped: false,
                borderRadius: 6,
                barPercentage: 0.65,
                categoryPercentage: 0.7
              }]
            },
            options: {
              indexAxis: 'x', // ensure vertical orientation in Chart.js v3+
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  suggestedMin: 0,
                  suggestedMax: 100,
                  ticks: { callback: (v) => v + '%' },
                },
                x: {
                  ticks: { autoSkip: false, maxRotation: 0, minRotation: 0, padding: 6 },
                  title: { display: false }

                }
              },
              plugins: {
                legend: { display: false },
                tooltip: {
                  callbacks: {
                    label: (ctx) => `${ctx.raw}%`
                  }
                },
                title: {
                  display: true,
                  position: 'top',
                  text: [
                    'Bangladesh has the highest prevalence of child marriage in South Asia,',
                    'and is among the 10 countries worldwide with the highest levels.'
                  ],
                  padding: { top: 12, bottom: 18 },
                  font: { size: 15, weight: '700', family: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif' },
                  color: '#111827'
                },
                barValueLabels: { formatter: v => v + '%' } // append percent sign
              },
              animation: { duration: 900, easing: 'easeOutCubic' }
            }
          };
          // Render chart without background highlight plugin (plain styled title only)
          new window.Chart(ctx, chartConfig);
          cmCanvas.dataset.chartInitialized = "true";
        } catch (_) {}
      }

      // Position demographic pyramid steps along diagonals when present
      try { this.initPyramidLayout(); } catch (_) {}
      // Build manual orbit items (if requested) before applying auto layout
      try { this.generateManualOrbitItems(); } catch (_) {}
      // Position orbit items equidistant from center in any orbit-layout instances
      try { this.initOrbitLayout(); } catch (_) {}
    } catch (_) {}
  }

  // Layout the demographic pyramid steps on diagonals
  initPyramidLayout() {
    try {
      const positive = document.querySelectorAll('.pyramid-positive .pyramid-step');
      const negative = document.querySelectorAll('.pyramid-negative .pyramid-step');
      const margin = 10; // percent padding from edges

      const place = (nodeList, kind) => {
        const items = Array.from(nodeList);
        const n = items.length;
        if (!n) return;
        // Define start/end for left/top in percent
        const leftStart = margin, leftEnd = 100 - margin;
        let topStart, topEnd;
        if (kind === 'positive') {
          // bottom-left to top-right: top decreases while left increases
          topStart = 100 - margin; topEnd = margin;
        } else {
          // negative: top-left to bottom-right: both increase
          topStart = margin; topEnd = 100 - margin;
        }

        items.forEach((el, i) => {
          const t = n === 1 ? 0.5 : i / (n - 1);
          const left = leftStart + (leftEnd - leftStart) * t;
          const top = topStart + (topEnd - topStart) * t;
          el.style.left = left + '%';
          el.style.top = top + '%';
          el.style.zIndex = String(100 + i);
        });
      };

      if (positive.length) place(positive, 'positive');
      if (negative.length) place(negative, 'negative');
    } catch (_) { /* no-op */ }
  }

  // Arrange orbit diagram satellites evenly on a circle around the center
  initOrbitLayout() {
    try {
      const wraps = document.querySelectorAll('.orbit-layout');
      if (!wraps || wraps.length === 0) return;

      const layoutOne = (wrap) => {
        try {
          if (!wrap) return;
          // Skip if explicitly manual-managed
          if (wrap.hasAttribute('data-orbit-manual')) return;
          // Ensure positioning context
          if (getComputedStyle(wrap).position === 'static') {
            wrap.style.position = 'relative';
          }
          const items = Array.from(wrap.querySelectorAll('.orbit-item'));
          if (!items.length) return;

          const rect = wrap.getBoundingClientRect();
          const w = rect.width || wrap.clientWidth || 0;
          const h = rect.height || wrap.clientHeight || 0;
          if (!w || !h) return;
          const cx = w / 2;
          const cy = h / 2;
          // Resolve radius preference: data attribute > CSS var > default
          const minDim = Math.min(w, h);
          let r = 0;
          const attrR = parseFloat(wrap.getAttribute('data-orbit-radius') || '');
          if (!Number.isNaN(attrR) && attrR > 0) {
            r = attrR; // pixels
          } else {
            const cssVar = getComputedStyle(wrap).getPropertyValue('--orbit-radius').trim();
            if (cssVar) {
              if (cssVar.endsWith('%')) {
                const p = parseFloat(cssVar);
                if (!Number.isNaN(p)) r = (p / 100) * (minDim / 2);
              } else if (cssVar.endsWith('px')) {
                const px = parseFloat(cssVar);
                if (!Number.isNaN(px)) r = px;
              } else {
                const val = parseFloat(cssVar);
                if (!Number.isNaN(val)) r = val; // assume px
              }
            }
          }
          if (!r || r <= 0) {
            // Default: ~38% of the smallest dimension
            r = Math.max(40, minDim * 0.38);
          }

          // Distribute evenly; start at top (-90deg)
          const n = items.length;
          items.forEach((el, i) => {
            const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
            const x = cx + r * Math.cos(angle);
            const y = cy + r * Math.sin(angle);
            el.style.position = 'absolute';
            el.style.left = x + 'px';
            el.style.top = y + 'px';
            el.style.transform = 'translate(-50%, -50%)';
            el.style.zIndex = String(10 + i);
          });

          // Size optional decorative rings to match orbit radius
          try {
            const setRing = (ring, scale = 1) => {
              const d = Math.max(0, r * 2 * scale);
              ring.style.position = 'absolute';
              ring.style.left = cx + 'px';
              ring.style.top = cy + 'px';
              ring.style.width = d + 'px';
              ring.style.height = d + 'px';
              ring.style.transform = 'translate(-50%, -50%)';
              ring.style.borderRadius = '50%';
              ring.style.pointerEvents = 'none';
            };
            const ring1 = wrap.querySelector('.orbit-ring-1');
            const ring2 = wrap.querySelector('.orbit-ring-2');
            if (ring1) setRing(ring1, 1);
            if (ring2) setRing(ring2, 1.12);
          } catch (_) { /* ring sizing optional */ }
        } catch (_) { /* no-op single wrap */ }
      };

      wraps.forEach(layoutOne);
      // Recompute on resize
      const onResize = () => { try { wraps.forEach(layoutOne); } catch(_){} };
      window.addEventListener('resize', onResize);
    } catch (_) { /* no-op */ }
  }

  // Generate orbit items via manual list for containers with data-orbit-manual
  generateManualOrbitItems() {
    try {
      const wrap = document.getElementById('orbitLayout');
      if (!wrap || !wrap.hasAttribute('data-orbit-manual')) return;
      // Avoid duplicating items
      if (wrap.querySelector('.orbit-item')) return;

      const orbitItems = [
        { label: 'Adolescent Sexual & Reproductive Health', icon: 'fa-venus-mars', cls: 'bg-gradient-purple' },
        { label: 'Violence against Adolescents', icon: 'fa-hand-fist', cls: 'bg-gradient-teal' },
        { label: 'Mental Health for Adolescents', icon: 'fa-brain', cls: 'bg-gradient-orange' },
        { label: 'Health System Strengthening', icon: 'fa-screwdriver-wrench', cls: 'bg-gradient-green' },
        { label: 'Social & Behaviour Change Communication', icon: 'fa-bullhorn', cls: 'bg-gradient-pink' },
        { label: 'Vulnerable Adolescents', icon: 'fa-people-roof', cls: 'bg-gradient-yellow' },
        { label: 'Adolescent Nutrition', icon: 'fa-utensils', cls: 'bg-gradient-lavender' }
      ];

      const total = orbitItems.length;
      // Resolve radius: data-orbit-radius (px) or CSS var --orbit-radius (%) or default 180px
      const rect = wrap.getBoundingClientRect();
      const w = rect.width || wrap.clientWidth || 0;
      const h = rect.height || wrap.clientHeight || 0;
      const minDim = Math.min(w, h) || 0;
      let radius = 180;
      const attrR = parseFloat(wrap.getAttribute('data-orbit-radius') || '');
      if (!Number.isNaN(attrR) && attrR > 0) radius = attrR;
      else {
        const cssVar = getComputedStyle(wrap).getPropertyValue('--orbit-radius').trim();
        if (cssVar && cssVar.endsWith('%')) {
          const p = parseFloat(cssVar);
          if (!Number.isNaN(p) && minDim) radius = (p / 100) * (minDim / 2);
        } else if (cssVar) {
          const v = parseFloat(cssVar);
          if (!Number.isNaN(v)) radius = v;
        }
      }

      // Ensure wrapper is positioning context
      if (getComputedStyle(wrap).position === 'static') wrap.style.position = 'relative';

      orbitItems.forEach((o, i) => {
        const angle = (360 / total) * i;
        const item = document.createElement('div');
        item.className = 'orbit-item';
        // Place item at center and rotate around center
        item.style.left = '50%';
        item.style.top = '50%';
        item.style.position = 'absolute';
        item.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`;
        item.innerHTML = `
          <div class="orbit-card ${o.cls} icon-spin-on-hover" style="animation-delay: ${i * 0.6}s">
            <div class="orbit-icon mb-2"><i class="fa-solid ${o.icon} fa-lg"></i></div>
            <div class="orbit-title">${o.label}</div>
          </div>
        `;
        wrap.appendChild(item);
      });
    } catch (_) { /* no-op */ }
  }


  // Initialize show/hide password toggles for any buttons with data-pw-toggle pointing to an input id
  initPasswordToggles() {
    try {
      document.querySelectorAll('[data-pw-toggle]').forEach((btn) => {
        if (btn.dataset.bound) return;
        const targetId = btn.getAttribute('data-pw-toggle');
        const input = document.getElementById(targetId);
        if (!input) return;
        btn.addEventListener('click', () => {
          const isText = input.type === 'text';
          input.type = isText ? 'password' : 'text';
          const icon = btn.querySelector('i');
          if (icon) {
            if (isText) {
              icon.classList.remove('fa-eye-slash');
              icon.classList.add('fa-eye');
            } else {
              icon.classList.remove('fa-eye');
              icon.classList.add('fa-eye-slash');
            }
          }
          btn.setAttribute('aria-label', isText ? 'Show password' : 'Hide password');
        });
        btn.dataset.bound = 'true';
      });
    } catch (_) {}
  }

  // Desktop lesson sidebar visibility
  isLessonSidebarHidden() {
    try {
      if (window.YHUI) return window.YHUI.sidebarHidden;
      const v = localStorage.getItem('lessonSidebarHidden');
      return v === '1' || v === 'true';
    } catch (_) { return false; }
  }
  setLessonSidebarHidden(flag) {
    try {
      if (window.YHUI && typeof window.YHUI.setSidebarHidden === 'function') {
        window.YHUI.setSidebarHidden(flag);
      } else {
        localStorage.setItem('lessonSidebarHidden', flag ? '1' : '0');
      }
    } catch(_){}
    this.render();
    // Apply state classes in case of race conditions (e.g., reused shell element)
    try { if (window.YHUI && window.YHUI.applyLessonShellState) window.YHUI.applyLessonShellState(); } catch(_){ }
    if (!flag) {
      setTimeout(() => { try { this.scrollActiveLessonIntoView(); } catch(_){} }, 80);
    }
  }

  initHomeScripts() {
    // Ensure AOS is active on home as well
    this.initAOS();

    // Navbar scroll effect
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      const scrollToTop = document.getElementById("scrollToTop");

      if (navbar) {
        if (window.scrollY > 100) {
          navbar.classList.add("scrolled");
          if (scrollToTop) scrollToTop.classList.add("show");
        } else {
          navbar.classList.remove("scrolled");
          if (scrollToTop) scrollToTop.classList.remove("show");
        }
      }

      // Active nav link on scroll
      const sections = document.querySelectorAll("section[id]");
      const navLinks = document.querySelectorAll(".nav-link");

      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
          link.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        if (this.getAttribute("href").length > 1) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute("href"));
          if (target) {
            target.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }
      });
    });

    // Scroll to top functionality
    const scrollToTopBtn = document.getElementById("scrollToTop");
    if (scrollToTopBtn) {
      scrollToTopBtn.addEventListener("click", function () {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });
    }

    // Counter Animation Function
    const animateCounter = (element, target, duration = 2000, suffix = "") => {
      let startTime = null;
      const startValue = 0;

      let numericTarget = target;
      let targetSuffix = suffix;

      if (typeof target === "string") {
        const match = target.match(/^([\d.]+)([MBK%]?)$/);
        if (match) {
          numericTarget = parseFloat(match[1]);
          targetSuffix = match[2];
        }
      }

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easeProgress = 1 - Math.pow(1 - progress, 4);
        const currentValue =
          startValue + (numericTarget - startValue) * easeProgress;

        let displayValue;
        if (numericTarget >= 10) {
          displayValue = Math.floor(currentValue);
        } else {
          displayValue = currentValue.toFixed(1);
        }

        element.textContent = displayValue + targetSuffix;

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          element.textContent = numericTarget + targetSuffix;
        }
      };

      requestAnimationFrame(animate);
    };

    // Intersection Observer for counter animation
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            !entry.target.classList.contains("animated")
          ) {
            entry.target.classList.add("animated");
            const target = entry.target.getAttribute("data-target");
            animateCounter(entry.target, target, 2500);
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observe all stat numbers and stat values
    document.querySelectorAll(".stat-number").forEach((stat) => {
      const originalText = stat.textContent.trim();
      stat.setAttribute("data-target", originalText);
      stat.textContent = "0";
      counterObserver.observe(stat);
    });

    document.querySelectorAll(".stat-value").forEach((stat) => {
      const originalText = stat.textContent.trim();
      stat.setAttribute("data-target", originalText);
      stat.textContent = "0";
      counterObserver.observe(stat);
    });
  }

  renderHome() {
    return `
      <!-- Navigation -->
      <nav class="navbar navbar-expand-lg fixed-top navbar-neo">
        <div class="container">
          <a class="navbar-brand d-flex align-items-center gap-2" href="#" onclick="app.navigateTo('home'); return false;">
            <img src="img/Unicef Logo-01.png" alt="UNICEF Logo" style="width: 100%; height: 60px; object-fit: contain;">
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto align-items-center">
              <li class="nav-item"><a class="nav-link active transition-base" href="#home">Home</a></li>
              <li class="nav-item"><a class="nav-link transition-base" href="#about">About</a></li>
              <li class="nav-item"><a class="nav-link transition-base" href="#components">Components</a></li>
              <li class="nav-item"><a class="nav-link transition-base" href="#roles">Roles</a></li>
              <li class="nav-item"><a class="nav-link transition-base" href="#eligibility">Join</a></li>
              <li class="nav-item ms-lg-3"><a href="#" class="btn-cta-primary hover-lift-sm focus-visible-ring transition-base" onclick="app.navigateTo('login'); return false;">Login</a></li>
            </ul>
          </div>
        </div>
      </nav>

      <!-- Hero Section -->
      <section id="home" class="hero-section hero-neo">
        <!-- Background ornaments -->
        <div class="bg-ornaments" aria-hidden="true">
          <span class="orb orb-1"></span>
          <span class="orb orb-2"></span>
          <span class="orb orb-3"></span>
        </div>
        <div class="container position-relative" style="z-index: 2;">
          <div class="row align-items-center">
            <div class="col-lg-7" data-aos="fade-right">
              <div class="hero-content">
                <h1 class="hero-title glow-title-float">Young Health Ambassador Programme</h1>
                <p class="hero-description">
                    The Young Health Ambassador Program (YHAP) is a strategic joint initiative of the Ministry of Health and Family Welfare (MOHFW) and UNICEF. The program is designed to empower young by enhancing their health awareness and building their capacity in primary prevention and health promotion thereby equipping them to serve as informed health ambassador. <br>
                    This program equips young person with knowledge and skills in areas like physical health including sexual and reproductive health, nutrition, mental wellbeing etc.  enabling them to become active advocates for health and influence healthier choices within their communities and networks.
                </p>
                <div class="d-flex gap-3 flex-wrap">
                  <a href="#" class="btn btn-gradient-glow hover-lift-sm focus-visible-ring transition-base" onclick="app.navigateTo('login'); return false;">
                    <i class="fa-solid fa-handshake-angle join-icon" aria-hidden="true"></i>
                    Become an Ambassador
                  </a>
                </div>
              </div>
            </div>
            <div class="col-lg-5" data-aos="fade-left">
              <div class="animate-float">
                <img src="img/Asset 2.png" alt="Young Health" class="img-fluid" style="position: relative; z-index: 2; filter: drop-shadow(0 20px 40px rgba(0,0,0,.25));">
              </div>
            </div>
          </div>
        </div>
        <!-- Floating background elements -->
        <div class="floating-bg" aria-hidden="true">
          <span class="float-elem" style="top:10%; left:5%;"></span>
          <span class="float-elem" style="top:20%; right:8%;"></span>
          <span class="float-elem" style="bottom:15%; left:12%;"></span>
          <span class="float-elem" style="bottom:10%; right:10%;"></span>
          <span class="float-elem" style="top:55%; left:45%; width:80px; height:80px;"></span>
        </div>
      </section>

      <footer class="footer">
        <div class="container">
          <div class="row g-4">
            <div class="col-xl-4 col-lg-5">
              <h3 class="footer-heading">Young Health Ambassador Programme</h3>
              <p class="footer-text">
                A partnership between UNICEF and the Ministry of Health & Family Welfare, Bangladesh—nurturing young ambassadors who lead healthier communities.
              </p>
              <div class="footer-social">
                <a href="#" class="footer-social__item" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
                <a href="#" class="footer-social__item" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
                <a href="#" class="footer-social__item" aria-label="X"><i class="fa-brands fa-x-twitter"></i></a>
                <a href="#" class="footer-social__item" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
              </div>
            </div>
            <div class="col-6 col-lg-2">
              <h4 class="footer-title">Discover</h4>
              <a class="footer-link" href="#about">About</a>
              <a class="footer-link" href="#components">Programme Pillars</a>
              <a class="footer-link" href="#roles">Ambassador Stories</a>
              <a class="footer-link" href="#statistics">Impact Data</a>
            </div>
            <div class="col-6 col-lg-2">
              <h4 class="footer-title">Learn</h4>
              <a class="footer-link" href="#" onclick="app.navigateTo('login'); return false;">Sign in</a>
              <a class="footer-link" href="#" onclick="app.navigateTo('register'); return false;">Create account</a>
              <a class="footer-link" href="#" onclick="app.navigateTo('login'); return false;">Course tracker</a>
              <a class="footer-link" href="#" onclick="app.navigateTo('login'); return false;">Ambassador portal</a>
            </div>
            <div class="col-lg-4">
              <h4 class="footer-title">Contact</h4>
              <ul class="footer-contact">
                <li><i class="fa-solid fa-location-dot"></i> Ministry of Health & Family Welfare, Dhaka</li>
                <li><i class="fa-solid fa-envelope"></i> info@yhap.gov.bd</li>
                <li><i class="fa-solid fa-phone"></i> +880 XXX-XXXXXXX</li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <p>&copy; ${new Date().getFullYear()} Young Health Ambassador Programme. All rights reserved.</p>
            <p class="footer-subline">A joint initiative of MOHFW & UNICEF</p>
          </div>
        </div>
      </footer>

      <div id="scrollToTop" class="scroll-top-chip" aria-label="Scroll back to top">
        <i class="fa-solid fa-arrow-up"></i>
      </div>
    `;
  }

  renderLogin() {
    return `
      <!-- Header -->
      <header class="bg-white shadow-sm">
        <div class="container py-3">
          <div class="d-flex align-items-center gap-2">
            <a class="navbar-brand" href="#" onclick="app.navigateTo('home'); return false;">
              <img src="img/Unicef Logo-01.png" alt="UNICEF Logo" class="brand-mark" style="height: 60px;">
            </a>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <div class="container py-2">
        <div class="row justify-content-center">
          <div class="col-md-6 col-lg-5">
            <button class="btn btn-link text-decoration-none mb-3 p-0" onclick="app.navigateTo('home')">
              <i class="bi bi-arrow-left me-2"></i>Back to Home
            </button>

            <div class="card shadow-lg border-0">
              <div class="card-body p-4">
                <h2 class="text-center mb-2 login-title">Become an Ambassador</h2>
                <p class="text-center text-muted mb-4">Log in to continue your learning journey</p>

                <div id="loginError" class="alert alert-danger d-none"></div>

                <form id="loginForm">
                  <div class="mb-3">
                    <label for="loginEmail" class="form-label">Phone/Email</label>
                    <input type="text" class="form-control" id="loginEmail" placeholder="Phone/Email" required>
                  </div>

                  <div class="mb-3">
                    <label for="loginPassword" class="form-label">Password</label>
                    <div class="input-group">
                      <input type="password" class="form-control" id="loginPassword" placeholder="••••••••" required>
                      <button class="btn btn-outline-secondary" type="button" data-pw-toggle="loginPassword" aria-label="Show password">
                        <i class="fa-solid fa-eye"></i>
                      </button>
                    </div>
                  </div>

                  <div class="d-grid gap-2">
                    <button type="submit" class="btn btn-primary">Log In</button>
                    <button type="button" class="btn btn-link" data-bs-toggle="modal" data-bs-target="#forgotPasswordModal">Forgot password?</button>
                  </div>
                </form>

                <div class="text-center mt-4">
                  <p class="text-muted mb-0">
                    Don't have an account?
                    <a href="#" onclick="app.navigateTo('register'); return false;" class="text-decoration-none">Sign up</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Forgot Password Modal -->
      <div class="modal fade" id="forgotPasswordModal" tabindex="-1" aria-labelledby="forgotPasswordLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="forgotPasswordLabel">Reset password</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div id="forgotPwError" class="alert d-none" role="alert"></div>
              <form id="forgotPwForm">
                <div class="mb-3">
                  <label for="fpIdentifier" class="form-label">Phone or Email</label>
                  <input type="text" class="form-control" id="fpIdentifier" placeholder="+8801XXXXXXXXX or name@example.com" required>
                </div>
                <div class="mb-3">
                  <label for="fpNewPassword" class="form-label">New password</label>
                  <div class="input-group">
                    <input type="password" class="form-control" id="fpNewPassword" placeholder="At least 6 characters" required aria-describedby="fpPwHelp">
                    <button class="btn btn-outline-secondary" type="button" data-pw-toggle="fpNewPassword" aria-label="Show password"><i class="fa-solid fa-eye"></i></button>
                  </div>
                  <div id="fpPwHelp" class="form-text">Must include a number and a special character.</div>
                </div>
                <div class="mb-3">
                  <label for="fpConfirmPassword" class="form-label">Confirm new password</label>
                  <div class="input-group">
                    <input type="password" class="form-control" id="fpConfirmPassword" placeholder="Repeat new password" required>
                    <button class="btn btn-outline-secondary" type="button" data-pw-toggle="fpConfirmPassword" aria-label="Show password"><i class="fa-solid fa-eye"></i></button>
                  </div>
                </div>
                <div class="d-grid">
                  <button type="submit" class="btn btn-primary">Reset password</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  attachForgotPasswordHandlers() {
    const form = document.getElementById('forgotPwForm');
    if (!form) return;
    const errorBox = document.getElementById('forgotPwError');
    const showMsg = (msg, type = 'danger') => {
      if (!errorBox) return;
      errorBox.className = `alert alert-${type}`;
      errorBox.textContent = msg;
      errorBox.classList.remove('d-none');
    };
    const clearMsg = () => {
      if (!errorBox) return;
      errorBox.className = 'alert d-none';
      errorBox.textContent = '';
    };
    const strong = (pw) => /^(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/\?]).{6,}$/.test(pw);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      clearMsg();
      const idInput = form.querySelector('#fpIdentifier');
      const newPwInput = form.querySelector('#fpNewPassword');
      const confPwInput = form.querySelector('#fpConfirmPassword');
      const identifier = (idInput?.value || '').trim();
      const newPw = newPwInput?.value || '';
      const confPw = confPwInput?.value || '';

      if (!identifier) { showMsg('Please enter your phone or email.'); return; }
      if (newPw !== confPw) { showMsg('Passwords do not match.'); return; }
      if (!strong(newPw)) { showMsg('Password must be at least 6 characters and include a number and a special character.'); return; }

      let users = [];
      try { users = JSON.parse(localStorage.getItem('users') || '[]'); } catch { users = []; }

      const identifierLower = identifier.toLowerCase();
      const normalize = (v) => {
        if (typeof this.normalizePhoneBD === 'function') {
          try { return this.normalizePhoneBD(v); } catch { /* noop */ }
        }
        return String(v || '').replace(/\D/g, '');
      };
      const normIdPhone = normalize(identifier);

      const idx = users.findIndex(u => {
        const emailMatch = (u?.email || '').toLowerCase() === identifierLower;
        const phoneMatch = normIdPhone && normalize(u?.phone) === normIdPhone;
        return emailMatch || phoneMatch;
      });

      if (idx === -1) { showMsg('We couldn’t find an account with that phone or email.', 'warning'); return; }

      users[idx].password = newPw;
      localStorage.setItem('users', JSON.stringify(users));

      showMsg('Password updated. You can now log in.', 'success');

      const modalEl = document.getElementById('forgotPasswordModal');
      if (modalEl && typeof bootstrap !== 'undefined' && bootstrap?.Modal) {
        const instance = bootstrap.Modal.getOrCreateInstance(modalEl);
        setTimeout(() => {
          instance.hide();
          const le = document.getElementById('loginEmail');
          if (le) le.value = identifier;
          const lp = document.getElementById('loginPassword');
          if (lp) { lp.value = ''; lp.focus(); }
        }, 900);
      }
    });
  }

  renderRegister() {
    return `
      <!-- Header -->
      <header class="bg-white shadow-sm">
        <div class="container py-3">
          <div class="d-flex align-items-center gap-2">
            <a class="navbar-brand" href="#" onclick="app.navigateTo('home'); return false;">
              <img src="img/Unicef Logo-01.png" alt="UNICEF Logo" style="width: 100%; height: 60px; object-fit: contain;">
            </a>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <div class="container py-2">
        <div class="row justify-content-center">
          <div class="col-md-6 col-lg-5">
            <button class="btn btn-link text-decoration-none mb-3 p-0" onclick="app.navigateTo('home')">
              <i class="bi bi-arrow-left me-2"></i>Back to Home
            </button>

            <div class="card shadow-lg border-0">
              <div class="card-body p-4">
                <h2 class="text-center mb-2 login-title">Be a Young Health Ambassador</h2>
                <p class="text-center text-muted mb-4">Start your health learning journey today</p>

                <div id="registerError" class="alert alert-danger d-none"></div>

                <form id="registerForm">
                  <div class="mb-3">
                    <label for="registerName" class="form-label">Full Name</label>
                    <input type="text" class="form-control" id="registerName" placeholder="Roqnuzzaman Rozen" required>
                  </div>
                  
                  <div class="mb-3">
                    <label for="registerPhone" class="form-label">Phone</label>
                    <input type="tel" class="form-control" id="registerPhone" placeholder="+8801XXXXXXXXX" pattern="^(\+?8801[3-9]\d{8}|01[3-9]\d{8}|1[3-9]\d{8})$" required aria-describedby="phoneHelp">
                    <div id="phoneHelp" class="form-text">We’ll use your phone for login and account recovery.</div>
                  </div>
                  <div class="mb-3">
                    <label for="registerEmail" class="form-label">Email (optional)</label>
                    <input type="email" class="form-control" id="registerEmail" placeholder="your@email.com">
                  </div>
                  

                  <div class="mb-3">
                    <label for="registerPassword" class="form-label">Password</label>
                    <div class="input-group">
                      <input type="password" class="form-control" id="registerPassword" placeholder="At least 6 characters" required aria-describedby="passwordHelp">
                      <button class="btn btn-outline-secondary" type="button" data-pw-toggle="registerPassword" aria-label="Show password">
                        <i class="fa-solid fa-eye"></i>
                      </button>
                    </div>
                    <div id="passwordHelp" class="form-text">At least 6 characters and must include a number and a special character.</div>
                  </div>

                  <div class="mb-3">
                    <label for="registerConfirmPassword" class="form-label">Confirm Password</label>
                    <div class="input-group">
                      <input type="password" class="form-control" id="registerConfirmPassword" placeholder="Repeat password" required>
                      <button class="btn btn-outline-secondary" type="button" data-pw-toggle="registerConfirmPassword" aria-label="Show password">
                        <i class="fa-solid fa-eye"></i>
                      </button>
                    </div>
                  </div>

                  <button type="submit" class="btn btn-primary w-100">Create Account</button>
                </form>

                <div class="text-center mt-4">
                  <p class="text-muted mb-0">
                    Already have an account?
                    <a href="#" onclick="app.navigateTo('login'); return false;" class="text-decoration-none">Log in</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderProfile() {
    const user = this.currentUser || {};
    const phone = user.phone || "";
    const email = user.email || "";
    return `
      <header class="bg-white shadow-sm">
        <div class="container py-3 d-flex align-items-center gap-2">
          <a class="navbar-brand" href="#" onclick="app.navigateTo('dashboard'); return false;">
            <img src="img/Unicef Logo-01.png" alt="UNICEF Logo" class="brand-mark" style="height: 60px;">
          </a>
          <span class="ms-2 fw-semibold">Profile settings</span>
        </div>
      </header>

      <div class="container py-4">
        <div class="row justify-content-center">
          <div class="col-md-7 col-lg-6">
            <button class="btn btn-link text-decoration-none mb-3 p-0" onclick="app.navigateTo('dashboard')">
              <i class="bi bi-arrow-left me-2"></i>Back to Dashboard
            </button>
            <div class="card shadow-sm border-0">
              <div class="card-body p-4">
                <h3 class="h5 mb-3">Account</h3>
                <div id="profileMsg" class="alert d-none" role="alert"></div>
                <form id="profileForm" novalidate>
                  <div class="mb-3">
                    <label class="form-label" for="profilePhone">Phone</label>
                    <input id="profilePhone" type="tel" class="form-control" required placeholder="+8801XXXXXXXXX" pattern="^(\+?8801[3-9]\d{8}|01[3-9]\d{8}|1[3-9]\d{8})$" aria-describedby="profilePhoneHelp" value="${phone}">
                    <div id="profilePhoneHelp" class="form-text">Use a valid Bangladeshi number. This is used for login and account recovery.</div>
                  </div>
                  <div class="mb-3">
                    <label class="form-label" for="profileEmail">Email (optional)</label>
                    <input id="profileEmail" type="email" class="form-control" placeholder="name@example.com" value="${email}">
                  </div>
                  <hr class="my-4">
                  <h3 class="h6 mb-3">Change password</h3>
                  <div class="row g-3">
                    <div class="col-12">
                      <label class="form-label" for="profileCurrentPassword">Current password</label>
                      <div class="input-group">
                        <input id="profileCurrentPassword" type="password" class="form-control" placeholder="••••••••" autocomplete="current-password">
                        <button class="btn btn-outline-secondary" type="button" data-pw-toggle="profileCurrentPassword" aria-label="Show password"><i class="fa-solid fa-eye"></i></button>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <label class="form-label" for="profileNewPassword">New password</label>
                      <div class="input-group">
                        <input id="profileNewPassword" type="password" class="form-control" placeholder="At least 6 characters" autocomplete="new-password" aria-describedby="profilePwHelp">
                        <button class="btn btn-outline-secondary" type="button" data-pw-toggle="profileNewPassword" aria-label="Show password"><i class="fa-solid fa-eye"></i></button>
                      </div>
                      <div id="profilePwHelp" class="form-text">At least 6 characters and must include a number and a special character.</div>
                    </div>
                    <div class="col-md-6">
                      <label class="form-label" for="profileConfirmPassword">Confirm new password</label>
                      <div class="input-group">
                        <input id="profileConfirmPassword" type="password" class="form-control" placeholder="Repeat new password" autocomplete="new-password">
                        <button class="btn btn-outline-secondary" type="button" data-pw-toggle="profileConfirmPassword" aria-label="Show password"><i class="fa-solid fa-eye"></i></button>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex gap-2">
                    <button class="btn btn-primary" type="submit">Save changes</button>
                    <button class="btn btn-outline-secondary" type="button" onclick="app.navigateTo('dashboard')">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  }

  renderDashboard() {
    const userName = this.currentUser?.name || "Ambassador";
    const userFirstName = userName.split(" ")[0] || userName;
    const userInitials =
      userName
        .split(" ")
        .filter(Boolean)
        .map((part) => part.charAt(0))
        .join("")
        .substring(0, 2)
        .toUpperCase() || "YH";

    const joinedDate = this.currentUser?.registeredAt
      ? new Date(this.currentUser.registeredAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "Today";

    const courseSummaries = coursesData.map((course) => {
      const lessonsCollection = course.lessons || course.lessions || [];
      const progressEntry = this.getUserProgress(course.id);
      const completedLessons = progressEntry?.completedlessions?.length || 0;
      const totalLessons = lessonsCollection.length;
      const progressPercent = this.calculateProgress(course);
      const completed = this.isCourseCompleted(course.id);
      const nextLesson =
        lessonsCollection.find(
          (lesson) => !progressEntry?.completedlessions?.includes(lesson.id)
        ) || null;

      return {
        course,
        totalLessons,
        completedLessons,
        progressPercent,
        completed,
        statusLabel: completed
          ? "Completed"
          : completedLessons > 0
          ? "In progress"
          : "Not started",
        nextLessonTitle: nextLesson?.title || null,
        certificateIssued: progressEntry?.certificateIssued || false,
      };
    });

    const totalCourses = courseSummaries.length;
    const completedCourses = courseSummaries.filter(
      (item) => item.completed
    ).length;
    const activeCourses = courseSummaries.filter(
      (item) => !item.completed && item.completedLessons > 0
    ).length;
    const notStartedCourses = courseSummaries.filter(
      (item) => item.completedLessons === 0
    ).length;

    const totalLessons = courseSummaries.reduce(
      (sum, item) => sum + item.totalLessons,
      0
    );
    const completedLessons = courseSummaries.reduce(
      (sum, item) => sum + item.completedLessons,
      0
    );
    const remainingLessons = Math.max(totalLessons - completedLessons, 0);
    const overallProgress =
      totalLessons > 0
        ? Math.round((completedLessons / totalLessons) * 100)
        : 0;

    const activeCourse =
      courseSummaries.find(
        (item) => !item.completed && item.completedLessons > 0
      ) ||
      courseSummaries.find((item) => !item.completed) ||
      courseSummaries[0];

    const certificateCourse =
      courseSummaries.find(
        (item) => item.certificateIssued && item.course?.id
      ) ||
      courseSummaries.find((item) => item.completed && item.course?.id) ||
      null;

    const actionCourseId = activeCourse?.course?.id || null;
    const actionLabel = activeCourse
      ? activeCourse.completedLessons > 0
        ? "Continue learning"
        : "Start learning"
      : "Browse library";
    const actionSubLabel = activeCourse
      ? activeCourse.totalLessons
        ? `${activeCourse.completedLessons} of ${activeCourse.totalLessons} lessons completed`
        : activeCourse.completed
        ? "Programme completed"
        : "Self-paced journey"
      : `${totalCourses} available programme${totalCourses === 1 ? "" : "s"}`;
    const actionSecondary = activeCourse?.nextLessonTitle
      ? `Next: ${activeCourse.nextLessonTitle}`
      : completedCourses === totalCourses && totalCourses > 0
      ? "All programmes successfully completed"
      : "Choose any course to begin";

    const formatNumber = (value) =>
      typeof value === "number" ? value.toLocaleString("en-US") : value;

    const clampProgress = (value) =>
      Math.min(100, Math.max(0, Number.isFinite(value) ? value : 0));

    // Determine the best target for Continue learning: open first unlocked, incomplete module
    let continueOnclick = actionCourseId
      ? `app.selectCourse('${actionCourseId}')`
      : `app.navigateTo('home'); return false;`;
    try {
      if (actionCourseId) {
        const course = activeCourse.course;
        if (Array.isArray(course.chapters) && course.chapters.length > 0) {
          const progress = this.getUserProgress(course.id) || this.initializeProgress(course.id);
          const doneSet = new Set(progress.completedlessions || []);
          // Find first unlocked chapter (module) where previous module quiz is passed
          const isUnlocked = (ci) => ci === 0 || doneSet.has(`${course.chapters[ci - 1].id}-quiz`);
          const isCompletedModule = (ci) => doneSet.has(`${course.chapters[ci].id}-quiz`);
          let targetChapter = course.chapters.findIndex((_, ci) => isUnlocked(ci) && !isCompletedModule(ci));
          if (targetChapter < 0) {
            // All completed or none incomplete; fall back to first unlocked
            targetChapter = Math.max(0, course.chapters.findIndex((_, ci) => isUnlocked(ci)));
            if (targetChapter < 0) targetChapter = 0;
          }
          continueOnclick = `app.openCourseChapterLesson('${course.id}', ${targetChapter}, 0)`;
        }
      }
    } catch (_) {}

    return `
      <div class="dashboard-shell">
        <nav class="navbar navbar-expand-lg fixed-top nav-glass nav-dashboard">
          <div class="container">
            <a class="navbar-brand d-flex align-items-center gap-2" href="#" onclick="app.navigateTo('home'); return false;">
              <img src="img/Unicef Logo-01.png" alt="UNICEF Logo" class="brand-mark" style="height: 60px;">
            </a>
            <div class="d-flex align-items-center gap-3 ms-auto">
              <button class="btn btn-logout" title="Profile settings" onclick="app.navigateTo('profile'); return false;">
                <i class="fa-solid fa-gear"></i>
              </button>
              <div class="user-chip">
                <span class="user-avatar">${userInitials}</span>
                <div class="user-chip__meta">
                  <span class="user-chip__label">Logged in</span>
                  <span class="user-chip__name">${userName}</span>
                </div>
              </div>
              <button class="btn btn-logout" onclick="app.logout()">
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
              </button>
            </div>
          </div>
        </nav>

        <main class="dashboard-main">
          <div class="container">
            <section class="dashboard-hero">
               <!-- Background ornaments -->
              <div class="bg-ornaments" aria-hidden="true">
                <span class="orb orb-1"></span>
                <span class="orb orb-2"></span>
                <span class="orb orb-3"></span>
              </div>
              <div class="row g-4 align-items-center">
                <div class="col-lg-7">
                  <span class="dashboard-kicker dashboard-title"> Welcome To YHAP</span>
                  <p class="dashboard-subtitle">
                    You're ${overallProgress}% through your Young Health Ambassador pathway. Keep up the momentum with curated lessons, trackable impact, and certificates powered by UNICEF and MOHFW.
                  </p>
                  <div class="dashboard-meta">
                    <span class="meta-pill"><i class="fa-solid fa-calendar-check"></i>Joined ${joinedDate}</span>
                  </div>
                  <div class="dashboard-actions">
                    <button class="btn btn-gradient-glow hover-lift-sm focus-visible-ring transition-base btn-lg" onclick="${continueOnclick}">
                      Continue learning <i class="fa-solid fa-arrow-right-long ms-2"></i>
                    </button>
                    <button class="btn btn-outline-light btn-lg" onclick="app.navigateTo('register'); return false;">
                      Invite a friend <i class="fa-solid fa-user-plus ms-2"></i>
                    </button>
                  </div>
                </div>
                <div class="col-lg-5">
                  <div class="dashboard-hero__stats">
                    <div class="completion-ring" style="--progress: ${overallProgress};">
                      <div class="completion-ring__content">
                        <span class="completion-ring__value">${overallProgress}%</span>
                        <span class="completion-ring__label">Overall</span>
                      </div>
                    </div>
                    <ul class="dashboard-stat-list">
                      <li>
                        <span class="stat-label">Module Completed :&nbsp;</span>
                        <span class="stat-value">${formatNumber(
                          completedLessons
                        )}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section class="dashboard-chapters my-5">
              <div class="dashboard-section-header">
              </div>
              ${coursesData
                .map((course) => {
                  const hasChapters = Array.isArray(course.chapters) && course.chapters.length > 0;
                  if (!hasChapters) return "";
                  const progress = this.getUserProgress(course.id) || this.initializeProgress(course.id);
                  const doneSet = new Set(progress.completedlessions || []);

                  const moduleCards = course.chapters.map((ch, ci) => {
                    const chapterLessonIds = (ch.lessons || []).map((l) => l.id);
                    const contentDone = chapterLessonIds.every((id) => doneSet.has(id));
                    const moduleQuizId = `${ch.id}-quiz`;
                    const quizPassed = doneSet.has(moduleQuizId);
                    const completed = contentDone && quizPassed;
                    const unlocked = ci === 0 || (course.chapters[ci - 1] && doneSet.has(`${course.chapters[ci - 1].id}-quiz`));
                    const state = completed ? 'completed' : unlocked ? 'unlocked' : 'locked';
                    const icon = completed ? 'fa-check-circle' : unlocked ? 'fa-lock-open' : 'fa-lock';
                    const stateCls = completed ? 'module-card--completed' : unlocked ? 'module-card--unlocked' : 'module-card--locked';
                    const click = unlocked || completed ? `onclick=\"app.openCourseChapterLesson('${course.id}', ${ci}, 0)\"` : '';
                    return `
                      <div class=\"col-12 col-md-6 col-lg-4\">
                        <button class=\"module-card ${stateCls}\" ${click} ${!(unlocked||completed)?'disabled':''}>
                          <span class=\"module-card__icon\"><i class=\"fa-solid ${icon}\"></i></span>
                          <span class=\"module-card__title\">${ch.title.replace(/^Module-\d+:\s*/,'')}</span>
                        </button>
                      </div>`;
                  }).join('');

                  return `
                    <div class=\"course-chapters-card\">
                      <div class=\"course-chapters-header\">
                        <h3 class=\"mb-1 py-2\">${course.title}</h3>
                        <span class=\"text-muted\">${course.chapters.length} module${course.chapters.length>1?'s':''}</span>
                      </div>
                      <div class=\"row g-3\">${moduleCards}</div>
                    </div>`;
                })
                .join("")}
            </section>
          </div>
        </main>
      </div>
    `;
  }

  renderCourse() {
    const progress =
      this.getUserProgress(this.selectedCourse.id) ||
      this.initializeProgress(this.selectedCourse.id);
    const currentlession =
      this.selectedCourse.lessions[this.currentlessionIndex];
    const islessionCompleted = progress.completedlessions.includes(
      currentlession.id
    );
    const islessionUnlocked =
      this.currentlessionIndex === 0 ||
      progress.completedlessions.includes(
        this.selectedCourse.lessions[this.currentlessionIndex - 1]?.id
      );
    const overallProgress =
      (progress.completedlessions.length /
        this.selectedCourse.lessions.length) *
      100;

    if (this.showQuiz) {
      return this.renderQuiz();
    }

    return `
      <!-- Header -->
      <header class="bg-white shadow-sm sticky-top">
        <div class="container py-3">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <button class="btn btn-link text-decoration-none p-0" onclick="app.navigateTo('dashboard')">
              <i class="bi bi-arrow-left me-2"></i>Back to Dashboard
            </button>
            <span class="text-muted">Lession ${
              this.currentlessionIndex + 1
            } of ${this.selectedCourse.lessions.length}</span>
          </div>
          <h2 class="mb-3">${this.selectedCourse.title}</h2>
          <div class="d-flex align-items-center gap-3">
            <div class="progress flex-grow-1" style="height: 10px;">
              <div class="progress-bar" role="progressbar" style="width: ${overallProgress}%" aria-valuenow="${overallProgress}" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <span>${Math.round(overallProgress)}%</span>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <div class="container py-4">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <!-- Lession Navigation -->
            <div class="card shadow-sm mb-4">
              <div class="card-body">
                <div class="d-flex flex-wrap gap-2">
                  ${this.selectedCourse.lessions
                    .map((lession, index) => {
                      const completed = progress.completedlessions.includes(
                        lession.id
                      );
                      const unlocked =
                        index === 0 ||
                        progress.completedlessions.includes(
                          this.selectedCourse.lessions[index - 1]?.id
                        );
                      const current = index === this.currentlessionIndex;

                      return `
                      <button 
                        class="btn ${
                          current
                            ? "btn-primary"
                            : completed
                            ? "btn-success"
                            : unlocked
                            ? "btn-outline-secondary"
                            : "btn-outline-secondary"
                        }"
                        ${!unlocked ? "disabled" : ""}
                        onclick="app.changelession(${index})"
                      >
                        ${
                          completed
                            ? '<i class="bi bi-check-circle me-1"></i>'
                            : ""
                        }
                        ${!unlocked ? '<i class="bi bi-lock me-1"></i>' : ""}
                        Lession ${index + 1}
                      </button>
                    `;
                    })
                    .join("")}
                </div>
              </div>
            </div>

            ${
              !islessionUnlocked
                ? `
              <!-- Locked Lession -->
              <div class="card shadow-sm text-center py-5">
                <div class="card-body">
                  <i class="bi bi-lock fs-1 text-muted mb-3"></i>
                  <h3>Lession Locked</h3>
                  <p class="text-muted">Complete the previous lession's quiz to unlock this lession.</p>
                </div>
              </div>
            `
                : `
              <!-- Lession Content -->
              <div class="card shadow-sm mb-4">
                <div class="card-body p-4">
                  <div class="position-relative">
                    ${
                      currentlession.audioFile
                        ? `
                    <div class="position-absolute top-0 end-0 m-2" style="z-index: 5;">
                      <button class="btn btn-primary" id="audioToggleBtn" onclick="app.toggleAudio()" style="min-width: 120px;">
                        <i class="bi bi-pause-fill" id="audioIcon"></i>
                        <span id="audioText">Pause</span>
                      </button>
                    </div>
                    `
                        : ""
                    }
                    <div class="lession-content">
                      ${currentlession.content
                        .map((item, index) => {
                          if (item.type === "text") {
                            return `<div class="mb-4">${item.data}</div>`;
                          }
                          if (item.type === "image") {
                            return `<div class="mb-4"><img src="${item.data}" class="img-fluid rounded" alt="Lession content"></div>`;
                          }
                          if (item.type === "video") {
                            return `<div class="ratio ratio-16x9 mb-4"><iframe src="${item.data}" allowfullscreen></iframe></div>`;
                          }
                          return "";
                        })
                        .join("")}
                    </div>
                  </div>
                  ${
                    currentlession.audioFile
                      ? `
                  <audio id="lessonAudio" autoplay controls style="width:100%; margin-top: 1rem;">
                    <source src="${this.getAudioSource(
                      currentlession.audioFile
                    )}" type="${this.getAudioMimeType(
                          currentlession.audioFile
                        )}">
                    Your browser does not support the audio element.
                  </audio>
                  `
                      : ""
                  }
                </div>
              </div>

              <!-- Quiz Section -->
              <div class="card shadow-sm mb-4">
                <div class="card-body">
                  <h4 class="mb-3">${
                    islessionCompleted
                      ? "Quiz Completed"
                      : "Ready for the Quiz?"
                  }</h4>
                  
                  ${
                    islessionCompleted
                      ? `
                    <div class="alert alert-success mb-3">
                      <div class="d-flex align-items-center gap-3">
                        <i class="bi bi-check-circle fs-3"></i>
                        <div>
                          <p class="mb-1 fw-medium">You scored ${
                            progress.quizScores[currentlession.id]
                          }%</p>
                          <p class="mb-0 text-sm">You can retake the quiz to improve your score</p>
                        </div>
                      </div>
                    </div>
                  `
                      : ""
                  }
                  
                  <p class="text-muted mb-3">
                    Test your knowledge with a quiz. You need to score at least ${
                      currentlession.quiz.passingScore
                    }% to proceed to the next lession.
                  </p>
                  
                  <button class="btn btn-primary mt-3" onclick="app.startQuiz()">
                    ${islessionCompleted ? "Retake Quiz" : "Start Quiz"}
                  </button>
                </div>
              </div>

              <!-- Certificate Section -->
              ${
                progress.certificateIssued
                  ? `
                <div class="card shadow-sm border-primary">
                  <div class="card-body">
                    <div class="d-flex align-items-center gap-3">
                      <i class="bi bi-award fs-1 text-primary"></i>
                      <div class="flex-grow-1">
                        <h4 class="mb-1">Congratulations!</h4>
                        <p class="text-muted mb-0">You've completed all lessions in this course and earned your certificate!</p>
                      </div>
                      <button class="btn btn-outline-primary" onclick="app.navigateTo('dashboard')">
                        View Certificate
                      </button>
                    </div>
                  </div>
                </div>
              `
                  : ""
              }
            `
            }
          </div>
        </div>
      </div>
    `;
  }

  renderQuiz() {
    const items = this.selectedCourse.lessons || this.selectedCourse.lessions;
    const usingLessons = !!this.selectedCourse.lessons;
    const lessonIndex = usingLessons
      ? this.currentLessonIndex || 0
      : this.currentlessionIndex;
    const currentItem = items[lessonIndex];
    const { questions, passingScore } = currentItem.quiz;
    const courseTitle = this.selectedCourse.title;
    const lessonTitle = currentItem.title;

    const computeCorrectCount = () =>
      questions.reduce((count, question, idx) => {
        const userAnswer = this.quizState.selectedAnswers[idx];
        return count + (userAnswer === question.correctAnswer ? 1 : 0);
      }, 0);

    if (this.quizState.showResults) {
      const passed = this.quizState.score >= passingScore;
      const scorePercent = Math.round(this.quizState.score);
      const correctCount = computeCorrectCount();
      const incorrectCount = questions.length - correctCount;
      const resultBadge = passed ? "Quiz completed" : "Keep practicing";
      const resultEyebrow = passed ? "Mission accomplished" : "Almost there";
      const resultTitle = passed
        ? "You passed the quiz!"
        : "Review and try again";
      const resultSubtitle = passed
        ? "Great work! You're ready for the next step in the journey."
        : "Revisit the lesson highlights and retake the quiz when you're ready.";

      return `
        <div class="quiz-shell quiz-shell--results">
          <header class="quiz-hero quiz-hero--result">
            <div class="container">
              <div class="quiz-hero__top">
                <button class="quiz-back" onclick="app.showQuiz = false; app.render()">
                  <i class="fa-solid fa-arrow-left-long"></i>
                  Back to lesson
                </button>
                <span class="lesson-pill">${resultBadge}</span>
              </div>
              <div class="quiz-hero__content">
                <div>
                  <span class="quiz-hero__eyebrow">${resultEyebrow}</span>
                  <h1 class="quiz-hero__title">${resultTitle}</h1>
                  <p class="quiz-hero__subtitle">${resultSubtitle}</p>
                  <div class="quiz-hero__meta">
                    <span class="meta-pill"><i class="fa-solid fa-book"></i>${courseTitle}</span>
                    <span class="meta-pill"><i class="fa-solid fa-layer-group"></i>${lessonTitle}</span>
                  </div>
                </div>
                <div class="quiz-hero__scorecard quiz-scorecard-result">
                  <div class="completion-ring" style="--progress: ${scorePercent};">
                    <div class="completion-ring__content">
                      <span class="completion-ring__value">${scorePercent}%</span>
                      <span class="completion-ring__label">${
                        passed ? "Passed" : "Score"
                      }</span>
                    </div>
                  </div>
                  <div class="quiz-scorecard-stats">
                    <div>
                      <span class="stat-label">Correct answers</span>
                      <span class="stat-value">${correctCount}/${
        questions.length
      }</span>
                    </div>
                    <div>
                      <span class="stat-label">Incorrect</span>
                      <span class="stat-value">${incorrectCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <section class="quiz-body">
            <div class="container">
              <article class="quiz-result-panel">
                <h2 class="quiz-result-heading"><i class="fa-solid fa-list-check me-2"></i>Answer review</h2>
                <div class="quiz-review-list">
                  ${questions
                    .map((question, qIndex) => {
                      const userAnswer = this.quizState.selectedAnswers[qIndex];
                      const isCorrect = userAnswer === question.correctAnswer;
                      const userAnswerText =
                        userAnswer !== undefined
                          ? question.options[userAnswer]
                          : "Not answered";
                      const correctAnswerText =
                        question.options[question.correctAnswer];
                      return `
                        <div class="quiz-review-item ${
                          isCorrect ? "correct" : "incorrect"
                        }">
                          <div class="quiz-review-icon">
                            <i class="fa-solid ${
                              isCorrect ? "fa-circle-check" : "fa-circle-xmark"
                            }"></i>
                          </div>
                          <div class="quiz-review-content">
                            <h3>Q${qIndex + 1}. ${question.question}</h3>
                            <p class="quiz-review-answer">Your answer: <span>${userAnswerText}</span></p>
                            ${
                              isCorrect || !passed
                                ? ""
                                : `<p class="quiz-review-answer quiz-review-answer--correct">Correct answer: <span>${correctAnswerText}</span></p>`
                            }
                          </div>
                        </div>
                      `;
                    })
                    .join("")}
                </div>

                <div class="quiz-result-actions">
                  ${
                    passed
                      ? `<button class="btn btn-primary quiz-action-btn" onclick="app.finishQuiz()">
                          Continue<i class="fa-solid fa-arrow-right-long ms-2"></i>
                        </button>`
                      : `<div class="quiz-action-row">
                          <button class="btn btn-outline-primary quiz-action-btn" onclick="app.showQuiz = false; app.render()">
                            <i class="fa-solid fa-book me-2"></i>Review lesson
                          </button>
                          <button class="btn btn-primary quiz-action-btn" onclick="app.retryQuiz()">
                            Try again<i class="fa-solid fa-arrow-rotate-right ms-2"></i>
                          </button>
                        </div>`
                  }
                </div>
              </article>
            </div>
          </section>
        </div>
      `;
    }

    const currentQuestion = questions[this.quizState.currentQuestionIndex];
    const isLastQuestion =
      this.quizState.currentQuestionIndex === questions.length - 1;
    const progressPercent =
      ((this.quizState.currentQuestionIndex + 1) / questions.length) * 100;
    const displayProgress = Math.round(progressPercent);
    const isFirstQuestion = this.quizState.currentQuestionIndex === 0;
    const previousAction = isFirstQuestion
      ? "app.showQuiz = false; app.render()"
      : "app.previousQuestion()";
    const previousLabel = isFirstQuestion
      ? "Review lesson"
      : "Previous question";
    const previousIcon = isFirstQuestion
      ? "fa-book-open"
      : "fa-arrow-left-long";
    const hasSelection =
      this.quizState.selectedAnswers[this.quizState.currentQuestionIndex] !==
      undefined;

    return `
      <div class="quiz-shell">
        <header class="quiz-hero">
          <div class="container">
            <div class="quiz-hero__top">
              <button class="quiz-back" onclick="app.showQuiz = false; app.render()">
                <i class="fa-solid fa-arrow-left-long"></i>
                Back to lesson
              </button>
              <span class="lesson-pill">Question ${
                this.quizState.currentQuestionIndex + 1
              } of ${questions.length}</span>
            </div>
            <div class="quiz-hero__content">
              <div>
                <span class="quiz-hero__eyebrow">Knowledge check</span>
                <h1 class="quiz-hero__title">${lessonTitle}</h1>
                <div class="quiz-hero__meta">
                  <span class="meta-pill"><i class="fa-solid fa-book"></i>${courseTitle}</span>
                  <span class="meta-pill"><i class="fa-solid fa-gauge-high"></i>Passing ${passingScore}%</span>
                </div>
              </div>
              <div class="quiz-hero__scorecard">
                <div class="completion-ring" style="--progress: ${displayProgress};">
                  <div class="completion-ring__content">
                    <span class="completion-ring__value">${displayProgress}%</span>
                    <span class="completion-ring__label">Progress</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section class="quiz-body">
          <div class="container">
            <article class="quiz-panel">
              <div class="quiz-progress-container">
                <div class="quiz-progress-label">
                  <span><i class="fa-solid fa-circle-dot"></i>Question ${
                    this.quizState.currentQuestionIndex + 1
                  } of ${questions.length}</span>
                  <span><i class="fa-solid fa-trophy"></i>Passing score ${passingScore}%</span>
                </div>
                <div class="quiz-progress-bar">
                  <div class="quiz-progress-fill" style="width: ${progressPercent}%;"></div>
                </div>
              </div>

              <div class="quiz-question">
                <span class="quiz-question-eyebrow">Select the best answer</span>
                <h2>${currentQuestion.question}</h2>
              </div>

              <div class="quiz-option-grid">
                ${currentQuestion.options
                  .map((option, index) => {
                    const isSelected =
                      this.quizState.selectedAnswers[
                        this.quizState.currentQuestionIndex
                      ] === index;
                    return `
                      <button class="quiz-option-button ${
                        isSelected ? "active" : ""
                      }" type="button" onclick="app.selectAnswer(${index})">
                        <span class="quiz-option-index">${String.fromCharCode(
                          65 + index
                        )}</span>
                        <span class="quiz-option-text">${option}</span>
                        ${
                          isSelected
                            ? '<span class="quiz-option-state"><i class="fa-solid fa-check"></i></span>'
                            : ""
                        }
                      </button>
                    `;
                  })
                  .join("")}
              </div>

              ${
                hasSelection
                  ? ""
                  : `<div class=\"quiz-warning\"><i class=\"fa-solid fa-circle-exclamation\"></i><span>Please choose an option before continuing.</span></div>`
              }

              <div class="quiz-nav">
                <button class="btn btn-outline-primary quiz-nav-btn" onclick="${previousAction}">
                  <i class="fa-solid ${previousIcon} me-2"></i>${previousLabel}
                </button>
                <button class="btn btn-primary quiz-nav-btn" ${
                  hasSelection ? "" : "disabled"
                } onclick="app.nextQuestion()">
                  ${
                    isLastQuestion
                      ? 'Submit quiz<i class="fa-solid fa-check ms-2"></i>'
                      : 'Next question<i class="fa-solid fa-arrow-right-long ms-2"></i>'
                  }
                </button>
              </div>
            </article>
          </div>
        </section>
      </div>
    `;
  }

  renderLessonSlider() {
    // Ensure a course is selected; fallback to first available course
    if (!this.selectedCourse) {
      try {
        if (Array.isArray(coursesData) && coursesData.length) {
          this.selectedCourse = coursesData[0];
          this.currentChapterIndex = 0;
          this.currentLessonIndex = 0;
        }
      } catch (_) {}
    }
    const course = this.selectedCourse;
    const hasChapters = Array.isArray(course?.chapters) && course.chapters.length > 0;
    const sidebarHidden = (window.YHUI ? window.YHUI.sidebarHidden : this.isLessonSidebarHidden());

    if (hasChapters) {
      const totalChapters = course.chapters.length;
      const chIndex = Math.min(
        Math.max(0, this.currentChapterIndex || 0),
        totalChapters - 1
      );
      const rawLessons = course.chapters[chIndex].lessons || [];
      // Build a synthetic module-level quiz as the last lesson by aggregating all lesson quizzes
      const aggregatedQuestions = [];
      rawLessons.forEach((ls, idx) => {
        if (ls.quiz && Array.isArray(ls.quiz.questions)) {
          ls.quiz.questions.forEach((q, qi) => {
            aggregatedQuestions.push({
              ...q,
              id: `${ls.id}-q${qi+1}`
            });
          });
        }
      });
      const moduleQuizLesson = {
        id: `${course.chapters[chIndex].id}-quiz`,
        title: 'Quiz',
        icon: 'fa-circle-question',
        gradientClass: 'bg-gradient-emerald',
        audioFile: '',
        quiz: { passingScore: 80, questions: aggregatedQuestions },
        content: `
          <div class="lesson-slide">
            <h2 class="slide-title gradient-text" data-aos="fade-up">Module Quiz</h2>
            <p class="text-muted" data-aos="fade-up" data-aos-delay="60">
              This quiz checks your understanding of the key ideas in this module.
              There are <strong>${aggregatedQuestions.length}</strong> multiple‑choice questions.
              You must score at least <strong>80%</strong> to pass and unlock the next module.
            </p>
            <ul class="text-muted mb-0" data-aos="fade-up" data-aos-delay="90" style="padding-left: 1.2rem;">
              <li>Quiz test is very crucial for every learning path.</li>
              <li>Read each question carefully and select the correct answer.</li>
              <li>You can go back to review the lesson at any time.</li>
              <li>Retakes are allowed — your best score will be saved.</li>
            </ul>
          </div>`
      };
      const chapterLessons = rawLessons.slice();
      const viewLessons = chapterLessons.concat(moduleQuizLesson);
      const totalLessons = viewLessons.length;
      // Align legacy lesson-driven quiz/navigation to current chapter
      this.selectedCourse.lessons = viewLessons;

      const activeIndex = Math.min(
        Math.max(0, this.currentLessonIndex || 0),
        Math.max(0, totalLessons - 1)
      );
  const currentLesson = viewLessons[activeIndex];
      const hasPrevLesson = activeIndex > 0;
      const hasNextLesson = activeIndex < totalLessons - 1;
      const hasPrevChapter = chIndex > 0;
      const hasNextChapter = chIndex < totalChapters - 1;

      let progress = this.getUserProgress(course.id);
      if (!progress) progress = this.initializeProgress(course.id);
      const completedIds = new Set(progress.completedlessions || []);
      const lessonCompleted = currentLesson
        ? completedIds.has(currentLesson.id)
        : false;
      const quizScore = currentLesson
        ? progress.quizScores?.[currentLesson.id]
        : undefined;

      // Auto-complete content lessons upon viewing to unlock the next one; quiz is handled separately
      try {
        const isModuleQuiz = currentLesson && typeof currentLesson.id === 'string' && currentLesson.id.endsWith('-quiz');
        if (currentLesson && !isModuleQuiz && !lessonCompleted) {
          progress.completedlessions = Array.isArray(progress.completedlessions) ? progress.completedlessions : [];
          progress.completedlessions.push(currentLesson.id);
          completedIds.add(currentLesson.id);
          const key = `progress-${this.currentUser.id}-${course.id}`;
          localStorage.setItem(key, JSON.stringify(progress));
        }
      } catch (_) {}

      // Course progress is module-based: completed modules (chapters) / total modules
      const moduleProgress = this.calculateCourseModuleProgress(course, completedIds);
      const courseProgressWidth = moduleProgress.percent;
      const courseProgressDisplay = moduleProgress.percent;

      const chapterCompletedCount = chapterLessons.reduce(
        (count, lesson) => count + (completedIds.has(lesson.id) ? 1 : 0),
        0
      );
      const chapterProgressRaw =
        totalLessons > 0
          ? (chapterCompletedCount / totalLessons) * 100
          : 0;
      const chapterProgressDisplay = Math.round(
        Math.min(100, Math.max(0, chapterProgressRaw))
      );

  if (this.showQuiz) return this.renderQuiz();

  // Determine if module quiz is passed to allow moving to next module
  const moduleQuizId = `${course.chapters[chIndex].id}-quiz`;
  const modulePassed = completedIds.has(moduleQuizId);

      // Icon mapping for chapters (fallback rotates through when out of range)
      const chapterIcons = [
        "fa-layer-group",
        "fa-compass",
        "fa-seedling",
        "fa-graduation-cap",
        "fa-heart-pulse",
        "fa-globe",
        "fa-handshake-angle",
        "fa-lightbulb",
        "fa-rocket",
        "fa-diagram-project",
      ];

      // Mobile offcanvas lesson browser (chapters)
      const mobileBrowseBtn = `
        <div class="d-lg-none mb-1">
          <button class="btn btn-primary w-100" data-bs-toggle="offcanvas" data-bs-target="#mobileLessonBrowser" aria-controls="mobileLessonBrowser">
            <i class="fa-solid fa-list me-2"></i>Browse modules & lessons
          </button>
        </div>`;

      const mobileOffcanvas = `
        <div class="offcanvas offcanvas-start" tabindex="-1" id="mobileLessonBrowser" aria-labelledby="mobileLessonBrowserLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title btn btn-gradient-glow hover-lift-sm focus-visible-ring transition-base btn-lg" id="mobileLessonBrowserLabel">All modules & lessons</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            ${course.chapters.map((ch, ci) => {
              const lessons = ch.lessons || [];
              return `
                <div class="mb-3 accordion-item">
                  <div class="module-header accordion-button fw-semibold"><i class="fa-solid ${chapterIcons[ci % chapterIcons.length]} me-2 shadow-lg"></i>${ch.title}</div>
                  <div class="list-group">
                    ${lessons.map((ls, li) => {
                      const prevId = lessons[Math.max(0, li - 1)]?.id;
                      const isUnlocked = li === 0 || (prevId && completedIds.has(prevId));
                      const isDone = completedIds.has(ls.id);
                      const isCurrent = ci === chIndex && li === activeIndex;
                      // Estimate reading time from content length (~200 wpm)
                      let estMin = 1;
                      try {
                        const text = String(ls.content || '').replace(/<[^>]+>/g, ' ');
                        const words = (text.match(/\S+/g) || []).length;
                        estMin = Math.max(1, Math.round(words / 200));
                      } catch (_) {}
                      const icon = isDone ? 'fa-check' : (isUnlocked ? 'fa-unlock' : 'fa-lock');
                      const disabledCls = isUnlocked ? '' : 'disabled';
                      const click = isUnlocked ? `onclick=\"app.changeChapterLesson(${ci}, ${li})\"` : '';
                      const dismiss = isUnlocked ? 'data-bs-dismiss="offcanvas"' : '';
                      return `
                        <button type="button" class="list-group-item list-group-item-action d-flex align-items-center accordion-button ${disabledCls}" ${click} ${dismiss}>
                          <i class="fa-solid ${icon} me-2" aria-hidden="true"></i>
                          <span class="flex-grow-1">${ls.title}</span>
                          <span class="badge bg-light text-dark border me-2 d-none">${estMin} min</span>
                          ${isCurrent ? '<span class="badge bg-info text-dark me-2">Current</span>' : ''}
                          ${isDone ? '<span class="ring ring--done" title="Completed" aria-label="Completed"><span class="ring__inner"><i class="fa-solid fa-check"></i></span></span>' : ''}
                        </button>`;
                    }).join('')}
                  </div>
                </div>`;
            }).join('')}
          </div>
        </div>`;

      const accordion = `
        <div class="accordion chapter-accordion" id="chaptersAccordion">
          ${course.chapters
            .map((ch, ci) => {
              const total = (ch.lessons || []).length;
              const done = (ch.lessons || []).reduce(
                (acc, ls) => acc + (completedIds.has(ls.id) ? 1 : 0),
                0
              );
              return `
            <div class="accordion-item">
              <h2 class="accordion-header" id="heading-${ci}">
                <button class="accordion-button chapter-button ${
                  ci === chIndex ? "" : "collapsed"
                }" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${ci}" aria-expanded="${
                ci === chIndex
              }" aria-controls="collapse-${ci}">
                  <span class="chapter-icon me-2"><i class="fa-solid ${
                    chapterIcons[ci % chapterIcons.length]
                  }"></i></span>
                  <span class="chapter-title">${ch.title}</span>
                  <span class="ms-auto chapter-progress-pill" title="${done} of ${total} lessons">${done}/${total}</span>
                </button>
              </h2>
              <div id="collapse-${ci}" class="accordion-collapse collapse ${
                ci === chIndex ? "show" : ""
              }" aria-labelledby="heading-${ci}" data-bs-parent="#chaptersAccordion">
                <div class="accordion-body p-0">
                  <ul class="list-group list-group-flush lessons-list">
                    ${(ch.lessons || [])
                      .map((ls, li) => {
                        const isActive = ci === chIndex && li === activeIndex;
                        const isDone = completedIds.has(ls.id);
                        const isUnlocked = li === 0 || completedIds.has((ch.lessons || [])[li - 1]?.id);
                        const lockIcon = isDone ? 'fa-check' : (isUnlocked ? 'fa-lock-open' : 'fa-lock');
                        const maybeOnclick = isUnlocked ? `onclick=\"app.changeChapterLesson(${ci}, ${li})\"` : '';
                        const ariaDisabled = isUnlocked ? '' : 'aria-disabled="true"';
                        return `
                      <li class="lesson-chip list-group-item lesson-item d-flex align-items-center my-1 ${
                        isActive ? "is-active" : ""
                      } ${isUnlocked ? '' : 'is-locked'}" ${maybeOnclick} ${ariaDisabled}>
                        <span class="lesson-icon"><i class="fa-solid ${
                          ls.icon || "fa-book"
                        }"></i></span>
                        <span class="lesson-title">${ls.title}</span>
                        <span class="lesson-state ms-auto"><i class="fa-solid ${lockIcon}"></i></span>
                      </li>`;
                      })
                      .join("")}
                  </ul>
                </div>
              </div>
            </div>`;
            })
            .join("")}
        </div>`;

      return `
        <div class="lesson-shell modules-expanded" data-modules-state="expanded">
          <header class="lesson-hero">
            <div class="container">
              <div class="lesson-hero__top">
                <button class="lesson-back" onclick="app.navigateTo('dashboard')">
                  <i class="fa-solid fa-arrow-left-long"></i>
                  Back to dashboard
                </button>
                <button class="btn btn-primary d-none d-lg-block" data-bs-toggle="offcanvas" data-bs-target="#mobileLessonBrowser" aria-controls="mobileLessonBrowser">
                  <i class="fa-solid fa-list me-2"></i>Browse modules & lessons
                </button>
                <div class="lesson-hero__progress">
                  <div
                    class="lesson-progress"
                    role="progressbar"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow="${courseProgressDisplay}"
                    aria-label="Course progress"
                  >
                    <div
                      class="lesson-progress__bar"
                      style="width: ${courseProgressWidth.toFixed(2)}%;"
                    ></div>
                  </div>
                  <div class="lesson-progress__meta">
                    <span class="lesson-progress__label">Course progress:</span>
                    <span class="lesson-progress__value">&nbsp;${courseProgressDisplay}%</span>
                  </div>
                  ${
                    totalLessons > 0
                      ? `<div class="lesson-progress__caption">Module ${
                          chIndex + 1
                        } progress: <span id="chapterProgressValue" data-target="${chapterProgressDisplay}">0</span>%</div>`
                      : ""
                  }
                </div>
                <div class="lesson-hero__counts">
                  <span class="lesson-pill">Module ${
                    chIndex + 1
                  } of ${totalChapters}</span>
                  <span class="lesson-pill">Lesson ${
                    activeIndex + 1
                  } of ${totalLessons}</span>
                </div>
              </div>
              ${mobileBrowseBtn}
                
            </div>
          </header>

          <section class="lesson-body">
            <div class="container">
              <div class="row g-4 lesson-body-row">
                <div class="lesson-content-col col-12 col-md-12">
                  <article class="lesson-content-card">
                    ${
                      currentLesson && currentLesson.audioFile
                        ? `
                      <div class="lesson-audio-bar">
                        <div class="lesson-audio-meta">
                          <span class="lesson-audio-label"><i class="fa-solid fa-headphones"></i> Audio companion</span>
                          <span class="lesson-audio-sub">Listen while you learn or pause to read at your own pace.</span>
                        </div>
                        <button class="btn btn-primary" id="audioToggleBtn" onclick="app.toggleAudio()" style="min-width: 120px;">
                          <i class="bi bi-pause-fill" id="audioIcon"></i>
                          <span id="audioText">Pause</span>
                        </button>
                      </div>
                      <audio id="lessonAudio" controls style="width:100%; margin-bottom: 1rem; display: none;">
                        <source src="${this.getAudioSource(
                          currentLesson.audioFile
                        )}" type="${this.getAudioMimeType(
                            currentLesson.audioFile
                          )}">
                        Your browser does not support the audio element.
                      </audio>
                    `
                        : ""
                    }

                    <div class="lesson-content-body">
                      ${
                        currentLesson
                          ? currentLesson.content
                          : "<p>No lesson selected.</p>"
                      }
                      ${currentLesson && currentLesson.id.endsWith('-quiz') ? '' : `
                      <div class="inline-lesson-nav">
                        <button class="btn btn-outline-primary" ${
                          hasPrevLesson
                            ? 'onclick="app.previousLesson()"'
                            : "disabled"
                        }>
                          <i class="fa-solid fa-arrow-left-long me-2"></i>Previous lesson
                        </button>
                        <button class="btn btn-primary" ${
                          hasNextLesson
                            ? 'onclick="app.nextLesson()"'
                            : "disabled"
                        }>
                          Next lesson<i class="fa-solid fa-arrow-right-long ms-2"></i>
                        </button>
                      </div>`}
                    </div>

                    ${currentLesson && currentLesson.id.endsWith('-quiz') ? `
                      <div class="lesson-quiz-card ${lessonCompleted ? 'lesson-quiz-card--complete' : ''}">
                        <div class="lesson-quiz-card__header">
                          <span class="lesson-quiz-badge"><i class="fa-solid fa-circle-question"></i> Module quiz</span>
                          <span class="lesson-quiz-score">Passing score: ${currentLesson.quiz.passingScore}%</span>
                        </div>
                        ${quizScore !== undefined ? `
                          <div class="lesson-quiz-status">
                            <i class="fa-solid ${lessonCompleted ? 'fa-check-circle' : 'fa-rotate-right'}"></i>
                            <div>
                              <p class="lesson-quiz-status__title">Latest attempt: ${quizScore}%</p>
                              <p class="lesson-quiz-status__meta">${lessonCompleted ? 'Great job! You can retake the quiz to boost your score.' : 'Give it another try to reach the passing score.'}</p>
                            </div>
                          </div>` : ''}
                        <p class="lesson-quiz-text">
                          This quiz has <strong>${currentLesson.quiz.questions.length}</strong> questions.
                          You must pass this quiz to unlock the next module. You can retake it and your best score will be saved.
                        </p>
                        <button class="btn btn-primary btn-lg" onclick="app.startQuiz()">
                          ${lessonCompleted ? 'Retake quiz' : 'Start quiz'}
                          <i class="fa-solid fa-arrow-right-long ms-2"></i>
                        </button>
                      </div>` : ''}

                      <div class="chapter-nav-actions" ${modulePassed ? '' : 'style="display:none"'}>
                        <button class="btn btn-outline-primary" ${
                          hasPrevChapter ? 'onclick="app.previousChapter()"' : 'disabled'
                        }>
                          <i class="fa-solid fa-arrow-left me-2"></i>Previous module
                        </button>
                        <button class="btn btn-primary" ${
                          hasNextChapter ? 'onclick="app.nextChapter()"' : 'disabled'
                        }>
                          Next module<i class="fa-solid fa-arrow-right ms-2"></i>
                        </button>
                      </div>
                  </article>
                </div>
              </div>
            </div>
          </section>
          ${mobileOffcanvas}
        </div>
      `;
    }

    // Legacy: flat lessons
    const courseFlat = this.selectedCourse;
    const activeIndex = this.currentLessonIndex || 0;
    const totalLessons = courseFlat.lessons.length;
    const currentLesson = courseFlat.lessons[activeIndex];
    const hasPrevLesson = activeIndex > 0;
    const hasNextLesson = activeIndex < totalLessons - 1;

    let progress = this.getUserProgress(courseFlat.id);
    if (!progress) progress = this.initializeProgress(courseFlat.id);

    const completedIds = new Set(progress.completedlessions || []);
    const lessonCompleted = completedIds.has(currentLesson.id);
    const quizScore = progress.quizScores?.[currentLesson.id];

    const courseProgressRaw =
      totalLessons > 0 ? (completedIds.size / totalLessons) * 100 : 0;
    const courseProgressWidth = Math.min(100, Math.max(0, courseProgressRaw));
    const courseProgressDisplay = Math.round(courseProgressWidth);

    if (this.showQuiz) return this.renderQuiz();

    return `
      <div class="lesson-shell modules-expanded" data-modules-state="expanded">
        <header class="lesson-hero">
          <div class="container">
            <div class="lesson-hero__top">
              <div class="lesson_buttons"> 
                 <button class="lesson-back" onclick="app.navigateTo('dashboard')">
                  <i class="fa-solid fa-arrow-left-long"></i>
                  Back to dashboard
                 </button>
                <button class="d-none d-lg-block btn btn-primary" data-bs-toggle="offcanvas" data-bs-target="#mobileLessonBrowserFlat" aria-controls="mobileLessonBrowserFlat">
                  <i class="fa-solid fa-list me-2"></i>Browse modules & lessons
                </button>
              </div>
              <div class="lesson-hero__counts">
                <span class="lesson-pill">Lesson ${
                  activeIndex + 1
                } of ${totalLessons}</span>
              </div>
            </div>
            <div class="d-lg-none mt-3">
              <button class="btn btn-primary w-100" data-bs-toggle="offcanvas" data-bs-target="#mobileLessonBrowserFlat" aria-controls="mobileLessonBrowserFlat">
                <i class="fa-solid fa-list me-2"></i>Browse lessons
              </button>
            </div>
            
            <div class="lesson-hero__progress">
              <div
                class="lesson-progress"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow="${courseProgressDisplay}"
                aria-label="Course progress"
              >
                <div
                  class="lesson-progress__bar"
                  style="width: ${courseProgressWidth.toFixed(2)}%;"
                ></div>
              </div>
              <div class="lesson-progress__meta">
                <span class="lesson-progress__label">Course progress</span>
                <span class="lesson-progress__value">${courseProgressDisplay}%</span>
              </div>
            </div>
            <div class="row align-items-start g-4"></div>
          </div>
        </header>

        <section class="lesson-body">
          <div class="container">
            <div class="row g-4 lesson-body-row">
              <div class="lesson-content-col col-12 col-md-12">
                <article class="lesson-content-card">
                  ${
                    currentLesson.audioFile
                      ? `
                    <div class="lesson-audio-bar">
                      <div class="lesson-audio-meta">
                        <span class="lesson-audio-label"><i class="fa-solid fa-headphones"></i> Audio companion</span>
                        <span class="lesson-audio-sub">Listen while you learn or pause to read at your own pace.</span>
                      </div>
                      <button class="btn btn-primary" id="audioToggleBtn" onclick="app.toggleAudio()" style="min-width: 120px;">
                        <i class="bi bi-pause-fill" id="audioIcon"></i>
                        <span id="audioText">Pause</span>
                      </button>
                    </div>
                    <audio id="lessonAudio" autoplay controls style="width:100%; margin-bottom: 1rem; display: none;">
                      <source src="${this.getAudioSource(
                        currentLesson.audioFile
                      )}" type="${this.getAudioMimeType(
                          currentLesson.audioFile
                        )}">
                      Your browser does not support the audio element.
                    </audio>
                  `
                      : ""
                  }

                  <div class="lesson-content-body">
                    ${currentLesson.content}
                    <div class="inline-lesson-nav">
                      <button class="btn btn-outline-primary" ${
                        hasPrevLesson
                          ? 'onclick="app.previousLesson()"'
                          : "disabled"
                      }>
                        <i class="fa-solid fa-arrow-left-long me-2"></i>Previous lesson
                      </button>
                      <button class="btn btn-primary" ${
                        hasNextLesson
                          ? 'onclick="app.nextLesson()"'
                          : "disabled"
                      }>
                        Next lesson<i class="fa-solid fa-arrow-right-long ms-2"></i>
                      </button>
                    </div>
                  </div>

                  <div class="lesson-quiz-card ${
                    lessonCompleted ? "lesson-quiz-card--complete" : ""
                  }">
                    <div class="lesson-quiz-card__header">
                      <span class="lesson-quiz-badge"><i class="fa-solid fa-circle-question"></i> Module quiz</span>
                      <span class="lesson-quiz-score">Passing score: ${
                        currentLesson.quiz.passingScore
                      }%</span>
                    </div>
                    ${
                      quizScore !== undefined
                        ? `
                      <div class="lesson-quiz-status">
                        <i class="fa-solid ${
                          lessonCompleted
                            ? "fa-check-circle"
                            : "fa-rotate-right"
                        }"></i>
                        <div>
                          <p class="lesson-quiz-status__title">Latest attempt: ${quizScore}%</p>
                          <p class="lesson-quiz-status__meta">${
                            lessonCompleted
                              ? "Great job! You can retake the quiz to boost your score."
                              : "Give it another try to reach the passing score."
                          }</p>
                        </div>
                      </div>`
                        : ""
                    }
                    <p class="lesson-quiz-text">
                      Test your understanding and unlock the next milestone.
                      This quiz has <strong>${
                        currentLesson.quiz.questions.length
                      }</strong> questions.
                      Score at least <strong>${
                        currentLesson.quiz.passingScore
                      }%</strong> to mark this lesson as complete. You can retake it — your best score will be saved.
                    </p>
                    <button class="btn btn-primary btn-lg" onclick="app.startQuiz()">
                      ${lessonCompleted ? "Retake quiz" : "Start quiz"}
                      <i class="fa-solid fa-arrow-right-long ms-2"></i>
                    </button>
                  </div>

                  <div class="lesson-nav-actions">
                    ${
                      activeIndex > 0
                        ? `
                      <button class="btn btn-outline-primary lesson-nav-btn" onclick="app.previousLesson()">
                        <i class="fa-solid fa-arrow-left-long me-2"></i>Previous lesson
                      </button>`
                        : "<span></span>"
                    }
                    ${
                      activeIndex < totalLessons - 1
                        ? `
                      <button class="btn btn-primary lesson-nav-btn" onclick="app.nextLesson()">
                        Next lesson<i class="fa-solid fa-arrow-right-long ms-2"></i>
                      </button>`
                        : `
                      <button class="btn btn-success lesson-nav-btn" onclick="app.completeLesson()">
                        <i class="fa-solid fa-award me-2"></i>Complete course
                      </button>`
                    }
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>
        <div class="offcanvas offcanvas-start" tabindex="-1" id="mobileLessonBrowserFlat" aria-labelledby="mobileLessonBrowserFlatLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="mobileLessonBrowserFlatLabel">Lessons</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <div class="list-group">
            ${courseFlat.lessons
              .map((ls, li) => {
                const isDone = completedIds.has(ls.id);
                const isCurrent = li === activeIndex;
                const icon = isDone ? "fa-check" : "fa-book-open";
                let estMin = 1;
                try {
                  const text = String(ls.content || "").replace(
                    /<[^>]+>/g,
                    " "
                  );
                  const words = (text.match(/\S+/g) || []).length;
                  estMin = Math.max(1, Math.round(words / 200));
                } catch (_) {}
                return `
                <button type="button" class="list-group-item list-group-item-action d-flex align-items-center" onclick="app.changeLesson(${li})" data-bs-dismiss="offcanvas">
                  <i class="fa-solid ${icon} me-2"></i>
                  <span class="flex-grow-1">${ls.title}</span>
                  <span class="badge bg-light text-dark border me-2">${estMin} min</span>
                  ${
                    isCurrent
                      ? '<span class="badge bg-info text-dark me-2">Current</span>'
                      : ""
                  }
                  ${
                    isDone
                      ? '<span class="ring ring--done" title="Completed" aria-label="Completed"><span class="ring__inner"><i class="fa-solid fa-check"></i></span></span>'
                      : ""
                  }
                </button>`;
              })
              .join("")}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Change chapter and lesson (chapter-based courses)
  changeChapterLesson(chapterIndex, lessonIndex) {
    this.currentChapterIndex = Math.max(0, chapterIndex || 0);
    if (this.selectedCourse && Array.isArray(this.selectedCourse.chapters)) {
      const lessons =
        this.selectedCourse.chapters[this.currentChapterIndex]?.lessons || [];
      this.selectedCourse.lessons = lessons;
      // Enforce sequential unlocking: allow first lesson or when previous is completed
      try {
        const progress = this.getUserProgress(this.selectedCourse.id) || this.initializeProgress(this.selectedCourse.id);
        const prevId = lessons[Math.max(0, (lessonIndex || 0) - 1)]?.id;
        const isUnlocked = (lessonIndex || 0) === 0 || (prevId && (progress.completedlessions || []).includes(prevId));
        if (!isUnlocked) {
          // Do not navigate to locked lessons
          return;
        }
      } catch (_) {}
      this.currentLessonIndex = Math.min(
        Math.max(0, lessonIndex || 0),
        Math.max(0, lessons.length - 1)
      );
    } else {
      this.currentLessonIndex = Math.max(0, lessonIndex || 0);
    }
    this.render();
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (_) {}
    try {
      setTimeout(() => this.scrollActiveLessonIntoView(), 80);
    } catch (_) {}
  }

  // Jump to a specific course/chapter/lesson from dashboard
  openCourseChapterLesson(courseId, chapterIndex = 0, lessonIndex = 0) {
    const course = (typeof coursesData !== "undefined" ? coursesData : []).find(
      (c) => c.id === courseId
    );
    if (!course) return;
    this.selectedCourse = course;
    this.showQuiz = false;
    if (Array.isArray(course.chapters) && course.chapters.length > 0) {
      this.currentChapterIndex = Math.min(
        Math.max(0, chapterIndex || 0),
        course.chapters.length - 1
      );
      const lessons = course.chapters[this.currentChapterIndex]?.lessons || [];
      this.selectedCourse.lessons = lessons;
      this.currentLessonIndex = Math.min(
        Math.max(0, lessonIndex || 0),
        Math.max(0, lessons.length - 1)
      );
    } else {
      this.currentChapterIndex = 0;
      this.selectedCourse.lessons = course.lessons || [];
      this.currentLessonIndex = Math.min(
        Math.max(0, lessonIndex || 0),
        Math.max(0, this.selectedCourse.lessons.length - 1)
      );
    }
    this.navigateTo("lesson-slider");
  }

  // Chapter navigation helpers
  nextChapter() {
    if (!this.selectedCourse || !Array.isArray(this.selectedCourse.chapters))
      return;
    const total = this.selectedCourse.chapters.length;
    if (this.currentChapterIndex < total - 1) {
      this.changeChapterLesson(this.currentChapterIndex + 1, 0);
    }
  }

  previousChapter() {
    if (!this.selectedCourse || !Array.isArray(this.selectedCourse.chapters))
      return;
    if (this.currentChapterIndex > 0) {
      this.changeChapterLesson(this.currentChapterIndex - 1, 0);
    }
  }

  changeLesson(index) {
    this.currentLessonIndex = index;
    this.render();
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (_) {}
    try {
      setTimeout(() => this.scrollActiveLessonIntoView(), 80);
    } catch (_) {}
  }

  // Smooth-scroll the active lesson in the sidebar into view
  scrollActiveLessonIntoView() {
    try {
      const container = document.querySelector(".lesson-trail");
      if (!container) return;
      const active = container.querySelector(
        ".lesson-item.is-active, .lesson-chip.lesson-chip--current"
      );
      if (!active) return;
      const cRect = container.getBoundingClientRect();
      const aRect = active.getBoundingClientRect();
      const overTop = aRect.top < cRect.top + 16;
      const overBottom = aRect.bottom > cRect.bottom - 16;
      if (overTop || overBottom) {
        active.scrollIntoView({ block: "center", behavior: "smooth" });
      }
    } catch (_) {}
  }

  nextLesson() {
    if (this.currentLessonIndex < this.selectedCourse.lessons.length - 1) {
      this.currentLessonIndex++;
      this.render();
      try {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (_) {}
      try {
        setTimeout(() => this.scrollActiveLessonIntoView(), 80);
      } catch (_) {}
    }
  }

  previousLesson() {
    if (this.currentLessonIndex > 0) {
      this.currentLessonIndex--;
      this.render();
      try {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (_) {}
      try {
        setTimeout(() => this.scrollActiveLessonIntoView(), 80);
      } catch (_) {}
    }
  }

  completeLesson() {
    // Mark all lessons as completed
    const progress =
      this.getUserProgress(this.selectedCourse.id) ||
      this.initializeProgress(this.selectedCourse.id);

    this.selectedCourse.lessons.forEach((lesson) => {
      if (!progress.completedlessions.includes(lesson.id)) {
        progress.completedlessions.push(lesson.id);
      }
    });

    progress.certificateIssued = true;
    const key = `progress-${this.currentUser.id}-${this.selectedCourse.id}`;
    localStorage.setItem(key, JSON.stringify(progress));

    // Show success message and redirect to certificate
    alert("🎉 Congratulations! You have completed all lessons!");
    this.viewCertificate(this.selectedCourse.id);
  }

  renderCertificate() {
    const currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const certificateId = `YHL-${this.currentUser.id
      .slice(-6)
      .toUpperCase()}-${this.selectedCourse.id.slice(-4).toUpperCase()}`;

    return `
      <!-- Header -->
      <header class="bg-white shadow-sm">
        <div class="container py-3">
          <button class="btn btn-link text-decoration-none p-0" onclick="app.navigateTo('dashboard')">
            <i class="bi bi-arrow-left me-2"></i>Back to Dashboard
          </button>
        </div>
      </header>

      <!-- Main Content -->
      <div class="container py-5">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <div class="certificate-container mb-5">
              <div class="certificate bg-white rounded shadow-lg p-5 position-relative">
                <!-- Decorative Corners -->
                <div class="certificate-corner certificate-corner-tl"></div>
                <div class="certificate-corner certificate-corner-tr"></div>
                <div class="certificate-corner certificate-corner-bl"></div>
                <div class="certificate-corner certificate-corner-br"></div>

                <div class="text-center position-relative" style="z-index: 10;">
                  <p class="text-primary text-uppercase mb-4" style="letter-spacing: 0.3em; font-size: 0.875rem;">
                    CERTIFICATE OF COMPLETION
                  </p>
                  
                  <h2 class="mb-5">Young Health LMS</h2>
                  
                  <p class="text-muted mb-3">This certifies that</p>
                  
                  <h1 class="text-primary mb-5" style="font-size: 2.5rem;">${
                    this.currentUser.name
                  }</h1>
                  
                  <p class="text-muted mb-3">has successfully completed the course</p>
                  
                  <h2 class="mb-5">${this.selectedCourse.title}</h2>
                  
                  <p class="text-muted mb-5">
                    Demonstrating proficiency in all course modules and assessments
                  </p>
                  
                  <div class="row justify-content-center mb-5">
                    <div class="col-md-5 mb-3 mb-md-0">
                      <div class="border-top border-2 border-dark pt-2">
                        <p class="text-muted mb-1" style="font-size: 0.875rem;">Date of Completion</p>
                        <p class="mb-0">${currentDate}</p>
                      </div>
                    </div>
                    
                    <div class="col-md-5">
                      <div class="border-top border-2 border-dark pt-2">
                        <p class="text-muted mb-1" style="font-size: 0.875rem;">Certificate ID</p>
                        <p class="mb-0" style="font-family: monospace;">${certificateId}</p>
                      </div>
                    </div>
                  </div>

                  <i class="bi bi-award display-3 text-primary"></i>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="text-center mb-5">
              <button class="btn btn-primary btn-lg me-3" onclick="alert('In a production app, this would download a PDF certificate')">
                <i class="bi bi-download me-2"></i>Download Certificate
              </button>
              <button class="btn btn-outline-primary btn-lg" onclick="app.navigateTo('dashboard')">
                Back to Courses
              </button>
            </div>

            <!-- Course Summary -->
            <div class="card shadow-sm">
              <div class="card-body">
                <h4 class="mb-4">Course Summary</h4>
                <div class="row g-4">
                  <div class="col-md-6">
                    <p class="text-muted mb-1 small">Course Title</p>
                    <p class="mb-0">${this.selectedCourse.title}</p>
                  </div>
                  <div class="col-md-6">
                    <p class="text-muted mb-1 small">Modules Completed</p>
                    <p class="mb-0">${
                      this.selectedCourse.lessons
                        ? this.selectedCourse.lessons.length + " lessons"
                        : this.selectedCourse.lessions
                        ? this.selectedCourse.lessions.length + " lessions"
                        : "0 lessons"
                    }</p>
                  </div>
                  <div class="col-md-6">
                    <p class="text-muted mb-1 small">Learner Name</p>
                    <p class="mb-0">${this.currentUser.name}</p>
                  </div>
                  <div class="col-md-6">
                    <p class="text-muted mb-1 small">Completion Date</p>
                    <p class="mb-0">${currentDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Event handlers
  attachLoginHandlers() {
    const form = document.getElementById("loginForm");
    const errorDiv = document.getElementById("loginError");

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;

      const result = this.login(email, password);

      if (!result.success) {
        errorDiv.textContent = result.error;
        errorDiv.classList.remove("d-none");
      }
    });
  }

  attachRegisterHandlers() {
    const form = document.getElementById("registerForm");
    const errorDiv = document.getElementById("registerError");

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("registerName").value;
      const phone = document.getElementById("registerPhone").value;
      const email = document.getElementById("registerEmail").value;
      const password = document.getElementById("registerPassword").value;
      const confirmPassword = document.getElementById(
        "registerConfirmPassword"
      ).value;

      const result = this.register(name, phone, email, password, confirmPassword);

      if (!result.success) {
        errorDiv.textContent = result.error;
        errorDiv.classList.remove("d-none");
      }
    });
  }

  attachProfileHandlers() {
    const form = document.getElementById("profileForm");
    const msg = document.getElementById("profileMsg");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      try {
        const phoneRaw = document.getElementById("profilePhone").value;
        const emailRaw = document.getElementById("profileEmail").value;
        const currentPw = (document.getElementById("profileCurrentPassword")?.value || "").trim();
        const newPw = (document.getElementById("profileNewPassword")?.value || "").trim();
        const confirmPw = (document.getElementById("profileConfirmPassword")?.value || "").trim();
        const wantsPwChange = !!(currentPw || newPw || confirmPw);

        const phone = this.normalizePhoneBD(phoneRaw);
        if (!phone) {
          msg.className = "alert alert-danger";
          msg.textContent = "Please enter a valid Bangladeshi phone (e.g., +8801XXXXXXXXX).";
          msg.classList.remove("d-none");
          return;
        }

  const users = JSON.parse(localStorage.getItem("users") || "[]");
        const currentId = this.currentUser?.id;
        const currentUserRecord = users.find(u => u.id === currentId);
        if (!currentUserRecord) {
          msg.className = "alert alert-danger";
          msg.textContent = "User session not found. Please log in again.";
          msg.classList.remove("d-none");
          return;
        }
        // Uniqueness checks
        const phoneTaken = users.some(u => u.id !== currentId && this.normalizePhoneBD(u.phone) === phone);
        if (phoneTaken) {
          msg.className = "alert alert-danger";
          msg.textContent = "This phone is already registered.";
          msg.classList.remove("d-none");
          return;
        }
        const email = (emailRaw || "").trim() || null;
        if (email && users.some(u => u.id !== currentId && (u.email || "").toLowerCase() === email.toLowerCase())) {
          msg.className = "alert alert-danger";
          msg.textContent = "This email is already registered.";
          msg.classList.remove("d-none");
          return;
        }

        // Password change validation (optional)
        let changePw = false;
        if (wantsPwChange) {
          if (!currentPw || !newPw || !confirmPw) {
            msg.className = "alert alert-danger";
            msg.textContent = "To change your password, fill in current, new, and confirm password fields.";
            msg.classList.remove("d-none");
            return;
          }
          if (currentUserRecord.password !== currentPw) {
            msg.className = "alert alert-danger";
            msg.textContent = "Current password is incorrect.";
            msg.classList.remove("d-none");
            return;
          }
          if (newPw.length < 6) {
            msg.className = "alert alert-danger";
            msg.textContent = "New password must be at least 6 characters.";
            msg.classList.remove("d-none");
            return;
          }
          if (!this.isStrongPassword(newPw)) {
            msg.className = "alert alert-danger";
            msg.textContent = "New password must include at least one digit and one special character.";
            msg.classList.remove("d-none");
            return;
          }
          if (newPw !== confirmPw) {
            msg.className = "alert alert-danger";
            msg.textContent = "New password and confirmation do not match.";
            msg.classList.remove("d-none");
            return;
          }
          if (newPw === currentPw) {
            msg.className = "alert alert-warning";
            msg.textContent = "New password is the same as current password. Choose a different password.";
            msg.classList.remove("d-none");
            return;
          }
          changePw = true;
        }

        // Persist changes in users array
        const updated = users.map(u => {
          if (u.id === currentId) {
            const next = Object.assign({}, u, { phone: phone, email: email });
            if (changePw) next.password = newPw;
            return next;
          }
          return u;
        });
        localStorage.setItem("users", JSON.stringify(updated));

        // Update currentUser
        this.currentUser = Object.assign({}, this.currentUser, { phone: phone, email: email });
        localStorage.setItem("currentUser", JSON.stringify(this.currentUser));

        msg.className = "alert alert-success";
        msg.textContent = changePw ? "Profile and password updated successfully." : "Profile updated successfully.";
        msg.classList.remove("d-none");

        setTimeout(() => this.navigateTo("dashboard"), 900);
      } catch (err) {
        msg.className = "alert alert-danger";
        msg.textContent = "Something went wrong. Please try again.";
        msg.classList.remove("d-none");
      }
    });
  }

  // Resolve audio file path relative to app root
  getAudioSource(file) {
    if (!file) return "";
    try {
      if (/^https?:\/\//i.test(file) || file.startsWith("/")) return file;
      return file.includes("/") ? file : `audio/${file}`;
    } catch (_) {
      return file;
    }
  }

  // Determine correct MIME type based on extension
  getAudioMimeType(file) {
    if (!file) return "audio/mpeg";
    const ext = (file.split(".").pop() || "").toLowerCase();
    switch (ext) {
      case "mp3":
        return "audio/mpeg";
      case "m4a":
        return "audio/mp4";
      case "wav":
        return "audio/wav";
      case "ogg":
        return "audio/ogg";
      default:
        return "audio/mpeg";
    }
  }

  // Initialize audio state in lesson slider, attempt autoplay gracefully
  initLessonAudio() {
    const audio = document.getElementById("lessonAudio");
    const icon = document.getElementById("audioIcon");
    const text = document.getElementById("audioText");
    const button = document.getElementById("audioToggleBtn");
    if (!audio) return;

    // If autoplay is present, try to play; update UI based on result
    if (audio.hasAttribute("autoplay")) {
      const playPromise = audio.play();
      if (playPromise && typeof playPromise.then === "function") {
        playPromise
          .then(() => {
            if (icon) icon.className = "bi bi-pause-fill";
            if (text) text.textContent = "Pause";
            if (button) {
              button.classList.remove("btn-outline-primary");
              button.classList.add("btn-primary");
            }
          })
          .catch(() => {
            if (icon) icon.className = "bi bi-play-fill";
            if (text) text.textContent = "Play";
            if (button) {
              button.classList.remove("btn-primary");
              button.classList.add("btn-outline-primary");
            }
          });
      }
    } else {
      if (icon) icon.className = "bi bi-play-fill";
      if (text) text.textContent = "Play";
      if (button) {
        button.classList.remove("btn-primary");
        button.classList.add("btn-outline-primary");
      }
    }
  }

  toggleAudio() {
    const audio = document.getElementById("lessonAudio");
    const icon = document.getElementById("audioIcon");
    const text = document.getElementById("audioText");
    const button = document.getElementById("audioToggleBtn");

    if (audio) {
      if (audio.paused) {
        const p = audio.play();
        if (p && typeof p.then === "function") {
          p.then(() => {
            if (icon) icon.className = "bi bi-pause-fill";
            if (text) text.textContent = "Pause";
            if (button) {
              button.classList.remove("btn-outline-primary");
              button.classList.add("btn-primary");
            }
          }).catch(() => {
            if (icon) icon.className = "bi bi-play-fill";
            if (text) text.textContent = "Play";
            if (button) {
              button.classList.remove("btn-primary");
              button.classList.add("btn-outline-primary");
            }
          });
        } else {
          if (icon) icon.className = "bi bi-pause-fill";
          if (text) text.textContent = "Pause";
          if (button) {
            button.classList.remove("btn-outline-primary");
            button.classList.add("btn-primary");
          }
        }
      } else {
        audio.pause();
        if (icon) icon.className = "bi bi-play-fill";
        if (text) text.textContent = "Play";
        if (button) {
          button.classList.remove("btn-primary");
          button.classList.add("btn-outline-primary");
        }
      }
    }
  }
}

// Initialize the app
let app;
document.addEventListener("DOMContentLoaded", () => {
  app = new YouthHealthLMS();
});
