$(document).ready(function() {
  localStorage.setItem('order',0)
  localStorage.setItem('order', JSON.stringify(order));
  $('#formulaire').validate({
    rules: {
      firstName: {
        required: true,
        minlength: 2
      },
      lastName: {
        required: true,
        minlength: 2
      },
      email: {
        required: true,
        email: true
      },
      creditCard: {
        required: true
      },
      phone: {
        required: true,
        phoneUS: true
      },
      creditCardExpiry: {
        required: true
      }
    },
    messages: {
      firstName: {
        required: "Veuillez fournir votre prénom",
        minlength: "Votre prénom doit comporter au moins 2 caractères"
      },
      lastName: {
        required: "Veuillez fournir votre nom de famille",
        minlength: "Votre nom de famille doit comporter au moins 2 caractères"
      },
      email: {
        required: "Veuillez fournir votre adresse email",
        email: "Veuillez fournir une adresse email valide"
      },
      creditCard: {
        required: "Veuillez fournir votre numéro de carte de crédit"
      },
      phone: {
        required: "Veuillez fournir votre numéro de téléphone",
        phoneUS: "Veuillez fournir un numéro de téléphone valide aux États-Unis"
      },
      creditCardExpiry: {
        required: "Veuillez fournir la date d'expiration de votre carte de crédit"
      }
    }
  });
  
  // ajoutez une fonction de callback lorsque l'événement "click" est déclenché sur le bouton de soumission du formulaire
  $('.btn pull-right').click(function(event) {
    event.preventDefault(); // empêche la soumission du formulaire par défaut
    
    // vérifiez si le formulaire est valide avant de le soumettre
    if ($('#formulaire').valid()) {
      $('#formulaire').submit();
      var firstName = $('#firstname').val();
      var lastName = $('#lastname').val();
      localStorage.setItem('customer.firstName', firstName);
      localStorage.setItem('customer.lastName', lastName);
      var order = {
        'customer': {
          'firstName': firstName,
          'lastName': lastName
        },
      };
      localStorage.removeItem("products"); 
      var orderNumber = localStorage.getItem('orderNumber');
      if (orderNumber === null) {
        orderNumber = 0;
      }
      var orderValue = ++orderNumber;
      localStorage.setItem('orderNumber', orderNumber);
      var orderValueString = orderValue.toString();
      var paddedOrderNumber = orderValueString.padStart(4, '0');
      var firstName = localStorage.getItem('customer.firstName');
      var lastName = localStorage.getItem('customer.lastName');
      $('#confirmName').html('votre commande est confirmée ' + firstName);
      $('#confirmName').append(lastName);
      $('#confirmNumber').html('Votre numéro de confirmation est le <strong>' + paddedOrderNumber + '</strong>');
    }
  });
});