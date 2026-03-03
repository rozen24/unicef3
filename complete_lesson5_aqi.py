# -*- coding: utf-8 -*-
# Complete Lesson 5 AQI paragraph wrapper

with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# AQI explanation paragraph
aqi_old = "বায়ু কতটা দূষিত তা বায়ুর মান সূচক (AQI) দ্বারা পরিমাপ করা যায়। বাংলাদেশে, পাঁচটি দূষণকারী পদার্থের (কণা পদার্থ PM10 এবং PM2.5, NO2, CO, SO2 এবং O3) বিদ্যমান ঘনত্বের উপর ভিত্তি করে AQI গণনা করা হয়।"

aqi_new = '''${yhLang("How polluted the air is can be measured by the Air Quality Index (AQI). In Bangladesh, AQI is calculated based on the concentration of five pollutants (particulate matter PM10 and PM2.5, NO2, CO, SO2, and O3).", "বায়ু কতটা দূষিত তা বায়ুর মান সূচক (AQI) দ্বারা পরিমাপ করা যায়। বাংলাদেশে, পাঁচটি দূষণকারী পদার্থের (কণা পদার্থ PM10 এবং PM2.5, NO2, CO, SO2 এবং O3) বিদ্যমান ঘনত্বের উপর ভিত্তি করে AQI গণনা করা হয়।")}'''

if aqi_old in content:
    content = content.replace(aqi_old, aqi_new)
    print("✓ AQI paragraph wrapped with yhLang()")
    
    with open('js/data.js', 'w', encoding='utf-8') as f:
        f.write(content)
    print("✅ Lesson 5 now 100% bilingual!")
else:
    print("✗ AQI paragraph text not found")
