#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re

# Read the file
with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Find Lesson 7 section
lesson7_start = content.find('id: "ch18-lesson-7",')
lesson8_start = content.find('id: "ch18-lesson-8",')

# Find the exact content function boundaries for Lesson 7
content_func_start = content.find('content: (function () {', lesson7_start)
content_func_end = content.find('})(),\n          {', lesson7_start) + len('})(),')

# Extract the section to replace
old_section = content[content_func_start:content_func_end]

# Define the new content
new_content = '''content: (function () {
              const intro = yhLang(
                "Dog bites can cause severe bleeding and infection including rabies. Rabies is 100% fatal once symptoms appear. Immediate first aid and proper wound care are critical.",
                "কুকুরের কামড়ের ক্ষত থেকে অতিরিক্ত রক্তপাত বা সংক্রমণজনিত রোগ যেমন জলাতংক বা র‌্যাবিস হতে পারে। জলাতংক রোগে জীবণনাশের সম্ভাবনা শতভাগ।"
              );

              const dogBiteSymptoms = [
                {
                  text: yhLang("Pain at the wound site", "ক্ষত স্থানে ব্যথা"),
                  icon: "fa-hand-fist",
                  color: "m18l7-symptom-pain"
                },
                {
                  text: yhLang("Redness and inflammation", "ক্ষত স্থান লাল হয়ে যাওয়া"),
                  icon: "fa-fire",
                  color: "m18l7-symptom-red"
                },
                {
                  text: yhLang("Swelling at the bite location", "ক্ষত স্থান ফুলে যাওয়া"),
                  icon: "fa-hand",
                  color: "m18l7-symptom-swell"
                },
                {
                  text: yhLang("Pus discharge from wound", "ক্ষত স্থান থেকে পুঁজ বের হওয়া"),
                  icon: "fa-droplet",
                  color: "m18l7-symptom-pus"
                },
                {
                  text: yhLang("High fever", "জ্বর হওয়া"),
                  icon: "fa-temperature-high",
                  color: "m18l7-symptom-fever"
                },
                {
                  text: yhLang("Swollen lymph nodes or glands", "শরীরের গ্ল্যান্ড বা গ্রন্থি ফুলে যাওয়া"),
                  icon: "fa-bandage",
                  color: "m18l7-symptom-gland"
                }
              ];

              const dogBiteCareSteps = [
                {
                  text: yhLang("Ensure scene safety. Prevent the animal from biting again. Do not attempt to restrain it.", "প্রাথমিক চিকিৎসা প্রদানের পূর্বে ঘটনাস্থলের নিরাপত্তা নিশ্চিত করুন এবং প্রাণীটি যাতে আর কামড় দিতে না পারে তা নিশ্চিত করুন।"),
                  icon: "fa-shield",
                  color: "m18l7-care-safety"
                },
                {
                  text: yhLang("Remove rings, watches, bracelets as swelling may impair circulation.", "কামড়ানো অংশে যদি কোনো আংটি বা বাঁধন থাকে তা খুলে দিন, কারণ সে অংশটি ফুলে যেতে পারে।"),
                  icon: "fa-ring",
                  color: "m18l7-care-remove"
                },
                {
                  text: yhLang("Wash wound with running water and soap for 15 minutes to remove bacteria.", "ক্ষতস্থানটি পরিষ্কার পানি ও সাবান ব্যবহার করে কমপক্ষে ১৫ মিনিটের মতো ধুয়ে ফেলুন।"),
                  icon: "fa-water",
                  color: "m18l7-care-wash"
                },
                {
                  text: yhLang("Cover wound with clean, sterile gauze or cloth. Apply pressure if heavy bleeding.", "ক্ষত স্থান শুকনো জীবাণুমুক্ত পরিষ্কার কাপড় বা গজ দিয়ে ঢেকে রাখুন।"),
                  icon: "fa-bandage",
                  color: "m18l7-care-cover"
                },
                {
                  text: yhLang("Seek immediate hospital care for rabies vaccine and proper treatment. Time is critical.", "পরবর্তী চিকিৎসার জন্য আহত ব্যক্তিকে দ্রুত নিকটস্থ হাসপাতালে নিয়ে যান।"),
                  icon: "fa-hospital-user",
                  color: "m18l7-care-hospital"
                }
              ];

              const renderSymptoms = (symptoms) =>
                `<div class="m18l7-symptoms-list">
                  ${symptoms
                    .map(
                      (symptom, index) => `
                    <div class="m18l7-symptom-item ${symptom.color}" data-aos="fade-right" data-aos-delay="${50 + index * 35}">
                      <div class="m18l7-symptom-icon">
                        <i class="fa-solid ${symptom.icon}"></i>
                      </div>
                      <p>${symptom.text}</p>
                    </div>
                  `
                    )
                    .join("")}
                </div>`;

              const renderCareSteps = (steps) =>
                `<div class="m18l7-care-list">
                  ${steps
                    .map(
                      (step, index) => `
                    <div class="m18l7-care-item ${step.color}" data-aos="fade-left" data-aos-delay="${50 + index * 35}">
                      <div class="m18l7-care-icon">
                        <i class="fa-solid ${step.icon}"></i>
                      </div>
                      <p>${step.text}</p>
                    </div>
                  `
                    )
                    .join("")}
                </div>`;

              return `
                <div class="mod18-lesson7">
                  <div class="m18l7-shape m18l7-shape-1"></div>
                  <div class="m18l7-shape m18l7-shape-2"></div>
                  <div class="m18l7-shape m18l7-shape-3"></div>

                  <header class="m18l7-hero" data-aos="zoom-in" data-aos-duration="600">
                    <div class="m18l7-hero-badge"><i class="fa-solid fa-dog"></i></div>
                    <h2 class="m18l7-hero-title">
                      ${yhLang("Dog Bite Care", "কুকুরের কামড়")}
                    </h2>
                  </header>

                  <section class="m18l7-intro-panel" data-aos="fade-up" data-aos-delay="20">
                    <p class="m18l7-intro-text mb-0">${intro}</p>
                  </section>

                  <div class="m18l7-grid">
                    <section class="m18l7-symptoms-panel" data-aos="fade-right" data-aos-delay="50">
                      <h3 class="m18l7-panel-title">
                        <i class="fa-solid fa-triangle-exclamation"></i>
                        ${yhLang("Possible Symptoms", "সম্ভাব্য লক্ষণ")}
                      </h3>
                      ${renderSymptoms(dogBiteSymptoms)}
                    </section>

                    <section class="m18l7-care-panel" data-aos="fade-left" data-aos-delay="50">
                      <h3 class="m18l7-panel-title">
                        <i class="fa-solid fa-kit-medical"></i>
                        ${yhLang("First Aid Steps", "প্রথম চিকিৎসার ধাপ")}
                      </h3>
                      ${renderCareSteps(dogBiteCareSteps)}
                    </section>
                  </div>
                </div>
              `;
            })(),'''

# Replace the section
updated_content = content[:content_func_start] + new_content + content[content_func_end:]

# Write back to file
with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(updated_content)

print("✅ Lesson 7 JavaScript redesign completed successfully!")
print(f"Replaced {len(old_section)} chars with {len(new_content)} chars")
