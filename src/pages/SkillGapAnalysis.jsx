import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { ML_ENGINE } from '../data/mockData';
import { Target, Sparkles, CheckCircle2, XCircle, Clock, BookOpen, ArrowRight } from 'lucide-react';
import './SkillGapAnalysis.css';

export default function SkillGapAnalysis() {
  const { activeDomain, user } = useStore();

  const targetRoles = activeDomain === 'cs' 
    ? ['Senior Full Stack Engineer', 'Machine Learning Engineer']
    : ['Emergency Room Specialist', 'Medical Coding Specialist'];

  const [selectedRole, setSelectedRole] = useState(targetRoles[0]);

  const analysis = ML_ENGINE.performSkillGapAnalysis(user.skills, selectedRole);

  return (
    <div className="skill-gap-container">
      {/* Header */}
      <div className="gap-header-card">
        <div className="header-badge">
          <Target size={14} />
          <span>AI COMPETENCY MATRIX • INDUSTRY ALIGNMENT</span>
        </div>
        <h1>AI Skill Gap Analysis</h1>
        <p>Compare your current technical & clinical competencies against real job market requirements to uncover missing skills and customized learning roadmaps.</p>

        <div className="role-selector-bar">
          <span className="selector-label">Select Target Role:</span>
          {targetRoles.map(role => (
            <button
              key={role}
              className={`role-tab-btn ${selectedRole === role ? 'active' : ''}`}
              onClick={() => setSelectedRole(role)}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Main Results Grid */}
      <div className="gap-results-grid">
        {/* Match Percentage Card */}
        <div className="match-score-card glass">
          <h3>Role Match Index</h3>
          <div className="big-match-circle">
            <span className="percent-text">{analysis.matchPercentage}%</span>
            <span className="label-sub">Competency Fit</span>
          </div>

          <div className="gap-time-est">
            <Clock size={16} className="time-icon" />
            <span>Est. Time to 100% Fit: <strong>{analysis.estimatedTimeWeeks} Weeks</strong></span>
          </div>
        </div>

        {/* Competencies Matrix Breakdown */}
        <div className="matrix-breakdown-card glass">
          <h3>Skills & Qualifications Breakdown</h3>

          <div className="skills-comparison-row">
            <div className="skill-box matched">
              <h4><CheckCircle2 size={16} className="green-icon" /> Acquired Competencies</h4>
              <div className="skill-tags">
                {analysis.matchedSkills.map(sk => (
                  <span key={sk} className="skill-chip matched">✓ {sk}</span>
                ))}
              </div>
            </div>

            <div className="skill-box missing">
              <h4><XCircle size={16} className="red-icon" /> Missing Industry Skills</h4>
              <div className="skill-tags">
                {analysis.missingSkills.map(sk => (
                  <span key={sk} className="skill-chip missing">+ {sk}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Personalized AI Roadmap */}
      <div className="gap-roadmap-card glass">
        <div className="card-header">
          <Sparkles size={20} className="glow-icon" />
          <h3>Recommended Actionable Learning Pathway</h3>
        </div>

        <div className="roadmap-steps-list">
          {analysis.suggestedCourses.map((crs, index) => (
            <div key={index} className="roadmap-step-item">
              <div className="step-num">{index + 1}</div>
              <div className="step-content">
                <h4>{crs}</h4>
                <p>Complete course modules & hands-on practical project assignments to bridge this competency gap.</p>
              </div>
              <button className="start-step-btn">
                <span>Enroll Course</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
