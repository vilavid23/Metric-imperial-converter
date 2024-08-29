'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
   
   let input = req.query.input
   let initNum = convertHandler.getNum(input)
   let initUnit = convertHandler.getUnit(input)
   if (initUnit == 'invalid unit' && initNum == 'invalid number') {
    return res.status(200).send('invalid number and unit')} 
   
  if (initUnit == 'invalid unit') {
      return res.status(200).send('invalid unit')}
    
  if (initNum == 'invalid number') {
    return res.status(200).send('invalid number')}
    
   let returnNum = convertHandler.convert(initNum, initUnit)
   let returnUnit = convertHandler.getReturnUnit(initUnit)
   let string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
  
   res.json({
    initNum: initNum, 
    initUnit: initUnit,
    returnNum: returnNum,
    returnUnit: returnUnit,
    string: string
   })
    
  })
};
