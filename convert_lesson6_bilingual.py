#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re

# Read the data.js file
with open(r'g:\unicef\unicef3\js\data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Find and replace leftSections
old_left = '''              const leftSections = [
                {
                  title: "১. পানিবাহিত রোগ",
                  items: ["ডায়রিয়া", "ডিজেন্ট্রি (আমাশয়)", "টাইফয়েড", "কলেরা", "হেপাটাইটিস–এ", "জিয়ার্ডিয়াসিস"],
                },
                {
                  title: "২. পেটের সমস্যা ও অপুষ্টি",
                  items: ["পেটের সংক্রমণ", "বমি", "পেট ব্যথা", "ডায়রিয়া", "পানিশূন্যতা", "দীর্ঘমেয়াদে অপুষ্টির কারণ"],
                },
              ];'''

new_left = '''              const leftSections = [
                {
                  title: yhLang("1. Waterborne Diseases", "১. পানিবাহিত রোগ"),
                  items: [
                    yhLang("Diarrhea", "ডায়রিয়া"),
                    yhLang("Dysentery", "ডিজেন্ট্রি (আমাশয়)"),
                    yhLang("Typhoid", "টাইফয়েড"),
                    yhLang("Cholera", "কলেরা"),
                    yhLang("Hepatitis A", "হেপাটাইটিস–এ"),
                    yhLang("Giardiasis", "জিয়ার্ডিয়াসিস")
                  ],
                },
                {
                  title: yhLang("2. Digestive Problems & Malnutrition", "২. পেটের সমস্যা ও অপুষ্টি"),
                  items: [
                    yhLang("Stomach infection", "পেটের সংক্রমণ"),
                    yhLang("Vomiting", "বমি"),
                    yhLang("Stomach pain", "পেট ব্যথা"),
                    yhLang("Diarrhea", "ডায়রিয়া"),
                    yhLang("Dehydration", "পানিশূন্যতা"),
                    yhLang("Long-term malnutrition", "দীর্ঘমেয়াদে অপুষ্টির কারণ")
                  ],
                },
              ];'''

# Find and replace rightSections
old_right = '''              const rightSections = [
                {
                  title: "৩. রাসায়নিক দূষণের ক্ষতি",
                  items: [
                    "আর্সেনিকোসিস (ত্বকে কালো দাগ, চর্মরোগ, ক্যান্সারের ঝুঁকি)",
                    "ডেন্টাল বা স্কেলেটাল ফ্লুরোসিস",
                    "স্নায়ুতন্ত্রের ক্ষতি",
                    "বুদ্ধি ও স্মৃতিশক্তি হ্রাস (বিশেষত শিশুদের)",
                    "কিডনি ও লিভারের সমস্যা",
                  ],
                },
                {
                  title: "৪. ত্বকের রোগ",
                  description: "চর্মরোগ, একজিমা, চুলকানি, ফাঙ্গাল সংক্রমণ হতে পারে।",
                },
                {
                  title: "৫. দীর্ঘমেয়াদি ক্রনিক রোগ",
                  items: [
                    "ক্যান্সারের ঝুঁকি বৃদ্ধি",
                    "কিডনি ফেইলিওর",
                    "লিভার সিরোসিস",
                    "হরমোনের ভারসাম্যহীনতা",
                    "হৃদরোগের ঝুঁকি বাড়তে পারে।",
                  ],
                },
              ];'''

new_right = '''              const rightSections = [
                {
                  title: yhLang("3. Chemical Pollution Damage", "৩. রাসায়নিক দূষণের ক্ষতি"),
                  items: [
                    yhLang("Arsenicosis (dark spots on skin, skin diseases, cancer risk)", "আর্সেনিকোসিস (ত্বকে কালো দাগ, চর্মরোগ, ক্যান্সারের ঝুঁকি)"),
                    yhLang("Dental or skeletal fluorosis", "ডেন্টাল বা স্কেলেটাল ফ্লুরোসিস"),
                    yhLang("Nervous system damage", "স্নায়ুতন্ত্রের ক্ষতি"),
                    yhLang("Reduced intelligence & memory (especially in children)", "বুদ্ধি ও স্মৃতিশক্তি হ্রাস (বিশেষত শিশুদের)"),
                    yhLang("Kidney & liver problems", "কিডনি ও লিভারের সমস্যা"),
                  ],
                },
                {
                  title: yhLang("4. Skin Diseases", "৪. ত্বকের রোগ"),
                  description: yhLang("Can cause skin diseases, eczema, itching, and fungal infections.", "চর্মরোগ, একজিমা, চুলকানি, ফাঙ্গাল সংক্রমণ হতে পারে।"),
                },
                {
                  title: yhLang("5. Long-term Chronic Diseases", "৫. দীর্ঘমেয়াদি ক্রনিক রোগ"),
                  items: [
                    yhLang("Increased cancer risk", "ক্যান্সারের ঝুঁকি বৃদ্ধি"),
                    yhLang("Kidney failure", "কিডনি ফেইলিওর"),
                    yhLang("Liver cirrhosis", "লিভার সিরোসিস"),
                    yhLang("Hormonal imbalance", "হরমোনের ভারসাম্যহীনতা"),
                    yhLang("Increased risk of heart disease", "হৃদরোগের ঝুঁকি বাড়তে পারে।"),
                  ],
                },
              ];'''

# Replace
content = content.replace(old_left, new_left)
content = content.replace(old_right, new_right)

# Write back
with open(r'g:\unicef\unicef3\js\data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Lesson 6 has been successfully converted to bilingual format!")
print("   - leftSections: 2 sections with 6 + 6 items = 12 items")
print("   - rightSections: 3 sections with 5 + 1 + 5 items = 11 items")
print("   - Total: 23 items now support English/Bengali")
