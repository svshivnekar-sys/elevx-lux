"use client";
import React, { useState, useEffect } from 'react';
import Button from '../../../components/Button';
import Card from '../../../components/Card';

interface Stage1Data {
  partA: { [key: string]: string };
  partB: { [key: string]: string };
  partC: { [key: string]: string };
  scores: {
    C: number;
    O: number;
    E: number;
    A: number;
    N: number;
  };
  strongestPoles: string[];
  weakestPole: string;
  summary: string;
}

interface AssessmentStage1Props {
  onComplete: (stageNumber: number, data: Stage1Data) => void;
}

export default function AssessmentStage1({ onComplete }: AssessmentStage1Props) {
  const [currentPart, setCurrentPart] = useState<'A' | 'B' | 'C'>('A');
  const [responses, setResponses] = useState<Stage1Data>({
    partA: {},
    partB: {},
    partC: {},
    scores: { C: 0, O: 0, E: 0, A: 0, N: 0 },
    strongestPoles: [],
    weakestPole: '',
    summary: ''
  });

  const [showMicroReveal, setShowMicroReveal] = useState(false);

  // Part A: Forced Choice Pairs
  const partAQuestions = [
    { id: 'A1', A: 'I plan my day and stick to it.', B: 'I like going with the flow.', trait: 'C', A_direction: '+', B_direction: '-' },
    { id: 'A2', A: 'I enjoy trying new things.', B: 'I prefer familiar routines.', trait: 'O', A_direction: '+', B_direction: '-' },
    { id: 'A3', A: 'I feel alive around people.', B: 'I recharge best alone.', trait: 'E', A_direction: '+', B_direction: '-' },
    { id: 'A4', A: 'I tell hard truths directly.', B: 'I soften my words to keep peace.', trait: 'A', A_direction: '-', B_direction: '+' },
    { id: 'A5', A: 'I stay calm under pressure.', B: 'Stress gets to me quickly.', trait: 'N', A_direction: '-', B_direction: '+' },
    { id: 'A6', A: 'I like big ideas and possibilities.', B: 'I prefer practical facts and steps.', trait: 'O', A_direction: '+', B_direction: '-' },
    { id: 'A7', A: 'I finish tasks before relaxing.', B: 'I start many things; finishing can wait.', trait: 'C', A_direction: '+', B_direction: '-' },
    { id: 'A8', A: 'I start conversations with strangers.', B: 'I avoid small talk.', trait: 'E', A_direction: '+', B_direction: '-' },
    { id: 'A9', A: 'I stand my ground in disagreements.', B: 'I try to find middle ground.', trait: 'A', A_direction: '-', B_direction: '+' },
    { id: 'A10', A: 'I bounce back quickly after setbacks.', B: 'I dwell on problems for a while.', trait: 'N', A_direction: '-', B_direction: '+' },
    { id: 'A11', A: 'I enjoy art/music that challenges me.', B: 'I like familiar styles I already know.', trait: 'O', A_direction: '+', B_direction: '-' },
    { id: 'A12', A: 'I keep my space tidy and organized.', B: 'My space is often messy.', trait: 'C', A_direction: '+', B_direction: '-' }
  ];

  // Part B: Yes/No Statements
  const partBQuestions = [
    { id: 'B1', text: 'I keep track of my to-dos every day.', trait: 'C', direction: '+', reverse: false },
    { id: 'B2', text: 'Small problems can ruin my mood for hours.', trait: 'N', direction: '+', reverse: false },
    { id: 'B3', text: 'I often speak up first in meetings.', trait: 'E', direction: '+', reverse: false },
    { id: 'B4', text: 'People describe me as kind and helpful.', trait: 'A', direction: '+', reverse: false },
    { id: 'B5', text: 'I enjoy learning things outside my field.', trait: 'O', direction: '+', reverse: false },
    { id: 'B6', text: 'I often miss deadlines.', trait: 'C', direction: '-', reverse: true },
    { id: 'B7', text: 'I rarely feel anxious.', trait: 'N', direction: '-', reverse: true },
    { id: 'B8', text: 'I avoid parties or large group events.', trait: 'E', direction: '-', reverse: false },
    { id: 'B9', text: 'I sometimes push hard to get my way.', trait: 'A', direction: '-', reverse: false },
    { id: 'B10', text: 'I usually order the same food at restaurants.', trait: 'O', direction: '-', reverse: false },
    { id: 'B11', text: 'I have never told even a small lie.', trait: 'SD', direction: '+', reverse: false }, // Social desirability flag
    { id: 'B12', text: 'I am on time to absolutely everything, without exception.', trait: 'SD', direction: '+', reverse: false } // Social desirability flag
  ];

  // Part C: Situational MCQs
  const partCQuestions = [
    { id: 'C1', text: 'Deadline in 5 days', options: [
      { value: 'A', text: 'I start the last day.', trait: 'C', score: 0 },
      { value: 'B', text: 'I start late and rush.', trait: 'C', score: 33 },
      { value: 'C', text: 'I plan chunks and finish on time.', trait: 'C', score: 67 },
      { value: 'D', text: 'I plan early and finish ahead.', trait: 'C', score: 100 }
    ]},
    { id: 'C2', text: 'Invited to an experimental show', options: [
      { value: 'A', text: 'I\'d rather not; I like my usual.', trait: 'O', score: 0 },
      { value: 'B', text: 'I might go if friends insist.', trait: 'O', score: 33 },
      { value: 'C', text: 'I\'ll try it; could be interesting.', trait: 'O', score: 67 },
      { value: 'D', text: 'I\'m excited to go and discuss it after.', trait: 'O', score: 100 }
    ]},
    { id: 'C3', text: 'Networking event', options: [
      { value: 'A', text: 'I stay to myself.', trait: 'E', score: 0 },
      { value: 'B', text: 'I chat if someone approaches me.', trait: 'E', score: 33 },
      { value: 'C', text: 'I meet a few new people.', trait: 'E', score: 67 },
      { value: 'D', text: 'I actively work the room.', trait: 'E', score: 100 }
    ]},
    { id: 'C4', text: 'Teammate\'s weak idea', options: [
      { value: 'A', text: 'I say it\'s bad, straight up.', trait: 'A', score: 0 },
      { value: 'B', text: 'I say nothing and ignore it.', trait: 'A', score: 33 },
      { value: 'C', text: 'I suggest improvements politely.', trait: 'A', score: 67 },
      { value: 'D', text: 'I appreciate the effort and co-create a better version.', trait: 'A', score: 100 }
    ]},
    { id: 'C5', text: 'Plan changes last minute', options: [
      { value: 'A', text: 'I panic or get very upset.', trait: 'N', score: 100 },
      { value: 'B', text: 'I get stressed but manage.', trait: 'N', score: 67 },
      { value: 'C', text: 'Slightly stressed; I adjust.', trait: 'N', score: 33 },
      { value: 'D', text: 'I adapt calmly.', trait: 'N', score: 0 }
    ]},
    { id: 'C6', text: 'Your workspace', options: [
      { value: 'A', text: 'Messy; I lose things.', trait: 'C', score: 0 },
      { value: 'B', text: 'Somewhat messy; I find things eventually.', trait: 'C', score: 33 },
      { value: 'C', text: 'Mostly organized.', trait: 'C', score: 67 },
      { value: 'D', text: 'Very organized systems.', trait: 'C', score: 100 }
    ]},
    { id: 'C7', text: 'New tool at work', options: [
      { value: 'A', text: 'I resist; the old way works.', trait: 'O', score: 0 },
      { value: 'B', text: 'I\'ll learn only if I must.', trait: 'O', score: 33 },
      { value: 'C', text: 'I\'m curious; I test it.', trait: 'O', score: 67 },
      { value: 'D', text: 'I\'m excited and share tips.', trait: 'O', score: 100 }
    ]},
    { id: 'C8', text: 'Weekend plan', options: [
      { value: 'A', text: 'Solo time at home.', trait: 'E', score: 0 },
      { value: 'B', text: 'One-on-one with a friend.', trait: 'E', score: 33 },
      { value: 'C', text: 'Small group activity.', trait: 'E', score: 67 },
      { value: 'D', text: 'Big social event.', trait: 'E', score: 100 }
    ]},
    { id: 'C9', text: 'Wrong order at a restaurant', options: [
      { value: 'A', text: 'I scold the staff.', trait: 'A', score: 0 },
      { value: 'B', text: 'I accept it to avoid conflict.', trait: 'A', score: 33 },
      { value: 'C', text: 'I politely ask to correct it.', trait: 'A', score: 67 },
      { value: 'D', text: 'I make friendly small talk and get it corrected.', trait: 'A', score: 100 }
    ]},
    { id: 'C10', text: 'Before a big presentation', options: [
      { value: 'A', text: 'I lose sleep; I feel sick.', trait: 'N', score: 100 },
      { value: 'B', text: 'Very nervous; hard to focus.', trait: 'N', score: 67 },
      { value: 'C', text: 'A bit nervous; I prepare.', trait: 'N', score: 33 },
      { value: 'D', text: 'Calm and focused.', trait: 'N', score: 0 }
    ]},
    { id: 'C11', text: 'Join a project with no structure', options: [
      { value: 'A', text: 'I join and "see later."', trait: 'C', score: 0 },
      { value: 'B', text: 'I join but procrastinate.', trait: 'C', score: 33 },
      { value: 'C', text: 'I ask for a plan and commit.', trait: 'C', score: 67 },
      { value: 'D', text: 'I create structure and lead.', trait: 'C', score: 100 }
    ]},
    { id: 'C12', text: 'Plans fall through', options: [
      { value: 'A', text: 'It ruins my day.', trait: 'N', score: 100 },
      { value: 'B', text: 'It bothers me, then I move on.', trait: 'N', score: 67 },
      { value: 'C', text: 'I shrug and adapt.', trait: 'N', score: 33 },
      { value: 'D', text: 'I quickly find an upside.', trait: 'N', score: 0 }
    ]}
  ];

  const handlePartAAnswer = (questionId: string, answer: 'A' | 'B') => {
    const question = partAQuestions.find(q => q.id === questionId);
    if (!question) return;

    setResponses(prev => ({
      ...prev,
      partA: { ...prev.partA, [questionId]: answer }
    }));
  };

  const handlePartBAnswer = (questionId: string, answer: 'Yes' | 'No') => {
    setResponses(prev => ({
      ...prev,
      partB: { ...prev.partB, [questionId]: answer }
    }));
  };

  const handlePartCAnswer = (questionId: string, answer: string) => {
    setResponses(prev => ({
      ...prev,
      partC: { ...prev.partC, [questionId]: answer }
    }));
  };

  const canProceed = () => {
    if (currentPart === 'A') {
      return Object.keys(responses.partA).length === partAQuestions.length;
    } else if (currentPart === 'B') {
      return Object.keys(responses.partB).length === partBQuestions.length;
    } else if (currentPart === 'C') {
      return Object.keys(responses.partC).length === partCQuestions.length;
    }
    return false;
  };

  const handleNextPart = () => {
    if (currentPart === 'A') {
      setCurrentPart('B');
      setShowMicroReveal(true);
      setTimeout(() => setShowMicroReveal(false), 3000);
    } else if (currentPart === 'B') {
      setCurrentPart('C');
      setShowMicroReveal(true);
      setTimeout(() => setShowMicroReveal(false), 3000);
    } else if (currentPart === 'C') {
      // Calculate final scores and complete
      const finalData = calculateFinalScores();
      onComplete(1, finalData);
    }
  };

  const calculateFinalScores = (): Stage1Data => {
    // Calculate scores for each trait
    const scores = { C: 0, O: 0, E: 0, A: 0, N: 0 };
    const traitCounts = { C: 0, O: 0, E: 0, A: 0, N: 0 };

    // Part A scoring
    partAQuestions.forEach(q => {
      const answer = responses.partA[q.id];
      if (answer === 'A') {
        scores[q.trait as keyof typeof scores] += q.A_direction === '+' ? 100 : 0;
      } else if (answer === 'B') {
        scores[q.trait as keyof typeof scores] += q.B_direction === '+' ? 100 : 0;
      }
      traitCounts[q.trait as keyof typeof traitCounts]++;
    });

    // Part B scoring
    partBQuestions.forEach(q => {
      if (q.trait === 'SD') return; // Skip social desirability flags
      
      const answer = responses.partB[q.id];
      if (answer) {
        let score = 0;
        if (q.reverse) {
          score = answer === 'Yes' ? 0 : 100;
        } else {
          score = answer === 'Yes' ? 100 : 0;
        }
        scores[q.trait as keyof typeof scores] += score;
        traitCounts[q.trait as keyof typeof traitCounts]++;
      }
    });

    // Part C scoring
    partCQuestions.forEach(q => {
      const answer = responses.partC[q.id];
      if (answer) {
        const option = q.options.find(opt => opt.value === answer);
        if (option) {
          scores[option.trait as keyof typeof scores] += option.score;
          traitCounts[option.trait as keyof typeof traitCounts]++;
        }
      }
    });

    // Calculate averages
    Object.keys(scores).forEach(trait => {
      if (traitCounts[trait as keyof typeof traitCounts] > 0) {
        scores[trait as keyof typeof scores] = Math.round(
          scores[trait as keyof typeof scores] / traitCounts[trait as keyof typeof traitCounts]
        );
      }
    });

    // Apply social desirability adjustment
    const sdFlags = (responses.partB.B11 === 'Yes' ? 1 : 0) + (responses.partB.B12 === 'Yes' ? 1 : 0);
    const confidenceFactor = sdFlags >= 2 ? 0.8 : sdFlags >= 1 ? 0.9 : 1.0;

    Object.keys(scores).forEach(trait => {
      scores[trait as keyof typeof scores] = Math.round(scores[trait as keyof typeof scores] * confidenceFactor);
    });

    // Find strongest and weakest poles
    const traitEntries = Object.entries(scores);
    traitEntries.sort(([,a], [,b]) => b - a);
    
    const strongestPoles = [traitEntries[0][0], traitEntries[1][0]];
    const weakestPole = traitEntries[traitEntries.length - 1][0];

    // Generate summary
    const summary = generateSummary(scores, strongestPoles, weakestPole);

    return {
      ...responses,
      scores,
      strongestPoles,
      weakestPole,
      summary
    };
  };

  const generateSummary = (scores: any, strongest: string[], weakest: string): string => {
    const highTraits = strongest.map(t => t);
    const lowTrait = weakest;
    
    const summaries = {
      C: { high: 'structured and organized', low: 'flexible and spontaneous' },
      O: { high: 'curious and open-minded', low: 'practical and traditional' },
      E: { high: 'outgoing and social', low: 'reflective and reserved' },
      A: { high: 'cooperative and kind', low: 'direct and assertive' },
      N: { high: 'sensitive and reactive', low: 'calm and steady' }
    };

    const highDesc = highTraits.map(t => summaries[t as keyof typeof summaries]?.high).join(' and ');
    const lowDesc = summaries[lowTrait as keyof typeof summaries]?.low;

    return `You're ${highDesc}, with ${lowDesc} tendencies.`;
  };

  const renderPartA = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4 text-text-headings">Part A — Forced-Choice Pairs</h2>
        <p className="text-text-muted">Pick the option that sounds more like you (A or B).</p>
      </div>

      {partAQuestions.map((question, index) => (
        <Card key={question.id} className="p-6">
          <div className="mb-4">
            <span className="text-sm text-text-muted">Question {index + 1} of {partAQuestions.length}</span>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id={`${question.id}-A`}
                name={question.id}
                value="A"
                checked={responses.partA[question.id] === 'A'}
                onChange={() => handlePartAAnswer(question.id, 'A')}
                className="w-4 h-4 text-primary-orange bg-white/[0.05] border-white/[0.2] focus:ring-primary-orange/50"
              />
              <label htmlFor={`${question.id}-A`} className="flex-1 text-text-body cursor-pointer">
                <span className="font-medium text-primary-orange">A)</span> {question.A}
              </label>
            </div>
            
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id={`${question.id}-B`}
                name={question.id}
                value="B"
                checked={responses.partA[question.id] === 'B'}
                onChange={() => handlePartAAnswer(question.id, 'B')}
                className="w-4 h-4 text-primary-orange bg-white/[0.05] border-white/[0.2] focus:ring-primary-orange/50"
              />
              <label htmlFor={`${question.id}-B`} className="flex-1 text-text-body cursor-pointer">
                <span className="font-medium text-primary-aqua">B)</span> {question.B}
              </label>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderPartB = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4 text-text-headings">Part B — Yes/No Statements</h2>
        <p className="text-text-muted">Choose Yes or No for each statement.</p>
      </div>

      {partBQuestions.map((question, index) => (
        <Card key={question.id} className="p-6">
          <div className="mb-4">
            <span className="text-sm text-text-muted">Question {index + 1} of {partBQuestions.length}</span>
          </div>
          
          <p className="text-text-body mb-4">{question.text}</p>
          
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name={question.id}
                value="Yes"
                checked={responses.partB[question.id] === 'Yes'}
                onChange={() => handlePartBAnswer(question.id, 'Yes')}
                className="w-4 h-4 text-primary-orange bg-white/[0.05] border-white/[0.2] focus:ring-primary-orange/50"
              />
              <span className="text-text-body">Yes</span>
            </label>
            
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name={question.id}
                value="No"
                checked={responses.partB[question.id] === 'No'}
                onChange={() => handlePartBAnswer(question.id, 'No')}
                className="w-4 h-4 text-primary-orange bg-white/[0.05] border-white/[0.2] focus:ring-primary-orange/50"
              />
              <span className="text-text-body">No</span>
            </label>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderPartC = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4 text-text-headings">Part C — Situational Questions</h2>
        <p className="text-text-muted">Pick the option that is closest to what you actually do.</p>
      </div>

      {partCQuestions.map((question, index) => (
        <Card key={question.id} className="p-6">
          <div className="mb-4">
            <span className="text-sm text-text-muted">Question {index + 1} of {partCQuestions.length}</span>
          </div>
          
          <p className="text-text-body mb-4 font-medium">{question.text}</p>
          
          <div className="space-y-3">
            {question.options.map((option) => (
              <label key={option.value} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name={question.id}
                  value={option.value}
                  checked={responses.partC[question.id] === option.value}
                  onChange={() => handlePartCAnswer(question.id, option.value)}
                  className="w-4 h-4 text-primary-orange bg-white/[0.05] border-white/[0.2] focus:ring-primary-orange/50 mt-1"
                />
                <span className="text-text-body">
                  <span className="font-medium text-primary-orange">{option.value})</span> {option.text}
                </span>
              </label>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div>
      {/* Micro-reveal Toast */}
      {showMicroReveal && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-gradient-to-r from-primary-orange to-primary-aqua text-white px-6 py-3 rounded-full shadow-lg">
            {currentPart === 'B' && "Got it—your natural pattern is becoming clear."}
            {currentPart === 'C' && "We've spotted your core strengths and stress patterns. Ready to see the headline?"}
          </div>
        </div>
      )}

      {/* Current Part Content */}
      {currentPart === 'A' && renderPartA()}
      {currentPart === 'B' && renderPartB()}
      {currentPart === 'C' && renderPartC()}

      {/* Navigation */}
      <div className="mt-8 text-center">
        {canProceed() && (
          <Button
            onClick={handleNextPart}
            variant="primary"
            size="lg"
            className="glow-orange-hover"
          >
            {currentPart === 'C' ? 'Complete Assessment' : 'Continue'}
          </Button>
        )}
        
        {!canProceed() && (
          <p className="text-text-muted">
            Please complete all questions to continue
          </p>
        )}
      </div>

      {/* End-of-Section Cliffhanger */}
      {currentPart === 'C' && (
        <div className="mt-8 p-6 bg-gradient-to-r from-primary-orange/10 to-primary-aqua/10 border border-primary-orange/20 rounded-2xl text-center">
          <p className="text-text-body mb-4">
            Nice. We've built your personality snapshot. Next, we'll tune how you learn best so your 21-day plan feels natural—not forced.
          </p>
        </div>
      )}
    </div>
  );
}
