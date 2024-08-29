const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');
const Units = require('../units.js')

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    suite('Function: convertHandler.get(input)', () => {
        test('1. Correctly reads whole number input', (done) => {
            let input = '33mi'
            assert.equal(convertHandler.getNum(input), 33)
            done();
        })
        test('2. Correctly read decimal', (done) => {
            let input = '3.3mi'
            assert.equal(convertHandler.getNum(input), 3.3)
            done();
        })
        test('3. Correctly read fraction', (done) => {
            let input = '3/3mi'
            assert.equal(convertHandler.getNum(input), 3/3)
            done();
        })
        test('4. Correctly read fraction with decimal', (done) => {
            let input = '3/3.1mi'
            assert.equal(convertHandler.getNum(input), 3/3.1)
            done();
        })
        test('5. Correctly return error on double fraction', (done) => {
            let input = '3/3/3'
            assert.equal(convertHandler.getNum(input), 'invalid number')
            done();
        })
        test('6. Default 1 on empty input', (done) => {
            let input = 'mi'
            assert.equal(convertHandler.getNum(input), 1)
            done();
        })
    })
    suite('Function converHandler.getUnit(input)', () => {
        test('7. Correctly read each valid input', (done) => {
            let validUnit = Object.keys(Units)
            
            validUnit.forEach(unit => {
                assert.equal(convertHandler.getUnit(`12${unit}`), unit)
            })
            done();
        })
        test('8. Return error for invalid unit', (done) => {
            let input = 'ccc'
            assert.equal(convertHandler.getUnit(input), 'invalid unit')
            done();
        })
    })
    suite('Function convertHandler.getReturnUnit(input)', () => {
        test('9. Return correct return unit', (done) => {
            let validUnits = Object.keys(Units)
            
            validUnits.forEach(unit => {
                assert.equal(convertHandler.getReturnUnit(unit), Units[unit].returnUnit)
            })
            done();
        })
    })
    suite('Function convertHandler.spellOutUnit(unit)', () => {
        test('10. Correctly return the spelled out string for each valid unit', (done) => {
            let validUnits = Object.keys(Units)

            validUnits.forEach(unit => {
                assert.equal(convertHandler.spellOutUnit(unit), Units[unit].name)
            }
            )
            done();
        })
    })
    suite('Function getHandler.convert(input)', () => {
        test('11. conver gal to L', (done) => {
            let initNum = '1'
            let initUnit = 'gal'
            assert.equal(convertHandler.convert(initNum, initUnit), '3.78541')
            done();
        })
        test('12. Convert L to gal', (done) => {
            let initNum = '3.78541'
            let initUnit = 'L'
            assert.equal(convertHandler.convert(initNum, initUnit), 1)
            done();
        })
        test('13. Convert mi to km', (done) => {
            let initNum = '1'
            let initUnit = 'mi'
            assert.equal(convertHandler.convert(initNum, initUnit), 1.60934)
            done();
        })
        test('14. Convert km to mi', (done) => {
            let initNum = '1.60934'
            let initUnit = 'km'
            assert.equal(convertHandler.convert(initNum, initUnit), 1)
            done();
        })
        test('15. Convert lbs to kg', (done) => {
            let initNum = '1'
            let initUnit = 'lbs'
            assert.equal(convertHandler.convert(initNum, initUnit),  0.45359)
            done();
        })
        test('16. Convert kg to lbs', (done) => {
            let initNum = '0.45359'
            let initUnit = 'kg'
            assert.equal(convertHandler.convert(initNum, initUnit),  1)
            done();
        })
        
    })
});