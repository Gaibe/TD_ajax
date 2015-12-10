$(document).ready(function () {
    $.ajax({
        url: "scriptJson.php"
    })
    .done(function (data) {
        var articles = $.parseJSON(data);
        var mabite = $("#liste-produits").append($("<ul>"));

        articles.forEach(function (iteration) {
            mabite.append($("<li>").text(iteration.produit.description));
        });
    })
    .fail(function () {
        alert("Echec");
    });
}