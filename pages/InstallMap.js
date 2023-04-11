import { useState } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function InstallMap() {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };

  const [mapOptions, setMapOptions] = useState({
    bootstrapURLKeys: { key: 'AIzaSyDhac2BXCBGvV-83rge2CNOg3a0weXvDOo' },
    defaultCenter: defaultProps.center,
    defaultZoom: defaultProps.zoom
  });

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <GoogleMapReact {...mapOptions} style={{ height: '100%', width: '100%' }}>
        <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
}
