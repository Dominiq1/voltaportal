import React, { useRef, useEffect, useState } from "react";
import InstallModal from '../components/InstallModal'

function MultiColorMaps(props) {
  const mapRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    const googleMapsScript = document.createElement("script");
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDhac2BXCBGvV-83rge2CNOg3a0weXvDOo`;
    googleMapsScript.async = true;
    window.document.body.appendChild(googleMapsScript);

    googleMapsScript.addEventListener("load", () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 34.0407, lng: -118.2468 },
        zoom: 10,
      });

      props.markers.forEach((marker, index) => {
        const { position, label, address } = marker;

        // Determine the color based on the address
        let pinColor;
        switch (address) {
          case "Final Inspection":
            pinColor = "red";
            break;
          case "Voltaic Check":
            pinColor = "purple";
            break;
          case "Return Trip":
            pinColor = "green";
            break;
          case "Service Inspection":
            pinColor = "yellow";
            break;
          default:
            pinColor = "blue"; // Default color
        }

        const markerOptions = {
          position,
          map,
          label: {
            text: label.text,
            color: label.color,
          },
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: pinColor,
            fillOpacity: 0.8,
            strokeColor: 'black',
            strokeWeight: 2
          }
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
      });
    });
  }, [props]);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMarker(null);
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
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

export default MultiColorMaps;























// import React, { useRef, useEffect, useState } from "react";
// import { env } from "@/next.config";
// import bolt from "../public/images/bolt.png";
// //import Modal from "./Modal"; // Import your modal component
// import InstallModal from '../components/InstallModal'

// function MultiColorMaps(props) {
//   const mapRef = useRef(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedMarker, setSelectedMarker] = useState(null);
//   const [projectURL, setURL] = useState(null);

//   useEffect(() => {
//     const googleMapsScript = document.createElement("script");
//     googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDhac2BXCBGvV-83rge2CNOg3a0weXvDOo`;
//     googleMapsScript.async = true;
//     window.document.body.appendChild(googleMapsScript);

//     googleMapsScript.addEventListener("load", () => {
//       const map = new window.google.maps.Map(mapRef.current, {
//         center: { lat: 34.0407, lng: -118.2468 },
//         zoom: 10,
//       });

//       props.markers.forEach((marker, index) => {
//         const { position, label, image, projectURL,address } = marker;

//         const markerOptions = {
//           position,
//           address,
//           projectURL,
//           map,
//           label: {
//             text: label.text,
//             color: label.color,
//           },
//           icon: {
//             url: bolt.src,
//             scaledSize: new window.google.maps.Size(50, 50),
//           },
//         };

//         const mapMarker = new window.google.maps.Marker(markerOptions);

//         const tooltip = new window.google.maps.InfoWindow({
//           content: `<div>
//             <div>${label.text}</div>
//           </div>`,
//         });

//         mapMarker.addListener("mouseover", () => {
//           tooltip.open(map, mapMarker);
//         });

//         mapMarker.addListener("mouseout", () => {
//           tooltip.close();
//         });

//         mapMarker.addListener("click", () => {
//           setSelectedMarker(index);
//           setIsModalOpen(true);
//         });
//       });


//     });
//   }, [props]);

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedMarker(null);
//   };

//   return (
//     <div style={{ height: "100%", width: "100%" }}>
//       {isModalOpen && (
//         <InstallModal
//           content={`Modal content for marker ${selectedMarker}`}
//           onClose={closeModal}
//             projectURL={selectedMarker !== null ? props.markers[selectedMarker].projectURL : null}
     
//         />
//       )}
//       <div ref={mapRef} style={{ height: "100%", width: "100%" }} />
//     </div>
//   );
// }

// export default MultiColorMaps;

