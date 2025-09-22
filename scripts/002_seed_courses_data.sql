-- Insert comprehensive course data based on Indian education system

-- Engineering Courses
INSERT INTO public.courses (course_code, course_name, course_type, duration_years, stream, specialization, description, eligibility_criteria, career_prospects, average_salary_range) VALUES
('BE_CSE', 'Bachelor of Engineering - Computer Science', 'UG', 4, 'Engineering', 'Computer Science', 'Comprehensive program covering programming, algorithms, data structures, software engineering, and emerging technologies', '10+2 with Physics, Chemistry, Mathematics. Minimum 75% aggregate', ARRAY['Software Developer', 'Data Scientist', 'System Analyst', 'Cybersecurity Specialist', 'AI/ML Engineer'], '₹4-15 LPA'),
('BE_ECE', 'Bachelor of Engineering - Electronics & Communication', 'UG', 4, 'Engineering', 'Electronics', 'Focus on electronic devices, communication systems, signal processing, and embedded systems', '10+2 with PCM. Minimum 75% aggregate', ARRAY['Electronics Engineer', 'Telecom Engineer', 'VLSI Designer', 'Embedded Systems Developer'], '₹3-12 LPA'),
('BE_MECH', 'Bachelor of Engineering - Mechanical', 'UG', 4, 'Engineering', 'Mechanical', 'Study of mechanical systems, thermodynamics, manufacturing, and design engineering', '10+2 with PCM. Minimum 75% aggregate', ARRAY['Mechanical Engineer', 'Design Engineer', 'Manufacturing Engineer', 'Automotive Engineer'], '₹3-10 LPA'),
('BE_CIVIL', 'Bachelor of Engineering - Civil', 'UG', 4, 'Engineering', 'Civil', 'Infrastructure development, construction management, structural design, and urban planning', '10+2 with PCM. Minimum 75% aggregate', ARRAY['Civil Engineer', 'Structural Engineer', 'Construction Manager', 'Urban Planner'], '₹3-8 LPA'),

-- Medical Courses
('MBBS', 'Bachelor of Medicine and Bachelor of Surgery', 'UG', 5.5, 'Medical', 'General Medicine', 'Comprehensive medical education covering anatomy, physiology, pathology, and clinical practice', '10+2 with PCB. NEET qualification mandatory', ARRAY['Doctor', 'Medical Officer', 'Specialist (after PG)', 'Medical Researcher'], '₹6-25 LPA'),
('BDS', 'Bachelor of Dental Surgery', 'UG', 5, 'Medical', 'Dentistry', 'Dental care, oral health, dental surgery, and orthodontics', '10+2 with PCB. NEET qualification mandatory', ARRAY['Dentist', 'Oral Surgeon', 'Orthodontist', 'Dental Consultant'], '₹4-15 LPA'),
('BAMS', 'Bachelor of Ayurvedic Medicine and Surgery', 'UG', 5.5, 'Medical', 'Ayurveda', 'Traditional Indian medicine system with modern medical knowledge', '10+2 with PCB. NEET qualification mandatory', ARRAY['Ayurvedic Doctor', 'Wellness Consultant', 'Research Scientist', 'Healthcare Administrator'], '₹3-12 LPA'),

-- Science Courses
('BSC_PHY', 'Bachelor of Science - Physics', 'UG', 3, 'Science', 'Physics', 'Fundamental physics concepts, quantum mechanics, and applied physics', '10+2 with PCM. Minimum 60% aggregate', ARRAY['Research Scientist', 'Physics Teacher', 'Lab Technician', 'Technical Writer'], '₹2-8 LPA'),
('BSC_CHEM', 'Bachelor of Science - Chemistry', 'UG', 3, 'Science', 'Chemistry', 'Organic, inorganic, and physical chemistry with laboratory experience', '10+2 with PCM/PCB. Minimum 60% aggregate', ARRAY['Chemist', 'Quality Control Analyst', 'Research Associate', 'Chemical Engineer'], '₹2-10 LPA'),
('BSC_MATH', 'Bachelor of Science - Mathematics', 'UG', 3, 'Science', 'Mathematics', 'Pure and applied mathematics, statistics, and computational methods', '10+2 with Mathematics. Minimum 60% aggregate', ARRAY['Data Analyst', 'Statistician', 'Mathematics Teacher', 'Actuary'], '₹3-12 LPA'),
('BSC_BIO', 'Bachelor of Science - Biology', 'UG', 3, 'Science', 'Biology', 'Life sciences, genetics, ecology, and biotechnology', '10+2 with PCB. Minimum 60% aggregate', ARRAY['Biologist', 'Research Assistant', 'Lab Technician', 'Environmental Consultant'], '₹2-8 LPA'),

-- Commerce Courses
('BCOM', 'Bachelor of Commerce', 'UG', 3, 'Commerce', 'General Commerce', 'Accounting, finance, business law, and economics', '10+2 with Commerce/any stream. Minimum 50% aggregate', ARRAY['Accountant', 'Financial Analyst', 'Tax Consultant', 'Business Analyst'], '₹2-8 LPA'),
('BBA', 'Bachelor of Business Administration', 'UG', 3, 'Commerce', 'Business Administration', 'Management principles, marketing, human resources, and entrepreneurship', '10+2 any stream. Minimum 50% aggregate', ARRAY['Business Manager', 'Marketing Executive', 'HR Executive', 'Entrepreneur'], '₹3-10 LPA'),
('CA', 'Chartered Accountancy', 'Professional', 3, 'Commerce', 'Accounting', 'Professional accounting, auditing, taxation, and financial management', '10+2 any stream. CA Foundation exam', ARRAY['Chartered Accountant', 'Financial Advisor', 'Tax Consultant', 'Audit Manager'], '₹6-25 LPA'),

-- Arts & Humanities
('BA_ENG', 'Bachelor of Arts - English Literature', 'UG', 3, 'Arts', 'Literature', 'English literature, language studies, and communication skills', '10+2 any stream. Minimum 50% aggregate', ARRAY['Content Writer', 'Journalist', 'Teacher', 'Editor'], '₹2-8 LPA'),
('BA_HIST', 'Bachelor of Arts - History', 'UG', 3, 'Arts', 'History', 'Historical studies, research methodology, and cultural analysis', '10+2 any stream. Minimum 50% aggregate', ARRAY['Historian', 'Museum Curator', 'Archivist', 'Civil Services'], '₹2-10 LPA'),
('BA_POL', 'Bachelor of Arts - Political Science', 'UG', 3, 'Arts', 'Political Science', 'Political systems, governance, international relations, and public policy', '10+2 any stream. Minimum 50% aggregate', ARRAY['Civil Servant', 'Political Analyst', 'Diplomat', 'Policy Researcher'], '₹3-15 LPA'),
('BA_PSY', 'Bachelor of Arts - Psychology', 'UG', 3, 'Arts', 'Psychology', 'Human behavior, mental processes, and psychological research', '10+2 any stream. Minimum 50% aggregate', ARRAY['Psychologist', 'Counselor', 'HR Specialist', 'Research Analyst'], '₹2-12 LPA'),

-- Law Courses
('LLB', 'Bachelor of Laws', 'UG', 3, 'Law', 'General Law', 'Legal studies, constitutional law, criminal law, and civil procedures', 'Graduation in any discipline', ARRAY['Lawyer', 'Legal Advisor', 'Judge', 'Legal Consultant'], '₹3-20 LPA'),
('BA_LLB', 'Bachelor of Arts + Bachelor of Laws', 'UG', 5, 'Law', 'Integrated Law', 'Combined arts and legal education', '10+2 any stream. Minimum 50% aggregate', ARRAY['Lawyer', 'Corporate Legal Advisor', 'Judicial Services', 'Legal Researcher'], '₹4-25 LPA'),

-- Postgraduate Courses
('MBA', 'Master of Business Administration', 'PG', 2, 'Management', 'Business Management', 'Advanced business management, strategy, and leadership', 'Graduation + CAT/MAT/XAT/GMAT', ARRAY['Manager', 'Consultant', 'Business Analyst', 'Entrepreneur'], '₹6-30 LPA'),
('MCA', 'Master of Computer Applications', 'PG', 3, 'Computer Science', 'Computer Applications', 'Advanced programming, software development, and system analysis', 'BCA/BSc with Mathematics', ARRAY['Software Developer', 'System Analyst', 'Database Administrator', 'IT Consultant'], '₹4-15 LPA'),
('MSC_CS', 'Master of Science - Computer Science', 'PG', 2, 'Science', 'Computer Science', 'Advanced computer science concepts and research', 'BSc Computer Science/IT/Mathematics', ARRAY['Research Scientist', 'Software Architect', 'Data Scientist', 'Academic'], '₹5-18 LPA');
