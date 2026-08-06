import { useState, useEffect } from 'react';
import '../styles/Talks.css';

const Talks = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedTalk, setSelectedTalk] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('list');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSmallMobile, setIsSmallMobile] = useState(window.innerWidth <= 576);

  const talkCategories = [
    { id: 'all', name: 'All Talks', icon: '🎤', count: 0 },
    { id: 'conference', name: 'Conference Presentations', icon: '🌍', count: 0 },
    { id: 'invited', name: 'Invited Talks', icon: '🏆', count: 0 },
    { id: 'seminar', name: 'Department Seminars', icon: '🏛️', count: 0 },
    { id: 'workshop', name: 'Workshops', icon: '🔧', count: 0 },
    { id: 'colloquium', name: 'Colloquiums', icon: '📚', count: 0 },
    { id: 'international', name: 'International', icon: '✈️', count: 0 }
  ];

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsSmallMobile(window.innerWidth <= 576);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const talksData = [
    {
      id: 1,
      title: "Unidirectional Magnetoresistance and Anomalous Hall Effects in Magnetic Thin Films",
      type: "conference",
      category: "conference",
      subcategory: "international",
      event: "APS March Meeting 2025",
      venue: "Los Angeles Convention Center",
      location: "Los Angeles, USA",
      date: "March 3-7, 2025",
      year: 2025,
      presentationType: "Oral Presentation",
      status: "upcoming",
      abstract: "Presenting experimental results on unidirectional magnetoresistance and anomalous Hall effects in magnetic thin film systems. Discussing the interplay between spin-orbit coupling and magnetic anisotropy.",
      slidesLink: "#",
      videoLink: "#",
      certificateLink: "#",
      featured: true,
      attendees: "800+",
      keywords: ["Unidirectional Magnetoresistance", "Anomalous Hall Effect", "Spintronics", "Thin Films"]
    },
    {
      id: 2,
      title: "Unidirectional Magnetoresistance and Anomalous Hall Effects in Magnetic Heterostructures",
      type: "conference",
      category: "conference",
      subcategory: "international",
      event: "APS March Meeting 2024",
      venue: "Minneapolis Convention Center",
      location: "Minneapolis, USA",
      date: "March 4-8, 2024",
      year: 2024,
      presentationType: "Oral Presentation",
      status: "presented",
      abstract: "Oral presentation on unidirectional magnetoresistance and anomalous Hall effects in magnetic heterostructures. Explored the role of interfacial spin-orbit coupling and its impact on transport properties.",
      slidesLink: "#",
      videoLink: "#",
      certificateLink: "#",
      featured: true,
      attendees: "700+",
      keywords: ["Unidirectional Magnetoresistance", "Anomalous Hall Effect", "Heterostructures", "Spin-Orbit Coupling"]
    },
    {
      id: 3,
      title: "Unidirectional Magnetoresistance and Anomalous Hall Effects in Magnetic Multilayers",
      type: "conference",
      category: "conference",
      subcategory: "international",
      event: "MMM & Intermag Conference 2024",
      venue: "San Diego Convention Center",
      location: "San Diego, USA",
      date: "June 4-8, 2024",
      year: 2024,
      presentationType: "Oral Presentation",
      status: "presented",
      abstract: "Presented findings on unidirectional magnetoresistance and anomalous Hall effects in magnetic multilayer systems. Investigated the thickness dependence and interfacial effects on magnetotransport properties.",
      slidesLink: "#",
      videoLink: "#",
      certificateLink: "#",
      featured: true,
      attendees: "600+",
      keywords: ["Unidirectional Magnetoresistance", "Anomalous Hall Effect", "Multilayers", "Interfacial Effects"]
    },
    {
      id: 4,
      title: "Advances in Spintronics: Magnetoresistance and Hall Effects in Magnetic Thin Films",
      type: "invited",
      category: "invited",
      subcategory: "international",
      event: "Symposium on Magnetism and Spintronics 2021",
      venue: "Indian Institute of Science",
      location: "Bangalore, India",
      date: "December 15-17, 2021",
      year: 2021,
      presentationType: "Invited Talk",
      status: "presented",
      abstract: "Invited talk covering recent advances in spintronics with focus on magnetoresistance and Hall effects in magnetic thin films. Discussed potential applications in next-generation memory and logic devices.",
      slidesLink: "#",
      videoLink: "#",
      certificateLink: "#",
      featured: true,
      attendees: "200+",
      keywords: ["Spintronics", "Magnetoresistance", "Hall Effects", "Memory Devices"]
    },
    {
      id: 5,
      title: "Magnetic Properties and Transport Phenomena in CrFe Alloy Thin Films",
      type: "conference",
      category: "conference",
      subcategory: "international",
      event: "International Conference on Magnetism and Magnetic Materials",
      venue: "Hilton San Francisco",
      location: "San Francisco, USA",
      date: "November 11-15, 2019",
      year: 2019,
      presentationType: "Poster Presentation",
      status: "presented",
      abstract: "Poster presentation on magnetic properties and transport phenomena in CrFe alloy thin films. Won Best Poster Award for this work.",
      slidesLink: "#",
      videoLink: "#",
      certificateLink: "#",
      featured: true,
      attendees: "500+",
      keywords: ["CrFe Alloy", "Thin Films", "Transport Properties", "Magnetic Properties"]
    },
    {
      id: 6,
      title: "Structural and Magnetic Characterization of Transition Metal Thin Films",
      type: "conference",
      category: "conference",
      subcategory: "national",
      event: "DAE Solid State Physics Symposium",
      venue: "BARC Convention Centre",
      location: "Mumbai, India",
      date: "December 18-22, 2018",
      year: 2018,
      presentationType: "Oral Presentation",
      status: "presented",
      abstract: "Presented structural and magnetic characterization studies of transition metal thin films. Discussed XRD, XPS, and SQUID measurements and their correlation with magnetic properties.",
      slidesLink: "#",
      videoLink: "#",
      certificateLink: "#",
      featured: false,
      attendees: "400+",
      keywords: ["Thin Films", "Characterization", "XRD", "XPS", "SQUID"]
    },
    {
      id: 7,
      title: "Frontiers in Magnetic Thin Film Research: From Fundamentals to Applications",
      type: "invited",
      category: "invited",
      subcategory: "international",
      event: "Frontiers in Physics Conference",
      venue: "Tata Institute of Fundamental Research",
      location: "Mumbai, India",
      date: "January 10-12, 2020",
      year: 2020,
      presentationType: "Invited Speaker",
      status: "presented",
      abstract: "Invited talk covering frontiers in magnetic thin film research, from fundamental physics to device applications. Highlighted recent breakthroughs and future directions.",
      slidesLink: "#",
      videoLink: "#",
      certificateLink: "#",
      featured: false,
      attendees: "300+",
      keywords: ["Magnetic Thin Films", "Applications", "Frontiers", "Spintronics"]
    }
  ];

  // Calculate category counts
  talkCategories.forEach(cat => {
    if (cat.id === 'all') {
      cat.count = talksData.length;
    } else {
      cat.count = talksData.filter(talk => talk.category === cat.id).length;
    }
  });

  const filteredTalks = talksData.filter(talk => {
    const matchesFilter = activeFilter === 'all' || talk.category === activeFilter;
    const matchesSearch = searchTerm === '' || 
      talk.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      talk.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
      talk.location.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const sortedTalks = [...filteredTalks].sort((a, b) => b.year - a.year);

  const featuredTalks = talksData.filter(talk => talk.featured);
  const upcomingTalks = talksData.filter(talk => talk.status === 'upcoming');
  const presentedTalks = talksData.filter(talk => talk.status === 'presented');

  const handleTalkClick = (talk) => {
    setSelectedTalk(selectedTalk?.id === talk.id ? null : talk);
  };

  const getStatusColor = (status) => {
    return status === 'presented' ? '#27ae60' : '#f39c12';
  };

  const getTypeColor = (type) => {
    const colors = {
      conference: '#bd5d38',
      invited: '#8b4513',
      seminar: '#a54f2e',
      workshop: '#c9754e',
      colloquium: '#d88c6a'
    };
    return colors[type] || '#bd5d38';
  };

  return (
    <div className="content-section active talks-dashboard">
      <div className="talks-header">
        <h1 className="talks-title">INVITED TALKS & PRESENTATIONS</h1>
        <p className="talks-subtitle">Sharing Research Insights Globally</p>
        
        <div className="search-controls-talks">
          <div className="search-box-talks">
            <input
              type="text"
              placeholder="Search talks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input-talks"
            />
            <span className="search-icon-talks">🔍</span>
          </div>
          
          <div className="view-toggle-talks">
            <button 
              className={`view-btn-talks ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <span className="btn-icon">📋</span>
              {!isSmallMobile && 'List View'}
              {isSmallMobile && 'List'}
            </button>
            <button 
              className={`view-btn-talks ${viewMode === 'timeline' ? 'active' : ''}`}
              onClick={() => setViewMode('timeline')}
            >
              <span className="btn-icon">📅</span>
              {!isSmallMobile && 'Timeline View'}
              {isSmallMobile && 'Timeline'}
            </button>
          </div>
        </div>
      </div>

      <div className="talks-container">
        {/* Sidebar */}
        <div className="talks-sidebar">
          <div className="stats-panel-talks">
            <h3>
              <span className="stats-icon-talks">📊</span>
              Presentation Stats
            </h3>
            
            <div className="stats-grid-talks">
              <div className="stat-talks total">
                <div className="stat-value-talks">{talksData.length}</div>
                <div className="stat-label-talks">Total Talks</div>
              </div>
              
              <div className="stat-talks presented">
                <div className="stat-value-talks">{presentedTalks.length}</div>
                <div className="stat-label-talks">Presented</div>
              </div>
              
              <div className="stat-talks upcoming">
                <div className="stat-value-talks">{upcomingTalks.length}</div>
                <div className="stat-label-talks">Upcoming</div>
              </div>
              
              <div className="stat-talks countries">
                <div className="stat-value-talks">4+</div>
                <div className="stat-label-talks">Countries</div>
              </div>
            </div>

            <div className="talk-types">
              <h4>Talk Types</h4>
              <div className="type-breakdown">
                {talkCategories.slice(1).map(cat => {
                  const count = talksData.filter(t => t.category === cat.id).length;
                  const percentage = (count / talksData.length) * 100;
                  
                  return (
                    <div key={cat.id} className="type-item">
                      <div className="type-header">
                        <span className="type-icon">{cat.icon}</span>
                        <span className="type-name">
                          {isSmallMobile ? cat.name.substring(0, 8) + '...' : cat.name}
                        </span>
                        <span className="type-count">{count}</span>
                      </div>
                      <div className="type-progress">
                        <div 
                          className="type-progress-fill"
                          style={{ 
                            width: `${percentage}%`,
                            backgroundColor: getTypeColor(cat.id)
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="category-filters-talks">
            <h3>
              <span className="filter-icon-talks">🏷️</span>
              Filter by Type
            </h3>
            
            <div className="filter-buttons-talks">
              {talkCategories.map(category => (
                <button
                  key={category.id}
                  className={`filter-btn-talks ${activeFilter === category.id ? 'active' : ''}`}
                  onClick={() => setActiveFilter(category.id)}
                  style={{ borderColor: getTypeColor(category.id) }}
                >
                  <span className="filter-icon-talks-btn">{category.icon}</span>
                  <span className="filter-name-talks">
                    {isSmallMobile ? category.name.substring(0, 10) + (category.name.length > 10 ? '...' : '') : category.name}
                  </span>
                  <span className="filter-count-talks">{category.count}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="upcoming-talks-sidebar">
            <h3>
              <span className="upcoming-icon">📅</span>
              Upcoming Talks
            </h3>
            
            {upcomingTalks.length === 0 ? (
              <div className="no-upcoming">
                <div className="calendar-icon">📆</div>
                <p>No upcoming talks scheduled</p>
              </div>
            ) : (
              <div className="upcoming-list">
                {upcomingTalks.map(talk => (
                  <div 
                    key={talk.id}
                    className="upcoming-card"
                    onClick={() => handleTalkClick(talk)}
                  >
                    <div className="upcoming-date">{talk.date.split(' ')[0]}</div>
                    <div className="upcoming-content">
                      <h4>
                        {isSmallMobile ? talk.title.substring(0, 20) + '...' : talk.title}
                      </h4>
                      <div className="upcoming-location">{talk.location}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="talks-main">
          {viewMode === 'list' ? (
            <>
              <div className="talks-header-main">
                <h2>
                  {activeFilter === 'all' ? 'All Talks & Presentations' : 
                   talkCategories.find(c => c.id === activeFilter)?.name}
                  <span className="talks-count"> ({filteredTalks.length})</span>
                </h2>
                
                <div className="sort-controls-talks">
                  <span className="sort-label">Sort by:</span>
                  <select className="sort-select-talks">
                    <option>Date (Newest First)</option>
                    <option>Date (Oldest First)</option>
                    <option>Event Name</option>
                  </select>
                </div>
              </div>

              {sortedTalks.length === 0 ? (
                <div className="no-talks">
                  <div className="no-talks-icon">🎤</div>
                  <h3>No talks found</h3>
                  <p>Try adjusting your filters or search terms</p>
                </div>
              ) : (
                <div className="talks-list">
                  {sortedTalks.map(talk => (
                    <div 
                      key={talk.id}
                      className={`talk-card ${talk.featured ? 'featured' : ''} ${selectedTalk?.id === talk.id ? 'expanded' : ''}`}
                      onClick={() => handleTalkClick(talk)}
                    >
                      {talk.featured && (
                        <div className="featured-badge-talk">
                          <span className="featured-icon">⭐</span>
                          Featured
                        </div>
                      )}
                      
                      <div className="talk-card-header">
                        <div className="talk-type-badge" style={{ backgroundColor: getTypeColor(talk.type) }}>
                          {isSmallMobile ? talk.presentationType.substring(0, 8) + '...' : talk.presentationType}
                        </div>
                        
                        <div className="talk-meta">
                          <span className="talk-date">
                            <span className="date-icon">📅</span>
                            {isSmallMobile ? talk.date.substring(0, 12) + '...' : talk.date}
                          </span>
                          <span className="talk-location">
                            <span className="location-icon">📍</span>
                            {isSmallMobile ? talk.location.substring(0, 10) + '...' : talk.location}
                          </span>
                          <span 
                            className="talk-status"
                            style={{ 
                              backgroundColor: getStatusColor(talk.status),
                              color: 'white'
                            }}
                          >
                            {talk.status === 'presented' ? '✓ Presented' : '🕐 Upcoming'}
                          </span>
                        </div>
                      </div>

                      <div className="talk-content">
                        <h3 className="talk-title">{talk.title}</h3>
                        
                        <div className="talk-event">
                          <strong>{talk.event}</strong>
                          {!isSmallMobile && talk.venue && <span> • {talk.venue}</span>}
                        </div>
                        
                        <div className="talk-attendance">
                          <span className="attendees-icon">👥</span>
                          {talk.attendees} attendees
                        </div>

                        <div className="talk-actions">
                          <a 
                            href={talk.slidesLink}
                            className="talk-action-btn slides"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="action-icon">📊</span>
                            {isSmallMobile ? 'Slides' : 'View Slides'}
                          </a>
                          <a 
                            href={talk.videoLink}
                            className="talk-action-btn video"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="action-icon">🎥</span>
                            {isSmallMobile ? 'Video' : 'Watch Video'}
                          </a>
                          <button 
                            className="talk-action-btn details"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTalkClick(talk);
                            }}
                          >
                            {selectedTalk?.id === talk.id ? 'Hide' : 'Details'}
                          </button>
                        </div>

                        {/* Expanded Details */}
                        {selectedTalk?.id === talk.id && (
                          <div className="talk-details">
                            <div className="details-section">
                              <h4>Abstract</h4>
                              <p className="talk-abstract">{talk.abstract}</p>
                            </div>
                            
                            <div className="details-section">
                              <h4>Keywords</h4>
                              <div className="talk-keywords">
                                {talk.keywords.map((keyword, idx) => (
                                  <span key={idx} className="talk-keyword">{keyword}</span>
                                ))}
                              </div>
                            </div>
                            
                            <div className="details-section">
                              <h4>Additional Information</h4>
                              <div className="additional-info">
                                <div className="info-item">
                                  <span className="info-label">Year:</span>
                                  <span className="info-value">{talk.year}</span>
                                </div>
                                <div className="info-item">
                                  <span className="info-label">Presentation Type:</span>
                                  <span className="info-value">{talk.presentationType}</span>
                                </div>
                                <div className="info-item">
                                  <span className="info-label">Estimated Audience:</span>
                                  <span className="info-value">{talk.attendees}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="details-actions">
                              <a 
                                href={talk.slidesLink}
                                className="details-action-btn slides"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <span className="action-icon">📊</span>
                                {isSmallMobile ? 'Slides' : 'Download Slides'}
                              </a>
                              <a 
                                href={talk.videoLink}
                                className="details-action-btn video"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <span className="action-icon">🎥</span>
                                {isSmallMobile ? 'Recording' : 'Watch Recording'}
                              </a>
                              <a 
                                href={talk.certificateLink}
                                className="details-action-btn certificate"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <span className="action-icon">📜</span>
                                {isSmallMobile ? 'Certificate' : 'View Certificate'}
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Featured Talks Section */}
              <div className="featured-talks-section">
                <h3>
                  <span className="featured-icon-talks">🌟</span>
                  Featured Presentations
                </h3>
                
                <div className="featured-talks-grid">
                  {featuredTalks.map(talk => (
                    <div 
                      key={talk.id}
                      className="featured-talk-card"
                      onClick={() => handleTalkClick(talk)}
                    >
                      <div 
                        className="featured-card-header"
                        style={{ backgroundColor: getTypeColor(talk.type) }}
                      >
                        <div className="featured-type">{talk.presentationType}</div>
                        <div className="featured-year">{talk.year}</div>
                      </div>
                      
                      <div className="featured-card-content">
                        <h4>{talk.title}</h4>
                        <div className="featured-event">{talk.event}</div>
                        <div className="featured-location">{talk.location}</div>
                        
                        <div className="featured-stats">
                          <span className="stat">
                            <span className="stat-icon">👥</span>
                            {talk.attendees}
                          </span>
                          <span className="stat">
                            <span className="stat-icon">📅</span>
                            {talk.date.split(' ')[0]}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Best Poster Award Section */}
              <div className="featured-talks-section" style={{ borderColor: '#27ae60', borderLeft: '4px solid #27ae60' }}>
                <h3>
                  <span className="featured-icon-talks">🏅</span>
                  Best Poster Award
                </h3>
                
                <div className="featured-talks-grid">
                  {talksData.filter(talk => talk.abstract.includes('Best Poster Award')).map(talk => (
                    <div 
                      key={talk.id}
                      className="featured-talk-card"
                      onClick={() => handleTalkClick(talk)}
                      style={{ borderColor: '#27ae60' }}
                    >
                      <div 
                        className="featured-card-header"
                        style={{ backgroundColor: '#27ae60' }}
                      >
                        <div className="featured-type">🏅 Best Poster Award</div>
                        <div className="featured-year">{talk.year}</div>
                      </div>
                      
                      <div className="featured-card-content">
                        <h4>{talk.title}</h4>
                        <div className="featured-event">{talk.event}</div>
                        <div className="featured-location">{talk.location}</div>
                        
                        <div className="featured-stats">
                          <span className="stat">
                            <span className="stat-icon">👥</span>
                            {talk.attendees}
                          </span>
                          <span className="stat">
                            <span className="stat-icon">📅</span>
                            {talk.date.split(' ')[0]}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Timeline View */
            <div className="timeline-view">
              <h2>Presentation Timeline</h2>
              
              <div className="timeline-container">
                <div className="timeline-track-main">
                  {sortedTalks.map((talk, index) => (
                    <div 
                      key={talk.id}
                      className="timeline-item"
                      style={{ left: `${(index / (sortedTalks.length - 1)) * 100}%` }}
                      onClick={() => handleTalkClick(talk)}
                    >
                      <div 
                        className="timeline-marker-main"
                        style={{ backgroundColor: getTypeColor(talk.type) }}
                      >
                        <div className="marker-icon">
                          {talk.type === 'conference' ? '🌍' : 
                           talk.type === 'invited' ? '🏆' :
                           talk.type === 'seminar' ? '🏛️' : '🔧'}
                        </div>
                      </div>
                      
                      <div className="timeline-content">
                        <div className="timeline-year">{talk.year}</div>
                        <div className="timeline-title">
                          {isSmallMobile ? talk.title.substring(0, 15) + '...' : talk.title.substring(0, 30) + '...'}
                        </div>
                        <div className="timeline-location">{talk.location}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="timeline-key">
                <div className="key-item">
                  <div className="key-color conference"></div>
                  <span>Conference</span>
                </div>
                <div className="key-item">
                  <div className="key-color invited"></div>
                  <span>Invited</span>
                </div>
                <div className="key-item">
                  <div className="key-color" style={{ backgroundColor: '#27ae60' }}></div>
                  <span>Best Poster Award</span>
                </div>
              </div>
            </div>
          )}

          {/* Statistics Summary */}
          <div className="statistics-summary">
            <div className="stat-card-summary">
              <h3>
                <span className="summary-icon">🌍</span>
                Global Reach
              </h3>
              <p>
                Presentations delivered in 4 countries across 3 continents, 
                reaching audiences of 3000+ researchers worldwide.
              </p>
              <div className="reach-stats">
                <div className="reach-stat">
                  <div className="reach-value">4</div>
                  <div className="reach-label">Countries</div>
                </div>
                <div className="reach-stat">
                  <div className="reach-value">3</div>
                  <div className="reach-label">Continents</div>
                </div>
                <div className="reach-stat">
                  <div className="reach-value">3000+</div>
                  <div className="reach-label">Total Audience</div>
                </div>
              </div>
            </div>

            <div className="stat-card-summary">
              <h3>
                <span className="summary-icon">🏆</span>
                Recognition
              </h3>
              <p>
                Featured speaker at international conferences, 
                awarded Best Poster Presentation, and invited for 
                keynote addresses at prestigious events.
              </p>
              <div className="recognition-list">
                <div className="recognition-item">
                  <span className="recognition-icon">⭐</span>
                  <span>Invited Talk: Symposium on Magnetism and Spintronics (2021)</span>
                </div>
                <div className="recognition-item">
                  <span className="recognition-icon">🏅</span>
                  <span>Best Poster Award - International Conference on Magnetism and Magnetic Materials</span>
                </div>
                <div className="recognition-item">
                  <span className="recognition-icon">🎤</span>
                  <span>Oral Presentations at APS March Meeting 2024 & 2025</span>
                </div>
                <div className="recognition-item">
                  <span className="recognition-icon">🏆</span>
                  <span>Oral Presentation at MMM & Intermag Conference 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Talk Detail Modal */}
      {selectedTalk && isMobile && (
        <div className="talk-modal" onClick={() => setSelectedTalk(null)}>
          <div className="modal-content-talk" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-talk" onClick={() => setSelectedTalk(null)}>✕</button>
            
            <div className="modal-header-talk">
              <div className="modal-badges-talk">
                <div 
                  className="modal-type-talk"
                  style={{ backgroundColor: getTypeColor(selectedTalk.type) }}
                >
                  {selectedTalk.presentationType}
                </div>
                <div 
                  className="modal-status-talk"
                  style={{ backgroundColor: getStatusColor(selectedTalk.status) }}
                >
                  {selectedTalk.status === 'presented' ? 'Presented' : 'Upcoming'}
                </div>
              </div>
              
              <h3>{selectedTalk.title}</h3>
              <div className="modal-event">{selectedTalk.event}</div>
              <div className="modal-venue">{selectedTalk.venue}, {selectedTalk.location}</div>
              <div className="modal-date">{selectedTalk.date} • {selectedTalk.attendees} attendees</div>
            </div>

            <div className="modal-body-talk">
              <div className="modal-section">
                <h4>Abstract</h4>
                <p>{selectedTalk.abstract}</p>
              </div>
              
              <div className="modal-section">
                <h4>Keywords</h4>
                <div className="modal-keywords-talk">
                  {selectedTalk.keywords.map((keyword, idx) => (
                    <span key={idx} className="modal-keyword-talk">{keyword}</span>
                  ))}
                </div>
              </div>
              
              <div className="modal-actions-talk">
                <a href={selectedTalk.slidesLink} className="modal-action-btn slides">
                  <span className="action-icon">📊</span>
                  View Slides
                </a>
                <a href={selectedTalk.videoLink} className="modal-action-btn video">
                  <span className="action-icon">🎥</span>
                  Watch Recording
                </a>
                <a href={selectedTalk.certificateLink} className="modal-action-btn certificate">
                  <span className="action-icon">📜</span>
                  Certificate
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Talks;