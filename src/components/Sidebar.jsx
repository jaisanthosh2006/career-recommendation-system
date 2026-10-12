import React from 'react';
import { NavLink } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { 
  LayoutDashboard, 
  BookOpen, 
  Video,
  PlayCircle, 
  FileText, 
  Target, 
  Briefcase, 
  FolderGit2, 
  Mic, 
  BarChart3, 
  Trophy,
  Sparkles,
  Stethoscope,
  Cpu
} from 'lucide-react';
import './Sidebar.css';

export default function Sidebar() {
  const { activeDomain } = useStore();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/courses', label: 'Courses & Study', icon: BookOpen, badge: activeDomain === 'cs' ? '23' : '25' },
    { path: '/live-classes', label: 'Live Mentor Classes', icon: Video, badge: 'LIVE' },
    { path: '/recordings', label: 'Recordings & Learning', icon: PlayCircle },
    { path: '/resume-builder', label: 'AI Resume Builder', icon: FileText },
    { path: '/skill-gap', label: 'AI Skill Gap Analysis', icon: Target },
    { path: '/jobs-internships', label: 'Job & Internship Hub', icon: Briefcase },
    { path: '/projects', label: 'Project Hub', icon: FolderGit2 },
    { path: '/interview-prep', label: 'AI Interview Prep', icon: Mic },
    { path: '/analytics', label: 'Analytics & Rewards', icon: BarChart3 }
  ];

  return (
    <aside className="platform-sidebar">
      {/* Domain Focus Card */}
      <div className={`domain-focus-card ${activeDomain}`}>
        <div className="focus-icon">
          {activeDomain === 'cs' ? <Cpu size={20} /> : <Stethoscope size={20} />}
        </div>
        <div className="focus-info">
          <span className="focus-label">ACTIVE PATHWAY</span>
          <span className="focus-title">
            {activeDomain === 'cs' ? 'Computer Science & IT' : 'Medical & Healthcare'}
          </span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
              end={item.path === '/'}
            >
              <Icon size={18} className="link-icon" />
              <span className="link-label">{item.label}</span>
              {item.badge && <span className={`link-badge ${item.badge === 'LIVE' ? 'live-badge' : ''}`}>{item.badge}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* AI Upgrade Banner */}
      <div className="sidebar-ai-box">
        <div className="ai-box-header">
          <Sparkles size={16} className="ai-sparkle-icon" />
          <span>Placement Coach</span>
        </div>
        <p className="ai-box-text">AI algorithm predicts 94% job match readiness for your active track!</p>
        <button className="ai-box-btn">View AI Recommendations</button>
      </div>
    </aside>
  );
}
