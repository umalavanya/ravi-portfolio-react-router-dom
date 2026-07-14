import { useState, useEffect } from 'react';
import '../styles/Awards.css';

const Awards = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedAward, setSelectedAward] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('year');

  const awardsData = [
    {
      id: 1,
      name: 'INSPIRE Faculty Fellowship',
      organization: 'Department of Science & Technology, Govt. of India',
      year: 2023,
      type: 'fellowship',
      category: 'research',
      description: 'A prestigious award for early-career researchers to establish independent research programs in frontier areas of science and engineering.',
      details: [
        'Selected among top 1% of applicants nationwide',
        '5-year research grant of ₹35 lakhs',
        'Establishment of independent research laboratory',
        'Mentoring of 2 PhD students'
      ],
      icon: '🏆',
      featured: true
    },
    {
      id: 2,
      name: 'IISc Kotari Postdoctoral Fellowship',
      organization: 'Indian Institute of Science, Bangalore',
      year: 2020,
      endYear: 2022,
      type: 'fellowship',
      category: 'postdoc',
      description: 'Competitive fellowship awarded to outstanding young researchers for pursuing cutting-edge research at IISc.',
      details: [
        'Annual stipend of ₹10 lakhs',
        'Research grant of ₹5 lakhs',
        'Access to world-class facilities',
        'International collaboration opportunities'
      ],
      icon: '🎓',
      featured: true
    },
    {
      id: 3,
      name: 'Best PhD Thesis Award',
      organization: 'University of Hyderabad',
      year: 2018,
      type: 'award',
      category: 'thesis',
      description: 'Awarded for the most outstanding doctoral thesis in the School of Physics.',
      details: [
        'Selected from 45 PhD theses',
        'Cash prize of ₹50,000',
        'Recommendation for national-level competition',
        'Invitation to deliver special lecture'
      ],
      icon: '📜',
      featured: false
    },
    {
      id: 4,
      name: 'Young Scientist Award',
      organization: 'Materials Research Society of India',
      year: 2019,
      type: 'award',
      category: 'early-career',
      description: 'Recognizing significant contributions by young scientists in the field of materials research.',
      details: [
        'Awarded at MRSI Annual Conference',
        'Cash prize of ₹25,000',
        'Invited talk at international conference',
        'Featured in MRSI newsletter'
      ],
      icon: '⭐',
      featured: true
    },
    {
      id: 5,
      name: 'DAAD Short-Term Research Grant',
      organization: 'German Academic Exchange Service',
      year: 2017,
      type: 'grant',
      category: 'international',
      description: 'Research grant for collaborative work at Max Planck Institute for Solid State Research, Stuttgart.',
      details: [
        '3-month research visit to Germany',
        'Living and travel expenses covered',
        'Collaboration with leading research group',
        'Joint publication in high-impact journal'
      ],
      icon: '🌍',
      featured: false
    },
    {
      id: 6,
      name: 'Best Poster Award',
      organization: 'International Conference on Magnetism',
      year: 2016,
      type: 'award',
      category: 'conference',
      description: 'Award for the best poster presentation at ICM 2016 conference.',
      details: [
        'Selected from 200+ poster presentations',
        'Cash prize of €500',
        'Certificate of excellence',
        'Featured in conference proceedings'
      ],
      icon: '📢',
      featured: false
    },
    {
      id: 7,
      name: 'CSIR-UGC NET JRF Fellowship',
      organization: 'Council of Scientific & Industrial Research',
      year: 2009,
      endYear: 2014,
      type: 'fellowship',
      category: 'phd',
      description: 'Junior Research Fellowship for pursuing PhD in sciences with stipend and research contingency.',
      details: [
        '5-year fellowship with monthly stipend',
        'Research contingency grant',
        'National-level selection (top 2%)',
        'Opportunity for national lab placements'
      ],
      icon: '🔬',
      featured: false
    },
    {
      id: 8,
      name: 'University Gold Medal',
      organization: 'Osmania University',
      year: 2009,
      type: 'award',
      category: 'academic',
      description: 'Awarded for securing first rank in M.Sc. Physics program.',
      details: [
        'Top rank among 120 students',
        'Gold medal and certificate',
        'Mention in university convocation',
        'Featured in university magazine'
      ],
      icon: '🥇',
      featured: false
    },
    {
      id: 9,
      name: 'Travel Grant Award',
      organization: 'American Physical Society',
      year: 2015,
      type: 'grant',
      category: 'international',
      description: 'Travel support for presenting research at APS March Meeting, USA.',
      details: [
        'Full travel and accommodation coverage',
        'Opportunity to present at premier physics conference',
        'Networking with international experts',
        'Visit to leading US research facilities'
      ],
      icon: '✈️',
      featured: false
    },
    {
      id: 10,
      name: 'Research Excellence Award',
      organization: 'IISER Bhubaneswar',
      year: 2017,
      type: 'award',
      category: 'research',
      description: 'Award for outstanding research contributions during postdoctoral work.',
      details: [
        'Recognition for high-impact publications',
        'Cash prize of ₹1 lakh',
        'Research grant extension',
        'Featured in institute annual report'
      ],
      icon: '🏅',
      featured: true
    }
  ];

  const categories = [
    { id: 'all', name: 'All Awards', count: awardsData.length, icon: '🏆' },
    { id: 'fellowship', name: 'Fellowships', count: awardsData.filter(a => a.type === 'fellowship').length, icon: '🎓' },
    { id: 'award', name: 'Awards', count: awardsData.filter(a => a.type === 'award').length, icon: '⭐' },
    { id: 'grant', name: 'Grants', count: awardsData.filter(a => a.type === 'grant').length, icon: '💰' },
    { id: 'featured', name: 'Featured', count: awardsData.filter(a => a.featured).length, icon: '🔥' }
  ];

  const yearRange = {
    min: Math.min(...awardsData.map(a => a.year)),
    max: Math.max(...awardsData.map(a => a.year))
  };

  const filteredAwards = awardsData.filter(award => {
    const matchesFilter = activeFilter === 'all' || 
      (activeFilter === 'featured' ? award.featured : award.type === activeFilter);
    
    const matchesSearch = searchTerm === '' || 
      award.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      award.organization.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const sortedAwards = [...filteredAwards].sort((a, b) => {
    if (sortBy === 'year') return b.year - a.year;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'featured') return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    return 0;
  });

  const handleAwardClick = (award) => {
    setSelectedAward(selectedAward?.id === award.id ? null : award);
  };

  const getYearDisplay = (award) => {
    return award.endYear ? `${award.year} - ${award.endYear}` : award.year.toString();
  };

  // Calculate stats
  const stats = {
    total: awardsData.length,
    fellowships: awardsData.filter(a => a.type === 'fellowship').length,
    awards: awardsData.filter(a => a.type === 'award').length,
    grants: awardsData.filter(a => a.type === 'grant').length,
    featured: awardsData.filter(a => a.featured).length,
    years: awardsData.reduce((sum, a) => sum + (a.endYear ? a.endYear - a.year + 1 : 1), 0)
  };

  // Auto-rotate featured awards
  useEffect(() => {
    const featuredAwards = awardsData.filter(a => a.featured);
    if (featuredAwards.length === 0) return;

    const interval = setInterval(() => {
      const currentIndex = featuredAwards.findIndex(a => a.id === selectedAward?.id);
      const nextIndex = (currentIndex + 1) % featuredAwards.length;
      if (currentIndex === -1 || window.innerWidth > 768) {
        setSelectedAward(featuredAwards[nextIndex]);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [selectedAward, awardsData]);

  return (
    <div className="content-section active awards-dashboard">
      <div className="awards-header">
        <h1 className="awards-title">Awards & Honors</h1>
        <p className="awards-subtitle">Recognition for Excellence in Research and Academics</p>
        
        <div className="search-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search awards..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          
          <div className="sort-controls">
            <label htmlFor="sort-select">Sort by:</label>
            <select 
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="year">Year (Newest First)</option>
              <option value="name">Name (A-Z)</option>
              <option value="featured">Featured First</option>
            </select>
          </div>
        </div>
      </div>

      <div className="awards-container">
        {/* Left Panel - Filters and Stats */}
        <div className="awards-sidebar">
          <div className="category-filters">
            <h3>
              <span className="filter-icon">🏷️</span>
              Filter by Category
            </h3>
            
            <div className="filter-buttons">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`filter-btn ${activeFilter === category.id ? 'active' : ''}`}
                  onClick={() => setActiveFilter(category.id)}
                >
                  <span className="filter-icon-btn">{category.icon}</span>
                  <span className="filter-name">{category.name}</span>
                  <span className="filter-count">{category.count}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="stats-panel-awards">
            <h3>
              <span className="stats-icon">📊</span>
              Awards Statistics
            </h3>
            
            <div className="stats-grid-awards">
              <div className="stat-card-awards">
                <div className="stat-value-awards">{stats.total}</div>
                <div className="stat-label-awards">Total Awards</div>
              </div>
              
              <div className="stat-card-awards">
                <div className="stat-value-awards">{stats.fellowships}</div>
                <div className="stat-label-awards">Fellowships</div>
              </div>
              
              <div className="stat-card-awards">
                <div className="stat-value-awards">{stats.awards}</div>
                <div className="stat-label-awards">Awards</div>
              </div>
              
              <div className="stat-card-awards">
                <div className="stat-value-awards">{stats.grants}</div>
                <div className="stat-label-awards">Grants</div>
              </div>
            </div>

            <div className="timeline-stats">
              <h4>Awards Timeline</h4>
              <div className="timeline-range">
                <span className="range-year">{yearRange.min}</span>
                <div className="range-line"></div>
                <span className="range-year">{yearRange.max}</span>
              </div>
              <div className="years-spanned">
                <span className="years-value">{yearRange.max - yearRange.min + 1} years</span>
                <span className="years-label">of continuous recognition</span>
              </div>
            </div>
          </div>

          <div className="legend-section">
            <h4>Award Types</h4>
            <div className="legend-items">
              <div className="legend-item-awards">
                <div className="legend-icon">🏆</div>
                <span className="legend-text">Major Award</span>
              </div>
              <div className="legend-item-awards">
                <div className="legend-icon">🎓</div>
                <span className="legend-text">Fellowship</span>
              </div>
              <div className="legend-item-awards">
                <div className="legend-icon">💰</div>
                <span className="legend-text">Grant</span>
              </div>
              <div className="legend-item-awards">
                <div className="legend-icon">🔥</div>
                <span className="legend-text">Featured</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Awards Grid */}
        <div className="awards-main">
          <div className="awards-grid-header">
            <h2>
              {activeFilter === 'all' ? 'All Awards & Honors' : 
               categories.find(c => c.id === activeFilter)?.name}
              <span className="awards-count"> ({filteredAwards.length})</span>
            </h2>
            
            <div className="view-toggle">
              <span className="view-label">View:</span>
              <button className="view-btn active">Grid</button>
              <button className="view-btn">Timeline</button>
            </div>
          </div>

          {sortedAwards.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No awards found</h3>
              <p>Try adjusting your filters or search terms</p>
            </div>
          ) : (
            <>
              <div className="awards-grid">
                {sortedAwards.map(award => (
                  <div 
                    key={award.id}
                    className={`award-card ${award.featured ? 'featured' : ''} ${selectedAward?.id === award.id ? 'expanded' : ''}`}
                    onClick={() => handleAwardClick(award)}
                  >
                    {award.featured && (
                      <div className="featured-badge">
                        <span className="featured-icon">🔥</span>
                        Featured
                      </div>
                    )}
                    
                    <div className="award-card-header">
                      <div className="award-icon" style={{ 
                        backgroundColor: award.featured ? '#8b4513' : 
                                       award.type === 'fellowship' ? '#a54f2e' :
                                       award.type === 'grant' ? '#c9754e' : '#bd5d38'
                      }}>
                        {award.icon}
                      </div>
                      
                      <div className="award-title-section">
                        <h3 className="award-name">{award.name}</h3>
                        <div className="award-organization">{award.organization}</div>
                      </div>
                    </div>

                    <div className="award-meta">
                      <div className="year-badge">
                        <span className="year-icon">📅</span>
                        {getYearDisplay(award)}
                      </div>
                      
                      <div className="type-badge">
                        <span className="type-icon">
                          {award.type === 'fellowship' ? '🎓' : 
                           award.type === 'grant' ? '💰' : '🏆'}
                        </span>
                        {award.type.charAt(0).toUpperCase() + award.type.slice(1)}
                      </div>
                    </div>

                    <p className="award-description">{award.description}</p>

                    {/* Expanded Details */}
                    {selectedAward?.id === award.id && (
                      <div className="award-details">
                        <h4>Award Details</h4>
                        <ul className="details-list-awards">
                          {award.details.map((detail, idx) => (
                            <li key={idx} className="detail-item-awards">
                              <span className="detail-bullet">•</span>
                              {detail}
                            </li>
                          ))}
                        </ul>
                        
                        <div className="award-actions">
                          <button className="action-btn-awards view-cert">
                            <span className="action-icon">📄</span>
                            View Certificate
                          </button>
                          <button className="action-btn-awards share">
                            <span className="action-icon">↗️</span>
                            Share
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="award-footer">
                      <button className="expand-btn-awards">
                        {selectedAward?.id === award.id ? 'Show Less' : 'Show Details'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Featured Awards Carousel */}
              <div className="featured-awards-section">
                <h3>
                  <span className="featured-icon-section">🌟</span>
                  Featured Awards
                </h3>
                
                <div className="featured-carousel">
                  {awardsData.filter(a => a.featured).slice(0, 3).map(award => (
                    <div 
                      key={award.id}
                      className={`featured-card ${selectedAward?.id === award.id ? 'active' : ''}`}
                      onClick={() => handleAwardClick(award)}
                    >
                      <div className="featured-card-icon">{award.icon}</div>
                      <div className="featured-card-content">
                        <h4>{award.name}</h4>
                        <div className="featured-card-year">{award.year}</div>
                        <div className="featured-card-org">{award.organization}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary Stats */}
              <div className="awards-summary">
                <div className="summary-card-awards">
                  <h3>
                    <span className="summary-icon">📈</span>
                    Achievement Timeline
                  </h3>
                  <p>
                    Continuous recognition spanning {yearRange.max - yearRange.min + 1} years, 
                    with {stats.featured} major awards and {stats.years} years of fellowship support.
                  </p>
                  <div className="achievement-milestones">
                    <div className="milestone">
                      <div className="milestone-year">{yearRange.min}</div>
                      <div className="milestone-text">First Award</div>
                    </div>
                    <div className="milestone">
                      <div className="milestone-year">{Math.floor((yearRange.max + yearRange.min) / 2)}</div>
                      <div className="milestone-text">Peak Recognition</div>
                    </div>
                    <div className="milestone">
                      <div className="milestone-year">{yearRange.max}</div>
                      <div className="milestone-text">Latest Award</div>
                    </div>
                  </div>
                </div>

                <div className="summary-card-awards">
                  <h3>
                    <span className="summary-icon">🏆</span>
                    Impact Summary
                  </h3>
                  <p>
                    These recognitions have facilitated research grants totaling over ₹50 lakhs, 
                    enabled international collaborations, and established credibility in the 
                    scientific community.
                  </p>
                  <div className="impact-stats">
                    <div className="impact-stat">
                      <div className="impact-value">₹50L+</div>
                      <div className="impact-label">Research Funding</div>
                    </div>
                    <div className="impact-stat">
                      <div className="impact-value">10+</div>
                      <div className="impact-label">Countries</div>
                    </div>
                    <div className="impact-stat">
                      <div className="impact-value">5+</div>
                      <div className="impact-label">PhD Students</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Award Detail Modal for Mobile */}
      {selectedAward && window.innerWidth < 768 && (
        <div className="award-modal">
          <div className="modal-content-awards">
            <button className="modal-close-awards" onClick={() => setSelectedAward(null)}>✕</button>
            
            <div className="modal-header-awards">
              <div className="modal-icon-awards" style={{ 
                backgroundColor: selectedAward.featured ? '#8b4513' : 
                               selectedAward.type === 'fellowship' ? '#a54f2e' :
                               selectedAward.type === 'grant' ? '#c9754e' : '#bd5d38'
              }}>
                {selectedAward.icon}
              </div>
              
              <div className="modal-title-section">
                <h3>{selectedAward.name}</h3>
                <div className="modal-org">{selectedAward.organization}</div>
                <div className="modal-year">{getYearDisplay(selectedAward)}</div>
              </div>
            </div>

            <div className="modal-body-awards">
              <p className="modal-description">{selectedAward.description}</p>
              
              <h4>Award Details</h4>
              <ul className="modal-details-list">
                {selectedAward.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Awards;