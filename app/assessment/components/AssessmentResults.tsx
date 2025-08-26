"use client";
import React, { useEffect, useState } from 'react';
import Button from '../../../components/Button';
import Card from '../../../components/Card';

interface AssessmentResultsProps {
  results: {
    stage1?: {
      scores: { [key: string]: number };
      summary: string;
      strongestPoles: string[];
      weakestPole: string;
    };
    stage2?: {
      scores: { [key: string]: number };
      dominantStyle: string;
      secondaryStyle: string;
    };
    stage3?: {
      scores: { [key: string]: number };
      strengths: string[];
      areasForGrowth: string[];
    };
    stage4?: {
      immediateGoals: {
        primary: string;
        secondary: string[];
      };
      motivationProfile: string;
      valueAlignment: string;
    };
    stage5?: {
      limitingBeliefArchetype: string;
      archetypeDescription: string;
      hiddenCost: string;
      firstStep: string;
    };
  };
  onStartJourney: () => void;
  user?: {
    id: string;
    email: string;
    created_at: string;
  };
}

export default function AssessmentResults({ results, onStartJourney, user }: AssessmentResultsProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  useEffect(() => {
    // Save assessment results to Supabase
    saveAssessmentResults();
  }, []);

  const saveAssessmentResults = async () => {
    if (!user) return;
    
    setIsSaving(true);
    setSaveStatus('saving');

    try {
      const { supabase } = await import('../../../lib/supabaseClient');
      
      // Save to assessment_responses table
      const { error } = await supabase
        .from('assessment_responses')
        .insert([
          {
            user_id: user.id,
            stage1_personality: results.stage1,
            stage2_learning_style: results.stage2,
            stage3_skills: results.stage3,
            stage4_goals_motivation: results.stage4,
            stage5_mindset: results.stage5,
            completed_at: new Date().toISOString(),
            total_score: calculateTotalScore(),
            primary_goals: results.stage4?.immediateGoals?.primary || '',
            dominant_learning_style: results.stage2?.dominantStyle || '',
            limiting_belief_archetype: results.stage5?.limitingBeliefArchetype || ''
          }
        ]);

      if (error) {
        console.error('Error saving assessment:', error);
        setSaveStatus('error');
      } else {
        setSaveStatus('success');
      }
    } catch (error) {
      console.error('Failed to save assessment:', error);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const calculateTotalScore = () => {
    let total = 0;
    
    // Add personality scores (0-100 each trait)
    if (results.stage1?.scores) {
      Object.values(results.stage1.scores).forEach((score: any) => {
        total += score;
      });
    }
    
    // Add learning style scores (0-100 each style)
    if (results.stage2?.scores) {
      Object.values(results.stage2.scores).forEach((score: any) => {
        total += score;
      });
    }
    
    // Add skills scores (0-10 each skill)
    if (results.stage3?.scores) {
      Object.values(results.stage3.scores).forEach((score: any) => {
        total += score * 10; // Convert to 0-100 scale
      });
    }
    
    return Math.round(total);
  };

  const generateFoundationPath = () => {
    const path = {
      focusAreas: [] as string[],
      learningApproach: '',
      dailyStructure: '',
      keyTechniques: [] as string[],
      milestones: [] as string[]
    };

    // Determine focus areas based on weakest skills
    if (results.stage3?.areasForGrowth) {
      path.focusAreas = results.stage3.areasForGrowth.slice(0, 2);
    }

    // Determine learning approach based on dominant style
    if (results.stage2?.dominantStyle) {
      const style = results.stage2.dominantStyle;
      if (style === 'V') {
        path.learningApproach = 'Visual-first learning with diagrams, mind maps, and visual progress tracking';
      } else if (style === 'A') {
        path.learningApproach = 'Audio-focused learning with voice notes, discussions, and verbal explanations';
      } else {
        path.learningApproach = 'Hands-on learning with practical exercises, role-playing, and immediate application';
      }
    }

    // Determine daily structure based on personality
    if (results.stage1?.scores?.C > 70) {
      path.dailyStructure = 'Structured daily routines with clear time blocks and progress tracking';
    } else {
      path.dailyStructure = 'Flexible daily structure with core habits and adaptive scheduling';
    }

    // Generate key techniques based on assessment results
    path.keyTechniques = [
      'Morning intention setting (5 minutes)',
      'Micro-learning sessions (10-15 minutes)',
      'Evening reflection and planning (5 minutes)',
      'Weekly progress review and adjustment'
    ];

    // Generate milestones
    path.milestones = [
      'Week 1: Establish core habits and routines',
      'Week 2: Complete first skill-building challenge',
      'Week 3: Apply learning to real-world situation',
      'Week 4: Reflect, celebrate progress, and plan next phase'
    ];

    return path;
  };

  const foundationPath = generateFoundationPath();

  const renderPersonalitySummary = () => {
    if (!results.stage1) return null;
    
    return (
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4 text-text-headings">Your Personality Profile</h3>
        <p className="text-text-body mb-4">{results.stage1.summary}</p>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.entries(results.stage1.scores).map(([trait, score]) => (
            <div key={trait} className="text-center">
              <div className="text-2xl font-bold text-primary-accent mb-1">{score}</div>
              <div className="text-sm text-text-muted uppercase">{trait}</div>
            </div>
          ))}
        </div>
        
                 <div className="mt-4 p-3 bg-primary-accent/10 rounded-lg">
          <p className="text-sm text-text-body">
            <strong>Strongest areas:</strong> {results.stage1.strongestPoles.join(', ')} | 
            <strong>Growth area:</strong> {results.stage1.weakestPole}
          </p>
        </div>
      </Card>
    );
  };

  const renderLearningStyle = () => {
    if (!results.stage2) return null;
    
    return (
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4 text-text-headings">Your Learning Style</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {Object.entries(results.stage2.scores).map(([style, score]) => (
            <div key={style} className="text-center p-3 bg-white/[0.02] rounded-lg">
                             <div className="text-2xl font-bold text-secondary-accent mb-1">{score}</div>
              <div className="text-sm text-text-muted">
                {style === 'V' ? 'Visual' : style === 'A' ? 'Auditory' : 'Kinesthetic'}
              </div>
            </div>
          ))}
        </div>
        <p className="text-text-body">
          <strong>Dominant style:</strong> {results.stage2.dominantStyle === 'V' ? 'Visual' : 
           results.stage2.dominantStyle === 'A' ? 'Auditory' : 'Kinesthetic'} | 
          <strong>Secondary:</strong> {results.stage2.secondaryStyle === 'V' ? 'Visual' : 
           results.stage2.secondaryStyle === 'A' ? 'Auditory' : 'Kinesthetic'}
        </p>
      </Card>
    );
  };

  const renderSkillsAssessment = () => {
    if (!results.stage3) return null;
    
    return (
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4 text-text-headings">Core Skills Assessment</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          {Object.entries(results.stage3.scores).map(([skill, score]) => (
            <div key={skill} className="text-center p-3 bg-white/[0.02] rounded-lg">
              <div className="text-2xl font-bold text-primary-accent mb-1">{score}/10</div>
              <div className="text-sm text-text-muted capitalize">{skill.replace(/([A-Z])/g, ' $1').trim()}</div>
            </div>
          ))}
        </div>
        
        {results.stage3.strengths.length > 0 && (
          <div className="mb-3 p-3 bg-status-success/10 rounded-lg">
            <p className="text-sm text-text-body">
              <strong>Strengths:</strong> {results.stage3.strengths.join(', ')}
            </p>
          </div>
        )}
        
        {results.stage3.areasForGrowth.length > 0 && (
          <div className="p-3 bg-primary-accent/10 rounded-lg">
            <p className="text-sm text-text-body">
              <strong>Focus areas:</strong> {results.stage3.areasForGrowth.join(', ')}
            </p>
          </div>
        )}
      </Card>
    );
  };

  const renderGoalsMotivation = () => {
    if (!results.stage4) return null;
    
    return (
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4 text-text-headings">Goals & Motivation</h3>
        <div className="space-y-3">
          <div>
            <strong className="text-text-headings">Primary Goal:</strong>
            <p className="text-text-body">{results.stage4.immediateGoals.primary}</p>
          </div>
          <div>
            <strong className="text-text-headings">Motivation Profile:</strong>
            <p className="text-text-body">{results.stage4.motivationProfile}</p>
          </div>
          <div>
            <strong className="text-text-headings">Core Values:</strong>
            <p className="text-text-body">{results.stage4.valueAlignment}</p>
          </div>
        </div>
      </Card>
    );
  };

  const renderMindsetProfile = () => {
    if (!results.stage5) return null;
    
    return (
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4 text-text-headings">Mindset Profile</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-primary-accent mb-2">{results.stage5.limitingBeliefArchetype}</h4>
            <p className="text-text-body mb-3">{results.stage5.archetypeDescription}</p>
          </div>
          
          <div className="p-3 bg-status-error/10 rounded-lg">
            <strong className="text-text-headings">Hidden Cost:</strong>
            <p className="text-text-body">{results.stage5.hiddenCost}</p>
          </div>
          
          <div className="p-3 bg-secondary-accent/10 rounded-lg">
            <strong className="text-text-headings">First Step:</strong>
            <p className="text-text-body">{results.stage5.firstStep}</p>
          </div>
        </div>
      </Card>
    );
  };

  const renderFoundationPath = () => (
           <Card className="p-6 bg-gradient-to-r from-primary-accent/10 to-secondary-accent/10 border border-primary-accent/20">
      <h3 className="text-2xl font-bold mb-6 text-text-headings text-center">Your 21-Day Foundation Path</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-semibold mb-3 text-text-headings">Focus Areas</h4>
          <div className="flex flex-wrap gap-2">
            {foundationPath.focusAreas.map((area, index) => (
              <span key={index} className="px-3 py-1 bg-primary-accent/20 text-primary-accent rounded-full text-sm">
                {area}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold mb-3 text-text-headings">Learning Approach</h4>
          <p className="text-text-body">{foundationPath.learningApproach}</p>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold mb-3 text-text-headings">Daily Structure</h4>
          <p className="text-text-body">{foundationPath.dailyStructure}</p>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold mb-3 text-text-headings">Key Techniques</h4>
          <ul className="space-y-2">
            {foundationPath.keyTechniques.map((technique, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span className="text-primary-accent">✓</span>
                <span className="text-text-body">{technique}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold mb-3 text-text-headings">Weekly Milestones</h4>
          <div className="space-y-2">
            {foundationPath.milestones.map((milestone, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-white/[0.02] rounded-lg">
                <div className="w-8 h-8 bg-secondary-accent rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                <span className="text-text-body">{milestone}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-primary-accent to-secondary-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-3xl">🎯</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-text-headings">
              Your Assessment Results
            </h1>
            <p className="text-text-muted text-lg">
              Personalized insights and your 21-Day Foundation Path
            </p>
          </div>

          {/* Save Status */}
          {saveStatus === 'saving' && (
            <div className="mb-6 p-4 bg-secondary-accent/10 border border-secondary-accent/20 rounded-lg text-center">
              <div className="flex items-center justify-center space-x-2">
                                 <div className="w-4 h-4 border-2 border-secondary-accent/30 border-t-secondary-accent rounded-full animate-spin"></div>
                <span className="text-text-body">Saving your results...</span>
              </div>
            </div>
          )}
          
          {saveStatus === 'success' && (
            <div className="mb-6 p-4 bg-status-success/10 border border-status-success/20 rounded-lg text-center">
              <span className="text-status-success">✅ Your assessment results have been saved!</span>
            </div>
          )}
          
          {saveStatus === 'error' && (
            <div className="mb-6 p-4 bg-status-error/10 border border-status-error/20 rounded-lg text-center">
              <span className="text-status-error">⚠️ There was an issue saving your results. They're still available below.</span>
            </div>
          )}

          {/* Results Sections */}
          <div className="space-y-6 mb-8">
            {renderPersonalitySummary()}
            {renderLearningStyle()}
            {renderSkillsAssessment()}
            {renderGoalsMotivation()}
            {renderMindsetProfile()}
          </div>

          {/* Foundation Path */}
          {renderFoundationPath()}

          {/* Action Buttons */}
          <div className="mt-8 text-center space-y-4">
            <Button
              onClick={onStartJourney}
              variant="primary"
              size="lg"
              className="shadow-glow-primary-hover px-8 py-4 text-lg"
            >
              Start My Journey
            </Button>
            
            <p className="text-text-muted text-sm">
              Your personalized learning path is ready. Click above to begin your 21-day foundation journey!
            </p>
          </div>

          {/* Additional Info */}
          <div className="mt-12 p-6 bg-white/[0.02] rounded-2xl">
            <h3 className="text-lg font-semibold mb-4 text-text-headings">What Happens Next?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                     <span className="text-primary-accent text-xl">📚</span>
                </div>
                <h4 className="font-medium text-text-headings mb-2">Daily Lessons</h4>
                <p className="text-text-muted text-sm">10-15 minute focused sessions tailored to your learning style</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-secondary-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                     <span className="text-secondary-accent text-xl">📊</span>
                </div>
                <h4 className="font-medium text-text-headings mb-2">Progress Tracking</h4>
                <p className="text-text-muted text-sm">Visual progress indicators and milestone celebrations</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-accent/20 to-secondary-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                     <span className="text-primary-accent text-xl">🎯</span>
                </div>
                <h4 className="font-medium text-text-headings mb-2">Real Application</h4>
                <p className="text-text-muted text-sm">Practical exercises that apply to your specific goals</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
