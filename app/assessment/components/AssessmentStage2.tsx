"use client";
import React, { useState } from 'react';
import Button from '../../../components/Button';
import Card from '../../../components/Card';

interface Stage2Data {
  partA: { [key: string]: string };
  partB: { [key: string]: string };
  partC: { [key: string]: string };
  scores: {
    V: number;
    A: number;
    K: number;
  };
  dominantStyle: string;
  secondaryStyle: string;
  microExperiment: {
    firstClick: string;
    dwellTime: number;
  };
}

interface AssessmentStage2Props {
  onComplete: (stageNumber: number, data: Stage2Data) => void;
}

export default function AssessmentStage2({ onComplete }: AssessmentStage2Props) {
  const [currentPart, setCurrentPart] = useState<'A' | 'B' | 'C'>('A');
  const [responses, setResponses] = useState<Stage2Data>({
    partA: {},
    partB: {},
    partC: {},
    scores: { V: 0, A: 0, K: 0 },
    dominantStyle: '',
    secondaryStyle: '',
    microExperiment: { firstClick: '', dwellTime: 0 }
  });

  const [showMicroReveal, setShowMicroReveal] = useState(false);
  const [experimentStartTime, setExperimentStartTime] = useState<number | null>(null);

  // Part A: Choice Triads
  const partAQuestions = [
    {
      id: 'A1',
      text: 'Learn a new app feature:',
      options: [
        { value: 'V', text: 'A 60-sec diagram with arrows showing each step.', icon: '📊' },
        { value: 'A', text: 'A 60-sec voice tip explaining what to tap and why.', icon: '🎧' },
        { value: 'K', text: 'A 3-step "Try it now" checklist inside the app.', icon: '✋' }
      ]
    },
    {
      id: 'A2',
      text: 'Understand a sales framework:',
      options: [
        { value: 'V', text: 'One-page flowchart with color-coded stages.', icon: '📈' },
        { value: 'A', text: 'A coach explains the stages in a quick talk.', icon: '🗣️' },
        { value: 'K', text: 'Role-play a 2-minute sales call using the stages.', icon: '🎭' }
      ]
    },
    {
      id: 'A3',
      text: 'Remember a list of 10 items:',
      options: [
        { value: 'V', text: 'A simple mind-map image.', icon: '🧠' },
        { value: 'A', text: 'A rhythmic audio mnemonic.', icon: '🎵' },
        { value: 'K', text: 'Physically lay out objects to match the list.', icon: '🔢' }
      ]
    },
    {
      id: 'A4',
      text: 'Practice a difficult concept:',
      options: [
        { value: 'V', text: 'Side-by-side worked example screenshots.', icon: '🖼️' },
        { value: 'A', text: 'Walkthrough audio explaining each step.', icon: '🎙️' },
        { value: 'K', text: 'Do it yourself with immediate feedback boxes.', icon: '✅' }
      ]
    },
    {
      id: 'A5',
      text: 'Prepare for a presentation:',
      options: [
        { value: 'V', text: 'Slide storyboard with thumbnail sketches.', icon: '📱' },
        { value: 'A', text: 'Rehearse aloud using bullet prompts.', icon: '📝' },
        { value: 'K', text: 'Stand, gesture, and rehearse with a prop.', icon: '🎯' }
      ]
    },
    {
      id: 'A6',
      text: 'Compare two strategies:',
      options: [
        { value: 'V', text: 'A simple table with pros/cons.', icon: '📋' },
        { value: 'A', text: 'A short debate recording.', icon: '🎬' },
        { value: 'K', text: 'Try each strategy for 5 minutes and feel the difference.', icon: '⚖️' }
      ]
    }
  ];

  // Part B: Mini Scenarios
  const partBQuestions = [
    {
      id: 'B1',
      text: 'You\'re stuck on a tough concept:',
      options: [
        { value: 'V', text: 'Search for a visual example or diagram.', icon: '🔍' },
        { value: 'A', text: 'Ask someone to explain it in plain words.', icon: '❓' },
        { value: 'K', text: 'Tinker with it until your hands/eyes "get it."', icon: '🔧' }
      ]
    },
    {
      id: 'B2',
      text: 'You want to remember a process:',
      options: [
        { value: 'V', text: 'Draw a quick flow sketch.', icon: '✏️' },
        { value: 'A', text: 'Record a voice note explaining the steps.', icon: '🎤' },
        { value: 'K', text: 'Walk around and act out each step.', icon: '🚶' }
      ]
    },
    {
      id: 'B3',
      text: 'New skill, 15 minutes only:',
      options: [
        { value: 'V', text: 'Scan a one-page visual guide.', icon: '👀' },
        { value: 'A', text: 'Play a short explainer audio.', icon: '🎧' },
        { value: 'K', text: 'Jump into a guided "do now" micro-task.', icon: '⚡' }
      ]
    }
  ];

  // Part C: Self-Statements
  const partCQuestions = [
    { id: 'C1', text: 'I remember faces better than names.', trait: 'V', reverse: false },
    { id: 'C2', text: 'I understand ideas faster when someone talks me through them.', trait: 'A', reverse: false },
    { id: 'C3', text: 'I understand best when I can try it with my hands/body.', trait: 'K', reverse: false },
    { id: 'C4', text: 'I often doodle, sketch, or arrange notes visually.', trait: 'V', reverse: false },
    { id: 'C5', text: 'I talk to myself or whisper when thinking.', trait: 'A', reverse: false },
    { id: 'C6', text: 'I pace, fidget, or move while thinking.', trait: 'K', reverse: false },
    { id: 'C7', text: 'Icons, diagrams, or color-coding help me "see" the plan.', trait: 'V', reverse: false },
    { id: 'C8', text: 'I can replay explanations in my head like a voice.', trait: 'A', reverse: false },
    { id: 'C9', text: 'I learn quickly by fixing or building something.', trait: 'K', reverse: false },
    { id: 'C10', text: 'Long voice-only explanations are my favorite.', trait: 'V', reverse: true },
    { id: 'C11', text: 'I dislike hearing concepts explained out loud.', trait: 'A', reverse: true },
    { id: 'C12', text: 'I prefer to sit still and just read.', trait: 'K', reverse: true }
  ];

  const handlePartAAnswer = (questionId: string, answer: string) => {
    setResponses(prev => ({
      ...prev,
      partA: { ...prev.partA, [questionId]: answer }
    }));
  };

  const handlePartBAnswer = (questionId: string, answer: string) => {
    setResponses(prev => ({
      ...prev,
      partB: { ...prev.partB, [questionId]: answer }
    }));
  };

  const handlePartCAnswer = (questionId: string, answer: 'Yes' | 'No') => {
    setResponses(prev => ({
      ...prev,
      partC: { ...prev.partC, [questionId]: answer }
    }));
  };

  const handleMicroExperiment = (style: string) => {
    if (!experimentStartTime) {
      setExperimentStartTime(Date.now());
      setResponses(prev => ({
        ...prev,
        microExperiment: { ...prev.microExperiment, firstClick: style }
      }));
    }
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
      onComplete(2, finalData);
    }
  };

  const calculateFinalScores = (): Stage2Data => {
    const scores = { V: 0, A: 0, K: 0 };
    const traitCounts = { V: 0, A: 0, K: 0 };

    // Part A scoring
    Object.values(responses.partA).forEach(answer => {
      if (answer) {
        scores[answer as keyof typeof scores] += 100;
        traitCounts[answer as keyof typeof traitCounts]++;
      }
    });

    // Part B scoring
    Object.values(responses.partB).forEach(answer => {
      if (answer) {
        scores[answer as keyof typeof scores] += 100;
        traitCounts[answer as keyof typeof traitCounts]++;
      }
    });

    // Part C scoring
    partCQuestions.forEach(q => {
      const answer = responses.partC[q.id];
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

    // Add micro-experiment bonus
    if (responses.microExperiment.firstClick) {
      scores[responses.microExperiment.firstClick as keyof typeof scores] += 20;
    }

    // Calculate averages
    Object.keys(scores).forEach(trait => {
      if (traitCounts[trait as keyof typeof traitCounts] > 0) {
        scores[trait as keyof typeof traitCounts] = Math.round(
          scores[trait as keyof typeof traitCounts] / traitCounts[trait as keyof typeof traitCounts]
        );
      }
    });

    // Find dominant and secondary styles
    const traitEntries = Object.entries(scores);
    traitEntries.sort(([,a], [,b]) => b - a);
    
    const dominantStyle = traitEntries[0][0];
    const secondaryStyle = traitEntries[1][0];

    // Calculate dwell time if experiment was started
    let dwellTime = 0;
    if (experimentStartTime) {
      dwellTime = Math.round((Date.now() - experimentStartTime) / 1000);
    }

    return {
      ...responses,
      scores,
      dominantStyle,
      secondaryStyle,
      microExperiment: {
        ...responses.microExperiment,
        dwellTime
      }
    };
  };

  const renderMicroExperiment = () => (
    <div className="mb-8 p-6 bg-gradient-to-r from-primary-aqua/10 to-primary-orange/10 border border-primary-aqua/20 rounded-2xl">
      <h3 className="text-lg font-semibold mb-4 text-text-headings text-center">
        Quick Learning Style Test
      </h3>
      <p className="text-text-muted text-center mb-6">
        Click on the format that appeals to you most:
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card 
          className={`p-4 text-center cursor-pointer transition-all duration-200 hover:scale-105 ${
            responses.microExperiment.firstClick === 'V' ? 'ring-2 ring-primary-orange' : ''
          }`}
          onClick={() => handleMicroExperiment('V')}
        >
          <div className="text-4xl mb-2">📊</div>
          <h4 className="font-medium text-text-headings mb-2">Visual</h4>
          <p className="text-sm text-text-muted">Infographic: How to say "no" assertively</p>
        </Card>
        
        <Card 
          className={`p-4 text-center cursor-pointer transition-all duration-200 hover:scale-105 ${
            responses.microExperiment.firstClick === 'A' ? 'ring-2 ring-primary-orange' : ''
          }`}
          onClick={() => handleMicroExperiment('A')}
        >
          <div className="text-4xl mb-2">🎧</div>
          <h4 className="font-medium text-text-headings mb-2">Audio</h4>
          <p className="text-sm text-text-muted">25-second voice clip explaining the same script</p>
        </Card>
        
        <Card 
          className={`p-4 text-center cursor-pointer transition-all duration-200 hover:scale-105 ${
            responses.microExperiment.firstClick === 'K' ? 'ring-2 ring-primary-orange' : ''
          }`}
          onClick={() => handleMicroExperiment('K')}
        >
          <div className="text-4xl mb-2">✋</div>
          <h4 className="font-medium text-text-headings mb-2">Kinesthetic</h4>
          <p className="text-sm text-text-muted">"Try it now" 3-line role-play prompt</p>
        </Card>
      </div>
    </div>
  );

  const renderPartA = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4 text-text-headings">Part A — Choice Triads</h2>
        <p className="text-text-muted">Pick the option that appeals to you most for each scenario.</p>
      </div>

      {renderMicroExperiment()}

      {partAQuestions.map((question, index) => (
        <Card key={question.id} className="p-6">
          <div className="mb-4">
            <span className="text-sm text-text-muted">Question {index + 1} of {partAQuestions.length}</span>
          </div>
          
          <p className="text-text-body mb-4 font-medium">{question.text}</p>
          
          <div className="space-y-3">
            {question.options.map((option) => (
              <label key={option.value} className="flex items-start space-x-3 cursor-pointer p-3 rounded-lg hover:bg-white/[0.02] transition-colors">
                <input
                  type="radio"
                  name={question.id}
                  value={option.value}
                  checked={responses.partA[question.id] === option.value}
                  onChange={() => handlePartAAnswer(question.id, option.value)}
                  className="w-4 h-4 text-primary-orange bg-white/[0.05] border-white/[0.2] focus:ring-primary-orange/50 mt-1"
                />
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{option.icon}</span>
                  <span className="text-text-body">
                    <span className="font-medium text-primary-orange">{option.value})</span> {option.text}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );

  const renderPartB = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4 text-text-headings">Part B — Mini Scenarios</h2>
        <p className="text-text-muted">Pick what you'd actually do in each situation.</p>
      </div>

      {partBQuestions.map((question, index) => (
        <Card key={question.id} className="p-6">
          <div className="mb-4">
            <span className="text-sm text-text-muted">Question {index + 1} of {partBQuestions.length}</span>
          </div>
          
          <p className="text-text-body mb-4 font-medium">{question.text}</p>
          
          <div className="space-y-3">
            {question.options.map((option) => (
              <label key={option.value} className="flex items-start space-x-3 cursor-pointer p-3 rounded-lg hover:bg-white/[0.02] transition-colors">
                <input
                  type="radio"
                  name={question.id}
                  value={option.value}
                  checked={responses.partB[question.id] === option.value}
                  onChange={() => handlePartBAnswer(question.id, option.value)}
                  className="w-4 h-4 text-primary-orange bg-white/[0.05] border-white/[0.2] focus:ring-primary-orange/50 mt-1"
                />
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{option.icon}</span>
                  <span className="text-text-body">
                    <span className="font-medium text-primary-orange">{option.value})</span> {option.text}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );

  const renderPartC = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4 text-text-headings">Part C — Self-Statements</h2>
        <p className="text-text-muted">Choose Yes or No for each statement about your learning preferences.</p>
      </div>

      {partCQuestions.map((question, index) => (
        <Card key={question.id} className="p-6">
          <div className="mb-4">
            <span className="text-sm text-text-muted">Question {index + 1} of {partCQuestions.length}</span>
          </div>
          
          <p className="text-text-body mb-4">{question.text}</p>
          
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name={question.id}
                value="Yes"
                checked={responses.partC[question.id] === 'Yes'}
                onChange={() => handlePartCAnswer(question.id, 'Yes')}
                className="w-4 h-4 text-primary-orange bg-white/[0.05] border-white/[0.2] focus:ring-primary-orange/50"
              />
              <span className="text-text-body">Yes</span>
            </label>
            
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name={question.id}
                value="No"
                checked={responses.partC[question.id] === 'No'}
                onChange={() => handlePartCAnswer(question.id, 'No')}
                className="w-4 h-4 text-primary-orange bg-white/[0.05] border-white/[0.2] focus:ring-primary-orange/50"
              />
              <span className="text-text-body">No</span>
            </label>
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
          <div className="bg-gradient-to-r from-primary-aqua to-primary-orange text-white px-6 py-3 rounded-full shadow-lg">
            {currentPart === 'B' && "Got it—your learning preferences are becoming clear."}
            {currentPart === 'C' && "Perfect! Now we know how you learn best. Ready for the next step?"}
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
        <div className="mt-8 p-6 bg-gradient-to-r from-primary-aqua/10 to-primary-orange/10 border border-primary-aqua/20 rounded-2xl text-center">
          <p className="text-text-body mb-4">
            Excellent! We've discovered your learning style. Next, we'll assess your core life skills to build your personalized foundation.
          </p>
        </div>
      )}
    </div>
  );
}
