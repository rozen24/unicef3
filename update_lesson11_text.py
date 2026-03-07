#!/usr/bin/env python
# -*- coding: utf-8 -*-

import re

# Read the file
with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the paragraph text
old_text = 'yhLang("Among adolescents, obesity is influenced by home environment, food habits, socioeconomic status, physical activity, and limited safe spaces for regular play and exercise.", "কিশোর-কিশোরীদের মধ্যে স্থূলতার হার বৃদ্ধির জন্য ঘরের পরিবেশ, খাদ্যাভ্যাস, আর্থসামাজিক অবস্থা, নিয়মিত খেলাধুলা, ব্যায়াম এবং নিরাপদ খেলার স্থানের সীমাবদ্ধতা গুরুত্বপূর্ণ ভূমিকা রাখে।")'

new_text = 'yhLang("A BMI between 25 and 29.9 is considered overweight. A BMI of 30 or higher is classified as obesity. Among adolescents, obesity rates are influenced by home environment, food habits, socioeconomic status, regular physical activity, exercise opportunities, and facilities. Families often have limited knowledge about the importance of balanced diets, what constitutes balanced meals, and their benefits. Additionally, there is a shortage of suitable and safe play spaces for girls in both rural and urban areas.", "বডি মাস ইনডেক্স (BMI) ২৫ থেকে ২৯.৯ এর মেধ্য থাকলে তাকে অতিরিক্ত ওজন হিসেবে ধরা হয়। অন্যদিকে  BMI ৩০ বা তার বেশি হলে তাকে স্থূলতা বলা হয়। কিশোর-কিশোরীদের মেধ্য স্থূলতার হার বৃিদ্ধর জন্য ঘরের পরিবেশ, খাদ্যাভ্যাস, আর্থসামাজিক অবস্থা, নিয়মিত খেলাধূলা, ব্যায়াম ও সুযোগ-সুবিধার প্রভাব বিদ্যমান। সুষম খাবারের প্রয়োজনীয়তা ও সুষম খাবার কোনগুলো ও তার সুফল সম্পর্কে পরিবারের মেধ্য ধারণা কম রয়েছে। তাছাড়া গ্রাম ও শহরে মেয়েদের উপযুক্ত খেলার স্থান ও নিরাপদ কাঠামোর সংকট রয়েছে।")'

content = content.replace(old_text, new_text)

# Write back
with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Text replacement completed successfully!")
