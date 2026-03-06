#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# Update Module 19 Lesson 3 with modern UI

import re

# Read the file
with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# The new lesson content
new_lesson = '''          {
            id: "ch19-lesson-3",
            title: yhLang(
              "Nutrition Components, Sources, and Functions",
              "পুষ্টি উপাদানসমূহ, উৎস এবং তাদের নির্দিষ্ট কাজসমূহ"
            ),
            icon: "fa-bowl-food",
            gradientClass: "bg-gradient-gold",
            audioFile: "",
            quiz: null,
            content: (function () {
              return `
                <div class="m19l3-container">
                  <div class="m19l3-shape m19l3-shape-1"></div>
                  <div class="m19l3-shape m19l3-shape-2"></div>
                  <div class="m19l3-shape m19l3-shape-3"></div>

                  <div class="m19l3-header" data-aos="fade-up">
                    <h2 class="m19l3-title">
                      <i class="fa-solid fa-bowl-food"></i>
                      ${yhLang("Nutrition Components, Sources, and Functions", "পুষ্টি উপাদানসমূহ, উৎস এবং তাদের নির্দিষ্ট কাজসমূহ")}
                    </h2>
                    <p class="m19l3-subtitle">${yhLang("Essential nutrients for healthy body development", "শরীরের সুস্থ বিকাশের জন্য প্রয়োজনীয় পুষ্টি উপাদান")}</p>
                  </div>

                  <div class="m19l3-cards-grid">
                    <!-- 1. Carbohydrates -->
                    <div class="m19l3-nutrient-card m19l3-card-carbs" data-aos="fade-right" data-aos-delay="100">
                      <div class="m19l3-card-header">
                        <div class="m19l3-icon-wrapper">
                          <i class="fa-solid fa-bread-slice"></i>
                        </div>
                        <div class="m19l3-nutrient-name">
                          <span class="m19l3-nutrient-label">১</span>
                          <h3>${yhLang("Carbohydrates", "শ্বেতসার বা শর্করা (কার্বোহাইড্রেট)")}</h3>
                        </div>
                      </div>
                      <div class="m19l3-section">
                        <div class="m19l3-section-title">
                          <i class="fa-solid fa-utensils"></i>
                          ${yhLang("Food Sources", "খাদ্য উৎস")}
                        </div>
                        <div class="m19l3-sources-list">
                          <span class="m19l3-source-tag">${yhLang("Rice", "ভাত")}</span>
                          <span class="m19l3-source-tag">${yhLang("Bread", "রুটি")}</span>
                          <span class="m19l3-source-tag">${yhLang("Toast", "পাউরুটি")}</span>
                          <span class="m19l3-source-tag">${yhLang("Biscuits", "বিস্কুট")}</span>
                          <span class="m19l3-source-tag">${yhLang("Puffed Rice", "মুড়ি")}</span>
                          <span class="m19l3-source-tag">${yhLang("Flattened Rice", "চিড়া")}</span>
                          <span class="m19l3-source-tag">${yhLang("Sugar", "চিনি")}</span>
                          <span class="m19l3-source-tag">${yhLang("Jaggery", "গুড়")}</span>
                          <span class="m19l3-source-tag">${yhLang("Honey", "মধু")}</span>
                          <span class="m19l3-source-tag">${yhLang("Potato", "আলু")}</span>
                          <span class="m19l3-source-tag">${yhLang("Sweet Potato", "মিষ্টি আলু")}</span>
                        </div>
                      </div>
                      <div class="m19l3-section">
                        <div class="m19l3-section-title">
                          <i class="fa-solid fa-heart-pulse"></i>
                          ${yhLang("Functions", "শরীরের প্রধান কাজ")}
                        </div>
                        <ul class="m19l3-functions-list">
                          <li>${yhLang("Provides energy to the body", "শরীরের শক্তি জোগায়")}</li>
                          <li>${yhLang("Gives ability to work", "কাজ করার ক্ষমতা দেয়")}</li>
                        </ul>
                      </div>
                    </div>

                    <!-- 2. Fats and Oils -->
                    <div class="m19l3-nutrient-card m19l3-card-fats" data-aos="fade-left" data-aos-delay="150">
                      <div class="m19l3-card-header">
                        <div class="m19l3-icon-wrapper">
                          <i class="fa-solid fa-droplet"></i>
                        </div>
                        <div class="m19l3-nutrient-name">
                          <span class="m19l3-nutrient-label">২</span>
                          <h3>${yhLang("Fats and Oils", "তেল ও চর্বি")}</h3>
                        </div>
                      </div>
                      <div class="m19l3-section">
                        <div class="m19l3-section-title">
                          <i class="fa-solid fa-utensils"></i>
                          ${yhLang("Food Sources", "খাদ্য উৎস")}
                        </div>
                        <div class="m19l3-sources-list">
                          <span class="m19l3-source-tag">${yhLang("Oil", "তেল")}</span>
                          <span class="m19l3-source-tag">${yhLang("Ghee", "ঘি")}</span>
                          <span class="m19l3-source-tag">${yhLang("Butter", "মাখন")}</span>
                          <span class="m19l3-source-tag">${yhLang("Fish/Meat Fat", "মাছ-মাংসের চর্বি")}</span>
                          <span class="m19l3-source-tag">${yhLang("Nuts", "বাদাম")}</span>
                          <span class="m19l3-source-tag">${yhLang("Coconut", "নারিকেল")}</span>
                        </div>
                      </div>
                      <div class="m19l3-section">
                        <div class="m19l3-section-title">
                          <i class="fa-solid fa-heart-pulse"></i>
                          ${yhLang("Functions", "শরীরের প্রধান কাজ")}
                        </div>
                        <ul class="m19l3-functions-list">
                          <li>${yhLang("Provides concentrated energy", "ঘনীভূত শক্তি প্রদান করে")}</li>
                          <li>${yhLang("Helps absorb fat-soluble vitamins", "চর্বি-দ্রবণীয় ভিটামিন শোষণে সহায়তা করে")}</li>
                        </ul>
                      </div>
                    </div>

                    <!-- 3. Protein -->
                    <div class="m19l3-nutrient-card m19l3-card-protein" data-aos="fade-right" data-aos-delay="200">
                      <div class="m19l3-card-header">
                        <div class="m19l3-icon-wrapper">
                          <i class="fa-solid fa-drumstick-bite"></i>
                        </div>
                        <div class="m19l3-nutrient-name">
                          <span class="m19l3-nutrient-label">৩</span>
                          <h3>${yhLang("Protein", "আমিষ (প্রোটিন)")}</h3>
                        </div>
                      </div>
                      <div class="m19l3-section">
                        <div class="m19l3-section-title">
                          <i class="fa-solid fa-utensils"></i>
                          ${yhLang("Food Sources", "খাদ্য উৎস")}
                        </div>
                        <div class="m19l3-subsection">
                          <div class="m19l3-subsection-title">
                            <i class="fa-solid fa-fish"></i>
                            ${yhLang("Animal Sources", "প্রাণীজ")}
                          </div>
                          <div class="m19l3-sources-list">
                            <span class="m19l3-source-tag">${yhLang("Fish", "মাছ")}</span>
                            <span class="m19l3-source-tag">${yhLang("Meat", "মাংস")}</span>
                            <span class="m19l3-source-tag">${yhLang("Liver", "কলিজা")}</span>
                            <span class="m19l3-source-tag">${yhLang("Milk", "দুধ")}</span>
                            <span class="m19l3-source-tag">${yhLang("Eggs", "ডিম")}</span>
                            <span class="m19l3-source-tag">${yhLang("Dried Fish", "শুঁটকি মাছ")}</span>
                          </div>
                        </div>
                        <div class="m19l3-subsection">
                          <div class="m19l3-subsection-title">
                            <i class="fa-solid fa-seedling"></i>
                            ${yhLang("Plant Sources", "উদ্ভিদজ")}
                          </div>
                          <div class="m19l3-sources-list">
                            <span class="m19l3-source-tag">${yhLang("Nuts", "বাদাম")}</span>
                            <span class="m19l3-source-tag">${yhLang("Seeds", "বিভিন্ন ধরনের বীজ")}</span>
                            <span class="m19l3-source-tag">${yhLang("Lentils", "বিভিন্ন ধরনের ডাল")}</span>
                            <span class="m19l3-source-tag">${yhLang("Sesame/Flax", "তিল/তিসি")}</span>
                          </div>
                        </div>
                      </div>
                      <div class="m19l3-section">
                        <div class="m19l3-section-title">
                          <i class="fa-solid fa-heart-pulse"></i>
                          ${yhLang("Functions", "শরীরের প্রধান কাজ")}
                        </div>
                        <ul class="m19l3-functions-list">
                          <li>${yhLang("Promotes body growth", "শরীরের বৃদ্ধি সাধন করে")}</li>
                          <li>${yhLang("Repairs and maintains tissues", "ক্ষয়পূরণ করে")}</li>
                        </ul>
                      </div>
                    </div>

                    <!-- 4. Vitamins and Minerals -->
                    <div class="m19l3-nutrient-card m19l3-card-vitamins" data-aos="fade-left" data-aos-delay="250">
                      <div class="m19l3-card-header">
                        <div class="m19l3-icon-wrapper">
                          <i class="fa-solid fa-pills"></i>
                        </div>
                        <div class="m19l3-nutrient-name">
                          <span class="m19l3-nutrient-label">৪</span>
                          <h3>${yhLang("Vitamins and Minerals", "ভিটামিন ও খনিজ লবণ")}</h3>
                        </div>
                      </div>
                      <div class="m19l3-section">
                        <div class="m19l3-section-title">
                          <i class="fa-solid fa-utensils"></i>
                          ${yhLang("Food Sources", "খাদ্য উৎস")}
                        </div>
                        <div class="m19l3-subsection">
                          <div class="m19l3-subsection-title">
                            <i class="fa-solid fa-a"></i>
                            ${yhLang("Vitamin A", "ভিটামিন 'এ'")}
                          </div>
                          <div class="m19l3-sources-list">
                            <span class="m19l3-source-tag">${yhLang("Colorful Vegetables", "রঙিন শাক-সবজি")}</span>
                            <span class="m19l3-source-tag">${yhLang("Red Spinach", "লালশাক")}</span>
                            <span class="m19l3-source-tag">${yhLang("Carrots", "গাজর")}</span>
                            <span class="m19l3-source-tag">${yhLang("Sweet Pumpkin", "মিষ্টি কুমড়া")}</span>
                          </div>
                        </div>
                        <div class="m19l3-subsection">
                          <div class="m19l3-subsection-title">
                            <i class="fa-solid fa-d"></i>
                            ${yhLang("Vitamin D", "ভিটামিন 'ডি'")}
                          </div>
                          <div class="m19l3-sources-list">
                            <span class="m19l3-source-tag">${yhLang("Egg Yolk", "ডিমের কুসুম")}</span>
                            <span class="m19l3-source-tag">${yhLang("Fish Oil", "মাছের তেল")}</span>
                            <span class="m19l3-source-tag">${yhLang("Liver", "কলিজা")}</span>
                            <span class="m19l3-source-tag">${yhLang("Butter", "মাখন")}</span>
                            <span class="m19l3-source-tag">${yhLang("Cheese", "পনির")}</span>
                          </div>
                        </div>
                        <div class="m19l3-subsection">
                          <div class="m19l3-subsection-title">
                            <i class="fa-solid fa-c"></i>
                            ${yhLang("Vitamin C", "ভিটামিন 'সি'")}
                          </div>
                          <div class="m19l3-sources-list">
                            <span class="m19l3-source-tag">${yhLang("Amla", "আমলকি")}</span>
                            <span class="m19l3-source-tag">${yhLang("Orange", "কমলা")}</span>
                            <span class="m19l3-source-tag">${yhLang("Coriander", "ধনেপাতা")}</span>
                            <span class="m19l3-source-tag">${yhLang("Hog Plum", "আমড়া")}</span>
                            <span class="m19l3-source-tag">${yhLang("Fresh Citrus Fruits", "টক জাতীয় ফল")}</span>
                          </div>
                        </div>
                        <div class="m19l3-subsection">
                          <div class="m19l3-subsection-title">
                            <i class="fa-solid fa-bone"></i>
                            ${yhLang("Calcium", "ক্যালসিয়াম")}
                          </div>
                          <div class="m19l3-sources-list">
                            <span class="m19l3-source-tag">${yhLang("Milk & Dairy", "দুধ ও দুগ্ধজাত")}</span>
                            <span class="m19l3-source-tag">${yhLang("Dark Green Vegetables", "গাঢ় সবুজ শাকসবজি")}</span>
                            <span class="m19l3-source-tag">${yhLang("Dried Fish", "শুঁটকি মাছ")}</span>
                            <span class="m19l3-source-tag">${yhLang("Small Fish", "ছোট মাছ")}</span>
                            <span class="m19l3-source-tag">${yhLang("Jaggery", "গুড়")}</span>
                          </div>
                        </div>
                        <div class="m19l3-subsection">
                          <div class="m19l3-subsection-title">
                            <i class="fa-solid fa-droplet"></i>
                            ${yhLang("Iron", "আয়রন")}
                          </div>
                          <div class="m19l3-sources-list">
                            <span class="m19l3-source-tag">${yhLang("Fish", "মাছ")}</span>
                            <span class="m19l3-source-tag">${yhLang("Meat", "মাংস")}</span>
                            <span class="m19l3-source-tag">${yhLang("Liver", "কলিজা")}</span>
                            <span class="m19l3-source-tag">${yhLang("Eggs", "ডিম")}</span>
                            <span class="m19l3-source-tag">${yhLang("Taro", "কচু")}</span>
                            <span class="m19l3-source-tag">${yhLang("Malabar Spinach", "পুঁইশাক")}</span>
                            <span class="m19l3-source-tag">${yhLang("Red Spinach", "লালশাক")}</span>
                          </div>
                        </div>
                        <div class="m19l3-subsection">
                          <div class="m19l3-subsection-title">
                            <i class="fa-solid fa-i"></i>
                            ${yhLang("Iodine", "আয়োডিন")}
                          </div>
                          <div class="m19l3-sources-list">
                            <span class="m19l3-source-tag">${yhLang("Sea Fish", "সামুদ্রিক মাছ")}</span>
                            <span class="m19l3-source-tag">${yhLang("Iodized Salt", "আয়োডিনযুক্ত লবণ")}</span>
                          </div>
                        </div>
                      </div>
                      <div class="m19l3-section">
                        <div class="m19l3-section-title">
                          <i class="fa-solid fa-heart-pulse"></i>
                          ${yhLang("Functions", "শরীরের প্রধান কাজ")}
                        </div>
                        <ul class="m19l3-functions-list">
                          <li>${yhLang("Helps digestion and nutrition process", "পরিপাক ও পুষ্টিসাধনের প্রক্রিয়াকে সহায়তা করে")}</li>
                          <li>${yhLang("Builds immunity", "রোগ প্রতিরোধ ক্ষমতা তৈরি করে")}</li>
                          <li>${yhLang("Protects body from germs", "শরীরকে রোগজীবাণু থেকে রক্ষা করে")}</li>
                          <li>${yhLang("Prevents night blindness and smoothens skin", "রাতকানা রোগ প্রতিরোধ করে ও চামড়া মসৃণ করে")}</li>
                          <li>${yhLang("Strengthens bones and teeth, prevents rickets", "হাড় ও দাঁতের গঠন মজবুত করে, রিকেট প্রতিরোধ করে")}</li>
                          <li>${yhLang("Heals wounds, stops gum bleeding, prevents scurvy", "ক্ষত দূর করে, দাঁতের মাড়ি থেকে রক্ত পড়া বন্ধ করে")}</li>
                          <li>${yhLang("Eliminates anemia, loss of appetite and weakness", "রক্তস্বল্পতা, ক্ষুধামন্দা ও দুর্বলতা দূর করে")}</li>
                          <li>${yhLang("Ensures mental development and prevents goiter", "শিশুর মানসিক বিকাশ নিশ্চিত করে ও গলগণ্ড রোধ করে")}</li>
                        </ul>
                      </div>
                    </div>

                    <!-- 5. Water -->
                    <div class="m19l3-nutrient-card m19l3-card-water" data-aos="fade-right" data-aos-delay="300">
                      <div class="m19l3-card-header">
                        <div class="m19l3-icon-wrapper">
                          <i class="fa-solid fa-glass-water"></i>
                        </div>
                        <div class="m19l3-nutrient-name">
                          <span class="m19l3-nutrient-label">৫</span>
                          <h3>${yhLang("Water", "পানি")}</h3>
                        </div>
                      </div>
                      <div class="m19l3-section">
                        <div class="m19l3-section-title">
                          <i class="fa-solid fa-utensils"></i>
                          ${yhLang("Food Sources", "খাদ্য উৎস")}
                        </div>
                        <div class="m19l3-sources-list">
                          <span class="m19l3-source-tag">${yhLang("Drinking Water", "খাওয়ার পানি")}</span>
                          <span class="m19l3-source-tag">${yhLang("Liquid Foods", "বিভিন্ন তরল খাবার")}</span>
                          <span class="m19l3-source-tag">${yhLang("Beverages", "পানীয় জাতীয় খাবার")}</span>
                          <span class="m19l3-source-tag">${yhLang("Water Content in Foods", "খাবারের জলীয় অংশ")}</span>
                        </div>
                      </div>
                      <div class="m19l3-section">
                        <div class="m19l3-section-title">
                          <i class="fa-solid fa-heart-pulse"></i>
                          ${yhLang("Functions", "শরীরের প্রধান কাজ")}
                        </div>
                        <ul class="m19l3-functions-list">
                          <li>${yhLang("Essential for all 5 nutrient functions", "উপরের ৫টি উপাদানের কার্যক্রম পানি ব্যতীত অসম্ভব")}</li>
                          <li>${yhLang("Regulates body temperature", "শরীরের তাপমাত্রা নিয়ন্ত্রণ করে")}</li>
                          <li>${yhLang("Helps transport nutrients", "পুষ্টি পরিবহনে সহায়তা করে")}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              `;
            })(),
          },'''

# Use regex to find and replace the lesson
pattern = r'          \{\s+id: "ch19-lesson-3".*?\n          \},'
replacement_count = 0

# Find the pattern
match = re.search(pattern, content, re.DOTALL)
if match:
    content = re.sub(pattern, new_lesson, content, count=1, flags=re.DOTALL)
    replacement_count = 1

# Write back
with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(content)

if replacement_count > 0:
    print("✓ Module 19 Lesson 3 successfully redesigned!")
else:
    print("✗ Could not find Lesson 3 pattern to replace")
