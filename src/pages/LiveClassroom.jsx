import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useStore } from '../store/useStore';
import { 
  Video, 
  Mic, 
  MicOff, 
  VideoOff, 
  Monitor, 
  PenTool, 
  MessageSquare, 
  HelpCircle, 
  BarChart2, 
  FolderDown, 
  Users, 
  Maximize, 
  Clock, 
  Hand, 
  Sparkles, 
  X, 
  Send, 
  FileCode, 
  Stethoscope, 
  CheckCircle, 
  Play, 
  Award,
  Pin,
  ThumbsUp,
  Image as ImageIcon,
  Type,
  Eraser,
  Palette,
  Minus,
  Plus,
  Trash2,
  MousePointer
} from 'lucide-react';
import './LiveClassroom.css';

const SERVER_URL = 'http://localhost:4000';

export default function LiveClassroom() {
  const { classId } = useParams();
  const navigate = useNavigate();
  const { activeDomain, user, addXP } = useStore();

  const getAIInstructor = () => {
    if (activeDomain === 'medical') {
      if (classId === 'class-002') {
        return {
          name: 'Dr. Rajesh Sharma, MD',
          role: 'Chief Cardiologist @ AIIMS Delhi',
          img: '/ai_instructor_male.png'
        };
      }
      return {
        name: 'Elena Rostova, MHA',
        role: 'Director of Healthcare Admin @ Mayo Clinic',
        img: '/ai_instructor_female.png'
      };
    } else {
      if (classId === 'class-001') {
        return {
          name: 'Dr. Sarah Jenkins',
          role: 'Senior Staff AI Recruiter @ Google',
          img: '/ai_instructor_female.png'
        };
      }
      return {
        name: 'Alex Rivera',
        role: 'Principal Cloud Architect @ AWS',
        img: '/ai_instructor_male.png'
      };
    }
  };

  const currentInstructor = getAIInstructor();

  const [classInfo, setClassInfo] = useState(null);
  const [accessStatus, setAccessStatus] = useState('granted'); // granted
  const [participants, setParticipants] = useState([
    { id: 'mentor-1', name: currentInstructor.name, role: 'mentor', avatar: '👨‍🏫', designation: currentInstructor.role },
    { id: 'user-self', name: `${user?.name || 'Sandy'} (You)`, role: 'student', avatar: '👤', handRaised: false }
  ]);

  // Main Display View: 'video' | 'whiteboard' | 'code' | 'medical' | 'presentation'
  const [activeCenterView, setActiveCenterView] = useState(activeDomain === 'cs' ? 'code' : 'medical');
  
  const [activeSidebarTab, setActiveSidebarTab] = useState('chat'); // 'chat' | 'qa' | 'polls' | 'resources' | 'ai-notes'
  
  // Media Controls
  const [isMuted, setIsMuted] = useState(false);
  const [isCamOff, setIsCamOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [handRaised, setHandRaised] = useState(false);
  const [isRecording, setIsRecording] = useState(true);

  // Chat & Q&A
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Mentor', role: 'mentor', text: `Welcome everyone to today's live session! We will cover practical demonstrations, clinical/technical workflows, and resume tips.`, time: '4:00 PM', pinned: true }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  
  const [qaList, setQaList] = useState([
    { id: 1, author: 'Alex J.', question: activeDomain === 'cs' ? 'How do we handle state persistence in complex microservices?' : 'What is the immediate baseline drug protocol for acute myocardial infarction?', upvotes: 5, answered: true, answer: activeDomain === 'cs' ? 'Use Redis caching alongside database transactions.' : 'MONA protocol (Morphine, Oxygen, Nitroglycerin, Aspirin).' }
  ]);
  const [newQuestion, setNewQuestion] = useState('');

  // AI Live Summaries & Notes
  const [aiNotesList, setAiNotesList] = useState([
    { id: 1, topic: 'Key Concept Review', text: activeDomain === 'cs' ? 'Async event loop microtasks take precedence over macrotasks.' : 'Emergency Triage ESI Level 1 requires immediate life-saving intervention.' }
  ]);
  const [isGeneratingNotes, setIsGeneratingNotes] = useState(false);

  // Live Code Editor state (CS mode)
  const [codeContent, setCodeContent] = useState(
    activeDomain === 'cs'
      ? `// Live Mentor Code Demonstration\nfunction analyzeCareerPath(domain, skills) {\n  console.log("Analyzing candidate for " + domain);\n  return {\n    atsScore: 92,\n    status: "Placement Ready"\n  };\n}\n\nanalyzeCareerPath("Full Stack AI", ["React", "FastAPI", "Python"]);`
      : `// Clinical Case Audit Log\nPatient: ID-9042\nChief Complaint: Acute chest pain & shortness of breath\nVital Signs: BP 140/90, HR 105 bpm, SpO2 94%\nInitial Protocol: Administer High-Flow Oxygen & 325mg Aspirin.`
  );

  // Canvas Whiteboard ref
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Canvas tool state
  const [canvasTool, setCanvasTool] = useState('draw'); // 'draw' | 'text' | 'eraser'
  const [penColor, setPenColor] = useState('#818cf8');
  const [penSize, setPenSize] = useState(3);
  const [textInput, setTextInput] = useState('');
  const [textPosition, setTextPosition] = useState(null);
  const [showTextInput, setShowTextInput] = useState(false);
  const textInputRef = useRef(null);
  const [canvasHistory, setCanvasHistory] = useState([]);

  const canvasColors = ['#818cf8', '#f43f5e', '#22c55e', '#f59e0b', '#3b82f6', '#ec4899', '#14b8a6', '#ffffff', '#000000'];

  const socketRef = useRef(null);

  useEffect(() => {
    // Add XP for joining live class
    addXP(100);

    // Canvas setup
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.strokeStyle = penColor;
      ctx.lineWidth = penSize;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }

    // Connect socket client
    socketRef.current = io(SERVER_URL);

    socketRef.current.emit('join-class', {
      classId: classId || 'class-001',
      userId: user.id || 'user_101',
      userName: user.name || 'Sandy'
    });

    socketRef.current.on('chat-message', (msg) => {
      setMessages(prev => {
        // Prevent duplicate messages
        if (prev.some(m => m.id === msg.id)) return prev;
        return [...prev, msg];
      });
    });

    socketRef.current.on('new-question', (qItem) => {
      setQaList(prev => {
        if (prev.some(q => q.id === qItem.id)) return prev;
        return [...prev, qItem];
      });
    });

    socketRef.current.on('question-upvoted', ({ questionId }) => {
      setQaList(prev => prev.map(q => q.id === questionId ? { ...q, upvotes: q.upvotes + 1 } : q));
    });

    socketRef.current.on('question-answered', ({ questionId, answer }) => {
      setQaList(prev => prev.map(q => q.id === questionId ? { ...q, answered: true, answer } : q));
    });

    socketRef.current.on('hand-raised', ({ userId, userName, raised }) => {
      setParticipants(prev => {
        const exists = prev.some(p => p.id === userId);
        if (exists) {
          return prev.map(p => p.id === userId ? { ...p, handRaised: raised } : p);
        } else {
          return [...prev, { id: userId, name: userName, role: 'student', avatar: '👤', handRaised: raised }];
        }
      });
    });

    socketRef.current.on('participants-update', (list) => {
      const formatted = list.map(p => ({
        id: p.userId,
        name: p.userName,
        role: p.role,
        avatar: p.role === 'mentor' ? '👨‍🏫' : '👤',
        handRaised: false
      }));
      setParticipants(prev => {
        const mentor = prev.find(p => p.role === 'mentor');
        return mentor ? [mentor, ...formatted.filter(f => f.id !== mentor.id)] : formatted;
      });
    });

    socketRef.current.on('whiteboard-draw', (drawData) => {
      if (!canvasRef.current) return;
      const ctx = canvasRef.current.getContext('2d');
      ctx.strokeStyle = drawData.color || '#818cf8';
      ctx.lineWidth = 3;
      if (drawData.type === 'start') {
        ctx.beginPath();
        ctx.moveTo(drawData.x, drawData.y);
      } else {
        ctx.lineTo(drawData.x, drawData.y);
        ctx.stroke();
      }
    });

    socketRef.current.on('whiteboard-cleared', () => {
      if (!canvasRef.current) return;
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    });

    socketRef.current.on('code-update', ({ code }) => {
      setCodeContent(code);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [classId]);

  const saveCanvasState = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL();
    setCanvasHistory(prev => [...prev, dataUrl]);
  };

  const drawOnCanvas = (e) => {
    if (!isDrawing || !canvasRef.current || canvasTool === 'text') return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);

    if (canvasTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = penSize * 4;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = penColor;
      ctx.lineWidth = penSize;
    }
    ctx.lineTo(x, y);
    ctx.stroke();

    if (socketRef.current) {
      socketRef.current.emit('whiteboard-draw', {
        classId: classId || 'class-001',
        drawData: { type: 'draw', x, y, color: canvasTool === 'eraser' ? 'eraser' : penColor }
      });
    }
  };

  const startDrawing = (e) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvasRef.current.width / rect.width);
    const y = (e.clientY - rect.top) * (canvasRef.current.height / rect.height);

    if (canvasTool === 'text') {
      setTextPosition({ x, y });
      setShowTextInput(true);
      setTextInput('');
      setTimeout(() => textInputRef.current?.focus(), 50);
      return;
    }

    saveCanvasState();
    setIsDrawing(true);
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (canvasTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = penSize * 4;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = penColor;
      ctx.lineWidth = penSize;
    }
    ctx.beginPath();
    ctx.moveTo(x, y);

    if (socketRef.current) {
      socketRef.current.emit('whiteboard-draw', {
        classId: classId || 'class-001',
        drawData: { type: 'start', x, y, color: canvasTool === 'eraser' ? 'eraser' : penColor }
      });
    }
  };

  const stopDrawing = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.globalCompositeOperation = 'source-over';
    }
    setIsDrawing(false);
  };

  const placeTextOnCanvas = () => {
    if (!canvasRef.current || !textInput.trim() || !textPosition) return;
    saveCanvasState();
    const ctx = canvasRef.current.getContext('2d');
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = penColor;
    ctx.font = `${Math.max(penSize * 5, 16)}px 'Inter', sans-serif`;
    ctx.fillText(textInput, textPosition.x, textPosition.y);
    setShowTextInput(false);
    setTextInput('');
    setTextPosition(null);
  };

  const cancelTextInput = () => {
    setShowTextInput(false);
    setTextInput('');
    setTextPosition(null);
  };

  const undoCanvas = () => {
    if (!canvasRef.current || canvasHistory.length === 0) return;
    const ctx = canvasRef.current.getContext('2d');
    const lastState = canvasHistory[canvasHistory.length - 1];
    const img = new window.Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.drawImage(img, 0, 0);
    };
    img.src = lastState;
    setCanvasHistory(prev => prev.slice(0, -1));
  };

  const clearCanvas = () => {
    if (!canvasRef.current) return;
    saveCanvasState();
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    if (socketRef.current) {
      socketRef.current.emit('whiteboard-clear', { classId: classId || 'class-001' });
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    const msg = {
      id: Date.now(),
      sender: user?.name || 'Sandy',
      role: 'student',
      text: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    if (socketRef.current) {
      socketRef.current.emit('chat-message', {
        classId: classId || 'class-001',
        message: msg
      });
    } else {
      setMessages(prev => [...prev, msg]);
    }
    setInputMessage('');
  };

  const handleAskQuestion = () => {
    if (!newQuestion.trim()) return;
    const qItem = {
      id: Date.now(),
      author: user?.name || 'Sandy',
      question: newQuestion,
      upvotes: 1,
      answered: false,
      answer: ''
    };
    setQaList(prev => [...prev, qItem]);
    setNewQuestion('');
  };

  const handleUpvoteQuestion = (qId) => {
    setQaList(prev => prev.map(q => q.id === qId ? { ...q, upvotes: q.upvotes + 1 } : q));
  };

  const handleGenerateAINotes = () => {
    setIsGeneratingNotes(true);
    setTimeout(() => {
      setAiNotesList(prev => [
        ...prev,
        {
          id: Date.now(),
          topic: 'AI Live Summary',
          text: activeDomain === 'cs'
            ? 'Covered REST API optimization, microservice caching strategies, and ATS resume keyword placement for top tech roles.'
            : 'Covered cardiac emergency triage, ECG arrhythmia identification, and hospital ICU clinical documentation protocols.'
        }
      ]);
      setIsGeneratingNotes(false);
    }, 1000);
  };

  const handleLeaveClass = () => {
    addXP(150); // XP for completing session
    alert("You have left the classroom. Attendance recorded and certificate updated!");
    navigate('/live-classes');
  };

  const toggleHandRaised = () => {
    const newState = !handRaised;
    setHandRaised(newState);
    if (socketRef.current) {
      socketRef.current.emit('raise-hand', {
        classId: classId || 'class-001',
        userId: user.id || 'user_101',
        userName: user.name || 'Sandy',
        raised: newState
      });
    }
  };

  return (
    <div className="virtual-classroom-shell">
      {/* Top Navigation Bar */}
      <header className="vc-topbar">
        <div className="vc-topbar-left">
          <div className="vc-live-indicator">
            <span className="vc-live-dot" />
            <span>LIVE SESSION</span>
          </div>
          <h2 className="vc-title">{activeDomain === 'cs' ? 'Mastering AI Resume & System Architecture' : 'Clinical Case Study: Cardiac Emergency Care'}</h2>
        </div>

        <div className="vc-topbar-right">
          <div className="vc-chip"><Clock size={14} /> 42:15 / 60:00</div>
          <div className="vc-chip"><Users size={14} /> {participants.length + 75} Attending</div>
          {isRecording && <div className="vc-chip rec"><span className="rec-dot" /> REC</div>}
          <button className="vc-leave-btn" onClick={handleLeaveClass}>Leave Room</button>
        </div>
      </header>

      {/* Main Classroom Body */}
      <div className="vc-body-grid">
        {/* Center Main Stage (Video / Code / Whiteboard / Medical Viewer) */}
        <div className="vc-stage-container">
          {/* View Selector Tabs */}
          <div className="stage-view-tabs">
            <button 
              className={`stage-tab ${activeCenterView === 'video' ? 'active' : ''}`}
              onClick={() => setActiveCenterView('video')}
            >
              <Video size={14} /> Mentor HD Video
            </button>
            <button 
              className={`stage-tab ${activeCenterView === 'whiteboard' ? 'active' : ''}`}
              onClick={() => setActiveCenterView('whiteboard')}
            >
              <PenTool size={14} /> Digital Whiteboard
            </button>
            {activeDomain === 'cs' ? (
              <button 
                className={`stage-tab ${activeCenterView === 'code' ? 'active' : ''}`}
                onClick={() => setActiveCenterView('code')}
              >
                <FileCode size={14} /> Live Code Editor
              </button>
            ) : (
              <button 
                className={`stage-tab ${activeCenterView === 'medical' ? 'active' : ''}`}
                onClick={() => setActiveCenterView('medical')}
              >
                <Stethoscope size={14} /> Medical Image & Case Viewer
              </button>
            )}
          </div>

          {/* Active Center Content View */}
          <div className="stage-screen-box">
            {activeCenterView === 'video' && (
              <div className="mentor-video-fullscreen">
                {/* AI Instructor Video Feed */}
                <div className="ai-video-feed-wrapper">
                  <img 
                    src={currentInstructor.img} 
                    alt={currentInstructor.name} 
                    className="ai-instructor-video-image" 
                  />
                  
                  {/* Soft studio lighting overlay effect */}
                  <div className="studio-lighting-vignette" />

                  {/* Talking lip-sync animation visualizer overlay */}
                  <div className="ai-voice-waves">
                    <span className="wave-bar" />
                    <span className="wave-bar" />
                    <span className="wave-bar" />
                    <span className="wave-bar" />
                    <span className="wave-bar" />
                  </div>
                </div>

                {/* Live Captions Overlay */}
                <div className="live-captions-overlay-box">
                  <div className="caption-label">LIVE CC</div>
                  <p className="caption-text">
                    {activeDomain === 'cs' 
                      ? "[AI Instructor] We will now run the function analyzeCareerPath. As you can see, the custom model calculated a placement readiness score of 92% based on our resume template keywords."
                      : "[AI Instructor] Notice the ST-segment elevation in the inferior leads II, III, and aVF. This indicates an inferior myocardial infarction requiring immediate cardiac intervention."
                    }
                  </p>
                </div>

                <div className="mentor-overlay-label">
                  <strong>{currentInstructor.name}</strong>
                  <span>{currentInstructor.role} (AI Instructor Feed • HD 1080p)</span>
                </div>

                {/* Meeting Controls Indicator Overlay */}
                <div className="video-stats-overlay">
                  <span className="stat-pill green">📶 Good Connection</span>
                  <span className="stat-pill">60 FPS</span>
                  <span className="stat-pill">AI Lipsync: ACTIVE</span>
                </div>
              </div>
            )}

            {activeCenterView === 'whiteboard' && (
              <div className="whiteboard-canvas-container">
                <div className="wb-tools-bar">
                  <div className="wb-tools-left">
                    <span className="wb-title">🎨 Interactive Canvas</span>
                    <div className="wb-tool-group">
                      <button 
                        className={`wb-tool-btn ${canvasTool === 'draw' ? 'active' : ''}`} 
                        onClick={() => setCanvasTool('draw')}
                        title="Draw"
                      >
                        <PenTool size={14} />
                      </button>
                      <button 
                        className={`wb-tool-btn ${canvasTool === 'text' ? 'active' : ''}`} 
                        onClick={() => setCanvasTool('text')}
                        title="Type Text"
                      >
                        <Type size={14} />
                      </button>
                      <button 
                        className={`wb-tool-btn ${canvasTool === 'eraser' ? 'active' : ''}`} 
                        onClick={() => setCanvasTool('eraser')}
                        title="Eraser"
                      >
                        <Eraser size={14} />
                      </button>
                    </div>
                    <div className="wb-separator" />
                    <div className="wb-color-group">
                      {canvasColors.map(c => (
                        <button
                          key={c}
                          className={`wb-color-dot ${penColor === c ? 'active' : ''}`}
                          style={{ background: c, border: c === '#ffffff' ? '1px solid #555' : 'none' }}
                          onClick={() => setPenColor(c)}
                          title={c}
                        />
                      ))}
                    </div>
                    <div className="wb-separator" />
                    <div className="wb-size-group">
                      <button className="wb-size-btn" onClick={() => setPenSize(s => Math.max(1, s - 1))} title="Thinner">
                        <Minus size={12} />
                      </button>
                      <span className="wb-size-label">{penSize}px</span>
                      <button className="wb-size-btn" onClick={() => setPenSize(s => Math.min(20, s + 1))} title="Thicker">
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                  <div className="wb-tools-right">
                    <button onClick={undoCanvas} className="wb-action-btn" title="Undo" disabled={canvasHistory.length === 0}>
                      ↩ Undo
                    </button>
                    <button onClick={clearCanvas} className="wb-clear-btn">
                      <Trash2 size={13} /> Clear All
                    </button>
                  </div>
                </div>
                <div className="wb-canvas-wrapper">
                  <canvas
                    ref={canvasRef}
                    width={800}
                    height={450}
                    className={`wb-canvas ${canvasTool === 'text' ? 'text-cursor' : canvasTool === 'eraser' ? 'eraser-cursor' : ''}`}
                    onMouseDown={startDrawing}
                    onMouseMove={drawOnCanvas}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                  />
                  {showTextInput && textPosition && (
                    <div 
                      className="wb-text-input-overlay"
                      style={{ 
                        left: `${(textPosition.x / 800) * 100}%`, 
                        top: `${(textPosition.y / 450) * 100}%` 
                      }}
                    >
                      <input
                        ref={textInputRef}
                        type="text"
                        className="wb-text-field"
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') placeTextOnCanvas();
                          if (e.key === 'Escape') cancelTextInput();
                        }}
                        placeholder="Type here... (Enter to place, Esc to cancel)"
                        style={{ color: penColor, fontSize: `${Math.max(penSize * 5, 16)}px` }}
                      />
                      <div className="wb-text-actions">
                        <button className="wb-text-place-btn" onClick={placeTextOnCanvas}>✓ Place</button>
                        <button className="wb-text-cancel-btn" onClick={cancelTextInput}>✕</button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="wb-status-bar">
                  <span>Tool: <strong>{canvasTool === 'draw' ? '✏️ Pen' : canvasTool === 'text' ? '🔤 Text' : '🧹 Eraser'}</strong></span>
                  <span>Color: <span className="wb-status-color" style={{ background: penColor }} /></span>
                  <span>Size: <strong>{penSize}px</strong></span>
                  {canvasTool === 'text' && <span className="wb-hint">💡 Click on canvas to place text</span>}
                </div>
              </div>
            )}

            {activeCenterView === 'code' && (
              <div className="live-code-stage">
                <div className="code-header-bar">
                  <span className="code-lang">JavaScript / Python Editor</span>
                  <button className="run-code-btn" onClick={() => alert("Executing Code live...")}>
                    <Play size={12} /> Run Code
                  </button>
                </div>
                <textarea
                  className="code-textarea"
                  value={codeContent}
                  onChange={(e) => setCodeContent(e.target.value)}
                />
              </div>
            )}

            {activeCenterView === 'medical' && (
              <div className="medical-viewer-stage">
                <div className="med-viewer-header">
                  <span>🫀 Clinical Case & Diagnostic Scan Viewer</span>
                  <span className="case-id">Case File: #CARDIAC-9042</span>
                </div>
                <div className="med-case-body">
                  <div className="med-scan-mock">
                    <div className="scan-graphic">🫀 [12-Lead ECG & Echocardiogram Presentation]</div>
                  </div>
                  <div className="med-notes-panel">
                    <h4>Clinical Findings:</h4>
                    <p>• ST-segment elevation in leads II, III, and aVF (Inferior MI).</p>
                    <p>• Immediate intervention: Cardiac catheterization laboratory activation.</p>
                    <p>• Nursing checklist: Administer 300mg Clopidogrel & continuous SpO2 monitoring.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Student Video Grid Strip */}
          <div className="student-grid-strip">
            {participants.map((p) => (
              <div key={p.id} className="student-tile">
                <div className="tile-avatar">{p.avatar}</div>
                <span className="tile-name">{p.name}</span>
                {p.handRaised && <span className="hand-badge">✋</span>}
              </div>
            ))}
            <div className="student-tile more">+75 Students</div>
          </div>
        </div>

        {/* Right Sidebar (Chat / Q&A / Polls / AI Notes) */}
        <div className="vc-sidebar">
          {/* Tab Navigation */}
          <div className="vc-sidebar-tabs">
            <button className={`vc-s-tab ${activeSidebarTab === 'chat' ? 'active' : ''}`} onClick={() => setActiveSidebarTab('chat')}>
              <MessageSquare size={14} /> Chat
            </button>
            <button className={`vc-s-tab ${activeSidebarTab === 'qa' ? 'active' : ''}`} onClick={() => setActiveSidebarTab('qa')}>
              <HelpCircle size={14} /> Q&A
            </button>
            <button className={`vc-s-tab ${activeSidebarTab === 'ai-notes' ? 'active' : ''}`} onClick={() => setActiveSidebarTab('ai-notes')}>
              <Sparkles size={14} /> AI Notes
            </button>
          </div>

          {/* Chat Tab Content */}
          {activeSidebarTab === 'chat' && (
            <div className="vc-chat-panel">
              <div className="chat-messages-area">
                {messages.map((m) => (
                  <div key={m.id} className={`chat-msg-row ${m.role}`}>
                    {m.pinned && <div className="pinned-tag"><Pin size={10} /> Pinned Announcement</div>}
                    <div className="msg-header">
                      <strong className="msg-author">{m.sender}</strong>
                      <span className="msg-time">{m.time}</span>
                    </div>
                    <p className="msg-content">{m.text}</p>
                  </div>
                ))}
              </div>

              <div className="chat-input-row">
                <input
                  type="text"
                  placeholder="Ask a question or reply live..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button className="chat-send-btn" onClick={handleSendMessage}>
                  <Send size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Q&A Tab Content */}
          {activeSidebarTab === 'qa' && (
            <div className="vc-qa-panel">
              <div className="qa-ask-box">
                <input
                  type="text"
                  placeholder="Submit question for mentor..."
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAskQuestion()}
                />
                <button onClick={handleAskQuestion}>Ask</button>
              </div>

              <div className="qa-list">
                {qaList.map((q) => (
                  <div key={q.id} className="qa-card">
                    <div className="qa-card-header">
                      <span className="qa-author">{q.author}</span>
                      <button className="upvote-btn" onClick={() => handleUpvoteQuestion(q.id)}>
                        <ThumbsUp size={12} /> {q.upvotes}
                      </button>
                    </div>
                    <p className="qa-question">{q.question}</p>
                    {q.answered && (
                      <div className="qa-answer-box">
                        <span className="ans-tag">✓ Mentor Answer:</span>
                        <p>{q.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Notes Tab Content */}
          {activeSidebarTab === 'ai-notes' && (
            <div className="vc-ai-panel">
              <div className="ai-gen-header">
                <Sparkles size={16} className="sparkle-icon" />
                <span>Real-Time AI Classroom Summarizer</span>
              </div>

              <button className="gen-notes-btn" onClick={handleGenerateAINotes} disabled={isGeneratingNotes}>
                {isGeneratingNotes ? 'Generating AI Summary...' : '✨ Generate AI Live Notes'}
              </button>

              <div className="ai-notes-list">
                {aiNotesList.map((note) => (
                  <div key={note.id} className="ai-note-card">
                    <h4>{note.topic}</h4>
                    <p>{note.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Floating Control Bar */}
      <footer className="vc-control-bar">
        <button className={`ctrl-btn ${isMuted ? 'muted' : ''}`} onClick={() => setIsMuted(!isMuted)}>
          {isMuted ? <MicOff size={18} /> : <Mic size={18} />}
          <span>{isMuted ? 'Unmute' : 'Mute'}</span>
        </button>

        <button className={`ctrl-btn ${isCamOff ? 'off' : ''}`} onClick={() => setIsCamOff(!isCamOff)}>
          {isCamOff ? <VideoOff size={18} /> : <Video size={18} />}
          <span>{isCamOff ? 'Start Video' : 'Stop Video'}</span>
        </button>

        <button className={`ctrl-btn ${isScreenSharing ? 'sharing' : ''}`} onClick={() => setIsScreenSharing(!isScreenSharing)}>
          <Monitor size={18} />
          <span>{isScreenSharing ? 'Stop Share' : 'Share Screen'}</span>
        </button>

        <button className={`ctrl-btn ${handRaised ? 'raised' : ''}`} onClick={toggleHandRaised}>
          <Hand size={18} />
          <span>{handRaised ? 'Lower Hand' : 'Raise Hand'}</span>
        </button>

        <button className="ctrl-btn danger" onClick={handleLeaveClass}>
          <span>Leave Room</span>
        </button>
      </footer>
    </div>
  );
}
