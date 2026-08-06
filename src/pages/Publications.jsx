import { useState, useEffect } from 'react';
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

  // Updated publications data matching your list
  const publicationsData = [
    // First author publications
    {
      id: 1,
      title: "In-plane anomalous Hall effect in a low-dimensional system",
      authors: ["I-Hsuan Kao†", "B. Ravi Kumar†", "et al."],
      journal: "Nature Materials",
      year: 2026,
      type: "journal",
      category: "first-author",
      isFirstAuthor: true,
      isEquallyContributed: true,
      impactFactor: 43.1,
      citations: 0,
      link: "https://www.nature.com/articles/s41563-026-02611-9",
      doi: "https://doi.org/10.1038/s41563-026-02611-9",
      abstract: "First author publication in Nature Materials on in-plane anomalous Hall effect in low-dimensional systems.",
      keywords: ["Anomalous Hall Effect", "Low-dimensional systems", "Spintronics", "Quantum materials"]
    },
    {
      id: 2,
      title: "Tuning the interfacial Dzyaloshinskii–Moriya interaction in perpendicularly magnetized CoFeB system",
      authors: ["B. Ravi Kumar", "et al."],
      journal: "Journal of Physics D: Applied Physics",
      year: 2022,
      volume: "55",
      pages: "445004",
      type: "journal",
      category: "first-author",
      isFirstAuthor: true,
      impactFactor: 3.4,
      citations: 15,
      link: "https://iopscience.iop.org/article/10.1088/1361-6463/ac8e77/meta",
      doi: "10.1088/1361-6463/ac8e77",
      abstract: "Investigates manipulation of Dzyaloshinskii-Moriya interaction in CoFeB thin films for spintronic applications.",
      keywords: ["DMI", "CoFeB", "Thin films", "Spintronics", "Magnetic anisotropy"]
    },
    {
      id: 3,
      title: "Enhancing the properties of CdO thin films by co-doping with Mn and Fe for photodetector applications",
      authors: ["B. Ravi Kumar", "et al."],
      journal: "Sensors and Actuators",
      year: 2021,
      volume: "219",
      pages: "112544",
      type: "journal",
      category: "first-author",
      isFirstAuthor: true,
      impactFactor: 4.2,
      citations: 9,
      link: "https://www.sciencedirect.com/science/article/abs/pii/S0924424721000054",
      doi: "10.1016/j.sna.2021.112544",
      abstract: "Improves CdO thin film properties through co-doping for photodetector applications.",
      keywords: ["CdO", "Thin films", "Doping", "Photodetectors", "Optoelectronics"]
    },
    {
      id: 4,
      title: "Anomalous softening of magnon modes in the reentrant state in Cr70Fe30 thin films",
      authors: ["B. Ravi Kumar", "S. N. Kaul"],
      journal: "J. Magn. Magn. Mater.",
      year: 2019,
      volume: "469",
      pages: "681",
      type: "journal",
      category: "first-author",
      isFirstAuthor: true,
      impactFactor: 2.9,
      citations: 12,
      link: "https://www.sciencedirect.com/science/article/abs/pii/S0304885318314860",
      doi: "10.1016/j.jmmm.2018.08.091",
      abstract: "Studies magnon mode softening in reentrant magnetic states of CrFe thin films.",
      keywords: ["Magnons", "CrFe alloys", "Thin films", "Reentrant state", "Magnetic excitations"]
    },
    {
      id: 5,
      title: "Thickness as a control parameter for magnetocaloric effect in Cr75−xFe25+x (x = 0, 5) thin films",
      authors: ["B. Ravi Kumar", "S. N. Kaul"],
      journal: "J. Magn. Magn. Mater.",
      year: 2018,
      volume: "460",
      pages: "312",
      type: "journal",
      category: "first-author",
      isFirstAuthor: true,
      impactFactor: 2.9,
      citations: 18,
      link: "https://www.sciencedirect.com/science/article/abs/pii/S030488531830091X",
      doi: "10.1016/j.jmmm.2018.03.064",
      abstract: "Explores thickness-dependent magnetocaloric effects in CrFe alloy thin films.",
      keywords: ["Magnetocaloric", "Thin films", "CrFe alloys", "Cooling applications", "Thickness dependence"]
    },
    {
      id: 6,
      title: "Isotropic-Heisenberg to isotropic-dipolar crossover and finite-size scaling in Cr75−xFe25+x (x = 0, 5) thin films",
      authors: ["B. Ravi Kumar", "S. N. Kaul"],
      journal: "J. Mag. Magn. Mater.",
      year: 2018,
      volume: "448",
      pages: "3",
      type: "journal",
      category: "first-author",
      isFirstAuthor: true,
      impactFactor: 2.9,
      citations: 10,
      link: "https://www.sciencedirect.com/science/article/abs/pii/S0304885317301336",
      doi: "10.1016/j.jmmm.2017.09.074",
      abstract: "Investigates magnetic interaction crossovers and finite-size effects in thin films.",
      keywords: ["Heisenberg model", "Dipolar interactions", "Finite-size scaling", "Thin films", "Critical phenomena"]
    },
    {
      id: 7,
      title: "Nature of reentrant state in Cr75−xFe25+x (x = 0, 5) thin films",
      authors: ["B. Ravi Kumar", "S. N. Kaul"],
      journal: "J. Magn. Magn. Mater.",
      year: 2016,
      volume: "401",
      pages: "539",
      type: "journal",
      category: "first-author",
      isFirstAuthor: true,
      impactFactor: 2.9,
      citations: 14,
      link: "https://www.sciencedirect.com/science/article/abs/pii/S0304885316302396",
      doi: "10.1016/j.jmmm.2016.07.023",
      abstract: "Characterizes the reentrant magnetic state in CrFe thin film systems.",
      keywords: ["Reentrant magnetism", "Spin glass", "Thin films", "Magnetic phases", "Disorder"]
    },
    {
      id: 8,
      title: "Magnetic order-disorder phase transition in Cr70Fe30 thin films",
      authors: ["B. Ravi Kumar", "S. N. Kaul"],
      journal: "J. Alloys Compd.",
      year: 2015,
      volume: "652",
      pages: "479",
      type: "journal",
      category: "first-author",
      isFirstAuthor: true,
      impactFactor: 4.6,
      citations: 22,
      link: "https://www.sciencedirect.com/science/article/abs/pii/S0925838815308690",
      doi: "10.1016/j.jallcom.2015.08.256",
      abstract: "Studies magnetic phase transitions in CrFe alloy thin films.",
      keywords: ["Phase transitions", "Order-disorder", "Thin films", "CrFe alloys", "Magnetism"]
    },
    {
      id: 9,
      title: "Irreversibility lines in the T-H phase diagram of Cr70Fe30 thin films",
      authors: ["B. Ravi Kumar", "S. N. Kaul"],
      journal: "Physica B",
      year: 2014,
      volume: "448",
      pages: "140",
      type: "journal",
      category: "first-author",
      isFirstAuthor: true,
      impactFactor: 1.9,
      citations: 8,
      link: "https://www.sciencedirect.com/science/article/abs/pii/S0921452614002567",
      doi: "10.1016/j.physb.2014.03.064",
      abstract: "Maps irreversibility lines in temperature-field phase diagrams of thin films.",
      keywords: ["Phase diagrams", "Irreversibility", "Thin films", "Magnetic fields", "Temperature dependence"]
    },

    // Co-author publications
    {
      id: 10,
      title: "Electrocatalytic Degradation of Rhodamine B Using Li-Doped ZnO Nanoparticles: Novel Approach",
      authors: ["Vanga Ganesh", "B. Ravi Kumar", "et al."],
      journal: "Materials",
      year: 2023,
      volume: "16",
      pages: "1177",
      type: "journal",
      category: "co-author",
      isFirstAuthor: false,
      impactFactor: 3.4,
      citations: 3,
      link: "https://www.mdpi.com/1996-1944/16/3/1177",
      doi: "10.3390/ma16031177",
      abstract: "Study on electrocatalytic degradation using Li-doped ZnO nanoparticles.",
      keywords: ["ZnO nanoparticles", "Electrocatalysis", "Doping", "Water treatment", "Rhodamine B"]
    },
    {
      id: 11,
      title: "Structural, electrical, and optical properties of rare-earth Sm3+ doped SnO2 transparent conducting oxide thin films for optoelectronic device applications: Synthesized by the spin coating method",
      authors: ["Harish", "B. Ravi Kumar", "et al."],
      journal: "Optical Materials",
      year: 2022,
      volume: "133",
      pages: "112993",
      type: "journal",
      category: "co-author",
      isFirstAuthor: false,
      impactFactor: 3.7,
      citations: 6,
      link: "https://www.sciencedirect.com/science/article/abs/pii/S0925346722010308",
      doi: "10.1016/j.optmat.2022.112993",
      abstract: "Characterizes Sm-doped SnO2 thin films for transparent conducting applications.",
      keywords: ["SnO2", "Transparent conductors", "Thin films", "Optoelectronics", "Doping"]
    },
    {
      id: 12,
      title: "Lattice effects on the multiferroic characteristics of (La, Ho) co-substituted BiFeO3",
      authors: ["Pittala Suresh", "B. Ravi Kumar", "et al."],
      journal: "J. Alloys Compd.",
      year: 2021,
      volume: "863",
      pages: "158719",
      type: "journal",
      category: "co-author",
      isFirstAuthor: false,
      impactFactor: 4.6,
      citations: 11,
      link: "https://www.sciencedirect.com/science/article/abs/pii/S0925838821001262",
      doi: "10.1016/j.jallcom.2021.158719",
      abstract: "Investigates lattice effects on multiferroic properties of doped BiFeO3.",
      keywords: ["Multiferroics", "BiFeO3", "Lattice effects", "Doping", "Ferroelectricity"]
    },
    {
      id: 13,
      title: "Structural, Optical and Dielectric Properties of Nd Doped NiO Thin Films Deposited with a Spray Pyrolysis Method",
      authors: ["V. Ganesh", "B. Ravi Kumar", "Yugandhar Bitla", "I. S. Yahia", "S. AlFaify"],
      journal: "J. Inorg. Organomet. Polym. Mater.",
      year: 2021,
      volume: "31",
      pages: "2691",
      type: "journal",
      category: "co-author",
      isFirstAuthor: false,
      impactFactor: 2.1,
      citations: 7,
      link: "https://link.springer.com/article/10.1007/s10904-021-01889-3",
      doi: "10.1007/s10904-021-01889-3",
      abstract: "Studies properties of Nd-doped NiO thin films for electronic applications.",
      keywords: ["NiO", "Thin films", "Spray pyrolysis", "Dielectric properties", "Optical properties"]
    },

    // Conference proceedings
    {
      id: 14,
      title: "Thickness induced crossover from the ferromagnetic to cluster spin glass state in Cr70Fe30 thin films",
      authors: ["B. Ravi Kumar", "S. N. Kaul"],
      journal: "AIP Conf. Proc.",
      year: 2015,
      volume: "1665",
      pages: "030032",
      type: "conference",
      category: "conference",
      isFirstAuthor: true,
      link: "#",
      abstract: "Conference proceeding on thickness-induced magnetic crossover in CrFe thin films.",
      keywords: ["Conference proceedings", "Spin glass", "Thin films", "Magnetic crossover"]
    },
    {
      id: 15,
      title: "Critical behavior near ferromagnetic-paramagnetic phase transition in ion beam sputtered Cr70Fe30 thin films",
      authors: ["B. Ravi Kumar", "S. N. Kaul"],
      journal: "AIP Conf. Proc.",
      year: 2013,
      volume: "1536",
      pages: "953",
      type: "conference",
      category: "conference",
      isFirstAuthor: true,
      link: "#",
      abstract: "Conference proceeding on critical behavior in CrFe thin films.",
      keywords: ["Conference proceedings", "Phase transition", "Thin films", "Critical behavior"]
    },

    // Manuscripts under review
    {
      id: 16,
      title: "Enabling Electrical Readout of Néel vector reversal in a van der Waals Antiferromagnet",
      authors: ["Raghvendra", "B. Ravi Kumar", "et al."],
      journal: "Nature Communications (under review)",
      year: 2026,
      type: "under-review",
      category: "under-review",
      isFirstAuthor: false,
      link: "https://doi.org/10.48550/arXiv.2606.24527",
      arxiv: "https://doi.org/10.48550/arXiv.2606.24527",
      referenceNumber: "NCOMMS-26-049950-T",
      abstract: "Manuscript under review on electrical readout of Néel vector reversal in van der Waals antiferromagnets.",
      keywords: ["Van der Waals", "Antiferromagnet", "Néel vector", "Electrical readout", "2D materials"]
    },
    {
      id: 17,
      title: "Visualization of Tunable Electronic Structure of Monolayer TaIrTe4",
      authors: ["Sandy", "Aalok Tiwari", "B. Ravi Kumar", "Jyoti Katoch", "Simranjeet Singh", "et al."],
      journal: "Nature Communications (under review)",
      year: 2026,
      type: "under-review",
      category: "under-review",
      isFirstAuthor: false,
      referenceNumber: "NCOMMS-26-004797",
      abstract: "Manuscript under review on visualization of tunable electronic structure of monolayer TaIrTe4.",
      keywords: ["TaIrTe4", "Monolayer", "Electronic structure", "2D materials", "ARPES"]
    },
    {
      id: 18,
      title: "Ultrafast light-induced magnetoelectric effect in van der Waals magnetic semiconductor heterostructures",
      authors: ["Wenyi", "B. Ravi Kumar", "Roland Kawakami", "et al."],
      journal: "Physical Review Letters (under review)",
      year: 2026,
      type: "under-review",
      category: "under-review",
      isFirstAuthor: false,
      link: "https://doi.org/10.48550/arXiv.2604.19080",
      arxiv: "https://doi.org/10.48550/arXiv.2604.19080",
      abstract: "Manuscript under review on ultrafast light-induced magnetoelectric effect in van der Waals heterostructures.",
      keywords: ["Van der Waals", "Magnetoelectric", "Ultrafast", "Heterostructures", "2D materials"]
    },

    // Ongoing works
    {
      id: 19,
      title: "Tilted Spin Polarization Enabled Multidimensional Unidirectional Magnetoresistance",
      authors: ["B. Ravi Kumar†", "I-Hsuan Kao†", "et al."],
      journal: "Ready for Submission",
      year: 2026,
      type: "ongoing",
      category: "ongoing",
      isFirstAuthor: true,
      isEquallyContributed: true,
      abstract: "Ongoing work on tilted spin polarization and multidimensional unidirectional magnetoresistance.",
      keywords: ["Spin polarization", "Magnetoresistance", "Ongoing work", "Spintronics"]
    },
    {
      id: 20,
      title: "Spatially Resolved Magnetism and Twist-Induced Domain Reconfiguration in Atomically Thin CrSBr",
      authors: ["Aalok Tiwari", "B. Ravi Kumar", "et al."],
      journal: "Ready for Submission",
      year: 2026,
      type: "ongoing",
      category: "ongoing",
      isFirstAuthor: false,
      abstract: "Ongoing work on spatially resolved magnetism and twist-induced domain reconfiguration in CrSBr.",
      keywords: ["CrSBr", "2D magnetism", "Domain reconfiguration", "Ongoing work"]
    },
    {
      id: 21,
      title: "Gate tunability of ferroelectricity in WTe2/CGT bilayer device",
      authors: ["Zhenhong Cui", "B. Ravi Kumar"],
      journal: "Manuscript in Preparation",
      year: 2026,
      type: "ongoing",
      category: "ongoing",
      isFirstAuthor: false,
      abstract: "Ongoing work on gate tunability of ferroelectricity in WTe2/CGT bilayer device.",
      keywords: ["Ferroelectricity", "WTe2", "CGT", "Bilayer", "Ongoing work"]
    },
    {
      id: 22,
      title: "Angle resolved Photoemission studies of microelectronic Devices and Quantum structures",
      authors: ["Aalok Tiwari", "B. Ravi Kumar", "et al."],
      journal: "Manuscript in Preparation",
      year: 2026,
      type: "ongoing",
      category: "ongoing",
      isFirstAuthor: false,
      abstract: "Ongoing work on angle resolved photoemission studies of microelectronic devices and quantum structures.",
      keywords: ["ARPES", "Microelectronic devices", "Quantum structures", "Ongoing work"]
    },
    {
      id: 23,
      title: "Tuning the field-like torque using multilayer stacks in CoFeB/Pt heterostructures",
      authors: ["B. Ravi Kumar", "P. S. Anil Kumar"],
      journal: "Manuscript in Preparation",
      year: 2026,
      type: "ongoing",
      category: "ongoing",
      isFirstAuthor: true,
      abstract: "Ongoing work on tuning field-like torque using multilayer stacks in CoFeB/Pt heterostructures.",
      keywords: ["Field-like torque", "CoFeB", "Pt", "Multilayer stacks", "Ongoing work"]
    }
  ];

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