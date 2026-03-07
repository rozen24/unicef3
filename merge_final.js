#!/usr/bin/env node

const fs = require('fs');

let content = fs.readFileSync('js/data.js', 'utf-8');

// First, update Lesson 10 title
content = content.replace(
  '"Adolescent Nutrition and Weight Management",\n              "কৈশোরকালীন অপুষ্টি প্রতিরোধে করণীয়"',
  '"Adolescent Nutrition and Weight Management",\n              "কৈশোরকালীন পুষ্টি এবং ওজন ব্যবস্থাপনা"'
);

// Find Lesson 10 content function and replace it with merged content
const oldLesson10Content = `              const preventionItems = [
                {
                  text: yhLang(
                    "Eat a balanced diet such as carbohydrate foods (rice, bread, puffed rice, sugar, molasses, honey, potatoes, flattened rice, etc.), protein foods (eggs, milk, fish, meat, lentils, nuts, seeds, etc.), iron-rich foods (meat, liver, and dark green leafy vegetables), and vitamin A rich foods (liver, ripe papaya, mango, carrot, pumpkin, small fish, eggs, green leafy vegetables, and yellow-colored fruits).",
                    "সুষম খাবার, যেমন— শর্করাজাতীয় খাবার (ভাত, রুটি, মুড়ি, চিনি, গুড়, মধু, আলু, চিড়া ইত্যাদি), আমিষজাতীয় খাবার (ডিম, দুধ, মাছ, মাংস, ডাল, বাদাম, বীচি ইত্যাদি), আয়রনসমৃদ্ধ খাবার (মাংস, কলিজা এবং গাঢ় সবুজ শাক-সবজি), ভিটামিন এ সমৃদ্ধ খাবার (কলিজা, পাকা পেঁপে, আম, গাজর, মিষ্টি কুমড়া, ছোট মাছ, ডিম, সবুজ শাক-সবজি ও হলুদ রঙের ফলমূল) খাওয়া"
                  ),
                  icon: "fa-bowl-food",
                  tone: "success",
                },
                {
                  text: yhLang(
                    "Drink at least 8–10 glasses of water every day.",
                    "প্রতিদিন কমপক্ষে ৮-১০ গ্লাস পানি পান করা"
                  ),
                  icon: "fa-glass-water",
                  tone: "info",
                },
                {
                  text: yhLang(
                    "Eat sufficient vitamin B and vitamin C rich foods every day.",
                    "প্রতিদিন পর্যাপ্ত পরিমাণে ভিটামিন বি এবং ভিটামিন সি-যুক্ত খাবার খাওয়া"
                  ),
                  icon: "fa-lemon",
                  tone: "accent",
                },
                {
                  text: yhLang(
                    "Take one iron–folic acid (IFA) tablet every week.",
                    "প্রতি সপ্তাহে ১টি করে আয়রন-ফলিক এসিড (আইএফএ) ট্যাবলেট খাওয়া"
                  ),
                  icon: "fa-tablets",
                  tone: "tip",
                },
                {
                  text: yhLang(
                    "Eat iodine-rich foods (such as sea fish and vegetables from coastal areas) and use iodized salt.",
                    "আয়োডিনসমৃদ্ধ খাবার (সামুদ্রিক মাছ এবং সমুদ্র তীরবর্তী এলাকার শাক-সবজি) এবং আয়োডিনযুক্ত লবণ খাওয়া"
                  ),
                  icon: "fa-fish",
                  tone: "info",
                },
                {
                  text: yhLang(
                    "Every adolescent should take deworming tablets every six months according to a doctor's advice.",
                    "প্রত্যেক কিশোর-কিশোরীকে চিকিৎসকের পরামর্শ অনুযায়ী ছয় মাস পর পর কৃমিনাশক বড়ি গ্রহণ করা"
                  ),
                  icon: "fa-user-doctor",
                  tone: "warn",
                },
                {
                  text: yhLang(
                    "Wash hands with soap and safe water before and after eating.",
                    "খাবার খাওয়ার আগে ও পরে সাবান এবং নিরাপদ পানি দিয়ে হাত ধোয়া"
                  ),
                  icon: "fa-hand-sparkles",
                  tone: "clean",
                },
                {
                  text: yhLang(
                    "Use hygienic latrines.",
                    "স্বাস্থ্যসম্মত ল্যাট্রিন ব্যবহার করা"
                  ),
                  icon: "fa-house-chimney-medical",
                  tone: "clean",
                },
                {
                  text: yhLang(
                    "No marriage before 18 and no child before 20.",
                    "১৮-এর আগে বিয়ে নয়, ২০-এর আগে সন্তান নয়"
                  ),
                  icon: "fa-shield-heart",
                  tone: "danger",
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

const newLesson10Content = `              const preventionItems = [
                {
                  text: yhLang(
                    "Eat a balanced diet such as carbohydrate foods (rice, bread, puffed rice, sugar, molasses, honey, potatoes, flattened rice, etc.), protein foods (eggs, milk, fish, meat, lentils, nuts, seeds, etc.), iron-rich foods (meat, liver, and dark green leafy vegetables), and vitamin A rich foods (liver, ripe papaya, mango, carrot, pumpkin, small fish, eggs, green leafy vegetables, and yellow-colored fruits).",
                    "সুষম খাবার, যেমন— শর্করাজাতীয় খাবার (ভাত, রুটি, মুড়ি, চিনি, গুড়, মধু, আলু, চিড়া ইত্যাদি), আমিষজাতীয় খাবার (ডিম, দুধ, মাছ, মাংস, ডাল, বাদাম, বীচি ইত্যাদি), আয়রনসমৃদ্ধ খাবার (মাংস, কলিজা এবং গাঢ় সবুজ শাক-সবজি), ভিটামিন এ সমৃদ্ধ খাবার (কলিজা, পাকা পেঁপে, আম, গাজর, মিষ্টি কুমড়া, ছোট মাছ, ডিম, সবুজ শাক-সবজি ও হলুদ রঙের ফলমূল) খাওয়া"
                  ),
                  icon: "fa-bowl-food",
                  tone: "success",
                },
                {
                  text: yhLang(
                    "Drink at least 8–10 glasses of water every day.",
                    "প্রতিদিন কমপক্ষে ৮-१० গ্লাস পানি পান করা"
                  ),
                  icon: "fa-glass-water",
                  tone: "info",
                },
                {
                  text: yhLang(
                    "Eat sufficient vitamin B and vitamin C rich foods every day.",
                    "প্রতিদিন পর্যাপ্ত পরিমাণে ভিটামিন বি এবং ভিটামিন সি-যুক্ত খাবার খাওয়া"
                  ),
                  icon: "fa-lemon",
                  tone: "accent",
                },
                {
                  text: yhLang(
                    "Take one iron–folic acid (IFA) tablet every week.",
                    "প্রতি সপ්তাহে १टি करে आयरन-फोलिक एसिड (आईएफए) टैबलेट खाওয়া"
                  ),
                  icon: "fa-tablets",
                  tone: "tip",
                },
                {
                  text: yhLang(
                    "Eat iodine-rich foods (such as sea fish and vegetables from coastal areas) and use iodized salt.",
                    "আয়োডিনসমৃদ্ধ খাবার (সামুদ্রিক মাছ এবং সমুদ্র তীরবর্তী এলাকার শাক-সবজি) এবং আয়োডিনযুক্ত লবণ খাওয়া"
                  ),
                  icon: "fa-fish",
                  tone: "info",
                },
                {
                  text: yhLang(
                    "Every adolescent should take deworming tablets every six months according to a doctor's advice.",
                    "প্রত্যেক কিশোর-কিশোরীকে চিকিৎসকের পরামর্শ অনুযায়ী ছয় মাস পর পর কৃমিনাশক বড়ি গ্রহণ করা"
                  ),
                  icon: "fa-user-doctor",
                  tone: "warn",
                },
                {
                  text: yhLang(
                    "Wash hands with soap and safe water before and after eating.",
                    "খাবার খাওয়ার আগে ও পরে সাবান এবং নিরাপদ পানি দিয়ে হাত ধোয়া"
                  ),
                  icon: "fa-hand-sparkles",
                  tone: "clean",
                },
                {
                  text: yhLang(
                    "Use hygienic latrines.",
                    "স্বাস্থ্যসম্মত ল্যাট্রিন ব্যবহার করা"
                  ),
                  icon: "fa-house-chimney-medical",
                  tone: "clean",
                },
                {
                  text: yhLang(
                    "No marriage before 18 and no child before 20.",
                    "१८-এর আগে বিয়ে नय়, २०-एর आगে সন्তان नय়"
                  ),
                  icon: "fa-shield-heart",
                  tone: "danger",
                },
              ];

              const overweightCauses = [
                {
                  text: yhLang("Eating more calories than needed every day.", "প্রতিदिन प्रयोजनेर तुलनায় बेशि क्यालोरiyukt खाद्y ग्रहण"),
                  icon: "fa-burger",
                  tone: "warn",
                },
                {
                  text: yhLang("Low physical activity and lack of regular sports.", "कम परिश्रम बा नियमित खेलाधुला ना करा"),
                  icon: "fa-person-walking",
                  tone: "info",
                },
                {
                  text: yhLang("Irregular lifestyle (late sleeping, late waking, skipping breakfast, overeating later, excessive mobile/screen time).", "अनiyमित जीवनyापन करा (yेमन: रातजaga, घुम थेके देरite ओठा, नाशta ना करε परε अपरिमित खाowa, बेশi परिमाणε मोবाiल फोन व्यवहाr/स्क्रिनटाiм बेশi होया)"),
                  icon: "fa-mobile-screen-button",
                  tone: "danger",
                },
                {
                  text: yhLang("Frequent intake of fried, oily, and fatty foods (fast food, cola, chips, etc.).", "तेলε भाजा, अधिक तैलाक्त ও चर्बिजातीय खाबar खाowa (yेमन: फास्ट फुड, कोकाकोला, चिप्स इत्या्दि)"),
                  icon: "fa-pizza-slice",
                  tone: "warn",
                },
                {
                  text: yhLang("High intake of sugar and sweets.", "चिनi ও मिष्टiजातीय खाबar बेशi खाowa"),
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
                  .join("")}</ul>\`;`;

//content = content.replace(oldLesson10Content, newLesson10Content);

// Now find and replace the return statement for Lesson 10
const oldReturn = `              return \`
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

const newReturn = `              return \`
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
                      <p class="m19l10-p">\${yhLang("A BMI between 25 and 29.9 is considered overweight. A BMI of 30 or higher is classified as obesity. Among adolescents, obesity rates are influenced by home environment, food habits, socioeconomic status, regular physical activity, exercise opportunities, and facilities. Families often have limited knowledge about the importance of balanced diets, what constitutes balanced meals, and their benefits. Additionally, there is a shortage of suitable and safe play spaces for girls in both rural and urban areas.", "বডি মাস ইনডেক্স (BMI) २५ थेके २९.९ एर medhय थाकले तাকε अतिरिक्त ওজন hisebe धरा हय়. अन्यदike  BMI ३० বा तार बेशi होলε ताкε स्थूलतা बला हय়. किशोर-किशोरीদের meधय स्थूलतार हар बृiधिधार जன्य घরेर परिबेश, खाद्यabbas, आर्थसामाजिक अबस्था, नियमit खेलाधूला, বyayam ও सuayog-subिधार প्रभाব बिद्यमान. सुषम खाबारेर প्रyoजनীyता ও সुषম খাबार कoनguло ও तार सुфल सम्पर्के परिबарेर meধय धारणा कम रyेछ. तछाड़া গ्राम ও शहरe मeyedेदेर उpyुक्त खेलार स्थान ও निрапpad काठामोर সংकट रyेछ.")}\</p>
                    </article>
                  </section>

                  <section class="m19l10-section m19l10-section-b" data-aos="fade-up" data-aos-delay="60">
                    <h3 class="m19l10-h3"><i class="fa-solid fa-triangle-exclamation"></i>\${yhLang("Causes of Overweight and Obesity", "অধिक ওজন এবং स्थूलतार कारण")}</h3>
                    \${renderList(overweightCauses)}
                  </section>
                </div>
              \`;`;

content = content.replace(oldReturn, newReturn);

fs.writeFileSync('js/data.js', content, 'utf-8');
console.log('✅ Lesson 10 updated with merged content!');
