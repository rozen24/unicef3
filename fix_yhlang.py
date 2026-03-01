#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Fix yhLang in h2"""

# Read the file
with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the broken h2
broken = '''<h2 class="slide-title gradient-text" data-aos="fade-up">
                    <i class="fa-solid fa-hourglass-half" style="color:#7C3AED; margin-right:0.5rem;"></i>
                    "অন্তর্বর্তীকালীন সময় (উইন্ডো পিরিয়ড)",
                    "অন্তর্বর্তীকালীন সময় (উইন্ডো পিরিয়ড)"
                  )}</h2>'''

fixed = '''<h2 class="slide-title gradient-text" data-aos="fade-up">
                    <i class="fa-solid fa-hourglass-half" style="color:#7C3AED; margin-right:0.5rem;"></i>
                    ${yhLang(
                    "অন্তর্বর্তীকালীন সময় (উইন্ডো পিরিয়ড)",
                    "অন্তর্বর্তীকালীন সময় (উইন্ডো পিরিয়ড)"
                  )}
                  </h2>'''

if broken in content:
    content = content.replace(broken, fixed)
    print("✓ Fixed yhLang") 
else:
    print("✗ Pattern not found")

# Write back
with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("✓ Complete!")
