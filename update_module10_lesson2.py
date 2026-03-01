#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Update Module 10 Lesson 2 with modern design"""

import re

# Read the file
with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the renderList function in Module 10 Lesson 2 and replace it
old_render = '''const renderList = (items, baseDelay = 60) =>
                items
                  .map(
                    (text, idx) => `
                      <li data-aos="fade-left" data-aos-delay="${baseDelay + idx * 20}">
                        <i class="fa-solid fa-circle-check"></i>
                        <span>${text}</span>
                      </li>
                    `
                  )
                  .join("");'''

new_render = '''const preventionIcons = [
                "fa-book-quran",
                "fa-ban",
                "fa-heart-circle-check",
                "fa-shield-halved",
                "fa-droplet",
                "fa-syringe",
                "fa-stethoscope"
              ];

              const gradients = [
                { bg: "linear-gradient(135deg, #DBEAFE 0%, #EFF6FF 100%)", shadow: "rgba(59, 130, 246, 0.14)", border: "#3B82F6", iconBg: "linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)" },
                { bg: "linear-gradient(135deg, #FED7AA 0%, #FFEDD5 100%)", shadow: "rgba(234, 88, 12, 0.14)", border: "#EA580C", iconBg: "linear-gradient(135deg, #EA580C 0%, #F97316 100%)" },
                { bg: "linear-gradient(135deg, #D1FAE5 0%, #ECFDF5 100%)", shadow: "rgba(16, 185, 129, 0.14)", border: "#10B981", iconBg: "linear-gradient(135deg, #10B981 0%, #34D399 100%)" },
                { bg: "linear-gradient(135deg, #EDE9FE 0%, #F5F3FF 100%)", shadow: "rgba(124, 58, 237, 0.14)", border: "#7C3AED", iconBg: "linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)" },
                { bg: "linear-gradient(135deg, #FCE7F3 0%, #FDF2F8 100%)", shadow: "rgba(236, 72, 153, 0.14)", border: "#EC4899", iconBg: "linear-gradient(135deg, #EC4899 0%, #F472B6 100%)" },
                { bg: "linear-gradient(135deg, #CCFBF1 0%, #F0FDFA 100%)", shadow: "rgba(20, 184, 166, 0.14)", border: "#14B8A6", iconBg: "linear-gradient(135deg, #14B8A6 0%, #2DD4BF 100%)" },
                { bg: "linear-gradient(135deg, #FEF3C7 0%, #FFFBEB 100%)", shadow: "rgba(217, 119, 6, 0.14)", border: "#D97706", iconBg: "linear-gradient(135deg, #D97706 0%, #FBBF24 100%)" }
              ];

              const renderPreventionList = () =>
                preventionPoints
                  .map(
                    (text, idx) => {
                      const gradient = gradients[idx % gradients.length];
                      const icon = preventionIcons[idx];
                      return `
                      <li data-aos="fade-left" data-aos-delay="${60 + idx * 20}" style="list-style: none; background: ${gradient.bg}; padding: 1.1rem 1.25rem; border-radius: 14px; box-shadow: 0 6px 16px ${gradient.shadow}; border-left: 4px solid ${gradient.border}; display: flex; gap: 1rem; align-items: flex-start; margin-bottom: 0.85rem;">
                        <div style="width: 38px; height: 38px; border-radius: 10px; background: ${gradient.iconBg}; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 4px 12px ${gradient.shadow};">
                          <i class="fa-solid ${icon}" style="color: white; font-size: 0.95rem;"></i>
                        </div>
                        <span style="color: #1F2937; line-height: 1.7; font-size: 0.95rem;">${text}</span>
                      </li>
                    `;
                    }
                  )
                  .join("");'''

# Replace the renderList function
if old_render in content:
    content = content.replace(old_render, new_render, 1)
    print("✓ Replaced renderList function")
else:
    print("✗ Could not find renderList function")

# Now replace the return statement HTML
old_html = '''return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "অন্তর্বর্তীকালীন সময় (উইন্ডো পিরিয়ড)",
                    "অন্তর্বর্তীকালীন সময় (উইন্ডো পিরিয়ড)"
                  )}</h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40">
                    <p class="mb-3">${windowDefinition}</p>
                    <p class="mb-0">${silentSpread}</p>
                  </section>

                  <section class="modern-card glass-card menstrual-info-card mt-3" data-aos="fade-up" data-aos-delay="80">
                    <h3 class="gradient-text mb-3">${yhLang(
                      "কিশোর-কিশোরীদের মধ্যে কীভাবে এইচআইভি প্রতিরোধ করা যায়",
                      "কিশোর-কিশোরীদের মধ্যে কীভাবে এইচআইভি প্রতিরোধ করা যায়"
                    )}</h3>
                    <ul class="list-unstyled puberty-list mb-0">
                      ${renderList(preventionPoints)}
                    </ul>
                  </section>

                  <section class="modern-card glass-card menstrual-info-card mt-3" data-aos="fade-up" data-aos-delay="120">
                    <h3 class="gradient-text mb-3">${yhLang("চিকিৎসা", "চিকিৎসা")}</h3>
                    <p class="mb-0">${treatmentInfo}</p>
                  </section>
                </div>
              `;'''

new_html = '''return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up">
                    <i class="fa-solid fa-hourglass-half" style="color:#7C3AED; margin-right:0.5rem;"></i>
                    ${yhLang(
                    "অন্তর্বর্তীকালীন সময় (উইন্ডো পিরিয়ড)",
                    "অন্তর্বর্তীকালীন সময় (উইন্ডো পিরিয়ড)"
                  )}
                  </h2>

                  <section class="modern-card glass-card menstrual-info-card" data-aos="fade-up" data-aos-delay="40" style="background: linear-gradient(135deg, #EDE9FE 0%, #F5F3FF 100%); box-shadow: -10px 16px 30px rgba(124, 58, 237, 0.14); position: relative; overflow: hidden;">
                    <div style="position: absolute; top: -70px; right: -70px; width: 200px; height: 200px; background: rgba(124, 58, 237, 0.12); border-radius: 50%; z-index: 0;"></div>
                    <div style="position: relative; z-index: 1;">
                      <p class="mb-3">${windowDefinition}</p>
                      <p class="mb-0">${silentSpread}</p>
                    </div>
                  </section>

                  <section class="modern-card glass-card menstrual-info-card mt-3" data-aos="fade-up" data-aos-delay="80" style="background: linear-gradient(135deg, #D1FAE5 0%, #ECFDF5 100%); box-shadow: -10px 16px 30px rgba(16, 185, 129, 0.14); position: relative; overflow: hidden;">
                    <div style="position: absolute; bottom: -90px; left: -90px; width: 250px; height: 250px; background: rgba(16, 185, 129, 0.12); border-radius: 50%; z-index: 0;"></div>
                    <div style="position: absolute; top: -50px; right: -50px; width: 180px; height: 180px; background: rgba(16, 185, 129, 0.1); transform: rotate(45deg); z-index: 0;"></div>
                    <div style="position: relative; z-index: 1;">
                      <h3 class="gradient-text mb-3">
                        <i class="fa-solid fa-shield-heart" style="color:#10B981; margin-right:0.5rem;"></i>
                        ${yhLang(
                      "কিশোর-কিশোরীদের মধ্যে কীভাবে এইচআইভি প্রতিরোধ করা যায়",
                      "কিশোর-কিশোরীদের মধ্যে কীভাবে এইচআইভি প্রতিরোধ করা যায়"
                    )}
                      </h3>
                      <ul class="list-unstyled mb-0" style="padding: 0;">
                        ${renderPreventionList()}
                      </ul>
                    </div>
                  </section>

                  <section class="modern-card glass-card menstrual-info-card mt-3" data-aos="fade-up" data-aos-delay="120" style="background: linear-gradient(135deg, #FED7AA 0%, #FFEDD5 100%); box-shadow: -10px 16px 30px rgba(234, 88, 12, 0.14); position: relative; overflow: hidden;">
                    <div style="position: absolute; top: -60px; left: -60px; width: 190px; height: 190px; background: rgba(234, 88, 12, 0.12); transform: rotate(45deg); z-index: 0;"></div>
                    <div style="position: relative; z-index: 1;">
                      <h3 class="gradient-text mb-3">
                        <i class="fa-solid fa-notes-medical" style="color:#EA580C; margin-right:0.5rem;"></i>
                        ${yhLang("চিকিৎসা", "চিকিৎসা")}
                      </h3>
                      <p class="mb-0">${treatmentInfo}</p>
                    </div>
                  </section>
                </div>
              `;'''

# Replace the HTML section
if old_html in content:
    content = content.replace(old_html, new_html, 1)
    print("✓ Replaced HTML template")
else:
    print("✗ Could not find HTML template")

# Write the file back
with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("\n✓ Module 10 Lesson 2 update complete!")
