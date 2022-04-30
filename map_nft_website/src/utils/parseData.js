/** @dev Transform coordinate data to GeooJSON format 
    @param data Token URI data
    @return Object containing polygon information with latitude and longtiude
*/
export const parseData = (data) => {
  const RESOLUTION = 1e9;

  let isWest = data.isWest.map((item) => (item === 0 ? 1 : -1));
  let isSouth = data.isSouth.map((item) => (item === 0 ? 1 : -1));

  const coords = data.features[0].geometry.coordinates[0].map(
    (point, index) => {
      return [
        (point[0] * isWest[index]) / RESOLUTION,
        (point[1] * isSouth[index]) / RESOLUTION,
      ];
    }
  );

  data.features[0].geometry.coordinates[0] = coords;

  delete data.isWest;
  delete data.isSouth;

  return data;
};
