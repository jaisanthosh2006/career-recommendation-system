import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { CS_COURSES, MEDICAL_COURSES, UPCOMING_LIVE_CLASSES, INTERNSHIP_LISTINGS, JOB_RECOMMENDATIONS, PROJECT_HUB, ML_ENGINE } from '../data/mockData';
import { 
  Sparkles, 
  Target, 
  FileCheck, 
  Award, 
  TrendingUp, 
  Calendar, 
  BookOpen, 
  Briefcase, 
  FolderGit2, 
  ArrowRight,
  Flame,
  CheckCircle2,
  Clock,
  ChevronRight,
  Star,
  Users
} from 'lucide-react';
import './Dashboard.css';

export default function Dashboard({ onOpenAIWidget }) {
  const navigate = useNavigate();
  const { activeDomain, user, registeredClasses = [], registerForClass } = useStore();

  const courses = activeDomain === 'cs' ? CS_COURSES : MEDICAL_COURSES;
  const upcomingClasses = UPCOMING_LIVE_CLASSES.filter(c => c.domain === activeDomain || c.domain === 'all');
  const internships = INTERNSHIP_LISTINGS.filter(i => i.domain === activeDomain);
  const jobs = JOB_RECOMMENDATIONS.filter(j => j.domain === activeDomain);
  const projects = PROJECT_HUB.filter(p => p.domain === activeDomain);

  const placementStats = ML_ENGINE.calculatePlacementReadiness({
    coursesCompleted: user?.completedCourses?.length || 4,
    resumeATS: user?.atsScore || 85,
    projectsCount: 3,
    attendance: 90,
    domain: activeDomain
  });

  return (
    <div className="dashboard-container">
      {/* Welcome Banner */}
      <div className={`welcome-hero-card ${activeDomain}`}>
        <div className="welcome-content">
          <div className="welcome-badge">
            <Sparkles size={14} />
            <span>AI CAREER DASHBOARD • {activeDomain === 'cs' ? 'COMPUTER SCIENCE & IT' : 'MEDICAL & HEALTHCARE'}</span>
          </div>
          <h1>Welcome back, <span className="user-glow-name">{user?.name || 'Sandy'}</span>! 👋</h1>
          <p className="welcome-subtitle">
            Your AI Placement Readiness Score is <strong className="score-highlight">{placementStats.readinessScore}%</strong>. 
            You are on track for top {activeDomain === 'cs' ? 'Tech Companies' : 'Healthcare Organizations'}.
          </p>

          <div className="profile-completion-box">
            <div className="completion-text">
              <span>Profile Completion</span>
              <span className="percent-num">{user?.profileCompletion || 85}%</span>
            </div>
            <div className="completion-bar-track">
              <div className="completion-bar-fill" style={{ width: `${user?.profileCompletion || 85}%` }} />
            </div>
          </div>
        </div>

        <div className="welcome-quick-actions">
          <button className="hero-action-btn primary" onClick={() => navigate('/resume-builder')}>
            <FileCheck size={16} />
            <span>Boost ATS Resume</span>
          </button>
          <button className="hero-action-btn secondary" onClick={() => navigate('/skill-gap')}>
            <Target size={16} />
            <span>Analyze Skill Gap</span>
          </button>
        </div>
      </div>

      {/* Hero Metrics Cards Grid */}
      <div className="metrics-grid">
        <div className="metric-card glass">
          <div className="metric-header">
            <span className="metric-title">AI Career Score</span>
            <div className="metric-icon-box purple"><Sparkles size={18} /></div>
          </div>
          <div className="metric-value">{user?.careerScore || 88}<span className="metric-max">/100</span></div>
          <p className="metric-subtext">Top 12% among peer candidates</p>
          <div className="metric-progress-line purple" style={{ width: `${user?.careerScore || 88}%` }} />
        </div>

        <div className="metric-card glass">
          <div className="metric-header">
            <span className="metric-title">Resume ATS Score</span>
            <div className="metric-icon-box blue"><FileCheck size={18} /></div>
          </div>
          <div className="metric-value">{user?.atsScore || 86}%</div>
          <p className="metric-subtext">Passes 95% Automated ATS Filters</p>
          <div className="metric-progress-line blue" style={{ width: `${user?.atsScore || 86}%` }} />
        </div>

        <div className="metric-card glass">
          <div className="metric-header">
            <span className="metric-title">Placement Readiness</span>
            <div className="metric-icon-box green"><TrendingUp size={18} /></div>
          </div>
          <div className="metric-value">{placementStats.readinessScore}%</div>
          <p className="metric-subtext">{placementStats.status}</p>
          <div className="metric-progress-line green" style={{ width: `${placementStats.readinessScore}%` }} />
        </div>

        <div className="metric-card glass">
          <div className="metric-header">
            <span className="metric-title">Learning Streak</span>
            <div className="metric-icon-box orange"><Flame size={18} /></div>
          </div>
          <div className="metric-value">{user?.streakDays || 14} <span className="metric-unit">Days</span></div>
          <p className="metric-subtext">+150 XP Bonus earned today</p>
          <div className="metric-progress-line orange" style={{ width: '85%' }} />
        </div>
      </div>

      {/* Main 2-Column Section */}
      <div className="dashboard-main-layout">
        {/* Left Column */}
        <div className="layout-col left">
          {/* Upcoming Live Mentor Classes */}
          <div className="dash-section-card">
            <div className="dash-card-header">
              <div className="header-title-box">
                <Calendar size={18} className="header-icon red" />
                <h3>Upcoming Live Mentor Classes</h3>
              </div>
              <button className="view-all-link" onClick={() => navigate('/live-classes')}>
                <span>View All</span>
                <ChevronRight size={14} />
              </button>
            </div>

            <div className="live-classes-list">
              {upcomingClasses.slice(0, 2).map((cls) => {
                const isRegistered = registeredClasses.includes(cls.id);
                return (
                  <div key={cls.id} className="live-class-item">
                    <div className="live-class-info">
                      <div className="live-badge-time">
                        <span className="live-pill">{cls.status}</span>
                        <span className="time-pill"><Clock size={12} /> {cls.time}</span>
                      </div>
                      <h4>{cls.title}</h4>
                      <p className="mentor-name">👨‍🏫 {cls.mentor} • <span className="role">{cls.mentorRole}</span></p>
                      <div className="seats-progress">
                        <Users size={12} />
                        <span>{cls.seatsTaken}/{cls.seatsTotal} Seats Reserved</span>
                      </div>
                    </div>

                    <div className="live-class-action">
                      {isRegistered ? (
                        <button className="join-now-btn" onClick={() => navigate(`/live/${cls.id}`)}>
                          Join Room Now
                        </button>
                      ) : (
                        <button className="register-seat-btn" onClick={() => registerForClass(cls.id)}>
                          Register Seat
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommended Learning Pathways */}
          <div className="dash-section-card">
            <div className="dash-card-header">
              <div className="header-title-box">
                <BookOpen size={18} className="header-icon blue" />
                <h3>Recommended {activeDomain === 'cs' ? 'CS & IT' : 'Medical'} Courses</h3>
              </div>
              <button className="view-all-link" onClick={() => navigate('/courses')}>
                <span>Explore Catalog</span>
                <ChevronRight size={14} />
              </button>
            </div>

            <div className="courses-grid-dash">
              {courses.slice(0, 4).map((crs) => (
                <div key={crs.id} className="course-mini-card" onClick={() => navigate('/courses')}>
                  <div className="course-card-top">
                    <span className="course-cat-tag">{crs.category}</span>
                    <span className="course-rating"><Star size={12} className="star-icon" /> {crs.rating}</span>
                  </div>
                  <h4>{crs.title}</h4>
                  <p className="course-desc-snip">{crs.desc}</p>
                  <div className="course-card-bottom">
                    <span className="course-level">{crs.level}</span>
                    <div className="mini-progress-bar">
                      <div className="fill" style={{ width: `${crs.progress}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Projects */}
          <div className="dash-section-card">
            <div className="dash-card-header">
              <div className="header-title-box">
                <FolderGit2 size={18} className="header-icon green" />
                <h3>Hands-On Portfolio Projects</h3>
              </div>
              <button className="view-all-link" onClick={() => navigate('/projects')}>
                <span>Project Hub</span>
                <ChevronRight size={14} />
              </button>
            </div>

            <div className="projects-list-dash">
              {projects.slice(0, 2).map((proj) => (
                <div key={proj.id} className="project-item-dash" onClick={() => navigate('/projects')}>
                  <div className="project-header-row">
                    <span className="proj-level-badge">{proj.level}</span>
                    <span className="proj-cat">{proj.category}</span>
                  </div>
                  <h4>{proj.title}</h4>
                  <p>{proj.desc}</p>
                  <div className="proj-stack-chips">
                    {proj.stack.map((st, i) => (
                      <span key={i} className="stack-chip">{st}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="layout-col right">
          {/* Daily Learning Goals */}
          <div className="dash-side-widget glass">
            <div className="widget-header">
              <CheckCircle2 size={18} className="widget-icon green" />
              <h3>Daily Learning Goals</h3>
            </div>
            <div className="goals-checklist">
              <div className="goal-item completed">
                <span className="checkbox">✓</span>
                <span>Complete 1 Lesson on {activeDomain === 'cs' ? 'React Custom Hooks' : 'Emergency CPR Protocols'}</span>
              </div>
              <div className="goal-item completed">
                <span className="checkbox">✓</span>
                <span>Spend 30 mins on AI Resume Optimization</span>
              </div>
              <div className="goal-item pending">
                <span className="checkbox">○</span>
                <span>Solve 2 Mock Assessment Questions</span>
              </div>
            </div>
          </div>

          {/* Internship Recommendations */}
          <div className="dash-side-widget glass">
            <div className="widget-header">
              <Briefcase size={18} className="widget-icon purple" />
              <h3>Recommended Internships</h3>
            </div>
            <div className="internships-mini-list">
              {internships.slice(0, 3).map((item) => (
                <div key={item.id} className="mini-internship-row" onClick={() => navigate('/jobs-internships')}>
                  <div className="company-logo-box">{item.logo}</div>
                  <div className="internship-details">
                    <h5>{item.role}</h5>
                    <p>{item.company} • {item.location}</p>
                    <span className="stipend-tag">{item.stipend}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="widget-btn" onClick={() => navigate('/jobs-internships')}>
              View All Opportunities
            </button>
          </div>

          {/* AI Skill Gap Quick Insight */}
          <div className="dash-side-widget ai-insight-card">
            <div className="widget-header">
              <Sparkles size={18} className="widget-icon glow" />
              <h3>AI Skill Gap Recommendation</h3>
            </div>
            <p className="insight-text">
              Targeting <strong>{activeDomain === 'cs' ? 'Senior Full Stack Engineer' : 'Emergency Room Specialist'}</strong>? 
              You match <strong>82%</strong> of top employer requirements.
            </p>
            <div className="missing-skill-tags">
              <span className="label">Recommended to learn:</span>
              <span className="missing-tag">{activeDomain === 'cs' ? 'System Design & AWS' : 'Pathology & ACLS'}</span>
            </div>
            <button className="ai-gap-btn" onClick={() => navigate('/skill-gap')}>
              Run Full Skill Gap Scan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
