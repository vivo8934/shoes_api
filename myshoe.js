'use strict';

module.exports = function(models){
const allStock = function(req, res, next){
models.Shoes.find({}, function(err, stock){
  if(err){
    return next(err);
  }
  res.json({
  stock
  });
});
};

const certainBrand = function(req, res, next){
 var brandName = req.params.brandname;
 models.Shoes.find({
   brand : brandName
 },function(err, newBrand){
  if(err){
    return next(err);
  }
  console.log(newBrand);
  res.json({
    newBrand
  });
});
};

const size = function(req, res, next) {
  var shoeSize = req.params.size;
  models.Shoes.find({
    size: shoeSize
  }, function(err, sizes) {
    if (err) {
      return next(err)
    }
    res.json({
      sizes
    });
  });
}
const filter = function(req, res){
var brandName = req.params.brandname;
var shoeSize = req.params.size;

models.Shoes.find({
  brand : brandName,
  size: shoeSize
}, function(err, data){
  if (err) {
    return next(err);
  }
  res.json({
    data
  });
});
}

const update = function(req, res){

// var getId = req.params.id;
//
// models.Shoes.findOneandUpdate({
//   _id : ObjectId(getId)
// }, function())
}

const newStock = function(req, res, next){

var newShoe = req.body;
// console.log(newShoe);
models.Shoes.create({
      Id: newShoe.Id,
      color: newShoe.color,
      brand: newShoe.brand,
      price: newShoe.price,
      size: newShoe.size,
      in_stock: newShoe.in_stock
}, function(err, newData){
  if (err) {
    if(err.code === 11000){
    }
    else{
      return next(err);
    }
  }

  // console.log(newStocks);
  res.send(newData);
});
}

  return {
    allStock,
    certainBrand,
    size,
    filter,
    update,
    newStock
  }
}
