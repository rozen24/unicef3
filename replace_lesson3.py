import re

with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Find lesson 3 by looking for the id
pattern = r'(\{\s+id: "ch19-lesson-3".*?}),'
matches = list(re.finditer(pattern, content, re.DOTALL))

if matches:
    match = matches[0]
    old_text = match.group(0)
    
    new_text = '''{
            id: "ch19-lesson-3",
            title: yhLang("BMI & Nutrition Components", "বি.এম.আই ও পুষ্টি উপাদান"),
            icon: "fa-bowl-food",
            gradientClass: "bg-gradient-gold",
            audioFile: "",
            quiz: null,
            content: (function () {
              // This lesson is merged with Lesson 2
              return `<div class="lesson-slide" style="text-align: center; padding: 40px;">
                <p style="font-size: 1.2rem; color: #666;">${yhLang("This lesson is merged with Lesson 2. Please refer to Lesson 2 to view BMI & Nutrition Components", "এই পাঠটি পাঠ ২ এর সাথে মার্জ করা হয়েছে। বি.এম.আই এবং পুষ্টি উপাদান দেখতে পাঠ ২ দেখুন।")}</p>
              </div>`;
            })(),
          },'''
    
    content = content[:match.start()] + new_text + content[match.end():]
    
    with open('js/data.js', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✓ Lesson 3 replaced successfully!")
else:
    print("✗ Could not find Lesson 3")
