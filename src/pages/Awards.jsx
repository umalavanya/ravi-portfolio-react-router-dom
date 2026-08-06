import { useState, useEffect, useMemo } from 'react';
import '../styles/Awards.css';

const Awards = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedAward, setSelectedAward] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('year');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const awardsData = useMemo(() => [
    {
      id: 1,
      name: 'Dr. D. S. Kothari Postdoctoral Fellowship',
      organization: 'Indian Institute of Science, Bangalore',
      year: 2020,
      endYear: 2022,
      type: 'fellowship',
      category: 'postdoc',
      description: 'Prestigious postdoctoral fellowship awarded by the University Grants Commission (UGC) for outstanding researchers.',
      details: [
        'Competitive national-level selection',
        'Research support at IISc Bangalore',
        'Opportunity for independent research',
        'Access to world-class facilities'
      ],
      icon: '🎓',
      featured: true
    },
    {
      id: 2,
      name: 'Institute of Eminence Postdoctoral Fellowship',
      organization: 'Indian Institute of Science, Bangalore',
      year: 2022,
      type: 'fellowship',
      category: 'postdoc',
      description: 'Premier fellowship under the Institute of Eminence scheme at IISc for exceptional postdoctoral researchers.',
      details: [
        'Instituted under IoE scheme',
        'Advanced research opportunities',
        'Interdisciplinary collaboration',
        'State-of-the-art research infrastructure'
      ],
      icon: '🏆',
      featured: true
    }
  ], []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const categories = [
    { id: 'all', name: 'All Awards', count: awardsData.length, icon: '🏆' },
    { id: 'fellowship', name: 'Fellowships', count: awardsData.filter(a => a.type === 'fellowship').length, icon: '🎓' },
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
      if (currentIndex === -1 || windowWidth > 768) {
        setSelectedAward(featuredAwards[nextIndex]);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [selectedAward, awardsData, windowWidth]);

  return (
    <div className="content-section active awards-dashboard">
      <div className="awards-header">
        <h1 className="awards-title">Fellowships & Awards</h1>
        <p className="awards-subtitle">Postdoctoral Research Recognitions</p>
        
        <div className="search-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search fellowships..."
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
              Statistics
            </h3>
            
            <div className="stats-grid-awards">
              <div className="stat-card-awards">
                <div className="stat-value-awards">{stats.total}</div>
                <div className="stat-label-awards">Total</div>
              </div>
              
              <div className="stat-card-awards">
                <div className="stat-value-awards">{stats.fellowships}</div>
                <div className="stat-label-awards">Fellowships</div>
              </div>
              
              <div className="stat-card-awards">
                <div className="stat-value-awards">{stats.featured}</div>
                <div className="stat-label-awards">Featured</div>
              </div>
            </div>

            <div className="timeline-stats">
              <h4>Timeline</h4>
              <div className="timeline-range">
                <span className="range-year">{yearRange.min}</span>
                <div className="range-line"></div>
                <span className="range-year">{yearRange.max}</span>
              </div>
              <div className="years-spanned">
                <span className="years-value">{yearRange.max - yearRange.min + 1} years</span>
                <span className="years-label">of recognition</span>
              </div>
            </div>
          </div>

          <div className="legend-section">
            <h4>Types</h4>
            <div className="legend-items">
              <div className="legend-item-awards">
                <div className="legend-icon">🎓</div>
                <span className="legend-text">Fellowship</span>
              </div>
              <div className="legend-item-awards">
                <div className="legend-icon">🏆</div>
                <span className="legend-text">Featured</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Awards Grid */}
        <div className="awards-main">
          <div className="awards-grid-header">
            <h2>
              {activeFilter === 'all' ? 'All Fellowships' : 
               categories.find(c => c.id === activeFilter)?.name}
              <span className="awards-count"> ({filteredAwards.length})</span>
            </h2>
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
                        backgroundColor: award.featured ? '#8b4513' : '#a54f2e'
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
                        <span className="type-icon">🎓</span>
                        Fellowship
                      </div>
                    </div>

                    <p className="award-description">{award.description}</p>

                    {/* Expanded Details */}
                    {selectedAward?.id === award.id && (
                      <div className="award-details">
                        <h4>Details</h4>
                        <ul className="details-list-awards">
                          {award.details.map((detail, idx) => (
                            <li key={idx} className="detail-item-awards">
                              <span className="detail-bullet">•</span>
                              {detail}
                            </li>
                          ))}
                        </ul>
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

              {/* Featured Awards Section */}
              <div className="featured-awards-section">
                <h3>
                  <span className="featured-icon-section">🌟</span>
                  Featured Fellowships
                </h3>
                
                <div className="featured-carousel">
                  {awardsData.filter(a => a.featured).map(award => (
                    <div 
                      key={award.id}
                      className={`featured-card ${selectedAward?.id === award.id ? 'active' : ''}`}
                      onClick={() => handleAwardClick(award)}
                    >
                      <div className="featured-card-icon">{award.icon}</div>
                      <div className="featured-card-content">
                        <h4>{award.name}</h4>
                        <div className="featured-card-year">{getYearDisplay(award)}</div>
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
                    Postdoctoral fellowships at IISc spanning {yearRange.max - yearRange.min + 1} years,
                    showcasing research excellence and academic recognition.
                  </p>
                  <div className="achievement-milestones">
                    <div className="milestone">
                      <div className="milestone-year">{yearRange.min}</div>
                      <div className="milestone-text">Kothari Fellowship</div>
                    </div>
                    <div className="milestone">
                      <div className="milestone-year">{yearRange.max}</div>
                      <div className="milestone-text">IoE Fellowship</div>
                    </div>
                  </div>
                </div>

                <div className="summary-card-awards">
                  <h3>
                    <span className="summary-icon">🏆</span>
                    Impact Summary
                  </h3>
                  <p>
                    These prestigious fellowships represent significant recognition from India's premier
                    research institution, enabling advanced research and academic growth.
                  </p>
                  <div className="impact-stats">
                    <div className="impact-stat">
                      <div className="impact-value">2</div>
                      <div className="impact-label">Fellowships</div>
                    </div>
                    <div className="impact-stat">
                      <div className="impact-value">IISc</div>
                      <div className="impact-label">Institution</div>
                    </div>
                    <div className="impact-stat">
                      <div className="impact-value">2020-22</div>
                      <div className="impact-label">Duration</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Award Detail Modal for Mobile */}
      {selectedAward && windowWidth < 768 && (
        <div className="award-modal">
          <div className="modal-content-awards">
            <button className="modal-close-awards" onClick={() => setSelectedAward(null)}>✕</button>
            
            <div className="modal-header-awards">
              <div className="modal-icon-awards" style={{ 
                backgroundColor: selectedAward.featured ? '#8b4513' : '#a54f2e'
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
              
              <h4>Details</h4>
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