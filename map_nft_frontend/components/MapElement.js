import Map, { Source, Layer, Marker, Popup } from "react-map-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { useCallback, useMemo, useRef, useState } from "react"
import { getCentroids } from "../utils/getCentroids"
import Pin from "./Pin"

const MapElement = ({ nftBounds }) => {
  const [popupInfo, setPopupInfo] = useState(null)

  const mapRef = useRef()

  // const loadImages = useCallback(() => {
  //   if (nftBounds) {
  //     nftBounds.features.forEach((feature) => {
  //       // console.log("Loading ", feature.properties.image_url)
  //       try {
  //         mapRef.current.loadImage(
  //           feature.properties.image_url,
  //           (error, image) => {
  //             if (!error) {
  //               mapRef.current.addImage(feature.properties.image_id, image)
  //             }
  //           }
  //         )
  //       } catch (e) {
  //         console.error(e)
  //       }
  //     })
  //   }
  // }, [nftBounds])

  const markerPoints = getCentroids(nftBounds)

  const markers = useMemo(
    () =>
      markerPoints.map((markerInfo, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={markerInfo.geometry.coordinates[0]}
          latitude={markerInfo.geometry.coordinates[1]}
          anchor="top"
          pitchAlignment="map"
          onClick={(e) => {
            e.originalEvent.stopPropagation()
            setPopupInfo(markerInfo)
          }}
        >
          <Pin />
        </Marker>
      )),
    []
  )

  const geoJSON = {
    type: "geojson",
    data: nftBounds,
  }

  const colorLayer = {
    id: "colorLayer",
    type: "fill",
    source: geoJSON,
    paint: {
      "fill-color": "#9043ca",
      "fill-opacity": 0.5,
    },
  }

  // const symbolLayer = {
  //   id: "symbolLayer",
  //   type: "symbol",
  //   source: geoJSON,
  //   layout: {
  //     "icon-image": ["get", "image_id"],
  //     "icon-size": [
  //       "interpolate",
  //       ["exponential", 4],
  //       ["zoom"],
  //       1,
  //       0.2,
  //       3,
  //       0.3,
  //       5,
  //       0.75,
  //     ],
  //   },
  // }

  return (
    <Map
      ref={mapRef}
      // onLoad={loadImages}
      initialViewState={{
        latitude: 34.8951,
        longitude: -77.0364,
        zoom: 4,
      }}
      minZoom={3}
      // maxZoom={5}
      style={{ width: "100vw", height: "80vh" }}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <Source id="nft-data" type="geojson" data={nftBounds}>
        {markers}
        {popupInfo && (
          <Popup
            anchor="top"
            latitude={popupInfo.geometry.coordinates[1]}
            longitude={popupInfo.geometry.coordinates[0]}
            closeButton={false}
            onClose={() => setPopupInfo(null)}
          >
            {popupInfo.properties.image_url ? (
              <div className="flex flex-col text-center">
                <p className="text-lg">{popupInfo.properties.name}</p>
                <img src={popupInfo.properties.image_url} />
              </div>
            ) : (
              <div className="text-xl">No image added</div>
            )}
          </Popup>
        )}
        <Layer {...colorLayer} />
        {/* <Layer {...imageLayer} /> */}
        {/* <Layer {...symbolLayer} /> */}
      </Source>
    </Map>
  )
}

export default MapElement
