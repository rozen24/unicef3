#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re

# Read the file
with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# New Lesson 3 content
new_lesson3 = '''            content: (function () {
              const nutrients = [
                {
                  num: "१",
                  name: yhLang("Carbohydrates", "শ্বেতসার বা শর্করা (কার্বোহাইড্রেট)"),
                  sources: yhLang("Rice, Bread, Toast, Biscuits, Puffed Rice, Flattened Rice, Sugar, Jaggery, Honey, Potato, Sweet Potato", "ভাত, রুটি, পাউরুটি, বিস্কুট, মুড়ি, চিড়া, চিনি, গুড়, মধু, আলু, মিষ্টি আলু"),
                  functions: yhLang("Provides energy to the body, enables ability to work", "শরীরের শক্তি জোগায়, কাজ করার ক্ষমতা দেয়"),
                  icon: "fa-bread-slice",
                  color: "carbs"
                },
                {
                  num: "२",
                  name: yhLang("Fats and Oils", "তেল ও চর্বি"),
                  sources: yhLang("Oil, Ghee, Butter, Fish and Meat Fat, Nuts, Coconut", "তেল, ঘি, মাখন, মাছ-মাংসের চর্বি, বাদাম, নারিকেল"),
                  functions: yhLang("Provides concentrated energy, helps absorb vitamins A, D, E, and K", "কেন্দ্রীভূত শক্তি প্রদান করে, ভিটামিন A, D, E, K শোষণে সাহায্য করে"),
                  icon: "fa-droplet",
                  color: "fats"
                },
                {
                  num: "३",
                  name: yhLang("Proteins", "আমিষ (প্রোটিন)"),
                  sources: yhLang("Animal: Fish, Meat, Liver, Milk, Eggs, Dried Fish - Plant: Nuts, Various Seeds, Various Lentils, Sesame", "প্রাণীজ: মাছ, মাংস, কলিজা, দুধ, ডিম, শুঁটকি মাছ - উদ্ভিদজ: বাদাম, বিভিন্ন ধরনের বীজ, বিভিন্ন ধরনের ডাল, তিল"),
                  functions: yhLang("Promotes body growth and replaces worn-out tissues", "শরীরের বৃদ্ধি সাধন ও ক্ষয়পূরণ করে"),
                  icon: "fa-drumstick-bite",
                  color: "protein"
                },
                {
                  num: "४",
                  name: yhLang("Vitamins and Minerals", "ভিটামিন ও খনিজ লবণ"),
                  sources: yhLang("Animal: Milk, Fish, Meat, Liver - Plant: Nuts, Seeds, Leafy Vegetables, Vegetables, Fruits - Vitamin A: Colorful Vegetables, Spinach, Carrot, Pumpkin - Vitamin D: Egg Yolk, Fish Oil, Liver, Butter, Cheese - Vitamin C: Indian Gooseberry, Orange, Cilantro, Hog Plum, Fresh Sour Vegetables and Fruits - Calcium: Milk Products, Dark Green Vegetables, Dried Fish, Small Fish, Jaggery, Chickpeas - Iron: Fish, Meat, Liver, Eggs, Taro, Amaranth, Spinach, Tamarind - Iodine: Seafish, Iodized Salt", "প্রাণীজ: দুধ, মাছ, মাংস, কলিজা - উদ্ভিদজ: বাদাম, বিভিন্ন ধরনের বীজ, শাক, সবজি ও ফলমূল - ভিটামিন এ: রঙিন শাক-সবজি, লালশাক, গাজর, মিষ্টি কুমড়া - ভিটামিন ডি: ডিমের কুসুম, মাছের তেল, কলিজা, মাখন, পনির - ভিটামিন সি: আমলকি, কমলা, ধনেপাতা, আমড়া, তাজা শাক-সবজি ও ফল - ক্যালসিয়াম: দুধ ও দুগ্ধজাত, সবুজ শাকসবজি, শুঁটকি মাছ, গুড় - আয়রন: মাছ, মাংস, কলিজা, ডিম, কচু, পুঁইশাক, লালশাক - আয়োডিন: সামুদ্রিক মাছ, আয়োডিনযুক্ত লবণ"),
                  functions: yhLang("Assists digestion and nutrition processes, builds disease resistance, protects from pathogens, prevents night blindness, strengthens bones and teeth, prevents scurvy, treats anemia, ensures child development, prevents goiter", "পরিপাক ও পুষ্টিসাধনে সহায়তা করে, রোগ প্রতিরোধ ক্ষমতা তৈরি করে, শরীরকে রোগজীবাণু থেকে রক্ষা করে, রাতকানা রোগ প্রতিরোধ করে, হাড় ও দাঁতের গঠন মজবুত করে, লালা ও দাঁতের মাড়ি থেকে রক্ত পড়া বন্ধ করে, রক্তস্বল্পতা দূর করে, শিশুর মানসিক বিকাশ নিশ্চিত করে, গলগণ্ড রোধ করে"),
                  icon: "fa-pills",
                  color: "vitamins"
                },
                {
                  num: "५",
                  name: yhLang("Water", "পানি"),
                  sources: yhLang("Drinking Water, Various Liquids, Beverages, and Water Content in Foods", "খাওয়ার পানি, বিভিন্ন তরল ও পানীয় জাতীয় খাবার এবং খাবারের জলীয় অংশ"),
                  functions: yhLang("Without water, the functions of all 5 components are impossible", "উপরের ৫টি উপাদানের কার্যক্রম পানি ব্যতীত অসম্ভব"),
                  icon: "fa-glass-water",
                  color: "water"
                }
              ];

              return `
                <link rel="stylesheet" href="css/m19l3.css">
                <div class="m19l3-table-container">
                  <div class="m19l3-table-header" data-aos="fade-up">
                    <h2><i class="fa-solid fa-bowl-food"></i>${yhLang("Nutrition Components", "পুষ্টি উপাদানসমূহ")}</h2>
                  </div>
                  <div class="m19l3-table-wrapper" data-aos="fade-up" data-aos-delay="100">
                    <table class="m19l3-nutrition-table">
                      <thead>
                        <tr>
                          <th class="col-num">${yhLang("No.", "নং")}</th>
                          <th class="col-nutrient">${yhLang("Nutrient", "পুষ্টি উপাদান")}</th>
                          <th class="col-sources">${yhLang("Sources", "খাদ্য উৎস")}</th>
                          <th class="col-functions">${yhLang("Functions", "প্রধান কাজসমূহ")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${nutrients.map((item, idx) => `
                          <tr class="m19l3-row m19l3-${item.color}" data-aos="fade-up" data-aos-delay="${50 + (idx * 50)}">
                            <td class="col-num">
                              <div class="m19l3-num-badge">
                                <i class="fa-solid ${item.icon}"></i>
                                <span>${item.num}</span>
                              </div>
                            </td>
                            <td class="col-nutrient">
                              <div class="m19l3-nutrient-title">${item.name}</div>
                            </td>
                            <td class="col-sources">
                              <div class="m19l3-sources-text">${item.sources}</div>
                            </td>
                            <td class="col-functions">
                              <div class="m19l3-functions-text">${item.functions}</div>
                            </td>
                          </tr>
                        `).join('')}
                      </tbody>
                    </table>
                  </div>
                  <div class="m19l3-color-legend" data-aos="fade-up" data-aos-delay="300">
                    <h3>${yhLang("Color Code Legend", "রঙের অর্থ")}</h3>
                    <div class="legend-items">
                      <div class="legend-item m19l3-carbs">
                        <span class="legend-color"></span>
                        <span>${yhLang("Carbohydrates", "শ্বেতসার")}</span>
                      </div>
                      <div class="legend-item m19l3-fats">
                        <span class="legend-color"></span>
                        <span>${yhLang("Fats & Oils", "তেল ও চর্বি")}</span>
                      </div>
                      <div class="legend-item m19l3-protein">
                        <span class="legend-color"></span>
                        <span>${yhLang("Proteins", "প্রোটিন")}</span>
                      </div>
                      <div class="legend-item m19l3-vitamins">
                        <span class="legend-color"></span>
                        <span>${yhLang("Vitamins & Minerals", "ভিটামিন ও খনিজ")}</span>
                      </div>
                      <div class="legend-item m19l3-water">
                        <span class="legend-color"></span>
                        <span>${yhLang("Water", "পানি")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              `;
            })(),'''

# Pattern to find the old content section and replace it
# Find from "content: (function () {" to the closing "})(),"
pattern = r'(            content: \(function \(\) \{)[\s\S]*?(            \}\)\(\),)'

# Make sure we're in the ch19-lesson-3 section by checking the context
if 'id: "ch19-lesson-3"' in content:
    # Find the position of ch19-lesson-3
    ch19_lesson3_pos = content.find('id: "ch19-lesson-3"')
    ch19_lesson4_pos = content.find('id: "ch19-lesson-4"')
    
    # Extract just the lesson 3 section
    lesson3_section = content[ch19_lesson3_pos:ch19_lesson4_pos]
    
    # Replace the content function
    updated_section = re.sub(
        r'(            content: \(function \(\) \{)[\s\S]*?(            \}\)\(\),)',
        new_lesson3 + '\n        ',
        lesson3_section
    )
    
    # Replace in the original content
    new_content = content[:ch19_lesson3_pos] + updated_section + content[ch19_lesson4_pos:]
    
    # Write back
    with open('js/data.js', 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print("✓ Successfully updated Lesson 3 content!")
else:
    print("✗ Could not find ch19-lesson-3 in data.js")
