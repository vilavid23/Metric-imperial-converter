const units = {
    lbs: {
        name: 'pounds', 
        returnUnit: 'kg'
    }, 
    kg: {
        name: 'kilograms', 
        returnUnit: 'lbs'
    }, 
    gal: {
        name: 'gallons', 
        returnUnit: 'L'
    },
    L: {
        name: 'liters', 
        returnUnit: 'gal'
    }, 
    mi: {
        name: 'miles', 
        returnUnit: 'km'
    }, 
    km: {
        name: 'kilometers',
        returnUnit: 'mi' 
    }
}
module.exports = units