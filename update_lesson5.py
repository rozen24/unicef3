# -*- coding: utf-8 -*-
import codecs

# Read file
with codecs.open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Point 1 replacement (Bengali)
p1_old = "১. পরিবেষ্টিত বা অ্যাম্বিয়েন্ট (বাহ্যিক) বায়ু দূষণ বলতে বাইরের বাতাসের দূষণকে বোঝায়। এর মধ্যে সাধারণত কার্বন মনোক্সাইড (CO), নাইট্রোজেন অক্সাইড (NOx), সীসা, আর্সেনিক, পারদ, সালফার ডাই অক্সাইড (SO2), পলিসাইক্লিক অ্যারোমেটিক হাইড্রোকার্বন (PAHs) এবং কণা পদার্থ (PM) অন্তর্ভুক্ত থাকে।"
p1_new = '''${yhLang("1. Ambient or outdoor air pollution refers to outdoor air pollution. It typically includes carbon monoxide (CO), nitrogen oxides (NOx), lead, arsenic, mercury, sulfur dioxide (SO2), polycyclic aromatic hydrocarbons (PAHs), and particulate matter (PM).", "১. পরিবেষ্টিত বা অ্যাম্বিয়েন্ট (বাহ্যিক) বায়ু দূষণ বলতে বাইরের বাতাসের দূষণকে বোঝায়। এর মধ্যে সাধারণত কার্বন মনোক্সাইড (CO), নাইট্রোজেন অক্সাইড (NOx), সীসা, আর্সেনিক, পারদ, সালফার ডাই অক্সাইড (SO2), পলিসা

ইক্লিক অ্যারোমেটিক হাইড্রোকার্বন (PAHs) এবং কণা পদার্থ (PM) অন্তর্ভুক্ত থাকে।")}'''

count1 = content.count(p1_old)
if count1 > 0:
    content = content.replace(p1_old, p1_new)
    print(f"✓ Wrapped point 1 ({count1} occurrences)")
else:
    print("✗ Point 1 text not found")

# Point 2 replacement (Bengali)
p2_old = "২. গৃহস্থালির (অভ্যন্তরীণ) বায়ু দূষণ বলতে রান্না, তাপ এবং আলো জ্বালানোর জন্য জ্বালানি (কাঠ, জৈববস্তু, কয়লা, কেরোসিন ইত্যাদি) অপ্রয়োজনীয় দহনের ফলে সৃষ্ট ঘরের ভেতরে এবং আশেপাশের দূষণকে বোঝায়।"
p2_new = '''${yhLang("2. Indoor air pollution refers to pollution created inside and around homes due to unnecessary burning of fuels (wood, biomass, coal, kerosene, etc.) for cooking, heating, and lighting.", "২. গৃহস্থালির (অভ্যন্তরীণ) বায়ু দূষণ বলতে রান্না, তাপ এবং আলো জ্বালানোর জন্য জ্বালানি (কাঠ, জৈববস্তু, কয়লা, কেরোসিন ইত্যাদি) অপ্রয়োজনীয় দহনের ফলে সৃষ্ট ঘরের ভেতরে এবং আশেপাশের দূষণকে বোঝায়।")}'''

count2 = content.count(p2_old)
if count2 > 0:
    content = content.replace(p2_old, p2_new)
    print(f"✓ Wrapped point 2 ({count2} occurrences)")
else:
    print("✗ Point 2 text not found")

# Point 3 (AQI explanation)
p3_old = "বায়ু কতটা দূষিত তা বায়ুর মান সূচক (AQI) দ্বারা পরিমাপ করা যায়। বাংলাদেশে, পাঁচটি দূষণকারী পদার্থের (কণা পদার্থ PM10 এবং PM2.5, NO2, CO, SO2 এবং O3) বিদ্যমান ঘনত্বের উপর ভিত্তি করে AQI গণনা করা হয়।"
p3_new = '''${yhLang("How polluted the air is can be measured by the Air Quality Index (AQI). In Bangladesh, AQI is calculated based on the concentration of five pollutants (particulate matter PM10 and PM2.5, NO2, CO, SO2, and O3).", "বায়ু কতটা দূষিত তা বায়ুর মান সূচক (AQI) দ্বারা পরিমাপ করা যায়। বাংলাদেশে, পাঁচটি দূষণকারী পদার্থের (কণা পদার্থ PM10 এবং PM2.5, NO2, CO, SO2 এবং O3) বিদ্যমান ঘনত্বের উপর ভিত্তি করে AQI গণনা করা হয়।")}'''

count3 = content.count(p3_old)
if count3 > 0:
    content = content.replace(p3_old, p3_new)
    print(f"✓ Wrapped AQI explanation ({count3} occurrences)")
else:
    print("✗ AQI explanation text not found")

# Write back
with codecs.open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("\n✅ File saved successfully!")
