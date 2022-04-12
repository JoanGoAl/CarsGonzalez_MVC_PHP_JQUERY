<?php

if (isset($_GET['modules'])) {
    switch ($_GET['modules']) {
        case 'controller_home';
            include_once("modules/home/view/home.html");
            break;
        case 'controller_shop';
            include_once('modules/shop/view/shop.html');
            break;
        case 'about';
            include_once("/var/www/html/primera-plantilla/modules/home/view/about.html");
            break;
        case 'create_car';
            include_once("modules/car/view/create_car.html");
            break;
        case 'login_register';
            include_once("modules/login/view/login.html");
            break;
    }
} else {
    include_once("modules/home/view/home.html");
}
