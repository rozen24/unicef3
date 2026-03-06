#!/bin/bash

# Backup
cp js/data.js js/data.js.backup3

# Use awk to replace specific lines
awk 'NR==13680 {print "                  text: yhLang(\"During adolescence, both boys and girls experience rapid growth in weight, height, and intellectual development.\", \"কৈশোরকালে ছেলে-মেয়ে উভয়েরই দ্রুত ওজন ও উচ্চতার বৃদ্ধি এবং বুদ্ধির বিকাশ ঘটে।"),"; next}
     NR==13684 {print "                  text: yhLang(\"For proper growth, it is essential to consume adequate nutritious and balanced food during this time.\", \"সঠিক বৃদ্ধির জন্য এ সময় পরিমাণমতো পুষ্টিকর ও সুষম খাবার গ্রহণ করা প্রয়োজন।\"),"; next}
     NR==13688 {print "                  text: yhLang(\"When adolescents grow up with proper nutrition, their intelligence and cognitive abilities develop.\", \"সঠিক পুষ্টি নিয়ে বেড়ে উঠলে কিশোর-কিশোরীদের মেধা ও বুদ্ধির বিকাশ হয়।\"),"; next}
     NR==13692 {print "                  text: yhLang(\"As a result, their focus on studies, academic performance, and work capacity improve.\", \"ফলস্বরূপ লেখাপড়ায় মনোযোগ, ভালো ফলাফল এবং কাজ করার সক্ষমতা বৃদ্ধি পায়।\"),"; next}
     NR==13699 {print "                  text: yhLang(\"Nutrition is a process where food is digested, breaking down complex components into simple ones, which the body then absorbs.\", \"পুষ্টি হলো একটি প্রক্রিয়া, যেখানে খাদ্য পরিপাক হয়ে জটিল উপাদান ভেঙে সরল উপাদানে পরিণত হয় এবং শরীর তা শোষণ করে।\"),"; next}
     NR==13707 {print "                  text: yhLang(\"Nutritious food helps maintain the body'"'"'s structure, repair, performance, and mental well-being.\", \"পুষ্টিকর খাদ্য দেহের গঠন, ক্ষয়পূরণ, কর্মক্ষমতা ও মানসিক প্রফুল্লতা বজায় রাখতে সহায়তা করে।\"),"; next}
     NR==13711 {print "                  text: yhLang(\"If weight and height are below the age-appropriate standard, it is identified as malnutrition.\", \"বয়সভিত্তিক ওজন-উচ্চতার আদর্শ মান থেকে কম হলে অপুষ্টি হিসেবে চিহ্নিত করা হয়।\"),"; next}
     NR==13715 {print "                  text: yhLang(\"BMI = Weight (kg) / Height (m)²; This is an important method for assessing nutritional status.\", \"বি.এম.আই = ওজন (কিলোগ্রাম) / উচ্চতা (মিটার)²; এটি পুষ্টিগত অবস্থা মূল্যায়নের গুরুত্বপূর্ণ পদ্ধতি।\"),"; next}
     {print}' js/data.js.backup3 > js/data.js.temp && mv js/data.js.temp js/data.js

echo "Translations added successfully!"
