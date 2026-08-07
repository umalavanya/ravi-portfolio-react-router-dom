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

// Function to download CV in DOCX format
const downloadCV_DOCX = () => {
  // Using relative path from the public folder
  const cvUrl = '/cv/ravikumar_resume.docx'; // Files should be in public/cv/ folder
  const link = document.createElement('a');
  link.href = cvUrl;
  link.download = 'ravikumar_resume.docx';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Function to download CV in PDF format
const downloadCV_PDF = () => {
  // Using relative path from the public folder
  const cvUrl = '/cv/ravikumar_resume.pdf'; // Files should be in public/cv/ folder
  const link = document.createElement('a');
  link.href = cvUrl;
  link.download = 'ravikumar_resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  // Social media links
  const socialLinks = {
    linkedin: 'https://www.linkedin.com/in/ravi-kumar-bandapelli-6265231b7/', // Replace with your LinkedIn URL
    googleScholar: 'https://scholar.google.com/citations?user=ybqQ9PkAAAAJ&hl=en', // Replace with your Google Scholar URL
    researchGate: 'https://www.researchgate.net/profile/Ravi-Kumar-Bandapelli', // Replace with your ResearchGate URL
    orcid: 'https://orcid.org/0000-0001-5112-081X' // Replace with your ORCID
  };

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
                <div className="fact-icon">🧲</div>
                <div className="fact-content">
                  <div className="fact-title">Post Doc</div>
                  <div className="fact-detail">Cornell University, U.S.A</div>
                </div>
              </div>

              <div className="fact-card">
                <div className="fact-icon">🔬</div>
                <div className="fact-content">
                  <div className="fact-title">Post Doc</div>
                  <div className="fact-detail">Carnegie Mellon University, U.S.A</div>
                </div>
              </div>

              <div className="fact-card">
                <div className="fact-icon">⇅</div>
                <div className="fact-content">
                  <div className="fact-title">Post Doc</div>
                  <div className="fact-detail">Indian Institute of Science, India</div>
                </div>
              </div>

              <div className="fact-card">
                <div className="fact-icon">🎓</div>
                <div className="fact-content">
                  <div className="fact-title">PhD Physics</div>
                  <div className="fact-detail">University of Hyderabad, India</div>
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

          {/* Download CV Section */}
          <div className="cv-download-section">
            <h3>
              <span className="cv-icon">📄</span>
              Download CV
            </h3>
            <div className="cv-download-buttons">
              <button 
                className="cv-btn pdf-btn"
                onClick={downloadCV_PDF}
                aria-label="Download CV as PDF"
              >
                <span className="cv-btn-icon">📕</span>
                PDF
                <span className="cv-btn-size">(2.4 MB)</span>
              </button>
              <button 
                className="cv-btn docx-btn"
                onClick={downloadCV_DOCX}
                aria-label="Download CV as DOCX"
              >
                <span className="cv-btn-icon">📘</span>
                DOCX
                <span className="cv-btn-size">(1.8 MB)</span>
              </button>
            </div>
            <p className="cv-note">Last updated: August 2026</p>
          </div>

          {/* Social Media Section */}
          <div className="social-section">
            <h3>
              <span className="social-icon">🌐</span>
              Connect With Me
            </h3>
            <div className="social-icons-about">
              <a 
                href={socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon-about linkedin"
                aria-label="LinkedIn"
              >
                <svg className="social-svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href={socialLinks.googleScholar} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon-about scholar"
                aria-label="Google Scholar"
              >
                <svg className="social-svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5 12 0z"/>
                </svg>
              </a>
              <a 
                href={socialLinks.researchGate} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon-about researchgate"
                aria-label="ResearchGate"
              >
                <svg className="social-svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M0 0v24h24V0H0zm12 3.5c2.9 0 5.25 2.35 5.25 5.25S14.9 14 12 14 6.75 11.65 6.75 8.75 9.1 3.5 12 3.5zM3.5 12c0-1.2.35-2.3.95-3.25.6.95.95 2.05.95 3.25s-.35 2.3-.95 3.25C3.85 14.3 3.5 13.2 3.5 12zm17 0c0 1.2-.35 2.3-.95 3.25-.6-.95-.95-2.05-.95-3.25s.35-2.3.95-3.25c.6.95.95 2.05.95 3.25zM12 20.5c-1.2 0-2.3-.35-3.25-.95.95-.6 2.05-.95 3.25-.95s2.3.35 3.25.95c-.95.6-2.05.95-3.25.95z"/>
                </svg>
              </a>
              <a 
                href={socialLinks.orcid} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon-about orcid"
                aria-label="ORCID"
              >
                <svg className="social-svg" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Green circle background */}
                  <circle cx="128" cy="128" r="128" fill="#A6CE39"/>
                  {/* White "iD" text */}
                  <g fill="#FFFFFF">
                  {/* "i" - dot and stem */}
                  <path d="M86.3 186.2H70.9V79.1h15.4v48.4V186.2z"/>
                  {/* "D" - curved shape */}
                  <path d="M108.9 79.1h41.6c39.6 0 57 28.3 57 53.6 0 27.5-21.5 53.6-56.8 53.6h-41.8V79.1zM124.3 172.4h24.5c34.9 0 42.9-26.5 42.9-39.7 0-21.5-13.7-39.7-43.7-39.7h-23.7V172.4z"/>
                  {/* Small "i" dot above */}
                  <circle cx="78.6" cy="56.8" r="10.1"/>
  </g>
</svg>
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