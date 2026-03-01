#!/usr/bin/env python3
# -*- coding: utf-8 -*-

print("Fixing syntax artifacts in Module 9...")

# Read the file
with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Find and fix the duplicate content: in lesson 1
# Pattern: content:             content:             content: (function () {
# Should be: content: (function () {

# Replace the problematic pattern
old_pattern = '''content:             content:             content: (function () {'''
new_pattern = '''content: (function () {'''

if old_pattern in content:
    content = content.replace(old_pattern, new_pattern)
    print("✓ Fixed duplicate 'content:' in Lesson 1")
else:
    print("⚠ Pattern not found - may already be fixed")

# Also fix any duplicate })(), patterns
old_closing = '''})(),})(),'''
new_closing = '''})(),'''

if old_closing in content:
    content = content.replace(old_closing, new_closing)
    print("✓ Fixed duplicate closing in Lesson 1")
else:
    print("⚠ Closing pattern not found - may already be fixed")

# Save the file
with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("✓ File saved!")
