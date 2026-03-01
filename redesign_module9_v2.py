#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re

print("Starting Module 9 redesign...")

# Read the file
with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

print(f"File read successfully. Total length: {len(content)} characters")

# Check if Module 9 exists
if 'id: "ch-9"' in content:
    print("✓ Found Module 9 (ch-9)")
else:
    print("✗ Module 9 not found!")
    exit(1)

# LESSON 1 replacement
print("\n--- LESSON 1 REPLACEMENT ---")
print("Searching for Lesson 1 pattern...")

# Find the specific pattern for lesson 1
lesson1_pattern_start = 'id: "ch9-lesson-1"'
lesson1_pattern_end = 'id: "ch9-lesson-2"'

start_idx = content.find(lesson1_pattern_start)
end_idx = content.find(lesson1_pattern_end)

if start_idx > -1 and end_idx > -1:
    print(f"✓ Found Lesson 1 boundaries (chars {start_idx} to {end_idx})")
    print(f"  Lesson 1 section size: {end_idx - start_idx} characters")
    
    # Extract the lesson 1 content
    lesson1_section = content[start_idx:end_idx]
    
    # Find the content function within this section
    content_start = lesson1_section.find('content: (function () {')
    if content_start > -1:
        print(f"✓ Found content function in Lesson 1")
        
        # Check for renderList function
        if 'const renderList = (items, baseDelay = 80)' in lesson1_section:
            print("✓ Found renderList function")
        else:
            print("✗ renderList function not found in lesson 1")
    else:
        print("✗ content function not found in lesson 1")
else:
    print(f"✗ Lesson 1 boundaries not found")
    print(f"  start_idx: {start_idx}, end_idx: {end_idx}")

# LESSON 2 replacement
print("\n--- LESSON 2 REPLACEMENT ---")
lesson2_pattern_start = 'id: "ch9-lesson-2"'
lesson2_pattern_end = 'id: "ch9-lesson-3"'

start_idx2 = content.find(lesson2_pattern_start)
end_idx2 = content.find(lesson2_pattern_end)

if start_idx2 > -1 and end_idx2 > -1:
    print(f"✓ Found Lesson 2 boundaries")
    lesson2_section = content[start_idx2:end_idx2]
    print(f"  Lesson 2 section size: {len(lesson2_section)} characters")
else:
    print(f"✗ Lesson 2 boundaries not found")

# LESSON 3 replacement  
print("\n--- LESSON 3 REPLACEMENT ---")
lesson3_pattern_start = 'id: "ch9-lesson-3"'
lesson3_pattern_end = 'id: "ch-10"'

start_idx3 = content.find(lesson3_pattern_start)
end_idx3 = content.find(lesson3_pattern_end)

if start_idx3 > -1 and end_idx3 > -1:
    print(f"✓ Found Lesson 3 boundaries")
    lesson3_section = content[start_idx3:end_idx3]
    print(f"  Lesson 3 section size: {len(lesson3_section)} characters")
else:
    print(f"✗ Lesson 3 boundaries not found")

print("\n--- ANALYSIS COMPLETE ---")
print("All lessons found and ready for replacement!")
print("\nNow making replacements...")

# Save current lenght
original_length = len(content)

# Read the replacement content from files or inline
lesson1_replacement = '''            content: (function () {
              const introText =
                "যৌন সম্পর্কের মাধ্যমে একজন থেকে অন্যজনের মধ্যে যেসব সংক্রমণ ছড়ায় সেগুলোই 'যৌনবাহিত সংক্রমণ'। অন্যদিকে, প্রজনন অঙ্গসমূহের সংক্রমণকে 'প্রজননতন্ত্রের সংক্রমণ' বলে। যৌন সম্পর্ক (যৌনবাহিত সংক্রমণ) ছাড়াও সংক্রমিত রক্ত/রক্তজাত দ্রব্য গ্রহণ, সংক্রমিত সূঁচ/যন্ত্রপাতি ও আক্রান্ত মায়ের বুকের দুধের মাধ্যমে প্রজননতন্ত্রের সংক্রমণ হতে পারে। সকল যৌনবাহিত সংক্রমণই প্রজননতন্ত্রের সংক্রমণের আওতায় পড়ে।";

              const causes = ["ব্যক্তিগত অপরিচ্ছন্নতা","প্রজননতন্ত্রের জীবাণুগুলোর অতিবৃদ্ধি","অনিরাপদ যৌনমিলন","জীবাণুযুক্ত পরিবেশ","সংক্রমিত রক্ত গ্রহণ","সংক্রমিত মায়ের গর্ভধারণ"];
              const symptoms = ["যৌনাঙ্গে চুলকানি হওয়া","যৌনাঙ্গ থেকে দুর্গন্ধযুক্ত বা দুর্গন্ধবিহীন স্রাব যাওয়া","যৌনাঙ্গ থেকে পুঁজ বা পুঁজের মতো যাওয়া ও বারবার প্রস্রাব হওয়া","যৌনাঙ্গে ক্ষত হওয়া","যৌনমিলনে ব্যথা হওয়া","শরীরে চুলকানি বা ঘামাচির মতো দানা হওয়া","শরীরে লসিকা গ্রন্থি (কুঁচকি বা অন্যান্য স্থানে গুটি হওয়া)"];
              
              const causesIcons = ["fa-hand-sparkles","fa-microbe","fa-exclamation-circle","fa-biohazard","fa-droplet-slash","fa-mother-and-child"];
              const causesGradients = ["linear-gradient(135deg, #DBEAFE 0%, #EFF6FF 100%)","linear-gradient(135deg, #FED7AA 0%, #FFEDD5 100%)","linear-gradient(135deg, #D1FAE5 0%, #ECFDF5 100%)","linear-gradient(135deg, #EDE9FE 0%, #F5F3FF 100%)","linear-gradient(135deg, #FCE7F3 0%, #FDF2F8 100%)","linear-gradient(135deg, #CCFBF1 0%, #F0FDFA 100%)"];
              const causesShadows = ["rgba(59, 130, 246, 0.14)","rgba(234, 88, 12, 0.14)","rgba(16, 185, 129, 0.14)","rgba(124, 58, 237, 0.14)","rgba(236, 72, 153, 0.14)","rgba(20, 184, 166, 0.14)"];
              const causesIconBgs = ["linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)","linear-gradient(135deg, #EA580C 0%, #F97316 100%)","linear-gradient(135deg, #10B981 0%, #34D399 100%)","linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)","linear-gradient(135deg, #EC4899 0%, #F472B6 100%)","linear-gradient(135deg, #14B8A6 0%, #2DD4BF 100%)"];
              
              const symptomsIcons = ["fa-itching","fa-water","fa-syringe-check","fa-bandage","fa-pain","fa-bug","fa-sweat-droplets"];
              const symptomsGradients = ["linear-gradient(135deg, #FED7AA 0%, #FFEDD5 100%)","linear-gradient(135deg, #D1FAE5 0%, #ECFDF5 100%)","linear-gradient(135deg, #EDE9FE 0%, #F5F3FF 100%)","linear-gradient(135deg, #FCE7F3 0%, #FDF2F8 100%)","linear-gradient(135deg, #CCFBF1 0%, #F0FDFA 100%)","linear-gradient(135deg, #FEF3C7 0%, #FFFBEB 100%)","linear-gradient(135deg, #FEE2E2 0%, #FEF2F2 100%)"];
              const symptomsShadows = ["rgba(234, 88, 12, 0.14)","rgba(16, 185, 129, 0.14)","rgba(124, 58, 237, 0.14)","rgba(236, 72, 153, 0.14)","rgba(20, 184, 166, 0.14)","rgba(217, 119, 6, 0.14)","rgba(220, 38, 38, 0.14)"];
              const symptomsIconBgs = ["linear-gradient(135deg, #EA580C 0%, #F97316 100%)","linear-gradient(135deg, #10B981 0%, #34D399 100%)","linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)","linear-gradient(135deg, #EC4899 0%, #F472B6 100%)","linear-gradient(135deg, #14B8A6 0%, #2DD4BF 100%)","linear-gradient(135deg, #D97706 0%, #FBBF24 100%)","linear-gradient(135deg, #DC2626 0%, #EF4444 100%)"];
              
              const closingNote = "অধিকাংশ ক্ষেত্রেই যৌনরোগের লক্ষণ বোঝা যায় না। বিশেষ করে ছেলেদের তুলনায় মেয়েদের এই লক্ষণগুলো অপ্রকাশিত থাকে। তাই চিকিৎসা নিতে তারা অনেক দেরি করে ফেলে, যা থেকে জটিলতাও হতে পারে।";

              return `<div class="lesson-slide"><h2 class="slide-title gradient-text" data-aos="fade-up"><i class="fa-solid fa-virus" style="color:#E11D48; margin-right:0.5rem;"></i>${yhLang("যৌনবাহিত ও প্রজননতন্ত্রের সংক্রমণ","যৌনবাহিত ও প্রজননতন্ত্রের সংক্রমণ")}</h2><div style="position: relative; overflow: hidden;"><div style="position: absolute; top: -40px; right: -40px; width: 200px; height: 200px; border-radius: 50%; background: rgba(220, 38, 38, 0.12); z-index: 0;"></div><div style="position: absolute; bottom: -60px; left: -60px; width: 250px; height: 250px; border-radius: 20px; background: rgba(220, 38, 38, 0.08); transform: rotate(45deg); z-index: 0;"></div><section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40" style="background: linear-gradient(135deg, #FEE2E2 0%, #FEF2F2 100%); box-shadow: 0 18px 34px rgba(220, 38, 38, 0.14); position: relative; z-index: 1;"><p class="mb-0">${introText}</p></section><section class="modern-card glass-card menstrual-info-card mt-4" data-aos="fade-up" data-aos-delay="60" style="background: linear-gradient(135deg, #FFECEB 0%, #FEF7F7 100%); box-shadow: 0 18px 34px rgba(220, 38, 38, 0.14); position: relative; z-index: 1;"><div class="row g-4 align-items-start"><div class="col-lg-6"><h3 class="d-flex align-items-center mb-3" style="font-size: 1.3rem; font-weight: 600; color: #1F2937;"><i class="fa-solid fa-exclamation-triangle" style="color:#DC2626; margin-right:0.5rem;"></i>${yhLang("কারণ","কারণ")}</h3><ul class="list-unstyled mb-0">${causes.map((text,idx)=>`<li data-aos="fade-left" data-aos-delay="${60+idx*15}" style="list-style: none; background: ${causesGradients[idx]}; padding: 1.1rem 1.25rem; border-radius: 14px; box-shadow: 0 6px 16px ${causesShadows[idx]}; border-left: 4px solid #DC2626; display: flex; gap: 1rem; align-items: flex-start; margin-bottom: 0.85rem;"><div style="width:38px; height:38px; border-radius:10px; background: ${causesIconBgs[idx]}; display:flex; align-items:center; justify-content:center; flex-shrink: 0;"><i class="fa-solid ${causesIcons[idx]}" style="color:white; font-size:0.95rem;"></i></div><span style="color:#1F2937; line-height:1.7; font-size:0.95rem;">${text}</span></li>`).join("")}</ul></div><div class="col-lg-6"><h3 class="d-flex align-items-center mb-3" style="font-size: 1.3rem; font-weight: 600; color: #1F2937;"><i class="fa-solid fa-triangle-exclamation" style="color:#F59E0B; margin-right:0.5rem;"></i>${yhLang("লক্ষণ","লক্ষণ")}</h3><ul class="list-unstyled mb-0">${symptoms.map((text,idx)=>`<li data-aos="fade-left" data-aos-delay="${75+idx*15}" style="list-style: none; background: ${symptomsGradients[idx]}; padding: 1.1rem 1.25rem; border-radius: 14px; box-shadow: 0 6px 16px ${symptomsShadows[idx]}; border-left: 4px solid #F59E0B; display: flex; gap: 1rem; align-items: flex-start; margin-bottom: 0.85rem;"><div style="width:38px; height:38px; border-radius:10px; background: ${symptomsIconBgs[idx]}; display:flex; align-items:center; justify-content:center; flex-shrink: 0;"><i class="fa-solid ${symptomsIcons[idx]}" style="color:white; font-size:0.95rem;"></i></div><span style="color:#1F2937; line-height:1.7; font-size:0.95rem;">${text}</span></li>`).join("")}</ul></div></div></section><section class="modern-card glass-card menstrual-info-card mt-4" data-aos="fade-up" data-aos-delay="120" style="background: linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%); box-shadow: 0 18px 34px rgba(220, 38, 38, 0.14); position: relative; z-index: 1;"><p class="mb-0" style="color: #374151; font-style: italic;">${closingNote}</p></section></div></div>`;
            })(),'''

# Try to find and replace the old lesson 1 return statement
old_pattern_start = 'const renderList = (items, baseDelay = 80) =>\n                items\n                  .map('
old_pattern_end = '            })(),'

# Instead let's use a simpler regex approach
print("\nAttempting simple text replacement for lesson 1...")

success_count = 0

# First, create a backup
with open('js/data.js.bak', 'w', encoding='utf-8') as f:
    f.write(content)
print("✓ Backup created")

# Now let's do a simple targeted replacement with regex
# We'll use a different approach - replace from "const renderList" in lesson 1 to the closing })(),

# Find start of lesson 1 content function
l1_start = content.find('id: "ch9-lesson-1"')
l1_end = content.find('id: "ch9-lesson-2"')

if l1_start > 0 and l1_end > 0:
    before_l1 = content[:l1_start]
    lesson1_full = content[l1_start:l1_end]
    after_l1 = content[l1_end:]
    
    # Find where the content function starts and ends in lesson 1
    content_func_start = lesson1_full.find('content: (function () {')
    closing_pos = lesson1_full.rfind('})(),')  # Find the last occurrence
    
    if content_func_start > 0 and closing_pos > 0:
        # Keep everything before content function and everything after it
        before_content = lesson1_full[:content_func_start + len('content: ')]
        after_content = lesson1_full[closing_pos:]
        
        # Replace the content function
        new_lesson1 = before_content + lesson1_replacement
        remaining = after_content
        
        new_content = before_l1 + new_lesson1 + remaining + after_l1
        
        # Save
        with open('js/data.js', 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print("✓ Lesson 1 replacement successful!")
        print(f"  Old content size: {len(lesson1_full)}")
        print(f"  New content size: {len(new_lesson1) + len(remaining)}")
        success_count += 1
    else:
        print("✗ Could not find content function boundaries in lesson 1")
        print(f"  content_func_start: {content_func_start}, closing_pos: {closing_pos}")
else:
    print("✗ Could not find lesson 1 boundaries")

print(f"\n✓ Completed! {success_count} lesson(s) replaced successfully!")
