var products = [ 
    {  
     "id": 1,    "name": "Apple TV",    "price": 249.99,  
   }, 
   {  
     "id": 2,    "name": "Canon EOS 5D Mark II",    "price": 2999.99, 
   },  

   {  
     "id": 3,    "name": "Nikon D7000",    "price": 549.99, 
    },  
   {    
   "id": 4,    "name": "Canon PowerShot SD1300",    "price": 299.99,  
   }, 
   {   
    "id": 5,    "name": "Portable",    "price": 699.99, 
   }
   ];
$(document).ready(function() {
   // Récupérez les données du local storage et créez un objet panier vide
   var products = JSON.parse(localStorage.getItem('products'));
   var cart = {};
   
   // Si le panier est vide, affiche le titre et le message d'avertissement
   if (products.length == 0) {
     $('h1').text('Panier');
     $('main').append('<p>Aucun produit dans le panier.</p>');
   }
   // Si le panier n'est pas vide, ajoutez chaque produit au panier
   else {
     // Parcourez chaque produit du tableau products
     for (var i = 0; i < products.length; i++) {
       var product = products[i];
       
       // Si le produit courant existe déjà dans le panier, mettez à jour la quantité et le prix
       if (product.name in cart) {
         var row = cart[product.name];
         var quantity = parseInt(row.find('.col:nth-child(2)').text()) + 1;
         var price = parseFloat(row.find('td:nth-child(3)').text().replace(/[^\d.]/g, ''));
         row.find('.col:nth-child(2)').text(quantity);
         row.find('td:nth-child(5)').text((quantity * price).toFixed(2) + ' $');
       }
       // Si le produit courant n'existe pas dans le panier, ajoutez un nouveau tr
       else {
           // Créez un nouveau tr et ajoutez-le à tbody
           var row = $('<tr>');
           row.append('<td><button title="Supprimer"><i class="fa fa-times"></i></button></td>');
           row.append('<td><a href="./product.html">' + product.name + '</a></td>');
           row.append('<td>' + product.price + '$</td>');
           row.append('<td><div class="row">\
           <div class="col">\
           <button title="Retirer" disabled=""><i class="fa fa-minus">\
           </i></button></div>\
           <div class="col">1</div>\<div class="col"><button title="Ajouter"><i class="fa fa-plus"></i></button></div></div></td>');
           row.append('<td>' + product.price + '$</td>');
           $('tbody').append(row);
           // Ajoutez le produit courant à l'objet panier
           cart[product.name] = row;
         }
       }
       $('tbody tr').sort(function(a, b) {
           var aText = $(a).find('td:nth-child(2) a').text().toUpperCase();
           var bText = $(b).find('td:nth-child(2) a').text().toUpperCase();
           return (aText < bText) ? -1 : (aText > bText) ? 1 : 0;
         }).appendTo('tbody');
         
       // Lorsque le bouton de suppression de quantité est cliqué
       $('.remove-quantity-button').click(function() {
           // Récupère la quantité actuelle de l'item
           var quantity = $(this).closest('.row').find('.quantity').text();
           // Si la quantité est supérieure à 1, décrémente de 1
           if (quantity > 1) {
             quantity--;
             $(this).closest('.row').find('.quantity').text(quantity);
             // Met à jour le prix de l'item en fonction de la nouvelle quantité
             var price = $(this).closest('tr').find('td:nth-child(3)').text().replace(/[^\d.]/g, '');
             $(this).closest('tr').find('td:nth-child(5)').text((price * quantity).toFixed(2) + ' $');
             updateTotalAmount();
           }
           // Si la quantité est égale à 1, désactive le bouton de suppression de quantité
           else {
             $(this).prop('disabled', true);
           }
       // Lorsque le bouton d'ajout de quantité est cliqué
       $('.add-quantity-button').click(function() {
           // Récupère la quantité actuelle de l'item
           var quantity = $(this).closest('.row').find('.quantity').text();
           // Incrémente la quantité de 1
           quantity++;
           $(this).closest('.row').find('.quantity').text(quantity);
           // Met à jour le prix de l'item en fonction de la nouvelle quantité
           var price = $(this).closest('tr').find('td:nth-child(3)').text().replace(/[^\d.]/g, '');
           $(this).closest('tr').find('td:nth-child(5)').text((price * quantity).toFixed(2) + ' $');
           updateTotalAmount();
           // Active le bouton de suppression de quantité si nécessaire
           $(this).closest('.row').find('.remove-quantity-button').prop('disabled', false);
         });
       // Lorsque le bouton de suppression de tous les produits est cliqué
       $('#remove-all-items-button').click(function() {
           // Affiche une fenêtre de confirmation
           if (confirm("Voulez-vous supprimer tous les produits du panier?")) {
             // Supprime tous les produits du panier
             $('tbody tr').remove();
             // Supprime tous les produits du local storage
             localStorage.removeItem('products');
             // Affiche le titre et le message d'avertissement
             $('h1').text('Panier');
             $('main').append('<p>Aucun produit dans le panier.</p>');
             // Met à jour le montant total
             updateTotalAmount();
           }
       // Lorsqu'un bouton de suppression d'un item est cliqué
       $('.remove-item-button').click(function() {
           // Récupère l'ID du produit à partir de l'attribut "data-product-id" du bouton
           var productId = $(this).data('product-id');
           // Affiche une fenêtre de confirmation
           if (confirm("Voulez-vous supprimer le produit du panier?")) {
             // Supprime le produit du panier
             $(this).closest('tr').remove();
             // Supprime le produit du local storage
             var products = JSON.parse(localStorage.getItem('products'));
             products = products.filter(function(product) {
               return product.id !== productId;
             });
             localStorage.setItem('products', JSON.stringify(products));
             // Si le panier est vide après la suppression, affiche le titre et le message d'avertissement
             // Si le panier est vide après la suppression, affiche le titre et le message d'avertissement
       if ($('tbody tr').length == 0) {
           $('h1').text('Panier');
           $('main').append('<p>Aucun produit dans le panier.</p>');
         } }
       });
 
 });
 
 
 });
 
   }
})    
function updateTotalAmount() {
   var totalAmount = 0;
   $('.price').each(function() {
     totalAmount += parseFloat($(this).text().replace(/[^\d.]/g, ''));
   });
   $('#total-amount').text(totalAmount.toFixed(2) + ' $');
 }
 
 // Appelez la fonction updateTotalAmount lorsque vous ajoutez un nouveau produit au panier
 updateTotalAmount();