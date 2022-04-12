<?php

    function validate_name($name) {
        $dao = new DAOLogin();

        if ($dao->search_name($name)){
            $check = false;
        } else {
            $check = true;
        }

        return $check;
    }

?>