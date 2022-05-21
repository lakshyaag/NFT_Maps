import centroid from "@turf/centroid"

export const getCentroids = (coords) => {
  let centroids = []
  coords.features.map((coord, index) => {
    centroids.push(centroid(coord))
    centroids[index].properties = coord.properties
  })

  return centroids
}
