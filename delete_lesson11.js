#!/usr/bin/env node

const fs = require('fs');

// Read the file
let content = fs.readFileSync('js/data.js', 'utf-8');

// Find and remove Lesson 11
const lesson11Start = content.indexOf('id: "ch19-lesson-11"');
const lesson11Marker = content.indexOf('},\n          {\n            id: "ch19-lesson-12"', lesson11Start);

if (lesson11Start !== -1 && lesson11Marker !== -1) {
  // Find the opening brace of lesson 11
  const openBracePos = content.lastIndexOf('{', lesson11Start);
  
  // Extract and remove lesson 11
  const before = content.substring(0, openBracePos);
  const after = content.substring(lesson11Marker + 2); // Skip the comma and newline
  
  content = before + after;
  
  fs.writeFileSync('js/data.js', content, 'utf-8');
  console.log('✅ Lesson 11 deleted successfully!');
  console.log('✅ Lessons 10 and 11 are now merged into a single Lesson 10.');
} else {
  console.error('❌ Could not find Lesson 11 to delete');
}
