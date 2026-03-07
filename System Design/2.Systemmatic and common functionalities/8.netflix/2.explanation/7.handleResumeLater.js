// Inside the MovieCard Component
const handleMouseEnter = (e) => {
  // 1. GET THE COORDINATES
  const rect = e.currentTarget.getBoundingClientRect();
  
  // 2. TRIGGER THE PORTAL
  // We pass the position so the Portal knows where to "start" its growth
  setGlobalHoverState({
    active: true,
    movieId: props.id,
    coords: {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
      height: rect.height
    }
  });
};

// Inside the GlobalPortal Component (The "Stunt Double")
const HoverPortal = ({ coords, movieId }) => {
  return ReactDOM.createPortal(
    <div 
      className="expanded-card-wrapper"
      style={{
        position: 'absolute',
        top: coords.top,
        left: coords.left,
        width: coords.width,
        height: coords.height,
        zIndex: 9999,
        // The magic transition: Scale from center
        transition: 'transform 0.3s ease-out',
        transform: 'scale(1.2)' 
      }}
    >
      <VideoPlayer 
        src={getHlsUrl(movieId)} 
        autoPlay 
        muted 
      />
      <div className="metadata-overlay">
        {/* Title, Rating, Genre info sits here */}
      </div>
    </div>,
    document.body // Teleported to the root
  );
};