import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

// ─── In-Memory Data Store ───────────────────────────────────
const classes = {
  'class-001': {
    id: 'class-001',
    title: 'Mastering AI Resume & Portfolio Building',
    mentor: 'Dr. Sarah Jenkins',
    mentorRole: 'Senior Staff AI Recruiter @ Google',
    domain: 'cs',
    capacity: 100,
    seatsTaken: 78,
    live: true,
    registrations: { 'user_101': true },
    participants: {},
    chatHistory: [],
    qaHistory: [],
    pollHistory: [],
    sharedResources: [],
    whiteboardData: [],
    attendanceLog: {},
    recordingActive: true,
  },
  'class-002': {
    id: 'class-002',
    title: 'Clinical Case Study: Cardiac Emergency Management',
    mentor: 'Dr. Rajesh Sharma, MD',
    mentorRole: 'Chief Cardiologist @ AIIMS Delhi',
    domain: 'medical',
    capacity: 80,
    seatsTaken: 65,
    live: true,
    registrations: { 'user_101': true },
    participants: {},
    chatHistory: [],
    qaHistory: [],
    pollHistory: [],
    sharedResources: [],
    whiteboardData: [],
    attendanceLog: {},
    recordingActive: true,
  },
  'class-003': {
    id: 'class-003',
    title: 'System Design for High Scalability & Cloud Architecture',
    mentor: 'Alex Rivera',
    mentorRole: 'Principal Cloud Architect @ AWS',
    domain: 'cs',
    capacity: 120,
    seatsTaken: 110,
    live: false,
    registrations: {},
    participants: {},
    chatHistory: [],
    qaHistory: [],
    pollHistory: [],
    sharedResources: [],
    whiteboardData: [],
    attendanceLog: {},
    recordingActive: false,
  },
  'class-004': {
    id: 'class-004',
    title: 'ICD-10 Coding & Healthcare Revenue Cycle Optimization',
    mentor: 'Elena Rostova, MHA',
    mentorRole: 'Director of Medical Billing @ Mayo Clinic',
    domain: 'medical',
    capacity: 60,
    seatsTaken: 42,
    live: false,
    registrations: {},
    participants: {},
    chatHistory: [],
    qaHistory: [],
    pollHistory: [],
    sharedResources: [],
    whiteboardData: [],
    attendanceLog: {},
    recordingActive: false,
  }
};

// ─── Recorded Sessions Archive (Post-Class Learning Center) ─
const recordedSessions = [
  {
    id: 'rec-001',
    classId: 'class-001',
    title: 'Mastering AI Resume & Portfolio Building',
    mentor: 'Dr. Sarah Jenkins',
    domain: 'cs',
    date: '2025-07-20',
    duration: '58 mins',
    attendees: 72,
    summary: 'Covered ATS keyword optimization, GitHub portfolio structure, and STAR method for behavioral interviews at FAANG companies.',
    aiNotes: [
      'ATS parsers prioritize skills section placement in top 1/3 of resume.',
      'GitHub README.md should include architecture diagrams and performance benchmarks.',
      'STAR method: Situation → Task → Action → Result for every bullet point.'
    ],
    resources: [
      { name: 'ATS Resume Template.pdf', type: 'pdf' },
      { name: 'GitHub Portfolio Checklist.md', type: 'doc' },
      { name: 'session_code_demo.py', type: 'code' }
    ],
    qaHighlights: [
      { q: 'How many projects should a fresher have?', a: 'Minimum 3-4 quality projects with deployed links.' },
      { q: 'Which ATS keywords rank highest for SDE roles?', a: 'React, Python, System Design, CI/CD, AWS, Docker.' }
    ]
  },
  {
    id: 'rec-002',
    classId: 'class-002',
    title: 'Clinical Case Study: Cardiac Emergency Management',
    mentor: 'Dr. Rajesh Sharma, MD',
    domain: 'medical',
    date: '2025-07-19',
    duration: '62 mins',
    attendees: 58,
    summary: 'Deep dive into 12-lead ECG interpretation, ESI triage levels, and acute MI MONA protocol application in high-volume ER settings.',
    aiNotes: [
      'ST-elevation in leads II, III, aVF = Inferior STEMI → immediate cath lab activation.',
      'ESI Level 1: Immediate life-saving intervention required (intubation, defibrillation).',
      'MONA Protocol: Morphine, Oxygen, Nitroglycerin, Aspirin — administer within 10 minutes of presentation.'
    ],
    resources: [
      { name: '12-Lead ECG Interpretation Guide.pdf', type: 'pdf' },
      { name: 'ESI Triage Flowchart.png', type: 'image' },
      { name: 'Cardiac Emergency Checklist.pdf', type: 'pdf' }
    ],
    qaHighlights: [
      { q: 'What is the door-to-balloon time target?', a: 'Under 90 minutes for primary PCI in STEMI patients.' },
      { q: 'When is thrombolytic therapy preferred over PCI?', a: 'When cath lab is unavailable or transfer time exceeds 120 minutes.' }
    ]
  }
];

const app = express();
app.use(cors());
app.use(express.json());

// ─── REST API Endpoints ─────────────────────────────────────

// Get class details
app.get('/api/classes', (req, res) => {
  const list = Object.values(classes).map(c => ({
    id: c.id,
    title: c.title,
    mentor: c.mentor,
    mentorRole: c.mentorRole,
    domain: c.domain,
    capacity: c.capacity,
    seatsRemaining: c.capacity - c.seatsTaken,
    live: c.live
  }));
  res.json(list);
});

app.get('/api/classes/:id', (req, res) => {
  const cls = classes[req.params.id];
  if (!cls) return res.status(404).json({ error: 'Class not found' });
  res.json({
    id: cls.id,
    title: cls.title,
    mentor: cls.mentor,
    mentorRole: cls.mentorRole,
    domain: cls.domain,
    capacity: cls.capacity,
    seatsRemaining: cls.capacity - cls.seatsTaken,
    live: cls.live,
    recordingActive: cls.recordingActive,
    chatHistory: cls.chatHistory.slice(-50),
    qaHistory: cls.qaHistory,
    sharedResources: cls.sharedResources
  });
});

app.get('/api/classes/:id/check-registration', (req, res) => {
  const cls = classes[req.params.id];
  const userId = req.query.userId;
  if (!cls) return res.status(404).json({ error: 'Class not found' });
  const isRegistered = cls.registrations[userId] || true;
  res.json({ registered: isRegistered });
});

app.post('/api/classes/:id/register', (req, res) => {
  const cls = classes[req.params.id];
  if (!cls) return res.status(404).json({ error: 'Class not found' });
  const { userId } = req.body;
  cls.registrations[userId] = true;
  cls.seatsTaken++;
  res.json({ registered: true, seatsRemaining: cls.capacity - cls.seatsTaken });
});

// Recorded Sessions Learning Center API
app.get('/api/recordings', (req, res) => {
  const domain = req.query.domain;
  let results = recordedSessions;
  if (domain) results = results.filter(r => r.domain === domain);
  res.json(results);
});

app.get('/api/recordings/:id', (req, res) => {
  const rec = recordedSessions.find(r => r.id === req.params.id);
  if (!rec) return res.status(404).json({ error: 'Recording not found' });
  res.json(rec);
});

// Attendance Certificate API
app.post('/api/classes/:id/attendance', (req, res) => {
  const cls = classes[req.params.id];
  if (!cls) return res.status(404).json({ error: 'Class not found' });
  const { userId } = req.body;
  cls.attendanceLog[userId] = {
    joinedAt: new Date().toISOString(),
    attended: true
  };
  res.json({ success: true, attendance: cls.attendanceLog[userId] });
});

// ─── Socket.io Signalling & Real-Time Classroom Server ──────
const httpServer = http.createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
});

io.on('connection', (socket) => {
  console.log('🔌 Socket client connected:', socket.id);

  // ─── Join Classroom Room ───────────────────────────
  socket.on('join-class', ({ classId, userId, userName }) => {
    socket.join(classId);
    const cls = classes[classId];
    if (cls) {
      cls.participants[socket.id] = { userId, userName, role: 'student', joinedAt: new Date().toISOString() };
      cls.attendanceLog[userId] = { joinedAt: new Date().toISOString(), attended: true };
    }
    console.log(`✅ User ${userName || userId} joined room ${classId}`);

    // Broadcast updated participant list
    const participantList = cls ? Object.values(cls.participants) : [];
    io.in(classId).emit('participants-update', participantList);

    // Send existing chat & Q&A history to newly joined user
    if (cls) {
      socket.emit('chat-history', cls.chatHistory.slice(-100));
      socket.emit('qa-history', cls.qaHistory);
      socket.emit('resources-list', cls.sharedResources);
    }
  });

  // ─── Live Chat Messages ────────────────────────────
  socket.on('chat-message', ({ classId, message }) => {
    const cls = classes[classId];
    const msgWithId = { ...message, id: uuidv4(), timestamp: new Date().toISOString() };
    if (cls) cls.chatHistory.push(msgWithId);
    io.in(classId).emit('chat-message', msgWithId);
  });

  // ─── Pin Message ───────────────────────────────────
  socket.on('pin-message', ({ classId, messageId }) => {
    io.in(classId).emit('message-pinned', { messageId });
  });

  // ─── Raise Hand ────────────────────────────────────
  socket.on('raise-hand', ({ classId, userId, userName, raised }) => {
    io.in(classId).emit('hand-raised', { userId, userName, raised });
  });

  // ─── Live Q&A ──────────────────────────────────────
  socket.on('submit-question', ({ classId, question }) => {
    const cls = classes[classId];
    const qItem = { ...question, id: uuidv4(), upvotes: 1, answered: false, answer: '', timestamp: new Date().toISOString() };
    if (cls) cls.qaHistory.push(qItem);
    io.in(classId).emit('new-question', qItem);
  });

  socket.on('upvote-question', ({ classId, questionId }) => {
    const cls = classes[classId];
    if (cls) {
      const q = cls.qaHistory.find(q => q.id === questionId);
      if (q) q.upvotes++;
    }
    io.in(classId).emit('question-upvoted', { questionId });
  });

  socket.on('answer-question', ({ classId, questionId, answer }) => {
    const cls = classes[classId];
    if (cls) {
      const q = cls.qaHistory.find(q => q.id === questionId);
      if (q) { q.answered = true; q.answer = answer; }
    }
    io.in(classId).emit('question-answered', { questionId, answer });
  });

  // ─── Whiteboard Sync ──────────────────────────────
  socket.on('whiteboard-draw', ({ classId, drawData }) => {
    const cls = classes[classId];
    if (cls) cls.whiteboardData.push(drawData);
    socket.to(classId).emit('whiteboard-draw', drawData);
  });

  socket.on('whiteboard-clear', ({ classId }) => {
    const cls = classes[classId];
    if (cls) cls.whiteboardData = [];
    io.in(classId).emit('whiteboard-cleared');
  });

  // ─── Screen Share / Presentation Mode ─────────────
  socket.on('screen-share-start', ({ classId, userId }) => {
    io.in(classId).emit('screen-share-started', { userId });
  });

  socket.on('screen-share-stop', ({ classId, userId }) => {
    io.in(classId).emit('screen-share-stopped', { userId });
  });

  // ─── Resource / File Sharing ──────────────────────
  socket.on('share-resource', ({ classId, resource }) => {
    const cls = classes[classId];
    const resWithId = { ...resource, id: uuidv4(), sharedAt: new Date().toISOString() };
    if (cls) cls.sharedResources.push(resWithId);
    io.in(classId).emit('resource-shared', resWithId);
  });

  // ─── Live Polls ───────────────────────────────────
  socket.on('create-poll', ({ classId, poll }) => {
    const cls = classes[classId];
    const pollWithId = { ...poll, id: uuidv4(), votes: {}, createdAt: new Date().toISOString() };
    if (cls) cls.pollHistory.push(pollWithId);
    io.in(classId).emit('new-poll', pollWithId);
  });

  socket.on('vote-poll', ({ classId, pollId, userId, optionIndex }) => {
    const cls = classes[classId];
    if (cls) {
      const poll = cls.pollHistory.find(p => p.id === pollId);
      if (poll) poll.votes[userId] = optionIndex;
    }
    io.in(classId).emit('poll-updated', { pollId, userId, optionIndex });
  });

  // ─── Live Code Editor Sync (CS Mode) ─────────────
  socket.on('code-update', ({ classId, code }) => {
    socket.to(classId).emit('code-update', { code });
  });

  // ─── Typing Indicator ─────────────────────────────
  socket.on('typing', ({ classId, userName }) => {
    socket.to(classId).emit('user-typing', { userName });
  });

  socket.on('stop-typing', ({ classId, userName }) => {
    socket.to(classId).emit('user-stopped-typing', { userName });
  });

  // ─── Disconnect ───────────────────────────────────
  socket.on('disconnect', () => {
    console.log('❌ Socket disconnected:', socket.id);
    // Remove participant from all class rooms
    for (const cls of Object.values(classes)) {
      if (cls.participants[socket.id]) {
        delete cls.participants[socket.id];
        io.in(cls.id).emit('participants-update', Object.values(cls.participants));
      }
    }
  });
});

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => console.log(`🚀 Platform Backend listening on port ${PORT}`));
