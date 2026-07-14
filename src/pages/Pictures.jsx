import React, { useState, useEffect } from 'react';
import '../styles/Pictures.css';

const Pictures = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSmallMobile, setIsSmallMobile] = useState(window.innerWidth <= 576);
  const [viewMode, setViewMode] = useState('grid');

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
    { id: 'all', name: 'All Memories', icon: '📸', count: 0 },
    { id: 'universities', name: 'Universities', icon: '🏛️', count: 0 },
    { id: 'professors', name: 'Mentors', icon: '👨‍🏫', count: 0 },
    { id: 'research', name: 'Research Labs', icon: '🔬', count: 0 },
    { id: 'conferences', name: 'Conferences', icon: '🎤', count: 0 },
    { id: 'travel', name: 'Travel', icon: '🌍', count: 0 },
    { id: 'personal', name: 'Personal', icon: '😊', count: 0 }
  ];

  const photoGallery = [
    {
      id: 1,
      title: "University of Hyderabad Campus",
      description: "Beautiful campus where I completed my PhD in Experimental Condensed Matter Physics",
      category: "universities",
      year: "2010-2018",
      location: "Hyderabad, India",
      tags: ["PhD", "Campus Life", "Academic Journey"],
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop",
      featured: true
    },
    {
      id: 2,
      title: "With Prof. S. N. Kaul",
      description: "My PhD supervisor and mentor who guided my research in magnetic thin films",
      category: "professors",
      year: "2015",
      location: "School of Physics, UoH",
      tags: ["Mentor", "PhD Supervisor", "Research Guidance"],
      image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&auto=format&fit=crop",
      featured: true
    },
    {
      id: 3,
      title: "Carnegie Mellon University Lab",
      description: "Advanced research laboratory during my postdoctoral work",
      category: "research",
      year: "2022-Present",
      location: "Pittsburgh, USA",
      tags: ["Postdoc", "Research", "Advanced Equipment"],
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&auto=format&fit=crop",
      featured: true
    },
    {
      id: 4,
      title: "IISc Bangalore Visit",
      description: "Visiting the prestigious Indian Institute of Science for collaborative research",
      category: "universities",
      year: "2020",
      location: "Bangalore, India",
      tags: ["Collaboration", "Research Visit", "IISc"],
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop",
      featured: false
    },
    {
      id: 5,
      title: "With Research Group at IISER",
      description: "Working with talented students and colleagues during my research scientist position",
      category: "research",
      year: "2017",
      location: "Bhubaneswar, India",
      tags: ["Research Group", "Teamwork", "IISER"],
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&auto=format&fit=crop",
      featured: false
    },
    {
      id: 6,
      title: "International Conference Presentation",
      description: "Presenting research findings at an international physics conference",
      category: "conferences",
      year: "2019",
      location: "San Francisco, USA",
      tags: ["Conference", "Presentation", "Networking"],
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop",
      featured: true
    },
    {
      id: 7,
      title: "Osmania University Days",
      description: "Memories from my MSc days at Osmania University",
      category: "universities",
      year: "2007-2009",
      location: "Hyderabad, India",
      tags: ["MSc", "Student Life", "Osmania"],
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop",
      featured: false
    },
    {
      id: 8,
      title: "With Prof. P. S. Anil Kumar",
      description: "Collaborating with an expert in spintronics and magnetic materials",
      category: "professors",
      year: "2021",
      location: "IISc Bangalore",
      tags: ["Collaboration", "Expert Guidance", "Spintronics"],
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop",
      featured: false
    },
    {
      id: 9,
      title: "CMU Research Facilities",
      description: "State-of-the-art equipment at Carnegie Mellon University",
      category: "research",
      year: "2023",
      location: "Pittsburgh, USA",
      tags: ["Advanced Equipment", "Research", "CMU"],
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&auto=format&fit=crop",
      featured: false
    },
    {
      id: 10,
      title: "Academic Travel to Germany",
      description: "Research collaboration visit to Max Planck Institute",
      category: "travel",
      year: "2017",
      location: "Stuttgart, Germany",
      tags: ["International", "Collaboration", "Research Trip"],
      image: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=800&auto=format&fit=crop",
      featured: true
    },
    {
      id: 11,
      title: "Family Support System",
      description: "The incredible support from family throughout my academic journey",
      category: "personal",
      year: "Ongoing",
      location: "Various",
      tags: ["Family", "Support", "Personal"],
      image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=800&auto=format&fit=crop",
      featured: true
    },
    {
      id: 12,
      title: "Graduation Celebration",
      description: "Celebrating PhD completion with friends and colleagues",
      category: "personal",
      year: "2018",
      location: "Hyderabad, India",
      tags: ["Graduation", "Achievement", "Celebration"],
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop",
      featured: false
    },
    {
      id: 13,
      title: "Kakatiya University Campus",
      description: "Where my academic journey began with BSc studies",
      category: "universities",
      year: "2006-2009",
      location: "Warangal, India",
      tags: ["BSc", "Foundation", "Beginning"],
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop",
      featured: false
    },
    {
      id: 14,
      title: "With Research Students",
      description: "Mentoring and guiding the next generation of scientists",
      category: "professors",
      year: "2020",
      location: "IISc Bangalore",
      tags: ["Mentoring", "Teaching", "Guidance"],
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&auto=format&fit=crop",
      featured: false
    },
    {
      id: 15,
      title: "International Workshop",
      description: "Participating in an international materials science workshop",
      category: "conferences",
      year: "2022",
      location: "Tokyo, Japan",
      tags: ["Workshop", "Learning", "International"],
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop",
      featured: true
    }
  ];

  // Calculate category counts
  categories.forEach(cat => {
    if (cat.id === 'all') {
      cat.count = photoGallery.length;
    } else {
      cat.count = photoGallery.filter(photo => photo.category === cat.id).length;
    }
  });

  const filteredPhotos = activeCategory === 'all' 
    ? photoGallery 
    : photoGallery.filter(photo => photo.category === activeCategory);

  const featuredPhotos = photoGallery.filter(photo => photo.featured);

  const handleImageClick = (photo) => {
    setSelectedImage(photo);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setTimeout(() => setSelectedImage(null), 300);
  };

  const navigateLightbox = (direction) => {
    if (!selectedImage) return;
    
    const currentIndex = filteredPhotos.findIndex(p => p.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % filteredPhotos.length;
    } else {
      newIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    }
    
    setSelectedImage(filteredPhotos[newIndex]);
  };

  const getCategoryColor = (category) => {
    const colors = {
      universities: '#8b4513',
      professors: '#a54f2e',
      research: '#bd5d38',
      conferences: '#c9754e',
      travel: '#d88c6a',
      personal: '#e8b8a0'
    };
    return colors[category] || '#bd5d38';
  };

  return (
    <div className="content-section active pictures-dashboard">
      <div className="pictures-header">
        <h1 className="pictures-title">Journey Through Photos</h1>
        <p className="pictures-subtitle">Memories from Academic and Professional Life</p>
        
        {!isSmallMobile && (
          <div className="timeline-indicator">
            <div className="timeline-track">
              <div className="timeline-marker" style={{ left: '0%' }} data-year="2006">
                <div className="marker-dot"></div>
                <div className="marker-label">BSc</div>
              </div>
              <div className="timeline-marker" style={{ left: '25%' }} data-year="2009">
                <div className="marker-dot"></div>
                <div className="marker-label">MSc</div>
              </div>
              <div className="timeline-marker" style={{ left: '50%' }} data-year="2018">
                <div className="marker-dot"></div>
                <div className="marker-label">PhD</div>
              </div>
              <div className="timeline-marker" style={{ left: '75%' }} data-year="2022">
                <div className="marker-dot"></div>
                <div className="marker-label">Postdoc</div>
              </div>
              <div className="timeline-marker" style={{ left: '100%' }} data-year="Present">
                <div className="marker-dot active"></div>
                <div className="marker-label">Now</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="pictures-container">
        {/* Sidebar */}
        <div className="pictures-sidebar">
          <div className="categories-panel">
            <h3>
              <span className="categories-icon">📁</span>
              Categories
            </h3>
            
            <div className="category-buttons">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`category-btn-pic ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                  style={{ 
                    borderColor: getCategoryColor(category.id),
                    backgroundColor: activeCategory === category.id ? getCategoryColor(category.id) : 'transparent'
                  }}
                >
                  <span className="category-icon-pic">{category.icon}</span>
                  <span className="category-name">
                    {isSmallMobile ? category.name.substring(0, 8) + (category.name.length > 8 ? '...' : '') : category.name}
                  </span>
                  <span className="category-count">{category.count}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="journey-stats">
            <h3>
              <span className="stats-icon-pic">📊</span>
              Journey Stats
            </h3>
            
            <div className="stats-grid-pic">
              <div className="stat-pic">
                <div className="stat-value-pic">{photoGallery.length}</div>
                <div className="stat-label-pic">Memories</div>
              </div>
              
              <div className="stat-pic">
                <div className="stat-value-pic">4</div>
                <div className="stat-label-pic">Universities</div>
              </div>
              
              <div className="stat-pic">
                <div className="stat-value-pic">8+</div>
                <div className="stat-label-pic">Countries</div>
              </div>
              
              <div className="stat-pic">
                <div className="stat-value-pic">15+</div>
                <div className="stat-label-pic">Years</div>
              </div>
            </div>

            <div className="journey-highlights">
              <h4>Journey Highlights</h4>
              <div className="highlight-item">
                <span className="highlight-icon">🎓</span>
                <div className="highlight-content">
                  <strong>PhD Completed</strong>
                  <span>University of Hyderabad, 2018</span>
                </div>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">🌍</span>
                <div className="highlight-content">
                  <strong>International Research</strong>
                  <span>USA, Germany, Japan</span>
                </div>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">👨‍🏫</span>
                <div className="highlight-content">
                  <strong>Inspiring Mentors</strong>
                  <span>5+ Professors Guided</span>
                </div>
              </div>
            </div>
          </div>

          <div className="quick-view">
            <h3>
              <span className="view-icon">🌟</span>
              Featured Memories
            </h3>
            
            <div className="featured-preview">
              {featuredPhotos.slice(0, isSmallMobile ? 2 : 3).map(photo => (
                <div 
                  key={photo.id}
                  className="preview-card"
                  onClick={() => handleImageClick(photo)}
                >
                  <div 
                    className="preview-image"
                    style={{ backgroundImage: `url(${photo.image})` }}
                  ></div>
                  <div className="preview-info">
                    <div className="preview-title">{isSmallMobile ? photo.title.substring(0, 15) + '...' : photo.title}</div>
                    <div className="preview-year">{photo.year}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Gallery */}
        <div className="pictures-main">
          <div className="gallery-header">
            <h2>
              {activeCategory === 'all' ? 'All Memories' : 
               categories.find(c => c.id === activeCategory)?.name}
              <span className="photos-count"> ({filteredPhotos.length} photos)</span>
            </h2>
            
            <div className="view-options">
              <button 
                className={`view-option ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                {isSmallMobile ? '▦' : 'Grid'}
              </button>
              <button 
                className={`view-option ${viewMode === 'masonry' ? 'active' : ''}`}
                onClick={() => setViewMode('masonry')}
                style={{ display: isSmallMobile ? 'none' : 'inline-flex' }}
              >
                {isSmallMobile ? '▤' : 'Masonry'}
              </button>
              <button 
                className={`view-option ${viewMode === 'timeline' ? 'active' : ''}`}
                onClick={() => setViewMode('timeline')}
                style={{ display: isSmallMobile ? 'none' : 'inline-flex' }}
              >
                {isSmallMobile ? '▌' : 'Timeline'}
              </button>
            </div>
          </div>

          {filteredPhotos.length === 0 ? (
            <div className="no-photos">
              <div className="no-photos-icon">📸</div>
              <h3>No photos in this category</h3>
              <p>Select another category to view memories</p>
            </div>
          ) : (
            <>
              <div className={`photo-grid ${viewMode}`}>
                {filteredPhotos.map(photo => (
                  <div 
                    key={photo.id}
                    className={`photo-card ${photo.featured ? 'featured' : ''}`}
                    onClick={() => handleImageClick(photo)}
                  >
                    {photo.featured && (
                      <div className="featured-badge-pic">
                        <span className="featured-icon">⭐</span>
                        Featured
                      </div>
                    )}
                    
                    <div 
                      className="photo-image"
                      style={{ backgroundImage: `url(${photo.image})` }}
                    >
                      <div className="photo-overlay">
                        <div className="overlay-content">
                          <h4 className="photo-title">{photo.title}</h4>
                          <div className="photo-meta">
                            <span className="photo-year">{photo.year}</span>
                            <span className="photo-location">{photo.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="photo-info">
                      <div className="info-header">
                        <div className="category-tag-pic" style={{ backgroundColor: getCategoryColor(photo.category) }}>
                          {categories.find(c => c.id === photo.category)?.icon} 
                          {!isSmallMobile && categories.find(c => c.id === photo.category)?.name}
                          {isSmallMobile && categories.find(c => c.id === photo.category)?.name.substring(0, 6) + '...'}
                        </div>
                        <button className="favorite-btn">
                          <span className="heart-icon">❤️</span>
                        </button>
                      </div>
                      
                      {!isSmallMobile && (
                        <p className="photo-description">{photo.description}</p>
                      )}
                      
                      <div className="photo-tags">
                        {photo.tags.slice(0, isSmallMobile ? 2 : 3).map((tag, index) => (
                          <span key={index} className="photo-tag">
                            {isSmallMobile && index === 2 ? '+' : tag}
                          </span>
                        ))}
                        {isSmallMobile && photo.tags.length > 2 && (
                          <span className="photo-tag more">+{photo.tags.length - 2}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Journey Map - Hide on small mobile */}
              {!isSmallMobile && (
                <div className="journey-map">
                  <h3>
                    <span className="map-icon">🗺️</span>
                    Academic Journey Map
                  </h3>
                  
                  <div className="map-container">
                    <div className="map-locations">
                      <div className="location-point" style={{ top: '30%', left: '15%' }}>
                        <div className="point-icon">🎓</div>
                        <div className="point-info">
                          <strong>Kakatiya University</strong>
                          <span>BSc (2006-2009)</span>
                        </div>
                      </div>
                      
                      <div className="location-point" style={{ top: '40%', left: '25%' }}>
                        <div className="point-icon">🎓</div>
                        <div className="point-info">
                          <strong>Osmania University</strong>
                          <span>MSc (2007-2009)</span>
                        </div>
                      </div>
                      
                      <div className="location-point" style={{ top: '50%', left: '40%' }}>
                        <div className="point-icon">🎓</div>
                        <div className="point-info">
                          <strong>University of Hyderabad</strong>
                          <span>PhD (2010-2018)</span>
                        </div>
                      </div>
                      
                      <div className="location-point" style={{ top: '60%', left: '55%' }}>
                        <div className="point-icon">🏛️</div>
                        <div className="point-info">
                          <strong>IISER Bhubaneswar</strong>
                          <span>Research (2015-2018)</span>
                        </div>
                      </div>
                      
                      <div className="location-point" style={{ top: '40%', left: '70%' }}>
                        <div className="point-icon">🏛️</div>
                        <div className="point-info">
                          <strong>IISc Bangalore</strong>
                          <span>Fellowship (2018-2022)</span>
                        </div>
                      </div>
                      
                      <div className="location-point" style={{ top: '20%', left: '85%' }}>
                        <div className="point-icon">🌍</div>
                        <div className="point-info">
                          <strong>Carnegie Mellon</strong>
                          <span>Postdoc (2022-Present)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && selectedImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>✕</button>
            
            <div className="lightbox-navigation">
              <button className="nav-btn prev" onClick={() => navigateLightbox('prev')}>◀</button>
              <button className="nav-btn next" onClick={() => navigateLightbox('next')}>▶</button>
            </div>
            
            <div className="lightbox-image-container">
              <div 
                className="lightbox-image"
                style={{ backgroundImage: `url(${selectedImage.image})` }}
              ></div>
            </div>
            
            <div className="lightbox-info">
              <div className="lightbox-header">
                <h3>{selectedImage.title}</h3>
                <div className="lightbox-meta">
                  <span className="lightbox-year">{selectedImage.year}</span>
                  <span className="lightbox-location">{selectedImage.location}</span>
                  <span 
                    className="lightbox-category"
                    style={{ backgroundColor: getCategoryColor(selectedImage.category) }}
                  >
                    {categories.find(c => c.id === selectedImage.category)?.name}
                  </span>
                </div>
              </div>
              
              <p className="lightbox-description">{selectedImage.description}</p>
              
              <div className="lightbox-tags">
                {selectedImage.tags.map((tag, index) => (
                  <span key={index} className="lightbox-tag">{tag}</span>
                ))}
              </div>
              
              <div className="lightbox-actions">
                <button className="action-btn-pic share">
                  <span className="action-icon">📤</span>
                  {isSmallMobile ? 'Share' : 'Share'}
                </button>
                <button className="action-btn-pic download">
                  <span className="action-icon">⬇️</span>
                  {isSmallMobile ? 'Save' : 'Download'}
                </button>
                <button className="action-btn-pic favorite">
                  <span className="action-icon">❤️</span>
                  {isSmallMobile ? 'Like' : 'Favorite'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pictures;