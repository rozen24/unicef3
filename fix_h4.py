#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import sys

# Read the file
with open('js/data.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Replace line 3898 (index 3897 since 0-indexed)
old_line = lines[3897]
print(f"Old line: {old_line}")

new_h4 = '''                        <h4 class="fw-semibold mb-3">
                          <i class="fa-solid fa-circle-check me-2" style="background: linear-gradient(135deg, #14B8A6, #0D9488); -webkit-background-clip: text; -webkit-text-fill-color: transparent;"></i>
                          ${yhLang("করণীয়", "করণীয়")}
                        </h4>
'''

lines[3897] = new_h4

# Write back
with open('js/data.js', 'w', encoding='utf-8') as f:
    f.writelines(lines)

print("Successfully updated H4 heading!")
