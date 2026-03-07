#!/usr/bin/env node

const fs = require('fs');

let content = fs.readFileSync('js/data.js', 'utf-8');

// Find Lesson 10's return statement and replace it
const searchStr = 'return `\n                <link rel="stylesheet" href="css/m19l10.css">\n                <div class="m19l10-container">\n                  <div class="m19l10-shape m19l10-shape-1"></div>\n                  <div class="m19l10-shape m19l10-shape-2"></div>\n                  <div class="m19l10-shape m19l10-shape-3"></div>\n\n                  <header class="m19l10-header" data-aos="fade-up">\n                    <h2 class="m19l10-h2"><i class="fa-solid fa-user-shield"></i>${yhLang("Actions to Prevent Adolescent Malnutrition", "কৈশোরকালীন অপুষ্টি প্রতিরোধে করণীয়")}</h2>\n                  </header>\n\n                  \n\n                  <section class="m19l10-section m19l10-section-b" data-aos="fade-up" data-aos-delay="40">\n                    ${renderList(preventionItems)}\n                  </section>\n                </div>\n              `;';

const replaceStr = 'return `\n                <link rel="stylesheet" href="css/m19l10.css">\n                <div class="m19l10-container">\n                  <div class="m19l10-shape m19l10-shape-1"></div>\n                  <div class="m19l10-shape m19l10-shape-2"></div>\n                  <div class="m19l10-shape m19l10-shape-3"></div>\n\n                  <header class="m19l10-header" data-aos="fade-up">\n                    <h2 class="m19l10-h2"><i class="fa-solid fa-weight-scale"></i>${yhLang("Adolescent Nutrition and Weight Management", "কৈশোরকালীন পুষ্টি এবং ওজন ব্যবস্থাপনা")}</h2>\n                  </header>\n\n                  <section class="m19l10-section m19l10-section-a" data-aos="fade-up" data-aos-delay="20">\n                    <h3 class="m19l10-h3"><i class="fa-solid fa-list-check"></i>${yhLang("Nutrition and Health Practices", "পুষ্টি এবং স্বাস্থ্য অনুশীলন")}</h3>\n                    ${renderList(preventionItems)}\n                  </section>\n\n                  <section class="m19l10-section m19l10-section-b" data-aos="fade-up" data-aos-delay="40">\n                    <article class="m19l10-box is-definition">\n                      <h4 class="m19l10-h4"><i class="fa-solid fa-scale-balanced"></i>${yhLang("Understanding Overweight and Obesity", "অধিক ওজন এবং স্থূলতা বোঝা")}</h4>\n                      <p class="m19l10-p">${yhLang("A BMI between 25 and 29.9 is considered overweight. A BMI of 30 or higher is classified as obesity. Among adolescents, obesity rates are influenced by home environment, food habits, socioeconomic status, regular physical activity, exercise opportunities, and facilities. Families often have limited knowledge about the importance of balanced diets, what constitutes balanced meals, and their benefits. Additionally, there is a shortage of suitable and safe play spaces for girls in both rural and urban areas.", "বডি মাস ইনডেক্স (BMI) ২৫ থেকে ২৯.৯ এর মেধ্য থাকলে তাকে অতিরিক্ত ওজন হিসেবে ধরা হয়। অন্যদিকে  BMI ৩০ বা তার বেশি হলে তাকে স্থূলতা বলা হয়। কিশোর-কিশোরীদের মেধ্য স্থূলতার হার বৃিদ্ধর জন্য ঘরের পরিবেশ, খাদ্যাভ্যাস, আর্থসামাজিক অবস্থা, নিয়মিত খেলাধূলা, ব্যায়াম ও সুযোগ-সুবিধার প্রভাব বিদ্যমান। সুষম খাবারের প্রয়োজনীয়তা ও সুষম খাবার কোনগুলো ও তার সুফল সম্পর্কে পরিবারের মেধ্য ধারণা কম রয়েছে। তাছাড়া গ্রাম ও শহরে মেয়েদের উপযুক্ত খেলার স্থান ও নিরাপদ কাঠামোর সংকট রয়েছে।")}</p>\n                    </article>\n                  </section>\n\n                  <section class="m19l10-section m19l10-section-b" data-aos="fade-up" data-aos-delay="60">\n                    <h3 class="m19l10-h3"><i class="fa-solid fa-triangle-exclamation"></i>${yhLang("Causes of Overweight and Obesity", "অধিক ওজন এবং স্থূলতার কারণ")}</h3>\n                    ${renderList(overweightCauses)}\n                  </section>\n                </div>\n              `;';

if (content.includes(searchStr)) {
  content = content.replace(searchStr, replaceStr);
  fs.writeFileSync('js/data.js', content, 'utf-8');
  console.log('✅ Lesson 10 HTML template updated successfully!');
  console.log('✅ Merged lesson now includes both nutrition practices and overweight/obesity information.');
} else {
  console.log('⚠️ HTML template not found - may have already been updated');
  // Try an alternative search
  if (content.includes('Adolescent Nutrition and Weight Management')) {
    console.log('✅ Lesson title appears to already be updated');
  }
}
