#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Fix broken yhLang by line numbers"""

# Read the file
with open('js/data.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Fix lines 6039-6041 (0-indexed: 6038-6040)
lines[6038] = '                    ${yhLang(\n'
lines[6039] = '                    "অন্তর্বর্তীকালীন সময় (উইন্ডো পিরিয়ড)",\n'
lines[6040] = '                    "অন্তর্বর্তীকালীন সময় (উইন্ডো পিরিয়ড)"\n'
lines[6041] = '                  )}\n'

# Write back
with open('js/data.js', 'w', encoding='utf-8') as f:
    f.writelines(lines)

print("✓ Fixed yhLang call!")
