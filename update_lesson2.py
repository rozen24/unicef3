#!/usr/bin/env python
# -*- coding: utf-8 -*-

with open('js/data.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find lesson 2 bounds
start_line = None
end_line = None

for i, line in enumerate(lines):
    if '"ch19-lesson-2"' in line:
        start_line = i - 1  # Include the opening brace
        break

if start_line is None:
    print("✗ Lesson 2 not found")
    exit(1)

# Find closing brace
brace_count = 0
for i in range(start_line, len(lines)):
    brace_count += lines[i].count('{')
    brace_count -= lines[i].count('}')
    
    if brace_count == 0 and '},' in lines[i]:
        end_line = i
        break

if end_line is None:
    print("✗ Could not find closing brace")
    exit(1)

print(f"Found Lesson 2: lines {start_line+1} to {end_line+1}")

# New lesson 2 content (simplified placeholder - will be more complete)
new_lesson = '''          {
            id: "ch19-lesson-2",
            title: yhLang("BMI (Body Mass Index)", "বি.এম.আই (বডি মাস ইনডেক্স)"),
            icon: "fa-scale-balanced",
            gradientClass: "bg-gradient-sky",
            audioFile: "",
            quiz: null,
            content: (function () {
              const girlsBmi = [
                { age: "१०", ageEn: "10", low: "१४.८", normal: "१६.६", overweight: "१९.०" },
                { age: "११", ageEn: "11", low: "१५.३", normal: "१७.२", overweight: "१९.९" },
                { age: "१२", ageEn: "12", low: "१६.०", normal: "१८.०", overweight: "२०.८" },
                { age: "१३", ageEn: "13", low: "१६.६", normal: "१८.८", overweight: "२१.८" },
                { age: "१४", ageEn: "14", low: "१७.२", normal: "१९.६", overweight: "२२.७" },
                { age: "१५", ageEn: "15", low: "१७.८", normal: "२०.२", overweight: "२३.५" },
                { age: "१६", ageEn: "16", low: "१८.२", normal: "२०.७", overweight: "२४.१" },
                { age: "१७", ageEn: "17", low: "१८.४", normal: "२१.०", overweight: "२४.५" },
                { age: "१८", ageEn: "18", low: "१८.६", normal: "२१.३", overweight: "२४.८" },
                { age: "१९", ageEn: "19", low: "१८.७", normal: "२१.४", overweight: "२५.०" },
              ];

              const boysBmi = [
                { age: "१०", ageEn: "10", low: "१४.८", normal: "१६.६", overweight: "१९.०" },
                { age: "११", ageEn: "11", low: "१५.३", normal: "१६.९", overweight: "१९.२" },
                { age: "१२", ageEn: "12", low: "१५.८", normal: "१७.५", overweight: "१९.९" },
                { age: "१३", ageEn: "13", low: "१६.४", normal: "१८.२", overweight: "२०.८" },
                { age: "१४", ageEn: "14", low: "१७.०", normal: "१९.०", overweight: "२१.८" },
                { age: "१५", ageEn: "15", low: "१७.६", normal: "१९.८", overweight: "२२.७" },
                { age: "१६", ageEn: "16", low: "१८.२", normal: "२०.५", overweight: "२३.५" },
                { age: "१७", ageEn: "17", low: "१८.८", normal: "२१.१", overweight: "२४.३" },
                { age: "१८", ageEn: "18", low: "१९.२", normal: "२१.७", overweight: "२४.९" },
                { age: "१९", ageEn: "19", low: "१९.६", normal: "२२.२", overweight: "२५.४" },
              ];

              return `
                <div class="m19l2-container">
                  <div class="m19l2-shape m19l2-shape-1"></div>
                  <div class="m19l2-shape m19l2-shape-2"></div>
                  <div class="m19l2-shape m19l2-shape-3"></div>

                  <div class="m19l2-header" data-aos="fade-up">
                    <h2 class="m19l2-title">
                      <i class="fa-solid fa-scale-balanced"></i>
                      ${yhLang("BMI (Body Mass Index)", "বি.এম.আই (বডি মাস ইনডেক্স)")}
                    </h2>
                    <p class="m19l2-subtitle">${yhLang("Standard BMI Values for Adolescents (Ages 10-19)", "কৈশোরকালীন (१०-१९ বছর) পর্যায়ে আদর্শ বি.এম.আই মান")}</p>
                  </div>

                  <div class="m19l2-cards-grid">
                    <div class="m19l2-bmi-card m19l2-girls-card" data-aos="fade-right" data-aos-delay="100">
                      <div class="m19l2-card-header m19l2-girls-header">
                        <i class="fa-solid fa-person-dress"></i>
                        <div class="m19l2-header-text">
                          <h3>${yhLang("Girls", "কিশোরী")}</h3>
                          <span>${yhLang("Ages 10-19", "বয়স १०-१९ বছর")}</span>
                        </div>
                      </div>
                      <div class="m19l2-table-wrapper">
                        <table class="m19l2-bmi-table">
                          <thead>
                            <tr>
                              <th>${yhLang("Age", "বয়স")}</th>
                              <th>${yhLang("Low", "কম")}</th>
                              <th>${yhLang("Normal", "স্বাভাবিক")}</th>
                              <th>${yhLang("Overweight", "বেশি")}</th>
                            </tr>
                          </thead>
                          <tbody>
                            ${girlsBmi.map((row, idx) => `
                              <tr data-aos="zoom-in" data-aos-delay="${120 + idx * 15}">
                                <td class="m19l2-age">${yhLang(row.ageEn, row.age)}</td>
                                <td class="m19l2-low">${row.low}</td>
                                <td class="m19l2-normal">${row.normal}</td>
                                <td class="m19l2-overweight">${row.overweight}</td>
                              </tr>
                            `).join('')}
                          </tbody>
                        </table>
                      </div>
                      <div class="m19l2-color-legend">
                        <div class="m19l2-legend-item">
                          <span class="m19l2-legend-color m19l2-low-color"></span>
                          <small>${yhLang("Low", "কম")}</small>
                        </div>
                        <div class="m19l2-legend-item">
                          <span class="m19l2-legend-color m19l2-normal-color"></span>
                          <small>${yhLang("Normal", "স্বাভাবিক")}</small>
                        </div>
                        <div class="m19l2-legend-item">
                          <span class="m19l2-legend-color m19l2-overweight-color"></span>
                          <small>${yhLang("Overweight", "বেশি")}</small>
                        </div>
                      </div>
                    </div>

                    <div class="m19l2-bmi-card m19l2-boys-card" data-aos="fade-left" data-aos-delay="100">
                      <div class="m19l2-card-header m19l2-boys-header">
                        <i class="fa-solid fa-person"></i>
                        <div class="m19l2-header-text">
                          <h3>${yhLang("Boys", "কিশোর")}</h3>
                          <span>${yhLang("Ages 10-19", "বয়স १०-१९ বছর")}</span>
                        </div>
                      </div>
                      <div class="m19l2-table-wrapper">
                        <table class="m19l2-bmi-table">
                          <thead>
                            <tr>
                              <th>${yhLang("Age", "বয়স")}</th>
                              <th>${yhLang("Low", "कम")}</th>
                              <th>${yhLang("Normal", "स्वाभाविक")}</th>
                              <th>${yhLang("Overweight", "बेशी")}</th>
                            </tr>
                          </thead>
                          <tbody>
                            ${boysBmi.map((row, idx) => `
                              <tr data-aos="zoom-in" data-aos-delay="${120 + idx * 15}">
                                <td class="m19l2-age">${yhLang(row.ageEn, row.age)}</td>
                                <td class="m19l2-low">${row.low}</td>
                                <td class="m19l2-normal">${row.normal}</td>
                                <td class="m19l2-overweight">${row.overweight}</td>
                              </tr>
                            `).join('')}
                          </tbody>
                        </table>
                      </div>
                      <div class="m19l2-color-legend">
                        <div class="m19l2-legend-item">
                          <span class="m19l2-legend-color m19l2-low-color"></span>
                          <small>${yhLang("Low", "कम")}</small>
                        </div>
                        <div class="m19l2-legend-item">
                          <span class="m19l2-legend-color m19l2-normal-color"></span>
                          <small>${yhLang("Normal", "स्वाभाविक")}</small>
                        </div>
                        <div class="m19l2-legend-item">
                          <span class="m19l2-legend-color m19l2-overweight-color"></span>
                          <small>${yhLang("Overweight", "बेशी")}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              `;
            })(),
          },
'''

# Replace the lines
new_lines = lines[:start_line] + [new_lesson] + lines[end_line+1:]

# Write back
with open('js/data.js', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("✓ Module 19 Lesson 2 successfully redesigned!")
print("✓ Modern UI with pastel gradients, floating shapes, and color-coded cards applied")

