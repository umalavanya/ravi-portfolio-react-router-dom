import '../styles/Home.css';

const Home = () => {
  return (
    <div className="content-section active home-dashboard">
      <div className="home-container">
        <div className="home-hero">
          <div className="home-content">
            <h1 className="home-title">Welcome to My Research World</h1>
            <p className="home-subtitle">
              I'm <span className="highlight">Dr. Ravi Kumar Bandapelli</span>, 
              an Experimental Condensed Matter Physicist specializing in 
              spintronics, thin film engineering, and advanced materials.
            </p>
            <div className="home-actions">
              <a href="/about" className="home-btn primary">Know About Me →</a>
              <a href="/publications" className="home-btn secondary">View Publications →</a>
            </div>
          </div>
        </div>

        <div className="home-quick-links">
          <div className="quick-link-item">
            <span className="quick-icon">🔬</span>
            <div>
              <h4>Spintronics</h4>
              <p>Thin film heterostructures for next-gen memory</p>
            </div>
          </div>
          <div className="quick-link-item">
            <span className="quick-icon">📊</span>
            <div>
              <h4>Publications</h4>
              <p>13+ papers in high-impact journals</p>
            </div>
          </div>
          <div className="quick-link-item">
            <span className="quick-icon">🌍</span>
            <div>
              <h4>Global Research</h4>
              <p>Experience across India & USA</p>
            </div>
          </div>
        </div>

        <div className="home-stats">
          <div className="stat-item">
            <span className="stat-number">13+</span>
            <span className="stat-label">Publications</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">10+</span>
            <span className="stat-label">Awards</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">8+</span>
            <span className="stat-label">Years Research</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">6</span>
            <span className="stat-label">Countries</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;