// 'use strict';
const mongoose = require('mongoose');
module.exports = function(mongoUrl){
mongoose.Promise = global.Promise

mongoose.connection.on('error', function(err){
  console.log(err);
})
mongoose.connect(mongoUrl);

const shoesSchema = mongoose.Schema({
  color : String,
  brand : String,
  price : Number,
  size  : Number,
  in_stock : Number,
  image: String
});

shoesSchema.index({
  color : '',
  brand : '',
  price : '',
  size  : '',
  in_stock : ''
},
{unique:true});

const Shoes = mongoose.model('Shoes', shoesSchema);

return{
  Shoes
};
}
