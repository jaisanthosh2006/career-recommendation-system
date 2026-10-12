import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import {
  PlayCircle,
  FileText,
  Sparkles,
  Download,
  MessageSquare,
  HelpCircle,
  Clock,
  Users,
  Award,
  Calendar,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Video,
  Image as ImageIcon,
  FileCode
} from 'lucide-react';
import './RecordingCenter.css';

const recordedSessions = [
  {
    id: 'rec-001',
    title: 'Mastering AI Resume & Portfolio Building',
    mentor: 'Dr. Sarah Jenkins',
    mentorRole: 'Senior Staff AI Recruiter @ Google',
    domain: 'cs',
    date: 'July 20, 2025',
    duration: '58 mins',
    attendees: 72,
    summary: 'Covered ATS keyword optimization, GitHub portfolio structure, and STAR method for behavioral interviews at FAANG companies.',
    aiNotes: [
      'ATS parsers prioritize skills section placement in top 1/3 of resume.',
      'GitHub README.md should include architecture diagrams and performance benchmarks.',
      'STAR method: Situation → Task → Action → Result for every bullet point.',
      'Include quantified metrics: "Reduced API latency by 35%" instead of "Improved performance."',
      'LinkedIn headline should match target job title keywords exactly.'
    ],
    aiQuiz: [
      { q: 'What is the recommended placement for the skills section in an ATS resume?', a: 'Top 1/3 of the resume' },
      { q: 'What does the STAR method stand for?', a: 'Situation, Task, Action, Result' },
      { q: 'Why should you quantify metrics on your resume?', a: 'To demonstrate measurable impact and pass ATS keyword matching' }
    ],
    resources: [
      { name: 'ATS Resume Template.pdf', type: 'pdf', icon: '📄' },
      { name: 'GitHub Portfolio Checklist.md', type: 'doc', icon: '📋' },
      { name: 'session_code_demo.py', type: 'code', icon: '💻' },
      { name: 'Interview STAR Framework.pptx', type: 'ppt', icon: '📊' }
    ],
    qaHighlights: [
      { q: 'How many projects should a fresher have?', a: 'Minimum 3-4 quality projects with deployed links and clean README documentation.' },
      { q: 'Which ATS keywords rank highest for SDE roles?', a: 'React, Python, System Design, CI/CD, AWS, Docker, Kubernetes, REST API.' },
      { q: 'Should I include a photo on my resume?', a: 'No — most ATS systems ignore images, and many companies have bias-free hiring policies.' }
    ],
    chatHighlights: [
      { sender: 'Mentor', text: 'Always tailor your resume for each specific job description. One-size-fits-all resumes score 40-50% on ATS.' },
      { sender: 'Student', text: 'What about open-source contributions?' },
      { sender: 'Mentor', text: 'Excellent point! Open-source PRs demonstrate collaboration and real-world coding. Always link them.' }
    ]
  },
  {
    id: 'rec-002',
    title: 'Clinical Case Study: Cardiac Emergency Management',
    mentor: 'Dr. Rajesh Sharma, MD',
    mentorRole: 'Chief Cardiologist @ AIIMS Delhi',
    domain: 'medical',
    date: 'July 19, 2025',
    duration: '62 mins',
    attendees: 58,
    summary: 'Deep dive into 12-lead ECG interpretation, ESI triage levels, and acute MI MONA protocol application in high-volume ER settings.',
    aiNotes: [
      'ST-elevation in leads II, III, aVF = Inferior STEMI → immediate cath lab activation.',
      'ESI Level 1: Immediate life-saving intervention required (intubation, defibrillation).',
      'MONA Protocol: Morphine, Oxygen, Nitroglycerin, Aspirin — administer within 10 minutes.',
      'Door-to-balloon time target: Under 90 minutes for primary PCI in STEMI.',
      'Troponin I levels > 0.04 ng/mL indicate myocardial injury.'
    ],
    aiQuiz: [
      { q: 'What does ST-elevation in leads II, III, aVF indicate?', a: 'Inferior STEMI (myocardial infarction)' },
      { q: 'What is the door-to-balloon time target for STEMI?', a: 'Under 90 minutes' },
      { q: 'What does MONA stand for in cardiac emergency protocol?', a: 'Morphine, Oxygen, Nitroglycerin, Aspirin' }
    ],
    resources: [
      { name: '12-Lead ECG Interpretation Guide.pdf', type: 'pdf', icon: '📄' },
      { name: 'ESI Triage Flowchart.png', type: 'image', icon: '🖼️' },
      { name: 'Cardiac Emergency Checklist.pdf', type: 'pdf', icon: '📋' },
      { name: 'MONA Protocol Quick Reference.pdf', type: 'pdf', icon: '💊' }
    ],
    qaHighlights: [
      { q: 'What is the door-to-balloon time target?', a: 'Under 90 minutes for primary PCI in STEMI patients.' },
      { q: 'When is thrombolytic therapy preferred over PCI?', a: 'When cath lab is unavailable or transfer time exceeds 120 minutes.' }
    ],
    chatHighlights: [
      { sender: 'Mentor', text: 'In a real ER scenario, your first 10 minutes determine the patient outcome. Speed and protocol adherence save lives.' },
      { sender: 'Student', text: 'How do we differentiate STEMI from NSTEMI on ECG?' },
      { sender: 'Mentor', text: 'STEMI shows persistent ST-elevation ≥1mm in 2+ contiguous leads. NSTEMI shows ST-depression or T-wave inversion without elevation.' }
    ]
  }
];

export default function RecordingCenter() {
  const { activeDomain } = useStore();
  const [expandedId, setExpandedId] = useState(null);
  const [activeTab, setActiveTab] = useState('summary');

  const filteredSessions = recordedSessions.filter(s => s.domain === activeDomain);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
    setActiveTab('summary');
  };

  return (
    <div className="recording-center-container">
      {/* Header */}
      <div className="rec-header-card">
        <div className="header-badge">
          <Video size={14} />
          <span>CLASS RECORDING & AI LEARNING CENTER • POST-SESSION ARCHIVE</span>
        </div>
        <h1>Recorded Sessions & AI Learning Center</h1>
        <p>Revisit past live mentor classes with full video recordings, AI-generated summaries, automatic notes, shared resources, chat history, Q&A highlights, and AI-powered practice quizzes — all preserved for your continuous learning.</p>
      </div>

      {/* Sessions List */}
      <div className="rec-sessions-list">
        {filteredSessions.map((session) => (
          <div key={session.id} className={`rec-session-card glass ${expandedId === session.id ? 'expanded' : ''}`}>
            {/* Card Header */}
            <div className="rec-card-header" onClick={() => toggleExpand(session.id)}>
              <div className="rec-card-left">
                <div className="rec-play-icon">
                  <PlayCircle size={28} />
                </div>
                <div>
                  <h3>{session.title}</h3>
                  <p className="rec-mentor-line">{session.mentor} • {session.mentorRole}</p>
                </div>
              </div>
              <div className="rec-card-right">
                <div className="rec-meta-chips">
                  <span className="rec-chip"><Calendar size={12} /> {session.date}</span>
                  <span className="rec-chip"><Clock size={12} /> {session.duration}</span>
                  <span className="rec-chip"><Users size={12} /> {session.attendees} Attended</span>
                </div>
                {expandedId === session.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
            </div>

            {/* Expanded Content */}
            {expandedId === session.id && (
              <div className="rec-expanded-body">
                {/* Inner Tabs */}
                <div className="rec-inner-tabs">
                  {['summary', 'ai-notes', 'resources', 'qa', 'chat', 'quiz'].map(tab => (
                    <button
                      key={tab}
                      className={`rec-tab ${activeTab === tab ? 'active' : ''}`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab === 'summary' && <><Sparkles size={13} /> AI Summary</>}
                      {tab === 'ai-notes' && <><FileText size={13} /> AI Notes</>}
                      {tab === 'resources' && <><Download size={13} /> Resources</>}
                      {tab === 'qa' && <><HelpCircle size={13} /> Q&A</>}
                      {tab === 'chat' && <><MessageSquare size={13} /> Chat</>}
                      {tab === 'quiz' && <><Award size={13} /> Quiz</>}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="rec-tab-content">
                  {activeTab === 'summary' && (
                    <div className="rec-summary-panel">
                      <div className="ai-badge-row"><Sparkles size={14} /> AI-Generated Session Summary</div>
                      <p className="summary-text">{session.summary}</p>
                    </div>
                  )}

                  {activeTab === 'ai-notes' && (
                    <div className="rec-notes-panel">
                      <div className="ai-badge-row"><Sparkles size={14} /> AI-Extracted Key Concepts & Notes</div>
                      <ul className="notes-list">
                        {session.aiNotes.map((note, i) => (
                          <li key={i}>{note}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeTab === 'resources' && (
                    <div className="rec-resources-panel">
                      <div className="ai-badge-row"><Download size={14} /> Shared Files & Teaching Materials</div>
                      <div className="resources-grid">
                        {session.resources.map((res, i) => (
                          <div key={i} className="resource-file-card">
                            <span className="res-icon">{res.icon}</span>
                            <span className="res-name">{res.name}</span>
                            <button className="res-download-btn">Download</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'qa' && (
                    <div className="rec-qa-panel">
                      <div className="ai-badge-row"><HelpCircle size={14} /> Live Q&A Highlights</div>
                      {session.qaHighlights.map((qa, i) => (
                        <div key={i} className="qa-highlight-card">
                          <p className="qa-q"><strong>Q:</strong> {qa.q}</p>
                          <p className="qa-a"><strong>A:</strong> {qa.a}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'chat' && (
                    <div className="rec-chat-panel">
                      <div className="ai-badge-row"><MessageSquare size={14} /> Chat History Highlights</div>
                      {session.chatHighlights.map((msg, i) => (
                        <div key={i} className={`chat-highlight-row ${msg.sender.toLowerCase()}`}>
                          <strong>{msg.sender}:</strong>
                          <p>{msg.text}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'quiz' && (
                    <div className="rec-quiz-panel">
                      <div className="ai-badge-row"><Award size={14} /> AI-Generated Practice Quiz</div>
                      {session.aiQuiz.map((item, i) => (
                        <QuizCard key={i} index={i} question={item.q} answer={item.a} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function QuizCard({ index, question, answer }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="quiz-item-card">
      <p className="quiz-question"><strong>Q{index + 1}:</strong> {question}</p>
      {revealed ? (
        <p className="quiz-answer">✅ {answer}</p>
      ) : (
        <button className="reveal-btn" onClick={() => setRevealed(true)}>Reveal Answer</button>
      )}
    </div>
  );
}
