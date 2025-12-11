// UI state helpers: expose sidebarHidden-driven CSS class/state for dynamic use across templates
// This avoids duplicating logic and lets markup compute classes like modules-collapsed/expanded on demand.
(function (global) {
  const STORAGE_KEY = 'lessonSidebarHidden';

  function readFlag() {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      return v === '1' || v === 'true';
    } catch (_) {
      return false;
    }
  }

  function writeFlag(flag) {
    try {
      // Write in the existing app.js format ('1'/'0') for compatibility
      localStorage.setItem(STORAGE_KEY, flag ? '1' : '0');
    } catch (_) {}
  }

  const api = global.YHUI || {};

  // Live getter so it always reflects latest localStorage value
  Object.defineProperty(api, 'sidebarHidden', {
    get() {
      return readFlag();
    },
    configurable: true,
  });

  api.setSidebarHidden = function (flag) {
    writeFlag(flag);
    return api.sidebarHidden;
  };

  api.getLessonShellClass = function () {
    return api.sidebarHidden ? 'modules-collapsed' : 'modules-expanded';
  };

  api.getLessonShellState = function () {
    return api.sidebarHidden ? 'collapsed' : 'expanded';
  };

  // Optional: apply classes/attributes to a given shell element immediately
  api.applyLessonShellState = function (root) {
    try {
      const el = root || document.querySelector('.lesson-shell');
      if (!el) return;
      el.classList.remove('modules-collapsed', 'modules-expanded');
      el.classList.add(api.getLessonShellClass());
      el.setAttribute('data-modules-state', api.getLessonShellState());
      // Sync pyramid steps visual state without requiring template rebuild
      const positiveSteps = document.querySelectorAll('.pyramid-positive .pyramid-steps .pyramid-step');
      positiveSteps.forEach((step) => {
        if (api.sidebarHidden) {
          step.classList.add('pyramid-positive-collapsed').remove('pyramid-step');
        } else {
          step.classList.add('pyramid-step').remove('pyramid-positive-collapsed');
        }
      });
    } catch (_) {}
  };

  global.YHUI = api;
})(window);

// Lightweight global localization helper used by data templates
(function (global) {
  if (typeof global.yhLang === "function") return;

  const encodeAttr = (value) =>
    String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  const encodeHtml = (value) =>
    String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  global.yhLang = function yhLang(enText, bnText) {
    const enSafe = encodeAttr(enText);
    const bnSafe = encodeAttr(bnText != null ? bnText : enText);
    const fallback = encodeHtml(enText);
    return `<lang en="${enSafe}" bn="${bnSafe}">${fallback}</lang>`;
  };
})(window);


// Young Health LMS - Course Data
const coursesData = [
  {
    id: "yhap-course",
    title: yhLang(
      "Young Health Ambassador Programme",
      "যুব স্বাস্থ্য দূত কর্মসূচি"
    ),
    description: yhLang(
      "Comprehensive training program for Young Health Ambassadors covering health literacy, advocacy, and community leadership.",
      "স্বাস্থ্য সাক্ষরতা, অ্যাডভোকেসি ও সম্প্রদায়িক নেতৃত্ব নিয়ে যুব স্বাস্থ্য দূতদের জন্য সমন্বিত প্রশিক্ষণ।"
    ),
    duration: yhLang("10 Lessons", "১০টি পাঠ"),
    level: yhLang("Comprehensive", "সমন্বিত"),
    imageUrl:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    enrolled: 0,
    // Chapterized structure
    chapters: [
      {
        id: "ch-1",
        title: yhLang(
          "Module-1: Introduction of Young Health Ambassador Program (YHAP)",
          "মডিউল-১: ইয়াং হেলথ অ্যাম্বাসেডর প্রোগ্রাম (ওয়াইএইচএপি) পরিচিতি"
        ),
        lessons: [
          // Understanding YHAP
          {
            id: "ch1-lesson-1",
            title: yhLang(
              "Understanding Young Health Ambassador Programme",
              "যুব স্বাস্থ্য দূত কর্মসূচি বোঝা"
            ),
            icon: "fa-heartbeat",
            gradientClass: "bg-gradient-purple",
            audioFile: "1.mp3",
            quiz: {
              passingScore: 80,
              questions: [
                {
                  id: "q1a",
                  question: yhLang(
                    "What age range defines youth according to the UN?",
                    "জাতিসংঘের মতে কোন বয়সসীমাকে যুব বলা হয়?"
                  ),
                  options: [
                    yhLang("15–24 years", "১৫–২৪ বছর"),
                    yhLang("10–19 years", "১০–১৯ বছর"),
                    yhLang("18–29 years", "১৮–২৯ বছর"),
                    yhLang("12–21 years", "১২–২১ বছর"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              return `
              <div class="lesson-slide">
                <h2 class="slide-title gradient-text gradient-text-hover hover-lift-sm transition-base" data-aos="fade-up">${yhLang("Young Health Ambassador Programme", "যুব স্বাস্থ্য দূত কর্মসূচি")}</h2>
                <div class="floating-bg" aria-hidden="true">
                  <span class="float-elem" style="top:8%; left:6%; width:70px; height:70px;"></span>
                  <span class="float-elem" style="top:35%; right:10%; width:90px; height:90px;"></span>
                  <span class="float-elem" style="bottom:12%; left:14%; width:80px; height:80px;"></span>
                </div>

                <div class="row g-3 mt-2">
                  ${[
                    {
                      icon: "fa-heartbeat",
                      title: yhLang("Health", "স্বাস্থ্য"),
                      text: yhLang(
                        "As per World Health Organization (WHO), health is defined as a state of complete physical, mental, and social well-being, and not merely the absence of disease or infirmity.",
                        "বিশ্ব স্বাস্থ্য সংস্থা (WHO) স্বাস্থ্যকে একটি পূর্ণাঙ্গ শারীরিক, মানসিক ও সামাজিক সুস্থতার অবস্থা হিসেবে চিহ্নিত করে—শুধু অসুস্থতার অনুপস্থিতি নয়।"
                      ),
                      delay: 160,
                    },
                    {
                      icon: "fa-child-reaching",
                      title: yhLang("Adolescence", "কৈশোর"),
                      text: yhLang(
                        "According to WHO, adolescence is the life phase between childhood and adulthood (10–19 years) marked by rapid physical, cognitive, and psychosocial growth.",
                        "WHO–এর মতে ১০–১৯ বছর বয়সীনদের কৈশোর বলা হয়—এই পর্যায়ে দ্রুত শারীরিক, মানসিক ও সামাজিক পরিবর্তন ঘটে।"
                      ),
                      delay: 200,
                    },
                    {
                      icon: "fa-user-group",
                      title: yhLang("Youth", "যুবক-যুবতী"),
                      text: yhLang(
                        "The United Nations defines youth as persons aged 15–24, marking the transition from dependence to independence.",
                        "জাতিসংঘ ১৫–২৪ বছরের ব্যক্তিদের যুব বলে—এ সময়েই নির্ভরতামুক্ত হয়ে স্বনির্ভরতার পথে এগিয়ে যায়।"
                      ),
                      delay: 240,
                    },
                    {
                      icon: "fa-users-between-lines",
                      title: yhLang("Young people", "তরুণ জনগোষ্ঠী"),
                      text: yhLang(
                        "WHO describes young people as those aged 10–24.",
                        "WHO-এর মতে ১০–২৪ বছর বয়সীরাই তরুণ জনগোষ্ঠী।"
                      ),
                      delay: 280,
                    },
                  ]
                    .map(
                      (card) => `
                      <div class="col-md-12">
                        <div class="definition-card hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover" data-aos="fade-up" data-aos-delay="${card.delay}">
                          <h4 class="gradient-text transition-base"><i class="fas ${card.icon} me-2 animate-float"></i>${card.title}</h4>
                          <p class="mb-0">${card.text}</p>
                        </div>
                      </div>
                    `
                    )
                    .join("")}
                </div>

                <div class="program-intro hover-lift-sm transition-base mt-3" data-aos="fade-up" data-aos-delay="100">
                  <h4 class="gradient-text transition-base"><i class="fa-solid fa-lightbulb me-2 animate-float"></i>${yhLang("About YHAP", "ওয়াইএইচএপি সম্পর্কে")}</h4>
                  <p>${yhLang(
                    "The Young Health Ambassador Programme (YHAP) is a joint initiative of the Ministry of Health and Family Welfare (MOHFW) and UNICEF to build informed health ambassadors through primary prevention and health promotion.",
                    "ইয়াং হেলথ অ্যাম্বাসেডর প্রোগ্রাম (ওয়াইএইচএপি) হলো স্বাস্থ্য ও পরিবার কল্যাণ মন্ত্রণালয় ও ইউনিসেফের যৌথ উদ্যোগ, যা প্রতিরোধমূলক স্বাস্থ্য প্রচারের মাধ্যমে তথ্যসমৃদ্ধ স্বাস্থ্য দূত গড়ে তোলে।"
                  )}</p>
                  <p>${yhLang(
                    "The course equips young people with knowledge on physical, sexual and reproductive health, nutrition, and mental wellbeing so they can champion healthier choices in their communities.",
                    "এই কোর্স তরুণদের শারীরিক, যৌন ও প্রজনন স্বাস্থ্য, পুষ্টি ও মানসিক সুস্থতা নিয়ে জ্ঞান ও দক্ষতা দেয়, যাতে তারা নিজের সম্প্রদায়ে সুস্থ জীবনধারার অনুকূল পরিবেশ গড়তে পারে।"
                  )}</p>
                </div>
              </div>`;
            })(),
          },
          // Age progression (inserted after Lesson 1)

          // Age progression (inserted after Lesson 1)
          {
            id: "ch1-lesson-2",
            title: yhLang(
              "Age Progression: Adolescence to Young Adulthood (10–24)",
              "বয়সের ধাপ: কৈশোর থেকে তরুণ প্রাপ্তবয়স্ক (১০–২৪)"
            ),
            icon: "fa-children",
            gradientClass: "bg-gradient-violet",
            audioFile: "",
            quiz: {
              passingScore: 70,
              questions: [
                {
                  id: "q1a-ages-1",
                  question: yhLang(
                    "Which range is considered Mid Adolescence?",
                    "কোন বয়সসীমাকে মধ্য কৈশোর ধরা হয়?"
                  ),
                  options: [
                    yhLang("10–13 years", "১০–১৩ বছর"),
                    yhLang("14–16 years", "১৪–১৬ বছর"),
                    yhLang("17–19 years", "১৭–১৯ বছর"),
                    yhLang("20–24 years", "২০–২৪ বছর"),
                  ],
                  correctAnswer: 1,
                },
              ],
            },
            content: (function () {
              return `
            <div class="lesson-slide">
              <h2 class="slide-title gradient-text gradient-text-hover hover-lift-sm transition-base" data-aos="fade-up">${yhLang("Understanding Age Groups (10–24)", "বয়সভিত্তিক ধাপ (১০–২৪)")}</h2>
              <div class="floating-bg" aria-hidden="true">
                <span class="float-elem" style="top:8%; left:6%; width:64px; height:64px;"></span>
                <span class="float-elem" style="top:30%; right:8%; width:80px; height:80px;"></span>
                <span class="float-elem" style="bottom:10%; left:12%; width:72px; height:72px;"></span>
              </div>

              <div class="alert alert-primary mb-4 hover-lift-sm transition-base" data-aos="fade-up" data-aos-delay="60">
                <div class="d-flex align-items-center gap-3">
                  <span class="badge bg-primary bg-gradient p-3"><i class="fa-solid fa-users-between-lines"></i></span>
                  <div>
                    <h5 class="mb-1">${yhLang("Who is a “young person”?", "“তরুণ” বলতে কাকে বোঝায়?")}</h5>
                    <p class="mb-0">${yhLang("According to WHO, <strong>young people are 10–24 years</strong>. Adolescence (10–19) is often described in three stages: <em>Early (10–13)</em>, <em>Mid (14–16)</em>, and <em>Late (17–19)</em> — followed by <em>Young Adulthood (20–24)</em>.", "WHO–এর মতে <strong>১০–২৪ বছর বয়সীরা তরুণ</strong>। কৈশোর (১০–১৯) সাধারণত তিন ধাপে বিবেচিত হয়: <em>প্রারম্ভিক (১০–১৩)</em>, <em>মধ্য (১৪–১৬)</em> ও <em>শেষ (১৭–১৯)</em> — এরপরই <em>তরুণ প্রাপ্তবয়স্ক পর্ব (২০–২৪)</em>।")}</p>
                  </div>
                </div>
              </div>

              <div class="age-legend" data-aos="fade-up" data-aos-delay="100">
                <span class="legend-item"><span class="legend-dot legend-adolescence"></span> ${yhLang("Adolescence (10–19)", "কৈশোর (১০–১৯)")}</span>
                <span class="legend-item"><span class="legend-dot legend-young"></span> ${yhLang("Young Adulthood (20–24)", "তরুণ প্রাপ্তবয়স্ক (২০–২৪)")}</span>
              </div>

              <div class="age-track d-sm-block d-lg-flex align-items-stretch justify-content-between gap-3" data-aos="fade-up" data-aos-delay="120">
                ${[
                  {
                    label: yhLang("Early Adolescence", "প্রারম্ভিক কৈশোর"),
                    range: "10–13",
                    iconA: "fa-child",
                    iconB: "fa-person-dress",
                    color: "gradient-sky",
                    img: "img/age/1.png",
                  },
                  {
                    label: yhLang("Mid Adolescence", "মধ্য কৈশোর"),
                    range: "14–16",
                    iconA: "fa-child-reaching",
                    iconB: "fa-person",
                    color: "gradient-emerald",
                    img: "img/age/2.png",
                  },
                  {
                    label: yhLang("Late Adolescence", "শেষ কৈশোর"),
                    range: "17–19",
                    iconA: "fa-person-walking",
                    iconB: "fa-person-dress",
                    color: "gradient-violet",
                    img: "img/age/3.png",
                  },
                  {
                    label: yhLang("Young Adulthood", "তরুণ প্রাপ্তবয়স্ক"),
                    range: "20–24",
                    iconA: "fa-user",
                    iconB: "fa-user",
                    color: "gradient-tangerine",
                    img: "img/age/4.png",
                  },
                ]
                  .map(
                    (step, i) => `
                  <div class="age-step flex-grow-1" style="min-width: 220px;">
                    <div class="modern-card glass-card h-100 hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover" style="padding:1rem; position:relative; z-index:1;">
                      <div class="d-flex align-items-center justify-content-between mb-2">
                        <span class="badge-pill">${step.label}</span>
                        <span class="badge bg-dark text-light">${
                          step.range
                        } ${yhLang("yrs", "বছর")}</span>
                      </div>
                      <div class="d-none d-flex align-items-center justify-content-center gap-4" style="font-size: 2rem;">
                        <span class="${step.color}"><i class="fa-solid ${
                      step.iconA
                    }"></i></span>
                        <i class="fa-solid fa-plus text-muted" style="font-size:1rem"></i>
                        <span class="${step.color}"><i class="fa-solid ${
                      step.iconB
                    }"></i></span>
                      </div>
                      <figure class="image-card age-figure mt-3" style="height:160px">
                        <img src="${step.img}" alt="${step.range} years" class="animate-float-slow">
                      </figure>
                    </div>
                  </div>
                  ${
                    i < 3
                      ? '<div class="d-none d-xl-flex align-items-center justify-content-center" style="min-width:24px"><i class="fa-solid fa-arrow-right-long"></i></div>'
                      : ""
                  }
                `
                  )
                  .join("")}
              </div>

              <div class="row g-3 mt-3">
                ${[
                  {
                    title: yhLang("Early Adolescence", "প্রারম্ভিক কৈশোর"),
                    icon: "fa-seedling",
                    text: yhLang("Rapid growth begins; guidance on body changes and healthy habits is essential.", "দ্রুত শারীরিক পরিবর্তন শুরু হয়; দেহের পরিবর্তন ও স্বাস্থ্যকর অভ্যাস নিয়ে দিকনির্দেশনা জরুরি।"),
                  },
                  {
                    title: yhLang("Mid Adolescence", "মধ্য কৈশোর"),
                    icon: "fa-compass",
                    text: yhLang("Identity exploration and peer influence increase—support positive choices.", "আত্মপরিচয় খোঁজা ও সহপাঠীদের প্রভাব বাড়ে—ইতিবাচক সিদ্ধান্তে সহায়তা করুন।"),
                  },
                  {
                    title: yhLang("Late Adolescence", "শেষ কৈশোর"),
                    icon: "fa-graduation-cap",
                    text: yhLang("Transitions to higher studies or work—build life skills and resilience.", "উচ্চশিক্ষা বা কর্মজীবনে প্রবেশ—জীবন দক্ষতা ও স্থিতিস্থাপকতা গড়ে তুলুন।"),
                  },
                  {
                    title: yhLang("Young Adulthood", "তরুণ প্রাপ্তবয়স্ক"),
                    icon: "fa-rocket",
                    text: yhLang("Greater independence—focus on wellbeing, employability, and leadership.", "স্বাধীনতা বাড়ে—সুস্থতা, কর্মদক্ষতা ও নেতৃত্বে গুরুত্ব দিন।"),
                  },
                ]
                  .map(
                    (card, idx) => `
                  <div class="col-12 col-md-6">
                    <div class="definition-card hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover" data-aos="zoom-in" data-aos-delay="${
                      160 + idx * 60
                    }">
                      <h5 class="gradient-text mb-1"><i class="fa-solid ${
                        card.icon
                      } me-2 animate-float"></i>${card.title}</h5>
                      <p class="mb-0">${card.text}</p>
                    </div>
                  </div>
                `
                  )
                  .join("")}
              </div>
            </div>`;
            })(),
          },
          // Six pillars
          {
            id: "ch1-lesson-3",
            title: yhLang(
              "Six pillars that build confident health ambassadors",
              "আত্মবিশ্বাসী স্বাস্থ্য দূত গড়তে ছয়টি স্তম্ভ"
            ),
            icon: "fa-layer-group",
            gradientClass: "bg-gradient-blue",
            audioFile: "2.mp3",
            quiz: {
              passingScore: 80,
              questions: [
                {
                  id: "q1b",
                  question: yhLang(
                    "Which pillar focuses on accurate messaging?",
                    "কোন স্তম্ভ সঠিক বার্তা প্রচারে গুরুত্ব দেয়?"
                  ),
                  options: [
                    yhLang("Leadership", "নেতৃত্ব"),
                    yhLang("Advocacy", "অ্যাডভোকেসি"),
                    yhLang(
                      "Health Education & Awareness",
                      "স্বাস্থ্য শিক্ষা ও সচেতনতা"
                    ),
                    yhLang("Empowerment", "ক্ষমতায়ন"),
                  ],
                  correctAnswer: 2,
                },
              ],
            },
            content: (function () {
              return `
          <div class="lesson-slide">
            <h2 class="slide-title gradient-text gradient-text-hover hover-lift-sm transition-base" data-aos="fade-up">${yhLang("Core Components of YHAP", "YHAP–এর মূল উপাদান")}</h2>
            <div class="floating-bg" aria-hidden="true">
              <span class="float-elem" style="top:10%; left:8%; width:70px; height:70px;"></span>
              <span class="float-elem" style="bottom:10%; right:12%; width:90px; height:90px;"></span>
            </div>
            <div class="row g-4">${[
              {
                title: yhLang("Health Literacy", "স্বাস্থ্য সাক্ষরতা"),
                description: yhLang(
                  "YHAP builds foundational health literacy through comprehensive training on essential health and wellbeing. This equips ambassadors with the expertise to act as credible sources of information and effective advocates for prevention of diseases and health promotion.",
                  "YHAP অপরিহার্য স্বাস্থ্য ও সুস্থতা বিষয়ে সমন্বিত প্রশিক্ষণের মাধ্যমে মৌলিক স্বাস্থ্য সাক্ষরতা গড়ে তোলে। এতে দূতরা বিশ্বাসযোগ্য তথ্যদাতা ও প্রতিরোধভিত্তিক স্বাস্থ্য প্রচারের কার্যকর প্রবক্তা হয়ে উঠেন।"
                ),
                icon: "fa-book-medical",
                color: "purple",
              },
              {
                title: yhLang("Health Education & Awareness", "স্বাস্থ্য শিক্ষা ও সচেতনতা"),
                description: yhLang(
                  "Young Health Ambassadors (YHAs) will create health education and awareness through campaigns on key health issues, comprehensive trainings, mentorships etc., Through these multifaceted efforts, they will ensure the accurate dissemination of crucial health information towards fostering well-informed and health-literate communities.",
                  "যুব স্বাস্থ্য দূতেরা (YHA) গুরুত্বপূর্ণ স্বাস্থ্য ইস্যুতে প্রচারণা, প্রশিক্ষণ ও মেন্টরশিপের মাধ্যমে স্বাস্থ্য শিক্ষা ও সচেতনতা তৈরি করবে, যাতে সঠিক তথ্য পৌঁছে স্বাস্থ্য–সচেতন সমাজ গড়ে ওঠে।"
                ),
                icon: "fa-graduation-cap",
                color: "blue",
              },
              {
                title: yhLang("Peer to Peer Influence", "সহপাঠী থেকে সহপাঠী প্রভাব"),
                description: yhLang(
                  "The programme is built on the principle that peer-to-peer engagement is a powerful catalyst for change. By facilitating supportive mentorship and encouraging positive role-modeling among contemporaries, YHAP leverages the profound impact of shared experiences to promote healthy behaviors.",
                  "এই কর্মসূচি সহপাঠীদের পারস্পরিক সম্পৃক্ততাকে পরিবর্তনের শক্তিশালী অনুঘটক হিসেবে বিবেচনা করে। ইতিবাচক রোল মডেলিং ও সহায়ক মেন্টরশিপের মাধ্যমে অভিজ্ঞতা ভাগ করে স্বাস্থ্যকর আচরণ উৎসাহিত করা হয়।"
                ),
                icon: "fa-users",
                color: "teal",
              },
              {
                title: yhLang("Empowerment", "ক্ষমতায়ন"),
                description: yhLang(
                  "YHAP empowers individuals by equipping them with the tools, confidence, and skills needed to take effective control and contribute to the economic development, creating a productive, resilient, and healthy workforce for the future.",
                  "YHAP তরুণদের প্রয়োজনীয় দক্ষতা, আত্মবিশ্বাস ও উপকরণ দিয়ে ক্ষমতায়িত করে, যাতে তারা কার্যকর ভূমিকা নিয়ে অর্থনৈতিক উন্নয়নে অবদান রাখতে পারে এবং ভবিষ্যতের জন্য সৃজনশীল ও সুস্থ কর্মশক্তি গড়ে ওঠে।"
                ),
                icon: "fa-hand-fist",
                color: "orange",
              },
              {
                title: yhLang("Leadership", "নেতৃত্ব"),
                description: yhLang(
                  "The program cultivates leadership qualities in youth, preparing them to become effective, ethical, and inspiring agents of change in their communities.",
                  "এই কর্মসূচি তরুণদের মধ্যে নেতৃত্বের গুণাবলি বিকাশ করে, যাতে তারা সম্প্রদায়ের পরিবর্তনের নৈতিক, কার্যকর ও অনুপ্রেরণাদায়ী দূত হয়ে উঠতে পারে।"
                ),
                icon: "fa-flag",
                color: "green",
              },
              {
                title: yhLang("Advocacy", "অ্যাডভোকেসি"),
                description: yhLang(
                  "The Youth Health Ambassador Programme (YHAP) builds foundational competencies in health advocacy, empowering youth to effectively raise voice, articulate public health priorities to drive systemic reform. This is achieved through strategic engagement with key stakeholders, evidence-based promotion of policies, and active contribution to the formulation of legislation for strengthening health systems.",
                  "YHAP স্বাস্থ্য অ্যাডভোকেসির মৌলিক দক্ষতা তৈরি করে, যাতে তরুণরা জনস্বাস্থ্যের অগ্রাধিকার তুলে ধরে নীতিগত পরিবর্তন আনতে পারে। অংশীদারদের সঙ্গে কৌশলগত সম্পৃক্ততা, প্রমাণভিত্তিক নীতিপ্রচারণা এবং আইন প্রণয়নে অংশগ্রহণের মাধ্যমে স্বাস্থ্যব্যবস্থা শক্তিশালী করা হয়।"
                ),
                icon: "fa-bullhorn",
                color: "pink",
              },
            ]
              .map(
                (pillar, i) => `
              <div class="col-md-6">
                <div class="component-card hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover bg-gradient-${pillar.color} shadow-lg" data-aos="zoom-in" data-aos-delay="${
                  100 + i * 50
                }">
                  <div class="component-icon bg-gradient-${pillar.color} animate-float"><i class="fas ${pillar.icon}"></i></div>
                  <h5 class="gradient-text transition-base">${pillar.title}</h5>
                  <p>${pillar.description}</p>
                </div>
              </div>`
              )
              .join("")}
            </div>
          </div>`;
            })(),
          },
          // Who am I
          {
            id: "ch1-lesson-4",
            title: yhLang(
              "Who Am I as a Health Ambassador?",
              "স্বাস্থ্য দূত হিসেবে আমি কে?"
            ),
            icon: "fa-user-shield",
            gradientClass: "bg-gradient-teal",
            audioFile: "3.mp3",
            quiz: {
              passingScore: 80,
              questions: [
                {
                  id: "q1c",
                  question: yhLang(
                    "Advocacy includes engaging which stakeholders?",
                    "অ্যাডভোকেসিতে কোন অংশীদারদের সম্পৃক্ত করা হয়?"
                  ),
                  options: [
                    yhLang("Only peers", "শুধু সহপাঠী"),
                    yhLang(
                      "Policy makers and gatekeepers",
                      "নীতিনির্ধারক ও অভিভাবকগোষ্ঠী"
                    ),
                    yhLang("Only media", "শুধু গণমাধ্যম"),
                    yhLang("No one", "কাউকেই নয়"),
                  ],
                  correctAnswer: 1,
                },
              ],
            },
            content: (function () {
              return `
          <div class="lesson-slide">
            <h2 class="slide-title gradient-text gradient-text-hover hover-lift-sm transition-base" data-aos="fade-up">${yhLang("Roles and Responsibilities of Health Ambassador", "স্বাস্থ্য দূতের ভূমিকা ও দায়িত্ব")}</h2>
            <h3 class="text-center mb-4 gradient-text hover-lift-sm transition-base" data-aos="fade-up" data-aos-delay="50">${yhLang("Who am I?", "আমি কে?")}</h3>
            <div class="row g-4">${[
              {
                icon: "fa-shield-heart",
                text: yhLang(
                  "I am equipped with expertise in safeguarding health and well-being of young people, enabling me to contribute meaningfully to society while harnessing the triple dividend of health, social, and economic benefits.",
                  "তরুণদের স্বাস্থ্য ও সুস্থতা রক্ষায় আমার জ্ঞান ও দক্ষতা আছে, যা আমাকে সমাজে কার্যকর অবদান রাখতে ও স্বাস্থ্য, সামাজিক ও অর্থনৈতিক ত্রি-মুখী সুফল অর্জনে সহায়তা করে।"
                ),
              },
              {
                icon: "fa-share-nodes",
                text: yhLang(
                  "I actively empower my peers by sharing knowledge on health promotion, disease prevention, and holistic well-being, fostering informed decision-making among young people.",
                  "স্বাস্থ্য উন্নয়ন, রোগ প্রতিরোধ ও সামগ্রিক সুস্থতা নিয়ে জ্ঞান ভাগ করে আমি সহপাঠীদের ক্ষমতায়িত করি এবং তরুণদের সুচিন্তিত সিদ্ধান্ত গ্রহণে সহায়তা করি।"
                ),
              },
              {
                icon: "fa-handshake",
                text: yhLang(
                  "Through advocacy, I engage policy makers, stakeholders and community influencer,  gatekeepers to prioritize health and wellbeing of young people, ensuring supportive policies and collaborative action for sustainable well-being.",
                  "অ্যাডভোকেসির মাধ্যমে নীতিনির্ধারক, অংশীদার ও সম্প্রদায়ের প্রভাবশালীদের সম্পৃক্ত করি যাতে তরুণদের স্বাস্থ্য অগ্রাধিকার পায় ও সহায়ক নীতি ও সমন্বিত পদক্ষেপ নিশ্চিত হয়।"
                ),
              },
              {
                icon: "fa-chart-line",
                text: yhLang(
                  "I drive awareness and demand creation within communities, inspiring collective responsibility and action towards better health outcomes for adolescents and youth.",
                  "আমি সম্প্রদায়জুড়ে সচেতনতা ও চাহিদা সৃষ্টিতে ভূমিকা রাখি, যাতে সবাই মিলে কিশোর-কিশোরীদের উন্নত স্বাস্থ্যফল নিশ্চিত করতে পারে।"
                ),
              },
            ]
              .map(
                (f, i) => `
              <div class="col-md-6">
                <div class="role-card hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover bg-gradient-${
                  ["teal", "orange", "green", "pink"][i]
                }"
                 data-aos="${
                   i % 2 ? "fade-left" : "fade-right"
                 }" data-aos-delay="${100 + i * 50}">
                  <div class="role-icon animate-float"><i class="fas ${
                    f.icon
                  }"></i></div>
                  <p>${f.text}</p>
                </div>
              </div>`
              )
              .join("")}
            </div>
          </div>`;
            })(),
          },
          // Nine steps
          {
            id: "ch1-lesson-5",
            title: yhLang(
              "Nine interactive steps to become a certified Young Health Ambassador",
              "সনদপ্রাপ্ত যুব স্বাস্থ্য দূত হতে নয়টি ধাপ"
            ),
            icon: "fa-clipboard-check",
            gradientClass: "bg-gradient-orange",
            audioFile: "4.mp3",
            quiz: {
              passingScore: 80,
              questions: [
                {
                  id: "q1d",
                  question: yhLang(
                    "Which step confirms identity?",
                    "কোন ধাপ পরিচয় নিশ্চিত করে?"
                  ),
                  options: [
                    yhLang("Registration", "নিবন্ধন"),
                    yhLang("Unique ID Generation", "ইউনিক আইডি তৈরি"),
                    yhLang("Assessment", "মূল্যায়ন"),
                    yhLang("Certificate download", "সার্টিফিকেট ডাউনলোড"),
                  ],
                  correctAnswer: 1,
                },
              ],
            },
            content: (function () {
              const steps = [
                {
                  text: yhLang(
                    "Online registration in Young Health Ambassador Program (YHAP)",
                    "ওয়াইএইচএপি-তে অনলাইনে নিবন্ধন"
                  ),
                  icon: "fa-pen-to-square",
                  color: "purple",
                },
                {
                  text: yhLang("Unique ID Generation", "ইউনিক আইডি তৈরি"),
                  icon: "fa-id-card",
                  color: "blue",
                },
                {
                  text: yhLang(
                    "Log in to the Website/App",
                    "ওয়েবসাইট/অ্যাপে লগইন"
                  ),
                  icon: "fa-right-to-bracket",
                  color: "teal",
                },
                {
                  text: yhLang(
                    "Access Young Health Ambassador Program (YAHP) course",
                    "ইয়াং হেলথ অ্যাম্বাসেডর কোর্সে প্রবেশ"
                  ),
                  icon: "fa-book-open",
                  color: "orange",
                },
                {
                  text: yhLang("Complete YHAP course", "ওয়াইএইচএপি কোর্স সম্পন্ন"),
                  icon: "fa-list-check",
                  color: "green",
                },
                {
                  text: yhLang(
                    "Obtain passing marks in final assessment",
                    "চূড়ান্ত মূল্যায়নে উত্তীর্ণ নম্বর লাভ"
                  ),
                  icon: "fa-trophy",
                  color: "pink",
                },
                {
                  text: yhLang(
                    "System generated certificate",
                    "সিস্টেম থেকে স্বয়ংক্রিয় সার্টিফিকেট"
                  ),
                  icon: "fa-certificate",
                  color: "yellow",
                },
                {
                  text: yhLang(
                    "Self declaration/Oath Taking",
                    "স্বপ্রত্যয়ন/শপথ গ্রহণ"
                  ),
                  icon: "fa-hand",
                  color: "lavender",
                },
                {
                  text: yhLang(
                    "Final Certificate (Course validity-2 years)",
                    "চূড়ান্ত সনদ (কোর্সের মেয়াদ ২ বছর)"
                  ),
                  icon: "fa-award",
                  color: "mint",
                },
              ];
              return `
            <div class="lesson-slide">
            <h2 class="slide-title gradient-text gradient-text-hover hover-lift-sm transition-base" data-aos="fade-up">${yhLang("Eligibility and Steps to be a YHA", "ওয়াইএইচএ হওয়ার যোগ্যতা ও ধাপ")}</h2>
            <div class="alert alert-info mb-4 hover-lift-sm transition-base" data-aos="fade-up" data-aos-delay="50">
              <h5><i class="fas fa-info-circle me-2"></i>${yhLang("Eligibility", "যোগ্যতা")}</h5>
              <p class="mb-0">${yhLang("Any person aged <strong>10-24 years</strong> can become a Young Health Ambassador.", "<strong>১০-২৪ বছর</strong> বয়সী যে কেউ যুব স্বাস্থ্য দূত হতে পারে।")}</p>
            </div>
            <div class="row g-3">
              ${steps
                .map(
                  (s, i) => `
              <div class="col-md-4" data-aos="fade-up" data-aos-delay="${
                1 + i * 40
              }">
              <div class="step-card bg-gradient-${
                s.color
              } hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover text-center">
                <div class="step-icon animate-float-slow d-inline-flex align-items-center justify-content-center"
                   style="width:64px; height:64px; border-radius:50%; animation-duration:6s; animation-delay:${(
                     i * 0.2
                   ).toFixed(1)}s">
                <i class="fas ${
                  s.icon
                } text-white" style="font-size:1.35rem"></i>
                </div>
                <h6 class="mt-2">${s.text}</h6>
              </div>
              </div>`
                )
                .join("")}
            </div>
            </div>`;
            })(),
          },
          // Young Around the World
          // {
          //   id: 'ch1-lesson-5',
          //   title: 'Young Around the World',
          //   icon: 'fa-earth-americas',
          //   gradientClass: 'bg-gradient-green',
          //   audioFile: '5.mp3',
          //   quiz: { passingScore: 80, questions: [{ id:'q1e', question: 'Approximate share of young living in developing countries?', options:['30%','50%','70%','90%'], correctAnswer:3 }] },
          //   content: (function(){ return `
          // <div class="lesson-slide">
          //   <h2 class="slide-title gradient-text gradient-text-hover hover-lift-sm transition-base" data-aos="fade-up">Distribution of Young People</h2>
          //   <div class="row g-4 mb-4">
          //     <div class="col-md-6" data-aos="zoom-in" data-aos-delay="120">
          //       <div class="stat-card hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover">
          //         <div class="stat-icon"><i class="fas fa-users-between-lines"></i></div>
          //         <h4>49.5 Million</h4><p>Total young people in Bangladesh (~30%)</p>
          //       </div>
          //     </div>
          //     <div class="col-md-6" data-aos="zoom-in" data-aos-delay="160">
          //       <div class="stat-card hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover">
          //         <div class="stat-icon"><i class="fas fa-user-group"></i></div>
          //         <h4>31.5 Million</h4><p>Young (15–24 years) in Bangladesh</p>
          //       </div>
          //     </div>
          //   </div>
          // </div>`; })()
          // }
        ],
      },
      {
        id: "ch-2",
        title: yhLang(
          "Module-2: Global and Bangladesh Scenario",
          "মডিউল-২: বৈশ্বিক ও বাংলাদেশ প্রেক্ষাপট"
        ),
        lessons: [
          {
            id: "ch2-lesson-1",
            title: yhLang(
              "Global Young Population and Demographics",
              "বৈশ্বিক তরুণ জনগোষ্ঠী ও জনতাত্ত্বিক চিত্র"
            ),
            icon: "fa-map-location-dot",
            gradientClass: "bg-gradient-blue",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q2a",
                  question: yhLang(
                    "What percentage of the world’s youth live in developing countries?",
                    "বিশ্বের তরুণদের কত শতাংশ উন্নয়নশীল দেশে বাস করে?"
                  ),
                  options: [
                    yhLang("90%", "৯০%"),
                    yhLang("75%", "৭৫%"),
                    yhLang("60%", "৬০%"),
                    yhLang("40%", "৪০%"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              return `
            <div class="lesson-slide">
              <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang("Global Young Population and Demographics", "বৈশ্বিক তরুণ জনগোষ্ঠী ও জনতাত্ত্বিক চিত্র")}</h2>

              <!-- Step 1 – Global Overview global-overview  style="filter: drop-shadow(0 10px 30px rgba(0,0,0,.2));"-->
              <section class="text-center" data-aos="fade-up" style="position:relative; overflow:hidden;">
                <div class="container" style="position: relative">
                  <img src="img/Distribution/globe.jpg" class="img-fluid mx-auto d-block rounded-4 globe-rotate opacity-75" alt="Globe showing youth population">
                  <div class="globe-text-wrap">
                    <h3 class="fw-bold map-text" style="color:#fff; text-shadow:0 6px 30px rgba(0,0,0,.25)"><span id="globalCounter" data-target="90">0</span>%</h3>
                    <p class="lead mt-2 text-dark">${yhLang("The world counts <strong>1.8 billion</strong> young people aged 10–24.", "বিশ্বে <strong>১.৮ বিলিয়ন</strong> ১০–২৪ বছর বয়সী তরুণ রয়েছে।")}</p>
                    <p class="mb-0 text-dark lead">${yhLang("Around <strong>90%</strong> live in developing countries.", "প্রায় <strong>৯০%</strong> তরুণ উন্নয়নশীল দেশে বাস করে।")}</p>
                  </div>
                </div>
              </section>

              <!-- Step 2 – Global Youth Population by Region (Map + Doughnut) -->
              <section class="world-youth-map-and-chart py-4 mb-4 rounded-4" data-aos="zoom-in">
                <div class="container">
                  <div class="row g-3 align-items-center">
                    <div class="col-lg-12">
                      <div class="modern-card glass-card h-region">
                        <h5 class="mb-3">${yhLang("Global youth population by region", "অঞ্চলভিত্তিক বৈশ্বিক তরুণ জনগোষ্ঠী")}</h5>
                        <div style="position:relative; height:340px;">
                          <canvas id="regionalShareChart" aria-label="Global youth population by region. " role="img"></canvas>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <!-- Step 3 – POPULATION & HOUSING CENSUS 2022 (Chart.js) -->
              <section class="population-pyramid-wrapper py-4 mb-4" data-aos="fade-up">
                <div class="modern-card glass-card">
                  <h5 class="mb-3">${yhLang("POPULATION & HOUSING CENSUS 2022", "জনসংখ্যা ও গৃহগণনা ২০২২")}</h5>
                  <div style="position:relative; height:420px;">
                    <canvas id="populationPyramid" aria-label="POPULATION & HOUSING CENSUS 2022" role="img"></canvas>
                  </div>
                </div>
              </section>

              <!-- Step 4 – Bangladesh Focus -->
              <section class="bangladesh-map py-4" data-aos="fade-right">
                <div class="container">
                  <div class="row align-items-center g-3 modern-card glass-card">
                      <div class="col-md-8" style="padding:1.5rem;">
                        <h5>${yhLang("Distribution of Young People", "তরুণ জনগোষ্ঠীর বণ্টন")}</h5>
                        <p class="mb-0">${yhLang("<strong>Bangladesh:</strong> <strong>49.5 million</strong> young people (~30% of total population).", "<strong>বাংলাদেশ:</strong> প্রায় <strong>৪৯.৫ মিলিয়ন</strong> তরুণ (মোট জনসংখ্যার প্রায় ৩০%)।")}</p>
                      </div>
                      <div class="col-md-4">
                       <img src="img/Distribution/dis-map.png" class="img-fluid rounded shadow" alt="Bangladesh map placeholder">
                     </div>
                  </div>
                </div>
              </section>

              <!-- <div class="alert alert-info mt-3" role="note" data-aos="fade-up">
                Complete the knowledge check below to continue.
              </div> -->
            </div>`;
            })(),
          },
          {
            id: "ch2-lesson-2",
            title: yhLang(
              "Why young people’s health and wellbeing is important?",
              "তরুণদের স্বাস্থ্য ও সুস্থতা কেন গুরুত্বপূর্ণ?"
            ),
            icon: "fa-heart-pulse",
            gradientClass: "bg-gradient-green",
            audioFile: "2.mp3",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q2b",
                  question: yhLang(
                    "Investments in adolescents yield a…",
                    "কৈশোরে বিনিয়োগ করলে কী ধরনের ফল পাওয়া যায়?"
                  ),
                  options: [
                    yhLang("Single benefit", "একটি সুফল"),
                    yhLang("No return", "কোনো ফল নেই"),
                    yhLang("Triple dividend", "ত্রিমুখী সুফল"),
                    yhLang("Unknown", "অজানা"),
                  ],
                  correctAnswer: 2,
                },
              ],
            },
            content: (function () {
              return `
              <div class="lesson-slide">
                <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang("Why young people’s health and wellbeing is important?", "তরুণদের স্বাস্থ্য ও সুস্থতা কেন গুরুত্বপূর্ণ?")}</h2>

                <h5 class="mt-2 gradient-text" data-aos="fade-up" data-aos-delay="60">${yhLang("Investments in the current generation of 10–24-year-olds will reap a triple dividend", "১০–২৪ বছর বয়সী বর্তমান প্রজন্মে বিনিয়োগ করলে ত্রিমুখী সুফল পাওয়া যায়")}</h5>

                <!-- Triple Dividend Cards -->
                <div class="row g-3 my-2">
                  <div class="col-md-4" data-aos="fade-up" data-aos-delay="120">
                    <div class="modern-card glass-card icon-spin-on-hover dividend-card">
                      <div class="dividend-icon bg-gradient-blue"><i class="fa-solid fa-heart-pulse"></i></div>
                      <h6 class="mb-1">${yhLang("Healthy young population now", "এখনই সুস্থ তরুণ জনগোষ্ঠী")}</h6>
                      <p class="mb-2 text-muted"></p>
                      <span class="badge-pill"></span>
                    </div>
                  </div>
                  <div class="col-md-4" data-aos="fade-up" data-aos-delay="160">
                    <div class="modern-card glass-card icon-spin-on-hover dividend-card">
                      <div class="dividend-icon bg-gradient-green"><i class="fa-solid fa-briefcase"></i></div>
                      <h6 class="mb-1">${yhLang("Future healthy adult workforce", "ভবিষ্যতের সুস্থ প্রাপ্তবয়স্ক কর্মশক্তি")}</h6>
                      <p class="mb-0 text-muted"></p>
                    </div>
                  </div>
                  <div class="col-md-4" data-aos="fade-up" data-aos-delay="200">
                    <div class="modern-card glass-card icon-spin-on-hover dividend-card">
                      <div class="dividend-icon bg-gradient-orange"><i class="fa-solid fa-baby"></i></div>
                      <h6 class="mb-1">${yhLang("Healthy next generation of children", "স্বাস্থ্যবান আগামী প্রজন্ম")}</h6>
                      <p class="mb-0 text-muted"></p>
                    </div>
                  </div>
                </div>

                <!-- ROI Banner -->
                <div class="modern-card glass-card my-3 roi-banner" data-aos="zoom-in" data-aos-delay="240">
                  <div class="d-flex align-items-center justify-content-between flex-wrap gap-3">
                    <div>
                      <h5 class="mb-1">${yhLang("Investing in Adolescent Health & Wellbeing", "কৈশোর স্বাস্থ্য ও সুস্থতায় বিনিয়োগ")}</h5>
                      <p class="mb-0 text-muted">${yhLang("For each US$1 invested, the return is US$5–10.", "প্রতিটি ১ ডলার বিনিয়োগে ৫–১০ ডলার পর্যন্ত ফল পাওয়া যায়।")}</p>
                    </div>
                    <div class="d-flex align-items-center gap-2 roi-chip">
                      <span class="badge-pill">US$1</span>
                      <i class="fa-solid fa-arrow-right-long"></i>
                      <span class="badge-pill">US$5–10</span>
                    </div>
                  </div>
                </div>
                <!-- Demographic Pyramid Compare -->
                <h5 class="gradient-text mt-4" data-aos="fade-up">${yhLang("Pathways to harnessing the Demographic Dividend", "জনমিতিক লভ্যাংশ কাজে লাগানোর পথসমূহ")}</h5>
                <div class="row g-3 pyramid-compare" data-aos="fade-up" data-aos-delay="80">
                  <!-- Positive Path -->
                  <div class="col-lg-12">
                   <div class="wrap-pyramid modern-card glass-card"> 
                      <div class="pyramid-path pyramid-positive">
                        <div class="pyramid-head"><i class="fa-solid fa-chart-line"></i> ${yhLang("Demographic Dividend", "জনমিতিক লভ্যাংশ")}</div>
                        <ul class="pyramid-steps">
                          <li class="pyramid-step" data-aos="fade-up" data-aos-delay="600"><i class="fa-solid fa-school"></i> ${yhLang("School", "বিদ্যালয়")}</li>
                          <li class="pyramid-step" data-aos="fade-up" data-aos-delay="900"><i class="fa-solid fa-briefcase"></i> ${yhLang("Employment", "কর্মসংস্থান")}</li>
                          <li class="pyramid-step" data-aos="fade-up" data-aos-delay="1200"><i class="fa-solid fa-piggy-bank"></i> ${yhLang("Wealth/child investment", "সম্পদ/সন্তান বিনিয়োগ")}</li>
                          <li class="pyramid-step" data-aos="fade-up" data-aos-delay="1500"><i class="fa-solid fa-graduation-cap"></i> ${yhLang("Lifelong learning", "আজীবন শিক্ষা")}</li>
                          <li class="pyramid-step" data-aos="fade-up" data-aos-delay="1800"><i class="fa-solid fa-people-arrows"></i> ${yhLang("Work-life Balance", "কর্মজীবন-ব্যক্তিজীবনের ভারসাম্য")}</li>
                          <li class="pyramid-step" data-aos="fade-up" data-aos-delay="2100"><i class="fa-solid fa-location-dot"></i> ${yhLang("Security of Place", "বাসস্থানের নিরাপত্তা")}</li>
                          <li class="pyramid-step" data-aos="fade-up" data-aos-delay="2400"><i class="fa-solid fa-hands-holding-child"></i> ${yhLang("Healthy children", "স্বাস্থ্যবান শিশু")}</li>
                          <li class="pyramid-step" data-aos="fade-up" data-aos-delay="2700"><i class="fa-solid fa-shield-heart"></i> ${yhLang("Secure old-age", "নিরাপদ বার্ধক্য")}</li>
                        </ul>
                      </div>

                      <div class="pyramid-center highlight py-3 border-rounded"><i class="fa-solid fa-person-dress"></i> ${yhLang("Adolescent Girl", "কিশোরী")}</div>
                      <!-- Negative Path -->
                      <div class="pyramid-path pyramid-negative">
                      <ul class="pyramid-steps pyramid-container">
                        <li class="pyramid-step" data-aos="fade-up" data-aos-delay="600"><i class="fa-solid fa-ring"></i> ${yhLang("Child Marriage", "বাল্যবিবাহ")}</li>
                        <li class="pyramid-step" data-aos="fade-up" data-aos-delay="900"><i class="fa-solid fa-person-walking-arrow-right"></i> ${yhLang("Leaving School", "বিদ্যালয় ছেড়ে দেওয়া")}</li>
                        <li class="pyramid-step" data-aos="fade-up" data-aos-delay="1200"><i class="fa-solid fa-helmet-safety"></i> ${yhLang("Informal work", "অনানুষ্ঠানিক কাজ")}</li>
                        <li class="pyramid-step" data-aos="fade-up" data-aos-delay="1500"><i class="fa-solid fa-rotate"></i> ${yhLang("Repeat Pregnancies", "বারবার গর্ভধারণ")}</li>
                        <li class="pyramid-step" data-aos="fade-up" data-aos-delay="1800"><i class="fa-solid fa-person-pregnant"></i> ${yhLang("Maternal morbidity", "মাতৃ অসুস্থতা")}</li>
                        <li class="pyramid-step" data-aos="fade-up" data-aos-delay="2100"><i class="fa-solid fa-child"></i> ${yhLang("Child illness & death", "শিশু অসুস্থতা ও মৃত্যু")}</li>
                        <li class="pyramid-step" data-aos="fade-up" data-aos-delay="2400"><i class="fa-solid fa-house-crack"></i> ${yhLang("Insecurity & Displacement", "অনিরাপত্তা ও বাস্তুচ্যুতি")}</li>
                        <li class="pyramid-step" data-aos="fade-up" data-aos-delay="2700"><i class="fa-solid fa-shield-halved"></i> ${yhLang("Insecure old-age", "অনিরাপদ বার্ধক্য")}</li>
                      </ul>
                      <div class="pyramid-head py-2"><i class="fa-solid fa-triangle-exclamation"></i> ${yhLang("Missed Demographic Dividend", "হারানো জনমিতিক লভ্যাংশ")}</div>
                    </div>
                  </div>                  
                </div>
                <p class="small text-muted mt-3 mb-0">${yhLang("Ref: Our Future: A Lancet Commission on Adolescent Health and Wellbeing; Patton et al. 2016.", "সূত্র: আওয়ার ফিউচার—ল্যানসেট কমিশন অন্ অ্যাডোলেসেন্ট হেলথ অ্যান্ড ওয়েলবিইং; প্যাটন প্রমুখ, ২০১৬।")}</p>

              </div>`;
            })(),
          },
          {
            id: "ch2-lesson-3",
            title: yhLang(
              "Global scenario of mortality and morbidity among young people",
              "তরুণদের মৃত্যু ও রোগভার নিয়ে বৈশ্বিক চিত্র"
            ),
            icon: "fa-globe",
            gradientClass: "bg-gradient-purple",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q2c",
                  question: yhLang(
                    "A leading cause of adolescent death includes…",
                    "কৈশোরদের মৃত্যুর প্রধান কারণগুলোর একটি হলো…"
                  ),
                  options: [
                    yhLang("Common cold", "সাধারণ সর্দি"),
                    yhLang("Road injuries", "সড়ক দুর্ঘটনা"),
                    yhLang("Allergies", "অ্যালার্জি"),
                    yhLang("None", "কোনোটিই নয়"),
                  ],
                  correctAnswer: 1,
                },
              ],
            },
            content: (function () {
              return `
              <div class="lesson-slide">
                <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang("Global scenario of mortality and morbidity among young people", "তরুণদের মৃত্যু ও রোগভার নিয়ে বৈশ্বিক চিত্র")}</h2>

                <!-- Key Global Insights -->
                <section class="my-3" data-aos="fade-up" data-aos-delay="40">
                  <h5 class="gradient-text mb-3">${yhLang("Key global insights", "গুরুত্বপূর্ণ বৈশ্বিক অন্তর্দৃষ্টি")}</h5>
                  <div class="row g-3">
                    ${[
                      {
                        icon: "fa-heart-pulse",
                        color: "bg-gradient-pink",
                        text: yhLang(
                          "Globally over <strong>1.5 million</strong> young people aged 10–24 years died in 2021 — about <strong>4500 every day</strong>.",
                          "২০২১ সালে বিশ্বব্যাপী <strong>১.৫ মিলিয়নের</strong>ও বেশি ১০–২৪ বছর বয়সী তরুণ মারা গেছে — প্রতিদিন প্রায় <strong>৪৫০০</strong> জন।"
                        ),
                      },
                      {
                        icon: "fa-shield-halved",
                        color: "bg-gradient-green",
                        text: yhLang(
                          "Young adolescents aged <strong>10–14</strong> have the <strong>lowest risk of death</strong> among all age groups.",
                          "১০–১৪ বছর বয়সী কিশোরদের মৃত্যুঝুঁকি সব বয়সের মধ্যে সবচেয়ে কম।"
                        ),
                      },
                      {
                        icon: "fa-car-burst",
                        color: "bg-gradient-orange",
                        text: yhLang(
                          "<strong>Injuries</strong> (including road traffic injuries and drowning), <strong>interpersonal violence</strong>, <strong>self-harm</strong>, and <strong>maternal conditions</strong> are leading causes of death.",
                          "<strong>সড়ক দুর্ঘটনা ও ডুবে যাওয়াসহ বিভিন্ন আঘাত</strong>, <strong>ব্যক্তি-ব্যক্তি সহিংসতা</strong>, <strong>আত্মহানি</strong> এবং <strong>মাতৃস্বাস্থ্যজনিত কারণ</strong> তরুণ মৃত্যুর প্রধান কারণ।"
                        ),
                      },
                      {
                        icon: "fa-brain",
                        color: "bg-gradient-purple",
                        text: yhLang(
                          "<strong>Half</strong> of all mental health disorders in adulthood start by <strong>age 18</strong>, but most cases are <strong>undetected</strong> and <strong>untreated</strong>.",
                          "বয়ঃপ্রাপ্তদের অর্ধেক মানসিক স্বাস্থ্য সমস্যার শুরু <strong>১৮ বছর</strong>ের মধ্যেই হয়, কিন্তু অধিকাংশই <strong>অননুমোদিত</strong> এবং <strong>চিকিৎসাবিহীন</strong> থাকে।"
                        ),
                      },
                      {
                        icon: "fa-wine-bottle",
                        color: "bg-gradient-blue",
                        text: yhLang(
                          "<strong>Early substance use</strong> is linked to higher risks of dependence and other problems in adult life; younger people are <strong>disproportionately affected</strong>.",
                          "<strong>কিশোর বয়সে নেশাজাতীয় দ্রব্যের ব্যবহার</strong> প্রাপ্তবয়সে আসক্তি ও অন্যান্য ঝুঁকি বাড়ায়; তরুণরা এ থেকে <strong>বেশি ক্ষতিগ্রস্ত</strong> হয়।"
                        ),
                      },
                    ]
                      .map(
                        (card, i) => `
                      <div class="col-md-6">
                        <div class="modern-card glass-card icon-spin-on-hover" data-aos="zoom-in" data-aos-delay="${
                          100 + i * 60
                        }">
                          <div class="d-flex flex-col align-items-start gap-3">
                            <span class="${
                              card.color
                            }" style="width:48px; height:48px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; color:#fff; flex-shrink:0;">
                              <i class="fa-solid ${card.icon}"></i>
                            </span>
                            <div>
                              <p class="mb-0">${card.text}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    `
                      )
                      .join("")}
                  </div>
                </section>

                <!-- Top 5 Leading Causes of Death -->
                <section class="my-3" data-aos="fade-up" data-aos-delay="80">
                  <h5 class="gradient-text my-3">${yhLang("Top 5 leading causes of death among adolescents are", "কৈশোরদের মৃত্যুর শীর্ষ ৫ কারণ")}</h5>
                  <div id="topCausesControls" class="d-flex gap-2 my-3">
                    <button class="btn btn-outline-primary btn-sm active" id="topCausesToggleChart"><i class="fa-solid fa-chart-bar me-1"></i> ${yhLang("Chart", "চার্ট")}</button>
                    <button class="btn btn-outline-primary btn-sm" id="topCausesToggleCards"><i class="fa-solid fa-grip me-1"></i> ${yhLang("Cards", "কার্ডস")}</button>
                  </div>
                  <div id="topCausesCards" style="display:none">
                    <div class="row g-3">
                      ${[
                        {
                          label: yhLang("Road traffic accident", "সড়ক দুর্ঘটনা"),
                          icon: "fa-car-burst",
                          color: "bg-gradient-orange",
                        },
                        {
                          label: yhLang("Suicide", "আত্মহত্যা"),
                          icon: "fa-heart-crack",
                          color: "bg-gradient-pink",
                        },
                        {
                          label: yhLang("Violence", "সহিংসতা"),
                          icon: "fa-hand-fist",
                          color: "bg-gradient-green",
                        },
                        {
                          label: yhLang(
                            "Lower Respiratory Tract infection",
                            "নিম্ন শ্বাসতন্ত্রের সংক্রমণ"
                          ),
                          icon: "fa-lungs",
                          color: "bg-gradient-blue",
                        },
                        {
                          label: yhLang("HIV/AIDS", "এইচআইভি/এইডস"),
                          icon: "fa-virus",
                          color: "bg-gradient-teal",
                        },
                      ]
                        .map(
                          (cause, i) => `
                        <div class="col-12 col-md-6 col-lg-4">
                          <div class="modern-card glass-card icon-spin-on-hover" data-aos="zoom-in" data-aos-delay="${
                            120 + i * 60
                          }">
                            <div class="d-flex align-items-center gap-3">
                              <span class="${
                                cause.color
                              }" style="width:48px; height:48px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; color:#fff; flex-shrink:0;">
                                <i class="fa-solid ${cause.icon}"></i>
                              </span>
                              <h6 class="mb-0">${cause.label}</h6>
                            </div>
                          </div>
                        </div>
                      `
                        )
                        .join("")}
                    </div>
                  </div>
                  <div id="topCausesChartWrap">
                    <div class="modern-card glass-card">
                      <div style="position:relative; height:320px;">
                        <canvas id="top5CausesChart" aria-label="Top 5 adolescent death causes (relative rank)" role="img"></canvas>
                      </div>
                    </div>
                  </div>
                </section>
              </div>`;
            })(),
          },
          {
            id: "ch2-lesson-4",
            title: yhLang(
              "Bangladesh scenario of mortality and morbidity among young people",
              "বাংলাদেশে তরুণদের মৃত্যু ও রোগভার পরিস্থিতি"
            ),
            icon: "fa-flag",
            gradientClass: "bg-gradient-blue",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q2c-bd",
                  question: yhLang(
                    "Among Bangladeshi adolescent males (10–19), which is a leading cause of death?",
                    "বাংলাদেশি কৈশোর বয়সী ছেলেদের (১০–১৯) মৃত্যুর প্রধান কারণ কোনটি?"
                  ),
                  options: [
                    yhLang("Road accidents", "সড়ক দুর্ঘটনা"),
                    yhLang("Cancer", "ক্যান্সার"),
                    yhLang("Diabetes", "ডায়াবেটিস"),
                    yhLang("Malaria", "ম্যালেরিয়া"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              return `
              <div class="lesson-slide">
                <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang("Bangladesh scenario of mortality and morbidity among young people", "বাংলাদেশে তরুণদের মৃত্যু ও রোগভার পরিস্থিতি")}</h2>

                <!-- Sex-disaggregated Top 5 Causes (UNICEF Adolescent Data Portal 2019) -->
                <section class="my-3" data-aos="fade-up" data-aos-delay="60">
                  <h5 class="gradient-text mb-3">${yhLang("According to UNICEF's 'Adolescent Data Portal 2019', the top 5 causes of death (average) for adolescents aged 10-19 in Bangladesh are:", "ইউনিসেফের ‘অ্যাডোলেসেন্ট ডাটা পোর্টাল ২০১৯’ অনুযায়ী, বাংলাদেশে ১০–১৯ বছর বয়সী কিশোর-কিশোরীদের মৃত্যুর শীর্ষ ৫ কারণ হলো:")}
                  </h5>
                  <div class="row g-3">
                    <div class="col-lg-6">
                      <div class="modern-card glass-card" data-aos="zoom-in" data-aos-delay="100">
                        <h6 class="mb-2 d-flex align-items-center gap-2"><span class="badge-pill">${yhLang("Males", "ছেলে")}</span></h6>
                        <ul class="list-unstyled d-grid gap-2 mb-0">
                          ${[
                            {
                              label: yhLang("Road accidents", "সড়ক দুর্ঘটনা"),
                              icon: "fa-car-burst",
                              color: "bg-gradient-orange",
                            },
                            {
                              label: yhLang("Diarrhea", "ডায়রিয়া"),
                              icon: "fa-bacteria",
                              color: "bg-gradient-blue",
                            },
                            {
                              label: yhLang("Drowning", "ডুবে মৃত্যু"),
                              icon: "fa-water",
                              color: "bg-gradient-teal",
                            },
                            {
                              label: yhLang("Tuberculosis", "যক্ষ্মা"),
                              icon: "fa-lungs",
                              color: "bg-gradient-purple",
                            },
                            {
                              label: yhLang("Suicide", "আত্মহত্যা"),
                              icon: "fa-heart-crack",
                              color: "bg-gradient-pink",
                            },
                          ]
                            .map(
                              (item, i) => `
                            <li class="d-flex align-items-center gap-2 icon-spin-on-hover" data-aos="fade-up" data-aos-delay="${
                              140 + i * 40
                            }">
                              <span class="${
                                item.color
                              }" style="width:36px; height:36px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; color:#fff"><i class="fa-solid ${
                                item.icon
                              }"></i></span>
                              <span>${item.label}</span>
                            </li>
                          `
                            )
                            .join("")}
                        </ul>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="modern-card glass-card" data-aos="zoom-in" data-aos-delay="120">
                        <h6 class="mb-2 d-flex align-items-center gap-2"><span class="badge-pill">${yhLang("Females", "মেয়ে")}</span></h6>
                        <ul class="list-unstyled d-grid gap-2 mb-0">
                          ${[
                            {
                              label: yhLang("Diarrhea", "ডায়রিয়া"),
                              icon: "fa-bacteria",
                              color: "bg-gradient-blue",
                            },
                            {
                              label: yhLang("Tuberculosis", "যক্ষ্মা"),
                              icon: "fa-lungs",
                              color: "bg-gradient-purple",
                            },
                            {
                              label: yhLang("Road accidents", "সড়ক দুর্ঘটনা"),
                              icon: "fa-car-burst",
                              color: "bg-gradient-orange",
                            },
                            {
                              label: yhLang("Maternal mortality", "মাতৃমৃত্যু"),
                              icon: "fa-person-pregnant",
                              color: "bg-gradient-pink",
                            },
                            {
                              label: yhLang(
                                "Lower respiratory tract infections",
                                "নিম্ন শ্বাসতন্ত্রের সংক্রমণ"
                              ),
                              icon: "fa-lungs",
                              color: "bg-gradient-green",
                            },
                          ]
                            .map(
                              (item, i) => `
                            <li class="d-flex align-items-center gap-2 icon-spin-on-hover" data-aos="fade-up" data-aos-delay="${
                              160 + i * 40
                            }">
                              <span class="${
                                item.color
                              }" style="width:36px; height:36px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; color:#fff"><i class="fa-solid ${
                                item.icon
                              }"></i></span>
                              <span>${item.label}</span>
                            </li>
                          `
                            )
                            .join("")}
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                <!-- Doughnut charts: Adolescents vs Young adults -->
                <section class="my-3" data-aos="fade-up" data-aos-delay="80">
                  <h5 class="gradient-text mb-3">${yhLang("Adolescent and young adult mortality in Bangladesh", "বাংলাদেশে কিশোর ও তরুণ প্রাপ্তবয়স্কদের মৃত্যুর চিত্র")}</h5>
                  <div class="row g-3 align-items-stretch">
                    <div class="col-md-6">
                      <div class="modern-card glass-card h-100">
                        <div class="d-flex align-items-center justify-content-between mb-2">
                          <span class="badge-pill">${yhLang("Adolescents (10–19)", "কিশোর-কিশোরী (১০–১৯)")}</span>
                        </div>
                        <div style="position:relative; height:320px;">
                          <canvas id="bdMortalityAdolescents" aria-label="Adolescent mortality distribution (relative)" role="img"></canvas>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="modern-card glass-card h-100">
                        <div class="d-flex align-items-center justify-content-between mb-2">
                          <span class="badge-pill">${yhLang("Young adults (20–24)", "তরুণ প্রাপ্তবয়স্ক (২০–২৪)")}</span>
                        </div>
                        <div style="position:relative; height:320px;">
                          <canvas id="bdMortalityYoungAdults" aria-label="Young adult mortality distribution (relative)" role="img"></canvas>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- <div class="small text-muted mt-2">Note: Chart shows relative emphasis for categories; update with official proportions when available.</div> -->

                  <!-- Legend with icons -->
                  <div class="d-flex flex-wrap gap-2 mt-2 d-none">
                    ${[
                      {
                        label: "Heart disease",
                        icon: "fa-heart",
                        color: "bg-gradient-pink",
                      },
                      {
                        label: "Stroke",
                        icon: "fa-brain",
                        color: "bg-gradient-purple",
                      },
                      {
                        label: "Respiratory",
                        icon: "fa-lungs",
                        color: "bg-gradient-blue",
                      },
                      {
                        label: "Infection",
                        icon: "fa-virus",
                        color: "bg-gradient-green",
                      },
                      {
                        label: "Cancer",
                        icon: "fa-ribbon",
                        color: "bg-gradient-orange",
                      },
                      {
                        label: "Obstetric",
                        icon: "fa-person-pregnant",
                        color: "bg-gradient-pink",
                      },
                      {
                        label: "Road traffic",
                        icon: "fa-car-burst",
                        color: "bg-gradient-tangerine",
                      },
                      {
                        label: "Drowning & accidents",
                        icon: "fa-water",
                        color: "bg-gradient-teal",
                      },
                      {
                        label: "Other",
                        icon: "fa-circle-dot",
                        color: "bg-gradient-blue",
                      },
                    ]
                      .map(
                        (l) => `
                      <span class="badge-pill" title="${l.label}"><i class="fa-solid ${l.icon} me-1"></i>${l.label}</span>
                    `
                      )
                      .join("")}
                  </div>
                </section>
              </div>`;
            })(),
          },
          {
            id: "ch2-lesson-5",
            title: yhLang(
              "Child marriage and teenage pregnancies",
              "বাল্যবিবাহ ও কিশোরী মাতৃত্ব"
            ),
            icon: "fa-child-reaching",
            gradientClass: "bg-gradient-orange",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q2d",
                  question: yhLang(
                    "Ending child marriage helps protect…",
                    "বাল্যবিবাহ বন্ধ করলে কী সুরক্ষিত হয়?"
                  ),
                  options: [
                    yhLang("Education and health", "শিক্ষা ও স্বাস্থ্য"),
                    yhLang("Only sports", "শুধু খেলাধুলা"),
                    yhLang("Only economy", "শুধু অর্থনীতি"),
                    yhLang("None", "কিছুই নয়"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: `
              <div class="lesson-slide">
                <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang("Child marriage and teenage pregnancies", "বাল্যবিবাহ ও কিশোরী মাতৃত্ব")}</h2>

                <!-- Special info badge -->
                <div class="fact-card alert-warning hover-lift-sm transition-base icon-spin-on-hover mb-3" data-aos="fade-up" data-aos-delay="60">
                  <i class="fas fa-ranking-star" aria-hidden="true"></i>
                  <p class="mb-0">${yhLang("Bangladesh is among the <strong>top 10 countries</strong> with the highest levels of child marriage.", "বাল্যবিবাহের হার সবচেয়ে বেশি যে <strong>শীর্ষ ১০টি দেশে</strong> বাংলাদেশ সেগুলোর একটি।")}</p>
                </div>

                <!-- FIG.4: Graph chart section -->
                <section class="mb-4" aria-labelledby="cm-figure4-title">
                  <h3 class="gradient-text py-2" id="cm-figure4-title" data-aos="fade-up" data-aos-delay="80">${yhLang("Percentage of women (20–24) first married/union before age 18", "২০–২৪ বছর বয়সী যে নারীরা ১৮ পূর্ণ হওয়ার আগে বিয়ে/সম্পর্কে জড়িয়েছেন তাদের শতকরা হার")}</h3>
                  <div class="row g-3 align-items-stretch">
                    <div class="col-lg-12" data-aos="fade-right" data-aos-delay="100">
                      <article class="modern-card" style="height:500px">
                        <canvas id="cmFigure4Chart" aria-label="Child marriage before 18: Bangladesh vs South Asia vs World" role="img"></canvas>
                      </article>
                    </div>
                    <div class="col-lg-12" data-aos="fade-left" data-aos-delay="120">
                      <article class="modern-card h-100 d-flex flex-column">
                        <div class="d-flex flex-wrap gap-2">
                          ${[
                            {
                              label: "Bangladesh",
                              icon: "fa-flag",
                              color: "bg-gradient-pink",
                            },
                            {
                              label: "Nepal",
                              icon: "fa-mountain",
                              color: "bg-gradient-orange",
                            },
                            {
                              label: "Afghanistan",
                              icon: "fa-earth-asia",
                              color: "bg-gradient-violet",
                            },
                            {
                              label: "India",
                              icon: "fa-landmark",
                              color: "bg-gradient-blue",
                            },
                            {
                              label: "Bhutan",
                              icon: "fa-hill-rockslide",
                              color: "bg-gradient-teal",
                            },
                            {
                              label: "Pakistan",
                              icon: "fa-mosque",
                              color: "bg-gradient-tangerine",
                            },
                            {
                              label: "Sri Lanka",
                              icon: "fa-umbrella-beach",
                              color: "bg-gradient-emerald",
                            },
                            {
                              label: "Maldives",
                              icon: "fa-water",
                              color: "bg-gradient-emerald",
                            },
                            {
                              label: "South Asia (region)",
                              icon: "fa-globe-asia",
                              color: "bg-gradient-purple",
                            },
                            {
                              label: "World",
                              icon: "fa-earth-americas",
                              color: "bg-gradient-green",
                            },
                          ]
                            .map(
                              (c) => `
                            <span class="d-none badge-pill ${c.color}" title="${c.label}"><i class="fa-solid ${c.icon} me-1"></i>${c.label}</span>
                          `
                            )
                            .join("")}
                        </div>
                        <p class="small text-muted mt-3 mb-0">${yhLang("Note: Chart shows available values for Bangladesh (51%), South Asia (29%) and World (20%). Country-level values for other South Asian nations can be added when verified.", "নোট: এই চার্টে বাংলাদেশ (৫১%), দক্ষিণ এশিয়া (২৯%) এবং বিশ্ব (২০%) এর উপলব্ধ পরিসংখ্যান দেখানো হয়েছে। নির্ভরযোগ্য তথ্য পাওয়া গেলে অন্যান্য দক্ষিণ এশীয় দেশের মান যোগ করা যাবে।")}</p>
                      </article>
                    </div>
                  </div>
                </section>

                <!-- KEY FACTS -->
                <section aria-labelledby="cm-keyfacts-title">
                  <h3 class="d-none gradient-text mb-1" id="cm-keyfacts-title" data-aos="fade-up" data-aos-delay="140">KEY FACTS</h3>
                  <p class="d-none text-muted mb-3" data-aos="fade-up" data-aos-delay="160">About child marriage in Bangladesh</p>
                  <div class="row g-3">
                    <div class="key-img py-2" style="border-radius: 20px;" data-aos="zoom-in" data-aos-delay="180">
                      <img src="img/Child-marraige/child-marriage-bangladesh.png" alt="Key Facts" class="img-fluid rounded-4 img-zoom" />
                    </div>
                    <div class="key-img py-2" style="border-radius: 20px;" data-aos="zoom-in" data-aos-delay="180">
                      <img src="img/Child-marraige/childbearing.jpg" alt="Key Facts" class="img-fluid rounded-4 img-zoom" />
                    </div>
                    <!--
                    <div class="col-md-6 col-lg-4" data-aos="zoom-in" data-aos-delay="180">
                      <div class="fact-card alert-info hover-lift-sm transition-base">
                        <i class="fas fa-children" aria-hidden="true"></i>
                        <p class="mb-0"><strong>38 million</strong> child brides live in Bangladesh; <strong>13 million</strong> married before age 15.</p>
                      </div>
                    </div>
                    <div class="col-md-6 col-lg-4" data-aos="zoom-in" data-aos-delay="200">
                      <div class="fact-card alert-primary hover-lift-sm transition-base">
                        <i class="fas fa-percent" aria-hidden="true"></i>
                        <p class="mb-0"><strong>51%</strong> of young women were married before their 18th birthday.</p>
                      </div>
                    </div>
                    <div class="col-md-6 col-lg-4" data-aos="zoom-in" data-aos-delay="220">
                      <div class="fact-card alert-warning hover-lift-sm transition-base">
                        <i class="fas fa-ranking-star" aria-hidden="true"></i>
                        <p class="mb-0">Bangladesh ranks among the <strong>top 10</strong> countries globally for child marriage.</p>
                      </div>
                    </div>
                    <div class="col-md-6 col-lg-4" data-aos="zoom-in" data-aos-delay="240">
                      <div class="fact-card alert-secondary hover-lift-sm transition-base">
                        <i class="fas fa-school" aria-hidden="true"></i>
                        <p class="mb-0">Risk factors include rural residence, poverty, and lower than secondary education.</p>
                      </div>
                    </div>
                    <div class="col-md-6 col-lg-4" data-aos="zoom-in" data-aos-delay="260">
                      <div class="fact-card alert-danger hover-lift-sm transition-base">
                        <i class="fas fa-user-graduate" aria-hidden="true"></i>
                        <p class="mb-0">Married girls are <strong>4×</strong> more likely to be out of school than unmarried girls.</p>
                      </div>
                    </div>
                    <div class="col-md-6 col-lg-4" data-aos="zoom-in" data-aos-delay="280">
                      <div class="fact-card alert-success hover-lift-sm transition-base">
                        <i class="fas fa-baby" aria-hidden="true"></i>
                        <p class="mb-0">Nearly <strong>5 in 10</strong> child brides gave birth before 18; <strong>8 in 10</strong> before 20.</p>
                      </div>
                    </div>
                    <div class="col-md-6 col-lg-4" data-aos="zoom-in" data-aos-delay="300">
                      <div class="fact-card alert-success hover-lift-sm transition-base">
                        <i class="fas fa-arrow-trend-down" aria-hidden="true"></i>
                        <p class="mb-0">Child marriage is less common today than in previous generations.</p>
                      </div>
                    </div>
                    <div class="col-md-6 col-lg-4" data-aos="zoom-in" data-aos-delay="320">
                      <div class="fact-card alert-secondary hover-lift-sm transition-base">
                        <i class="fas fa-chart-line" aria-hidden="true"></i>
                        <p class="mb-0">Declines seen across wealth groups, with faster progress among the richest.</p>
                      </div>
                    </div>
                    <div class="col-md-6 col-lg-4" data-aos="zoom-in" data-aos-delay="340">
                      <div class="fact-card alert-primary hover-lift-sm transition-base">
                        <i class="fas fa-bullseye" aria-hidden="true"></i>
                        <p class="mb-0">To meet national (2041) and SDG (2030) targets, progress must accelerate by <strong>8×</strong> and <strong>17×</strong>, respectively.</p>
                      </div>
                    </div> -->
                  </div>
                </section>
              </div>`,
          },
          {
            id: "ch2-lesson-6",
            title: yhLang(
              "Adolescent health related issues",
              "কৈশোর স্বাস্থ্য সম্পর্কিত চ্যালেঞ্জ"
            ),
            icon: "fa-circle-nodes",
            gradientClass: "bg-gradient-cyan",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q2d-issues",
                  question: yhLang(
                    "Improving adolescent health requires…",
                    "কৈশোর স্বাস্থ্য উন্নত করতে কী প্রয়োজন?"
                  ),
                  options: [
                    yhLang("Single-sector approach", "একক খাতভিত্তিক পদ্ধতি"),
                    yhLang(
                      "Rights-based, multisectoral action",
                      "অধিকারভিত্তিক বহুখাতীয় উদ্যোগ"
                    ),
                    yhLang("Ignoring evidence", "তথ্যকে উপেক্ষা করা"),
                    yhLang("Only services", "শুধু পরিষেবা"),
                  ],
                  correctAnswer: 1,
                },
              ],
            },
            content: (function () {
              const healthStats = [
                yhLang(
                  '<span class="stat-chip"><span class="value">12.6</span><span class="unit">%</span></span> children and adolescents (7–17 years) live with a diagnosable mental health condition.',
                  '<span class="stat-chip"><span class="value">১২.৬</span><span class="unit">%</span></span> শিশু-কিশোর (৭–১৭ বছর) নির্ণয়যোগ্য মানসিক স্বাস্থ্য সমস্যায় ভোগে।'
                ),
                yhLang(
                  'NCD risk factors: <span class="stat-chip"><span class="value">14</span><span class="unit">%</span></span> had one risk, <span class="stat-chip"><span class="value">22</span><span class="unit">%</span></span> had two, <span class="stat-chip"><span class="value">29</span><span class="unit">%</span></span> had three, and <span class="stat-chip"><span class="value">34</span><span class="unit">%</span></span> lived with four or more.',
                  'এনসিডি ঝুঁকি: <span class="stat-chip"><span class="value">১৪</span><span class="unit">%</span></span> কিশোর একটি ঝুঁকিতে, <span class="stat-chip"><span class="value">২২</span><span class="unit">%</span></span> দুটিতে, <span class="stat-chip"><span class="value">২৯</span><span class="unit">%</span></span> তিনটিতে এবং <span class="stat-chip"><span class="value">৩৪</span><span class="unit">%</span></span> চার বা ততোধিক ঝুঁকিতে রয়েছে।'
                ),
                yhLang(
                  'Substance use prevalence among 12–17 years stands at <span class="stat-chip"><span class="value">1.5</span><span class="unit">%</span></span>.',
                  '১২–১৭ বছর বয়সী কিশোরদের মধ্যে নেশাজাতীয় দ্রব্য ব্যবহারের হার <span class="stat-chip"><span class="value">১.৫</span><span class="unit">%</span></span>।'
                ),
                yhLang(
                  'Road traffic injuries cause nearly <span class="stat-chip"><span class="value">10</span><span class="unit">%</span></span> of adolescent deaths; students account for over <span class="stat-chip"><span class="value">16</span><span class="unit">%</span></span> of fatalities.',
                  'সড়ক দুর্ঘটনায় কিশোর মৃত্যুর প্রায় <span class="stat-chip"><span class="value">১০</span><span class="unit">%</span></span> ঘটে; নিহতদের মধ্যে শিক্ষার্থীর অনুপাত <span class="stat-chip"><span class="value">১৬</span><span class="unit">%</span></span>-এর বেশি।'
                ),
                yhLang(
                  'Internet addiction affects <span class="stat-chip"><span class="value">24.1</span><span class="unit">%</span></span> adolescents aged 13–19 years.',
                  '১৩–১৯ বছর বয়সী কিশোরদের মধ্যে ইন্টারনেট আসক্তির হার <span class="stat-chip"><span class="value">২৪.১</span><span class="unit">%</span></span>।'
                ),
              ];

              const nutritionStats = [
                yhLang(
                  'Stunting: one-third of girls are stunted (<span class="stat-chip"><span class="value">36</span><span class="unit">%</span></span> ever married, <span class="stat-chip"><span class="value">32</span><span class="unit">%</span></span> unmarried) versus <span class="stat-chip"><span class="value">22</span><span class="unit">%</span></span> of unmarried boys.',
                  'খাটো বৃদ্ধি: প্রতি তিনজন কিশোরীর একজন খর্বাকৃতি (<span class="stat-chip"><span class="value">৩৬</span><span class="unit">%</span></span> বিবাহিত, <span class="stat-chip"><span class="value">৩২</span><span class="unit">%</span></span> অবিবাহিতা) যেখানে অবিবাহিত ছেলেদের মাত্র <span class="stat-chip"><span class="value">২২</span><span class="unit">%</span></span>।'
                ),
                yhLang(
                  'Underweight: only <span class="stat-chip"><span class="value">4</span><span class="unit">%</span></span> ever-married and <span class="stat-chip"><span class="value">8</span><span class="unit">%</span></span> unmarried girls vs. <span class="stat-chip"><span class="value">11</span><span class="unit">%</span></span> boys.',
                  'কম ওজন: বিবাহিত কিশোরীর মাত্র <span class="stat-chip"><span class="value">৪</span><span class="unit">%</span></span> ও অবিবাহিতা <span class="stat-chip"><span class="value">৮</span><span class="unit">%</span></span> কম ওজনে; অবিবাহিত ছেলেদের মধ্যে হার <span class="stat-chip"><span class="value">১১</span><span class="unit">%</span></span>।'
                ),
                yhLang(
                  'Overweight: <span class="stat-chip"><span class="value">16</span><span class="unit">%</span></span> ever-married girls, <span class="stat-chip"><span class="value">10</span><span class="unit">%</span></span> unmarried girls, and <span class="stat-chip"><span class="value">9</span><span class="unit">%</span></span> unmarried boys.',
                  'অধিক ওজন: বিবাহিত কিশোরীর <span class="stat-chip"><span class="value">১৬</span><span class="unit">%</span></span>, অবিবাহিতা <span class="stat-chip"><span class="value">১০</span><span class="unit">%</span></span> ও অবিবাহিত ছেলেদের <span class="stat-chip"><span class="value">৯</span><span class="unit">%</span></span>।'
                ),
                yhLang(
                  'Anaemia: nearly <span class="stat-chip"><span class="value">30</span><span class="unit">%</span></span> adolescents are anaemic.',
                  'রক্তস্বল্পতা: প্রায় <span class="stat-chip"><span class="value">৩০</span><span class="unit">%</span></span> কিশোর-কিশোরী রক্তস্বল্পতায় ভোগে।'
                ),
              ];

              const educationStats = [
                yhLang(
                  'Secondary Gross Enrolment Ratio stands at <span class="stat-chip"><span class="value">74.81</span><span class="unit">%</span></span>.',
                  'মাধ্যমিক মোট ভর্তি হার (GER) <span class="stat-chip"><span class="value">৭৪.৮১</span><span class="unit">%</span></span>।'
                ),
                yhLang(
                  'Net Enrolment Rate is <span class="stat-chip"><span class="value">72.20</span><span class="unit">%</span></span>.',
                  'শুদ্ধ ভর্তি হার (NER) <span class="stat-chip"><span class="value">৭২.২০</span><span class="unit">%</span></span>।'
                ),
                yhLang(
                  'Secondary completion rate reaches <span class="stat-chip"><span class="value">65.1</span><span class="unit">%</span></span>.',
                  'মাধ্যমিক সমাপ্তির হার <span class="stat-chip"><span class="value">৬৫.১</span><span class="unit">%</span></span>।'
                ),
                yhLang(
                  'Dropout rate remains high at <span class="stat-chip"><span class="value">32.85</span><span class="unit">%</span></span>.',
                  'পড়ালেখা থেকে ঝরে পড়ার হার <span class="stat-chip"><span class="value">৩২.৮৫</span><span class="unit">%</span></span>।'
                ),
              ];

              const protectionStats = [
                yhLang(
                  '<span class="stat-chip"><span class="value">1</span>/<span class="value">5</span></span> adolescent girls/women experience physical or sexual violence irrespective of marital status.',
                  'বিয়ে হয়েছে কি-না বিবেচনা না করেই প্রতি <span class="stat-chip"><span class="value">৫</span></span> কিশোরী/নারীর মধ্যে <span class="stat-chip"><span class="value">১</span></span> জন শারীরিক বা যৌন সহিংসতার শিকার।'
                ),
                yhLang(
                  '<span class="stat-chip"><span class="value">77</span><span class="unit">%</span></span> married adolescent girls report intimate partner violence.',
                  '<span class="stat-chip"><span class="value">৭৭</span><span class="unit">%</span></span> বিবাহিত কিশোরী স্বামীর সহিংসতার শিকার।'
                ),
                yhLang(
                  'About <span class="stat-chip"><span class="value">1.78</span><span class="unit">M</span></span> adolescents remain in child labour.',
                  'প্রায় <span class="stat-chip"><span class="value">১.৭৮</span><span class="unit">মিলিয়ন</span></span> কিশোর-কিশোরী শিশুশ্রমে নিযুক্ত।'
                ),
                yhLang(
                  'During monsoon <span class="stat-chip"><span class="value">40</span><span class="unit">/day</span></span> children drown (~<span class="stat-chip"><span class="value">14,000</span></span> annually).',
                  'বর্ষায় প্রতিদিন গড়ে <span class="stat-chip"><span class="value">৪০</span><span class="unit">জন</span></span> শিশু ডুবে মারা যায়; বছরে প্রায় <span class="stat-chip"><span class="value">১৪,০০০</span></span> জন।'
                ),
                yhLang(
                  'Around <span class="stat-chip"><span class="value">89</span><span class="unit">%</span></span> children (~<span class="stat-chip"><span class="value">45</span><span class="unit">M</span></span>) experience violent discipline at home.',
                  'মোট শিশুদের <span class="stat-chip"><span class="value">৮৯</span><span class="unit">%</span></span> (প্রায় <span class="stat-chip"><span class="value">৪৫</span><span class="unit">মিলিয়ন</span></span>) ঘরে সহিংস শাসনের শিকার।'
                ),
              ];

              const domainCards = [
                {
                  icon: "fa-solid fa-heart-pulse",
                  label: yhLang("Health", "স্বাস্থ্য"),
                },
                {
                  icon: "fa-solid fa-utensils",
                  label: yhLang("Nutrition", "পুষ্টি"),
                },
                {
                  icon: "fa-solid fa-graduation-cap",
                  label: yhLang("Education", "শিক্ষা"),
                },
                {
                  icon: "fa-solid fa-shield-heart",
                  label: yhLang("Protection", "সুরক্ষা"),
                },
              ];

              const renderList = (items) => items.map((text) => `<li>${text}</li>`).join("");

              return `
              <div class="lesson-slide">
                <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang("Adolescent health related issues", "কৈশোর স্বাস্থ্য সম্পর্কিত চ্যালেঞ্জ")}</h2>

                <div class="fact-card alert-info hover-lift-sm transition-base icon-spin-on-hover mb-3" data-aos="fade-up" data-aos-delay="60">
                  <i class="fas fa-lightbulb" aria-hidden="true"></i>
                  <p class="mb-0">${yhLang("Actions to improve adolescent health and wellbeing need to address established and emerging determinants and <strong>meaningfully engage</strong> with adolescents and young people.", "কৈশোর স্বাস্থ্য ও সুস্থতা উন্নত করতে বিদ্যমান ও নতুন নির্ধারকগুলো মোকাবিলা করতে হবে এবং কিশোর-কিশোরীদের <strong>অর্থবহভাবে সম্পৃক্ত</strong> করতে হবে।")}</p>
                </div>

                <section class="issue-matrix" aria-labelledby="issue-matrix-title">
                  <h3 id="issue-matrix-title" class="mb-3 gradient-text" data-aos="fade-up" data-aos-delay="80">${yhLang("Key domains", "মূল ক্ষেত্র")}</h3>
                  <div class="row shadow-sm rounded-4 overflow-hidden">
                    <div class="health row g-1">
                      <div class="col-md-6" data-aos="zoom-in" data-aos-delay="100">
                        <article class="issue-panel">
                          <ul class="stat-list">${renderList(healthStats)}</ul>
                        </article>
                      </div>
                      <div class="col-md-6" data-aos="zoom-in" data-aos-delay="120">
                        <article class="issue-panel">
                          <ul class="stat-list">${renderList(nutritionStats)}</ul>
                        </article>
                      </div>
                    </div>

                    <div class="issue-cross-wrapper" data-aos="zoom-in" data-aos-delay="130">
                      <div class="issue-cross-lines" aria-hidden="true">
                        <span class="issue-cross-line issue-cross-line--vertical"></span>
                        <span class="issue-cross-line issue-cross-line--horizontal"></span>
                      </div>
                      <div class="issue-cross-grid">
                        ${domainCards
                          .map(
                            (card) => `
                              <article class="issue-cross-card">
                                <span class="issue-icon"><i class="${card.icon}"></i></span>
                                <h6 class="issue-title">${card.label}</h6>
                              </article>
                            `
                          )
                          .join("")}
                      </div>
                    </div>

                    <div class="education row g-1">
                      <div class="col-md-6" data-aos="zoom-in" data-aos-delay="140">
                        <article class="issue-panel">
                          <ul class="stat-list">${renderList(educationStats)}</ul>
                        </article>
                      </div>
                      <div class="col-md-6" data-aos="zoom-in" data-aos-delay="160">
                        <article class="issue-panel">
                          <ul class="stat-list">${renderList(protectionStats)}</ul>
                        </article>
                      </div>
                    </div>
                  </div>
                  <div class="panel-source small"><i class="fa-solid fa-book-open me-1"></i>${yhLang("Source: add citation(s)", "সূত্র: উদ্ধৃতি যুক্ত করুন")}</div>
                </section>
              </div>`;
            })(),
          },
          {
            id: "ch2-lesson-7",
            title: yhLang(
              "Determinants for adolescent health and well-being",
              "কৈশোর স্বাস্থ্য ও সুস্থতার নির্ধারক"
            ),
            icon: "fa-triangle-exclamation",
            gradientClass: "bg-gradient-pink",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q2e",
                  question: yhLang(
                    "Determinants include…",
                    "নির্ধারকগুলো কী কী অন্তর্ভুক্ত করে?"
                  ),
                  options: [
                    yhLang("Only nutrition", "শুধু পুষ্টি"),
                    yhLang("Multiple domains", "বহু ক্ষেত্র"),
                    yhLang("Only activity", "শুধু শারীরিক কার্যক্রম"),
                    yhLang("None", "কোনোটিই নয়"),
                  ],
                  correctAnswer: 1,
                },
              ],
            },
            content: (function () {
              const determinantCards = [
                {
                  label: yhLang("Unintentional injury", "অনিচ্ছাকৃত আঘাত"),
                  icon: "fa-car-burst",
                  color: "bg-gradient-orange",
                  delay: 140,
                },
                {
                  label: yhLang("Violence", "সহিংসতা"),
                  icon: "fa-hand-back-fist",
                  color: "bg-gradient-pink",
                  delay: 160,
                },
                {
                  label: yhLang("SRH, HIV & STIs", "যৌন ও প্রজনন স্বাস্থ্য, এইচআইভি ও এসটিআই"),
                  icon: "fa-venus-mars",
                  color: "bg-gradient-violet",
                  delay: 180,
                },
                {
                  label: yhLang("Communicable diseases", "সংক্রামক রোগ"),
                  icon: "fa-virus",
                  color: "bg-gradient-green",
                  delay: 200,
                },
                {
                  label: yhLang("Non-communicable diseases", "অসংক্রামক রোগ"),
                  icon: "fa-heart-pulse",
                  color: "bg-gradient-emerald",
                  delay: 220,
                },
                {
                  label: yhLang("Mental health", "মানসিক স্বাস্থ্য"),
                  icon: "fa-brain",
                  color: "bg-gradient-blue",
                  delay: 240,
                },
                {
                  label: yhLang("Alcohol & drug use", "মদ ও মাদক ব্যবহার"),
                  icon: "fa-wine-bottle",
                  color: "bg-gradient-tangerine",
                  delay: 260,
                },
                {
                  label: yhLang("Tobacco use", "তামাক সেবন"),
                  icon: "fa-smoking",
                  color: "bg-gradient-teal",
                  delay: 280,
                },
                {
                  label: yhLang("Physical activity & sedentary behavior", "শারীরিক পরিশ্রম ও স্থবির জীবনধারা"),
                  icon: "fa-person-running",
                  color: "bg-gradient-cyan",
                  delay: 300,
                },
                {
                  label: yhLang("Nutrition", "পুষ্টি"),
                  icon: "fa-utensils",
                  color: "bg-gradient-purple",
                  delay: 320,
                },
              ];

              const determinantStrata = [
                {
                  title: yhLang("Structural & environmental", "কাঠামোগত ও পরিবেশগত"),
                  icon: "fa-city",
                  color: "bg-gradient-purple",
                  bullets: [
                    yhLang("Urban density, climate shocks, conflict and displacement shape exposure to health risks.", "নগরের ঘনত্ব, জলবায়ু আঘাত, সংঘাত ও বাস্তুচ্যুতি স্বাস্থ্যঝুঁকির মুখোমুখি হওয়া বাড়ায়।"),
                    yhLang("Gender norms, poverty, and digital divides decide who accesses information.", "লিঙ্গভিত্তিক নিয়ম, দারিদ্র্য ও ডিজিটাল বৈষম্য তথ্যপ্রাপ্তি নির্ধারণ করে।"),
                    yhLang("Policy coherence across education, labour, transport and justice keeps adolescents safe.", "শিক্ষা, শ্রম, পরিবহন ও বিচার খাতে নীতিসামঞ্জস্য কিশোরদের নিরাপদ রাখে।"),
                  ],
                },
                {
                  title: yhLang("Household & community", "পরিবার ও সম্প্রদায়"),
                  icon: "fa-people-group",
                  color: "bg-gradient-emerald",
                  bullets: [
                    yhLang("Parenting style, peer influence and safe schools determine protection from violence.", "পিতামাতার আচরণ, সহপাঠী প্রভাব ও নিরাপদ বিদ্যালয় সহিংসতা থেকে সুরক্ষা দেয়।"),
                    yhLang("Trusted gatekeepers improve referrals to SRHR, nutrition and mental health services.", "বিশ্বস্ত অভিভাবক ও নেতৃবৃন্দ এসআরএইচআর, পুষ্টি ও মানসিক স্বাস্থ্য সেবায় রেফারাল বাড়ায়।"),
                    yhLang("Community clubs and digital spaces build solidarity and positive norms.", "সম্প্রদায়ভিত্তিক ক্লাব ও ডিজিটাল প্ল্যাটফর্ম সংহতি ও ইতিবাচক সামাজিক মান গড়ে তোলে।"),
                  ],
                },
                {
                  title: yhLang("Individual agency", "ব্যক্তিগত সক্ষমতা"),
                  icon: "fa-user-graduate",
                  color: "bg-gradient-blue",
                  bullets: [
                    yhLang("Body literacy, consent skills and coping mechanisms help adolescents act early.", "দেহ-জ্ঞান, সম্মতির দক্ষতা ও মোকাবিলা কৌশল কিশোরকে দ্রুত পদক্ষেপ নিতে সহায়তা করে।"),
                    yhLang("Healthy behaviours—balanced diet, movement, digital hygiene—need supportive ecosystems.", "স্বাস্থ্যকর আচরণ—সুষম খাদ্য, নড়াচড়া, ডিজিটাল নিরাপত্তা—সহায়ক পরিবেশ ছাড়া সম্ভব নয়।"),
                    yhLang("Access to age-appropriate commodities (iron, contraception, safety gear) completes the loop.", "বয়সোপযোগী সামগ্রী (আয়রন, গর্ভনিরোধক, সুরক্ষা সরঞ্জাম) সহজলভ্য হলে চক্র পূর্ণ হয়।"),
                  ],
                },
              ];

              const systemActions = [
                yhLang("Integrated surveillance & data sharing", "সমন্বিত নজরদারি ও তথ্য বিনিময়"),
                yhLang("Youth-led accountability platforms", "তরুণ নেতৃত্বাধীন জবাবদিহি প্ল্যাটফর্ম"),
                yhLang("Primary care readiness for SRHR & NCDs", "এসআরএইচআর ও এনসিডি সেবায় প্রাথমিক স্বাস্থ্যব্যবস্থার প্রস্তুতি"),
                yhLang("Social protection linkages (stipends, cash transfers)", "সামাজিক সুরক্ষা সংযোগ (ভাতা, নগদ সহায়তা)"),
                yhLang("Safe digital ecosystems & media literacy", "নিরাপদ ডিজিটাল পরিবেশ ও গণমাধ্যম সাক্ষরতা"),
              ];

              const renderBullets = (items) => items.map((item) => `<li>${item}</li>`).join("");

              return `
              <div class="lesson-slide">
                <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang("Determinants for adolescent health and well-being", "কৈশোর স্বাস্থ্য ও সুস্থতার নির্ধারক")}</h2>

                <p class="text-muted" data-aos="fade-up" data-aos-delay="40">${yhLang("AA-HA! 2.0 groups determinants so programmes can tackle biological, social and digital pressures at the same time.", "এএ-এইচএ! ২.০ নির্ধারকগুলোকে এমনভাবে সাজায় যাতে কর্মসূচি একযোগে জৈবিক, সামাজিক ও ডিজিটাল চাপে কাজ করতে পারে।")}</p>

                <section class="mb-4 p-3 p-md-4 rounded-4" style="background: linear-gradient(135deg, rgba(99,102,241,0.10), rgba(16,185,129,0.10)); border: 1px solid rgba(0,0,0,0.06);" aria-labelledby="aa-ha-title">
                  <div class="row g-3 align-items-center">
                    <div class="col-md-6" data-aos="fade-left" data-aos-delay="80">
                      <h3 class="mb-3 gradient-text" id="determinants-title" data-aos="fade-up" data-aos-delay="120">${yhLang("Key determinant clusters", "প্রধান নির্ধারক গুচ্ছ")}</h3>
                      <div class="row g-3">
                        ${determinantCards
                          .map(
                            (d) => `
                          <div class="col-sm-6 col-md-6 col-lg-6" data-aos="zoom-in" data-aos-delay="${d.delay}">
                            <div class="component-card hover-lift-sm hover-shadow-glow transition-base">
                              <div class="component-icon ${d.color} animate-float" aria-hidden="true">
                                <i class="fas ${d.icon}"></i>
                              </div>
                              <h6 class="mt-2 mb-0">${d.label}</h6>
                            </div>
                          </div>
                        `
                          )
                          .join("")}
                      </div>
                    </div>
                    <div class="col-md-6" data-aos="fade-right" data-aos-delay="60">
                      <figure class="image-card"><img src="img/determinants/determinants.png" style="max-height: 900px;" alt="AA-HA! guidance"></figure>
                    </div>
                  </div>
                </section>

              </div>`;
            })(),
          },
          {
            id: "ch2-lesson-8",
            title: yhLang(
              "Why young people need special care?",
              "তরুণদের বিশেষ যত্ন কেন প্রয়োজন?"
            ),
            icon: "fa-user-nurse",
            gradientClass: "bg-gradient-teal",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q2f",
                  question: yhLang(
                    "Adolescent services should be…",
                    "কৈশোরবান্ধব সেবা কেমন হওয়া উচিত?"
                  ),
                  options: [
                    yhLang("Judgmental", "বিচারমূলক"),
                    yhLang("Exclusive", "সংকীর্ণ"),
                    yhLang(
                      "Non-judgmental and confidential",
                      "নিরপেক্ষ ও গোপনীয়"
                    ),
                    yhLang("Irregular", "অনিয়মিত"),
                  ],
                  correctAnswer: 2,
                },
              ],
            },
            content: (function () {
              const barrierCards = [
                {
                  title: yhLang("Adolescents have diverse needs", "কিশোরদের চাহিদা বহুবিধ"),
                  desc: yhLang("Needs in SRHR, mental health and other NCDs, nutrition,  violence against adolescents, vulnerable adolescents etc.", "এসআরএইচআর, মানসিক স্বাস্থ্য, এনসিডি, পুষ্টি ও সুরক্ষাসহ চলমান কিশোরদের জন্য উপযোগী প্যাকেজ দরকার।"),
                  icon: "fa-layer-group",
                  color: "bg-gradient-violet",
                  delay: 100,
                },
                {
                  title: yhLang("Unaware of the laws, policies, rights", "আইন ও অধিকারের সম্পর্কে সীমিত ধারণা"),
                  desc: yhLang("Sexual and reproductive health rights, Child rights.", "এসআরএইচআর, শিশুর অধিকার ও সাইবার সুরক্ষা সম্পর্কিত বিধান অনেক কিশোর ও অভিভাবকের অজানা।"),
                  icon: "fa-scale-balanced",
                  color: "bg-gradient-emerald",
                  delay: 130,
                },
                {
                  title: yhLang("Limited ability to execute the rights.", "সীমিত ক্ষমতায়ন"),
                  desc: yhLang("Lack of confidence, parental influence, peer pressure", "আত্মবিশ্বাসের অভাব, সহপাঠী চাপ ও গেটকিপিং ঝুঁকি চিনলেও সহায়তা নিতে বিলম্ব ঘটায়।"),
                  icon: "fa-hands-holding",
                  color: "bg-gradient-tangerine",
                  delay: 160,
                },
                {
                  title: yhLang("Barriers in accessing the information, knowledge, skills.", "জ্ঞানপ্রাপ্তির বাধা"),
                  desc: yhLang("Social stigma, discomfort among parents, family members, peers, teachers to talk about AH issues.", "পরিবার বা বিদ্যালয়ে লজ্জা ও অস্বস্তিকর আলোচনার কারণে সঠিক তথ্য চেপে রাখা হয়।"),
                  icon: "fa-book-open-reader",
                  color: "bg-gradient-rose",
                  delay: 190,
                },
                {
                  title: yhLang("Barriers in accessing the health services.", "সেবা প্রদানে ঘাটতি"),
                  desc: yhLang("Limited care seeking behaviors, no dedicated service (no separate space, no privacy, no dedicated staff, negligence and unawareness among service providers.", "স্বতন্ত্র কর্নার, নিয়মিত সময়, গোপনীয়তা ও প্রশিক্ষিত কর্মীর অভাব সেবায় আস্থা কমায়।"),
                  icon: "fa-hospital-user",
                  color: "bg-gradient-cyan",
                  delay: 220,
                },
              ];

              const carePrinciples = [
                {
                  title: yhLang("Respect & confidentiality", "সম্মান ও গোপনীয়তা"),
                  text: yhLang("Service providers greet adolescents, use preferred names/pronouns and keep records secure.", "সেবা প্রদানকারীরা কিশোরদের অভিবাদন জানান, পছন্দের নাম ও সর্বনাম ব্যবহার করেন এবং নথি সুরক্ষিত রাখেন।"),
                  icon: "fa-lock",
                },
                {
                  title: yhLang("Accessibility & affordability", "সহজপ্রাপ্যতা ও সাশ্রয়ী সেবা"),
                  text: yhLang("Flexible hours, zero or low fees, disability-friendly layouts and virtual follow-up channels.", "নমনীয় সময়সূচি, স্বল্প বা বিনা ফি, প্রতিবন্ধীবান্ধব ব্যবস্থা ও ভার্চুয়াল ফলো-আপ চ্যানেল নিশ্চিত করতে হয়।"),
                  icon: "fa-universal-access",
                },
                {
                  title: yhLang("Holistic packages", "সমন্বিত সেবা প্যাকেজ"),
                  text: yhLang("SRHR, mental health, nutrition, violence response and life-skills support offered together.", "এসআরএইচআর, মানসিক স্বাস্থ্য, পুষ্টি, সহিংসতা প্রতিক্রিয়া ও জীবনদক্ষতা সহায়তা একসাথে দেওয়া হয়।"),
                  icon: "fa-box",
                },
                {
                  title: yhLang("Youth participation", "তরুণদের অংশগ্রহণ"),
                  text: yhLang("Adolescent advisory boards co-design spaces, IEC materials and feedback loops.", "কিশোর উপদেষ্টা বোর্ড স্থান, আইইসি উপকরণ ও প্রতিক্রিয়া পদ্ধতি সহ-নকশা করে।"),
                  icon: "fa-people-group",
                },
              ];

              const checklist = [
                {
                  title: yhLang("Environment", "পরিবেশ"),
                  items: [
                    yhLang("Separate waiting area with relatable visuals and gender-neutral signage.", "চেনা ভিজ্যুয়াল ও জেন্ডার-নিরপেক্ষ সাইনেজসহ আলাদা অপেক্ষাকক্ষ।"),
                    yhLang("Privacy assured consultation rooms and clear referral desk.", "গোপনীয় পরামর্শ কক্ষ ও স্পষ্ট রেফারাল ডেস্ক।"),
                    yhLang("Green & digital elements (plants, charging points, Wi-Fi).", "সবুজ ও ডিজিটাল উপাদান (গাছপালা, চার্জিং পয়েন্ট, ওয়াই-ফাই)।"),
                  ],
                },
                {
                  title: yhLang("People", "মানুষ"),
                  items: [
                    yhLang("Trained adolescent-friendly providers with job aids in Bangla & English.", "বাংলা ও ইংরেজি জব এইডসহ প্রশিক্ষিত কিশোরবান্ধব সেবাদাতা।"),
                    yhLang("Peer educators manage triage, explain consent and accompany clients.", "সহপাঠী শিক্ষকেরা ট্রায়াজ, সম্মতি ব্যাখ্যা ও সঙ্গ দিয়ে সহায়তা করে।"),
                    yhLang("Safeguarding focal points for disclosure of violence or abuse.", "সহিংসতা বা নির্যাতন প্রকাশের জন্য সুরক্ষা ফোকাল পয়েন্ট।"),
                  ],
                },
                {
                  title: yhLang("Processes", "প্রক্রিয়া"),
                  items: [
                    yhLang("Self-registration kiosks, SMS reminders and helpline numbers visible.", "স্ব-নিবন্ধন কিয়স্ক, এসএমএস স্মারক ও হেল্পলাইন দৃশ্যমান রাখা।"),
                    yhLang("Standard operating procedures for confidentiality and referrals.", "গোপনীয়তা ও রেফারালের জন্য মানসম্মত কার্যপদ্ধতি।"),
                    yhLang("Feedback wall/QR codes to capture youth satisfaction.", "তরুণদের মতামত সংগ্রহে ফিডব্যাক ওয়াল বা কিউআর কোড।"),
                  ],
                },
              ];

              const renderList = (items) => items.map((text) => `<li>${text}</li>`).join("");

              return `
              <div class="lesson-slide">
                <div class="alert alert-info hover-lift-sm transition-base mb-3" data-aos="fade-up" data-aos-delay="60">
                  <div class="d-flex align-items-center gap-3">
                    <span class="badge-pill bg-gradient-blue"><i class="fa-solid fa-user-group"></i></span>
                    <div>
                      <h5 class="mb-1">${yhLang("Why young people need special care?", "তরুণদের বিশেষ যত্ন কেন প্রয়োজন?")}</h5>
                      <p class="mb-0 small">${yhLang("WHO adolescent-friendly standards emphasise readiness across people, places and processes.", "ডব্লিউএইচও-র কিশোরবান্ধব মানদণ্ড মানুষ, স্থান ও প্রক্রিয়ায় প্রস্তুতিকে গুরুত্ব দেয়।")}</p>
                    </div>
                  </div>
                </div>

                <section class="mb-4" aria-labelledby="adol-needs-title">
                  <div class="row g-3">
                    ${barrierCards
                      .map(
                        (c) => `
                      <div class="col-md-6 col-lg-12" data-aos="zoom-in" data-aos-delay="${c.delay}">
                        <article class="modern-card hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover h-100">
                          <div class="d-flex align-items-start gap-3">
                            <span class="badge-pill ${c.color}" aria-hidden="true"><i class="fa-solid ${c.icon}"></i></span>
                            <div>
                              <h6 class="mb-1">${c.title}</h6>
                              <p class="mb-0 small">${c.desc}</p>
                            </div>
                          </div>
                        </article>
                      </div>
                    `
                      )
                      .join("")}
                  </div>
                </section>

                <section class="p-3 p-md-4 rounded-4" style="background: rgba(0,0,0,0.03);" aria-labelledby="adol-checklist-title">
                  
                  <p class="text-muted small mt-3" data-aos="fade-up" data-aos-delay="200">${yhLang("Aligns with WHO’s eight global standards for quality health services for adolescents.", "ডব্লিউএইচওর কিশোর সেবা মান নিশ্চিতকারী আটটি বৈশ্বিক মানের সাথে সামঞ্জস্যপূর্ণ।")}</p>
                </section>
              </div>`;
            })(),
          },
          {
            id: "ch2-lesson-9",
            title: yhLang(
              "SDG related to adolescent health",
              "কিশোর-কিশোরীদের স্বাস্থ্য সম্পর্কিত SDG"
            ),
            icon: "fa-diagram-project",
            gradientClass: "bg-gradient-violet",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q2g",
                  question: "Young health impacts how many SDGs?",
                  options: ["Only 1", "Several", "None", "Unknown"],
                  correctAnswer: 1,
                },
              ],
            },
            content: `
              <div class="lesson-slide">
                <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang("SDG related to adolescent health", "কিশোর-কিশোরীদের স্বাস্থ্য সম্পর্কিত SDG")}</h2>

                <!-- SDG/SDC cards with distinct lean gradients, icons, and hover effects -->
                <div class="row g-3 d-none">${[
                  {
                    label: "No Poverty",
                    icon: "fa-hand-holding-heart",
                    cls: "purple",
                    delay: 100,
                  },
                  {
                    label: "Zero Hunger",
                    icon: "fa-bowl-food",
                    cls: "blue",
                    delay: 130,
                  },
                  {
                    label: "Good Health And Well-Being",
                    icon: "fa-heart-pulse",
                    cls: "teal",
                    delay: 160,
                  },
                  {
                    label: "Quality Education",
                    icon: "fa-graduation-cap",
                    cls: "orange",
                    delay: 190,
                  },
                  {
                    label: "Gender Equality",
                    icon: "fa-venus-mars",
                    cls: "green",
                    delay: 220,
                  },
                  {
                    label: "Decent Work And Economic Growth",
                    icon: "fa-briefcase",
                    cls: "pink",
                    delay: 250,
                  },
                  {
                    label: "Peace, Justice And Strong Institutions",
                    icon: "fa-scale-balanced",
                    cls: "yellow",
                    delay: 280,
                  },
                ]
                  .map(
                    (s) => `
                  <div class="col-6 col-md-4 col-lg-3 aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100" data-aos="flip-left" data-aos-delay="${s.delay}">
                    <article class="sdg-lean-card bg-gradient-${s.cls} sdg-hover-tilt transition-base icon-spin-on-hover h-100">
                      <div class="sdg-card-icon animate-float-slow"><i class="fa-solid ${s.icon}"></i></div>
                      <h6 class="sdg-card-title">${s.label}</h6>
                    </article>
                  </div>
                `
                  )
                  .join("")}</div>
                   <!-- 2-column layout: first two images stacked in left column, third image beside them -->
                    <div class="row g-3 sdc_main"> 
                      <div class="col-12 col-md-5"><!-- three image start -->
                        <div class="row g-3"><!-- two image start -->
                          <div class="col-12" data-aos="zoom-in" data-aos-delay="80"><!-- image 1 -->
                            <article class="modern-card glass-card hover-lift-sm hover-shadow-glow transition-base" style="height: 300px;">
                            <figure class="image-card" style="overflow: hidden; border-radius: 14px;">
                              <img
                              src="img/sdc/1.jpg"
                              alt="SDG highlight 1"
                              class="img-zoom"
                              loading="lazy"
                              style=""
                              />
                            </figure>
                            </article>
                          </div>
                          <div class="col-12" data-aos="zoom-in" data-aos-delay="110"><!-- image 2 -->
                            <article class="modern-card glass-card hover-lift-sm hover-shadow-glow transition-base" style="height: 300px;">
                            <figure class="image-card" style="overflow: hidden; border-radius: 14px;">
                              <img
                              src="img/sdc/2.webp"
                              alt="SDG highlight 2"
                              class="img-zoom"
                              loading="lazy"
                              style=""
                              />
                            </figure>
                            </article>
                          </div>
                        </div><!-- two image end -->
                      </div>
                      <div class="col-12 col-md-7" data-aos="zoom-in" data-aos-delay="140"><!-- image 3 -->
                        <article class="modern-card glass-card hover-lift-sm hover-shadow-glow transition-base h-100" style="max-height: 610px;">
                        <figure class="image-card" style="overflow: hidden; border-radius: 14px;">
                          <img
                          src="img/sdc/3.png"
                          alt="SDG highlight 3"
                          class="img-zoom"
                          loading="lazy"
                          style=""
                          />
                        </figure>
                        </article>
                      </div>
                    </div>

                   <!-- Bottom row: 4 images -->
                    <div class="row g-3 mt-0 sdc_main">
                      <div class="col-6 col-md-3" data-aos="zoom-in" data-aos-delay="170">
                        <article class="modern-card glass-card hover-lift-sm hover-shadow-glow transition-base">
                        <figure class="image-card" style="overflow: hidden; border-radius: 14px;">
                          <img
                          src="img/sdc/4.png"
                          alt="SDG related 4"
                          class="img-zoom"
                          loading="lazy"
                          style=""
                          />
                        </figure>
                        </article>
                      </div>
                      <div class="col-6 col-md-3" data-aos="zoom-in" data-aos-delay="200">
                        <article class="modern-card glass-card hover-lift-sm hover-shadow-glow transition-base">
                        <figure class="image-card" style="overflow: hidden; border-radius: 14px;">
                          <img
                          src="img/sdc/5.webp"
                          alt="SDG related 5"
                          class="img-zoom"
                          loading="lazy"
                          style=""
                          />
                        </figure>
                        </article>
                      </div>
                      <div class="col-6 col-md-3" data-aos="zoom-in" data-aos-delay="230">
                        <article class="modern-card glass-card hover-lift-sm hover-shadow-glow transition-base">
                        <figure class="image-card" style="overflow: hidden; border-radius: 14px;">
                          <img
                          src="img/sdc/6.png"
                          alt="SDG related 6"
                          class="img-zoom"
                          loading="lazy"
                          style=""
                          />
                        </figure>
                        </article>
                      </div>
                      <div class="col-6 col-md-3" data-aos="zoom-in" data-aos-delay="260">
                        <article class="modern-card glass-card hover-lift-sm hover-shadow-glow transition-base">
                        <figure class="image-card" style="overflow: hidden; border-radius: 14px;">
                          <img
                          src="img/sdc/7.png"
                          alt="SDG related 7"
                          class="img-zoom"
                          loading="lazy"
                          style=""
                          />
                        </figure>
                        </article>
                      </div>
                    </div>
              </div>`,
          },
          {
            id: "ch2-lesson-10",
            title: yhLang(
              "AH in Global Agenda",
              "বৈশ্বিক এজেন্ডায় কৈশোর স্বাস্থ্য"
            ),
            icon: "fa-handshake-angle",
            gradientClass: "bg-gradient-emerald",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q2h",
                  question: yhLang(
                    "Put whom at the center of design?",
                    "ডিজাইনের কেন্দ্রবিন্দুতে কাকে রাখতে হবে?"
                  ),
                  options: [
                    yhLang("Providers", "সেবা প্রদানকারী"),
                    yhLang("Parents", "অভিভাবক"),
                    yhLang("Adolescents", "কিশোর-কিশোরী"),
                    yhLang("Donors", "দাতা"),
                  ],
                  correctAnswer: 2,
                },
              ],
            },
            content: (function () {
              const timeline = [
                {
                  year: "1994",
                  title: yhLang(
                    "International Conference on Population and Development",
                    "আন্তর্জাতিক জনসংখ্যা ও উন্নয়ন সম্মেলন"
                  ),
                  desc: yhLang(
                    "Adolescents were formally acknowledged as a group with unique SRHR needs.",
                    "কিশোর-কিশোরীদের অনন্য এসআরএইচআর চাহিদাসহ স্বতন্ত্র গোষ্ঠী হিসেবে স্বীকৃতি দেওয়া হয়।"
                  ),
                  icon: "fa-people-group",
                  cls: "tl-rose",
                  delay: 100,
                },
                {
                  year: "2000",
                  title: yhLang("Millennium Development Goals (MDGs)", "মিলেনিয়াম ডেভেলপমেন্ট গোলস (এমডিজি)"),
                  desc: yhLang(
                    "Adolescents were referenced within child and maternal health targets but without dedicated metrics.",
                    "শিশু ও মাতৃস্বাস্থ্য লক্ষ্যসমূহে কিশোরদের উল্লেখ ছিল, তবে আলাদা সূচক নির্ধারিত হয়নি।"
                  ),
                  icon: "fa-bullseye",
                  cls: "tl-blue",
                  delay: 130,
                },
                {
                  year: "2010",
                  title: yhLang(
                    "Global Strategy for Women’s and Children’s Health",
                    "নারী ও শিশুর স্বাস্থ্য সম্পর্কিত বৈশ্বিক কৌশল"
                  ),
                  desc: yhLang(
                    "Adolescent health surfaced but investments and indicators remained limited.",
                    "কৈশোর স্বাস্থ্য আলোচনায় এলেও বিনিয়োগ ও সূচক সীমিত ছিল।"
                  ),
                  icon: "fa-child-reaching",
                  cls: "tl-amber",
                  delay: 160,
                },
                {
                  year: "2015",
                  title: yhLang("Sustainable Development Goals (SDGs)", "টেকসই উন্নয়ন লক্ষ্য (এসডিজি)"),
                  desc: yhLang(
                    "Adolescents recognised as essential to achieving targets on poverty, health, gender and jobs.",
                    "দারিদ্র্য, স্বাস্থ্য, লিঙ্গ সমতা ও কর্মসংস্থানের লক্ষ্য অর্জনে কিশোরদের অপরিহার্য ধরা হয়।"
                  ),
                  icon: "fa-globe",
                  cls: "tl-emerald",
                  delay: 190,
                },
                {
                  year: "2016",
                  title: yhLang(
                    "Lancet Commission on Adolescent Health & Wellbeing",
                    "ল্যানসেট কমিশন: কৈশোর স্বাস্থ্য ও সুস্থতা"
                  ),
                  desc: yhLang(
                    "Quantified the triple dividend of investing during adolescence.",
                    "কৈশোরে বিনিয়োগের ত্রিমুখী সুফল পরিমাপ করে উপস্থাপন করা হয়।"
                  ),
                  icon: "fa-book-open",
                  cls: "tl-violet",
                  delay: 220,
                },
                {
                  year: "2017",
                  title: yhLang(
                    "Global Accelerated Action for the Health of Adolescents (AA-HA!)",
                    "কৈশোর স্বাস্থ্য ত্বরান্বিত কর্মসূচি (এএ-এইচএ!)"
                  ),
                  desc: yhLang(
                    "Provided a programmatic framework covering governance, financing, platforms and accountability.",
                    "শাসন, অর্থায়ন, প্ল্যাটফর্ম ও জবাবদিহি অন্তর্ভুক্ত প্রোগ্রামেটিক কাঠামো দেয়।"
                  ),
                  icon: "fa-rocket",
                  cls: "tl-cyan",
                  delay: 250,
                },
                {
                  year: "2021",
                  title: yhLang(
                    "AA-HA! 2.0: A call to action",
                    "এএ-এইচএ! ২.০: কর্মের আহ্বান"
                  ),
                  desc: yhLang(
                    "Updates guidance post-COVID, emphasising mental health, climate risks and digital ecosystems.",
                    "কোভিড পরবর্তী নির্দেশনা হালনাগাদ করে মানসিক স্বাস্থ্য, জলবায়ু ঝুঁকি ও ডিজিটাল পরিবেশকে গুরুত্ব দেয়।"
                  ),
                  icon: "fa-flag-checkered",
                  cls: "tl-slate",
                  delay: 280,
                },
              ];

              const designPriorities = [
                yhLang("Put adolescents at the centre of design, measurement and accountability.", "পরিকল্পনা, পরিমাপ ও জবাবদিহির কেন্দ্রবিন্দুতে কিশোরদের রাখুন।"),
                yhLang("Invest across life-course transitions (early adolescence, older youth, young adults).", "জীবনচক্রের পরিবর্তনকাল (প্রারম্ভিক কৈশোর, বড় তরুণ, নবীন প্রাপ্তবয়স্ক) জুড়ে বিনিয়োগ করুন।"),
                yhLang("Use digital + community platforms to reach the last mile safely.", "ডিজিটাল ও কমিউনিটি প্ল্যাটফর্ম একসাথে ব্যবহার করে নিরাপদে শেষ প্রান্তে পৌঁছান।"),
                yhLang("Finance integrated packages that combine health, nutrition, SRHR and protection.", "স্বাস্থ্য, পুষ্টি, এসআরএইচআর ও সুরক্ষা সমন্বিত প্যাকেজে অর্থায়ন করুন।"),
              ];

              const renderList = (items) => items.map((text) => `<li>${text}</li>`).join("");

              return `
              <div class="lesson-slide">
                <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang("Adolescent Health in the Global Agenda", "বৈশ্বিক এজেন্ডায় কৈশোর স্বাস্থ্য")}</h2>

                <section class="timeline-chart" aria-labelledby="ah-global-agenda-title">
                  <h3 class="visually-hidden" id="ah-global-agenda-title">${yhLang("Milestones shaping the agenda", "এজেন্ডা গঠনের মাইলফলক")}</h3>
                  <div class="timeline-track" aria-hidden="true"></div>
                  ${timeline
                    .map(
                      (m) => `
                    <div class="timeline-item" data-aos="fade-up" data-aos-delay="${m.delay}">
                      <div class="timeline-dot"><span>${m.year}</span></div>
                      <article class="timeline-card ${m.cls}">
                        <div class="timeline-card-icon"><i class="fa-solid ${m.icon}"></i></div>
                        <h6 class="timeline-card-title">${m.title}</h6>
                        <p class="timeline-card-text">${m.desc}</p>
                      </article>
                    </div>
                  `
                    )
                    .join("")}
                </section>

                <section class="mt-4" aria-labelledby="ah-design-priorities">
                  <p class="small text-muted mt-2" data-aos="fade-up" data-aos-delay="120">${yhLang("Source: AA-HA! 2.0, Lancet Commission, Generation Unlimited.", "সূত্র: এএ-এইচএ! ২.০, ল্যানসেট কমিশন, জেনারেশন আনলিমিটেড।")}</p>
                </section>
              </div>`;
            })(),
          },
          {
            id: "ch2-lesson-11",
            title: yhLang(
              "Bangladesh Government’s commitment",
              "বাংলাদেশ সরকারের অঙ্গীকার"
            ),
            icon: "fa-landmark",
            gradientClass: "bg-gradient-tangerine",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q2j",
                  question: yhLang(
                    "Bangladesh invests in adolescent health via…",
                    "বাংলাদেশ কীভাবে কৈশোরস্বাস্থ্যে বিনিয়োগ করে?"
                  ),
                  options: [
                    yhLang(
                      "Policies and partnerships",
                      "নীতিমালা ও অংশীদারিত্ব"
                    ),
                    yhLang("Only posters", "শুধু পোস্টার"),
                    yhLang("Only apps", "শুধু অ্যাপ"),
                    yhLang("None", "কোনোটিই নয়"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const policyJourney = [
                {
                  step: "01",
                  years: "2006–2015",
                  image: "img/policies/national-strategy.jpg",
                  title: yhLang("National Adolescent Reproductive Health Strategy", "জাতীয় কিশোর প্রজনন স্বাস্থ্য কৌশল"),
                  copy: yhLang("First SRHR blueprint defining adolescent-friendly corners, standards and supply chains.", "এসআরএইচআর-এর প্রথম নীলনকশা যা কিশোরবান্ধব কর্নার, মানদণ্ড ও সরবরাহ নিশ্চিত করে।"),
                  icon: "fa-book-open",
                  color: "bg-gradient-blue",
                  delay: 80,
                },
                {
                  step: "02",
                  years: "2017–2030",
                  image: "img/policies/national-strategy.jpg",
                  title: yhLang("National Adolescent Health Strategy", "জাতীয় কিশোর স্বাস্থ্য কৌশল"),
                  copy: yhLang("Aligns with SDGs and UHC, expanding into mental health, nutrition, violence prevention and climate resilience.", "এসডিজি ও ইউএইচসির সাথে সামঞ্জস্য রেখে মানসিক স্বাস্থ্য, পুষ্টি, সহিংসতা প্রতিরোধ ও জলবায়ু সহনশীলতাকে অন্তর্ভুক্ত করে।"),
                  icon: "fa-flag-checkered",
                  color: "bg-gradient-emerald",
                  delay: 120,
                },
                {
                  step: "03",
                  years: yhLang("Action Plan", "কর্মপরিকল্পনা"),
                  image: "img/policies/adolsent.png",
                  title: yhLang("National Plan of Action", "জাতীয় কর্মপরিকল্পনা"),
                  copy: yhLang("Breaks strategy pillars into interventions, roles and district roll-out sequences.", "কৌশলের স্তম্ভগুলোকে হস্তক্ষেপ, দায়িত্ব ও জেলা পর্যায়ে বাস্তবায়ন কর্মসূচিতে ভেঙে দেয়।"),
                  icon: "fa-clipboard-list",
                  color: "bg-gradient-violet",
                  delay: 160,
                },
                {
                  step: "04",
                  years: yhLang("Costed Plan", "ব্যয় নির্ধারিত পরিকল্পনা"),
                  image: "img/policies/national-strategy.jpg",
                  title: yhLang("National Costed Action Plan", "জাতীয় ব্যয়ভিত্তিক কর্মপরিকল্পনা"),
                  copy: yhLang("Details financing gaps, procurement lots and accountability indicators for each ministry.", "প্রতি মন্ত্রণালয়ের জন্য অর্থায়নের ঘাটতি, ক্রয় প্যাকেজ ও জবাবদিহি সূচক নির্দিষ্ট করে।"),
                  icon: "fa-coins",
                  color: "bg-gradient-rose",
                  delay: 200,
                },
              ];

              const investmentPillars = [
                {
                  title: yhLang("Primary health care", "প্রাথমিক স্বাস্থ্যসেবা"),
                  desc: yhLang("30,000+ community clinics linked to adolescent corners, telehealth and referral apps.", "৩০,০০০-এর বেশি কমিউনিটি ক্লিনিক কিশোর কর্নার, টেলিহেলথ ও রেফারেল অ্যাপের সাথে যুক্ত।"),
                  icon: "fa-house-medical",
                },
                {
                  title: yhLang("Education & life skills", "শিক্ষা ও জীবনদক্ষতা"),
                  desc: yhLang("Curriculum revision embeds SRHR, climate literacy and socio-emotional learning.", "পাঠ্যক্রম হালনাগাদ করে এসআরএইচআর, জলবায়ু সচেতনতা ও সামাজিক-মানসিক শিক্ষা যুক্ত হচ্ছে।"),
                  icon: "fa-book-open-reader",
                },
                {
                  title: yhLang("Protection & justice", "সুরক্ষা ও ন্যায়বিচার"),
                  desc: yhLang("Child helplines, One-Stop Crisis Centres and probation services share case data.", "শিশু হেল্পলাইন, ওয়ান-স্টপ ক্রাইসিস সেন্টার ও প্রবেশন সেবা কেস ডেটা ভাগাভাগি করে।"),
                  icon: "fa-shield-heart",
                },
                {
                  title: yhLang("Digital & data", "ডিজিটাল ও ডেটা"),
                  desc: yhLang("DHIS2 adolescent dashboard, eMIS for schools and gender-tagged budgets track progress.", "ডিএইচআইএস২ কিশোর ড্যাশবোর্ড, বিদ্যালয়ের ইএমআইএস ও লিঙ্গভিত্তিক বাজেট অগ্রগতি পর্যবেক্ষণ করে।"),
                  icon: "fa-chart-line",
                },
              ];

            


              return `
              <div class="lesson-slide">
                <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang("Bangladesh Government’s commitment", "বাংলাদেশ সরকারের অঙ্গীকার")}</h2>

                <section class="flow-chart policy-journey" aria-labelledby="bd-commitment-flow-title">
                  <div class="policy-journey-grid" id="bd-commitment-flow-title" role="list">
                    ${policyJourney
                      .map(
                        (card) => `
                        <article class="policy-journey-card" role="listitem" data-aos="fade-up" data-aos-delay="${card.delay}">
                          <div class="policy-journey-seal ${card.color}">
                            <span class="policy-journey-step">${yhLang("Step", "ধাপ")}&nbsp;${card.step}</span>
                            <span class="policy-journey-years">${card.years}</span>
                          </div>
                          <figure class="policy-journey-media">
                            <img src="${card.image}" alt="${card.title}" loading="lazy" />
                          </figure>
                          <div class="policy-journey-body">
                            <div class="policy-journey-icon ${card.color}" aria-hidden="true"><i class="fa-solid ${card.icon}"></i></div>
                            <div>
                              <h6 class="policy-journey-title">${card.title}</h6>
                              <p class="policy-journey-copy">${card.copy}</p>
                            </div>
                          </div>
                        </article>
                      `
                      )
                      .join("")}
                  </div>
                </section>

                <section class="mt-4" aria-labelledby="orbit-title">
                  <div class="orbit-layout" id="orbitLayout" data-aos="zoom-in" data-aos-delay="240" data-orbit-manual="true">
                    <div class="orbit-center icon-spin-on-hover">
                      <div class="orbit-card bg-gradient-blue">
                        <div class="orbit-icon mb-1"><i class="fa-solid fa-flag fa-lg"></i></div>
                        <div class="orbit-title fw-bold">${yhLang("National Health Strategy", "জাতীয় স্বাস্থ্য কৌশল")}</div>
                        <div class="orbit-sub">2017–2030</div>
                      </div>
                    </div>
                  </div>
                
                </section>
              </div>`;
            })(),
          },
          {
            id: "ch2-lesson-12",
            title: yhLang(
              "A combined effort",
              "সমন্বিত প্রচেষ্টা"
            ),
            icon: "fa-people-group",
            gradientClass: "bg-gradient-green",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q2k",
                  question: yhLang(
                    "Whole-of-society approach includes…",
                    "সমাজের সর্বস্তরের পন্থায় কী অন্তর্ভুক্ত থাকে?"
                  ),
                  options: [
                    yhLang("Only health", "শুধু স্বাস্থ্য"),
                    yhLang("Multiple sectors", "বহু খাত"),
                    yhLang("Only schools", "শুধু বিদ্যালয়"),
                    yhLang("None", "কোনোটিই নয়"),
                  ],
                  correctAnswer: 1,
                },
              ],
            },
            content: (function () {
              const actorGroups = [
                {
                  title: yhLang("Health & nutrition", "স্বাস্থ্য ও পুষ্টি"),
                  desc: yhLang("DGHS, DGFP, DGHS RH line, community clinics, private hospitals and telehealth platforms.", "ডিজিএইচএস, ডিজিএফপি, আরএইচ লাইন, কমিউনিটি ক্লিনিক, বেসরকারি হাসপাতাল ও টেলিহেলথ প্ল্যাটফর্ম।"),
                  icon: "fa-stethoscope",
                  color: "bg-gradient-blue",
                },
                {
                  title: yhLang("Education & skills", "শিক্ষা ও দক্ষতা"),
                  desc: yhLang("MoE, Madrasah Board, TVET institutes, scouts/girl guides and online learning partners.", "শিক্ষা মন্ত্রণালয়, মাদ্রাসা বোর্ড, টিভিইটি প্রতিষ্ঠান, স্কাউট/গার্ল গাইড ও অনলাইন শিক্ষাভিত্তিক অংশীদার।"),
                  icon: "fa-school",
                  color: "bg-gradient-orange",
                },
                {
                  title: yhLang("Protection & justice", "সুরক্ষা ও ন্যায়"),
                  desc: yhLang("MoWCA, DSS, police, legal aid services, One-Stop Crisis Centres, probation offices.", "নারী-শিশু বিষয়ক মন্ত্রণালয়, সমাজসেবা অধিদপ্তর, পুলিশ, লিগ্যাল এইড, ওএসসিসি ও প্রবেশন অফিস।"),
                  icon: "fa-scale-balanced",
                  color: "bg-gradient-emerald",
                },
                {
                  title: yhLang("Youth & civil society", "তরুণ ও সিভিল সোসাইটি"),
                  desc: yhLang("YHAP ambassadors, youth clubs, disability organisations, faith leaders and media.", "ওয়াইএইচএপি দূত, যুব ক্লাব, প্রতিবন্ধী সংগঠন, ধর্মীয় নেতৃবৃন্দ ও গণমাধ্যম।"),
                  icon: "fa-people-group",
                  color: "bg-gradient-rose",
                },
                {
                  title: yhLang("Private sector & innovation", "বেসরকারি খাত ও উদ্ভাবন"),
                  desc: yhLang("Telecoms, fintech, social enterprises and creative agencies scaling behaviour-change content.", "টেলিকম, ফিনটেক, সামাজিক উদ্যোগ ও সৃজনশীল সংস্থা আচরণ পরিবর্তন বার্তা বিস্তারে সহায়তা করে।"),
                  icon: "fa-lightbulb",
                  color: "bg-gradient-purple",
                },
              ];

              const collaborationSteps = [
                {
                  title: yhLang("Diagnose", "নির্ণয়"),
                  detail: yhLang("Shared dashboards combine DHS, DHIS2, school EMIS and citizen feedback.", "ডিএইচএস, ডিএইচআইএস২, বিদ্যালয় ইএমআইএস ও নাগরিক মতামত একত্র করে যৌথ ড্যাশবোর্ড।"),
                },
                {
                  title: yhLang("Co-design", "সহ-নকশা"),
                  detail: yhLang("Youth labs, policy clinics and design sprints define prototypes for services.", "তরুণ ল্যাব, নীতি ক্লিনিক ও ডিজাইন স্প্রিন্ট সেবার প্রোটোটাইপ নির্ধারণ করে।"),
                },
                {
                  title: yhLang("Deliver", "বাস্তবায়ন"),
                  detail: yhLang("Blended platforms: schools, clinics, mobile vans, community radio, super apps.", "মিশ্র প্ল্যাটফর্ম: বিদ্যালয়, ক্লিনিক, মোবাইল ভ্যান, কমিউনিটি রেডিও, সুপার অ্যাপ।"),
                },
                {
                  title: yhLang("Measure & iterate", "পরিমাপ ও উন্নয়ন"),
                  detail: yhLang("Joint scorecards, budget tracking and adolescent report cards drive accountability.", "যৌথ স্কোরকার্ড, বাজেট ট্র্যাকিং ও কিশোর রিপোর্ট কার্ড জবাবদিহি ত্বরান্বিত করে।"),
                },
              ];

              return `
              <div class="lesson-slide">
                <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang("A combined effort", "সমন্বিত প্রচেষ্টা")}</h2>
                <p class="text-muted" data-aos="fade-up" data-aos-delay="40">${yhLang("Protecting adolescent wellbeing needs a whole-of-society coalition where each actor brings complementary strengths.", "কৈশোর সুস্থতা নিশ্চিত করতে সমাজের সকল স্তরের সমন্বিত জোট দরকার, যেখানে প্রত্যেক অংশীদার নিজস্ব শক্তি নিয়ে আসে।")}</p>

                <div class="modern-card glass-card mb-4" data-aos="fade-up" data-aos-delay="60">
                  <img src="img/effort-new.png" alt="A combined effort infographic" class="img-fluid rounded-4 shadow-sm" />
                </div>

              </div>`;
            })(),
          },
          {
            id: "ch2-lesson-13",
            title: yhLang(
              "Recommendations to protect adolescent health and wellbeing",
              "কৈশোর স্বাস্থ্য ও সুস্থতা রক্ষায় সুপারিশ"
            ),
            icon: "fa-rocket",
            gradientClass: "bg-gradient-rose",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q2l",
                  question: yhLang(
                    "Actions include…",
                    "সুপারিশে কোন পদক্ষেপ অন্তর্ভুক্ত?"
                  ),
                  options: [
                    yhLang("Boost health literacy", "স্বাস্থ্য সাক্ষরতা বাড়ানো"),
                    yhLang("Reduce services", "সেবা কমানো"),
                    yhLang("Ignore data", "তথ্য উপেক্ষা"),
                    yhLang("Exclude young", "তরুণদের বাদ দেওয়া"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const recommendations = [
                {
                  title: yhLang("Rights-based & person-centred", "অধিকারভিত্তিক ও ব্যক্তি-কেন্দ্রিক"),
                  text: yhLang("Guarantee confidentiality, informed consent and inclusive spaces for adolescents of all identities.", "সব পরিচয়ের কিশোরদের জন্য গোপনীয়তা, অবহিত সম্মতি ও অন্তর্ভুক্তিমূলক স্থান নিশ্চিত করুন।"),
                  icon: "fa-scale-balanced",
                  cls: "bg-gradient-purple",
                  delay: 120,
                },
                {
                  title: yhLang("Confront systemic inequities", "পদ্ধতিগত বৈষম্য মোকাবিলা"),
                  text: yhLang("Invest in underserved districts, hard-to-reach communities, refugees and adolescents with disabilities.", "অসেবা প্রাপ্ত জেলা, দুর্গম সম্প্রদায়, শরণার্থী ও প্রতিবন্ধী কিশোরদের জন্য বিনিয়োগ বাড়ান।"),
                  icon: "fa-people-arrows-left-right",
                  cls: "bg-gradient-rose",
                  delay: 160,
                },
                {
                  title: yhLang("Meaningful adolescent engagement", "অর্থবহ কিশোর অংশগ্রহণ"),
                  text: yhLang("Create advisory boards, pay youth researchers and embed feedback loops in every programme.", "উপদেষ্টা বোর্ড গঠন, তরুণ গবেষকদের পারিশ্রমিক প্রদান ও প্রতিটি কর্মসূচিতে প্রতিক্রিয়া পদ্ধতি যুক্ত করুন।"),
                  icon: "fa-people-group",
                  cls: "bg-gradient-blue",
                  delay: 200,
                },
                {
                  title: yhLang("Evidence-informed & age-responsive", "প্রমাণভিত্তিক ও বয়স-উপযোগী"),
                  text: yhLang("Use disaggregated data, U-Report polls and implementation research to tailor solutions.", "বিযুক্ত ডেটা, ইউ-রিপোর্ট জরিপ এবং বাস্তবায়ন গবেষণা ব্যবহার করে সমাধান তৈরি করুন।"),
                  icon: "fa-microscope",
                  cls: "bg-gradient-cyan",
                  delay: 240,
                },
                {
                  title: yhLang("Multisectoral approach", "বহুখাতীয় পন্থা"),
                  text: yhLang("Link health, education, protection, social protection and climate financing.", "স্বাস্থ্য, শিক্ষা, সুরক্ষা, সামাজিক সুরক্ষা ও জলবায়ু অর্থায়নকে সংযুক্ত করুন।"),
                  icon: "fa-diagram-project",
                  cls: "bg-gradient-teal",
                  delay: 280,
                },
              ];

              const implementationSteps = [
                {
                  title: yhLang("Plan", "পরিকল্পনা"),
                  detail: yhLang("Map determinants, choose priority districts and define SMART indicators.", "নির্ধারক মানচিত্রায়ন, অগ্রাধিকার জেলা নির্বাচন ও স্মার্ট সূচক নির্ধারণ করুন।"),
                },
                {
                  title: yhLang("Resource", "সম্পদায়ন"),
                  detail: yhLang("Blend domestic budgets with donor, private sector and youth-led funds.", "দেশীয় বাজেটের সাথে দাতা, বেসরকারি খাত ও তরুণ-নেতৃত্বাধীন তহবিল মিশ্রিত করুন।"),
                },
                {
                  title: yhLang("Implement", "বাস্তবায়ন"),
                  detail: yhLang("Bundle services (SRHR, mental health, nutrition) and deliver via multiple platforms.", "এসআরএইচআর, মানসিক স্বাস্থ্য, পুষ্টি সেবা একত্রে দিয়ে বহু প্ল্যাটফর্মে সরবরাহ করুন।"),
                },
                {
                  title: yhLang("Review & adapt", "মূল্যায়ন ও অভিযোজন"),
                  detail: yhLang("Use adolescent scorecards, digital dashboards and learning reviews every six months.", "প্রতি ছয় মাসে কিশোর স্কোরকার্ড, ডিজিটাল ড্যাশবোর্ড ও লার্নিং রিভিউ ব্যবহার করুন।"),
                },
              ];

              const renderList = (items) => items.map((item) => `<li>${item}</li>`).join("");

              return `
              <div class="lesson-slide">
                <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang("Recommendations", "সুপারিশসমূহ")}</h2>

                <div class="modern-card glass-card mb-3 hover-lift-sm transition-base" data-aos="fade-up" data-aos-delay="60">
                  <div class="d-flex align-items-start gap-3">
                    <span class="badge-pill bg-gradient-blue" aria-hidden="true"><i class="fa-solid fa-circle-info"></i></span>
                    <p class="mb-0">${yhLang("Actions must tackle determinants, resource delivery platforms and meaningfully engage adolescents throughout the programme cycle.", "পদক্ষেপগুলোকে নির্ধারক, সেবা প্ল্যাটফর্ম ও পুরো কর্মচক্রে কিশোরদের অর্থবহ সম্পৃক্ততাকে একসাথে বিবেচনা করতে হবে।")}</p>
                  </div>
                </div>

                <section aria-labelledby="ahw-recs-title">
                  <div class="recs-ambient" data-aos="fade-up" data-aos-delay="100">
                    <div class="ambient-shapes animate-float" aria-hidden="true">
                      <span class="shape shape-1"></span>
                      <span class="shape shape-2"></span>
                      <span class="shape shape-3"></span>
                      <span class="shape shape-4"></span>
                      <span class="shape shape-5"></span>
                    </div>

                    <div class="petal-chart hover-lift-sm transition-base" aria-label="${yhLang("Recommendation petals surrounding the goal of protecting adolescent wellbeing.", "কৈশোর সুস্থতা সুরক্ষার লক্ষ্যের চারদিকে সুপারিশ পাঁপড়ি")}">
                      <div class="petal-ring spin-slow" aria-hidden="true"></div>

                      ${recommendations
                        .map(
                          (rec) => `
                          <div data-aos="fade-up" data-aos-delay="${rec.delay}">
                            <article class="recs-petal-card ${rec.cls} mb-2 icon-spin-on-hover hover-glow">
                              <div class="timeline-card-icon animate-float-slow"><i class="fa-solid ${rec.icon}"></i></div>
                              <div class="timeline-card-title">${rec.title}</div>
                              <p class="timeline-card-text rec-title">${rec.text}</p>
                            </article>
                          </div>
                        `
                        )
                        .join("")}
                    </div>
                  </div>
                </section>
              </div>`;
            })(),
          },
          {
            id: "ch4-lesson-2",
            title: yhLang("নারী প্রজননতন্ত্র", "নারী প্রজননতন্ত্র"),
            icon: "fa-person-dress",
            gradientClass: "bg-gradient-rose",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q4b",
                  question: yhLang(
                    "নারীর কোন অঙ্গে গর্ভধারণ ঘটে?",
                    "নারীর কোন অঙ্গে গর্ভধারণ ঘটে?"
                  ),
                  options: [
                    yhLang("জরায়ু", "জরায়ু"),
                    yhLang("যোনিপথ", "যোনিপথ"),
                    yhLang("স্তন", "স্তন"),
                    yhLang("মূত্রথলি", "মূত্রথলি"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const points = [
                "ডিম্বাশয়: জরায়ুর দুই পাশে একটি করে দুটি ডিম্বাশয়/ওভারি আছে। প্রত্যেক মাসিক চক্রের ২৮ দিনের মাঝামাঝি সময়ে ডিম্বাশয় দুটির যেকোনো একটিতে একটি ডিম্বাণু পরিপক্ব হয় এবং ডিম্বাশয় থেকে বেরিয়ে ডিম্ববাহী নালিতে প্রবেশ করে।",
                "জরায়ু: জরায়ু হচ্ছে তলপেটের ভেতরে থাকা একটি ফাঁপা ত্রিকোণাকৃতি অঙ্গ। এর সামনে থাকে মূত্রথলি এবং পেছনে মলদ্বার। জরায়ুর দুটি ভাগ—মূল অংশ বা বডি এবং জরায়ুমুখ। মূল অংশের ওপরের দুই কোণা থেকে দুটি ডিম্ববাহী নালি শুরু হয়েছে। জরায়ুর প্রথম ও প্রধান কাজ হলো গর্ভধারণ করা। গর্ভধারণ না হলে মাসিক চক্রের হরমোনজনিত কারণে জরায়ুর ভিতরের একটি স্তর ঝরে পড়ে — একে ঋতুস্রাব বা মাসিক বলা হয়।",
                "ডিম্ববাহী নালি: জরায়ু থেকে লম্বা দুটি ডিম্ববাহী নালি দুই দিকে ডিম্বাশয়/ওভারি পর্যন্ত বিস্তৃত। ডিম্ববাহী নালির শেষ অংশ হাতের আঙুলের মতো অনেকগুলো ভাগে বিভক্ত থাকে—এটিকে ফিম্ব্রিয়া বলে। সহবাসের পরে শুক্রাণু যোনিপথ হয়ে জরায়ু পেরিয়ে ডিম্বনালিতে পৌঁছায়। এ সময় যদি ওভুলেশন ঘটে, তবে ডিম্বাণুটি ডিম্বাশয় থেকে ফিম্ব্রিয়ার মাধ্যমে ডিম্বনালিতে প্রবেশ করে। এখানেই ডিম্বাণু ও শুক্রাণুর মিলন হয়। নিষিক্ত ডিম্বাণুটি কয়েকদিন ডিম্বনালিতে থেকে পরে জরায়ুতে ফিরে এসে ভ্রূণ হিসেবে স্থাপিত হয়।",
                "যোনিপথ: যোনিপথ জরায়ুর ভিতর থেকে শুরু হয়ে শরীরের বাইরে এসে যোনিমুখে শেষ হয়েছে।",
                "স্তন: স্তন সরাসরি প্রজননতন্ত্রের অংশ না হলেও এটি আনুষঙ্গিক প্রজনন অঙ্গ হিসেবে বিবেচিত হয়, কারণ শিশুর জন্মের পর স্তনেই বুকের দুধ তৈরি হয়।",
              ];

              const renderList = (items) =>
                items
                  .map(
                    (text, idx) => `
                      <li data-aos="fade-left" data-aos-delay="${80 + idx * 20}">
                        <i class="fa-solid fa-circle-check"></i>
                        <span>${text}</span>
                      </li>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "নারী প্রজননতন্ত্র",
                    "নারী প্রজননতন্ত্র"
                  )}</h2>

                  <section class="menstrual-feature modern-card glass-card position-relative overflow-hidden" data-aos="fade-up" data-aos-delay="40">
                    <span class="menstrual-corner-accent" aria-hidden="true"></span>
                    <span class="menstrual-corner-pill" aria-hidden="true"></span>
                    <div class="row g-4 align-items-center">
                      <div class="col-lg-5">
                        <figure class="rounded-4 overflow-hidden shadow-sm mb-0">
                          <img src="img/modu4/nari.jpg" alt="নারী প্রজননতন্ত্র" class="img-fluid w-100 object-fit-cover" />
                        </figure>
                      </div>
                      <div class="col-lg-7">
                        <ul class="list-unstyled puberty-list mb-0">
                          ${renderList(points)}
                        </ul>
                      </div>
                    </div>
                  </section>
                </div>
              `;
            })(),
          },
          
        ],
      },
      {
        id: "ch-3",
        title: yhLang(
          "Module-3: Changes during adolescence and puberty",
          "মডিউল-৩: কৈশোর ও বয়ঃসন্ধিকালের পরিবর্তন"
        ),
        lessons: [
          {
            id: "ch3-lesson-1",
            title: yhLang("Puberty", "বয়ঃসন্ধিকাল"),
            icon: "fa-venus-mars",
            gradientClass: "bg-gradient-rose",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q3a",
                  question: yhLang(
                    "What is puberty?",
                    "বয়ঃসন্ধিকাল বলতে কী বোঝায়?"
                  ),
                  options: [
                    yhLang(
                      "A process of physical changes leading to sexual maturity",
                      "শারীরিক পরিবর্তনের এমন একটি প্রক্রিয়া যা যৌন পরিপক্বতা আনে"
                    ),
                    yhLang("Only a temporary illness", "শুধু অস্থায়ী অসুস্থতা"),
                    yhLang("Changes that happen only to boys", "শুধু ছেলেদের পরিবর্তন"),
                    yhLang("Unrelated to hormones", "হরমোনের সাথে সম্পর্কহীন"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const description = yhLang(
                "Puberty is the phase when adolescents experience physical transformations that bring sexual maturity.",
                "বয়ঃসন্ধিকাল হলো শারীরিক পরিবর্তনের প্রক্রিয়া যখন ছেলে-মেয়ে যৌন পরিপক্বতা লাভ করে।"
              );

              const maleChanges = [
                "উচ্চতা ও ওজন বাড়ে",
                "বুক ও কাঁধ চওড়া হয়",
                "হালকা গোঁফের রেখা দেখা দেয়",
                "গলার স্বর ভেঙে যায় ও ভারী হয়",
                "অন্ডকোষ ও লিঙ্গের আকার বৃদ্ধি পায়",
                "লিঙ্গের চারপাশ ও বগলে লোম গজায়",
                "কখনো কখনো ঘুমের মধ্যে বীর্যপাত হয়",
                "চামড়া তৈলাক্ত হয়",
              ];

              const femaleChanges = [
                "উচ্চতা ও ওজন বাড়ে",
                "স্তনের আকার বড় হয়",
                "গলার স্বর পরিবর্তন হয়",
                "মাসিক শুরু হয়",
                "উরু ও নিতম্ব ভারী হয়",
                "যোনি অঞ্চলে ও বগলে লোম গজায়",
                "জরায়ু ও ডিম্বাশয় বড় হয়",
                "চামড়া তৈলাক্ত হয়",
              ];

              const mentalChanges = [
                "মনে নানা প্রশ্ন ও কৌতূহল জাগে",
                "বিপরীত লিঙ্গের প্রতি আকর্ষণ বোধ করে",
                "লাজুক ভাব দেখা দেয় ও সঙ্কোচ বোধ করে",
                "নিজের প্রতি অনেক বেশি মনোযোগ দাবি করে; আবেগপ্রবণ হয় এবং স্নেহ-ভালবাসা পেতে চায়",
                "বন্ধু-বান্ধবের সঙ্গ এবং তাদের প্রতি নির্ভরতা বাড়ে",
                "স্বাধীনভাবে চলাফেরা করতে চায়",
                "বড়দের মতো আচরণ করতে চায়",
                "ভাবুক এবং কল্পনাপ্রবণ হয়",
              ];

              const renderList = (items) =>
                items
                  .map(
                    (text) => `
                      <li>
                        <i class="fa-solid fa-circle-check"></i>
                        <span>${text}</span>
                      </li>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang("Puberty", "বয়ঃসন্ধিকাল")}</h2>
                  <p class="text-muted" data-aos="fade-up" data-aos-delay="40">${description}</p>

                  <div class="modern-card glass-card table-responsive" data-aos="fade-up" data-aos-delay="80">
                    <p class="text-muted gradient-text" data-aos="fade-up" data-aos-delay="40">${yhLang("Changes during puberty", "বয়ঃসন্ধিকালীন পরিবর্তনসমূহ ")}</p>
                    <table class="table table-borderless text-start puberty-table">
                      <thead>
                        <tr>
                          <th>${yhLang("Physical changes in boys", "ছেলেদের শারীরিক পরিবর্তন")}</th>
                          <th>${yhLang("Physical changes in girls", "মেয়েদের শারীরিক পরিবর্তন")}</th>
                          <th>${yhLang("Emotional changes", "ছেলে-মেয়েদের মানসিক পরিবর্তন")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><ul class="list-unstyled puberty-list">${renderList(maleChanges)}</ul></td>
                          <td><ul class="list-unstyled puberty-list">${renderList(femaleChanges)}</ul></td>
                          <td><ul class="list-unstyled puberty-list">${renderList(mentalChanges)}</ul></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              `;
            })(),
          },
          {
            id: "ch11-lesson-3",
            title: yhLang("Other Vaccines for Women", "মহিলাদের অন্যান্য  টিকা"),
            icon: "fa-syringe",
            gradientClass: "bg-gradient-teal",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q11c",
                  question: yhLang(
                    "Why should women consult health centers about additional vaccines?",
                    "মহিলাদের কেন অতিরিক্ত টিকা সম্পর্কে স্বাস্থ্যকেন্দ্রের পরামর্শ নেওয়া উচিত?"
                  ),
                  options: [
                    yhLang("To stay protected against preventable diseases", "প্রতিরোধযোগ্য রোগ থেকে সুরক্ষিত থাকতে"),
                    yhLang("Because vaccines are optional luxuries", "কারণ টিকা বিলাসী পছন্দ"),
                    yhLang("Vaccines always cause illness", "টিকা সবসময় অসুস্থতা আনে"),
                    yhLang("No reason at all", "কোনো কারণ নেই"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "মহিলাদের অন্যান্য  টিকা",
                    "মহিলাদের অন্যান্য  টিকা"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <figure class="image-card mb-0" style="min-height:150px; max-width:80%; margin:0 auto;">
                      <img src="img/modu11/tika.jpg" alt="${yhLang("Women's additional vaccines", "মহিলাদের অন্যান্য টিকা")}" class="img-fluid rounded-4 shadow-sm animate-float-slow" />
                    </figure>
                  </section>
                </div>
              `;
            })(),
          },
        ],
      },
      {
        id: "ch-4",
        title: yhLang(
          "Module-4: Menstrual/menstrual management",
          "মডিউল-৪: মাসিক/ঋতুস্রাব ব্যবস্থাপনা"
        ),
        lessons: [
          {
            id: "ch4-lesson-1",
            title: yhLang("Menstrual/menstrual managementt", "মাসিক/ঋতুস্রাব ব্যবস্থাপনা"),
            icon: "fa-droplet",
            gradientClass: "bg-gradient-rose",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q4a",
                  question: yhLang(
                    "ঋতুস্রাব সাধারণত কোন বয়সের মধ্যে শুরু হয়?",
                    "ঋতুস্রাব সাধারণত কোন বয়সের মধ্যে শুরু হয়?"
                  ),
                  options: [
                    yhLang("৯–১৪ বছর", "৯–১৪ বছর"),
                    yhLang("১৫–২৫ বছর", "১৫–২৫ বছর"),
                    yhLang("২৬–৩৫ বছর", "২৬–৩৫ বছর"),
                    yhLang("৪৫–৫৫ বছর", "৪৫–৫৫ বছর"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
                const paragraphs = [
                yhLang(
                  "Menstruation is a normal, natural process that prepares a person for pregnancy and childbirth. The monthly bleeding through the vagina is called menstruation (periods).",
                  "মাসিক একটি স্বাভাবিক প্রাকৃতিক প্রক্রিয়া, যার মাধ্যমে একজন নারী গর্ভধারণ/সন্তান জন্মদানের জন্য প্রস্তুত হয়। প্রতিমাসে যোনিপথ দিয়ে মেয়েদের যে রক্তস্রাব হয়, তাকে মাসিক/ঋতুস্রাব বলে।"
                ),
                yhLang(
                  "Menstruation typically begins between ages 9–14 and continues monthly until about 45–55 years.",
                  "ঋতুস্রাব সাধারণত ৯–১৪ বছর বয়সের মধ্যে শুরু হয় এবং ৪৫–৫৫ বছর পর্যন্ত প্রতিমাসে একবার করে হতে থাকে।"
                ),
                yhLang(
                  "Bleeding usually lasts 1–7 days each month. Flow is often heavier during the first 1–3 days and becomes lighter afterwards.",
                  "প্রতিমাসেই ১–৭ দিন পর্যন্ত রক্তস্রাব হয়ে থাকে। প্রথম ১–৩ দিন একটু বেশি পরিমাণ রক্ত গেলেও পরবর্তী দিনগুলোতে রক্তস্রাবের পরিমাণ কমে আসে।"
                ),
                yhLang(
                  "A typical menstrual cycle occurs every 21–35 days.",
                  "সাধারণত প্রতিমাসে ২১–৩৫ দিন অন্তর যোনিপথে এই রক্তক্ষরণ হয়ে থাকে।"
                ),
                yhLang(
                  "Having periods means the body is maturing and the reproductive system is functioning properly. It is completely normal—not unclean or impure—and there is no reason to isolate someone during this time. Unless there is unusual pain or excessive bleeding, normal daily activities can continue.",
                  "মাসিক হওয়া মানে দেহ পরিণত হচ্ছে এবং প্রজননতন্ত্র সঠিকভাবে কাজ করছে। এটি একটি সম্পূর্ণ স্বাভাবিক ঘটনা। এটি কোনো অপবিত্রতা বা অপরিচ্ছন্নতা নয় এবং এ সময় কোনো নারীকে আলাদা করে রাখারও কিছু নেই। এ সময় যদি অস্বাভাবিক ব্যথা বা অতিরিক্ত রক্তস্রাব না ঘটে, তবে সে তার স্বাভাবিক কাজ-কর্ম চালিয়ে যেতে পারে।"
                ),
                ];

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "Menstrual/menstrual managementt",
                    "মাসিক/ঋতুস্রাব ব্যবস্থাপনা"
                  )}</h2>

                  <section class="menstrual-feature modern-card glass-card position-relative overflow-hidden" data-aos="fade-up" data-aos-delay="40">
                    <span class="menstrual-corner-accent" aria-hidden="true"></span>
                    <span class="menstrual-corner-pill" aria-hidden="true"></span>
                    <div class="row g-4 align-items-center">
                      <div class="col-lg-5">
                        <figure class="rounded-4 overflow-hidden shadow-sm mb-0">
                          <img src="img/modu4/masik.jpeg" alt="Menstrual care" class="img-fluid w-100 object-fit-cover" />
                        </figure>
                      </div>
                      <div class="col-lg-7">
                        <div class="d-flex flex-column gap-3">
                          ${paragraphs
                            .map((text, idx) => `<p class="mb-0" data-aos="fade-left" data-aos-delay="${80 + idx * 20}">${text}</p>`)
                            .join("")}
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              `;
            })(),
          },
          {
            id: "ch4-lesson-2",
            title: yhLang("নারী প্রজননতন্ত্র", "নারী প্রজননতন্ত্র"),
            icon: "fa-person-dress",
            gradientClass: "bg-gradient-rose",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q4b",
                  question: yhLang(
                    "জরায়ুর প্রধান কাজ কী?",
                    "জরায়ুর প্রধান কাজ কী?"
                  ),
                  options: [
                    yhLang("গর্ভধারণ করা", "গর্ভধারণ করা"),
                    yhLang("শ্বাস-প্রশ্বাস নিয়ন্ত্রণ করা", "শ্বাস-প্রশ্বাস নিয়ন্ত্রণ করা"),
                    yhLang("রক্ত পরিশোধন", "রক্ত পরিশোধন"),
                    yhLang("হরমোন জমা রাখা", "হরমোন জমা রাখা"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const points = [
                "ডিম্বাশয়: জরায়ুর দুই পাশে একটি করে দুটি ডিম্বাশয়/ওভারি আছে। প্রত্যেক মাসিক <br> চক্রের ২৮ দিনের মাঝামাঝি সময়ে ডিম্বাশয় দুটির যেকোনো একটিতে একটি ডিম্বাণু পরিপক্ব হয় এবং ডিম্বাশয় থেকে বেরিয়ে ডিম্ববাহী নালিতে প্রবেশ করে।",
                "জরায়ু: জরায়ু হচ্ছে তলপেটের ভেতরে থাকা একটি ফাঁপা ত্রিকোণাকৃতি অঙ্গ। এর সামনে থাকে মূত্রথলি এবং পেছনে মলদ্বার। জরায়ুর দুটি ভাগ—মূল অংশ বা বডি এবং জরায়ুমুখ। মূল অংশের ওপরের দুই কোণা থেকে দুটি ডিম্ববাহী নালি শুরু হয়েছে। জরায়ুর প্রথম ও প্রধান কাজ হলো গর্ভধারণ করা। গর্ভধারণ না হলে মাসিক চক্রের হরমোনজনিত কারণে জরায়ুর ভিতরের একটি স্তর ঝরে পড়ে — একে ঋতুস্রাব বা মাসিক বলা হয়।",
                "ডিম্ববাহী নালি: জরায়ু থেকে লম্বা দুটি ডিম্ববাহী নালি দুই দিকে ডিম্বাশয়/ওভারি পর্যন্ত বিস্তৃত। ডিম্ববাহী নালির শেষ অংশ হাতের আঙুলের মতো অনেকগুলো ভাগে বিভক্ত থাকে—এটিকে ফিম্ব্রিয়া বলে। সহবাসের পরে শুক্রাণু যোনিপথ হয়ে জরায়ু পেরিয়ে ডিম্বনালিতে পৌঁছায়। এ সময় যদি ওভুলেশন ঘটে, তবে ডিম্বাণুটি ডিম্বাশয় থেকে ফিম্ব্রিয়ার মাধ্যমে ডিম্বনালিতে প্রবেশ করে। এখানেই ডিম্বাণু ও শুক্রাণুর মিলন হয়। নিষিক্ত ডিম্বাণুটি কয়েকদিন ডিম্বনালিতে থেকে পরে জরায়ুতে ফিরে এসে ভ্রূণ হিসেবে স্থাপিত হয়।",
                "যোনিপথ: যোনিপথ জরায়ুর ভিতর থেকে শুরু হয়ে শরীরের বাইরে এসে যোনিমুখে শেষ হয়েছে।",
                "স্তন: স্তন সরাসরি প্রজননতন্ত্রের অংশ না হলেও এটি আনুষঙ্গিক প্রজনন অঙ্গ হিসেবে বিবেচিত হয়, কারণ শিশুর জন্মের পর স্তনেই বুকের দুধ তৈরি হয়।",
              ];

              const renderList = (items) =>
                items
                  .map(
                    (text, idx) => `
                      <li data-aos="fade-left" data-aos-delay="${80 + idx * 20}">
                        <i class="fa-solid fa-circle-check"></i>
                        <span>${text}</span>
                      </li>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "নারী প্রজননতন্ত্র",
                    "নারী প্রজননতন্ত্র"
                  )}</h2>

                  <section class="menstrual-feature modern-card glass-card position-relative overflow-hidden" data-aos="fade-up" data-aos-delay="40">
                    <span class="menstrual-corner-accent" aria-hidden="true"></span>
                    <span class="menstrual-corner-pill" aria-hidden="true"></span>
                    <div class="row g-4 align-items-center">
                      <div class="col-lg-5">
                        <figure class="rounded-4 overflow-hidden shadow-sm mb-0">
                          <img src="img/modu4/nari.jpg" alt="নারী প্রজননতন্ত্র" class="img-fluid w-100 object-fit-cover" />
                        </figure>
                      </div>
                      <div class="col-lg-7">
                        <ul class="list-unstyled puberty-list mb-0">
                          ${renderList(points)}
                        </ul>
                      </div>
                    </div>
                  </section>
                </div>
              `;
            })(),
          },
          {
            id: "ch4-lesson-3",
            title: yhLang(
              "Care During Menstruation",
              "মাসিক চলাকালীন মেয়েদের করণীয়"
            ),
            icon: "fa-heart-circle-check",
            gradientClass: "bg-gradient-rose",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q4c",
                  question: yhLang(
                    "মাসিকের সময় ন্যাপকিন কতবার বদলানো উচিত?",
                    "মাসিকের সময় ন্যাপকিন কতবার বদলানো উচিত?"
                  ),
                  options: [
                    yhLang("দিনে অন্তত ৪–৬ বার", "দিনে অন্তত ৪–৬ বার"),
                    yhLang("দিনে মাত্র ১ বার", "দিনে মাত্র ১ বার"),
                    yhLang("সপ্তাহে একবার", "সপ্তাহে একবার"),
                    yhLang("বদলানোর প্রয়োজন নেই", "বদলানোর প্রয়োজন নেই"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const tips = [
                "মাসিককালীন সময়ে মেয়েদের প্রচুর পরিমাণে বিভিন্ন ধরনের পুষ্টিকর খাবার, শাকসবজি এবং ফলমূল খেতে হবে এবং প্রচুর পরিমাণে পানি পান করতে হবে।",
                "প্রতিদিন ভালোভাবে গোসল এবং প্রজনন অঙ্গ পানি ও সাবান দিয়ে পরিষ্কার করতে হবে।",
                "মাসিকের সময় ঘরে তৈরি পরিষ্কার ন্যাপকিন/কাপড় অথবা স্যানিটারি ন্যাপকিন ব্যবহার করতে হবে। রক্তস্রাবের পরিমাণ অনুযায়ী তা দিনে অন্ততপক্ষে ৪ থেকে ৬ বার বদলাতে হবে।",
                "ব্যবহারের পর স্যানিটারি ন্যাপকিন কাগজে মুড়িয়ে ডাস্টবিনে বা ময়লা ফেলার নির্দিষ্ট স্থানে ফেলতে হবে। কাপড় ব্যবহার করলে ব্যবহার শেষে কাপড়টি সাবান ও পানি দিয়ে ধুতে হবে এবং সূর্যের আলোতে শুকিয়ে পরিষ্কার প্যাকেটে রেখে পরবর্তীতে ব্যবহারের জন্য সংরক্ষণ করতে হবে।",
                "মাসিকের সময় স্বাভাবিক হাঁটাচলা ও হালকা ব্যায়াম করতে হবে এবং পর্যাপ্ত পরিমাণে ঘুমাতে হবে।",
                "মাসিক বন্ধ থাকলে, এক মাসে ২–৩ বার মাসিক হলে, প্রচুর রক্তস্রাব হলে, তীব্র ব্যথা হলে বা অস্বাভাবিক কোনো সমস্যা দেখা দিলে চিকিৎসকের পরামর্শ নিতে হবে।",
              ];

              const renderList = (items) =>
                items
                  .map(
                    (text, idx) => `
                      <li data-aos="fade-left" data-aos-delay="${80 + idx * 20}">
                        <i class="fa-solid fa-circle-check"></i>
                        <span>${text}</span>
                      </li>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "মাসিক চলাকালীন মেয়েদের করণীয়",
                    "মাসিক চলাকালীন মেয়েদের করণীয়"
                  )}</h2>

                  <section class="menstrual-feature modern-card glass-card position-relative overflow-hidden" data-aos="fade-up" data-aos-delay="40">
                    <span class="menstrual-corner-accent" aria-hidden="true"></span>
                    <span class="menstrual-corner-pill" aria-hidden="true"></span>
                    <div class="row g-4 align-items-center">
                      <div class="col-lg-5">
                        <figure class="rounded-4 overflow-hidden shadow-sm mb-0">
                          <img src="img/modu4/masik2.jpg" alt="মাসিক চলাকালীন করণীয়" class="img-fluid w-100 object-fit-cover" />
                        </figure>
                      </div>
                      <div class="col-lg-7">
                        <div class="menstrual-inline-divider" aria-hidden="true"></div>
                        <ul class="list-unstyled puberty-list mb-0">
                          ${renderList(tips)}
                        </ul>
                      </div>
                    </div>
                  </section>
                </div>
              `;
            })(),
          },
          {
            id: "ch4-lesson-4",
            title: yhLang(
              "Support Systems for Menstrual Health",
              "মাসিক ব্যবস্থাপনায় সহযোগিতা"
            ),
            icon: "fa-people-roof",
            gradientClass: "bg-gradient-rose",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q4d",
                  question: yhLang(
                    "স্কুলে মাসিকের সময় জরুরি স্যানিটারি ন্যাপকিন কেন গুরুত্বপূর্ণ?",
                    "স্কুলে মাসিকের সময় জরুরি স্যানিটারি ন্যাপকিন কেন গুরুত্বপূর্ণ?"
                  ),
                  options: [
                    yhLang(
                      "প্রস্তুতি ছাড়া শুরু হলে তাৎক্ষণিক সহায়তা দিতে",
                      "প্রস্তুতি ছাড়া শুরু হলে তাৎক্ষণিক সহায়তা দিতে"
                    ),
                    yhLang("শুধু প্রদর্শনের জন্য", "শুধু প্রদর্শনের জন্য"),
                    yhLang("অপ্রয়োজনীয় ব্যয়", "অপ্রয়োজনীয় ব্যয়"),
                    yhLang("নিষिद्ध", "নিষিদ্ধ"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const parentPoints = [
                "কৈশোরের শুরুতে কিশোরীকে মাসিক ও এর ব্যবস্থাপনা বিষয়ে তথ্য বা শিক্ষা দেওয়া।",
                "কোনো সমস্যা হলে যেন বাবা-মায়ের সাথে আলোচনা করে—সেভাবে তাকে উৎসাহিত করা।",
                "ঋতুস্রাবকে ভয় না পেয়ে সহজভাবে নিতে শিক্ষা দেওয়া।",
                "এই সময়ে স্কুলে যাওয়া, খেলাধুলা করা সহ সব কাজ স্বাভাবিকভাবে করতে উৎসাহ দেওয়া।",
                "ঋতুস্রাবের সময়ে কিশোরীকে বেশি করে পুষ্টিকর খাবার খেতে উৎসাহিত করা।",
              ];

              const schoolIntro =
                "অনেক মেয়েই মাসিকের সময়, বিশেষ করে মাসিকের প্রথম দিনগুলোতে স্কুল/কলেজে যেতে চায় না। প্রতিমাসের এমন অনুপস্থিতি তাদের লেখাপড়া ও ফলাফলের উপর নেতিবাচক প্রভাব ফেলে। ফলাফল খারাপ হওয়ায় তারা পড়াশোনা বন্ধ করে দেয়, আবার অনেকের অভিভাবক এ সময় মেয়েদের বিয়ে দিয়ে দেন। এ অবস্থা থেকে পরিত্রাণ পেতে শিক্ষা প্রতিষ্ঠানের কর্তৃপক্ষকে ঋতুস্রাবের সময় ছাত্রীদের সহায়তা প্রদান করতে হবে। যেমন—";

              const schoolPoints = [
                "একজন বা দু’জন নারী শিক্ষককে এ বিষয়ে দায়িত্ব দেওয়া যেতে পারে যেন তারা মাসিকের সময়ে ছাত্রীদের ব্যক্তিগত পরিষ্কার-পরিচ্ছন্নতা বিষয়ে তথ্য দিয়ে সাহায্য করতে পারেন।",
                "অনেক সময় মাসের নির্দিষ্ট সময়ের আগে বা প্রস্তুতি ছাড়া হঠাৎ করে মাসিক শুরু হয়ে যেতে পারে। সে সময় স্কুল কর্তৃপক্ষ জরুরি ভিত্তিতে স্যানিটারি ন্যাপকিন দিয়ে (অর্থ ছাড়া বা অর্থের বিনিময়ে) ছাত্রীকে সাহায্য করতে পারে।",
                "অনেক মেয়ের মাসিকের সময় তলপেটে তীব্র ব্যথা হয়। তাই স্কুলের ফার্স্ট এইড বক্সে বেদনানাশক ট্যাবলেট রাখা প্রয়োজন।",
                "মনে রাখতে হবে যে, ঋতুস্রাব একটি স্বাভাবিক শারীরিক প্রক্রিয়া—এ নিয়ে লজ্জা বা সংকোচের কিছু নেই। এ বিষয়টি ছাত্র-ছাত্রী, শিক্ষকসহ সবাইকে সহজভাবে দেখার জন্য এবং সহযোগিতা দেওয়ার জন্য ওরিয়েন্টেশন প্রদান করা প্রয়োজন।",
              ];

              const essentials = [
                "ছেলে ও মেয়েদের জন্য পৃথক টয়লেটের ব্যবস্থা করতে হবে",
                "সার্বক্ষণিক পানির ব্যবস্থা থাকতে হবে",
                "টয়লেটে পর্যাপ্ত সাবানের ব্যবস্থা রাখতে হবে",
                "টয়লেটে ঢাকনাযুক্ত বিন/ঝুড়ির ব্যবস্থা রাখতে হবে",
                "টয়লেট প্রতিদিন পরিষ্কারের জন্য পরিচ্ছন্নতা কর্মীর ব্যবস্থা রাখতে হবে",
              ];

              const renderList = (items) =>
                items
                  .map(
                    (text, idx) => `
                      <li data-aos="fade-left" data-aos-delay="${80 + idx * 20}">
                        <i class="fa-solid fa-circle-check"></i>
                        <span>${text}</span>
                      </li>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "মাসিক ব্যবস্থাপনায় বাবা-মা ও শিক্ষাপ্রতিষ্ঠানের ভূমিকা",
                    "মাসিক ব্যবস্থাপনায় বাবা-মা ও শিক্ষাপ্রতিষ্ঠানের ভূমিকা"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <h3 class="gradient-text d-flex align-items-center gap-2"><span>✅</span>${yhLang(
                      "মাসিক ব্যবস্থাপনায় বাবা-মায়ের ভূমিকা",
                      "মাসিক ব্যবস্থাপনায় বাবা-মায়ের ভূমিকা"
                    )}</h3>
                    <ul class="list-unstyled puberty-list mb-0">
                      ${renderList(parentPoints)}
                    </ul>
                  </section>

                  <div class="menstrual-section-divider" aria-hidden="true"></div>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="80">
                    <h3 class="gradient-text d-flex align-items-center gap-2"><span>✅</span>${yhLang(
                      "মাসিক ব্যবস্থাপনায় স্কুল/কলেজ কর্তৃপক্ষের ভূমিকা",
                      "মাসিক ব্যবস্থাপনায় স্কুল/কলেজ কর্তৃপক্ষের ভূমিকা"
                    )}</h3>
                    <p class="text-muted mb-3">${schoolIntro}</p>
                    <ul class="list-unstyled puberty-list mb-0">
                      ${renderList(schoolPoints)}
                    </ul>
                  </section>

                  <div class="menstrual-section-divider" aria-hidden="true"></div>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="120">
                    <h3 class="gradient-text d-flex align-items-center gap-2"><span>✅</span>${yhLang(
                      "সবচেয়ে প্রয়োজনীয় বিষয়সমূহ যা শিক্ষা প্রতিষ্ঠানকে অবশ্যই পালন করতে হবে",
                      "সবচেয়ে প্রয়োজনীয় বিষয়সমূহ যা শিক্ষা প্রতিষ্ঠানকে অবশ্যই পালন করতে হবে"
                    )}</h3>
                    <ul class="list-unstyled puberty-list mb-0">
                      ${renderList(essentials)}
                    </ul>
                  </section>
                </div>
              `;
            })(),
          },
          {
            id: "ch4-lesson-5",
            title: yhLang(
              "মাসিকের অস্বাভাবিকতা ও ব্যবস্থাপনা",
              "মাসিকের অস্বাভাবিকতা ও ব্যবস্থাপনা"
            ),
            icon: "fa-heart-pulse",
            gradientClass: "bg-gradient-rose",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q4e",
                  question: yhLang(
                    "মাসিক বন্ধ থাকলে প্রথমে কী পরীক্ষা করা উচিত?",
                    "মাসিক বন্ধ থাকলে প্রথমে কী পরীক্ষা করা উচিত?"
                  ),
                  options: [
                    yhLang("গর্ভধারণ পরীক্ষা", "গর্ভধারণ পরীক্ষা"),
                    yhLang("রক্তচাপ পরীক্ষা", "রক্তচাপ পরীক্ষা"),
                    yhLang("চোখের পরীক্ষা", "চোখের পরীক্ষা"),
                    yhLang("শ্রবণ পরীক্ষা", "শ্রবণ পরীক্ষা"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const warningPoints = [
                "মাসিক বন্ধ হয়ে গেছে অথবা এক মাসে ২/৩ বার মাসিক হচ্ছে, অর্থাৎ নিয়মিত মাসিক হচ্ছে না।",
                "মাসিকের সময় অতিরিক্ত রক্তক্ষরণ হওয়া।",
                "দুইটি মাসিকের মধ্যবর্তী সময়ে ফোঁটায় ফোঁটায় রক্ত যাওয়া।",
                "দুর্গন্ধযুক্ত রক্ত যাওয়া বা মাসিকের সময় জ্বর থাকা।",
                "মাসিকের সময় তলপেটে অস্বাভাবিক ব্যথা হওয়া।",
              ];

              const managementPoints = [
                "মাসিক বন্ধ হয়ে যাওয়া গর্ভধারণের একটি লক্ষণ। সেক্ষেত্রে উপযুক্ত পরীক্ষা করে গর্ভধারণ নিশ্চিত হলে, স্বাস্থ্যসেবা প্রদানকারীর নিকট থেকে গর্ভজনিত সেবা গ্রহণ করতে হবে। তবে মনে রাখতে হবে, মাসিক বন্ধ মানেই নিশ্চিত গর্ভধারণ নয়—তাই অবশ্যই গর্ভধারণ পরীক্ষা (প্রীয়ড টেস্ট/প্রেগনেন্সি টেস্ট) করতে হবে।",
                "অনিয়মিত মাসিক, মাসিকের সময় অতিরিক্ত রক্ত যাওয়া, অথবা অতিরিক্ত ব্যথা হওয়া—এসব প্রজননতন্ত্র বা হরমোনজনিত সমস্যার লক্ষণ হতে পারে। তাই মেয়েদের বিশেষজ্ঞ চিকিৎসকের কাছে রেফার করতে হবে।",
                "মাসিকের সময় অতিরিক্ত ব্যথা হলে ব্যথানাশক ওষুধ (ডাক্তারের পরামর্শ অনুযায়ী) খেতে হবে।",
                "চিকিৎসার পাশাপাশি মেয়েদের পুষ্টিকর খাবার খেতে, স্কুলে যেতে, এবং হালকা ব্যায়াম ও হাঁটাচলা করতে উৎসাহিত করতে হবে।",
              ];

              const renderList = (items) =>
                items
                  .map(
                    (text, idx) => `
                      <li data-aos="fade-left" data-aos-delay="${80 + idx * 20}">
                        <i class="fa-solid fa-circle-check"></i>
                        <span>${text}</span>
                      </li>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "মাসিকের অস্বাভাবিকতা ও এর ব্যবস্থাপনা",
                    "মাসিকের অস্বাভাবিকতা ও এর ব্যবস্থাপনা"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <h3 class="gradient-text">${yhLang(
                      "মাসিকের অস্বাভাবিকতা",
                      "মাসিকের অস্বাভাবিকতা"
                    )}</h3>
                    <p class="text-muted mb-3">${yhLang(
                      "যদি কোনো মেয়ের মাসিকের ক্ষেত্রে নিচের যেকোনো একটিও দেখা যায়, তবে তাকে মাসিকের অস্বাভাবিকতা বলা হবে।",
                      "যদি কোনো মেয়ের মাসিকের ক্ষেত্রে নিচের যেকোনো একটিও দেখা যায়, তবে তাকে মাসিকের অস্বাভাবিকতা বলা হবে।"
                    )}</p>
                    <ul class="list-unstyled puberty-list mb-0">
                      ${renderList(warningPoints)}
                    </ul>
                  </section>

                  <div class="menstrual-section-divider" aria-hidden="true"></div>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="80">
                    <h3 class="gradient-text">${yhLang("ব্যবস্থাপনা", "ব্যবস্থাপনা")}</h3>
                    <ul class="list-unstyled puberty-list mb-0">
                      ${renderList(managementPoints)}
                    </ul>
                  </section>
                </div>
              `;
            })(),
          },
        ],
      },
      {
        id: "ch-5",
        title: yhLang(
          "Module-5: Wet dream (ejaculation) Hygiene and Management",
          "মডিউল-৫: ছেলেদের স্বপ্নদোষ ও বীর্যপাত ব্যবস্থাপনা"
        ),
        lessons: [
          {
            id: "ch5-lesson-1",
            title: yhLang(
              "ছেলেদের স্বপ্নদোষ ও বীর্যপাত ব্যবস্থাপনা",
              "ছেলেদের স্বপ্নদোষ ও বীর্যপাত ব্যবস্থাপনা"
            ),
            icon: "fa-mars",
            gradientClass: "bg-gradient-blue",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q5a",
                  question: yhLang(
                    "স্বপ্নদোষ বলতে কী বোঝায়?",
                    "স্বপ্নদোষ বলতে কী বোঝায়?"
                  ),
                  options: [
                    yhLang(
                      "ঘুমের মধ্যে স্বাভাবিকভাবে বীর্য বের হওয়া",
                      "ঘুমের মধ্যে স্বাভাবিকভাবে বীর্য বের হওয়া"
                    ),
                    yhLang("দীর্ঘমেয়াদি রোগ", "দীর্ঘমেয়াদি রোগ"),
                    yhLang("মূত্রনালির সংক্রমণ", "মূত্রনালির সংক্রমণ"),
                    yhLang("হরমোনের ঘাটতি", "হরমোনের ঘাটতি"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const dreamInfo = [
                "ছেলেদের সাধারণত বয়ঃসন্ধির সময় বা ১৩ থেকে ১৫ বছর বয়স থেকে বীর্যথলিতে বীর্য তৈরি শুরু হয়। অতিরিক্ত বীর্য স্বাভাবিক নিয়মে শরীর থেকে বেরিয়ে আসে। এটাই হলো বীর্যপাত। ঘুমের মধ্যে এই বীর্য বেরিয়ে আসাকে বলা হয় স্বপ্নদোষ বা স্বপ্নে বীর্যপাত।",
                "স্বপ্নদোষ ছেলেদের জন্য একটি স্বাভাবিক প্রক্রিয়া, এটি কোনো রোগ নয়। কারো স্বপ্নদোষ না হওয়াও কোনো অস্বাভাবিক বিষয় নয় এবং এর অর্থ এই নয় যে তার বীর্য ঠিকমতো তৈরি হচ্ছে না। তাই ‘জীবন নষ্ট হয়ে গেছে’ ভেবে মন খারাপ করা বা চিকিৎসার জন্য কবিরাজ/হাতুড়ে ডাক্তারের কাছে যাওয়াও উচিত নয়।",
              ];

              const anatomySections = [
                {
                  title: "টেস্টিস / অণ্ডকোষ ও স্ক্রোটাম / অণ্ডকোষের থলি",
                  text: "পেনিসের নিচে ঝুলে থাকা থলিটিকে স্ক্রোটাম বলা হয়, যার মধ্যে দুটি বলের মতো টেস্টিস (অণ্ডকোষ) থাকে। এখান থেকেই মূলত শুক্রাণু এবং পুরুষ হরমোন টেস্টোস্টেরন তৈরি হয়।",
                },
                {
                  title: "শুক্রাণু",
                  text: "বয়ঃসন্ধিকাল থেকে শুক্রাণু উৎপাদিত হতে শুরু করে। শুক্রাণুগুলো একটি সাদা তরল পদার্থের মধ্যে থাকে, যাকে বীর্য বলা হয়। পুরুষের বীর্যপাতের সময় এই বীর্য পেনিসের অগ্রভাগ দিয়ে বেরিয়ে আসে। নারীর সঙ্গে শারীরিক মিলনের সময় পুরুষের বীর্য নারীর যোনি ও জরায়ুর মধ্য দিয়ে ডিম্বনালিতে প্রবেশ করে এবং ডিম্বাণুর সঙ্গে মিলিত হয়। অনেক শুক্রাণুর মধ্যে মাত্র একটি শুক্রাণু ডিম্বাণুকে নিষিক্ত করার জন্য যথেষ্ট।",
                },
                {
                  title: "ইউরেথ্রা / মূত্রনালি",
                  text: "দেহ থেকে মূত্র এবং বীর্য, উভয়ই পেনিসের অগ্রভাগ দিয়ে বেরিয়ে আসে।",
                },
              ];

              const renderParagraphs = () =>
                dreamInfo
                  .map(
                    (text, idx) => `
                      <p class="mb-3" data-aos="fade-up" data-aos-delay="${80 +
                        idx * 20}">${text}</p>
                    `
                  )
                  .join("");

              const renderAnatomy = () =>
                anatomySections
                  .map(
                    (item, idx) => `
                      <div class="col-12 col-md-4">
                        <article class="modern-card glass-card menstrual-info-card h-100" data-aos="fade-up" data-aos-delay="${80 +
                          idx * 40}">
                          <h4 class="gradient-text mb-2">${item.title}</h4>
                          <p class="mb-0">${item.text}</p>
                        </article>
                      </div>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "ছেলেদের স্বপ্নদোষ ও বীর্যপাত ব্যবস্থাপনা",
                    "ছেলেদের স্বপ্নদোষ ও বীর্যপাত ব্যবস্থাপনা"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <h3 class="gradient-text">${yhLang(
                      "ছেলেদের স্বপ্নদোষ / বীর্যপাত",
                      "ছেলেদের স্বপ্নদোষ / বীর্যপাত"
                    )}</h3>
                    ${renderParagraphs()}
                  </section>

                  <div class="menstrual-section-divider" aria-hidden="true"></div>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="60">
                    <div class="row align-items-center g-4">
                      <div class="col-lg-6">
                        <h3 class="gradient-text mb-3">${yhLang(
                          "পুরুষ প্রজননতন্ত্র",
                          "পুরুষ প্রজননতন্ত্র"
                        )}</h3>
                        <h4 class="fw-semibold mb-2">${yhLang(
                          "পেনিস / পুরুষাঙ্গ",
                          "পেনিস / পুরুষাঙ্গ"
                        )}</h4>
                        <p class="mb-2">পেনিস যৌন সঙ্গমের মাধ্যমে নারীর যোনিতে শুক্রাণু প্রবেশ করায় এবং একই সাথে এটি মূত্র নির্গমনের কাজও করে। যৌন উত্তেজনার সময় পেনিসে রক্ত চলাচল বেড়ে যায় এবং এটি শক্ত ও বড় হয়। পরবর্তীতে বীর্যপাত হয়, অর্থাৎ পেনিস থেকে বীর্য বেরিয়ে আসে।</p>
                        <p class="mb-0">বীর্যপাত অনেক সময় ঘুমের মধ্যেও হতে পারে — এটি সম্পূর্ণ স্বাভাবিক।</p>
                      </div>
                      <div class="col-lg-6">
                        <figure class="image-card mb-0" style="min-height:260px;">
                          <img src="img/modu5/birjo.jpg" alt="পেনিস / পুরুষাঙ্গ" class="img-fluid rounded-4 shadow-sm animate-float-slow" />
                        </figure>
                      </div>
                    </div>
                  </section>

                  <div class="menstrual-section-divider" aria-hidden="true"></div>

                  <div class="row g-3">
                    ${renderAnatomy()}
                  </div>
                </div>
              `;
            })(),
          },
          {
            id: "ch5-lesson-2",
            title: yhLang(
              "ছেলেদের স্বপ্নদোষ / বীর্যপাতের ব্যবস্থাপনা",
              "ছেলেদের স্বপ্নদোষ / বীর্যপাতের ব্যবস্থাপনা"
            ),
            icon: "fa-hand-holding-heart",
            gradientClass: "bg-gradient-teal",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q5b",
                  question: yhLang(
                    "স্বপ্নদোষের পর প্রথম করণীয় কী?",
                    "স্বপ্নদোষের পর প্রথম করণীয় কী?"
                  ),
                  options: [
                    yhLang(
                      "শরীর পরিষ্কার করে কাপড় পরিবর্তন করা",
                      "শরীর পরিষ্কার করে কাপড় পরিবর্তন করা"
                    ),
                    yhLang("ডাক্তারের কাছে দৌড়ে যাওয়া", "ডাক্তারের কাছে দৌড়ে যাওয়া"),
                    yhLang("খাবার খাওয়া বন্ধ করা", "খাবার খাওয়া বন্ধ করা"),
                    yhLang("বন্ধুদের সঙ্গে বাজে কথা বলা", "বন্ধুদের সঙ্গে বাজে কথা বলা"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const routineSteps = [
                "<strong>১.</strong> ছেলেদের স্বপ্নদোষ বা বীর্যপাত হলে শরীর পরিষ্কার করে কাপড় পরিবর্তন করতে হবে।",
                "<strong>২.</strong> বিষয়টি নিয়ে মন খারাপ না করে নিজেকে বিভিন্ন ধরনের কাজে (পড়াশোনার বাইরে ভালো বই পড়া, খেলাধুলা/ব্যায়াম করা, উন্নয়নমূলক/সেবামূলক কাজ করা, ধর্মীয় কাজ করা ইত্যাদি) সম্পৃক্ত করতে হবে।",
                "<strong>৩.</strong> প্রতিদিন গোসলের সময় যৌনাঙ্গ পরিষ্কার করতে হবে। যদি পেনিসের অগ্রভাগে বাড়তি চামড়া থাকে (ফোরস্কিন), সেটিও পরিষ্কার করতে হবে।",
                "<strong>৪.</strong> প্রতিদিন পরিষ্কার আন্ডারওয়্যার ব্যবহার করতে হবে।",
                "<strong>৫.</strong> যৌনাঙ্গ বা মলদ্বারের ভেতরে কোনো ধরনের অপরিষ্কার বস্তু প্রবেশ করানো যাবে না।",
                "<strong>৬.</strong> অপরিষ্কার হাতে কখনই নিজের যৌনাঙ্গ ধরা যাবে না।",
                "<strong>৭.</strong> বয়ঃসন্ধিকালীন বৃদ্ধির কারণে এসময় ছেলেদের প্রচুর পুষ্টিকর খাবার খেতে হবে।",
              ];

              const restraintSteps = [
                "<strong>১.</strong> বয়ঃসন্ধিকালে বিপরীত লিঙ্গের প্রতি আকর্ষণ অনুভব করা স্বাভাবিক। তবে অবশ্যই মানুষ হিসেবে নিজেকে সংযত রাখতে হবে।",
                "<strong>২.</strong> এসময় রাস্তাঘাটে বা স্কুল–কলেজের সামনে মেয়েদের আজেবাজে কথা বলা, শিস দেওয়া বা কোনো ধরনের যৌন হয়রানি করা যাবে না।",
                "<strong>৩.</strong> সুযোগ পেয়ে মেয়েদের শরীরের স্পর্শকাতর স্থানে হাত দেওয়া যাবে না।",
                "<strong>৪.</strong> কোনো অবস্থাতেই বলপ্রয়োগ করে কারো সঙ্গে যৌন সম্পর্ক স্থাপন করা যাবে না।",
                "<strong>৫.</strong> খারাপ বন্ধুদের প্ররোচনায় পতিতালয়ে যাওয়া যাবে না।",
              ];

              const reminderPoints = [
                "স্বাস্থ্যের ক্ষতি হতে পারে",
                "যৌনবাহিত রোগের ঝুঁকি বেড়ে যায়",
                "এবং সামাজিকভাবে হেয়-প্রতিপন্ন হতে হয়",
              ];

              const renderTickList = (items, baseDelay = 80) =>
                items
                  .map(
                    (text, idx) => `
                      <li data-aos="fade-left" data-aos-delay="${baseDelay + idx * 20}">
                        <i class="fa-solid fa-circle-check"></i>
                        <span>${text}</span>
                      </li>
                    `
                  )
                  .join("");

              const renderAlertList = (items) =>
                items
                  .map(
                    (text, idx) => `
                      <li data-aos="fade-up" data-aos-delay="${120 + idx * 20}">
                        <i class="fa-solid fa-triangle-exclamation"></i>
                        <span>${text}</span>
                      </li>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "ছেলেদের স্বপ্নদোষ / বীর্যপাতের ব্যবস্থাপনা",
                    "ছেলেদের স্বপ্নদোষ / বীর্যপাতের ব্যবস্থাপনা"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <div class="row align-items-center g-4 flex-column-reverse flex-lg-row">
                      <div class="col-lg-6">
                        <h3 class="gradient-text mb-3">${yhLang(
                          "ছেলেদের স্বপ্নদোষ / বীর্যপাতের ব্যবস্থাপনা",
                          "ছেলেদের স্বপ্নদোষ / বীর্যপাতের ব্যবস্থাপনা"
                        )}</h3>
                        <h4 class="fw-semibold mb-3">${yhLang("✔ করণীয়", "✔ করণীয়")}</h4>
                        <p class="text-muted mb-3" data-aos="fade-up" data-aos-delay="60">স্বপ্নদোষের পর ব্যক্তিগত পরিচ্ছন্নতা বজায় রাখার উপায়গুলো এই নির্দেশনাতে ছবির সাথে দেখানো হয়েছে, যাতে ছেলেরা সহজেই ধাপগুলো অনুসরণ করতে পারে।</p>
                        <ul class="list-unstyled puberty-list mb-0">
                          ${renderTickList(routineSteps)}
                        </ul>


                        <section class="modern-card mb-2 glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="80">
                          <h3 class="gradient-text mb-3">${yhLang(
                            "নিজেকে সংযত রাখা",
                            "নিজেকে সংযত রাখা"
                          )}</h3>
                          <ul class="list-unstyled puberty-list mb-0">
                            ${renderTickList(restraintSteps, 60)}
                          </ul>
                        </section>


                        <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="100">
                          <h3 class="gradient-text mb-3">${yhLang(
                            "মনে রাখতে হবে",
                            "মনে রাখতে হবে"
                          )}</h3>
                          <p class="text-muted mb-3" data-aos="fade-up" data-aos-delay="100">এসব অসংযত কর্মকাণ্ডের কারণে—</p>
                          <ul class="list-unstyled puberty-list mb-0">
                            ${renderAlertList(reminderPoints)}
                          </ul>
                        </section>
                      </div>
                      <div class="col-lg-6">
                        <figure class="image-card mb-0" style="min-height:260px;">
                          <img src="img/modu5/birjo2.jpg" alt="স্বপ্নদোষের পর ব্যক্তিগত পরিচ্ছন্নতার ধাপ" class="img-fluid rounded-4 shadow-sm animate-float-slow" />
                          <figcaption class="figure-caption text-center mt-2 small text-muted">চিত্র: স্বপ্নদোষের পর স্বাস্থ্যবিধি অনুসরণের ভিজ্যুয়াল ধাপ</figcaption>
                        </figure>
                      </div>
                    </div>
                  </section>
                </div>
              `;
            })(),
          },
        ],
      },
      {
        id: "ch-6",
        title:
          yhLang(
            "Module-6: Child Marriage",
            "মডিউল-৬: বাল্যবিবাহ"
          ),
        lessons: [
          {
            id: "ch6-lesson-1",
            title: yhLang("বাল্যবিবাহ", "বাল্যবিবাহ"),
            icon: "fa-ring",
            gradientClass: "bg-gradient-rose",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q6a",
                  question: yhLang(
                    "বাংলাদেশে মেয়েদের ন্যূনতম বিয়ের বয়স কত?",
                    "বাংলাদেশে মেয়েদের ন্যূনতম বিয়ের বয়স কত?"
                  ),
                  options: [
                    yhLang("১৮ বছর", "১৮ বছর"),
                    yhLang("১৬ বছর", "১৬ বছর"),
                    yhLang("২১ বছর", "২১ বছর"),
                    yhLang("১৫ বছর", "১৫ বছর"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const bdhsStats = [
                "বিবাহিত নারীদের <strong>৫০%</strong>-এর বিয়ে হয়েছে <strong>১৮ বছরের আগে</strong>।",
                "গর্ভবতী কিশোরীদের মধ্যে <strong>জন্মহার প্রতি হাজারে ৯২</strong>।",
                "<strong>১৫–১৯ বছর</strong> বয়সী চারজন কিশোরীর মধ্যে একজন (২৪%) গর্ভধারণ করে।",
                "প্রায় পাঁচজনের মধ্যে একজন কিশোরী (১৮%) জীবিত সন্তান জন্মদান করে।",
              ];

              const renderStats = (items) =>
                items
                  .map(
                    (text, idx) => `
                      <li data-aos="fade-up" data-aos-delay="${80 + idx * 40}">
                        <i class="fa-solid fa-circle-check"></i>
                        <span>${text}</span>
                      </li>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "বাল্যবিবাহ",
                    "বাল্যবিবাহ"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <div class="row g-4 align-items-start">
                      <div class="col-lg-7">
                        <h3 class="gradient-text mb-3">${yhLang(
                          "বাংলাদেশের আইন ও বাস্তবতা",
                          "বাংলাদেশের আইন ও বাস্তবতা"
                        )}</h3>
                        <p>বাংলাদেশের আইনে মেয়েদের বিয়ের বয়স কমপক্ষে <strong>১৮ বছর</strong> এবং ছেলেদের ক্ষেত্রে <strong>২১ বছর</strong>। এর কম বয়সে বিয়ে হলে তা বাল্যবিবাহ বলে গণ্য করা হয়।</p>
                        <p>বর্তমানে বিশেষ কিছু কারণে <strong>১৬ বছর বয়সে</strong> বিয়ে দেওয়ার বিষয়টি বাল্যবিবাহ নিরোধ আইনে অন্তর্ভুক্ত থাকলেও, বিয়ের বয়স <strong>১৮ বছরই মূল বয়স</strong> হিসেবে বিবেচনা করতে হবে।</p>
                        <div class="alert alert-info rounded-4" role="note">
                          <strong>বিডিএইচএস ২০২২</strong> অনুসারে—
                        </div>
                        <ul class="list-unstyled puberty-list mb-0">
                          ${renderStats(bdhsStats)}
                        </ul>
                      </div>
                      <div class="col-lg-5">
                        <div class="modern-card glass-card h-100" data-aos="fade-left" data-aos-delay="80">
                          <h4 class="mb-2">${yhLang(
                            "বাল্যবিবাহের ঝুঁকি",
                            "বাল্যবিবাহের ঝুঁকি"
                          )}</h4>
                          <p class="mb-0 text-muted">স্বাস্থ্য, শিক্ষা, অর্থনীতি ও সামাজিক নিরাপত্তা—সব দিক থেকেই বাল্যবিবাহ কিশোর-কিশোরীদের ভবিষ্যৎকে ঝুঁকির মুখে ফেলে। সঠিক তথ্য জানিয়ে পরিবার ও সম্প্রদায়কে সচেতন করাই প্রথম পদক্ষেপ।</p>
                        </div>
                      </div>
                    </div>
                  </section>

                  <div class="menstrual-section-divider" aria-hidden="true"></div>

                  <div class="row g-3 align-items-center justify-content-between">
                    <div class="col-12 col-md-6 d-flex justify-content-md-start justify-content-center">
                      <div class="circular-callout circular-callout--warning" data-aos="zoom-in" data-aos-delay="40">
                        বাল্যবিবাহ আইনের চোখে একটি দণ্ডনীয় অপরাধ।
                      </div>
                    </div>
                    <div class="col-12 col-md-6 d-flex justify-content-md-end justify-content-center">
                      <div class="circular-callout circular-callout--info" data-aos="zoom-in" data-aos-delay="80">
                        বাল্যবিবাহ সম্পর্কে কোনো তথ্য থাকলে চাইল্ড হেল্পলাইন <strong>১০৯৮</strong>-এ কল করে রিপোর্ট করা উচিত।
                      </div>
                    </div>
                  </div>
                </div>
              `;
            })(),
          },
          {
            id: "ch6-lesson-2",
            title: yhLang("বাল্যবিবাহের কারণ", "বাল্যবিবাহের কারণ"),
            icon: "fa-diagram-project",
            gradientClass: "bg-gradient-orange",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q6b",
                  question: yhLang(
                    "বাল্যবিবাহের একটি প্রধান কারণ কী?",
                    "বাল্যবিবাহের একটি প্রধান কারণ কী?"
                  ),
                  options: [
                    yhLang("দারিদ্র্য", "দারিদ্র্য"),
                    yhLang("বেশি খেলাধুলা", "বেশি খেলাধুলা"),
                    yhLang("জলবায়ু পরিবর্তন", "জলবায়ু পরিবর্তন"),
                    yhLang("কম্পিউটার ব্যবহার", "কম্পিউটার ব্যবহার"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const orbitCauses = [
                "দারিদ্র্য",
                "প্রচলিত সামাজিক প্রথা ও কুসংস্কার",
                "জেন্ডার বৈষম্য",
                "কন্যাদায়গ্রস্ত পিতার দায়মুক্ত হওয়ার চেষ্টা",
                "সামাজিক নিরাপত্তাহীনতা",
                "শিক্ষা ও সচেতনতার অভাব",
                "মেয়ে শিশুর প্রতি অবহেলা বা তাকে বোঝা মনে করা",
                "স্কুল থেকে ঝরে পড়া",
                "বিবাহ আইন সম্পর্কে অজ্ঞতা",
                "বাল্যবিবাহ নিরোধ আইনের যথাযথ প্রয়োগ না হওয়া",
              ];

              const colorCycle = [
                "bg-gradient-orange",
                "bg-gradient-blue",
                "bg-gradient-rose",
                "bg-gradient-green",
                "bg-gradient-teal",
                "bg-gradient-purple",
                "bg-gradient-tangerine",
                "bg-gradient-emerald",
              ];

              const renderOrbitItems = () => {
                const radius = 150;
                const angleStep = 360 / orbitCauses.length;
                return orbitCauses
                  .map((label, idx) => {
                    const angle = angleStep * idx;
                    const color = colorCycle[idx % colorCycle.length];
                    return `
                      <div class="orbit-item" style="transform: rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg);" data-aos="zoom-in" data-aos-delay="${120 +
                      idx * 30}">
                        <div class="orbit-card ${color}">
                          <span class="orbit-title">${label}</span>
                        </div>
                      </div>
                    `;
                  })
                  .join("");
              };

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "বাল্যবিবাহের কারণ",
                    "বাল্যবিবাহের কারণ"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" aria-labelledby="orbit-child-marriage-causes" data-aos="zoom-in" data-aos-delay="60">
                    <h3 id="orbit-child-marriage-causes" class="d-none">${yhLang(
                      "বাল্যবিবাহ",
                      "বাল্যবিবাহ"
                    )}</h3>
                    <div class="orbit-layout" data-orbit-manual="true">
                      <div class="orbit-center icon-spin-on-hover">
                        <div class="orbit-card bg-gradient-rose">
                          <div class="orbit-title fw-bold">বাল্যবিবাহ</div>
                        </div>
                      </div>
                      ${renderOrbitItems()}
                    </div>
                  </section>
                </div>
              `;
            })(),
          },
          {
            id: "ch6-lesson-3",
            title: yhLang("বাল্যবিবাহের পরিণতি", "বাল্যবিবাহের পরিণতি"),
            icon: "fa-heart-crack",
            gradientClass: "bg-gradient-purple",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q6c",
                  question: yhLang(
                    "বাল্যবিবাহের ফলে কোন ঝুঁকি বেড়ে যায়?",
                    "বাল্যবিবাহের ফলে কোন ঝুঁকি বেড়ে যায়?"
                  ),
                  options: [
                    yhLang("মা ও শিশুমৃত্যু", "মা ও শিশুমৃত্যু"),
                    yhLang("খেলাধুলার সাফল্য", "খেলাধুলার সাফল্য"),
                    yhLang("উচ্চশিক্ষার সুযোগ", "উচ্চশিক্ষার সুযোগ"),
                    yhLang("পর্যটনের সম্ভাবনা", "পর্যটনের সম্ভাবনা"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const consequences = [
                "অপরিণত, অপুষ্ট ও স্বল্প ওজনের শিশুর জন্ম",
                "কিশোরী মায়ের পুষ্টিহীনতা ও স্বাস্থ্যগত সমস্যা",
                "দীর্ঘস্থায়ী প্রজননস্বাস্থ্যজনিত জটিলতা",
                "প্রসব ও প্রসব-পরবর্তী জটিলতায় ভোগা",
                "মা ও শিশুমৃত্যুর ঝুঁকি বৃদ্ধি",
                "দাম্পত্য কলহ",
                "সহিংসতার ঝুঁকি ও আত্মহত্যার প্রবণতা",
                "ঝুঁকিপূর্ণ ও অনিরাপদ যৌন আচরণ",
                "বিবাহ বিচ্ছেদ",
              ];

              const renderList = () =>
                consequences
                  .map(
                    (text, idx) => `
                      <li data-aos="fade-up" data-aos-delay="${80 + idx * 20}">
                        <i class="fa-solid fa-circle-check"></i>
                        <span>${text}</span>
                      </li>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "বাল্যবিবাহের পরিণতি",
                    "বাল্যবিবাহের পরিণতি"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <div class="row g-4 align-items-center">
                      <div class="col-lg-7">
                        <ul class="list-unstyled puberty-list mb-0">
                          ${renderList()}
                        </ul>
                      </div>
                      <div class="col-lg-5">
                        <figure class="image-card mb-0" style="min-height:260px;">
                          <img src="img/modu6/ballo.jpg" alt="অপরিণত, অপুষ্ট ও স্বল্প ওজনের শিশুর জন্ম" class="img-fluid rounded-4 shadow-sm animate-float-slow" />
                        </figure>
                      </div>
                    </div>
                  </section>
                </div>
              `;
            })(),
          },
          {
            id: "ch6-lesson-4",
            title: yhLang("বাল্যবিবাহ প্রতিরোধে করণীয়", "বাল্যবিবাহ প্রতিরোধে করণীয়"),
            icon: "fa-shield-alt",
            gradientClass: "bg-gradient-emerald",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q6d",
                  question: yhLang(
                    "বাল্যবিবাহ প্রতিরোধে কোন একটি করণীয়?",
                    "বাল্যবিবাহ প্রতিরোধে কোন একটি করণীয়?"
                  ),
                  options: [
                    yhLang("ছেলে-মেয়ে সকলের জন্ম নিবন্ধন করা", "ছেলে-মেয়ে সকলের জন্ম নিবন্ধন করা"),
                    yhLang("স্কুল বন্ধ করা", "স্কুল বন্ধ করা"),
                    yhLang("বিস্কুট বিতরণ করা", "বিস্কুট বিতরণ করা"),
                    yhLang("বাল্যবিবাহ উৎসাহিত করা", "বাল্যবিবাহ উৎসাহিত করা"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const measures = [
                "ছেলে-মেয়ে সকলের জন্ম নিবন্ধন করা",
                "বিয়ে সম্পাদনের সময় কাজী যেন অবশ্যই জন্মসনদ যাচাই করেন—এ বিষয়ে কাজীকে সচেতন করা",
                "বাল্যবিবাহের আইন সম্পর্কে কাজী, অভিভাবক ও জনসাধারণকে সচেতন করা",
                "বাল্যবিবাহ ও এর ভয়াবহ পরিণতি সম্পর্কে জনসচেতনতা তৈরি করা",
                "বাল্যবিবাহ হলেও জন্মনিয়ন্ত্রণ পদ্ধতি ব্যবহার ও দেরিতে সন্তান গ্রহণ সম্পর্কে কিশোর-কিশোরী ও অভিভাবকদের সচেতন করা",
                "কিশোর-কিশোরীদের জন্য উপযুক্ত জন্মনিয়ন্ত্রণ পদ্ধতির সহজপ্রাপ্যতা নিশ্চিত করা",
                "‘বাল্যবিবাহ’ নিয়ে কমিউনিটি পর্যায়ে আলোচনা ও প্রতিরোধব্যবস্থা তৈরি করা",
                "বাল্যবিবাহ নিরোধ আইন, ২০১৭ এবং বাল্যবিবাহ নিরোধ বিধিমালা-এর বাস্তব প্রয়োগে সংশ্লিষ্টদের দায়িত্বশীল ভূমিকা নিশ্চিত করা",
                "বাল্যবিবাহ সম্পর্কে জানতে পারলে চাইল্ড হেল্পলাইন <strong>১০৯৮</strong>-এ কল করে রিপোর্ট করা",
              ];

              const renderMeasures = () =>
                measures
                  .map(
                    (text, idx) => `
                      <li data-aos="fade-up" data-aos-delay="${80 + idx * 20}">
                        <i class="fa-solid fa-circle-check"></i>
                        <span>${text}</span>
                      </li>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "বাল্যবিবাহ প্রতিরোধে করণীয়",
                    "বাল্যবিবাহ প্রতিরোধে করণীয়"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <div class="row g-4">
                      <div class="col-12">
                        <ul class="list-unstyled puberty-list mb-3">
                          ${renderMeasures()}
                        </ul>
                      </div>
                    </div>
                  </section>

                  <div class="menstrual-section-divider" aria-hidden="true"></div>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="60">
                    <h3 class="gradient-text">${yhLang("বিয়ে বাতিলের আইন (মুসলিম বিবাহ বাতিল আইন, ১৯৩৯)", "বিয়ে বাতিলের আইন (মুসলিম বিবাহ বাতিল আইন, ১৯৩৯)")}</h3>
                    <p>যদি কোনো নারীর <strong>১৮ বছর পূর্ণ হওয়ার আগে</strong> এবং <strong>তার সম্মতি ছাড়া</strong> বিয়ে হয়, তাহলে সে আদালতে বিবাহ বাতিলের আবেদন করতে পারে— যদি:</p>
                    <ul>
                      <li>সে স্বামীর সঙ্গে দাম্পত্য সম্পর্ক স্থাপন না করে থাকে, এবং</li>
                      <li>১৮ বছর পূর্ণ হওয়ার আগের সম্মতি ছাড়া বিয়ের পর <strong>১৯ বছর পূর্ণ হওয়ার আগেই</strong> বিবাহ বাতিলের আবেদন করে।</li>
                    </ul>
                  </section>

                  <div class="menstrual-section-divider" aria-hidden="true"></div>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="80">
                    <h3 class="gradient-text">${yhLang("বাল্যবিবাহ নিরোধ আইন ও বিধিমালা", "বাল্যবিবাহ নিরোধ আইন ও বিধিমালা")}</h3>
                    <ul>
                      <li><strong>বাল্যবিবাহ নিরোধ আইন, ২০১৭</strong></li>
                      <li><strong>বাল্যবিবাহ নিরোধ বিধিমালা, ২০১৮</strong></li>
                    </ul>
                    <p>এসব আইনের অধীনে বাল্যবিবাহ প্রতিরোধের কার্যক্রম চলমান রয়েছে।</p>
                  </section>

                  <div class="menstrual-section-divider" aria-hidden="true"></div>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="100">
                    <h3 class="gradient-text">${yhLang("বাল্যবিবাহ করার শাস্তি", "বাল্যবিবাহ করার শাস্তি")}</h3>
                    <ul>
                      <li><strong>সর্বোচ্চ ২ বছর কারাদণ্ড</strong>, অথবা</li>
                      <li><strong>সর্বোচ্চ ১ লক্ষ টাকা অর্থদণ্ড</strong>, অথবা</li>
                      <li>উভয় দণ্ডই হতে পারে</li>
                      <li>অর্থদণ্ড অনাদায়ে সর্বোচ্চ <strong>৩ মাস কারাদণ্ড</strong></li>
                    </ul>
                  </section>
                </div>
              `;
            })(),
          },
        ],
      },
      {
        id: "ch-7",
        title: yhLang(
          "Module-7: Adolescent Family Planning",
          "মডিউল-৭: কৈশোরকালীন পরিবার পরিকল্পনা"
        ),
        lessons: [
          {
            id: "ch7-lesson-1",
            title: yhLang("কৈশোরকালীন পরিবার পরিকল্পনা", "কৈশোরকালীন পরিবার পরিকল্পনা"),
            icon: "fa-people-roof",
            gradientClass: "bg-gradient-blue",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q7a",
                  question: yhLang(
                    "পরিবার পরিকল্পনা বলতে কী বোঝায়?",
                    "পরিবার পরিকল্পনা বলতে কী বোঝায়?"
                  ),
                  options: [
                    yhLang(
                      "আয় ও সামাজিক অবস্থার সাথে সন্তান গ্রহণের পরিকল্পনা",
                      "আয় ও সামাজিক অবস্থার সাথে সন্তান গ্রহণের পরিকল্পনা"
                    ),
                    yhLang("ইচ্ছেমতো সন্তান জন্ম দেওয়া", "ইচ্ছেমতো সন্তান জন্ম দেওয়া"),
                    yhLang("কেবল চিকিৎসকের কাজ", "কেবল চিকিৎসকের কাজ"),
                    yhLang("শুধু ভ্রমণ পরিকল্পনা", "শুধু ভ্রমণ পরিকল্পনা"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const permanentMethods = [
                "নারী স্থায়ী পদ্ধতি (টিউবেকটমি)",
                "পুরুষ স্থায়ী পদ্ধতি (ভ্যাসেকটমি)",
              ];

              const shortTermMethods = ["খাবার বড়ি", "কনডম", "ইনজেকশন"];

              const longTermMethods = ["ইমপ্ল্যান্ট", "আইইউডি"];

              const methodTableRows = [
                { type: "স্থায়ী পদ্ধতি", items: permanentMethods },
                { type: "স্বল্পমেয়াদি পদ্ধতি", items: shortTermMethods },
                { type: "দীর্ঘমেয়াদি পদ্ধতি", items: longTermMethods },
              ];

              const renderTableRows = () =>
                methodTableRows
                  .map((row, idx) => `
                    <tr data-aos="fade-up" data-aos-delay="${80 + idx * 20}">
                      <td class="fw-semibold">${row.type}</td>
                      <td>${row.items
                        .map((item) => `<span class="d-block">${item}</span>`)
                        .join("")}</td>
                    </tr>
                  `)
                  .join("");

              const detailedMethodRows = [
                {
                  category: "স্থায়ী পদ্ধতি",
                  subtype: "নারী",
                  methods: [permanentMethods[0]],
                },
                {
                  category: "স্থায়ী পদ্ধতি",
                  subtype: "পুরুষ",
                  methods: [permanentMethods[1]],
                },
                {
                  category: "অস্থায়ী পদ্ধতি",
                  subtype: "স্বল্পমেয়াদি",
                  methods: shortTermMethods,
                },
                {
                  category: "অস্থায়ী পদ্ধতি",
                  subtype: "দীর্ঘমেয়াদি",
                  methods: longTermMethods,
                },
              ];

              const renderDetailedRows = () =>
                detailedMethodRows
                  .map(
                    (row, idx) => `
                      <tr data-aos="fade-up" data-aos-delay="${80 + idx * 20}">
                        <td class="fw-semibold">${row.category}</td>
                        <td>${row.subtype}</td>
                        <td>${row.methods
                          .map((item) => `<span class="d-block">${item}</span>`)
                          .join("")}</td>
                      </tr>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "কৈশোরকালীন পরিবার পরিকল্পনা",
                    "কৈশোরকালীন পরিবার পরিকল্পনা"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <p class="mb-3">একটি দম্পতি তার আয়ের সাথে এবং পারিপার্শ্বিক আর্থ–সামাজিক অবস্থার সাথে সঙ্গতি রেখে কখন এবং কয়টি সন্তান গ্রহণ করবে, দুইটি সন্তানের মাঝে ব্যবধান কতদিনের হবে বা তাদের পরিবার কত ছোট বা বড় হবে, তা ঠিক করা এবং সে লক্ষ্য অর্জনের জন্য যথাযথ ব্যবস্থা গ্রহণ করাই হলো <strong>পরিবার পরিকল্পনা</strong>।</p>
                    <p class="mb-0">যেকোনো কিশোরীই শারীরিক ও মানসিকভাবে সন্তান ধারণের জন্য উপযুক্ত নয়। প্রজনন স্বাস্থ্য বিষয়ে প্রয়োজনীয় তথ্য না থাকার কারণে এই সময়ে গর্ভধারণ মা ও সন্তান উভয়ের জন্যই অত্যন্ত ঝুঁকিপূর্ণ হতে পারে।</p>
                  </section>

                  <div class="menstrual-section-divider" aria-hidden="true"></div>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="60">
                    <div class="row g-4 align-items-center">
                      <div class="col-lg-7">
                        <h3 class="gradient-text mb-3">${yhLang(
                          "পরিবার পরিকল্পনা আধুনিক পদ্ধতিসমূহ",
                          "পরিবার পরিকল্পনা আধুনিক পদ্ধতিসমূহ"
                        )}</h3>
                        <p class="text-muted">বাংলাদেশের পরিবার পরিকল্পনা কার্যক্রম অনুযায়ী যেকোনো সক্ষম দম্পতি আধুনিক পরিবার পরিকল্পনা পদ্ধতি গ্রহণ করতে পারেন। বাংলাদেশের পরিবার পরিকল্পনা কার্যক্রমে <strong>বৈবাহিক অবস্থা</strong> এবং <strong>সন্তান সংখ্যা</strong> বিবেচনা করে পদ্ধতি প্রদান করা হয়।</p>
                        <div class="table-responsive">
                          <table class="table table-bordered text-center align-middle modern-table">
                            <thead class="table-light">
                              <tr>
                                <th>পদ্ধতির ধরণ</th>
                                <th>পদ্ধতির তালিকা</th>
                              </tr>
                            </thead>
                            <tbody>
                              ${renderTableRows()}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div class="col-lg-5">
                        <figure class="image-card mb-0" style="min-height:260px;">
                          <img src="img/modu7/kishor.jpg" alt="কৈশোরকালীন পরিবার পরিকল্পনা" class="img-fluid rounded-4 shadow-sm animate-float-slow" />
                        </figure>
                      </div>
                    </div>
                  </section>

                  <div class="menstrual-section-divider" aria-hidden="true"></div>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="80">
                    <h3 class="gradient-text mb-3">${yhLang(
                      "স্থায়ী ও অস্থায়ী পদ্ধতির তথ্যসারণি",
                      "স্থায়ী ও অস্থায়ী পদ্ধতির তথ্যসারণি"
                    )}</h3>
                    <p class="text-muted">স্থায়ী এবং অস্থায়ী—উভয় ধরণের পরিবার পরিকল্পনা পদ্ধতি দম্পতির শারীরিক ও সামাজিক উপযোগিতা বিবেচনা করে নির্বাচন করা উচিত। নিচের সারণিতে প্রতিটি শ্রেণি ও উপধরণের উদাহরণ দেখানো হলো।</p>
                    <div class="table-responsive mt-3">
                      <table class="table table-bordered text-center align-middle modern-table">
                        <thead class="table-light">
                          <tr>
                            <th>পদ্ধতির ধরন</th>
                            <th>উপধরন</th>
                            <th>পদ্ধতির তালিকা</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${renderDetailedRows()}
                        </tbody>
                      </table>
                    </div>
                  </section>
                </div>
              `;
            })(),
          },
          {
            id: "ch7-lesson-2",
            title: yhLang("কৈশোরকালীন পরিবার পরিকল্পনা", "কৈশোরকালীন পরিবার পরিকল্পনা"),
            icon: "fa-table",
            gradientClass: "bg-gradient-teal",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q7b",
                  question: yhLang(
                    "সন্তান সংখ্যাভেদে কোন পদ্ধতি বেছে নেওয়া যায়?",
                    "সন্তান সংখ্যাভেদে কোন পদ্ধতি বেছে নেওয়া যায়?"
                  ),
                  options: [
                    yhLang("টেবিলে দেখানো অনুযায়ী", "টেবিলে দেখানো অনুযায়ী"),
                    yhLang("শুধু একটি পদ্ধতি", "শুধু একটি পদ্ধতি"),
                    yhLang("সবসময় টিউবেকটমি", "সবসময় টিউবেকটমি"),
                    yhLang("কোনো পদ্ধতি নয়", "কোনো পদ্ধতি নয়"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const methodHeaders = [
                { key: "pill", label: "খাবার বড়ি" },
                { key: "condom", label: "কনডম" },
                { key: "injection", label: "ইনজেকশন" },
                { key: "implant", label: "ইমপ্লান্ট" },
                { key: "iud", label: "আইইউডি" },
                { key: "tubectomy", label: "টিউবেকটমি" },
                { key: "vasectomy", label: "ভেসেকটমি" },
              ];

              const opportunityRows = [
                {
                  label: "নবদম্পতি বা এখনো সন্তান নেয়ার পরিকল্পনা নেই",
                  availability: {
                    pill: true,
                    condom: true,
                    injection: false,
                    implant: true,
                    iud: false,
                    tubectomy: false,
                    vasectomy: false,
                  },
                },
                {
                  label: "একটি জীবিত সন্তান আছে এবং পরবর্তী সন্তান",
                  availability: {
                    pill: true,
                    condom: true,
                    injection: true,
                    implant: true,
                    iud: true,
                    tubectomy: false,
                    vasectomy: false,
                  },
                },
                {
                  label: "দুই বা ততোধিক জীবিত সন্তান আছে",
                  availability: {
                    pill: true,
                    condom: true,
                    injection: true,
                    implant: true,
                    iud: true,
                    tubectomy: true,
                    vasectomy: true,
                  },
                },
              ];

              const methodUsage = [
                {
                  method: "খাবার বড়ি",
                  usage: "প্রতিদিন খেতে হয়",
                  duration: "প্রতিদিন",
                },
                {
                  method: "কনডম",
                  usage: "প্রতিবার সহবাসের সময় ব্যবহার করতে হয়",
                  duration: "ব্যবহারের সময়",
                },
                {
                  method: "ইনজেকশন",
                  usage: "গভীর মাংসপেশীতে দিতে হয়",
                  duration: "তিন মাস",
                },
                {
                  method: "ইমপ্ল্যান্ট",
                  usage: "চামড়ার নিচে স্থাপন করা হয়",
                  duration: "প্রকারভেদে ৩ বছর বা ৫ বছর",
                },
                {
                  method: "আইইউডি",
                  usage: "জরায়ুতে প্রয়োগ করা হয়",
                  duration: "১০ বছর",
                },
                {
                  method: "ভ্যাসেকটমি/এনএসভি",
                  usage: "অন্ডথলির চামড়াতে ছোট অপারেশনের মাধ্যমে করা হয়",
                  duration: "স্থায়ী",
                },
                {
                  method: "টিউবেকটমি",
                  usage: "তলপেটে ছোট অপারেশনের মাধ্যমে করা হয়",
                  duration: "স্থায়ী",
                },
              ];

              const renderOpportunityRows = () =>
                opportunityRows
                  .map(
                    (row, idx) => `
                      <tr data-aos="fade-up" data-aos-delay="${80 + idx * 20}">
                        <td class="fw-semibold text-start">${row.label}</td>
                        ${methodHeaders
                          .map(
                            (method) =>
                              `<td>${row.availability[method.key] ? "&#10003;" : ""}</td>`
                          )
                          .join("")}
                      </tr>
                    `
                  )
                  .join("");

              const renderUsageRows = () =>
                methodUsage
                  .map(
                    (item, idx) => `
                      <tr data-aos="fade-up" data-aos-delay="${80 + idx * 20}">
                        <td class="fw-semibold">${item.method}</td>
                        <td>${item.usage}</td>
                        <td>${item.duration}</td>
                      </tr>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "কৈশোরকালীন পরিবার পরিকল্পনা",
                    "কৈশোরকালীন পরিবার পরিকল্পনা"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <h3 class="gradient-text mb-3">${yhLang(
                      "সন্তান সংখ্যা বনাম পদ্ধতি গ্রহণের সুযোগ",
                      "সন্তান সংখ্যা বনাম পদ্ধতি গ্রহণের সুযোগ"
                    )}</h3>
                    <p class="text-muted">কতোজন সন্তান আছে বা নিতে চান—তা অনুযায়ী পরিবার পরিকল্পনা পদ্ধতি নির্বাচন করা উচিত। নিচের সারণিতে সেই নির্দেশনা দেখানো হলো।</p>
                    <div class="table-responsive mt-3">
                      <table class="table table-bordered text-center align-middle modern-table">
                        <thead class="table-light">
                          <tr>
                            <th>সন্তান সংখ্যা</th>
                            ${methodHeaders
                              .map((method) => `<th>${method.label}</th>`)
                              .join("")}
                          </tr>
                        </thead>
                        <tbody>
                          ${renderOpportunityRows()}
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <div class="menstrual-section-divider" aria-hidden="true"></div>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="70">
                    <h3 class="gradient-text mb-3">${yhLang(
                      "পরিবার পরিকল্পনা পদ্ধতিসমূহ : ব্যবহার, প্রয়োগ ও মেয়াদকাল",
                      "পরিবার পরিকল্পনা পদ্ধতিসমূহ : ব্যবহার, প্রয়োগ ও মেয়াদকাল"
                    )}</h3>
                    <p class="text-muted">প্রতিটি পদ্ধতির প্রয়োগপদ্ধতি ও স্থায়িত্বকাল জানলে কিশোর-কিশোরী ও নবদম্পতিরা তথ্যভিত্তিক সিদ্ধান্ত নিতে পারে।</p>
                    <div class="table-responsive mt-3">
                      <table class="table table-bordered text-center align-middle modern-table">
                        <thead class="table-light">
                          <tr>
                            <th>পদ্ধতিসমূহ</th>
                            <th>ব্যবহার ও প্রয়োগ</th>
                            <th>মেয়াদকাল</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${renderUsageRows()}
                        </tbody>
                      </table>
                    </div>
                  </section>
                </div>
              `;
            })(),
          },
        ],
      },
      {
        id: "ch-8",
        title: yhLang(
          "Module-8: Adolescent Family Planning",
          "মডিউল-৮: কৈশোরকালীন মাতৃত্ব"
        ),
        lessons: [
          {
            id: "ch8-lesson-1",
            title: yhLang("কৈশোরকালীন মাতৃত্ব", "কৈশোরকালীন মাতৃত্ব"),
            icon: "fa-baby",
            gradientClass: "bg-gradient-rose",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q8a",
                  question: yhLang(
                    "কৈশোরে গর্ভধারণ কেন ঝুঁকিপূর্ণ?",
                    "কৈশোরে গর্ভধারণ কেন ঝুঁকিপূর্ণ?"
                  ),
                  options: [
                    yhLang("মা ও শিশুর মৃত্যু ও জটিলতার ঝুঁকি বাড়ে", "মা ও শিশুর মৃত্যু ও জটিলতার ঝুঁকি বাড়ে"),
                    yhLang("সবসময় সহজ প্রসব হয়", "সবসময় সহজ প্রসব হয়"),
                    yhLang("শরীর বেশি শক্তিশালী থাকে", "শরীর বেশি শক্তিশালী থাকে"),
                    yhLang("কোনো প্রভাব পড়ে না", "কোনো প্রভাব পড়ে না"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const introParagraphs = [
                "কিশোরীদের গর্ভধারণে মা ও শিশু মৃত্যুর ঝুঁকি অনেক বেশি। শারীরিক গঠন ও সামাজিক অবস্থার কারণে তাদের গর্ভকালীন, প্রসবকালীন এবং প্রসব-পরবর্তী সময়ে এই ঝুঁকির পরিমাণ অনেক বেড়ে যায়।",
              ];

              const riskDescription =
                "কৈশোরে গর্ভধারণ অত্যন্ত ঝুঁকিপূর্ণ। কারণ এ সময় কিশোরীর নিজেরই শারীরিক বৃদ্ধি অসম্পূর্ণ থাকে এবং তার শারীরিক ও মানসিক বিকাশ তখনও চলমান থাকে। এ অবস্থায় গর্ভধারণ করলে কিশোরী মা ও শিশু উভয়ই ঝুঁকির মধ্যে পড়ে যায়। গর্ভাবস্থায় কিশোরীর সাথে সাথে তার মধ্যে বেড়ে ওঠা সন্তানেরও নানা প্রকার সেবা–পুষ্টির দরকার হয় যা কিশোরী মায়ের জন্য সবসময় পাওয়া সচরাচর সম্ভব নয়। কৈশোরে সন্তান ধারণ এবং জন্মদানের ক্ষেত্রে মা এবং সন্তান নানাবিধ ঝুঁকির সম্মুখীন হতে পারে।";

              const orbitRisks = [
                "প্রসব-পরবর্তী বিষণ্নতা",
                "অপর্যাপ্ত শিশু পরিচর্যা ও বুকের দুধ খাওয়ানো",
                "গর্ভজনিত উচ্চ রক্তচাপ",
                "গর্ভকালীন রক্তস্বল্পতা",
                "প্রি-একলাম্পসিয়া",
                "বাধাগ্রস্ত প্রসব",
                "বিলম্বিত প্রসব",
                "মৃত সন্তান প্রসব",
                "সময়ের আগে সন্তান জন্মদান",
                "কম ওজনের সন্তান জন্ম দেওয়া",
              ];

              const colorCycle = [
                "bg-gradient-rose",
                "bg-gradient-blue",
                "bg-gradient-green",
                "bg-gradient-purple",
                "bg-gradient-teal",
                "bg-gradient-orange",
                "bg-gradient-tangerine",
                "bg-gradient-emerald",
              ];

              const renderParagraphs = () =>
                introParagraphs
                  .map(
                    (text, idx) => `
                      <p class="mb-3" data-aos="fade-up" data-aos-delay="${60 + idx * 20}">${text}</p>
                    `
                  )
                  .join("");

              const renderOrbitItems = () => {
                const radius = 150;
                const angleStep = 360 / orbitRisks.length;
                return orbitRisks
                  .map((label, idx) => {
                    const angle = angleStep * idx;
                    const color = colorCycle[idx % colorCycle.length];
                    return `
                      <div class="orbit-item" style="transform: rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg);" data-aos="zoom-in" data-aos-delay="${120 + idx * 30}">
                        <div class="orbit-card ${color}">
                          <span class="orbit-title">${label}</span>
                        </div>
                      </div>
                    `;
                  })
                  .join("");
              };

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "কৈশোরকালীন মাতৃত্ব",
                    "কৈশোরকালীন মাতৃত্ব"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <h3 class="gradient-text mb-3">${yhLang(
                      "কৈশোরকালীন মাতৃত্ব",
                      "কৈশোরকালীন মাতৃত্ব"
                    )}</h3>
                    ${renderParagraphs()}
                  </section>

                  <div class="menstrual-section-divider" aria-hidden="true"></div>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="60">
                    <div class="row g-4 align-items-center">
                      <div class="col-lg-6">
                        <h3 class="gradient-text mb-3">${yhLang(
                          "কিশোরীদের মাতৃত্বজনিত ঝুঁকি",
                          "কিশোরীদের মাতৃত্বজনিত ঝুঁকি"
                        )}</h3>
                        <p class="text-muted" data-aos="fade-up" data-aos-delay="80">${riskDescription}</p>
                      </div>
                      <div class="col-lg-6">
                        <div class="orbit-layout" data-orbit-manual="true">
                          <div class="orbit-center icon-spin-on-hover">
                            <div class="orbit-card bg-gradient-rose">
                              <div class="orbit-title fw-bold">${yhLang(
                                "কিশোরীদের মাতৃত্বজনিত ঝুঁকি",
                                "কিশোরীদের মাতৃত্বজনিত ঝুঁকি"
                              )}</div>
                            </div>
                          </div>
                          ${renderOrbitItems()}
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              `;
            })(),
          },
          {
            id: "ch8-lesson-2",
            title: yhLang(
              "কৈশোরকালীন গর্ভধারণ প্রতিরোধে করণীয়",
              "কৈশোরকালীন গর্ভধারণ প্রতিরোধে করণীয়"
            ),
            icon: "fa-shield-heart",
            gradientClass: "bg-gradient-purple",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q8b",
                  question: yhLang(
                    "কৈশোরকালীন গর্ভধারণ প্রতিরোধের একটি উপায় কী?",
                    "কৈশোরকালীন গর্ভধারণ প্রতিরোধের একটি উপায় কী?"
                  ),
                  options: [
                    yhLang(
                      "বাল্যবিবাহ বন্ধে সচেতনতা বৃদ্ধি করা",
                      "বাল্যবিবাহ বন্ধে সচেতনতা বৃদ্ধি করা"
                    ),
                    yhLang("সময়মতো স্কুল বন্ধ করা", "সময়মতো স্কুল বন্ধ করা"),
                    yhLang("খেলাধুলা কমানো", "খেলাধুলা কমানো"),
                    yhLang("সব সময় ভ্রমণ করা", "সব সময় ভ্রমণ করা"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const introText =
                "নিরাপদ মাতৃত্বের জন্য কৈশোরকালীন গর্ভধারণ যেন না হয়, সে জন্য আমাদের নিম্নলিখিত কার্যক্রম জোরদার করতে হবে।";

              const orbitActions = [
                "বাল্যবিবাহ বন্ধে সচেতনতা বৃদ্ধি করা",
                "দেশের প্রচলিত আইনের যথাযথ প্রয়োগ (১৮-এর আগে মেয়েদের বিয়ে নয়, ২০-এর আগে সন্তান নয়)",
                "পরিবার পরিকল্পনা সম্পর্কে জনগণের মধ্যে সচেতনতা বাড়ানো এবং পরিবার পরিকল্পনা পদ্ধতি ব্যবহারে উৎসাহ প্রদান",
                "কৈশোরকালীন গর্ভধারণের কুফল ও এর ভয়াবহ পরিণতি সম্পর্কে সচেতনতা তৈরি করা",
                "কৈশোরে বিয়ে হলেও দেরিতে সন্তান গ্রহণে স্বামী, স্ত্রী ও অভিভাবকদের সচেতন করা",
                "কৈশোরে পরিবার পরিকল্পনা পদ্ধতির সহজপ্রাপ্যতা নিশ্চিত করা",
              ];

              const colorCycle = [
                "bg-gradient-rose",
                "bg-gradient-blue",
                "bg-gradient-green",
                "bg-gradient-orange",
                "bg-gradient-teal",
                "bg-gradient-purple",
              ];

              const renderOrbitItems = () => {
                const radius = 150;
                const angleStep = 360 / orbitActions.length;
                return orbitActions
                  .map((label, idx) => {
                    const angle = angleStep * idx;
                    const color = colorCycle[idx % colorCycle.length];
                    return `
                      <div class="orbit-item" style="transform: rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg);" data-aos="zoom-in" data-aos-delay="${120 + idx * 40}">
                        <div class="orbit-card ${color}">
                          <span class="orbit-title">${label}</span>
                        </div>
                      </div>
                    `;
                  })
                  .join("");
              };

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "কৈশোরকালীন গর্ভধারণ প্রতিরোধে করণীয়",
                    "কৈশোরকালীন গর্ভধারণ প্রতিরোধে করণীয়"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <h3 class="gradient-text mb-3">${yhLang(
                      "কৈশোরকালীন গর্ভধারণ প্রতিরোধে করণীয়",
                      "কৈশোরকালীন গর্ভধারণ প্রতিরোধে করণীয়"
                    )}</h3>
                    <p class="mb-0">${introText}</p>
                  </section>

                  <div class="menstrual-section-divider" aria-hidden="true"></div>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="60">
                    <div class="orbit-layout" data-orbit-manual="true">
                      <div class="orbit-center icon-spin-on-hover">
                        <div class="orbit-card bg-gradient-purple">
                          <div class="orbit-title fw-bold">${yhLang(
                            "কৈশোরকালীন গর্ভধারণ প্রতিরোধে করণীয়",
                            "কৈশোরকালীন গর্ভধারণ প্রতিরোধে করণীয়"
                          )}</div>
                        </div>
                      </div>
                      ${renderOrbitItems()}
                    </div>
                  </section>
                </div>
              `;
            })(),
          },
          {
            id: "ch8-lesson-3",
            title: yhLang("গর্ভকালীন বিপদচিহ্নসমূহ", "গর্ভকালীন বিপদচিহ্নসমূহ"),
            icon: "fa-triangle-exclamation",
            gradientClass: "bg-gradient-orange",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q8c",
                  question: yhLang(
                    "গর্ভকালীন বিপদচিহ্ন দেখা দিলে কী করা উচিত?",
                    "গর্ভকালীন বিপদচিহ্ন দেখা দিলে কী করা উচিত?"
                  ),
                  options: [
                    yhLang("অবিলম্বে চিকিৎসকের শরণাপন্ন হওয়া", "অবিলম্বে চিকিৎসকের শরণাপন্ন হওয়া"),
                    yhLang("নিজে নিজে ওষুধ খাওয়া", "নিজে নিজে ওষুধ খাওয়া"),
                    yhLang("উপেক্ষা করা", "উপেক্ষা করা"),
                    yhLang("কেবল বিশ্রাম নেওয়া", "কেবল বিশ্রাম নেওয়া"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "গর্ভকালীন বিপদচিহ্নসমূহ",
                    "গর্ভকালীন বিপদচিহ্নসমূহ"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <figure class="image-card mb-0" style="min-height:260px;">
                      <img src="img/modu8/gorvo.jpg" alt="গর্ভকালীন বিপদচিহ্ন" class="img-fluid rounded-4 shadow-sm animate-float-slow" />
                    </figure>
                  </section>
                </div>
              `;
            })(),
          },
          {
            id: "ch8-lesson-4",
            title: yhLang("কৈশোরকালীন গর্ভধারণ ব্যবস্থাপনা", "কৈশোরকালীন গর্ভধারণ ব্যবস্থাপনা"),
            icon: "fa-user-nurse",
            gradientClass: "bg-gradient-green",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q8d",
                  question: yhLang(
                    "গর্ভনির্ণয়ের পর কিশোরী মায়ের জন্য কী নিশ্চিত করা উচিত?",
                    "গর্ভনির্ণয়ের পর কিশোরী মায়ের জন্য কী নিশ্চিত করা উচিত?"
                  ),
                  options: [
                    yhLang("কমপক্ষে ৪টি গর্ভকালীন চেকআপ", "কমপক্ষে ৪টি গর্ভকালীন চেকআপ"),
                    yhLang("একেবারেই চেকআপ না করা", "একেবারেই চেকআপ না করা"),
                    yhLang("শুধু বাড়িতে বিশ্রাম", "শুধু বাড়িতে বিশ্রাম"),
                    yhLang("শুধু ওষুধ খাওয়া", "শুধু ওষুধ খাওয়া"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const introText =
                "গর্ভবতী কিশোরী সবসময়ই ঝুঁকিপূর্ণ—গর্ভকালীন, প্রসবকালীন বা প্রসব পরবর্তী সময়েও। এজন্য গর্ভনির্ণয় হওয়ার সাথে সাথেই ন্যূনতম ৪টি গর্ভকালীন চেকআপ নিশ্চিত করার জন্য নিকটস্থ স্বাস্থ্যকেন্দ্রে সেবা নিতে হবে এবং কিশোরী মায়ের প্রসব ব্যথা শুরু হলে তাকে জরুরি ভিত্তিতে হাসপাতালে নিয়ে ডেলিভারি করাতে হবে। যদি কিশোরী মায়ের ঝুঁকিসমূহ সময়মতো শনাক্ত করা যায় এবং ঠিক সময়ে জরুরি প্রসূতি সেবাকেন্দ্রে রেফার করা যায়, তাহলে তা কিশোরী মা ও শিশুর জীবন বাঁচাতে গুরুত্বপূর্ণ ভূমিকা রাখবে। কিশোরী মায়ের প্রসব বেশি ঝুঁকিপূর্ণ বিধায় হাসপাতাল ছাড়া কোনোভাবেই প্রসব করানো উচিত নয়।";

              const careSteps = [
                {
                  heading: "১. কিশোরীর গর্ভ শনাক্ত ও সহায়তা",
                  details:
                    "প্রাথমিক অবস্থায় কিশোরীর গর্ভ শনাক্ত করে সে যাতে পরিবারে প্রয়োজনীয় যত্ন ও সহায়তা পায়, সেটা নিশ্চিত করার জন্য পরিবারের সকলকে উদ্বুদ্ধ করতে হবে।",
                },
                {
                  heading: "২. গর্ভকালীন চেকআপ",
                  bulletIntro: "প্রশিক্ষিত সেবা প্রদানকারীর দ্বারা কমপক্ষে ৪ বার (১–৪ মাসে ১ বার, ৬–৭ মাসে ১ বার, ৮ মাসে ১ বার এবং ৯ মাসে ১ বার) চেকআপ নিশ্চিত করতে হবে।",
                  bullets: [
                    "প্রশিক্ষিত সেবাদানকারীর দ্বারা কিশোরী মায়ের পুষ্টি, বিশ্রাম, কাজ, পরিচ্ছন্নতা বিষয়ে স্বাস্থ্যশিক্ষা দেওয়া, টিটেনাস-ডিফথেরিয়া (টিডি) টিকা (৫ ডোজ না দেয়া থাকলে) নেওয়া ও প্রসব পরিকল্পনার পরামর্শ দেওয়া।",
                    "এ সময়ে কিশোরীদের কোনো জটিলতা দেখা দিলে তৎক্ষণাৎ উপযুক্ত হাসপাতালে রেফার করতে হবে, যেখানে গর্ভবতীর অপারেশন বা রক্ত সঞ্চালনের ব্যবস্থা আছে।",
                  ],
                },
                {
                  heading: "৩. প্রসব-পূর্ব পরিকল্পনা",
                  details:
                    "প্রসবের আগে পরিকল্পনা করলে মা ও শিশুর মৃত্যুঝুঁকি অনেকাংশে কমানো যায়, যেমন—",
                  bullets: [
                    "প্রসবের স্থান নির্বাচন",
                    "ব্যথা শুরু হলে দ্রুত হাসপাতালে নিতে আগে থেকেই যানবাহন ঠিক করে রাখা",
                    "আগে থেকে টাকা জমানো",
                    "রক্তদাতা ঠিক করে রাখা",
                  ],
                },
              ];

              const renderBullets = (items, baseDelay = 80) =>
                items
                  .map(
                    (text, idx) => `
                      <li data-aos="fade-left" data-aos-delay="${baseDelay + idx * 20}">
                        <i class="fa-solid fa-circle-check"></i>
                        <span>${text}</span>
                      </li>
                    `
                  )
                  .join("");

              const renderCareCards = () =>
                careSteps
                  .map((step, idx) => {
                    const hasBullets = step.bullets && step.bullets.length;
                    return `
                      <article class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="${80 +
                      idx * 40}">
                        <h4 class="gradient-text mb-3">${step.heading}</h4>
                        ${step.details ? `<p class="mb-3">${step.details}</p>` : ""}
                        ${step.bulletIntro ? `<p class="mb-2">${step.bulletIntro}</p>` : ""}
                        ${hasBullets
                          ? `<ul class="list-unstyled puberty-list mb-0">${renderBullets(
                              step.bullets,
                              60
                            )}</ul>`
                          : ""}
                      </article>
                    `;
                  })
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "কৈশোরকালীন গর্ভধারণ ব্যবস্থাপনা",
                    "কৈশোরকালীন গর্ভধারণ ব্যবস্থাপনা"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <p class="mb-0">${introText}</p>
                  </section>

                  <div class="menstrual-section-divider" aria-hidden="true"></div>

                  <div class="row g-3">
                    <div class="col-12">
                      ${renderCareCards()}
                    </div>
                  </div>
                </div>
              `;
            })(),
          },
          {
            id: "ch8-lesson-5",
            title: yhLang("প্রসব পরবর্তী যত্ন", "প্রসব পরবর্তী যত্ন"),
            icon: "fa-heart-circle-check",
            gradientClass: "bg-gradient-teal",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q8e",
                  question: yhLang(
                    "প্রসব পরবর্তী চেকআপ কয়বার নিশ্চিত করা উচিত?",
                    "প্রসব পরবর্তী চেকআপ কয়বার নিশ্চিত করা উচিত?"
                  ),
                  options: [
                    yhLang("কমপক্ষে ৪ বার", "কমপক্ষে ৪ বার"),
                    yhLang("১ বার", "১ বার"),
                    yhLang("২ বার", "২ বার"),
                    yhLang("চেকআপের প্রয়োজন নেই", "চেকআপের প্রয়োজন নেই"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const postpartumPoints = [
                "মা ও নবজাতকের চেকআপ (কমপক্ষে ৪টি — ১ম বার: প্রসবের ২৪ ঘণ্টার মধ্যে, ২য় বার: ২–৩ দিনের মধ্যে, ৩য় বার: ৪–৭ দিনের মধ্যে এবং ৪র্থ বার: প্রসবের ৪২–৪৫ দিনের মধ্যে)",
                "প্রাথমিক অবস্থায় প্রসব পরবর্তী জটিলতা শনাক্তকরণ, প্রতিরোধ এবং চিকিৎসা",
                "মাকে ভিটামিন এ খাওয়ানো, শিশুকে শালদুধ ও শুধুমাত্র বুকের দুধ খাওয়ানো, মা ও শিশুর পুষ্টি, পরিবার পরিকল্পনা পদ্ধতি এবং শিশুর টিকা ও পরিচর্যা বিষয়ক তথ্য প্রদানসহ কাউন্সেলিং এই সময়ে করা হয়।",
                "কিশোরী মায়েদের এসব পরবর্তী সময়ে বিষণ্নতায় আক্রান্ত হওয়ার হার অনেক বেশি থাকে, যা সময়মতো শনাক্তকরণ ও চিকিৎসার আওতায় নিয়ে আসা প্রয়োজন; অনথায় তা মা ও শিশু দুজনের জন্যই মৃত্যু ঝুঁকি বাড়াতে পারে।",
              ];

              const renderPoints = () =>
                postpartumPoints
                  .map(
                    (text, idx) => `
                      <li data-aos="fade-left" data-aos-delay="${80 + idx * 20}">
                        <i class="fa-solid fa-circle-check"></i>
                        <span>${text}</span>
                      </li>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "প্রসব পরবর্তী যত্ন",
                    "প্রসব পরবর্তী যত্ন"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <div class="row g-4 align-items-center">
                      <div class="col-lg-7">
                        <h3 class="gradient-text mb-3">${yhLang(
                          "প্রসব পরবর্তী যত্ন",
                          "প্রসব পরবর্তী যত্ন"
                        )}</h3>
                        <ul class="list-unstyled puberty-list mb-0">
                          ${renderPoints()}
                        </ul>
                      </div>
                      <div class="col-lg-5">
                        <figure class="image-card mb-0" style="min-height:260px;">
                          <img src="img/modu8/prosob.jpg" alt="প্রসব পরবর্তী যত্ন" class="img-fluid rounded-4 shadow-sm animate-float-slow" />
                        </figure>
                      </div>
                    </div>
                  </section>
                </div>
              `;
            })(),
          },
        ],
      },
      {
        id: "ch-9",
        title:
          yhLang(
            "Module-9: Sexually Transmitted Diseases (STIs) and Reproductive Tract Infections (RTIs)",
            "মডিউল-৯: যৌনবাহিত রোগ (এসটিআই) ও প্রজননতন্ত্রের সংক্রমণ (আরটিআই)"
          ),
        lessons: [
          {
            id: "ch9-lesson-1",
            title: yhLang(
              "যৌনবাহিত ও প্রজননতন্ত্রের সংক্রমণ",
              "যৌনবাহিত ও প্রজননতন্ত্রের সংক্রমণ"
            ),
            icon: "fa-virus",
            gradientClass: "bg-gradient-rose",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q9a",
                  question: yhLang(
                    "যৌনবাহিত সংক্রমণ কীভাবে ছড়ায়?",
                    "যৌনবাহিত সংক্রমণ কীভাবে ছড়ায়?"
                  ),
                  options: [
                    yhLang("যৌনসম্পর্ক ও সংক্রমিত শরীরবাহিত তরল", "যৌনসম্পর্ক ও সংক্রমিত শরীরবাহিত তরল"),
                    yhLang("শুধু বাতাসে", "শুধু বাতাসে"),
                    yhLang("শুধু খাবারে", "শুধু খাবারে"),
                    yhLang("কখনো ছড়ায় না", "কখনো ছড়ায় না"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const introText =
                "যৌন সম্পর্কের মাধ্যমে একজন থেকে অন্যজনের মধ্যে যেসব সংক্রমণ ছড়ায় সেগুলোই ‘যৌনবাহিত সংক্রমণ’। অন্যদিকে, প্রজনন অঙ্গসমূহের সংক্রমণকে ‘প্রজননতন্ত্রের সংক্রমণ’ বলে। যৌন সম্পর্ক (যৌনবাহিত সংক্রমণ) ছাড়াও সংক্রমিত রক্ত/রক্তজাত দ্রব্য গ্রহণ, সংক্রমিত সূঁচ/যন্ত্রপাতি ও আক্রান্ত মায়ের বুকের দুধের মাধ্যমে প্রজননতন্ত্রের সংক্রমণ হতে পারে। সকল যৌনবাহিত সংক্রমণই প্রজননতন্ত্রের সংক্রমণের আওতায় পড়ে।";

              const causes = [
                "ব্যক্তিগত অপরিচ্ছন্নতা",
                "প্রজননতন্ত্রের জীবাণুগুলোর অতিবৃদ্ধি",
                "অনিরাপদ যৌনমিলন",
                "জীবাণুযুক্ত পরিবেশ",
                "সংক্রমিত রক্ত গ্রহণ",
                "সংক্রমিত মায়ের গর্ভধারণ",
              ];

              const symptoms = [
                "যৌনাঙ্গে চুলকানি হওয়া",
                "যৌনাঙ্গ থেকে দুর্গন্ধযুক্ত বা দুর্গন্ধবিহীন স্রাব যাওয়া",
                "যৌনাঙ্গ থেকে পুঁজ বা পুঁজের মতো যাওয়া ও বারবার প্রস্রাব হওয়া",
                "যৌনাঙ্গে ক্ষত হওয়া",
                "যৌনমিলনে ব্যথা হওয়া",
                "শরীরে চুলকানি বা ঘামাচির মতো দানা হওয়া",
                "শরীরে লসিকা গ্রন্থি (কুঁচকি বা অন্যান্য স্থানে গুটি হওয়া)",
              ];

              const renderList = (items, baseDelay = 80) =>
                items
                  .map(
                    (text, idx) => `
                      <li data-aos="fade-left" data-aos-delay="${baseDelay + idx * 20}">
                        <i class="fa-solid fa-circle-check"></i>
                        <span>${text}</span>
                      </li>
                    `
                  )
                  .join("");

              const closingNote =
                "অধিকাংশ ক্ষেত্রেই যৌনরোগের লক্ষণ বোঝা যায় না। বিশেষ করে ছেলেদের তুলনায় মেয়েদের এই লক্ষণগুলো অপ্রকাশিত থাকে। তাই চিকিৎসা নিতে তারা অনেক দেরি করে ফেলে, যা থেকে জটিলতাও হতে পারে।";

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "যৌনবাহিত ও প্রজননতন্ত্রের সংক্রমণ",
                    "যৌনবাহিত ও প্রজননতন্ত্রের সংক্রমণ"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <p class="mb-0">${introText}</p>
                  </section>

                  <div class="menstrual-section-divider" aria-hidden="true"></div>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="60">
                    <div class="row g-4 align-items-start">
                      <div class="col-lg-6">
                        <h3 class="gradient-text mb-3">${yhLang(
                          "প্রজননতন্ত্রের সংক্রমণ ও যৌনবাহিত রোগের কারণ",
                          "প্রজননতন্ত্রের সংক্রমণ ও যৌনবাহিত রোগের কারণ"
                        )}</h3>
                        <ul class="list-unstyled puberty-list mb-0">
                          ${renderList(causes)}
                        </ul>
                      </div>
                      <div class="col-lg-6">
                        <h3 class="gradient-text mb-3">${yhLang(
                          "যৌনরোগ বা প্রজননতন্ত্রের সংক্রমণের সাধারণ লক্ষণসমূহ",
                          "যৌনরোগ বা প্রজননতন্ত্রের সংক্রমণের সাধারণ লক্ষণসমূহ"
                        )}</h3>
                        <ul class="list-unstyled puberty-list mb-0">
                          ${renderList(symptoms, 60)}
                        </ul>
                      </div>
                    </div>
                  </section>

                  <section class="modern-card glass-card menstrual-info-card mt-3" data-aos="fade-up" data-aos-delay="80">
                    <p class="mb-0 text-muted">${closingNote}</p>
                  </section>
                </div>
              `;
            })(),
          },
          {
            id: "ch9-lesson-2",
            title: yhLang("যৌনবাহিত রোগের ঝুঁকিসমূহ", "যৌনবাহিত রোগের ঝুঁকিসমূহ"),
            icon: "fa-triangle-exclamation",
            gradientClass: "bg-gradient-purple",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q9b",
                  question: yhLang(
                    "যৌনবাহিত রোগের ঝুঁকি কমাতে কী জরুরি?",
                    "যৌনবাহিত রোগের ঝুঁকি কমাতে কী জরুরি?"
                  ),
                  options: [
                    yhLang("সচেতনতা ও নিরাপদ আচরণ", "সচেতনতা ও নিরাপদ আচরণ"),
                    yhLang("ঝুঁকি উপেক্ষা করা", "ঝুঁকি উপেক্ষা করা"),
                    yhLang("অপরিচ্ছন্ন থাকা", "অপরিচ্ছন্ন থাকা"),
                    yhLang("অচেনা সূঁচ ব্যবহার", "অচেনা সূঁচ ব্যবহার"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "যৌনবাহিত রোগের ঝুঁকিসমূহ",
                    "যৌনবাহিত রোগের ঝুঁকিসমূহ"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <figure class="image-card mb-0" style="min-height:260px;">
                      <img src="img/modu9/jouno.jpg" alt="যৌনবাহিত রোগের ঝুঁকিসমূহ" class="img-fluid rounded-4 shadow-sm animate-float-slow" />
                    </figure>
                  </section>
                </div>
              `;
            })(),
          },
          {
            id: "ch9-lesson-3",
            title: yhLang(
              "Complications of Reproductive or Sexually Transmitted Diseases",
              "প্রজননতন্ত্রের বা যৌনরোগের জটিলতাসমূহ"
            ),
            icon: "fa-notes-medical",
            gradientClass: "bg-gradient-orange",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q9c",
                  question: yhLang(
                    "প্রজননতন্ত্রের বা যৌনরোগের কোন জটিলতা ঘটতে পারে?",
                    "প্রজননতন্ত্রের বা যৌনরোগের কোন জটিলতা ঘটতে পারে?"
                  ),
                  options: [
                    yhLang("এইচআইভি সংক্রমণের ঝুঁকি", "এইচআইভি সংক্রমণের ঝুঁকি"),
                    yhLang("মুহূর্তেই সব রোগ সেরে যায়", "মুহূর্তেই সব রোগ সেরে যায়"),
                    yhLang("যেকোনো ওষুধে সার্বজনীন প্রতিরোধ", "যেকোনো ওষুধে সার্বজনীন প্রতিরোধ"),
                    yhLang("শরীরে কোনো প্রভাব পড়ে না", "শরীরে কোনো প্রভাব পড়ে না"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const complications = [
                "এইচআইভি সংক্রমণের সম্ভাবনা বেড়ে যায়",
                "হিউম্যান প্যাপিলোমা ভাইরাসে (এইচপিভি) আক্রান্ত নারীদের জরায়ুর মুখে ক্যান্সার হবার সম্ভাবনা থাকে",
                "সংক্রমিত নারী বা পুরুষের পরবর্তীতে স্থায়ী বন্ধ্যাত্ব হতে পারে",
                "মস্তিষ্ক, যকৃত বা হৃৎপিণ্ডে জটিলতা দেখা দিতে পারে",
                "সংক্রমিত পুরুষের মূত্রনালী সরু হয়ে যেতে পারে",
                "আক্রান্ত মায়ের গর্ভপাত হতে পারে বা মৃত সন্তান প্রসব করতে পারে",
                "আক্রান্ত মায়ের জরায়ুর পরিবর্তে ডিম্বনালীতে ভ্রূণ বড় হতে পারে",
                "আক্রান্ত মায়ের শিশু জন্মগত ত্রুটি নিয়ে বা চোখে ইনফেকশন নিয়ে জন্ম নিতে পারে, যা থেকে পরবর্তীতে অন্ধত্বও হতে পারে",
              ];

              const management = [
                "বর্তমানে যৌনবাহিত সংক্রমণে আক্রান্ত কিশোর-কিশোরীরা প্রাপ্তবয়স্কদের মতো একই ব্যবস্থা পাচ্ছে।",
                "আদর্শ হলো ঝুঁকি নির্ণয় কৌশল অবলম্বন করে বাছাইকরণ (ট্রায়াজ) পরীক্ষার মাধ্যমে প্রাসঙ্গিক ও পর্যাপ্ত চিকিৎসা প্রদান করা।",
                "যৌন সংক্রমণের সিনড্রোমিক ব্যবস্থাপনার জন্য বাংলাদেশ সরকারের জাতীয় এইচআইভি এইডস কর্মসূচির (এএসপি) গাইডলাইন ব্যবহার করা যেতে পারে।",
              ];

              const renderList = (items, baseDelay = 60) =>
                items
                  .map(
                    (text, idx) => `
                      <li data-aos="fade-left" data-aos-delay="${baseDelay + idx * 20}">
                        <i class="fa-solid fa-circle-check"></i>
                        <span>${text}</span>
                      </li>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "প্রজননতন্ত্রের বা যৌনরোগের জটিলতাসমূহ",
                    "প্রজননতন্ত্রের বা যৌনরোগের জটিলতাসমূহ"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <h3 class="gradient-text mb-3">${yhLang(
                      "প্রজননতন্ত্রের বা যৌনরোগের জটিলতাসমূহ",
                      "প্রজননতন্ত্রের বা যৌনরোগের জটিলতাসমূহ"
                    )}</h3>
                    <ul class="list-unstyled puberty-list mb-0">
                      ${renderList(complications)}
                    </ul>
                  </section>

                  <section class="modern-card glass-card menstrual-info-card mt-3" data-aos="fade-up" data-aos-delay="80">
                    <h3 class="gradient-text mb-3">${yhLang(
                      "কিশোর-কিশোরীদের যৌনবাহিত সংক্রমণ ব্যবস্থাপনা",
                      "কিশোর-কিশোরীদের যৌনবাহিত সংক্রমণ ব্যবস্থাপনা"
                    )}</h3>
                    <ul class="list-unstyled puberty-list mb-0">
                      ${renderList(management, 80)}
                    </ul>
                  </section>
                </div>
              `;
            })(),
          },
        ],
      },
      {
        id: "ch-10",
        title:
          yhLang(
            "Module-10: HPV vaccination and prevention of cervical cancer in adolescents",
            "মডিউল-১০: এইচপিভি টিকা ও কৈশোরে জরায়ুমুখ ক্যান্সার প্রতিরোধ"
          ),
        lessons: [
          {
            id: "ch10-lesson-1",
            title: yhLang("HIV and AIDS", "এইচআইভি ও এইডস"),
            icon: "fa-ribbon",
            gradientClass: "bg-gradient-rose",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q10a",
                  question: yhLang(
                    "এইচআইভি দেহে কী ক্ষতি করে?",
                    "এইচআইভি দেহে কী ক্ষতি করে?"
                  ),
                  options: [
                    yhLang("রোগ প্রতিরোধক্ষমতা ধ্বংস করে", "রোগ প্রতিরোধক্ষমতা ধ্বংস করে"),
                    yhLang("তাৎক্ষণিকভাবে শক্তি বাড়ায়", "তাৎক্ষণিকভাবে শক্তি বাড়ায়"),
                    yhLang("সব রোগ প্রতিরোধ করে", "সব রোগ প্রতিরোধ করে"),
                    yhLang("শরীরে কোনো প্রভাব ফেলে না", "শরীরে কোনো প্রভাব ফেলে না"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const introText = yhLang(
                "HIV is a virus that gradually destroys the body’s immune system, leaving the person defenseless against infections like diarrhoea, tuberculosis, or cholera. Once immunity collapses completely, even minor illnesses cannot be fought off—this state is called AIDS.",
                "এইচআইভি (HIV) হলো মানুষের রোগ প্রতিরোধক্ষমতা বিনাশকারী ভাইরাস। এ ভাইরাস মানবদেহের রক্তে প্রবেশের পর ধীরে ধীরে শরীরের রোগ প্রতিরোধক্ষমতা নষ্ট করে দেয়। এক সময় শরীরের রোগ প্রতিরোধক্ষমতা একেবারেই থাকে না। এ সময় বিভিন্ন রোগ যেমন—ডায়রিয়া, যক্ষা, কলেরা ইত্যাদি মানবদেহকে আক্রমণ করলে মানবদেহ তার বিরুদ্ধে কোনো প্রতিরোধ ব্যবস্থা গড়ে তুলতে পারে না। ফলে যেকোনো রোগ হলে আর ভালো হয় না। শরীরের এই অবস্থার নাম <strong>এইডস</strong>."
              );

              const latencyNote = yhLang(
                "HIV can remain dormant in the human body for 2–10 years.",
                "২–১০ বছর পর্যন্ত এইচআইভি (HIV) মানবদেহে সুপ্ত অবস্থায় থাকতে পারে।"
              );

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "এইচআইভি ও এইডস",
                    "এইচআইভি ও এইডস"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <h3 class="gradient-text mb-3">${yhLang(
                      "এইচআইভি ও এইডস",
                      "এইচআইভি ও এইডস"
                    )}</h3>
                    <p class="mb-3">${introText}</p>
                    <p class="mb-0">${latencyNote}</p>
                  </section>

                  <section class="modern-card glass-card menstrual-info-card mt-3" data-aos="fade-up" data-aos-delay="80">
                    <figure class="image-card mb-0" style="min-height:260px;">
                      <img src="img/modu10/hiv.jpg" alt="এইচআইভি ও এইডস" class="img-fluid rounded-4 shadow-sm animate-float-slow" />
                    </figure>
                  </section>
                </div>
              `;
            })(),
          },
          {
            id: "ch10-lesson-2",
            title: yhLang("HIV Window Period", "অন্তর্বর্তীকালীন সময় (উইন্ডো পিরিয়ড)"),
            icon: "fa-hourglass-half",
            gradientClass: "bg-gradient-purple",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q10b",
                  question: yhLang(
                    "What does the HIV window period describe?",
                    "অন্তর্বর্তীকালীন সময় (উইন্ডো পিরিয়ড) বলতে কী বোঝায়?"
                  ),
                  options: [
                    yhLang(
                      "Time needed to develop detectable antibodies",
                      "রক্তে অ্যান্টিবডি তৈরি হতে যে সময় লাগে"
                    ),
                    yhLang("তাৎক্ষণিক সেরে ওঠার সময়", "তাৎক্ষণিক সেরে ওঠার সময়"),
                    yhLang("শুধু জ্বর হওয়ার সময়", "শুধু জ্বর হওয়ার সময়"),
                    yhLang("শরীরে কোনো পরিবর্তন না হওয়া সময়", "শরীরে কোনো পরিবর্তন না হওয়া সময়"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const windowDefinition = yhLang(
                "After HIV enters the body it may take up to 12 weeks for antibodies to appear in blood—this span is called the window period.",
                "এইচআইভিতে আক্রান্ত হওয়ার পর রক্তে ভাইরাসের বিরুদ্ধে প্রতিরোধমূলক ব্যবস্থা (অ্যান্টিবডি) তৈরি হতে যে সময় লাগে তাকে অন্তর্বর্তীকালীন সময় বা উইন্ডো পিরিয়ড বলে। এ জন্য সাধারণত ১২ সপ্তাহ পর্যন্ত লাগতে পারে।"
              );

              const silentSpread = yhLang(
                "Most people with HIV look healthy for years before symptoms emerge, often without realizing they can still transmit the virus to others.",
                "বেশিরভাগ এইচআইভি–আক্রান্ত ব্যক্তিই দেখতে সুস্থ দেখায় এবং এইচআইভিজনিত লক্ষণসমূহ প্রকাশ পাওয়ার আগ পর্যন্ত দীর্ঘদিন স্বাভাবিক জীবন কাটায়। বিশ্বের বেশিরভাগ আক্রান্ত মানুষই জানে না যে তারা আক্রান্ত। এইচআইভি–আক্রান্ত যে কেউই অন্যের মাঝে এই ভাইরাস ছড়াতে পারে।"
              );

              const preventionPoints = [
                "ধর্মীয় অনুশাসন মেনে চললে",
                "বিবাহবহির্ভূত যৌনমিলন থেকে বিরত থাকলে",
                "স্ত্রী বা সঙ্গীর প্রতি বিশ্বস্ত থাকলে",
                "যৌনমিলনে সবসময় কনডম ব্যবহার করলে",
                "কেবলমাত্র অনুমোদিত ব্লাড ব্যাংক থেকে এইচআইভি পরীক্ষিত রক্ত গ্রহণ করলে",
                "যে কোনো ধরণের ড্রাগ ব্যবহার থেকে বিরত থাকলে; যদি আপনি একজন শিরায় মাদক গ্রহণকারী হয়ে থাকেন, তবে যে কোনো ধরনের সূঁই (সিরিঞ্জ) জাতীয় বস্তু ভাগাভাগি করা থেকে বিরত থাকলে",
                "যে কোনো ধরনের যৌনবাহিত সংক্রমণ (এসটিআই)/প্রজননতন্ত্রের সংক্রমণ (আরটিআই) পরীক্ষা করতে হবে এবং চিকিৎসা গ্রহণ করতে হবে।",
              ];

              const treatmentInfo = yhLang(
                "Bangladesh prioritizes EMTCT services to stop mother-to-child transmission of HIV, hepatitis B, and syphilis. Preventing, testing, and treating STIs/RTIs remain core to HIV prevention because untreated infections significantly raise HIV risk.",
                "মা থেকে শিশুর শরীরে এইচআইভি, হেপাটাইটিস বি এবং সিফিলিসের সংক্রমণ নির্মূল করার লক্ষ্যে (Elimination of Mother-to-Child Transmission - EMTCT) বাংলাদেশ এইচআইভি ও যৌনবাহিত রোগসমূহ প্রতিরোধ এবং যৌন ও প্রজনন স্বাস্থ্যসেবায় গুরুত্ব দিয়েছে। এইচআইভি প্রতিরোধ কৌশলের গুরুত্বপূর্ণ উপাদান হলো যৌনবাহিত সংক্রমণ প্রতিরোধ ও চিকিৎসা, কারণ যৌনবাহিত সংক্রমণ এইচআইভি সংক্রমণের ঝুঁকি বৃদ্ধি করে। চিকিৎসা না করালে যৌনবাহিত সংক্রমণের উপস্থিতি এইচআইভি সংক্রমণের ঝুঁকি বাড়াতে পারে।"
              );

              const renderList = (items, baseDelay = 60) =>
                items
                  .map(
                    (text, idx) => `
                      <li data-aos="fade-left" data-aos-delay="${baseDelay + idx * 20}">
                        <i class="fa-solid fa-circle-check"></i>
                        <span>${text}</span>
                      </li>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "অন্তর্বর্তীকালীন সময় (উইন্ডো পিরিয়ড)",
                    "অন্তর্বর্তীকালীন সময় (উইন্ডো পিরিয়ড)"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <p class="mb-3">${windowDefinition}</p>
                    <p class="mb-0">${silentSpread}</p>
                  </section>

                  <section class="modern-card glass-card menstrual-info-card mt-3" data-aos="fade-up" data-aos-delay="80">
                    <h3 class="gradient-text mb-3">${yhLang(
                      "কিশোর-কিশোরীদের মধ্যে কীভাবে এইচআইভি প্রতিরোধ করা যায়",
                      "কিশোর-কিশোরীদের মধ্যে কীভাবে এইচআইভি প্রতিরোধ করা যায়"
                    )}</h3>
                    <ul class="list-unstyled puberty-list mb-0">
                      ${renderList(preventionPoints)}
                    </ul>
                  </section>

                  <section class="modern-card glass-card menstrual-info-card mt-3" data-aos="fade-up" data-aos-delay="120">
                    <h3 class="gradient-text mb-3">${yhLang("চিকিৎসা", "চিকিৎসা")}</h3>
                    <p class="mb-0">${treatmentInfo}</p>
                  </section>
                </div>
              `;
            })(),
          },
        ],
      },
      {
        id: "ch-11",
        title: yhLang(
          "Module-11: Polycystic ovary syndrome (PCOS) in adolescents",
          "মডিউল-১১: জরায়ু মুখের ক্যান্সার)"
        ),
        lessons: [
          {
            id: "ch11-lesson-1",
            title: yhLang("Cervical Cancer", "জরায়ুমুখ ক্যান্সার"),
            icon: "fa-ribbon",
            gradientClass: "bg-gradient-orange",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q11a",
                  question: yhLang(
                    "Which virus most commonly causes cervical cancer?",
                    "জরায়ুমুখ ক্যান্সারের প্রধান কারণ কোন ভাইরাস?"
                  ),
                  options: [
                    yhLang("Human Papillomavirus (HPV)", "হিউম্যান প্যাপিলোমা ভাইরাস (এইচপিভি)"),
                    yhLang("Common cold virus", "সাধারণ সর্দি ভাইরাস"),
                    yhLang("Malaria parasite", "ম্যালেরিয়ার পরজীবী"),
                    yhLang("None", "কোনোটিই নয়"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const paragraphs = [
                yhLang(
                  "Cervical cancer is preventable when detected early and treated promptly, yet it remains one of the leading causes of cancer mortality among women—globally the fourth most common, and the second most common among Bangladeshi women.",
                  "জরায়ুমুখ ক্যান্সার প্রতিরোধযোগ্য একটি রোগ। দ্রুত রোগ নির্ণয় ও প্রয়োজনীয় চিকিৎসার মাধ্যমে এই রোগ থেকে সম্পূর্ণ সেরে ওঠা সম্ভব। তথাপি এটি সকল ধরণের ক্যান্সার এবং নারীদের ক্যান্সারজনিত মৃত্যুর অন্যতম প্রধান কারণ। সাধারণত নারীরা যেসব ক্যান্সারে আক্রান্ত হয়ে থাকেন, বৈশ্বিকভাবে তাদের মধ্যে জরায়ুমুখ ক্যান্সার চতুর্থ সর্বোচ্চ। বাংলাদেশি নারীদের ক্ষেত্রে এটি দ্বিতীয় সর্বোচ্চ।"
                ),
                yhLang(
                  "According to 2020 data, over 600,000 women are diagnosed with cervical cancer annually and about 342,000 die, 90% of them in low- and middle-income countries like Bangladesh.",
                  "২০২০ সালের তথ্য-উপাত্ত অনুযায়ী প্রতিবছর বিশ্বের ছয় লক্ষাধিক নারী জরায়ুমুখ ক্যান্সারে আক্রান্ত হন, যার মধ্যে প্রায় তিন লক্ষ বিয়াল্লিশ হাজার জন মৃত্যুবরণ করে থাকেন। এর প্রায় ৯০% মৃত্যুই বাংলাদেশের মতো উন্নয়নশীল বা স্বল্পোন্নত দেশে ঘটে থাকে।"
                ),
                yhLang(
                  "Human Papillomavirus (HPV)—a sexually transmitted virus—is the primary cause. WHO recommends regular screening and HPV vaccination to reduce incidence and deaths. Without strong prevention and control, projections suggest 700,000 cases and 400,000 deaths by 2030, mostly in developing nations.",
                  "হিউম্যান প্যাপিলোমা ভাইরাস (এইচপিভি), যা একটি যৌনবাহিত ভাইরাস, এটি জরায়ুমুখ ক্যান্সার সৃষ্টি করে থাকে। বিশ্ব স্বাস্থ্য সংস্থার সুপারিশ অনুযায়ী নিয়মিত পরীক্ষা (স্ক্রিনিং) ও এইচপিভি টিকাদানের মাধ্যমে জরায়ুমুখ ক্যান্সার প্রতিরোধ এবং এই ক্যান্সারজনিত মৃত্যু হ্রাস করা সম্ভব। ধারণা করা হচ্ছে, জরায়ুমুখ ক্যান্সার প্রতিরোধ ও নিয়ন্ত্রণ কার্যক্রম সফলভাবে বাস্তবায়িত না হলে ২০৩০ সালে বিশ্বব্যাপী প্রায় সাত লক্ষ নারী জরায়ুমুখ ক্যান্সারে আক্রান্ত হবেন, যার প্রায় চার লক্ষ মৃত্যুবরণ করবেন এবং এর সিংহভাগই ঘটবে উন্নয়নশীল দেশে।"
                ),
              ];

              const renderParagraphs = () =>
                paragraphs
                  .map(
                    (text, idx) => `
                      <p class="mb-3" data-aos="fade-right" data-aos-delay="${60 + idx * 20}">${text}</p>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "জরায়ুমুখ ক্যান্সার",
                    "জরায়ুমুখ ক্যান্সার"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <div class="row g-4 align-items-center">
                      <div class="col-lg-7">
                        ${renderParagraphs()}
                      </div>
                      <div class="col-lg-5" data-aos="fade-left" data-aos-delay="80">
                        <figure class="image-card mb-0" style="min-height:150px; max-width:80%; margin:0 auto;">
                          <img src="img/modu11/jorau.jpg" alt="জরায়ুমুখ ক্যান্সার" class="img-fluid rounded-4 shadow-sm animate-float-slow" />
                        </figure>
                      </div>
                    </div>
                  </section>
                </div>
              `;
            })(),
          },
          {
            id: "ch11-lesson-2",
            title: yhLang("HPV Vaccine", "এইচপিভি টিকা"),
            icon: "fa-syringe",
            gradientClass: "bg-gradient-purple",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q11b",
                  question: yhLang(
                    "How many HPV vaccine doses are recommended here?",
                    "এইচপিভি টিকার ডোজ সংখ্যা কত উল্লেখ করা হয়েছে?"
                  ),
                  options: [
                    yhLang("One dose", "এক ডোজ"),
                    yhLang("Two doses", "দুই ডোজ"),
                    yhLang("Three doses", "তিন ডোজ"),
                    yhLang("Four doses", "চার ডোজ"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const intro = yhLang(
                "Regular screening plus a single HPV vaccine dose can prevent cervical cancer and reduce related deaths.",
                "বিশ্ব স্বাস্থ্য সংস্থার সুপারিশ অনুযায়ী নিয়মিত পরীক্ষা (স্ক্রিনিং) ও এক ডোজ এইচপিভি টিকাদানের মাধ্যমে জরায়ুমুখ ক্যান্সার প্রতিরোধ এবং এই ক্যান্সারজনিত মৃত্যু হ্রাস করা সম্ভব।"
              );

              const advantages = [
                "এইচপিভি টিকা জরায়ুমুখ ক্যান্সার প্রতিরোধ করে।",
                "জরায়ুমুখ ক্যান্সার প্রতিরোধে এইচপিভি টিকার একটি ডোজই যথেষ্ট।",
                "এইচপিভি টিকা বিশ্বব্যাপী পরীক্ষিত, নিরাপদ ও কার্যকর।",
                "গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের উদ্যোগে এই টিকা বিনামূল্যে প্রদান করা হয়।",
              ];

              const locations = [
                "ইপিআই স্থায়ী ও অস্থায়ী টিকা কেন্দ্র থেকে এই টিকা গ্রহণ করা যাবে।",
              ];

              const eligibility = [
                "পঞ্চম শ্রেণিতে অধ্যয়নরত সকল ছাত্রী অথবা ১০ বছর বয়সী সকল কিশোরী।",
              ];

              const doses = [
                "এক ডোজ",
              ];

              const renderList = (items, baseDelay = 60) =>
                items
                  .map(
                    (text, idx) => `
                      <li data-aos="fade-left" data-aos-delay="${baseDelay + idx * 20}">
                        <i class="fa-solid fa-circle-check"></i>
                        <span>${text}</span>
                      </li>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "এইচপিভি টিকা",
                    "এইচপিভি টিকা"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <div class="row g-4 align-items-center">
                      <div class="col-lg-7">
                        <p class="mb-4" data-aos="fade-right" data-aos-delay="60">${intro}</p>

                        <article class="mb-3" data-aos="fade-right" data-aos-delay="80">
                          <h3 class="gradient-text h5 mb-3">${yhLang("টিকা গ্রহণের সুবিধা", "টিকা গ্রহণের সুবিধা")}</h3>
                          <ul class="list-unstyled puberty-list mb-0">
                            ${renderList(advantages, 80)}
                          </ul>
                        </article>

                        <article class="mb-3" data-aos="fade-right" data-aos-delay="120">
                          <h3 class="gradient-text h5 mb-3">${yhLang("টিকা গ্রহণের স্থান", "টিকা গ্রহণের স্থান")}</h3>
                          <ul class="list-unstyled puberty-list mb-0">
                            ${renderList(locations, 120)}
                          </ul>
                        </article>

                        <article class="mb-3" data-aos="fade-right" data-aos-delay="140">
                          <h3 class="gradient-text h5 mb-3">${yhLang("টিকাগুলো কারা গ্রহণ করতে পারবেন", "টিকাগুলো কারা গ্রহণ করতে পারবেন")}</h3>
                          <ul class="list-unstyled puberty-list mb-0">
                            ${renderList(eligibility, 140)}
                          </ul>
                        </article>

                        <article data-aos="fade-right" data-aos-delay="160">
                          <h3 class="gradient-text h5 mb-3">${yhLang("টিকার ডোজ সংখ্যা", "টিকার ডোজ সংখ্যা")}</h3>
                          <ul class="list-unstyled puberty-list mb-0">
                            ${renderList(doses, 160)}
                          </ul>
                        </article>
                      </div>
                      <div class="col-lg-5">
                        <div class="row g-3">
                          <div class="col-12" data-aos="fade-left" data-aos-delay="80">
                            <figure class="image-card mb-0" style="max-height:300px; max-width:80%; margin:0 auto;">
                              <img src="img/modu11/dose1.jpg" alt="${yhLang("HPV vaccine awareness", "এইচপিভি টিকা")}" class="img-fluid rounded-4 shadow-sm animate-float-slow" />
                            </figure>
                          </div>
                          <div class="col-12" data-aos="fade-left" data-aos-delay="110">
                            <figure class="image-card mb-0" style="max-height:300px; max-width:80%; margin:0 auto;">
                              <img src="img/modu11/dose2.jpg" alt="${yhLang("HPV vaccine dose", "এইচপিভি টিকা ডোজ")}" class="img-fluid rounded-4 shadow-sm animate-float-slow" />
                            </figure>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              `;
            })(),
          },
          {
            id: "ch11-lesson-3",
            title: yhLang("Other Vaccines for Women", "মহিলাদের অন্যান্য  টিকা"),
            icon: "fa-notes-medical",
            gradientClass: "bg-gradient-teal",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q11c",
                  question: yhLang(
                    "Why should women stay informed about additional vaccines?",
                    "মহিলাদের কেন অতিরিক্ত টিকা সম্পর্কে সচেতন থাকা জরুরি?"
                  ),
                  options: [
                    yhLang("To protect against preventable diseases", "প্রতিরোধযোগ্য রোগ থেকে সুরক্ষা পেতে"),
                    yhLang("Because vaccines cause illness", "কারণ টিকা অসুস্থ করে"),
                    yhLang("Vaccines are unnecessary", "টিকা অপ্রয়োজনীয়"),
                    yhLang("No reason", "কোনো কারণ নেই"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "মহিলাদের অন্যান্য  টিকা",
                    "মহিলাদের অন্যান্য  টিকা"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <figure class="image-card mb-0" style="margin:0 auto;">
                      <img src="img/modu11/tika.jpg" alt="মহিলাদের অন্যান্য টিকা" class="img-fluid rounded-4 shadow-sm animate-float-slow" />
                    </figure>
                  </section>
                </div>
              `;
            })(),
          },
        ],
      },
      {
        id: "ch-12",
        title:
          yhLang(
            "Module-12: Adolescent nutrition: Nutritional deficiency and prevention",
            "মডিউল-১২: পলিসিস্টিক ওভারি সিনড্রোম (পিসিওএস)"
          ),
        lessons: [
          {
            id: "ch12-lesson-1",
            title: yhLang(
              "Polycystic Ovary Syndrome (PCOS)",
              "পলিসিস্টিক ওভারি সিনড্রোম (পিসিওএস)"
            ),
            icon: "fa-circle-nodes",
            gradientClass: "bg-gradient-rose",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q12a",
                  question: yhLang(
                    "PCOS becomes more common when which hormone rises above normal?",
                    "শরীরে কোন হরমোন স্বাভাবিকের তুলনায় বেড়ে গেলে পিসিওএস দেখা দিতে পারে?"
                  ),
                  options: [
                    yhLang("Androgen", "অ্যান্ড্রোজেন"),
                    yhLang("Insulin", "ইনসুলিন"),
                    yhLang("Thyroxine", "থাইরোক্সিন"),
                    yhLang("Estrogen", "ইস্ট্রোজেন"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const paragraphs = [
                yhLang(
                  "PCOS is a major global health issue for women. Multiple cysts form in the ovaries, affecting as many as 1 in 10 women of any age, with the highest incidence between 15 and 45 years.",
                  "সারা বিশ্বেই নারীদের একটি বড় স্বাস্থ্য সমস্যা পলিসিস্টিক ওভারিয়ান সিনড্রোম বা পিসিওএস। এই রোগে ডিম্বাশয়ে অনেকগুলো সিস্ট হয় বলেই এর এমন নামকরণ। গবেষণা বলছে, প্রতি ১০ জন নারীর মধ্যে ১ জনের এ সমস্যা আছে। যেকোনো বয়সী নারীই এতে আক্রান্ত হতে পারেন। তবে প্রজননক্ষম বা ১৫ থেকে ৪৫ বছর বয়সী নারীরা বেশি আক্রান্ত হন।"
                ),
                yhLang(
                  "PCOS is both hereditary and hormonal. When androgen levels rise, ovulation is disrupted, follicles do not rupture, and periods become irregular or even absent.",
                  "এটি বংশগত এবং হরমোনাল সমস্যা। নারীর শরীরে পুরুষ হরমোন (অ্যান্ড্রোজেন) স্বাভাবিকের তুলনায় বেড়ে গেলে এ সমস্যা দেখা দেয়। এই হরমোন বৃদ্ধির কারণে নারীর ওভুলেশন বা প্রতি মাসে ডিম্বাণু পরিপক্ব হওয়ার পরও ফলিকল ফেটে যায় না এবং ডিম্বাণু বের হতে পারে না। একসময় মেয়েদের ওভুলেশন বন্ধ হয়ে যায় এবং অনিয়মিত মাসিক হয় বা মাসিক একেবারেই হয় না।"
                ),
                yhLang(
                  "Although 60–70% of people with PCOS can still conceive, fertility declines after age 35.",
                  "যদিও পিসিওএস-এ ৬০-৭০% ক্ষেত্রেই গর্ভধারণে সমস্যা হয় না, তবে ৩৫ বছর বয়সের পর গর্ভধারণের সম্ভাবনা কমে যায়।"
                ),
              ];

              const renderParagraphs = () =>
                paragraphs
                  .map(
                    (text, idx) => `
                      <p class="mb-3" data-aos="fade-right" data-aos-delay="${60 + idx * 20}">${text}</p>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "পলিসিস্টিক ওভারি সিনড্রোম (পিসিওএস)",
                    "পলিসিস্টিক ওভারি সিনড্রোম (পিসিওএস)"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    ${renderParagraphs()}
                  </section>
                </div>
              `;
            })(),
          },
          {
            id: "ch12-lesson-2",
            title: yhLang("PCOS Complications", "সমস্যা সমূহঃ"),
            icon: "fa-list-check",
            gradientClass: "bg-gradient-purple",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q12b",
                  question: yhLang(
                    "Which of the following is a possible complication of PCOS?",
                    "পিসিওএস-এর সম্ভাব্য জটিলতা কোনটি?"
                  ),
                  options: [
                    yhLang("টাইপ-২ ডায়াবেটিসের ঝুঁকি", "টাইপ-২ ডায়াবেটিসের ঝুঁকি"),
                    yhLang("তাৎক্ষণিক রোগমুক্তি", "তাৎক্ষণিক রোগমুক্তি"),
                    yhLang("চোখে বেশি পানি আসা", "চোখে বেশি পানি আসা"),
                    yhLang("কোনো শারীরিক পরিবর্তন নয়", "কোনো শারীরিক পরিবর্তন নয়"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const complications = [
                "অনিয়মিতভাবে মাসিক হওয়া / মাসিক বন্ধ থাকা",
                "মানসিক সমস্যা",
                "শরীরের বিভিন্ন জায়গায় অবাঞ্ছিত লোম গজানো",
                "চুল পড়ে যাওয়া",
                "মুখে ব্রণ বের হওয়া",
                "গর্ভধারণে বিভিন্ন সমস্যা হওয়া, এমনকি জটিলতাও হতে পারে",
                "ওজন বেড়ে যাওয়া",
                "ঘুমের ব্যাঘাত হওয়া",
                "টাইপ-২ ডায়বেটিস রোগের ঝুঁকি",
                "হৃদরোগের ঝুঁকি",
                "জরায়ু ক্যান্সারের ঝুঁকি বাড়ায়",
              ];

              const note =
                "সবারই সব সমস্যা একসাথে হবে তা নয়, আবার বয়সের সাথে সমস্যাগুলো পরিবর্তনও হতে পারে।";

              const renderList = (items, baseDelay = 60) =>
                items
                  .map(
                    (text, idx) => `
                      <li data-aos="fade-left" data-aos-delay="${baseDelay + idx * 15}">
                        <i class="fa-solid fa-circle-check"></i>
                        <span>${text}</span>
                      </li>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "সমস্যা সমূহঃ",
                    "সমস্যা সমূহঃ"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <div class="row g-4 align-items-center">
                      <div class="col-lg-7">
                        <h3 class="gradient-text h5 mb-3" data-aos="fade-right" data-aos-delay="60">${yhLang(
                          "পিসিওএস-এ দেখা দিতে পারে এমন জটিলতা",
                          "পিসিওএস-এ দেখা দিতে পারে এমন জটিলতা"
                        )}</h3>
                        <ul class="list-unstyled puberty-list mb-3">
                          ${renderList(complications)}
                        </ul>
                        <p class="text-muted mb-0" data-aos="fade-right" data-aos-delay="220">${note}</p>
                      </div>
                      <div class="col-lg-5">
                        <div class="row g-3">
                          <div class="col-12" data-aos="fade-left" data-aos-delay="80">
                            <figure class="image-card mb-0" style="max-height:260px; max-width:80%; margin:0 auto;">
                              <img src="img/modu12/pcos1.jpg" alt="পিসিওএস সচেতনতা চিত্র" class="img-fluid rounded-4 shadow-sm animate-float-slow" />
                            </figure>
                          </div>
                          <div class="col-12" data-aos="fade-left" data-aos-delay="110">
                            <figure class="image-card mb-0" style="max-height:260px; max-width:80%; margin:0 auto;">
                              <img src="img/modu12/pcos2.jpg" alt="পিসিওএস সমস্যা চিত্র" class="img-fluid rounded-4 shadow-sm animate-float-slow" />
                            </figure>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              `;
            })(),
          },
          {
            id: "ch12-lesson-3",
            title: yhLang("Managing PCOS", "সমাধানের উপায়"),
            icon: "fa-heart-circle-check",
            gradientClass: "bg-gradient-green",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q12c",
                  question: yhLang(
                    "What helps keep PCOS under control?",
                    "পিসিওএস নিয়ন্ত্রণে রাখতে কী সহায়ক?"
                  ),
                  options: [
                    yhLang("Lifestyle changes and treatment", "জীবনযাত্রায় পরিবর্তন ও চিকিৎসা"),
                    yhLang("কোনো পদক্ষেপের প্রয়োজন নেই", "কোনো পদক্ষেপের প্রয়োজন নেই"),
                    yhLang("শুধু মিষ্টি খাবার", "শুধু মিষ্টি খাবার"),
                    yhLang("সম্পূর্ণ বিশ্রাম", "সম্পূর্ণ বিশ্রাম"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const intro = yhLang(
                "PCOS cannot be fully cured, but healthy habits and proper care can keep symptoms manageable.",
                "পিসিওএস হলে মনে রাখতে হবে যে, এটি কখনও নির্মূল হবে না। কিন্তু, চিকিৎসা নিয়ে সুস্থ থাকা সম্ভব।"
              );

              const lifestyleTips = [
                "শারীরিকভাবে কর্মক্ষম থাকতে হাঁটা, সাইকেল চালানো বা পছন্দের খেলাধুলা করুন।",
                "ধূমপান ও মদ্যপানের মতো অস্বাস্থ্যকর অভ্যাস বর্জন করুন।",
                "খাবারে সতর্ক থাকুন, সুষম খাদ্যগ্রহণ করুন এবং শর্করা কমিয়ে ওজন নিয়ন্ত্রণে রাখুন।",
                "সুষম খাবার পরিমাণমতো খান এবং অপ্রয়োজনীয় শর্করা কমান।",
                "ওজন নিয়ন্ত্রণে রাখতে মোট ক্যালরি কমান বা পুষ্টিবিদের সহায়তা নিন; ভাজা খাবারের বদলে ভাপানো খাবার ও শাকসবজি বেশি খান।",
                "কম চর্বিযুক্ত মাংস, মাছ, ডিম, দুধজাত খাবার, বাদাম ও ফাইবারসমৃদ্ধ খাদ্য খান।",
                "প্রোবায়োটিক সমৃদ্ধ দই ওজন কমাতে এবং অন্ত্রজীবাণু সুস্থ রাখতে সহায়ক।",
                "চিনিযুক্ত খাবার, কোমল পানীয়, চকোলেট ও ফাস্টফুড এড়িয়ে চলুন।",
                "ফল ও শাকসবজি প্রদাহ কমায়, তাই এগুলো বেশি করে খান।",
                "নিয়মিত ব্যায়াম মানসিক প্রশান্তি দেয়, শক্তি বাড়ায় ও রক্তে চিনির মাত্রা নিয়ন্ত্রণ করে; প্রয়োজনে গ্রুপ ব্যায়ামে যুক্ত হোন।",
              ];

              const renderList = (items, baseDelay = 60) =>
                items
                  .map(
                    (text, idx) => `
                      <li data-aos="fade-left" data-aos-delay="${baseDelay + idx * 15}">
                        <i class="fa-solid fa-circle-check"></i>
                        <span>${text}</span>
                      </li>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "সমাধানের উপায়",
                    "সমাধানের উপায়"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <p class="mb-4">${intro}</p>
                    <h3 class="gradient-text h5 mb-3">${yhLang(
                      "জীবনযাপনের কলাকৌশল",
                      "জীবনযাপনের কলাকৌশল"
                    )}</h3>
                    <ul class="list-unstyled puberty-list mb-0">
                      ${renderList(lifestyleTips)}
                    </ul>
                  </section>
                </div>
              `;
            })(),
          },
          {
            id: "ch12-lesson-4",
            title: yhLang("Managing PCOS Visuals", "ম্যানেজিং পিসিসিস"),
            icon: "fa-hand-holding-heart",
            gradientClass: "bg-gradient-teal",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q12d",
                  question: yhLang(
                    "Which approach supports PCOS management?",
                    "পিসিওএস ব্যবস্থাপনায় কোনটি সহায়ক?"
                  ),
                  options: [
                    yhLang("Balanced lifestyle and guidance", "সুষম জীবনযাপন ও পরামর্শ"),
                    yhLang("Only sugary drinks", "শুধু চিনিযুক্ত পানীয়"),
                    yhLang("Ignoring health entirely", "স্বাস্থ্য সম্পূর্ণ উপেক্ষা করা"),
                    yhLang("Sleeping all day", "সারাদিন শুধু ঘুমানো"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "ম্যানেজিং পিসিসিস",
                    "ম্যানেজিং পিসিসিস"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <div class="row g-4 align-items-center">
                      <div class="col-md-6" data-aos="fade-right" data-aos-delay="60">
                        <figure class="image-card mb-0" style="min-height: 730px; margin:0 auto;">
                          <img src="img/modu12/manage1.jpg" alt="PCOS management visual 1", "পিসিওএস ব্যবস্থাপনা চিত্র ১" class="img-fluid rounded-4 shadow-sm animate-float-slow" />
                        </figure>
                      </div>
                      <div class="col-md-6" data-aos="fade-left" data-aos-delay="80">
                        <figure class="image-card mb-0" style="min-height: 730px; margin:0 auto;">
                          <img src="img/modu12/manage2.jpg" alt="PCOS management visual 2", "পিসিওএস ব্যবস্থাপনা চিত্র ২" class="img-fluid rounded-4 shadow-sm animate-float-slow" />
                        </figure>
                      </div>
                    </div>
                  </section>
                </div>
              `;
            })(),
          },
          {
            id: "ch12-lesson-5",
            title: yhLang("BMI Guidance", "বি এম আই"),
            icon: "fa-scale-balanced",
            gradientClass: "bg-gradient-blue",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q12e",
                  question: yhLang(
                    "Why is tracking BMI important for PCOS?",
                    "পিসিওএস ব্যবস্থাপনায় বিএমআই পরিমাপ কেন জরুরি?"
                  ),
                  options: [
                    yhLang("It helps set target weight and manage symptoms", "এটি কাঙ্ক্ষিত ওজন ঠিক করে উপসর্গ নিয়ন্ত্রণে সাহায্য করে"),
                    yhLang("It has no connection", "এর কোনো সম্পর্ক নেই"),
                    yhLang("It increases complications", "এটি জটিলতা বাড়ায়"),
                    yhLang("It replaces healthy food", "এটি স্বাস্থ্যকর খাবারের বিকল্প"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const message = yhLang(
                "Monitor your BMI, set a healthy weight goal, and keep PCOS under control through portioned meals and regular exercise.",
                "নিজের BMI পরিমাপ করে, কাঙ্ক্ষিত ওজন সেট করতে হবে, ওজন নিয়ন্ত্রণে রাখতে পরিমিত খাবার গ্রহণ ও নিয়মিত ব্যায়ামের মাধ্যমে পিসিওএস নিয়ন্ত্রণে রাখতে হবে।"
              );

              const images = [
                { src: "img/modu12/BMI.jpg" },
                { src: "img/modu12/BMI2.jpg" },
                { src: "img/modu12/BMI3.jpg" },
              ];

              const renderImages = () =>
                images
                  .map(
                    (img, idx) => `
                      <div class="col-12 col-md-4" data-aos="zoom-in" data-aos-delay="${80 + idx * 20}">
                        <figure class="image-card mb-0" style="margin:0 auto;">
                          <img src="${img.src}" alt="${img.alt}" class="img-fluid rounded-4 shadow-sm animate-float-slow" />
                        </figure>
                      </div>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "বি এম আই",
                    "বি এম আই"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <p class="mb-4">${message}</p>
                    <div class="row g-3 align-items-stretch">
                      ${renderImages()}
                    </div>
                  </section>
                </div>
              `;
            })(),
          },
          {
            id: "ch12-lesson-6",
            title: yhLang("PCOS Reminders", "পিসিওএস"),
            icon: "fa-lightbulb",
            gradientClass: "bg-gradient-orange",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q12f",
                  question: yhLang(
                    "When should someone with PCOS seek medical care for irregular periods?",
                    "পিসিওএস থাকলে মাসিক বছরে কয়বারের কম হলে চিকিৎসা নিতে হবে?"
                  ),
                  options: [
                    yhLang("Less than four times a year", "বছরে চার বারের কম হলে"),
                    yhLang("প্রতিদিন", "প্রতিদিন"),
                    yhLang("শুধু শীতে", "শুধু শীতে"),
                    yhLang("কখনো নয়", "কখনো নয়"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const reminders = [
                "পিসিওএসে মাসিক নিয়মিত নাও হতে পারে। বছরে ৪ বারের কম হলে চিকিৎসা নিতে হবে।",
                "পিসিওএস হলে ঘুমের সমস্যা হতে পারে, তাই স্বাস্থ্যসম্মত ঘুমের অভ্যাস গড়ে তুলতে হবে।",
                "পিসিওএস সম্পর্কে জানতে হবে, সাপোর্ট নিতে হবে ও সময়মতো সঠিক চিকিৎসা নিতে হবে। পরিবার, বন্ধু, সাপোর্ট গ্রুপের সহযোগিতা ও কাউন্সেলিংয়ের মাধ্যমে সমস্যার সমাধান করতে হবে।",
              ];

              const renderReminders = () =>
                reminders
                  .map(
                    (text, idx) => `
                      <article class="modern-card glass-card mb-3" data-aos="fade-up" data-aos-delay="${40 + idx * 20}">
                        <p class="mb-0"><strong>${text}</strong></p>
                      </article>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "পিসিওএস",
                    "পিসিওএস"
                  )}</h2>

                  ${renderReminders()}
                </div>
              `;
            })(),
          },
          {
            id: "ch12-lesson-7",
            title: yhLang(
              "Child and Human Rights Charter",
              "শিশু অধিকার ও মানবাধিকার সনদ এবং যৌন ও স্বাস্থ্য অধিকার"
            ),
            icon: "fa-scale-balanced",
            gradientClass: "bg-gradient-purple",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q12g",
                  question: yhLang(
                    "Which CRC article prioritizes the best interests of the child?",
                    "সিআরসি অনুযায়ী কোন ধারায় শিশুর সর্বোচ্চ স্বার্থকে অগ্রাধিকার দেওয়া হয়েছে?"
                  ),
                  options: [
                    yhLang("Article 3", "ধারা ৩"),
                    yhLang("Article 9", "ধারা ৯"),
                    yhLang("Article 20", "ধারা ২০"),
                    yhLang("Article 42", "ধারা ৪২"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const intro =
                "বিশ্বের সব মানুষ কিছু অধিকার ও স্বাধীনতার দাবিদার। তার জন্মস্থান/মতবাদ/বিশ্বাস/জীবনযাপন—সবকিছুর ঊর্ধ্বে এ অধিকার তার প্রাপ্য যা থেকে কখনো তাকে বঞ্চিত করা যাবে না। আর ১৯৪৮ সালে প্রণীত হয় মানবাধিকারের বৈশ্বিক ঘোষণা, যার ভিত্তি সমতা, মর্যাদা, স্বাধীনতা, শান্তি ও ন্যায়।";

              const crcOverview =
                "শিশু অধিকার হচ্ছে শিশুদের মানবাধিকার। এ অধিকারগুলো আন্তর্জাতিক শিশু অধিকার সনদের (সিআরসি) মাধ্যমে সুরক্ষিত। সিআরসি অনুযায়ী, প্রত্যেক শিশুই বেড়ে উঠবে শান্তি ও মর্যাদাপূর্ণ, সহিষ্ণু ও মুক্ত স্বাধীন পরিবেশে; সমতা ও সৌহার্দ্যের মাধ্যমে। আন্তর্জাতিক শিশু অধিকার সনদে ৫৪টি ধারা রয়েছে। মূলত চারটি স্তম্ভের আলোকে অনুচ্ছেদগুলো ভাগ করা হয়েছে।";

              const articles = [
                {
                  title: "ধারা ২ — বৈষম্যহীনতা",
                  text: "কোনো শিশুই বৈষম্যের শিকার হবে না। যেকোনো পরিস্থিতিতেই সব শিশুই তাদের সম্ভাবনা বিকাশের সমান সুযোগ পাবে; যেমন—লিঙ্গ, বর্ণ, জাতীয়তা, ধর্ম, প্রতিবন্ধিতা, যৌনতার ধরণ বা অন্য কোনো মর্যাদার ভিত্তিতে বৈষম্যের শিকার না হয়ে শিক্ষায় অংশগ্রহণের সুযোগ পাবে।",
                },
                {
                  title: "ধারা ৩ — শিশুর সর্বোচ্চ স্বার্থ",
                  text: "শিশুদের ওপর প্রভাব ফেলবে এমন কোনো সিদ্ধান্তের ক্ষেত্রে তাদের স্বার্থগুলো সবসময় অগ্রাধিকার পাবে। যেমন—বাজেট প্রণয়নের সময় খেয়াল রাখতে হবে কোনো খাতে অর্থ বরাদ্দ বা কর্তনের ক্ষেত্রে যেন শিশুদের সর্বোচ্চ স্বার্থটাই গুরুত্ব পায়।",
                },
                {
                  title: "ধারা ৬ — বেঁচে থাকা ও বিকাশ",
                  text: "বেঁচে থাকার ও সুস্থভাবে বিকাশের অধিকার সব শিশুরই রয়েছে। মৌলিক সেবাগুলোয় শিশুদের প্রবেশাধিকার ও তাদের পূর্ণ সম্ভাবনা বিকাশের সমান অধিকার নিশ্চিত করতে হবে; যেমন—প্রতিবন্ধী শিশুর অবশ্যই শিক্ষা ও স্বাস্থ্যসেবা গ্রহণের অধিকার থাকবে।",
                },
                {
                  title: "ধারা ১২ — মতামত প্রদান",
                  text: "শিশুদের ওপর প্রভাব রাখবে এমন বিষয়ে তাদের মতামত বিবেচনায় নেওয়া বাধ্যতামূলক। শিশুদের অধিকারভুক্ত সব বিষয়ে তাদের মতামত শুনতে হবে ও শ্রদ্ধা রাখতে হবে; যেমন—শিশুবিষয়ক নীতি বা পরিকল্পনা গ্রহণে শিশুদের উপলব্ধিগুলো গ্রাহ্য করতে হবে।",
                },
              ];

              const renderArticles = () =>
                articles
                  .map(
                    (item, idx) => `
                      <article class="modern-card glass-card" data-aos="fade-up" data-aos-delay="${60 + idx * 20}">
                        <h3 class="h6 gradient-text mb-2">${item.title}</h3>
                        <p class="mb-0">${item.text}</p>
                      </article>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "শিশু অধিকার ও মানবাধিকার সনদ এবং যৌন ও স্বাস্থ্য অধিকার",
                    "শিশু অধিকার ও মানবাধিকার সনদ এবং যৌন ও স্বাস্থ্য অধিকার"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <p class="mb-3">${intro}</p>
                    <p class="mb-0">${crcOverview}</p>
                  </section>

                  <div class="menstrual-section-divider" aria-hidden="true"></div>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="60">
                    <h3 class="gradient-text h5 mb-3">${yhLang(
                      "আন্তর্জাতিক শিশু অধিকার সনদের প্রধান ধারা",
                      "আন্তর্জাতিক শিশু অধিকার সনদের প্রধান ধারা"
                    )}</h3>
                    <div class="row g-3">
                      ${renderArticles()}
                    </div>
                  </section>
                </div>
              `;
            })(),
          },
          {
            id: "ch12-lesson-8",
            title: yhLang(
              "Sexual and Reproductive Health Rights",
              "যৌন ও প্রজনন স্বাস্থ্য অধিকার"
            ),
            icon: "fa-venus-mars",
            gradientClass: "bg-gradient-rose",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q12h",
                  question: yhLang(
                    "Why are sexual and reproductive health rights critical for adolescents?",
                    "কিশোর-কিশোরীদের জন্য যৌন ও প্রজনন স্বাস্থ্য অধিকার কেন গুরুত্বপূর্ণ?"
                  ),
                  options: [
                    yhLang(
                      "They protect against disease, unwanted pregnancy, and uphold autonomy",
                      "এগুলো রোগ, অনাকাঙ্ক্ষিত গর্ভধারণ থেকে সুরক্ষা দেয় এবং স্বায়ত্তশাসন নিশ্চিত করে"
                    ),
                    yhLang("Only for entertainment", "শুধু বিনোদনের জন্য"),
                    yhLang("No relation to health", "স্বাস্থ্যের সাথে কোনো সম্পর্ক নেই"),
                    yhLang("Applies only to adults", "শুধু প্রাপ্তবয়স্কদের প্রযোজ্য"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const intro =
                "বিশ্বের মোট জনসংখ্যার প্রায় ৬ ভাগের ১ ভাগ কিশোর-কিশোরী (১০-১৯ বছর)। আর ২৫ বছর বয়সের নিচের জনগোষ্ঠী মোট জনসংখ্যার প্রায় এক-তৃতীয়াংশ। বয়ঃসন্ধিকালে কিশোর-কিশোরীদের শারীরিক ও মানসিক পরিবর্তন ঘটে এবং যৌনতার লক্ষণগুলো প্রকাশ পেতে থাকে। এ বয়সিদের প্রজনন ও যৌন স্বাস্থ্যবিষয়ক ঝুঁকিও থাকে বেশি। উপযুক্ত তথ্য ও শিক্ষার অভাবে তাদের যৌনবাহিত রোগে আক্রান্ত হওয়ার সম্ভাবনা অনেক বেশি থাকে। অনাকাঙ্ক্ষিত গর্ভধারণ এবং এর ফলে অনিরাপদ ও ঝুঁকিপূর্ণ গর্ভপাতজনিত স্বাস্থ্য সমস্যাও বেশি দেখা যায়। সুতরাং যৌন ও প্রজনন স্বাস্থ্যের অধিকার এক্ষেত্রে খুবই গুরুত্বপূর্ণ।";

              const whoDefinition =
                "প্রজনন স্বাস্থ্য হচ্ছে জীবনের প্রতিটি ধাপে প্রজননতন্ত্র সম্পর্কীয় একটি পরিপূর্ণ দৈহিক, মানসিক এবং সামাজিক কল্যাণের সামগ্রিক অবস্থা। বিশ্ব স্বাস্থ্য সংস্থা (ডব্লিউএইচও) এর মতে, একজন মানুষের প্রজননে সক্ষমতার পাশাপাশি সন্তোষজনক ও নিরাপদ যৌন জীবন-যাপন এবং স্বাধীনভাবে সিদ্ধান্ত গ্রহণ করাই প্রজনন স্বাস্থ্য।";

              const importance = [
                "যৌন ও প্রজনন স্বাস্থ্য অধিকার মৌলিক মানবাধিকারের অংশ।",
                "লিঙ্গ সমতা ও টেকসই উন্নয়নের জন্য এ অধিকার নিশ্চিত করা খুবই গুরুত্বপূর্ণ।",
                "নিজের শরীর ও যৌন সম্পর্কের ক্ষেত্রে কিশোরী এবং নারীদের নিয়ন্ত্রণ তাদের ক্ষমতায়নের পূর্বশর্ত।",
                "সামাজিক, অর্থনৈতিক, রাজনৈতিক ও সাংস্কৃতিক অঙ্গনে পূর্ণ অংশগ্রহণের জন্য এ অধিকার জরুরি।",
                "যৌন ও প্রজনন স্বাস্থ্য অধিকার কিশোরী ও নারীদের বৈষম্য, সহিংসতা ও নির্যাতন থেকে মুক্ত থাকার অধিকারকে সুরক্ষিত করে।",
                "মর্যাদা, সমতা ও বৈচিত্র্যের প্রতি সম্মানের নীতিগুলো বজায় রাখতে এই অধিকার অপরিহার্য।",
              ];

              const renderList = (items, baseDelay = 60) =>
                items
                  .map(
                    (text, idx) => `
                      <li data-aos="fade-left" data-aos-delay="${baseDelay + idx * 15}">
                        <i class="fa-solid fa-circle-check"></i>
                        <span>${text}</span>
                      </li>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "যৌন ও প্রজনন স্বাস্থ্য অধিকার",
                    "যৌন ও প্রজনন স্বাস্থ্য অধিকার"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <p class="mb-3">${intro}</p>
                    <p class="mb-0">${whoDefinition}</p>
                  </section>

                  <section class="modern-card glass-card menstrual-info-card mt-3" data-aos="fade-up" data-aos-delay="80">
                    <h3 class="gradient-text h5 mb-3">${yhLang(
                      "এ অধিকার কেন গুরুত্বপূর্ণ",
                      "এ অধিকার কেন গুরুত্বপূর্ণ"
                    )}</h3>
                    <ul class="list-unstyled puberty-list mb-0">
                      ${renderList(importance)}
                    </ul>
                  </section>
                </div>
              `;
            })(),
          },
        ],
      },
      {
        id: "ch-13",
        title:
          yhLang(
            "Module-13: Non-communicable diseases (NCDs) in adolescents and their prevention",
            "মডিউল-১৩: লিঙ্গ ভিত্তিক বৈষম্য"
          ),
        lessons: [
          {
            id: "ch13-lesson-1",
            title: yhLang("Gender-Based Discrimination", "লিঙ্গ ভিত্তিক বৈষম্য"),
            icon: "fa-venus-mars",
            gradientClass: "bg-gradient-rose",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q13a",
                  question: yhLang(
                    "Which statement best describes gender?",
                    "জেন্ডারকে কীভাবে সংজ্ঞায়িত করা যায়?"
                  ),
                  options: [
                    yhLang("A socially constructed identity that can change", "সমাজসৃষ্ট ও পরিবর্তনশীল পরিচয়"),
                    yhLang("A fixed biological trait", "একটি স্থির জৈবিক বৈশিষ্ট্য"),
                    yhLang("Only physical features", "শুধু শারীরিক বৈশিষ্ট্য"),
                    yhLang("Unrelated to society", "সমাজের সাথে সম্পর্কহীন"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const sexDefinition =
                "সেক্স: সেক্স বা লিঙ্গ হচ্ছে প্রাকৃতিক বা জৈবিক কারণে সৃষ্ট নারী-পুরুষের বৈশিষ্ট্যসূচক ভিন্নতা বা শারীরিক বৈশিষ্ট্যের ভিত্তিতে নারী-পুরুষের স্বাতন্ত্র্য, কিংবা নারী-পুরুষের শারীরিক বৈশিষ্ট্য, যা পরিবর্তনযোগ্য নয়।";

              const genderDefinition =
                "জেন্ডার: জেন্ডার হচ্ছে সমাজ কর্তৃক নির্ধারিত নারী ও পুরুষের সামাজিক পরিচয়, তাদের মধ্যকার বৈশিষ্ট্য এবং নারী ও পুরুষের ভূমিকা, যা পরিবর্তনীয় এবং সমাজ, সংস্কৃতি ইত্যাদি ভেদে ভিন্ন ভিন্ন। অর্থাৎ, জেন্ডার সামাজিকভাবে নির্মিত একটি বিষয়, যা পরিবর্তনশীল।";

              const genderPoints = [
                "পরিবর্তনশীল",
                "সমাজ ও সংস্কৃতি ভেদে ভিন্ন ভিন্ন",
                "অনির্ধারিত",
                "সমাজ কর্তৃক আরোপিত",
                "মানুষ কর্তৃক সৃষ্ট",
                "রীতিনীতি অর্জিত/অর্পিত হয়",
                "সমাজসৃষ্ট ভূমিকা, দায়িত্ব, আচরণ",
              ];

              const sexPoints = [
                "অপরিবর্তনীয়",
                "পৃথিবীর সব জায়গায় একই রকম",
                "নির্ধারিত",
                "আবহমান কাল ধরে একই",
                "প্রকৃতি প্রদত্ত",
                "জন্মগত",
                "শারীরিক",
              ];

              const renderList = (items, delayStart = 80) =>
                items
                  .map(
                    (text, idx) => `
                      <li data-aos="fade-left" data-aos-delay="${delayStart + idx * 15}">
                        <i class="fa-solid fa-circle-check"></i>
                        <span>${text}</span>
                      </li>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "লিঙ্গ ভিত্তিক বৈষম্য",
                    "লিঙ্গ ভিত্তিক বৈষম্য"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <h3 class="gradient-text h5 mb-2">${yhLang("সেক্স", "সেক্স")}</h3>
                    <p class="mb-3">${sexDefinition}</p>
                    <h3 class="gradient-text h5 mb-2">${yhLang("জেন্ডার", "জেন্ডার")}</h3>
                    <p class="mb-0">${genderDefinition}</p>
                  </section>

                  <section class="modern-card glass-card menstrual-info-card mt-3" data-aos="fade-up" data-aos-delay="80">
                    <h3 class="gradient-text h5 mb-3">${yhLang(
                      "জেন্ডার ও সেক্সের মধ্যে পার্থক্য",
                      "জেন্ডার ও সেক্সের মধ্যে পার্থক্য"
                    )}</h3>
                    <div class="table-responsive">
                      <table class="table table-modern align-middle" aria-label="
                        জেন্ডার ও সেক্স তুলনামূলক সারণি">
                        <thead>
                          <tr>
                            <th scope="col">${yhLang("জেন্ডার", "জেন্ডার")}</th>
                            <th scope="col">${yhLang("সেক্স", "সেক্স")}</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${genderPoints
                            .map(
                              (genderPoint, idx) => `
                                <tr data-aos="fade-up" data-aos-delay="${100 + idx * 15}">
                                  <td>${genderPoint}</td>
                                  <td>${sexPoints[idx] || ""}</td>
                                </tr>
                              `
                            )
                            .join("")}
                        </tbody>
                      </table>
                    </div>
                  </section>
                </div>
              `;
            })(),
          },
          {
            id: "ch13-lesson-2",
            title: yhLang("Understanding Gender Inequity", "জেন্ডার বৈষম্য"),
            icon: "fa-people-arrows",
            gradientClass: "bg-gradient-purple",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q13b",
                  question: yhLang(
                    "What helps achieve gender equality?",
                    "জেন্ডার সমতা অর্জনে কী সহায়ক?"
                  ),
                  options: [
                    yhLang("Ensuring equity and equal opportunities", "সাম্য নিশ্চিত করে সমান সুযোগ তৈরি করা"),
                    yhLang("Ignoring discrimination", "বৈষম্য উপেক্ষা করা"),
                    yhLang("Limiting participation", "অংশগ্রহণ সীমিত করা"),
                    yhLang("Only focusing on men", "শুধু পুরুষদের গুরুত্ব দেওয়া"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const intro =
                "নারী ও পুরুষের ভিন্নতা, আচরণ ও সামাজিক অভ্যাসভেদে নারী ও পুরুষের মধ্যে কিছু বৈষম্য সৃষ্টি হয়। সামাজিক দৃষ্টিভঙ্গি, ধর্মের অপব্যাখ্যা, মেয়েদের ছোট করে দেখার মানসিকতা ইত্যাদি জেন্ডার বৈষম্য সৃষ্টিতে প্রধান ভূমিকা পালন করে। জেন্ডারের এই বৈষম্যকে পরিবার, সমাজ যখন মেনে নেয় ও আইন, নীতি বা মূল্যবোধের মাধ্যমে রাষ্ট্র যখন বৈধতা দেয় তখন তা প্রাতিষ্ঠানিক রূপ লাভ করে এবং সেটি বৈষম্য হিসেবে গণ্য হয়। এই বৈষম্য সামাজিকভাবে তৈরি যা পরিবার, সমাজ ও সংস্কৃতি থেকে গৃহীত, সমাজ ও স্থান ভেদে ভিন্ন, এবং অবশ্যই পরিবর্তনশীল।";

              const sections = [
                {
                  title: "সমতা",
                  body:
                    "সমতা বলতে সাধারণত সমঅবস্থাকে বোঝায়। সমতা হচ্ছে সমভাবে বণ্টন—অর্থাৎ প্রাপ্তি, দায়িত্ব পালন, সুযোগ-সুবিধা লাভ ইত্যাদি সকল ক্ষেত্রে সমান ভূমিকা ও অধিকার। যেমন: চাকরির বিজ্ঞপ্তিতে যোগ্যতা ও অভিজ্ঞতার মাপকাঠিতে আবেদনপত্র আহ্বান করা হলে নারী, পুরুষ ও তৃতীয় লিঙ্গ অথবা পিছিয়ে পড়া জনগোষ্ঠী সকলেই আবেদন করার সুযোগ পাবে।",
                },
                {
                  title: "ন্যায্যতা",
                  body:
                    "প্রয়োজন অনুযায়ী বণ্টন—অর্থাৎ প্রাপ্তি, দায়িত্ব পালন, সুযোগ-সুবিধা লাভ ইত্যাদি ক্ষেত্রে ব্যক্তি, অবস্থা, পরিস্থিতি বিশ্লেষণ সাপেক্ষে সাম্য প্রতিষ্ঠা করাই হচ্ছে ন্যায্যতা।",
                },
                {
                  title: "জেন্ডার সমতা",
                  body:
                    "জেন্ডার সমতা হচ্ছে বাস্তবসম্মত সমতা যা ব্যক্তিগত পর্যায়ের সকল ক্ষেত্রে এবং জনসমক্ষে নারী–পুরুষের অংশগ্রহণ এবং ক্ষমতায়ন নির্দেশ করে। জেন্ডার সমতা নারী এবং পুরুষ এক তা মনে করে না; বরং নারী এবং পুরুষের দায়িত্ব, সুযোগ-সুবিধা এবং অধিকার সমান হবে তা নিশ্চিত করে।",
                },
                {
                  title: "সাম্য ও সমতার পার্থক্য",
                  body:
                    "পরিবার, সমাজ ও রাষ্ট্রের বিভিন্ন কর্মকাণ্ডে নারীরা এখনো পিছিয়ে রয়েছে। তাই পুরুষের চেয়ে নারীকে বেশি সুযোগ-সুবিধা দিয়ে সাম্য (Equity) মাধ্যমে জেন্ডার সমতা (Equality) আনতে হবে।",
                },
              ];

              const renderSections = () =>
                sections
                  .map(
                    (section, idx) => `
                      <article class="mb-4" data-aos="fade-right" data-aos-delay="${80 + idx * 20}">
                        <h3 class="h6 gradient-text mb-2">${section.title}</h3>
                        <p class="mb-0">${section.body}</p>
                        ${idx < sections.length - 1 ? '<hr class="my-3" />' : ""}
                      </article>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "জেন্ডার বৈষম্য",
                    "জেন্ডার বৈষম্য"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <div class="row g-4 align-items-center">
                      <div class="col-lg-7">
                        <p class="mb-4">${intro}</p>
                        ${renderSections()}
                      </div>
                      <div class="col-lg-5" data-aos="fade-left" data-aos-delay="80">
                        <figure class="image-card mb-0" style="max-height:360px; max-width:80%; margin:0 auto;">
                          <img src="img/modu13/gender.jpg" alt="${yhLang(
                            "Gender equity illustration",
                            "জেন্ডার সমতা চিত্র"
                          )}" class="img-fluid rounded-4 shadow-sm animate-float-slow" />
                        </figure>
                      </div>
                    </div>
                  </section>
                </div>
              `;
            })(),
          },
          {
            id: "ch13-lesson-3",
            title: yhLang(
              "Gender Bias Across Society",
              "সমাজে বিরাজমান জেন্ডার বৈষম্য"
            ),
            icon: "fa-scale-unbalanced",
            gradientClass: "bg-gradient-orange",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q13c",
                  question: yhLang(
                    "Which area shows gender bias in the examples?",
                    "উদাহরণগুলোর কোনটি জেন্ডার বৈষম্যের দৃষ্টান্ত?"
                  ),
                  options: [
                    yhLang("Girls receiving less nutritious food", "মেয়েদের কম পুষ্টিকর খাবার দেওয়া"),
                    yhLang("সব শিশু সমান সহায়তা পায়", "সব শিশু সমান সহায়তা পায়"),
                    yhLang("নারী-পুরুষ একই মজুরি পায়", "নারী-পুরুষ একই মজুরি পায়"),
                    yhLang("মেয়েদের সিদ্ধান্তের প্রতি সম্মান", "মেয়েদের সিদ্ধান্তের প্রতি সম্মান"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const biasList = [
                "সমাজে সকল ক্ষেত্রে, যেমন—শিক্ষা, স্বাস্থ্যসেবা পাওয়ার ক্ষেত্রে মেয়েদের তুলনায় ছেলেদের অগ্রাধিকার",
                "পরিবারে কন্যা সন্তান থেকে পুত্র সন্তানের অধিক মূল্যায়ন",
                "পরিবারে মেয়েদের তুলনায় ছেলেদের বেশি ও পুষ্টিকর খাবার খেতে দেওয়া",
                "কন্যা সন্তানকে লেখাপড়া শেখাতে বাবা-মায়ের অনীহা, পুত্রের পড়াশোনার জন্য ব্যয় করা",
                "কন্যা সন্তানকে পরিবারের বোঝা মনে করে অল্প বয়সে বিয়ে দিয়ে দেওয়া",
                "যৌতুক দাবি করা এবং যৌতুকের কারণে মেয়েদের উপর শারীরিক ও মানসিক নির্যাতন করা",
                "অসুস্থ হলে মেয়েদের স্বাস্থ্যসেবা গ্রহণের ব্যাপারে পরিবারের উদাসীনতা",
                "সন্তান গ্রহণ ও নিজের শরীর সম্পর্কে সিদ্ধান্ত নিতে না পারার প্রথা",
                "কৈশোরে সন্তানধারণ করা",
                "নারীর উপর শারীরিক ও মানসিক নির্যাতন খুব স্বাভাবিকভাবে গ্রহণ করা",
                "পুরুষের তুলনায় নারীকে কম পারিশ্রমিক দেওয়া",
              ];

              const orbitItems = [
                "গর্ভধারণ বিষয়ক জটিলতা থেকে দীর্ঘস্থায়ী অসুস্থতা",
                "মাতৃমৃত্যু",
                "কন্যাশিশু মৃত্যু",
                "প্রজননতন্ত্রের প্রদাহ ও যৌনরোগ",
                "রক্তস্বল্পতা",
                "পুষ্টির অভাবজনিত সমস্যা",
                "মানসিক অসুস্থতা",
                "প্রলম্বিত অসুস্থতা",
                "অকাল বার্ধক্য",
                "অপরিণত বয়সে গর্ভধারণ",
              ];

              const colorCycle = [
                "bg-gradient-blue",
                "bg-gradient-rose",
                "bg-gradient-green",
                "bg-gradient-teal",
                "bg-gradient-purple",
                "bg-gradient-tangerine",
                "bg-gradient-emerald",
              ];

              const renderBiasList = () =>
                biasList
                  .map(
                    (text, idx) => `
                      <li data-aos="fade-left" data-aos-delay="${60 + idx * 20}">
                        <i class="fa-solid fa-circle-check"></i>
                        <span>${text}</span>
                      </li>
                    `
                  )
                  .join("");

              const renderOrbit = () => {
                const radius = 150;
                const angleStep = 360 / orbitItems.length;
                return orbitItems
                  .map((item, idx) => {
                    const angle = angleStep * idx;
                    const color = colorCycle[idx % colorCycle.length];
                    return `
                      <div class="orbit-item" style="transform: rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg);" data-aos="zoom-in" data-aos-delay="${120 + idx * 30}">
                        <div class="orbit-card ${color}">
                          <span class="orbit-title">${item}</span>
                        </div>
                      </div>
                    `;
                  })
                  .join("");
              };

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "সমাজে বিরাজমান জেন্ডার বৈষম্য",
                    "সমাজে বিরাজমান জেন্ডার বৈষম্য"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <div class="row g-4 align-items-start">
                      <div class="col-lg-6">
                        <ul class="list-unstyled puberty-list mb-0">
                          ${renderBiasList()}
                        </ul>
                      </div>
                      <div class="col-lg-6" data-aos="fade-left" data-aos-delay="80">
                        <div class="orbit-layout" data-orbit-manual="true">
                          <div class="orbit-center icon-spin-on-hover">
                            <div class="orbit-card bg-gradient-rose">
                              <div class="orbit-title fw-bold">${yhLang(
                                "প্রজনন স্বাস্থ্যে জেন্ডার বৈষম্যের প্রভাব",
                                "প্রজনন স্বাস্থ্যে জেন্ডার বৈষম্যের প্রভাব"
                              )}</div>
                            </div>
                          </div>
                          ${renderOrbit()}
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              `;
            })(),
          },
          {
            id: "ch13-lesson-4",
            title: yhLang(
              "Forms of Gender-Based Violence",
              "জেন্ডারভিত্তিক সহিংসতা ও নির্যাতনের ধরণ"
            ),
            icon: "fa-hand-fist",
            gradientClass: "bg-gradient-teal",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q13d",
                  question: yhLang(
                    "Which act falls under physical abuse?",
                    "নিম্নের কোনটি শারীরিক নির্যাতনের উদাহরণ?"
                  ),
                  options: [
                    yhLang("হত্যা বা মারধর", "হত্যা বা মারধর"),
                    yhLang("সমর্থনমূলক আলোচনায় অংশগ্রহণ", "সমর্থনমূলক আলোচনায় অংশগ্রহণ"),
                    yhLang("সবার মতামত শোনা", "সবার মতামত শোনা"),
                    yhLang("পারিবারিক সহায়তা প্রদান", "পারিবারিক সহায়তা প্রদান"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const intro =
                "সাধারণত আমাদের চারপাশে যে সব সহিংসতা ও নির্যাতন ঘটে সেগুলোকে পারিবারিক সহিংসতা (প্রতিরোধ ও সুরক্ষা) আইন ২০১০ অনুযায়ী চার ভাগে ভাগ করা হয়েছে।";

              const lawHighlights = [
                {
                  title: "আইন ২০১০",
                  desc: "পারিবারিক সহিংসতা প্রতিরোধ ও সুরক্ষা আইন"
                },
                {
                  title: "৪টি ধরণ",
                  desc: "শারীরিক, মানসিক, আর্থিক ও যৌন"
                },
                {
                  title: "সুরক্ষার পরিধি",
                  desc: "পরিবারের সকল সদস্য ও সুরক্ষিত ব্যক্তিরা"
                }
              ];

              const physicalDescription =
                "এমন কোনো কাজ বা আচরণ করা, যার দ্বারা সংক্ষুব্ধ ব্যক্তির জীবন, স্বাস্থ্য, নিরাপত্তা বা শরীরের কোনো অঙ্গ ক্ষতিগ্রস্ত হয় অথবা ক্ষতিগ্রস্ত হওয়ার সম্ভাবনা থাকে এবং সংক্ষুব্ধ ব্যক্তিকে অপরাধমূলক কাজ করতে বাধ্য করা বা প্ররোচনা প্রদান করা বা বলপ্রয়োগ।";

              const physicalExamples = [
                "মারধর, আঘাত ও যেকোনো শারীরিক নির্যাতন",
                "এসিড আক্রমণ",
                "পাচার",
                "অপহরণ",
                "হত্যা",
                "আত্মহত্যায় প্ররোচনা বা বাধ্য করা",
                "ধাক্কা দেয়া",
                "গলা চিপে ধরা",
                "চুলের মুঠি ধরে টানা",
                "চড়, থাপ্পড় ইত্যাদি",
              ];

              const renderHighlights = () =>
                lawHighlights
                  .map(
                    (item, idx) => `
                      <article class="policy-journey-card compact" data-aos="fade-up" data-aos-delay="${60 + idx * 20}">
                        <div class="policy-journey-seal bg-gradient-rose">
                          <span class="policy-journey-step">${item.title}</span>
                        </div>
                        <div class="policy-journey-body">
                          <p class="mb-0 fw-semibold">${item.desc}</p>
                        </div>
                      </article>
                    `
                  )
                  .join("");

              const renderExamples = () =>
                physicalExamples
                  .map(
                    (item, idx) => `
                      <li data-aos="fade-left" data-aos-delay="${100 + idx * 15}">
                        <i class="fa-solid fa-circle-check"></i>
                        <span>${item}</span>
                      </li>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "জেন্ডারভিত্তিক সহিংসতা ও নির্যাতনের ধরণ",
                    "জেন্ডারভিত্তিক সহিংসতা ও নির্যাতনের ধরণ"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <p class="mb-4 fw-semibold">${intro}</p>
                    <div class="policy-journey-grid" role="list">
                      ${renderHighlights()}
                    </div>
                  </section>

                  <div class="menstrual-section-divider" aria-hidden="true"></div>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="80">
                    <div class="row g-4 align-items-center">
                      <div class="col-lg-5" data-aos="fade-right" data-aos-delay="100">
                        <article class="glass-card p-4 h-100 shadow-sm">
                          <div class="d-flex align-items-center gap-3 mb-3">
                            <div class="icon-circle bg-gradient-purple text-white">
                              <i class="fa-solid fa-hand-fist"></i>
                            </div>
                            <div>
                              <p class="text-uppercase text-muted small mb-1">${yhLang(
                                "ধরণ",
                                "ধরণ"
                              )}</p>
                              <h3 class="h5 gradient-text mb-0">${yhLang(
                                "১. শারীরিক নির্যাতন",
                                "১. শারীরিক নির্যাতন"
                              )}</h3>
                            </div>
                          </div>
                          <p class="mb-0">${physicalDescription}</p>
                        </article>
                      </div>
                      <div class="col-lg-7" data-aos="fade-left" data-aos-delay="120">
                        <div class="glass-card h-100 p-4 shadow-sm">
                          <h4 class="h6 text-uppercase text-muted mb-3">${yhLang(
                            "প্রধান উদাহরণ",
                            "প্রধান উদাহরণ"
                          )}</h4>
                          <ul class="list-unstyled puberty-list mb-0">
                            ${renderExamples()}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              `;
            })(),
          },
          {
            id: "ch13-lesson-5",
            title: yhLang(
              "Psychological Violence",
              "মানসিক নির্যাতন"
            ),
            icon: "fa-brain",
            gradientClass: "bg-gradient-purple",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q13e",
                  question: yhLang(
                    "Which action is a form of mental abuse?",
                    "নিম্নের কোনটি মানসিক নির্যাতনের অন্তর্ভুক্ত?"
                  ),
                  options: [
                    yhLang("কোথাও যেতে বাধা দেয়া", "কোথাও যেতে বাধা দেয়া"),
                    yhLang("সমর্থন দিয়ে উৎসাহিত করা", "সমর্থন দিয়ে উৎসাহিত করা"),
                    yhLang("স্বাধীন মত প্রকাশে সহায়তা", "স্বাধীন মত প্রকাশে সহায়তা"),
                    yhLang("সমান সুযোগ দেওয়া", "সমান সুযোগ দেওয়া"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const intro =
                "নিম্নবর্ণিত বিষয়সমূহ অন্তর্ভুক্ত হবে —";

              const mentalDefinitions = [
                {
                  title: "ক. মৌখিক নির্যাতন ও অপমান",
                  text: "মৌখিক নির্যাতন, অপমান, অবজ্ঞা, ভীতি প্রদর্শন বা এমন কোনো উক্তি করা, যা দ্বারা সংক্ষুব্ধ ব্যক্তির মানসিকভাবে ক্ষতি হয়।",
                },
                {
                  title: "খ. হয়রানি",
                  text: "অবিরাম হয়রানি, অনুসরণ, ভয় দেখানো বা মানসিক চাপ সৃষ্টি করে ব্যক্তিেকে দুর্বল করে দেওয়া।",
                },
                {
                  title: "গ. স্বাধীনতায় হস্তক্ষেপ",
                  text: "ব্যক্তির স্বাভাবিক চলাচল, যোগাযোগ বা ব্যক্তিগত ইচ্ছা ও মতামত প্রকাশের স্বাধীনতার উপর হস্তক্ষেপ করে তাকে নিয়ন্ত্রণে রাখার প্রয়াস।",
                },
              ];

              const controlExamples = [
                "কোথাও যেতে বাধা দেয়া",
                "গালমন্দ করা",
                "অপমান করা",
                "হেয় করে কথা বলা",
                "বিরক্ত করা",
                "সন্দেহ করা",
                "বিভিন্ন ধরনের বাধ্যবাধকতা আরোপ করা",
                "মানসিক অশান্তি বা অস্থিরতা সৃষ্টি করা",
              ];

              const renderDefinitions = () =>
                mentalDefinitions
                  .map(
                    (item, idx) => `
                      <article class="modern-card glass-card" data-aos="fade-up" data-aos-delay="${80 + idx * 20}">
                        <h3 class="h6 gradient-text mb-2">${item.title}</h3>
                        <p class="mb-0">${item.text}</p>
                      </article>
                    `
                  )
                  .join("");

              const renderExamples = () =>
                controlExamples
                  .map(
                    (text, idx) => `
                      <li data-aos="fade-left" data-aos-delay="${100 + idx * 15}">
                        <i class="fa-solid fa-circle-check"></i>
                        <span>${text}</span>
                      </li>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "মানসিক নির্যাতন",
                    "মানসিক নির্যাতন"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <p class="mb-3">${intro}</p>
                    <div class="row g-3">
                      ${renderDefinitions()}
                    </div>
                  </section>

                  <div class="menstrual-section-divider" aria-hidden="true"></div>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="80">
                    <div class="row g-4 align-items-center">
                      <div class="col-lg-5">
                        <article class="glass-card p-4 shadow-sm h-100" data-aos="fade-right" data-aos-delay="100">
                          <div class="d-flex align-items-center gap-3 mb-3">
                            <div class="icon-circle bg-gradient-rose text-white">
                              <i class="fa-solid fa-head-side-virus"></i>
                            </div>
                            <div>
                              <p class="text-uppercase text-muted small mb-1">${yhLang(
                                "মানসিক প্রভাব",
                                "মানসিক প্রভাব"
                              )}</p>
                              <h3 class="h5 gradient-text mb-0">${yhLang(
                                "স্বাধীনতায় হস্তক্ষেপ",
                                "স্বাধীনতায় হস্তক্ষেপ"
                              )}</h3>
                            </div>
                          </div>
                          <p class="mb-0">${yhLang(
                            "স্বাভাবিক চলাচল, যোগাযোগ বা ব্যক্তিগত মতামত প্রকাশে বাধা সৃষ্টি করে মানসিক অশান্তি ও অস্থিরতা তৈরি করা হয়।",
                            "স্বাভাবিক চলাচল, যোগাযোগ বা ব্যক্তিগত মতামত প্রকাশে বাধা সৃষ্টি করে মানসিক অশান্তি ও অস্থিরতা তৈরি করা হয়।"
                          )}</p>
                        </article>
                      </div>
                      <div class="col-lg-7" data-aos="fade-left" data-aos-delay="120">
                        <div class="glass-card h-100 p-4 shadow-sm">
                          <h4 class="h6 text-uppercase text-muted mb-3">${yhLang(
                            "প্রধান উদাহরণ",
                            "প্রধান উদাহরণ"
                          )}</h4>
                          <ul class="list-unstyled puberty-list mb-0">
                            ${renderExamples()}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              `;
            })(),
          },
          {
            id: "ch13-lesson-6",
            title: yhLang(
              "Sexual Violence",
              "যৌন নির্যাতন"
            ),
            icon: "fa-venus-double",
            gradientClass: "bg-gradient-rose",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q13f",
                  question: yhLang(
                    "Which act is considered sexual violence?",
                    "কোনটি যৌন নির্যাতনের অন্তর্ভুক্ত?"
                  ),
                  options: [
                    yhLang("ধর্ষণ ও ধর্ষণের চেষ্টা", "ধর্ষণ ও ধর্ষণের চেষ্টা"),
                    yhLang("সম্মানজনক সংলাপ", "সম্মানজনক সংলাপ"),
                    yhLang("পারস্পরিক সম্মত সিদ্ধান্ত", "পারস্পরিক সম্মত সিদ্ধান্ত"),
                    yhLang("সহায়ক পরামর্শ", "সহায়ক পরামর্শ"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const intro =
                "নিপীড়ন যা দ্বারা সংক্ষুব্ধ ব্যক্তির সম্মান, সুনাম ও সম্ভ্রমের ক্ষতি হয়। যৌন আকাঙ্ক্ষা ও চাহিদা পূরণে বিশেষ ধরণের নির্যাতন, যা শরীর ও মনের উপর সংঘটিত একটি জঘন্যতম অপরাধ।";

              const sexualExamples = [
                "ধর্ষণ",
                "ধর্ষণের চেষ্টা",
                "দলবদ্ধ ধর্ষণ",
                "প্রতারণামূলক বিয়ে বা যৌন সম্পর্ক স্থাপন",
                "জোরপূর্বক যৌন ব্যবসায় বাধ্য করা",
              ];

              const renderExamples = () =>
                sexualExamples
                  .map(
                    (item, idx) => `
                      <li data-aos="fade-left" data-aos-delay="${100 + idx * 15}">
                        <i class="fa-solid fa-circle-check"></i>
                        <span>${item}</span>
                      </li>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "যৌন নির্যাতন",
                    "যৌন নির্যাতন"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <div class="row g-4 align-items-center">
                      <div class="col-lg-12">
                        <p class="mb-0">${intro}</p>
                      </div>
                    </div>
                  </section>

                  <div class="menstrual-section-divider" aria-hidden="true"></div>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="80">
                    <h3 class="h6 text-uppercase text-muted mb-3">${yhLang(
                      "উদাহরণ",
                      "উদাহরণ"
                    )}</h3>
                    <ul class="list-unstyled puberty-list mb-0">
                      ${renderExamples()}
                    </ul>
                  </section>
                </div>
              `;
            })(),
          },
          {
            id: "ch13-lesson-7",
            title: yhLang(
              "Sexual Harassment Awareness",
              "যৌন হয়রানি"
            ),
            icon: "fa-shield-heart",
            gradientClass: "bg-gradient-indigo",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q13g",
                  question: yhLang(
                    "Which action directly helps prevent sexual harassment?",
                    "নিম্নের কোনটি যৌন হয়রানি প্রতিরোধে সহায়ক পদক্ষেপ?"
                  ),
                  options: [
                    yhLang("বিশ্বস্ত ব্যক্তির কাছে ঘটনাটি জানানো", "বিশ্বস্ত ব্যক্তির কাছে ঘটনাটি জানানো"),
                    yhLang("ঘটনাটি গোপন রাখা", "ঘটনাটি গোপন রাখা"),
                    yhLang("হয়রানিকারীর সাথে একা দেখা করা", "হয়রানিকারীর সাথে একা দেখা করা"),
                    yhLang("সহায়তা প্রত্যাখ্যান করা", "সহায়তা প্রত্যাখ্যান করা"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const definition =
                "যৌন হয়রানি হলো এমন সব অশোভন আচরণ, ইঙ্গিত, মন্তব্য বা শারীরিক স্পর্শ যা কারো সম্মতি ছাড়া করা হয় এবং যার ফলে ভুক্তভোগী ব্যক্তি অপমান, ভয় বা নিরাপত্তাহীনতায় ভোগে।";

              const legalPoint =
                "বাংলাদেশের নারী ও শিশু নির্যাতন দমন আইন, কর্মক্ষেত্রে যৌন হয়রানি প্রতিরোধ নীতিমালা এবং ডিজিটাল নিরাপত্তা আইন যৌন হয়রানি অপরাধ হিসেবে বিবেচনা করে এবং প্রতিকার পাওয়ার সুযোগ দেয়।";

              const harassmentForms = [
                {
                  title: "মৌখিক ও অনলাইন হয়রানি",
                  desc: "অশালীন মন্তব্য, অশ্লীল কৌতুক, ফোন/মেসেজে বিরক্ত করা, সামাজিক যোগাযোগমাধ্যমে অপমানজনক কন্টেন্ট প্রকাশ।",
                  icon: "fa-comment-slash",
                },
                {
                  title: "অমৌখিক ইঙ্গিত",
                  desc: "অশোভন অঙ্গভঙ্গি, বারবার তাকিয়ে থাকা, যৌন ইঙ্গিতপূর্ণ ছবি প্রদর্শন, অকারণ অনুসরণ করা।",
                  icon: "fa-eye",
                },
                {
                  title: "শারীরিক হয়রানি",
                  desc: "অবাঞ্ছিত স্পর্শ, ধাক্কা, হাত ধরা, আলিঙ্গনে বাধ্য করা বা যেকোনো শারীরিক ঘনিষ্ঠতার চেষ্টা।",
                  icon: "fa-hand-dots",
                },
              ];

              const protectionSteps = [
                "হয়রানির সময় যত দ্রুত সম্ভব নিরাপদ জায়গায় সরে যান এবং আশেপাশের মানুষের সহায়তা নিন।",
                "ঘটনার তারিখ, সময়, স্থান ও উপস্থিত সাক্ষীদের নামসহ নোট করে রাখুন।",
                "বিশ্বস্ত অভিভাবক, শিক্ষক, সহকর্মী বা সহপাঠীকে সঙ্গে সঙ্গে জানান।",
                "প্রতিষ্ঠানে বিদ্যমান অভিযোগ বক্স, কমিটি বা হটলাইন ব্যবহার করুন এবং প্রয়োজনে ৯৯৯ বা সংশ্লিষ্ট কর্তৃপক্ষকে যোগাযোগ করুন।",
                "মানসিক চাপ কমাতে কাউন্সেলিং বা মনোসামাজিক সহায়তা গ্রহণ করুন।",
              ];

              const supportChannels = [
                "বিদ্যালয়/কলেজের যৌন হয়রানি প্রতিরোধ কমিটি",
                "উপজেলা মহিলা বিষয়ক কর্মকর্তার অফিস",
                "জাতীয় হেল্পলাইন ১০৯",
                "জরুরি সহায়তা ৯৯৯",
                "বিশ্বস্ত এনজিও বা কমিউনিটি সাপোর্ট গ্রুপ",
              ];

              const renderFormCards = () =>
                harassmentForms
                  .map(
                    (item, idx) => `
                      <article class="policy-journey-card" data-aos="fade-up" data-aos-delay="${80 + idx * 40}">
                        <div class="policy-journey-seal bg-gradient-rose">
                          <i class="fa-solid ${item.icon}"></i>
                        </div>
                        <div class="policy-journey-body">
                          <h3 class="h6 gradient-text mb-1">${item.title}</h3>
                          <p class="mb-0">${item.desc}</p>
                        </div>
                      </article>
                    `
                  )
                  .join("");

              const renderList = (items, baseDelay = 60) =>
                items
                  .map(
                    (text, idx) => `
                      <li data-aos="fade-left" data-aos-delay="${baseDelay + idx * 20}">
                        <i class="fa-solid fa-circle-check"></i>
                        <span>${text}</span>
                      </li>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "যৌন হয়রানি",
                    "যৌন হয়রানি"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <p class="mb-3">${definition}</p>
                    <div class="alert alert-modern" role="alert">
                      <i class="fa-solid fa-scale-balanced me-2"></i>
                      <span>${legalPoint}</span>
                    </div>
                  </section>

                  <section class="modern-card glass-card menstrual-info-card mt-3" data-aos="fade-up" data-aos-delay="80">
                    <h3 class="gradient-text h5 mb-3">${yhLang(
                      "হয়রানির প্রধান ধরন",
                      "হয়রানির প্রধান ধরন"
                    )}</h3>
                    <div class="policy-journey-grid" role="list">
                      ${renderFormCards()}
                    </div>
                  </section>

                  <div class="menstrual-section-divider" aria-hidden="true"></div>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="100">
                    <div class="row g-4 align-items-center">
                      <div class="col-lg-7">
                        <h3 class="h6 text-uppercase text-muted mb-3">${yhLang(
                          "তাৎক্ষণিক করণীয়",
                          "তাৎক্ষণিক করণীয়"
                        )}</h3>
                        <ul class="list-unstyled puberty-list mb-0">
                          ${renderList(protectionSteps)}
                        </ul>
                      </div>
                      <div class="col-lg-5" data-aos="fade-left" data-aos-delay="120">
                        <div class="glass-card h-100 p-4 shadow-sm">
                          <h4 class="h6 text-uppercase text-muted mb-3">${yhLang(
                            "সহায়তা ও অভিযোগের ঠিকানা",
                            "সহায়তা ও অভিযোগের ঠিকানা"
                          )}</h4>
                          <ul class="list-unstyled puberty-list mb-0">
                            ${renderList(supportChannels, 80)}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              `;
            })(),
          },
          {
            id: "ch13-lesson-8",
            title: yhLang(
              "Financial Harm and Economic Violence",
              "“আর্থিক ক্ষতি” অর্থে নিম্নবর্ণিত বিষয়সমূহও অন্তর্ভুক্ত হবে, যথা—"
            ),
            icon: "fa-coins",
            gradientClass: "bg-gradient-emerald",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q13h",
                  question: yhLang(
                    "Which situation is an example of financial harm?",
                    "নিম্নের কোনটি আর্থিক ক্ষতির উদাহরণ?"
                  ),
                  options: [
                    yhLang("স্ত্রীর যৌতুক ও সম্পত্তি জোর করে নিয়ে নেওয়া", "স্ত্রীর যৌতুক ও সম্পত্তি জোর করে নিয়ে নেওয়া"),
                    yhLang("পারিবারিক সম্পদে সবার সমান অংশ নিশ্চিত করা", "পারিবারিক সম্পদে সবার সমান অংশ নিশ্চিত করা"),
                    yhLang("আয়ের উৎস বাড়াতে প্রশিক্ষণ দেওয়া", "আয়ের উৎস বাড়াতে প্রশিক্ষণ দেওয়া"),
                    yhLang("অর্থনৈতিক সহায়তা প্রস্তাব করা", "অর্থনৈতিক সহায়তা প্রস্তাব করা"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const intro =
                "আইন অনুযায়ী “আর্থিক ক্ষতি” কেবল অর্থ ছিনিয়ে নেওয়া নয়; বরং সম্পদ ও বৈধ সুযোগ থেকে কাউকে বঞ্চিত করার যে কোনো প্রচেষ্টা।";

              const clauseItems = [
                {
                  title: "(১)",
                  text: "আইন, প্রথা বা আদালতের আদেশ অনুযায়ী যে সম্পদ, সুযোগ বা সম্পত্তি পাওয়ার অধিকার রয়েছে, তা থেকে সংক্ষুব্ধ ব্যক্তিকে বঞ্চিত করা বা বাধা দেওয়া।",
                },
                {
                  title: "(২)",
                  text: "সংক্ষুব্ধ ব্যক্তিকে নিত্য প্রয়োজনীয় জিনিসপত্র ও দৈনন্দিন চাহিদা পূরণের সামগ্রী প্রদান না করা।",
                },
                {
                  title: "(৩)",
                  text: "বিবাহের সময় প্রাপ্ত উপহার, স্ত্রীধন বা দান হিসেবে প্রাপ্ত সম্পদ থেকে বঞ্চিত করা বা বৈধ অধিকার আদায়ে বাধা প্রদান।",
                },
                {
                  title: "(৪)",
                  text: "সংক্ষুব্ধ ব্যক্তির মালিকানাধীন স্থাবর বা অস্থাবর সম্পত্তি তার অনুমতি ছাড়া হস্তান্তর করা অথবা তার বৈধ অধিকার প্রয়োগে বাধা দেওয়া।",
                },
                {
                  title: "(৫)",
                  text: "পারিবারিক সম্পর্কের কারণে কোনো সম্পদ বা সুবিধা ব্যবহারের অধিকার থাকা সত্ত্বেও তা থেকে বঞ্চিত করা বা ভোগ-দখলে বাধা প্রদান।",
                },
              ];

              const examples = [
                "যৌতুক দাবি করা",
                "গয়না বা ব্যক্তিগত সম্পত্তি নিয়ে নেওয়া",
                "বেতন বা আয় কেড়ে নেওয়া",
                "স্বামী কর্তৃক স্ত্রীকে ভরণপোষণ না দেওয়া",
                "অর্থনৈতিক/উপার্জনমূলক কাজে অংশ নিতে বাধা দেওয়া",
              ];

              const renderClauseCards = () =>
                clauseItems
                  .map(
                    (item, idx) => `
                      <article class="policy-journey-card" data-aos="fade-up" data-aos-delay="${80 + idx * 30}">
                        <div class="policy-journey-seal bg-gradient-teal">
                          <span class="policy-journey-step">${item.title}</span>
                        </div>
                        <div class="policy-journey-body">
                          <p class="mb-0">${item.text}</p>
                        </div>
                      </article>
                    `
                  )
                  .join("");

              const renderExamples = () =>
                examples
                  .map(
                    (item, idx) => `
                      <li data-aos="fade-left" data-aos-delay="${80 + idx * 20}">
                        <i class="fa-solid fa-circle-check"></i>
                        <span>${item}</span>
                      </li>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "Financial harm provisions",
                    "“আর্থিক ক্ষতি” অর্থে নিম্নবর্ণিত বিষয়সমূহও অন্তর্ভুক্ত হবে, যথা—"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <p class="mb-3">${intro}</p>
                    <div class="alert alert-modern" role="alert">
                      <i class="fa-solid fa-scale-balanced me-2"></i>
                      <span>${yhLang(
                        "আইন আর্থিক নির্যাতনের শিকার ব্যক্তিকে সম্পদ পুনরুদ্ধার ও নিরাপত্তা দাবি করার সুযোগ দেয়।",
                        "আইন আর্থিক নির্যাতনের শিকার ব্যক্তিকে সম্পদ পুনরুদ্ধার ও নিরাপত্তা দাবি করার সুযোগ দেয়।"
                      )}</span>
                    </div>
                  </section>

                  <section class="modern-card glass-card menstrual-info-card mt-3" data-aos="fade-up" data-aos-delay="80">
                    <h3 class="gradient-text h5 mb-3">${yhLang(
                      "আইন অনুযায়ী অন্তর্ভুক্ত বিষয়সমূহ",
                      "আইন অনুযায়ী অন্তর্ভুক্ত বিষয়সমূহ"
                    )}</h3>
                    <div class="policy-journey-grid" role="list">
                      ${renderClauseCards()}
                    </div>
                  </section>

                  <div class="menstrual-section-divider" aria-hidden="true"></div>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="100">
                    <div class="row g-4 align-items-center">
                      <div class="col-lg-7">
                        <h4 class="h6 text-uppercase text-muted mb-3">${yhLang(
                          "যেমন —",
                          "যেমন —"
                        )}</h4>
                        <ul class="list-unstyled puberty-list mb-0">
                          ${renderExamples()}
                        </ul>
                      </div>
                      <div class="col-lg-5" data-aos="fade-left" data-aos-delay="120">
                        <article class="glass-card p-4 shadow-sm h-100">
                          <div class="d-flex align-items-center gap-3 mb-3">
                            <div class="icon-circle bg-gradient-emerald text-white">
                              <i class="fa-solid fa-house-chimney"></i>
                            </div>
                            <div>
                              <p class="text-uppercase text-muted small mb-1">${yhLang(
                                "অধিকার",
                                "অধিকার"
                              )}</p>
                              <h3 class="h6 gradient-text mb-0">${yhLang(
                                "ভোগ-দখল ও ভরণপোষণ",
                                "ভোগ-দখল ও ভরণপোষণ"
                              )}</h3>
                            </div>
                          </div>
                          <p class="mb-0">${yhLang(
                            "সম্পদ ব্যবহার, আয় উপভোগ ও ভরণপোষণ গ্রহণ করা প্রতিটি ব্যক্তির মৌলিক অধিকার এবং সীমিত করার যে কোনো চেষ্টা আইনি অপরাধ।",
                            "সম্পদ ব্যবহার, আয় উপভোগ ও ভরণপোষণ গ্রহণ করা প্রতিটি ব্যক্তির মৌলিক অধিকার এবং সীমিত করার যে কোনো চেষ্টা আইনি অপরাধ।"
                          )}</p>
                        </article>
                      </div>
                    </div>
                  </section>
                </div>
              `;
            })(),
          },
          {
            id: "ch13-lesson-9",
            title: yhLang(
              "Actions to End Gender Discrimination",
              "জেন্ডার বৈষম্য দূর করার জন্য করণীয়"
            ),
            icon: "fa-scale-balanced",
            gradientClass: "bg-gradient-tangerine",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q13i",
                  question: yhLang(
                    "What is a key step toward eliminating gender discrimination?",
                    "জেন্ডার বৈষম্য দূর করতে কোন পদক্ষেপটি গুরুত্বপূর্ণ?"
                  ),
                  options: [
                    yhLang("নারী-পুরুষের সমান অধিকার ও সিদ্ধান্তে অংশগ্রহণ নিশ্চিত করা", "নারী-পুরুষের সমান অধিকার ও সিদ্ধান্তে অংশগ্রহণ নিশ্চিত করা"),
                    yhLang("নারীদের শিক্ষা সীমিত রাখা", "নারীদের শিক্ষা সীমিত রাখা"),
                    yhLang("মেয়েদের মতামত উপেক্ষা করা", "মেয়েদের মতামত উপেক্ষা করা"),
                    yhLang("নারীদের কর্মসংস্থান নিরুৎসাহিত করা", "নারীদের কর্মসংস্থান নিরুৎসাহিত করা"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const intro =
                "জেন্ডার বৈষম্য দূর করতে পরিবার, সমাজ ও রাষ্ট্রকে একসাথে কাজ করতে হয় যাতে নারী-পুরুষ উভয়েই সম্মান, সুযোগ ও নিরাপত্তা পায়।";

              const actionList = [
                "জেন্ডার বৈষম্য রোধে সমাজের সকল স্তরে সচেতনতার সৃষ্টি করা।",
                "সম মর্যাদা ও স্বাধীনতা নিয়ে নারী-পুরুষ মানুষ হিসেবে বেড়ে উঠবে তা নিশ্চিত করা।",
                "লিঙ্গভিত্তিক আলাদা ভূমিকার বদলে মানুষ হিসেবে একীভূত ভূমিকা পালনের সুযোগ তৈরি করা।",
                "নারী শিক্ষা, কর্মসংস্থান, স্বাস্থ্যসেবা ও নির্যাতন প্রতিরোধসহ সব মানবাধিকার নিশ্চিত করা।",
                "দেশের উন্নয়নে দক্ষ নারীশক্তি গড়ে তোলা এবং তাদের চাকরি ও ব্যবসায় সম্পৃক্ত করা।",
                "দক্ষতার ভিত্তিতে সব কর্মকাণ্ডে নারী-পুরুষের সমান অংশগ্রহণ নিশ্চিত করা।",
                "পরিবার ও সমাজে সিদ্ধান্ত গ্রহণে নারীর মতামতকে গুরুত্ব দেওয়া।",
                "নারীর অধিকার রক্ষায় প্রয়োজনীয় সকল আইনি সহায়তা প্রদান নিশ্চিত করা।",
                "সমতা বজায় রেখে নারীর ক্ষমতায়ন নিশ্চিত করা ও সুরক্ষার জন্য প্রচলিত আইন প্রয়োগ করা।",
                "জেন্ডার বৈষম্য টিকিয়ে রাখা প্রথা বা রীতিনীতি শনাক্ত করে সম্মিলিতভাবে প্রতিরোধ করা।",
              ];

              const focusPoints = [
                {
                  title: "সমতা ও স্বাধীনতা",
                  text: "নারী-পুরুষ উভয়েই মানুষ হিসেবে মর্যাদা ও স্বাধীনতা ভোগ করবে—এটাই পরিবর্তনের কেন্দ্রবিন্দু।",
                  icon: "fa-people-group",
                },
                {
                  title: "ক্ষমতায়ন",
                  text: "শিক্ষা, কর্মসংস্থান ও আইনি সহায়তায় নারীদের ক্ষমতায়ন দ্রুত জেন্ডার বৈষম্য কমায়।",
                  icon: "fa-bolt",
                },
              ];

              const renderList = () =>
                actionList
                  .map(
                    (item, idx) => `
                      <li data-aos="fade-left" data-aos-delay="${80 + idx * 20}">
                        <i class="fa-solid fa-circle-check"></i>
                        <span>${item}</span>
                      </li>
                    `
                  )
                  .join("");

              const renderFocusCards = () =>
                focusPoints
                  .map(
                    (item, idx) => `
                      <article class="modern-card glass-card" data-aos="fade-up" data-aos-delay="${60 + idx * 20}">
                        <div class="d-flex align-items-center gap-3 mb-2">
                          <div class="icon-circle bg-gradient-rose text-white">
                            <i class="fa-solid ${item.icon}"></i>
                          </div>
                          <h3 class="h6 gradient-text mb-0">${item.title}</h3>
                        </div>
                        <p class="mb-0">${item.text}</p>
                      </article>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "Ending gender discrimination",
                    "জেন্ডার বৈষম্য দূর করার জন্য করণীয়"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <p class="mb-3">${intro}</p>
                    <div class="row g-3">
                      ${renderFocusCards()}
                    </div>
                  </section>

                  <div class="menstrual-section-divider" aria-hidden="true"></div>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="80">
                    <h3 class="h6 text-uppercase text-muted mb-3">${yhLang(
                      "মূল করণীয়",
                      "মূল করণীয়"
                    )}</h3>
                    <ul class="list-unstyled puberty-list mb-0">
                      ${renderList()}
                    </ul>
                  </section>
                </div>
              `;
            })(),
          },
          {
            id: "ch13-lesson-10",
            title: yhLang(
              "Violence Against Adolescents",
              "কিশোর-কিশোরীদের প্রতি সহিংসতা"
            ),
            icon: "fa-children",
            gradientClass: "bg-gradient-crimson",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q13j",
                  question: yhLang(
                    "Which action helps protect adolescents from violence?",
                    "কিশোর-কিশোরীদের সহিংসতা থেকে রক্ষা করতে কোন পদক্ষেপ সহায়ক?"
                  ),
                  options: [
                    yhLang("নিরাপদ পরিবেশ ও পরামর্শ প্রদান", "নিরাপদ পরিবেশ ও পরামর্শ প্রদান"),
                    yhLang("সহিংস ঘটনার কথা গোপন রাখা", "সহিংস ঘটনার কথা গোপন রাখা"),
                    yhLang("ঝুঁকিপূর্ণ স্থানে একা পাঠানো", "ঝুঁকিপূর্ণ স্থানে একা পাঠানো"),
                    yhLang("সহিংস আচরণকে স্বাভাবিক ধরা", "সহিংস আচরণকে স্বাভাবিক ধরা"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const intro =
                "পারিবারিক, শিক্ষা প্রতিষ্ঠান, কর্মক্ষেত্র বা অনলাইন—প্রতিটি পরিসরেই কিশোর-কিশোরীরা সহিংসতার ঝুঁকির মুখে থাকে। সচেতনতা, প্রতিরোধমূলক পদক্ষেপ ও সহায়তা ব্যবস্থাই নিরাপত্তার মূলভিত্তি।";

              const violenceTypes = [
                {
                  title: "শারীরিক ও মানসিক সহিংসতা",
                  text: "মারধর, শারীরিক শাস্তি, গালমন্দ, হেয় প্রতিপন্ন করা বা সামাজিকভাবে একঘরে করে দেওয়া।",
                  icon: "fa-shield-halved",
                },
                {
                  title: "অর্থনৈতিক ও অনলাইন সহিংসতা",
                  text: "জোরপূর্বক শ্রমে বাধ্য করা, মোবাইল/ইন্টারনেটে ব্ল্যাকমেইল, সাইবার বুলিং ও ব্যক্তিগত তথ্য ফাঁস করা।",
                  icon: "fa-wifi",
                },
                {
                  title: "যৌন ও লিঙ্গভিত্তিক সহিংসতা",
                  text: "অবাঞ্ছিত স্পর্শ, হুমকি, বাল্যবিবাহ, যৌন হয়রানি ও ক্ষমতার অপব্যবহার।",
                  icon: "fa-venus-mars",
                },
              ];

              const protectiveActions = [
                "শিশু ও কিশোরবান্ধব নিরাপদ স্থান, স্কুল ও কমিউনিটি সেন্টার গড়ে তোলা।",
                "বিশ্বস্ত প্রাপ্তবয়স্কের সাথে অবাধ যোগাযোগ নিশ্চিত করা ও অভিযোগ গ্রহণকারী হটলাইন প্রচার করা।",
                "অনলাইন নিরাপত্তা, আত্মরক্ষা ও সহপাঠী সমর্থনমুলক কর্মশালা আয়োজন করা।",
                "শারীরিক ও মানসিক স্বাস্থ্যসেবা, কাউন্সেলিং ও আইনি সহায়তার সহজ প্রাপ্যতা নিশ্চিত করা।",
                "সহিংসতার ঘটনা দেখলে নীরব না থেকে কর্তৃপক্ষকে জানানো ও প্রমাণ সংরক্ষণ করা।",
              ];

              const renderViolenceCards = () =>
                violenceTypes
                  .map(
                    (item, idx) => `
                      <article class="policy-journey-card" data-aos="fade-up" data-aos-delay="${70 + idx * 30}">
                        <div class="policy-journey-seal bg-gradient-rose">
                          <i class="fa-solid ${item.icon}"></i>
                        </div>
                        <div class="policy-journey-body">
                          <h3 class="h6 gradient-text mb-1">${item.title}</h3>
                          <p class="mb-0">${item.text}</p>
                        </div>
                      </article>
                    `
                  )
                  .join("");

              const renderProtectiveList = () =>
                protectiveActions
                  .map(
                    (item, idx) => `
                      <li data-aos="fade-left" data-aos-delay="${80 + idx * 20}">
                        <i class="fa-solid fa-circle-check"></i>
                        <span>${item}</span>
                      </li>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "Violence against adolescents",
                    "কিশোর-কিশোরীদের প্রতি সহিংসতা"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <div class="row g-4 align-items-center">
                      <div class="col-lg-6">
                        <p class="mb-3">${intro}</p>
                        <div class="policy-journey-grid" role="list">
                          ${renderViolenceCards()}
                        </div>
                      </div>
                      <div class="col-lg-6" data-aos="fade-left" data-aos-delay="80">
                        <figure class="image-card mb-0" style="max-height:360px;">
                          <img src="img/modu13/sohongsotas.jpg" alt="${yhLang(
                            "Adolescent violence prevention illustration",
                            "কিশোর-কিশোরীদের প্রতি সহিংসতা"
                          )}" class="img-fluid rounded-4 shadow-sm" />
                        </figure>
                      </div>
                    </div>
                  </section>

                  <div class="menstrual-section-divider" aria-hidden="true"></div>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="100">
                    <h3 class="h6 text-uppercase text-muted mb-3">${yhLang(
                      "সহিংসতা প্রতিরোধে করণীয়",
                      "সহিংসতা প্রতিরোধে করণীয়"
                    )}</h3>
                    <ul class="list-unstyled puberty-list mb-0">
                      ${renderProtectiveList()}
                    </ul>
                  </section>

                </div>
              `;
            })(),
          },
          {
            id: "ch13-lesson-11",
            title: yhLang(
              "Understanding Violence and Abuse",
              "সহিংসতা বা নির্যাতন"
            ),
            icon: "fa-hand-holding-heart",
            gradientClass: "bg-gradient-rose",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q13k",
                  question: yhLang(
                    "Which initiative directly helps prevent violence?",
                    "সহিংসতা প্রতিরোধে কোন পদক্ষেপ কার্যকর?"
                  ),
                  options: [
                    yhLang("পরিবারে নিরাপদ ও বন্ধুত্বপূর্ণ সম্পর্ক তৈরি", "পরিবারে নিরাপদ ও বন্ধুত্বপূর্ণ সম্পর্ক তৈরি"),
                    yhLang("সহিংস ঘটনার প্রমাণ লুকিয়ে রাখা", "সহিংস ঘটনার প্রমাণ লুকিয়ে রাখা"),
                    yhLang("মাদকদ্রব্যের সহজলভ্যতা বৃদ্ধি", "মাদকদ্রব্যের সহজলভ্যতা বৃদ্ধি"),
                    yhLang("বৈষম্যমূলক রীতি বজায় রাখা", "বৈষম্যমূলক রীতি বজায় রাখা"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const definitionText =
                "‘সহিংসতা বা নির্যাতন হলো কারো বিরুদ্ধে ইচ্ছাকৃতভাবে দেহের শক্তি বা বল প্রয়োগ করা, যা হুমকি বা সত্যিকারের হতে পারে। এর ফলে শারীরিক ক্ষতি, মৃত্যু, মানসিক আঘাত, বিকাশে বাধা বা সুযোগ থেকে বঞ্চিত হওয়ার মতো পরিণতি ঘটে।’";

              const violenceFact =
                "বিশ্বে সহিংসতার কারণে প্রতি ১০ মিনিটে একজন কিশোরীর মৃত্যু হয়—এটি সমস্যাটির ভয়াবহতা তুলে ধরে।";

              const violenceForms = [
                "দৈহিক সহিংসতা",
                "যৌন সহিংসতা",
                "মানসিক সহিংসতা",
                "অর্থনৈতিক সহিংসতা",
                "সাইবার ক্রাইম",
                "বুলিং",
                "বাল্যবিবাহ",
                "পাচার",
                "যৌন হয়রানি/ইভটিজিং",
                "এসিড নিক্ষেপ",
                "পর্নোগ্রাফি ও অশ্লীল প্রকাশনা",
                "পতিতাবৃত্তি",
                "শিশুশ্রম",
              ];

              const causeCards = [
                {
                  title: "ব্যক্তিগত কারণ",
                  body: "বংশগত বা শারীরিক অক্ষমতা, নৈতিকতার অবক্ষয়, মাদকাসক্তি, ব্যক্তিত্বের বৈকল্য, মানসিক অস্থিরতা এবং বয়স-শিক্ষা-আয়ের মতো ব্যক্তিগত বৈশিষ্ট্য সহিংসতার ঝুঁকি বাড়ায়।",
                },
                {
                  title: "পারস্পরিক কারণ",
                  body: "পরিবার বা বন্ধুদের দ্বন্দ্ব, বিবাহিত জীবনে অবনতি, বিবাহবহির্ভূত সম্পর্ক, পারস্পরিক শ্রদ্ধাহীনতা সম্পর্ককে সহিংস করে তোলে।",
                },
                {
                  title: "পারিপার্শ্বিক কারণ",
                  body: "শিক্ষা প্রতিষ্ঠান, অফিস বা রাস্তায় সমবয়সীদের চাপ, রাজনৈতিক প্রভাব, সুস্থ বিনোদনের অভাব এবং সামাজিক নিরাপত্তা বেষ্টনীর দুর্বলতা নির্যাতনে ভূমিকা রাখে।",
                },
                {
                  title: "সামাজিক কারণ",
                  body: "নিম্ন আর্থ-সামাজিক অবস্থা, বেকারত্ব, হতাশা, পরনির্ভরশীলতা, হীনমন্যতা এবং অপসংস্কৃতি থেকে প্রাপ্ত আচরণও সহিংসতাকে প্রলম্বিত করে।",
                },
              ];

              const impactCategories = [
                {
                  title: "শারীরিক প্রভাব",
                  items: ["মাথা ব্যথা", "ক্ষুধামন্দা", "বমিভাব", "অনিদ্রা"],
                },
                {
                  title: "মানসিক প্রভাব",
                  items: [
                    "দুশ্চিন্তা ও মনমরা ভাব",
                    "বিষণ্নতা, বিরক্তি ও রাগ",
                    "ভয়, নিরাপত্তাহীনতা ও ভবিষ্যৎ অনিশ্চয়তা",
                    "অপমানবোধ, অপরাধবোধ ও আত্মহত্যার প্রবণতা",
                  ],
                },
                {
                  title: "আচরণগত প্রভাব",
                  items: ["কান্নাকাটি", "মনোযোগের অভাব", "ভিড় বা গণপরিবহন এড়ানো"],
                },
                {
                  title: "সামাজিক প্রভাব",
                  items: [
                    "সমাজে হেয় হওয়া ও তিরস্কার",
                    "সামাজিক কর্মকাণ্ড থেকে সরে আসা",
                    "অল্প বয়সে বিয়ের চাপ",
                  ],
                },
              ];

              const preventionSteps = [
                "পারিবারিক ও বন্ধুত্বপূর্ণ সম্পর্ক জোরদার করা।",
                "সন্তান ও অভিভাবকের মধ্যে নিরাপদ, বন্ধুত্বপূর্ণ যোগাযোগ তৈরি।",
                "মাদকের অপব্যবহার ও সহজলভ্যতা হ্রাস।",
                "জেন্ডার বৈষম্য দূরীকরণে সচেতনতামূলক কর্মসূচি চালু করা।",
                "নারী ও শিশুর প্রতি সহিংসতা দমন আইন সম্পর্কে জনসচেতনতা বৃদ্ধি।",
                "বেকারত্ব কমাতে প্রশিক্ষণ ও সহজ শর্তে ঋণ প্রদানের সুযোগ তৈরি।",
              ];

              const programSections = [
                {
                  title: "মহিলা ও শিশু বিষয়ক মন্ত্রণালয়ের কর্মসূচি",
                  items: [
                    "চৌদ্দটি মেডিকেল কলেজে ওয়ান-স্টপ ক্রাইসিস সেন্টার—চিকিৎসা, কাউন্সেলিং, পুলিশি ও আইনি সহায়তা, পুনর্বাসন।",
                    "সাতচল্লিশ জেলা ও বিশটি উপজেলায় ওয়ান-স্টপ ক্রাইসিস সেল।",
                    "ন্যাশনাল হেল্পলাইন সেন্টার (টোলফ্রি ১০৯) ও ‘জয়’ অ্যাপ।",
                    "মানসিক সংকটে বিনামূল্যে মনোসামাজিক কাউন্সেলিং সেবা।",
                  ],
                },
                {
                  title: "সমাজকল্যাণ মন্ত্রণালয়ের কর্মসূচি",
                  items: [
                    "সামাজিক নিরাপত্তা বেষ্টনি কার্যক্রম।",
                    "চাইল্ড হেল্পলাইন ১০৯৮ (টোল ফ্রি)।",
                  ],
                },
              ];

              const renderSimpleList = (items, baseDelay = 80) =>
                items
                  .map(
                    (item, idx) => `
                      <li data-aos="fade-left" data-aos-delay="${baseDelay + idx * 20}">
                        <i class="fa-solid fa-circle-check"></i>
                        <span>${item}</span>
                      </li>
                    `
                  )
                  .join("");

              const renderCauseCards = () =>
                causeCards
                  .map(
                    (item, idx) => `
                      <article class="modern-card glass-card" data-aos="fade-up" data-aos-delay="${70 + idx * 20}">
                        <h3 class="h6 gradient-text mb-2">${item.title}</h3>
                        <p class="mb-0">${item.body}</p>
                      </article>
                    `
                  )
                  .join("");

              const renderImpactCards = () =>
                impactCategories
                  .map(
                    (category, idx) => `
                      <article class="glass-card p-4 h-100" data-aos="fade-up" data-aos-delay="${80 + idx * 20}">
                        <div class="d-flex align-items-center gap-3 mb-3">
                          <div class="icon-circle bg-gradient-purple text-white">
                            <i class="fa-solid fa-heart-pulse"></i>
                          </div>
                          <h3 class="h6 gradient-text mb-0">${category.title}</h3>
                        </div>
                        <ul class="list-unstyled puberty-list mb-0">
                          ${renderSimpleList(category.items, 90)}
                        </ul>
                      </article>
                    `
                  )
                  .join("");

              const renderPrograms = () =>
                programSections
                  .map(
                    (section, idx) => `
                      <article class="policy-journey-card" data-aos="fade-up" data-aos-delay="${90 + idx * 30}">
                        <div class="policy-journey-seal bg-gradient-emerald">
                          <i class="fa-solid fa-circle-info"></i>
                        </div>
                        <div class="policy-journey-body">
                          <h3 class="h6 gradient-text mb-2">${section.title}</h3>
                          <ul class="list-unstyled puberty-list mb-0">
                            ${renderSimpleList(section.items, 100)}
                          </ul>
                        </div>
                      </article>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "Violence and abuse overview",
                    "সহিংসতা বা নির্যাতন"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <p class="mb-3">${definitionText}</p>
                    <div class="alert alert-modern" role="alert">
                      <i class="fa-solid fa-triangle-exclamation me-2"></i>
                      <span>${violenceFact}</span>
                    </div>
                  </section>

                  <section class="modern-card glass-card menstrual-info-card mt-3" data-aos="fade-up" data-aos-delay="80">
                    <h3 class="gradient-text h5 mb-3">${yhLang(
                      "কিশোর-কিশোরীদের প্রতি সহিংসতার বিভিন্ন রূপ",
                      "কিশোর-কিশোরীদের প্রতি সহিংসতার বিভিন্ন রূপ"
                    )}</h3>
                    <ul class="list-unstyled puberty-list mb-0">
                      ${renderSimpleList(violenceForms)}
                    </ul>
                  </section>

                  <div class="menstrual-section-divider" aria-hidden="true"></div>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="100">
                    <h3 class="h6 text-uppercase text-muted mb-3">${yhLang(
                      "কৈশোরকালীন সহিংসতার কারণ",
                      "কৈশোরকালীন সহিংসতার কারণ"
                    )}</h3>
                    <div class="row g-3">
                      ${renderCauseCards()}
                    </div>
                  </section>

                  <section class="modern-card glass-card menstrual-info-card mt-3" data-aos="fade-up" data-aos-delay="120">
                    <h3 class="gradient-text h5 mb-3">${yhLang(
                      "সহিংসতার প্রভাব",
                      "সহিংসতার প্রভাব"
                    )}</h3>
                    <div class="row g-4">
                      ${renderImpactCards()}
                    </div>
                  </section>

                  <div class="menstrual-section-divider" aria-hidden="true"></div>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="140">
                    <h3 class="h6 text-uppercase text-muted mb-3">${yhLang(
                      "সহিংসতা প্রতিকার ও প্রতিরোধের পন্থা",
                      "সহিংসতা প্রতিকার ও প্রতিরোধের পন্থা"
                    )}</h3>
                    <ul class="list-unstyled puberty-list mb-0">
                      ${renderSimpleList(preventionSteps)}
                    </ul>
                  </section>

                  <section class="modern-card glass-card menstrual-info-card mt-3" data-aos="fade-up" data-aos-delay="160">
                    <h3 class="gradient-text h5 mb-3">${yhLang(
                      "সহায়তা ও সরকারি উদ্যোগ",
                      "সহায়তা ও সরকারি উদ্যোগ"
                    )}</h3>
                    <div class="policy-journey-grid" role="list">
                      ${renderPrograms()}
                    </div>
                  </section>
                </div>
              `;
            })(),
          },
        ],
      },
      {
        id: "ch-14",
        title: yhLang(
          "Module-14: Sex, Gender and Gender Discrimination",
          "মডিউল-১৪: কৈশোরকালীন মনোসামাজিক পরিবর্তন ও জটিলতাসমূহ"
        ),
        lessons: [
          {
            id: "ch14-lesson-1",
            title: yhLang(
              "Adolescent Psychosocial Changes",
              "কৈশোরকালীন মনোসামাজিক পরিবর্তন"
            ),
            icon: "fa-people-roof",
            gradientClass: "bg-gradient-indigo",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q14a",
                  question: yhLang(
                    "Which factor strongly influences psychosocial change during adolescence?",
                    "কৈশোরকালীন মনোসামাজিক পরিবর্তনে কোন উপাদানটি বড় ভূমিকা রাখে?"
                  ),
                  options: [
                    yhLang("পরিবার, বন্ধু ও সামাজিক পরিবেশ", "পরিবার, বন্ধু ও সামাজিক পরিবেশ"),
                    yhLang("একই রকম অভিজ্ঞতা সবার থাকে", "একই রকম অভিজ্ঞতা সবার থাকে"),
                    yhLang("শুধু পড়াশোনা", "শুধু পড়াশোনা"),
                    yhLang("শুধুমাত্র শারীরিক বৃদ্ধি", "শুধুমাত্র শারীরিক বৃদ্ধি"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const introPrimary =
                "কৈশোরকালীন সময়ে কিশোর-কিশোরীদের মাঝে বিভিন্ন পরিবর্তন লক্ষ্য করা যায় যা পরিবার, বন্ধু ও সমবয়সীদের সাথে যোগাযোগের ধরনেও প্রভাব ফেলে।";

              const introSecondary =
                "মনোসামাজিক বিকাশকে প্রভাবিত করে জিনগত বৈশিষ্ট্য, মস্তিষ্কের বিকাশ, অভিজ্ঞতা এবং চারপাশের পরিবেশ। এর মাধ্যমে আত্মনির্ভরশীলতা ও প্রাপ্তবয়স্ক বৈশিষ্ট্য ধীরে ধীরে বিকশিত হয়।";

              const socialChanges = [
                yhLang("Exploring personal identity", "ব্যক্তিগত পরিচয় অনুসন্ধান করা"),
                yhLang("Developing greater independence", "অধিক স্বাধীনচেতা মনোভাব"),
                yhLang("Seeking more responsibility", "অধিক দায়িত্ব অন্বেষণ করা"),
                yhLang("Engaging in risk-taking behavior", "ঝুঁকি-গ্রহণমূলক আচরণ"),
                yhLang("Navigating relationships", "সম্পর্কজনিত বিষয়"),
              ];

              const emotionalChanges = [
                yhLang("Periods of low self-esteem", "নিম্ন আত্মসম্মানবোধ"),
                yhLang(
                  "Emotional challenges like anger, anxiety, stress, depression",
                  "আবেগীয় সমস্যা (অত্যধিক রাগ, নিরাপত্তাহীনতা, উদ্বেগ, চাপ, হতাশা, বিষণ্নতা)"
                ),
                yhLang("Withdrawal or isolation", "প্রত্যাহারমূলক মনোভাব"),
                yhLang("Rebellious or defiant actions", "বিদ্রোহী আচরণ"),
              ];

              const psychosocialComplexities = [
                yhLang("Peer pressure", "সহপাঠীর প্রভাব"),
                yhLang("Interference in studies", "পড়াশোনায় ব্যাঘাত"),
                yhLang("Communication gaps", "যোগাযোগের অভাব"),
                yhLang("Difficulty achieving institutional success", "প্রাতিষ্ঠানিক সফলতা অর্জনে জটিলতা"),
                yhLang("Substance use and addiction", "মাদক গ্রহণ ও অন্যান্য আসক্তি"),
                yhLang("Struggling with decision-making", "সিদ্ধান্ত গ্রহণে জটিলতা"),
              ];

              const renderList = (items, baseDelay = 80) =>
                items
                  .map(
                    (item, idx) => `
                      <li data-aos="fade-left" data-aos-delay="${baseDelay + idx * 20}">
                        <i class="fa-solid fa-circle-check"></i>
                        <span>${item}</span>
                      </li>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "Psychosocial transitions in adolescence",
                    "কৈশোরকালীন মনোসামাজিক পরিবর্তন"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <p class="mb-3">${introPrimary}</p>
                    <p class="mb-0">${introSecondary}</p>
                  </section>

                  <section class="modern-card glass-card menstrual-info-card mt-3" data-aos="fade-up" data-aos-delay="80">
                    <div class="row g-4">
                      <div class="col-lg-6">
                        <article class="glass-card p-4 h-100 shadow-sm">
                          <div class="d-flex align-items-center gap-3 mb-3">
                            <div class="icon-circle bg-gradient-emerald text-white">
                              <i class="fa-solid fa-people-group"></i>
                            </div>
                            <div>
                              <p class="text-uppercase text-muted small mb-1">${yhLang(
                                "সামাজিক পরিবর্তন",
                                "সামাজিক পরিবর্তন"
                              )}</p>
                              <h3 class="h6 gradient-text mb-0">${yhLang(
                                "Social adjustments",
                                "সামাজিক পরিবর্তনসমূহ"
                              )}</h3>
                            </div>
                          </div>
                          <ul class="list-unstyled puberty-list mb-0">
                            ${renderList(socialChanges)}
                          </ul>
                        </article>
                      </div>
                      <div class="col-lg-6">
                        <article class="glass-card p-4 h-100 shadow-sm">
                          <div class="d-flex align-items-center gap-3 mb-3">
                            <div class="icon-circle bg-gradient-rose text-white">
                              <i class="fa-solid fa-heart"></i>
                            </div>
                            <div>
                              <p class="text-uppercase text-muted small mb-1">${yhLang(
                                "আবেগজনিত পরিবর্তন",
                                "আবেগজনিত পরিবর্তন"
                              )}</p>
                              <h3 class="h6 gradient-text mb-0">${yhLang(
                                "Emotional shifts",
                                "আবেগজনিত/আবেগীয় পরিবর্তনসমূহ"
                              )}</h3>
                            </div>
                          </div>
                          <ul class="list-unstyled puberty-list mb-0">
                            ${renderList(emotionalChanges, 90)}
                          </ul>
                        </article>
                      </div>
                    </div>
                  </section>

                  <div class="menstrual-section-divider" aria-hidden="true"></div>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="100">
                    <h3 class="h6 text-uppercase text-muted mb-3">${yhLang(
                      "কৈশোরকালীন মনোসামাজিক জটিলতাসমূহ",
                      "কৈশোরকালীন মনোসামাজিক জটিলতাসমূহ"
                    )}</h3>
                    <ul class="list-unstyled puberty-list mb-0">
                      ${renderList(psychosocialComplexities)}
                    </ul>
                  </section>
                </div>
              `;
            })(),
          },
          {
            id: "ch14-lesson-2",
            title: yhLang(
              "Understanding Emotions",
              "আবেগ (Emotion)"
            ),
            icon: "fa-face-smile",
            gradientClass: "bg-gradient-rose",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q14b",
                  question: yhLang(
                    "Why is emotion management important in daily life?",
                    "দৈনন্দিন জীবনে আবেগ ব্যবস্থাপনা কেন জরুরি?"
                  ),
                  options: [
                    yhLang("এটা আত্মনিয়ন্ত্রণ ও সঠিক প্রতিক্রিয়ায় সহায়তা করে", "এটা আত্মনিয়ন্ত্রণ ও সঠিক প্রতিক্রিয়ায় সহায়তা করে"),
                    yhLang("কারণ আবেগ নিয়ে ভাবার দরকার নেই", "কারণ আবেগ নিয়ে ভাবার দরকার নেই"),
                    yhLang("এটা শুধুই শারীরিক শক্তি বাড়ায়", "এটা শুধুই শারীরিক শক্তি বাড়ায়"),
                    yhLang("সব আবেগ একই রকম", "সব আবেগ একই রকম"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const emotionDefinition =
                "আবেগ হলো এক ধরনের মানসিক অবস্থা যা চিন্তন, অনুভূতি, আচরণগত প্রতিক্রিয়া এবং আনন্দ-বেদনার মাত্রার সাথে সম্পর্কিত। এর ফলে আমাদের শারীরিক, আচরণগত ও চিন্তার পরিবর্তন ঘটে।";

              const emotionContext =
                "আবেগ হলো অভ্যন্তরীণ এবং বাহ্যিক ঘটনার প্রতি শরীর ও আচরণের প্রতিক্রিয়া (রহমান, জ. ১৯৯৮)। ব্যক্তি থেকে ব্যক্তিতে আবেগের বহিঃপ্রকাশ ভিন্ন হয়। আবেগ ব্যবস্থাপনার অভাবে নানা পরিস্থিতিতে গোলযোগ দেখা দিতে পারে, তবে যথাযথ কৌশল শিখলে তা নিয়ন্ত্রণ করা সম্ভব।";

              const managementIntro =
                "দৈনন্দিন জীবনের নেতিবাচক অভিজ্ঞতা আমাদের আবেগকে সহজেই বিপর্যস্ত করে, ফলে কী করতে হবে তা নিয়ে অনিশ্চয়তা তৈরি হয়।";

              const managementDetails =
                "সুশৃঙ্খল আবেগ ব্যবস্থাপনা ব্যক্তিকে আত্মনিয়ন্ত্রণে সহায়তা করে, নেতিবাচক পরিস্থিতিতে সঠিক প্রতিক্রিয়া বেছে নিতে শেখায় এবং ব্যক্তিগত গুণাবলি উপলব্ধি করে ফলপ্রসূভাবে কাজ করার শক্তি দেয়। এতে আত্মবিশ্বাস, আত্মনিয়ন্ত্রণ ক্ষমতা ও আত্মসম্মানবোধ বৃদ্ধি পায়।";

              const basicEmotions = [
                yhLang("Joy", "সুখ"),
                yhLang("Sadness", "দুঃখ"),
                yhLang("Anger", "রাগ"),
                yhLang("Fear", "ভয়"),
              ];

              const managementBenefits = [
                "আত্মনিয়ন্ত্রণে সহায়তা করে এবং নেতিবাচক পরিস্থিতি সামলানো সহজ হয়।",
                "পরিস্থিতি অনুযায়ী কীভাবে প্রতিক্রিয়া দিতে হবে তা বুঝতে সাহায্য করে।",
                "ব্যক্তিগত গুণাবলি উপলব্ধি করে ফলপ্রসূভাবে কাজ করতে উৎসাহিত করে।",
                "আত্মবিশ্বাস, আত্মনিয়ন্ত্রণ ক্ষমতা ও আত্মসম্মানবোধ বাড়ায়।",
              ];

              const renderList = (items, baseDelay = 80) =>
                items
                  .map(
                    (item, idx) => `
                      <li data-aos="fade-left" data-aos-delay="${baseDelay + idx * 20}">
                        <i class="fa-solid fa-circle-check"></i>
                        <span>${item}</span>
                      </li>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "Emotion essentials",
                    "আবেগ (Emotion)"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <p class="mb-3">${emotionDefinition}</p>
                    <p class="mb-0">${emotionContext}</p>
                  </section>

                  <section class="modern-card glass-card menstrual-info-card mt-3" data-aos="fade-up" data-aos-delay="80">
                    <div class="row g-4 align-items-center">
                      <div class="col-lg-6">
                        <h3 class="h6 text-uppercase text-muted mb-3">${yhLang(
                          "মৌলিক আবেগ",
                          "মৌলিক আবেগ"
                        )}</h3>
                        <ul class="list-unstyled puberty-list mb-0">
                          ${renderList(basicEmotions)}
                        </ul>
                      </div>
                      <div class="col-lg-6" data-aos="fade-left" data-aos-delay="100">
                        <article class="glass-card p-4 shadow-sm h-100">
                          <div class="d-flex align-items-center gap-3 mb-3">
                            <div class="icon-circle bg-gradient-indigo text-white">
                              <i class="fa-solid fa-brain"></i>
                            </div>
                            <div>
                              <p class="text-uppercase text-muted small mb-1">${yhLang(
                                "আবেগের বৈশিষ্ট্য",
                                "আবেগের বৈশিষ্ট্য"
                              )}</p>
                              <h3 class="h6 gradient-text mb-0">${yhLang(
                                "ব্যক্তিভেদে ভিন্ন",
                                "ব্যক্তিভেদে ভিন্ন"
                              )}</h3>
                            </div>
                          </div>
                          <p class="mb-0">${yhLang(
                            "প্রতিটি ব্যক্তি ভিন্নভাবে আবেগ প্রকাশ করে এবং সঠিক কৌশল ছাড়া সহজেই আবেগীয় গোলযোগ দেখা দেয়।",
                            "প্রতিটি ব্যক্তি ভিন্নভাবে আবেগ প্রকাশ করে এবং সঠিক কৌশল ছাড়া সহজেই আবেগীয় গোলযোগ দেখা দেয়।"
                          )}</p>
                        </article>
                      </div>
                    </div>
                  </section>

                  <div class="menstrual-section-divider" aria-hidden="true"></div>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="100">
                    <h3 class="gradient-text h5 mb-3">${yhLang(
                      "কেন আবেগ ব্যবস্থাপনা জরুরি",
                      "কেন আবেগ ব্যবস্থাপনা জরুরি"
                    )}</h3>
                    <p class="mb-3">${managementIntro}</p>
                    <p class="mb-4">${managementDetails}</p>
                    <ul class="list-unstyled puberty-list mb-0">
                      ${renderList(managementBenefits)}
                    </ul>
                  </section>
                </div>
              `;
            })(),
          },
          {
            id: "ch14-lesson-3",
            title: yhLang(
              "Understanding Anxiety",
              "উদ্বেগ (Anxiety)"
            ),
            icon: "fa-face-frown",
            gradientClass: "bg-gradient-purple",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q14c",
                  question: yhLang(
                    "Why should adolescents address anxiety early?",
                    "উদ্বেগ দ্রুত নিয়ন্ত্রণ করা কেন জরুরি?"
                  ),
                  options: [
                    yhLang("এটি স্বাভাবিক জীবনযাত্রা ব্যাহত হওয়া থেকে রক্ষা করে", "এটি স্বাভাবিক জীবনযাত্রা ব্যাহত হওয়া থেকে রক্ষা করে"),
                    yhLang("উদ্বেগ সবসময় উপেক্ষা করা উচিত", "উদ্বেগ সবসময় উপেক্ষা করা উচিত"),
                    yhLang("উদ্বেগ বাড়ালে মনোযোগ বাড়ে", "উদ্বেগ বাড়ালে মনোযোগ বাড়ে"),
                    yhLang("উদ্বেগ কেবল শারীরিক সমস্যা", "উদ্বেগ কেবল শারীরিক সমস্যা"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const anxietyDefinition =
                "“উদ্বেগ হলো এক ধরনের আবেগ, যাকে তীব্র অনুভূতি, দুশ্চিন্তা এবং রক্তচাপ বৃদ্ধি করার মতো শারীরিক পরিবর্তনগুলো দ্বারা চিহ্নিত করা হয়।”";

              const anxietyContext =
                "স্বাভাবিক মাত্রায় উদ্বেগ ব্যক্তিকে সতর্ক করে ও বিপদ মোকাবিলায় প্রস্তুত করে। তবে মাত্রাতিরিক্ত উদ্বেগ স্বাভাবিক জীবনধারা ব্যাহত করে ও মানসিক অবস্থাকে ঝুঁকিতে ফেলে।";

              const anxietySignificance =
                "বহু আবেগের মধ্যে উদ্বেগ একটি উল্লেখযোগ্য আবেগ যা সময়মতো নিয়ন্ত্রণ না করলে দীর্ঘমেয়াদি জটিলতা তৈরি করতে পারে।";

              const mentalSymptoms = [
                "অত্যধিক রাগ",
                "বিরক্ত বোধ",
                "মনোযোগের অসুবিধা",
                "অস্থিরতা",
                "যেকোনো পরিস্থিতি খুব বিপজ্জনক মনে করা",
                "খারাপ কিছু ঘটবে বলে আশঙ্কা",
                "নেতিবাচক চিন্তা",
              ];

              const physicalSymptoms = [
                "হৃদস্পন্দন বেড়ে যাওয়া",
                "রক্তচাপ বেড়ে যাওয়া",
                "বমি বমি ভাব",
                "ঘাম হওয়া",
                "মুখ শুকিয়ে যাওয়া",
                "ডায়রিয়া",
                "পেট ব্যথা, মাথা ব্যথা",
                "শ্বাসকষ্ট",
                "ঘুম না হওয়া বা ঘুমের পরিমাণ বেড়ে যাওয়া",
              ];

              const behavioralSymptoms = [
                "পরিস্থিতি এড়িয়ে চলা",
                "খাবারে অরুচি বা অত্যধিক খাবার গ্রহণ",
                "অলসতা বা অনীহা",
                "মাদক দ্রব্য গ্রহণ/মদ্যপান",
                "প্রত্যাহারমূলক আচরণ",
              ];

              const anxietyCauses = [
                "চাহিদা ও যোগানের মধ্যে পার্থক্য থাকা",
                "অবাস্তব প্রত্যাশা",
                "আত্মনিয়ন্ত্রণের অভাব",
                "প্রত্যাখ্যাত ও বিচ্ছিন্ন হওয়ার ভয়",
                "তুলনা করা",
                "কর্মক্ষেত্র ও স্কুলের কাজের চাপ",
                "ব্যক্তিগত ও পারিবারিক সম্পর্কের অবনতি",
                "অর্থনৈতিক সমস্যা",
                "অসুস্থতা",
                "নেতিবাচক অভিজ্ঞতা ইত্যাদি",
              ];

              const emotionalIntelligenceIntro =
                "আবেগীয় বুদ্ধিমত্তা (Emotional Intelligence) হলো নিজের আবেগ এবং অন্যদের আবেগ অনুধাবন, নিয়ন্ত্রণ ও ব্যবহার করার ক্ষমতা।";

              const emotionalIntelligencePoints = [
                "নিজের আবেগগুলো চিহ্নিত করতে পারা এবং তাদের কারণগুলো বুঝতে পারা",
                "আবেগগুলো যেন কোনো নেতিবাচক প্রভাব না ফেলে, সে জন্য নিজেকে নিয়ন্ত্রণ করতে পারা",
                "অন্যদের আবেগগুলো বুঝতে পারা এবং তাদের সাথে সংবেদনশীলভাবে আচরণ করা",
                "আবেগীয় বুদ্ধিমত্তার মাধ্যমে অন্যদের সাথে ভালো সম্পর্ক গড়ে তুলতে পারা",
              ];

              const renderList = (items, baseDelay = 80) =>
                items
                  .map(
                    (item, idx) => `
                      <li data-aos="fade-left" data-aos-delay="${baseDelay + idx * 18}">
                        <i class="fa-solid fa-circle-check"></i>
                        <span>${item}</span>
                      </li>
                    `
                  )
                  .join("");

              const renderSymptomList = (items) =>
                `<ul class="list-unstyled puberty-list mb-0">${items
                  .map(
                    (item, idx) => `
                      <li>
                        <i class="fa-solid fa-circle-check"></i>
                        <span>${item}</span>
                      </li>
                    `
                  )
                  .join("")}</ul>`;

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "Anxiety overview",
                    "উদ্বেগ (Anxiety)"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <p class="mb-3">${anxietyDefinition}</p>
                    <p class="mb-2">${anxietyContext}</p>
                    <p class="mb-0">${anxietySignificance}</p>
                  </section>

                  <section class="modern-card glass-card menstrual-info-card mt-3" data-aos="fade-up" data-aos-delay="80">
                    <div class="row g-4 align-items-start">
                      <div class="col-lg-7">
                        <h3 class="h6 text-uppercase text-muted mb-3">${yhLang(
                          "উদ্বেগের লক্ষণ ও উপসর্গ",
                          "উদ্বেগের লক্ষণ ও উপসর্গ"
                        )}</h3>
                        <div class="table-responsive">
                          <table class="table table-modern align-middle">
                            <thead>
                              <tr>
                                <th>${yhLang("মানসিক লক্ষণ", "মানসিক লক্ষণ")}</th>
                                <th>${yhLang("শারীরিক লক্ষণ", "শারীরিক লক্ষণ")}</th>
                                <th>${yhLang("আচরণগত লক্ষণ", "আচরণগত লক্ষণ")}</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>${renderSymptomList(mentalSymptoms)}</td>
                                <td>${renderSymptomList(physicalSymptoms)}</td>
                                <td>${renderSymptomList(behavioralSymptoms)}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div class="col-lg-5" data-aos="fade-left" data-aos-delay="100">
                        <article class="glass-card p-4 h-100 shadow-sm">
                          <h3 class="h6 text-uppercase text-muted mb-3">${yhLang(
                            "উদ্বেগের কারণ",
                            "উদ্বেগের কারণ"
                          )}</h3>
                          <ul class="list-unstyled puberty-list mb-0">
                            ${renderList(anxietyCauses, 90)}
                          </ul>
                        </article>
                      </div>
                    </div>
                  </section>

                  <div class="menstrual-section-divider" aria-hidden="true"></div>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="120">
                    <h3 class="gradient-text h5 mb-3">${yhLang(
                      "আবেগীয় বুদ্ধিমত্তা",
                      "আবেগীয় বুদ্ধিমত্তা"
                    )}</h3>
                    <p class="mb-3">${emotionalIntelligenceIntro}</p>
                    <ul class="list-unstyled puberty-list mb-0">
                      ${renderList(emotionalIntelligencePoints, 100)}
                    </ul>
                  </section>
                </div>
              `;
            })(),
          },
          {
            id: "ch14-lesson-4",
            title: yhLang(
              "মানসিক চাপ (Stress)",
              "মানসিক চাপ (Stress)"
            ),
            icon: "fa-children",
            gradientClass: "bg-gradient-rose",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q14d",
                  question: yhLang(
                    "What triggers stress according to the lesson?",
                    "এই পাঠ অনুযায়ী মানসিক চাপ কীভাবে সৃষ্টি হয়?"
                  ),
                  options: [
                    yhLang("চাহিদা ও সক্ষমতার মধ্যে দ্বন্দ্ব", "চাহিদা ও সক্ষমতার মধ্যে দ্বন্দ্ব"),
                    yhLang("সম্পূর্ণ বিশ্রামের ফলে", "সম্পূর্ণ বিশ্রামের ফলে"),
                    yhLang("কোনো কাজ না থাকলে", "কোনো কাজ না থাকলে"),
                    yhLang("অন্যের সাফল্যে আনন্দ পেলে", "অন্যের সাফল্যে আনন্দ পেলে"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const stressDefinition =
                "ব্যক্তির চাহিদা এবং ক্ষমতার মধ্যে দ্বন্দ্ব তৈরি হলে যে অভ্যন্তরীণ চাপ সৃষ্টি হয় সেটাই মানসিক চাপ বা স্ট্রেস।";

              const stressExplanation =
                "যে কাজটি আমরা পরিবেশ বা পরিস্থিতির কারণে প্রত্যাশিতভাবে করতে পারি না, তখন উদ্বেগ, দুশ্চিন্তা ও চাপ বাড়ে এবং স্বাভাবিক জীবনযাত্রা ব্যাহত হয়।";

              const physicalChanges = [
                "বুক ধড়ফড় করা",
                "রক্তচাপ বেড়ে যাওয়া",
                "ইনসমনিয়া (অনিদ্রা)",
                "মাথাব্যথা",
                "বুকে ব্যথা",
                "শ্বাসকষ্ট",
                "বমি বমি ভাব",
                "ডায়রিয়া",
                "পেট ব্যথা",
                "ঘাম হওয়া",
              ];

              const emotionalChanges = [
                "বিরক্ত বোধ",
                "অত্যধিক রাগ",
                "বিষণ্নতা",
                "উত্তেজনা",
                "হতাশা",
                "কষ্ট",
                "আত্মবিশ্বাসের অভাব",
                "অপরাধবোধ",
                "অস্থিরতা",
              ];

              const behavioralChanges = [
                "ঘুম না হওয়া",
                "মাদক দ্রব্য গ্রহণ / মদ্যপান",
                "অমনোযোগীতা",
                "অলসতা বা অনীহা",
                "অকারণে হাঁটাহাঁটি করা",
                "চিৎকার-চেঁচামেচি করা",
                "কান্নাকাটি করা",
                "ভুলে যাওয়া",
                "দোষারোপ করা",
                "খাবারে অরুচি বা অত্যধিক খাবার গ্রহণ",
              ];

              const anxietyCauses = [
                "চাহিদা ও যোগানের মধ্যে পার্থক্য থাকা",
                "অবাস্তব প্রত্যাশা",
                "আত্মনিয়ন্ত্রণের অভাব",
                "প্রত্যাখ্যাত ও বিচ্ছিন্ন হওয়ার ভয়",
                "তুলনা করা",
                "কর্মক্ষেত্র ও স্কুলের কাজের চাপ",
                "ব্যক্তিগত ও পারিবারিক সম্পর্কের অবনতি",
                "অর্থনৈতিক সমস্যা",
                "অসুস্থতা",
                "নেতিবাচক অভিজ্ঞতা ইত্যাদি",
              ];

              const renderList = (items, baseDelay = 80) =>
                items
                  .map(
                    (item, idx) => `
                      <li data-aos="fade-left" data-aos-delay="${baseDelay + idx * 18}">
                        <i class="fa-solid fa-circle-check"></i>
                        <span>${item}</span>
                      </li>
                    `
                  )
                  .join("");

              const renderSymptomList = (items) =>
                `<ul class="list-unstyled puberty-list mb-0">${items
                  .map(
                    (item) => `
                      <li>
                        <i class="fa-solid fa-circle-check"></i>
                        <span>${item}</span>
                      </li>
                    `
                  )
                  .join("")}</ul>`;

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "Drivers of early marriage",
                    "বাল্যবিবাহের কারণ"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <p class="mb-3">${stressDefinition}</p>
                    <p class="mb-0">${stressExplanation}</p>
                  </section>

                  <section class="modern-card glass-card menstrual-info-card mt-3" data-aos="fade-up" data-aos-delay="80">
                    <div class="row g-4 align-items-start">
                      <div class="col-lg-7">
                        <h3 class="h6 text-uppercase text-muted mb-3">${yhLang(
                          "মানসিক চাপের ফলে সৃষ্ট পরিবর্তনসমূহ",
                          "মানসিক চাপের ফলে সৃষ্ট পরিবর্তনসমূহ"
                        )}</h3>
                        <div class="table-responsive">
                          <table class="table table-modern align-middle">
                            <thead>
                              <tr>
                                <th>${yhLang("শারীরিক পরিবর্তনসমূহ", "শারীরিক পরিবর্তনসমূহ")}</th>
                                <th>${yhLang("আবেগীয় পরিবর্তনসমূহ", "আবেগীয় পরিবর্তনসমূহ")}</th>
                                <th>${yhLang("আচরণগত পরিবর্তনসমূহ", "আচরণগত পরিবর্তনসমূহ")}</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>${renderSymptomList(physicalChanges)}</td>
                                <td>${renderSymptomList(emotionalChanges)}</td>
                                <td>${renderSymptomList(behavioralChanges)}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div class="col-lg-5" data-aos="fade-left" data-aos-delay="100">
                        <article class="glass-card p-4 h-100 shadow-sm">
                          <h3 class="h6 text-uppercase text-muted mb-3">${yhLang(
                            "উদ্বেগের কারণ",
                            "উদ্বেগের কারণ"
                          )}</h3>
                          <ul class="list-unstyled puberty-list mb-0">
                            ${renderList(anxietyCauses, 90)}
                          </ul>
                        </article>
                      </div>
                    </div>
                  </section>
                </div>
              `;
            })(),
          },
          {
            id: "ch14-lesson-5",
            title: yhLang(
              "Causes of Stress",
              "মানসিক চাপের কারণসমূহ"
            ),
            icon: "fa-head-side-virus",
            gradientClass: "bg-gradient-indigo",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q14e",
                  question: yhLang(
                    "Which environmental issue does the lesson highlight as a stressor?",
                    "নিম্নের কোন পরিবেশগত বিষয়টি মানসিক চাপ সৃষ্টিকারী হিসেবে উল্লেখ করা হয়েছে?"
                  ),
                  options: [
                    yhLang("শব্দদূষণ ও যানজট", "শব্দদূষণ ও যানজট"),
                    yhLang("শান্ত ও নিরিবিলি বন", "শান্ত ও নিরিবিলি বন"),
                    yhLang("সমুদ্র তীরে ছুটি", "সমুদ্র তীরে ছুটি"),
                    yhLang("গভীর ঘুম", "গভীর ঘুম"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const stressIntro =
                "দৈনন্দিন জীবনের নানা ক্ষেত্র যেমন পরিবার, শিক্ষা, কর্মজীবন, বেকারত্ব ও পারিপার্শ্বিক পরিবেশের সংঘাত আমাদের প্রত্যাশা ও সক্ষমতার মধ্যে দ্বন্দ্ব তৈরি করে, যা মানসিক চাপকে বাড়িয়ে তোলে।";

              const stressCauses = [
                {
                  title: "কলহ",
                  description:
                    "পারিবারিক, সামাজিক, রাজনৈতিক, ধর্মীয়, জাতিগত, প্রথাগত ইত্যাদি ক্ষেত্রে সৃষ্ট কলহ আমাদের মধ্যে মানসিক চাপ সৃষ্টি করে।",
                  icon: "fa-people-arrows",
                },
                {
                  title: "শিক্ষা",
                  description:
                    "শিক্ষাক্ষেত্রে অতিরিক্ত প্রতিযোগিতামূলক মনোভাব, কাঙ্ক্ষিত ফলাফল অর্জন করতে না পারা, শিক্ষাবান্ধব পরিবেশের অভাব, আর্থিক অস্বচ্ছলতা, সঠিক দিকনির্দেশনার অভাব এবং সহপাঠীদের সাথে তুলনা শিক্ষার্থীদের মধ্যে মানসিক চাপ সৃষ্টি করে।",
                  icon: "fa-graduation-cap",
                },
                {
                  title: "কর্মক্ষেত্র",
                  description:
                    "কর্মক্ষেত্রে কাজের চাপ থাকা স্বাভাবিক; কিন্তু অতিরিক্ত কাজের চাপ কর্মীদের মধ্যে মানসিক চাপ সৃষ্টি করে, যা কাজের গুণগত মান, উৎপাদনশীলতা, কাজের প্রতি আগ্রহ ও আত্মবিশ্বাস কমিয়ে দেয়।",
                  icon: "fa-briefcase",
                },
                {
                  title: "বেকারত্ব",
                  description:
                    "যখন কোনো ব্যক্তি তার প্রত্যাশা অনুযায়ী কাজের সুযোগ না পায় কিংবা যোগ্যতার অভাবে কাজে অন্তর্ভুক্ত হতে না পারে, তখন সে মানসিক চাপ অনুভব করে।",
                  icon: "fa-user-clock",
                },
                {
                  title: "পারিপার্শ্বিক",
                  description:
                    "পারিপার্শ্বিক পরিবেশ যেমন শব্দদূষণ, বায়ুদূষণ, পানিদূষণ, যানজট, তীব্র আলো, কক্ষে অপর্যাপ্ত বায়ুচলাচল ও অপরিচ্ছন্ন পরিবেশ মানসিক চাপ সৃষ্টি করে।",
                  icon: "fa-city",
                },
              ];

              const managementTips = [
                "বাইরে হাঁটতে যাওয়া",
                "বিশ্বস্ত বন্ধু এবং পরিবারের সদস্যদের সাথে সুন্দর সময় অতিবাহিত করা",
                "বিশ্বস্ত কারো সাথে মনের কথা শেয়ার করা",
                "পছন্দের বই পড়া, গান শোনা",
                "ডায়েরি লেখা",
                "ব্যায়াম করা",
                "আয়নায় নিজেকে দেখা",
                "হাত-মুখ ধোয়া বা গোসল করা",
                "প্রার্থনা করা",
                "পর্যাপ্ত পরিমাণে ঘুমানো",
                "প্রাকৃতিক পরিবেশে সময় অতিবাহিত করা",
                "নাক দিয়ে গভীর নিঃশ্বাস নিয়ে মুখ দিয়ে প্রশ্বাস ছাড়া",
              ];

              const renderCauses = (items) =>
                items
                  .map(
                    (item, idx) => `
                      <div class="cause-item" data-aos="fade-left" data-aos-delay="${80 +
                        idx * 20}">
                        <div class="d-flex align-items-start gap-3">
                          <div class="icon-circle bg-gradient-rose text-white">
                            <i class="fa-solid ${item.icon}"></i>
                          </div>
                          <div>
                            <h4 class="h6 mb-2">${item.title}</h4>
                            <p class="mb-0">${item.description}</p>
                          </div>
                        </div>
                      </div>
                    `
                  )
                  .join("");

              const renderTips = (items) =>
                items
                  .map(
                    (tip, idx) => `
                      <li>
                        <span class="fw-semibold me-2">${idx + 1}.</span>
                        <span>${tip}</span>
                      </li>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "Key drivers of stress",
                    "মানসিক চাপের কারণসমূহ"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <p class="mb-0">${stressIntro}</p>
                  </section>

                  <section class="modern-card glass-card menstrual-info-card mt-3" data-aos="fade-up" data-aos-delay="70">
                    <div class="row g-4 align-items-stretch">
                      <div class="col-lg-12 d-flex flex-column gap-4">
                        <article class="glass-card p-4 h-100 shadow-sm">
                          <div class="d-flex align-items-center gap-3 mb-3">
                            <div class="icon-circle bg-gradient-emerald text-white">
                              <i class="fa-solid fa-exclamation"></i>
                            </div>
                            <div>
                              <p class="text-uppercase text-muted small mb-1">${yhLang(
                                "প্রধান কারণ",
                                "প্রধান কারণ"
                              )}</p>
                              <h3 class="h6 gradient-text mb-0">${yhLang(
                                "Stress triggers",
                                "মানসিক চাপের উৎস"
                              )}</h3>
                            </div>
                          </div>
                          <div class="d-flex flex-column gap-4">
                            ${renderCauses(stressCauses)}
                          </div>
                        </article>
                      </div>
                    </div>
                     <div class="row">
                          <article class=" col-lg-7 glass-card p-4 shadow-sm">
                          <div class="d-flex align-items-center gap-3 mb-3">
                            <div class="icon-circle bg-gradient-sunrise text-white">
                              <i class="fa-solid fa-seedling"></i>
                            </div>
                            <div>
                              <p class="text-uppercase text-muted small mb-1">${yhLang(
                                "উপায়",
                                "উপায়"
                              )}</p>
                              <h3 class="h6 gradient-text mb-0">${yhLang(
                                "মানসিক চাপ ব্যবস্থাপনার জন্য প্রয়োজনীয় কিছু উপায়",
                                "মানসিক চাপ ব্যবস্থাপনার জন্য প্রয়োজনীয় কিছু উপায়"
                              )}</h3>
                            </div>
                          </div>
                          <ul class="list-unstyled puberty-list mb-0">
                            ${renderTips(managementTips)}
                          </ul>
                        </article>
                        <div class="col-lg-5" data-aos="fade-left" data-aos-delay="120">
                          <figure class="glass-card p-3 h-100 shadow-sm text-center">
                            <img src="img/modu14/mental.jpg" alt="Stress reflection" class="img-fluid rounded-4 mb-3">
                            <figcaption class="small text-muted">${yhLang(
                              "মানসিক প্রশান্তির জন্য একটু বিরতি",
                              "মানসিক প্রশান্তির জন্য একটু বিরতি"
                            )}</figcaption>
                          </figure>
                        </div>
                      </div>
                  </section>
                </div>
              `;
            })(),
          },
          {
            id: "ch14-lesson-6",
            title: yhLang("Understanding Anger", "রাগ (Anger)"),
            icon: "fa-face-angry",
            gradientClass: "bg-gradient-amber",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q14f",
                  question: yhLang(
                    "Which type of anger signal includes rapid heartbeat and muscle tension?",
                    "কোন ধরনের রাগের সংকেতে দ্রুত হৃদস্পন্দন ও মাংসপেশির টান দেখা যায়?"
                  ),
                  options: [
                    yhLang("শারীরিক সংকেত", "শারীরিক সংকেত"),
                    yhLang("আবেগীয় সংকেত", "আবেগীয় সংকেত"),
                    yhLang("চিন্তামূলক সংকেত", "চিন্তামূলক সংকেত"),
                    yhLang("আচরণমূলক সংকেত", "আচরণমূলক সংকেত"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const angerIntro =
                "রাগ হলো এক ধরনের মৌলিক অনুভূতি যার উৎপত্তি ঘটে কষ্ট, হতাশা, বিরক্তি, আশাহত হওয়া ইত্যাদি থেকে। সামান্য শব্দ থেকে ধ্বংসাত্মক আচরণ পর্যন্ত নানা উপায়ে রাগ প্রকাশ পেতে পারে। রাগ আমাদের স্বাভাবিক আবেগ এবং সঠিকভাবে ব্যবস্থাপনা করলে তা ক্ষতিকর নয়।";

              const preSignalIntro =
                "রাগের পূর্ব সংকেত হলো এমন সতর্কতামূলক ইঙ্গিত যা আমাদের বুঝতে সাহায্য করে একজন মানুষ কখন রেগে যাচ্ছে। এগুলো সম্পর্কে সচেতন থাকলে রাগ নিয়ন্ত্রণ করা সহজ হয় এবং অনেক ক্ষতি এড়ানো যায়।";

              const physicalSignals = [
                "হৃৎস্পন্দন বেড়ে যাওয়া",
                "বুকে চাপ অনুভব করা",
                "মাথা ব্যথা হওয়া",
                "বেশি বেশি চোখের পলক পড়া",
                "মাংসপেশিতে টান টান ভাব",
                "ঘাম হওয়া",
                "শ্বাসকষ্ট হওয়া",
                "শরীর কাঁপা",
              ];

              const emotionalSignals = [
                "বিরক্তিবোধ",
                "হতাশা",
                "বিষণ্নতা",
                "হিংসা",
                "নিরাপত্তাহীনতা",
                "অগ্রহণযোগ্যতা",
                "মানসিক অবসাদ",
                "ভয় পাওয়া",
                "অসম্মানবোধ",
                "অপরাধবোধ",
                "লজ্জাবোধ",
                "ভবিষ্যতের জন্য দুশ্চিন্তা",
              ];

              const cognitiveSignals = [
                "নিজের সাথে অতিরিক্ত নেতিবাচক কথা বলা",
                "আক্রমণাত্মক মনোভাব",
                "প্রতিশোধপরায়ণতা",
              ];

              const behavioralSignals = [
                "খুব দ্রুত কথা বলা",
                "উচ্চ স্বরে কথা বলা",
                "চিৎকার করা",
                "জোরে দরজায় আঘাত করা",
                "ভাঙচুর করা",
                "মারামারি করা",
                "পরিস্থিতি এড়িয়ে যাওয়া",
                "নীরব থাকা বা চুপ করে থাকা",
              ];

              const renderList = (items) =>
                items
                  .map(
                    (item) => `
                      <li>
                        <i class="fa-solid fa-circle-check"></i>
                        <span>${item}</span>
                      </li>
                    `
                  )
                  .join("");

              const renderColumn = (title, items, delay = 80) => `
                <div class="col-md-6" data-aos="fade-up" data-aos-delay="${delay}">
                  <article class="glass-card p-4 h-100 shadow-sm">
                    <div class="d-flex align-items-center gap-3 mb-3">
                      <div class="icon-circle bg-gradient-rose text-white">
                        <i class="fa-solid fa-bolt"></i>
                      </div>
                      <div>
                        <p class="text-uppercase text-muted small mb-1">${yhLang(
                          "রাগের পূর্ব সংকেত",
                          "রাগের পূর্ব সংকেত"
                        )}</p>
                        <h3 class="h6 gradient-text mb-0">${title}</h3>
                      </div>
                    </div>
                    <ul class="list-unstyled puberty-list mb-0">
                      ${renderList(items)}
                    </ul>
                  </article>
                </div>
              `;

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "Understanding anger signals",
                    "রাগ (Anger)"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <p class="mb-3">${angerIntro}</p>
                    <p class="mb-0">${preSignalIntro}</p>
                  </section>

                  <section class="modern-card glass-card menstrual-info-card mt-3" data-aos="fade-up" data-aos-delay="70">
                    <h3 class="h6 text-uppercase text-muted mb-3">${yhLang(
                      "রাগের পূর্ব সংকেতসমূহ",
                      "রাগের পূর্ব সংকেতসমূহ"
                    )}</h3>
                    <div class="row g-4 align-items-stretch">
                      ${renderColumn("শারীরিক সংকেত", physicalSignals, 80)}
                      ${renderColumn("আবেগীয় সংকেত", emotionalSignals, 100)}
                      ${renderColumn("চিন্তামূলক সংকেত", cognitiveSignals, 120)}
                      ${renderColumn("আচরণমূলক সংকেত", behavioralSignals, 140)}
                    </div>
                  </section>
                </div>
              `;
            })(),
          },
          {
            id: "ch14-lesson-7",
            title: yhLang(
              "Why We Get Angry Easily",
              "আমরা কি কারণে এবং কখন খুব সহজেই রেগে যাই"
            ),
            icon: "fa-burst",
            gradientClass: "bg-gradient-crimson",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q14g",
                  question: yhLang(
                    "Which situation from the lesson can quickly trigger anger?",
                    "পাঠ অনুযায়ী কোন পরিস্থিতি আমাদের খুব সহজেই রাগান্বিত করতে পারে?"
                  ),
                  options: [
                    yhLang("সামাজিক সমর্থনের অভাব", "সামাজিক সমর্থনের অভাব"),
                    yhLang("শান্ত ধ্যানের সময়", "শান্ত ধ্যানের সময়"),
                    yhLang("ছুটির দিনে পর্যাপ্ত বিশ্রাম", "ছুটির দিনে পর্যাপ্ত বিশ্রাম"),
                    yhLang("প্রিয় খাবার খাওয়া", "প্রিয় খাবার খাওয়া"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const angerContext =
                "চ্যালেঞ্জিং আচরণ, সামাজিক সমর্থনের অভাব, আবেগীয় বিশৃঙ্খলা, মানসিক আঘাত, মানসিক চাপ কিংবা অপমানকর আচরণ আমাদের খুব সহজেই রাগান্বিত করে। লক্ষ্য পূরণে বাধা, অসম্মান বা অধিকার খর্ব হলে রাগের মাত্রা আরও বেড়ে যায়।";

              const angerTriggers = [
                "চ্যালেঞ্জিং আচরণ বা নেতিবাচক আচরণের ফলে",
                "সামাজিক সমর্থনের অভাব",
                "আবেগীয় বিশৃঙ্খলা — বিষণ্ণতা, উদ্বেগ ইত্যাদি",
                "মানসিক আঘাতজনিত ঘটনা",
                "মানসিক চাপ",
                "আঘাত/অপমান করে কথা বললে",
                "হুমকির সম্মুখীন হলে",
                "নিজের লক্ষ্যে পৌঁছাতে বাধাগ্রস্ত হয়ে হতাশ হওয়ার ফলে",
                "অসম্মানিত হওয়ার ফলে",
                "অধিকার খর্ব হলে",
              ];

              const angerDamages = [
                "শারীরিক ক্ষতি",
                "মানসিক ক্ষতি",
                "পেশাগত ক্ষতি",
                "পড়ালেখার ক্ষতি",
                "সম্পর্কের ক্ষতি",
                "বিষণ্নতায় ভোগা",
                "ভবিষ্যৎ নিয়ে দুশ্চিন্তা করা",
                "ঘুমের সমস্যা",
                "নেশায় জড়িয়ে পড়া",
                "একই কাজ বারবার করার প্রবণতা",
                "আত্ম-ক্ষতি বা নিজের ক্ষতি করা",
                "রক্তচাপ বেড়ে যাওয়া",
              ];

              const reflectionText =
                "অপ্রত্যাশিত ঘটনা ঘটলে অসংখ্য নেতিবাচক চিন্তা মাথায় আসে এবং রাগ দ্রুত বেড়ে যায়। এই রাগ বিভিন্ন আচরণের মাধ্যমে প্রকাশ পায় এবং শারীরিক, মানসিক ও আচরণগত সংকেত দিয়ে বোঝা যায়। সময়মতো রাগকে সঠিক উপায়ে প্রকাশ, নিজের অধিকারের কথা বলা এবং স্বাস্থ্যকর কৌশল গ্রহণ করলে এর ক্ষতি কমানো সম্ভব।";

              const renderList = (items) =>
                items
                  .map(
                    (item) => `
                      <li>
                        <i class="fa-solid fa-circle-check"></i>
                        <span>${item}</span>
                      </li>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "Anger triggers and impacts",
                    "আমরা কি কারণে এবং কখন খুব সহজেই রেগে যাই"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <p class="mb-0">${angerContext}</p>
                  </section>

                  <section class="modern-card glass-card menstrual-info-card mt-3" data-aos="fade-up" data-aos-delay="70">
                    <div class="row g-4">
                      <div class="col-lg-6">
                        <article class="glass-card p-4 h-100 shadow-sm">
                          <div class="d-flex align-items-center gap-3 mb-3">
                            <div class="icon-circle bg-gradient-rose text-white">
                              <i class="fa-solid fa-bolt"></i>
                            </div>
                            <div>
                              <p class="text-uppercase text-muted small mb-1">${yhLang(
                                "রাগের কারণ",
                                "রাগের কারণ"
                              )}</p>
                              <h3 class="h6 gradient-text mb-0">${yhLang(
                                "সহজে রেগে যাওয়ার কারণ",
                                "সহজে রেগে যাওয়ার কারণ"
                              )}</h3>
                            </div>
                          </div>
                          <ul class="list-unstyled puberty-list mb-0">
                            ${renderList(angerTriggers)}
                          </ul>
                        </article>
                      </div>
                      <div class="col-lg-6" data-aos="fade-left" data-aos-delay="100">
                        <article class="glass-card p-4 h-100 shadow-sm">
                          <div class="d-flex align-items-center gap-3 mb-3">
                            <div class="icon-circle bg-gradient-indigo text-white">
                              <i class="fa-solid fa-triangle-exclamation"></i>
                            </div>
                            <div>
                              <p class="text-uppercase text-muted small mb-1">${yhLang(
                                "রাগের ক্ষতি",
                                "রাগের ক্ষতি"
                              )}</p>
                              <h3 class="h6 gradient-text mb-0">${yhLang(
                                "রাগের ফলে ক্ষয়ক্ষতি",
                                "রাগের ফলে ক্ষয়ক্ষতি"
                              )}</h3>
                            </div>
                          </div>
                          <ul class="list-unstyled puberty-list mb-0">
                            ${renderList(angerDamages)}
                          </ul>
                        </article>
                      </div>
                    </div>
                  </section>

                  <section class="modern-card glass-card menstrual-info-card mt-3" data-aos="fade-up" data-aos-delay="110">
                    <p class="mb-0">${reflectionText}</p>
                  </section>
                </div>
              `;
            })(),
          },
          {
            id: "ch14-lesson-8",
            title: yhLang(
              "Anger Management Techniques",
              "রাগ ব্যবস্থাপনার কৌশল"
            ),
            icon: "fa-hand-holding-heart",
            gradientClass: "bg-gradient-teal",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q14h",
                  question: yhLang(
                    "Which strategy involves pausing before reacting?",
                    "কোন কৌশলটি প্রতিক্রিয়া প্রকাশের আগে একটু সময় নেওয়ার উপর গুরুত্ব দেয়?"
                  ),
                  options: [
                    yhLang("প্রতিক্রিয়ার আগে বিরতি", "প্রতিক্রিয়ার আগে বিরতি"),
                    yhLang("পর্যাপ্ত ঘুম", "পর্যাপ্ত ঘুম"),
                    yhLang("নিয়মিত ব্যায়াম", "নিয়মিত ব্যায়াম"),
                    yhLang("মনোচিকিৎসকের কাছে যাওয়া", "মনোচিকিৎসকের কাছে যাওয়া"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const intro =
                "রাগকে নিয়ন্ত্রণে রাখতে সচেতন বিরতি, শ্বাস-প্রশ্বাস, শারীরিক ব্যায়াম ও পেশাদার সহায়তার মতো কৌশল কার্যকর ভূমিকা পালন করে। ছোট ছোট ব্যবস্থাপনা কৌশল রাগের নেতিবাচক প্রভাব কমিয়ে আনে।";

              const strategies = [
                "প্রতিক্রিয়া প্রকাশের আগে কিছুটা সময় নেওয়া",
                "১–১০ পর্যন্ত ধীরে ধীরে গুণতে থাকা",
                "সততার সাথে যুক্তিসঙ্গত কথা বলা",
                "পর্যাপ্ত ঘুম",
                "ডায়েরি লেখা",
                "নিয়মিত শরীরচর্চা বা ব্যায়াম করা",
                "নিয়মিত নিঃশ্বাসের ব্যায়াম করা",
                "পরিস্থিতি থেকে নিজেকে সরিয়ে নেওয়া",
                "মনোচিকিৎসকের শরণাপন্ন হওয়া",
              ];

              const professionalNote =
                "কিছু কিছু রাগ সম্পর্কিত সমস্যাগুলি নিজে নিজে ব্যবস্থাপনা সম্ভব হয় না। এমন ক্ষেত্রে পেশাদার মনোচিকিৎসকের সহায়তা নিলে উন্নত ফল পাওয়া যায় এবং নিরাপদে রাগ নিয়ন্ত্রণ সম্ভব হয়।";

              const renderList = (items) =>
                items
                  .map(
                    (item) => `
                      <li>
                        <i class="fa-solid fa-circle-check"></i>
                        <span>${item}</span>
                      </li>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "Practical anger strategies",
                    "রাগ ব্যবস্থাপনার কৌশল"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <p class="mb-0">${intro}</p>
                  </section>

                  <section class="modern-card glass-card menstrual-info-card mt-3" data-aos="fade-up" data-aos-delay="70">
                    <div class="row g-4 align-items-stretch">
                      <div class="col-lg-7">
                        <article class="glass-card p-4 h-100 shadow-sm">
                          <div class="d-flex align-items-center gap-3 mb-3">
                            <div class="icon-circle bg-gradient-emerald text-white">
                              <i class="fa-solid fa-hands-praying"></i>
                            </div>
                            <div>
                              <p class="text-uppercase text-muted small mb-1">${yhLang(
                                "কৌশল",
                                "কৌশল"
                              )}</p>
                              <h3 class="h6 gradient-text mb-0">${yhLang(
                                "রাগ নিয়ন্ত্রণের ব্যবহারিক পদ্ধতি",
                                "রাগ নিয়ন্ত্রণের ব্যবহারিক পদ্ধতি"
                              )}</h3>
                            </div>
                          </div>
                          <ul class="list-unstyled puberty-list mb-0">
                            ${renderList(strategies)}
                          </ul>
                        </article>
                      </div>
                      <div class="col-lg-5" data-aos="fade-left" data-aos-delay="100">
                        <article class="glass-card p-4 h-100 shadow-sm text-center d-flex flex-column justify-content-center">
                          <div class="icon-circle bg-gradient-sunrise text-white mb-3 mx-auto">
                            <i class="fa-solid fa-user-md"></i>
                          </div>
                          <p class="mb-0">${professionalNote}</p>
                        </article>
                      </div>
                    </div>
                  </section>
                </div>
              `;
            })(),
          },
          {
            id: "ch14-lesson-9",
            title: yhLang("Understanding Exam Anxiety", "পরীক্ষা-ভীতি"),
            icon: "fa-book-open-reader",
            gradientClass: "bg-gradient-blue",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q14i",
                  question: yhLang(
                    "Which of the following is a common symptom of exam fear?",
                    "নিম্নের কোনটি পরীক্ষা-ভীতির সাধারণ উপসর্গ?"
                  ),
                  options: [
                    yhLang("বুক ধড়ফড় করা", "বুক ধড়ফড় করা"),
                    yhLang("অতিরিক্ত ঘুম", "অতিরিক্ত ঘুম"),
                    yhLang("পরীক্ষার কথা ভুলে যাওয়া", "পরীক্ষার কথা ভুলে যাওয়া"),
                    yhLang("অনিয়ন্ত্রিত হাসি", "অনিয়ন্ত্রিত হাসি"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const examFearIntro =
                "পরীক্ষাকে ঘিরে স্বাভাবিক এক ধরনের উদ্বেগ শিক্ষার্থীদের প্রস্তুতিতে সহায়তা করে, তবে অতিরিক্ত ভয় পরীক্ষার প্রস্তুতি ও কাঙ্ক্ষিত ফল অর্জনে বড় বাধা হয়ে দাঁড়ায়। অতিরিক্ত পরীক্ষাভীতি শারীরিক ও মানসিক নানা উপসর্গের মাধ্যমে প্রকাশ পায়।";

              const examFearDetails =
                "পরীক্ষার কথা শুনলেই বুক ধড়ফড় করা, ঘাম হওয়া, হাত-পা ঠান্ডা হয়ে যাওয়া, বমি বমি লাগার মতো লক্ষণ দেখা যেতে পারে। আগে থেকেই পরিকল্পিত প্রস্তুতি, সময় ব্যবস্থাপনা ও ভীতি দূরীকরণ কৌশল অনুশীলনের মাধ্যমে এই ভয়কে নিয়ন্ত্রণ করা সম্ভব।";

              const physicalSymptoms = [
                "বমি বমি ভাব হওয়া, কোনো কোনো ক্ষেত্রে বমি হয়ে যাওয়া",
                "খাওয়া-দাওয়া করতে না পারা",
                "বুক ধড়ফড় করা",
                "মাথাব্যথা করা, মাথা ভার ভার লাগা, মাথা ঘোরা",
                "চোখে ঝাপসা দেখা",
                "ঘুম না আসা",
                "বাস্তবের সাথে সামঞ্জস্যহীনতা",
                "হঠাৎ করে হাত-পা প্রচণ্ড ঠান্ডা হয়ে আসা",
                "ঘনঘন পাতলা পায়খানা হওয়া",
                "মূর্ছা যাওয়া",
              ];

              const mentalSymptoms = [
                "মনোযোগ দিতে না পারা",
                "অল্পতেই একাগ্রতা হারিয়ে ফেলা",
                "স্মৃতিশক্তিতে সাময়িক ব্যাহত হওয়া",
              ];

              const copingNote =
                "পরীক্ষার আগে নিয়মিত পুনরাবৃত্তি, সঠিক ঘুম, সুষম খাদ্য, শ্বাস-প্রশ্বাসের ব্যায়াম ও ইতিবাচক মানসিক প্রস্তুতি পরীক্ষাভীতি মোকাবিলায় সহায়তা করে। যাদের ক্ষেত্রে সমস্যা বাড়ে, তারা পরামর্শদাতা বা শিক্ষকের সহায়তা নিতে পারে।";

              const renderList = (items) =>
                items
                  .map(
                    (item) => `
                      <li>
                        <i class="fa-solid fa-circle-check"></i>
                        <span>${item}</span>
                      </li>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "Understanding exam fear",
                    "পরীক্ষা-ভীতি"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <p class="mb-3">${examFearIntro}</p>
                    <p class="mb-0">${examFearDetails}</p>
                  </section>

                  <section class="modern-card glass-card menstrual-info-card mt-3" data-aos="fade-up" data-aos-delay="80">
                    <h3 class="h6 text-uppercase text-muted mb-3">${yhLang(
                      "পরীক্ষা-ভীতির শারীরিক ও মানসিক উপসর্গসমূহ",
                      "পরীক্ষা-ভীতির শারীরিক ও মানসিক উপসর্গসমূহ"
                    )}</h3>
                    <div class="row g-4 align-items-stretch">
                      <div class="col-lg-7">
                        <article class="glass-card p-4 h-100 shadow-sm">
                          <div class="d-flex align-items-center gap-3 mb-3">
                            <div class="icon-circle bg-gradient-rose text-white">
                              <i class="fa-solid fa-heart-pulse"></i>
                            </div>
                            <div>
                              <p class="text-uppercase text-muted small mb-1">${yhLang(
                                "শারীরিক উপসর্গ",
                                "শারীরিক উপসর্গ"
                              )}</p>
                              <h3 class="h6 gradient-text mb-0">${yhLang(
                                "Physical indicators",
                                "শারীরিক সংকেত"
                              )}</h3>
                            </div>
                          </div>
                          <ul class="list-unstyled puberty-list mb-0">
                            ${renderList(physicalSymptoms)}
                          </ul>
                        </article>
                      </div>
                      <div class="col-lg-5" data-aos="fade-left" data-aos-delay="100">
                        <article class="glass-card p-4 h-100 shadow-sm">
                          <div class="d-flex align-items-center gap-3 mb-3">
                            <div class="icon-circle bg-gradient-indigo text-white">
                              <i class="fa-solid fa-brain"></i>
                            </div>
                            <div>
                              <p class="text-uppercase text-muted small mb-1">${yhLang(
                                "মানসিক উপসর্গ",
                                "মানসিক উপসর্গ"
                              )}</p>
                              <h3 class="h6 gradient-text mb-0">${yhLang(
                                "Mental indicators",
                                "মানসিক সংকেত"
                              )}</h3>
                            </div>
                          </div>
                          <ul class="list-unstyled puberty-list mb-0">
                            ${renderList(mentalSymptoms)}
                          </ul>
                        </article>
                      </div>
                    </div>
                  </section>

                  <section class="modern-card glass-card menstrual-info-card mt-3" data-aos="fade-up" data-aos-delay="110">
                    <p class="mb-0">${copingNote}</p>
                  </section>
                </div>
              `;
            })(),
          },
          {
            id: "ch14-lesson-10",
            title: yhLang(
              "Solutions to Exam Fear",
              "পরীক্ষা-ভীতি দূর করার উপায়"
            ),
            icon: "fa-pen-to-square",
            gradientClass: "bg-gradient-emerald",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q14j",
                  question: yhLang(
                    "Which strategy focuses on gathering accurate exam details?",
                    "কোন কৌশলটি পরীক্ষার সঠিক তথ্য সংগ্রহের উপর জোর দেয়?"
                  ),
                  options: [
                    yhLang("Exam related information", "পরীক্ষা সংক্রান্ত তথ্য সংগ্রহ"),
                    yhLang("Group study", "দলবদ্ধ পড়াশোনা"),
                    yhLang("পর্যাপ্ত ঘুম", "পর্যাপ্ত ঘুম"),
                    yhLang("Positive mindset", "ইতিবাচক মনোভাব"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const intro =
                "পরীক্ষা-ভীতি দূর করতে তথ্যভিত্তিক প্রস্তুতি, কার্যকর অধ্যয়ন, দলগত সমর্থন, স্বাস্থ্যকর জীবনযাপন ও ইতিবাচক মনোভাব গুরুত্বপূর্ণ ভূমিকা রাখে।";

              const strategies = [
                {
                  title: "পরীক্ষা সংক্রান্ত সঠিক তথ্য সংগ্রহ করা (Exam Related Information):",
                  description:
                    `পরীক্ষার নির্দিষ্ট তারিখ, সময়সূচি, রুটিন, সিলেবাস ঠিকমতো জোগাড় করে সে অনুযায়ী প্রস্তুতি নেওয়া।`,
                  icon: "fa-calendar-check",
                },
                {
                  title: "পর্যাপ্ত এবং কার্যকরী অনুশীলনসহ পড়াশোনা করা (Effective Study & Practice):",
                  description:
                    `প্রতিদিন নিয়মিত পড়া, পরীক্ষার সময়সূচী, প্রতিটি পরীক্ষার আগে কয় দিন ছুটি, কোন বিষয়টি কঠিন তাই বেশিদিন পড়তে হবে, কোনটি সহজ তাই অল্পদিন পড়তে হবে—সবকিছু উল্লেখ করে পড়ালেখার একটি দৃশ্যমান তালিকা তৈরি করা। বুঝে পড়া, মুখস্থ করা, উদাহরণের সাথে সম্পর্ক করে পড়া।`,
                  icon: "fa-book",
                },
                {
                  title: "পরীক্ষা-উপযোগী পড়াশোনা করা (Exam-Oriented Study)",
                  description:
                    `ভালভাবে পরীক্ষায় অংশগ্রহণের জন্য পরীক্ষার সিলেবাস ও পূর্বের ক্লাসগুলোর ওপর জোর দিতে হবে। পূর্ববর্তী বছরের প্রশ্নপত্রগুলো ব্যাখ্যা করে প্রশ্নের ধরন বুঝতে হবে এবং প্রশ্নগুলোর সমাধান করতে হবে।`,
                  icon: "fa-list-check",
                },
                {
                  title: "বন্ধুদের সাথে দলবদ্ধভাবে পড়ালেখা করা (Group Study)",
                  description:
                    `একে অপরকে প্রশ্ন করা, উত্তর দেওয়া, আলোচনা করে গুরুত্বপূর্ণ প্রশ্ন নির্ধারণ করা এবং একে অপরকে বুঝিয়ে শেখানোর মাধ্যমে পড়ালেখা করা।`,
                  icon: "fa-users",
                },
                {
                  title: "স্বাস্থ্যকর জীবনযাপন করা (Healthy Lifestyle):",
                  description:
                    `পরিমিত ঘুম (৭/৮ ঘণ্টা), পুষ্টিকর খাবার খাওয়া, বেশি পানি পান করা, ব্যায়াম, খেলাধুলা ও বিনোদন—যেমন টিভি দেখা/গল্প করা—ইত্যাদির মাধ্যমে জীবনযাপন করা।`,
                  icon: "fa-heart",
                },
                {
                  title: "মনোভাব উন্নতকরণ",
                  description:
                    `প্রথমেই নির্ধারণ করতে হবে দুশ্চিন্তার কারণ কী—প্রয়োজনীয় প্রস্তুতির অভাবে, নাকি ফলাফল খারাপ হলে অন্যরা কি বলবে সেই ভাবনায়।
যদি "অন্যরা কী বলবে"—এটাই দুশ্চিন্তার প্রধান কারণ হয়, তাহলে মনে রাখতে হবে জীবনে পরীক্ষা থাকবেই। পড়াশোনার সাথে পরীক্ষা ওতপ্রোতভাবে জড়িত। একটি পরীক্ষা কখনই পুরো জীবনের সফলতা বা ব্যর্থতা নির্ধারণ করে না।
পরীক্ষাকে জীবনের একটি অংশ হিসেবে গ্রহণ করার মানসিকতা অর্জনের চেষ্টা করতে হবে।`,
                  icon: "fa-lightbulb",
                },
              ];

              const renderStrategies = (items) =>
                items
                  .map(
                    (item, idx) => `
                      <article class="glass-card p-4 h-100 shadow-sm" data-aos="fade-up" data-aos-delay="${60 +
                        idx * 30}">
                        <div class="d-flex align-items-start gap-3 mb-3">
                          <div class="icon-circle bg-gradient-indigo text-white">
                            <i class="fa-solid ${item.icon}"></i>
                          </div>
                          <div>
                            <h3 class="h6 gradient-text mb-1">${item.title}</h3>
                            <p class="mb-0">${item.description}</p>
                          </div>
                        </div>
                      </article>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "Exam fear solutions",
                    "পরীক্ষা-ভীতি দূর করার উপায়"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <p class="mb-0">${intro}</p>
                  </section>

                  <section class="modern-card glass-card menstrual-info-card mt-3" data-aos="fade-up" data-aos-delay="70">
                    <div class="row g-4">
                      ${renderStrategies(strategies)}
                    </div>
                  </section>
                </div>
              `;
            })(),
          },
        ],
      },
      {
        id: "ch-16",
        title: yhLang(
          "Module-15: Violence Related to Adolescents",
          "মডিউল-১৫: কৈশোরকালীন মানসিক স্বাস্থ্য সমস্যা ও সমাধানের উপায়"
        ),
        lessons: [
          {
            id: "ch15-lesson-1",
            title: yhLang("Mental Health", "মানসিক স্বাস্থ্য"),
            icon: "fa-brain",
            gradientClass: "bg-gradient-indigo",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q15a",
                  question: yhLang(
                    "According to the lesson, what does mental health help a person do?",
                    "এই পাঠ অনুযায়ী মানসিক স্বাস্থ্য একজন মানুষকে কী করতে সহায়তা করে?"
                  ),
                  options: [
                    yhLang("দৈনন্দিন চাপের সাথে মানিয়ে চলতে", "দৈনন্দিন চাপের সাথে মানিয়ে চলতে"),
                    yhLang("সমস্ত আবেগ লুকিয়ে রাখতে", "সমস্ত আবেগ লুকিয়ে রাখতে"),
                    yhLang("সম্পূর্ণ নিঃসঙ্গ হয়ে থাকতে", "সম্পূর্ণ নিঃসঙ্গ হয়ে থাকতে"),
                    yhLang("সমাজ থেকে দূরে থাকতে", "সমাজ থেকে দূরে থাকতে"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const definition =
                "মানসিক স্বাস্থ্য হলো এমন এক সাম্যাবস্থা যেখানে ব্যক্তি নিজের সক্ষমতা ও দুর্বলতা বোঝে, দৈনন্দিন চাপের সাথে খাপ খাইয়ে সামাজিক রীতি মেনে উৎপাদনশীল থাকে এবং সমাজে অবদান রাখতে পারে।";

              const wellBeingTraits = [
                {
                  title: "আবেগের নিয়ন্ত্রণ",
                  detail:
                    "রাগ, ভয়, দুঃখ, আনন্দ, হিংসা, অপরাধবোধ ও ভালোবাসার মতো অনুভূতিগুলো সুষমভাবে প্রকাশ করতে পারে।",
                },
                {
                  title: "নিজের সক্ষমতা ও দুর্বলতা বোঝা",
                  detail:
                    "আত্মসচেতন থাকে এবং সক্ষমতাকে কাজে লাগাতে ও সীমাবদ্ধতাকে মেনে নিতে পারে।",
                },
                {
                  title: "আত্মসম্মানবোধ বজায় রাখা",
                  detail: "নিজের মর্যাদাবোধ অটুট থাকে এবং নিজেকে মূল্যবান মনে করে।",
                },
                {
                  title: "পরিস্থিতির সাথে খাপ খাওয়ানো",
                  detail: "বিভিন্ন নতুন বা চ্যালেঞ্জিং পরিস্থিতিতে নমনীয়ভাবে মানিয়ে নিতে পারে।",
                },
                {
                  title: "সম্পর্ক বজায় রাখা",
                  detail: "অন্যের সাথে দীর্ঘস্থায়ী ও ফলপ্রসূ সম্পর্ক গড়ে তুলতে সক্ষম হয়।",
                },
                {
                  title: "সমাজে কার্যকর ভূমিকা",
                  detail: "সামাজিক রীতি-নীতি মেনে সমাজে ইতিবাচক অবদান রাখে।",
                },
                {
                  title: "সিদ্ধান্ত গ্রহণের ক্ষমতা",
                  detail: "পরিস্থিতি অনুযায়ী সঠিক সিদ্ধান্ত নিতে পারে।",
                },
                {
                  title: "দায়িত্বশীলতা",
                  detail:
                    "ব্যক্তিগত, সামাজিক ও পেশাগত সম্পর্কের ক্ষেত্রে দায়িত্বশীল আচরণ করে।",
                },
              ];

              const renderTraits = (items) =>
                items
                  .map(
                    (item, idx) => `
                      <div class="col-md-6" data-aos="fade-up" data-aos-delay="${60 + idx * 20}">
                        <article class="glass-card p-4 h-100 shadow-sm">
                          <div class="d-flex align-items-start gap-3">
                            <div class="icon-circle bg-gradient-rose text-white">
                              <i class="fa-solid fa-check"></i>
                            </div>
                            <div>
                              <h3 class="h6 gradient-text mb-1">${item.title}</h3>
                              <p class="mb-0">${item.detail}</p>
                            </div>
                          </div>
                        </article>
                      </div>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "Foundations of mental health",
                    "মানসিক স্বাস্থ্য"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <p class="mb-0">${definition}</p>
                  </section>

                  <section class="modern-card glass-card menstrual-info-card mt-3" data-aos="fade-up" data-aos-delay="70">
                    <h3 class="h6 text-uppercase text-muted mb-3">${yhLang(
                      "মানসিক সুস্থতার বৈশিষ্ট্যসমূহ",
                      "মানসিক সুস্থতার বৈশিষ্ট্যসমূহ"
                    )}</h3>
                    <div class="row g-4">
                      ${renderTraits(wellBeingTraits)}
                    </div>
                  </section>
                </div>
              `;
            })(),
          },
          {
            id: "ch15-lesson-2",
            title: yhLang(
              "Adolescent Mental Health",
              "কিশোর-কিশোরীদের জন্য মানসিক স্বাস্থ্য"
            ),
            icon: "fa-children",
            gradientClass: "bg-gradient-rose",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q15b",
                  question: yhLang(
                    "According to WHO 2019, what fraction of people live with a mental disorder?",
                    "WHO ২০১৯ অনুযায়ী কতজন মানুষ কোনো না কোনো মানসিক সমস্যায় ভোগে?"
                  ),
                  options: [
                    yhLang("প্রতি ৫ জনে ১ জন", "প্রতি ৫ জনে ১ জন"),
                    yhLang("প্রতি ১০ জনে ১ জন", "প্রতি ১০ জনে ১ জন"),
                    yhLang("প্রতি ২০ জনে ১ জন", "প্রতি ২০ জনে ১ জন"),
                    yhLang("প্রতি ৫০ জনে ১ জন", "প্রতি ৫০ জনে ১ জন"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const introPrimary =
                "কিশোর-কিশোরীদের জন্য মানসিক স্বাস্থ্য অত্যন্ত গুরুত্বপূর্ণ। মানসিক চাপ থেকে মুক্ত থাকতে না পারলে বড় হওয়ার পথে নানা ঝুঁকিপূর্ণ আচরণ ও জটিলতা তৈরি হয়।";

              const introSecondary =
                "বিশ্বস্বাস্থ্য সংস্থার (২০১৯) তথ্যমতে, বিশ্বে প্রতি ৫ জনের ১ জন (২২.১%) মানসিক রোগে ভোগেন এবং প্রতি ১০ জনের ১ জন (৯%) মধ্যম থেকে মারাত্মক মানসিক সমস্যায় আক্রান্ত।";

              const whoStats = [
                {
                  value: "22.1%",
                  label: "প্রতি ৫ জনে ১ জন মানসিক সমস্যায় ভোগে",
                },
                {
                  value: "9%",
                  label: "প্রতি ১০ জনে ১ জন মধ্যম থেকে মারাত্মক অসুখে",
                },
                {
                  value: "16%",
                  label: "১০–১৯ বছরের কিশোর-কিশোরীদের মানসিক সমস্যা",
                },
                {
                  value: "50%",
                  label: "মানসিক সমস্যার অর্ধেকই শুরু হয় ১৪ বছরের আগে",
                },
              ];

              const adolescentImpacts = [
                "কৈশোরকালীন বিষণ্নতা কিশোর-কিশোরীদের অসুস্থতা ও পঙ্গুত্বের প্রধান কারণগুলোর একটি।",
                "বিশ্বব্যাপী ১৫–১৯ বছর বয়সী কিশোর-কিশোরীদের মৃত্যুর তৃতীয় কারণ আত্মহত্যা।",
                "কৈশোরের মানসিক স্বাস্থ্য সমস্যা প্রাপ্তবয়সে শারীরিক ও মানসিক স্বাস্থ্যের ক্ষতি করে।",
                "কৈশোরকালীন মানসিক স্বাস্থ্য সমস্যা প্রাপ্তবয়সে শারীরিক ও মানসিক স্বাস্থ্যের ক্ষতিসাধন করে এবং স্বাভাবিক জীবনযাত্রা ব্যাহত করে।",
              ];

              const renderStats = (items) =>
                items
                  .map(
                    (item, idx) => `
                      <div class="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="${70 +
                        idx * 20}">
                        <article class="glass-card p-4 h-100 shadow-sm text-center">
                          <p class="display-6 fw-bold gradient-text mb-2">${item.value}</p>
                          <p class="mb-0 small">${item.label}</p>
                        </article>
                      </div>
                    `
                  )
                  .join("");

              const renderList = (items) =>
                items
                  .map(
                    (item) => `
                      <li>
                        <i class="fa-solid fa-circle-check"></i>
                        <span>${item}</span>
                      </li>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "Mental health for adolescents",
                    "কিশোর-কিশোরীদের জন্য মানসিক স্বাস্থ্য"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <p class="mb-3">${introPrimary}</p>
                    <p class="mb-0">${introSecondary}</p>
                  </section>

                  <section class="modern-card glass-card menstrual-info-card mt-3" data-aos="fade-up" data-aos-delay="70">
                    <h3 class="h6 text-uppercase text-muted mb-3">${yhLang(
                      "বিশ্বস্বাস্থ্য সংস্থার তথ্য (২০১৯)",
                      "বিশ্বস্বাস্থ্য সংস্থার তথ্য (২০১৯)"
                    )}</h3>
                    <div class="row g-4">
                      ${renderStats(whoStats)}
                    </div>
                  </section>

                  <section class="modern-card glass-card menstrual-info-card mt-3" data-aos="fade-up" data-aos-delay="100">
                    <h3 class="h6 text-uppercase text-muted mb-3">${yhLang(
                      "কৈশোরের মানসিক স্বাস্থ্য প্রভাব",
                      "কৈশোরের মানসিক স্বাস্থ্য প্রভাব"
                    )}</h3>
                    <ul class="list-unstyled puberty-list mb-0">
                      ${renderList(adolescentImpacts)}
                    </ul>
                  </section>
                </div>
              `;
            })(),
          },
          {
            id: "ch15-lesson-3",
            title: yhLang(
              "Childhood and Adolescent Mental Issues",
              "শৈশব ও কৈশোরকালীন মানসিক সমস্যাসমূহ"
            ),
            icon: "fa-child",
            gradientClass: "bg-gradient-amber",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q15c",
                  question: yhLang(
                    "What is it called when a child over five frequently urinates in bed or clothes?",
                    "পাঁচ বছরের বেশি বয়সী শিশু বারবার বিছানায় বা জামায় প্রস্রাব করলে তাকে কী বলা হয়?"
                  ),
                  options: [
                    yhLang("ইনিউরেসিস (Enuresis)", "ইনিউরেসিস (Enuresis)"),
                    yhLang("এনকোপ্রেসিস (Encopresis)", "এনকোপ্রেসিস (Encopresis)"),
                    yhLang("ADHD", "ADHD"),
                    yhLang("বিচ্ছিন্নতার ভয়", "বিচ্ছিন্নতার ভয়"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const intro =
                "শৈশব ও কৈশোরে মানসিক চাপ, নির্যাতন বা সমর্থনের অভাবে বিভিন্ন ধরনের মানসিক সমস্যা দেখা দিতে পারে, যা ঘুম, আচরণ ও আবেগে প্রভাব ফেলে।";

              const disorders = [
                {
                  title: "ক) ঘুমের সমস্যা (Sleep Disorders)",
                  description:
                    "শৈশবে শারীরিক, মানসিক বা যৌন নির্যাতনের মতো মানসিক চাপ থাকলে ঘুমের মধ্যে হাঁটা, বিছানা ভিজিয়ে ফেলা, ঘুম নিয়ে দুশ্চিন্তা, দেরিতে ঘুম আসা ও দুঃস্বপ্ন দেখা পর্যন্ত সমস্যা দেখা দেয়।",
                },
                {
                  title: "খ) মলমূত্র ত্যাগজনিত সমস্যা (Elimination Disorder)",
                  description:
                    "শিশু উপযুক্ত স্থানে মলমূত্র ত্যাগ করতে না শেখার ফলে এই সমস্যা দেখা দেয়। ৪ বছর বয়সী শিশু যদি অনুপযুক্ত স্থানে মলত্যাগ করে তবে তাকে এনকোপ্রেসিস (Encopresis) বলা হয় এবং ৫ বছর বয়সী শিশু যদি বিছানায় বা পরনের কাপড়ে প্রস্রাব করে তবে তাকে ইনিউরেসিস (Enuresis) বলা হয়।",
                },
                {
                  title: "গ) বিচ্ছিন্নতার ভয় (Separation Anxiety)",
                  description:
                    "এই সমস্যায় আক্রান্ত শিশুরা বিশেষ করে বাবা-মা বা পরিচিত অভিভাবককে ছেড়ে থাকতে পারে না। স্কুলে যেতে চায় না, একটু দূরে গেলেই কান্নাকাটি করে এবং একা কোনো ঘরে থাকতে ভয় পায়।",
                },
                {
                  title: "ঘ) অতিচঞ্চল অমনোযোগিতা (ADHD)",
                  description:
                    "এ ধরনের শিশুরা পড়াশোনা থেকে খেলাধুলা—সব ক্ষেত্রেই মনোযোগ ধরে রাখতে পারে না। ৩–৫ বছর বয়সেই লক্ষণ দেখা দিতে পারে; তারা অতিরিক্ত সক্রিয় হয়ে পড়ে এবং ঝোঁকের বশে কাজ করে ফেলে।",
                },
              ];

              const renderDisorders = (items) =>
                items
                  .map(
                    (item, idx) => `
                      <article class="glass-card p-4 h-100 shadow-sm" data-aos="fade-up" data-aos-delay="${60 +
                        idx * 30}">
                        <h3 class="h6 gradient-text mb-2">${item.title}</h3>
                        <p class="mb-0">${item.description}</p>
                      </article>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "Common childhood mental issues",
                    "শৈশব ও কৈশোরকালীন মানসিক সমস্যাসমূহ"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <p class="mb-0">${intro}</p>
                  </section>

                  <section class="modern-card glass-card menstrual-info-card mt-3" data-aos="fade-up" data-aos-delay="70">
                    <div class="row g-4">
                      ${renderDisorders(disorders)}
                    </div>
                  </section>
                </div>
              `;
            })(),
          },
          {
            id: "ch15-lesson-4",
            title: yhLang(
              "Childhood Behavioral Issues",
              "শৈশব ও কৈশোরকালীন মানসিক সমস্যাসমূহ"
            ),
            icon: "fa-people-arrows",
            gradientClass: "bg-gradient-crimson",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q15d",
                  question: yhLang(
                    "Which disorder features persistent rule-breaking and aggression?",
                    "কোন সমস্যায় সামাজিক নিয়ম ভাঙা ও আক্রমণাত্মক আচরণ দেখা যায়?"
                  ),
                  options: [
                    yhLang("কন্ডাক্ট ডিসঅর্ডার", "কন্ডাক্ট ডিসঅর্ডার"),
                    yhLang("ইনিউরেসিস", "ইনিউরেসিস"),
                    yhLang("সেপারেশন অ্যানজাইটি", "সেপারেশন অ্যানজাইটি"),
                    yhLang("ঘুমের সমস্যা", "ঘুমের সমস্যা"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const behaviorIntro =
                "আচরণগত সমস্যায় আক্রান্ত শিশুরা প্রায়ই বয়স ও সামাজিক মানদণ্ডের সাথে অসামঞ্জস্যপূর্ণ আচরণ করে থাকে। কন্ডাক্ট ডিসঅর্ডার এদের মধ্যে অন্যতম, যেখানে নিয়ম ভাঙা থেকে শুরু করে আক্রমণাত্মকতা পর্যন্ত দেখা যায়।";

              const conductBehaviors = [
                "সামাজিক নিয়ম-শৃঙ্খলা ভঙ্গ করা",
                "স্কুল বা বাড়ি থেকে পালিয়ে যাওয়া",
                "চুরি করা",
                "অন্যের সম্পত্তির ক্ষতি করা",
                "মানুষ ও অন্য প্রাণীর প্রতি আক্রমণাত্মক হওয়া",
                "অকারণে মিথ্যা কথা বলা",
                "নেশা করা",
                "সামাজিক অপরাধের সাথে জড়িয়ে পড়া",
                "পিতা-মাতা ও শিক্ষকের অবাধ্য হওয়া",
              ];

              const renderList = (items) =>
                items
                  .map(
                    (item) => `
                      <li>
                        <i class="fa-solid fa-circle-check"></i>
                        <span>${item}</span>
                      </li>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "Behavioral mental health issues",
                    "শৈশব ও কৈশোরকালীন মানসিক সমস্যাসমূহ"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <p class="mb-0">${behaviorIntro}</p>
                  </section>

                  <section class="modern-card glass-card menstrual-info-card mt-3" data-aos="fade-up" data-aos-delay="70">
                    <h3 class="h6 text-uppercase text-muted mb-3">${yhLang(
                      "কন্ডাক্ট ডিসঅর্ডারের আচরণ",
                      "কন্ডাক্ট ডিসঅর্ডারের আচরণ"
                    )}</h3>
                    <ul class="list-unstyled puberty-list mb-0">
                      ${renderList(conductBehaviors)}
                    </ul>
                  </section>
                </div>
              `;
            })(),
          },
          {
            id: "ch15-lesson-5",
            title: yhLang(
              "Autism Spectrum Disorder",
              "অটিজম স্পেকট্রাম ডিসঅর্ডার"
            ),
            icon: "fa-puzzle-piece",
            gradientClass: "bg-gradient-teal",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q15e",
                  question: yhLang(
                    "Which core areas do autism symptoms primarily affect?",
                    "অটিজমের লক্ষণ প্রধানত কোন ক্ষেত্রগুলোকে প্রভাবিত করে?"
                  ),
                  options: [
                    yhLang("সামাজিক মিথস্ক্রিয়া, যোগাযোগ ও আচরণ", "সামাজিক মিথস্ক্রিয়া, যোগাযোগ ও আচরণ"),
                    yhLang("শুধু শারীরিক শক্তি", "শুধু শারীরিক শক্তি"),
                    yhLang("শুধু খাদ্যাভ্যাস", "শুধু খাদ্যাভ্যাস"),
                    yhLang("শুধু ঘুম", "শুধু ঘুম"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const intro =
                "অটিজম একটি স্নায়ুবিকাশজনিত সমস্যা, যাতে সামাজিক সম্পর্ক স্থাপন, আশেপাশের পরিবেশ ও ব্যক্তির সাথে যোগাযোগের সমস্যা এবং একই ধরনের আচরণের পুনরাবৃত্তি দেখা যায়।";

              const overview =
                "অটিজমের লক্ষণ সাধারণত তিনটি ক্ষেত্রে বিভক্ত: সামাজিক মিথস্ক্রিয়া, যোগাযোগ এবং আচরণগত বৈশিষ্ট্য।";

              const socialItems = [
                {
                  title: "চোখে চোখ রেখে কথা বলার অভাব",
                  description:
                    "অটিজম আক্রান্ত শিশুরা প্রায়ই চোখে চোখ রেখে কথা বলতে অসুবিধা বোধ করে।",
                },
                {
                  title: "অনুভূতি বোঝার ক্ষমতার অভাব",
                  description:
                    "অন্যদের অনুভূতি বা মানসিক অবস্থা বোঝা ও প্রতিক্রিয়া জানানোর ক্ষমতা কম থাকে।",
                },
                {
                  title: "বন্ধুত্ব স্থাপনের সমস্যা",
                  description:
                    "তারা সাধারণত অন্য শিশুদের সাথে খেলতে বা বন্ধুত্ব করতে সমস্যায় পড়ে।",
                },
                {
                  title: "সামাজিক সংকেত বোঝার ঘাটতি",
                  description:
                    "সামাজিক নিয়ম বা সংকেত বুঝতে এবং অনুসরণ করতে অসুবিধা হয়।",
                },
              ];

              const communicationItems = [
                {
                  title: "বিলম্বিত ভাষার বিকাশ",
                  description:
                    "অনেক সময় অটিজম আক্রান্ত শিশুরা কথা বলা শুরু করতে দেরি করে।",
                },
                {
                  title: "অস্বাভাবিক ভাষার ব্যবহার",
                  description:
                    "একই শব্দ বা বাক্যাংশ বারবার পুনরাবৃত্তি করতে দেখা যায়।",
                },
                {
                  title: "অভিব্যক্তি ব্যাখ্যা করতে সমস্যা",
                  description:
                    "অভিব্যক্তি ও মুখের অভিব্যক্তি বোঝাতে বা সঠিকভাবে ব্যবহার করতে অসুবিধা হয়।",
                },
                {
                  title: "দুর্বল কথোপকথন",
                  description:
                    "কথা বলায় অনিচ্ছা প্রকাশ করে বা এক শব্দে উত্তর দেয়।",
                },
              ];

              const behaviorItems = [
                {
                  title: "নির্দিষ্ট রুটিনে অটল থাকা",
                  description:
                    "একটি নির্দিষ্ট রুটিন বা কার্যকলাপ পরিবর্তনে কঠিন মনে হয়।",
                },
                {
                  title: "নির্দিষ্ট বিষয় বা বস্তুতে অতিরিক্ত আগ্রহ",
                  description:
                    "কিছু নির্দিষ্ট বিষয় বা বস্তুর প্রতি অতিরিক্ত মনোযোগ দেয়।",
                },
                {
                  title: "সংবেদনশীলতা",
                  description:
                    "আলো, শব্দ বা স্পর্শের প্রতি অতিরিক্ত সংবেদনশীল হতে পারে।",
                },
                {
                  title: "আচরণগত পুনরাবৃত্তি",
                  description:
                    "একই কাজ বা আচরণ বারবার করে।",
                },
              ];

              const renderDetailedList = (items) =>
                items
                  .map(
                    (item) => `
                      <li>
                        <i class="fa-solid fa-circle-check"></i>
                        <div>
                          <strong>${item.title}:</strong>
                          <span>${item.description}</span>
                        </div>
                      </li>
                    `
                  )
                  .join("");

              const renderColumn = (title, items, delay) => `
                <div class="col-lg-4" data-aos="fade-up" data-aos-delay="${delay}">
                  <article class="glass-card p-4 h-100 shadow-sm">
                    <h3 class="h6 gradient-text mb-3">${title}</h3>
                    <ul class="list-unstyled puberty-list mb-0">
                      ${renderDetailedList(items)}
                    </ul>
                  </article>
                </div>
              `;

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "Understanding autism spectrum disorder",
                    "অটিজম স্পেকট্রাম ডিসঅর্ডার"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <p class="mb-3">${intro}</p>
                    <p class="mb-0">${overview}</p>
                  </section>

                  <section class="modern-card glass-card menstrual-info-card mt-3" data-aos="fade-up" data-aos-delay="70">
                    <div class="row g-4">
                      ${renderColumn("১. সামাজিক মিথস্ক্রিয়ার সমস্যা", socialItems, 70)}
                      ${renderColumn("২. যোগাযোগের সমস্যা", communicationItems, 90)}
                      ${renderColumn("৩. আচরণগত বৈশিষ্ট্য", behaviorItems, 110)}
                    </div>
                  </section>
                </div>
              `;
            })(),
          },
          {
            id: "ch15-lesson-6",
            title: yhLang(
              "Intellectual Disability",
              "বুদ্ধি প্রতিবন্ধিতা"
            ),
            icon: "fa-lightbulb",
            gradientClass: "bg-gradient-emerald",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q15f",
                  question: yhLang(
                    "When does intellectual disability typically become apparent?",
                    "বুদ্ধি প্রতিবন্ধিতা সাধারণত কখন প্রকাশ পায়?"
                  ),
                  options: [
                    yhLang("১৮ বছরের আগেই", "১৮ বছরের আগেই"),
                    yhLang("২৫ বছরের পরে", "২৫ বছরের পরে"),
                    yhLang("৪০ বছরের পরে", "৪০ বছরের পরে"),
                    yhLang("৬০ বছরের পরে", "৬০ বছরের পরে"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const intro =
                "শৈশবে মানসিক আঘাত পাওয়া কিংবা গর্ভাবস্থায় মায়ের প্রতি নির্যাতনের কারণে গর্ভস্থ সন্তানের মস্তিষ্কের বিকাশ ব্যাহত হয়ে বুদ্ধি প্রতিবন্ধিতা সৃষ্টি হতে পারে।";

              const traits = [
                "বুদ্ধিমত্তা সমবয়সী শিশুদের তুলনায় কম থাকে",
                "পরিবেশের সাথে খাপ খাওয়াতে পারে না",
                "পড়াশোনায় অগ্রগতি হয় না",
                "১৮ বছরের আগেই এ সমস্যা দেখা দেয়",
              ];

              const moodSection = {
                title: "জ) আবেগজনিত সম্পর্কিত সমস্যা",
                description: "আবেগজনিত সমস্যার দুইটি রূপ দেখা যায়:",
                list: ["বিষণ্নতা", "প্যানিক"],
              };

              const renderTraits = (items) =>
                items
                  .map(
                    (item) => `
                      <li>
                        <i class="fa-solid fa-circle-check"></i>
                        <span>${item}</span>
                      </li>
                    `
                  )
                  .join("");

              const renderMoodList = (items) =>
                items
                  .map(
                    (item) => `
                      <li>
                        <span>${item}</span>
                      </li>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "Understanding intellectual disability",
                    "বুদ্ধি প্রতিবন্ধিতা"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <p class="mb-0">${intro}</p>
                  </section>

                  <section class="modern-card glass-card menstrual-info-card mt-3" data-aos="fade-up" data-aos-delay="70">
                    <h3 class="h6 text-uppercase text-muted mb-3">${yhLang(
                      "বুদ্ধি প্রতিবন্ধিতার বৈশিষ্ট্য",
                      "বুদ্ধি প্রতিবন্ধিতার বৈশিষ্ট্য"
                    )}</h3>
                    <ul class="list-unstyled puberty-list mb-0">
                      ${renderTraits(traits)}
                    </ul>
                  </section>

                  <section class="modern-card glass-card menstrual-info-card mt-3" data-aos="fade-up" data-aos-delay="90">
                    <h3 class="h6 gradient-text mb-2">${moodSection.title}</h3>
                    <p class="mb-2">${moodSection.description}</p>
                    <ul class="list-inline mb-0">
                      ${renderMoodList(moodSection.list)}
                    </ul>
                  </section>
                </div>
              `;
            })(),
          },
          {
            id: "ch15-lesson-7",
            title: yhLang("Depression", "বিষণ্নতা"),
            icon: "fa-face-frown",
            gradientClass: "bg-gradient-rose",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q15g",
                  question: yhLang(
                    "Which areas of life can depression impact?",
                    "বিষণ্নতা জীবনের কোন কোন দিককে প্রভাবিত করে?"
                  ),
                  options: [
                    yhLang(
                      "আবেগ, চিন্তা, কর্মক্ষমতা ও শারীরিক পরিবর্তন",
                      "আবেগ, চিন্তা, কর্মক্ষমতা ও শারীরিক পরিবর্তন"
                    ),
                    yhLang("শুধু অর্থনৈতিক জীবন", "শুধু অর্থনৈতিক জীবন"),
                    yhLang("শুধু শারীরিক শক্তি", "শুধু শারীরিক শক্তি"),
                    yhLang("শুধু সামাজিক যোগাযোগ", "শুধু সামাজিক যোগাযোগ"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const intro =
                "বিষণ্নতা হল একটি মানসিক অবস্থা যা একজন ব্যক্তির চিন্তা, অনুভূতি এবং আচরণকে প্রভাবিত করতে পারে। বিষণ্নতায় আক্রান্ত ব্যক্তির নিম্নলিখিত বৈশিষ্ট্যগুলো দেখা যায়।";

              const tableSections = [
                {
                  title: "আবেগ/অনুভূতি",
                  items: [
                    "মনমরা",
                    "শূন্যতা বোধ",
                    "অপরাধবোধ",
                    "অসহায় বোধ",
                    "হতাশ",
                    "বিরক্ত",
                    "কোনো কিছুতে আনন্দ না পাওয়া",
                  ],
                },
                {
                  title: "চিন্তা",
                  items: [
                    "নেতিবাচক চিন্তা / মনোযোগের অভাব",
                    "সিদ্ধান্তহীনতা",
                    "বারবার মৃত্যু কামনা করা বা আত্মহত্যার চিন্তা করা",
                  ],
                },
                {
                  title: "কর্মক্ষমতা",
                  items: [
                    "অল্পতেই ক্লান্ত হয়ে পড়া",
                    "কর্মক্ষমতা হ্রাস",
                    "যেকোনো কাজে অনীহা",
                    "গুছিয়ে কাজ করতে না পারা",
                    "সামাজিক যোগাযোগ থেকে নিজেকে গুটিয়ে নেওয়া",
                  ],
                },
                {
                  title: "শারীরিক পরিবর্তন",
                  items: [
                    "ঘুম বেশি বা কম হওয়া",
                    "ওজন বেড়ে বা কমে যাওয়া",
                    "ক্ষুধা বেড়ে বা কমে যাওয়া",
                    "অস্বাভাবিক ব্যথা",
                    "যৌন চাহিদা কমে যাওয়া",
                  ],
                },
              ];

              const renderList = (items) =>
                items
                  .map(
                    (item) => `
                      <li>
                        <i class="fa-solid fa-circle-check"></i>
                        <span>${item}</span>
                      </li>
                    `
                  )
                  .join("");

              const renderHeader = (sections) =>
                sections
                  .map(
                    (section) => `
                      <th scope="col">${section.title}</th>
                    `
                  )
                  .join("");

              const renderBodyRow = (sections) =>
                sections
                  .map(
                    (section) => `
                      <td>
                        <ul class="list-unstyled puberty-list mb-0">
                          ${renderList(section.items)}
                        </ul>
                      </td>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "Understanding depression",
                    "বিষণ্নতা"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <p class="mb-0">${intro}</p>
                  </section>

                  <section class="modern-card glass-card menstrual-info-card mt-3" data-aos="fade-up" data-aos-delay="70">
                    <div class="table-responsive">
                      <table class="table table-bordered align-middle depression-table">
                        <thead>
                          <tr>
                            ${renderHeader(tableSections)}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            ${renderBodyRow(tableSections)}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>
                </div>
              `;
            })(),
          },
          {
            id: "ch15-lesson-8",
            title: yhLang("Childhood Depression", "শৈশবকালীন বিষণ্নতা"),
            icon: "fa-children",
            gradientClass: "bg-gradient-indigo",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q15h",
                  question: yhLang(
                    "Which of these behaviors may signal childhood depression?",
                    "নিচের কোন আচরণটি শৈশবকালীন বিষণ্নতার লক্ষণ হতে পারে?"
                  ),
                  options: [
                    yhLang("অকারণে কান্নাকাটি করা", "অকারণে কান্নাকাটি করা"),
                    yhLang("অতিরিক্ত ঘুম না পেয়ে থাকা", "অতিরিক্ত ঘুম না পেয়ে থাকা"),
                    yhLang("শুধু বেশি খাওয়া", "শুধু বেশি খাওয়া"),
                    yhLang("শুধু বেশি পড়াশোনা করা", "শুধু বেশি পড়াশোনা করা"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const intro =
                "শৈশবকাল হতেই বিষণ্নতার শিকার হতে পারে কোনো কোনো শিশু; বিশেষ করে যারা শারীরিক, মানসিক, যৌন নির্যাতনের শিকার হয়েছে। তবে প্রাপ্তবয়স্কদের বিষণ্নতার সাথে শৈশবকালীন বিষণ্নতার লক্ষণসমূহে কিছুটা পার্থক্য রয়েছে। যেমন:";

              const symptoms = [
                "অকারণে কান্নাকাটি করে",
                "মেজাজ খুব খিটখিটে হয়ে যায়, অকারণে রাগ করে",
                "পড়াশোনা, খেলাধুলা সবকিছুর প্রতি আগ্রহ হারিয়ে ফেলে এবং আনন্দ পায় না",
                "খাদ্যগ্রহণে অনীহা দেখা দেয়",
                "অল্পতেই ক্লান্ত বোধ করে ও মনোযোগ কমে যায়",
                "অহেতুক শারীরিক সমস্যার কথা বলে",
              ];

              const manicPara =
                "সাধারণত, প্যানিক অবস্থা বাইপোলার ডিসঅর্ডারের একটি অংশ হিসেবে দেখা যায়, যেখানে ব্যক্তি প্যানিক এবং বিষণ্ন অবস্থার মধ্যে চক্কর ঘুরতে থাকে। প্যানিক অবস্থায় তাদের মধ্যে স্বাভাবিকের থেকে বেশি মাত্রায় সবকিছুতে আগ্রহ ও উৎসাহ, অতিমাত্রায় আনন্দ ও উৎফুল্লতা, যৌন চাহিদা বেড়ে যাওয়া, ঘুম কমে যাওয়া, বেশি কথা বলার প্রবণতা এবং নিজের সম্পর্কে উচ্চ ধারণা পোষণ করতে দেখা যায় যেমন বেশি বেশি কেনাকাটা করা, অতিরিক্ত সাজগোজ করা, খরচ করার প্রবণতা ইত্যাদি। কেউ কেউ উত্তেজিত হয়ে আগ্রাসী আচরণ করে। অর্থাৎ বিষণ্নতার বিপরীত চিত্র দেখা যায়। এ ক্ষেত্রে বিশেষ চিকিৎসকের পরামর্শ অনুযায়ী ওষুধ সেবন করতে হবে।";

              const renderSymptoms = (items) =>
                items
                  .map(
                    (item) => `
                      <li>
                        <i class="fa-solid fa-circle-check"></i>
                        <span>${item}</span>
                      </li>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "Understanding childhood depression",
                    "শৈশবকালীন বিষণ্নতা"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <p class="mb-0">${intro}</p>
                  </section>

                  <section class="modern-card glass-card menstrual-info-card mt-3" data-aos="fade-up" data-aos-delay="70">
                    <ul class="list-unstyled puberty-list mb-0">
                      ${renderSymptoms(symptoms)}
                    </ul>
                  </section>

                  <section class="modern-card glass-card menstrual-info-card mt-3" data-aos="fade-up" data-aos-delay="90">
                    <h3 class="h6 gradient-text mb-2">২) ম্যানিক</h3>
                    <p class="mb-0">${manicPara}</p>
                  </section>
                </div>
              `;
            })(),
          },
          {
            id: "ch15-lesson-9",
            title: yhLang("Anxiety Disorder", "অতি উদ্বিগ্নতা"),
            icon: "fa-heart-pulse",
            gradientClass: "bg-gradient-orange",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q15i",
                  question: yhLang(
                    "Which statement describes conversion disorder?",
                    "কনভার্সন ডিসঅর্ডারকে কোন বিবরণটি বোঝায়?"
                  ),
                  options: [
                    yhLang(
                      "দুশ্চিন্তার কারণে শারীরিক সমস্যার প্রকাশ",
                      "দুশ্চিন্তার কারণে শারীরিক সমস্যার প্রকাশ"
                    ),
                    yhLang("শুধু শারীরিক আঘাত", "শুধু শারীরিক আঘাত"),
                    yhLang("শুধু খাদ্যাভ্যাস", "শুধু খাদ্যাভ্যাস"),
                    yhLang("শুধু ঘুম", "শুধু ঘুম"),
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              const intro =
                "অতি উদ্বিগ্নতা হলো এক ধরনের মানসিক সমস্যায যেখানে অতিরিক্ত এবং অনিয়মিত উদ্বেগ ও দুশ্চিন্তা দেখা যায়, যা স্বাভাবিক জীবনযাত্রাকে ব্যাহত করে।";

              const sections = [
                {
                  title: "১) সার্বিক উদ্বিগ্নতা (Generalized Anxiety Disorder)",
                  description:
                    "এক্ষেত্রে ব্যক্তির মধ্যে সারাক্ষণই বিভিন্ন বিষয় নিয়ে দুশ্চিন্তা হতে থাকে।",
                },
                {
                  title: "২) সামাজিক ভীতি (Social Anxiety Disorder)",
                  description:
                    "এক্ষেত্রে ব্যক্তি সামাজিক পরিস্থিতিতে লজ্জিত, অপমানিত এবং ঠাট্টার পাত্র হতে পারে ভেবে আতঙ্কিত বা দুশ্চিন্তাগ্রস্ত থাকে।",
                },
              ];

              const panicDescription =
                "প্যানিক অ্যাটাক সাধারণত ব্যক্তি যখন কোনো বড় খোলা জায়গা বা বন্ধ জায়গাতে যায়, কোথাও একা থাকে, লিফটে, যানবাহনে ভ্রমণ করে, জনসমাগমে বা ভিড়ের মধ্যে যায় তখন তার দমবন্ধ বোধ হয়, জ্ঞান হারানোর ভয় হয়, অসাড় হয়ে পড়ে।";

              const panicFeatures = [
                "নিশ্বাস বন্ধ হয়ে আসা",
                "বুক ধরফর করা",
                "উদ্বিগ্নতা",
                "মাংসপেশীতে টান",
                "জ্ঞান হারিয়ে ফেলা",
                "বুকে তীব্র ব্যথা",
                "তীব্র আতঙ্ক",
                "অস্থিরতা",
                "অতিরিক্ত ঘেমে যাওয়া",
                "অসাড়তার মত বৈশিষ্ট্যসমূহ",
              ];

              const conversionDescription =
                "দুশ্চিন্তাজনিত কারণে যখন শারীরিক সমস্যা দেখা দেয়, তখন তাকে কনভার্সন ডিসঅর্ডার বলে। কনভার্সন ডিসঅর্ডারের বৈশিষ্ট্যগুলো হচ্ছে:";

              const conversionFeatures = [
                "হাত-পা নড়াচড়াতে, চলাফেরা করতে সমস্যা হওয়া, দুর্বলতা বা অবশ অনুভব করা",
                "দেখা, শোনা, ঘ্রাণ পাওয়া, স্পর্শ অনুভব করা বা স্বাদ গ্রহণের সক্ষমতা লোপ পাওয়া",
                "মূর্ছা যাওয়া/চেতনাশূন্য হয়ে যাওয়া",
                "শারীরিক কোনো কারণ খুঁজে পাওয়া যায় না",
                "কোনো কিছু নিয়ে দ্বিধা-দ্বন্দ্ব থাকা বা মনের উপর চাপ অনুভব করা",
              ];

              const ptsdDescription =
                "ভয়াবহ কোনো দুর্ঘটনার সম্মুখীন হলে বা কোনো নেতিবাচক অভিজ্ঞতার শিকার হলে ব্যক্তির মধ্যে কিছু মানসিক সমস্যা দেখা দেয়। এই সমস্যাগুলো যদি দুর্ঘটনা ঘটার এক মাস বা তার অধিক সময় স্থায়ী হয় তখন তাকে দুর্ঘটনা-পরবর্তী মানসিক আঘাতজনিত বিকলতা বলে।";

              const ptsdFeatures = [
                "দুর্যোগ স্মৃতি বারবার মনে পড়া",
                "দুর্যোগ সংশ্লিষ্ট উদ্দীপককে এড়িয়ে চলা",
                "অতিমাত্রায় সজাগ থাকা (যেমন ঘুমের সমস্যা, বিরক্তভাব, হঠাৎ রেগে যাওয়া, মনোনিবেশ করতে না পারা, অতি সতর্কভাব, চমকে ওঠা)",
              ];

              const renderList = (items) =>
                items
                  .map(
                    (item) => `
                      <li>
                        <i class="fa-solid fa-circle-check"></i>
                        <span>${item}</span>
                      </li>
                    `
                  )
                  .join("");

              const renderSimpleSection = (section, delay) => `
                <section class="modern-card glass-card menstrual-info-card mt-3" data-aos="fade-up" data-aos-delay="${delay}">
                  <h3 class="h6 gradient-text mb-2">${section.title}</h3>
                  <p class="mb-0">${section.description}</p>
                </section>
              `;

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "Understanding anxiety disorder",
                    "অতি উদ্বিগ্নতা"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <p class="mb-0">${intro}</p>
                  </section>

                  ${sections
                    .map((section, index) => renderSimpleSection(section, 70 + index * 20))
                    .join("")}

                  <section class="modern-card glass-card menstrual-info-card mt-3" data-aos="fade-up" data-aos-delay="110">
                    <h3 class="h6 gradient-text mb-2">৩) প্যানিক অ্যাটাক (Panic Attack)</h3>
                    <p class="mb-3">${panicDescription}</p>
                    <p class="mb-2">এক্ষেত্রে নিশ্বাস বন্ধ হয়ে আসা, বুক ধরফর করা, উদ্বিগ্নতা, মাংসপেশীতে টান, জ্ঞান হারিয়ে ফেলা, বুকে তীব্র ব্যথা, তীব্র আতঙ্ক, অস্থিরতা, অতিরিক্ত ঘেমে যাওয়া ও অসাড়তার মত বৈশিষ্ট্যসমূহ দেখা যায়।</p>
                    <ul class="list-unstyled puberty-list mb-0">
                      ${renderList(panicFeatures)}
                    </ul>
                  </section>

                  <section class="modern-card glass-card menstrual-info-card mt-3" data-aos="fade-up" data-aos-delay="130">
                    <h3 class="h6 gradient-text mb-2">৪) কনভার্সন ডিসঅর্ডার (Conversion Disorder)</h3>
                    <p class="mb-3">${conversionDescription}</p>
                    <ul class="list-unstyled puberty-list mb-0">
                      ${renderList(conversionFeatures)}
                    </ul>
                  </section>

                  <section class="modern-card glass-card menstrual-info-card mt-3" data-aos="fade-up" data-aos-delay="150">
                    <h3 class="h6 gradient-text mb-2">৫) দুর্ঘটনা-পরবর্তী মানসিক আঘাতজনিত সমস্যা (Post Traumatic Stress Disorder)</h3>
                    <p class="mb-3">${ptsdDescription}</p>
                    <p class="mb-2">এক্ষেত্রে—</p>
                    <ul class="list-unstyled puberty-list mb-0">
                      ${renderList(ptsdFeatures)}
                    </ul>
                    <p class="mt-3 mb-0">ইত্যাদি বৈশিষ্ট্যসমূহ দেখা যায়।</p>
                  </section>
                </div>
              `;
            })(),
          },
        ],
      },
      {
        id: "ch-16",
        title: yhLang(
          "Module-16: Adolescent Mental Health -  Problems and Solutions",
          "মডিউল-১৬: কৈশোর মানসিক স্বাস্থ্য—সমস্যা ও সমাধান"
        ),
        lessons: [],
      },
      {
        id: "ch-17",
        title:
          yhLang(
            "Module-17: Psychosocial changes and Psychosocial complications during adolescence",
            "মডিউল-১৭: কৈশোরে মনোসামাজিক পরিবর্তন ও জটিলতা"
          ),
        lessons: [],
      },
      {
        id: "ch-18",
        title: yhLang(
          "Module-18: Psychosocial support for adolescents",
          "মডিউল-১৮: কৈশোরে মনোসামাজিক সহায়তা"
        ),
        lessons: [],
      },
      {
        id: "ch-19",
        title: yhLang(
          "Module-19: Drug addiction - Consequences and prevention",
          "মডিউল-১৯: মাদকাসক্তি—পরিণতি ও প্রতিরোধ"
        ),
        lessons: [],
      },
      {
        id: "ch-20",
        title: yhLang(
          "Module-20: Special care for vulnerable adolescents",
          "মডিউল-২০: ঝুঁকিপূর্ণ কিশোর-কিশোরীর বিশেষ যত্ন"
        ),
        lessons: [],
      },
      {
        id: "ch-21",
        title: yhLang(
          "Module-21: Climate change and special attention to adolescents",
          "মডিউল-২১: জলবায়ু পরিবর্তন ও কিশোর-কিশোরীর বিশেষ সুরক্ষা"
        ),
        lessons: [],
      },
      {
        id: "ch-22",
        title: yhLang(
          "Module-22: Injury prevention and first aid for adolescents",
          "মডিউল-২২: কিশোরদের আঘাত প্রতিরোধ ও প্রাথমিক চিকিৎসা"
        ),
        lessons: [],
      },
      {
        id: "ch-23",
        title: yhLang(
          "Module-23: Life skills, morality, and values",
          "মডিউল-২৩: জীবনদক্ষতা, নৈতিকতা ও মূল্যবোধ"
        ),
        lessons: [],
      },
      {
        id: "ch-24",
        title: yhLang(
          "Module-24: Communication and counseling with adolescents",
          "মডিউল-২৪: কিশোরদের সঙ্গে যোগাযোগ ও পরামর্শ"
        ),
        lessons: [],
      },
      {
        id: "ch-25",
        title:
          yhLang(
            "Module-25: Human Rights, Child Rights, and Sexual and Reproductive Health Rights",
            "মডিউল-২৫: মানবাধিকার, শিশুর অধিকার ও যৌন ও প্রজনন স্বাস্থ্য অধিকার"
          ),
        lessons: [],
      },
    ],
    // Flat lessons kept for backward compatibility (legacy renderers)
    // Legacy steps array for backward compatibility
    steps: [],
  },
];


