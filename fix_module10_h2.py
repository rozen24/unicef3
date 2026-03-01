#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Update Module 10 Lesson 2 h2 heading"""

# Read the file
with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the h2 heading
old_h2 = '''<h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(
                    "অন্তর্বর্তীকালীন সময় (উইন্ডো পিরিয়ড)",
                    "অন্তর্বর্তীকালীন সময় (উইন্ডো পিরিয়ড)"
                  )}</h2>'''

new_h2 = '''<h2 class="slide-title gradient-text" data-aos="fade-up">
                    <i class="fa-solid fa-hourglass-half" style="color:#7C3AED; margin-right:0.5rem;"></i>
                    ${yhLang(
                    "অন্তর্বর্তীকালীন সময় (উইন্ডো পিরিয়ড)",
                    "অন্তর্বর্তীকালীন সময় (উইন্ডো পিরিয়ড)"
                  )}
                  </h2>'''

# Find and replace
count = content.count(old_h2)
print(f"Found {count} instances of h2 heading")

if old_h2 in content:
    # Find the position of ch10-lesson-2 to replace only that instance
    lesson2_start = content.find('id: "ch10-lesson-2"')
    if lesson2_start > 0:
        # Find the h2 after lesson2 start
        search_start = content.find(old_h2, lesson2_start)
        if search_start > 0:
            content = content[:search_start] + new_h2 + content[search_start + len(old_h2):]
            print("✓ Replaced h2 heading for Module 10 Lesson 2")
        else:
            print("✗ Could not find h2 after lesson 2")
    else:
        print("✗ Could not find lesson 2")
else:
    print("✗ Pattern not found")

# Write back
with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("\n✓ Update complete!")
