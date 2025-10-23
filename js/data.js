// Young Health LMS - Course Data

const coursesData = [
  {
    id: 'yhap-course',
  title: 'Young Health Ambassador Programme',
  description: 'Comprehensive training program for Young Health Ambassadors covering health literacy, advocacy, and community leadership.',
    duration: '10 Lessons',
    level: 'Comprehensive',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
    enrolled: 0,
    // Chapterized structure
    chapters: [
      {
        id: 'ch-1',
        title: 'Chapter-1: Introduction of Young Health Ambassador Program (YHAP)',
        lessons: [
          // Understanding YHAP
          {
            id: 'ch1-lesson-1',
            title: 'Understanding Young Health Ambassador Programme',
            icon: 'fa-heartbeat',
            gradientClass: 'bg-gradient-purple',
            audioFile: '1.mp3',
            quiz: { passingScore: 80, questions: [{ id:'q1a', question: 'What age defines young per UN?', options:['15-24','10-19','18-29','12-21'], correctAnswer:0 }] },
            content: (function(){
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
                <div class="program-intro hover-lift-sm transition-base" data-aos="fade-up" data-aos-delay="100">
                  <h4 class="gradient-text transition-base"><i class="fa-solid fa-lightbulb me-2 animate-float"></i>About YHAP</h4>
                  <p>The Young Health Ambassador Program (YHAP) is a strategic joint initiative of the Ministry of Health and Family Welfare (MOHFW) and UNICEF. The program is designed to empower youth by enhancing their health awareness and building their capacity in primary prevention and health promotion thereby equipping them to serve as informed health ambassador.</p></br>

                  <p>This program equips young person with knowledge and skills in areas like physical health including sexual and reproductive health, nutrition, mental wellbeing etc.  enabling them to become active advocates for health and influence healthier choices within their communities and networks.</p>
                </div>
              </div>`; })()
          },
          // Age progression (inserted after Lesson 1)
          {
            id: 'ch1-lesson-2',
            title: 'Age Progression: Adolescence to Young Adulthood (10–24)',
            icon: 'fa-children',
            gradientClass: 'bg-gradient-violet',
            audioFile: '',
            quiz: {
              passingScore: 70,
              questions: [
                {
                  id: 'q1a-ages-1',
                  question: 'Which range is considered Mid Adolescence?',
                  options: ['10–13 years', '14–16 years', '17–19 years', '20–24 years'],
                  correctAnswer: 1
                }
              ]
            },
            content: (function(){ return `
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
                  {label:'Early Adolescence', range:'10–13', iconA:'fa-child', iconB:'fa-person-dress', color:'gradient-sky', img:'img/age/10-13.png'},
                  {label:'Mid Adolescence', range:'14–16', iconA:'fa-child-reaching', iconB:'fa-person', color:'gradient-emerald', img:'img/age/14-16.png'},
                  {label:'Late Adolescence', range:'17–19', iconA:'fa-person-walking', iconB:'fa-person-dress', color:'gradient-violet', img:'img/age/17-19.png'},
                  {label:'Young Adulthood', range:'20–24', iconA:'fa-user', iconB:'fa-user', color:'gradient-tangerine', img:'img/age/20-24.png'}
                ].map((step,i)=>`
                  <div class="age-step flex-grow-1" style="min-width: 220px;">
                    <div class="modern-card glass-card h-100 hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover" style="padding:1rem; position:relative; z-index:1;">
                      <div class="d-flex align-items-center justify-content-between mb-2">
                        <span class="badge-pill">${step.label}</span>
                        <span class="badge bg-dark text-light">${step.range} yrs</span>
                      </div>
                      <div class="d-flex align-items-center justify-content-center gap-4" style="font-size: 2rem;">
                        <span class="${step.color}"><i class="fa-solid ${step.iconA}"></i></span>
                        <i class="fa-solid fa-plus text-muted" style="font-size:1rem"></i>
                        <span class="${step.color}"><i class="fa-solid ${step.iconB}"></i></span>
                      </div>
                      <figure class="image-card age-figure mt-3" style="height:160px">
                        <img src="${step.img}" alt="${step.label} ${step.range} years" class="animate-float-slow">
                      </figure>
                    </div>
                  </div>
                  ${i < 3 ? '<div class="d-none d-xl-flex align-items-center justify-content-center" style="min-width:24px"><i class="fa-solid fa-arrow-right-long"></i></div>' : ''}
                `).join('')}
              </div>

              <div class="row g-3 mt-3">
                ${[
                  {title:'Early 10–13', icon:'fa-seedling', text:'Rapid growth begins; guidance on body changes and healthy habits is essential.'},
                  {title:'Mid 14–16', icon:'fa-compass', text:'Identity exploration and peer influence increase—support positive choices.'},
                  {title:'Late 17–19', icon:'fa-graduation-cap', text:'Transitions to higher studies or work—build life skills and resilience.'},
                  {title:'Young Adult 20–24', icon:'fa-rocket', text:'Greater independence—focus on wellbeing, employability, and leadership.'}
                ].map((card,idx)=>`
                  <div class="col-12 col-md-6">
                    <div class="definition-card hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover" data-aos="zoom-in" data-aos-delay="${160+idx*60}">
                      <h5 class="gradient-text mb-1"><i class="fa-solid ${card.icon} me-2 animate-float"></i>${card.title}</h5>
                      <p class="mb-0">${card.text}</p>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>`; })()
          },
          // Six pillars
          {
            id: 'ch1-lesson-3',
            title: 'Six pillars that build confident health ambassadors',
            icon: 'fa-layer-group',
            gradientClass: 'bg-gradient-blue',
            audioFile: '2.mp3',
            quiz: { passingScore: 80, questions: [{ id:'q1b', question: 'Which pillar focuses on accurate messaging?', options:['Leadership','Advocacy','Health Education & Awareness','Empowerment'], correctAnswer:2 }] },
            content: (function(){ return `
          <div class="lesson-slide">
            <h2 class="slide-title gradient-text gradient-text-hover hover-lift-sm transition-base" data-aos="fade-up">Core Components of YHAP</h2>
            <div class="floating-bg" aria-hidden="true">
              <span class="float-elem" style="top:10%; left:8%; width:70px; height:70px;"></span>
              <span class="float-elem" style="bottom:10%; right:12%; width:90px; height:90px;"></span>
            </div>
            <div class="row g-4">${['Health Literacy','Health Education & Awareness','Peer to Peer Influence','Empowerment','Leadership','Advocacy'].map((t,i)=>`
              <div class="col-md-6">
                <div class="component-card hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover" data-aos="zoom-in" data-aos-delay="${100+i*50}">
                  <div class="component-icon bg-gradient-${['purple','blue','teal','orange','green','pink'][i]} animate-float"><i class="fas ${['fa-book-medical','fa-graduation-cap','fa-users','fa-hand-fist','fa-flag','fa-bullhorn'][i]}"></i></div>
                  <h5 class="gradient-text transition-base">${t}</h5>
                  <p>${['YHAP builds foundational health literacy through comprehensive training on essential health and wellbeing. This equips ambassadors with the expertise to act as credible sources of information and effective advocates for prevention of diseases and health promotion.',
                    'Young Health Ambassadors (YHAs) will create health education and awareness through campaigns on key health issues, comprehensive trainings, mentorships etc., Through these multifaceted efforts, they will ensure the accurate dissemination of crucial health information towards fostering well-informed and health-literate communities.',
                    'The programme is built on the principle that peer-to-peer engagement is a powerful catalyst for change. By facilitating supportive mentorship and encouraging positive role-modeling among contemporaries, YHAP leverages the profound impact of shared experiences to promote healthy behaviors.',
                    'YHAP empowers individuals by equipping them with the tools, confidence, and skills needed to take effective control and contribute to the economic development, creating a productive, resilient, and healthy workforce for the future.',
                    'The program cultivates leadership qualities in youth, preparing them to become effective, ethical, and inspiring agents of change in their communities.',
                    'The Youth Health Ambassador Programme (YHAP) builds foundational competencies in health advocacy, empowering youth to effectively raise voice, articulate public health priorities to drive systemic reform. This is achieved through strategic engagement with key stakeholders, evidence-based promotion of policies, and active contribution to the formulation of legislation for strengthening health systems.'][i]}</p>
                </div>
              </div>`).join('')}
            </div>
          </div>`; })()
          },
          // Who am I
          {
            id: 'ch1-lesson-4',
            title: 'Who Am I as a Health Ambassador?',
            icon: 'fa-user-shield',
            gradientClass: 'bg-gradient-teal',
            audioFile: '3.mp3',
            quiz: { passingScore: 80, questions: [{ id:'q1c', question: 'Advocacy includes engaging which stakeholders?', options:['Only peers','Policy makers and gatekeepers','Only media','No one'], correctAnswer:1 }] },
            content: (function(){ return `
          <div class="lesson-slide">
            <h2 class="slide-title gradient-text gradient-text-hover hover-lift-sm transition-base" data-aos="fade-up">Roles and Responsibilities of Health Ambassador</h2>
            <h3 class="text-center mb-4 gradient-text hover-lift-sm transition-base" data-aos="fade-up" data-aos-delay="50">Who am I?</h3>
            <div class="row g-4">${[
              {icon:'fa-shield-heart', text:'I am equipped with expertise in safeguarding health and well-being of young people, enabling me to contribute meaningfully to society while harnessing the triple dividend of health, social, and economic benefits.'},
              {icon:'fa-share-nodes', text:'I actively empower my peers by sharing knowledge on health promotion, disease prevention, and holistic well-being, fostering informed decision-making among young people.'},
              {icon:'fa-handshake', text:'Through advocacy, I engage policy makers, stakeholders and community influencer,  gatekeepers to prioritize health and wellbeing of young people, ensuring supportive policies and collaborative action for sustainable well-being.'},
              {icon:'fa-chart-line', text:'I drive awareness and demand creation within communities, inspiring collective responsibility and action towards better health outcomes for adolescents and youth.'}
            ].map((f,i)=>`
              <div class="col-md-6">
                <div class="role-card hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover" data-aos="${i%2?'fade-left':'fade-right'}" data-aos-delay="${100+i*50}">
                  <div class="role-icon animate-float"><i class="fas ${f.icon}"></i></div>
                  <p>${f.text}</p>
                </div>
              </div>`).join('')}
            </div>
          </div>`; })()
          },
            // Nine steps
            {
            id: 'ch1-lesson-5',
            title: 'Nine interactive steps to become a certified Young Health Ambassador',
            icon: 'fa-clipboard-check',
            gradientClass: 'bg-gradient-orange',
            audioFile: '4.mp3',
            quiz: { passingScore: 80, questions: [{ id:'q1d', question: 'Which step confirms identity?', options:['Registration','Unique ID Generation','Assessment','Certificate download'], correctAnswer:1 }] },
            content: (function(){ 
              const steps = [
              { text:'Online registration in Young Health Ambassador Program (YHAP)', icon:'fa-pen-to-square', color:'purple' },
              { text:'Unique ID Generation', icon:'fa-id-card', color:'blue' },
              { text:'Log in to the Website/App', icon:'fa-right-to-bracket', color:'teal' },
              { text:'Access Young Health Ambassador Program (YAHP) course', icon:'fa-book-open', color:'orange' },
              { text:'Complete YHAP course', icon:'fa-list-check', color:'green' },
              { text:'Obtain passing marks in final assessment', icon:'fa-trophy', color:'pink' },
              { text:'System generated certificate', icon:'fa-certificate', color:'violet' },
              { text:'Self declaration/Oath Taking', icon:'fa-hand', color:'emerald' },
              { text:'Final Certificate (Course validity-2 years)', icon:'fa-award', color:'tangerine' }
              ];
              return `
            <div class="lesson-slide">
            <h2 class="slide-title gradient-text gradient-text-hover hover-lift-sm transition-base" data-aos="fade-up">Eligibility and Steps to be a YHA</h2>
            <div class="alert alert-info mb-4 hover-lift-sm transition-base" data-aos="fade-up" data-aos-delay="50">
              <h5><i class="fas fa-info-circle me-2"></i>Eligibility</h5>
              <p class="mb-0">Any person aged <strong>15-24 years</strong> can become a Young Health Ambassador.</p>
            </div>
            <div class="row g-3">
              ${steps.map((s,i)=>`
              <div class="col-md-4" data-aos="fade-up" data-aos-delay="${120+i*40}">
              <div class="step-card hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover text-center">
                <div class="step-icon bg-gradient-${s.color} animate-float-slow d-inline-flex align-items-center justify-content-center"
                   style="width:64px; height:64px; border-radius:50%; animation-duration:6s; animation-delay:${(i*0.2).toFixed(1)}s">
                <i class="fas ${s.icon} text-white" style="font-size:1.35rem"></i>
                </div>
                <h6 class="mt-2">${s.text}</h6>
              </div>
              </div>`).join('')}
            </div>
            </div>`; })()
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
        ]
      },
      {
        id: 'ch-2',
        title: 'Chapter-2: Global and Bangladesh Scenario',
        lessons: [
          {
            id: 'ch2-lesson-1',
            title: 'Global Youth Population and Demographics',
            icon: 'fa-map-location-dot',
            gradientClass: 'bg-gradient-blue',
            audioFile: '',
            quiz: { 
              passingScore: 60, 
              questions: [
                { id:'q2a', question: 'What percentage of the world’s youth live in developing countries?', options:['90%','75%','60%','40%'], correctAnswer:0 }
              ]
            },
            content: (function(){ return `
            <div class="lesson-slide">
              <h2 class="slide-title gradient-text" data-aos="fade-up">Global Youth Population and Demographics</h2>

              <!-- Step 1 – Global Overview global-overview  style="filter: drop-shadow(0 10px 30px rgba(0,0,0,.2));"-->
              <section class="text-center py-5 mb-4" data-aos="fade-up" style="position:relative; overflow:hidden;">
                <div class="container">
                  <img src="img/Distribution/globe.jpg" class="img-fluid mx-auto d-block mb-3 rounded-4" alt="Globe showing youth population">
                  <div class="globe-text-wrap">
                    <h3 class="fw-bold display-5" style="color:#fff; text-shadow:0 6px 30px rgba(0,0,0,.25)"><span id="globalCounter" data-target="90">0</span>%</h3>
                    <p class="lead mt-2 text-white-75">The world counts <strong>1.8 billion</strong> young people aged 10–24.</p>
                    <p class="mb-0 text-white-75">Around <strong>90%</strong> live in developing countries.</p>
                  </div>
                </div>
              </section>

              <!-- Step 2 – Global Youth Population by Region (Map + Doughnut) -->
              <section class="world-youth-map-and-chart py-4 mb-4 rounded-4" data-aos="zoom-in">
                <div class="container">
                  <div class="row g-3 align-items-center">
                    <div class="col-lg-12">
                      <div class="modern-card glass-card">
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
            </div>`; })()
          },
          {
            id: 'ch2-lesson-2',
            title: 'Why young people’s health and wellbeing is important?',
            icon: 'fa-heart-pulse',
            gradientClass: 'bg-gradient-green',
            audioFile: '2.mp3',
            quiz: { passingScore: 60, questions: [{ id:'q2b', question: 'Investments in adolescents yield a…', options:['Single benefit','No return','Triple dividend','Unknown'], correctAnswer:2 }] },
            content: (function(){return `
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
                  <div class="col-lg-6">
                    <div class="modern-card glass-card pyramid-path pyramid-positive">
                      <div class="pyramid-head"><i class="fa-solid fa-chart-line"></i> Harnessing the Demographic Dividend</div>
                      <ul class="pyramid-steps">
                        <li class="pyramid-step" data-aos="fade-up" data-aos-delay="60"><i class="fa-solid fa-person-dress"></i> Adolescent Girl</li>
                        <li class="pyramid-step" data-aos="fade-up" data-aos-delay="120"><i class="fa-solid fa-school"></i> School</li>
                        <li class="pyramid-step" data-aos="fade-up" data-aos-delay="180"><i class="fa-solid fa-briefcase"></i> Employment</li>
                        <li class="pyramid-step" data-aos="fade-up" data-aos-delay="240"><i class="fa-solid fa-piggy-bank"></i> Wealth/child investment</li>
                        <li class="pyramid-step" data-aos="fade-up" data-aos-delay="300"><i class="fa-solid fa-graduation-cap"></i> Lifelong learning</li>
                        <li class="pyramid-step" data-aos="fade-up" data-aos-delay="360"><i class="fa-solid fa-people-arrows"></i> Work-life Balance</li>
                        <li class="pyramid-step" data-aos="fade-up" data-aos-delay="420"><i class="fa-solid fa-location-dot"></i> Security of Place</li>
                        <li class="pyramid-step highlight" data-aos="fade-up" data-aos-delay="480"><i class="fa-solid fa-hands-holding-child"></i> Healthy children</li>
                        <li class="pyramid-step apex" data-aos="fade-up" data-aos-delay="540"><i class="fa-solid fa-trophy"></i> Demographic Dividend</li>
                        <li class="pyramid-step" data-aos="fade-up" data-aos-delay="600"><i class="fa-solid fa-shield-heart"></i> Secure old-age</li>
                      </ul>
                    </div>
                  </div>
                  <!-- Negative Path -->
                  <div class="col-lg-6">
                    <div class="modern-card glass-card pyramid-path pyramid-negative">
                      <div class="pyramid-head"><i class="fa-solid fa-triangle-exclamation"></i> Missed Demographic Dividend</div>
                      <ul class="pyramid-steps">
                        <li class="pyramid-step" data-aos="fade-up" data-aos-delay="60"><i class="fa-solid fa-person-dress"></i> Adolescent Girl</li>
                        <li class="pyramid-step" data-aos="fade-up" data-aos-delay="120"><i class="fa-solid fa-ring"></i> Child Marriage</li>
                        <li class="pyramid-step" data-aos="fade-up" data-aos-delay="180"><i class="fa-solid fa-person-walking-arrow-right"></i> Leaving School</li>
                        <li class="pyramid-step" data-aos="fade-up" data-aos-delay="240"><i class="fa-solid fa-helmet-safety"></i> Informal work</li>
                        <li class="pyramid-step" data-aos="fade-up" data-aos-delay="300"><i class="fa-solid fa-rotate"></i> Repeat Pregnancies</li>
                        <li class="pyramid-step" data-aos="fade-up" data-aos-delay="360"><i class="fa-solid fa-person-pregnant"></i> Maternal morbidity</li>
                        <li class="pyramid-step" data-aos="fade-up" data-aos-delay="420"><i class="fa-solid fa-child"></i> Child illness & death</li>
                        <li class="pyramid-step" data-aos="fade-up" data-aos-delay="480"><i class="fa-solid fa-house-crack"></i> Insecurity & Displacement</li>
                        <li class="pyramid-step" data-aos="fade-up" data-aos-delay="540"><i class="fa-solid fa-shield-halved"></i> Insecure old-age</li>
                        <li class="pyramid-step apex" data-aos="fade-up" data-aos-delay="600"><i class="fa-solid fa-circle-xmark"></i> Missed Demographic Dividend</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>`; })()
          },
          {
            id: 'ch2-lesson-3',
            title: 'Global scenario of mortality and morbidity among young people',
            icon: 'fa-globe',
            gradientClass: 'bg-gradient-purple',
            audioFile: '',
            quiz: { passingScore: 60, questions: [{ id:'q2c', question: 'A leading cause of adolescent death includes…', options:['Common cold','Road injuries','Allergies','None'], correctAnswer:1 }] },
            content: (function(){return `
              <div class="lesson-slide">
                <h2 class="slide-title gradient-text" data-aos="fade-up">Global scenario of mortality and morbidity among young people</h2>

                <!-- Key Global Insights -->
                <section class="my-3" data-aos="fade-up" data-aos-delay="40">
                  <h5 class="gradient-text mb-2">Key global insights</h5>
                  <div class="row g-3">
                    ${[
                      { icon:'fa-heart-pulse', color:'bg-gradient-pink', text:'Globally over <strong>1.5 million</strong> young people aged 10–24 years died in 2021 — about <strong>4500 every day</strong>.' },
                      { icon:'fa-shield-halved', color:'bg-gradient-green', text:'Young adolescents aged <strong>10–14</strong> have the <strong>lowest risk of death</strong> among all age groups.' },
                      { icon:'fa-car-burst', color:'bg-gradient-orange', text:'<strong>Injuries</strong> (including road traffic injuries and drowning), <strong>interpersonal violence</strong>, <strong>self-harm</strong>, and <strong>maternal conditions</strong> are leading causes of death.' },
                      { icon:'fa-brain', color:'bg-gradient-purple', text:'<strong>Half</strong> of all mental health disorders in adulthood start by <strong>age 18</strong>, but most cases are <strong>undetected</strong> and <strong>untreated</strong>.' },
                      { icon:'fa-wine-bottle', color:'bg-gradient-blue', text:'<strong>Early substance use</strong> is linked to higher risks of dependence and other problems in adult life; younger people are <strong>disproportionately affected</strong>.' }
                    ].map((card, i)=>`
                      <div class="col-md-6">
                        <div class="modern-card glass-card icon-spin-on-hover" data-aos="zoom-in" data-aos-delay="${100 + i*60}">
                          <div class="d-flex flex-col align-items-start gap-3">
                            <span class="${card.color}" style="width:48px; height:48px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; color:#fff; flex-shrink:0;">
                              <i class="fa-solid ${card.icon}"></i>
                            </span>
                            <div>
                              <p class="mb-0">${card.text}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    `).join('')}
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
                        { label:'Road traffic accident', icon:'fa-car-burst', color:'bg-gradient-orange' },
                        { label:'Suicide', icon:'fa-heart-crack', color:'bg-gradient-pink' },
                        { label:'Violence', icon:'fa-hand-fist', color:'bg-gradient-green' },
                        { label:'Lower Respiratory Tract infection', icon:'fa-lungs', color:'bg-gradient-blue' },
                        { label:'HIV/AIDS', icon:'fa-virus', color:'bg-gradient-teal' }
                      ].map((cause, i)=>`
                        <div class="col-12 col-md-6 col-lg-4">
                          <div class="modern-card glass-card icon-spin-on-hover" data-aos="zoom-in" data-aos-delay="${120 + i*60}">
                            <div class="d-flex align-items-center gap-3">
                              <span class="${cause.color}" style="width:48px; height:48px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; color:#fff; flex-shrink:0;">
                                <i class="fa-solid ${cause.icon}"></i>
                              </span>
                              <h6 class="mb-0">${cause.label}</h6>
                            </div>
                          </div>
                        </div>
                      `).join('')}
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
              </div>`; })()
          },
          {
            id: 'ch2-lesson-4',
            title: 'Bangladesh scenario of mortality and morbidity among young people',
            icon: 'fa-flag',
            gradientClass: 'bg-gradient-blue',
            audioFile: '',
            quiz: { passingScore: 60, questions: [{ id:'q2c-bd', question: 'Among Bangladeshi adolescent males (10–19), which is a leading cause of death?', options:['Road accidents','Cancer','Diabetes','Malaria'], correctAnswer:0 }] },
            content: (function(){ return `
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
                            {label:'Road accidents', icon:'fa-car-burst', color:'bg-gradient-orange'},
                            {label:'Diarrhea', icon:'fa-bacteria', color:'bg-gradient-blue'},
                            {label:'Drowning', icon:'fa-water', color:'bg-gradient-teal'},
                            {label:'Tuberculosis', icon:'fa-lungs', color:'bg-gradient-purple'},
                            {label:'Suicide', icon:'fa-heart-crack', color:'bg-gradient-pink'}
                          ].map((item,i)=>`
                            <li class="d-flex align-items-center gap-2 icon-spin-on-hover" data-aos="fade-up" data-aos-delay="${140+i*40}">
                              <span class="${item.color}" style="width:36px; height:36px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; color:#fff"><i class="fa-solid ${item.icon}"></i></span>
                              <span>${item.label}</span>
                            </li>
                          `).join('')}
                        </ul>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="modern-card glass-card" data-aos="zoom-in" data-aos-delay="120">
                        <h6 class="mb-2 d-flex align-items-center gap-2"><span class="badge-pill">Females</span></h6>
                        <ul class="list-unstyled d-grid gap-2 mb-0">
                          ${[
                            {label:'Diarrhea', icon:'fa-bacteria', color:'bg-gradient-blue'},
                            {label:'Tuberculosis', icon:'fa-lungs', color:'bg-gradient-purple'},
                            {label:'Road accidents', icon:'fa-car-burst', color:'bg-gradient-orange'},
                            {label:'Maternal mortality', icon:'fa-person-pregnant', color:'bg-gradient-pink'},
                            {label:'Lower respiratory tract infections', icon:'fa-lungs', color:'bg-gradient-green'}
                          ].map((item,i)=>`
                            <li class="d-flex align-items-center gap-2 icon-spin-on-hover" data-aos="fade-up" data-aos-delay="${160+i*40}">
                              <span class="${item.color}" style="width:36px; height:36px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; color:#fff"><i class="fa-solid ${item.icon}"></i></span>
                              <span>${item.label}</span>
                            </li>
                          `).join('')}
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
                      {label:'Heart disease', icon:'fa-heart', color:'bg-gradient-pink'},
                      {label:'Stroke', icon:'fa-brain', color:'bg-gradient-purple'},
                      {label:'Respiratory', icon:'fa-lungs', color:'bg-gradient-blue'},
                      {label:'Infection', icon:'fa-virus', color:'bg-gradient-green'},
                      {label:'Cancer', icon:'fa-ribbon', color:'bg-gradient-orange'},
                      {label:'Obstetric', icon:'fa-person-pregnant', color:'bg-gradient-pink'},
                      {label:'Road traffic', icon:'fa-car-burst', color:'bg-gradient-tangerine'},
                      {label:'Drowning & accidents', icon:'fa-water', color:'bg-gradient-teal'},
                      {label:'Other', icon:'fa-circle-dot', color:'bg-gradient-blue'}
                    ].map((l)=>`
                      <span class="badge-pill" title="${l.label}"><i class="fa-solid ${l.icon} me-1"></i>${l.label}</span>
                    `).join('')}
                  </div>
                </section>
              </div>`; })()
          },
          {
            id: 'ch2-lesson-5',
            title: 'Child marriage and teenage pregnancies',
            icon: 'fa-child-reaching',
            gradientClass: 'bg-gradient-orange',
            audioFile: '',
            quiz: { passingScore: 60, questions: [{ id:'q2d', question: 'Ending child marriage helps protect…', options:['Education and health','Only sports','Only economy','None'], correctAnswer:0 }] },
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
                            { label: 'Bangladesh', icon: 'fa-flag', color: 'bg-gradient-pink' },
                            { label: 'Nepal', icon: 'fa-mountain', color: 'bg-gradient-orange' },
                            { label: 'Afghanistan', icon: 'fa-earth-asia', color: 'bg-gradient-violet' },
                            { label: 'India', icon: 'fa-landmark', color: 'bg-gradient-blue' },
                            { label: 'Bhutan', icon: 'fa-hill-rockslide', color: 'bg-gradient-teal' },
                            { label: 'Pakistan', icon: 'fa-mosque', color: 'bg-gradient-tangerine' },
                            { label: 'Sri Lanka', icon: 'fa-umbrella-beach', color: 'bg-gradient-emerald' },
                            { label: 'Maldives', icon: 'fa-water', color: 'bg-gradient-emerald' },
                            { label: 'South Asia (region)', icon: 'fa-globe-asia', color: 'bg-gradient-purple' },
                            { label: 'World', icon: 'fa-earth-americas', color: 'bg-gradient-green' }
                          ].map((c) => `
                            <span class="badge-pill ${c.color}" title="${c.label}"><i class="fa-solid ${c.icon} me-1"></i>${c.label}</span>
                          `).join('')}
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
              </div>`
          },
          {
            id: 'ch2-lesson-6',
            title: 'Determinants for adolescent health and well-being',
            icon: 'fa-triangle-exclamation',
            gradientClass: 'bg-gradient-pink',
            audioFile: '',
            quiz: { passingScore: 60, questions: [{ id:'q2e', question: 'Determinants include…', options:['Only nutrition','Multiple domains','Only activity','None'], correctAnswer:1 }] },
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
                      {label:'Unintentional Injury', icon:'fa-car-burst', color:'bg-gradient-orange', delay:140},
                      {label:'Violence', icon:'fa-hand-back-fist', color:'bg-gradient-pink', delay:160},
                      {label:'SRH, HIV and other STI', icon:'fa-venus-mars', color:'bg-gradient-violet', delay:180},
                      {label:'Communicable Diseases', icon:'fa-virus', color:'bg-gradient-green', delay:200},
                      {label:'Non-Communicable Diseases', icon:'fa-heart-pulse', color:'bg-gradient-emerald', delay:220},
                      {label:'Mental Health', icon:'fa-brain', color:'bg-gradient-blue', delay:240},
                      {label:'Alcohol and Drug Use', icon:'fa-wine-bottle', color:'bg-gradient-tangerine', delay:260},
                      {label:'Tobacco use', icon:'fa-smoking', color:'bg-gradient-teal', delay:280},
                      {label:'Physical activity and Sedentary behavior', icon:'fa-person-running', color:'bg-gradient-cyan', delay:300},
                      {label:'Nutrition', icon:'fa-utensils', color:'bg-gradient-purple', delay:320}
                    ].map((d)=>`
                      <div class="col-sm-6 col-md-4 col-lg-3" data-aos="zoom-in" data-aos-delay="${d.delay}">
                        <div class="component-card hover-lift-sm hover-shadow-glow transition-base">
                          <div class="component-icon ${d.color} animate-float" aria-hidden="true">
                            <i class="fas ${d.icon}"></i>
                          </div>
                          <h6 class="mt-2 mb-0">${d.label}</h6>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </section>
              </div>`
          },
          {
            id: 'ch2-lesson-7',
            title: 'Why young people need special care?',
            icon: 'fa-user-nurse',
            gradientClass: 'bg-gradient-teal',
            audioFile: '',
            quiz: { passingScore: 60, questions: [{ id:'q2f', question: 'Adolescent services should be…', options:['Judgmental','Exclusive','Non-judgmental and confidential','Irregular'], correctAnswer:2 }] },
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
                        title:'Adolescents have diversified needs',
                        desc:'Needs in SRHR, mental health and other NCDs, nutrition, violence against adolescents, vulnerable adolescents etc.',
                        icon:'fa-layer-group',
                        color:'bg-gradient-violet',
                        delay:100
                      },
                      {
                        title:'Unaware of the laws, policies, rights',
                        desc:'Sexual and reproductive health rights, Child rights',
                        icon:'fa-scale-balanced',
                        color:'bg-gradient-emerald',
                        delay:130
                      },
                      {
                        title:'Limited ability to execute the rights',
                        desc:'Lack of confidence, parental influence, peer pressure',
                        icon:'fa-hands-holding',
                        color:'bg-gradient-tangerine',
                        delay:160
                      },
                      {
                        title:'Barriers in accessing information, knowledge, skills',
                        desc:'Social stigma; discomfort among parents, family members, peers, teachers to talk about adolescent health issues',
                        icon:'fa-book-open-reader',
                        color:'bg-gradient-rose',
                        delay:190
                      },
                      {
                        title:'Barriers in accessing the health services',
                        desc:'Limited care seeking behaviors; no dedicated service (no separate space, no privacy, no dedicated staff); negligence and unawareness among service providers',
                        icon:'fa-hospital-user',
                        color:'bg-gradient-cyan',
                        delay:220
                      }
                    ].map((c) => `
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
                    `).join('')}
                  </div>
                </section>

                <!-- Supportive visual -->
              </div>`
          },
          {
            id: 'ch2-lesson-8',
            title: 'How young health advances the SDGs',
            icon: 'fa-diagram-project',
            gradientClass: 'bg-gradient-violet',
            audioFile: '',
            quiz: { passingScore: 60, questions: [{ id:'q2g', question: 'Young health impacts how many SDGs?', options:['Only 1','Several','None','Unknown'], correctAnswer:1 }] },
            content: `
              <div class="lesson-slide">
                <h2 class="slide-title gradient-text" data-aos="fade-up">Young health and the SDGs</h2>
                <div class="row g-3 text-center">${[
                  {img:'img/sdc/no-proverty.png', label:'SDG 1'},
                  {img:'img/sdc/zero-hunger.png', label:'SDG 2'},
                  {img:'img/sdc/good-health.png', label:'SDG 3'},
                  {img:'img/sdc/quality.png', label:'SDG 4'},
                  {img:'img/sdc/gender.png', label:'SDG 5'},
                  {img:'img/sdc/decentpng.png', label:'SDG 8'},
                  {img:'img/sdc/peace.png', label:'SDG 16'}
                ].map((s,i)=>`<div class="col-6 col-md-4 col-lg-3"><div class="modern-card glass-card" style="padding:1rem"><img src="${s.img}" alt="${s.label}" style="max-height:80px; object-fit:contain"><p class="mt-2 mb-0 fw-semibold">${s.label}</p></div></div>`).join('')}</div>
              </div>`
          },
          {
            id: 'ch2-lesson-9',
            title: 'A shared agenda for adolescent health',
            icon: 'fa-handshake-angle',
            gradientClass: 'bg-gradient-emerald',
            audioFile: '',
            quiz: { passingScore: 60, questions: [{ id:'q2h', question: 'Put whom at the center of design?', options:['Providers','Parents','Adolescents','Donors'], correctAnswer:2 }] },
            content: `
              <div class="lesson-slide">
                <h2 class="slide-title gradient-text" data-aos="fade-up">Global agenda</h2>
                <div class="row g-3 align-items-center">
                  <div class="col-lg-6"><ul class="ps-3"><li>Adolescents at the center of design and delivery</li><li>Community systems and school-health platforms</li><li>Use data to target and improve outcomes</li></ul></div>
                  <div class="col-lg-6"><figure class="image-card" style="height:320px"><img src="img/agenda/agenda.jpg" alt="Agenda"></figure></div>
                </div>
              </div>`
          },
          {
            id: 'ch2-lesson-10',
            title: 'Policies, strategies and plans',
            icon: 'fa-file-shield',
            gradientClass: 'bg-gradient-blue',
            audioFile: '',
            quiz: { passingScore: 60, questions: [{ id:'q2i', question: 'National directions guide…', options:['Service delivery and coordination','Only events','Only media','None'], correctAnswer:0 }] },
            content: `
              <div class="lesson-slide">
                <h2 class="slide-title gradient-text" data-aos="fade-up">Policies, strategies and plans</h2>
                <div class="row g-3">${[
                  {img:'img/policies/policy.png', title:'Policy framework'},
                  {img:'img/policies/strategy.png', title:'Strategy and roadmap'},
                  {img:'img/policies/national-health.png', title:'National health policy'},
                  {img:'img/policies/national-strategy.jpg', title:'Adolescent health strategy'},
                  {img:'img/plan/national-plan.png', title:'National action plan'},
                  {img:'img/policies/adolsent.png', title:'Adolescent-friendly services'}
                ].map((p)=>`<div class="col-sm-6 col-lg-4"><article class="modern-card"><figure class="image-card" style="height:180px"><img src="${p.img}" alt="${p.title}"></figure><h6 class="mt-2">${p.title}</h6></article></div>`).join('')}</div>
              </div>`
          },
          {
            id: 'ch2-lesson-11',
            title: 'Government’s commitment',
            icon: 'fa-landmark',
            gradientClass: 'bg-gradient-tangerine',
            audioFile: '',
            quiz: { passingScore: 60, questions: [{ id:'q2j', question: 'Bangladesh invests in adolescent health via…', options:['Policies and partnerships','Only posters','Only apps','None'], correctAnswer:0 }] },
            content: `
              <div class="lesson-slide">
                <h2 class="slide-title gradient-text" data-aos="fade-up">Government’s commitment</h2>
                <div class="row g-3 align-items-center">
                  <div class="col-md-6"><ul class="ps-3"><li>Strengthen adolescent-friendly services</li><li>Scale through schools and communities</li><li>Digital tools for learning and accountability</li></ul></div>
                  <div class="col-md-6"><figure class="image-card" style="height:300px"><img src="img/plan/national-plan.png" alt="Plan"></figure></div>
                </div>
              </div>`
          },
          {
            id: 'ch2-lesson-12',
            title: 'A combined effort',
            icon: 'fa-people-group',
            gradientClass: 'bg-gradient-green',
            audioFile: '',
            quiz: { passingScore: 60, questions: [{ id:'q2k', question: 'Whole-of-society approach includes…', options:['Only health','Multiple sectors','Only schools','None'], correctAnswer:1 }] },
            content: `
              <div class="lesson-slide">
                <h2 class="slide-title gradient-text" data-aos="fade-up">A combined effort</h2>
                <div class="row g-3 align-items-center">
                  <div class="col-lg-6 order-lg-2"><figure class="image-card" style="height:320px"><img src="img/effort.png" alt="Effort"></figure></div>
                  <div class="col-lg-6 order-lg-1"><div class="d-flex flex-wrap gap-2"><span class="badge-pill">Health sector</span><span class="badge-pill">Education</span><span class="badge-pill">Social protection</span><span class="badge-pill">Civil society</span><span class="badge-pill">Private sector</span></div></div>
                </div>
              </div>`
          },
          {
            id: 'ch2-lesson-13',
            title: 'Turning insight into action',
            icon: 'fa-rocket',
            gradientClass: 'bg-gradient-rose',
            audioFile: '',
            quiz: { passingScore: 60, questions: [{ id:'q2l', question: 'Actions include…', options:['Boost health literacy','Reduce services','Ignore data','Exclude young'], correctAnswer:0 }] },
            content: `
              <div class="lesson-slide">
                <h2 class="slide-title gradient-text" data-aos="fade-up">Recommendations</h2>
                <ul class="ps-3 mb-3"><li>Boost health literacy with age-appropriate content</li><li>Expand adolescent-friendly services</li><li>Strengthen referral and protection</li><li>Champion young leadership</li><li>Use data for equity and improvement</li></ul>
                <figure class="image-card" style="height:300px"><img src="img/recomendations.png" alt="Recommendations"></figure>
              </div>`
          }
        ]
      }
    ],
    // Flat lessons kept for backward compatibility (legacy renderers)
    lessons: [
      {
        id: 'lesson-1',
        title: 'Introduction to YHAP',
        icon: 'fa-heartbeat',
        gradientClass: 'bg-gradient-purple',
        audioFile: '1.mp3',
        quiz: {
          passingScore: 80,
          questions: [
            {
              id: 'q1',
              question: '১. বিশ্বস্বাস্থ্য সংস্থার মতে বয়ঃসন্ধি কাল কোনটি?',
              options: [
                'ক) ১০ থেকে ১৯ বছর',
                'খ) ১১ থেকে ১৯ বছর',
                'গ) ০৯ থেকে ১৯ বছর',
                'ঘ) ০৯ থেকে ১৯ বছর'
              ],
              correctAnswer: 0
            },
            {
              id: 'q2',
              question: '২. বয়ঃসন্ধিকাল কেন বিপদজনক?',
              options: [
                'ক. বাস্তবতা থেকে অভিজ্ঞতা কম থাকে',
                'খ. অন্যের পরোচনায় বিপদগামী হয়',
                'গ. বুদ্ধির চেয়ে আবেগ বেশি কাজ করে',
                'ঘ. যৌন আচরণের ফলাফল সম্পর্কে ধারণা কম',
                'ঙ. উপরের সবকটি'
              ],
              correctAnswer: 4
            },
            {
              id: 'q3',
              question: '৩. খাদ্য দেহে কি কাজ করে',
              options: [
                'ক. বৃদ্ধি রোধ করে',
                'খ. ক্ষয়পূরণ',
                'গ. শক্তি দেয়',
                'ঘ. উপরের সবগুলো কাজ করে'
              ],
              correctAnswer: 3
            }
          ]
        },
        content: `
          <div class="lesson-slide">
            <h2 class="definition-card alert-info hover-lift-sm transition-base aos-init aos-animate gradient-text gradient-text-hover hover-lift-sm transition-base" data-aos="fade-up">Young Health Ambassador Program (YHAP)</h2>
            <div class="floating-bg" aria-hidden="true">
              <span class="float-elem" style="top:8%; left:6%; width:70px; height:70px;"></span>
              <span class="float-elem" style="top:35%; right:10%; width:90px; height:90px;"></span>
              <span class="float-elem" style="bottom:12%; left:14%; width:80px; height:80px;"></span>
            </div>
            
            <div class=" definition-card hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover" data-aos="fade-up" data-aos-delay="100">
              <h4 class="gradient-text transition-base"><i class="fas fa-users me-2 animate-float"></i>Young</h4>
              <p>As per United Nations, young refers to those persons aged between the ages of <strong>15 and 24</strong> without prejudice to other definitions by Member States. It is a period of transition from the dependence of childhood to adulthood's independence. Young People covers the age range 10-24 years and Adolescents as individuals in the 10-19 years age group.</p>
            </div>

            <div class="definition-card hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover" data-aos="fade-up" data-aos-delay="200">
              <h4 class="gradient-text transition-base"><i class="fas fa-heartbeat me-2 animate-float"></i>Health</h4>
              <p>As per World Health Organization (WHO), health is defined as a state of complete <strong>physical, mental, and social well-being</strong>, and not merely the absence of disease or infirmity.</p>
            </div>

            <div class="program-intro hover-lift-sm transition-base" data-aos="fade-up" data-aos-delay="250">
              <h4 class="gradient-text transition-base"><i class="fa-solid fa-lightbulb me-2 animate-float"></i>About YHAP</h4>
              <p>The Young Health Ambassador Programme (YHAP) is a strategic joint initiative of the Ministry of Health and Family Welfare (MOHFW) and UNICEF. The programme is designed to empower young by enhancing their health awareness and building their capacity in primary prevention and health promotion thereby equipping them to serve as informed health ambassador.</p>
              
              <p>These programs equip young with knowledge and skills in areas like physical health including SRH and mental wellbeing, enabling them to become active advocates for health and influence healthier choices within their communities and networks.</p>
            </div>
          </div>
        `
      },
      {
        id: 'lesson-2',
        title: 'Core Components',
        icon: 'fa-layer-group',
        gradientClass: 'bg-gradient-blue',
        audioFile: '2.mp3',
        quiz: {
          passingScore: 80,
          questions: [
            {
              id: 'q4',
              question: '৪. বাল্য বিবাহের ফলে',
              options: [
                'ক. অল্পবয়সে গর্ভধারণ ঝুঁকিপূর্ণ হয়',
                'খ. মাতৃ-মৃত্যুরহার বৃদ্ধি পায়',
                'গ. অল্পবয়সি মেয়েদের অপুষ্টি ও রক্ত স্বল্পতার প্রকোপ বাড়ে',
                'ঘ. উপরের সব কটি'
              ],
              correctAnswer: 3
            },
            {
              id: 'q5',
              question: '৫. বাংলাদেশের মোট জনগোষ্ঠির কত জন কিশোর-কিশোরী?',
              options: [
                'ক. ৩৬ মিলিয়ন',
                'খ. ৩৭ মিলিয়ন',
                'গ. ৩২ মিলিয়ন',
                'ঘ. ৩৪ মিলিয়ন'
              ],
              correctAnswer: 3
            },
            {
              id: 'q6',
              question: '৬. জেন্ডার হলো',
              options: [
                'ক. সমাজ কর্তৃক সৃষ্ট',
                'খ. স্রষ্টা কর্তৃক সৃষ্ট',
                'গ. উপরের দুটিই',
                'ঘ. উপরের কোনটিই নয়'
              ],
              correctAnswer: 0
            }
          ]
        },
        content: `
          <div class="lesson-slide">
            <h2 class="slide-title gradient-text gradient-text-hover hover-lift-sm transition-base" data-aos="fade-up">Core Components of YHAP</h2>
            <div class="floating-bg" aria-hidden="true">
              <span class="float-elem" style="top:10%; left:8%; width:70px; height:70px;"></span>
              <span class="float-elem" style="bottom:10%; right:12%; width:90px; height:90px;"></span>
            </div>
            
            <div class="row g-4">
              <div class="col-md-6">
                <div class="component-card hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover" data-aos="zoom-in" data-aos-delay="100">
                  <div class="component-icon bg-gradient-purple animate-float">
                    <i class="fas fa-book-medical"></i>
                  </div>
                  <h5 class="gradient-text transition-base">Health Literacy</h5>
                  <p>YHAP builds foundational health literacy through comprehensive training on essential health and wellbeing. This equips ambassadors with the expertise to act as credible sources of information and effective advocates for prevention and promotion.</p>
                </div>
              </div>

              <div class="col-md-6">
                <div class="component-card hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover" data-aos="zoom-in" data-aos-delay="150">
                  <div class="component-icon bg-gradient-blue animate-float">
                    <i class="fas fa-graduation-cap"></i>
                  </div>
                  <h5 class="gradient-text transition-base">Health Education & Awareness</h5>
                  <p>Young Health Ambassadors (YHAs) will create health education and awareness through campaigns on key health issues, comprehensive trainings, mentorships etc., ensuring accurate dissemination of crucial health information.</p>
                </div>
              </div>

              <div class="col-md-6">
                <div class="component-card hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover" data-aos="zoom-in" data-aos-delay="200">
                  <div class="component-icon bg-gradient-teal animate-float">
                    <i class="fas fa-users"></i>
                  </div>
                  <h5 class="gradient-text transition-base">Peer to Peer Influence</h5>
                  <p>The programme is built on the principle that peer-to-peer engagement is a powerful catalyst for change. By facilitating supportive mentorship and encouraging positive role-modeling among contemporaries.</p>
                </div>
              </div>

              <div class="col-md-6">
                <div class="component-card hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover" data-aos="zoom-in" data-aos-delay="250">
                  <div class="component-icon bg-gradient-orange animate-float">
                    <i class="fas fa-hand-fist"></i>
                  </div>
                  <h5 class="gradient-text transition-base">Empowerment</h5>
                  <p>YHAP empowers individuals by equipping them with the tools, confidence, and skills needed to take effective control and contribute to the economic development, creating a productive, resilient, and healthy workforce.</p>
                </div>
              </div>

              <div class="col-md-6">
                <div class="component-card hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover" data-aos="zoom-in" data-aos-delay="300">
                  <div class="component-icon bg-gradient-green animate-float">
                    <i class="fas fa-flag"></i>
                  </div>
                  <h5 class="gradient-text transition-base">Leadership</h5>
                  <p>The program cultivates leadership qualities in young, preparing them to become effective, ethical, and inspiring agents of change in their communities.</p>
                </div>
              </div>

              <div class="col-md-6">
                <div class="component-card hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover" data-aos="zoom-in" data-aos-delay="350">
                  <div class="component-icon bg-gradient-pink animate-float">
                    <i class="fas fa-bullhorn"></i>
                  </div>
                  <h5 class="gradient-text transition-base">Advocacy</h5>
                  <p>YHAP builds foundational competencies in health advocacy, empowering young to effectively raise voice, articulate public health priorities to drive systemic reform.</p>
                </div>
              </div>
            </div>
          </div>
        `
      },
      {
        id: 'lesson-3',
        title: 'Roles & Responsibilities',
        icon: 'fa-user-shield',
        gradientClass: 'bg-gradient-teal',
        audioFile: '3.mp3',
        quiz: {
          passingScore: 80,
          questions: [
            {
              id: 'q7',
              question: '৭. জীবন দক্ষতা হলো',
              options: [
                'ক. প্রতিকুল পরিস্থিতি দক্ষতার সাথে মোকাবেলা করা',
                'খ. তাড়াতাড়ি করে কিছুনা করা',
                'গ. কিছু করতে না পারা',
                'ঘ. কোনটিই নয়'
              ],
              correctAnswer: 0
            }
          ]
        },
        content: `
          <div class="lesson-slide">
            <h2 class="slide-title gradient-text gradient-text-hover hover-lift-sm transition-base" data-aos="fade-up">Roles and Responsibilities of Health Ambassador</h2>
            <h3 class="text-center mb-4 gradient-text hover-lift-sm transition-base" data-aos="fade-up" data-aos-delay="50">Who am I?</h3>
            
            <div class="row g-4">
              <div class="col-md-6">
                <div class="role-card hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover" data-aos="fade-right" data-aos-delay="100">
                  <div class="role-icon animate-float">
                    <i class="fas fa-shield-heart"></i>
                  </div>
                  <p>I am equipped with expertise in safeguarding adolescent and young health and well-being, enabling me to contribute meaningfully to society while harnessing the triple dividend of health, social, and economic benefits</p>
                </div>
              </div>

              <div class="col-md-6">
                <div class="role-card hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover" data-aos="fade-left" data-aos-delay="150">
                  <div class="role-icon animate-float">
                    <i class="fas fa-share-nodes"></i>
                  </div>
                  <p>I actively empower my peers by sharing knowledge on health promotion, disease prevention, and holistic well-being, fostering informed decision-making among adolescents and young</p>
                </div>
              </div>

              <div class="col-md-6">
                <div class="role-card hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover" data-aos="fade-right" data-aos-delay="200">
                  <div class="role-icon animate-float">
                    <i class="fas fa-handshake"></i>
                  </div>
                  <p>Through advocacy, I engage policy makers, stakeholders and community influencer, gatekeepers to prioritize adolescent health, ensuring supportive policies and collaborative action for sustainable well-being</p>
                </div>
              </div>

              <div class="col-md-6">
                <div class="role-card hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover" data-aos="fade-left" data-aos-delay="250">
                  <div class="role-icon animate-float">
                    <i class="fas fa-chart-line"></i>
                  </div>
                  <p>I drive awareness and demand creation within communities, inspiring collective responsibility and action toward better health outcomes for adolescents and young</p>
                </div>
              </div>
            </div>

            <div class="text-center mt-4" data-aos="zoom-in" data-aos-delay="150">
              <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80" alt="Young Health Ambassador" class="img-fluid rounded-4 shadow-lg hover-lift-sm transition-base" style="max-height: 300px; object-fit: cover;">
            </div>
          </div>
        `
      },
      {
        id: 'lesson-4',
        title: 'Eligibility & Steps',
        icon: 'fa-clipboard-check',
        gradientClass: 'bg-gradient-orange',
        audioFile: '4.mp3',
        quiz: {
          passingScore: 80,
          questions: [
            {
              id: 'q8',
              question: '৮. একটি পদ্ধতির নাম লিখ যা জন্ম নিয়ন্ত্রণ করে এবং যৌনবাহিত রোগসমূহ প্রতিরোধ করে',
              options: [
                'ক. খাবার বড়ি',
                'খ. ইনজেকশন',
                'গ. আই ইউ ডি',
                'ঘ. কনডম'
              ],
              correctAnswer: 3
            }
          ]
        },
        content: `
          <div class="lesson-slide">
            <h2 class="slide-title gradient-text gradient-text-hover hover-lift-sm transition-base" data-aos="fade-up">Eligibility and Steps to be a YHA</h2>
            
            <div class="alert alert-info mb-4 hover-lift-sm transition-base" data-aos="fade-up" data-aos-delay="50">
              <h5><i class="fas fa-info-circle me-2"></i>Eligibility Criteria</h5>
              <p class="mb-0">Any person between <strong>15-24 years of age</strong> is eligible to be a Young Health Ambassador.</p>
            </div>

            <h4 class="mb-4 gradient-text transition-base" data-aos="fade-up" data-aos-delay="100">Steps to Become a Young Health Ambassador</h4>

            <div class="row g-3">
              <div class="col-md-4" data-aos="fade-up" data-aos-delay="120">
                <div class="step-card hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover">
                  <div class="step-number">1</div>
                  <h6>Online Registration</h6>
                  <p>Register in Health Ambassador Programme platform</p>
                </div>
              </div>

              <div class="col-md-4" data-aos="fade-up" data-aos-delay="160">
                <div class="step-card hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover">
                  <div class="step-number">2</div>
                  <h6>Unique ID Generation</h6>
                  <p>Receive your unique identification number</p>
                </div>
              </div>

              <div class="col-md-4" data-aos="fade-up" data-aos-delay="200">
                <div class="step-card hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover">
                  <div class="step-number">3</div>
                  <h6>Login to Platform</h6>
                  <p>Access the Website/App with credentials</p>
                </div>
              </div>

              <div class="col-md-4" data-aos="fade-up" data-aos-delay="240">
                <div class="step-card hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover">
                  <div class="step-number">4</div>
                  <h6>Access Course</h6>
                  <p>Access Health Ambassador course content</p>
                </div>
              </div>

              <div class="col-md-4" data-aos="fade-up" data-aos-delay="280">
                <div class="step-card hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover">
                  <div class="step-number">5</div>
                  <h6>Complete Course</h6>
                  <p>Complete online Health Ambassador modules</p>
                </div>
              </div>

              <div class="col-md-4" data-aos="fade-up" data-aos-delay="320">
                <div class="step-card hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover">
                  <div class="step-number">6</div>
                  <h6>Pass Assessment</h6>
                  <p>Obtain passing marks in final assessment</p>
                </div>
              </div>

              <div class="col-md-4" data-aos="fade-up" data-aos-delay="360">
                <div class="step-card hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover">
                  <div class="step-number">7</div>
                  <h6>System Certification</h6>
                  <p>Receive system-generated certification</p>
                </div>
              </div>

              <div class="col-md-4" data-aos="fade-up" data-aos-delay="400">
                <div class="step-card hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover">
                  <div class="step-number">8</div>
                  <h6>Oath Taking</h6>
                  <p>Complete self-declaration ceremony</p>
                </div>
              </div>

              <div class="col-md-4" data-aos="fade-up" data-aos-delay="440">
                <div class="step-card hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover">
                  <div class="step-number">9</div>
                  <h6>Final Certificate</h6>
                  <p>Receive Final Certificate (Valid 2 years)</p>
                </div>
              </div>
            </div>
          </div>
        `
      },
      {
        id: 'lesson-5',
        title: 'Global Distribution',
        icon: 'fa-earth-americas',
        gradientClass: 'bg-gradient-green',
        audioFile: '5.mp3',
        quiz: {
          passingScore: 80,
          questions: [
            {
              id: 'q9',
              question: '৯. এইড্স সংক্রামণের ফলে একজন ব্যক্তির -',
              options: [
                'ক. রোগপ্রতিরোধ ক্ষমতা ধীরে ধীরে লোপ পায়',
                'খ. সাথে সাথে এইড্স বিভিন্ন লক্ষণ দেখা দেয়',
                'গ. শরীরের ওজন সাথে সাথে হ্রাস পায়',
                'ঘ. রোগ প্রতিরোধ ক্ষমতা তাৎক্ষনিকভাবে লোপপায়'
              ],
              correctAnswer: 0
            }
          ]
        },
        content: `
          <div class="lesson-slide">
            <h2 class="slide-title gradient-text gradient-text-hover hover-lift-sm transition-base" data-aos="fade-up">Distribution of Young People</h2>
            
            <div class="stat-highlight mb-4 hover-lift-sm transition-base" data-aos="fade-up" data-aos-delay="80">
              <h3>Global Young Population</h3>
              <p class="lead">There are over <strong class="text-primary strong">1.8 billion young</strong> in the world today, <strong>90%</strong> of whom live in developing countries, where they tend to make up a large proportion of the population.</p>
            </div>

            <div class="row g-4 mb-4">
              <div class="col-md-6" data-aos="zoom-in" data-aos-delay="120">
                <div class="stat-card hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover">
                  <div class="stat-icon">
                    <i class="fas fa-users-between-lines"></i>
                  </div>
                  <h4>49.5 Million</h4>
                  <p>Total Young Population in Bangladesh</p>
                  <span class="badge bg-primary">~30% of total population</span>
                </div>
              </div>

              <div class="col-md-6" data-aos="zoom-in" data-aos-delay="160">
                <div class="stat-card hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover">
                  <div class="stat-icon">
                    <i class="fas fa-user-group"></i>
                  </div>
                  <h4>31.5 Million</h4>
                  <p>Young Population (15-24 years)</p>
                  <span class="badge bg-success">in Bangladesh</span>
                </div>
              </div>
            </div>

            <div class="info-box hover-lift-sm transition-base" data-aos="fade-up" data-aos-delay="200">
              <i class="fas fa-globe me-2"></i>
              <p class="mb-0">Young people represent a significant demographic force globally, with developing countries having the largest young populations.</p>
            </div>
          </div>
        `
      },
      {
        id: 'lesson-6',
        title: 'Triple Dividend',
        icon: 'fa-chart-line',
        gradientClass: 'bg-gradient-pink',
        audioFile: '6.mp3',
        quiz: {
          passingScore: 80,
          questions: [
            {
              id: 'q10',
              question: '১০. আয়োডিন ঘাটতি হলে কি হয়',
              options: [
                'ক. গলগণ্ড',
                'খ. খর্বতা',
                'গ. বুদ্ধি প্রতিবন্ধিতা',
                'ঘ. উপরের সবকটি'
              ],
              correctAnswer: 3
            }
          ]
        },
        content: `
          <div class="lesson-slide">
            <h2 class="slide-title gradient-text gradient-text-hover hover-lift-sm transition-base" data-aos="fade-up">Why Adolescent Health is Important?</h2>
            
            <div class="highlight-box mb-4 hover-lift-sm transition-base" data-aos="fade-up" data-aos-delay="80">
              <h4>Investments in the current generation of 10-24-year-olds will reap a <span class="text-primary">triple dividend</span></h4>
            </div>

            <div class="row g-4 mb-4">
              <div class="col-md-4" data-aos="fade-up" data-aos-delay="120">
                <div class="dividend-card hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover">
                  <div class="dividend-icon">
                    <i class="fas fa-heart-pulse"></i>
                  </div>
                  <h5>Healthy Young Population Now</h5>
                  <p>2 billion people aged 10-24 years</p>
                </div>
              </div>

              <div class="col-md-4" data-aos="fade-up" data-aos-delay="160">
                <div class="dividend-card hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover">
                  <div class="dividend-icon">
                    <i class="fas fa-briefcase"></i>
                  </div>
                  <h5>Future Healthy Adult Workforce</h5>
                  <p>Productive and resilient workers</p>
                </div>
              </div>

              <div class="col-md-4" data-aos="fade-up" data-aos-delay="200">
                <div class="dividend-card hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover">
                  <div class="dividend-icon">
                    <i class="fas fa-baby"></i>
                  </div>
                  <h5>Healthy Next Generation</h5>
                  <p>Breaking the cycle of poor health</p>
                </div>
              </div>
            </div>

            <div class="roi-card hover-lift-sm transition-base" data-aos="zoom-in" data-aos-delay="220">
              <div class="row align-items-center">
                <div class="col-md-8">
                  <h4><i class="fas fa-dollar-sign me-2"></i>Return on Investment</h4>
                  <p class="lead mb-0">For every <strong class="text-primary">US$1</strong> invested in Adolescent Health & Wellbeing, we see a return of <strong class="text-success">US$5-10</strong></p>
                </div>
                <div class="col-md-4 text-center">
                  <div class="roi-visual">
                    <span class="roi-number">5-10×</span>
                    <p class="small">ROI</p>
                  </div>
                </div>
              </div>
              <p class="small text-muted mt-3 mb-0"><em>Source: Our Future: A Lancet Commission on Adolescent Health and Wellbeing; Patton et al. 2016.</em></p>
            </div>
          </div>
        `
      },
      {
        id: 'lesson-7',
        title: 'Global & Bangladesh Scenario',
        icon: 'fa-globe',
        gradientClass: 'bg-gradient-purple',
        audioFile: '7.mp3',
        quiz: {
          passingScore: 80,
          questions: [
            {
              id: 'q11',
              question: '১১. বয়ঃসন্ধিকালে কিশোরদের যে সকল বিষয়ে জ্ঞান থাকা দরকার তা হলো',
              options: [
                'ক. স্বপ্নে বীর্যপাত',
                'খ. বয়ঃসন্ধিকালে যৌনতা',
                'গ. কৈশোর কালে নিজেকে যৌনতা থেকে মুক্ত রাখার উপায়',
                'ঘ. উপরের সবকটি'
              ],
              correctAnswer: 3
            }
          ]
        },
        content: `
          <div class="lesson-slide">
            <h2 class="slide-title gradient-text gradient-text-hover hover-lift-sm transition-base" data-aos="fade-up">Global and Bangladesh Scenario</h2>
            <h4 class="mb-4 gradient-text transition-base" data-aos="fade-up" data-aos-delay="60">Mortality and Morbidity of Young People</h4>
            
            <div class="row g-4 mb-4">
              <div class="col-12">
                <div class="fact-card alert-danger hover-lift-sm transition-base" data-aos="fade-up" data-aos-delay="90">
                  <i class="fas fa-exclamation-triangle"></i>
                  <p>Over <strong>1.5 million</strong> adolescents and young adults aged 10–24 years died in 2021, about <strong>4500 every day</strong></p>
                </div>
              </div>

              <div class="col-md-6">
                <div class="fact-card alert-info hover-lift-sm transition-base" data-aos="fade-right" data-aos-delay="120">
                  <i class="fas fa-shield-halved"></i>
                  <p>Young adolescents aged 10–14 years have the <strong>lowest risk of death</strong> among all age groups</p>
                </div>
              </div>

              <div class="col-md-6">
                <div class="fact-card alert-warning hover-lift-sm transition-base" data-aos="fade-left" data-aos-delay="150">
                  <i class="fas fa-car-burst"></i>
                  <p>Injuries, interpersonal violence, self-harm and maternal conditions are the <strong>leading causes of death</strong></p>
                </div>
              </div>

              <div class="col-md-6">
                <div class="fact-card alert-primary hover-lift-sm transition-base" data-aos="fade-right" data-aos-delay="180">
                  <i class="fas fa-brain"></i>
                  <p>Half of all mental health disorders in adulthood start by age 18, but <strong>most cases are undetected</strong></p>
                </div>
              </div>

              <div class="col-md-6">
                <div class="fact-card alert-secondary hover-lift-sm transition-base" data-aos="fade-left" data-aos-delay="210">
                  <i class="fas fa-baby-carriage"></i>
                  <p>Globally, there were <strong>42 births per 1000</strong> to girls aged 15–19 years in 2021</p>
                </div>
              </div>
            </div>

            <div class="bangladesh-section" data-aos="fade-up" data-aos-delay="240">
              <h5 class="mb-3 gradient-text transition-base">Bangladesh Context (Bengali)</h5>
              <p>প্রতিবছর ১.১ মিলিয়ন কিশোর/ কিশোরী নিরাময়যোগ্য এমন কারণে অসুস্থ হয় বা মৃত্যুবরণ করে।</p>
              
              <div class="row g-3">
                <div class="col-md-6">
                  <div class="bengali-card hover-lift-sm transition-base" data-aos="fade-right" data-aos-delay="260">
                    <h6><i class="fas fa-mars text-primary me-2"></i>কিশোরদের মৃত্যুর প্রধান ৫টি কারণ:</h6>
                    <ol>
                      <li>সড়ক দুর্ঘটনা</li>
                      <li>ডায়রিয়া</li>
                      <li>পানিতে ডুবা</li>
                      <li>যক্ষা</li>
                      <li>আত্মহত্যা</li>
                    </ol>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="bengali-card hover-lift-sm transition-base" data-aos="fade-left" data-aos-delay="300">
                    <h6><i class="fas fa-venus text-danger me-2"></i>কিশোরীদের মৃত্যুর প্রধান ৫টি কারণ:</h6>
                    <ol>
                      <li>ডায়রিয়া</li>
                      <li>যক্ষা</li>
                      <li>সড়ক দুর্ঘটনা</li>
                      <li>মাতৃত্বজনিত কারণ</li>
                      <li>শ্বাসতন্ত্রের নিচের অংশের সংক্রমণ</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `
      },
      {
        id: 'lesson-8',
        title: 'Adolescent Health in Bangladesh',
        icon: 'fa-flag',
        gradientClass: 'bg-gradient-blue',
        audioFile: '8.mp3',
        quiz: {
          passingScore: 80,
          questions: [
            {
              id: 'q12',
              question: '১২. স্বপ্নে বীর্যপাত একটি',
              options: [
                'ক. শারীরিক রোগ',
                'খ. মানসিক রোগ',
                'গ. দুরবলতা দেখা দেয়',
                'ঘ. ছেলেদের বয়ঃসন্ধিকালে স্বাভাবিক নিয়মে হয়'
              ],
              correctAnswer: 3
            }
          ]
        },
        content: `
          <div class="lesson-slide">
            <h2 class="slide-title gradient-text gradient-text-hover hover-lift-sm transition-base" data-aos="fade-up">Adolescent Health in Bangladesh</h2>
            
            <div class="alert alert-danger mb-4 hover-lift-sm transition-base" data-aos="fade-up" data-aos-delay="80">
              <h5><i class="fas fa-exclamation-circle me-2"></i>Critical Issue</h5>
              <p class="mb-0">Bangladesh is among <strong>top 10 countries</strong> with highest level of Child Marriage</p>
            </div>

            <div class="health-stats">
              <h5 class="mb-3">Key Health Challenges</h5>
              <div class="row g-3">
                <div class="col-md-6" data-aos="fade-right" data-aos-delay="110">
                  <div class="challenge-card hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover">
                    <i class="fas fa-ring text-warning"></i>
                    <p><strong>Child Marriage:</strong> Adolescent girls face early marriage and maternal complications</p>
                  </div>
                </div>

                <div class="col-md-6" data-aos="fade-left" data-aos-delay="140">
                  <div class="challenge-card hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover">
                    <i class="fas fa-user-injured text-danger"></i>
                    <p><strong>Violence:</strong> Sexual harassment, gender-based discrimination, and abuse</p>
                  </div>
                </div>

                <div class="col-md-6" data-aos="fade-right" data-aos-delay="170">
                  <div class="challenge-card hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover">
                    <i class="fas fa-child text-info"></i>
                    <p><strong>Malnutrition:</strong> Stunting, underweight, and anemia issues</p>
                  </div>
                </div>

                <div class="col-md-6" data-aos="fade-left" data-aos-delay="200">
                  <div class="challenge-card hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover">
                    <i class="fas fa-pills text-primary"></i>
                    <p><strong>Substance Use:</strong> Tobacco, drugs, and other addictions among adolescents</p>
                  </div>
                </div>

                <div class="col-md-6" data-aos="fade-right" data-aos-delay="230">
                  <div class="challenge-card hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover">
                    <i class="fas fa-virus text-success"></i>
                    <p><strong>STIs:</strong> Sexually transmitted infections from unsafe practices</p>
                  </div>
                </div>

                <div class="col-md-6" data-aos="fade-left" data-aos-delay="260">
                  <div class="challenge-card hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover">
                    <i class="fas fa-graduation-cap text-secondary"></i>
                    <p><strong>Education:</strong> High dropout rates, especially among girls</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="text-center mt-4" data-aos="zoom-in" data-aos-delay="300">
              <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80" alt="Bangladesh Young" class="img-fluid rounded-4 shadow hover-lift-sm transition-base" style="max-height: 300px; object-fit: cover;">
            </div>
          </div>
        `
      },
      {
        id: 'lesson-9',
        title: 'Key Facts',
        icon: 'fa-chart-bar',
        gradientClass: 'bg-gradient-teal',
        audioFile: '9.mp3',
        quiz: {
          passingScore: 80,
          questions: [
            {
              id: 'q13',
              question: '১৩. কোনটি সত্য-',
              options: [
                'ক. মাসিক ঋতুস্রাব ৯-১২ বছর বয়সে শুরু হয়',
                'খ. ৫ দিন থেকে ৭ দিন থাকে',
                'গ. সাধারণত ২৮ দিন পর পর হয়',
                'ঘ. ঋতুস্রাব হরমোনের প্রভাবে হয়',
                'ঙ. উপরের সবকটি সত্য'
              ],
              correctAnswer: 4
            }
          ]
        },
        content: `
          <div class="lesson-slide">
            <h2 class="slide-title gradient-text gradient-text-hover hover-lift-sm transition-base" data-aos="fade-up">Key Facts About Adolescent Health</h2>
            
            <div class="row g-3">
              <div class="col-md-6" data-aos="fade-up" data-aos-delay="100">
                <div class="key-fact hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover">
                  <div class="fact-icon bg-gradient-purple">
                    <i class="fas fa-brain"></i>
                  </div>
                  <p><strong>13.4%</strong> adolescents suffer from diagnosable mental health condition</p>
                </div>
              </div>

              <div class="col-md-6" data-aos="fade-up" data-aos-delay="140">
                <div class="key-fact hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover">
                  <div class="fact-icon bg-gradient-blue">
                    <i class="fas fa-child"></i>
                  </div>
                  <p><strong>36%</strong> of married and <strong>32%</strong> of unmarried adolescent girls are stunted</p>
                </div>
              </div>

              <div class="col-md-6" data-aos="fade-up" data-aos-delay="180">
                <div class="key-fact hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover">
                  <div class="fact-icon bg-gradient-orange">
                    <i class="fas fa-droplet"></i>
                  </div>
                  <p>About <strong>30%</strong> of adolescents suffer from anemia</p>
                </div>
              </div>

              <div class="col-md-6" data-aos="fade-up" data-aos-delay="220">
                <div class="key-fact hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover">
                  <div class="fact-icon bg-gradient-green">
                    <i class="fas fa-weight-scale"></i>
                  </div>
                  <p><strong>16%</strong> of married and <strong>10%</strong> of unmarried girls are overweight/obese</p>
                </div>
              </div>

              <div class="col-md-6" data-aos="fade-up" data-aos-delay="260">
                <div class="key-fact hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover">
                  <div class="fact-icon bg-gradient-pink">
                    <i class="fas fa-hand-dots"></i>
                  </div>
                  <p><strong>One-fifth</strong> of adolescent girls are victims of physical or sexual violence</p>
                </div>
              </div>

              <div class="col-md-6" data-aos="fade-up" data-aos-delay="300">
                <div class="key-fact hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover">
                  <div class="fact-icon bg-gradient-teal">
                    <i class="fas fa-person-harassing"></i>
                  </div>
                  <p><strong>77%</strong> of married adolescent girls are abused by their husbands</p>
                </div>
              </div>

              <div class="col-md-6" data-aos="fade-up" data-aos-delay="340">
                <div class="key-fact hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover">
                  <div class="fact-icon bg-gradient-purple">
                    <i class="fas fa-children"></i>
                  </div>
                  <p><strong>1.78 million</strong> adolescents are involved in child labor in Bangladesh</p>
                </div>
              </div>

              <div class="col-md-6" data-aos="fade-up" data-aos-delay="380">
                <div class="key-fact hover-lift-sm hover-shadow-glow transition-base icon-spin-on-hover">
                  <div class="fact-icon bg-gradient-blue">
                    <i class="fas fa-graduation-cap"></i>
                  </div>
                  <p>Dropout rate: <strong>32.85%</strong> (Girls: <strong>34.87%</strong>, Boys: <strong>30.46%</strong>)</p>
                </div>
              </div>
            </div>
          </div>
        `
      },
      {
        id: 'lesson-10',
        title: 'Health Determinants',
        icon: 'fa-heartbeat',
        gradientClass: 'bg-gradient-orange',
        audioFile: '10.mp3',
        quiz: {
          passingScore: 80,
          questions: [
            {
              id: 'q14',
              question: '১৪. নিচের কোনগুলো যৌন রোগ',
              options: [
                'ক. সিফিলিস',
                'খ. গনোরিয়া',
                'গ. এইড্স',
                'ঘ. হেপাটাইটিস্-বি',
                'ঙ. উপরের সবকটি সত্য'
              ],
              correctAnswer: 4
            }
          ]
        },
        content: `
          <div class="lesson-slide">
            <h2 class="slide-title">Determinants for Adolescent Health & Well-being</h2>
            
            <p class="lead mb-4">Understanding the key factors that influence adolescent health</p>

            <div class="row g-3">
              <div class="col-md-4 col-sm-6">
                <div class="determinant-card">
                  <i class="fas fa-car-burst"></i>
                  <h6>Unintentional Injury</h6>
                </div>
              </div>

              <div class="col-md-4 col-sm-6">
                <div class="determinant-card">
                  <i class="fas fa-hand-back-fist"></i>
                  <h6>Violence</h6>
                </div>
              </div>

              <div class="col-md-4 col-sm-6">
                <div class="determinant-card">
                  <i class="fas fa-venus-mars"></i>
                  <h6>SRH, HIV & STI</h6>
                </div>
              </div>

              <div class="col-md-4 col-sm-6">
                <div class="determinant-card">
                  <i class="fas fa-virus"></i>
                  <h6>Communicable Diseases</h6>
                </div>
              </div>

              <div class="col-md-4 col-sm-6">
                <div class="determinant-card">
                  <i class="fas fa-heartbeat"></i>
                  <h6>Non-Communicable Diseases</h6>
                </div>
              </div>

              <div class="col-md-4 col-sm-6">
                <div class="determinant-card">
                  <i class="fas fa-brain"></i>
                  <h6>Mental Health</h6>
                </div>
              </div>

              <div class="col-md-4 col-sm-6">
                <div class="determinant-card">
                  <i class="fas fa-wine-bottle"></i>
                  <h6>Alcohol & Drug Use</h6>
                </div>
              </div>

              <div class="col-md-4 col-sm-6">
                <div class="determinant-card">
                  <i class="fas fa-smoking"></i>
                  <h6>Tobacco Use</h6>
                </div>
              </div>

              <div class="col-md-4 col-sm-6">
                <div class="determinant-card">
                  <i class="fas fa-person-running"></i>
                  <h6>Physical Activity</h6>
                </div>
              </div>

              <div class="col-md-4 col-sm-6">
                <div class="determinant-card">
                  <i class="fas fa-utensils"></i>
                  <h6>Nutrition</h6>
                </div>
              </div>
            </div>

            <div class="completion-message mt-5">
              <div class="text-center">
                <i class="fas fa-award display-1 text-primary mb-3"></i>
                <h3>Congratulations!</h3>
                <p class="lead">You have completed all lessons of the Young Health Ambassador Programme</p>
                <p>Continue to the final assessment to earn your certificate</p>
              </div>
            </div>
          </div>
        `
      }
    ],
    // Legacy steps array for backward compatibility
    steps: []
  }
];
