export const combineMapData = (parsedData) => {

  const combinedData = parsedData[0];

  for (var i = 1; i < parsedData.length; i++) {
    combinedData.features.push(parsedData[i].features[0]);
  }

  // console.log(combinedData)
  return combinedData;
};
