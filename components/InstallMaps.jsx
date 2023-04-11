import React, { useRef, useEffect } from "react";
import { env } from "@/next.config";

function InstallMaps() {
  const mapRef = useRef(null);

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

      const markers = [
        {
          color: "red",
          position: { lat: 34.043, lng: -118.267 },
          label: {
            text: "Staples Center",
            color: "white",
          },
          image: {
            url: "https://example.com/staples-center-image.jpg",
            alt: "Staples Center image",
          },
        },
        {
          color: "blue",
          position: { lat: 32.7076, lng: -117.1570 },
          label: {
            text: "Petco Park",
            color: "white",
          },
          image: {
            url: "https://example.com/petco-park-image.jpg",
            alt: "Petco Park image",
          },
        },
      ];

      markers.forEach((marker) => {
        const { color, position, label, image } = marker;

        const markerOptions = {
          position,
          map,
          label: {
            text: label.text,
            color: label.color,
          },
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: color,
            fillOpacity: 1,
            strokeWeight: 0,
            scale: 10,
          },
        };

        const mapMarker = new window.google.maps.Marker(markerOptions);

        const tooltip = new window.google.maps.InfoWindow({
          content: `<div>
            <img src="${image.url}" alt="${image.alt}" style="max-width: 100%; height: auto;"/>
            <div>${label.text}</div>
          </div>`,
        });

        mapMarker.addListener("mouseover", () => {
          tooltip.open(map, mapMarker);
        });

        mapMarker.addListener("mouseout", () => {
          tooltip.close();
        });
      });
    });
  }, []);

  return <div style={{ height: "100%", width: "100%" }} ref={mapRef} />;
}

export default InstallMaps;










// import React, { useRef, useEffect } from "react";
// import { env } from "@/next.config";

// function InstallMaps() {
//   const mapRef = useRef(null);

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

//       const staplesCenterMarker = new window.google.maps.Marker({
//         position: { lat: 34.043, lng: -118.267 },
//         map,
//         title: "Staples Center",
//       });

//       const petcoParkMarker = new window.google.maps.Marker({
//         position: { lat: 32.7076, lng: -117.1570 },
//         map,
//         title: "Petco Park",
//       });
//     });
//   }, []);

//   return (
//     <div
//       style={{ height: "100%", width: "100%" }}
//       ref={mapRef}
//     />
//   );
// }

// export default InstallMaps;
