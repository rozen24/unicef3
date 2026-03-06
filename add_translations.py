#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import re

# Read the file
with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

#Define replacements (old text -> new text with yhLang)
replacements = [
    # importance points
    (
        '                  text: "কৈশোরকালে ছেলে-মেয়ে উভয়েরই দ্রুত ওজন ও উচ্চতার বৃদ্ধি এবং বুদ্ধির বিকাশ ঘটে।",',
        '                  text: yhLang("During adolescence, both boys and girls experience rapid growth in weight, height, and intellectual development.", "কৈশোরকালে ছেলে-মেয়ে উভয়েরই দ্রুত ওজন ও উচ্চতার বৃদ্ধি এবং বুদ্ধির বিকাশ ঘটে।"),'
    ),
    (
        '                  text: "সঠিক বৃদ্ধির জন্য এ সময় পরিমাণমতো পুষ্টিকর ও সুষম খাবার গ্রহণ করা প্রয়োজন।",',
        '                  text: yhLang("For proper growth, it is essential to consume adequate nutritious and balanced food during this time.", "সঠিক বৃদ্ধির জন্য এ সময় পরিমাণমতো পুষ্টিকর ও সুষম খাবার গ্রহণ করা প্রয়োজন।"),'
    ),
    (
        '                  text: "সঠিক পুষ্টি নিয়ে বেড়ে উঠলে কিশোর-কিশোরীদের মেধা ও বুদ্ধির বিকাশ হয়।",',
        '                  text: yhLang("When adolescents grow up with proper nutrition, their intelligence and cognitive abilities develop.", "সঠিক পুষ্টি নিয়ে বেড়ে উঠলে কিশোর-কিশোরীদের মেধা ও বুদ্ধির বিকাশ হয়।"),'
    ),
    (
        '                  text: "ফলস্বরূপ লেখাপড়ায় মনোযোগ, ভালো ফলাফল এবং কাজ করার সক্ষমতা বৃদ্ধি পায়।",',
        '                  text: yhLang("As a result, their focus on studies, academic performance, and work capacity improve.", "ফলস্বরূপ লেখাপড়ায় মনোযোগ, ভালো ফলাফল এবং কাজ করার সক্ষমতা বৃদ্ধি পায়।"),'
    ),
    # nutrition points (skip the second one as it already has yhLang)
    (
        '                  text: "পুষ্টি হলো একটি প্রক্রিয়া, যেখানে খাদ্য পরিপাক হয়ে জটিল উপাদান ভেঙে সরল উপাদানে পরিণত হয় এবং শরীর তা শোষণ করে।",',
        '                  text: yhLang("Nutrition is a process where food is digested, breaking down complex components into simple ones, which the body then absorbs.", "পুষ্টি হলো একটি প্রক্রিয়া, যেখানে খাদ্য পরিপাক হয়ে জটিল উপাদান ভেঙে সরল উপাদানে পরিণত হয় এবং শরীর তা শোষণ করে।"),'
    ),
    (
        '                  text: "পুষ্টিকর খাদ্য দেহের গঠন, ক্ষয়পূরণ, কর্মক্ষমতা ও মানসিক প্রফুল্লতা বজায় রাখতে সহায়তা করে।",',
        '                  text: yhLang("Nutritious food helps maintain the body\'s structure, repair, performance, and mental well-being.", "পুষ্টিকর খাদ্য দেহের গঠন, ক্ষয়পূরণ, কর্মক্ষমতা ও মানসিক প্রফুল্লতা বজায় রাখতে সহায়তা করে।"),'
    ),
    (
        '                  text: "বয়সভিত্তিক ওজন-উচ্চতার আদর্শ মান থেকে কম হলে অপুষ্টি হিসেবে চিহ্নিত করা হয়।",',
        '                  text: yhLang("If weight and height are below the age-appropriate standard, it is identified as malnutrition.", "বয়সভিত্তিক ওজন-উচ্চতার আদর্শ মান থেকে কম হলে অপুষ্টি হিসেবে চিহ্নিত করা হয়।"),'
    ),
    (
        '                  text: "বি.এম.আই = ওজন (কিলোগ্রাম) / উচ্চতা (মিটার)²; এটি পুষ্টিগত অবস্থা মূল্যায়নের গুরুত্বপূর্ণ পদ্ধতি।",',
        '                  text: yhLang("BMI = Weight (kg) / Height (m)²; This is an important method for assessing nutritional status.", "বি.এম.আই = ওজন (কিলোগ্রাম) / উচ্চতা (মিটার)²; এটি পুষ্টিগত অবস্থা মূল্যায়নের গুরুত্বপূর্ণ পদ্ধতি।"),'
    ),
]

# Apply replacements
for old, new in replacements:
    if old in content:
        content = content.replace(old, new, 1)  # Replace only first occurrence
        print(f"✓ Replaced")
    else:
        print(f"✗ Not found")

# Write back
with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("\nTranslations added successfully!")
