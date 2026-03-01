#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Final fix for Module 10 Lesson 2 h2 heading"""
import re

# Read the file
with open('js/data.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find the line with Module 10 Lesson 2 h2
in_lesson2 = False
h2_found = False
for i, line in enumerate(lines):
    if 'id: "ch10-lesson-2"' in line:
        in_lesson2 = True
        print(f"Found lesson 2 at line {i+1}")
    
    if in_lesson2 and not h2_found and '<h2 class="slide-title gradient-text" data-aos="fade-up">${yhLang(' in line:
        # Found the h2 - need to modify this and next lines
        print(f"Found h2 at line {i+1}")
        # Replace this line
        lines[i] = '                  <h2 class="slide-title gradient-text" data-aos="fade-up">\n'
        # Insert icon line after
        lines.insert(i+1, '                    <i class="fa-solid fa-hourglass-half" style="color:#7C3AED; margin-right:0.5rem;"></i>\n')
        # Now need to adjust the yhLang line - find the closing </h2>
        for j in range(i+1, min(i+5, len(lines))):
            if '</h2>' in lines[j]:
                lines[j] = lines[j].replace(')</h2>', ')\n                  </h2>')
                break
        h2_found = True
        print("✓ Modified h2 heading")
        break

# Write back
with open('js/data.js', 'w', encoding='utf-8') as f:
    f.writelines(lines)

print("\n✓ Update complete!")
