var keywords = "";
var priceMin = 0;
var priceMax = 1000;
var products;

$(function() {
  // When they hit search
  $( "#search" ).click(function() {
    $('.product').remove();
    keywords = $('#keywords').val();
    priceMin = $('#price_min').val();
    priceMax = $('#price_max').val();

    if(priceMax == "")
      priceMax = 1000000;

    if(checkInputs()) {
      productSearch();
    }
  });
});

function checkInputs() {
  if (keywords == "") {
    alert('Must include keywords')
    return false;
  }

  if (priceMax < priceMin) {
    alert('Maximum Price must be greater than min price');
    return false;
  }

  return true
}

function productSearch() {
  var url = "https://api.rewardstyle.com/v1/search?oauth_token=b0971cc14df1152194c7c9a4e72cf297&keywords="+keywords+"&priceMin="+priceMin+"&priceMax="+priceMax+"&limit=10";

  $('body').append("<h1 id='loading_notification'>Loading Products!</h1>");

  $.ajax({
      url: url,
      jsonp: "callback",
      dataType: "jsonp",
       success: function( response ) {
          $('#loading_notification').remove();
          products = response.products;
          displayProducts();
      }
  });
}

function displayProducts() {
  for(var i=0;i<products.length;i++) {
    var productName = products[i].product_name;
    var productPrice = products[i].price;
    var productImage = products[i].product_image;

    $('body').append(
      "<div class='product'>" +
        "<img class='product_image' src="+productImage+">" +
        "<div><p>$"+productPrice+" "+productName+"</p></div>" +
      "</div>"
      );
  }
}