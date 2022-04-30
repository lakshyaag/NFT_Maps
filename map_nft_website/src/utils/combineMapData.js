/** @dev Combine map data into a single GeoJSON block
    @param parsedData Array of map data
    @return Object containing polygon information with latitude and longtiude in a single GeoJSON block
     */
export const combineMapData = (parsedData) => {

  const combinedData = parsedData[0];

  for (var i = 1; i < parsedData.length; i++) {
    combinedData.features.push(parsedData[i].features[0]);
  }

  // console.log(combinedData)
  return combinedData;
};
