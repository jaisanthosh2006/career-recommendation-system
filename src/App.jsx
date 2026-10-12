import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AIChatAssistant from './components/AIChatAssistant';

import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import LiveClasses from './pages/LiveClasses';
import LiveClassroom from './pages/LiveClassroom';
import ResumeBuilder from './pages/ResumeBuilder';
import SkillGapAnalysis from './pages/SkillGapAnalysis';
import JobsInternships from './pages/JobsInternships';
import ProjectHub from './pages/ProjectHub';
import InterviewPrep from './pages/InterviewPrep';
import AnalyticsGamification from './pages/AnalyticsGamification';
import RecordingCenter from './pages/RecordingCenter';
import Login from './pages/Login';

import { useStore } from './store/useStore';
import './App.css';

export default function App() {
  const { user, updateProfile } = useStore();
  const [isAIOpen, setIsAIOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('authUser');
    window.location.reload();
  };

  return (
    <Router>
      <div className="platform-app-layout">
        <Routes>
          <Route path="/login" element={!user ? <Login onLogin={updateProfile} /> : <Navigate to="/" />} />

          {/* Full-Screen Live Classroom View */}
          <Route path="/live/:classId" element={user ? <LiveClassroom /> : <Navigate to="/login" />} />

          {/* Standard Main Layout Views with Header & Sidebar */}
          <Route
            path="/*"
            element={
              user ? (
                <div className="app-shell">
                  <Navbar 
                    onLogout={handleLogout} 
                    onOpenAIWidget={() => setIsAIOpen(!isAIOpen)} 
                  />

                  <div className="app-body-container">
                    <Sidebar />

                    <main className="app-main-content">
                      <Routes>
                        <Route path="/" element={<Dashboard onOpenAIWidget={() => setIsAIOpen(true)} />} />
                        <Route path="/courses" element={<Courses />} />
                        <Route path="/live-classes" element={<LiveClasses />} />
                        <Route path="/recordings" element={<RecordingCenter />} />
                        <Route path="/resume-builder" element={<ResumeBuilder />} />
                        <Route path="/skill-gap" element={<SkillGapAnalysis />} />
                        <Route path="/jobs-internships" element={<JobsInternships />} />
                        <Route path="/projects" element={<ProjectHub />} />
                        <Route path="/interview-prep" element={<InterviewPrep />} />
                        <Route path="/analytics" element={<AnalyticsGamification />} />
                      </Routes>
                    </main>
                  </div>

                  {/* Floating AI Career Assistant */}
                  <AIChatAssistant isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
                </div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
