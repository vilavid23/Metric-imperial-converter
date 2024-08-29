const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test('Get request for 10L', (done) => {
        const input = '10L'
        chai.request(server)
        .get(`/api/convert?input=${input}`)
        .end((err, res) => {
            if (err) console.log(err)
            assert.equal(res.status, 200)
            assert.equal(res.type, 'application/json')
            assert.equal(res.text, '{"initNum":10,"initUnit":"L","returnNum":2.64172,"returnUnit":"gal","string":"10 liters converts to 2.64172 gallons"}')
        })
        done();
    })
    test('Get error for 32g', (done) => {
        const input = '32g'

        chai.request(server)
        .get(`/api/convert?input=${input}`)
        .end((err, res) => {
            if (err) console.log(err)
            assert.equal(res.status, 200)
            assert.equal(res.type, 'text/html')
            assert.equal(res.text, 'invalid unit')
        })
        done();
    })
    test('3. Return error for invalid number', (done) => {
        const input = '3/7.2/4kg'

        chai.request(server)
        .get(`/api/convert?input=${input}`)
        .end((err, res) => {
            if (err) console.log(err)
            assert.equal(res.status, 200)
            assert.equal(res.type, 'text/html')
            assert.equal(res.text, 'invalid number')
        })
        done();
    })
    test('4. return error for invalid number AND unit', (done) => {
         const input = '3/7.2/4kilomegagram'
         chai.request(server)
         .get(`/api/convert?input=${input}`)
         .end((err, res) => {
             if (err) console.log(err)
             assert.equal(res.status, 200)
             assert.equal(res.type, 'text/html')
             assert.equal(res.text, 'invalid number and unit')
             done();
            })
        })
    test('5. Convert with no number', (done) => {
        let input = 'lbs'

        chai.request(server)
        .get(`/api/convert?input=${input}`)
        .end((err, res) => {
            if (err) console.log(err)
            assert.equal(res.status, 200)
            assert.equal(res.type, 'application/json')
            assert.equal(res.text, '{"initNum":1,"initUnit":"lbs","returnNum":0.45359,"returnUnit":"kg","string":"1 pounds converts to 0.45359 kilograms"}')
            done();
        })
    }) 
    

   

   
});
