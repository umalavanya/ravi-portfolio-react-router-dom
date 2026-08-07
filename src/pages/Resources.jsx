// src/pages/Resources.jsx
import React from 'react';
import '../styles/Resources.css';

const Resources = () => {
  return (
    <div className="content-section resources-dashboard">
      <div className="resources-hero">
        <h1>📚 Research Resources</h1>
        <p>This is the Resources page. If you can see this, the routing works!</p>
      </div>
      
      <div className="resources-grid">
        <div className="resource-card">
          <h3>PhD Theses</h3>
          <p>Coming soon...</p>
        </div>
        <div className="resource-card">
          <h3>Research Posters</h3>
          <p>Coming soon...</p>
        </div>
        <div className="resource-card">
          <h3>Publications</h3>
          <p>Coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default Resources;