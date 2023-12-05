import React, { useRef, useEffect, useState } from "react";
import InstallModal from "../components/InstallModal";

// Define color options
const colorOptions = [
  { color: 'green', label: '<1 week' },
  { color: 'yellow', label: '2 weeks' },
  { color: 'orange', label: '1 month' },
  { color: 'red', label: '2 months+' },

  // Add more colors as needed
];

// Filter button component
function FilterButton({ color, label, isSelected, onClick }) {
  const buttonStyles = {
    backgroundColor: isSelected ? `${color}Light` : 'white',
    color:'black',
    fontWeight: 'bold',
    padding: 8,
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#f0f0f0',
    },
  };

  return (
    <button onClick={() => onClick(color)} style={buttonStyles}>
      {label}
    </button>
  );
}

function PermitInstallMaps(props) {
  const mapRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    const loadMap = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 34.0407, lng: -118.2468 },
        zoom: 10,
        gestureHandling: "cooperative", // Enable single-finger scroll
      });

      const filteredMarkers = selectedColor
        ? props.markers.filter((marker) => marker.color === selectedColor)
        : props.markers;

      const newMarkers = filteredMarkers.map((marker, index) => {
        const { position, label, projectURL } = marker;

        const markerOptions = {
          position,
          projectURL,
          map,
          label: {
            text: label.text,
            color: label.color,
          },
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: label.color,
            fillOpacity: 1,
            scale: 10,
            strokeWeight: 0,
          },
        };

        const mapMarker = new window.google.maps.Marker(markerOptions);

        const tooltip = new window.google.maps.InfoWindow({
          content: `<div>
            <div>${label.text}</div>
          </div>`,
        });

        mapMarker.addListener("mouseover", () => {
          tooltip.open(map, mapMarker);
        });

        mapMarker.addListener("mouseout", () => {
          tooltip.close();
        });

        mapMarker.addListener("click", () => {
          setSelectedMarker(index);
          setIsModalOpen(true);
        });

        return mapMarker;
      });

      // Center map based on new markers
      if (newMarkers.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        newMarkers.forEach((marker) => {
          bounds.extend(marker.getPosition());
        });
        map.fitBounds(bounds);
      }
    };

    if (window.google && window.google.maps) {
      loadMap();
    } else {
      const googleMapsScript = document.createElement("script");
      googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDhac2BXCBGvV-83rge2CNOg3a0weXvDOo`;
      googleMapsScript.async = true;
      googleMapsScript.onload = loadMap;
      window.document.body.appendChild(googleMapsScript);
    }
  }, [props, selectedColor]);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMarker(null);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color === selectedColor ? null : color);
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      {/* Filter buttons for colors */}
      <div style={{ display: 'flex', gap: 2 }}>
        {colorOptions.map(({ color, label }) => (
          <FilterButton
            key={color}
            color={color}
            label={label}
            isSelected={selectedColor === color}
            onClick={handleColorChange}
          />
        ))}
      </div>

      {isModalOpen && (
        <InstallModal
          content={`Modal content for marker ${selectedMarker}`}
          onClose={closeModal}
          projectURL={selectedMarker !== null ? props.markers[selectedMarker].projectURL : null}
        />
      )}

      <div ref={mapRef} style={{ height: "100%", width: "100%" }} />
    </div>
  );
}

export default PermitInstallMaps;


