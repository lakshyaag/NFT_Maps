export const convert = (coordinates) => {
    const RESOLUTION = 1e9;
  
    let isWest = coordinates.long < 0;
    let isSouth = coordinates.lat < 0;
  
    return {
      long: Math.abs(coordinates.long) * RESOLUTION,
      lat: Math.abs(coordinates.lat) * RESOLUTION,
      isWest: isWest === true ? 1 : 0,
      isSouth: isSouth === true ? 1 : 0,
    };
  };