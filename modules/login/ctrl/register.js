function button_register() {

    $('#register-butt').on('click', function() {
        register();
    });

}

function validate_register() {

    let email_exp = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    let passwd_exp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    let error = false;

    let passwd = document.getElementById('passwd-register');
    let passwd2 = document.getElementById('passwd2-register');

    if (!email_exp.test(document.getElementById('email-register').value)) {
        document.getElementById('error_email').innerHTML = 'El email no es valido';
        error = true;
    } else {
        document.getElementById('error_email').innerHTML = '';
    }

    if (passwd.value.length === 0) {
        document.getElementById('error_passwd2').innerHTML = 'Tienes que escribir una contraseña';
        error = true;
    } else if (!passwd_exp.test(passwd.value)) {
        document.getElementById('error_passwd').innerHTML = 'La contraseña no es lo suficiente segura';
        error = true;
    } else {
        document.getElementById('error_passwd').innerHTML = '';
        if (passwd.value != passwd2.value) {
            document.getElementById('error_passwd2').innerHTML = 'Las contraseñas no coinciden';
            error = true;
        } else {
            document.getElementById('error_passwd2').innerHTML = '';
            document.getElementById('error_passwd').innerHTML = '';
        }
    }

    if (error == true) {
        return 0;
    }

}

function register() {

    if (validate_register() != 0) {

        let data = $('#form-signup').serializeObject();

        ajaxPromise("POST", "modules/login/ctrl/controller_login.php?op=validate-register", "json", data)
            .then((res) => {

                switch (res) {
                    case 'user_exist':
                        document.getElementById('error_name').innerHTML = 'Este nombre no esta disponible';
                        document.getElementById('error_email').innerHTML = '';
                        break;

                    case 'email_exist':
                        document.getElementById('error_email').innerHTML = 'Este email no esta disponible';
                        document.getElementById('error_name').innerHTML = '';
                        break;

                    case 'both_exist':
                        document.getElementById('error_name').innerHTML = 'Este nombre no esta disponible';
                        document.getElementById('error_email').innerHTML = 'Este email no esta disponible';
                        break;

                    default:
                        document.getElementById('error_name').innerHTML = '';
                        document.getElementById('error_email').innerHTML = '';
                        break;
                }

                if (res == "all_ok") {
                    ajaxPromise("POST", "modules/login/ctrl/controller_login.php?op=register", "json", data)
                        .then((res) => {
                            // como cojer campo de la promesa 
                            window.location.href = "index.php?modules=controller_home"
                            ajaxPromise("POST", "modules/login/ctrl/controller_login.php?op=login", "json", data)
                                .then((res) => {

                                    localStorage.setItem('token', res);
                                    window.location.href = "index.php?modules=controller_home"

                                }).catch(function() {
                                    console.log('Error login')
                        })
                        }).catch(function() {
                            console.log('Error insert user')
                        })
                }

            }).catch(function() {
                console.log('Error comprobacion usuario/email')
            })

    }

}

function button_login() {

    $('#login-butt').on('click', function() {
        login();
    });

}

function validate_login() {

    let name_login = document.getElementById('name-login');
    let passwd_login = document.getElementById('passwd-login');
    let error = false;

    if (name_login.value.length === 0) {
        document.getElementById('error_name_login').innerHTML = 'Tienes que introducir un nombre';
        error = true;
    } else {
        document.getElementById('error_name_login').innerHTML = '';
    }

    if (passwd_login.value.length === 0) {
        document.getElementById('error_passwd_login').innerHTML = 'Tienes que introducir una contraseña';
        error = true;
    } else {
        document.getElementById('error_passwd_login').innerHTML = '';
    }

    if (error == true) {
        return 0;
    }
}

function login() {

    let data = $('#form-login').serializeObject();

    if (validate_login() != 0) {

        ajaxPromise("POST", "modules/login/ctrl/controller_login.php?op=validate-login", "json", data)
            .then((res) => {

                console.log(res);

                switch (res) {
                    case 'name_not_exist':
                        document.getElementById('error_name_login').innerHTML = 'El nombre no existe';
                        break;

                    case 'passwd_not_match':
                        document.getElementById('error_passwd_login').innerHTML = 'Contraseña incorrecta';
                        break;
                    default:
                        document.getElementById('error_name_login').innerHTML = '';
                        document.getElementById('error_passwd_login').innerHTML = '';
                        break;
                }

                if (res == 'all_ok') {
                    ajaxPromise("POST", "modules/login/ctrl/controller_login.php?op=login", "json", data)
                        .then((res) => {

                            localStorage.setItem('token', res);
                            window.location.href = "index.php?modules=controller_home"

                        }).catch(function() {
                            console.log('Error login')
                        })

                }

            }).catch(function() {
                console.log('Error validate login')
            })

    }
}

$(document).ready(function() {
    button_register();

    button_login();

});