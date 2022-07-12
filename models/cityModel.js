const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema({
  name: {
    type: String,
    required: true
  }, 
  info: {
    type: String,
    required: true
  }
}, {timestamps: true});

const CityModel = mongoose.model('City', citySchema);

module.exports = CityModel;