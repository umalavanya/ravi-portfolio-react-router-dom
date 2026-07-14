import { useState, useEffect } from 'react';
import '../styles/Skills.css';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSmallMobile, setIsSmallMobile] = useState(window.innerWidth <= 576);

  const skillCategories = {
    'thin-film': {
      name: 'Thin-Film Deposition',
      icon: '🧪',
      color: '#bd5d38'
    },
    'nano': {
      name: 'Nanofabrication',
      icon: '🔬',
      color: '#8b4513'
    },
    'characterization': {
      name: 'Characterization',
      icon: '📊',
      color: '#a54f2e'
    },
    'materials': {
      name: 'Materials',
      icon: '🧲',
      color: '#c9754e'
    },
    'software': {
      name: 'Software',
      icon: '💻',
      color: '#d88c6a'
    }
  };

  const skillsData = [
    {
      id: 1,
      name: 'UHV Sputtering (DC/RF)',
      category: 'thin-film',
      proficiency: 95,
      experience: '8+ years',
      description: 'Ultra-high vacuum sputtering systems for high-quality thin films',
      details: ['DC magnetron sputtering', 'RF sputtering', 'Multi-layer deposition', 'In-situ monitoring']
    },
    {
      id: 2,
      name: 'E-beam Evaporation (Lesker/Ultek)',
      category: 'thin-film',
      proficiency: 90,
      experience: '6+ years',
      description: 'Electron beam evaporation for precise thin film deposition',
      details: ['Lesker systems', 'Ultek systems', 'Rate control', 'Thickness monitoring']
    },
    {
      id: 3,
      name: 'MBE (Basic)',
      category: 'thin-film',
      proficiency: 70,
      experience: '3+ years',
      description: 'Molecular Beam Epitaxy for ultra-thin film growth',
      details: ['Basic operation', 'Sample preparation', 'Rate calibration']
    },
    {
      id: 4,
      name: 'E-beam/Laser Lithography',
      category: 'nano',
      proficiency: 88,
      experience: '5+ years',
      description: 'Advanced lithography techniques for nanoscale patterning',
      details: ['E-beam lithography', 'Laser writing', 'Resist processing', 'Pattern optimization']
    },
    {
      id: 5,
      name: 'RIE/Plasma Etching',
      category: 'nano',
      proficiency: 85,
      experience: '5+ years',
      description: 'Reactive Ion Etching and plasma processing for nanostructures',
      details: ['RIE systems', 'Plasma etching', 'Selectivity control', 'Etch rate optimization']
    },
    {
      id: 6,
      name: '2D Material Exfoliation/Transfer',
      category: 'nano',
      proficiency: 92,
      experience: '7+ years',
      description: 'Mechanical exfoliation and transfer of 2D materials',
      details: ['Scotch tape method', 'PDMS transfer', 'Dry/wet transfer', 'Alignment techniques']
    },
    {
      id: 7,
      name: 'AFM',
      category: 'characterization',
      proficiency: 90,
      experience: '8+ years',
      description: 'Atomic Force Microscopy for surface topography',
      details: ['Contact mode', 'Tapping mode', 'Phase imaging', 'Surface roughness analysis']
    },
    {
      id: 8,
      name: 'XRD',
      category: 'characterization',
      proficiency: 88,
      experience: '7+ years',
      description: 'X-ray Diffraction for structural analysis',
      details: ['Powder XRD', 'Thin film XRD', 'Texture analysis', 'Rietveld refinement']
    },
    {
      id: 9,
      name: 'XPS',
      category: 'characterization',
      proficiency: 85,
      experience: '6+ years',
      description: 'X-ray Photoelectron Spectroscopy for chemical analysis',
      details: ['Survey scans', 'High resolution scans', 'Depth profiling', 'Peak fitting']
    },
    {
      id: 10,
      name: 'SQUID',
      category: 'characterization',
      proficiency: 92,
      experience: '8+ years',
      description: 'Superconducting Quantum Interference Device magnetometry',
      details: ['DC measurements', 'AC susceptibility', 'Temperature sweeps', 'Field sweeps']
    },
    {
      id: 11,
      name: 'PPMS',
      category: 'characterization',
      proficiency: 95,
      experience: '9+ years',
      description: 'Physical Property Measurement System',
      details: ['Electrical transport', 'Thermal transport', 'Magnetization', 'Specific heat']
    },
    {
      id: 12,
      name: 'MOKE',
      category: 'characterization',
      proficiency: 87,
      experience: '6+ years',
      description: 'Magneto-Optical Kerr Effect microscopy',
      details: ['Longitudinal MOKE', 'Polar MOKE', 'Domain imaging', 'Hysteresis loops']
    },
    {
      id: 13,
      name: 'Magnetotransport (AHE, UMR)',
      category: 'characterization',
      proficiency: 94,
      experience: '8+ years',
      description: 'Advanced magnetotransport measurements',
      details: ['Anomalous Hall Effect', 'Unidirectional Magnetoresistance', 'Spin-orbit torque', 'Non-local transport']
    },
    {
      id: 14,
      name: 'CoFeB',
      category: 'materials',
      proficiency: 96,
      experience: '9+ years',
      description: 'Cobalt Iron Boron alloys for spintronics',
      details: ['Thin film growth', 'Magnetic properties', 'Interface engineering', 'Device integration']
    },
    {
      id: 15,
      name: 'CrFe',
      category: 'materials',
      proficiency: 85,
      experience: '5+ years',
      description: 'Chromium Iron alloys for magnetic applications',
      details: ['Alloy composition', 'Structural properties', 'Magnetic ordering']
    },
    {
      id: 16,
      name: 'Ta, Pt',
      category: 'materials',
      proficiency: 90,
      experience: '7+ years',
      description: 'Tantalum and Platinum for spintronic devices',
      details: ['Buffer layers', 'Capping layers', 'Spin Hall effect', 'Interfacial effects']
    },
    {
      id: 17,
      name: '2D Materials (Graphene, TMDCs)',
      category: 'materials',
      proficiency: 88,
      experience: '6+ years',
      description: 'Two-dimensional materials for novel devices',
      details: ['Graphene synthesis', 'TMDCs preparation', 'Heterostructures', 'Optoelectronic properties']
    },
    {
      id: 18,
      name: 'OriginLab',
      category: 'software',
      proficiency: 98,
      experience: '10+ years',
      description: 'Data analysis and graphing software',
      details: ['Advanced plotting', 'Data fitting', 'Statistical analysis', 'Publication-quality figures']
    },
    {
      id: 19,
      name: 'MATLAB',
      category: 'software',
      proficiency: 90,
      experience: '8+ years',
      description: 'Numerical computing and algorithm development',
      details: ['Data analysis', 'Signal processing', 'Simulations', 'GUI development']
    },
    {
      id: 20,
      name: 'Python (Data Analysis)',
      category: 'software',
      proficiency: 85,
      experience: '5+ years',
      description: 'Python programming for scientific computing',
      details: ['NumPy/SciPy', 'Matplotlib', 'Pandas', 'Scikit-learn']
    },
    {
      id: 21,
      name: 'COMSOL (Basic)',
      category: 'software',
      proficiency: 65,
      experience: '2+ years',
      description: 'Multiphysics simulation software',
      details: ['Basic modeling', 'Finite element analysis', 'Electromagnetic simulations']
    }
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

  const filteredSkills = activeCategory === 'all' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === activeCategory);

  const categoryStats = Object.keys(skillCategories).map(cat => {
    const categorySkills = skillsData.filter(skill => skill.category === cat);
    const avgProficiency = categorySkills.reduce((sum, skill) => sum + skill.proficiency, 0) / categorySkills.length;
    
    return {
      category: cat,
      count: categorySkills.length,
      avgProficiency: Math.round(avgProficiency),
      color: skillCategories[cat].color
    };
  });

  const handleSkillClick = (skill) => {
    if (isMobile) {
      setSelectedSkill(selectedSkill?.id === skill.id ? null : skill);
    } else {
      setSelectedSkill(selectedSkill?.id === skill.id ? null : skill);
    }
  };

  return (
    <div className="content-section active skills-dashboard">
      <div className="skills-header">
        <h1 className="skills-title">Technical Skills</h1>
        <p className="skills-subtitle">Expertise in Advanced Materials Science and Nanotechnology</p>
      </div>

      <div className="skills-container">
        {/* Left Panel - Categories and Statistics */}
        <div className="skills-sidebar">
          <div className="category-selector">
            <h3>
              <span className="filter-icon">🗂️</span>
              Filter by Category
            </h3>
            <button 
              className={`category-btn ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
              style={{ borderColor: '#bd5d38' }}
            >
              <span className="category-icon-all">⭐</span>
              All Skills ({skillsData.length})
            </button>
            
            {Object.entries(skillCategories).map(([key, category]) => (
              <button
                key={key}
                className={`category-btn ${activeCategory === key ? 'active' : ''}`}
                onClick={() => setActiveCategory(key)}
                style={{ borderColor: category.color }}
              >
                <span className="category-icon">{category.icon}</span>
                {!isSmallMobile && category.name}
                {isSmallMobile && category.name.substring(0, 15) + (category.name.length > 15 ? '...' : '')}
                <span className="skill-count">
                  {skillsData.filter(s => s.category === key).length}
                </span>
              </button>
            ))}
          </div>

          <div className="stats-panel">
            <h3>
              <span className="stats-icon">📈</span>
              Skill Statistics
            </h3>
            
            <div className="overall-stats">
              <div className="stat-item">
                <div className="stat-value">{skillsData.length}</div>
                <div className="stat-label">Total Skills</div>
              </div>
              
              <div className="stat-item">
                <div className="stat-value">
                  {Math.round(skillsData.reduce((sum, skill) => sum + skill.proficiency, 0) / skillsData.length)}%
                </div>
                <div className="stat-label">Avg. Proficiency</div>
              </div>
              
              <div className="stat-item">
                <div className="stat-value">{Object.keys(skillCategories).length}</div>
                <div className="stat-label">Categories</div>
              </div>
            </div>

            <div className="category-breakdown">
              <h4>Category Breakdown</h4>
              {categoryStats.map(stat => (
                <div key={stat.category} className="category-stat">
                  <div className="category-stat-header">
                    <span className="category-name">
                      {isSmallMobile ? skillCategories[stat.category].icon + ' ' + skillCategories[stat.category].name.substring(0, 10) : skillCategories[stat.category].name}
                      {isSmallMobile && skillCategories[stat.category].name.length > 10 ? '...' : ''}
                    </span>
                    <span className="category-avg">{stat.avgProficiency}%</span>
                  </div>
                  <div className="category-progress">
                    <div 
                      className="category-progress-fill"
                      style={{ 
                        width: `${stat.avgProficiency}%`,
                        backgroundColor: stat.color
                      }}
                    ></div>
                  </div>
                  <div className="category-meta">
                    <span className="category-count">{stat.count} skills</span>
                    <span className="category-level">
                      {stat.avgProficiency >= 90 ? 'Expert' : 
                       stat.avgProficiency >= 80 ? 'Advanced' : 
                       stat.avgProficiency >= 70 ? 'Intermediate' : 'Basic'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="proficiency-legend">
            <h4>Proficiency Levels</h4>
            <div className="legend-items">
              <div className="legend-item">
                <div className="legend-color expert"></div>
                <span>Expert (90-100%)</span>
              </div>
              <div className="legend-item">
                <div className="legend-color advanced"></div>
                <span>Advanced (80-89%)</span>
              </div>
              <div className="legend-item">
                <div className="legend-color intermediate"></div>
                <span>Intermediate (70-79%)</span>
              </div>
              <div className="legend-item">
                <div className="legend-color basic"></div>
                <span>Basic (60-69%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Skills Grid */}
        <div className="skills-main">
          <div className="skills-grid-header">
            <h2>
              {activeCategory === 'all' ? 'All Technical Skills' : skillCategories[activeCategory].name}
              <span className="skills-count"> ({filteredSkills.length} skills)</span>
            </h2>
            
            <div className="view-controls">
              <span className="sort-label">Sort by:</span>
              <select className="sort-select" defaultValue="proficiency">
                <option value="proficiency">Proficiency</option>
                <option value="name">Name</option>
                <option value="experience">Experience</option>
              </select>
            </div>
          </div>

          <div className="skills-grid">
            {filteredSkills.map(skill => (
              <div 
                key={skill.id}
                className={`skill-card ${selectedSkill?.id === skill.id ? 'expanded' : ''}`}
                onClick={() => handleSkillClick(skill)}
              >
                <div className="skill-card-header">
                  <div className="skill-icon" style={{ backgroundColor: skillCategories[skill.category].color }}>
                    {skillCategories[skill.category].icon}
                  </div>
                  <div className="skill-title-section">
                    <h3 className="skill-name">{skill.name}</h3>
                    <div className="skill-category">
                      <span 
                        className="category-tag"
                        style={{ backgroundColor: skillCategories[skill.category].color }}
                      >
                        {isSmallMobile ? skillCategories[skill.category].name.substring(0, 8) + '...' : skillCategories[skill.category].name}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="skill-proficiency">
                  <div className="proficiency-header">
                    <span className="proficiency-label">Proficiency</span>
                    <span className="proficiency-value">{skill.proficiency}%</span>
                  </div>
                  <div className="proficiency-bar">
                    <div 
                      className="proficiency-fill"
                      style={{ 
                        width: `${skill.proficiency}%`,
                        backgroundColor: skillCategories[skill.category].color
                      }}
                    ></div>
                  </div>
                  <div className="proficiency-level">
                    {skill.proficiency >= 90 ? 'Expert' : 
                     skill.proficiency >= 80 ? 'Advanced' : 
                     skill.proficiency >= 70 ? 'Intermediate' : 'Basic'}
                  </div>
                </div>

                <div className="skill-meta">
                  <div className="experience-badge">
                    <span className="meta-icon">🕐</span>
                    {skill.experience}
                  </div>
                  <div className="proficiency-badge">
                    <span className="meta-icon">📊</span>
                    {skill.proficiency}%
                  </div>
                </div>

                {!isSmallMobile && (
                  <p className="skill-description">{skill.description}</p>
                )}

                {/* Expanded Details */}
                {selectedSkill?.id === skill.id && (
                  <div className="skill-details">
                    <h4>Detailed Capabilities:</h4>
                    <ul className="details-list">
                      {skill.details.map((detail, idx) => (
                        <li key={idx} className="detail-item">
                          <span className="detail-icon">✓</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="skill-actions">
                      <button className="action-btn view-projects">
                        <span className="action-icon">🔗</span>
                        {isSmallMobile ? 'Projects' : 'View Related Projects'}
                      </button>
                      <button className="action-btn view-cert">
                        <span className="action-icon">📄</span>
                        {isSmallMobile ? 'Cert.' : 'View Certifications'}
                      </button>
                    </div>
                  </div>
                )}

                <div className="skill-footer">
                  <button className="expand-btn">
                    {selectedSkill?.id === skill.id ? 'Show Less' : 'Show Details'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="skills-summary">
            <div className="summary-card">
              <h3>
                <span className="summary-icon">🎯</span>
                Core Expertise
              </h3>
              <p>
                Specialized in thin-film deposition techniques, advanced nanofabrication, and comprehensive materials 
                characterization with extensive experience in spintronic materials and devices.
              </p>
              <div className="expertise-tags">
                <span className="expertise-tag">Spintronics</span>
                <span className="expertise-tag">Nanotechnology</span>
                <span className="expertise-tag">Materials Science</span>
                <span className="expertise-tag">Device Fabrication</span>
                <span className="expertise-tag">Data Analysis</span>
              </div>
            </div>

            <div className="summary-card">
              <h3>
                <span className="summary-icon">📚</span>
                Recent Advancements
              </h3>
              <p>
                Continuously expanding skill set with focus on 2D material integration, machine learning applications 
                in materials science, and quantum transport measurements.
              </p>
              <div className="learning-list">
                <div className="learning-item">
                  <span className="learning-icon">➕</span>
                  {isSmallMobile ? 'Quantum Computing' : 'Quantum Computing Simulation'}
                </div>
                <div className="learning-item">
                  <span className="learning-icon">➕</span>
                  {isSmallMobile ? 'ML for Materials' : 'Machine Learning for Materials'}
                </div>
                <div className="learning-item">
                  <span className="learning-icon">➕</span>
                  {isSmallMobile ? 'COMSOL Modeling' : 'Advanced COMSOL Modeling'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skill Detail Modal (for mobile) */}
      {selectedSkill && isMobile && (
        <div className="skill-modal" onClick={() => setSelectedSkill(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedSkill(null)}>✕</button>
            <div className="modal-header">
              <div className="modal-icon" style={{ backgroundColor: skillCategories[selectedSkill.category].color }}>
                {skillCategories[selectedSkill.category].icon}
              </div>
              <h3>{selectedSkill.name}</h3>
            </div>
            <div className="modal-body">
              <p className="modal-description">{selectedSkill.description}</p>
              <h4>Detailed Capabilities:</h4>
              <ul className="modal-details">
                {selectedSkill.details.map((detail, idx) => (
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

export default Skills;