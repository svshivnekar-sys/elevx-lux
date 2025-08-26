"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import AuthGuard from '../../components/AuthGuard';
import AssessmentStage1 from './components/AssessmentStage1';
import AssessmentStage2 from './components/AssessmentStage2';
import AssessmentStage3 from './components/AssessmentStage3';
import AssessmentStage4 from './components/AssessmentStage4';
import AssessmentStage5 from './components/AssessmentStage5';
import AssessmentResults from './components/AssessmentResults';

interface AssessmentData {
  stage1: any;
  stage2: any;
  stage3: any;
  stage4: any;
  stage5: any;
}

interface AssessmentPageProps {
  user?: {
    id: string;
    email: string;
    created_at: string;
  };
}

function AssessmentContent({ user }: AssessmentPageProps) {
  const [currentStage, setCurrentStage] = useState(1);
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    stage1: null,
    stage2: null,
    stage3: null,
    stage4: null,
    stage5: null
  });
  const [isComplete, setIsComplete] = useState(false);
  const [results, setResults] = useState<any>(null);
  const router = useRouter();

  const handleStageComplete = (stageNumber: number, data: any) => {
    setAssessmentData(prev => ({
      ...prev,
      [`stage${stageNumber}`]: data
    }));

    if (stageNumber < 5) {
      setCurrentStage(stageNumber + 1);
    } else {
      // Calculate final results
      const finalResults = calculateResults({
        ...assessmentData,
        [`stage${stageNumber}`]: data
      });
      setResults(finalResults);
      setIsComplete(true);
    }
  };

  const calculateResults = (data: AssessmentData) => {
    // Return the complete assessment data for results processing
    return {
      stage1: data.stage1,
      stage2: data.stage2,
      stage3: data.stage3,
      stage4: data.stage4,
      stage5: data.stage5
    };
  };

  const handleStartJourney = () => {
    router.push('/dashboard');
  };

  if (isComplete && results) {
    return (
      <AssessmentResults 
        results={results} 
        onStartJourney={handleStartJourney}
        user={user}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Progress Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-4 text-text-headings">
                ElevX Assessment
              </h1>
              <p className="text-text-muted mb-6">
                Discover your personalized learning path in just 15 minutes
              </p>
              
              {/* Progress Bar */}
              <div className="w-full bg-white/[0.05] rounded-full h-3 mb-4">
                <div 
                  className="bg-gradient-to-r from-primary-accent to-secondary-accent h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(currentStage / 5) * 100}%` }}
                ></div>
              </div>
              
              <p className="text-sm text-text-muted">
                Step {currentStage} of 5
              </p>
            </div>

            {/* Stage Content */}
            <div className="min-h-[600px]">
              {currentStage === 1 && (
                <AssessmentStage1 onComplete={handleStageComplete} />
              )}
              {currentStage === 2 && (
                <AssessmentStage2 onComplete={handleStageComplete} />
              )}
              {currentStage === 3 && (
                <AssessmentStage3 onComplete={handleStageComplete} />
              )}
              {currentStage === 4 && (
                <AssessmentStage4 onComplete={handleStageComplete} />
              )}
              {currentStage === 5 && (
                <AssessmentStage5 onComplete={handleStageComplete} />
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default function AssessmentPage() {
  return (
    <AuthGuard>
      <AssessmentContent />
    </AuthGuard>
  );
}
