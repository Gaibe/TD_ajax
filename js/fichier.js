$(document).ready(function () {

  function getArt() {
    $(".commander").show("fast");
    var objJson = $('<ul id="liste-produits">')
                    .append($("<h2>")
                    .text("Catalogue de produit :"));
    $.ajax({
        url: "produit.php",
        type: 'GET',
        contentType: "application/json",
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
  
  function preparer(art) {
    var load = '<img class="wait-preparer" src="img/ajax-loader.gif" alt="Loading" />'
    art.append(load);
    $(".commander").remove();

    $.ajax({
        url: 'http://localhost/TP_ajax/commande.php',
        type: 'GET',
        contentType: "application/json",
    })
    .done(function (data) {
       // art.children('img.wait-preparer').remove();
       if (data === "OK") {
        art.children('img.wait-preparer').replaceWith('<img src="img/ok.jpg" alt="OK" height="32" width="32" />');
        if (art.is(':last-child')) {
          art.parents("#panier").after($("<p>").text("Tous les articles sont prêts"));
        }
      } else {
        art.children('img.wait-preparer').replaceWith('Erreur de préparation ');
      }

    })
    .fail(function () {
        alert("Echec commande");
    });
    return art;

  }

  function envoi(art) {
    var load = '<img class="wait-envoi" src="img/ajax-loader.gif" alt="Loading" />'
    art.append(load);

    $.ajax({
        url: 'http://localhost/TP_ajax/commande.php',
        type: 'GET',
        contentType: "application/json",
    })
    .done(function (data) {
      // art.children('img.wait-envoi').remove();
      if (data === "OK") {
        art.children('img.wait-envoi').replaceWith('Envoyé !');
        if (art.is(':last-child')) {
          art.parents("#panier").after($("<p>").text("Tous les articles ont été expédié"));
        }
      } else {
        art.children('img.wait-envoi').replaceWith('Erreur de livraison');
      }

    })
    .fail(function () {
        alert("Echec commande");
    });

    return art;
  }


  function detailPanier() {
    var objJson = $('<ul id="panier">').append($("<h2>").text("Mon panier :"));
    $.ajax({
        url: 'http://localhost/TP_ajax/panier.php',
        type: 'GET',
        contentType: "application/json",
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
        objJson.append($("<button>").addClass("commander").text("commander") 
        .click(function () {
            objJson.children('li').each(function() {

              preparer($(this))
              envoi($(this));
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
        dataType: 'text',
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