#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import sys

output_log = []

def log(msg):
    output_log.append(msg)
    sys.stdout.write(msg + "\n")
    sys.stdout.flush()

try:
    log("Starting comprehensive Module 9 redesign (ALL LESSONS)...")

    # Read the file
    with open('js/data.js', 'r', encoding='utf-8') as f:
        content = f.read()

    log(f"File read successfully. Total length: {len(content)} characters\n")

    # ===== LESSON 2 REPLACEMENT =====
    log("--- LESSON 2 REPLACEMENT ---")
    l2_start = content.find('id: "ch9-lesson-2"')
    l2_end = content.find('id: "ch9-lesson-3"')

    if l2_start > 0 and l2_end > 0:
        before_l2 = content[:l2_start]
        lesson2_full = content[l2_start:l2_end]
        after_l2 = content[l2_end:]
        
        # Find and replace the content function for lesson 2
        content_func_start = lesson2_full.find('content: (function () {')
        closing_pos = lesson2_full.rfind('})(),')
        
        if content_func_start > 0 and closing_pos > 0:
            before_content = lesson2_full[:content_func_start + len('content: ')]
            
            lesson2_replacement = '''(function () {
              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up"><i class="fa-solid fa-triangle-exclamation" style="color:#9333EA; margin-right:0.5rem;"></i>${yhLang(
                    "যৌনবাহিত রোগের ঝুঁকিসমূহ",
                    "যৌনবাহিত রোগের ঝুঁকিসমূহ"
                  )}</h2>

                  <div style="position: relative; overflow: hidden;">
                    <div style="position: absolute; top: -40px; right: -40px; width: 200px; height: 200px; border-radius: 50%; background: rgba(168, 85, 247, 0.12); z-index: 0;"></div>
                    <div style="position: absolute; bottom: -60px; left: -60px; width: 250px; height: 250px; border-radius: 20px; background: rgba(168, 85, 247, 0.08); transform: rotate(45deg); z-index: 0;"></div>
                    
                    <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40" style="background: linear-gradient(135deg, #E9D5FF 0%, #F5F3FF 100%); box-shadow: -10px 16px 30px rgba(168, 85, 247, 0.14); position: relative; z-index: 1;">
                      <figure class="image-card mb-0">
                        <img src="img/modu9/jouno.png" alt="যৌনবাহিত রোগের ঝুঁকিসমূহ" class="img-fluid img-zoom rounded-4 shadow-sm animate-float-slow" />
                      </figure>
                    </section>
                  </div>
                </div>
              `;
            })(),'''
            
            after_content = lesson2_full[closing_pos:]
            new_lesson2 = before_content + lesson2_replacement
            remaining = after_content
            
            new_content = before_l2 + new_lesson2 + remaining + after_l2
            content = new_content
            
            log("✓ Lesson 2 replacement successful!")
        else:
            log("✗ Could not find content function boundaries in lesson 2")
    else:
        log("✗ Could not find lesson 2 boundaries")

    # ===== LESSON 3 REPLACEMENT =====
    log("\n--- LESSON 3 REPLACEMENT ---")
    l3_start = content.find('id: "ch9-lesson-3"')
    l3_end = content.find('id: "ch-10"')

    if l3_start > 0 and l3_end > 0:
        before_l3 = content[:l3_start]
        lesson3_full = content[l3_start:l3_end]
        after_l3 = content[l3_end:]
        
        # Find and replace the content function for lesson 3
        content_func_start = lesson3_full.find('content: (function () {')
        closing_pos = lesson3_full.rfind('})(),')
        
        if content_func_start > 0 and closing_pos > 0:
            before_content = lesson3_full[:content_func_start + len('content: ')]
            
            lesson3_replacement = '''(function () {
              const complications = [
                "এইচআইভি সংক্রমণের সম্ভাবনা বেড়ে যায়",
                "হিউম্যান প্যাপিলোমা ভাইরাসে (এইচপিভি) আক্রান্ত নারীদের জরায়ুর মুখে ক্যান্সার হবার সম্ভাবনা থাকে",
                "সংক্রমিত নারী বা পুরুষের পরবর্তীতে স্থায়ী বন্ধ্যাত্ব হতে পারে",
                "মস্তিষ্ক, যকৃত বা হৃৎপিণ্ডে জটিলতা দেখা দিতে পারে",
                "সংক্রমিত পুরুষের মূত্রনালী সরু হয়ে যেতে পারে",
                "আক্রান্ত মায়ের গর্ভপাত হতে পারে বা মৃত সন্তান প্রসব করতে পারে",
                "আক্রান্ত মায়ের জরায়ুর পরিবর্তে ডিম্বনালীতে ভ্রূণ বড় হতে পারে",
                "আক্রান্ত মায়ের শিশু জন্মগত ত্রুটি নিয়ে বা চোখে ইনফেকশন নিয়ে জন্ম নিতে পারে, যা থেকে পরবর্তীতে অন্ধত্বও হতে পারে",
              ];

              const complicationIcons = ["fa-virus","fa-dna","fa-ban","fa-brain","fa-heart","fa-uterus","fa-test-tube","fa-eye-slash"];
              const complicationGradients = ["linear-gradient(135deg, #DBEAFE 0%, #EFF6FF 100%)","linear-gradient(135deg, #FED7AA 0%, #FFEDD5 100%)","linear-gradient(135deg, #D1FAE5 0%, #ECFDF5 100%)","linear-gradient(135deg, #EDE9FE 0%, #F5F3FF 100%)","linear-gradient(135deg, #FCE7F3 0%, #FDF2F8 100%)","linear-gradient(135deg, #CCFBF1 0%, #F0FDFA 100%)","linear-gradient(135deg, #FEF3C7 0%, #FFFBEB 100%)","linear-gradient(135deg, #FEE2E2 0%, #FEF2F2 100%)"];
              const complicationShadows = ["rgba(59, 130, 246, 0.14)","rgba(234, 88, 12, 0.14)","rgba(16, 185, 129, 0.14)","rgba(124, 58, 237, 0.14)","rgba(236, 72, 153, 0.14)","rgba(20, 184, 166, 0.14)","rgba(217, 119, 6, 0.14)","rgba(220, 38, 38, 0.14)"];
              const complicationIconBgs = ["linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)","linear-gradient(135deg, #EA580C 0%, #F97316 100%)","linear-gradient(135deg, #10B981 0%, #34D399 100%)","linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)","linear-gradient(135deg, #EC4899 0%, #F472B6 100%)","linear-gradient(135deg, #14B8A6 0%, #2DD4BF 100%)","linear-gradient(135deg, #D97706 0%, #FBBF24 100%)","linear-gradient(135deg, #DC2626 0%, #EF4444 100%)"];

              const management = [
                "বর্তমানে যৌনবাহিত সংক্রমণে আক্রান্ত কিশোর-কিশোরীরা প্রাপ্তবয়স্কদের মতো একই ব্যবস্থা পাচ্ছে।",
                "আদর্শ হলো ঝুঁকি নির্ণয় কৌশল অবলম্বন করে বাছাইকরণ (ট্রায়াজ) পরীক্ষার মাধ্যমে প্রাসঙ্গিক ও পর্যাপ্ত চিকিৎসা প্রদান করা।",
                "যৌন সংক্রমণের সিনড্রোমিক ব্যবস্থাপনার জন্য বাংলাদেশ সরকারের জাতীয় এইচআইভি এইডস কর্মসূচির (এএসপি) গাইডলাইন ব্যবহার করা যেতে পারে।",
              ];

              const managementIcons = ["fa-person-dots","fa-stethoscope","fa-book"];
              const managementGradients = ["linear-gradient(135deg, #DBEAFE 0%, #EFF6FF 100%)","linear-gradient(135deg, #FED7AA 0%, #FFEDD5 100%)","linear-gradient(135deg, #D1FAE5 0%, #ECFDF5 100%)"];
              const managementShadows = ["rgba(59, 130, 246, 0.14)","rgba(234, 88, 12, 0.14)","rgba(16, 185, 129, 0.14)"];
              const managementIconBgs = ["linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)","linear-gradient(135deg, #EA580C 0%, #F97316 100%)","linear-gradient(135deg, #10B981 0%, #34D399 100%)"];

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up"><i class="fa-solid fa-clipboard-list" style="color:#EA580C; margin-right:0.5rem;"></i>${yhLang(
                    "প্রজননতন্ত্রের বা যৌনরোগের জটিলতাসমূহ",
                    "প্রজননতন্ত্রের বা যৌনরোগের জটিলতাসমূহ"
                  )}</h2>

                  <div style="position: relative; overflow: hidden;">
                    <div style="position: absolute; top: -40px; right: -40px; width: 200px; height: 200px; border-radius: 50%; background: rgba(234, 88, 12, 0.12); z-index: 0;"></div>
                    <div style="position: absolute; bottom: -60px; left: -60px; width: 250px; height: 250px; border-radius: 20px; background: rgba(234, 88, 12, 0.08); transform: rotate(45deg); z-index: 0;"></div>

                    <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40" style="background: linear-gradient(135deg, #FED7AA 0%, #FFEDD5 100%); box-shadow: 10px 16px 32px rgba(234, 88, 12, 0.14); position: relative; z-index: 1;">
                      <h3 class="d-flex align-items-center mb-3" style="font-size: 1.4rem; font-weight: 600; color: #1F2937;">
                        <i class="fa-solid fa-exclamation-triangle" style="color:#EA580C; margin-right:0.5rem;"></i>
                        ${yhLang(
                          "জটিলতাসমূহ",
                          "জটিলতাসমূহ"
                        )}
                      </h3>
                      <ul class="list-unstyled mb-0">
                        ${complications.map((text,idx)=>`<li data-aos="fade-left" data-aos-delay="${40+idx*20}" style="list-style: none; background: ${complicationGradients[idx]}; padding: 1.1rem 1.25rem; border-radius: 14px; box-shadow: 0 6px 16px ${complicationShadows[idx]}; border-left: 4px solid #EA580C; display: flex; gap: 1rem; align-items: flex-start; margin-bottom: 0.85rem;"><div style="width:38px; height:38px; border-radius:10px; background: ${complicationIconBgs[idx]}; display:flex; align-items:center; justify-content:center; flex-shrink: 0;"><i class="fa-solid ${complicationIcons[idx]}" style="color:white; font-size:0.95rem;"></i></div><span style="color:#1F2937; line-height:1.7; font-size:0.95rem;">${text}</span></li>`).join("")}
                      </ul>
                    </section>

                    <section class="modern-card glass-card menstrual-info-card mt-4" data-aos="fade-up" data-aos-delay="80" style="background: linear-gradient(135deg, #FFEDD5 0%, #FEF3C7 100%); box-shadow: 10px 16px 32px rgba(234, 88, 12, 0.14); position: relative; z-index: 1;">
                      <h3 class="d-flex align-items-center mb-3" style="font-size: 1.4rem; font-weight: 600; color: #1F2937;">
                        <i class="fa-solid fa-wrench" style="color:#0EA5E9; margin-right:0.5rem;"></i>
                        ${yhLang(
                          "ব্যবস্থাপনা",
                          "ব্যবস্থাপনা"
                        )}
                      </h3>
                      <ul class="list-unstyled mb-0">
                        ${management.map((text,idx)=>`<li data-aos="fade-left" data-aos-delay="${80+idx*20}" style="list-style: none; background: ${managementGradients[idx]}; padding: 1.1rem 1.25rem; border-radius: 14px; box-shadow: 0 6px 16px ${managementShadows[idx]}; border-left: 4px solid #0EA5E9; display: flex; gap: 1rem; align-items: flex-start; margin-bottom: 0.85rem;"><div style="width:38px; height:38px; border-radius:10px; background: ${managementIconBgs[idx]}; display:flex; align-items:center; justify-content:center; flex-shrink: 0;"><i class="fa-solid ${managementIcons[idx]}" style="color:white; font-size:0.95rem;"></i></div><span style="color:#1F2937; line-height:1.7; font-size:0.95rem;">${text}</span></li>`).join("")}
                      </ul>
                    </section>
                  </div>
                </div>
              `;
            })(),'''
            
            after_content = lesson3_full[closing_pos:]
            new_lesson3 = before_content + lesson3_replacement
            remaining = after_content
            
            new_content = before_l3 + new_lesson3 + remaining + after_l3
            content = new_content
            
            log("✓ Lesson 3 replacement successful!")
        else:
            log("✗ Could not find content function boundaries in lesson 3")
    else:
        log("✗ Could not find lesson 3 boundaries")

    # Save the updated content
    with open('js/data.js', 'w', encoding='utf-8') as f:
        f.write(content)

    log("\n✓ All replacements completed successfully!")
    log("✓ File saved!")

except Exception as e:
    log(f"ERROR: {str(e)}")
    import traceback
    log(traceback.format_exc())

# Write log to file as well
with open('redesign_log.txt', 'w', encoding='utf-8') as f:
    f.write("\n".join(output_log))
