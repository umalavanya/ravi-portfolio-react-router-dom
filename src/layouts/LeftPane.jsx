import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import profile from '../../assets/profile.jpg';

const LeftPane = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const toggleRef = useRef(null);

  const sections = ['','about', 'education', 'experience', 'skills', 'awards', 'publications', 'talks', 'pictures'];
  
  // Get current section from URL
  const currentPath = location.pathname.replace('/', '') || 'about';
  const activeSection = sections.includes(currentPath) ? currentPath : 'about';

  const handleNavigation = (section) => {
    navigate(`/${section === 'about' ? 'about' : section}`);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && 
          !navRef.current.contains(event.target) && 
          !toggleRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <div className="left-pane">
      <div className="header-container">
        <div className="profile-section">
          <img 
            src={profile} 
            alt="Ravi Kumar Bandapelli" 
            className="profile-pic" 
            width="150"
            height="150"
            loading="lazy"
          />
          <div className="profile-info">
            <h4>Ravi Kumar Bandapelli</h4>
          </div>
        </div>  
      </div>

      <div className="header-toggle">
        {/* Mobile Toggle Button - Only visible below 800px */}
        <button 
          ref={toggleRef}
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <FaBars />
        </button>

        {/* Navigation Links */}
        <nav 
          ref={navRef}
          className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}
        >
          {sections.map((section) => (
            <button
              key={section}
              className={`nav-link ${activeSection === section ? 'active' : ''}`}
              onClick={() => handleNavigation(section)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default LeftPane;