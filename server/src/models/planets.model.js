const fs = require("fs");
const path = require('path');
const { parse } = require('csv-parse');

const planets = require("./planets.mongo");

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, "..", "..", "data", "kepler_data.csv"))
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
        if (isHabitablePlanet(data)) {
          savePlanet(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", async () => {
        const countPlanetsFound = (await getAllPlanets()).length;
        console.log(`${countPlanetsFound} habitable planets found!`);
        resolve();
      });
  });
}

async function getAllPlanets() {
  return await planets.find(
    {},
    {
      // Here we are excluding these values in our query
      __v: 0,
      _id: 0,
    }
  );
}

async function savePlanet(planet) {
  try {
    // inserts only when doesn't already exists, otherwise updates = upsert
    await planets.updateOne(
      {
        keplerName: planet.kepler_name, // finds document with keplerName = data.kepler_name
      },
      {
        keplerName: planet.kepler_name, // inserts this data, and if already existing, updates instead because upsert=true
      },
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.error(`Could not save planet, ${err}`);
  }
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
}