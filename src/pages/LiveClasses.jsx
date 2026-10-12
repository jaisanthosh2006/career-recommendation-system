import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { UPCOMING_LIVE_CLASSES } from '../data/mockData';
import { 
  Video, 
  Users, 
  Clock, 
  Calendar, 
  CheckCircle, 
  Award, 
  ShieldCheck, 
  PlayCircle,
  FileCheck,
  ChevronRight,
  Briefcase,
  Building2,
  Sparkles
} from 'lucide-react';
import './LiveClasses.css';

export default function LiveClasses() {
  const navigate = useNavigate();
  const { activeDomain, registeredClasses, registerForClass } = useStore();
  const [registeredSuccessModal, setRegisteredSuccessModal] = useState(null);

  const classes = [
    {
      id: 'class-001',
      title: 'Mastering AI Resume & Portfolio Building',
      topic: 'ATS Optimization & System Architecture Demo',
      mentor: 'Dr. Sarah Jenkins',
      mentorRole: 'Senior Staff AI Recruiter @ Google',
      avatar: '/ai_instructor_female.png',
      company: 'Google',
      experience: '12+ Years Experience',
      domain: 'cs',
      time: 'Today, 4:00 PM EST',
      duration: '60 Mins',
      seatsTotal: 100,
      seatsTaken: 78,
      status: 'Live Soon',
      category: 'Computer Science & IT'
    },
    {
      id: 'class-002',
      title: 'Clinical Case Study: Cardiac Emergency Management',
      topic: '12-Lead ECG Analysis & ER Life Support Protocols',
      mentor: 'Dr. Rajesh Sharma, MD',
      mentorRole: 'Chief Cardiologist @ AIIMS Delhi',
      avatar: '/ai_instructor_male.png',
      company: 'AIIMS Delhi',
      experience: '16+ Years Experience',
      domain: 'medical',
      time: 'Today, 6:00 PM EST',
      duration: '60 Mins',
      seatsTotal: 80,
      seatsTaken: 65,
      status: 'Upcoming',
      category: 'Medical Science'
    },
    {
      id: 'class-003',
      title: 'System Design for High Scalability & Cloud Architecture',
      topic: 'Microservices, Caching & Distributed Systems',
      mentor: 'Alex Rivera',
      mentorRole: 'Principal Cloud Architect @ AWS',
      avatar: '/ai_instructor_male.png',
      company: 'AWS',
      experience: '10+ Years Experience',
      domain: 'cs',
      time: 'Tomorrow, 2:00 PM EST',
      duration: '90 Mins',
      seatsTotal: 120,
      seatsTaken: 110,
      status: 'Upcoming',
      category: 'Computer Science & IT'
    },
    {
      id: 'class-004',
      title: 'ICD-10 Coding & Healthcare Revenue Cycle Optimization',
      topic: 'Medical Billing Audits & HIPAA Claims Accuracy',
      mentor: 'Elena Rostova, MHA',
      mentorRole: 'Director of Medical Billing @ Mayo Clinic',
      avatar: '/ai_instructor_female.png',
      company: 'Mayo Clinic',
      experience: '14+ Years Experience',
      domain: 'medical',
      time: 'Tomorrow, 5:00 PM EST',
      duration: '60 Mins',
      seatsTotal: 60,
      seatsTaken: 42,
      status: 'Upcoming',
      category: 'Healthcare Admin'
    }
  ].filter(c => c.domain === activeDomain || c.domain === 'all');

  const handleRegister = (cls) => {
    registerForClass(cls.id);
    setRegisteredSuccessModal({
      class: cls,
      code: `REG-${Math.floor(100000 + Math.random() * 900000)}`
    });
  };

  return (
    <div className="live-classes-container">
      {/* Header */}
      <div className="live-header-card">
        <div className="header-badge">
          <Video size={14} />
          <span>REAL-TIME MENTOR TEACHING SYSTEM • ZOOM / TEAMS / MEET PROTOCOL</span>
        </div>
        <h1>Live Mentor-Led Interactive Classes</h1>
        <p>Learn directly from industry executives, Google staff recruiters, and AIIMS chief doctors in live interactive Zoom-style virtual classrooms featuring live code editors, medical case viewers, digital whiteboards, and real-time AI summaries.</p>
      </div>

      {/* Classes Grid */}
      <div className="classes-grid">
        {classes.map((cls) => {
          const isRegistered = registeredClasses.includes(cls.id);
          const seatsLeft = cls.seatsTotal - cls.seatsTaken;

          return (
            <div key={cls.id} className="class-card glass">
              <div className="card-top-row">
                <span className={`status-badge ${cls.status.toLowerCase().replace(' ', '-')}`}>
                  ● {cls.status}
                </span>
                <span className="domain-pill">{cls.category}</span>
              </div>

              <h3>{cls.title}</h3>
              <p className="session-topic"><strong>Topic:</strong> {cls.topic}</p>

              <div className="mentor-profile-box">
                <div className="mentor-image-container">
                  <img src={cls.avatar} alt={cls.mentor} className="mentor-avatar-img" />
                </div>
                <div>
                  <p className="mentor-name">{cls.mentor}</p>
                  <p className="mentor-role">{cls.mentorRole} ({cls.experience})</p>
                </div>
              </div>

              <div className="class-details-list">
                <div className="detail-item">
                  <Clock size={14} />
                  <span>{cls.time} ({cls.duration})</span>
                </div>
                <div className="detail-item">
                  <Users size={14} />
                  <span>{cls.seatsTaken}/{cls.seatsTotal} Students Registered ({seatsLeft} seats left)</span>
                </div>
                <div className="detail-item">
                  <ShieldCheck size={14} />
                  <span>Includes Live Q&A, Whiteboard, AI Notes & Certificate</span>
                </div>
              </div>

              <div className="seat-progress-bar">
                <div className="fill" style={{ width: `${(cls.seatsTaken / cls.seatsTotal) * 100}%` }} />
              </div>

              <div className="card-action-row">
                {isRegistered ? (
                  <button className="join-room-btn" onClick={() => navigate(`/live/${cls.id}`)}>
                    <PlayCircle size={18} />
                    <span>Enter Live Classroom</span>
                  </button>
                ) : (
                  <button className="register-class-btn" onClick={() => handleRegister(cls)}>
                    <Calendar size={16} />
                    <span>Register My Seat</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Registration Confirmation Modal */}
      {registeredSuccessModal && (
        <div className="reg-modal-backdrop">
          <div className="reg-modal-card">
            <div className="reg-icon-circle">
              <CheckCircle size={32} />
            </div>
            <h2>Registration Confirmed!</h2>
            <p>You are registered for live mentor class:</p>
            <h3>{registeredSuccessModal.class.title}</h3>
            
            <div className="reg-code-box">
              <span className="code-label">YOUR LIVE ENTRANCE CODE</span>
              <span className="code-value">{registeredSuccessModal.code}</span>
            </div>

            <p className="modal-note">
              Please join on <strong>{registeredSuccessModal.class.time}</strong>. 
              Upon attendance, your XP points (+250 XP) and official completion certificate will unlock automatically!
            </p>

            <div className="modal-buttons">
              <button className="modal-join-now-btn" onClick={() => navigate(`/live/${registeredSuccessModal.class.id}`)}>
                Join Live Classroom Now
              </button>
              <button className="modal-close-btn" onClick={() => setRegisteredSuccessModal(null)}>
                Back to Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
