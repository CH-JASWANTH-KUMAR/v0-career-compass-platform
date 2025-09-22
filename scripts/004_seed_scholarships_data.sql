-- Insert comprehensive scholarship data for Indian students

INSERT INTO public.scholarships (
  name, provider, scholarship_type, amount, amount_type, eligibility_criteria,
  application_deadline, application_link, documents_required, applicable_states,
  applicable_courses, income_limit, academic_requirement, description, contact_info
) VALUES
-- Central Government Scholarships
(
  'Prime Minister Scholarship Scheme', 'Government of India', 'Merit', 25000, 'Annual',
  'Children/widows of Ex-Servicemen, Ex-Coast Guard personnel, and Police personnel',
  '2024-10-31', 'https://scholarships.gov.in', 
  ARRAY['Income Certificate', 'Caste Certificate', 'Mark Sheets', 'Bank Details'],
  ARRAY['All States'], ARRAY['All UG Courses'], 800000,
  'Minimum 60% in 12th standard', 
  'Scholarship for higher education of children and widows of Ex-Servicemen',
  'scholarships@gov.in'
),
(
  'National Scholarship Portal - SC/ST', 'Ministry of Social Justice', 'SC/ST', 20000, 'Annual',
  'Students belonging to SC/ST category pursuing higher education',
  '2024-11-30', 'https://scholarships.gov.in',
  ARRAY['Caste Certificate', 'Income Certificate', 'Mark Sheets', 'Admission Receipt'],
  ARRAY['All States'], ARRAY['All UG/PG Courses'], 250000,
  'Minimum 50% in previous qualifying exam',
  'Financial assistance for SC/ST students in higher education',
  'scst.scholarship@gov.in'
),
(
  'National Scholarship Portal - OBC', 'Ministry of Social Justice', 'OBC', 15000, 'Annual',
  'Students belonging to OBC (Non-Creamy Layer) category',
  '2024-11-30', 'https://scholarships.gov.in',
  ARRAY['OBC Certificate', 'Income Certificate', 'Mark Sheets', 'Non-Creamy Layer Certificate'],
  ARRAY['All States'], ARRAY['All UG/PG Courses'], 100000,
  'Minimum 50% in previous qualifying exam',
  'Financial support for OBC students pursuing higher education',
  'obc.scholarship@gov.in'
),
(
  'National Scholarship Portal - Minority', 'Ministry of Minority Affairs', 'Minority', 20000, 'Annual',
  'Students belonging to minority communities (Muslim, Christian, Sikh, Buddhist, Jain, Parsi)',
  '2024-12-15', 'https://scholarships.gov.in',
  ARRAY['Minority Certificate', 'Income Certificate', 'Mark Sheets', 'Admission Receipt'],
  ARRAY['All States'], ARRAY['All UG/PG Courses'], 200000,
  'Minimum 50% in previous qualifying exam',
  'Scholarship for students from minority communities',
  'minority.scholarship@gov.in'
),

-- State Government Scholarships
(
  'Delhi Government Scholarship', 'Government of Delhi', 'Merit', 5000, 'Annual',
  'Students domiciled in Delhi pursuing higher education',
  '2024-09-30', 'https://delhi.gov.in/scholarships',
  ARRAY['Domicile Certificate', 'Income Certificate', 'Mark Sheets', 'Bank Details'],
  ARRAY['Delhi'], ARRAY['All UG/PG Courses'], 600000,
  'Minimum 60% in 12th standard',
  'State scholarship for Delhi students',
  'scholarship@delhi.gov.in'
),
(
  'Maharashtra Government Scholarship', 'Government of Maharashtra', 'Need-based', 8000, 'Annual',
  'Students from Maharashtra pursuing professional courses',
  '2024-10-15', 'https://mahadbt.maharashtra.gov.in',
  ARRAY['Domicile Certificate', 'Income Certificate', 'Caste Certificate', 'Mark Sheets'],
  ARRAY['Maharashtra'], ARRAY['Engineering', 'Medical', 'Management'], 800000,
  'Minimum 50% in qualifying exam',
  'State scholarship for professional courses in Maharashtra',
  'scholarship@maharashtra.gov.in'
),
(
  'Tamil Nadu Government Scholarship', 'Government of Tamil Nadu', 'Merit', 10000, 'Annual',
  'Students from Tamil Nadu with excellent academic record',
  '2024-11-01', 'https://tnscholarship.gov.in',
  ARRAY['Domicile Certificate', 'Income Certificate', 'Mark Sheets', 'Community Certificate'],
  ARRAY['Tamil Nadu'], ARRAY['All UG/PG Courses'], 500000,
  'Minimum 70% in 12th standard',
  'Merit-based scholarship for Tamil Nadu students',
  'scholarship@tn.gov.in'
),

-- Private Scholarships
(
  'Tata Scholarship', 'Tata Trusts', 'Merit', 200000, 'Annual',
  'Meritorious students from economically weaker sections',
  '2024-08-31', 'https://www.tatatrusts.org/scholarships',
  ARRAY['Income Certificate', 'Mark Sheets', 'Recommendation Letters', 'Essay'],
  ARRAY['All States'], ARRAY['Engineering', 'Medical', 'Management'], 400000,
  'Minimum 85% in 12th standard',
  'Comprehensive scholarship covering tuition and living expenses',
  'scholarships@tatatrusts.org'
),
(
  'Reliance Foundation Scholarship', 'Reliance Foundation', 'Merit', 100000, 'Annual',
  'Undergraduate students in engineering and other professional courses',
  '2024-07-31', 'https://www.reliancefoundation.org/scholarships',
  ARRAY['Academic Records', 'Income Certificate', 'Entrance Exam Scores'],
  ARRAY['All States'], ARRAY['Engineering', 'Medical', 'Science'], 600000,
  'JEE/NEET qualified or equivalent',
  'Supporting bright students in professional education',
  'scholarships@reliancefoundation.org'
),
(
  'Aditya Birla Scholarship', 'Aditya Birla Group', 'Merit', 175000, 'Annual',
  'Students admitted to premier institutions like IITs, IIMs, BITS',
  '2024-09-15', 'https://www.adityabirla.com/scholarships',
  ARRAY['Admission Letter', 'Academic Records', 'Income Certificate', 'Essays'],
  ARRAY['All States'], ARRAY['Engineering', 'Management'], 800000,
  'Admission to premier institutions',
  'Excellence scholarship for top-tier institution students',
  'scholarships@adityabirla.com'
),

-- Special Category Scholarships
(
  'Girl Child Education Scholarship', 'Various NGOs', 'General', 15000, 'Annual',
  'Female students pursuing higher education',
  '2024-10-31', 'https://girlchildeducation.org',
  ARRAY['Gender Certificate', 'Academic Records', 'Income Certificate'],
  ARRAY['All States'], ARRAY['All UG Courses'], 300000,
  'Minimum 60% in 12th standard',
  'Promoting higher education among girls',
  'info@girlchildeducation.org'
),
(
  'Physically Challenged Students Scholarship', 'Ministry of Social Justice', 'General', 20000, 'Annual',
  'Students with physical disabilities pursuing higher education',
  '2024-11-30', 'https://scholarships.gov.in',
  ARRAY['Disability Certificate', 'Medical Certificate', 'Academic Records', 'Income Certificate'],
  ARRAY['All States'], ARRAY['All UG/PG Courses'], 500000,
  'Minimum 50% in qualifying exam',
  'Supporting education of physically challenged students',
  'disability.scholarship@gov.in'
),
(
  'Sports Scholarship', 'Sports Authority of India', 'Sports', 50000, 'Annual',
  'Students who are national/state level sports players',
  '2024-08-15', 'https://sai.gov.in/scholarships',
  ARRAY['Sports Certificates', 'Performance Records', 'Academic Records', 'Coach Recommendation'],
  ARRAY['All States'], ARRAY['All UG Courses'], 1000000,
  'Minimum 50% in academics + Sports achievements',
  'Supporting student athletes in higher education',
  'sports.scholarship@sai.gov.in'
);
