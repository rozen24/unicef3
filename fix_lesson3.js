const fs = require('fs');
const path = require('path');

// Read the file
const filePath = path.join(__dirname, 'js', 'data.js');
let content = fs.readFileSync(filePath, 'utf8');

// Fix 1: Replace orbitItems strings array with objects array
const orbitItemsStart = content.indexOf('const orbitItems = [');
const orbitItemsEnd = content.indexOf('];', orbitItemsStart) + 2;

const newOrbitItems = `const orbitItems = [
                { text: "গর্ভধারণ বিষয়ক জটিলতা থেকে দীর্ঘস্থায়ী অসুস্থতা", icon: "fa-heart-pulse", gradient: "bg-gradient-blue" },
                { text: "মাতৃমৃত্যু", icon: "fa-cross", gradient: "bg-gradient-rose" },
                { text: "কন্যাশিশু মৃত্যু", icon: "fa-child", gradient: "bg-gradient-green" },
                { text: "প্রজননতন্ত্রের প্রদাহ ও যৌনরোগ", icon: "fa-virus", gradient: "bg-gradient-teal" },
                { text: "রক্তস্বল্পতা", icon: "fa-droplet", gradient: "bg-gradient-purple" },
                { text: "পুষ্টির অভাবজনিত সমস্যা", icon: "fa-apple", gradient: "bg-gradient-tangerine" },
                { text: "মানসিক অসুস্থতা", icon: "fa-brain", gradient: "bg-gradient-emerald" },
                { text: "প্রলম্বিত অসুস্থতা", icon: "fa-person-cane", gradient: "bg-gradient-blue" },
                { text: "অকাল বার্ধক্য", icon: "fa-hourglass-end", gradient: "bg-gradient-rose" },
                { text: "অপরিণত বয়সে গর্ভধারণ", icon: "fa-pregnancy", gradient: "bg-gradient-green" }
              ];`;

content = content.substring(0, orbitItemsStart) + newOrbitItems + content.substring(orbitItemsEnd);

// Fix 2: Replace return HTML with new ch13l3 structure
const returnStart = content.indexOf('return `', content.indexOf('const renderOrbit'));
const returnEnd = content.indexOf('`;', returnStart) + 2;

const newReturn = `return \`
                <div class="ch13l3-slide lesson-slide">
                  <div class="ch13l3-shapes" aria-hidden="true">
                    <span class="ch13l3-shape ch13l3-shape-orb"></span>
                    <span class="ch13l3-shape ch13l3-shape-wave"></span>
                    <span class="ch13l3-shape ch13l3-shape-ring"></span>
                  </div>

                  <h2 class="ch13l3-title" data-aos="fade-up">
                    <i class="fa-solid fa-scale-unbalanced"></i>
                    \${yhLang("Gender Bias Across Society", "সমাজে বিরাজমান জেন্ডার বৈষম্য")}
                  </h2>

                  <div class="ch13l3-content" data-aos="fade-up" data-aos-delay="80">
                    <div class="ch13l3-left">
                      <h3 class="ch13l3-section-title">
                        <i class="fa-solid fa-triangle-exclamation"></i>
                        \${yhLang("Biases in Society", "সমাজে বৈষম্যের ধরন")}
                      </h3>
                      <ul class="ch13l3-bias-list">
                        \${renderBiasList()}
                      </ul>
                    </div>

                    <div class="ch13l3-right">
                      <div class="ch13l3-orbit-container" data-aos="zoom-in" data-aos-delay="300">
                        <div class="ch13l3-orbit-center">
                          <div class="ch13l3-orbit-center-icon">
                            <i class="fa-solid fa-heart-pulse"></i>
                          </div>
                          <div class="ch13l3-orbit-center-text">
                            <h3>\${yhLang("Health Impact", "প্রজনন স্বাস্থ্যে প্রভাব")}</h3>
                          </div>
                        </div>
                        <div class="ch13l3-orbit-ring"></div>
                        \${renderOrbit()}
                      </div>
                    </div>
                  </div>
                </div>
              \`;`;

content = content.substring(0, returnStart) + newReturn + content.substring(returnEnd);

// Write back
fs.writeFileSync(filePath, content, 'utf8');
console.log('✓ Lesson 3 data structure updated successfully');
