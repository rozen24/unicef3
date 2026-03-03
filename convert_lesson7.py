#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
import re

# Read the data.js file
with open(r'g:\unicef\unicef3\js\data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Define the bilingual pollution causes
bilingual_causes = [
    {
        "title_en": "1. Industrial Waste",
        "title_bn": "१. शिल्पकारखानार बर्जय",
        "desc_en": "Chemicals, heavy metals, dyes, and acids from factories enter rivers and ponds, contaminating water.",
        "desc_bn": "বিভিন্ন কারখানা থেকে নির্গত রাসায়নিক, ভারী ধাতু, রঙ, এসিড-ক্ষার ইত্যাদি সরাসরি নদী-নালা, খাল-বিলে গিয়ে পানিকে দূষিত করে।"
    },
    {
        "title_en": "2. Agricultural Chemicals",
        "title_bn": "२. कृषिकाजे ब्यवहृत रासायनिक",
        "desc_en": "Pesticides, fertilizers, and herbicides mix with soil and reach groundwater, degrading water quality.",
        "desc_bn": "কীটনাশক, সার, আগাছানাশক মাটির সাথে মিশে ভূগর্ভস্থ পানিতে পৌঁছায় এবং পানির মান নষ্ট করে।"
    },
    {
        "title_en": "3. Household Waste & Sewage",
        "title_bn": "३. गृहस्थाली बर्जय व नोङ्ग्रा पानि",
        "desc_en": "Dirty water from kitchens, bathrooms, and toilets without proper treatment pollutes rivers and streams.",
        "desc_bn": "রান্নাঘর, বাথরুম ও টয়লেটের নোংরা পানি সঠিকভাবে পরিশোধন না করে ফেলে দিলে নদী-নালা, খাল-বিলে গিয়ে পানিকে দূষিত করে।"
    },
    {
        "title_en": "4. Human Waste & Sanitation Problems",
        "title_bn": "४. मानबर्जय व स्यानिटेशन समस्या",
        "desc_en": "Open defecation and poor drainage systems spread bacteria, viruses, and parasites in water.",
        "desc_bn": "উন্মুক্ত স্থানে শৌচকর্ম, অপর্যাপ্ত ল্যাট্রিন/পায়খানা  ও ড্রেনেজ ব্যবস্থা পানিতে ব্যাকটেরিয়া, ভাইরাস, পরজীবী ছড়িয়ে দেয় ও পানিকে দূষিত করে।"
    },
    {
        "title_en": "5. Plastic & Solid Waste",
        "title_bn": "५. नदी-नाला व खालमा प्लास्टिक व ठोस बर्जय फेलना",
        "desc_en": "Plastic bottles and electronic waste in water release toxic substances and contaminate it.",
        "desc_bn": "পলিথিন, প্লাস্টিকের বোতল, পুরনো ইলেকট্রনিক বর্জ্য পানিতে ফেললে  তা  পানিতে মিশে বিষাক্ত উপাদান ছড়ায় ও পানিকে দূষিত করে।"
    },
    {
        "title_en": "6. Oil & Fuel Spills",
        "title_bn": "६. तेल व ज्वलन पदार्थको निःसरण",
        "desc_en": "Oil leaks from boats and generators damage aquatic life and water quality.",
        "desc_bn": "নৌযান/ জাহাজের পাম্প, জেনারেটর থেকে বা দুর্ঘটনার কারণে তেল পানিতে মিশে জীববৈচিত্র্য ও পানির মান নষ্ট করে।"
    },
    {
        "title_en": "7. Unplanned Urbanization",
        "title_bn": "७. अपरिकल्पित नगरायन व निर्मानकाज",
        "desc_en": "Dust, soil, and concrete from construction pollute water sources.",
        "desc_bn": "মাটিক্ষয়, ধুলা-বালু, কংক্রিটের মিশ্রণসহ অন্যান্য উপাদান পানিতে পড়ে দূষণ বাড়ায়।"
    },
    {
        "title_en": "8. Medical Waste & Chemicals",
        "title_bn": "८. चिकित्सा बर्जय व रासायनिक औषधि",
        "desc_en": "Hospital and clinic waste contaminates water with germs and harmful chemicals.",
        "desc_bn": "হাসপাতাল বা ক্লিনিকের বর্জ্য সঠিকভাবে ব্যবস্থাপনা না করলে পানি জীবাণু ও রাসায়নিক দ্বারা দূষিত হয়।"
    }
]

# Find the pollutionCauses array and replace it
pattern = re.compile(
    r'const pollutionCauses = \[.*?\];',
    re.DOTALL
)

# Build the new bilingual array
new_causes = "const pollutionCauses = [\n"
for cause in bilingual_causes:
    new_causes += f'''                {{
                  title: yhLang("{cause['title_en']}", "{cause['title_bn']}"),
                  desc: yhLang("{cause['desc_en']}", "{cause['desc_bn']}"),
                }},
'''
new_causes += "              ];"

# Replace
content = pattern.sub(new_causes, content)

# Write back
with open(r'g:\unicef\unicef3\js\data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Lesson 7 has been successfully converted to bilingual format!")
