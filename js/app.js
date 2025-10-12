// Youth Health LMS - Main Application Logic

class YouthHealthLMS {
  constructor() {
    this.currentView = "home";
    this.currentUser = null;
    this.selectedCourse = null;
    this.currentlessionIndex = 0;
    this.showQuiz = false;
    this.quizState = {
      currentQuestionIndex: 0,
      selectedAnswers: [],
      showResults: false,
      score: 0,
    };

    this.init();
  }

  init() {
    // Check for existing session
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
      this.currentView = "dashboard";
    }

    this.render();
  }

  // Initialize or refresh AOS scroll animations across views
  initAOS() {
    if (typeof AOS === "undefined") return;
    if (this._aosInitialized) {
      try { AOS.refreshHard(); } catch (e) { AOS.refresh(); }
      setTimeout(() => { try { AOS.refresh(); } catch (e) {} }, 80);
    } else {
      AOS.init({ duration: 800, once: true, offset: 60, easing: "ease-out-quart" });
      this._aosInitialized = true;
      setTimeout(() => { try { AOS.refresh(); } catch (e) {} }, 120);
    }
  }

  // Navigation methods
  navigateTo(view) {
    this.currentView = view;
    this.render();
  }

  // User authentication
  login(email, password) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userIndex = users.findIndex(
      (u) => u.email === email && u.password === password
    );

    if (userIndex !== -1) {
      const user = users[userIndex];

      // Update last login time
      user.lastLogin = new Date().toISOString();
      users[userIndex] = user;
      localStorage.setItem("users", JSON.stringify(users));

      this.currentUser = {
        id: user.id,
        email: user.email,
        name: user.name,
        registeredAt: user.registeredAt,
      };
      localStorage.setItem("currentUser", JSON.stringify(this.currentUser));

      console.log(`✅ Login successful! User ID: ${user.id}`);

      this.navigateTo("dashboard");
      return { success: true };
    }

    return { success: false, error: "Invalid email or password" };
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

  register(name, email, password, confirmPassword) {
    if (!name || !email || !password || !confirmPassword) {
      return { success: false, error: "Please fill in all fields" };
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

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.find((u) => u.email === email)) {
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
      email,
      password,
      registeredAt: registrationDate,
      lastLogin: registrationDate,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    this.currentUser = {
      id: newUser.id,
      email: newUser.email,
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
    this.showQuiz = false;

    // Check if course uses new lesson system
    if (this.selectedCourse.lessons && this.selectedCourse.lessons.length > 0) {
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
  }

  viewCertificate(courseId) {
    // Navigate within SPA to certificate view
    const course = (typeof coursesData !== 'undefined' ? coursesData : []).find(c => c.id === courseId);
    if (course) {
      this.selectedCourse = course;
      this.navigateTo('certificate');
    } else {
      alert('Course not found for certificate');
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

      // Check if all lessions/lessons completed
      const total = this.selectedCourse.lessons
        ? this.selectedCourse.lessons.length
        : this.selectedCourse.lessions.length;
      if (progress.completedlessions.length === total) {
        progress.certificateIssued = true;
      }
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
        break;
      case "certificate":
        app.innerHTML = this.renderCertificate();
        this.initAOS();
        break;
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
      <nav class="navbar navbar-expand-lg fixed-top nav-glass">
        <div class="container">
          <a class="navbar-brand d-flex align-items-center gap-2" href="#home" onclick="app.navigateTo('home'); return false;">
            <img src="img/UNICEF_Logo.png" alt="UNICEF Logo" class="brand-mark">
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto align-items-lg-center gap-lg-2">
              <li class="nav-item"><a class="nav-link active" href="#home">Home</a></li>
              <li class="nav-item"><a class="nav-link" href="#about">Mission</a></li>
              <li class="nav-item"><a class="nav-link" href="#components">Pillars</a></li>
              <li class="nav-item"><a class="nav-link" href="#roles">Ambassadors</a></li>
              <li class="nav-item"><a class="nav-link" href="#eligibility">Journey</a></li>
              <li class="nav-item"><a class="nav-link" href="#statistics">Impact</a></li>
              <li class="nav-item ms-lg-3"><a href="#" class="btn btn-chip" onclick="app.navigateTo('login'); return false;">Sign In</a></li>
            </ul>
          </div>
        </div>
      </nav>

      <!-- Hero -->
      <section id="home" class="hero-section hero-immersive">
        <div class="hero-gradient-layer"></div>
        <div class="hero-blob hero-blob-one"></div>
        <div class="hero-blob hero-blob-two"></div>
        <div class="container position-relative">
          <div class="row align-items-center g-5">
            <div class="col-xl-6" data-aos="fade-right">
              <div class="hero-copy">
                <div class="hero-kicker">A UNICEF & MOHFW collaboration</div>
                <h1 class="hero-title display-4">Empowering Youth through Health Leadership</h1>
                <p class="hero-lead">
                  The Youth Health Ambassador Programme equips young people across Bangladesh with health literacy, advocacy, and leadership skills so they can champion wellbeing within their communities.
                </p>
                <div class="hero-actions">
                  <a class="btn btn-primary btn-lg" href="#eligibility">Explore the journey</a>
                  <a class="btn btn-outline-light btn-lg" href="#" onclick="app.navigateTo('register'); return false;">Create free account</a>
                </div>
                <div class="hero-meta">
                  <div class="meta-badge"><i class="fa-solid fa-circle-check"></i> UNICEF Trusted Curriculum</div>
                  <div class="meta-badge"><i class="fa-solid fa-globe"></i> Available nationwide, 24/7</div>
                </div>
              </div>
            </div>
            <div class="col-xl-6" data-aos="fade-left">
              <div class="hero-visual">
                <div class="hero-card">
                  <div class="hero-card__header">
                    <span class="hero-chip">
                      <i class="fa-solid fa-star"></i>
                      Ambassador Spotlight
                    </span>
                    <span class="hero-chip hero-chip--pulse">
                      <i class="fa-solid fa-signal"></i>
                      Live Progress Tracker
                    </span>
                  </div>
                  <div class="hero-card__body">
                    <img src="img/Asset 2.png" alt="Youth celebrating" class="hero-illustration">
                  </div>
                  <div class="hero-card__footer">
                    <div class="metric">
                      <span class="metric-label">Young people in Bangladesh</span>
                      <span class="metric-value stat-number" data-target="49.5M">0</span>
                    </div>
                    <div class="metric">
                      <span class="metric-label">Active ambassadors this week</span>
                      <span class="metric-value stat-number" data-target="1200">0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- About Slide -->
      <section id="about" class="section-padding slide-section slide-section--light">
        <div class="container">
          <div class="row align-items-center g-5">
            <div class="col-lg-5" data-aos="fade-up">
              <div class="slide-intro">
                <span class="slide-kicker">Our mission</span>
                <h2 class="section-heading">Understanding Youth Health Ambassador Programme</h2>
                <p class="section-paragraph">
                  YHAP is a structured pathway for young people aged 15-24 to discover their voice, master critical health knowledge, and lead change with evidence-based advocacy.
                </p>
                <div class="slide-stamp">
                  <i class="fa-solid fa-certificate"></i>
                  System-generated certificates, valid for two years.
                </div>
              </div>
            </div>
            <div class="col-lg-7" data-aos="fade-up" data-aos-delay="100">
              <div class="definition-grid">
                <article class="definition-card">
                  <div class="definition-icon bg-sky"><i class="fa-solid fa-users"></i></div>
                  <h3>Youth</h3>
                  <p>
                    As defined by the United Nations, youth refers to young people aged <strong>15-24</strong>. This period bridges dependence and independence, where curiosity and potential are at their highest.
                  </p>
                  <span class="definition-note">Young people cover ages <strong>10-24</strong>; adolescents are <strong>10-19</strong>.</span>
                </article>
                <article class="definition-card">
                  <div class="definition-icon bg-deep"><i class="fa-solid fa-heart-pulse"></i></div>
                  <h3>Health</h3>
                  <p>
                    The World Health Organization defines health as a state of complete <strong>physical, mental, and social wellbeing</strong>—far beyond the absence of disease.
                  </p>
                  <span class="definition-note">Health knowledge is the first step to enduring community resilience.</span>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Core Components -->
      <section id="components" class="section-padding slide-section">
        <div class="container">
          <div class="section-header text-center" data-aos="fade-up">
            <span class="slide-kicker">Programme pillars</span>
            <h2 class="section-heading">Six pillars that build confident health ambassadors</h2>
            <p class="section-paragraph w-lg-75 mx-auto">
              Each module unlocks interactive lessons, storytelling videos, and measurable actions so youth can translate insight into impact.
            </p>
          </div>
          <div class="row g-4 pillars-grid">
            ${[
              {
                title: "Health Literacy",
                description:
                  "Foundational knowledge delivered through dynamic lessons, podcasts, and scenario-based practice.",
                icon: "fa-book-open",
                accent: "gradient-sky"
              },
              {
                title: "Health Education & Awareness",
                description:
                  "Campaign toolkits and community playbooks simplify how ambassadors share accurate information.",
                icon: "fa-graduation-cap",
                accent: "gradient-lagoon"
              },
              {
                title: "Peer to Peer Influence",
                description:
                  "Mentorship circles and storytelling labs nurture confident communicators and inclusive leaders.",
                icon: "fa-people-arrows",
                accent: "gradient-emerald"
              },
              {
                title: "Empowerment",
                description:
                  "Design challenges, problem-solving sprints, and pitch sessions build agency and real-world readiness.",
                icon: "fa-hand-fist",
                accent: "gradient-tangerine"
              },
              {
                title: "Leadership",
                description:
                  "Ambassadors lead local projects with support from mentors, dashboards, and progress analytics.",
                icon: "fa-lightbulb",
                accent: "gradient-violet"
              },
              {
                title: "Advocacy",
                description:
                  "Policy primers and stakeholder maps guide ambassadors to amplify youth priorities with evidence.",
                icon: "fa-bullhorn",
                accent: "gradient-rose"
              }
            ]
              .map(
                (pillar, index) => `
                  <div class="col-sm-6 col-xl-4" data-aos="zoom-in" data-aos-delay="${index * 70}">
                    <article class="pillar-card ${pillar.accent}">
                      <div class="pillar-icon"><i class="fa-solid ${pillar.icon}"></i></div>
                      <h3>${pillar.title}</h3>
                      <p>${pillar.description}</p>
                    </article>
                  </div>
                `
              )
              .join("")}
          </div>
        </div>
      </section>

      <!-- Ambassador Roles -->
      

      <!-- Ambassador Journey -->
      <section id="eligibility" class="section-padding slide-section">
        <div class="container">
          <div class="section-header text-center" data-aos="fade-up">
            <span class="slide-kicker">Your learning arc</span>
            <h2 class="section-heading">Nine interactive steps to become a certified Youth Health Ambassador</h2>
            <p class="section-paragraph w-lg-75 mx-auto">
              Each chapter unlocks when you pass the quiz, guiding you towards certification with a sense of progress and celebration at every milestone.
            </p>
            <div class="eligibility-badge">
              <i class="fa-solid fa-id-card-clip"></i>
              Eligibility: Young people aged 15&ndash;24 across Bangladesh.
            </div>
          </div>
          <div class="journey-track">
            <div class="journey-progress" aria-hidden="true"></div>
            <div class="row g-4">
              ${[
                "Online Registration",
                "Unique ID Generation",
                "Secure Login",
                "Access Course Library",
                "Complete Modules",
                "Pass Adaptive Assessments",
                "Receive System Certificate",
                "Take the Ambassador Oath",
                "Download Final Certificate"
              ]
                .map(
                  (step, index) => `
                    <div class="col-sm-6 col-xl-4" data-aos="fade-up" data-aos-delay="${index * 70}">
                      <article class="journey-step">
                        <div class="journey-index">${index + 1}</div>
                        <h3>${step}</h3>
                        <p>${[
                          "Register on the UNICEF-powered learning portal.",
                          "Instantly receive your unique YHAP identifier.",
                          "Log in securely from any device.",
                          "Dive into playlists tailored to your goals.",
                          "Unlock modules with videos, stories, and cases.",
                          "Master quizzes with hints, retries, and feedback.",
                          "Celebrate your first official milestone.",
                          "Commit to championing adolescent health.",
                          "Download and share your verified certificate."
                        ][index]}</p>
                      </article>
                    </div>
                  `
                )
                .join("")}
            </div>
          </div>
          <div class="text-center mt-5" data-aos="zoom-in">
            <a class="btn btn-primary btn-lg" href="#" onclick="app.navigateTo('register'); return false;">
              <i class="fa-solid fa-rocket-launch me-2"></i>
              Start your ambassador journey
            </a>
          </div>
        </div>
      </section>

      <!-- Impact metrics -->
      

      <!-- Call to action -->
      <section class="section-padding slide-section slide-section--cta">
        <div class="container">
          <div class="cta-card" data-aos="fade-up">
            <div class="cta-content">
              <span class="slide-kicker">Next-gen LMS</span>
              <h2 class="section-heading">One login. Your entire learning cockpit.</h2>
              <p class="section-paragraph">
                Access audio-guided lessons, interactive quizzes, progress dashboards, and instant certificates. Switch between light and dark themes any time.
              </p>
              <div class="cta-actions">
                <a class="btn btn-light btn-lg" href="#" onclick="app.navigateTo('login'); return false;"><i class="fa-solid fa-arrow-right-to-bracket me-2"></i>Log in</a>
                <button class="btn btn-outline-light btn-lg" onclick="app.navigateTo('login'); return false;">Preview course map</button>
              </div>
            </div>
            <div class="cta-visual">
              <div class="cta-gauge">
                <svg viewBox="0 0 120 120">
                  <defs>
                    <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#00b7ff" />
                      <stop offset="50%" stop-color="#009edb" />
                      <stop offset="100%" stop-color="#6a5ae0" />
                    </linearGradient>
                  </defs>
                  <circle cx="60" cy="60" r="54" class="gauge-bg"></circle>
                  <circle cx="60" cy="60" r="54" class="gauge-progress"></circle>
                </svg>
                <div class="gauge-center">
                  <span class="gauge-score">80%</span>
                  <span class="gauge-label">Avg. pass rate</span>
                </div>
              </div>
              <div class="cta-highlight">
                <i class="fa-solid fa-award"></i>
                Auto-generated certificates with shareable QR codes.
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer class="footer">
        <div class="container">
          <div class="row g-4">
            <div class="col-xl-4 col-lg-5">
              <h3 class="footer-heading">Youth Health Ambassador Programme</h3>
              <p class="footer-text">
                A partnership between UNICEF and the Ministry of Health & Family Welfare, Bangladesh—nurturing youth ambassadors who lead healthier communities.
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
            <p>&copy; ${new Date().getFullYear()} Youth Health Ambassador Programme. All rights reserved.</p>
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
                  <img src="img/UNICEF_Logo.png" alt="" style="width: 120px; height: 50px;">
            </a>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <div class="container py-5">
        <div class="row justify-content-center">
          <div class="col-md-6 col-lg-5">
            <button class="btn btn-link text-decoration-none mb-3 p-0" onclick="app.navigateTo('home')">
              <i class="bi bi-arrow-left me-2"></i>Back to Home
            </button>

            <div class="card shadow-lg border-0">
              <div class="card-body p-4">
                <h2 class="text-center mb-2">Welcome Back</h2>
                <p class="text-center text-muted mb-4">Log in to continue your learning journey</p>

                <div id="loginError" class="alert alert-danger d-none"></div>

                <form id="loginForm">
                  <div class="mb-3">
                    <label for="loginEmail" class="form-label">Email</label>
                    <input type="email" class="form-control" id="loginEmail" placeholder="your@email.com" required>
                  </div>

                  <div class="mb-3">
                    <label for="loginPassword" class="form-label">Password</label>
                    <input type="password" class="form-control" id="loginPassword" placeholder="••••••••" required>
                  </div>

                  <button type="submit" class="btn btn-primary w-100">Log In</button>
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
    `;
  }

  renderRegister() {
    return `
      <!-- Header -->
      <header class="bg-white shadow-sm">
        <div class="container py-3">
          <div class="d-flex align-items-center gap-2">
            <a class="navbar-brand" href="#" onclick="app.navigateTo('home'); return false;">
                  <img src="img/UNICEF_Logo.png" alt="" style="width: 120px; height: 50px;">
            </a>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <div class="container py-5">
        <div class="row justify-content-center">
          <div class="col-md-6 col-lg-5">
            <button class="btn btn-link text-decoration-none mb-3 p-0" onclick="app.navigateTo('home')">
              <i class="bi bi-arrow-left me-2"></i>Back to Home
            </button>

            <div class="card shadow-lg border-0">
              <div class="card-body p-4">
                <h2 class="text-center mb-2">Create Your Account</h2>
                <p class="text-center text-muted mb-4">Start your health learning journey today</p>

                <div id="registerError" class="alert alert-danger d-none"></div>

                <form id="registerForm">
                  <div class="mb-3">
                    <label for="registerName" class="form-label">Full Name</label>
                    <input type="text" class="form-control" id="registerName" placeholder="John Doe" required>
                  </div>

                  <div class="mb-3">
                    <label for="registerEmail" class="form-label">Email</label>
                    <input type="email" class="form-control" id="registerEmail" placeholder="your@email.com" required>
                  </div>

                  <div class="mb-3">
                    <label for="registerPassword" class="form-label">Password</label>
                    <input type="password" class="form-control" id="registerPassword" placeholder="••••••••" required>
                  </div>

                  <div class="mb-3">
                    <label for="registerConfirmPassword" class="form-label">Confirm Password</label>
                    <input type="password" class="form-control" id="registerConfirmPassword" placeholder="••••••••" required>
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
    const completedCourses = courseSummaries.filter((item) => item.completed)
      .length;
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
      totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

    const activeCourse =
      courseSummaries.find(
        (item) => !item.completed && item.completedLessons > 0
      ) ||
      courseSummaries.find((item) => !item.completed) ||
      courseSummaries[0];

    const certificateCourse =
      courseSummaries.find((item) => item.certificateIssued && item.course?.id) ||
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

    return `
      <div class="dashboard-shell">
        <nav class="navbar navbar-expand-lg fixed-top nav-glass nav-dashboard">
          <div class="container">
            <a class="navbar-brand d-flex align-items-center gap-2" href="#" onclick="app.navigateTo('home'); return false;">
              <img src="img/UNICEF_Logo.png" alt="UNICEF Logo" class="brand-mark">
            </a>
            <div class="d-flex align-items-center gap-3 ms-auto">
              <button class="btn btn-chip d-none d-md-inline-flex" onclick="app.navigateTo('home'); return false;">
                <i class="fa-solid fa-compass"></i>
                Public site
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
              <div class="row g-4 align-items-center">
                <div class="col-lg-7">
                  <span class="dashboard-kicker"><i class="fa-solid fa-sun"></i> UNICEF mission control</span>
                  <h1 class="dashboard-title">Welcome back, ${userFirstName}</h1>
                  <p class="dashboard-subtitle">
                    You're ${overallProgress}% through your Youth Health Ambassador pathway. Keep up the momentum with curated lessons, trackable impact, and certificates powered by UNICEF and MOHFW.
                  </p>
                  <div class="dashboard-meta">
                    <span class="meta-pill"><i class="fa-solid fa-id-badge"></i>${this.currentUser.id}</span>
                    <span class="meta-pill"><i class="fa-solid fa-calendar-check"></i>Joined ${joinedDate}</span>
                    <span class="meta-pill"><i class="fa-solid fa-book-open"></i>${formatNumber(totalLessons)} total lessons</span>
                  </div>
                  <div class="dashboard-actions">
                    ${
                      actionCourseId
                        ? `<button class="btn btn-primary btn-lg" onclick="app.selectCourse('${actionCourseId}')">
                            ${actionLabel} <i class="fa-solid fa-arrow-right-long ms-2"></i>
                          </button>`
                        : `<button class="btn btn-primary btn-lg" onclick="app.navigateTo('home'); return false;">
                            Browse programmes <i class="fa-solid fa-arrow-right-long ms-2"></i>
                          </button>`
                    }
                    ${
                      certificateCourse
                        ? `<button class="btn btn-outline-light btn-lg" onclick="app.viewCertificate('${certificateCourse.course.id}'); return false;">
                            View certificate <i class="fa-solid fa-award ms-2"></i>
                          </button>`
                        : `<button class="btn btn-outline-light btn-lg" onclick="app.navigateTo('register'); return false;">
                            Invite a friend <i class="fa-solid fa-user-plus ms-2"></i>
                          </button>`
                    }
                    <div class="action-meta">
                      <span>${actionSubLabel}</span>
                      <span>${actionSecondary}</span>
                    </div>
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
                        <span class="stat-label">Courses complete</span>
                        <span class="stat-value">${completedCourses}/${totalCourses}</span>
                      </li>
                      <li>
                        <span class="stat-label">Lessons finished</span>
                        <span class="stat-value">${formatNumber(completedLessons)}</span>
                      </li>
                      <li>
                        <span class="stat-label">Lessons remaining</span>
                        <span class="stat-value">${formatNumber(remainingLessons)}</span>
                      </li>
                      <li>
                        <span class="stat-label">Active programmes</span>
                        <span class="stat-value">${formatNumber(activeCourses)}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section class="dashboard-insights">
              <div class="insight-grid">
                <article class="insight-card">
                  <span class="insight-icon gradient-sky"><i class="fa-solid fa-graduation-cap"></i></span>
                  <div>
                    <span class="insight-label">Course library</span>
                    <span class="insight-value">${formatNumber(totalCourses)}</span>
                    <p class="insight-subtext">${formatNumber(completedCourses)} completed • ${formatNumber(activeCourses)} in progress</p>
                  </div>
                </article>
                <article class="insight-card">
                  <span class="insight-icon gradient-emerald"><i class="fa-solid fa-chart-line"></i></span>
                  <div>
                    <span class="insight-label">Overall progress</span>
                    <span class="insight-value">${overallProgress}%</span>
                    <p class="insight-subtext">${formatNumber(completedLessons)} of ${formatNumber(totalLessons)} lessons done</p>
                  </div>
                </article>
                <article class="insight-card">
                  <span class="insight-icon gradient-violet"><i class="fa-solid fa-award"></i></span>
                  <div>
                    <span class="insight-label">Certificates ready</span>
                    <span class="insight-value">${formatNumber(completedCourses)}</span>
                    <p class="insight-subtext">${completedCourses > 0 ? "Download and share your achievements" : "Complete a programme to earn your first badge"}</p>
                  </div>
                </article>
                <article class="insight-card">
                  <span class="insight-icon gradient-tangerine"><i class="fa-solid fa-lightbulb"></i></span>
                  <div>
                    <span class="insight-label">Opportunities</span>
                    <span class="insight-value">${formatNumber(notStartedCourses)}</span>
                    <p class="insight-subtext">${notStartedCourses > 0 ? "New journeys are waiting for you" : "You’ve explored every programme available"}</p>
                  </div>
                </article>
              </div>
            </section>

            <section class="dashboard-courses">
              <div class="dashboard-section-header">
                <div>
                  <span class="section-kicker">Your programmes</span>
                  <h2>Continue building your impact</h2>
                  <p>Jump back into any course to unlock new leadership skills, track community actions, and qualify for UNICEF-backed certifications.</p>
                </div>
              </div>
              <div class="row g-4">
                ${
                  courseSummaries.length > 0
                    ? courseSummaries
                        .map((item) => {
                          const progressValue = clampProgress(item.progressPercent);
                          const progressRounded = Math.round(progressValue);
                          const actionText = item.completed
                            ? "Review course"
                            : item.completedLessons > 0
                            ? "Continue"
                            : "Start course";
                          const statusClass = item.completed
                            ? "status-pill--success"
                            : item.completedLessons > 0
                            ? "status-pill--warning"
                            : "status-pill--neutral";
                          return `
                            <div class="col-xl-4 col-lg-6">
                              <article class="course-card-modern">
                                <div class="course-card__visual" style="background-image: url('${item.course.imageUrl}');">
                                  <span class="course-card__tag">
                                    <i class="fa-solid fa-layer-group"></i>
                                    ${item.course.duration || `${item.totalLessons} lessons`}
                                  </span>
                                </div>
                                <div class="course-card__body">
                                  <div class="course-card__status">
                                    <span class="status-pill ${statusClass}">${item.statusLabel}</span>
                                    ${
                                      item.certificateIssued
                                        ? `<span class="status-pill status-pill--outline"><i class="fa-solid fa-award"></i> Certificate ready</span>`
                                        : ""
                                    }
                                  </div>
                                  <h3>${item.course.title}</h3>
                                  <p class="line-clamp-2">${item.course.description}</p>
                                  <div class="course-card__meta">
                                    <span><i class="fa-solid fa-book-open"></i>${item.totalLessons} lessons</span>
                                    <span><i class="fa-solid fa-gauge-high"></i>${progressRounded}% complete</span>
                                  </div>
                                  <div>
                                    <div class="progress-track">
                                      <div class="progress-track__value" style="width: ${progressValue}%;"></div>
                                    </div>
                                    <div class="progress-caption">
                                      <span>${item.completedLessons} completed</span>
                                      <span>${Math.max(item.totalLessons - item.completedLessons, 0)} remaining</span>
                                    </div>
                                  </div>
                                  <div class="course-card__footer">
                                    <div class="course-card__actions">
                                      <button class="btn btn-primary flex-grow-1" onclick="app.selectCourse('${item.course.id}')">
                                        ${actionText} <i class="fa-solid fa-arrow-right-long ms-2"></i>
                                      </button>
                                      ${
                                        item.completed
                                          ? `<button class="btn btn-ghost" onclick="app.viewCertificate('${item.course.id}')">
                                              <i class="fa-solid fa-award me-2"></i>Certificate
                                            </button>`
                                          : ""
                                      }
                                    </div>
                                    ${
                                      item.nextLessonTitle
                                        ? `<span class="next-lesson">Next up: ${item.nextLessonTitle}</span>`
                                        : ""
                                    }
                                  </div>
                                </div>
                              </article>
                            </div>
                          `;
                        })
                        .join("")
                    : `
                      <div class="col-12">
                        <div class="dashboard-empty">
                          <i class="fa-solid fa-seedling"></i>
                          <h3>No programmes assigned yet</h3>
                          <p>As soon as new UNICEF missions are published, they’ll appear here. In the meantime, explore the public site for stories and resources.</p>
                          <button class="btn btn-primary" onclick="app.navigateTo('home'); return false;">
                            Explore mission hub
                          </button>
                        </div>
                      </div>
                    `
                }
              </div>
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
                      <span class="completion-ring__label">${passed ? "Passed" : "Score"}</span>
                    </div>
                  </div>
                  <div class="quiz-scorecard-stats">
                    <div>
                      <span class="stat-label">Correct answers</span>
                      <span class="stat-value">${correctCount}/${questions.length}</span>
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
                      const correctAnswerText = question.options[question.correctAnswer];
                      return `
                        <div class="quiz-review-item ${isCorrect ? "correct" : "incorrect"}">
                          <div class="quiz-review-icon">
                            <i class="fa-solid ${isCorrect ? "fa-circle-check" : "fa-circle-xmark"}"></i>
                          </div>
                          <div class="quiz-review-content">
                            <h3>Q${qIndex + 1}. ${question.question}</h3>
                            <p class="quiz-review-answer">Your answer: <span>${userAnswerText}</span></p>
                            ${
                              isCorrect
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
    const previousLabel = isFirstQuestion ? "Review lesson" : "Previous question";
    const previousIcon = isFirstQuestion ? "fa-book-open" : "fa-arrow-left-long";
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
    const course = this.selectedCourse;
    const activeIndex = this.currentLessonIndex || 0;
    const currentLesson = course.lessons[activeIndex];

    let progress = this.getUserProgress(course.id);
    if (!progress) {
      progress = this.initializeProgress(course.id);
    }

    const completedIds = new Set(progress.completedlessions || []);
    const totalLessons = course.lessons.length;
    const completedLessons = completedIds.size;
    const courseProgress = totalLessons
      ? Math.round((completedLessons / totalLessons) * 100)
      : 0;
    const lessonCompleted = completedIds.has(currentLesson.id);
    const quizScore = progress.quizScores?.[currentLesson.id];
    const courseDescription =
      course.description ||
      "Self-paced UNICEF curriculum empowering youth health ambassadors across Bangladesh.";

    if (this.showQuiz) {
      return this.renderQuiz();
    }

    return `
      <div class="lesson-shell">
        <header class="lesson-hero">
          <div class="container">
            <div class="lesson-hero__top">
              <button class="lesson-back" onclick="app.navigateTo('dashboard')">
                <i class="fa-solid fa-arrow-left-long"></i>
                Back to dashboard
              </button>
              <span class="lesson-pill">Lesson ${activeIndex + 1} of ${
      totalLessons
    }</span>
            </div>
            <div class="row align-items-start g-4">
            </div>
          </div>
        </header>

        <section class="lesson-body">
          <div class="container">
            <div class="row g-4">
              <aside class="col-lg-4 lesson-sidebar-wrapper">
                <div class="lesson-trail">
                  ${course.lessons
                    .map((lesson, index) => {
                      const isCurrent = index === activeIndex;
                      const isCompleted = completedIds.has(lesson.id);
                      const statusClass = isCurrent
                        ? "lesson-chip--current"
                        : isCompleted
                        ? "lesson-chip--completed"
                        : "lesson-chip--upcoming";
                      const statusLabel = isCurrent
                        ? "Now playing"
                        : isCompleted
                        ? "Completed"
                        : "Available";
                      return `
                        <button class="lesson-chip ${statusClass}" type="button" onclick="app.changeLesson(${index})">
                          <span class="lesson-chip__icon ${lesson.gradientClass}">
                            <i class="fas ${lesson.icon}"></i>
                          </span>
                          <span class="lesson-chip__content">
                            <span class="lesson-chip__eyebrow">Lesson ${index + 1}</span>
                            <span class="lesson-chip__title">${lesson.title}</span>
                            <span class="lesson-chip__meta">${statusLabel}</span>
                          </span>
                          ${
                            isCompleted
                              ? '<span class="lesson-chip__state"><i class="fa-solid fa-check"></i></span>'
                              : ""
                          }
                        </button>
                      `;
                    })
                    .join("")}
                </div>
              </aside>

              <div class="col-lg-8">
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
                      )}" type="${this.getAudioMimeType(currentLesson.audioFile)}">
                      Your browser does not support the audio element.
                    </audio>
                  `
                      : ""
                  }

                  <div class="lesson-content-body">
                    ${currentLesson.content}
                  </div>

                  <div class="lesson-quiz-card ${lessonCompleted ? "lesson-quiz-card--complete" : ""}">
                    <div class="lesson-quiz-card__header">
                      <span class="lesson-quiz-badge"><i class="fa-solid fa-circle-question"></i> Module quiz</span>
                      <span class="lesson-quiz-score">Passing score: ${currentLesson.quiz.passingScore}%</span>
                    </div>
                    ${
                      quizScore !== undefined
                        ? `<div class="lesson-quiz-status">
                            <i class="fa-solid ${lessonCompleted ? "fa-check-circle" : "fa-rotate-right"}"></i>
                            <div>
                              <p class="lesson-quiz-status__title">Latest attempt: ${quizScore}%</p>
                              <p class="lesson-quiz-status__meta">${lessonCompleted ? "Great job! You can retake the quiz to boost your score." : "Give it another try to reach the passing score."}</p>
                            </div>
                          </div>`
                        : ""
                    }
                    <p class="lesson-quiz-text">
                      Test your understanding and unlock the next milestone. Score at least ${currentLesson.quiz.passingScore}% to mark this lesson as complete.
                    </p>
                    <button class="btn btn-primary btn-lg" onclick="app.startQuiz()">
                      ${lessonCompleted ? "Retake quiz" : "Start quiz"}
                      <i class="fa-solid fa-arrow-right-long ms-2"></i>
                    </button>
                  </div>

                  <div class="lesson-nav-actions">
                    ${
                      activeIndex > 0
                        ? `<button class="btn btn-outline-primary lesson-nav-btn" onclick="app.previousLesson()">
                            <i class="fa-solid fa-arrow-left-long me-2"></i>Previous lesson
                          </button>`
                        : "<span></span>"
                    }
                    ${
                      activeIndex < totalLessons - 1
                        ? `<button class="btn btn-primary lesson-nav-btn" onclick="app.nextLesson()">
                            Next lesson<i class="fa-solid fa-arrow-right-long ms-2"></i>
                          </button>`
                        : `<button class="btn btn-success lesson-nav-btn" onclick="app.completeLesson()">
                            <i class="fa-solid fa-award me-2"></i>Complete course
                          </button>`
                    }
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  }

  changeLesson(index) {
    this.currentLessonIndex = index;
    this.render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  nextLesson() {
    if (this.currentLessonIndex < this.selectedCourse.lessons.length - 1) {
      this.currentLessonIndex++;
      this.render();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  previousLesson() {
    if (this.currentLessonIndex > 0) {
      this.currentLessonIndex--;
      this.render();
      window.scrollTo({ top: 0, behavior: "smooth" });
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
                  
                  <h2 class="mb-5">Youth Health LMS</h2>
                  
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
                        ? this.selectedCourse.lessons.length + ' lessons'
                        : this.selectedCourse.lessions
                        ? this.selectedCourse.lessions.length + ' lessions'
                        : '0 lessons'
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
      const email = document.getElementById("registerEmail").value;
      const password = document.getElementById("registerPassword").value;
      const confirmPassword = document.getElementById(
        "registerConfirmPassword"
      ).value;

      const result = this.register(name, email, password, confirmPassword);

      if (!result.success) {
        errorDiv.textContent = result.error;
        errorDiv.classList.remove("d-none");
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
