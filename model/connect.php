<?php

class connect {
    
    public static function con() {
        $iniF = parse_ini_file('config.ini', true);

        $databaseHost = $iniF['UserDB']['host'];
        $databaseName = $iniF['UserDB']['namedb'];
        $databaseUsername = $iniF['UserDB']['user'];
        $databasePassword = $iniF['UserDB']['passwd'];

        $conexion = mysqli_connect($databaseHost, $databaseUsername, $databasePassword, $databaseName); 

        return $conexion;
    }
    
    public static function close($conexion) {
        mysqli_close($conexion);
    }
}