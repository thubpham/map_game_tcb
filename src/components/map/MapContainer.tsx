// src/components/map/MapContainer.tsx
import { MapContainer as LeafletMap, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import PointOfInterestMarker from './PointOfInterestMarker';
import type { PointOfInterest } from '../../types';

// Component to handle map view changes
const MapUpdater = ({ center }: { center: [number, number] }) => {
    const map = useMap();
    map.setView(center, map.getZoom());
    return null;
}

interface MapContainerProps {
  center: [number, number];
  pointsOfInterest: PointOfInterest[];
  selectedChallengeId: string | null;
}

const MapContainer = ({ center, pointsOfInterest, selectedChallengeId }: MapContainerProps) => {
  return (
    <LeafletMap center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
      <MapUpdater center={center} />
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>'
      />
      {pointsOfInterest.map(poi => (
        <PointOfInterestMarker key={poi.id} poi={poi} selectedChallengeId={selectedChallengeId} />
      ))}
    </LeafletMap>
  );
};

export default MapContainer;
