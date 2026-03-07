#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re

# Read the file
with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Define the new lesson 4 content
new_lesson4 = '''            content: (function () {
              const meals = [
                {
                  timeEn: "Breakfast",
                  timeBn: "সকালের খাবার",
                  icon: "fa-mug-saucer",
                  color: "breakfast",
                  energy: yhLang(
                    "2-3 medium chapatis OR 2 parathas OR 1 bowl rice",
                    "মাঝারি সাইজের ২/৩টি রুটি অথবা ২টি পরোটা অথবা ১ বাটি ভাত"
                  ),
                  growth: yhLang(
                    "1 egg OR 1 bowl lentils",
                    "১টি ডিম অথবা ১ বাটি ডাল"
                  ),
                  immunity: yhLang(
                    "1 bowl mixed vegetables (2-3 types) OR vegetable stir-fry",
                    "১ বাটি সবজি (২/৩ রকম সবজি মিশিয়ে) অথবা সবজি ভাজি (পটল ভাজি, পেঁপে ভাজি ইত্যাদি)"
                  ),
                },
                {
                  timeEn: "Mid-Morning Snack",
                  timeBn: "মধ্য-সকালের নাস্তা",
                  icon: "fa-cookie-bite",
                  color: "midmorning",
                  energy: yhLang(
                    "Homemade snacks (flattened rice/puffed rice + jaggery) and ripe banana",
                    "বাড়িতে তৈরি নাস্তা জাতীয় খাবার (চিড়া/মুড়ি + গুড়) ও পাকা কলা"
                  ),
                  growth: yhLang(
                    "Any local seasonal fruit (mango, jackfruit, papaya, pineapple, etc.)",
                    "যেকোনো দেশি মৌসুমী ফল (আম, কাঁঠাল, পেঁপে, আনারস ইত্যাদি)"
                  ),
                  immunity: "",
                },
                {
                  timeEn: "Lunch",
                  timeBn: "দুপুরের খাবার",
                  icon: "fa-bowl-rice",
                  color: "lunch",
                  energy: yhLang(
                    "2-3 bowls rice",
                    "২/৩ বাটি ভাত"
                  ),
                  growth: yhLang(
                    "1 bowl thick lentils & 1 piece (medium) fish/meat/liver",
                    "১ বাটি মাঝারি ঘন ডাল ও ১ টুকরা (মাঝারি সাইজের) মাছ/মাংস/কলিজা"
                  ),
                  immunity: yhLang(
                    "1 bowl leafy greens (red spinach, taro leaves) OR vegetables",
                    "১ বাটি শাক (লাল শাক, কচুশাক, পুঁই শাক) অথবা সবজি"
                  ),
                },
                {
                  timeEn: "Afternoon Snack",
                  timeBn: "বিকালের নাস্তা",
                  icon: "fa-ice-cream",
                  color: "afternoon",
                  energy: yhLang(
                    "1 glass milk OR any milk-based dessert (pudding, vermicelli, rice pudding, cake, yogurt, etc.)",
                    "১ গ্লাস দুধ অথবা দুধ দিয়ে তৈরি যেকোনো ঘন খাবার (ফিরনি, সেমাই, পায়েস, পিঠা, দই ইত্যাদি)"
                  ),
                  growth: yhLang(
                    "Any local seasonal fruit available",
                    "যেকোনো দেশি মৌসুমী ফল। ঋতুভেদে যেসব ফল সহজেই আমরা পাই"
                  ),
                  immunity: "",
                },
                {
                  timeEn: "Dinner",
                  timeBn: "রাতের খাবার",
                  icon: "fa-plate-wheat",
                  color: "dinner",
                  energy: yhLang(
                    "2-3 bowls rice",
                    "২/৩ বাটি ভাত"
                  ),
                  growth: yhLang(
                    "1 bowl thick lentils (if possible, 1 piece fish/meat)",
                    "১ বাটি ঘন ডাল (যদি সম্ভব হয় ১ টুকরা মাছ/মাংস)"
                  ),
                  immunity: yhLang(
                    "1 bowl leafy greens OR vegetables",
                    "১ বাটি শাক অথবা সবজি"
                  ),
                },
              ];

              return `
                <link rel="stylesheet" href="css/m19l4.css">
                <div class="m19l4-container">
                  <div class="m19l4-shape m19l4-shape-1"></div>
                  <div class="m19l4-shape m19l4-shape-2"></div>
                  <div class="m19l4-shape m19l4-shape-3"></div>

                  <div class="m19l4-header" data-aos="fade-up">
                    <h2 class="m19l4-title">
                      <i class="fa-solid fa-utensils"></i>
                      ${yhLang(
                        "Daily Meal Plan for Adolescents",
                        "কৈশোরকালীন প্রতিদিনের খাদ্য তালিকার নমুনা"
                      )}
                    </h2>
                    <p class="m19l4-subtitle">${yhLang(
                      "A balanced meal plan ensuring energy, growth, and immunity for healthy adolescent development",
                      "সুস্থ কৈশোরকালীন বিকাশের জন্য শক্তি, বৃদ্ধি এবং রোগ প্রতিরোধ ক্ষমতা নিশ্চিত করার জন্য একটি সুষম খাদ্য পরিকল্পনা"
                    )}</p>
                  </div>

                  <div class="m19l4-meals-grid">
                    ${meals
                      .map(
                        (meal, idx) => `
                        <div class="m19l4-meal-card m19l4-meal-${meal.color}" data-aos="zoom-in" data-aos-delay="${80 + idx * 60}">
                          <div class="m19l4-meal-header">
                            <div class="m19l4-meal-icon">
                              <i class="fa-solid ${meal.icon}"></i>
                            </div>
                            <div class="m19l4-meal-time">
                              <h3>${yhLang(meal.timeEn, meal.timeBn)}</h3>
                              <span>${yhLang("Meal " + (idx + 1), "খাবার " + (idx + 1))}</span>
                            </div>
                          </div>
                          <div class="m19l4-food-categories">
                            ${
                              meal.energy
                                ? `
                              <div class="m19l4-food-item m19l4-food-energy">
                                <div class="m19l4-food-icon">
                                  <i class="fa-solid fa-fire"></i>
                                </div>
                                <div class="m19l4-food-content">
                                  <div class="m19l4-food-label">
                                    <i class="fa-solid fa-bolt"></i>
                                    ${yhLang("Energy Foods", "তাপ ও শক্তি উৎপাদনকারী খাদ্য")}
                                  </div>
                                  <div class="m19l4-food-text">${meal.energy}</div>
                                </div>
                              </div>
                            `
                                : ""
                            }
                            ${
                              meal.growth
                                ? `
                              <div class="m19l4-food-item m19l4-food-growth">
                                <div class="m19l4-food-icon">
                                  <i class="fa-solid fa-seedling"></i>
                                </div>
                                <div class="m19l4-food-content">
                                  <div class="m19l4-food-label">
                                    <i class="fa-solid fa-arrow-up"></i>
                                    ${yhLang("Growth Foods", "শরীরের ক্ষয়পূরণ ও বৃদ্ধিকারক খাদ্য")}
                                  </div>
                                  <div class="m19l4-food-text">${meal.growth}</div>
                                </div>
                              </div>
                            `
                                : ""
                            }
                            ${
                              meal.immunity
                                ? `
                              <div class="m19l4-food-item m19l4-food-immunity">
                                <div class="m19l4-food-icon">
                                  <i class="fa-solid fa-shield-virus"></i>
                                </div>
                                <div class="m19l4-food-content">
                                  <div class="m19l4-food-label">
                                    <i class="fa-solid fa-heart-pulse"></i>
                                    ${yhLang("Immunity Foods", "রোগ প্রতিরোধকারী খাদ্য")}
                                  </div>
                                  <div class="m19l4-food-text">${meal.immunity}</div>
                                </div>
                              </div>
                            `
                                : ""
                            }
                          </div>
                        </div>
                      `
                      )
                      .join("")}
                  </div>

                  <div class="m19l4-legend" data-aos="fade-up" data-aos-delay="400">
                    <h3>
                      <i class="fa-solid fa-circle-info"></i>
                      ${yhLang("Food Category Guide", "খাদ্য বিভাগ নির্দেশিকা")}
                    </h3>
                    <div class="m19l4-legend-grid">
                      <div class="m19l4-legend-item m19l4-energy">
                        <div class="m19l4-legend-color"></div>
                        <div class="m19l4-legend-text">
                          <strong>${yhLang("Energy Foods", "তাপ ও শক্তি উৎপাদনকারী খাদ্য")}</strong>
                          <small>${yhLang(
                            "Carbohydrates: rice, bread, flattened rice, puffed rice, potato, sweet potato",
                            "শর্করা জাতীয় খাবার: ভাত, রুটি, চিড়া, মুড়ি, আলু, মিষ্টি আলু"
                          )}</small>
                        </div>
                      </div>
                      <div class="m19l4-legend-item m19l4-growth">
                        <div class="m19l4-legend-color"></div>
                        <div class="m19l4-legend-text">
                          <strong>${yhLang("Growth & Repair Foods", "শরীরের ক্ষয়পূরণ ও বৃদ্ধিকারক খাদ্য")}</strong>
                          <small>${yhLang(
                            "Proteins: egg, fish, meat, milk, lentils, nuts and seeds",
                            "আমিষ জাতীয় খাবার: ডিম, মাছ, মাংস, দুধ, ডাল ও বিচি জাতীয় খাবার"
                          )}</small>
                        </div>
                      </div>
                      <div class="m19l4-legend-item m19l4-immunity">
                        <div class="m19l4-legend-color"></div>
                        <div class="m19l4-legend-text">
                          <strong>${yhLang("Immunity & Protection Foods", "রোগ প্রতিরোধকারী খাদ্য")}</strong>
                          <small>${yhLang(
                            "Vitamins & minerals: colorful vegetables, leafy greens, local seasonal fruits",
                            "ভিটামিন ও খনিজ উপাদান সমৃদ্ধ খাবার: রঙিন শাক অথবা সবজি, দেশি মৌসুমী ফল"
                          )}</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="m19l4-image-section" data-aos="fade-up" data-aos-delay="450">
                    <img src="img/modu19/food.jpg" alt="${yhLang(
                      "Nutritious meal plan illustration",
                      "পুষ্টিকর খাদ্য তালিকা চিত্র"
                    )}" />
                  </div>
                </div>
              `;'''

# Find the lesson 4 content block using regex
# Match from the content: line to the end of the return statement
pattern = r'(id: "ch19-lesson-4",.*?content: \(function \(\) \{).*?(\}\)\(\),\s*\},)'

replacement = r'\1' + new_lesson4 + r'''
            })(),
          },'''

# Perform replacement
new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)

# Write back
with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("✅ Lesson 4 updated successfully!")
