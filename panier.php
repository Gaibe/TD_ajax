<?php

if (isset($_POST['id_article']) ) {
	// ici mettre a jou le panier


} else {
	$json_source = file_get_contents('panier.json');
	echo $json_source;
}


?>