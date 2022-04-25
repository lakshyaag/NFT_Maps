export const combineMapData = (parsedData) => {

  const colors = ['red', 'green', 'blue', 'orange', 'yellow'];
  const combinedData = parsedData[0];

  for (var i = 1; i < parsedData.length; i++) {
    combinedData.features.push(parsedData[i].features[0]);
  }

  combinedData.features.forEach((feature) => {
    let color = colors[Math.floor(Math.random() * colors.length)];
    feature.properties['color'] = color
  });

  console.log(combinedData)
  return combinedData;
};
