export const formatMapData = (mapData) => {
  const combinedMapData = {
    type: "FeatureCollection",
  }
  combinedMapData.features = mapData

  // console.log(combinedMapData)
  return combinedMapData
}
