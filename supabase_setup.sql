-- ElevX Assessment Responses Table Setup
-- Run this in your Supabase SQL editor

-- Create the assessment_responses table
CREATE TABLE IF NOT EXISTS assessment_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  stage1_personality JSONB,
  stage2_learning_style JSONB,
  stage3_skills JSONB,
  stage4_goals_motivation JSONB,
  stage5_mindset JSONB,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  total_score INTEGER,
  primary_goals TEXT,
  dominant_learning_style TEXT,
  limiting_belief_archetype TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_assessment_responses_user_id ON assessment_responses(user_id);
CREATE INDEX IF NOT EXISTS idx_assessment_responses_completed_at ON assessment_responses(completed_at);

-- Enable Row Level Security (RLS)
ALTER TABLE assessment_responses ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to only see their own assessment responses
CREATE POLICY "Users can view own assessment responses" ON assessment_responses
  FOR SELECT USING (auth.uid() = user_id);

-- Create policy to allow users to insert their own assessment responses
CREATE POLICY "Users can insert own assessment responses" ON assessment_responses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to update their own assessment responses
CREATE POLICY "Users can update own assessment responses" ON assessment_responses
  FOR UPDATE USING (auth.uid() = user_id);

-- Grant necessary permissions
GRANT ALL ON assessment_responses TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Optional: Create a view for easier querying of assessment results
CREATE OR REPLACE VIEW assessment_summary AS
SELECT 
  ar.id,
  ar.user_id,
  p.email,
  ar.completed_at,
  ar.total_score,
  ar.primary_goals,
  ar.dominant_learning_style,
  ar.limiting_belief_archetype,
  ar.stage1_personality->>'summary' as personality_summary,
  ar.stage2_learning_style->>'dominantStyle' as learning_style,
  ar.stage3_skills->>'strengths' as skill_strengths,
  ar.stage4_goals_motivation->>'motivationProfile' as motivation_profile
FROM assessment_responses ar
JOIN profiles p ON ar.user_id = p.id
ORDER BY ar.completed_at DESC;

-- Grant access to the view
GRANT SELECT ON assessment_summary TO authenticated;

