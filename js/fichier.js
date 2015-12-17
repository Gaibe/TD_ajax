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
  
  function commander(art) {
    var load = '<img class="wait" src="img/ajax-loader.gif" alt="Loading" />'
    art.append(load);

    $.ajax({
        url: 'http://localhost/TP_ajax/commande.php',
        type: 'GET'
        
        
    })
    .done(function (data) {
       art.children('img').remove();
       if (data === "OK")
        art.append('<img src="img/ok.jpg" alt="OK" height="32" width="32" />');
      else 
        art.append('Erreur stock ');
       

    })
    .fail(function () {
        alert("Echec commande");
    });
    

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
        // if plusiuers art
        objJson.append($("<button>").text("commander") 
        .click(function () {
            objJson.children('li').each(function() {

              commander($(this));
            });
            
          }) 
        );

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
          $("#panier").remove();
          $('body').prepend(detailPanier());
          
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