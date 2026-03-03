#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# Read the data.js file
with open(r'g:\unicef\unicef3\js\data.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Track if we're in Lesson 6
in_lesson_6 = False
in_left_sections = False
in_right_sections = False

# Output lines
output_lines = []

i = 0
while i < len(lines):
    line = lines[i]
    
    # Detect if we're in Lesson 6
    if 'id: "ch22-lesson-6"' in line:
        in_lesson_6 = True
    elif in_lesson_6 and 'id: "ch22-lesson-' in line and 'lesson-6' not in line:
        in_lesson_6 = False
    
    # Process leftSections
    if in_lesson_6 and 'const leftSections = [' in line:
        output_lines.append(line)
        i += 1
        # Process section 1
        output_lines.append('                {\n')
        output_lines.append('                  title: yhLang("1. Waterborne Diseases", "১. পানিবাহিত রোগ"),\n')
        output_lines.append('                  items: [\n')
        output_lines.append('                    yhLang("Diarrhea", "ডায়রিয়া"),\n')
        output_lines.append('                    yhLang("Dysentery", "ডিজেন্ট্রি (আমাশয়)"),\n')
        output_lines.append('                    yhLang("Typhoid", "টাইফয়েড"),\n')
        output_lines.append('                    yhLang("Cholera", "কলেরা"),\n')
        output_lines.append('                    yhLang("Hepatitis A", "হেপাটাইটিস–এ"),\n')
        output_lines.append('                    yhLang("Giardiasis", "জিয়ার্ডিয়াসিস")\n')
        output_lines.append('                  ],\n')
        output_lines.append('                },\n')
        output_lines.append('                {\n')
        output_lines.append('                  title: yhLang("2. Digestive Problems & Malnutrition", "২. পেটের সমস্যা ও অপুষ্টি"),\n')
        output_lines.append('                  items: [\n')
        output_lines.append('                    yhLang("Stomach infection", "পেটের সংক্রমণ"),\n')
        output_lines.append('                    yhLang("Vomiting", "বমি"),\n')
        output_lines.append('                    yhLang("Stomach pain", "পেট ব্যথা"),\n')
        output_lines.append('                    yhLang("Diarrhea", "ডায়রিয়া"),\n')
        output_lines.append('                    yhLang("Dehydration", "পানিশূন্যতা"),\n')
        output_lines.append('                    yhLang("Long-term malnutrition", "দীর্ঘমেয়াদে অপুষ্টির কারণ")\n')
        output_lines.append('                  ],\n')
        output_lines.append('                },\n')
        output_lines.append('              ];\n')
        output_lines.append('\n')
        # Skip old leftSections content
        while i < len(lines) and '];' not in lines[i]:
            i += 1
        i += 1  # Skip the ]; line
        continue
    
    # Process rightSections
    if in_lesson_6 and 'const rightSections = [' in line:
        output_lines.append(line)
        i += 1
        # Add all three sections
        output_lines.append('                {\n')
        output_lines.append('                  title: yhLang("3. Chemical Pollution Damage", "৩. রাসায়নিক দূষণের ক্ষতি"),\n')
        output_lines.append('                  items: [\n')
        output_lines.append('                    yhLang("Arsenicosis (dark spots on skin, skin diseases, cancer risk)", "আর্সেনিকোসিস (ত্বকে কালো দাগ, চর্মরোগ, ক্যান্সারের ঝুঁকি)"),\n')
        output_lines.append('                    yhLang("Dental or skeletal fluorosis", "ডেন্টাল বা স্কেলেটাল ফ্লুরোসিস"),\n')
        output_lines.append('                    yhLang("Nervous system damage", "স্নায়ুতন্ত্রের ক্ষতি"),\n')
        output_lines.append('                    yhLang("Reduced intelligence & memory (especially in children)", "বুদ্ধি ও স্মৃতিশক্তি হ্রাস (বিশেষত শিশুদের)"),\n')
        output_lines.append('                    yhLang("Kidney & liver problems", "কিডনি ও লিভারের সমস্যা"),\n')
        output_lines.append('                  ],\n')
        output_lines.append('                },\n')
        output_lines.append('                {\n')
        output_lines.append('                  title: yhLang("4. Skin Diseases", "৪. ত্বকের রোগ"),\n')
        output_lines.append('                  description: yhLang("Can cause skin diseases, eczema, itching, and fungal infections.", "চর্মরোগ, একজিমা, চুলকানি, ফাঙ্গাল সংক্রমণ হতে পারে।"),\n')
        output_lines.append('                },\n')
        output_lines.append('                {\n')
        output_lines.append('                  title: yhLang("5. Long-term Chronic Diseases", "৫. দীর্ঘমেয়াদি ক্রনিক রোগ"),\n')
        output_lines.append('                  items: [\n')
        output_lines.append('                    yhLang("Increased cancer risk", "ক্যান্সারের ঝুঁকি বৃদ্ধি"),\n')
        output_lines.append('                    yhLang("Kidney failure", "কিডনি ফেইলিওর"),\n')
        output_lines.append('                    yhLang("Liver cirrhosis", "লিভার সিরোসিস"),\n')
        output_lines.append('                    yhLang("Hormonal imbalance", "হরমোনের ভারসাম্যহীনতা"),\n')
        output_lines.append('                    yhLang("Increased risk of heart disease", "হৃদরোগের ঝুঁকি বাড়তে পারে।"),\n')
        output_lines.append('                  ],\n')
        output_lines.append('                },\n')
        output_lines.append('              ];\n')
        output_lines.append('\n')
        # Skip old rightSections content until we find the closing ];
        while i < len(lines) and '];' not in lines[i]:
            i += 1
        i += 1  # Skip the ]; line
        continue
    
    output_lines.append(line)
    i += 1

# Write back
with open(r'g:\unicef\unicef3\js\data.js', 'w', encoding='utf-8') as f:
    f.writelines(output_lines)

print("✅ Lesson 6 bilingual conversion completed!")
print("   - Converted leftSections (2 sections)")
print("   - Converted rightSections (3 sections)")
