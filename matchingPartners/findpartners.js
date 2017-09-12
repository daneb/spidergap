'use strict';
var fs = require('fs');

const R = 6371.00;
const LONDON_LAT = 51.515419;
const LONDON_LONG = -0.141099;
const PROXIMITY = 100;
var SOURCE_FILE = "./data/partners.json";

function printMatchingPartnerReport() {
  var partnersMatched = findPartners();
  partnersMatched.forEach(function (partner) {
    process.stdout.write("Name: " + partner.name + "\n");
    partner.addresses.forEach(function (address) {
      process.stdout.write("Address: " + address + "\n");
    });
    process.stdout.write("\n");
  });
}

function findPartners() {
  var results = [];
  var partners = loadPartnersFromFile();

  partners.forEach(function (partner) {
    try {
      var found = findWithInProximity(partner.offices);
      if (found.length > 0) {
        results.push(buildResultObject(partner.organization, found));
      }
    } catch (e) {
      process.stderr.write("Failed to process record for " + partner.organization);
    }
  });

  return sortMatchedPartners(results);
}

function configuration(file) {
  try {
    if (fs.statSync(file)) {
      SOURCE_FILE = file;
      return true;
    }
  } catch (e) {
    return false;
  }
}

function sortMatchedPartners(results) {
  return results.sort((a, b) => a.name - b.name);
}

function buildResultObject(name, found) {
  var matching = {}
  matching.addresses = found;
  matching.name = name;
  return matching;
}

function findWithInProximity(companyOffices) {
  var matches = [];
  var distance;
  companyOffices.forEach(function (office) {
    if (isWithinProximity(office)) {
      matches.push(office.address);
    }
  });
  return matches;
}

function isWithinProximity(office) {
  var match = false;
  var officeCoords = getOfficeCoordinates(office.coordinates);
  var distance = havesine(officeCoords[0], officeCoords[1], LONDON_LAT, LONDON_LONG);
  if (distance < PROXIMITY) {
    match = true;
  }
  return match;
}

function getOfficeCoordinates(coordinates) {
  var location = coordinates.split(",", 2);
  var lat = parseFloat(location[0]);
  var long = parseFloat(location[1]);
  if (validLatitude(lat) && validLongitude(long)) {
    return [lat, long]
  }
  else {
    throw Error.new("Cordinates outside of range");
  }
}

function validLatitude(lat) {
  return (lat < 90 && lat > -90)
}

function validLongitude(long) {
  return (long < 180 && long > -180)
}

function loadPartnersFromFile() {
  var partners = fs.readFileSync(SOURCE_FILE, 'utf8');
  return JSON.parse(partners);
}

function havesine(lat1, long1, lat2, long2) {
  var dlon = long2 - long1
  var dlat = lat2 - lat1
  var a = calculate(dlat, lat1, lat2, dlon)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  var d = R * c
  return d
}

function rpd(degree) {
  return degree * (Math.PI / 180)
}

function calculate(dlat, lat1, lat2, dlon) {
  return (Math.sin(rpd(dlat) / 2)) ** 2 + Math.cos(rpd(lat1)) * Math.cos((rpd(lat2))) * (Math.sin(rpd(dlon) / 2)) ** 2
}

module.exports = {
  configuration,
  findPartners,
  printMatchingPartnerReport
};