const mongoose = require('mongoose')

const clientSchema = mongoose.Schema({
    clientLastname: {type: String},
    clientFirstname: {type: String},
    clientFunction: {type: String},
    clientPhone: {type: String},
    clientEmail: {type: String},
    clientSociety: {type: String},
    clientFirstAddress: {type: String},
    clientSecondAddress: {type: String},
    clientPostalCode: {type: String},
    clientCity: {type: String},
    clientCountry: {type: String},
    clientAddDate: {type: Date}
})

module.exports = mongoose.model('client', clientSchema)