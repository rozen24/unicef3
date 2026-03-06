#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Module 19 Lessons 2 and 3 Merger with Modern UI
Merges BMI and Nutrition Components lessons
"""

import re

# Read the data.js file
with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# New merged content for Lesson 2
lesson2_new = '''          {
            id: "ch19-lesson-2",
            title: yhLang("BMI & Nutrition Components", "বি.এম.আই ও পুষ্টি উপাদান"),
            icon: "fa-scale-balanced",
            gradientClass: "bg-gradient-sky",
            audioFile: "",
            quiz: null,
            content: (function () {
              const girlsBmi = [
                { age: "১০", ageEn: "10", low: "১৪.৮", normal: "১৬.৬", overweight: "১৯.০" },
                { age: "১১", ageEn: "11", low: "১৫.৩", normal: "১৭.২", overweight: "১৯.৯" },
                { age: "১২", ageEn: "12", low: "১৬.০", normal: "১৮.০", overweight: "২০.৮" },
                { age: "১৩", ageEn: "13", low: "১৬.৬", normal: "১৮.৮", overweight: "২১.৮" },
                { age: "১৪", ageEn: "14", low: "১৭.২", normal: "১৯.৬", overweight: "২২.৭" },
                { age: "১৫", ageEn: "15", low: "১৭.৮", normal: "২০.২", overweight: "২৩.৫" },
                { age: "১৬", ageEn: "16", low: "১৮.২", normal: "২০.৭", overweight: "২৪.১" },
                { age: "১৭", ageEn: "17", low: "১৮.৪", normal: "২১.০", overweight: "২৪.৫" },
                { age: "১৮", ageEn: "18", low: "১৮.৬", normal: "২১.৩", overweight: "২৪.৮" },
                { age: "১৯", ageEn: "19", low: "১৮.৭", normal: "২১.৪", overweight: "২৫.০" },
              ];

              const boysBmi = [
                { age: "১০", ageEn: "10", low: "১৪.৮", normal: "১৬.৬", overweight: "১৯.০" },
                { age: "১১", ageEn: "11", low: "১৫.৩", normal: "১৬.৯", overweight: "১৯.২" },
                { age: "১২", ageEn: "12", low: "১৫.৮", normal: "১৭.৫", overweight: "১৯.৯" },
                { age: "১৩", ageEn: "13", low: "১৬.৪", normal: "১৮.২", overweight: "২০.৮" },
                { age: "১৪", ageEn: "14", low: "১৭.০", normal: "১৯.০", overweight: "২১.৮" },
                { age: "১৫", ageEn: "15", low: "১৭.৬", normal: "১৯.৮", overweight: "২২.৭" },
                { age: "১৬", ageEn: "16", low: "১৮.২", normal: "২০.৫", overweight: "২৩.৫" },
                { age: "১৭", ageEn: "17", low: "১৮.৮", normal: "২১.১", overweight: "২৪.৩" },
                { age: "১৮", ageEn: "18", low: "১৯.২", normal: "২১.৭", overweight: "২৪.৯" },
                { age: "১৯", ageEn: "19", low: "১৯.৬", normal: "২২.২", overweight: "২৫.৪" },
              ];

              const nutrients = [
                {
                  text: yhLang("Carbohydrates (Starch/Sugar)", "শ্বেতসার বা শর্করা (কার্বোহাইড্রেট)"),
                  icon: "fa-wheat-awn",
                  color: "m19l2x3-carbs",
                  sources: yhLang(
                    "Rice, bread, biscuits, puffed rice, flattened rice, sugar, jaggery, honey, potatoes, sweet potatoes",
                    "ভাত, রুটি, পাউরুটি, বিস্কুট, মুড়ি, চিড়া, চিনি, গুড়, মধু, আলু, মিষ্টি আলু"
                  ),
                  functions: yhLang(
                    "Provides energy to the body and boosts work capacity",
                    "শরীরের শক্তি জোগায়, কাজ করার ক্ষমতা দেয়"
                  ),
                },
                {
                  text: yhLang("Fats & Oils", "তেল ও চর্বি"),
                  icon: "fa-droplet",
                  color: "m19l2x3-fats",
                  sources: yhLang(
                    "Oil, ghee, butter, meat/fish fat, nuts, coconut",
                    "তেল, ঘি, মাখন, মাছ-মাংসের চর্বি, বাদাম, নারিকেল"
                  ),
                  functions: yhLang(
                    "Provides concentrated energy and helps vitamin absorption",
                    "শরীরের শক্তি জোগায় এবং ভিটামিন শোষণে সাহায্য করে"
                  ),
                },
                {
                  text: yhLang("Proteins", "আমিষ (প্রোটিন)"),
                  icon: "fa-egg",
                  color: "m19l2x3-protein",
                  sources: yhLang(
                    "Animal: Fish, meat, liver, milk, eggs, dried fish | Plant: Nuts, seeds, lentils, sesame/flaxseed",
                    "প্রাণীজ: মাছ, মাংস, কলিজা, দুধ, ডিম, শুঁটকি মাছ | উদ্ভিদজ: বাদাম, বিভিন্ন ধরনের বীজ, বিভিন্ন ধরনের ডাল, তিল/তিসি"
                  ),
                  functions: yhLang(
                    "Promotes body growth and repairs damaged tissues",
                    "শরীরের বৃদ্ধি সাধন ও ক্ষয়পূরণ করে"
                  ),
                },
                {
                  text: yhLang("Vitamins & Minerals", "ভিটামিন ও খনিজ লবণ"),
                  icon: "fa-pills",
                  color: "m19l2x3-vitamins",
                  sources: yhLang(
                    "Animal: Milk, fish, meat, liver | Plant: Nuts, seeds, vegetables, fruits | Vitamin A: Colorful vegetables, red spinach, carrots, pumpkin | Vitamin D: Egg yolk, fish oil, liver, butter, cheese | Vitamin C: Amla, orange, coriander, fresh sour fruits/vegetables | Calcium: Milk, dairy products, dark green vegetables, dried fish, small fish, jaggery, chickpeas | Iron: Fish, m eat, liver, eggs, taro, vine spinach, red spinach, tamarind | Iodine: Sea fish, iodized salt",
                    "প্রাণীজ: দুধ, মাছ, মাংস, কলিজা | উদ্ভিদজ: বাদাম, বিভিন্ন ধরনের বীজ, শাক, সবজি ও ফলমূল | ভিটামিন 'এ': বিভিন্ন ধরনের রঙিন শাক-সবজি, লালশাক, গাজর, মিষ্টি কুমড়া | ভিটামিন 'ডি': ডিমের কুসুম, মাছের তেল, কলিজা, মাখন, পনির ইত্যাদি | ভিটামিন 'সি': আমলকি, কমলা, ধনেপাতা, আমড়া, তাজা ও টক জাতীয় শাক-সবজি ও ফল ইত্যাদি | ক্যালসিয়াম: দুধ ও দুগ্ধজাত খাদ্য, গাঢ় সবুজ শাকসবজি, শুঁটকি মাছ, ছোট মাছ, গুড়, ছোলা ইত্যাদি | আয়রন: মাছ, মাংস, কলিজা, ডিম, কচু, পুঁইশাক, লালশাক, তেঁতুল ইত্যাদি | আয়োডিন: সামুদ্রিক মাছ, আয়োডিনযুক্ত লবণ"
                  ),
                  functions: yhLang(
                    "Aids digestion, builds immunity, protects from germs, prevents night blindness, strengthens bones/teeth, prevents rickets, heals wounds, stops gum bleeding, prevents scurvy, reduces anemia/weakness, ensures mental development, prevents goiter",
                    "পরিপাক ও পুষ্টিসাধনের প্রক্রিয়াকে সহায়তা করে | রোগ প্রতিরোধ ক্ষমতা তৈরি করে | শরীরকে রোগজীবাণু থেকে রক্ষা করে | রাতকানা রোগ প্রতিরোধ করে ও চামড়া মসৃণ করে | হাড় ও দাঁতের গঠন মজবুত করে, রিকেট প্রতিরোধ করে | ক্ষত দূর করে, দাঁতের মাড়ি থেকে রক্ত পড়া বন্ধ করে, ঘাপাঁচড়া প্রতিরোধ করে | রক্তস্বল্পতা, ক্ষুধামন্দা ও দুর্বলতা দূর করে | শিশুর মানসিক বিকাশ নিশ্চিত করে ও গলগণ্ড রোধ করে"
                  ),
                },
                {
                  text: yhLang("Water", "পানি"),
                  icon: "fa-glass-water",
                  color: "m19l2x3-water",
                  sources: yhLang(
                    "Drinking water, various liquids, beverages, and water content in foods",
                    "খাওয়ার পানি, বিভিন্ন তরল ও পানীয় জাতীয় খাবার এবং বিভিন্ন খাবারের জলীয় অংশ"
                  ),
                  functions: yhLang(
                    "Essential for all bodily functions, none of the above 5 components can work without water",
                    "উপরের ৫টি উপাদানের কার্যক্রম পানি ব্যতীত অসম্ভব"
                  ),
                },
              ];

              return `
                <div class="mod19-lesson2-3">
                  <div class="m19l2x3-shape m19l2x3-shape-1"></div>
                  <div class="m19l2x3-shape m19l2x3-shape-2"></div>
                  <div class="m19l2x3-shape m19l2x3-shape-3"></div>

                  <h2 class="m19l2x3-title" data-aos="fade-up">
                    <i class="fa-solid fa-scale-balanced"></i>
                    ${yhLang("BMI & Nutrition Components", "বি.এম.আই ও পুষ্টি উপাদান")}
                  </h2>

                  <!-- BMI Section -->
                  <div class="m19l2x3-bmi-section" data-aos="fade-up" data-aos-delay="50">
                    <h3 class="m19l2x3-section-title">
                      <i class="fa-solid fa-chart-line"></i>
                      ${yhLang("BMI (Body Mass Index) Standard for Adolescents", "কিশোর-কিশোরীদের বি.এম.আই আদর্শ মান")}
                    </h3>
                    <div class="m19l2x3-bmi-grid">
                      <div class="m19l2x3-bmi-card m19l2x3-bmi-girls" data-aos="fade-right" data-aos-delay="70">
                        <div class="m19l2x3-bmi-header">
                          <i class="fa-solid fa-person-dress"></i>
                          <span>${yhLang("Girls (Ages 10-19)", "কিশোরী (১০-১৯ বছর)")}</span>
                        </div>
                        <div class="m19l2x3-table-wrapper">
                          <table class="m19l2x3-table">
                            <thead>
                              <tr>
                                <th>${yhLang("Age", "বয়স")}</th>
                                <th>${yhLang("Low BMI", "স্বল্প অপুষ্টি")}</th>
                                <th>${yhLang("Normal BMI", "স্বাভাবিক পুষ্টি")}</th>
                                <th>${yhLang("Overweight", "স্বল্প মুটিয়ে যাওয়া")}</th>
                              </tr>
                            </thead>
                            <tbody>
                              ${girlsBmi.map((row, index) => `
                                <tr data-aos="fade-up" data-aos-delay="${90 + index * 20}">
                                  <td>${yhLang(row.ageEn, row.age)}</td>
                                  <td>${row.low}</td>
                                  <td>${row.normal}</td>
                                  <td>${row.overweight}</td>
                                </tr>
                              `).join('')}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div class="m19l2x3-bmi-card m19l2x3-bmi-boys" data-aos="fade-left" data-aos-delay="70">
                        <div class="m19l2x3-bmi-header">
                          <i class="fa-solid fa-person"></i>
                          <span>${yhLang("Boys (Ages 10-19)", "কিশোর (১০-১৯ বছর)")}</span>
                        </div>
                        <div class="m19l2x3-table-wrapper">
                          <table class="m19l2x3-table">
                            <thead>
                              <tr>
                                <th>${yhLang("Age", "বয়স")}</th>
                                <th>${yhLang("Low BMI", "স্বল্প অপুষ্টি")}</th>
                                <th>${yhLang("Normal BMI", "স্বাভাবিক পুষ্টি")}</th>
                                <th>${yhLang("Overweight", "স্বল্প মুটিয়ে যাওয়া")}</th>
                              </tr>
                            </thead>
                            <tbody>
                              ${boysBmi.map((row, index) => `
                                <tr data-aos="fade-up" data-aos-delay="${90 + index * 20}">
                                  <td>${yhLang(row.ageEn, row.age)}</td>
                                  <td>${row.low}</td>
                                  <td>${row.normal}</td>
                                  <td>${row.overweight}</td>
                                </tr>
                              `).join('')}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Nutrition Components Section -->
                  <div class="m19l2x3-nutrition-section" data-aos="fade-up" data-aos-delay="100">
                    <h3 class="m19l2x3-section-title">
                      <i class="fa-solid fa-bowl-food"></i>
                      ${yhLang("Essential Nutrition Components", "প্রয়োজনীয় পুষ্টি উপাদানসমূহ")}
                    </h3>
                    <div class="m19l2x3-nutrients-grid">
                      ${nutrients.map((nutrient, index) => `
                        <div class="m19l2x3-nutrient-card ${nutrient.color}" data-aos="zoom-in" data-aos-delay="${120 + index * 40}">
                          <div class="m19l2x3-nutrient-icon">
                            <i class="fa-solid ${nutrient.icon}"></i>
                          </div>
                          <div class="m19l2x3-nutrient-content">
                            <h4 class="m19l2x3-nutrient-name">${nutrient.text}</h4>
                            <div class="m19l2x3-nutrient-detail">
                              <strong><i class="fa-solid fa-seedling"></i> ${yhLang("Sources:", "উৎস:")}</strong>
                              <p>${nutrient.sources}</p>
                            </div>
                            <div class="m19l2x3-nutrient-detail">
                              <strong><i class="fa-solid fa-heart-pulse"></i> ${yhLang("Functions:", "কাজ:")}</strong>
                              <p>${nutrient.functions}</p>
                            </div>
                          </div>
                        </div>
                      `).join('')}
                    </div>
                  </div>
                </div>
              `;
            })(),
          },'''

# Find and replace Lesson  2
pattern_l2 = re.compile(
    r'(\s+\{\n\s+id: "ch19-lesson-2",.*?)\s+\},',
    re.DOTALL
)

# Find the match for Lesson 2
match_l2 = pattern_l2.search(content)
if match_l2:
    # Replace lesson 2
    content = content[:match_l2.start(1)] + lesson2_new + content[match_l2.end():]
    print("✓ Replaced Lesson 2 (BMI)")
else:
    print("✗ Could not find Lesson 2")

# Do the same for Lesson 3
pattern_l3 = re.compile(
    r'(\s+\{\n\s+id: "ch19-lesson-3",.*?)\s+\},',
    re.DOTALL
)

match_l3 = pattern_l3.search(content)
if match_l3:
    # Replace with the same merged content but for Lesson 3
    content = content[:match_l3.start(1)] + lesson2_new.replace('"ch19-lesson-2"', '"ch19-lesson-3"').replace('"fa-scale-balanced"', '"fa-bowl-food"').replace('"bg-gradient-sky"', '"bg-gradient-gold"') + content[match_l3.end():]
    print("✓ Replaced Lesson 3 (Nutrition Components)")
else:
    print("✗ Could not find Lesson 3")

# Write the modified content back
with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("\n✓✓✓ Module 19 Lessons 2 and 3 successfully merged! ✓✓✓")
