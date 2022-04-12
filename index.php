<?php 

if ((isset($_GET['modules'])) && ($_GET['modules'] === 'controller_home')) {
    include("view/top-page/top-page-home.html");
} else if ((isset($_GET['modules'])) && ($_GET['modules'] === 'controller_shop')){
    include("view/top-page/top-page-shop.html");
} else if ((isset($_GET['modules'])) && ($_GET['modules'] === 'login_register')) {
    include("view/top-page/top-page-login.html");
} else {
    include("view/top-page/top-page-home.html");
}

include("view/header.html");

include("view/pages.php");  



include("view/footer.html");
