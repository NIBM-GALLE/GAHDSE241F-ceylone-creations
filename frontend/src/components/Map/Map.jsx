import React, { useState, useEffect } from "react";
import "./Map.css";
import BannerImg from "../../assets/images/banner-map.jpg";
import WorldBannerImg from "../../assets/images/world-map.jpg";

const Map = () => {
  const [map, setMap] = useState(null);
  const [worldMap, setWorldMap] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("sri-lanka");
  
  // Extensive list of artisan workshop locations across Sri Lanka
  const artisanLocations = [
    // Colombo District
    { id: 1, name: "Sri Lankan Handcrafts", address: "123 Handcraft Lane, Colombo 01", lat: 6.9271, lng: 79.8612, type: "handcraft" },
    { id: 2, name: "Colombo Pottery Center", address: "45 Clay Road, Colombo 03", lat: 6.9167, lng: 79.8500, type: "pottery" },
    { id: 3, name: "Urban Weavers", address: "78 Fabric Street, Colombo 05", lat: 6.9000, lng: 79.8700, type: "textile" },
    
    // Kandy District
    { id: 4, name: "Clay Creations", address: "45 Pottery Street, Kandy", lat: 7.2906, lng: 80.6337, type: "pottery" },
    { id: 5, name: "Kandy Woodworks", address: "12 Timber Lane, Kandy", lat: 7.3000, lng: 80.6400, type: "woodwork" },
    { id: 6, name: "Hill Country Textiles", address: "34 Weave Road, Kandy", lat: 7.2800, lng: 80.6200, type: "textile" },
    
    // Galle District
    { id: 7, name: "Weave Wonders", address: "78 Textile Avenue, Galle", lat: 6.0535, lng: 80.2210, type: "textile" },
    { id: 8, name: "Galle Pottery House", address: "23 Clay Path, Galle", lat: 6.0600, lng: 80.2100, type: "pottery" },
    { id: 9, name: "Southern Handicrafts", address: "56 Craft Road, Galle", lat: 6.0400, lng: 80.2300, type: "handcraft" },
    
    // Jaffna District
    { id: 10, name: "Jaffna Palmyra Crafts", address: "12 Palm Street, Jaffna", lat: 9.6615, lng: 80.0255, type: "handcraft" },
    { id: 11, name: "Northern Textiles", address: "34 Fabric Lane, Jaffna", lat: 9.6700, lng: 80.0300, type: "textile" },
    
    // Anuradhapura District
    { id: 12, name: "Ancient Pottery Works", address: "78 Heritage Road, Anuradhapura", lat: 8.3356, lng: 80.3889, type: "pottery" },
    { id: 13, name: "Sacred Wood Carvings", address: "23 Temple Street, Anuradhapura", lat: 8.3400, lng: 80.3800, type: "woodwork" },
    
    // Matara District
    { id: 14, name: "Candle Creations", address: "98 Candle Lane, Matara", lat: 5.9483, lng: 80.5353, type: "candle" },
    { id: 15, name: "Southern Lights Candles", address: "12 Wax Road, Matara", lat: 5.9500, lng: 80.5300, type: "candle" },
    
    // Negombo
    { id: 16, name: "Wooden Crafts", address: "12 Carpenter's Road, Negombo", lat: 7.2086, lng: 79.8358, type: "woodwork" },
    { id: 17, name: "Negombo Handicrafts", address: "34 Beach Road, Negombo", lat: 7.2100, lng: 79.8400, type: "handcraft" },
    
    // Trincomalee
    { id: 18, name: "Eastern Weavers", address: "56 Loom Street, Trincomalee", lat: 8.5922, lng: 81.2143, type: "textile" },
    
    // Badulla
    { id: 19, name: "Hill Country Pottery", address: "23 Mountain View, Badulla", lat: 6.9934, lng: 81.0550, type: "pottery" },
    
    // Ratnapura
    { id: 20, name: "Gemstone Crafts", address: "45 Jewel Road, Ratnapura", lat: 6.6847, lng: 80.4036, type: "handcraft" },
    
    // International customer locations (for world map)
    { id: 21, name: "UK Customers", address: "London, UK", lat: 51.5074, lng: -0.1278, type: "customer" },
    { id: 22, name: "US Customers", address: "New York, USA", lat: 40.7128, lng: -74.0060, type: "customer" },
    { id: 23, name: "Germany Customers", address: "Berlin, Germany", lat: 52.5200, lng: 13.4050, type: "customer" },
    { id: 24, name: "Japan Customers", address: "Tokyo, Japan", lat: 35.6762, lng: 139.6503, type: "customer" },
    { id: 25, name: "Australia Customers", address: "Sydney, Australia", lat: -33.8688, lng: 151.2093, type: "customer" }
  ];

  useEffect(() => {
    const loadGoogleMapsAPI = () => {
      if (window.google && window.google.maps) {
        initializeMaps();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDZennffc4I2wa2NDZeSi233YpTRl6P18g&libraries=places`;
      script.defer = true;
      script.onload = initializeMaps;
      script.onerror = () => setErrorMsg('Failed to load Google Maps');
      document.head.appendChild(script);
    };

    const initializeMaps = () => {
      try {
        // Sri Lanka Map
        const sriLankaCoords = { lat: 7.8731, lng: 80.7718 };
        const sriLankaMap = new window.google.maps.Map(document.getElementById('sri-lanka-map'), {
          center: sriLankaCoords,
          zoom: 8,
          styles: getMapStyle()
        });

        // World Map
        const worldCoords = { lat: 20.0, lng: 0.0 };
        const worldMapInstance = new window.google.maps.Map(document.getElementById('world-map'), {
          center: worldCoords,
          zoom: 2,
          styles: getMapStyle()
        });

        // Add markers to both maps
        addArtisanMarkers(sriLankaMap);
        addCustomerMarkers(worldMapInstance);

        setMap(sriLankaMap);
        setWorldMap(worldMapInstance);
        setIsLoading(false);
      } catch (error) {
        setErrorMsg(`Error initializing map: ${error.message}`);
        setIsLoading(false);
      }
    };

    const getMapStyle = () => {
      return [
        {
          "elementType": "geometry",
          "stylers": [{ "color": "#f5f5f5" }]
        },
        {
          "elementType": "labels.icon",
          "stylers": [{ "visibility": "off" }]
        },
        {
          "featureType": "administrative.country",
          "elementType": "geometry.stroke",
          "stylers": [{ "color": "#8b5e3c" }, { "weight": 2 }]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [{ "color": "#75CFF0" }]
        }
      ];
    };

    const addArtisanMarkers = (mapInstance) => {
      artisanLocations
        .filter(loc => loc.type !== "customer")
        .forEach(location => {
          const marker = new window.google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map: mapInstance,
            title: location.name,
            icon: {
              url: `https://maps.google.com/mapfiles/ms/icons/${getMarkerColor(location.type)}-dot.png`
            }
          });

          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div class="map-info-window">
                <h3>${location.name}</h3>
                <p>${location.address}</p>
                <p><strong>Type:</strong> ${getTypeName(location.type)}</p>
              </div>
            `
          });

          marker.addListener('click', () => {
            infoWindow.open(mapInstance, marker);
          });
        });
    };

    const addCustomerMarkers = (mapInstance) => {
      artisanLocations
        .filter(loc => loc.type === "customer")
        .forEach(location => {
          const marker = new window.google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map: mapInstance,
            title: location.name,
            icon: {
              url: `https://maps.google.com/mapfiles/ms/icons/blue-dot.png`
            }
          });

          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div class="map-info-window">
                <h3>${location.name}</h3>
                <p>${location.address}</p>
                <p><strong>Customer Group</strong></p>
              </div>
            `
          });

          marker.addListener('click', () => {
            infoWindow.open(mapInstance, marker);
          });
        });
    };

    const getMarkerColor = (type) => {
      const colors = {
        handcraft: 'blue',
        pottery: 'red',
        textile: 'green',
        woodwork: 'orange',
        candle: 'purple',
        customer: 'blue'
      };
      return colors[type] || 'blue';
    };

    const getTypeName = (type) => {
      const names = {
        handcraft: 'Traditional Handcraft',
        pottery: 'Pottery & Clay Art',
        textile: 'Weaving & Textile',
        woodwork: 'Woodworking',
        candle: 'Candle Making'
      };
      return names[type] || type;
    };

    loadGoogleMapsAPI();

    return () => {
      const script = document.querySelector('script[src*="maps.googleapis.com/maps/api"]');
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const focusOnLocation = (location) => {
    const mapInstance = viewMode === "sri-lanka" ? map : worldMap;
    if (mapInstance) {
      mapInstance.panTo({ lat: location.lat, lng: location.lng });
      mapInstance.setZoom(12);
    }
  };

  return (
    <div className="map-page">
      {/* Banner Section */}
      <div className="banner" style={{ 
        backgroundImage: `url(${viewMode === "sri-lanka" ? BannerImg : WorldBannerImg})` 
      }}>
        <div className="banner-overlay">
          <h1 className="fade-in">
            {viewMode === "sri-lanka" ? "Artisan Workshops Map" : "International Customers"}
          </h1>
          <p className="slide-in">
            {viewMode === "sri-lanka" 
              ? "Discover Sri Lanka's Traditional Crafts" 
              : "Our Global Customer Base"}
          </p>
        </div>
      </div>

      {/* View Toggle */}
      <div className="view-toggle">
        <button
          className={viewMode === "sri-lanka" ? "active" : ""}
          onClick={() => setViewMode("sri-lanka")}
        >
          Sri Lanka Workshops
        </button>
        <button
          className={viewMode === "world" ? "active" : ""}
          onClick={() => setViewMode("world")}
        >
          International Customers
        </button>
      </div>

      {/* Map Container */}
      <div className="map-container fade-up">
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
            <div>Loading map...</div>
          </div>
        )}
        
        {errorMsg ? (
          <div className="error-message">
            <p>{errorMsg}</p>
            <button onClick={() => window.location.reload()}>Try Again</button>
          </div>
        ) : (
          <>
            <div 
              id="sri-lanka-map" 
              className="google-map" 
              style={{ display: viewMode === "sri-lanka" ? "block" : "none" }}
            ></div>
            <div 
              id="world-map" 
              className="google-map" 
              style={{ display: viewMode === "world" ? "block" : "none" }}
            ></div>
          </>
        )}

        {viewMode === "sri-lanka" && (
          <div className="map-legend">
            <h3>Workshop Types</h3>
            <ul>
              <li><span className="legend-color blue"></span> Handcraft</li>
              <li><span className="legend-color red"></span> Pottery</li>
              <li><span className="legend-color green"></span> Textile</li>
              <li><span className="legend-color orange"></span> Woodwork</li>
              <li><span className="legend-color purple"></span> Candle Making</li>
            </ul>
          </div>
        )}
      </div>

      {/* Location List */}
      <div className="artisan-list fade-up">
        <h2>
          {viewMode === "sri-lanka" 
            ? "Featured Artisan Workshops" 
            : "Our International Customers"}
        </h2>
        <div className="artisan-grid">
          {artisanLocations
            .filter(loc => 
              viewMode === "sri-lanka" ? loc.type !== "customer" : loc.type === "customer"
            )
            .map(location => (
              <div key={location.id} className="artisan-card">
                <h3>{location.name}</h3>
                <p>{location.address}</p>
                <button 
                  className="view-on-map"
                  onClick={() => focusOnLocation(location)}
                >
                  View on Map
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Map;