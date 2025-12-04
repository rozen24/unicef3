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
        ],
      },
      {
        id: "ch-10",
        title:
          yhLang(
            "Module-10: HPV vaccination and prevention of cervical cancer in adolescents",
            "মডিউল-১০: এইচপিভি টিকা ও কৈশোরে জরায়ুমুখ ক্যান্সার প্রতিরোধ"
          ),
        lessons: [],
      },
      {
        id: "ch-11",
        title: yhLang(
          "Module-11: Polycystic ovary syndrome (PCOS) in adolescents",
          "মডিউল-১১: কৈশোরে পলিসিস্টিক ওভারি সিনড্রোম (পিসিওএস)"
        ),
        lessons: [],
      },
      {
        id: "ch-12",
        title:
          yhLang(
            "Module-12: Adolescent nutrition: Nutritional deficiency and prevention",
            "মডিউল-১২: কৈশোর পুষ্টি—ঘাটতি ও প্রতিরোধ"
          ),
        lessons: [],
      },
      {
        id: "ch-13",
        title:
          yhLang(
            "Module-13: Non-communicable diseases (NCDs) in adolescents and their prevention",
            "মডিউল-১৩: কৈশোরে অসংক্রামক রোগ ও প্রতিরোধ"
          ),
        lessons: [],
      },
      {
        id: "ch-14",
        title: yhLang(
          "Module-14: Sex, Gender and Gender Discrimination",
          "মডিউল-১৪: লিঙ্গ, জেন্ডার ও বৈষম্য"
        ),
        lessons: [],
      },
      {
        id: "ch-16",
        title: yhLang(
          "Module-15: Violence Related to Adolescents",
          "মডিউল-১৫: কৈশোরে সহিংসতা"
        ),
        lessons: [],
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


