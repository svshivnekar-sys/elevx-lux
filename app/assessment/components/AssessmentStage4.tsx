"use client";
import React, { useState } from 'react';
import Button from '../../../components/Button';
import Card from '../../../components/Card';

interface Stage4Data {
  immediateGoals: {
    primary: string;
    secondary: string[];
  };
  deeperMotivation: {
    reasons: string[];
    coreDriver: string;
  };
  personalValues: {
    rankedValues: string[];
    freedomVsStability: number;
    integrity: number;
  };
  emotionalTriggers: {
    energyBoosters: string[];
    motivationDrainers: string[];
    environmentSupport: boolean;
    selfCapability: boolean;
    intrinsicMotivation: boolean;
  };
  motivationProfile: string;
  valueAlignment: string;
}

interface AssessmentStage4Props {
  onComplete: (stageNumber: number, data: Stage4Data) => void;
}

export default function AssessmentStage4({ onComplete }: AssessmentStage4Props) {
  const [currentLayer, setCurrentLayer] = useState(0);
  const [responses, setResponses] = useState<Stage4Data>({
    immediateGoals: {
      primary: '',
      secondary: []
    },
    deeperMotivation: {
      reasons: [],
      coreDriver: ''
    },
    personalValues: {
      rankedValues: [],
      freedomVsStability: 0,
      integrity: 0
    },
    emotionalTriggers: {
      energyBoosters: [],
      motivationDrainers: [],
      environmentSupport: false,
      selfCapability: false,
      intrinsicMotivation: false
    },
    motivationProfile: '',
    valueAlignment: ''
  });

  const layers = [
    {
      name: 'immediateGoals',
      title: 'Immediate Goals',
      description: 'What you think you want right now'
    },
    {
      name: 'deeperMotivation',
      title: 'Deeper Motivation',
      description: 'Why beneath the goal'
    },
    {
      name: 'personalValues',
      title: 'Personal Values',
      description: 'What guides your choices'
    },
    {
      name: 'emotionalTriggers',
      title: 'Emotional Triggers',
      description: 'What lights you up and what shuts you down'
    }
  ];

  const goalOptions = [
    'Advance in my career or get promoted',
    'Build or grow my business',
    'Improve my communication & leadership skills',
    'Achieve better work-life balance',
    'Improve my financial health & wealth building',
    'Gain confidence & overcome self-doubt',
    'Improve productivity & time management',
    'Learn how to influence, sell, or persuade better',
    'Enhance personal relationships & social skills',
    'Other'
  ];

  const motivationReasons = [
    'I want to feel more secure & stable in life',
    'I want recognition, respect, and credibility',
    'I want more freedom in how I live & work',
    'I want to master new skills and feel capable',
    'I want to connect more deeply with people',
    'I want to leave a mark and build a legacy',
    'I want to help or serve others meaningfully',
    'Other'
  ];

  const coreDrivers = [
    'I want it because it will make my life easier or safer.',
    'I want it because I\'ll finally feel I\'ve "made it."',
    'I want it because it will give me more options in life.',
    'I want it because I\'ll become the person I always wanted to be.'
  ];

  const valueOptions = [
    'Freedom',
    'Growth',
    'Security',
    'Recognition',
    'Integrity',
    'Relationships',
    'Adventure',
    'Contribution'
  ];

  const energyBoosters = [
    'Achieving a big milestone',
    'Receiving public praise',
    'Learning something new',
    'Helping someone else succeed',
    'Getting financial rewards',
    'Overcoming a tough challenge',
    'Being part of a strong team',
    'Having time for myself'
  ];

  const motivationDrainers = [
    'Feeling unappreciated',
    'Lack of progress or results',
    'Unclear goals or direction',
    'Too much routine or monotony',
    'Fear of failing',
    'Lack of financial stability',
    'Conflict with others',
    'Feeling excluded or unseen'
  ];

  const handlePrimaryGoal = (goal: string) => {
    setResponses(prev => ({
      ...prev,
      immediateGoals: { ...prev.immediateGoals, primary: goal }
    }));
  };

  const handleSecondaryGoal = (goal: string, checked: boolean) => {
    setResponses(prev => ({
      ...prev,
      immediateGoals: {
        ...prev.immediateGoals,
        secondary: checked
          ? [...prev.immediateGoals.secondary, goal]
          : prev.immediateGoals.secondary.filter(g => g !== goal)
      }
    }));
  };

  const handleMotivationReason = (reason: string, checked: boolean) => {
    setResponses(prev => ({
      ...prev,
      deeperMotivation: {
        ...prev.deeperMotivation,
        reasons: checked
          ? [...prev.deeperMotivation.reasons, reason]
          : prev.deeperMotivation.reasons.filter(r => r !== reason)
      }
    }));
  };

  const handleCoreDriver = (driver: string) => {
    setResponses(prev => ({
      ...prev,
      deeperMotivation: { ...prev.deeperMotivation, coreDriver: driver }
    }));
  };

  const handleValueRanking = (value: string, position: number) => {
    setResponses(prev => {
      const newRankedValues = [...prev.personalValues.rankedValues];
      // Remove from current position if exists
      const currentIndex = newRankedValues.indexOf(value);
      if (currentIndex > -1) {
        newRankedValues.splice(currentIndex, 1);
      }
      // Insert at new position
      newRankedValues.splice(position, 0, value);
      
      return {
        ...prev,
        personalValues: { ...prev.personalValues, rankedValues: newRankedValues }
      };
    });
  };

  const handleScaleRating = (type: 'freedomVsStability' | 'integrity', rating: number) => {
    setResponses(prev => ({
      ...prev,
      personalValues: { ...prev.personalValues, [type]: rating }
    }));
  };

  const handleEnergyBooster = (booster: string, checked: boolean) => {
    setResponses(prev => ({
      ...prev,
      emotionalTriggers: {
        ...prev.emotionalTriggers,
        energyBoosters: checked
          ? [...prev.emotionalTriggers.energyBoosters, booster]
          : prev.emotionalTriggers.energyBoosters.filter(b => b !== booster)
      }
    }));
  };

  const handleMotivationDrainer = (drainer: string, checked: boolean) => {
    setResponses(prev => ({
      ...prev,
      emotionalTriggers: {
        ...prev.emotionalTriggers,
        motivationDrainers: checked
          ? [...prev.emotionalTriggers.motivationDrainers, drainer]
          : prev.emotionalTriggers.motivationDrainers.filter(d => d !== drainer)
      }
    }));
  };

  const handleYesNoQuestion = (question: keyof typeof responses.emotionalTriggers, value: boolean) => {
    setResponses(prev => ({
      ...prev,
      emotionalTriggers: { ...prev.emotionalTriggers, [question]: value }
    }));
  };

  const canProceed = () => {
    switch (currentLayer) {
      case 0:
        return responses.immediateGoals.primary !== '';
      case 1:
        return responses.deeperMotivation.reasons.length > 0 && responses.deeperMotivation.coreDriver !== '';
      case 2:
        return responses.personalValues.rankedValues.length === valueOptions.length &&
               responses.personalValues.freedomVsStability > 0 &&
               responses.personalValues.integrity > 0;
      case 3:
        return responses.emotionalTriggers.energyBoosters.length > 0 &&
               responses.emotionalTriggers.motivationDrainers.length > 0;
      default:
        return false;
    }
  };

  const handleNextLayer = () => {
    if (currentLayer < layers.length - 1) {
      setCurrentLayer(currentLayer + 1);
    } else {
      // Calculate final profile and complete
      const finalData = calculateFinalProfile();
      onComplete(4, finalData);
    }
  };

  const calculateFinalProfile = (): Stage4Data => {
    // Determine motivation profile based on responses
    let motivationProfile = '';
    if (responses.deeperMotivation.reasons.includes('I want to feel more secure & stable in life')) {
      motivationProfile = 'Security-Seeking Achiever';
    } else if (responses.deeperMotivation.reasons.includes('I want recognition, respect, and credibility')) {
      motivationProfile = 'Recognition-Driven Professional';
    } else if (responses.deeperMotivation.reasons.includes('I want more freedom in how I live & work')) {
      motivationProfile = 'Freedom-Seeking Entrepreneur';
    } else if (responses.deeperMotivation.reasons.includes('I want to master new skills and feel capable')) {
      motivationProfile = 'Mastery-Focused Learner';
    } else {
      motivationProfile = 'Balanced Growth Seeker';
    }

    // Determine value alignment
    const topValues = responses.personalValues.rankedValues.slice(0, 3);
    const valueAlignment = `Your core values are ${topValues.join(', ')}`;

    return {
      ...responses,
      motivationProfile,
      valueAlignment
    };
  };

  const renderImmediateGoals = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold mb-4 text-text-headings">Primary Goal</h3>
        <p className="text-text-muted">Which of the following best describes your primary goal for the next 12 months?</p>
      </div>

      <div className="space-y-3">
        {goalOptions.map((goal) => (
          <label key={goal} className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-white/[0.02] transition-colors">
            <input
              type="radio"
              name="primaryGoal"
              value={goal}
              checked={responses.immediateGoals.primary === goal}
              onChange={() => handlePrimaryGoal(goal)}
                                className="w-4 h-4 text-primary-accent bg-secondary-bg/5 border-border-subtle focus:ring-primary-accent/50"
            />
            <span className="text-text-body">{goal}</span>
          </label>
        ))}
      </div>

      {responses.immediateGoals.primary && (
        <div className="mt-8">
          <h4 className="text-lg font-semibold mb-4 text-text-headings">Secondary Goals</h4>
          <p className="text-text-muted mb-4">Which of these also matter to you? (Select all that apply)</p>
          
          <div className="space-y-3">
            {goalOptions.map((goal) => (
              <label key={goal} className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-white/[0.02] transition-colors">
                <input
                  type="checkbox"
                  value={goal}
                  checked={responses.immediateGoals.secondary.includes(goal)}
                  onChange={(e) => handleSecondaryGoal(goal, e.target.checked)}
                  className="w-4 h-4 text-primary-accent bg-secondary-bg/5 border-border-subtle focus:ring-primary-accent/50"
                />
                <span className="text-text-body">{goal}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderDeeperMotivation = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold mb-4 text-text-headings">Why Do You Want This?</h3>
        <p className="text-text-muted">Select all the reasons that resonate with you</p>
      </div>

      <div className="space-y-3">
        {motivationReasons.map((reason) => (
          <label key={reason} className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-white/[0.02] transition-colors">
                          <input
                type="checkbox"
                value={reason}
                checked={responses.deeperMotivation.reasons.includes(reason)}
                onChange={(e) => handleMotivationReason(reason, e.target.checked)}
                className="w-4 h-4 text-primary-accent bg-secondary-bg/5 border-border-subtle focus:ring-primary-accent/50"
              />
            <span className="text-text-body">{reason}</span>
          </label>
        ))}
      </div>

      <div className="mt-8">
        <h4 className="text-lg font-semibold mb-4 text-text-headings">Core Driver</h4>
        <p className="text-text-muted mb-4">Which statement feels most true to you about your goal?</p>
        
        <div className="space-y-3">
          {coreDrivers.map((driver) => (
            <label key={driver} className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-white/[0.02] transition-colors">
              <input
                type="radio"
                name="coreDriver"
                value={driver}
                checked={responses.deeperMotivation.coreDriver === driver}
                onChange={() => handleCoreDriver(driver)}
                className="w-4 h-4 text-primary-accent bg-secondary-bg/5 border-border-subtle focus:ring-primary-accent/50"
              />
              <span className="text-text-body">{driver}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPersonalValues = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold mb-4 text-text-headings">Value Ranking</h3>
        <p className="text-text-muted">Drag and rank these values from most to least important to you</p>
      </div>

      <div className="space-y-4">
        {valueOptions.map((value, index) => (
          <Card key={value} className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-text-body">{value}</span>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((position) => (
                  <button
                    key={position}
                    onClick={() => handleValueRanking(value, position - 1)}
                    className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                      responses.personalValues.rankedValues[position - 1] === value
                        ? 'bg-primary-accent text-white'
                        : 'bg-secondary-bg/5 text-text-muted hover:bg-secondary-bg/10'
                    }`}
                  >
                    {position}
                  </button>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 space-y-6">
        <div>
          <h4 className="text-lg font-semibold mb-4 text-text-headings">Value Statements</h4>
          <p className="text-text-muted mb-4">Rate these statements on a scale of 1 (Strongly Disagree) to 5 (Strongly Agree)</p>
          
          <div className="space-y-4">
            <div>
              <p className="text-text-body mb-2">"I would rather earn less but live life on my own terms." (Freedom vs. Stability)</p>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleScaleRating('freedomVsStability', rating)}
                    className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${
                      responses.personalValues.freedomVsStability === rating
                        ? 'bg-primary-accent text-white'
                        : 'bg-secondary-bg/5 text-text-muted hover:bg-secondary-bg/10'
                    }`}
                  >
                    {rating}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <p className="text-text-body mb-2">"I will never compromise my values for quick success." (Integrity)</p>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleScaleRating('integrity', rating)}
                    className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${
                      responses.personalValues.integrity === rating
                        ? 'bg-primary-accent text-white'
                        : 'bg-secondary-bg/5 text-text-muted hover:bg-secondary-bg/10'
                    }`}
                  >
                    {rating}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEmotionalTriggers = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold mb-4 text-text-headings">Energy & Motivation</h3>
        <p className="text-text-muted">Understanding what drives and drains you</p>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-semibold mb-4 text-text-headings">Energy Boosters</h4>
          <p className="text-text-muted mb-4">Which situations give you the biggest energy boost? (Select up to 3)</p>
          
          <div className="space-y-3">
            {energyBoosters.map((booster) => (
              <label key={booster} className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-white/[0.02] transition-colors">
                <input
                  type="checkbox"
                  value={booster}
                  checked={responses.emotionalTriggers.energyBoosters.includes(booster)}
                  onChange={(e) => handleEnergyBooster(booster, e.target.checked)}
                  disabled={responses.emotionalTriggers.energyBoosters.length >= 3 && !responses.emotionalTriggers.energyBoosters.includes(booster)}
                  className="w-4 h-4 text-primary-accent bg-secondary-bg/5 border-border-subtle focus:ring-primary-accent/50 disabled:opacity-50"
                />
                <span className="text-text-body">{booster}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4 text-text-headings">Motivation Drainers</h4>
          <p className="text-text-muted mb-4">Which situations make you lose motivation fastest? (Select up to 3)</p>
          
          <div className="space-y-3">
            {motivationDrainers.map((drainer) => (
              <label key={drainer} className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-white/[0.02] transition-colors">
                <input
                  type="checkbox"
                  value={drainer}
                  checked={responses.emotionalTriggers.motivationDrainers.includes(drainer)}
                  onChange={(e) => handleMotivationDrainer(drainer, e.target.checked)}
                  disabled={responses.emotionalTriggers.motivationDrainers.length >= 3 && !responses.emotionalTriggers.motivationDrainers.includes(drainer)}
                  className="w-4 h-4 text-primary-accent bg-secondary-bg/5 border-border-subtle focus:ring-primary-accent/50 disabled:opacity-50"
                />
                <span className="text-text-body">{drainer}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4 text-text-headings">Quick Checks</h4>
          <p className="text-text-muted mb-4">Answer these quick Yes/No questions:</p>
          
          <div className="space-y-4">
            {[
              { key: 'environmentSupport', question: 'Do you believe your current environment supports your goals?' },
              { key: 'selfCapability', question: 'Do you feel fully capable of achieving your goals without external help?' },
              { key: 'intrinsicMotivation', question: 'Would you still pursue your goals if there was no recognition or reward at the end?' }
            ].map(({ key, question }) => (
              <div key={key} className="p-4 bg-white/[0.02] rounded-lg">
                <p className="text-text-body mb-3">{question}</p>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name={key}
                      value="true"
                      checked={responses.emotionalTriggers[key as keyof typeof responses.emotionalTriggers] === true}
                      onChange={() => handleYesNoQuestion(key as keyof typeof responses.emotionalTriggers, true)}
                      className="w-4 h-4 text-primary-accent bg-secondary-bg/5 border-border-subtle focus:ring-primary-accent/50"
                    />
                    <span className="text-text-body">Yes</span>
                  </label>
                  
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name={key}
                      value="false"
                      checked={responses.emotionalTriggers[key as keyof typeof responses.emotionalTriggers] === false}
                      onChange={() => handleYesNoQuestion(key as keyof typeof responses.emotionalTriggers, false)}
                      className="w-4 h-4 text-primary-accent bg-secondary-bg/5 border-border-subtle focus:ring-primary-accent/50"
                    />
                    <span className="text-text-body">No</span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const currentLayerData = layers[currentLayer];

  return (
    <div>
      {/* Progress Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4 text-text-headings">
          {currentLayerData.title}
        </h2>
        <p className="text-text-muted mb-4">
          {currentLayerData.description}
        </p>
        <div className="flex justify-center space-x-2">
          {layers.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentLayer
                  ? 'bg-primary-accent'
                  : index < currentLayer
                  ? 'bg-secondary-accent'
                  : 'bg-border-subtle'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Current Layer Content */}
      {currentLayer === 0 && renderImmediateGoals()}
      {currentLayer === 1 && renderDeeperMotivation()}
      {currentLayer === 2 && renderPersonalValues()}
      {currentLayer === 3 && renderEmotionalTriggers()}

      {/* Navigation */}
      <div className="mt-8 text-center">
        {canProceed() && (
          <Button
            onClick={handleNextLayer}
            variant="primary"
            size="lg"
            className="shadow-glow-primary-hover"
          >
            {currentLayer === layers.length - 1 ? 'Complete Assessment' : 'Continue to Next Layer'}
          </Button>
        )}
        
        {!canProceed() && (
          <p className="text-text-muted">
            Please complete all questions to continue
          </p>
        )}
      </div>

      {/* End-of-Section Cliffhanger */}
      {currentLayer === layers.length - 1 && (
        <div className="mt-8 p-6 bg-gradient-to-r from-primary-accent/10 to-secondary-accent/10 border border-primary-accent/20 rounded-2xl text-center">
          <p className="text-text-body mb-4">
            Excellent! We've mapped your goals and motivations. Finally, let's identify any limiting beliefs that might be holding you back.
          </p>
        </div>
      )}
    </div>
  );
}

