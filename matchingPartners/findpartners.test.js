const Test = require('./findpartners.js')

describe('Configuration', () => {
  test('consumer can change data source file', () => {
    expect(Test.configuration('./data/partners_one_less.json')).toBe(true);
    expect(Test.findPartners().length).toBe(1);
  })


  test('consumer will receive a false when data source file did not set', () => {
    expect(Test.configuration('./missing.json')).toBe(false);
  }) 
}) 

describe('Error Cases', () => {

  test('ignore Partner records with required missing fields and continue to process', () => {
    expect(Test.configuration('./data/corrupt.json')).toBe(true);
    expect(Test.findPartners().length).toBe(1);
  })


  test('process despite not finding any matches in data source', () => {
    expect(Test.configuration('./data/no_matches.json')).toBe(true)
    expect(Test.findPartners().length).toBe(0);
  })

  test('it should ignore data sources with longitude or latitude out of range', () => {
    expect(Test.configuration('./data/corrupt_coordinates.json')).toBe(true)
    expect(Test.findPartners().length).toBe(1); 
  })
});

describe('Success Cases', () => {
  test('finds partners within proximity of central London', () => {
    Test.configuration('./data/partners.json')
    var correct_result = [{
      "addresses": ["St Saviours Wharf, London SE1 2BE"],
      "name": "Blue Square 360"
    }, {
      "addresses": ["Newton House, Northampton Science Park, Moulton Park, Kings Park Road, Northampton, NN3 6LG", "No1 Royal Exchange, London, EC3V 3DG"],
      "name": "Gallus Consulting"
    }]
    expect(Test.findPartners()).toEqual([{
      "addresses": ["St Saviours Wharf, London SE1 2BE"],
      "name": "Blue Square 360"
    }, {
      "addresses": ["Newton House, Northampton Science Park, Moulton Park, Kings Park Road, Northampton, NN3 6LG", "No1 Royal Exchange, London, EC3V 3DG"],
      "name": "Gallus Consulting"
    }]);
  })

  test('matched partners should be sorted by company name', () => {
    Test.configuration('./data/partners.json')
    var result = Test.findPartners();
    expect(result[0].name < result[1].name).toBe(true);
  })
});