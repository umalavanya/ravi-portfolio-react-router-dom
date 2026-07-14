import { useState, useEffect } from 'react';
import '../styles/Experience.css'

const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState('timeline');
  const [animationActive, setAnimationActive] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSmallMobile, setIsSmallMobile] = useState(window.innerWidth <= 576);
  
  const experienceData = [
    {
      id: 0,
      title: "Postdoctoral Researcher",
      organization: "Carnegie Mellon University",
      location: "Pittsburgh, PA, USA",
      date: "2022 - Present",
      duration: "2+ years",
      description: "Advanced research in condensed matter physics with focus on quantum materials and computational modeling",
      type: "postdoc",
      details: [
        "Led a team of 3 graduate students in quantum computing research",
        "Published 6 papers in high-impact journals including Nature Physics",
        "Secured $1.2M in research funding from NSF and DOE",
        "Developed novel computational models for topological insulators"
      ],
      skills: ["Quantum Computing", "Computational Physics", "Team Leadership", "Grant Writing"],
      icon: "🧬"
    },
    {
      id: 1,
      title: "IISc Kotari Fellow",
      organization: "Indian Institute of Science",
      location: "Bangalore, India",
      date: "2020 - 2022",
      duration: "2 years",
      description: "Prestigious fellowship for advanced research in experimental physics and material science",
      type: "fellowship",
      details: [
        "Awarded the prestigious Kotari Fellowship (top 0.5% of applicants)",
        "Designed and built custom cryogenic measurement setup",
        "Discovered novel magnetic properties in perovskite materials",
        "Mentored 5 undergraduate research students"
      ],
      skills: ["Experimental Design", "Cryogenics", "Data Analysis", "Mentoring"],
      icon: "⚛️"
    },
    {
      id: 2,
      title: "IISc IOE Fellow",
      organization: "Indian Institute of Science",
      location: "Bangalore, India",
      date: "2018 - 2020",
      duration: "2 years",
      description: "Institute of Eminence fellowship for interdisciplinary research bridging physics and engineering",
      type: "fellowship",
      details: [
        "Collaborated with engineering department on sensor development",
        "Published 4 papers in interdisciplinary journals",
        "Developed patent for novel magnetic sensing device",
        "Organized international workshop on advanced materials"
      ],
      skills: ["Interdisciplinary Research", "Patent Development", "Workshop Organization", "Sensor Technology"],
      icon: "🔭"
    },
    {
      id: 3,
      title: "Research Scientist",
      organization: "IISER Bhuvaneswar",
      location: "Bhubaneswar, India",
      date: "2018 - 2018",
      duration: "3 years",
      description: "Research and teaching position focusing on experimental condensed matter physics",
      type: "research",
      details: [
        "Supervised 2 Ph.D. students to completion",
        "Taught advanced laboratory courses for graduate students",
        "Established new thin-film deposition laboratory",
        "Collaborated with 3 international research groups"
      ],
      skills: ["Thin Film Deposition", "Student Supervision", "Lab Management", "International Collaboration"],
      icon: "🏛️"
    }
  ];

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsSmallMobile(window.innerWidth <= 576);
      if (window.innerWidth <= 576 && viewMode === 'grid') {
        setViewMode('timeline');
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [viewMode]);

  const totalExperience = experienceData.reduce((total, exp) => {
    const years = parseInt(exp.duration);
    return total + (isNaN(years) ? 0 : years);
  }, 0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (viewMode === 'timeline') {
        setActiveIndex((prevIndex) => (prevIndex + 1) % experienceData.length);
        setAnimationActive(true);
        setTimeout(() => setAnimationActive(false), 500);
      }
    }, 6000);
    
    return () => clearInterval(interval);
  }, [experienceData.length, viewMode]);

  const handleTimelineClick = (index) => {
    setActiveIndex(index);
    setAnimationActive(true);
    setTimeout(() => setAnimationActive(false), 500);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const getDurationPercentage = (duration) => {
    const years = parseInt(duration);
    return (years / totalExperience) * 100;
  };

  return (
    <div className="content-section active experience-dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Professional Experience</h1>
        <p className="dashboard-subtitle">Total Experience: {totalExperience}+ Years of Research Excellence</p>
        
        <div className="view-mode-selector">
          <button 
            className={`view-mode-btn ${viewMode === 'timeline' ? 'active' : ''}`}
            onClick={() => handleViewModeChange('timeline')}
          >
            <span className="btn-icon">📅</span>
            <span className="btn-text">Timeline View</span>
          </button>
          <button 
            className={`view-mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => handleViewModeChange('grid')}
            style={{ display: isSmallMobile ? 'none' : 'flex' }}
          >
            <span className="btn-icon">🏢</span>
            <span className="btn-text">Grid View</span>
          </button>
          <button 
            className={`view-mode-btn ${viewMode === 'focus' ? 'active' : ''}`}
            onClick={() => handleViewModeChange('focus')}
          >
            <span className="btn-icon">🔍</span>
            <span className="btn-text">Focus View</span>
          </button>
        </div>
      </div>
      
      <div className={`dashboard-container ${viewMode}`}>
        {/* Experience Timeline */}
        {(viewMode === 'timeline' || viewMode === 'focus') && (
          <div className="timeline-experience-section">
            <div className="timeline-container-exp">
              <div className="timeline-track">
                <div className="timeline-progress" style={{ width: `${((activeIndex + 1) / experienceData.length) * 100}%` }}></div>
                
                {experienceData.map((item, index) => (
                  <div 
                    key={item.id} 
                    className={`timeline-milestone ${index === activeIndex ? 'active' : ''} ${index < activeIndex ? 'completed' : ''}`}
                    style={{ left: `${(index / (experienceData.length - 1)) * 100}%` }}
                    onClick={() => handleTimelineClick(index)}
                    data-year={item.date.split(' - ')[0]}
                  >
                    <div className="milestone-marker">
                      <div className="milestone-icon">{item.icon}</div>
                      <div className="milestone-dot"></div>
                    </div>
                    {!isMobile && (
                      <>
                        <div className="milestone-label">{item.organization.split(' ')[0]}</div>
                        <div className="milestone-tooltip">
                          <strong>{item.title}</strong>
                          <span>{item.date}</span>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Main Experience Details */}
        {viewMode === 'timeline' || viewMode === 'focus' ? (
          <div className={`experience-details-container ${animationActive ? 'animate' : ''}`}>
            <div className="experience-card active">
              <div className="experience-card-header">
                <div className="exp-card-icon">{experienceData[activeIndex].icon}</div>
                <div className="exp-card-title-section">
                  <h2 className="exp-card-title">{experienceData[activeIndex].title}</h2>
                  <div className="exp-card-subtitle">
                    <span className="exp-organization">{experienceData[activeIndex].organization}</span>
                    <span className="exp-location">{experienceData[activeIndex].location}</span>
                  </div>
                  <div className="exp-card-meta">
                    <span className="exp-date-badge">{experienceData[activeIndex].date}</span>
                    <span className="exp-duration-badge">{experienceData[activeIndex].duration}</span>
                    <span className={`exp-type-badge ${experienceData[activeIndex].type}`}>
                      {experienceData[activeIndex].type.charAt(0).toUpperCase() + experienceData[activeIndex].type.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="exp-card-description">{experienceData[activeIndex].description}</p>
              
              <div className="exp-achievements-section">
                <h3>
                  <span className="achievement-icon">🏆</span>
                  Key Achievements
                </h3>
                <div className="achievements-grid">
                  {experienceData[activeIndex].details.map((detail, idx) => (
                    <div key={idx} className="achievement-card">
                      <div className="achievement-number">{idx + 1}</div>
                      <p className="achievement-text">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="exp-skills-section">
                <h3>
                  <span className="skills-icon">🛠️</span>
                  Skills Developed
                </h3>
                <div className="skills-tags">
                  {experienceData[activeIndex].skills.map((skill, idx) => (
                    <span key={idx} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
              
              {/* Experience progress */}
              <div className="exp-progress-section">
                <div className="progress-header">
                  <span>Career Progress</span>
                  <span>{Math.round((activeIndex + 1) / experienceData.length * 100)}% Complete</span>
                </div>
                <div className="progress-timeline">
                  {experienceData.map((item, index) => (
                    <div 
                      key={index} 
                      className={`progress-segment ${index <= activeIndex ? 'filled' : ''}`}
                      style={{ width: `${getDurationPercentage(item.duration)}%` }}
                      onClick={() => handleTimelineClick(index)}
                    >
                      <div className="segment-label">
                        {index === activeIndex && !isSmallMobile ? item.organization.split(' ')[0] : ''}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Grid View */
          <div className="experience-grid-container">
            <div className="experience-grid">
              {experienceData.map((item, index) => (
                <div 
                  key={item.id} 
                  className={`experience-grid-card ${index === activeIndex ? 'active' : ''}`}
                  onClick={() => {
                    setActiveIndex(index);
                    if (isMobile) {
                      setViewMode('focus');
                    }
                  }}
                >
                  <div className="grid-card-header">
                    <div className="grid-card-icon">{item.icon}</div>
                    <div className="grid-card-type">{item.type}</div>
                  </div>
                  
                  <h3 className="grid-card-title">{item.title}</h3>
                  <div className="grid-card-org">{item.organization}</div>
                  <div className="grid-card-location">{item.location}</div>
                  
                  <div className="grid-card-duration">
                    <span className="duration-label">{item.duration}</span>
                    <span className="date-label">{item.date}</span>
                  </div>
                  
                  <p className="grid-card-description">{item.description}</p>
                  
                  <div className="grid-card-skills">
                    {item.skills.slice(0, isMobile ? 2 : 3).map((skill, idx) => (
                      <span key={idx} className="grid-skill-tag">{skill}</span>
                    ))}
                    {item.skills.length > (isMobile ? 2 : 3) && (
                      <span className="grid-skill-tag more">+{item.skills.length - (isMobile ? 2 : 3)} more</span>
                    )}
                  </div>
                  
                  <div className="grid-card-footer">
                    <button 
                      className="grid-view-details-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveIndex(index);
                        setViewMode('focus');
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Stats and Controls Sidebar */}
        <div className="experience-sidebar">
          <div className="sidebar-section">
            <h3>
              <span className="stats-icon">📊</span>
              Experience Stats
            </h3>
            
            <div className="stats-grid">
              <div className="stat-card-exp">
                <div className="stat-value-exp">{totalExperience}+</div>
                <div className="stat-label-exp">Years Total</div>
              </div>
              
              <div className="stat-card-exp">
                <div className="stat-value-exp">{experienceData.length}</div>
                <div className="stat-label-exp">Positions</div>
              </div>
              
              <div className="stat-card-exp">
                <div className="stat-value-exp">3</div>
                <div className="stat-label-exp">Countries</div>
              </div>
              
              <div className="stat-card-exp">
                <div className="stat-value-exp">15+</div>
                <div className="stat-label-exp">Papers Published</div>
              </div>
            </div>
          </div>
          
          <div className="sidebar-section">
            <h3>
              <span className="nav-icon">📍</span>
              Navigation
            </h3>
            
            <div className="position-navigator">
              {experienceData.map((item, index) => (
                <button
                  key={item.id}
                  className={`position-nav-btn ${index === activeIndex ? 'active' : ''}`}
                  onClick={() => handleTimelineClick(index)}
                >
                  <div className="nav-btn-icon">{item.icon}</div>
                  <div className="nav-btn-text">
                    <div className="nav-btn-title">{item.title}</div>
                    <div className="nav-btn-org">{item.organization}</div>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="timeline-controls-exp">
              <button 
                className="control-btn-exp prev"
                onClick={() => setActiveIndex(prev => prev > 0 ? prev - 1 : experienceData.length - 1)}
              >
                ◀ Previous
              </button>
              <button 
                className="control-btn-exp next"
                onClick={() => setActiveIndex((prev) => (prev + 1) % experienceData.length)}
              >
                Next ▶
              </button>
            </div>
          </div>
          
          <div className="sidebar-section">
            <h3>
              <span className="type-icon">🏷️</span>
              Experience Types
            </h3>
            
            <div className="type-breakdown">
              <div className="type-item postdoc">
                <span className="type-label">Postdoctoral</span>
                <span className="type-count">1</span>
              </div>
              <div className="type-item fellowship">
                <span className="type-label">Fellowships</span>
                <span className="type-count">2</span>
              </div>
              <div className="type-item research">
                <span className="type-label">Research</span>
                <span className="type-count">1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile-specific timeline indicator */}
      {isMobile && (
        <div className="mobile-timeline-indicator">
          <div className="mobile-progress-bar">
            <div 
              className="mobile-progress-fill"
              style={{ width: `${((activeIndex + 1) / experienceData.length) * 100}%` }}
            ></div>
          </div>
          <div className="mobile-position-info">
            <span className="mobile-pos-title">{experienceData[activeIndex].title}</span>
            <span className="mobile-pos-org">{experienceData[activeIndex].organization}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Experience;