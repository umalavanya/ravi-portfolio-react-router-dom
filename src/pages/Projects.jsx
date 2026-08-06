import { useState, useEffect, useMemo } from 'react';
import '../styles/Projects.css';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('year');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const projectsData = useMemo(() => [
    {
      id: 1,
      name: 'Van der Waals Spintronic Devices for Magnetotransport Studies',
      organization: 'Carnegie Mellon University',
      year: 2023,
      endYear: 'Present',
      type: 'research',
      category: 'spintronics',
      description: 'Fabrication and characterization of van der Waals heterostructures for advanced spintronic applications and magnetotransport studies.',
      details: [
        'Fabricated heterostructures and devices using several 2D-quantum materials',
        'Designed nanoscale devices via e-beam lithography, reactive ion etching (RIE), and dry-transfer stacking',
        'Performed magnetotransport measurements using a home-built cryostat',
        'Observed unidirectional magnetoresistance and in-plane anomalous Hall effects',
        'Supported collaborative spectroscopic studies (ARPES, XMCD, TR-MOKE)'
      ],
      icon: '🔬',
      featured: true,
      technologies: ['2D Materials', 'E-beam Lithography', 'RIE', 'Cryostat', 'Magnetotransport']
    },
    {
      id: 2,
      name: 'Spin–Orbit Torque and Magnetization Switching in CoFeB/Pt Systems',
      organization: 'Indian Institute of Science, Bangalore',
      year: 2018,
      endYear: 2023,
      type: 'research',
      category: 'spintronics',
      description: 'Investigation of current-induced magnetization switching and spin-orbit torque effects in perpendicular magnetic anisotropy heterostructures.',
      details: [
        'Studied current-induced field-free magnetization switching in PMA heterostructures',
        'Investigated interfacial Dzyaloshinskii–Moriya interaction and anisotropy engineering',
        'Performed measurements using SQUID, VSM, MOKE, and PPMS',
        'Analyzed spin-orbit torque efficiency and switching mechanisms'
      ],
      icon: '⚡',
      featured: true,
      technologies: ['SQUID', 'VSM', 'MOKE', 'PPMS', 'Thin Film Deposition']
    },
    {
      id: 3,
      name: 'Magnetic Phase Transitions in Cr–Fe Thin Films',
      organization: 'Ph.D. in Physics',
      year: 2013,
      endYear: 2018,
      type: 'thesis',
      category: 'magnetism',
      description: 'Thesis: "Effect of spatial dimensionality on magnetic properties of Cr₁₀₀₋ₓFeₓ thin films above the critical concentration for ferromagnetism"',
      details: [
        'Investigated finite-size effects and dimensionality effects in magnetic systems',
        'Studied magnetic transitions using SQUID and PPMS measurements',
        'Explored critical concentration for ferromagnetism in Cr-Fe systems',
        'Analyzed spatial dimensionality effects on magnetic ordering'
      ],
      icon: '📊',
      featured: false,
      technologies: ['SQUID', 'PPMS', 'Thin Film Growth', 'Magnetic Characterization']
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
    { id: 'all', name: 'All Projects', count: projectsData.length, icon: '📋' },
    { id: 'research', name: 'Research', count: projectsData.filter(p => p.type === 'research').length, icon: '🔬' },
    { id: 'thesis', name: 'Thesis Work', count: projectsData.filter(p => p.type === 'thesis').length, icon: '📊' },
    { id: 'featured', name: 'Featured', count: projectsData.filter(p => p.featured).length, icon: '🔥' }
  ];

  const yearRange = {
    min: Math.min(...projectsData.map(p => typeof p.year === 'number' ? p.year : 0)),
    max: Math.max(...projectsData.map(p => typeof p.year === 'number' ? p.year : 0))
  };

  const filteredProjects = projectsData.filter(project => {
    const matchesFilter = activeFilter === 'all' || 
      (activeFilter === 'featured' ? project.featured : project.type === activeFilter);
    
    const matchesSearch = searchTerm === '' || 
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === 'year') {
      const aYear = typeof a.year === 'number' ? a.year : 0;
      const bYear = typeof b.year === 'number' ? b.year : 0;
      return bYear - aYear;
    }
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'featured') return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    return 0;
  });

  const handleProjectClick = (project) => {
    setSelectedProject(selectedProject?.id === project.id ? null : project);
  };

  const getYearDisplay = (project) => {
    return project.endYear ? `${project.year} – ${project.endYear}` : project.year.toString();
  };

  // Calculate stats
  const stats = {
    total: projectsData.length,
    research: projectsData.filter(p => p.type === 'research').length,
    thesis: projectsData.filter(p => p.type === 'thesis').length,
    featured: projectsData.filter(p => p.featured).length,
    years: projectsData.reduce((sum, p) => {
      const endYear = typeof p.endYear === 'number' ? p.endYear : 
                      typeof p.year === 'number' ? p.year : 0;
      const startYear = typeof p.year === 'number' ? p.year : 0;
      return sum + (endYear - startYear + 1);
    }, 0)
  };

  // Auto-rotate featured projects
  useEffect(() => {
    const featuredProjects = projectsData.filter(p => p.featured);
    if (featuredProjects.length === 0) return;

    const interval = setInterval(() => {
      const currentIndex = featuredProjects.findIndex(p => p.id === selectedProject?.id);
      const nextIndex = (currentIndex + 1) % featuredProjects.length;
      if (currentIndex === -1 || windowWidth > 768) {
        setSelectedProject(featuredProjects[nextIndex]);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [selectedProject, projectsData, windowWidth]);

  return (
    <div className="content-section active research-dashboard">
      <div className="research-header">
        <h1 className="research-title">Selected Research Projects</h1>
        <p className="research-subtitle">Exploring Magnetism, Spintronics, and Quantum Materials</p>
        
        <div className="search-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search projects by title, institution, or technology..."
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

      <div className="research-container">
        {/* Left Panel - Filters and Stats */}
        <div className="research-sidebar">
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

          <div className="stats-panel-research">
            <h3>
              <span className="stats-icon">📊</span>
              Project Statistics
            </h3>
            
            <div className="stats-grid-research">
              <div className="stat-card-research">
                <div className="stat-value-research">{stats.total}</div>
                <div className="stat-label-research">Total Projects</div>
              </div>
              
              <div className="stat-card-research">
                <div className="stat-value-research">{stats.research}</div>
                <div className="stat-label-research">Research</div>
              </div>
              
              <div className="stat-card-research">
                <div className="stat-value-research">{stats.thesis}</div>
                <div className="stat-label-research">Thesis Work</div>
              </div>
              
              <div className="stat-card-research">
                <div className="stat-value-research">{stats.featured}</div>
                <div className="stat-label-research">Featured</div>
              </div>
            </div>

            <div className="timeline-stats">
              <h4>Research Timeline</h4>
              <div className="timeline-range">
                <span className="range-year">{yearRange.min}</span>
                <div className="range-line"></div>
                <span className="range-year">{yearRange.max}</span>
              </div>
              <div className="years-spanned">
                <span className="years-value">{yearRange.max - yearRange.min + 1}+ years</span>
                <span className="years-label">of research experience</span>
              </div>
            </div>
          </div>

          <div className="legend-section">
            <h4>Technologies & Methods</h4>
            <div className="legend-items">
              <div className="legend-item-research">
                <div className="legend-icon">🔬</div>
                <span className="legend-text">2D Materials</span>
              </div>
              <div className="legend-item-research">
                <div className="legend-icon">⚡</div>
                <span className="legend-text">Spintronics</span>
              </div>
              <div className="legend-item-research">
                <div className="legend-icon">🧲</div>
                <span className="legend-text">Magnetism</span>
              </div>
              <div className="legend-item-research">
                <div className="legend-icon">📊</div>
                <span className="legend-text">Characterization</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Projects Grid */}
        <div className="research-main">
          <div className="research-grid-header">
            <h2>
              {activeFilter === 'all' ? 'All Research Projects' : 
               categories.find(c => c.id === activeFilter)?.name}
              <span className="research-count"> ({filteredProjects.length})</span>
            </h2>
          </div>

          {sortedProjects.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No projects found</h3>
              <p>Try adjusting your filters or search terms</p>
            </div>
          ) : (
            <>
              <div className="research-grid">
                {sortedProjects.map(project => (
                  <div 
                    key={project.id}
                    className={`project-card ${project.featured ? 'featured' : ''} ${selectedProject?.id === project.id ? 'expanded' : ''}`}
                    onClick={() => handleProjectClick(project)}
                  >
                    {project.featured && (
                      <div className="featured-badge">
                        <span className="featured-icon">🔥</span>
                        Featured
                      </div>
                    )}
                    
                    <div className="project-card-header">
                      <div className="project-icon" style={{ 
                        backgroundColor: project.featured ? '#8b4513' : 
                                       project.type === 'research' ? '#a54f2e' :
                                       '#bd5d38'
                      }}>
                        {project.icon}
                      </div>
                      
                      <div className="project-title-section">
                        <h3 className="project-name">{project.name}</h3>
                        <div className="project-organization">{project.organization}</div>
                      </div>
                    </div>

                    <div className="project-meta">
                      <div className="year-badge">
                        <span className="year-icon">📅</span>
                        {getYearDisplay(project)}
                      </div>
                      
                      <div className="type-badge">
                        <span className="type-icon">
                          {project.type === 'research' ? '🔬' : '📊'}
                        </span>
                        {project.type === 'research' ? 'Research' : 'Thesis'}
                      </div>
                    </div>

                    <p className="project-description">{project.description}</p>

                    {/* Technologies */}
                    <div className="project-technologies">
                      {project.technologies.slice(0, 3).map((tech, idx) => (
                        <span key={idx} className="tech-tag">{tech}</span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="tech-tag more">+{project.technologies.length - 3}</span>
                      )}
                    </div>

                    {/* Expanded Details */}
                    {selectedProject?.id === project.id && (
                      <div className="project-details">
                        <h4>Key Contributions</h4>
                        <ul className="details-list-research">
                          {project.details.map((detail, idx) => (
                            <li key={idx} className="detail-item-research">
                              <span className="detail-bullet">•</span>
                              {detail}
                            </li>
                          ))}
                        </ul>
                        
                        <div className="project-technologies-full">
                          <h4>Technologies & Methods</h4>
                          <div className="tech-tags-full">
                            {project.technologies.map((tech, idx) => (
                              <span key={idx} className="tech-tag-full">{tech}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="project-footer">
                      <button className="expand-btn-research">
                        {selectedProject?.id === project.id ? 'Show Less' : 'Show Details'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Featured Projects Section */}
              <div className="featured-projects-section">
                <h3>
                  <span className="featured-icon-section">🌟</span>
                  Featured Research
                </h3>
                
                <div className="featured-carousel">
                  {projectsData.filter(p => p.featured).map(project => (
                    <div 
                      key={project.id}
                      className={`featured-card ${selectedProject?.id === project.id ? 'active' : ''}`}
                      onClick={() => handleProjectClick(project)}
                    >
                      <div className="featured-card-icon">{project.icon}</div>
                      <div className="featured-card-content">
                        <h4>{project.name}</h4>
                        <div className="featured-card-year">{getYearDisplay(project)}</div>
                        <div className="featured-card-org">{project.organization}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary Stats */}
              <div className="research-summary">
                <div className="summary-card-research">
                  <h3>
                    <span className="summary-icon">📈</span>
                    Research Journey
                  </h3>
                  <p>
                    Over {yearRange.max - yearRange.min + 1} years of research spanning 
                    magnetism, spintronics, and quantum materials at premier institutions 
                    in India and the United States.
                  </p>
                  <div className="research-milestones">
                    <div className="milestone">
                      <div className="milestone-year">{yearRange.min}</div>
                      <div className="milestone-text">Ph.D. Start</div>
                    </div>
                    <div className="milestone">
                      <div className="milestone-year">2018</div>
                      <div className="milestone-text">IISc Research</div>
                    </div>
                    <div className="milestone">
                      <div className="milestone-year">{yearRange.max}</div>
                      <div className="milestone-text">CMU Research</div>
                    </div>
                  </div>
                </div>

                <div className="summary-card-research">
                  <h3>
                    <span className="summary-icon">🔬</span>
                    Research Impact
                  </h3>
                  <p>
                    Contributing to cutting-edge research in spintronics and magnetic materials,
                    with expertise in advanced fabrication techniques and characterization methods.
                  </p>
                  <div className="impact-stats">
                    <div className="impact-stat">
                      <div className="impact-value">3</div>
                      <div className="impact-label">Major Projects</div>
                    </div>
                    <div className="impact-stat">
                      <div className="impact-value">2</div>
                      <div className="impact-label">Institutions</div>
                    </div>
                    <div className="impact-stat">
                      <div className="impact-value">10+</div>
                      <div className="impact-label">Techniques</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Project Detail Modal for Mobile */}
      {selectedProject && windowWidth < 768 && (
        <div className="project-modal">
          <div className="modal-content-research">
            <button className="modal-close-research" onClick={() => setSelectedProject(null)}>✕</button>
            
            <div className="modal-header-research">
              <div className="modal-icon-research" style={{ 
                backgroundColor: selectedProject.featured ? '#8b4513' : 
                               selectedProject.type === 'research' ? '#a54f2e' :
                               '#bd5d38'
              }}>
                {selectedProject.icon}
              </div>
              
              <div className="modal-title-section">
                <h3>{selectedProject.name}</h3>
                <div className="modal-org">{selectedProject.organization}</div>
                <div className="modal-year">{getYearDisplay(selectedProject)}</div>
              </div>
            </div>

            <div className="modal-body-research">
              <p className="modal-description">{selectedProject.description}</p>
              
              <h4>Key Contributions</h4>
              <ul className="modal-details-list">
                {selectedProject.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>

              <h4>Technologies</h4>
              <div className="modal-tech-tags">
                {selectedProject.technologies.map((tech, idx) => (
                  <span key={idx} className="modal-tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;