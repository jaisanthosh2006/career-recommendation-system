import React from 'react';
import './DashboardCard.css';

function DashboardCard({ title, children }) {
  return (
    <div className="dashboard-card">
      <h2 className="card-title">{title}</h2>
      <div className="card-content">{children}</div>
    </div>
  );
}

export default DashboardCard;
