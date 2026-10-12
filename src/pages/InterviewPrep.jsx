import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { MOCK_INTERVIEW_QUESTIONS } from '../data/mockData';
import { Mic, MicOff, Volume2, Sparkles, CheckCircle2, Award, RefreshCw, Send, Play } from 'lucide-react';
import './InterviewPrep.css';

export default function InterviewPrep() {
  const { activeDomain } = useStore();
  const questions = activeDomain === 'cs' ? MOCK_INTERVIEW_QUESTIONS.cs : MOCK_INTERVIEW_QUESTIONS.medical;

  const [activeQuestion, setActiveQuestion] = useState(questions[0]);
  const [userAnswerText, setUserAnswerText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setUserAnswerText("I would approach this by first analyzing the symptoms / system requirements, ensuring standardization, and then implementing key protocols...");
    } else {
      setIsRecording(false);
    }
  };

  const handleEvaluate = () => {
    if (!userAnswerText.trim()) return;
    setIsEvaluating(true);

    setTimeout(() => {
      setEvaluation({
        confidenceScore: 88,
        communicationScore: 92,
        technicalAccuracy: 86,
        overallRating: 'Strong Pass',
        aiFeedback: [
          'Excellent structural breakdown and clear articulation.',
          'Good usage of industry-standard terminology.',
          'Tip: Include 1 specific numerical metric or case result to solidify your response.'
        ]
      });
      setIsEvaluating(false);
    }, 1200);
  };

  return (
    <div className="interview-page-container">
      {/* Header */}
      <div className="prep-header-card">
        <div className="header-badge">
          <Mic size={14} />
          <span>AI VOICE & TECHNICAL INTERVIEW PRACTICE • {activeDomain.toUpperCase()}</span>
        </div>
        <h1>AI Mock Interview & Practice Hub</h1>
        <p>Practice HR, technical CS coding, system design, and medical clinical case study interviews with real-time AI speech-to-text feedback and scoring.</p>
      </div>

      {/* Main Grid */}
      <div className="interview-main-grid">
        {/* Left Column: Questions List */}
        <div className="questions-sidebar-col glass">
          <h3>Target Questions Bank</h3>
          <div className="questions-list">
            {questions.map((q) => (
              <div
                key={q.id}
                className={`question-item ${activeQuestion.id === q.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveQuestion(q);
                  setEvaluation(null);
                  setUserAnswerText('');
                }}
              >
                <span className="q-cat-tag">{q.category}</span>
                <p>{q.question}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive Mock Room */}
        <div className="mock-room-col glass">
          <div className="mock-room-header">
            <div className="ai-interviewer-avatar">🤖</div>
            <div>
              <h3>AI Senior Interviewer</h3>
              <p className="interviewer-role">{activeDomain === 'cs' ? 'Staff Software Recruiter' : 'Chief Clinical Officer'}</p>
            </div>
          </div>

          {/* Question Box */}
          <div className="question-display-box">
            <span className="q-label">CURRENT QUESTION:</span>
            <h4>"{activeQuestion.question}"</h4>
          </div>

          {/* Voice & Answer Input */}
          <div className="answer-input-container">
            <div className="voice-controls-bar">
              <button className={`record-mic-btn ${isRecording ? 'recording' : ''}`} onClick={toggleRecording}>
                {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
                <span>{isRecording ? 'Recording (Click to Stop)' : 'Start Voice Practice'}</span>
              </button>

              <button className="sample-audio-btn" onClick={() => alert("Playing sample benchmark answer...")}>
                <Volume2 size={16} />
                <span>Listen to Benchmark Answer</span>
              </button>
            </div>

            <textarea
              rows="5"
              placeholder="Your answer speech-to-text transcript will appear here. Or type your response directly..."
              value={userAnswerText}
              onChange={(e) => setUserAnswerText(e.target.value)}
            />

            <button className="submit-eval-btn" onClick={handleEvaluate} disabled={isEvaluating}>
              <Sparkles size={16} />
              <span>{isEvaluating ? 'Evaluating Response...' : 'Evaluate Answer with AI'}</span>
            </button>
          </div>

          {/* AI Score Feedback Results */}
          {evaluation && (
            <div className="eval-results-card">
              <div className="eval-scores-row">
                <div className="eval-chip">
                  <span className="label">Confidence</span>
                  <span className="score purple">{evaluation.confidenceScore}%</span>
                </div>
                <div className="eval-chip">
                  <span className="label">Communication</span>
                  <span className="score blue">{evaluation.communicationScore}%</span>
                </div>
                <div className="eval-chip">
                  <span className="label">Technical Accuracy</span>
                  <span className="score green">{evaluation.technicalAccuracy}%</span>
                </div>
              </div>

              <div className="overall-rating-banner">
                <span>Verdict: <strong>{evaluation.overallRating} 🚀</strong></span>
              </div>

              <div className="ai-feedback-notes">
                <h5>AI Feedback & Optimization:</h5>
                <ul>
                  {evaluation.aiFeedback.map((fb, i) => (
                    <li key={i}>{fb}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
