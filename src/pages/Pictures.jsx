import React, { useState, useEffect } from 'react';
import '../styles/Pictures.css';
import {categories, photoGallery} from '../database/picturesdb.js'

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
                  <span>USA, India</span>
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
                    <div className="preview-title">{isSmallMobile ? photo.title.substring(0, 15) + '...' : photo.small_title}</div>
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

              {/* Journey Map - Hide on small mobile
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
              )} */}
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