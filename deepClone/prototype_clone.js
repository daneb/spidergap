// Sample
var sample = {name: "Paddy", address: {town: "Lerum", country: "Sweden"}}

// The Problem
console.log("--Assignment--")
var test = sample;
console.log(test);

test.name = "Dane";
console.log(test);
console.log(sample);

// JSON
console.log("--JSON--")
var sample = {name: "Paddy", address: {town: "Lerum", country: "Sweden"}}
var jsonTest = JSON.parse(JSON.stringify(sample));
jsonTest.name = "Dane";
console.log(jsonTest);
console.log(sample);
// Nested Object Test
jsonTest.address.country = "South Africa";
console.log(jsonTest);
console.log(sample);


// Object.create
console.log("--Create--")
var sample = {name: "Paddy", address: {town: "Lerum", country: "Sweden"}}
var createTest = Object.create(sample);
createTest.name = "Dane";
console.log(createTest);
console.log(sample);

// Object.assign
console.log("--ObjectAssign--")
var sample = {name: "Paddy", address: {town: "Lerum", country: "Sweden"}}
var assignTest = Object.assign({}, sample);
console.log(assignTest);
assignTest.name = "Dane";
console.log(assignTest);
console.log(sample);
// Nested Object Test
assignTest.address.country = "South Africa";
console.log(assignTest);
console.log(sample);



