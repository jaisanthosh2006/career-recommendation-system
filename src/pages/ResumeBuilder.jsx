import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { ML_ENGINE } from '../data/mockData';
import html2pdf from 'html2pdf.js';
import { 
  FileText, 
  Sparkles, 
  Download, 
  CheckCircle, 
  AlertTriangle, 
  Plus, 
  Trash2, 
  RefreshCw,
  Award,
  BookOpen,
  Briefcase,
  User,
  Zap,
  Stethoscope,
  Building2
} from 'lucide-react';
import './ResumeBuilder.css';

export default function ResumeBuilder() {
  const { activeDomain, user, updateProfile } = useStore();

  const medicalTemplates = [
    { id: 'med-student', name: 'Medical Student / Clinical Intern' },
    { id: 'nursing', name: 'Nursing Student & Care Specialist' },
    { id: 'pharmacy', name: 'Pharmacy & Drug Safety' },
    { id: 'lab-tech', name: 'Laboratory Technology (MLT)' },
    { id: 'radiology', name: 'Radiology & Diagnostic Imaging' },
    { id: 'healthcare-admin', name: 'Healthcare & Hospital Admin' }
  ];

  const csTemplates = [
    { id: 'modern', name: 'Modern SaaS Full Stack' },
    { id: 'classic', name: 'Executive Software Engineer' }
  ];

  const templatesList = activeDomain === 'cs' ? csTemplates : medicalTemplates;

  const [selectedTemplate, setSelectedTemplate] = useState(templatesList[0].id);

  const [resumeData, setResumeData] = useState({
    name: user.name || 'Sandy',
    email: user.email || 'alex.johnson@platform.io',
    phone: '+1 (555) 234-5678',
    location: activeDomain === 'cs' ? 'San Francisco, CA' : 'New York, NY',
    targetRole: activeDomain === 'cs' ? 'Full Stack Developer / AI Specialist' : 'Emergency Clinical Care & Medical Specialist',
    summary: activeDomain === 'cs'
      ? 'Passionate Computer Science graduate with strong expertise in React, Python, FastAPI, DSA, and Cloud Infrastructure. Proven track record of engineering scalable full-stack applications.'
      : 'Dedicated Healthcare Professional with hands-on clinical assessment skills, CPR & Emergency care protocols, medical documentation, and pathology laboratory procedures.',
    skills: (user?.skills || []).join(', '),
    experience: [
      {
        company: activeDomain === 'cs' ? 'TechCorp Solutions' : 'Apollo Hospitals / AIIMS',
        role: activeDomain === 'cs' ? 'Software Development Intern' : 'Clinical Trainee & Emergency Care Resident',
        duration: 'Jan 2025 - Present',
        details: activeDomain === 'cs'
          ? 'Developed RESTful microservices in Python & React, optimizing API response times by 35%.'
          : 'Assisted senior physicians in emergency triage, patient vital signs monitoring, and standardized clinical documentation.'
      }
    ],
    projects: [
      {
        title: activeDomain === 'cs' ? 'AI Medical Diagnostic EHR System' : 'ER Patient Triage Workflow Audit & ESI Simulation',
        desc: activeDomain === 'cs'
          ? 'Built React & FastAPI web platform analyzing clinical symptoms with Google Gemini API.'
          : 'Formulated ESI 5-level emergency triage simulation model reducing hospital intake bottleneck.'
      }
    ],
    education: 'B.S. in ' + (activeDomain === 'cs' ? 'Computer Science & Engineering' : 'Medicine & Surgery / Healthcare Sciences')
  });

  // Compute live ATS score using ML engine
  const fullText = `${resumeData.summary} ${resumeData.skills} ${resumeData.experience.map(e=>e.details).join(' ')} ${resumeData.projects.map(p=>p.desc).join(' ')}`;
  const atsResults = ML_ENGINE.calculateATSScore(fullText, activeDomain);

  const handleDownloadPDF = () => {
    const element = document.getElementById('resume-pdf-preview');
    const opt = {
      margin: 0.5,
      filename: `${resumeData.name.replace(/\s+/g, '_')}_${activeDomain.toUpperCase()}_Resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
    updateProfile({ atsScore: atsResults.atsScore });
  };

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, { company: activeDomain === 'cs' ? 'New Tech Org' : 'Fortis / Max Healthcare', role: 'Role Title', duration: '2025', details: 'Key achievement and quantitative metrics.' }]
    });
  };

  return (
    <div className="resume-builder-container">
      {/* Header */}
      <div className="builder-header-card">
        <div className="header-badge">
          <FileText size={14} />
          <span>ATS RESUME ENGINE • {activeDomain.toUpperCase()} CAREER TEMPLATES</span>
        </div>
        <h1>{activeDomain === 'cs' ? 'Software & Tech' : 'Medical & Healthcare'} Resume Builder</h1>
        <p>Build an ATS-optimized resume tailored for top {activeDomain === 'cs' ? 'Tech Companies (Google, Microsoft, NVIDIA)' : 'Hospitals & Healthcare Organizations (Apollo, AIIMS, Fortis, Pfizer)'}. Get real-time AI score feedback and export PDF instantly.</p>
      </div>

      {/* Main 2-Column Section */}
      <div className="builder-main-grid">
        {/* Left Column: Form Controls & AI Feedback */}
        <div className="builder-controls-col">
          {/* ATS Live Score Card */}
          <div className="ats-score-live-card glass">
            <div className="ats-header">
              <div className="ats-title-box">
                <Sparkles size={20} className="glow-icon" />
                <h3>Real-Time ATS Score</h3>
              </div>
              <div className="ats-badge-score">{atsResults.atsScore}%</div>
            </div>

            <div className="ats-bar-track">
              <div className="ats-bar-fill" style={{ width: `${atsResults.atsScore}%` }} />
            </div>

            <p className="ats-rating-text">Status: <strong>{atsResults.rating}</strong> (Keyword Match: {atsResults.keywordMatchRate})</p>

            {atsResults.missingKeywords.length > 0 && (
              <div className="missing-keywords-box">
                <div className="missing-title">
                  <AlertTriangle size={14} className="warn-icon" />
                  <span>Missing High-Yield Industry Keywords:</span>
                </div>
                <div className="kw-tags">
                  {atsResults.missingKeywords.map(kw => (
                    <span key={kw} className="kw-chip">+{kw}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="ai-tips-list">
              {atsResults.improvementTips.map((tip, i) => (
                <div key={i} className="tip-item">
                  <CheckCircle size={14} className="check-icon" />
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form Sections */}
          <div className="form-section-box glass">
            <h3><User size={16} /> Personal & Professional Info</h3>
            <div className="form-group-grid">
              <input 
                type="text" 
                placeholder="Full Name" 
                value={resumeData.name} 
                onChange={e => setResumeData({...resumeData, name: e.target.value})} 
              />
              <input 
                type="text" 
                placeholder="Email Address" 
                value={resumeData.email} 
                onChange={e => setResumeData({...resumeData, email: e.target.value})} 
              />
              <input 
                type="text" 
                placeholder="Phone Number" 
                value={resumeData.phone} 
                onChange={e => setResumeData({...resumeData, phone: e.target.value})} 
              />
              <input 
                type="text" 
                placeholder="Target Role Title" 
                value={resumeData.targetRole} 
                onChange={e => setResumeData({...resumeData, targetRole: e.target.value})} 
              />
            </div>

            <div className="form-field-full">
              <label>Professional Summary</label>
              <textarea 
                rows="3" 
                value={resumeData.summary} 
                onChange={e => setResumeData({...resumeData, summary: e.target.value})} 
              />
            </div>

            <div className="form-field-full">
              <label>{activeDomain === 'cs' ? 'Technical Skills' : 'Clinical Competencies'} (Comma separated)</label>
              <input 
                type="text" 
                value={resumeData.skills} 
                onChange={e => setResumeData({...resumeData, skills: e.target.value})} 
              />
            </div>
          </div>

          {/* Experience Section */}
          <div className="form-section-box glass">
            <div className="section-header-row">
              <h3><Briefcase size={16} /> {activeDomain === 'cs' ? 'Work Experience' : 'Hospital Residency & Clinical Experience'}</h3>
              <button className="add-btn" onClick={addExperience}><Plus size={14} /> Add</button>
            </div>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="sub-form-card">
                <input 
                  type="text" 
                  placeholder="Company / Hospital / Clinic" 
                  value={exp.company} 
                  onChange={e => {
                    const newExp = [...resumeData.experience];
                    newExp[index].company = e.target.value;
                    setResumeData({...resumeData, experience: newExp});
                  }} 
                />
                <input 
                  type="text" 
                  placeholder="Role Title" 
                  value={exp.role} 
                  onChange={e => {
                    const newExp = [...resumeData.experience];
                    newExp[index].role = e.target.value;
                    setResumeData({...resumeData, experience: newExp});
                  }} 
                />
                <textarea 
                  rows="2" 
                  placeholder="Key Responsibilities & Clinical/Technical Metrics" 
                  value={exp.details} 
                  onChange={e => {
                    const newExp = [...resumeData.experience];
                    newExp[index].details = e.target.value;
                    setResumeData({...resumeData, experience: newExp});
                  }} 
                />
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div className="export-action-row">
            <button className="download-pdf-btn" onClick={handleDownloadPDF}>
              <Download size={18} />
              <span>Download ATS PDF Resume</span>
            </button>
          </div>
        </div>

        {/* Right Column: Live Resume Template Preview */}
        <div className="builder-preview-col">
          <div className="preview-toolbar">
            <span>Template Preset:</span>
            <div className="template-selector">
              {templatesList.map(t => (
                <button 
                  key={t.id}
                  className={`tmpl-btn ${selectedTemplate === t.id ? 'active' : ''}`}
                  onClick={() => setSelectedTemplate(t.id)}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          {/* Printable Resume Container */}
          <div id="resume-pdf-preview" className={`resume-paper ${selectedTemplate}`}>
            <div className="paper-header">
              <h2>{resumeData.name}</h2>
              <p className="paper-role">{resumeData.targetRole}</p>
              <p className="paper-contact">{resumeData.email} • {resumeData.phone} • {resumeData.location}</p>
            </div>

            <div className="paper-section">
              <h4>PROFESSIONAL SUMMARY</h4>
              <p>{resumeData.summary}</p>
            </div>

            <div className="paper-section">
              <h4>{activeDomain === 'cs' ? 'TECHNICAL SKILLS' : 'CLINICAL COMPETENCIES & CERTIFICATIONS'}</h4>
              <p>{resumeData.skills}</p>
            </div>

            <div className="paper-section">
              <h4>{activeDomain === 'cs' ? 'EXPERIENCE' : 'HOSPITAL RESIDENCY & CLINICAL EXPERIENCE'}</h4>
              {resumeData.experience.map((exp, i) => (
                <div key={i} className="paper-item">
                  <div className="item-header">
                    <strong>{exp.role} — {exp.company}</strong>
                    <span>{exp.duration}</span>
                  </div>
                  <p>{exp.details}</p>
                </div>
              ))}
            </div>

            <div className="paper-section">
              <h4>{activeDomain === 'cs' ? 'KEY PROJECTS' : 'CLINICAL CASE AUDITS & RESEARCH'}</h4>
              {resumeData.projects.map((proj, i) => (
                <div key={i} className="paper-item">
                  <strong>{proj.title}</strong>
                  <p>{proj.desc}</p>
                </div>
              ))}
            </div>

            <div className="paper-section">
              <h4>EDUCATION & ACADEMICS</h4>
              <p>{resumeData.education}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
