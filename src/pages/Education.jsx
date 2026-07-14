import { useState, useEffect } from 'react';
import '../styles/Education.css';

const Education = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);
  
  const educationData = [
    {
      id: 0,
      title: "Ph.D. in Experimental Condensed Matter Physics",
      institution: "University of Hyderabad",
      date: "2010 - 2018",
      duration: "8 years",
      description: "Thesis: Study of magnetic and transport properties of novel perovskite materials",
      details: [
        "Published 8 research papers in international journals",
        "Awarded Best Doctoral Thesis in Physical Sciences",
        "Presented research at 5 international conferences"
      ],
      icon: "🎓"
    },
    {
      id: 1,
      title: "M.Sc. in Physics",
      institution: "Osmania University",
      date: "2007 - 2009",
      duration: "2 years",
      description: "Specialized in Condensed Matter Physics and Quantum Mechanics",
      details: [
        "Graduated with First Class with Distinction",
        "Awarded University Gold Medal",
        "Completed advanced lab projects in spectroscopy"
      ],
      icon: "🔬"
    },
    {
      id: 2,
      title: "B.Sc. in Mathematics, Physics, Chemistry",
      institution: "Kakatiya University",
      date: "2004 - 2007",
      duration: "3 years",
      description: "Triple major program with focus on foundational sciences",
      details: [
        "Graduated with First Class Honors",
        "President of University Physics Club",
        "Won inter-university science competition"
      ],
      icon: "🧪"
    }
  ];

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 576);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-rotate through education items
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % educationData.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [educationData.length]);

  const handleTimelineClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="content-section active education-dashboard">
      <h1 className="dashboard-title">Education Journey</h1>
      <p className="dashboard-subtitle">Academic timeline with detailed achievements</p>
      
      <div className="dashboard-container">
        {/* Timeline visualization */}
        <div className="timeline-container">
          <div className="timeline-line"></div>
          
          {educationData.map((item, index) => (
            <div 
              key={item.id} 
              className={`timeline-node ${index === activeIndex ? 'active' : ''}`}
              style={{ left: `${(index / (educationData.length - 1)) * 100}%` }}
              onClick={() => handleTimelineClick(index)}
            >
              <div className="timeline-icon">{item.icon}</div>
              <div className="timeline-year">{item.date.split(' - ')[1]}</div>
              <div className="node-tooltip">{item.institution}</div>
            </div>
          ))}
        </div>
        
        {/* Main education details */}
        <div className="education-details-container">
          <div className={`education-card ${isMobile ? 'mobile-visible' : ''}`}>
            <div className="education-card-header">
              <div className="card-icon">{educationData[activeIndex].icon}</div>
              <div className="card-header-content">
                <h2 className="card-title">{educationData[activeIndex].title}</h2>
                <div className="card-subtitle">
                  <span className="institution">{educationData[activeIndex].institution}</span>
                  <span className="date-badge">{educationData[activeIndex].date}</span>
                  <span className="duration-badge">{educationData[activeIndex].duration}</span>
                </div>
              </div>
            </div>
            
            <p className="card-description">{educationData[activeIndex].description}</p>
            
            <div className="achievements-section">
              <h3>Key Achievements</h3>
              <ul className="achievements-list">
                {educationData[activeIndex].details.map((detail, idx) => (
                  <li key={idx} className="achievement-item">
                    <span className="achievement-bullet">✓</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="progress-indicator">
              <div className="progress-labels">
                <span>Completed</span>
                <span>{Math.round((activeIndex + 1) / educationData.length * 100)}% of Academic Journey</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${((activeIndex + 1) / educationData.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          {/* Education cards for smaller screens */}
          <div className="education-cards-mobile">
            {educationData.map((item, index) => (
              <div 
                key={item.id} 
                className={`education-card-mobile ${index === activeIndex ? 'active' : ''}`}
                onClick={() => handleTimelineClick(index)}
              >
                <div className="mobile-card-header">
                  <div className="mobile-card-icon">{item.icon}</div>
                  <div className="mobile-card-content">
                    <h3>{item.title}</h3>
                    <div className="mobile-card-subtitle">
                      {item.institution} • {item.date}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Stats sidebar */}
        <div className="stats-sidebar">
          <h3>Education Stats</h3>
          
          <div className="stat-card">
            <div className="stat-value">{educationData.length}</div>
            <div className="stat-label">Degrees Earned</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-value">15 years</div>
            <div className="stat-label">Total Study Duration</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-value">3</div>
            <div className="stat-label">Universities</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-value">Physics</div>
            <div className="stat-label">Primary Field</div>
          </div>
          
          <div className="timeline-controls">
            <h4>Timeline Navigation</h4>
            <div className="control-buttons">
              <button 
                className="control-btn prev"
                onClick={() => setActiveIndex(prev => prev > 0 ? prev - 1 : educationData.length - 1)}
              >
                ◀ Previous
              </button>
              <button 
                className="control-btn next"
                onClick={() => setActiveIndex((prev) => (prev + 1) % educationData.length)}
              >
                Next ▶
              </button>
            </div>
            
            <div className="timeline-dots">
              {educationData.map((_, index) => (
                <button
                  key={index}
                  className={`timeline-dot ${index === activeIndex ? 'active' : ''}`}
                  onClick={() => setActiveIndex(index)}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;