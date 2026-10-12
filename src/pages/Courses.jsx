import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { CS_COURSES, MEDICAL_COURSES, STUDY_MATERIAL_TYPES } from '../data/mockData';
import { 
  Search, 
  BookOpen, 
  FileText, 
  Download, 
  Bookmark, 
  Star, 
  Clock, 
  Users, 
  CheckCircle2, 
  Layers, 
  Sparkles,
  X,
  Highlighter,
  MessageSquare,
  ChevronRight
} from 'lucide-react';
import './Courses.css';

export default function Courses() {
  const { activeDomain, savedMaterials, toggleSaveMaterial } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeCourse, setActiveCourse] = useState(null);
  const [selectedMaterialType, setSelectedMaterialType] = useState('lecture-notes');
  const [viewerMaterial, setViewerMaterial] = useState(null);
  const [userNote, setUserNote] = useState('');
  const [userNotesList, setUserNotesList] = useState([]);
  const [highlighted, setHighlighted] = useState(false);

  const courses = activeDomain === 'cs' ? CS_COURSES : MEDICAL_COURSES;

  // Categories list
  const categories = ['All', ...new Set(courses.map(c => c.category))];

  const filteredCourses = courses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openMaterialViewer = (matType) => {
    setViewerMaterial({
      type: matType,
      title: `${activeCourse.title} - ${matType.name}`,
      content: `Official ${matType.name} document for ${activeCourse.title}.\n\n` +
               `Key Core Concepts:\n` +
               `1. Comprehensive theoretical foundation and industry standard conventions.\n` +
               `2. Step-by-step practical examples & diagrams.\n` +
               `3. High-yield summary for competitive interviews and clinical/technical board examinations.`
    });
  };

  const handleAddNote = () => {
    if (!userNote.trim()) return;
    setUserNotesList([...userNotesList, { text: userNote, date: new Date().toLocaleTimeString() }]);
    setUserNote('');
  };

  return (
    <div className="courses-page-container">
      {/* Page Header */}
      <div className="courses-header-card">
        <div className="header-badge">
          <BookOpen size={14} />
          <span>STRUCTURED LEARNING PATHWAY • {activeDomain.toUpperCase()}</span>
        </div>
        <h1>{activeDomain === 'cs' ? 'Computer Science & IT' : 'Medical & Healthcare'} Courses</h1>
        <p>Master industry-ready concepts with structured modules, downloadable notes, flashcards, mind maps, and previous year questions.</p>

        {/* Search & Category Filter */}
        <div className="search-filter-row">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder={`Search ${courses.length} courses, notes, flashcards...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="categories-pill-bar">
            {categories.map(cat => (
              <button
                key={cat}
                className={`cat-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Courses Catalog Grid */}
      <div className="courses-catalog-grid">
        {filteredCourses.map((crs) => (
          <div key={crs.id} className="course-card glass">
            <div className="course-card-top">
              <span className="domain-chip">{crs.category}</span>
              <span className="rating-tag"><Star size={12} fill="#fbbf24" stroke="none" /> {crs.rating}</span>
            </div>

            <h3>{crs.title}</h3>
            <p className="course-description">{crs.desc}</p>

            <div className="course-meta-info">
              <span><Clock size={12} /> {crs.duration}</span>
              <span><Users size={12} /> {crs.students} Enrolled</span>
              <span className="level-tag">{crs.level}</span>
            </div>

            <div className="course-progress-section">
              <div className="progress-label-row">
                <span>Course Completion</span>
                <span className="percent">{crs.progress}%</span>
              </div>
              <div className="course-progress-bar">
                <div className="fill" style={{ width: `${crs.progress}%` }} />
              </div>
            </div>

            <button className="open-materials-btn" onClick={() => setActiveCourse(crs)}>
              <FileText size={16} />
              <span>Access 15 Study Materials</span>
              <ChevronRight size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Course Detail Modal / Drawer with 15 Study Material Types */}
      {activeCourse && (
        <div className="materials-modal-backdrop">
          <div className="materials-modal-card">
            <div className="modal-header">
              <div>
                <span className="modal-cat">{activeCourse.category}</span>
                <h2>{activeCourse.title}</h2>
                <p className="modal-sub">Access auto-generated study materials, assignments, and PYQs.</p>
              </div>
              <button className="close-modal-btn" onClick={() => setActiveCourse(null)}>
                <X size={20} />
              </button>
            </div>

            {/* 15 Study Material Types Tabs Grid */}
            <div className="material-types-grid">
              {STUDY_MATERIAL_TYPES.map((mat) => {
                const isSaved = savedMaterials.includes(`${activeCourse.id}-${mat.id}`);
                return (
                  <div key={mat.id} className="material-type-card" onClick={() => openMaterialViewer(mat)}>
                    <div className="mat-icon">{mat.icon}</div>
                    <div className="mat-info">
                      <h4>{mat.name}</h4>
                      <p>Instant Download & View</p>
                    </div>
                    <button
                      className={`bookmark-icon-btn ${isSaved ? 'saved' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaveMaterial(`${activeCourse.id}-${mat.id}`);
                      }}
                      title="Bookmark Material"
                    >
                      <Bookmark size={14} fill={isSaved ? '#818cf8' : 'none'} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Interactive Material Viewer Drawer */}
      {viewerMaterial && (
        <div className="viewer-backdrop">
          <div className="viewer-card">
            <div className="viewer-header">
              <div className="viewer-title">
                <FileText size={20} className="header-icon" />
                <h3>{viewerMaterial.title}</h3>
              </div>
              <div className="viewer-actions">
                <button 
                  className={`action-btn ${highlighted ? 'active' : ''}`} 
                  onClick={() => setHighlighted(!highlighted)}
                  title="Highlight Text"
                >
                  <Highlighter size={16} />
                  <span>{highlighted ? 'Highlighted' : 'Highlight'}</span>
                </button>
                <button className="action-btn download" onClick={() => alert(`Downloading ${viewerMaterial.title}...`)}>
                  <Download size={16} />
                  <span>Download PDF</span>
                </button>
                <button className="close-viewer-btn" onClick={() => setViewerMaterial(null)}>
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="viewer-body">
              {/* Document Content View */}
              <div className={`document-content-area ${highlighted ? 'highlight-mode' : ''}`}>
                <pre>{viewerMaterial.content}</pre>
              </div>

              {/* Notes & Annotations Drawer */}
              <div className="document-notes-sidebar">
                <h4><MessageSquare size={16} /> Your Smart Notes</h4>
                <div className="add-note-box">
                  <textarea
                    placeholder="Add personal revision notes or reminders..."
                    value={userNote}
                    onChange={(e) => setUserNote(e.target.value)}
                  />
                  <button onClick={handleAddNote}>Add Note</button>
                </div>

                <div className="notes-history">
                  {userNotesList.map((n, i) => (
                    <div key={i} className="note-card">
                      <p>{n.text}</p>
                      <span className="note-date">{n.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
