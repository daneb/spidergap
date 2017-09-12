const deepClone = require('./deepclone.js')

test('clones an object', () => {
  var sample = {name: "Paddy"};
  expect(deepClone(sample)).toEqual(sample);
})

test('clones nested properties of the object', () => {
  var sample = {name: "Paddy", address: {town: "Lerum", country: "Sweden"}} 
  expect(deepClone(sample)).toEqual(sample);
})

test('clones are not references to original object', () => {
  var sample = {name: "Paddy", address: {town: "Lerum", country: "Sweden"}} 
  var sampleCopy = deepClone(sample);
  sampleCopy.name = "Dane";
  expect(sample.name).toBe("Paddy");
  expect(sampleCopy.name).toBe("Dane"); 
})

test('clones nested properties are not a reference to the original', () => {
  var sample = {name: "Paddy", address: {town: "Lerum", country: "Sweden"}} 
  var sampleCopy = deepClone(sample);
  sampleCopy.address.town = "Durbanville";
  expect(sample.address.town).toBe("Lerum");
  expect(sampleCopy.address.town).toBe("Durbanville");
})

test('accepts primitives', () => {
  var x = 10;
  expect(deepClone(x)).toBe(10);
})

test('accepts arrays', () => {
  var someArray = [0,1,2,3,4];
  expect(deepClone(someArray)).toEqual([0,1,2,3,4]);
})

// Notes
test('does not support circular references', () => {
})

test('is not a structured clone', () => {
})