const mongoose = require('mongoose')

const homeSchema = new mongoose.Schema({
    sure: {
        type: Number
    }
})


module.exports = mongoose.model('Home', homeSchema)