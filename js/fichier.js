$(document).ready(function () {

  function getArt() {
    var objJson = $('<ul id="liste-produits">');
    $.ajax({
        url: "produit.php"
    })
    .done(function (data) {
        var articles = $.parseJSON(data);

        articles.forEach(function (iteration) {
            objJson.append($("<li>").append($("<ul>")
              .append($("<li>").append(iteration.produit.nom))
              .append($("<li>").append(iteration.produit.description))
              .append($("<li>").append(iteration.produit.prix)) 
              .append($("<li>").append(
                $('<button>').addClass('addPanier')
                  .text('Acheter')
                  .click(function () {
                    ajoutePanier(iteration.produit.id);
                   }) 
                ))
              )
            );             
        });
    })
    .fail(function () {
        alert("Echec");
    });
    return objJson;
  }
  

  function detailPanier() {
    var objJson = $('<ul id="panier">');
    $.ajax({
        url: 'http://localhost/TP_ajax/panier.php',
        type: 'GET'
    })
    .done(function (data) {
      var panier = $.parseJSON(data);

        panier.forEach(function (iteration) {
            objJson.append($("<li>").append($("<ul>").append($("<li>").append(iteration.produit.nom))
                                                     .append($("<li>").append(iteration.produit.prix))
                                                     .append($("<li>").append(iteration.produit.nombre)) 
                                            )
                          );             
        });


    })
    .fail(function () {
        alert("Echec Panier");
    });
    return objJson;
  }

  function ajoutePanier(id) {
    $.ajax({
        url: 'http://localhost/TP_ajax/panier.php',
        type: 'POST',
        data : {  id_article : id },
        success: function(result) {
          $("#panier").append(result);

        }
    })
    .done(function (data) {

    })
    .fail(function () {
        alert("Echec Panier");
    });

  }


  $('body').prepend(getArt());
  $('body').prepend(detailPanier());

});