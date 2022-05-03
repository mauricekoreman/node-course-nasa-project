const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IX1',
  launchDate: new Date('December 27, 2030'),
  target: 'Kepler-442 b',
  customers: ['ZTM', 'NASA'],
  upcoming: true,
  success: true,
}

launches.set(launch.flightNumber, launch);

function existLaunchWithId(launchId) {
  return launches.has(launchId);
}

function getAllLaunches() {
  return Array.from(launches.values());
}

function addnewLaunch(launch) {
  latestFlightNumber++;

  // setting the flightnumber as the key for this launch that we create in Object.assign. This takes the launch that we get from the user, that's getting passed down all the way into the model here, and we're adding a flightnumber prop that's set to the latestFlightNumber
  launches.set(
    latestFlightNumber, 
    Object.assign(launch, {
      success: true,
      upcoming: true,
      customers: ['Zero To Mastery', 'NASA'],
      flightNumber: latestFlightNumber
  }));
}

function abortLaunchById(launchId) {
  const aborted = launches.get(launchId);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

module.exports = {
  addnewLaunch,
  getAllLaunches,
  existLaunchWithId,
  abortLaunchById,
}