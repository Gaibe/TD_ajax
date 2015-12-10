$(document).ready(function () {
    $.ajax({
        url: "scriptJson.php"
    })
    .done(function (data) {
        var articles = $.parseJSON(data);
        var objJson = $("#liste-produits") ;

        articles.forEach(function (iteration) {
            objJson.append($("<li>").append($("<ul>")
                                   .append($("<li>").append(iteration.produit.nom))
                                   .append($("<li>").append(iteration.produit.description))
                                   .append($("<li>").append(iteration.produit.prix)) )
                                   );


           
        });
    })
    .fail(function () {
        alert("Echec");
    });
});