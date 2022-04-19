<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/CarsGonzalez_MVC_PHP_JQUERY/';

include_once($path . "model/connect.php");
@session_start();

class DAOLogin {

    function search_name($name) {

        $conexion = connect::con();

        $sql = "SELECT * FROM user u
                WHERE u.name_user = '$name'";

        $res = mysqli_num_rows(mysqli_query($conexion, $sql)) > 0 ? get_object_vars(mysqli_query($conexion, $sql)->fetch_object()) : null;
        connect::close($conexion);

        return $res; 

    }

    function search_email($email) {
        $conexion = connect::con();

        $sql = "SELECT * FROM user u
                WHERE u.email_user = '$email'";

        $res = mysqli_query($conexion, $sql)->fetch_object();
        connect::close($conexion);

        return $res; 
    }

    function validate_register($data) {

        $dao = new DAOLogin();

        $check_name = $dao -> search_name($data['name']);

        $check_email = $dao -> search_email($data['email']);

        if ($check_name && $check_email) {
            return "both_exist";
        } else if ($check_name){
            return "user_exist";
        } else if ($check_email){
            return "email_exist";
        } else {
            return "all_ok";
        }    
    }

    function register($data) {

        $hashed_pass = password_hash($data['passwd'], PASSWORD_DEFAULT, ['cost' => 12]);

        $avatar = "https://api.multiavatar.com/". $data['name'] .".svg";

        $conexion = connect::con();

        $sql = "INSERT INTO `user`(`name_user`, `email_user`, `avatar_user`, `passwd_user`, `type_user`) 
                VALUES ('" .$data['name'] ."','" .$data['email'] ."', '$avatar','$hashed_pass','default')";

        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);

        return $res;
    }

    function validate_login($data) {

        $dao = new DAOLogin();

        $check_name = $dao -> search_name($data['name']);

        if ($check_name == null) {
            return "name_not_exist";
        } else if (password_verify($data['passwd'],$check_name['passwd_user'])) {
            return "all_ok";
        }  else if ($check_name) {
            return "passwd_not_match";
        } else {  
            return "passwd_not_match"; 
        }
    }

    function login($name) {
        $conexion = connect::con();

        $sql = "SELECT * FROM user u
                WHERE u.name_user = '$name'";

        $res = get_object_vars(mysqli_query($conexion, $sql)->fetch_object());
        connect::close($conexion);

        $jwtini = parse_ini_file('../../../model/config.ini', true);

        $header = '{"typ": ' . '"' . $jwtini['Header']['typ'] . '", "alg": ' . '"' . $jwtini['Header']['alg'] . '"}';

        $secret = $jwtini['Secret']['key'];
        $payload = '{"iat":"'.time().'","exp":"'.time() + (60*60).'","name":"'.$res["name_user"].'"}';

        $JWT = new JWT();
        $token = $JWT -> encode($header, $payload, $secret);

        return $token; 
    }

    function data__user($token){

        $jwtini = parse_ini_file('../../../model/config.ini', true);
        $secret = $jwtini['Secret']['key'];
        $JWT = new JWT();
        $json = $JWT -> decode($token, $secret);
        $json = json_decode($json, TRUE);

        $conexion = connect::con();

        $sql = "SELECT u.name_user, u.email_user, u.avatar_user, u.type_user FROM user u
                WHERE u.name_user LIKE '". $json['name'] ."'";

        $res = get_object_vars(mysqli_query($conexion, $sql)->fetch_object());
        connect::close($conexion);

        $_SESSION['type'] = $res['type_user'];
        $_SESSION['user'] = $res['name_user'];
        $_SESSION['user_time'] = time();

        return $res;
    }

    function controll__user() {

        if (isset ($_SESSION['type']) || ($_SESSION['type'] == 'default')) {
            return 'user_default';
        }

        return 'no_logged';
    }

    function logout() {
        session_unset();
        return '_logout';
    }

    function activity() {

        if (!isset ($_SESSION['user_time'])) {
            return 'no-logged';  
        } else {
            if ((time() - $_SESSION["user_time"] >= 600)) {
                return 'inactivo';
            } else {
                return 'activo';
            }
        }
    }
}