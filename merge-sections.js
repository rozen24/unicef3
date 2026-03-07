const fs = require('fs');
const file = 'js/data.js';

console.log('📖 Reading file...');
let content = fs.readFileSync(file, 'utf-8');

// Find the exact line with renderList(preventionItems)
const lines = content.split('\n');
let foundIndex = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('renderList(preventionItems)') && lines[i].includes('${')) {
    foundIndex = i;
    console.log(`✅ Found renderList(preventionItems) at line ${i + 1}`);
    break;
  }
}

if (foundIndex > -1) {
  console.log('📝 Inserting additional sections...');
  
  // Insert sections after the renderList line
  const newSections = [
    '',
    '                  <section class="m19l10-section m19l10-section-b" data-aos="fade-up" data-aos-delay="40">',
    '                    <article class="m19l10-box is-definition">',
    '                      <h3 class="m19l10-h3"><i class="fa-solid fa-scale-balanced"></i>${yhLang("Understanding Overweight and Obesity", "স্থূলতা এবং অতিরিক্ত ওজন বোঝা")}</h3>',
    '                      <p class="m19l10-p">${yhLang("A BMI between 25 and 29.9 is considered overweight. A BMI of 30 or higher is classified as obesity. Among adolescents, obesity rates are influenced by home environment, food habits, socioeconomic status, regular physical activity, exercise opportunities, and facilities.", "BMI ২৫ থেকে ২৯.৯ অতিরিক্ত ওজন হিসেবে বিবেচিত হয়। BMI ৩০ বা তার বেশি স্থূলতা হিসেবে শ্রেণীবদ্ধ। কিশোর-কিশোরীদের মধ্যে স্থূলতার হার পারিবারিক পরিবেশ, খাদ্যাভ্যাস, সামাজিক-অর্থনৈতিক অবস্থা, নিয়মিত শারীরিক কার্যকলাপ এবং সুবিধা দ্বারা প্রভাবিত হয়।")}</p>',
    '                    </article>',
    '                  </section>',
    '',
    '                  <section class="m19l10-section m19l10-section-c" data-aos="fade-up" data-aos-delay="60">',
    '                    <h3 class="m19l10-h3"><i class="fa-solid fa-triangle-exclamation"></i>${yhLang("Causes of Overweight and Obesity", "স্থূলতা এবং অতিরিক্ত ওজনের কারণ")}</h3>',
    '                    ${renderList(overweightCauses)}',
    '                  </section>'
  ];
  
  // Insert all new lines after the renderList line
  lines.splice(foundIndex + 1, 0, ...newSections);
  
  const updated = lines.join('\n');
  fs.writeFileSync(file, updated, 'utf-8');
  console.log('✅ Successfully inserted all additional sections!');
  console.log('✅ Lesson 10 now displays:');
  console.log('   1. Nutrition and Health Practices (preventionItems)');
  console.log('   2. Understanding Overweight and Obesity (definition)');
  console.log('   3. Causes of Overweight and Obesity (overweightCauses)');
} else {
  console.log('❌ Could not find renderList(preventionItems)');
  console.log('Checking what we have...');
  for (let i = 0; i < Math.min(lines.length, 50); i++) {
    if (lines[i].includes('renderList')) {
      console.log(`Line ${i + 1}: ${lines[i].substring(0, 80)}`);
    }
  }
}
