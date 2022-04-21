<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/CarsGonzalez&Framework/CarsGonzalez_MVC_PHP_JQUERY/';

include_once($path . "modules/home/model/DAO_home.php");

$dao = new DAOHome();

switch ($_GET['op']) {
    case 'list':

        include_once('modules/home/view/home.html');

        break;
    case 'list_brands':

        $brands = $dao -> select_all_brand();
        echo json_encode($brands);

        break;
    case 'list_categories':
        
        $cat = $dao -> select_all_category();
        echo json_encode($cat);
        
        break;
    case 'list_bodyworks':

        $body = $dao -> select_all_bodywork();
        echo json_encode($body);
    }
