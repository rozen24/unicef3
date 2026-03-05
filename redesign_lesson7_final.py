#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json

# Read the file
with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# New Lesson 7 content to replace 
new_lesson_7_content = '''content: (function () {
              const intro = yhLang(
                "Dog bites can cause severe bleeding and infection including rabies virus. Rabies is nearly 100% fatal once clinical symptoms appear. Immediate first aid and hospital treatment are absolutely critical.",
                "কুকুরের কামড়ের ক্ষত থেকে অতিরিক্ত রক্তপাত বা সংক্রমণজনিত রোগ যেমন জলাতংক বা র‌্যাবিস হতে পারে। জলাতংক রোগে জীবণনাশের সম্ভাবনা শতভাগ।"
              );

              const dogBiteSymptoms = [
                { text: yhLang("Pain at the wound site", "ক্ষত স্থানে ব্যথা"), icon: "fa-hand-fist", color: "m18l7-symptom-pain" },
                { text: yhLang("Redness and inflammation around bite", "ক্ষত স্থান লাল হয়ে যাওয়া"), icon: "fa-fire", color: "m18l7-symptom-red" },
                { text: yhLang("Swelling at and around the bite", "ক্ষত স্থান ফুলে যাওয়া"), icon: "fa-hand", color: "m18l7-symptom-swell" },
                { text: yhLang("Pus or discharge from the wound", "ক্ষত স্থান থেকে পুঁজ বের হওয়া"), icon: "fa-droplet", color: "m18l7-symptom-pus" },
                { text: yhLang("Fever (high body temperature)", "জ্বর হওয়া"), icon: "fa-temperature-high", color: "m18l7-symptom-fever" },
                { text: yhLang("Swollen lymph nodes around bite area", "শরীরের গ্ল্যান্ড বা গ্রন্থি ফুলে যাওয়া"), icon: "fa-bandage", color: "m18l7-symptom-gland" }
              ];

              const dogBiteCareSteps = [
                { text: yhLang("Ensure scene safety first. Prevent further animal contact. Keep away from the dog.", "প্রাথমিক চিকিৎসা প্রদানের পূর্বে ঘটনাস্থলের নিরাপত্তা নিশ্চিত করুন এবং প্রাণীটি যাতে আর কামড় দিতে না পারে তা নিশ্চিত করুন।"), icon: "fa-shield", color: "m18l7-care-safety" },
                { text: yhLang("Remove jewelry, watches, tight bindings from bitten area as swelling may occur.", "কামড়ানো অংশে যদি কোনো আংটি বা বাঁধন থাকে তা খুলে দিন, কারণ সে অংশটি ফুলে যেতে পারে।"), icon: "fa-ring", color: "m18l7-care-remove" },
                { text: yhLang("Wash wound thoroughly with running water and soap for at least 15 minutes to remove bacteria.", "ক্ষতস্থানটি পরিষ্কার পানি ও সাবান ব্যবহার করে কমপক্ষে ১৫ মিনিটের মতো ধুয়ে ফেলুন।"), icon: "fa-water", color: "m18l7-care-wash" },
                { text: yhLang("Cover wound with clean, dry, sterile gauze or cloth. Apply gentle pressure if bleeding continues.", "ক্ষত স্থান শুকনো জীবাণুমুক্ত পরিষ্কার কাপড় বা গজ দিয়ে ঢেকে রাখুন।"), icon: "fa-bandage", color: "m18l7-care-cover" },
                { text: yhLang("Seek immediate hospital care for rabies vaccine and post-exposure prophylaxis (PEP). Time is critical - do not delay.", "পরবর্তী চিকিৎসার জন্য আহত ব্যক্তিকে দ্রুত নিকটস্থ হাসপাতালে নিয়ে যান। সময় অত্যন্ত গুরুত্বপূর্ণ।"), icon: "fa-hospital-user", color: "m18l7-care-hospital" }
              ];

              const renderSymptoms = (symptoms) => `<div class="m18l7-symptoms-list">${symptoms.map((symptom, index) => `<div class="m18l7-symptom-item ${symptom.color}" data-aos="fade-right" data-aos-delay="${50 + index * 35}"><div class="m18l7-symptom-icon"><i class="fa-solid ${symptom.icon}"></i></div><p>${symptom.text}</p></div>`).join("")}</div>`;

              const renderCareSteps = (steps) => `<div class="m18l7-care-list">${steps.map((step, index) => `<div class="m18l7-care-item ${step.color}" data-aos="fade-left" data-aos-delay="${50 + index * 35}"><div class="m18l7-care-icon"><i class="fa-solid ${step.icon}"></i></div><p>${step.text}</p></div>`).join("")}</div>`;

              return `<div class="mod18-lesson7"><div class="m18l7-shape m18l7-shape-1"></div><div class="m18l7-shape m18l7-shape-2"></div><div class="m18l7-shape m18l7-shape-3"></div><header class="m18l7-hero" data-aos="zoom-in" data-aos-duration="600"><div class="m18l7-hero-badge"><i class="fa-solid fa-dog"></i></div><h2 class="m18l7-hero-title">${yhLang("Dog Bite Care", "কুকুরের কামড়")}</h2></header><section class="m18l7-intro-panel" data-aos="fade-up" data-aos-delay="20"><p class="m18l7-intro-text mb-0">${intro}</p></section><div class="m18l7-grid"><section class="m18l7-symptoms-panel" data-aos="fade-right" data-aos-delay="50"><h3 class="m18l7-panel-title"><i class="fa-solid fa-triangle-exclamation"></i>${yhLang("Possible Symptoms", "সম্ভাব্য লক্ষণ")}</h3>${renderSymptoms(dogBiteSymptoms)}</section><section class="m18l7-care-panel" data-aos="fade-left" data-aos-delay="50"><h3 class="m18l7-panel-title"><i class="fa-solid fa-kit-medical"></i>${yhLang("First Aid Steps", "প্রথম চিকিৎসার ধাপ")}</h3>${renderCareSteps(dogBiteCareSteps)}</section></div></div>`;
            })(),'''

# Find where Lesson 7 content starts
start_marker = 'id: "ch18-lesson-7",'
start_idx = content.find(start_marker)
if start_idx == -1:
    print("ERROR: Could not find Lesson 7 start marker")
    exit(1)

# Find "content: (function () {" after the Lesson 7 marker
content_start = content.find('content: (function () {', start_idx)
if content_start == -1:
    print("ERROR: Could not find content function start")
    exit(1)

# Find the matching closing "})()," after content_start
# We need to find the next occurrence of })(), that's specifically for this lesson
depth = 0
i = content_start + len('content: (function () {')
in_string = False
escape_next = False
paren_depth = 1  # We start at 1 because we've already seen the opening "("

while i < len(content) and paren_depth > 0:
    char = content[i]
    
    if escape_next:
        escape_next = False
        i += 1
        continue
        
    if char == '\\' and in_string:
        escape_next = True
        i += 1
        continue
        
    if char == '"' or char == "'":
        in_string = not in_string
        i += 1
        continue
        
    if not in_string:
        if char == '(':
            paren_depth += 1
        elif char == ')':
            paren_depth -= 1
            
    i += 1

# Now find the })(), pattern after the content function closes
closing_marker = '})(),'
closing_start = content.rfind(closing_marker, content_start, i + 50)
if closing_start == -1:
    print("ERROR: Could not find closing })(),")
    exit(1)

content_end = closing_start + len(closing_marker)

# Extract old content for verification
old_content = content[content_start:content_end]

print(f"Found Lesson 7 content at positions {content_start}-{content_end}")
print(f"Old content length: {len(old_content)} chars")
print(f"New content length: {len(new_lesson_7_content)} chars")

# Perform the replacement
updated_content = content[:content_start] + new_lesson_7_content + content[content_end:]

# Write back
with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(updated_content)

print("✅ Lesson 7 (Dog Bite Care) successfully redesigned!")
print("JavaScript: Object-driven structure with 6 symptom items + 5 care step items")
print("Icons: Contextual icons for each symptom and care step")
print("Colors: 11 unique color variants (6 symptoms + 5 care steps)")
print("Layout: Responsive grid layout with modern gradient background")
