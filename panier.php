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
        $json_panier = file_get_contents('panier.json');
        $decoded_panier = json_decode($json_panier);
        // vérif si existe déjà
        $existe = false;

        foreach ($decoded_panier as $key => $article) {
            // var_dump("<pre>",$article->produit->id,"</pre>");
            if ( $article->produit->id == $produit_to_add->produit->id) {
               $nb = $decoded_panier[$key]->produit->nombre++;
                $existe = true;
            }
        }
        if (! $existe)  {
            array_push($decoded_panier, $produit);

            echo json_encode( $produit_to_add);
        }
        else {
            echo json_encode($nb);
        }
        $encoded_panier = json_encode($decoded_panier);
        file_put_contents('panier.json', $encoded_panier);
        

    } else {
        die(json_encode(array('message' => 'ERROR', 'code' => 404)));
    }


} else { // si get
    $json_source = file_get_contents('panier.json');
	echo $json_source;
}


?>