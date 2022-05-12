<?php
$path = $_SERVER["DOCUMENT_ROOT"] . '/CarsGonzalez&Framework/CarsGonzalez_MVC_PHP_JQUERY/';
require $path . 'model/JWT.php';

class jwt_process {
    public static function encode($user) {        
        $jwtini = parse_ini_file('config.ini', true);
        $header = '{"typ": ' . '"' . $jwtini['Header']['typ'] . '", "alg": ' . '"' . $jwtini['Header']['alg'] . '"}';
        $secret = $jwtini['Secret']['key'];
        $payload = '{"iat":"'.time().'","exp":"'.time() + (60*60).'","name":"'.$user.'"}';
        $JWT = new JWT();
        return $JWT -> encode($header, $payload, $secret);
    }

    public static function decode($token) {
        $jwtini = parse_ini_file('config.ini', true);
        $JWT = new jwt();
        return $JWT -> decode($token, $jwtini['Secret']['key']);
    }

}