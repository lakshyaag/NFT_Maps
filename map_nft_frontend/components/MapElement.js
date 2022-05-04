import Map, { Source, Layer } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

const MapElement = ({ nftBounds }) => {
  
  const geoJSON = {
    type: 'geojson',
    data: nftBounds
  }
  
  const fillLayer = {
    id: "fillLayer",
    type: "fill",
    source: geoJSON,
    paint: {
      "fill-color": "#907bdb",
      "fill-opacity": 0.8,
    },
  };

  const textLayer = {
    id: "textLayer",
    type: "symbol",
    source: geoJSON,
    layout: {
      "text-field": ['get', 'name'],
      "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
      "text-size": 8,
      "text-transform": "uppercase",
      "text-letter-spacing": 0.05,
    },
  };

  return (
    <Map
      initialViewState={{
        latitude: 38.8951,
        longitude: -77.0364,
        zoom: 3,
      }}
      maxZoom={10}
      style={{ width: "100vw", height: "80vh" }}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <Source id="nft-data" type="geojson" data={nftBounds}>
        <Layer {...fillLayer} />
        <Layer {...textLayer} />
      </Source>
    </Map>
  );
};

export default MapElement;