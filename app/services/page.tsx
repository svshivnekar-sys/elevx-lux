"use client";
import React, { useState } from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Card from '../../components/Card';

interface ServiceCardProps {
  title: string;
  subtitle: string;
  content: string;
  cta: string;
  icon: string;
  isExpanded: boolean;
  onToggle: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  title, 
  subtitle, 
  content, 
  cta, 
  icon, 
  isExpanded, 
  onToggle 
}) => {
  return (
    <Card 
      variant="accent" 
      className={`transition-all duration-500 ease-out cursor-pointer group ${
        isExpanded ? 'scale-105 shadow-2xl' : 'hover:scale-102'
      }`}
      onClick={onToggle}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-accent to-secondary-accent rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {icon}
          </div>
          <div>
            <h3 className="text-xl font-bold text-text-headings group-hover:text-primary-accent transition-colors">
              {title}
            </h3>
            <p className="text-text-muted text-sm">{subtitle}</p>
          </div>
        </div>
        <button 
          className={`w-8 h-8 rounded-full border-2 border-text-muted flex items-center justify-center transition-all duration-300 ${
            isExpanded 
              ? 'border-primary-accent bg-primary-accent text-white rotate-45' 
              : 'hover:border-primary-accent hover:text-primary-accent'
          }`}
        >
          <span className="text-lg font-bold">+</span>
        </button>
      </div>
      
      <div className={`overflow-hidden transition-all duration-500 ease-out ${
        isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="pt-4 border-t border-border-subtle">
          <div className="prose prose-invert max-w-none">
            <p className="text-text-body leading-relaxed mb-6 whitespace-pre-line">
              {content}
            </p>
            <div className="bg-gradient-to-r from-primary-accent/10 to-secondary-accent/10 p-4 rounded-lg border border-primary-accent/20">
              <p className="text-text-body font-medium mb-3">{cta}</p>
              <Button variant="primary" size="sm">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default function ServicesPage() {
  const [expandedService, setExpandedService] = useState<number | null>(null);

  const services = [
    {
      title: "SALES CONSULTANCY",
      subtitle: "Transform your sales from pushy to purposeful",
      icon: "💼",
      content: `"We tried everything, but the deals just don't close." Heard that before? Maybe you've even said it.

Your team's working hard, showing up for calls, sending follow-ups, chasing leads. And yet… the graph flatlines. The targets feel out of reach. Sales feels like a puzzle where some pieces are always missing.

Here's the thing — Most sales problems aren't because your team is lazy or bad. It's usually because your system is leaky. And sometimes, the biggest leak? It's invisible.

Let me explain. We humans buy based on emotion and justify it with logic. But most sales teams do it the other way round. They throw logic, features, and pricing upfront—and then wonder why the prospect ghosts them.

According to a Harvard study, 95% of buying decisions are subconscious. That means the emotional part of the brain decides first, and the logical part just comes in later and nods, "Yeah, yeah, this makes sense."

But guess what? Your sales pitch probably speaks only to the logical brain. And the emotional brain? It's out the door before your second slide.

That's where we come in. We help you fix this from the inside out. We don't just tell you to "pitch better." We sit with you. We listen to your calls. We study your customer journey. We find those hidden cracks—where leads fall through. Then we help your team build conversations that connect, not just convince.

Imagine this— Your sales team walks into calls feeling clear and calm. They stop chasing. They start attracting. They don't push. They pull. And they close—not with pressure, but with purpose.

We call this "Sales with Soul." Because your product solves a real problem. It deserves to reach the right people. And your team deserves to feel proud, not pushy.`,
      cta: "If this sounds like the kind of shift your sales team needs—Don't worry. You don't have to figure it all out alone. Just send us a message. We'll take a quick look at your sales setup and tell you where the friction is. No pressure. No push. Just honest feedback—and a fresh perspective. Let's make sales feel human again."
    },
    {
      title: "BRAND CONSULTANCY",
      subtitle: "Make your brand feel like you, not a template",
      icon: "🎨",
      content: `So here's a quick story. There was this brilliant founder I met—sharp, driven, building something genuinely useful. He said, "We've got everything sorted—product, people, even the pitch. But when we put it out there, nobody's reacting. It's like we're invisible."

Ever felt like that? You know you're doing meaningful work. But your brand just isn't sticking in people's minds. No buzz. No emotion. No story that pulls people in.

Let's talk about why that happens. Most businesses start by building the service. And then try to build the brand around it. But branding doesn't work like a wrapper. It's not packaging.

It's the emotion beneath the surface. The stuff people feel but can't always explain. It's the "I don't know what it is about them… but I like them." That's branding done right. It bypasses the brain. It hits the heart.

And that's exactly what we help you do. We help you strip away the noise. We get to the essence of why you exist and why anyone should care. Then we turn that into language, visuals, tone, and energy—the kind that makes people pause and say, "I like this. This feels different."

This is not a branding template. This is emotional alignment, built from scratch.

Want to test your brand's clarity? Ask a stranger—"What do you think we do?" If their answer sounds nothing like your vision, the problem isn't them. It's the gap between your message and their mind.

Final thought. In a noisy world, it's not the loudest brand that wins. It's the clearest one. The one that knows itself—and makes others feel seen too.`,
      cta: "If you're ready for your brand to sound like you, feel like you, and actually work for you—Send us a message. We'll help you say the one thing your market has been waiting to hear: 'We get you.'"
    },
    {
      title: "CORPORATE TRAINING",
      subtitle: "Training that sticks, not just feels good",
      icon: "🏢",
      content: `Let's keep this simple. You don't want feel-good sessions. You want change. You want your people to grow—and that growth to show up in how they speak, lead, sell, and work.

We get that. Because most corporate trainings are like a sugar rush. Fun while it lasts, but gone before Monday morning. People return with notebooks full of notes… and zero behavior change. You've seen it. We've seen it. It's a thing.

So, here's how we do it differently. We focus on what sticks. Not buzzwords. Not theory. Not death-by-PPT. We design experiences your team can connect with. Real-world, story-based, interactive sessions. Built around your problems. Not someone else's template.

We bring in neuroscience, psychology, and lived workplace examples—But we keep the language human. Because no one learns when they're busy translating jargon.

What does that look like? Your salespeople actually listen to objections—and respond with clarity. Your team communicates better—with clients and with each other. Your leaders don't just delegate—they inspire. Your employees start showing up like they own the place (in the good way).

It's not magic. It's design.

Try this: Ask your team what they remember from the last training they attended. If all they say is "some activities" and "that part where we laughed"—you've got a content-retention issue. Training should build habits. Not just hype.

And just so we're clear— We don't promise overnight miracles. We promise measurable shifts. Small, steady changes that become muscle memory. Because real transformation doesn't come from more training. It comes from the right kind of training.`,
      cta: "If you're done ticking boxes, and want a training partner who actually understands the inside of your company—send us a message. Let's build something that works for your people—not just for the report."
    },
    {
      title: "LIFE COACHING",
      subtitle: "Gentle guidance to unlock your potential",
      icon: "🌟",
      content: `There's a quiet kind of struggle most people don't talk about. It's not dramatic. It's not loud. It's just… that feeling.

You wake up with a weight you can't explain. You go through the motions. You smile at work. You check off the to-do list. But somewhere inside, you're wondering—Is this it?

You want more clarity. More energy. More you in your own life.

You're not broken. You're just… blocked. And no, you don't need 100 motivational quotes. You need something gentler. Something real.

Sometimes, you just need one person to ask the right question. The one that cuts through the noise. The one that makes you pause and say, "Wait. Why haven't I thought about that before?"

That's where we come in.

This is not therapy. This is not a lecture. It's a quiet space. For you to speak without being judged. For your story to breathe. For your thoughts to land.

We use coaching, NLP, behavioral science, and emotional intelligence—But you'll never feel like you're being "fixed." You'll feel like you're being heard. And slowly, you'll start hearing yourself too.

So what changes? You learn to respond, not react. You stop doubting yourself every two steps. You set real boundaries—without guilt. You stop chasing what looks good and start choosing what feels right. You become the kind of person you always sensed you could be.

And it won't happen overnight. But it will happen—bit by bit, moment by moment.

Try this right now: Take a deep breath. Ask yourself, "What part of me have I been ignoring lately?" Don't fix it. Just listen.

Final thought. Life isn't meant to feel like a constant hustle. You're allowed to pause. You're allowed to want more. You're allowed to reimagine the path—even if everyone thinks you're already "doing great."`,
      cta: "If any of this felt close to home…maybe it's time to talk. Send us a message. We'll take the first step together. No pressure. No judgement. Just a real conversation."
    },
    {
      title: "MID LIFE COUNSELING",
      subtitle: "Navigate the fog and find your way back to you",
      icon: "🧭",
      content: `Let me guess. From the outside, your life probably looks… fine. A steady job. A decent family. Responsibilities checked. You're doing what you're "supposed" to do.

And yet—something doesn't feel right. You're not sad, exactly. You're just tired. Confused. Disinterested in things that once brought joy. Craving something more, but unsure what that even means anymore.

If this sounds familiar, you're not alone. This is the silent ache of mid-life.

You've been giving for years—to your work, to your family, to society, to survival. But now, the giving has left you feeling… empty. Like a part of you got lost in the process. Or maybe never fully got discovered at all.

You wake up and wonder, "Is this how the rest of my life will feel?"

It's not depression in the clinical sense. It's something quieter. A soul-level confusion. A disconnection from meaning.

Let's talk about the truth behind it. Mid-life crisis isn't about sports cars and quitting jobs. It's about losing sight of why you're doing all this in the first place. It's the moment your mind says: "I've built a life. But… is it my life?"

And here's the strange part—Even asking that question can make you feel guilty. Because, well, you have so much to be "grateful" for, right? So you keep quiet. Keep moving. Keep pretending.

But inside, you feel stuck. Heavy. Disconnected. Like you're walking with no map, in a fog you can't explain.

That's where our Mid-Life Counseling helps. No preaching. No fixing. No "5 steps to happiness." We help you slow down. Sit with your questions. Sort the chaos. Rediscover the version of you that got buried under bills, roles, and routines.

We combine emotional clarity work, NLP, identity re-mapping, belief detox, and deep inner work—But all of it feels like a conversation. Like finally being able to say what you've been carrying inside your head for years.

Small thing you can try today: Take 5 minutes. Write down what you've stopped doing over the last 5 years. Not big things. Little joys. Listening to music. Walking slowly. Drawing. Laughing. Now ask: Why did I stop?

Here's what we believe: You don't need to burn it all down. You just need to remember what makes you feel alive. It's not too late. You're not too far gone. This chapter? It's yours to rewrite.`,
      cta: "If this feels like it was written for you…it probably was. You don't have to carry this fog alone. Send us a message. Let's sit down and talk. No pressure. No fixing. Just clarity, one honest conversation at a time."
    }
  ];

  const handleServiceToggle = (index: number) => {
    setExpandedService(expandedService === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-bg via-secondary-bg to-primary-bg py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-text-headings mb-6 bg-gradient-to-r from-primary-accent to-secondary-accent bg-clip-text text-transparent">
                Our Services
              </h1>
              <p className="text-xl text-text-body max-w-2xl mx-auto leading-relaxed">
                We don't just solve problems—we transform how you approach them. 
                Each service is crafted to unlock your potential and create lasting change.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-secondary-bg">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid gap-8">
                {services.map((service, index) => (
                  <ServiceCard
                    key={index}
                    title={service.title}
                    subtitle={service.subtitle}
                    content={service.content}
                    cta={service.cta}
                    icon={service.icon}
                    isExpanded={expandedService === index}
                    onToggle={() => handleServiceToggle(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary-accent/10 to-secondary-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-text-headings mb-6">
                Ready to Transform Your Approach?
              </h2>
              <p className="text-lg text-text-body mb-8 max-w-2xl mx-auto">
                Each service is designed to create real, measurable change. 
                Let's find the right approach for your unique situation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" size="lg">
                  Start a Conversation
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
