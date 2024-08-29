const Units = require('../units')

function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    
    const error = 'invalid number'

    const numRegex = /[^a-z]+/gi

    // fraction/decimal regex
 // match 1 or more digits AT START (/^[0-9]+) AND 0 or 1 period (\.?) AND 0 or more digis ([0-9]*) AND '/' (\/) AND one or more digit ([0-9]+) AND 0 or one period (\.?) AND ENDS WITH 0 or more digits ([0-9]*$/)
    // OR (|)
    // one period at start (^\.) AND 1 or more digits ([0-9]+) AND '/' (\/) AND one period (\.) AND 1 or more digits END ([0-9]+$)
    const fractionRegex = /^[0-9]+\.?[0-9]*\/[0-9]+\.?[0-9]*$|^\.[0-9]+\/\.[0-9]+$/;
                      
    if (!input.match(numRegex)) return 1;

    let number = input.match(numRegex)[0]

    if (number.match(fractionRegex)) {
      let numbers = number.split('/')

      numbers[0] = parseFloat(numbers[0])
      numbers[1] = parseFloat(numbers[1])

      number = numbers[0] / numbers[1]
    }
   
    if (isNaN(number)) return error

    if (number < 0) return error

    result = parseFloat(number)

    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    const error = 'invalid unit'

    const units = Object.keys(Units)

    const unitRegex = /[a-z]+/gi

    if (!input.match(unitRegex)) return error

    let unit = input.match(unitRegex)[0].toLowerCase()

    if (unit == 'l') unit = unit.toUpperCase()

    if (!units.includes(unit)) return error

  result = unit

    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    
    
  
    return Units[initUnit].returnUnit;
  };

  this.spellOutUnit = function(unit) {
    
    return Units[unit].name
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch(initUnit){
      case 'gal': 
      result = initNum * galToL; 
      break; 
      case 'L': 
      result = initNum / galToL; 
      break; 
      case 'lbs': 
      result = initNum * lbsToKg; 
      break; 
      case 'kg': 
      result = initNum / lbsToKg; 
      break;
      case 'mi': 
      result = initNum * miToKm; 
      break; 
      case 'km': 
      result = initNum / miToKm
      break; 
      default: 
      result = 'conversion unsuccessful'
    }
    
    return parseFloat(parseFloat(result).toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}` ;
  };
  
}

module.exports = ConvertHandler;
