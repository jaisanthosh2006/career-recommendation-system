import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { INTERNSHIP_LISTINGS, JOB_RECOMMENDATIONS } from '../data/mockData';
import { Briefcase, Building2, MapPin, DollarSign, CheckCircle2, Search, ExternalLink, Sparkles, Filter } from 'lucide-react';
import './JobsInternships.css';

export default function JobsInternships() {
  const { activeDomain } = useStore();
  const [activeTab, setActiveTab] = useState('internships'); // 'internships' | 'jobs'
  const [appliedItem, setAppliedItem] = useState(null);

  const internships = INTERNSHIP_LISTINGS.filter(i => i.domain === activeDomain);
  const jobs = JOB_RECOMMENDATIONS.filter(j => j.domain === activeDomain);

  return (
    <div className="jobs-page-container">
      {/* Header */}
      <div className="jobs-header-card">
        <div className="header-badge">
          <Briefcase size={14} />
          <span>GLOBAL RECRUITMENT HUB • {activeDomain.toUpperCase()}</span>
        </div>
        <h1>Job & Internship Opportunities</h1>
        <p>Direct applications to top {activeDomain === 'cs' ? 'Technology Corporations (Google, Microsoft, NVIDIA, TCS)' : 'Healthcare Organizations (Apollo, Fortis, AIIMS, Pfizer)'}.</p>

        {/* Tab Selector */}
        <div className="jobs-tab-bar">
          <button
            className={`tab-btn ${activeTab === 'internships' ? 'active' : ''}`}
            onClick={() => setActiveTab('internships')}
          >
            🎓 Internships Hub ({internships.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'jobs' ? 'active' : ''}`}
            onClick={() => setActiveTab('jobs')}
          >
            💼 Recommended Full-Time Jobs ({jobs.length})
          </button>
        </div>
      </div>

      {/* Content List */}
      <div className="opportunities-grid">
        {activeTab === 'internships' ? (
          internships.map((item) => (
            <div key={item.id} className="opp-card glass">
              <div className="opp-card-top">
                <div className="company-logo-large">{item.logo}</div>
                <div>
                  <span className="mode-tag">{item.mode}</span>
                  <h3>{item.role}</h3>
                  <p className="company-name">{item.company}</p>
                </div>
              </div>

              <div className="opp-details-meta">
                <span><MapPin size={14} /> {item.location}</span>
                <span><DollarSign size={14} /> {item.stipend}</span>
                <span>⏱ {item.duration}</span>
              </div>

              <div className="eligibility-box">
                <strong>Eligibility:</strong> {item.eligibility}
              </div>

              <div className="skills-chip-row">
                {item.skills.map((sk, i) => (
                  <span key={i} className="skill-chip">{sk}</span>
                ))}
              </div>

              <button className="apply-btn" onClick={() => setAppliedItem(item)}>
                <span>Apply Now</span>
                <ExternalLink size={14} />
              </button>
            </div>
          ))
        ) : (
          jobs.map((item) => (
            <div key={item.id} className="opp-card glass">
              <div className="opp-card-top">
                <div className="company-logo-large">🏢</div>
                <div>
                  <span className="match-tag"><Sparkles size={12} /> {item.matchScore}% Match</span>
                  <h3>{item.title}</h3>
                  <p className="company-name">{item.company}</p>
                </div>
              </div>

              <div className="opp-details-meta">
                <span><MapPin size={14} /> {item.location}</span>
                <span><DollarSign size={14} /> {item.salary}</span>
                <span>💼 {item.type}</span>
              </div>

              <div className="skills-chip-row">
                {item.skills.map((sk, i) => (
                  <span key={i} className="skill-chip">{sk}</span>
                ))}
              </div>

              <button className="apply-btn" onClick={() => setAppliedItem(item)}>
                <span>Apply Now</span>
                <ExternalLink size={14} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Application Success Modal */}
      {appliedItem && (
        <div className="apply-modal-backdrop">
          <div className="apply-modal-card">
            <div className="check-icon-large"><CheckCircle2 size={40} /></div>
            <h2>Application Submitted!</h2>
            <p>Your AI-Scored ATS Resume and Placement Profile have been successfully submitted to:</p>
            <h3>{appliedItem.company}</h3>
            <p className="role-sub">{appliedItem.role || appliedItem.title}</p>
            <div className="app-status-box">
              <span>Application Status: <strong>Under Review (Priority Referral)</strong></span>
            </div>
            <button className="close-apply-modal" onClick={() => setAppliedItem(null)}>
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
