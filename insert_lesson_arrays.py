#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# Read the file
with open('js/data.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Define the arrays to insert for Lesson 4 (insert after line 3475)
lesson4_arrays = '''
              const parentPointsCards = [
                { text: parentPoints[0], icon: "fa-graduation-cap", gradient: "linear-gradient(135deg, #D1FAE5 0%, #ECFDF5 100%)", iconBg: "linear-gradient(135deg, #10B981 0%, #059669 100%)", shadow: "rgba(16, 185, 129, 0.12)" },
                { text: parentPoints[1], icon: "fa-comments", gradient: "linear-gradient(135deg, #CFFAFE 0%, #ECFEFF 100%)", iconBg: "linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)", shadow: "rgba(6, 182, 212, 0.12)" },
                { text: parentPoints[2], icon: "fa-face-smile", gradient: "linear-gradient(135deg, #FEF3C7 0%, #FEF9E7 100%)", iconBg: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)", shadow: "rgba(251, 191, 36, 0.12)" },
                { text: parentPoints[3], icon: "fa-person-running", gradient: "linear-gradient(135deg, #DBEAFE 0%, #EFF6FF 100%)", iconBg: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)", shadow: "rgba(59, 130, 246, 0.12)" },
                { text: parentPoints[4], icon: "fa-apple-whole", gradient: "linear-gradient(135deg, #DCFCE7 0%, #F0FDF4 100%)", iconBg: "linear-gradient(135deg, #22C55E 0%, #16A34A 100%)", shadow: "rgba(34, 197, 94, 0.12)" }
              ];

              const schoolPointsCards = [
                { text: schoolPoints[0], icon: "fa-chalkboard-user", gradient: "linear-gradient(135deg, #D1FAE5 0%, #ECFDF5 100%)", iconBg: "linear-gradient(135deg, #10B981 0%, #059669 100%)", shadow: "rgba(16, 185, 129, 0.12)" },
                { text: schoolPoints[1], icon: "fa-first-aid-kit", gradient: "linear-gradient(135deg, #FEE2E2 0%, #FEF2F2 100%)", iconBg: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)", shadow: "rgba(239, 68, 68, 0.12)" },
                { text: schoolPoints[2], icon: "fa-tablets", gradient: "linear-gradient(135deg, #F3E8FF 0%, #FAF5FF 100%)", iconBg: "linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)", shadow: "rgba(168, 85, 247, 0.12)" },
                { text: schoolPoints[3], icon: "fa-hands", gradient: "linear-gradient(135deg, #DBEAFE 0%, #EFF6FF 100%)", iconBg: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)", shadow: "rgba(59, 130, 246, 0.12)" }
              ];

              const essentialsCards = [
                { text: essentials[0], icon: "fa-toilet", gradient: "linear-gradient(135deg, #D1FAE5 0%, #ECFDF5 100%)", iconBg: "linear-gradient(135deg, #10B981 0%, #059669 100%)", shadow: "rgba(16, 185, 129, 0.12)" },
                { text: essentials[1], icon: "fa-water", gradient: "linear-gradient(135deg, #CFFAFE 0%, #ECFEFF 100%)", iconBg: "linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)", shadow: "rgba(6, 182, 212, 0.12)" },
                { text: essentials[2], icon: "fa-soap", gradient: "linear-gradient(135deg, #F3E8FF 0%, #FAF5FF 100%)", iconBg: "linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)", shadow: "rgba(168, 85, 247, 0.12)" },
                { text: essentials[3], icon: "fa-trash", gradient: "linear-gradient(135deg, #FEF3C7 0%, #FEF9E7 100%)", iconBg: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)", shadow: "rgba(251, 191, 36, 0.12)" },
                { text: essentials[4], icon: "fa-broom", gradient: "linear-gradient(135deg, #FFE4E9 0%, #FFF5F7 100%)", iconBg: "linear-gradient(135deg, #EC4899 0%, #DB2777 100%)", shadow: "rgba(236, 72, 153, 0.12)" }
              ];
'''

# Define the arrays to insert for Lesson 5 (insertafter line 3596, but adjusted after Lesson 4 insertion)
lesson5_arrays = '''
              const warningPointsCards = [
                { text: warningPoints[0], icon: "fa-circle", gradient: "linear-gradient(135deg, #FCA5A5 0%, #FECACA 100%)", iconBg: "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)", shadow: "rgba(220, 38, 38, 0.12)" },
                { text: warningPoints[1], icon: "fa-droplet-slash", gradient: "linear-gradient(135deg, #FED7AA 0%, #FFEDD5 100%)", iconBg: "linear-gradient(135deg, #EA580C 0%, #C2410C 100%)", shadow: "rgba(234, 88, 12, 0.12)" },
                { text: warningPoints[2], icon: "fa-triangle-exclamation", gradient: "linear-gradient(135deg, #FEF3C7 0%, #FEF9E7 100%)", iconBg: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)", shadow: "rgba(251, 191, 36, 0.12)" },
                { text: warningPoints[3], icon: "fa-biohazard", gradient: "linear-gradient(135deg, #FED7AA 0%, #FFEDD5 100%)", iconBg: "linear-gradient(135deg, #EA580C 0%, #C2410C 100%)", shadow: "rgba(234, 88, 12, 0.12)" },
                { text: warningPoints[4], icon: "fa-heart-crack", gradient: "linear-gradient(135deg, #FCA5A5 0%, #FECACA 100%)", iconBg: "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)", shadow: "rgba(220, 38, 38, 0.12)" }
              ];

              const managementPointsCards = [
                { text: managementPoints[0], icon: "fa-vial", gradient: "linear-gradient(135deg, #DBEAFE 0%, #EFF6FF 100%)", iconBg: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)", shadow: "rgba(59, 130, 246, 0.12)" },
                { text: managementPoints[1], icon: "fa-stethoscope", gradient: "linear-gradient(135deg, #CFFAFE 0%, #ECFEFF 100%)", iconBg: "linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)", shadow: "rgba(6, 182, 212, 0.12)" },
                { text: managementPoints[2], icon: "fa-pill", gradient: "linear-gradient(135deg, #DBEAFE 0%, #EFF6FF 100%)", iconBg: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)", shadow: "rgba(59, 130, 246, 0.12)" },
                { text: managementPoints[3], icon: "fa-heartbeat", gradient: "linear-gradient(135deg, #CCFBF1 0%, #DBEAFE 100%)", iconBg: "linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)", shadow: "rgba(20, 184, 166, 0.12)" }
              ];
'''

# Line numbers for insertion (0-indexed, so line 3476 is index 3475)
# We insert BEFORE const renderList, which is at line 3476 (index 3475)
lesson4_insert_index = 3475

# Insert Lesson 4 arrays
lines.insert(lesson4_insert_index, lesson4_arrays)
print(f"Inserted Lesson 4 arrays at line {lesson4_insert_index + 1}")

# Calculate new position for Lesson 5 (original line 3597 + lines added from lesson4_arrays)
# lesson4_arrays has about 23 lines
lesson4_line_count = len(lesson4_arrays.split('\n'))
lesson5_insert_index = 3596 + lesson4_line_count

# Insert Lesson 5 arrays
lines.insert(lesson5_insert_index, lesson5_arrays)
print(f"Inserted Lesson 5 arrays at line {lesson5_insert_index + 1}")

# Write back
with open('js/data.js', 'w', encoding='utf-8') as f:
    f.writelines(lines)

print("Successfully inserted all arrays into data.js!")
print(f"Total lines added: {lesson4_line_count + len(lesson5_arrays.split(','))}")
