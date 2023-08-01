//a modifier
//js
var nbrItemPanier = localStorage.getItem('panier')

function gestionnaireBadge() {
    var shoppingCartBadge = $('.shopping-cart > .count');
    if  (nbrItemPanier == 0) {
      shoppingCartBadge.hide();
      $('.shopping-cart-total').hide();
      $('.btnpull-right').hide();
      $('.btnviderpanier').hide();

      var element = $('.table-shopping-cart-table');
      var nouveaucontenu = $('<p>Aucun produit dans le panier</p>');
      element.replaceWith(nouveaucontenu);
    }
    else {
      shoppingCartBadge.show();
      shoppingCartBadge.text (nbrItemPanier);
    }
  }
  $(document).ready(function() {
    gestionnaireBadge();
  });
