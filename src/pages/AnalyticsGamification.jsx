import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import confetti from 'canvas-confetti';
import { Award, Trophy, Flame, Zap, BarChart3, CheckCircle2, Download, Star, ShieldCheck, Sparkles } from 'lucide-react';
import './AnalyticsGamification.css';

export default function AnalyticsGamification() {
  const { activeDomain, user } = useStore();
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  const badges = [
    { title: 'Placement Ready', icon: '🏆', desc: 'Achieved 80%+ Placement Readiness index', unlocked: true },
    { title: 'ATS Master', icon: '📄', desc: 'Built a 90%+ ATS resume score', unlocked: true },
    { title: 'Streak Titan', icon: '🔥', desc: 'Maintained a 14-day daily active learning streak', unlocked: true },
    { title: activeDomain === 'cs' ? 'Full Stack Developer' : 'Clinical ER Care', icon: activeDomain === 'cs' ? '💻' : '🏥', desc: 'Completed core domain milestone pathways', unlocked: true },
    { title: 'Live Class Regular', icon: '🎓', desc: 'Attended 5+ mentor live sessions', unlocked: false }
  ];

  const leaderboard = [
    { rank: 1, name: 'Sarah M.', domain: 'Computer Science', xp: 4890, coins: 650 },
    { rank: 2, name: 'Sandy (You)', domain: activeDomain === 'cs' ? 'CS & IT' : 'Medical', xp: user.xpPoints, coins: user.careerCoins },
    { rank: 3, name: 'Dr. Kevin P.', domain: 'Medical Science', xp: 3210, coins: 410 },
    { rank: 4, name: 'Elena R.', domain: 'Computer Science', xp: 2980, coins: 380 }
  ];

  const triggerCertificateConfetti = () => {
    setShowCertificateModal(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="analytics-page-container">
      {/* Header */}
      <div className="analytics-header-card">
        <div className="header-badge">
          <BarChart3 size={14} />
          <span>PERFORMANCE ANALYTICS & GAMIFICATION • {activeDomain.toUpperCase()}</span>
        </div>
        <h1>Analytics & Gamification Rewards</h1>
        <p>Track your weekly learning velocity, placement readiness index, earned badges, leaderboards, and official verification certificates.</p>
      </div>

      {/* Top Gamification Summary Cards */}
      <div className="gamify-summary-grid">
        <div className="g-card glass">
          <div className="g-icon gold"><Trophy size={24} /></div>
          <div>
            <span className="g-label">Experience Points</span>
            <h2 className="g-value">{user.xpPoints} XP</h2>
          </div>
        </div>

        <div className="g-card glass">
          <div className="g-icon purple"><Zap size={24} /></div>
          <div>
            <span className="g-label">Career Coins Balance</span>
            <h2 className="g-value">{user.careerCoins} Coins</h2>
          </div>
        </div>

        <div className="g-card glass">
          <div className="g-icon orange"><Flame size={24} /></div>
          <div>
            <span className="g-label">Learning Streak</span>
            <h2 className="g-value">{user.streakDays} Days</h2>
          </div>
        </div>

        <div className="g-card glass">
          <div className="g-icon green"><Award size={24} /></div>
          <div>
            <span className="g-label">Badges Unlocked</span>
            <h2 className="g-value">4 / 5</h2>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="analytics-main-grid">
        {/* Left Column: Visual Analytics Bar Charts */}
        <div className="charts-col glass">
          <h3>Weekly Learning Hours Velocity</h3>

          <div className="custom-bar-chart">
            {[
              { day: 'Mon', hours: 4.2 },
              { day: 'Tue', hours: 5.5 },
              { day: 'Wed', hours: 3.8 },
              { day: 'Thu', hours: 6.0 },
              { day: 'Fri', hours: 5.0 },
              { day: 'Sat', hours: 7.2 },
              { day: 'Sun', hours: 4.8 }
            ].map((bar, i) => (
              <div key={i} className="chart-bar-group">
                <div className="bar-wrapper">
                  <div className="bar-fill" style={{ height: `${(bar.hours / 8) * 100}%` }}>
                    <span className="bar-val-tooltip">{bar.hours}h</span>
                  </div>
                </div>
                <span className="bar-day">{bar.day}</span>
              </div>
            ))}
          </div>

          {/* Certificate Action */}
          <div className="certificate-banner">
            <div className="cert-info">
              <ShieldCheck size={28} className="cert-icon" />
              <div>
                <h4>Official Placement Readiness Certificate</h4>
                <p>Verified credential for {activeDomain === 'cs' ? 'Computer Science Industry Standards' : 'Medical & Healthcare Practice'}.</p>
              </div>
            </div>
            <button className="claim-cert-btn" onClick={triggerCertificateConfetti}>
              <Download size={16} />
              <span>View Certificate</span>
            </button>
          </div>
        </div>

        {/* Right Column: Badges Showcase & Leaderboard */}
        <div className="rewards-col">
          {/* Badges Showcase */}
          <div className="badges-card glass">
            <h3>Badges Showcase</h3>
            <div className="badges-grid">
              {badges.map((b, i) => (
                <div key={i} className={`badge-item ${b.unlocked ? 'unlocked' : 'locked'}`}>
                  <div className="badge-emoji">{b.icon}</div>
                  <h4>{b.title}</h4>
                  <p>{b.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Global Leaderboard */}
          <div className="leaderboard-card glass">
            <h3>Global Peer Leaderboard</h3>
            <div className="leaderboard-list">
              {leaderboard.map((userRow) => (
                <div key={userRow.rank} className={`lb-row ${userRow.rank === 2 ? 'is-self' : ''}`}>
                  <span className={`rank-number r-${userRow.rank}`}>#{userRow.rank}</span>
                  <div className="lb-user-info">
                    <span className="lb-name">{userRow.name}</span>
                    <span className="lb-domain">{userRow.domain}</span>
                  </div>
                  <span className="lb-xp">{userRow.xp} XP</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertificateModal && (
        <div className="cert-modal-backdrop">
          <div className="cert-modal-card">
            <div className="cert-frame">
              <div className="cert-watermark">STAMP OF EXCELLENCE</div>
              <h2>CERTIFICATE OF INDUSTRIAL READINESS</h2>
              <p className="cert-sub">This is to certify that</p>
              <h1 className="cert-recipient">{user.name}</h1>
              <p className="cert-body">
                has successfully completed all rigorous curriculum milestones, hands-on portfolio projects, live mentor classes, and AI competency evaluations in
              </p>
              <h3 className="cert-track">{activeDomain === 'cs' ? 'COMPUTER SCIENCE & FULL STACK SOFTWARE ENGINEERING' : 'MEDICAL SCIENCE & CLINICAL EMERGENCY HEALTHCARE'}</h3>
              <div className="cert-footer-row">
                <div className="sig-block">
                  <span className="sig-line">Dr. Sarah Jenkins</span>
                  <span className="sig-title">Head of Academic Board</span>
                </div>
                <div className="cert-stamp">
                  <ShieldCheck size={36} color="#818cf8" />
                  <span>VERIFIED CAREER AI</span>
                </div>
              </div>
            </div>

            <div className="cert-modal-actions">
              <button className="cert-download-btn" onClick={() => alert("Downloading High-Res PDF Certificate...")}>
                <Download size={16} />
                <span>Download PDF Certificate</span>
              </button>
              <button className="cert-close-btn" onClick={() => setShowCertificateModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
