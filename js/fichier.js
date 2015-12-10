$(document).ready(function () {
    $.ajax({
        url: "scriptJson.php"
    })
    .done(function (data) {
        var articles = $.parseJSON(data);
        var mabite = $("#liste-produits").append($("<ul>"));
                console.log(articles);

        articles.forEach(function (iteration) {
            mabite.append($("<li>").text(iteration.produit.description));
        });
    })
    .fail(function () {
        alert("Echec");
    })
})