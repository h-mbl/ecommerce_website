$(document).ready(function() {
  let product = JSON.parse(localStorage.getItem('product'));

  $('#product-image').attr('src', './assets/img/' + product.image);
  $('h1').html(product.name);
  $('#description').html(product.description);
  let caract = '';
  for (let feature of product.features) {
    caract += '<li>' + feature + '</li>';
  }
  $('#caract').html(caract);
  $('#price').html('Prix: <strong>'+product.price +'&thinsp;$</strong>');
});

$('#ajouterPanier').click(function(){
   var qtePanier =localStorage.getItem('panier')
   qtePanier += 1
   localStorage.setItem('panier',qtePanier)  
});