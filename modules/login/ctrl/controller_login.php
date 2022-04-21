<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/CarsGonzalez&Framework/CarsGonzalez_MVC_PHP_JQUERY/';

include_once($path . "modules/login/model/DAO_login.php");
include_once($path . "modules/login/view/inc/JWT.php");

$dao = new DAOLogin();

switch ($_GET['op']) {
    case 'validate-register':
        $res = $dao -> validate_register($_POST);
        echo json_encode($res);
        break;
    case 'register':
        $dao -> register($_POST);
        echo json_encode('user_insertado');
        break;
    case 'validate-login':
        $res = $dao -> validate_login($_POST);
        echo json_encode($res);
        break;
    case "login":
        $res = $dao -> login($_POST['name']);
        echo json_encode($res);
        break;
    case "logout":
        $res = $dao -> logout();
        echo json_encode($res);
        break;
    case "data_user":
        $apache = apache_request_headers();
        $token = $apache['Token'];
        $res = $dao -> data__user($token);
        echo json_encode($res);
        break;
    case "controluser":
        $res = $dao -> controll__user();
        echo json_encode($res);
        break;
    case "activity":
        $res = $dao -> activity();
        echo json_encode($res);
        break;
    case "prueba":
        $array = apache_request_headers();
        echo json_encode($array);
        break;
}