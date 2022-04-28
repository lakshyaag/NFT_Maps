const turf = require("@turf/turf")
const fs = require('fs');

const polygons = turf.randomPolygon(500, { bbox: [-170, -60, 170, 60], num_vertices: 4, max_radial_length: 6 })

// polygons.features.forEach(p => {
//     let coord = p.geometry.coordinates[0].map(x => {
//         return {
//             'long': x[0],
//             'lat': x[1]
//         }
//     })
//     //   console.log(coord);
// });

let indexRemove = [];

for (let i = 0; i < polygons.features.length; i++) {
    for (let j = 0; j < polygons.features.length; j++) {
        if (i !== j) {
            if (turf.booleanOverlap(polygons.features[i], polygons.features[j])) {
                indexRemove.push(i, j);
                // console.log(i, polygons.features[i].geometry.coordinates, j, polygons.features[j].geometry.coordinates)
            }
        }
    }
}

indexRemove = [... new Set(indexRemove)]

const uniquePolygons = polygons.features.filter((p, index) => !indexRemove.includes(index));

let uniquePolygonsCollection = {
    "type": "FeatureCollection",
    "features": uniquePolygons
}

uniquePolygonsCollection = turf.sample(uniquePolygonsCollection, 100);

uniquePolygonsCollection.features = uniquePolygonsCollection.features.map((f) => {
    f = turf.convex(f)
    return f;
})

fs.writeFileSync("utils/uniquePoly.json", JSON.stringify(uniquePolygonsCollection));