<?php

if (isset($_POST['id_article']) ) {
    $json_produit = file_get_contents('produit.json');
    $decoded_produit = json_decode($json_produit);

    $produit_to_add = null;
    // on recherche le produit
    foreach ($decoded_produit as $key => $produit) {
        if ($produit->produit->id == $_POST['id_article']) {
            $produit_to_add = $produit;
            break;
        }
    }

    
    if ($produit_to_add !== null) {
        if (file_exists('panier.json')) {
            $json_panier = file_get_contents('panier.json');
        } else {
            $json_panier = file_get_contents('panier-default.json');
        }
        $decoded_panier = json_decode($json_panier);
        // vérif si existe déjà
        $existe = false;

        foreach ($decoded_panier as $key => $article) {
            // var_dump("<pre>",$article->produit->id,"</pre>");
            if ( $article->produit->id == $produit_to_add->produit->id) {
                $article->produit->nombre++;
                $existe = true;
            }
        }
     
        if (! $existe)  {
            $produit_to_add->produit;
            unset($produit_to_add->produit->description);
            $produit_to_add->produit->nombre = 1;
            array_push($decoded_panier, $produit_to_add);  

        }
        //var_dump("<pre>",$decoded_panier,"</pre>");

        echo json_encode( $decoded_panier);
        $encoded_panier = json_encode($decoded_panier);
        file_put_contents('panier.json', $encoded_panier);
        

    } else {
        die(json_encode(array('message' => 'ERROR', 'code' => 404)));
    }


} else { // si get
    if (!file_exists('panier.json')) {
        file_put_contents('panier.json', file_get_contents('panier-default.json'));
    }
    $json_panier = file_get_contents('panier.json');
	echo $json_panier;
}


?>