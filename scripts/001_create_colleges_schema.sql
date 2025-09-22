-- Create comprehensive colleges database schema with real data structure
-- Based on UGC, AICTE, and NIRF data requirements

-- Colleges table with comprehensive information
CREATE TABLE IF NOT EXISTS public.colleges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  short_name TEXT,
  established_year INTEGER,
  college_type TEXT CHECK (college_type IN ('Government', 'Private', 'Deemed', 'Autonomous')),
  affiliation TEXT,
  university_name TEXT,
  
  -- Location details
  address TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  pincode TEXT,
  district TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  -- Contact information
  phone TEXT,
  email TEXT,
  website TEXT,
  
  -- Accreditation and rankings
  naac_grade TEXT CHECK (naac_grade IN ('A++', 'A+', 'A', 'B++', 'B+', 'B', 'C', 'Not Accredited')),
  naac_score DECIMAL(3, 2),
  nirf_rank INTEGER,
  nirf_category TEXT,
  aicte_approved BOOLEAN DEFAULT false,
  ugc_approved BOOLEAN DEFAULT false,
  
  -- Infrastructure
  campus_area DECIMAL(10, 2), -- in acres
  total_faculty INTEGER,
  student_capacity INTEGER,
  hostel_capacity INTEGER,
  library_books INTEGER,
  
  -- Academic information
  courses_offered TEXT[], -- Array of course codes
  specializations TEXT[],
  admission_process TEXT,
  entrance_exams TEXT[],
  
  -- Placement data
  placement_percentage DECIMAL(5, 2),
  average_package DECIMAL(10, 2),
  highest_package DECIMAL(10, 2),
  top_recruiters TEXT[],
  
  -- Fees structure
  tuition_fee_annual DECIMAL(10, 2),
  hostel_fee_annual DECIMAL(10, 2),
  other_fees_annual DECIMAL(10, 2),
  
  -- Additional metadata
  description TEXT,
  facilities TEXT[],
  notable_alumni TEXT[],
  achievements TEXT[],
  
  -- Data source tracking
  data_source TEXT DEFAULT 'manual',
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  verified BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Courses table for detailed course information
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_code TEXT UNIQUE NOT NULL,
  course_name TEXT NOT NULL,
  course_type TEXT CHECK (course_type IN ('UG', 'PG', 'Diploma', 'Certificate', 'PhD')),
  duration_years DECIMAL(3, 1),
  stream TEXT NOT NULL, -- Science, Commerce, Arts, Engineering, etc.
  specialization TEXT,
  description TEXT,
  eligibility_criteria TEXT,
  career_prospects TEXT[],
  average_salary_range TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- College-Course mapping table
CREATE TABLE IF NOT EXISTS public.college_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  college_id UUID REFERENCES public.colleges(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  seats_available INTEGER,
  fees_annual DECIMAL(10, 2),
  admission_criteria TEXT,
  cutoff_marks DECIMAL(5, 2),
  entrance_exam TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(college_id, course_id)
);

-- Scholarships table
CREATE TABLE IF NOT EXISTS public.scholarships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  provider TEXT NOT NULL, -- Government, Private, College
  scholarship_type TEXT CHECK (scholarship_type IN ('Merit', 'Need-based', 'Sports', 'Minority', 'SC/ST', 'OBC', 'General')),
  amount DECIMAL(10, 2),
  amount_type TEXT CHECK (amount_type IN ('One-time', 'Annual', 'Full-tuition', 'Partial')),
  eligibility_criteria TEXT NOT NULL,
  application_deadline DATE,
  application_link TEXT,
  documents_required TEXT[],
  applicable_states TEXT[],
  applicable_courses TEXT[],
  income_limit DECIMAL(10, 2),
  academic_requirement TEXT,
  description TEXT,
  contact_info TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User profiles table for personalized recommendations
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  date_of_birth DATE,
  gender TEXT CHECK (gender IN ('Male', 'Female', 'Other', 'Prefer not to say')),
  
  -- Academic information
  current_class TEXT,
  board TEXT, -- CBSE, ICSE, State Board
  school_name TEXT,
  city TEXT,
  state TEXT,
  
  -- Family background
  father_occupation TEXT,
  mother_occupation TEXT,
  family_income_range TEXT,
  first_generation_student BOOLEAN DEFAULT false,
  
  -- Preferences and interests
  preferred_streams TEXT[],
  career_interests TEXT[],
  preferred_locations TEXT[],
  budget_range TEXT,
  
  -- Quiz results
  aptitude_scores JSONB, -- Store quiz results as JSON
  recommended_stream TEXT,
  personality_type TEXT,
  
  -- Tracking
  profile_completed BOOLEAN DEFAULT false,
  quiz_completed BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User saved colleges and comparisons
CREATE TABLE IF NOT EXISTS public.user_saved_colleges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  college_id UUID REFERENCES public.colleges(id) ON DELETE CASCADE,
  saved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  notes TEXT,
  UNIQUE(user_id, college_id)
);

-- User scholarship applications tracking
CREATE TABLE IF NOT EXISTS public.user_scholarship_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  scholarship_id UUID REFERENCES public.scholarships(id) ON DELETE CASCADE,
  application_status TEXT CHECK (application_status IN ('Draft', 'Submitted', 'Under Review', 'Approved', 'Rejected')) DEFAULT 'Draft',
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  notes TEXT,
  UNIQUE(user_id, scholarship_id)
);

-- Enable Row Level Security
ALTER TABLE public.colleges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.college_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scholarships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_saved_colleges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_scholarship_applications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for public data (colleges, courses, scholarships) - readable by all
CREATE POLICY "colleges_select_all" ON public.colleges FOR SELECT USING (true);
CREATE POLICY "courses_select_all" ON public.courses FOR SELECT USING (true);
CREATE POLICY "college_courses_select_all" ON public.college_courses FOR SELECT USING (true);
CREATE POLICY "scholarships_select_all" ON public.scholarships FOR SELECT USING (true);

-- RLS Policies for user-specific data
CREATE POLICY "user_profiles_select_own" ON public.user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "user_profiles_insert_own" ON public.user_profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "user_profiles_update_own" ON public.user_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "user_profiles_delete_own" ON public.user_profiles FOR DELETE USING (auth.uid() = id);

CREATE POLICY "user_saved_colleges_select_own" ON public.user_saved_colleges FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "user_saved_colleges_insert_own" ON public.user_saved_colleges FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "user_saved_colleges_update_own" ON public.user_saved_colleges FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "user_saved_colleges_delete_own" ON public.user_saved_colleges FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "user_scholarship_applications_select_own" ON public.user_scholarship_applications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "user_scholarship_applications_insert_own" ON public.user_scholarship_applications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "user_scholarship_applications_update_own" ON public.user_scholarship_applications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "user_scholarship_applications_delete_own" ON public.user_scholarship_applications FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_colleges_city_state ON public.colleges(city, state);
CREATE INDEX idx_colleges_college_type ON public.colleges(college_type);
CREATE INDEX idx_colleges_nirf_rank ON public.colleges(nirf_rank) WHERE nirf_rank IS NOT NULL;
CREATE INDEX idx_colleges_naac_grade ON public.colleges(naac_grade);
CREATE INDEX idx_courses_stream ON public.courses(stream);
CREATE INDEX idx_courses_course_type ON public.courses(course_type);
CREATE INDEX idx_scholarships_active ON public.scholarships(active) WHERE active = true;
CREATE INDEX idx_scholarships_deadline ON public.scholarships(application_deadline) WHERE application_deadline >= CURRENT_DATE;
