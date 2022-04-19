function load_menu() {

    if (localStorage.getItem('token')) {

        ajaxPromise("POST", "modules/login/ctrl/controller_login.php?op=data_user", "json")
            .then((res) => {

                let imgavatar = document.getElementById('menu-area-main')

                imgavatar.style = 'background-image: url("' + res.avatar_user + '");height: 50px;width: 50px;';

                let container = document.createElement('div');
                container.id = 'container-info-user'

                let goProfile = document.createElement('div');
                let goLogout = document.createElement('div');

                goProfile.id = 'see-profile'
                goLogout.id = 'butt-logout'

                goProfile.className = 'info-user'
                goLogout.className = 'info-user'

                goProfile.appendChild(document.createTextNode('Profile'))
                goLogout.appendChild(document.createTextNode('Logout'))

                imgavatar.appendChild(container)
                container.appendChild(goProfile)
                container.appendChild(goLogout)

                logout()

            }).catch(function() {
                console.log('Error data user')
            })



    } else {
        let alogin = document.createElement('a');

        alogin.appendChild(document.createTextNode('Login'));
        alogin.href = 'index.php?modules=login_register';

        document.getElementById('menu-area-main').appendChild(alogin);
    }

}

function logout() {

    $('#butt-logout').on('click', function() {

        ajaxPromise("GET", "modules/login/ctrl/controller_login.php?op=logout", "json")
            .then((res) => {
                console.log(res);

                if (res == '_logout') {
                    localStorage.removeItem('token');
                    window.location.href = "index.php?modules=controller_home";
                }

            }).catch(function() {
                console.log('Error ajax logout')
            })
    });

}

$(document).ready(function() {
    load_menu()
});