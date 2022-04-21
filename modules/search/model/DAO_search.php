<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/CarsGonzalez&Framework/CarsGonzalez_MVC_PHP_JQUERY/';

include_once($path . "model/connect.php");

class DAOSearch {
    function select_all_info() {
        $conexion = connect::con();

        $sql_Category = "SELECT c.id_category, c.name_category
                        FROM category c";

        $sql_Brand = "SELECT b.id_brand, b.name_brand
                    FROM brand b";

        $resCategory = mysqli_query($conexion, $sql_Category);
        $resBrand = mysqli_query($conexion, $sql_Brand);

        connect::close($conexion);
        while ($row = mysqli_fetch_assoc($resCategory)) {
            $arrayCategory[] = $row; 
        }

        while ($row = mysqli_fetch_assoc($resBrand)) {
            $arrayBrand[] = $row; 
        }

        $array = array(
            0 => $arrayCategory,
            1 => $arrayBrand
        );

        return $array; 
    }

    function autocomplete_city($city) {

        $conexion = connect::con();
        

        $sql = "SELECT DISTINCT c.city
                FROM car c
                WHERE c.city LIKE '" . $city . "%'";

        $res = mysqli_query($conexion, $sql);

        connect::close($conexion);

        while ($row = mysqli_fetch_assoc($res)) {
            $array[] = $row; 
        }

        return $array; 
    }
} 