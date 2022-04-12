<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/CarsGonzalez_MVC_PHP_JQUERY/';

include_once($path . "modules/shop/model/DAO_shop.php");
include_once($path . "modules/login/view/inc/JWT.php");

$dao = new DAOShop();

switch ($_GET['op']) {
    case 'list_cars':
        $cars = $dao -> select_all_cars();
        echo json_encode($cars);
        break;
    case 'filters':
        $cars = $dao -> filters($_POST, $_GET['pos'], $_GET['pag']);
        echo json_encode($cars);
        break;
    case 'details_car':
        $car = $dao -> select_details_car($_GET['id']);
        echo json_encode($car);
        break;
    case 'brands':
        $brands = $dao -> select_brands_and_model();
        echo json_encode($brands);
        break;
    case 'location':
        $location = $dao -> select_all_location();
        echo json_encode($location);
        break;
    case 'car_visited':
        $visited = $dao -> visited($_GET['id'], $_GET['num']);
        echo json_encode($visited);
        break;
    case 'related_cars':
        $related = $dao -> related_cars($_GET['cat'], $_GET['type'], $_GET['idcar']);
        echo json_encode($related);
        break;
    case 'likes':
        $apache = apache_request_headers();
        $token = $apache['Token'];
        $res = $dao -> likes($token, $_POST);
        echo json_encode($res);
        break;
    case 'user_likes':

        $apache = apache_request_headers();
        $token = $apache['Token'];
        $res = $dao -> likes_user($token);
        echo json_encode($res);
        break;
    
}