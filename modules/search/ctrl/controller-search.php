<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/CarsGonzalez&Framework/CarsGonzalez_MVC_PHP_JQUERY/';

include_once($path . "modules/search/model/DAO_search.php");

$dao = new DAOSearch();

switch ($_GET['op']) {
    case 'list_info_search':

        $info = $dao -> select_all_info();
        echo json_encode($info);
        
        break;
    case 'autocomplete':

        $auto = $dao -> autocomplete_city($_GET['city']);
        echo json_encode($auto);        
    }