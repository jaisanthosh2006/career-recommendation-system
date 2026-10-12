import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { PROJECT_HUB } from '../data/mockData';
import { FolderGit2, Code, Database, Cpu, Layers, GitBranch, ExternalLink, Check, Copy } from 'lucide-react';
import './ProjectHub.css';

export default function ProjectHub() {
  const { activeDomain } = useStore();
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [copiedIndex, setCopiedIndex] = useState(null);

  const projects = PROJECT_HUB.filter(p => p.domain === activeDomain);

  const filteredProjects = projects.filter(p => selectedLevel === 'All' || p.level === selectedLevel);

  const copyToClipboard = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="projects-page-container">
      {/* Header */}
      <div className="projects-header-card">
        <div className="header-badge">
          <FolderGit2 size={14} />
          <span>PROJECT-BASED LEARNING • INDUSTRY PORTFOLIO</span>
        </div>
        <h1>Hands-On Project Hub</h1>
        <p>Build resume-worthy practical projects with step-by-step architecture guides, folder structures, APIs, GitHub instructions, and resume bullet points.</p>

        {/* Level Filters */}
        <div className="level-filter-bar">
          {['All', 'Beginner', 'Intermediate', 'Advanced'].map(lvl => (
            <button
              key={lvl}
              className={`lvl-btn ${selectedLevel === lvl ? 'active' : ''}`}
              onClick={() => setSelectedLevel(lvl)}
            >
              {lvl} Projects
            </button>
          ))}
        </div>
      </div>

      {/* Projects List */}
      <div className="projects-list-full">
        {filteredProjects.map((proj) => (
          <div key={proj.id} className="project-detail-card glass">
            <div className="proj-card-header">
              <div>
                <span className="proj-lvl-tag">{proj.level}</span>
                <span className="proj-cat-tag">{proj.category}</span>
                <h2>{proj.title}</h2>
              </div>
              <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="github-link-btn">
                <GitBranch size={16} />
                <span>GitHub Repo</span>
              </a>
            </div>

            <p className="proj-desc-text">{proj.desc}</p>

            {/* Folder Structure & Architecture View */}
            <div className="proj-tech-grid">
              <div className="tech-box">
                <h4><Code size={16} /> Technology Stack</h4>
                <div className="stack-chips-wrap">
                  {proj.stack.map((s, i) => (
                    <span key={i} className="chip">{s}</span>
                  ))}
                </div>
              </div>

              <div className="tech-box">
                <h4><Database size={16} /> Datasets & APIs</h4>
                <p className="tech-sub-text"><strong>Dataset:</strong> {proj.dataset}</p>
                <p className="tech-sub-text"><strong>APIs:</strong> {proj.apis.join(', ')}</p>
              </div>
            </div>

            {/* Folder Structure */}
            <div className="folder-structure-box">
              <div className="structure-header">
                <Layers size={14} />
                <span>Standard Repository Folder Structure</span>
              </div>
              <pre>{proj.folderStructure}</pre>
            </div>

            {/* Source Code & Implementation Guide */}
            <div className="guide-box">
              <h4>🚀 Source Code & Deployment Guide</h4>
              <p className="guide-text">{proj.guide}</p>

              <div className="deployment-line">
                <strong>Deployment Target:</strong> {proj.deployment}
              </div>
            </div>

            {/* Resume Bullet Points */}
            <div className="resume-bullets-box">
              <h4>🎯 Add to Your Resume (Copy Bullet Points)</h4>
              <div className="bullets-list">
                {proj.resumePoints.map((pt, i) => (
                  <div key={i} className="bullet-row">
                    <span className="bullet-text">• {pt}</span>
                    <button className="copy-btn" onClick={() => copyToClipboard(pt, `${proj.id}-${i}`)}>
                      {copiedIndex === `${proj.id}-${i}` ? <Check size={14} className="copied-icon" /> : <Copy size={14} />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
