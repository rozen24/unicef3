#!/bin/bash
file="js/data.js"

# Create a backup first
cp "$file" "${file}.before_html_update"

# Use sed to replace the HTML content (searching for the distinctive pattern)
sed -i '/<i class>fa-solid fa-user-shield<\/i><\/h2>/,/${renderList(preventionItems)}/,${
    s/<i class="fa-solid fa-user-shield"><\/i>.*/            <i class="fa-solid fa-weight-scale"><\/i>\$(yhLang("Adolescent Nutrition and Weight Management", "کৈশوरकалीন पुष्टि எবং ওজन ব्यवस्थapன"))<\/h2>/
}' "$file"

echo "✅ HTML template updated!"
