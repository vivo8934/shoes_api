'use strict';
var AllShoes = document.querySelector('.allShoes');
var MyTemp = document.querySelector('.Template');
var colorDrop = document.querySelector('.TemplateDrop').innerHTML;
var displayColor = document.querySelector('.myColor')
var sizeDrop = document.querySelector('.SizeDrop').innerHTML;
var search = document.querySelector('.myBtn')

var TempInstance = Handlebars.compile(MyTemp.innerHTML);
var ColorInstance = Handlebars.compile(colorDrop);
var SizeInstance = Handlebars.compile(sizeDrop);

$(document).ready(function(){
  console.log("loading");
$.ajax({
  url: 'http://localhost:4500/api/shoes',
  type: 'GET',
  success: function(data){
    AllShoes.innerHTML = TempInstance({
      shoes : data.stock
    });
    var colorMap = {};
    var colors = [];
    var sizes = [];
    var sizeMap = {};
let stock = data.stock;

for(var i=0; i< stock.length; i++){
  var data = stock[i]

  if(colorMap[data.brand] === undefined){
    colorMap[data.brand] = data.brand;
    colors.push(data.brand);
  }
  if(sizeMap[data.size] === undefined){
    sizeMap[data.size] = data.size;
    sizes.push(data.size);
  }
}

var display = colors.sort();
document.querySelector('.myColor').innerHTML = ColorInstance({
  shoes : display
});
 var output = sizes.sort();
// console.log(output);
 document.querySelector('.DSize').innerHTML = SizeInstance({
   shoes : output
 });
  }
});
$('.enter').on('click', function(){
  var Color = document.querySelector('.ColorName').value;
  var Brand = document.querySelector('.brandName').value;
  var Price = document.querySelector('.PriceName').value;
  var Size = document.querySelector('.sizeName').value;
  var Stock = document.querySelector('.stockName').value;

var myData = {
  color : Color,
  brand : Brand,
  price : Price,
  size :  Size,
  in_stock : Stock
}

//console.log(myData);
$.ajax({
  url: 'http://localhost:4500/api/shoes',
  type: 'POST',
  data: myData,
  dataType: 'application/json',
  success: function(result){
    console.log(result);
  AllShoes.innerHTML = TempInstance({
    shoes : newData.myData
  });
  }
})
window.location.reload();
});

$('.container').on('change', function(e){
var brand = document.querySelector('.myColor').value;
var size = document.querySelector('.DSize').value;
var allShoes = document.querySelector('.allShoes');
console.log(brand);
console.log(size);
if (brand !== 'selector brand' && size !== 'selector size') {
 $.ajax({
   url: '/api/shoes/brand/'+brand+'/size/'+size,
   type: 'GET',
   success: function(myData){
     console.log(myData);
     AllShoes.innerHTML = TempInstance({
       shoes : myData.data
     });
   }
 })
} else if(brand !== 'selector brand' && size === 'selector size'){
  $.ajax({
    url: '/api/shoes/brand/' + brand,
    type: 'GET',
    success: function(filteredBrand){
      console.log(filteredBrand);
        AllShoes.innerHTML = TempInstance({
          shoes : filteredBrand.newBrand
        });
    }
  })
}
 else  if(size !== 'selector size' && brand === 'selector brand'){
   $.ajax({
     url: '/api/shoes/size/' + size,
     type: 'GET',
     success: function(filteredSize){
       console.log(filteredSize);
       allShoes.innerHTML = TempInstance({
         shoes : filteredSize.sizes
       });
     }
   })
 }

})

$('.allShoes').on('click', function(e) {
  //alert('my sold items')
  var _id = e.target.id;
  console.log(_id);
  $.post({
    url: '/api/shoes/sold/' + _id,
    type: 'POST',
    success: function(purchased) {
      allShoes.innerHTML = TempInstance({
        shoes: purchased
      });
    }
  })
  window.location.reload();
  //myData.success();
})
})
