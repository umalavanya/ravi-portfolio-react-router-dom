import { useState, useEffect } from 'react';
import { publicationsData } from '../database/publicationsdb';
import '../styles/Publications.css';

const Publications = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPub, setSelectedPub] = useState(null);
  const [sortBy, setSortBy] = useState('year');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSmallMobile, setIsSmallMobile] = useState(window.innerWidth <= 576);
  const [viewMode, setViewMode] = useState('list');
  const [stats, setStats] = useState({
    total: 0,
    firstAuthor: 0,
    coAuthor: 0,
    conference: 0,
    underReview: 0,
    ongoing: 0,
    citations: 0,
    years: []
  });



  const allPublications = publicationsData;

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsSmallMobile(window.innerWidth <= 576);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const categories = [
    { id: 'all', name: 'All Publications', count: allPublications.length, icon: '📚' },
    { id: 'first-author', name: 'First Author', count: allPublications.filter(p => p.isFirstAuthor && p.type === 'journal').length, icon: '⭐' },
    { id: 'co-author', name: 'Co-Author', count: allPublications.filter(p => !p.isFirstAuthor && p.type === 'journal').length, icon: '🤝' },
    { id: 'conference', name: 'Conference Proceedings', count: allPublications.filter(p => p.type === 'conference').length, icon: '🎤' },
    { id: 'under-review', name: 'Under Review', count: allPublications.filter(p => p.type === 'under-review').length, icon: '📝' },
    { id: 'ongoing', name: 'Ongoing Works', count: allPublications.filter(p => p.type === 'ongoing').length, icon: '🔬' }
  ];

  const filteredPublications = allPublications.filter(pub => {
    const matchesFilter = filter === 'all' || pub.category === filter;
    
    const matchesSearch = searchTerm === '' || 
      pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
      pub.journal?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const sortedPublications = [...filteredPublications].sort((a, b) => {
    if (sortBy === 'year') return b.year - a.year;
    if (sortBy === 'citations') return (b.citations || 0) - (a.citations || 0);
    if (sortBy === 'impact') return (b.impactFactor || 0) - (a.impactFactor || 0);
    return 0;
  });

  useEffect(() => {
    const totalCitations = publicationsData.reduce((sum, pub) => sum + (pub.citations || 0), 0);
    const years = [...new Set(allPublications.map(p => p.year))].sort((a, b) => b - a);
    
    setStats({
      total: allPublications.length,
      firstAuthor: allPublications.filter(p => p.isFirstAuthor && p.type === 'journal').length,
      coAuthor: allPublications.filter(p => !p.isFirstAuthor && p.type === 'journal').length,
      conference: allPublications.filter(p => p.type === 'conference').length,
      underReview: allPublications.filter(p => p.type === 'under-review').length,
      ongoing: allPublications.filter(p => p.type === 'ongoing').length,
      citations: totalCitations,
      years: years
    });
  }, []);

  const handlePubClick = (pub) => {
    setSelectedPub(selectedPub?.id === pub.id ? null : pub);
  };

  const formatAuthors = (authors) => {
    const mainAuthor = authors[0];
    const otherAuthors = authors.slice(1);
    
    if (otherAuthors.length === 0) return mainAuthor;
    if (otherAuthors.length === 1) return `${mainAuthor} and ${otherAuthors[0]}`;
    
    return `${mainAuthor} et al.`;
  };

  const getYearSpan = () => {
    if (stats.years.length === 0) return '';
    const oldest = Math.min(...stats.years);
    const newest = Math.max(...stats.years);
    return newest === oldest ? newest : `${oldest} - ${newest}`;
  };

  const getStatusBadge = (pub) => {
    if (pub.type === 'under-review') {
      return <span className="status-badge review">Under Review</span>;
    }
    if (pub.type === 'ongoing') {
      return <span className="status-badge ongoing">Ongoing</span>;
    }
    if (pub.isEquallyContributed) {
      return <span className="status-badge equal">† Equally Contributed</span>;
    }
    if (pub.isFirstAuthor) {
      return <span className="status-badge first">First Author</span>;
    }
    return null;
  };

  return (
    <div className="content-section active publications-dashboard">
      <div className="publications-header">
        <h1 className="publications-title">Publications</h1>
        <p className="publications-subtitle">Research Output and Scholarly Contributions</p>
        
        <div className="search-sort-controls">
          <div className="search-box-pub">
            <input
              type="text"
              placeholder="Search publications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input-pub"
            />
            <span className="search-icon-pub">🔍</span>
          </div>
          
          <div className="sort-controls-pub">
            <label htmlFor="sort-select-pub">Sort by:</label>
            <select 
              id="sort-select-pub"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select-pub"
            >
              <option value="year">Year (Newest First)</option>
              <option value="citations">Citations (Highest First)</option>
              <option value="impact">Impact Factor</option>
            </select>
          </div>
        </div>
      </div>

      <div className="publications-container">
        {/* Sidebar */}
        <div className="publications-sidebar">
          <div className="stats-panel-pub">
            <h3>
              <span className="stats-icon-pub">📊</span>
              Publication Stats
            </h3>
            
            <div className="stats-grid-pub">
              <div className="stat-card-pub total">
                <div className="stat-value-pub">{stats.total}</div>
                <div className="stat-label-pub">Total Publications</div>
              </div>
              
              <div className="stat-card-pub first">
                <div className="stat-value-pub">{stats.firstAuthor}</div>
                <div className="stat-label-pub">First Author</div>
              </div>
              
              <div className="stat-card-pub coauthor">
                <div className="stat-value-pub">{stats.coAuthor}</div>
                <div className="stat-label-pub">Co-Author</div>
              </div>
              
              <div className="stat-card-pub citations">
                <div className="stat-value-pub">{stats.citations}+</div>
                <div className="stat-label-pub">Citations</div>
              </div>
              
              <div className="stat-card-pub years">
                <div className="stat-value-pub">{getYearSpan()}</div>
                <div className="stat-label-pub">Active Years</div>
              </div>
            </div>

            <div className="year-distribution">
              <h4>Publications by Year</h4>
               
              <div className="year-bars" styles={{padding:"1.5em"}}>
                {stats.years.map(year => {
                  const count = allPublications.filter(p => p.year === year).length;
                  const maxCount = Math.max(...stats.years.map(y => allPublications.filter(p => p.year === y).length));
                  const height = maxCount > 0 ? (count / maxCount) * 80 : 0;
                  
                  return (
                    <div key={year} className="year-bar">
                      <div 
                        className="bar-fill"
                        style={{ height: `${height}px` }}
                      ></div>
                      <div className="year-label">{year}</div>
                      <div className="year-count">{count}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="category-filters-pub">
            <h3>
              <span className="filter-icon-pub">🏷️</span>
              Filter by Category
            </h3>
            
            <div className="filter-buttons-pub">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`filter-btn-pub ${filter === category.id ? 'active' : ''}`}
                  onClick={() => setFilter(category.id)}
                >
                  <span className="filter-icon-btn">{category.icon}</span>
                  <span className="filter-name">{category.name}</span>
                  <span className="filter-count">{category.count}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="impact-metrics">
            <h3>
              <span className="impact-icon">⭐</span>
              Impact Metrics
            </h3>
            
            <div className="metric-item">
              <div className="metric-label">Average Impact Factor</div>
              <div className="metric-value">
                {(publicationsData.filter(p => p.impactFactor).reduce((sum, pub) => sum + (pub.impactFactor || 0), 0) / publicationsData.filter(p => p.impactFactor).length || 0).toFixed(1)}
              </div>
            </div>
            
            <div className="metric-item">
              <div className="metric-label">h-index (approx.)</div>
              <div className="metric-value">8</div>
            </div>
            
            <div className="metric-item">
              <div className="metric-label">Avg. Citations/Paper</div>
              <div className="metric-value">
                {Math.round(stats.citations / publicationsData.filter(p => p.type === 'journal').length || 0)}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="publications-main">
          <div className="publications-header-main">
            <h2>
              {filter === 'all' ? 'All Publications' : 
               categories.find(c => c.id === filter)?.name}
              <span className="publications-count"> ({filteredPublications.length})</span>
            </h2>
            
            <div className="view-toggle-pub">
              <button 
                className={`view-btn-pub ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                📋 List
              </button>
              <button 
                className={`view-btn-pub ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                style={{ display: isSmallMobile ? 'none' : 'inline-flex' }}
              >
                🏢 Grid
              </button>
            </div>
          </div>

          {sortedPublications.length === 0 ? (
            <div className="no-results-pub">
              <div className="no-results-icon">🔍</div>
              <h3>No publications found</h3>
              <p>Try adjusting your filters or search terms</p>
            </div>
          ) : viewMode === 'grid' && !isSmallMobile ? (
            <div className="publications-grid">
              {sortedPublications.map(pub => (
                <div 
                  key={pub.id}
                  className={`publication-grid-card ${pub.type}`}
                  onClick={() => handlePubClick(pub)}
                >
                  <div className="grid-card-badges">
                    <div className={`grid-type-badge ${pub.type}`}>
                      {pub.type === 'journal' ? '📄' : pub.type === 'conference' ? '🎤' : pub.type === 'under-review' ? '📝' : '🔬'}
                    </div>
                    <div className="grid-year-badge">{pub.year}</div>
                  </div>
                  
                  {getStatusBadge(pub)}
                  
                  <h3 className="grid-pub-title">{pub.title}</h3>
                  <div className="grid-pub-authors">{formatAuthors(pub.authors)}</div>
                  <div className="grid-pub-venue">
                    <em>{pub.journal}</em>
                  </div>
                  
                  {pub.citations && (
                    <div className="grid-pub-citations">📈 {pub.citations} citations</div>
                  )}
                  
                  <button className="grid-pub-details-btn">View Details</button>
                </div>
              ))}
            </div>
          ) : (
            <div className="publications-list">
              {sortedPublications.map(pub => (
                <div 
                  key={pub.id}
                  className={`publication-card ${pub.type} ${selectedPub?.id === pub.id ? 'expanded' : ''}`}
                  onClick={() => handlePubClick(pub)}
                >
                  <div className="pub-card-header">
                    <div className={`pub-type-badge ${pub.type}`}>
                      {pub.type === 'journal' ? '📄 Journal' : 
                       pub.type === 'conference' ? '🎤 Conference' :
                       pub.type === 'under-review' ? '📝 Under Review' : '🔬 Ongoing'}
                    </div>
                    
                    <div className="pub-year-badge">
                      <span className="year-icon">📅</span>
                      {pub.year}
                    </div>
                    
                    {pub.citations && (
                      <div className="citation-badge">
                        <span className="citation-icon">📈</span>
                        {pub.citations} citations
                      </div>
                    )}
                    
                    {pub.impactFactor && (
                      <div className="impact-badge">
                        IF: {pub.impactFactor}
                      </div>
                    )}

                    {getStatusBadge(pub)}
                  </div>

                  <div className="pub-content">
                    <h3 className="pub-title">
                      {pub.title}
                      {pub.isEquallyContributed && (
                        <span className="equal-contrib"> †</span>
                      )}
                    </h3>
                    
                    <div className="pub-authors">
                      {pub.authors.join(', ')}
                    </div>
                    
                    <div className="pub-venue">
                      <em>{pub.journal}</em>
                      {pub.volume && `, ${pub.volume}`}
                      {pub.pages && `, ${pub.pages}`}
                      {pub.referenceNumber && ` (Reference: ${pub.referenceNumber})`}
                    </div>

                    {pub.arxiv && (
                      <div className="pub-arxiv">
                        <a href={pub.arxiv} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                          arXiv: {pub.arxiv}
                        </a>
                      </div>
                    )}

                    <div className="pub-actions">
                      {pub.link && pub.link !== '#' && (
                        <a 
                          href={pub.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="pub-link"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span className="link-icon">🔗</span>
                          View Publication
                        </a>
                      )}
                      
                      <button 
                        className="pub-details-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePubClick(pub);
                        }}
                      >
                        {selectedPub?.id === pub.id ? 'Hide Details' : 'Show Details'}
                      </button>
                    </div>

                    {/* Expanded Details */}
                    {selectedPub?.id === pub.id && (
                      <div className="pub-details">
                        <div className="details-section">
                          <h4>Abstract</h4>
                          <p className="pub-abstract">{pub.abstract}</p>
                        </div>
                        
                        <div className="details-section">
                          <h4>Keywords</h4>
                          <div className="keywords-list">
                            {pub.keywords?.map((keyword, idx) => (
                              <span key={idx} className="keyword-tag">{keyword}</span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="details-section">
                          <h4>Full Citation</h4>
                          <div className="citation-full">
                            {pub.authors.join(', ')}. "{pub.title}". 
                            <em> {pub.journal}</em>
                            {pub.volume && `, ${pub.volume}`}
                            {pub.pages && `, ${pub.pages}`}
                            {pub.year && ` (${pub.year})`}.
                            {pub.doi && ` DOI: ${pub.doi}`}
                            {pub.referenceNumber && ` (Reference: ${pub.referenceNumber})`}
                          </div>
                        </div>
                        
                        {pub.link && pub.link !== '#' && (
                          <div className="details-actions">
                            <button className="action-btn-pub bibtex" onClick={(e) => e.stopPropagation()}>
                              <span className="action-icon">📋</span>
                              Copy BibTeX
                            </button>
                            <button className="action-btn-pub cite" onClick={(e) => e.stopPropagation()}>
                              <span className="action-icon">📝</span>
                              How to Cite
                            </button>
                            <a 
                              href={pub.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="action-btn-pub fulltext"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span className="action-icon">📄</span>
                              Full Text
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Summary Section */}
          <div className="publications-summary">
            <div className="summary-card-pub">
              <h3>
                <span className="summary-icon">🏆</span>
                Research Impact
              </h3>
              <p>
                {stats.total} publications spanning {getYearSpan()} with {stats.citations}+ citations 
                demonstrate significant contributions to condensed matter physics and materials science.
                This includes {stats.firstAuthor} first-author and {stats.coAuthor} co-authored publications.
              </p>
              <div className="impact-highlights">
                <div className="highlight">
                  <div className="highlight-icon">🧲</div>
                  <div className="highlight-content">
                    <strong>Spintronics & Magnetism</strong>
                    <span>Primary research focus on magnetic thin films and 2D materials</span>
                  </div>
                </div>
                <div className="highlight">
                  <div className="highlight-icon">📈</div>
                  <div className="highlight-content">
                    <strong>Growing Impact</strong>
                    <span>High-impact publications in Nature Materials, Nature Communications, and Physical Review Letters</span>
                  </div>
                </div>
                <div className="highlight">
                  <div className="highlight-icon">🌍</div>
                  <div className="highlight-content">
                    <strong>International Collaboration</strong>
                    <span>Collaborative research with leading institutions worldwide</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="summary-card-pub">
              <h3>
                <span className="summary-icon">🤝</span>
                Research Status
              </h3>
              <div className="research-status-grid">
                <div className="status-item">
                  <span className="status-count">{stats.firstAuthor + stats.coAuthor}</span>
                  <span className="status-label">Published</span>
                </div>
                <div className="status-item">
                  <span className="status-count">{stats.underReview}</span>
                  <span className="status-label">Under Review</span>
                </div>
                <div className="status-item">
                  <span className="status-count">{stats.ongoing}</span>
                  <span className="status-label">Ongoing Works</span>
                </div>
              </div>
              <p className="status-note">
                Active research program with multiple manuscripts in preparation and under review at high-impact journals.
              </p>
            </div>
          </div>

          {/* Top Journals */}
          <div className="top-journals">
            <h3>
              <span className="journals-icon">📖</span>
              Featured Journals & Venues
            </h3>
            <div className="journal-list">
              <div className="journal-item highlight">
                <div className="journal-name">Nature Materials</div>
                <div className="journal-count">1 publication (2026)</div>
                <div className="journal-impact">IF: 43.1</div>
              </div>
              <div className="journal-item highlight">
                <div className="journal-name">Nature Communications</div>
                <div className="journal-count">2 under review</div>
                <div className="journal-impact">IF: 16.6</div>
              </div>
              <div className="journal-item highlight">
                <div className="journal-name">Physical Review Letters</div>
                <div className="journal-count">1 under review</div>
                <div className="journal-impact">IF: 8.6</div>
              </div>
              <div className="journal-item">
                <div className="journal-name">Journal of Magnetism and Magnetic Materials</div>
                <div className="journal-count">4 publications</div>
              </div>
              <div className="journal-item">
                <div className="journal-name">Journal of Alloys and Compounds</div>
                <div className="journal-count">2 publications</div>
              </div>
              <div className="journal-item">
                <div className="journal-name">Journal of Physics D: Applied Physics</div>
                <div className="journal-count">1 publication</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Publication Detail Modal */}
      {selectedPub && isMobile && (
        <div className="pub-modal" onClick={() => setSelectedPub(null)}>
          <div className="modal-content-pub" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-pub" onClick={() => setSelectedPub(null)}>✕</button>
            
            <div className="modal-header-pub">
              <div className="modal-badges">
                <div className={`modal-type-badge ${selectedPub.type}`}>
                  {selectedPub.type === 'journal' ? 'Journal Article' : 
                   selectedPub.type === 'conference' ? 'Conference Paper' :
                   selectedPub.type === 'under-review' ? 'Under Review' : 'Ongoing Work'}
                </div>
                <div className="modal-year">{selectedPub.year}</div>
              </div>
              
              <h3>{selectedPub.title}</h3>
              <div className="modal-authors">{selectedPub.authors.join(', ')}</div>
              <div className="modal-venue">
                <em>{selectedPub.journal}</em>
                {selectedPub.volume && `, ${selectedPub.volume}`}
                {selectedPub.pages && `, ${selectedPub.pages}`}
              </div>
            </div>

            <div className="modal-body-pub">
              <div className="modal-section">
                <h4>Abstract</h4>
                <p>{selectedPub.abstract}</p>
              </div>
              
              <div className="modal-section">
                <h4>Keywords</h4>
                <div className="modal-keywords">
                  {selectedPub.keywords?.map((keyword, idx) => (
                    <span key={idx} className="modal-keyword">{keyword}</span>
                  ))}
                </div>
              </div>
              
              {selectedPub.link && selectedPub.link !== '#' && (
                <a 
                  href={selectedPub.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="modal-link"
                >
                  <span className="link-icon">🔗</span>
                  View Full Publication
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Publications;