#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import re

# Read the file
with open('./js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Define the new lesson 2 content function
new_lesson2_content = '''content: (function () {
              const primaryList = [
                { icon: "fa-wheelchair", color: "#9c27b0", text: "শারীরিকভাবে বা মানসিকভাবে প্রতিবন্ধী" },
                { icon: "fa-heart-crack", color: "#e91e63", text: "যে কিশোর-কিশোরীর পিতা-মাতা, একজন বা উভয়েই মারা গেছেন" },
                { icon: "fa-people-arrows", color: "#ff5722", text: "তালাকপ্রাপ্ত বাবা/মা বা সৎ বাবা/মায়ের সাথে বসবাসকারী" },
                { icon: "fa-person-circle-question", color: "#f44336", text: "বিবাহবহির্ভূত সম্পর্কে জন্ম নেয়া কিশোর-কিশোরী অথবা যে কিশোর-কিশোরীর কোনো আইনগত বা বৈধ অভিভাবক নেই" },
                { icon: "fa-house-crack", color: "#ff9800", text: "বস্তিতে বসবাস করে এমন কিশোর-কিশোরী অথবা যে যার কোনো নির্দিষ্ট বাসস্থান বা আবাস নেই বা যার বেঁচে থাকার কোনো সুস্পষ্ট উপায় নেই (পথশিশু বা রাস্তায় কাজ করে এমন কিশোর-কিশোরী) অথবা অতি দরিদ্র কিশোর-কিশোরী" },
                { icon: "fa-handcuffs", color: "#795548", text: "যে কিশোর-কিশোরী কারাবন্দী পিতা-মাতার উপর নির্ভরশীল বা কারাবন্দী মায়ের সাথে কারাগারে বসবাস করছে" },
                { icon: "fa-person-dress", color: "#880e4f", text: "পতিতালয়ে জন্ম নেয়া ও বড় হওয়া কিশোর-কিশোরী অথবা এসব কাজে সম্পৃক্ত কিশোর-কিশোরী" },
                { icon: "fa-caravan", color: "#6d4c41", text: "যে কিশোর-কিশোরী যাযাবর বা হরিজন (অচ্ছুত)" },
                { icon: "fa-industry", color: "#607d8b", text: "ঝুঁকিপূর্ণ কাজ, যেমন—বাস/টেম্পুর হেল্পার, লেদ মেশিন/ওয়েলডিং/ইলেকট্রিক/বয়লার/ট্যানারির কাজ, বিড়ি বানানোর কাজ অথবা ভিক্ষাবৃত্তি বা শিশুর কল্যাণের বিরোধী কোনো কাজে জড়িত" },
                { icon: "fa-hand-fist", color: "#d32f2f", text: "যে কিশোর-কিশোরী যৌন নিপীড়ন বা হয়রানির শিকার অথবা প্রত্যক্ষদর্শী কিশোর-কিশোরী" },
                { icon: "fa-rainbow", color: "#ab47bc", text: "তৃতীয় লিঙ্গ/হিজড়া বা সমকামী কিশোর-কিশোরী" },
                { icon: "fa-pills", color: "#e53935", text: "যে শিশুর মাদক বা অন্য কোনো কারণে অস্বাভাবিক আচরণগত ব্যাধি হয়েছে" },
                { icon: "fa-virus", color: "#c62828", text: "যে শিশু এইচআইভি–এইডসে আক্রান্ত বা ক্ষতিগ্রস্ত" },
                { icon: "fa-user-xmark", color: "#6a1b9a", text: "যে কিশোর-কিশোরী অসৎ সঙ্গীতে জড়িত, বা যার নৈতিক অবক্ষয় ঘটতে পারে বা যে অপরাধজগতে প্রবেশের ঝুঁকিতে আছে" },
                { icon: "fa-gavel", color: "#455a64", text: "যে শিশুকে শিশু আদালত বা বোর্ড বিশেষ সুরক্ষা, যত্ন ও উন্নয়নের প্রয়োজন রয়েছে বলে বিবেচনা করে" },
              ];

              const secondaryList = [
                { icon: "fa-house-tsunami", color: "#0288d1", text: "বন্যা, নদীভাঙন, ভূমিকম্প বা কোনো প্রাকৃতিক দুর্যোগে উদ্বাস্তু ও আশ্রয় শিবিরে আশ্রয় নেয়া কিশোর-কিশোরী;" },
                { icon: "fa-person-walking-arrow-right", color: "#c2185b", text: "পাচার বা জোরপূর্বক যৌনকর্মী হওয়া কিশোর-কিশোরী;" },
                { icon: "fa-burst", color: "#d84315", text: "যুদ্ধ, দাঙ্গা চলাকালীন সময়ে দেশে বা নিজ দেশ থেকে বিতাড়িত কিশোর-কিশোরী;" },
                { icon: "fa-tent", color: "#f57c00", text: "শরণার্থী শিবিরে বসবাসরত কিশোর-কিশোরী;" },
                { icon: "fa-mountain", color: "#558b2f", text: "দুর্গম এলাকায়, যেমন চর, হাওড় ও পাহাড়ি এলাকার কিশোর-কিশোরী" },
              ];

              const renderList = (items) =>
                items
                  .map(
                    (item) => `
                      <li style="background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,240,255,0.7) 100%); border-radius: 15px; padding: 14px; margin-bottom: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); border-left: 4px solid ${item.color}; transition: all 0.3s ease;">
                        <i class="fa-solid ${item.icon}" style="color: ${item.color}; margin-right: 12px; font-size: 1.2em;"></i>
                        <span>${item.text}</span>
                      </li>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up" style="display: flex; align-items: center;">
                    <i class="fa-solid fa-triangle-exclamation" style="color: #f44336; margin-right: 12px; font-size: 1.2em;"></i>
                    ঝুঁকিপূর্ণ কিশোর-কিশোরীদের ঝুঁকি নিরসনে করণীয়
                  </h2>
                  
                  <div class="modern-card glass-card" data-aos="fade-up" data-aos-delay="40" style="background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%); border-radius: 20px; box-shadow: 0 10px 40px rgba(255, 152, 0, 0.2);">
                    <h3 style="display: flex; align-items: center; margin-bottom: 20px; color: #e65100;">
                      <i class="fa-solid fa-users" style="margin-right: 10px; font-size: 1.3em; color: #ff6f00;"></i>
                      প্রধান ঝুঁকিপূর্ণ গোষ্ঠী
                    </h3>
                    <ul class="list-unstyled puberty-list mb-0" style="padding-left: 0;">
                      ${renderList(primaryList)}
                    </ul>
                  </div>
                  
                  <div class="modern-card glass-card" data-aos="fade-up" data-aos-delay="80" style="background: linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%); border-radius: 20px; box-shadow: 0 10px 40px rgba(233, 30, 99, 0.2); margin-top: 24px;">
                    <h5 style="display: flex; align-items: center; margin-bottom: 16px; color: #ad1457; font-weight: 600;">
                      <i class="fa-solid fa-exclamation-circle" style="margin-right: 10px; font-size: 1.2em; color: #e91e63;"></i>
                      যেকোনো সময়ে ঝুঁকিপূর্ণ হতে পারে
                    </h5>
                    <p class="fw-semibold mb-3" style="color: #880e4f;">এছাড়াও যেকোনো কিশোর-কিশোরী যেকোনো সময়ে ঝুঁকিপূর্ণ অবস্থার শিকার হতে পারে। যেমন—</p>
                    <ul class="list-unstyled puberty-list mb-0" style="padding-left: 0;">
                      ${renderList(secondaryList)}
                    </ul>
                  </div>
                </div>`;
            })(),'''

# Define the new lesson 3 content function  
new_lesson3_content = '''content: (function () {
              const actionItems = [
                { icon: "fa-magnifying-glass-chart", color: "#1976d2", text: "<strong>সুবিধা শনাক্তকরণ:</strong> সুবিধাবঞ্চিত কিশোর-কিশোরীদের মধ্যে সম্ভাব্য সুবিধা ও জটিলতাসমূহ শনাক্ত করা, যেমন সামাজিক, মানসিক বা শারীরিক সমস্যাগুলি।" },
                { icon: "fa-chart-line", color: "#388e3c", text: "<strong>সক্ষমতা বৃদ্ধি:</strong> কিশোর-কিশোরীদের মানসিক ও শারীরিক স্বাস্থ্য উন্নয়নে সহায়ক তথ্য ও প্রশিক্ষণ প্রদান করা, যা তাদের সুবিধা কমাতে সহায়ক হবে।" },
                { icon: "fa-comments", color: "#7b1fa2", text: "<strong>পরামর্শ ও সহায়তা:</strong> প্রত্যেক কিশোর-কিশোরীর জন্য ব্যক্তিগত পরামর্শ ও সহায়তার ব্যবস্থা করা, যাতে তারা তাদের সমস্যাগুলি সমাধান করতে এবং সুস্থভাবে জীবনযাপন করতে সক্ষম হয়।" },
                { icon: "fa-shield-halved", color: "#d32f2f", text: "<strong>সংকট ব্যবস্থাপনা:</strong> সুবিধাবঞ্চিত পরিস্থিতি ও সংকট মোকাবিলায় কার্যকর ব্যবস্থাপনা কৌশল শেখানো, যাতে তারা প্রতিকূল পরিস্থিতিতে স্থিতিশীল থাকতে পারে।" },
                { icon: "fa-people-group", color: "#f57c00", text: "<strong>সামাজিক সম্পৃক্ততা উন্নয়ন:</strong> কিশোর-কিশোরীদের সামাজিক সম্পৃক্ততা ও সম্প্রদায়ের সঙ্গে সংযোগ স্থাপন ও উন্নয়নে সহায়ক কার্যক্রম বাস্তবায়ন করা।" },
                { icon: "fa-bell", color: "#0288d1", text: "<strong>সচেতনতা বৃদ্ধি:</strong> স্বাস্থ্যকর জীবনযাপন ও সুবিধা মোকাবিলায় সচেতনতা সৃষ্টি করতে প্রয়োজনীয় তথ্য প্রদান এবং সচেতনতা কার্যক্রম পরিচালনা করা।" },
                { icon: "fa-brain", color: "#c2185b", text: "<strong>স্বনির্ভরতা ও আত্মবিশ্বাস বৃদ্ধি:</strong> কিশোর-কিশোরীদের মধ্যে আত্মবিশ্বাস ও স্বনির্ভরতা বাড়ানো, যাতে তারা নিজের সমস্যা সমাধানে সক্ষম হয় এবং জীবনের চ্যালেঞ্জগুলোর সম্মুখীন হতে পারে।" },
              ];

              const renderList = (items) =>
                items
                  .map(
                    (item) => `
                      <li style="background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(245,245,250,0.75) 100%); border-radius: 18px; padding: 16px; margin-bottom: 14px; box-shadow: 0 6px 20px rgba(0,0,0,0.1); border-left: 5px solid ${item.color}; transition: all 0.3s ease; transform: translateX(0);">
                        <i class="fa-solid ${item.icon}" style="color: ${item.color}; margin-right: 14px; font-size: 1.3em;"></i>
                        <span>${item.text}</span>
                      </li>
                    `
                  )
                  .join("");

              return `
                <div class="lesson-slide">
                  <h2 class="slide-title gradient-text" data-aos="fade-up" style="display: flex; align-items: center;">
                    <i class="fa-solid fa-hands-holding-circle" style="color: #43a047; margin-right: 12px; font-size: 1.2em;"></i>
                    সুবিধাবঞ্চিত কিশোর-কিশোরীদের সুবিধা নিরসনে করণীয়
                  </h2>
                  
                  <div class="modern-card glass-card" data-aos="fade-up" data-aos-delay="40" style="background: linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%); border-radius: 22px; box-shadow: 0 12px 45px rgba(76, 175, 80, 0.25);">
                    <h3 style="display: flex; align-items: center; margin-bottom: 22px; color: #2e7d32;">
                      <i class="fa-solid fa-list-check" style="margin-right: 10px; font-size: 1.3em; color: #66bb6a;"></i>
                      প্রধান কার্যক্রম
                    </h3>
                    <ul class="list-unstyled puberty-list mb-4" style="padding-left: 0;">
                      ${renderList(actionItems)}
                    </ul>
                    
                    <div style="background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%); border-radius: 15px; padding: 18px; margin-top: 20px; border-left: 4px solid #1976d2; box-shadow: 0 4px 15px rgba(25, 118, 210, 0.15);">
                      <h6 style="display: flex; align-items: center; color: #1565c0; margin-bottom: 12px;">
                        <i class="fa-solid fa-handshake" style="margin-right: 10px; color: #42a5f5;"></i>
                        সমন্বিত প্রচেষ্টা
                      </h6>
                      <p class="mb-0" style="color: #0d47a1;">উল্লেখিত বিষয়গুলো নিশ্চিত করে কিশোর-কিশোরীদের সুবিধা কমানো এবং তাদের উন্নয়নে সহায়ক পরিবেশ তৈরির লক্ষ্য অর্জন করা সম্ভব। এছাড়াও সরকারের বিভিন্ন মন্ত্রণালয় ও বিভাগের মধ্যে সমন্বয় পূর্বক বিভিন্ন নীতিমালা প্রণয়ন ও প্রয়োগের মাধ্যমে প্রয়োজনীয় সহায়তা দিতে হবে।</p>
                    </div>
                  </div>
                </div>`;
            })(),'''

# Pattern to match lesson 2 content
pattern_lesson2 = r'(id: "ch21-lesson-2",.*?quiz: null,\s+)(content: \(function \(\) \{.*?\}\)\(\),)'

# Pattern to match lesson 3 content 
pattern_lesson3 = r'(id: "ch21-lesson-3",.*?quiz: null,\s+)(content: \(function \(\) \{.*?\}\)\(\),)'

# Replace lesson 2
content = re.sub(pattern_lesson2, r'\1' + new_lesson2_content, content, flags=re.DOTALL)

# Replace lesson 3
content = re.sub(pattern_lesson3, r'\1' + new_lesson3_content, content, flags=re.DOTALL)

# Write back to file
with open('./js/data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Module 21 lessons 2 and 3 have been updated successfully!")
