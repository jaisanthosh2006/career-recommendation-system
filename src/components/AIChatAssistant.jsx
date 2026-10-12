import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Bot, Send, X, Sparkles, User, RefreshCw, ChevronRight } from 'lucide-react';
import './AIChatAssistant.css';

export default function AIChatAssistant({ isOpen, onClose }) {
  const { activeDomain, user } = useStore();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: `Hello ${user.name}! I am your AI Career Intelligence Advisor. How can I assist your ${activeDomain === 'cs' ? 'Computer Science & IT' : 'Medical & Healthcare'} path today?`,
      time: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const suggestedPrompts = activeDomain === 'cs' ? [
    'How can I raise my Resume ATS score to 90%?',
    'Recommend top Full Stack & AI projects for my portfolio',
    'What skills do I need for Google Software Engineer Internships?'
  ] : [
    'What are the core competencies needed for Clinical ICU roles?',
    'How do I prepare for Medical Coding (ICD-10) certification?',
    'Recommend top Medical Research internships'
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // AI Response generation simulation based on domain & context
    setTimeout(() => {
      let aiText = '';
      const qLower = query.toLowerCase();

      if (qLower.includes('ats') || qLower.includes('resume')) {
        aiText = `Based on our ML ATS Predictor, your resume currently scores 86%. To cross 90%+:\n1. Quantify achievements with metrics.\n2. Ensure key skills like ${activeDomain === 'cs' ? 'React, Docker, System Design' : 'Pathology, ICD-10, Emergency Care'} are highlighted.\n3. Use standard bullet formatting.`;
      } else if (qLower.includes('project') || qLower.includes('portfolio')) {
        aiText = activeDomain === 'cs'
          ? `For CS & IT, I highly recommend building our "AI Medical Diagnostic Assistant" project! It covers React, FastAPI, and Gemini API—perfect for FAANG & startup resumes.`
          : `For Medical & Healthcare, check out our "Clinical Audit & ER Triage Workflow" project! It demonstrates ESI 5-level protocol mastery and hospital operations.`;
      } else if (qLower.includes('internship') || qLower.includes('google') || qLower.includes('apollo')) {
        aiText = activeDomain === 'cs'
          ? `Google & Microsoft internship applications open soon! Ensure your DSA practice streak is active and apply directly through our Job & Internship Hub.`
          : `Apollo Hospitals & AIIMS research residencies are currently accepting applications! Ensure your Clinical Skills certificate is attached.`;
      } else {
        aiText = `Great question! In the ${activeDomain === 'cs' ? 'Tech' : 'Healthcare'} industry, consistent practical experience is key. Check your AI Skill Gap analysis tab to see tailored course suggestions to accelerate your career!`;
      }

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="ai-chat-drawer">
      {/* Drawer Header */}
      <div className="ai-chat-header">
        <div className="ai-chat-title">
          <div className="ai-bot-avatar">
            <Bot size={20} />
          </div>
          <div>
            <h3>Career AI Advisor</h3>
            <span className="ai-online-tag">● Active • {activeDomain.toUpperCase()} Mode</span>
          </div>
        </div>
        <button className="ai-close-btn" onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      {/* Suggested Quick Prompts */}
      <div className="ai-prompts-bar">
        {suggestedPrompts.map((p, i) => (
          <button key={i} className="prompt-chip" onClick={() => handleSend(p)}>
            <span>{p}</span>
            <ChevronRight size={12} />
          </button>
        ))}
      </div>

      {/* Messages List */}
      <div className="ai-messages-container">
        {messages.map((m) => (
          <div key={m.id} className={`chat-bubble-row ${m.sender}`}>
            {m.sender === 'ai' && (
              <div className="msg-avatar ai">
                <Sparkles size={14} />
              </div>
            )}
            <div className="chat-bubble">
              <p className="bubble-text">{m.text}</p>
              <span className="bubble-time">{m.time}</span>
            </div>
            {m.sender === 'user' && (
              <div className="msg-avatar user">
                <User size={14} />
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="chat-bubble-row ai">
            <div className="msg-avatar ai"><Bot size={14} /></div>
            <div className="chat-bubble typing">
              <span className="dot" /><span className="dot" /><span className="dot" />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="ai-chat-input-area">
        <input
          type="text"
          placeholder={`Ask Career AI about ${activeDomain === 'cs' ? 'coding, ATS, jobs...' : 'clinical skills, coding, medical roles...'}`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button className="ai-send-btn" onClick={() => handleSend()}>
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
