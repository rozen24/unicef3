#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# Read the file
with open('js/data.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find the line with duplicate "content:"
for i, line in enumerate(lines):
    if 'content: (function () {            content: (function () {' in line:
        # Fix by removing the duplicate
        lines[i] = line.replace('content: (function () {            content:', 'content:')
        print(f"Fixed line {i+1}")
        break

# Write back
with open('js/data.js', 'w', encoding='utf-8') as f:
    f.writelines(lines)

print("✅ Duplicate content: fixed!")
