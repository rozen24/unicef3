// Young Health LMS - Course Data

const coursesData = [
  {
    id: "yhap-course",
    title: "Young Health Ambassador Programme",
    description:
      "Comprehensive training program for Young Health Ambassadors covering health literacy, advocacy, and community leadership.",
    duration: "10 Lessons",
    level: "Comprehensive",
    imageUrl:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    enrolled: 0,
    // Chapterized structure
    chapters: [
      {
        id: "ch-1",
        title:
          "Module-1: Introduction of Young Health Ambassador Program (YHAP)",
        lessons: [
          // Understanding YHAP
          {
            id: "ch1-lesson-1",
            title: "Understanding Young Health Ambassador Programme",
            icon: "fa-heartbeat",
            gradientClass: "bg-gradient-purple",
            audioFile: "1.mp3",
            quiz: {
              passingScore: 80,
              questions: [
                {
                  id: "q1a",
                  question: "What age defines young per UN?",
                  options: ["15-24", "10-19", "18-29", "12-21"],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              // reuse existing lesson-1 content
              return `
              <div class="lesson-slide">
              <h2 class="slide-title gradient-text gradient-text-hover hover-lift-sm transition-base" data-aos="fade-up">Young Health Ambassador Programme</h2>
              <div class="floating-bg" aria-hidden="true">
                <span class="float-elem" style="top:8%; left:6%; width:70px; height:70px;"></span>
                <span class="float-elem" style="top:35%; right:10%; width:90px; height:90px;"></span>
                <span class="float-elem" style="bottom:12%; left:14%; width:80px; height:80px;"></span>
              </div>

                <div class="row g-3 mt-2">
                  <div class="col-md-12">
                  <div class="definition-card hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover" data-aos="fade-up" data-aos-delay="160">
                    <h4 class="gradient-text transition-base"><i class="fas fa-heartbeat me-2 animate-float"></i>Health</h4>
                    <p>As per World Health Organization (WHO), health is defined as a state of complete physical, mental, and social well-being, and not merely the absence of disease or infirmity.</p>
                  </div>
                  </div>
                  <div class="col-md-12">
                  <div class="definition-card hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover" data-aos="fade-up" data-aos-delay="200">
                    <h4 class="gradient-text transition-base"><i class="fas fa-child-reaching me-2 animate-float"></i>Adolescence</h4>
                    <p>According to World Health Organization (WHO), adolescence is the phase of life between childhood and adulthood, from ages 10 to 19. Adolescents experience rapid physical, cognitive and psychosocial growth. This affects how they feel, think, make decisions, and interact with the world around them.</p>
                  </div>
                  </div>
                  <div class="col-md-12">
                  <div class="definition-card hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover" data-aos="fade-up" data-aos-delay="240">
                    <h4 class="gradient-text transition-base"><i class="fas fa-user-group me-2 animate-float"></i>Youth</h4>
                    <p>As per United Nations (UN), youth refers to those persons aged between the ages of 15 and 24 without prejudice to other definitions by Member States. It is a period of transition from the dependence of childhood to adulthood’s independence.</p>
                  </div>
                  </div>
                  <div class="col-md-12">
                  <div class="definition-card hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover" data-aos="fade-up" data-aos-delay="280">
                    <h4 class="gradient-text transition-base"><i class="fas fa-users-between-lines me-2 animate-float"></i>Young people</h4>
                    <p>According to the World Health Organization (WHO), "young people" are defined as individuals between the ages of 10 and 24.</p>
                  </div>
                  </div>
                </div>
                <div class="program-intro d-none hover-lift-sm transition-base" data-aos="fade-up" data-aos-delay="100">
                  <h4 class="gradient-text transition-base"><i class="fa-solid fa-lightbulb me-2 animate-float"></i>About YHAP</h4>
                  <p>The Young Health Ambassador Program (YHAP) is a strategic joint initiative of the Ministry of Health and Family Welfare (MOHFW) and UNICEF. The program is designed to empower youth by enhancing their health awareness and building their capacity in primary prevention and health promotion thereby equipping them to serve as informed health ambassador.</p></br>

                  <p>This program equips young person with knowledge and skills in areas like physical health including sexual and reproductive health, nutrition, mental wellbeing etc.  enabling them to become active advocates for health and influence healthier choices within their communities and networks.</p>
                </div>
              </div>`;
            })(),
          },
          // Age progression (inserted after Lesson 1)
          {
            id: "ch1-lesson-2",
            title: "Age Progression: Adolescence to Young Adulthood (10–24)",
            icon: "fa-children",
            gradientClass: "bg-gradient-violet",
            audioFile: "",
            quiz: {
              passingScore: 70,
              questions: [
                {
                  id: "q1a-ages-1",
                  question: "Which range is considered Mid Adolescence?",
                  options: [
                    "10–13 years",
                    "14–16 years",
                    "17–19 years",
                    "20–24 years",
                  ],
                  correctAnswer: 1,
                },
              ],
            },
            content: (function () {
              return `
            <div class="lesson-slide">
              <h2 class="slide-title gradient-text gradient-text-hover hover-lift-sm transition-base" data-aos="fade-up">Understanding Age Groups (10–24)</h2>
              <div class="floating-bg" aria-hidden="true">
                <span class="float-elem" style="top:8%; left:6%; width:64px; height:64px;"></span>
                <span class="float-elem" style="top:30%; right:8%; width:80px; height:80px;"></span>
                <span class="float-elem" style="bottom:10%; left:12%; width:72px; height:72px;"></span>
              </div>

              <div class="alert alert-primary mb-4 hover-lift-sm transition-base" data-aos="fade-up" data-aos-delay="60">
                <div class="d-flex align-items-center gap-3">
                  <span class="badge bg-primary bg-gradient p-3"><i class="fa-solid fa-users-between-lines"></i></span>
                  <div>
                    <h5 class="mb-1">Who is a “young person”?</h5>
                    <p class="mb-0">According to WHO, <strong>young people are 10–24 years</strong>. Adolescence (10–19) is often described in three stages: <em>Early (10–13)</em>, <em>Mid (14–16)</em>, and <em>Late (17–19)</em> — followed by <em>Young Adulthood (20–24)</em>.</p>
                  </div>
                </div>
              </div>

              <div class="age-legend" data-aos="fade-up" data-aos-delay="100">
                <span class="legend-item"><span class="legend-dot legend-adolescence"></span> Adolescence (10–19)</span>
                <span class="legend-item"><span class="legend-dot legend-young"></span> Young Adulthood (20–24)</span>
              </div>

              <div class="age-track d-flex flex-wrap align-items-stretch justify-content-between gap-3" data-aos="fade-up" data-aos-delay="120">
                ${[
                  {
                    label: "Early Adolescence",
                    range: "10–13",
                    iconA: "fa-child",
                    iconB: "fa-person-dress",
                    color: "gradient-sky",
                    img: "img/age/10-13.png",
                  },
                  {
                    label: "Mid Adolescence",
                    range: "14–16",
                    iconA: "fa-child-reaching",
                    iconB: "fa-person",
                    color: "gradient-emerald",
                    img: "img/age/14-16.png",
                  },
                  {
                    label: "Late Adolescence",
                    range: "17–19",
                    iconA: "fa-person-walking",
                    iconB: "fa-person-dress",
                    color: "gradient-violet",
                    img: "img/age/17-19.png",
                  },
                  {
                    label: "Young Adulthood",
                    range: "20–24",
                    iconA: "fa-user",
                    iconB: "fa-user",
                    color: "gradient-tangerine",
                    img: "img/age/20-24.png",
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
                        } yrs</span>
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
                        <img src="${step.img}" alt="${step.label} ${
                      step.range
                    } years" class="animate-float-slow">
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
                    title: "Early 10–13",
                    icon: "fa-seedling",
                    text: "Rapid growth begins; guidance on body changes and healthy habits is essential.",
                  },
                  {
                    title: "Mid 14–16",
                    icon: "fa-compass",
                    text: "Identity exploration and peer influence increase—support positive choices.",
                  },
                  {
                    title: "Late 17–19",
                    icon: "fa-graduation-cap",
                    text: "Transitions to higher studies or work—build life skills and resilience.",
                  },
                  {
                    title: "Young Adult 20–24",
                    icon: "fa-rocket",
                    text: "Greater independence—focus on wellbeing, employability, and leadership.",
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
            title: "Six pillars that build confident health ambassadors",
            icon: "fa-layer-group",
            gradientClass: "bg-gradient-blue",
            audioFile: "2.mp3",
            quiz: {
              passingScore: 80,
              questions: [
                {
                  id: "q1b",
                  question: "Which pillar focuses on accurate messaging?",
                  options: [
                    "Leadership",
                    "Advocacy",
                    "Health Education & Awareness",
                    "Empowerment",
                  ],
                  correctAnswer: 2,
                },
              ],
            },
            content: (function () {
              return `
          <div class="lesson-slide">
            <h2 class="slide-title gradient-text gradient-text-hover hover-lift-sm transition-base" data-aos="fade-up">Core Components of YHAP</h2>
            <div class="floating-bg" aria-hidden="true">
              <span class="float-elem" style="top:10%; left:8%; width:70px; height:70px;"></span>
              <span class="float-elem" style="bottom:10%; right:12%; width:90px; height:90px;"></span>
            </div>
            <div class="row g-4">${[
              "Health Literacy",
              "Health Education & Awareness",
              "Peer to Peer Influence",
              "Empowerment",
              "Leadership",
              "Advocacy",
            ]
              .map(
                (t, i) => `
              <div class="col-md-6">
                <div class="component-card hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover bg-gradient-${
                  ["purple", "blue", "teal", "orange", "green", "pink"][i]
                } shadow-lg" data-aos="zoom-in" data-aos-delay="${
                  100 + i * 50
                }">
                  <div class="component-icon bg-gradient-${
                    ["purple", "blue", "teal", "orange", "green", "pink"][i]
                  } animate-float"><i class="fas ${
                  [
                    "fa-book-medical",
                    "fa-graduation-cap",
                    "fa-users",
                    "fa-hand-fist",
                    "fa-flag",
                    "fa-bullhorn",
                  ][i]
                }"></i></div>
                  <h5 class="gradient-text transition-base">${t}</h5>
                  <p>${
                    [
                      "YHAP builds foundational health literacy through comprehensive training on essential health and wellbeing. This equips ambassadors with the expertise to act as credible sources of information and effective advocates for prevention of diseases and health promotion.",
                      "Young Health Ambassadors (YHAs) will create health education and awareness through campaigns on key health issues, comprehensive trainings, mentorships etc., Through these multifaceted efforts, they will ensure the accurate dissemination of crucial health information towards fostering well-informed and health-literate communities.",
                      "The programme is built on the principle that peer-to-peer engagement is a powerful catalyst for change. By facilitating supportive mentorship and encouraging positive role-modeling among contemporaries, YHAP leverages the profound impact of shared experiences to promote healthy behaviors.",
                      "YHAP empowers individuals by equipping them with the tools, confidence, and skills needed to take effective control and contribute to the economic development, creating a productive, resilient, and healthy workforce for the future.",
                      "The program cultivates leadership qualities in youth, preparing them to become effective, ethical, and inspiring agents of change in their communities.",
                      "The Youth Health Ambassador Programme (YHAP) builds foundational competencies in health advocacy, empowering youth to effectively raise voice, articulate public health priorities to drive systemic reform. This is achieved through strategic engagement with key stakeholders, evidence-based promotion of policies, and active contribution to the formulation of legislation for strengthening health systems.",
                    ][i]
                  }</p>
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
            title: "Who Am I as a Health Ambassador?",
            icon: "fa-user-shield",
            gradientClass: "bg-gradient-teal",
            audioFile: "3.mp3",
            quiz: {
              passingScore: 80,
              questions: [
                {
                  id: "q1c",
                  question: "Advocacy includes engaging which stakeholders?",
                  options: [
                    "Only peers",
                    "Policy makers and gatekeepers",
                    "Only media",
                    "No one",
                  ],
                  correctAnswer: 1,
                },
              ],
            },
            content: (function () {
              return `
          <div class="lesson-slide">
            <h2 class="slide-title gradient-text gradient-text-hover hover-lift-sm transition-base" data-aos="fade-up">Roles and Responsibilities of Health Ambassador</h2>
            <h3 class="text-center mb-4 gradient-text hover-lift-sm transition-base" data-aos="fade-up" data-aos-delay="50">Who am I?</h3>
            <div class="row g-4">${[
              {
                icon: "fa-shield-heart",
                text: "I am equipped with expertise in safeguarding health and well-being of young people, enabling me to contribute meaningfully to society while harnessing the triple dividend of health, social, and economic benefits.",
              },
              {
                icon: "fa-share-nodes",
                text: "I actively empower my peers by sharing knowledge on health promotion, disease prevention, and holistic well-being, fostering informed decision-making among young people.",
              },
              {
                icon: "fa-handshake",
                text: "Through advocacy, I engage policy makers, stakeholders and community influencer,  gatekeepers to prioritize health and wellbeing of young people, ensuring supportive policies and collaborative action for sustainable well-being.",
              },
              {
                icon: "fa-chart-line",
                text: "I drive awareness and demand creation within communities, inspiring collective responsibility and action towards better health outcomes for adolescents and youth.",
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
            title:
              "Nine interactive steps to become a certified Young Health Ambassador",
            icon: "fa-clipboard-check",
            gradientClass: "bg-gradient-orange",
            audioFile: "4.mp3",
            quiz: {
              passingScore: 80,
              questions: [
                {
                  id: "q1d",
                  question: "Which step confirms identity?",
                  options: [
                    "Registration",
                    "Unique ID Generation",
                    "Assessment",
                    "Certificate download",
                  ],
                  correctAnswer: 1,
                },
              ],
            },
            content: (function () {
              const steps = [
                {
                  text: "Online registration in Young Health Ambassador Program (YHAP)",
                  icon: "fa-pen-to-square",
                  color: "purple",
                },
                {
                  text: "Unique ID Generation",
                  icon: "fa-id-card",
                  color: "blue",
                },
                {
                  text: "Log in to the Website/App",
                  icon: "fa-right-to-bracket",
                  color: "teal",
                },
                {
                  text: "Access Young Health Ambassador Program (YAHP) course",
                  icon: "fa-book-open",
                  color: "orange",
                },
                {
                  text: "Complete YHAP course",
                  icon: "fa-list-check",
                  color: "green",
                },
                {
                  text: "Obtain passing marks in final assessment",
                  icon: "fa-trophy",
                  color: "pink",
                },
                {
                  text: "System generated certificate",
                  icon: "fa-certificate",
                  color: "yellow",
                },
                {
                  text: "Self declaration/Oath Taking",
                  icon: "fa-hand",
                  color: "lavender",
                },
                {
                  text: "Final Certificate (Course validity-2 years)",
                  icon: "fa-award",
                  color: "mint",
                },
              ];
              return `
            <div class="lesson-slide">
            <h2 class="slide-title gradient-text gradient-text-hover hover-lift-sm transition-base" data-aos="fade-up">Eligibility and Steps to be a YHA</h2>
            <div class="alert alert-info mb-4 hover-lift-sm transition-base" data-aos="fade-up" data-aos-delay="50">
              <h5><i class="fas fa-info-circle me-2"></i>Eligibility</h5>
              <p class="mb-0">Any person aged <strong>10-24 years</strong> can become a Young Health Ambassador.</p>
            </div>
            <div class="row g-3">
              ${steps
                .map(
                  (s, i) => `
              <div class="col-md-4" data-aos="fade-up" data-aos-delay="${
                120 + i * 40
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
        title: "Module-2: Global and Bangladesh Scenario",
        lessons: [
          {
            id: "ch2-lesson-1",
            title: "Global Youth Population and Demographics",
            icon: "fa-map-location-dot",
            gradientClass: "bg-gradient-blue",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q2a",
                  question:
                    "What percentage of the world’s youth live in developing countries?",
                  options: ["90%", "75%", "60%", "40%"],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              return `
            <div class="lesson-slide">
              <h2 class="slide-title gradient-text" data-aos="fade-up">Global Youth Population and Demographics</h2>

              <!-- Step 1 – Global Overview global-overview  style="filter: drop-shadow(0 10px 30px rgba(0,0,0,.2));"-->
              <section class="text-center py-5 mb-4" data-aos="fade-up" style="position:relative; overflow:hidden;">
                <div class="container">
                  <img src="img/Distribution/globe.jpg" class="img-fluid mx-auto d-block mb-3 rounded-4 globe-rotate opacity-25 bg-dark" alt="Globe showing youth population">
                  <div class="globe-text-wrap">
                    <h3 class="fw-bold display-5" style="color:#0087D3; text-shadow:0 6px 30px rgba(0,0,0,.25)"><span id="globalCounter" data-target="90">0</span>%</h3>
                    <p class="lead mt-2 text-dark">The world counts <strong>1.8 billion</strong> young people aged 10–24.</p>
                    <p class="mb-0 text-dark">Around <strong>90%</strong> live in developing countries.</p>
                  </div>
                </div>
              </section>

              <!-- Step 2 – Global Youth Population by Region (Map + Doughnut) -->
              <section class="world-youth-map-and-chart py-4 mb-4 rounded-4" data-aos="zoom-in">
                <div class="container">
                  <div class="row g-3 align-items-center">
                    <div class="col-lg-12">
                      <div class="modern-card glass-card h-region">
                        <h5 class="mb-3">Regional Youth Share</h5>
                        <div style="position:relative; height:340px;">
                          <canvas id="regionalShareChart" aria-label="Regional Youth Share" role="img"></canvas>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <!-- Step 3 – Population Pyramid (Chart.js) -->
              <section class="population-pyramid-wrapper py-4 mb-4" data-aos="fade-up">
                <div class="modern-card glass-card">
                  <h5 class="mb-3">Population Pyramid</h5>
                  <div style="position:relative; height:420px;">
                    <canvas id="populationPyramid" aria-label="Population Pyramid" role="img"></canvas>
                  </div>
                </div>
              </section>

              <!-- Step 4 – Bangladesh Focus -->
              <section class="bangladesh-map py-4" data-aos="fade-right">
                <div class="container">
                  <div class="row align-items-center g-3 modern-card glass-card">
                      <div class="col-md-8" style="padding:1.5rem;">
                        <h5>Distribution of Young People</h5>
                        <p>There are over <strong>1.8 billion</strong> youth in the world today, 90 per cent of whom live in developing countries.</p>
                        <p class="mb-0"><strong>Bangladesh:</strong> <strong>49.5 million</strong> young people (~30% of total population).</p>
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
            title: "Why young people’s health and wellbeing is important?",
            icon: "fa-heart-pulse",
            gradientClass: "bg-gradient-green",
            audioFile: "2.mp3",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q2b",
                  question: "Investments in adolescents yield a…",
                  options: [
                    "Single benefit",
                    "No return",
                    "Triple dividend",
                    "Unknown",
                  ],
                  correctAnswer: 2,
                },
              ],
            },
            content: (function () {
              return `
              <div class="lesson-slide">
                <h2 class="slide-title gradient-text" data-aos="fade-up">Why young people’s health and wellbeing is important?</h2>

                <h5 class="mt-2 gradient-text" data-aos="fade-up" data-aos-delay="60">Investments in the current generation of 10–24-year-olds will reap a triple dividend</h5>

                <!-- Triple Dividend Cards -->
                <div class="row g-3 my-2">
                  <div class="col-md-4" data-aos="fade-up" data-aos-delay="120">
                    <div class="modern-card glass-card icon-spin-on-hover dividend-card">
                      <div class="dividend-icon bg-gradient-blue"><i class="fa-solid fa-heart-pulse"></i></div>
                      <h6 class="mb-1">Healthy young population now</h6>
                      <p class="mb-2 text-muted">1.8 billion people aged 10–24 years</p>
                      <span class="badge-pill">1.8B aged 10–24</span>
                    </div>
                  </div>
                  <div class="col-md-4" data-aos="fade-up" data-aos-delay="160">
                    <div class="modern-card glass-card icon-spin-on-hover dividend-card">
                      <div class="dividend-icon bg-gradient-green"><i class="fa-solid fa-briefcase"></i></div>
                      <h6 class="mb-1">Future healthy adult workforce</h6>
                      <p class="mb-0 text-muted">Productive, resilient, skilled</p>
                    </div>
                  </div>
                  <div class="col-md-4" data-aos="fade-up" data-aos-delay="200">
                    <div class="modern-card glass-card icon-spin-on-hover dividend-card">
                      <div class="dividend-icon bg-gradient-orange"><i class="fa-solid fa-baby"></i></div>
                      <h6 class="mb-1">Healthy next generation of children</h6>
                      <p class="mb-0 text-muted">Breaking intergenerational cycles</p>
                    </div>
                  </div>
                </div>

                <!-- ROI Banner -->
                <div class="modern-card glass-card my-3 roi-banner" data-aos="zoom-in" data-aos-delay="240">
                  <div class="d-flex align-items-center justify-content-between flex-wrap gap-3">
                    <div>
                      <h5 class="mb-1">Investing in Adolescent Health & Wellbeing</h5>
                      <p class="mb-0 text-muted">For each US$1 invested, the return is US$5–10.</p>
                    </div>
                    <div class="d-flex align-items-center gap-2 roi-chip">
                      <span class="badge-pill">US$1</span>
                      <i class="fa-solid fa-arrow-right-long"></i>
                      <span class="badge-pill">US$5–10</span>
                    </div>
                  </div>
                </div>

                <!-- Demographic Pyramid Compare -->
                <h5 class="gradient-text mt-4" data-aos="fade-up">Pathways to harnessing the Demographic Dividend</h5>
                <div class="row g-3 pyramid-compare" data-aos="fade-up" data-aos-delay="80">
                  <!-- Positive Path -->
                  <div class="col-lg-12">
                   <div class="wrap-pyramid modern-card glass-card"> 
                      <div class="pyramid-path pyramid-positive">
                        <div class="pyramid-head"><i class="fa-solid fa-chart-line"></i> Demographic Dividend</div>
                        <ul class="pyramid-steps">
                          <li class="pyramid-step" data-aos="fade-up" data-aos-delay="600"><i class="fa-solid fa-school"></i> School</li>
                          <li class="pyramid-step" data-aos="fade-up" data-aos-delay="900"><i class="fa-solid fa-briefcase"></i> Employment</li>
                          <li class="pyramid-step" data-aos="fade-up" data-aos-delay="1200"><i class="fa-solid fa-piggy-bank"></i> Wealth/child investment</li>
                          <li class="pyramid-step"  data-aos="fade-up" data-aos-delay="1500"><i class="fa-solid fa-graduation-cap"></i> Lifelong learning</li>
                          <li class="pyramid-step" data-aos="fade-up" data-aos-delay="1800"><i class="fa-solid fa-people-arrows"></i> Work-life Balance</li>
                          <li class="pyramid-step" data-aos="fade-up" data-aos-delay="2100"><i class="fa-solid fa-location-dot"></i> Security of Place</li>
                          <li class="pyramid-step"  data-aos="fade-up" data-aos-delay="2400"><i class="fa-solid fa-hands-holding-child"></i> Healthy children</li>
                          <li class="pyramid-step"  data-aos="fade-up" data-aos-delay="2700"><i class="fa-solid fa-shield-heart"></i> Secure old-age</li>
                        </ul>
                      </div>

                      <div class="pyramid-center highlight py-3 border-rounded"><i class="fa-solid fa-person-dress"></i> Adolescent Girl </div>
                      <!-- Negative Path -->
                      <div class="pyramid-path pyramid-negative">
                      <ul class="pyramid-steps pyramid-container">
                        <li class="pyramid-step" data-aos="fade-up" data-aos-delay="600"><i class="fa-solid fa-ring"></i> Child Marriage</li>
                        <li class="pyramid-step" data-aos="fade-up" data-aos-delay="900"><i class="fa-solid fa-person-walking-arrow-right"></i> Leaving School</li>
                        <li class="pyramid-step" data-aos="fade-up" data-aos-delay="1200"><i class="fa-solid fa-helmet-safety"></i> Informal work</li>
                        <li class="pyramid-step" data-aos="fade-up" data-aos-delay="1500"><i class="fa-solid fa-rotate"></i> Repeat Pregnancies</li>
                        <li class="pyramid-step" data-aos="fade-up" data-aos-delay="1800"><i class="fa-solid fa-person-pregnant"></i> Maternal morbidity</li>
                        <li class="pyramid-step" data-aos="fade-up" data-aos-delay="2100"><i class="fa-solid fa-child"></i> Child illness & death</li>
                        <li class="pyramid-step" data-aos="fade-up" data-aos-delay="2400"><i class="fa-solid fa-house-crack"></i> Insecurity & Displacement</li>
                        <li class="pyramid-step" data-aos="fade-up" data-aos-delay="2700"><i class="fa-solid fa-shield-halved"></i> Insecure old-age</li>
                      </ul>
                      <div class="pyramid-head py-2"><i class="fa-solid fa-triangle-exclamation"></i> Missed Demographic Dividend</div>
                    </div>
                  </div>                  
                </div>
              </div>`;
            })(),
          },
          {
            id: "ch2-lesson-3",
            title:
              "Global scenario of mortality and morbidity among young people",
            icon: "fa-globe",
            gradientClass: "bg-gradient-purple",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q2c",
                  question: "A leading cause of adolescent death includes…",
                  options: [
                    "Common cold",
                    "Road injuries",
                    "Allergies",
                    "None",
                  ],
                  correctAnswer: 1,
                },
              ],
            },
            content: (function () {
              return `
              <div class="lesson-slide">
                <h2 class="slide-title gradient-text" data-aos="fade-up">Global scenario of mortality and morbidity among young people</h2>

                <!-- Key Global Insights -->
                <section class="my-3" data-aos="fade-up" data-aos-delay="40">
                  <h5 class="gradient-text mb-2">Key global insights</h5>
                  <div class="row g-3">
                    ${[
                      {
                        icon: "fa-heart-pulse",
                        color: "bg-gradient-pink",
                        text: "Globally over <strong>1.5 million</strong> young people aged 10–24 years died in 2021 — about <strong>4500 every day</strong>.",
                      },
                      {
                        icon: "fa-shield-halved",
                        color: "bg-gradient-green",
                        text: "Young adolescents aged <strong>10–14</strong> have the <strong>lowest risk of death</strong> among all age groups.",
                      },
                      {
                        icon: "fa-car-burst",
                        color: "bg-gradient-orange",
                        text: "<strong>Injuries</strong> (including road traffic injuries and drowning), <strong>interpersonal violence</strong>, <strong>self-harm</strong>, and <strong>maternal conditions</strong> are leading causes of death.",
                      },
                      {
                        icon: "fa-brain",
                        color: "bg-gradient-purple",
                        text: "<strong>Half</strong> of all mental health disorders in adulthood start by <strong>age 18</strong>, but most cases are <strong>undetected</strong> and <strong>untreated</strong>.",
                      },
                      {
                        icon: "fa-wine-bottle",
                        color: "bg-gradient-blue",
                        text: "<strong>Early substance use</strong> is linked to higher risks of dependence and other problems in adult life; younger people are <strong>disproportionately affected</strong>.",
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
                  <h5 class="gradient-text mb-2">Top 5 leading causes of death among adolescents are</h5>
                  <div id="topCausesControls" class="d-flex gap-2 my-2">
                    <button class="btn btn-outline-primary btn-sm active" id="topCausesToggleChart"><i class="fa-solid fa-chart-bar me-1"></i> Chart</button>
                    <button class="btn btn-outline-primary btn-sm" id="topCausesToggleCards"><i class="fa-solid fa-grip me-1"></i> Cards</button>
                  </div>
                  <div id="topCausesCards" style="display:none">
                    <div class="row g-3">
                      ${[
                        {
                          label: "Road traffic accident",
                          icon: "fa-car-burst",
                          color: "bg-gradient-orange",
                        },
                        {
                          label: "Suicide",
                          icon: "fa-heart-crack",
                          color: "bg-gradient-pink",
                        },
                        {
                          label: "Violence",
                          icon: "fa-hand-fist",
                          color: "bg-gradient-green",
                        },
                        {
                          label: "Lower Respiratory Tract infection",
                          icon: "fa-lungs",
                          color: "bg-gradient-blue",
                        },
                        {
                          label: "HIV/AIDS",
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
            title:
              "Bangladesh scenario of mortality and morbidity among young people",
            icon: "fa-flag",
            gradientClass: "bg-gradient-blue",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q2c-bd",
                  question:
                    "Among Bangladeshi adolescent males (10–19), which is a leading cause of death?",
                  options: ["Road accidents", "Cancer", "Diabetes", "Malaria"],
                  correctAnswer: 0,
                },
              ],
            },
            content: (function () {
              return `
              <div class="lesson-slide">
                <h2 class="slide-title gradient-text" data-aos="fade-up">Bangladesh scenario of mortality and morbidity among young people</h2>

                <!-- Sex-disaggregated Top 5 Causes (UNICEF Adolescent Data Portal 2019) -->
                <section class="my-3" data-aos="fade-up" data-aos-delay="60">
                  <h5 class="gradient-text mb-2">According to UNICEF's 'Adolescent Data Portal 2019', the top 5 causes of death (average) for adolescents aged 10-19 in Bangladesh are:
                  </h5>
                  <div class="row g-3">
                    <div class="col-lg-6">
                      <div class="modern-card glass-card" data-aos="zoom-in" data-aos-delay="100">
                        <h6 class="mb-2 d-flex align-items-center gap-2"><span class="badge-pill">Males</span></h6>
                        <ul class="list-unstyled d-grid gap-2 mb-0">
                          ${[
                            {
                              label: "Road accidents",
                              icon: "fa-car-burst",
                              color: "bg-gradient-orange",
                            },
                            {
                              label: "Diarrhea",
                              icon: "fa-bacteria",
                              color: "bg-gradient-blue",
                            },
                            {
                              label: "Drowning",
                              icon: "fa-water",
                              color: "bg-gradient-teal",
                            },
                            {
                              label: "Tuberculosis",
                              icon: "fa-lungs",
                              color: "bg-gradient-purple",
                            },
                            {
                              label: "Suicide",
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
                        <h6 class="mb-2 d-flex align-items-center gap-2"><span class="badge-pill">Females</span></h6>
                        <ul class="list-unstyled d-grid gap-2 mb-0">
                          ${[
                            {
                              label: "Diarrhea",
                              icon: "fa-bacteria",
                              color: "bg-gradient-blue",
                            },
                            {
                              label: "Tuberculosis",
                              icon: "fa-lungs",
                              color: "bg-gradient-purple",
                            },
                            {
                              label: "Road accidents",
                              icon: "fa-car-burst",
                              color: "bg-gradient-orange",
                            },
                            {
                              label: "Maternal mortality",
                              icon: "fa-person-pregnant",
                              color: "bg-gradient-pink",
                            },
                            {
                              label: "Lower respiratory tract infections",
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
                  <h5 class="gradient-text mb-2">Adolescent and young adult mortality in Bangladesh</h5>
                  <div class="row g-3 align-items-stretch">
                    <div class="col-md-6">
                      <div class="modern-card glass-card h-100">
                        <div class="d-flex align-items-center justify-content-between mb-2">
                          <span class="badge-pill">Adolescents (10–19)</span>
                        </div>
                        <div style="position:relative; height:320px;">
                          <canvas id="bdMortalityAdolescents" aria-label="Adolescent mortality distribution (relative)" role="img"></canvas>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="modern-card glass-card h-100">
                        <div class="d-flex align-items-center justify-content-between mb-2">
                          <span class="badge-pill">Young adults (20–24)</span>
                        </div>
                        <div style="position:relative; height:320px;">
                          <canvas id="bdMortalityYoungAdults" aria-label="Young adult mortality distribution (relative)" role="img"></canvas>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- <div class="small text-muted mt-2">Note: Chart shows relative emphasis for categories; update with official proportions when available.</div> -->

                  <!-- Legend with icons -->
                  <div class="d-flex flex-wrap gap-2 mt-2">
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
            title: "Child marriage and teenage pregnancies",
            icon: "fa-child-reaching",
            gradientClass: "bg-gradient-orange",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q2d",
                  question: "Ending child marriage helps protect…",
                  options: [
                    "Education and health",
                    "Only sports",
                    "Only economy",
                    "None",
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: `
              <div class="lesson-slide">
                <h2 class="slide-title gradient-text" data-aos="fade-up">Child marriage and teenage pregnancies</h2>

                <!-- Special info badge -->
                <div class="fact-card alert-warning hover-lift-sm transition-base icon-spin-on-hover mb-3" data-aos="fade-up" data-aos-delay="60">
                  <i class="fas fa-ranking-star" aria-hidden="true"></i>
                  <p class="mb-0">Bangladesh is among the <strong>top 10 countries</strong> with the highest levels of child marriage.</p>
                </div>

                <!-- FIG.4: Graph chart section -->
                <section class="mb-4" aria-labelledby="cm-figure4-title">
                  <h3 class="gradient-text mb-2" id="cm-figure4-title" data-aos="fade-up" data-aos-delay="80">Percentage of women (20–24) first married/union before age 18</h3>
                  <div class="row g-3 align-items-stretch">
                    <div class="col-lg-12" data-aos="fade-right" data-aos-delay="100">
                      <article class="modern-card" style="height:320px">
                        <canvas id="cmFigure4Chart" aria-label="Child marriage before 18: Bangladesh vs South Asia vs World" role="img"></canvas>
                      </article>
                    </div>
                    <div class="col-lg-12" data-aos="fade-left" data-aos-delay="120">
                      <article class="modern-card h-100 d-flex flex-column">
                        <p class="mb-3">Bangladesh has the highest prevalence of child marriage in South Asia, and is among the 10 countries worldwide with the highest levels.</p>
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
                            <span class="badge-pill ${c.color}" title="${c.label}"><i class="fa-solid ${c.icon} me-1"></i>${c.label}</span>
                          `
                            )
                            .join("")}
                        </div>
                        <p class="small text-muted mt-3 mb-0">Note: Chart shows available values for Bangladesh (51%), South Asia (29%) and World (20%). Country-level values for other South Asian nations can be added when verified.</p>
                      </article>
                    </div>
                  </div>
                </section>

                <!-- KEY FACTS -->
                <section aria-labelledby="cm-keyfacts-title">
                  <h3 class="gradient-text mb-1" id="cm-keyfacts-title" data-aos="fade-up" data-aos-delay="140">KEY FACTS</h3>
                  <p class="text-muted mb-3" data-aos="fade-up" data-aos-delay="160">About child marriage in Bangladesh</p>
                  <div class="row g-3">
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
                    </div>
                  </div>
                </section>
              </div>`,
          },
          {
            id: "ch2-lesson-6",
            title: "Adolescent health related issues",
            icon: "fa-circle-nodes",
            gradientClass: "bg-gradient-cyan",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q2d-issues",
                  question: "Improving adolescent health requires…",
                  options: [
                    "Single-sector approach",
                    "Rights-based, multisectoral action",
                    "Ignoring evidence",
                    "Only services",
                  ],
                  correctAnswer: 1,
                },
              ],
            },
            content: `
              <div class="lesson-slide">
                <h2 class="slide-title gradient-text" data-aos="fade-up">Adolescent health related issues</h2>

                <!-- Special info -->
                <div class="fact-card alert-info hover-lift-sm transition-base icon-spin-on-hover mb-3" data-aos="fade-up" data-aos-delay="60">
                  <i class="fas fa-lightbulb" aria-hidden="true"></i>
                  <p class="mb-0">Actions to improve adolescent health and wellbeing need to address established and emerging determinants and <strong>meaningfully engage</strong> with adolescents and young people.</p>
                </div>

                <!-- Issues infographic: 2x2 matrix cards with icons -->
                <section class="issue-matrix" aria-labelledby="issue-matrix-title">
                  <h3 id="issue-matrix-title" class="mb-2 gradient-text" data-aos="fade-up" data-aos-delay="80">Key domains</h3>
                  <div class="row g-3">
                    <!-- Health -->
                    <div class="col-md-6" data-aos="zoom-in" data-aos-delay="100">
                      <article class="issue-panel bg-gradient-emerald">
                        <div class="issue-head">
                          <div class="issue-icon"><i class="fa-solid fa-heart-pulse"></i></div>
                          <h6 class="issue-title">Health</h6>
                        </div>
                        <ul class="stat-list">
                          <li><span class="stat-chip"><span class="value">12.6</span><span class="unit">%</span></span> children and adolescents (7–17 years) suffer from diagnosable mental health condition</li>
                          <li>
                            NCD risk factors:
                            <span class="stat-chip"><span class="value">14</span><span class="unit">%</span></span> one
                            <span class="stat-chip"><span class="value">22</span><span class="unit">%</span></span> two
                            <span class="stat-chip"><span class="value">29</span><span class="unit">%</span></span> three
                            <span class="stat-chip"><span class="value">34</span><span class="unit">%</span></span> four or more
                          </li>
                          <li>Substance use (12–17 years): <span class="stat-chip"><span class="value">1.5</span><span class="unit">%</span></span></li>
                          <li>Road accidents: ~<span class="stat-chip"><span class="value">10</span><span class="unit">%</span></span> adolescent mortality; students > <span class="stat-chip"><span class="value">16</span><span class="unit">%</span></span> of fatalities</li>
                          <li>Internet addiction (13–19 years): <span class="stat-chip"><span class="value">24.1</span><span class="unit">%</span></span></li>
                        </ul>
                        <div class="panel-source small"><i class="fa-solid fa-book-open me-1"></i>Source: add citation(s)</div>
                      </article>
                    </div>
                    <!-- Nutrition -->
                    <div class="col-md-6" data-aos="zoom-in" data-aos-delay="120">
                      <article class="issue-panel bg-gradient-rose">
                        <div class="issue-head">
                          <div class="issue-icon"><i class="fa-solid fa-utensils"></i></div>
                          <h6 class="issue-title">Nutrition</h6>
                        </div>
                        <ul class="stat-list">
                          <li>Stunting: <span class="stat-chip"><span class="value">36</span><span class="unit">%</span></span> EM females; <span class="stat-chip"><span class="value">32</span><span class="unit">%</span></span> UM females; <span class="stat-chip"><span class="value">22</span><span class="unit">%</span></span> UM males</li>
                          <li>Underweight: <span class="stat-chip"><span class="value">4</span><span class="unit">%</span></span> EM females; <span class="stat-chip"><span class="value">8</span><span class="unit">%</span></span> UM females; <span class="stat-chip"><span class="value">11</span><span class="unit">%</span></span> UM males</li>
                          <li>Overweight: <span class="stat-chip"><span class="value">16</span><span class="unit">%</span></span> EM females; <span class="stat-chip"><span class="value">10</span><span class="unit">%</span></span> UM females; <span class="stat-chip"><span class="value">9</span><span class="unit">%</span></span> UM males</li>
                          <li>Anemia: about <span class="stat-chip"><span class="value">30</span><span class="unit">%</span></span> of adolescents</li>
                        </ul>
                        <div class="panel-source small"><i class="fa-solid fa-book-open me-1"></i>Source: add citation(s)</div>
                      </article>
                    </div>
                    <!-- Education -->
                    <div class="col-md-6" data-aos="zoom-in" data-aos-delay="140">
                      <article class="issue-panel bg-gradient-blue">
                        <div class="issue-head">
                          <div class="issue-icon"><i class="fa-solid fa-graduation-cap"></i></div>
                          <h6 class="issue-title">Education</h6>
                        </div>
                        <ul class="stat-list">
                          <li>GER (secondary): <span class="stat-chip"><span class="value">74.81</span><span class="unit">%</span></span></li>
                          <li>NER (secondary): <span class="stat-chip"><span class="value">72.20</span><span class="unit">%</span></span></li>
                          <li>Secondary completion rate: <span class="stat-chip"><span class="value">65.1</span><span class="unit">%</span></span></li>
                          <li>Dropout rate: <span class="stat-chip"><span class="value">32.85</span><span class="unit">%</span></span></li>
                        </ul>
                        <div class="panel-source small"><i class="fa-solid fa-book-open me-1"></i>Source: add citation(s)</div>
                      </article>
                    </div>
                    <!-- Protection -->
                    <div class="col-md-6" data-aos="zoom-in" data-aos-delay="160">
                      <article class="issue-panel bg-gradient-violet">
                        <div class="issue-head">
                          <div class="issue-icon"><i class="fa-solid fa-shield-heart"></i></div>
                          <h6 class="issue-title">Protection</h6>
                        </div>
                        <ul class="stat-list">
                          <li><span class="stat-chip"><span class="value">1</span>/<span class="value">5</span></span> adolescent girls and women face physical or sexual violence</li>
                          <li><span class="stat-chip"><span class="value">77</span><span class="unit">%</span></span> of married adolescent girls abused by their husbands</li>
                          <li>~<span class="stat-chip"><span class="value">1.78</span><span class="unit">M</span></span> adolescents in child labor</li>
                          <li>During monsoon, <span class="stat-chip"><span class="value">40</span><span class="unit">/day</span></span> children drown; ~<span class="stat-chip"><span class="value">14,000</span></span> annually</li>
                          <li>~<span class="stat-chip"><span class="value">89</span><span class="unit">%</span></span> children (~<span class="stat-chip"><span class="value">45</span><span class="unit">M</span></span>) experience violent discipline at home</li>
                        </ul>
                        <div class="panel-source small"><i class="fa-solid fa-book-open me-1"></i>Source: add citation(s)</div>
                      </article>
                    </div>
                  </div>
                </section>
              </div>`,
          },
          {
            id: "ch2-lesson-7",
            title: "Determinants for adolescent health and well-being",
            icon: "fa-triangle-exclamation",
            gradientClass: "bg-gradient-pink",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q2e",
                  question: "Determinants include…",
                  options: [
                    "Only nutrition",
                    "Multiple domains",
                    "Only activity",
                    "None",
                  ],
                  correctAnswer: 1,
                },
              ],
            },
            content: `
              <div class="lesson-slide">
                <h2 class="slide-title gradient-text" data-aos="fade-up">Determinants for adolescent health and well-being</h2>

                <!-- AA-HA! guidance section with distinct background -->
                <section class="mb-4 p-3 p-md-4 rounded-4" style="background: linear-gradient(135deg, rgba(99,102,241,0.10), rgba(16,185,129,0.10)); border: 1px solid rgba(0,0,0,0.06);" aria-labelledby="aa-ha-title">
                  <div class="row g-3 align-items-center">
                    <div class="col-md-6" data-aos="fade-right" data-aos-delay="60">
                      <figure class="image-card" style="height:320px"><img src="img/determinants/determenants.jpg" alt="AA-HA! guidance"></figure>
                    </div>
                    <div class="col-md-6" data-aos="fade-left" data-aos-delay="80">
                      <article class="modern-card hover-lift-sm transition-base icon-spin-on-hover">
                        <div class="d-flex align-items-start gap-3">
                          <span class="badge-pill bg-gradient-blue" aria-hidden="true"><i class="fa-solid fa-book-open"></i></span>
                          <div class"">
                            <h3 id="aa-ha-title" class="mb-2 gradient-text aa-ha-title">Global Accelerated Action for the Health of Adolescents (AA-HA!)</h3>
                            <p class="mb-1">Guidance to Support Country Implementation</p>
                            <p class="mb-0 text-muted">Second Edition</p>
                          </div>
                        </div>
                      </article>
                    </div>
                  </div>
                </section>

                <!-- Determinants grid on a contrasting background -->
                <section class="p-3 p-md-4 rounded-4" style="background: rgba(0,0,0,0.03);" aria-labelledby="determinants-title">
                  <h3 class="mb-3 gradient-text" id="determinants-title" data-aos="fade-up" data-aos-delay="120">Key determinants</h3>
                  <div class="row g-3">
                    ${[
                      {
                        label: "Unintentional Injury",
                        icon: "fa-car-burst",
                        color: "bg-gradient-orange",
                        delay: 140,
                      },
                      {
                        label: "Violence",
                        icon: "fa-hand-back-fist",
                        color: "bg-gradient-pink",
                        delay: 160,
                      },
                      {
                        label: "SRH, HIV and other STI",
                        icon: "fa-venus-mars",
                        color: "bg-gradient-violet",
                        delay: 180,
                      },
                      {
                        label: "Communicable Diseases",
                        icon: "fa-virus",
                        color: "bg-gradient-green",
                        delay: 200,
                      },
                      {
                        label: "Non-Communicable Diseases",
                        icon: "fa-heart-pulse",
                        color: "bg-gradient-emerald",
                        delay: 220,
                      },
                      {
                        label: "Mental Health",
                        icon: "fa-brain",
                        color: "bg-gradient-blue",
                        delay: 240,
                      },
                      {
                        label: "Alcohol and Drug Use",
                        icon: "fa-wine-bottle",
                        color: "bg-gradient-tangerine",
                        delay: 260,
                      },
                      {
                        label: "Tobacco use",
                        icon: "fa-smoking",
                        color: "bg-gradient-teal",
                        delay: 280,
                      },
                      {
                        label: "Physical activity and Sedentary behavior",
                        icon: "fa-person-running",
                        color: "bg-gradient-cyan",
                        delay: 300,
                      },
                      {
                        label: "Nutrition",
                        icon: "fa-utensils",
                        color: "bg-gradient-purple",
                        delay: 320,
                      },
                    ]
                      .map(
                        (d) => `
                      <div class="col-sm-6 col-md-4 col-lg-3" data-aos="zoom-in" data-aos-delay="${d.delay}">
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
                </section>
              </div>`,
          },
          {
            id: "ch2-lesson-8",
            title: "Why young people need special care?",
            icon: "fa-user-nurse",
            gradientClass: "bg-gradient-teal",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q2f",
                  question: "Adolescent services should be…",
                  options: [
                    "Judgmental",
                    "Exclusive",
                    "Non-judgmental and confidential",
                    "Irregular",
                  ],
                  correctAnswer: 2,
                },
              ],
            },
            content: `
              <div class="lesson-slide">
                <!-- Intro banner -->
                <div class="alert alert-info hover-lift-sm transition-base mb-3" data-aos="fade-up" data-aos-delay="60">
                  <div class="d-flex align-items-center gap-3">
                    <span class="badge-pill bg-gradient-blue"><i class="fa-solid fa-user-group"></i></span>
                    <div>
                      <h5 class="mb-1">Why young people need special care?</h5>
                    </div>
                  </div>
                </div>

                <!-- Diversified needs and barriers: icon cards grid -->
                <section class="mb-4" aria-labelledby="adol-needs-title">
                  <div class="row g-3">
                    ${[
                      {
                        title: "Adolescents have diversified needs",
                        desc: "Needs in SRHR, mental health and other NCDs, nutrition, violence against adolescents, vulnerable adolescents etc.",
                        icon: "fa-layer-group",
                        color: "bg-gradient-violet",
                        delay: 100,
                      },
                      {
                        title: "Unaware of the laws, policies, rights",
                        desc: "Sexual and reproductive health rights, Child rights",
                        icon: "fa-scale-balanced",
                        color: "bg-gradient-emerald",
                        delay: 130,
                      },
                      {
                        title: "Limited ability to execute the rights",
                        desc: "Lack of confidence, parental influence, peer pressure",
                        icon: "fa-hands-holding",
                        color: "bg-gradient-tangerine",
                        delay: 160,
                      },
                      {
                        title:
                          "Barriers in accessing information, knowledge, skills",
                        desc: "Social stigma; discomfort among parents, family members, peers, teachers to talk about adolescent health issues",
                        icon: "fa-book-open-reader",
                        color: "bg-gradient-rose",
                        delay: 190,
                      },
                      {
                        title: "Barriers in accessing the health services",
                        desc: "Limited care seeking behaviors; no dedicated service (no separate space, no privacy, no dedicated staff); negligence and unawareness among service providers",
                        icon: "fa-hospital-user",
                        color: "bg-gradient-cyan",
                        delay: 220,
                      },
                    ]
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

                <!-- Supportive visual -->
              </div>`,
          },
          {
            id: "ch2-lesson-9",
            title: "SDC related to adolescent health.",
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
                <h2 class="slide-title gradient-text" data-aos="fade-up">SDC related to adolescent health</h2>

                <!-- SDG/SDC cards with distinct lean gradients, icons, and hover effects -->
                <div class="row g-3">${[
                  {
                    label: "No Poverty",
                    icon: "fa-hand-holding-heart",
                    cls: "sdg-lean-rose",
                    delay: 100,
                  },
                  {
                    label: "Zero Hunger",
                    icon: "fa-bowl-food",
                    cls: "sdg-lean-tangerine",
                    delay: 130,
                  },
                  {
                    label: "Good Health And Well-Being",
                    icon: "fa-heart-pulse",
                    cls: "sdg-lean-emerald",
                    delay: 160,
                  },
                  {
                    label: "Quality Education",
                    icon: "fa-graduation-cap",
                    cls: "sdg-lean-blue",
                    delay: 190,
                  },
                  {
                    label: "Gender Equality",
                    icon: "fa-venus-mars",
                    cls: "sdg-lean-violet",
                    delay: 220,
                  },
                  {
                    label: "Decent Work And Economic Growth",
                    icon: "fa-briefcase",
                    cls: "sdg-lean-purple",
                    delay: 250,
                  },
                  {
                    label: "Peace, Justice And Strong Institutions",
                    icon: "fa-scale-balanced",
                    cls: "sdg-lean-teal",
                    delay: 280,
                  },
                ]
                  .map(
                    (s) => `
                  <div class="col-6 col-md-4 col-lg-4 aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100" data-aos="flip-left" data-aos-delay="${s.delay}">
                    <article class="sdg-lean-card ${s.cls} sdg-hover-tilt transition-base icon-spin-on-hover h-100">
                      <div class="sdg-card-icon animate-float-slow"><i class="fa-solid ${s.icon}"></i></div>
                      <h6 class="sdg-card-title">${s.label}</h6>
                    </article>
                  </div>
                `
                  )
                  .join("")}</div>
              </div>`,
          },
          {
            id: "ch2-lesson-10",
            title: "AH in Global Agenda",
            icon: "fa-handshake-angle",
            gradientClass: "bg-gradient-emerald",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q2h",
                  question: "Put whom at the center of design?",
                  options: ["Providers", "Parents", "Adolescents", "Donors"],
                  correctAnswer: 2,
                },
              ],
            },
            content: `
              <div class="lesson-slide">
                <h2 class="slide-title gradient-text" data-aos="fade-up">Adolescent Health in the Global Agenda</h2>

                <section class="timeline-chart" aria-labelledby="ah-global-agenda-title">
                  <div class="timeline-track" aria-hidden="true"></div>
                  ${[
                    {
                      year: "1994",
                      title:
                        "International Conference on Population and Development",
                      desc: "Adolescents were recognized as a separate group with distinct needs.",
                      icon: "fa-people-group",
                      cls: "tl-rose",
                      delay: 100,
                    },
                    {
                      year: "2000",
                      title: "Millennium Development Goals (MDGs)",
                      desc: "Adolescents were included as part of broader child and maternal health goals.",
                      icon: "fa-bullseye",
                      cls: "tl-blue",
                      delay: 130,
                    },
                    {
                      year: "2010",
                      title:
                        "Global Strategy for Women’s and Children’s Health",
                      desc: "Adolescents were minimally included in this strategy.",
                      icon: "fa-child-reaching",
                      cls: "tl-amber",
                      delay: 160,
                    },
                    {
                      year: "2015",
                      title: "Sustainable Development Goals (SDGs)",
                      desc: "Adolescents were recognized as key to achieving global health and development goals.",
                      icon: "fa-globe",
                      cls: "tl-emerald",
                      delay: 190,
                    },
                    {
                      year: "2016",
                      title:
                        "Lancet Commission on Adolescent Health and Wellbeing",
                      desc: "Highlighted the importance of investing in adolescent health and well-being.",
                      icon: "fa-book-open",
                      cls: "tl-violet",
                      delay: 220,
                    },
                    {
                      year: "2017",
                      title:
                        "Global Accelerated Action for the Health of Adolescents (AA-HA!)",
                      desc: "Guidance to support implementation of adolescent health initiatives.",
                      icon: "fa-rocket",
                      cls: "tl-cyan",
                      delay: 250,
                    },
                    {
                      year: "2021",
                      title:
                        "Global Accelerated Action for the Health of Adolescents (AA-HA! 2.0)",
                      desc: "A call to action: The second guidance for adolescent health and wellbeing.",
                      icon: "fa-flag-checkered",
                      cls: "tl-slate",
                      delay: 280,
                    },
                  ]
                    .map(
                      (m, i) => `
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
              </div>`,
          },
          {
            id: "ch2-lesson-11",
            title: "Policies, strategies and plans",
            icon: "fa-file-shield",
            gradientClass: "bg-gradient-blue",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q2i",
                  question: "National directions guide…",
                  options: [
                    "Service delivery and coordination",
                    "Only events",
                    "Only media",
                    "None",
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: `
              <div class="lesson-slide">
                <h2 class="slide-title gradient-text" data-aos="fade-up">Policies, strategies and plans</h2>
                <div class="row g-3">${[
                  {
                    img: "img/policies/national-strategy.jpg",
                    title: "National Adolescent Health Strategy",
                  },
                  {
                    img: "img/policies/adolsent.png",
                    title:
                      "National Plan of Action for Adolescent Health Strategy",
                  },
                  {
                    img: "img/policies/gadget.png",
                    title: "Enacted Mental Health Act, Bangladesh",
                  },
                  {
                    img: "img/policies/national-health.png",
                    title: "2nd  National Mental Health Survey",
                  },
                  {
                    img: "img/policies/policy.png",
                    title: "National Mental Health Policy : 2022",
                  },
                  {
                    img: "img/policies/strategy.png",
                    title: "National Mental Health Strategic Plan : 2022-2030",
                  },
                ]
                  .map(
                    (p) =>
                      `<div class="col-sm-6 col-lg-6 aos-init aos-animate" data-aos="fade-up" data-aos-delay="120"><article class="modern-card"><figure class="image-card" style="height:auto; object-fit: cover;"><img src="${p.img}" class="img-zoom" alt="${p.title}"></figure><h6 class="mt-2">${p.title}</h6></article></div>`
                  )
                  .join("")}</div>
              </div>`,
          },
          {
            id: "ch2-lesson-12",
            title: "Bangladesh Government’s commitment",
            icon: "fa-landmark",
            gradientClass: "bg-gradient-tangerine",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q2j",
                  question: "Bangladesh invests in adolescent health via…",
                  options: [
                    "Policies and partnerships",
                    "Only posters",
                    "Only apps",
                    "None",
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: `
              <div class="lesson-slide">
                <h2 class="slide-title gradient-text" data-aos="fade-up">Bangladesh Government’s commitment</h2>

                <!-- Infographic: Policy evolution snapshot (distinct from timeline) -->
                <section class="flow-chart" aria-labelledby="bd-commitment-flow-title">
                  <div class="flow-rows">
                    <!-- Row 1: Strategy evolution -->
                    <div class="flow-row" data-aos="fade-up" data-aos-delay="100">
                      <div class="flow-node tl-blue">
                        <div class="flow-node-icon"><i class="fa-solid fa-book-open"></i></div>
                        <div class="flow-node-title">National Adolescent Reproductive Health Strategy</div>
                        <div class="flow-node-sub">2006–2015</div>
                      </div>
                      <div class="flow-arrow" aria-hidden="true"></div>
                      <div class="flow-node tl-emerald">
                        <div class="flow-node-icon"><i class="fa-solid fa-flag-checkered"></i></div>
                        <div class="flow-node-title">National Adolescent Health Strategy</div>
                        <div class="flow-node-sub">2017–2030</div>
                      </div>
                    </div>
                    <!-- Row 2: Action plan evolution -->
                    <div class="flow-row" data-aos="fade-up" data-aos-delay="140">
                      <div class="flow-node tl-violet">
                        <div class="flow-node-icon"><i class="fa-solid fa-clipboard-list"></i></div>
                        <div class="flow-node-title">National Plan of Action for Adolescent Health Strategy</div>
                      </div>
                      <div class="flow-arrow" aria-hidden="true"></div>
                      <div class="flow-node tl-rose">
                        <div class="flow-node-icon"><i class="fa-solid fa-coins"></i></div>
                        <div class="flow-node-title">National Costed Action Plan for Adolescent Health Strategy</div>
                      </div>
                    </div>
                  </div>
                </section>

                <!-- Orbit info: main strategy at center with related focus areas around -->
                <section class="orbit-section" aria-labelledby="orbit-title">
                  <div class="orbit-layout" data-aos="zoom-in" data-aos-delay="240">
                    <!-- Center node -->
                    <div class="orbit-center">
                      <div class="orbit-card bg-gradient-emerald">
                        <div class="orbit-icon"><i class="fa-solid fa-flag"></i></div>
                        <div class="orbit-title">National Adolescent Health Strategy</div>
                        <div class="orbit-sub">2017–2030</div>
                      </div>
                    </div>
                    <!-- Satellites: 7 items -->
                    ${[
                      {
                        label:
                          "Adolescent Sexual and Reproductive Health & Rights",
                        icon: "fa-venus-mars",
                        cls: "bg-gradient-rose",
                      },
                      {
                        label: "Violence against Adolescents",
                        icon: "fa-hand-fist",
                        cls: "bg-gradient-tangerine",
                      },
                      {
                        label: "Mental Health for Adolescents",
                        icon: "fa-brain",
                        cls: "bg-gradient-violet",
                      },
                      {
                        label: "Health System Strengthening",
                        icon: "fa-screwdriver-wrench",
                        cls: "bg-gradient-blue",
                      },
                      {
                        label: "Social & Behaviour Change Communication",
                        icon: "fa-bullhorn",
                        cls: "bg-gradient-emerald",
                      },
                      {
                        label:
                          "Vulnerable adolescents & challenging circumstances",
                        icon: "fa-people-roof",
                        cls: "bg-gradient-teal",
                      },
                      {
                        label: "Adolescent Nutrition",
                        icon: "fa-utensils",
                        cls: "bg-gradient-purple",
                      },
                    ]
                      .map(
                        (o, i) => `
                      <div class="orbit-item orbit-pos-${i + 1}">
                        <div class="orbit-card ${o.cls} icon-spin-on-hover">
                          <div class="orbit-icon animate-float"><i class="fa-solid ${
                            o.icon
                          }"></i></div>
                          <div class="orbit-title small">${o.label}</div>
                        </div>
                      </div>
                    `
                      )
                      .join("")}
                    <!-- Decorative orbit rings -->
                    <div class="orbit-ring orbit-ring-1" aria-hidden="true"></div>
                    <div class="orbit-ring orbit-ring-2" aria-hidden="true"></div>
                  </div>
                </section>
              </div>`,
          },
          {
            id: "ch2-lesson-13",
            title: "A combined effort",
            icon: "fa-people-group",
            gradientClass: "bg-gradient-green",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q2k",
                  question: "Whole-of-society approach includes…",
                  options: [
                    "Only health",
                    "Multiple sectors",
                    "Only schools",
                    "None",
                  ],
                  correctAnswer: 1,
                },
              ],
            },
            content: `
              <div class="lesson-slide">
                <h2 class="slide-title gradient-text" data-aos="fade-up">A combined effort</h2>

                <div class="modern-card glass-card mb-3" data-aos="fade-up" data-aos-delay="60">
                  <h5 class="mb-1">A combined effort</h5>
                  <p class="mb-1">Institutions and individuals can help protect adolescents from harm.</p>
                  <p class="mb-0">So too can teaching them healthy habits.</p>
                </div>

                <!-- Radial infographic: center + inner + outer rings -->
                <section class="radial-chart-section" aria-labelledby="combined-effort-title">
                  <div class="radial-chart radial-v2 hover-lift-sm transition-base" style="--inner-offset: 10deg;" data-aos="zoom-in" data-aos-delay="120" role="img" aria-label="Center: Healthy habits. Inner: School, Health services, Sleep, Healthy diet. Outer: Institutions, Families, Society, Communities.">
                    <!-- Rings -->
                    <div class="radial-ring radial-ring-outer" aria-hidden="true"></div>
                    <div class="radial-ring radial-ring-inner" aria-hidden="true"></div>

                    <!-- Center -->
                    <div class="radial-center">
                      <article class="radial-card bg-gradient-emerald icon-spin-on-hover">
                        <div class="radial-icon"><i class="fa-solid fa-heart-pulse"></i></div>
                        <div class="radial-title">Healthy habits</div>
                      </article>
                    </div>

                    <!-- Inner ring (4) -->
                    ${[
                      {
                        label: "School",
                        icon: "fa-school",
                        cls: "bg-gradient-blue",
                        pos: "radial-inner-left",
                      },
                      {
                        label: "Health services",
                        icon: "fa-hospital",
                        cls: "bg-gradient-rose",
                        pos: "radial-inner-right custom-pos-combined-effort",
                      },
                      {
                        label: "Sleep",
                        icon: "fa-bed",
                        cls: "bg-gradient-violet",
                        pos: "radial-inner-bottom",
                      },
                      {
                        label: "Healthy diet",
                        icon: "fa-apple-whole",
                        cls: "bg-gradient-tangerine",
                        pos: "radial-inner-top custom-pos-combined-effort",
                      },
                    ]
                      .map(
                        (n) => `
                      <div class="radial-node radial-inner ${n.pos}">
                        <article class="radial-card ${n.cls} icon-spin-on-hover">
                          <div class="radial-icon animate-float-slow"><i class="fa-solid ${n.icon}"></i></div>
                          <div class="radial-title">${n.label}</div>
                        </article>
                      </div>
                    `
                      )
                      .join("")}

                    <!-- Outer ring (4) -->
                    ${[
                      {
                        label: "Institutions",
                        icon: "fa-landmark",
                        cls: "bg-gradient-purple",
                        pos: "radial-outer-ne",
                      },
                      {
                        label: "Families",
                        icon: "fa-people-roof",
                        cls: "bg-gradient-emerald",
                        pos: "radial-outer-nw",
                      },
                      {
                        label: "Society",
                        icon: "fa-people-group",
                        cls: "bg-gradient-cyan",
                        pos: "radial-outer-sw",
                      },
                      {
                        label: "Communities",
                        icon: "fa-people-carry-box",
                        cls: "bg-gradient-teal",
                        pos: "radial-outer-se",
                      },
                    ]
                      .map(
                        (n) => `
                      <div class="radial-node radial-outer ${n.pos}">
                        <article class="radial-card ${n.cls} icon-spin-on-hover animate-float-slow">
                          <div class="radial-icon"><i class="fa-solid ${n.icon}"></i></div>
                          <div class="radial-title">${n.label}</div>
                        </article>
                      </div>
                    `
                      )
                      .join("")}
                  </div>
                </section>
              </div>`,
          },
          {
            id: "ch2-lesson-14",
            title: "Recommendations to protect adolescent health and wellbeing",
            icon: "fa-rocket",
            gradientClass: "bg-gradient-rose",
            audioFile: "",
            quiz: {
              passingScore: 60,
              questions: [
                {
                  id: "q2l",
                  question: "Actions include…",
                  options: [
                    "Boost health literacy",
                    "Reduce services",
                    "Ignore data",
                    "Exclude young",
                  ],
                  correctAnswer: 0,
                },
              ],
            },
            content: `
              <div class="lesson-slide">
                <h2 class="slide-title gradient-text" data-aos="fade-up">Recommendations</h2>

                <!-- Special info -->
                <div class="modern-card glass-card mb-3 hover-lift-sm transition-base" data-aos="fade-up" data-aos-delay="60">
                  <div class="d-flex align-items-start gap-3">
                    <span class="badge-pill bg-gradient-blue" aria-hidden="true"><i class="fa-solid fa-circle-info"></i></span>
                    <p class="mb-0">Actions to improve adolescent health and wellbeing need to address established and emerging determinants and meaningfully engage with adolescents and young people.</p>
                  </div>
                </div>

                <!-- Petal infographic: five recommendations around a center -->
                <section class="" aria-labelledby="ahw-recs-title">
                  <!-- Ambient gradient container with floating shapes -->
                  <div class="recs-ambient" data-aos="fade-up" data-aos-delay="100">
                    <div class="ambient-shapes animate-float" aria-hidden="true">
                      <span class="shape shape-1"></span>
                      <span class="shape shape-2"></span>
                      <span class="shape shape-3"></span>
                      <span class="shape shape-4"></span>
                      <span class="shape shape-5"></span>
                    </div>

                    <div class="petal-chart hover-lift-sm transition-base" aria-label="Five recommendation petals surrounding a central goal: Protect adolescent health and wellbeing.">
                      <!-- Decorative ring -->
                      <div class="petal-ring spin-slow" aria-hidden="true"></div>

                      <!-- Center node 
                        <div class="petal-center">
                          <article class="petal-card bg-gradient-emerald icon-spin-on-hover hover-glow">
                            <div class="petal-icon"><i class="fa-solid fa-shield-heart"></i></div>
                            <div class="petal-title">Protect adolescent health & wellbeing</div>
                          </article>
                        </div> 
                      -->

                      <!-- Petals (5) equally spaced -->
                      ${[
                        {
                          title: "Protect adolescent health & wellbeing",
                          text: "",
                          icon: "fa-rocket",
                          cls: "bg-gradient-teal",
                          pos: "petal-pos-1",
                          delay: 100,
                        },
                        {
                          title: "Rights-based & person-centred",
                          text: "Emphasise adolescents’ rights to health and wellbeing; promote participation, identity expression, safe access, and protection from harm.",
                          icon: "fa-scale-balanced",
                          cls: "bg-gradient-purple",
                          pos: "petal-pos-1",
                          delay: 150,
                        },
                        {
                          title: "Confront systemic inequities",
                          text: "Address gender, race and geography to ensure equal opportunities and targeted support for disadvantaged groups.",
                          icon: "fa-people-arrows-left-right",
                          cls: "bg-gradient-rose",
                          pos: "petal-pos-2",
                          delay: 200,
                        },
                        {
                          title: "Meaningfully involve adolescents",
                          text: "Co-design and engage adolescents in health initiatives—empowering individuals and strengthening societal outcomes.",
                          icon: "fa-people-group",
                          cls: "bg-gradient-blue",
                          pos: "petal-pos-3",
                          delay: 250,
                        },
                        {
                          title: "Evidence-informed & developmentally tailored",
                          text: "Use evolving evidence and tailor to developmental needs while considering complex determinants across contexts.",
                          icon: "fa-microscope",
                          cls: "bg-gradient-cyan",
                          pos: "petal-pos-4",
                          delay: 300,
                        },
                        {
                          title: "Multisectoral approach",
                          text: "Coordinate mental health, nutrition, sexual and reproductive health, and violence prevention to amplify gains.",
                          icon: "fa-diagram-project",
                          cls: "bg-gradient-teal",
                          pos: "petal-pos-5",
                          delay: 350,
                        },
                      ]
                        .map(
                          (p) => `
                        <div class="aos-init aos-animate"  data-aos="fade-up" data-aos-delay="${p.delay}">
                          <article class="recs-petal-card ${p.cls} mb-2 icon-spin-on-hover hover-glow">
                            <div class="timeline-card-icon animate-float-slow"><i class="fa-solid ${p.icon}"></i></div>
                            <div class="timeline-card-title">${p.title}</div>
                            <p class="timeline-card-text rec-title">${p.text}</p>
                          </article>
                        </div>
                        
                      `
                        )
                        .join("")}
                    </div>
                  </div>
                </section>
              </div>`,
          },
        ],
      },
      {
        id: "ch-3",
        title: "Module-3: Changes during adolescence and puberty",
        lessons: [],
      },
      {
        id: "ch-4",
        title: "Module-4: Menstrual Health and Hygiene Management",
        lessons: [],
      },
      {
        id: "ch-5",
        title: "Module-5: Wet dream (ejaculation) Hygiene and Management",
        lessons: [],
      },
      {
        id: "ch-7",
        title:
          "Module-7: Causes, consequences and prevention of early child marriage",
        lessons: [],
      },
      {
        id: "ch-8",
        title: "Module-8: Adolescent Pregnancy",
        lessons: [],
      },
      {
        id: "ch-9",
        title: "Module-9: Adolescent Family Planning",
        lessons: [],
      },
      {
        id: "ch-10",
        title:
          "Module-10: Sexually Transmitted Diseases (STIs) and Reproductive Tract Infections (RTIs)",
        lessons: [],
      },
      {
        id: "ch-11",
        title:
          "Module-11: HPV vaccination and prevention of cervical cancer in adolescents",
        lessons: [],
      },
      {
        id: "ch-12",
        title: "Module-12: Polycystic ovary syndrome (PCOS) in adolescents",
        lessons: [],
      },
      {
        id: "ch-13",
        title:
          "Module-13: Adolescent nutrition: Nutritional deficiency and prevention",
        lessons: [],
      },
      {
        id: "ch-14",
        title:
          "Module-14: Non-communicable diseases (NCDs) in adolescents and their prevention",
        lessons: [],
      },
      {
        id: "ch-15",
        title: "Module-15: Sex, Gender and Gender Discrimination",
        lessons: [],
      },
      {
        id: "ch-16",
        title: "Module-16: Violence Related to Adolescents",
        lessons: [],
      },
      {
        id: "ch-17",
        title: "Module-17: Adolescent Mental Health -  Problems and Solutions",
        lessons: [],
      },
      {
        id: "ch-18",
        title:
          "Module-18: Psychosocial changes and Psychosocial complications during adolescence",
        lessons: [],
      },
      {
        id: "ch-19",
        title: "Module-19: Psychosocial support for adolescents",
        lessons: [],
      },
      {
        id: "ch-20",
        title: "Module-20: Drug addiction - Consequences and prevention",
        lessons: [],
      },
      {
        id: "ch-21",
        title: "Module-21: Special care for vulnerable adolescents",
        lessons: [],
      },
      {
        id: "ch-22",
        title: "Module-22: Climate change and special attention to adolescents",
        lessons: [],
      },
      {
        id: "ch-23",
        title: "Module-23: Injury prevention and first aid for adolescents",
        lessons: [],
      },
      {
        id: "ch-24",
        title: "Module-24: Life skills, morality, and values",
        lessons: [],
      },
      {
        id: "ch-25",
        title: "Module-25: Communication and counseling with adolescents",
        lessons: [],
      },
      {
        id: "ch-26",
        title:
          "Module-26: Human Rights, Child Rights, and Sexual and Reproductive Health Rights",
        lessons: [],
      },
    ],
    // Flat lessons kept for backward compatibility (legacy renderers)
    // Legacy steps array for backward compatibility
    steps: [],
  },
];
