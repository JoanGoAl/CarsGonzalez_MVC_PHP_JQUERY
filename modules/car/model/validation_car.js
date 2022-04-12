function validate_bastidor(bastidor) {
    if (bastidor.length > 0) {
        var reg = /^[0-9]{9}$/;
        return reg.test(bastidor);
    }
    return false;
}

function validate_matricula(matricula) {


    if (matricula.length > 0) {
        var reg = /^[0-9]{4}[A-Z]{3}$/;
        return reg.test(matricula);
    }
    return false;
}

function validate_marca(marca) {
    if (marca.length > 0) {
        var reg = /^[a-zA-Z]/;
        return reg.test(marca);
    }
    return false;
}

function validate_modelo(modelo) {
    if (modelo.length > 0) {
        var reg = /[a-zA-Z0-9]/;
        return reg.test(modelo);
    }
    return false;
}

function validate_ano(ano) {
    if (ano.length > 0) {
        var reg = /[0-9]{4}/;
        return reg.test(ano);
    }
    return false;
}

function validate_km(km) {
    if (km.length > 0) {
        var reg = /[0-9]/;
        return reg.test(km);
    }
    return false;
}

function validateAll() {



    var v_bastidor = document.getElementById('bastidor').value;
    var v_matricula = document.getElementById('matricula').value;
    // var v_marca = document.getElementById('marca').value;
    // var v_modelo = document.getElementById('modelo').value;
    // var v_ano = document.getElementById('ano').value;
    // var v_km = document.getElementById('km').value;


    var r_bastidor = validate_bastidor(v_bastidor);
    var r_matricula = validate_matricula(v_matricula);
    // var r_marca = validate_marca(v_marca);
    // var r_modelo = validate_modelo(v_modelo);
    // var r_ano = validate_ano(v_ano);
    // var r_km = validate_km(v_km);

    if (!r_bastidor) {
        document.getElementById("error_bastidor").innerHTML = "* El numero de bastidor no es valido </br>";
        return 0;
    } else {
        document.getElementById("error_bastidor").innerHTML = "";
    }

    if (!r_matricula) {
        document.getElementById("error_matricula").innerHTML = "* La matricula no es valida </br>";
        return 0;
    } else {
        document.getElementById("error_matricula").innerHTML = "";
    }

    // if (!r_marca) {
    //     document.getElementById("error_marca").innerHTML = "* La marca no es valida </br>";
    //     return 0;
    // } else {
    //     document.getElementById("error_marca").innerHTML = "";
    // }

    // if (!r_modelo) {
    //     document.getElementById("error_modelo").innerHTML = "* El modelo no es valido </br>";
    //     return 0;
    // } else {
    //     document.getElementById("error_modelo").innerHTML = "";
    // }

    // if (!r_ano) {
    //     document.getElementById("error_ano").innerHTML = "* El año no es valido </br>";
    //     return 0;
    // } else {
    //     document.getElementById("error_ano").innerHTML = "";
    // }

    // if (!r_km) {
    //     document.getElementById("error_km").innerHTML = "* El valor de los kilometros no es valido </br>";
    //     return 0;
    // } else {
    //     document.getElementById("error_km").innerHTML = "";
    // }

    // if (document.getElementById('formCreate')) {
    //     document.formCreate.submit();
    //     document.formCreate.action = "index.php?modules=controller_car&op=create";

    // } else if (document.getElementById('formUpdate')) {
    //     document.formUpdate.submit();
    //     document.formUpdate.action = "index.php?modules=controller_car&op=update";
    // }

}