<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/CarsGonzalez&Framework/CarsGonzalez_MVC_PHP_JQUERY/';

include_once($path . "model/connect.php");

class DAOShop
{
    function select_all_cars(){
        $conexion = connect::con();

        $sql = "SELECT *
                FROM brand b, model m, car c 
                WHERE c.id_model = m.id_model AND m.id_brand = b.id_brand
                ORDER BY c.visited DESC";

        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);
        while ($row = mysqli_fetch_assoc($res)) {
            $array[] = $row; 
        }
        return $array; 
    }

    function filters($opc, $order, $pag) {
        $conexion = connect::con();
        
        if ($order == 'price') {
            $order = "ORDER BY c.price DESC";
        } else if ($order == 'km') {
            $order = "ORDER BY c.kms DESC";
        } else {
            $order = "ORDER BY c.visited DESC";
        }

        if (empty($opc)) {
            $sql = "SELECT *
                FROM brand b, model m, car c, c.lat, c.lng, c.city
                WHERE c.id_model = m.id_model AND m.id_brand = b.id_brand " . $order;
        } else {
            $sql = "SELECT b.name_brand, m.name_model, c.price, c.id_car, c.photo_car, c.lat, c.lng, c.city 
                FROM brand b, model m, car c 
                WHERE c.id_model = m.id_model AND m.id_brand = b.id_brand ";

            if ($opc['id_brands'] != 'Allbrand') {
                $sql .= 'AND b.id_brand = ' . '"' . $opc['id_brands'] . '"';
            };

            if ($opc['id_models'] != 'Allmodels') {
                $sql .= 'AND m.id_model = ' . '"' . $opc['id_models'] . '"';
            };

            if ($opc['color'] != 'Allcolors') {
                $sql .= 'AND c.color = ' . '"' . $opc['color'] . '"';
            };

            if ($opc['city'] != 'Allcities') {
                $sql .= 'AND c.city = ' . '"' . $opc['city'] . '"';
            };

            if ($opc['category'] != 'Allcategories') {
                $sql .= 'AND c.id_category = ' . '"' . $opc['category'] . '"';
            }

            if ($opc['bodywork'] != 'Allbody') {
                $sql .= 'AND c.id_bodywork = ' . '"' . $opc['bodywork'] . '"';
            }

            $sql .= $order;

            $sql .= ' LIMIT '. $pag .', 6';
        }


        if (empty($opc)) {
            $sqlcont = "SELECT COUNT(c.id_car)
                FROM brand b, model m, car c, c.lat, c.lng, c.city
                WHERE c.id_model = m.id_model AND m.id_brand = b.id_brand " . $order;
        } else {
            $sqlcont = "SELECT COUNT(c.id_car) AS numofcars
                FROM brand b, model m, car c 
                WHERE c.id_model = m.id_model AND m.id_brand = b.id_brand ";

            if ($opc['id_brands'] != 'Allbrand') {
                $sqlcont .= 'AND b.id_brand = ' . '"' . $opc['id_brands'] . '"';
            };

            if ($opc['id_models'] != 'Allmodels') {
                $sqlcont .= 'AND m.id_model = ' . '"' . $opc['id_models'] . '"';
            };

            if ($opc['color'] != 'Allcolors') {
                $sqlcont .= 'AND c.color = ' . '"' . $opc['color'] . '"';
            };

            if ($opc['city'] != 'Allcities') {
                $sqlcont .= 'AND c.city = ' . '"' . $opc['city'] . '"';
            };

            if ($opc['category'] != 'Allcategories') {
                $sqlcont .= 'AND c.id_category = ' . '"' . $opc['category'] . '"';
            }

            if ($opc['bodywork'] != 'Allbody') {
                $sqlcont .= 'AND c.id_bodywork = ' . '"' . $opc['bodywork'] . '"';
            }

            $sqlcont .= $order;

        }
        // fer una consulta que trau la cantitat de cars que ixen i ficar aquest numero al final del array
        $res = mysqli_query($conexion, $sql);
        $rescont = mysqli_query($conexion, $sqlcont);
        connect::close($conexion);
        while ($row = mysqli_fetch_assoc($res)) {
            $rescars[] = $row; 
        }

        $array = array(
            0 => $rescars,
            1 => mysqli_fetch_assoc($rescont)
        );

        return $array;
    }

    function select_details_car($idcar){
        $conexion = connect::con();
        $sql_cars = "SELECT c.*, b.name_brand, m.name_model
                FROM brand b, model m, car c
                WHERE c.id_car = ". $idcar ." AND c.id_model = m.id_model AND m.id_brand = b.id_brand";
        $sql_photos = "SELECT id_photo, url_photo
                    FROM car_photo
                    WHERE id_car = ". $idcar;

        $res_car = mysqli_query($conexion, $sql_cars);
        $res_photos = mysqli_query($conexion, $sql_photos);

        connect::close($conexion);

        while ($row = mysqli_fetch_assoc($res_photos)) {
            $photoArray[] = $row; 
        }

        $array = array(
            0 => mysqli_fetch_assoc($res_car),
            1 => $photoArray
        );

        return $array;
        
    }

    function select_brands_and_model() {

        $conexion = connect::con();

        $brands = "SELECT b.id_brand, b.name_brand
                FROM brand b";
        
        $models = "SELECT m.id_model, m.name_model, m.id_brand
                FROM model m
                WHERE m.id_brand IN (SELECT id_brand
                                    FROM brand)";
        
        $colors = "SELECT DISTINCT color
                FROM car";

        $resBrands = mysqli_query($conexion, $brands);
        $resModels = mysqli_query($conexion, $models);
        $resColors = mysqli_query($conexion, $colors);

        connect::close($conexion);

        while ($row = mysqli_fetch_assoc($resBrands)) {
            $arrayBrands[] = $row; 
        }

        while ($row = mysqli_fetch_assoc($resModels)) {
            $arrayModels[] = $row; 
        }

        while ($row = mysqli_fetch_assoc($resColors)) {
            $arrayColors[] = $row; 
        }


        $array = array(
            0 => $arrayBrands,
            1 => $arrayModels,
            2 => $arrayColors
        );

        return $array;

    }

    function select_all_location() {
        $conexion = connect::con();

        $sql = "SELECT c.id_car, b.name_brand, m.name_model, c.lat, c.lng, c.city 
                FROM brand b, model m, car c 
                WHERE c.id_model = m.id_model AND m.id_brand = b.id_brand";

        $res = mysqli_query($conexion, $sql);

        connect::close($conexion);

        while ($row = mysqli_fetch_assoc($res)) {
            $array[] = $row; 
        }

        return $array; 
    }

    function visited($idcar, $num) {
        $conexion = connect::con();

        $sql = "UPDATE car
                SET visited = ". $num ."
                WHERE id_car = " . $idcar;

        $res = mysqli_query($conexion, $sql);

        connect::close($conexion);

        return $res;
    }
    
    function related_cars($cat, $type, $idcar) {
        $conexion = connect::con();

        $sql = "SELECT b.name_brand, m.name_model, c.price, c.id_car, c.photo_car, c.lat, c.lng, c.city 
                FROM brand b, model m, car c 
                WHERE c.id_model = m.id_model AND m.id_brand = b.id_brand AND c.id_car <> '". $idcar ."'
                AND ( c.id_category = '". $cat ."' OR c.id_type = '". $type ."')";
        

        $res = mysqli_query($conexion, $sql);

        connect::close($conexion);

        while ($row = mysqli_fetch_assoc($res)) {
            $array[] = $row; 
        }

        return $array;    
    }

    function likes($token, $car) {

        $jwtini = parse_ini_file('../../../model/config.ini', true);
        $secret = $jwtini['Secret']['key'];
        $JWT = new JWT();
        $json = $JWT -> decode($token, $secret);
        $json = json_decode($json, TRUE);

        $conexion = connect::con();

        $sql = "SELECT u.id_user FROM user u
                WHERE u.name_user LIKE '". $json['name'] ."'";

        $user = get_object_vars(mysqli_query($conexion, $sql)->fetch_object());
        $user = $user['id_user'];
        $idcar = $car['id_car'];

        $sql = "SELECT `id_user`, `id_car` FROM `likes` WHERE `id_user` = $user AND `id_car` = $idcar";
        $comp = mysqli_num_rows(mysqli_query($conexion, $sql));

        if ($comp == 0) {
            
            $sql = "INSERT INTO `likes`(`id_user`, `id_car`) VALUES ($user, ". $idcar .")";
            mysqli_query($conexion, $sql);
            connect::close($conexion);

            return 'insertado';

        } else {

            $sql = "DELETE FROM `likes` WHERE `id_user` = $user AND `id_car` = $idcar";
            mysqli_query($conexion, $sql);
            connect::close($conexion);

            return 'eliminado';

        }

    }

    function likes_user($token){
        $jwtini = parse_ini_file('../../../model/config.ini', true);
        $secret = $jwtini['Secret']['key'];
        $JWT = new JWT();
        $json = $JWT -> decode($token, $secret);
        $json = json_decode($json, TRUE);

        $conexion = connect::con();

        $sql = "SELECT u.id_user FROM user u
                WHERE u.name_user LIKE '". $json['name'] ."'";

        $user = get_object_vars(mysqli_query($conexion, $sql)->fetch_object());
        $user = $user['id_user'];

        $sql = "SELECT * FROM `likes` WHERE `id_user` = $user";
        

        $res = mysqli_num_rows(mysqli_query($conexion, $sql)) > 0 ? mysqli_query($conexion, $sql) : null;

        connect::close($conexion);

        if ($res != null) {
            while ($row = mysqli_fetch_assoc($res)) {
                $array[] = $row; 
            }
            return $array;  
        } else {
            return $res;
        }

    }
} 

