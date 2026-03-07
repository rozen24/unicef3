#!/usr/bin/env node

const fs = require('fs');

let content = fs.readFileSync('js/data.js', 'utf-8');

// Update Lesson 10 title
content = content.replace(
  '"Actions to Prevent Adolescent Malnutrition"',
  '"Adolescent Nutrition and Weight Management"'
);

content = content.replace(
  '"কৈশোরকালীন অপুষ্টি প্রতিরোধে করণীয়"',
  '"কৈশোরকালীন পুষ্টি এবং ওজন ব্যবস্থাপনা"'
);

// Update Lesson 10 icon
content = content.replace(
  'icon: "fa-shield-heart",\n            gradientClass: "bg-gradient-sunrise"',
  'icon: "fa-weight-scale",\n            gradientClass: "bg-gradient-sunrise"'
);

// Add overweight causes data and update the render function and HTML
const oldRender = `              const renderList = (items) =>
                \`<ul class="m19l10-list">\${items
                  .map(
                    (item, index) => \`
                      <li class="m19l10-li m19l10-\${item.tone}" data-aos="fade-up" data-aos-delay="\${40 + index * 26}">
                        <span class="m19l10-li-icon"><i class="fa-solid \${item.icon}"></i></span>
                        <span class="m19l10-li-text">\${item.text}</span>
                      </li>
                    \`
                  )
                  .join("")}</ul>\`;

              return \`
                <link rel="stylesheet" href="css/m19l10.css">
                <div class="m19l10-container">
                  <div class="m19l10-shape m19l10-shape-1"></div>
                  <div class="m19l10-shape m19l10-shape-2"></div>
                  <div class="m19l10-shape m19l10-shape-3"></div>

                  <header class="m19l10-header" data-aos="fade-up">
                    <h2 class="m19l10-h2"><i class="fa-solid fa-user-shield"></i>\${yhLang("Actions to Prevent Adolescent Malnutrition", "কৈশোরকালীন অপুষ্টি প্রতিরোধে করণীয়")}</h2>
                  </header>

                  

                  <section class="m19l10-section m19l10-section-b" data-aos="fade-up" data-aos-delay="40">
                    \${renderList(preventionItems)}
                  </section>
                </div>
              \`;`;

const newRender = `              const overweightCauses = [
                {
                  text: yhLang("Eating more calories than needed every day.", "প্রতিদিন প্রয়োজনের তুলনায় বেশি ক্যালোরিযুক্ত খাদ্য গ্রহণ"),
                  icon: "fa-burger",
                  tone: "warn",
                },
                {
                  text: yhLang("Low physical activity and lack of regular sports.", "কম পরিশ্রম বা নিয়মিত খেলাধুলা না করা"),
                  icon: "fa-person-walking",
                  tone: "info",
                },
                {
                  text: yhLang("Irregular lifestyle (late sleeping, late waking, skipping breakfast, overeating later, excessive mobile/screen time).", "অনিয়মিত জীবনযাপন করা (যেমন: রাতজাগা, ঘুম থেকে দেরিতে ওঠা, নাশতা না করে পরে অপরিমিত খাওয়া, বেশি পরিমাণে মোবাইল ফোন ব্যবহার/স্ক্রিনটাইম বেশি হওয়া)"),
                  icon: "fa-mobile-screen-button",
                  tone: "danger",
                },
                {
                  text: yhLang("Frequent intake of fried, oily, and fatty foods (fast food, cola, chips, etc.).", "তেলে ভাজা, অধিক তৈলাক্ত ও চর্বিজাতীয় খাবার খাওয়া (যেমন: ফাস্ট ফুড, কোকাকোলা, চিপস ইত্যাদি)"),
                  icon: "fa-pizza-slice",
                  tone: "warn",
                },
                {
                  text: yhLang("High intake of sugar and sweets.", "চিনি ও মিষ্টিজাতীয় খাবার বেশি খাওয়া"),
                  icon: "fa-candy-cane",
                  tone: "accent",
                },
              ];

              const renderList = (items) =>
                \`<ul class="m19l10-list">\${items
                  .map(
                    (item, index) => \`
                      <li class="m19l10-li m19l10-\${item.tone}" data-aos="fade-up" data-aos-delay="\${40 + index * 26}">
                        <span class="m19l10-li-icon"><i class="fa-solid \${item.icon}"></i></span>
                        <span class="m19l10-li-text">\${item.text}</span>
                      </li>
                    \`
                  )
                  .join("")}</ul>\`;

              return \`
                <link rel="stylesheet" href="css/m19l10.css">
                <div class="m19l10-container">
                  <div class="m19l10-shape m19l10-shape-1"></div>
                  <div class="m19l10-shape m19l10-shape-2"></div>
                  <div class="m19l10-shape m19l10-shape-3"></div>

                  <header class="m19l10-header" data-aos="fade-up">
                    <h2 class="m19l10-h2"><i class="fa-solid fa-weight-scale"></i>\${yhLang("Adolescent Nutrition and Weight Management", "কৈশোরকালীন পুষ্টি এবং ওজন ব্যবস্থাপনা")}</h2>
                  </header>

                  <section class="m19l10-section m19l10-section-a" data-aos="fade-up" data-aos-delay="20">
                    <h3 class="m19l10-h3"><i class="fa-solid fa-list-check"></i>\${yhLang("Nutrition and Health Practices", "পুষ্টি এবং স্বাস্থ্য অনুশীলন")}</h3>
                    \${renderList(preventionItems)}
                  </section>

                  <section class="m19l10-section m19l10-section-b" data-aos="fade-up" data-aos-delay="40">
                    <article class="m19l10-box is-definition">
                      <h4 class="m19l10-h4"><i class="fa-solid fa-scale-balanced"></i>\${yhLang("Understanding Overweight and Obesity", "অধিক ওজন এবং স্থূলতা বোঝা")}</h4>
                      <p class="m19l10-p">\${yhLang("A BMI between 25 and 29.9 is considered overweight. A BMI of 30 or higher is classified as obesity. Among adolescents, obesity rates are influenced by home environment, food habits, socioeconomic status, regular physical activity, exercise opportunities, and facilities. Families often have limited knowledge about the importance of balanced diets, what constitutes balanced meals, and their benefits. Additionally, there is a shortage of suitable and safe play spaces for girls in both rural and urban areas.", "বডি মাস ইনডেক্স (BMI) ২৫ থেকে ২৯.৯ এর মেধ্য থাকলে তাকে অতিরিক্ত ওজন হিসেবে ধরা হয়। অন্যদিকে  BMI ৩০ বা তার বেশি হলে তাকে স্থূলতা বলা হয়। কিশোর-কিশোরীদের মেধ্য স্থূলতার হার বৃিদ্ধর জন্য ঘরের পরিবেশ, খাদ্যাভ্যাস, আর্থসামাজিক অবস্থা, নিয়মিত খেলাধূলা, ব্যায়াম ও সুযোগ-সুবিধার প্রভাব বিদ্যমান। সুষম খাবারের প্রয়োজনীয়তা ও সুষম খাবার কোনগুলো ও তার সুফল সম্পর্কে পরিবারের মেধ্য ধারণা কম রয়েছে। তাছাড়া গ্রাম ও শহরে মেয়েদের উপযুক্ত খেলার স্থান ও নিরাপদ কাঠামোর সংকট রয়েছে।")}</p>
                    </article>
                  </section>

                  <section class="m19l10-section m19l10-section-b" data-aos="fade-up" data-aos-delay="60">
                    <h3 class="m19l10-h3"><i class="fa-solid fa-triangle-exclamation"></i>\${yhLang("Causes of Overweight and Obesity", "অধিক ওজন এবং স্থূলতার কারণ")}</h3>
                    \${renderList(overweightCauses)}
                  </section>
                </div>
              \`;`;

content = content.replace(oldRender, newRender);

fs.writeFileSync('js/data.js', content, 'utf-8');
console.log('✅ Lesson 10 updated with merged content from Lesson 11!');
console.log('✅ Lessons 10 and 11 have been successfully merged into one comprehensive lesson.');
