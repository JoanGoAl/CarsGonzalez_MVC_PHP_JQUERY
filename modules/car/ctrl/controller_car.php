<?php
function console_log($data)
{
    echo '<script>';
    echo 'console.log(' . json_encode($data) . ')';
    echo '</script>';
}
$path = $_SERVER['DOCUMENT_ROOT'] . '/primera-plantilla/';
include_once($path . "modules/car/model/DAO_car.php");

switch ($_GET['op']) {
    case 'list_car';

        try {
            $daocars = new DAOCar();
            $resallcars = $daocars->select_all_cars();
        } catch (Exception $e) {
            $callback = 'index.php?modules=503';
            die('<script>window.location.href="' . $callback . '";</script>');
        }

        if (!$resallcars) {
            $callback = 'index.php?modules=503';
            die('<script>window.location.href="' . $callback . '";</script>');
        } else {
            // include_once('modules/car/view/list_car.html');
            include_once('modules/car/view/list_car.php');
        }

        break;

    case 'read_modal':

        try {
            $daocar = new DAOCar();
            $rdo = $daocar->read_car($_GET['id']);
        } catch (Exception $e) {
            echo json_encode("error");
            exit;
        }
        if (!$rdo) {
            echo json_encode("error");
            exit;
        } else {
            $car = get_object_vars($rdo);
            echo json_encode($car);
            //echo json_encode("error");
            exit;
        }
        break;
    case 'delete';

        try {
            $daocar = new DAOCar();
            $rdo = $daocar->delete_car($_GET['id']);
            $callback = 'index.php?modules=controller_car&op=list_car';
            die('<script>window.location.href="' . $callback . '";</script>');
        } catch (Exception $e) {
            $callback = 'index.php?modules=503';
            die('<script>window.location.href="' . $callback . '";</script>');
        }

        break;
    case 'dummies';
        try {
            $daocar = new DAOCar();
            $resupdate = $daocar->dummies($_GET['num']);

            $callback = 'index.php?modules=controller_car&op=list_car';
            die('<script>window.location.href="' . $callback . '";</script>');
        } catch (Exception $e) {
            $callback = 'index.php?modules=503';
            die('<script>window.location.href="' . $callback . '";</script>');
        }
        break;
    case 'create':
        include_once('modules/car/view/create_car.html');
        break;
    default;
        include("view/inc/error404.php");
        break;
}
