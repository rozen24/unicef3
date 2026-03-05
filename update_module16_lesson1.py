#!/usr/bin/env python3
"""Update Module 16 Lesson 1 with comprehensive redesign"""

import re

def update_lesson():
    file_path = r'g:\unicef\unicef3\js\data.js'
    
    # Read the file
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the lesson content section
    pattern = r'(ch16-lesson-1.*?content: \(function \(\) \{)(.*?)(\}\)\(\),\s*\},\s*\{)'
    
    # New content to insert
    new_content = r'''\1
              const definition = yhLang(
                "This is a type of service through which people become self-aware and are able to bring about desired changes in their behavior and attitude.",
                "এটি এমন এক ধরণের সেবা যার দ্বারা মানুষ আত্মসচেতন হওয়ার মাধ্যমে নিজের আচরণ ও মনোভাবের কাক্সিক্ষত পরিবর্তন আনতে সক্ষম হয়।"
              );

              const sections = [
                {
                  icon: "fa-user-doctor",
                  color: "m16l1-section-provider",
                  title: yhLang("Psychosocial Support Provider", "মনোসামাজিক সহায়তাকারী"),
                  description: yhLang(
                    "When we face difficulties in making decisions in our lives, adapting to daily anxieties, etc., we may sometimes need to seek psychosocial support. Psychosocial support providers provide services through the application of necessary training, skills, and qualities. Psychosocial support providers are usually trained by psychologists or trained psychosocial counselors.",
                    "আমাদের জীবনে কোনো সিদ্ধান্ত নিতে অসুবিধা হলে, দৈনন্দিন উদ্বেগের সাথে খাপ খাওয়ানো ইত্যাদি ক্ষেত্রে সমস্যা হলে কখনো কখনো মনোসামাজিক সহায়তা গ্রহণের প্রয়োজন হতে পারে। মনোসামাজিক সহায়তাকারীরা প্রয়োজনীয় প্রশিক্ষণ, দক্ষতা ও গুণাবলী প্রয়োগের মাধ্যমে সেবা প্রদান করে থাকেন। মনোসামাজিক সহায়তাকারী সাধারণত মনোবিজ্ঞানীদের কাছ থেকে অথবা প্রশিক্ষণপ্রাপ্ত মনোসামাজিক কাউন্সেলরের কাছ থেকে প্রশিক্ষণপ্রাপ্ত হয়ে থাকেন।"
                  ),
                },
                {
                  icon: "fa-graduation-cap",
                  color: "m16l1-section-education",
                  title: yhLang("Psychosocial Education", "মনোসামাজিক শিক্ষা"),
                  description: yhLang(
                    "Psychosocial education is a type of educational process that helps a person return to normal life and adapt to normal life from the mental state created by sudden disasters, calamities, oppression, and persecution. Psychosocial education helps individuals conduct their daily activities in their daily lives and prepares them to deal with situations.",
                    "মনোসামাজিক শিক্ষা হল এমন এক ধরনের শিক্ষণ প্রক্রিয়া যার মাধ্যমে একজন ব্যক্তির আকস্মিক বিপর্যয়, বিপত্তি, উৎপীড়ন, নিপীড়নের ফলে যে মানসিক অবস্থার সৃষ্টি হয় তা থেকে স্বাভাবিক অবস্থায় ফিরিয়ে আনতে ও স্বাভাবিক জীবনে মানিয়ে নিতে সহায়তা করে। মনোসামাজিক শিক্ষা ব্যক্তিকে তার প্রাত্যহিক জীবনে স্বাভাবিক কর্মকান্ড পরিচালনায় সহায়তা করে এবং পরিস্থিতি মোকাবেলার জন্য প্রস্তুত করে।"
                  ),
                },
                {
                  icon: "fa-school",
                  color: "m16l1-section-necessity",
                  title: yhLang("Need for Psychosocial Education", "মনোসামাজিক শিক্ষার প্রয়োজনীয়তা"),
                  description: yhLang(
                    "Adolescents spend a large part of their day at school. Therefore, school can be a suitable place where psychosocial education can be provided to adolescents.",
                    "কিশোর-কিশোরীরা দিনের একটি বড় সময় বিদ্যালয়ে কাটিয়ে থাকে। তাই বিদ্যালয় হতে পারে একটি উপযুক্ত স্থান যেখানে কিশোর-কিশোরীদের মনোসামাজিক শিক্ষা প্রদান করা সম্ভব।"
                  ),
                },
              ];

              const benefits = [
                { icon: "fa-brain", color: "m16l1-benefit-a", text: yhLang("Builds self-awareness and emotional intelligence", "আত্মসচেতনতা এবং আবেগসংক্রান্ত বুদ্ধিমত্তা তৈরি করে") },
                { icon: "fa-heart-pulse", color: "m16l1-benefit-b", text: yhLang("Helps manage stress and anxiety", "মানসিক চাপ এবং উদ্বেগ পরিচালনা করতে সহায়তা করে") },
                { icon: "fa-people-group", color: "m16l1-benefit-c", text: yhLang("Improves social relationships and communication", "সামাজিক সম্পর্ক এবং যোগাযোগ উন্নত করে") },
                { icon: "fa-shield-heart", color: "m16l1-benefit-d", text: yhLang("Develops coping mechanisms for difficult situations", "কঠিন পরিস্থিতি মোকাবেলার প্রক্রিয়া তৈরি করে") },
                { icon: "fa-hand-holding-heart", color: "m16l1-benefit-e", text: yhLang("Promotes mental health and well-being", "মানসিক স্বাস্থ্য এবং সুস্থতা বৃদ্ধি করে") },
              ];

              const renderSections = (items, delay) =>
                items
                  .map((section, idx) => `
                    <section class="m16l1-section-card ${section.color}" data-aos="fade-up" data-aos-delay="${delay + idx * 60}">
                      <div class="m16l1-section-header">
                        <div class="m16l1-section-icon">
                          <i class="fa-solid ${section.icon}"></i>
                        </div>
                        <h3 class="m16l1-section-title">${section.title}</h3>
                      </div>
                      <p class="m16l1-section-text">${section.description}</p>
                    </section>
                  `)
                  .join("");

              const renderBenefits = (items, delay) =>
                items
                  .map((item, idx) => `
                    <li class="m16l1-benefit-item ${item.color}" data-aos="zoom-in" data-aos-delay="${delay + idx * 45}">
                      <div class="m16l1-benefit-icon">
                        <i class="fa-solid ${item.icon}"></i>
                      </div>
                      <span class="m16l1-benefit-text">${item.text}</span>
                    </li>
                  `)
                  .join("");

              return `
                <div class="lesson-slide mod16-lesson1">
                  <div class="m16l1-shapes" aria-hidden="true">
                    <span class="m16l1-shape m16l1-shape--circle"></span>
                    <span class="m16l1-shape m16l1-shape--square"></span>
                    <span class="m16l1-shape m16l1-shape--hexagon"></span>
                  </div>

                  <header class="m16l1-hero" data-aos="fade-down">
                    <div class="m16l1-hero__badge">
                      <i class="fa-solid fa-hands-holding-heart"></i>
                    </div>
                    <div class="m16l1-hero__content">
                      <h1 class="m16l1-hero__title">${yhLang("Psychosocial Support", "মনোসামাজিক সহায়তা")}</h1>
                      <p class="m16l1-hero__subtitle">${yhLang("Building emotional resilience and mental well-being", "আবেগসংক্রান্ত স্থিতিস্থাপকতা এবং মানসিক সুস্থতা তৈরি করা")}</p>
                    </div>
                  </header>

                  <section class="m16l1-definition-section" data-aos="fade-up" data-aos-delay="100">
                    <div class="m16l1-definition-card">
                      <div class="m16l1-definition-icon">
                        <i class="fa-solid fa-lightbulb"></i>
                      </div>
                      <p class="m16l1-definition-text">${definition}</p>
                    </div>
                  </section>

                  ${renderSections(sections, 150)}

                  <section class="m16l1-benefits-section" data-aos="fade-up" data-aos-delay="350">
                    <div class="m16l1-section-header-main">
                      <div class="m16l1-section-icon-main">
                        <i class="fa-solid fa-star"></i>
                      </div>
                      <h2 class="m16l1-section-title-main">${yhLang("Key Benefits", "প্রধান সুবিধাসমূহ")}</h2>
                    </div>
                    <ul class="m16l1-benefits-list">
                      ${renderBenefits(benefits, 400)}
                    </ul>
                  </section>
                </div>
              `;
            \3'''
    
    # Replace using regex
    updated_content = re.sub(pattern, new_content, content, flags=re.DOTALL)
    
    # Write back
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(updated_content)
    
    print("✅ Module 16 Lesson 1 updated successfully!")

if __name__ == '__main__':
    update_lesson()
