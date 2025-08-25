"use client";
import React, { useState } from 'react';
import Button from '../../../components/Button';
import Card from '../../../components/Card';

interface Stage3Data {
  communication: { [key: string]: string };
  decisionMaking: { [key: string]: string };
  emotionalIntelligence: { [key: string]: string };
  criticalThinking: { [key: string]: string };
  timeManagement: { [key: string]: string };
  productivity: { [key: string]: string };
  scores: {
    communication: number;
    decisionMaking: number;
    emotionalIntelligence: number;
    criticalThinking: number;
    timeManagement: number;
    productivity: number;
  };
  strengths: string[];
  areasForGrowth: string[];
}

interface AssessmentStage3Props {
  onComplete: (stageNumber: number, data: Stage3Data) => void;
}

export default function AssessmentStage3({ onComplete }: AssessmentStage3Props) {
  const [currentSkill, setCurrentSkill] = useState(0);
  const [responses, setResponses] = useState<Stage3Data>({
    communication: {},
    decisionMaking: {},
    emotionalIntelligence: {},
    criticalThinking: {},
    timeManagement: {},
    productivity: {},
    scores: {
      communication: 0,
      decisionMaking: 0,
      emotionalIntelligence: 0,
      criticalThinking: 0,
      timeManagement: 0,
      productivity: 0
    },
    strengths: [],
    areasForGrowth: []
  });

  const skills = [
    {
      name: 'communication',
      title: 'Communication',
      description: 'How well you adapt your message to different audiences and situations.',
      questions: [
        {
          id: 'C1',
          text: 'You\'re explaining a complex idea to your team and notice blank stares. What\'s your best next step?',
          options: [
            { value: 'a', text: 'Continue explaining without interruption' },
            { value: 'b', text: 'Ask if they have questions and encourage examples from them' },
            { value: 'c', text: 'Hand out a written summary and move on' },
            { value: 'd', text: 'Use technical jargon to be precise' }
          ],
          correct: 'b'
        },
        {
          id: 'C2',
          text: 'A client misinterprets your email and is upset. What\'s the most effective first step?',
          options: [
            { value: 'a', text: 'Reply in writing to clarify immediately' },
            { value: 'b', text: 'Call them to clarify tone and meaning' },
            { value: 'c', text: 'Forward the email to your manager' },
            { value: 'd', text: 'Wait for them to calm down before responding' }
          ],
          correct: 'b'
        },
        {
          id: 'C3',
          text: 'You need to share bad news about a project delay. What\'s the best approach?',
          options: [
            { value: 'a', text: 'Be direct but also explain the reason and next steps' },
            { value: 'b', text: 'Start with the good news first and avoid details' },
            { value: 'c', text: 'Send a formal memo with facts only' },
            { value: 'd', text: 'Delay telling them until you have a solution' }
          ],
          correct: 'a'
        },
        {
          id: 'C4',
          text: 'You\'re giving a presentation and someone interrupts with a question off-topic. What should you do?',
          options: [
            { value: 'a', text: 'Ignore the question and move on' },
            { value: 'b', text: 'Tell them to wait until the end' },
            { value: 'c', text: 'Acknowledge it and promise to answer after main points' },
            { value: 'd', text: 'Answer it right away in detail' }
          ],
          correct: 'c'
        },
        {
          id: 'C5',
          text: 'A colleague from another culture doesn\'t make much eye contact during conversation. What\'s the best interpretation?',
          options: [
            { value: 'a', text: 'They\'re hiding something' },
            { value: 'b', text: 'They\'re disinterested' },
            { value: 'c', text: 'Cultural norms may differ' },
            { value: 'd', text: 'They\'re nervous or shy' }
          ],
          correct: 'c'
        }
      ]
    },
    {
      name: 'decisionMaking',
      title: 'Decision-Making',
      description: 'How you approach choices, weighing risks and benefits systematically.',
      questions: [
        {
          id: 'D1',
          text: 'You have two possible solutions to a problem — one quick but risky, another slow but safer. What\'s your first step?',
          options: [
            { value: 'a', text: 'Choose the quick one — time matters most' },
            { value: 'b', text: 'Gather more data to weigh risks and benefits' },
            { value: 'c', text: 'Pick the safer one to avoid mistakes' },
            { value: 'd', text: 'Ask someone else to decide' }
          ],
          correct: 'b'
        },
        {
          id: 'D2',
          text: 'A supplier offers a last-minute discount if you buy immediately. You haven\'t checked quality yet. What should you do?',
          options: [
            { value: 'a', text: 'Take it — discounts don\'t last' },
            { value: 'b', text: 'Ask for a sample or quick review before committing' },
            { value: 'c', text: 'Decline the offer' },
            { value: 'd', text: 'Decide based on your gut feeling' }
          ],
          correct: 'b'
        },
        {
          id: 'D3',
          text: 'Your team suggests three ideas for a marketing campaign. How should you choose?',
          options: [
            { value: 'a', text: 'Pick the one that excites you most' },
            { value: 'b', text: 'Compare each idea\'s alignment with goals and ROI potential' },
            { value: 'c', text: 'Vote as a team' },
            { value: 'd', text: 'Ask a senior manager to choose' }
          ],
          correct: 'b'
        },
        {
          id: 'D4',
          text: 'A decision needs to be made fast, but data is incomplete. What do you do?',
          options: [
            { value: 'a', text: 'Delay until you get full data' },
            { value: 'b', text: 'Use available data + expert judgment to act' },
            { value: 'c', text: 'Pick randomly' },
            { value: 'd', text: 'Ask for consensus from the team' }
          ],
          correct: 'b'
        },
        {
          id: 'D5',
          text: 'After a bad decision, what\'s the smartest follow-up?',
          options: [
            { value: 'a', text: 'Forget about it' },
            { value: 'b', text: 'Analyze what went wrong and document lessons' },
            { value: 'c', text: 'Blame the circumstances' },
            { value: 'd', text: 'Avoid similar decisions in future altogether' }
          ],
          correct: 'b'
        }
      ]
    },
    {
      name: 'emotionalIntelligence',
      title: 'Emotional Intelligence',
      description: 'How well you read and respond to emotions in yourself and others.',
      questions: [
        {
          id: 'E1',
          text: 'A colleague is visibly upset during a meeting. What should you do?',
          options: [
            { value: 'a', text: 'Ignore it to avoid embarrassing them' },
            { value: 'b', text: 'Ask if they\'re okay privately after the meeting' },
            { value: 'c', text: 'Publicly ask what\'s wrong' },
            { value: 'd', text: 'Joke to lighten the mood' }
          ],
          correct: 'b'
        },
        {
          id: 'E2',
          text: 'You receive harsh feedback. What\'s the best response?',
          options: [
            { value: 'a', text: 'Defend yourself immediately' },
            { value: 'b', text: 'Ask clarifying questions to understand the feedback' },
            { value: 'c', text: 'Leave and think about it later' },
            { value: 'd', text: 'Dismiss it as unfair' }
          ],
          correct: 'b'
        },
        {
          id: 'E3',
          text: 'A team member keeps missing deadlines. What\'s the most emotionally intelligent approach?',
          options: [
            { value: 'a', text: 'Scold them in front of the team' },
            { value: 'b', text: 'Ask about underlying challenges they might be facing' },
            { value: 'c', text: 'Reduce their responsibilities quietly' },
            { value: 'd', text: 'Report them without discussion' }
          ],
          correct: 'b'
        },
        {
          id: 'E4',
          text: 'You\'re frustrated with a peer. What\'s the best initial step?',
          options: [
            { value: 'a', text: 'Confront them aggressively' },
            { value: 'b', text: 'Take time to cool down, then address the issue calmly' },
            { value: 'c', text: 'Ignore it forever' },
            { value: 'd', text: 'Share your frustration with other colleagues' }
          ],
          correct: 'b'
        },
        {
          id: 'E5',
          text: 'A customer sends an angry email. What should you focus on first?',
          options: [
            { value: 'a', text: 'Correcting their facts' },
            { value: 'b', text: 'Acknowledging their feelings before addressing the issue' },
            { value: 'c', text: 'Escalating to your boss' },
            { value: 'd', text: 'Ignoring emotional tone and focusing on the solution' }
          ],
          correct: 'b'
        }
      ]
    },
    {
      name: 'criticalThinking',
      title: 'Critical Thinking',
      description: 'How you question assumptions and verify information before acting.',
      questions: [
        {
          id: 'T1',
          text: 'You read an online article with surprising statistics. What\'s your first reaction?',
          options: [
            { value: 'a', text: 'Share it on social media' },
            { value: 'b', text: 'Check the source and verify credibility' },
            { value: 'c', text: 'Believe it if it matches your opinions' },
            { value: 'd', text: 'Ask friends if they\'ve seen it' }
          ],
          correct: 'b'
        },
        {
          id: 'T2',
          text: 'Your company\'s sales dropped. What\'s the best first step?',
          options: [
            { value: 'a', text: 'Assume the market is bad' },
            { value: 'b', text: 'Analyze data to identify patterns and causes' },
            { value: 'c', text: 'Cut prices immediately' },
            { value: 'd', text: 'Change the sales team' }
          ],
          correct: 'b'
        },
        {
          id: 'T3',
          text: 'Someone presents a solution that sounds great. What should you ask?',
          options: [
            { value: 'a', text: '"Who suggested this?"' },
            { value: 'b', text: '"What evidence supports it, and what are the risks?"' },
            { value: 'c', text: '"When can we start?"' },
            { value: 'd', text: '"Will my boss like it?"' }
          ],
          correct: 'b'
        },
        {
          id: 'T4',
          text: 'You\'re given conflicting reports from two departments. What do you do?',
          options: [
            { value: 'a', text: 'Pick the one you trust most' },
            { value: 'b', text: 'Cross-check both reports and look for objective facts' },
            { value: 'c', text: 'Choose whichever is faster to act on' },
            { value: 'd', text: 'Ask your manager to decide' }
          ],
          correct: 'b'
        },
        {
          id: 'T5',
          text: 'An ad says "90% of users improved in 1 week." Your thought?',
          options: [
            { value: 'a', text: '"That\'s impressive!"' },
            { value: 'b', text: '"How was this measured? Sample size?"' },
            { value: 'c', text: '"I need this product"' },
            { value: 'd', text: '"It must be fake"' }
          ],
          correct: 'b'
        }
      ]
    },
    {
      name: 'timeManagement',
      title: 'Time Management',
      description: 'How you prioritize and structure your time for maximum effectiveness.',
      questions: [
        {
          id: 'M1',
          text: 'You have 10 urgent emails and a big project due tomorrow. What do you do first?',
          options: [
            { value: 'a', text: 'Answer all emails first' },
            { value: 'b', text: 'Prioritize project work, then check emails in batches' },
            { value: 'c', text: 'Multitask between both' },
            { value: 'd', text: 'Let the project slide to finish emails' }
          ],
          correct: 'b'
        },
        {
          id: 'M2',
          text: 'You keep missing self-imposed deadlines. What\'s the best fix?',
          options: [
            { value: 'a', text: 'Set smaller milestones with clear timelines' },
            { value: 'b', text: 'Work longer hours' },
            { value: 'c', text: 'Avoid setting deadlines' },
            { value: 'd', text: 'Wait until you feel motivated' }
          ],
          correct: 'a'
        },
        {
          id: 'M3',
          text: 'A colleague asks for "just 5 minutes" during your focus time. What\'s best?',
          options: [
            { value: 'a', text: 'Say yes every time to be helpful' },
            { value: 'b', text: 'Schedule a time after your current task' },
            { value: 'c', text: 'Stop your work and talk' },
            { value: 'd', text: 'Ignore them' }
          ],
          correct: 'b'
        },
        {
          id: 'M4',
          text: 'You\'re overwhelmed by multiple projects. What\'s your move?',
          options: [
            { value: 'a', text: 'Tackle the easiest first' },
            { value: 'b', text: 'Use priority matrix (urgent vs important) to decide' },
            { value: 'c', text: 'Work on all a little at a time' },
            { value: 'd', text: 'Ask someone else to pick for you' }
          ],
          correct: 'b'
        },
        {
          id: 'M5',
          text: 'Your meetings always run over. What\'s the fix?',
          options: [
            { value: 'a', text: 'Shorter agendas with time-boxed items' },
            { value: 'b', text: 'Talk faster' },
            { value: 'c', text: 'Cancel meetings' },
            { value: 'd', text: 'Let people leave when they want' }
          ],
          correct: 'a'
        }
      ]
    },
    {
      name: 'productivity',
      title: 'Productivity',
      description: 'How you align effort with goals and maintain energy for high-impact work.',
      questions: [
        {
          id: 'P1',
          text: 'You\'re busy all day but achieve little. What\'s your fix?',
          options: [
            { value: 'a', text: 'Make a to-do list based on importance, not urgency' },
            { value: 'b', text: 'Work longer hours' },
            { value: 'c', text: 'Take fewer breaks' },
            { value: 'd', text: 'Do easy tasks first to gain momentum' }
          ],
          correct: 'a'
        },
        {
          id: 'P2',
          text: 'You notice energy dips in the afternoon. What\'s the best approach?',
          options: [
            { value: 'a', text: 'Push through without a break' },
            { value: 'b', text: 'Take a short walk or do a quick reset activity' },
            { value: 'c', text: 'Drink more coffee' },
            { value: 'd', text: 'Shift heavy tasks to morning' }
          ],
          correct: 'd'
        },
        {
          id: 'P3',
          text: 'You keep switching between apps/tasks. What\'s best?',
          options: [
            { value: 'a', text: 'Accept it as normal' },
            { value: 'b', text: 'Use focus blocks with app/site blockers' },
            { value: 'c', text: 'Multitask efficiently' },
            { value: 'd', text: 'Switch only when bored' }
          ],
          correct: 'b'
        },
        {
          id: 'P4',
          text: 'Your team\'s output is inconsistent. What\'s the first fix?',
          options: [
            { value: 'a', text: 'Set clear, measurable goals and track progress' },
            { value: 'b', text: 'Hire more people' },
            { value: 'c', text: 'Do the work yourself' },
            { value: 'd', text: 'Reduce expectations' }
          ],
          correct: 'a'
        },
        {
          id: 'P5',
          text: 'You feel constantly "busy" but unclear on progress. What should you do?',
          options: [
            { value: 'a', text: 'Review progress vs goals weekly' },
            { value: 'b', text: 'Ask someone else to track for you' },
            { value: 'c', text: 'Work harder next week' },
            { value: 'd', text: 'Ignore the feeling' }
          ],
          correct: 'a'
        }
      ]
    }
  ];

  const handleAnswer = (skillName: string, questionId: string, answer: string) => {
    setResponses(prev => ({
      ...prev,
      [skillName]: { ...prev[skillName as keyof typeof prev], [questionId]: answer }
    }));
  };

  const canProceed = () => {
    const currentSkillData = skills[currentSkill];
    const skillResponses = responses[currentSkillData.name as keyof typeof responses] as { [key: string]: string };
    return Object.keys(skillResponses).length === currentSkillData.questions.length;
  };

  const handleNextSkill = () => {
    if (currentSkill < skills.length - 1) {
      setCurrentSkill(currentSkill + 1);
    } else {
      // Calculate final scores and complete
      const finalData = calculateFinalScores();
      onComplete(3, finalData);
    }
  };

  const calculateFinalScores = (): Stage3Data => {
    const scores: any = {};
    const strengths: string[] = [];
    const areasForGrowth: string[] = [];

    skills.forEach(skill => {
      const skillResponses = responses[skill.name as keyof typeof responses] as { [key: string]: string };
      let correctAnswers = 0;

      skill.questions.forEach(question => {
        if (skillResponses[question.id] === question.correct) {
          correctAnswers++;
        }
      });

      const score = Math.round((correctAnswers / skill.questions.length) * 10);
      scores[skill.name] = score;

      if (score >= 8) {
        strengths.push(skill.title);
      } else if (score <= 4) {
        areasForGrowth.push(skill.title);
      }
    });

    return {
      ...responses,
      scores,
      strengths,
      areasForGrowth
    };
  };

  const getScoreInterpretation = (score: number, skillName: string): string => {
    if (score >= 8) {
      return `Strong ${skillName} skills`;
    } else if (score >= 6) {
      return `Good ${skillName} with room for improvement`;
    } else if (score >= 4) {
      return `Developing ${skillName} skills`;
    } else {
      return `Needs focus on ${skillName}`;
    }
  };

  const currentSkillData = skills[currentSkill];

  return (
    <div>
      {/* Progress Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4 text-text-headings">
          {currentSkillData.title}
        </h2>
        <p className="text-text-muted mb-4">
          {currentSkillData.description}
        </p>
        <div className="flex justify-center space-x-2">
          {skills.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentSkill
                  ? 'bg-primary-orange'
                  : index < currentSkill
                  ? 'bg-primary-aqua'
                  : 'bg-white/[0.1]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {currentSkillData.questions.map((question, index) => (
          <Card key={question.id} className="p-6">
            <div className="mb-4">
              <span className="text-sm text-text-muted">
                Question {index + 1} of {currentSkillData.questions.length}
              </span>
            </div>
            
            <p className="text-text-body mb-4 font-medium">{question.text}</p>
            
            <div className="space-y-3">
              {question.options.map((option) => (
                <label key={option.value} className="flex items-start space-x-3 cursor-pointer p-3 rounded-lg hover:bg-white/[0.02] transition-colors">
                  <input
                    type="radio"
                    name={question.id}
                    value={option.value}
                    checked={responses[currentSkillData.name as keyof typeof responses][question.id] === option.value}
                    onChange={() => handleAnswer(currentSkillData.name, question.id, option.value)}
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

      {/* Navigation */}
      <div className="mt-8 text-center">
        {canProceed() && (
          <Button
            onClick={handleNextSkill}
            variant="primary"
            size="lg"
            className="glow-orange-hover"
          >
            {currentSkill === skills.length - 1 ? 'Complete Assessment' : 'Continue to Next Skill'}
          </Button>
        )}
        
        {!canProceed() && (
          <p className="text-text-muted">
            Please complete all questions to continue
          </p>
        )}
      </div>

      {/* End-of-Section Cliffhanger */}
      {currentSkill === skills.length - 1 && (
        <div className="mt-8 p-6 bg-gradient-to-r from-primary-orange/10 to-primary-aqua/10 border border-primary-orange/20 rounded-2xl text-center">
          <p className="text-text-body mb-4">
            Great work! We've assessed your core skills. Next, we'll explore your goals and motivations to create your personalized path.
          </p>
        </div>
      )}
    </div>
  );
}

