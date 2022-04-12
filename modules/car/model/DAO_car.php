<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/primera-plantilla/';

include_once($path . "model/connect.php");
class DAOCar
{
    function select_all_cars()
    {
        $conexion = connect::con();
        $sql = "SELECT * FROM car ORDER BY id DESC";
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);

        return $res;
    }
    function group_model()
    {
        $conexion = connect::con();
        $sql = "SELECT * FROM car ORDER BY id ASC";
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);

        return $res;
    }

    function get_car($idcar)
    {
        $conexion = connect::con();
        $sql = "SELECT * FROM car WHERE id=$idcar";
        $rescar = mysqli_query($conexion, $sql);
        connect::close($conexion);

        $res = mysqli_fetch_array($rescar);

        return $res;
    }

    function read_car($car)
    {
        $conexion = connect::con();
        $sql = "SELECT * FROM car WHERE id=$car";
        $res = mysqli_query($conexion, $sql)->fetch_object();
        connect::close($conexion);

        return $res;
    }

    function create_car($datos)
    {

        $conexion = connect::con();

        $bastidor = $datos['bastidor'];
        $matricula = $datos['matricula'];
        $marca = $datos['marca'];
        $modelo = $datos['modelo'];
        $ano = $datos['ano'];
        $km = $datos['km'];
        $combustible = $datos['combustible'];

        $sql = "INSERT INTO car(bastidor,matricula,marca,modelo,ano,km,combustible) VALUES('$bastidor','$matricula','$marca','$modelo','$ano','$km','$combustible')";
        $result = mysqli_query($conexion, $sql);
        connect::close($conexion);

        return $result;
    }

    function update_car($datos)
    {
        $conexion = connect::con();

        $idcar = $_GET['id'];
        $bastidor = $datos['bastidor'];
        $matricula = $datos['matricula'];
        $marca = $datos['marca'];
        $modelo = $datos['modelo'];
        $ano = $datos['ano'];
        $km = $datos['km'];
        $combustible = $datos['combustible'];

        console_log($idcar);

        $sql = "UPDATE car SET marca='$marca', modelo='$modelo', ano='$ano', km='$km', combustible='$combustible' WHERE id='$idcar'";
        $result = mysqli_query($conexion, $sql);
        connect::close($conexion);

        return $result;
    }
    function delete_car($idcar)
    {
        $conexion = connect::con();
        $sql = "DELETE FROM car WHERE id='$idcar'";
        $result = mysqli_query($conexion, $sql);
        connect::close($conexion);
    }

    function mat()
    {
        $num1 = rand(0, 9);
        $num2 = rand(0, 9);
        $num3 = rand(0, 9);
        $num4 = rand(0, 9);

        $mat = $num1 . $num2 . $num3 . $num4 . "ABC";
        return $mat;
    }

    function marc()
    {
        $num = rand(0, 2);

        switch ($num) {
            case 0;
                $num = "Opel";
                break;
            case 1;
                $num = "BMW";
                break;
            case 2;
                $num = "Tesla";
                break;
        }

        return $num;
    }

    function model($marc)
    {
        $num = rand(0, 2);

        switch ($marc) {
            case "Opel";
                switch ($num) {
                    case 0;
                        $num = "Astra";
                        break;
                    case 1;
                        $num = "Corsa";
                        break;
                    case 2;
                        $num = "Mokka";
                        break;
                }
                break;
            case "BMW";
                switch ($num) {
                    case 0;
                        $num = "320d";
                        break;
                    case 1;
                        $num = "x6";
                        break;
                    case 2;
                        $num = "i8";
                        break;
                }
                break;
            case "Tesla";
                switch ($num) {
                    case 0;
                        $num = "Model S";
                        break;
                    case 1;
                        $num = "Model X";
                        break;
                    case 2;
                        $num = "Model Y";
                        break;
                }
                break;
        }
        return $num;
    }

    function comb() {
        $num = rand(0, 2);

        switch ($num) {
            case 0;
                $num = "Diesel";
                break;
            case 1;
                $num = "Gasolina";
                break;
            case 2;
                $num = "Electrico";
                break;
        }

        return $num;
    }
    function dummies($num)
    {
        $daocar = new DAOCar();
        $conexion = connect::con();
        $sql = "DELETE FROM car";
        $result = mysqli_query($conexion, $sql);
        for ($i = 1; $i <= $num; $i++) {

            $bast = rand(111111111, 999999999);
            $mat = $daocar->mat();
            $marc = $daocar->marc();
            $model = $daocar->model($marc);
            $ano = rand(1990, 2022);
            $km = rand(10000,300000);
            $comb = $daocar->comb();

            $sql = "INSERT INTO car(bastidor,matricula,marca,modelo,ano,km,combustible) VALUES($bast,'$mat','$marc','$model',$ano,'$km','$comb')";
            $result = mysqli_query($conexion, $sql);
        }
        connect::close($conexion);
    }
}
