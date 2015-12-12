<?php

if (isset($_POST['id_article']) ) {
    $json_produit = file_get_contents('produit.json');
    $decoded_produit = json_decode($json_produit);

    $produit_to_add = null;
    foreach ($decoded_produit as $key => $produit) {
        if ($produit->produit->id == $_POST['id_article']) {
            $produit_to_add = $produit;
            break;
        }
    }
    if ($produit_to_add !== null) {
        $json_panier = file_get_contents('panier.json');
        $decoded_panier = json_decode($json_panier);
        array_push($decoded_panier, $produit);
        $encoded_panier = json_encode($decoded_panier);
        file_put_contents('panier.json', $encoded_panier);

    } else {
        die(json_encode(array('message' => 'ERROR', 'code' => 404)));
    }


} else {
    $json_source = file_get_contents('panier.json');
	echo $json_source;
}


?>