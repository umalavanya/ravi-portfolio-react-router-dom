import { useState } from 'react';
import ContactForm from "./ContactForm";
import "../styles/About.css";

const About = () => {
  const [activeInterest, setActiveInterest] = useState(0);
  const [showPhilosophy, setShowPhilosophy] = useState(false);
  const [showExpertise, setShowExpertise] = useState(true);

  const researchInterests = [
    {
      id: 0,
      title: "Spintronic Materials & Devices",
      icon: "🧲",
      description: "Designing thin-film heterostructures for next-generation memory and logic applications",
      details: [
        "Interfacial magnetism: Dzyaloshinskii-Moriya interaction (DMI), perpendicular magnetic anisotropy",
        "Spin-orbit torque devices: Current-induced magnetization switching for energy-efficient computing",
        "2D material integration: van der Waals heterostructures for novel spin transport phenomena"
      ],
      color: "#bd5d38"
    },
    {
      id: 1,
      title: "Advanced Thin Film Engineering",
      icon: "🔬",
      description: "Ultra-high vacuum deposition and nanoscale characterization of magnetic materials",
      details: [
        "Ultra-high vacuum (UHV) deposition: Precision growth of magnetic films",
        "Nanoscale characterization: Correlating microstructure with magnetic/electronic properties"
      ],
      color: "#8b4513"
    }
    
  ];

  const expertisePoints = [
    {
      icon: "🎯",
      title: "Thin Film Architectures",
      description: "Specialized in UHV-deposited magnetic heterostructures and 2D van der Waals materials",
      details: ["Metallic and insulating ferromagnets, insulating anti-ferromagnets ", "Conventional and unconventional spin source materials", "2D van der Waals materials"]
    },
    {
      icon: "⚙️",
      title: "Nanofabrication",
      description: "Hands-on experience in device fabrication and integration",
      details: ["E-beam/laser lithography", "Reactive ion etching, ion-milling, ion-beam etching", "Clean-room experience"]
    },
    {
      icon: "📊",
      title: "Advanced Characterization",
      description: "Expertise in structural and magnetic property analysis",
      details: ["XRD, AFM analysis", "SQUID magnetometry","PPMS", "Cryogenic transport"]
    },
    {
      icon: "🤝",
      title: "Collaborative Innovation",
      description: "Translating academic research into industry-relevant solutions",
      details: ["Project leadership", "Knowledge transfer"]
    }
  ];

  return (
    <div className="content-section active about-dashboard">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="title-section">

          <div className="name-container">
            <table>
              <tbody>
                <tr>
                  <td><h1 className="first-name">Dr. <u>Ravi Kumar</u></h1></td>
                  <td><h1 className="last-name">&emsp;Bandapelli</h1></td>
                </tr>
                <tr>
                  <td className="pronouns"><p>(first name)</p></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="pronouns">(he/him)</div>
        </div>

        <div className="subtitle-container">
          <div className="subtitle-main">
            Experimental Condensed Matter Physicist
          </div>
          <div className="subtitle-details">
            <span className="subtitle-tag">2D Materials</span>
            <span className="subtitle-tag">Spintronic Devices</span>
            <span className="subtitle-tag">Thin Film Specialist</span>
          </div>
        </div>

        <div className="hero-quote">
          <span className="quote-icon">❝</span>
          <p className="quote-text">
            I engineer nanoscale quantum devices to power the next generation of computing.
          </p>
          <span className="quote-icon">❞</span>
        </div>
      </div>

      <div className="about-container">
        {/* Left Panel - Quick Facts */}
        <div className="about-sidebar">
          <div className="quick-facts">
            <h3>
              <span className="facts-icon">⚡</span>
              Quick Facts
            </h3>
            
            <div className="fact-cards">
              <div className="fact-card">
                <div className="fact-icon">🎓</div>
                <div className="fact-content">
                  <div className="fact-title">Post Doc</div>
                  <div className="fact-detail">Carnegie Mellon University</div>
                </div>
              </div>

              <div className="fact-card">
                <div className="fact-icon">🎓</div>
                <div className="fact-content">
                  <div className="fact-title">Post Doc</div>
                  <div className="fact-detail">Indian Institute of Science</div>
                </div>
              </div>

              <div className="fact-card">
                <div className="fact-icon">🎓</div>
                <div className="fact-content">
                  <div className="fact-title">PhD Physics</div>
                  <div className="fact-detail">University of Hyderabad</div>
                </div>
              </div>
              
              <div className="fact-card">
                <div className="fact-icon">🏆</div>
                <div className="fact-content">
                  <div className="fact-title">10+ Awards</div>
                  <div className="fact-detail">National & International</div>
                </div>
              </div>
              
              <div className="fact-card">
                <div className="fact-icon">📄</div>
                <div className="fact-content">
                  <div className="fact-title">13 Publications</div>
                  <div className="fact-detail">High-impact Journals</div>
                </div>
              </div>
              
              <div className="fact-card">
                <div className="fact-icon">🌍</div>
                <div className="fact-content">
                  <div className="fact-title">Global Experience</div>
                  <div className="fact-detail">India, USA</div>
                </div>
              </div>
            </div>
          </div>

          <div className="core-expertise-sidebar">
            <h3>
              <span className="expertise-icon">🎯</span>
              Core Expertise
            </h3>
            
            <div className="expertise-tags-sidebar">
              <span className="expertise-tag-sidebar">Thin Films</span>
              <span className="expertise-tag-sidebar">2D Materials</span>
              <span className="expertise-tag-sidebar">Spintronics</span>
              <span className="expertise-tag-sidebar">Nanofabrication</span>
              <span className="expertise-tag-sidebar">Magnetism</span>
              <span className="expertise-tag-sidebar">Characterization</span>
            </div>
          </div>

          <div className="connect-section">
            <h3>
              <span className="connect-icon">🤝</span>
              Let's Connect
            </h3>
            <p>Discuss collaborations in advanced materials research!</p>
            <div className="social-icons-about">
              <a className="social-icon-about" href="#!" title="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a className="social-icon-about" href="#!" title="GitHub">
                <i className="fab fa-github"></i>
              </a>
              <a className="social-icon-about" href="https://www.facebook.com/ravisri.phy" title="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a className="social-icon-about" href="mailto:example@example.com" title="Email">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="about-main">
          {/* About Me Section */}
          <div className="about-me-section">
            <div className="section-header">
              <h2>
                <span className="section-icon">👨‍🔬</span>
                About Me
              </h2>
              <div className="section-controls">
                <button 
                  className={`section-btn ${showPhilosophy ? 'active' : ''}`}
                  onClick={() => setShowPhilosophy(!showPhilosophy)}
                >
                  {showPhilosophy ? 'Hide Philosophy' : 'View Philosophy'}
                </button>
              </div>
            </div>
            
            <div className="about-content">
              <div className="mission-statement">
                <p className="mission-text">
                  "By manipulating spins at atomic scales, I design faster, more efficient memory technologies 
                  that bridge the gap between fundamental physics and real-world applications."
                </p>
              </div>

              {/* Research Philosophy */}
              {showPhilosophy && (
                <div className="research-philosophy">
                  <h3>
                    <span className="philosophy-icon">💭</span>
                    Research Philosophy
                  </h3>
                  <div className="philosophy-content">
                    <p className="philosophy-quote">
                      "My work sits at the intersection of curiosity-driven science and applied engineering."
                    </p>
                    <div className="philosophy-details">
                      <div className="philosophy-point">
                        <span className="point-icon">🎯</span>
                        <div className="point-content">
                          <strong>Curiosity-Driven Science</strong>
                          <p>Exploring fundamental phenomena like Dzyaloshinskii-Moriya interactions</p>
                        </div>
                      </div>
                      <div className="philosophy-point">
                        <span className="point-icon">⚙️</span>
                        <div className="point-content">
                          <strong>Applied Engineering</strong>
                          <p>Optimizing 2D material transfer processes for practical devices</p>
                        </div>
                      </div>
                      <div className="philosophy-point">
                        <span className="point-icon">🚀</span>
                        <div className="point-content">
                          <strong>Future Vision</strong>
                          <p>Building materials foundation for quantum information technologies</p>
                        </div>
                      </div>
                    </div>
                    <p className="philosophy-conclusion">
                      "I thrive on solving complex materials challenges with rigorous experimentation 
                      and creative problem-solving. I believe the future of information technology lies 
                      in harnessing quantum mechanical phenomena—and I'm committed to building the 
                      materials foundation to make it possible."
                    </p>
                  </div>
                </div>
              )}

              {/* Expertise Grid */}
              <div className="expertise-grid">
                {expertisePoints.map((expertise, index) => (
                  <div key={index} className="expertise-card" onClick={() => setShowExpertise(!showExpertise)}>
                    <div className="expertise-card-header">
                      <div className="expertise-icon-card">{expertise.icon}</div>
                      <h4>{expertise.title}</h4>
                    </div>
                    <p className="expertise-description">{expertise.description}</p>
                    <div className="expertise-tags">
                      {expertise.details.map((detail, idx) => (
                        <span key={idx} className="expertise-detail-tag">{detail}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              
            </div>
          </div>

          {/* Research Interests Section */}
          <div className="research-interests-section">
            <div className="section-header">
              <h2>
                <span className="section-icon">🔍</span>
                Research Interests
              </h2>
              <div className="interest-indicator">
                <span>{activeInterest + 1} of {researchInterests.length}</span>
              </div>
            </div>

            <div className="interests-container">
              {/* Interest Navigation */}
              <div className="interest-navigation">
                {researchInterests.map((interest, index) => (
                  <button
                    key={interest.id}
                    className={`interest-nav-btn ${activeInterest === index ? 'active' : ''}`}
                    onClick={() => setActiveInterest(index)}
                    style={{ borderColor: interest.color }}
                  >
                    <span className="nav-icon">{interest.icon}</span>
                    <span className="nav-title">{interest.title}</span>
                  </button>
                ))}
              </div>

              {/* Active Interest Display */}
              <div className="active-interest-display">
                <div 
                  className="interest-header"
                  style={{ backgroundColor: researchInterests[activeInterest].color }}
                >
                  <div className="interest-icon-big">{researchInterests[activeInterest].icon}</div>
                  <h3>{researchInterests[activeInterest].title}</h3>
                </div>
                
                <div className="interest-content">
                  <p className="interest-description">
                    {researchInterests[activeInterest].description}
                  </p>
                  
                  <div className="interest-details">
                    <h4>Focus Areas:</h4>
                    <ul className="details-list-about">
                      {researchInterests[activeInterest].details.map((detail, idx) => (
                        <li key={idx} className="detail-item-about">
                          <span className="detail-marker"></span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="interest-stats">
                    <div className="stat-interest">
                      <div className="stat-icon">📈</div>
                      <div className="stat-content">
                        <div className="stat-value">7+ years</div>
                        <div className="stat-label">Research Experience</div>
                      </div>
                    </div>
                    <div className="stat-interest">
                      <div className="stat-icon">📊</div>
                      <div className="stat-content">
                        <div className="stat-value">13+ papers</div>
                        <div className="stat-label">Published Research</div>
                      </div>
                    </div>
                    <div className="stat-interest">
                      <div className="stat-icon">🎯</div>
                      <div className="stat-content">
                        <div className="stat-value">Next-Gen</div>
                        <div className="stat-label">Memory Technologies</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interest Progress */}
            <div className="interest-progress">
              <div className="progress-track">
                {researchInterests.map((_, index) => (
                  <button
                    key={index}
                    className={`progress-dot ${index === activeInterest ? 'active' : ''} ${index < activeInterest ? 'completed' : ''}`}
                    onClick={() => setActiveInterest(index)}
                  ></button>
                ))}
              </div>
              <div className="progress-controls">
                <button 
                  className="progress-btn prev"
                  onClick={() => setActiveInterest(prev => prev > 0 ? prev - 1 : researchInterests.length - 1)}
                >
                  ◀ Previous
                </button>
                <button 
                  className="progress-btn next"
                  onClick={() => setActiveInterest(prev => (prev + 1) % researchInterests.length)}
                >
                  Next ▶
                </button>
              </div>
            </div>
          </div>

          {/* Call to Action Section */}
          <div className="cta-section">
            <div className="cta-card">
              <div className="cta-header">
                <h3>
                  <span className="cta-icon">🚀</span>
                  Let's Collaborate!
                </h3>
                <p className="cta-subtitle">
                  Explore my projects below, or connect with me to discuss collaborations in advanced materials research!
                </p>
              </div>
              
              <div className="cta-content">
                <div className="collaboration-areas">
                  <h4>Areas of Collaboration:</h4>
                  <div className="collaboration-tags">
                    <span className="collab-tag">Joint Research</span>
                    <span className="collab-tag">Industry Consulting</span>
                    <span className="collab-tag">Academic Supervision</span>
                    <span className="collab-tag">Technical Workshops</span>
                    <span className="collab-tag">Grant Applications</span>
                  </div>
                </div>
                
                <div className="cta-form">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;