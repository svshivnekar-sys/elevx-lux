"use client";
import React, { useState } from 'react';
import Button from '../../../components/Button';
import Card from '../../../components/Card';

interface Stage5Data {
  responses: { [key: string]: string };
  limitingBeliefArchetype: string;
  archetypeDescription: string;
  hiddenCost: string;
  firstStep: string;
  mindsetProfile: string;
}

interface AssessmentStage5Props {
  onComplete: (stageNumber: number, data: Stage5Data) => void;
}

export default function AssessmentStage5({ onComplete }: AssessmentStage5Props) {
  const [responses, setResponses] = useState<Stage5Data>({
    responses: {},
    limitingBeliefArchetype: '',
    archetypeDescription: '',
    hiddenCost: '',
    firstStep: '',
    mindsetProfile: ''
  });

  const questions = [
    {
      id: 'Q1',
      text: 'When you\'re close to making progress on something important, what tends to happen most often?',
      options: [
        'I get distracted or lose focus.',
        'I start doubting whether I can actually do it.',
        'I keep overthinking and never make a move.',
        'I find myself suddenly prioritizing something else.',
        'I work on it but never finish because it\'s "not perfect yet."'
      ]
    },
    {
      id: 'Q2',
      text: 'Which of these thoughts have you caught yourself thinking when imagining success?',
      options: [
        '"What if I can\'t handle it once I get there?"',
        '"People might expect too much from me."',
        '"I\'ll lose something important if I change too much."',
        '"I might fail and prove everyone (including myself) right."',
        '"What if I\'m not as good as people think?"'
      ]
    },
    {
      id: 'Q3',
      text: 'When you know what needs to be done but still can\'t do it, what\'s usually the main reason?',
      options: [
        'I feel mentally or emotionally exhausted before I start.',
        'I\'m not sure if it\'s worth the effort.',
        'I don\'t have the right support or environment.',
        'I\'m scared of wasting time and failing.',
        'I get overwhelmed and shut down.'
      ]
    },
    {
      id: 'Q4',
      text: 'Which sentence feels most like the voice in your head?',
      options: [
        '"You\'re not ready yet — wait a bit longer."',
        '"Others can do this better than you."',
        '"Don\'t mess this up — it has to be perfect."',
        '"You\'re going to embarrass yourself."',
        '"If it\'s not urgent, you can do it later."'
      ]
    },
    {
      id: 'Q5',
      text: 'When something feels risky or unclear…',
      options: [
        'I avoid it until it becomes unavoidable.',
        'I try to control every detail before acting.',
        'I ask for too many opinions and get stuck.',
        'I start but quickly lose interest.',
        'I go ahead impulsively and then regret it.'
      ]
    },
    {
      id: 'Q6',
      text: 'At the deepest level, which statement feels truest (even if you don\'t like admitting it)?',
      options: [
        'I\'m not capable enough to succeed without help.',
        'Good things don\'t usually last for me.',
        'If I try my best and fail, it means I\'m a failure.',
        'I\'m behind where I should be in life.',
        'I\'m not as disciplined as successful people.'
      ]
    },
    {
      id: 'Q7',
      text: 'Which situation hits you the hardest emotionally?',
      options: [
        'Seeing others succeed while I\'m stuck.',
        'Getting negative feedback.',
        'Feeling like my effort isn\'t appreciated.',
        'Not knowing what\'s going to happen next.',
        'Being asked to prove myself again and again.'
      ]
    },
    {
      id: 'Q8',
      text: 'When you think about changing your habits or approach, what\'s the first emotion you feel?',
      options: [
        'Anxiety — I might lose control.',
        'Frustration — it feels too slow.',
        'Hopelessness — I\'ve tried before and failed.',
        'Overwhelm — there\'s too much to fix.',
        'Skepticism — will it even work?'
      ]
    }
  ];

  const handleAnswer = (questionId: string, answer: string) => {
    setResponses(prev => ({
      ...prev,
      responses: { ...prev.responses, [questionId]: answer }
    }));
  };

  const canProceed = () => {
    return Object.keys(responses.responses).length === questions.length;
  };

  const handleComplete = () => {
    const finalData = calculateFinalProfile();
    onComplete(5, finalData);
  };

  const calculateFinalProfile = (): Stage5Data => {
    // Analyze responses to determine limiting belief archetype
    const responsePatterns = Object.values(responses.responses);
    
    let archetype = '';
    let description = '';
    let hiddenCost = '';
    let firstStep = '';
    let mindsetProfile = '';

    // Simple pattern matching based on common responses
    const perfectionistCount = responsePatterns.filter(r => 
      r.includes('perfect') || r.includes('not ready') || r.includes('control every detail')
    ).length;

    const procrastinatorCount = responsePatterns.filter(r => 
      r.includes('distracted') || r.includes('prioritizing something else') || r.includes('not urgent')
    ).length;

    const imposterCount = responsePatterns.filter(r => 
      r.includes('not capable') || r.includes('not as good') || r.includes('prove myself')
    ).length;

    const overthinkerCount = responsePatterns.filter(r => 
      r.includes('overthinking') || r.includes('too many opinions') || r.includes('what if')
    ).length;

    if (perfectionistCount >= 2) {
      archetype = 'The "Almost There" Perfectionist';
      description = 'You have high standards and want everything to be just right before you move forward. This often means you never quite finish because it\'s never quite perfect enough.';
      hiddenCost = 'You miss opportunities and deadlines while waiting for perfection. Your work may be excellent, but it rarely sees the light of day.';
      firstStep = 'Set a "good enough" deadline and commit to shipping something, even if it\'s not perfect. You can always iterate and improve.';
      mindsetProfile = 'Perfectionist';
    } else if (procrastinatorCount >= 2) {
      archetype = 'The Cycle Starter';
      description = 'You\'re great at starting projects and getting excited about new ideas, but you struggle to maintain momentum and finish what you start.';
      hiddenCost = 'You have many half-finished projects and a growing sense of frustration about not completing things. This can hurt your confidence and credibility.';
      firstStep = 'Choose ONE project to focus on completely. Break it into tiny, manageable steps and commit to finishing it before starting anything new.';
      mindsetProfile = 'Procrastinator';
    } else if (imposterCount >= 2) {
      archetype = 'The Invisible Warrior';
      description = 'You work hard and achieve results, but you struggle to recognize your own accomplishments and often feel like you don\'t deserve success.';
      hiddenCost = 'You may be passing up opportunities for advancement or recognition because you don\'t believe you\'re qualified or deserving.';
      firstStep = 'Start keeping a "wins journal" where you record your accomplishments daily. Practice accepting compliments without deflecting them.';
      mindsetProfile = 'Imposter Syndrome';
    } else if (overthinkerCount >= 2) {
      archetype = 'The Overthinking Strategist';
      description = 'You analyze situations thoroughly and want to make the best possible decision, but sometimes you get stuck in analysis paralysis.';
      hiddenCost = 'You may miss time-sensitive opportunities while gathering more information, and the stress of constant analysis can be exhausting.';
      firstStep = 'Set a timer for decision-making. Give yourself 5 minutes to make a choice, then act on it. You can always adjust course later.';
      mindsetProfile = 'Overthinker';
    } else {
      archetype = 'The Balanced Growth Seeker';
      description = 'You have a healthy relationship with growth and change, recognizing both your strengths and areas for improvement without being paralyzed by either.';
      hiddenCost = 'You might be too comfortable with the status quo and could benefit from pushing yourself to take bigger risks or set more ambitious goals.';
      firstStep = 'Identify one area where you could stretch beyond your comfort zone. Set a specific, challenging goal that excites you.';
      mindsetProfile = 'Balanced';
    }

    return {
      ...responses,
      limitingBeliefArchetype: archetype,
      archetypeDescription: description,
      hiddenCost: hiddenCost,
      firstStep: firstStep,
      mindsetProfile: mindsetProfile
    };
  };

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4 text-text-headings">
          Mindset & Limiting Beliefs
        </h2>
        <p className="text-text-muted mb-6">
          Let's identify any patterns that might be holding you back from achieving your goals
        </p>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {questions.map((question, index) => (
          <Card key={question.id} className="p-6">
            <div className="mb-4">
              <span className="text-sm text-text-muted">
                Question {index + 1} of {questions.length}
              </span>
            </div>
            
            <p className="text-text-body mb-4 font-medium">{question.text}</p>
            
            <div className="space-y-3">
              {question.options.map((option, optionIndex) => (
                <label key={optionIndex} className="flex items-start space-x-3 cursor-pointer p-3 rounded-lg hover:bg-white/[0.02] transition-colors">
                  <input
                    type="radio"
                    name={question.id}
                    value={option}
                    checked={responses.responses[question.id] === option}
                    onChange={() => handleAnswer(question.id, option)}
                    className="w-4 h-4 text-primary-orange bg-white/[0.05] border-white/[0.2] focus:ring-primary-orange/50 mt-1"
                  />
                  <span className="text-text-body">
                    <span className="font-medium text-primary-orange">{String.fromCharCode(65 + optionIndex)})</span> {option}
                  </span>
                </label>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Navigation */}
      <div className="mt-8 text-center">
        {canProceed() && (
          <Button
            onClick={handleComplete}
            variant="primary"
            size="lg"
            className="glow-orange-hover"
          >
            Complete Assessment
          </Button>
        )}
        
        {!canProceed() && (
          <p className="text-text-muted">
            Please complete all questions to continue
          </p>
        )}
      </div>

      {/* End-of-Assessment Message */}
      {canProceed() && (
        <div className="mt-8 p-6 bg-gradient-to-r from-primary-orange/10 to-primary-aqua/10 border border-primary-orange/20 rounded-2xl text-center">
          <p className="text-text-body mb-4">
            🎉 Congratulations! You've completed the full ElevX Assessment. 
            We're now analyzing your responses to create your personalized 21-Day Foundation Path.
          </p>
          <p className="text-text-muted text-sm">
            This comprehensive assessment has captured your personality, learning style, core skills, goals, and mindset patterns.
          </p>
        </div>
      )}
    </div>
  );
}

