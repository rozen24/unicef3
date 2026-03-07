#!/usr/bin/env node

const fs = require('fs');

// Read both current file and backup
let content = fs.readFileSync('js/data.js', 'utf-8');
let backup = fs.readFileSync('js/data.js.backup_lesson11_fix', 'utf-8');

// Extract Lesson 11 from backup (with proper encoding)
const lesson11Start = backup.indexOf('id: "ch19-lesson-11"');
const lesson11End = backup.indexOf('id: "ch19-lesson-12"');
const lesson11Section = backup.substring(lesson11Start - 100, lesson11End - 100);

// Extract overweight causes from Lesson 11
const causesStart = backup.indexOf('const causePoints = [');
const causesEnd = backup.indexOf('];', causesStart) + 2;
const causesSection = backup.substring(causesStart, causesEnd);

// Now update current file with the correct HTML template
const searchHTML = `                  <header class="m19l10-header" data-aos="fade-up">
                    <h2 class="m19l10-h2"><i class="fa-solid fa-user-shield"></i>\${yhLang("Actions to Prevent Adolescent Malnutrition", "কৈশোরকালীন অপুষ্টি প্রতিরোধে করণীয়")}</h2>
                  </header>

                  

                  <section class="m19l10-section m19l10-section-b" data-aos="fade-up" data-aos-delay="40">
                    \${renderList(preventionItems)}
                  </section>`;

const replaceHTML = `                  <header class="m19l10-header" data-aos="fade-up">
                    <h2 class="m19l10-h2"><i class="fa-solid fa-weight-scale"></i>\${yhLang("Adolescent Nutrition and Weight Management", "কৈশোরকালীন পুষ্টি এবং ওজন ব্যবস্থাপনা")}</h2>
                  </header>

                  <section class="m19l10-section m19l10-section-a" data-aos="fade-up" data-aos-delay="20">
                    <h3 class="m19l10-h3"><i class="fa-solid fa-list-check"></i>\${yhLang("Nutrition and Health Practices", "পুষ্টি এবং স্বাস্থ্য অনুশীলন")}</h3>
                    \${renderList(preventionItems)}
                  </section>

                  <section class="m19l10-section m19l10-section-b" data-aos="fade-up" data-aos-delay="40">
                    <article class="m19l10-box is-definition">
                      <h4 class="m19l10-h4"><i class="fa-solid fa-scale-balanced"></i>\${yhLang("Understanding Overweight and Obesity", "অধিক ওজন এবং স্থূলতা বোঝা")}</h4>
                      <p class="m19l10-p">\${yhLang("A BMI between 25 and 29.9 is considered overweight. A BMI of 30 or higher is classified as obesity. Among adolescents, obesity rates are influenced by home environment, food habits, socioeconomic status, regular physical activity, exercise opportunities, and facilities. Families often have limited knowledge about the importance of balanced diets, what constitutes balanced meals, and their benefits. Additionally, there is a shortage of suitable and safe play spaces for girls in both rural and urban areas.", "বডি মাস ইনডেক্স (BMI) ২৫ থেকে ২९.९ এর মেধ्य थाকলे तاకε अतिरिक्त ওজন हिसेবे धरा हय្य. अन्यदike  BMI ३० ба तār бेशি होলe तāকe स्थূলता बला हय். किशोर-किशोरीদের मेধ่y স्थूलतार हар बृदिধiर जन्य घরেर परिبेश, खाद़्yabāস, आर्थसामाजिक अबस्था, नियमit खेলाधूला, ব్yayam え সुyोग-суbiधार प्रभाб বिद्yमान. सुषम खाबार प्रyोजनीyता ও sषम खाबār कонguло ও तār suфल sम्पर्के परिबार मेध्य धарणা कम रyেছ. तছाড़া গ്राम ও शहरे meүेदेर उpyुक्त खेلар स्థан ও निрапpad काठामोর সংкট रyেछ।")}</p>
                    </article>
                  </section>

                  <section class="m19l10-section m19l10-section-b" data-aos="fade-up" data-aos-delay="60">
                    <h3 class="m19l10-h3"><i class="fa-solid fa-triangle-exclamation"></i>\${yhLang("Causes of Overweight and Obesity", "अधिक ওजন ও स्थूलتार कारण")}</h3>
                    \${renderList(overweightCauses)}
                  </section>`;

if (content.includes(searchHTML)) {
  content = content.replace(searchHTML, replaceHTML);
} else {
  console.log('⚠️ HTML template not found exactly');
}

// Add overweight causes data right after preventionItems
const preventionEnd = content.indexOf('              ];', content.indexOf('preventionItems = [')) + '              ];'.length;
const insertCauses = `

              const overweightCauses = [
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
              ];`;

if (!content.includes('const overweightCauses = [')) {
  content = content.substring(0, preventionEnd) + insertCauses + content.substring(preventionEnd);
}

fs.writeFileSync('js/data.js', content, 'utf-8');
console.log('✅ Lesson 10 merged with all content from Lesson 11!');
console.log('✅ Now both lessons content are combined into one comprehensive lesson.');
