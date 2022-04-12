<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/CarsGonzalez_MVC_PHP_JQUERY/';

include_once($path . "model/connect.php");

class DAOHome
{
    function select_all_brand()
    {
        $conexion = connect::con();
        $sql = "SELECT * FROM brand";
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);
        while ($row = mysqli_fetch_assoc($res)) {
            $array[] = $row; 
        }
        return $array;
    }

    function select_all_category() 
    {
        $conexion = connect::con();
        $sql = "SELECT * FROM category";
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);
        while ($row = mysqli_fetch_assoc($res)) {
            $array[] = $row; 
        }
        return $array;
    }

    function select_all_bodywork() 
    {
        $conexion = connect::con();
        $sql = "SELECT * FROM bodywork";
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);
        while ($row = mysqli_fetch_assoc($res)) {
            $array[] = $row; 
        }
        return $array;
    }
}