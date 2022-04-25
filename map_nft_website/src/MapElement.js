import Map, { Source, Layer } from "react-map-gl";

const fillLayer = {
  id: "fillLayer",
  type: "fill",
  paint: {
    "fill-color": "#c12234",
    "fill-opacity": 0.8,
  },
};

const MapElement = ({ nftBounds, textLayer }) => {
  return (
    <Map
      initialViewState={{
        longitude: 0.0,
        latitude: 0.0,
        zoom: 1,
      }}
      maxZoom={10}
      style={{ width: "100vw", height: "80vh" }}
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
