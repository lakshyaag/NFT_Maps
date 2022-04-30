// Deprecated, do not use
export const parseTextLayer = (data) => {
  const textLayer = {
    id: "textLayer",
    type: "symbol",
    layout: {
      "text-field": data.features[0].properties.name ?? "N/A",
      "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
      "text-size": 8,
      "text-transform": "uppercase",
      "text-letter-spacing": 0.05,
    },
  };

  return textLayer
};
