function load_login() {
    let container_login = document.getElementById('container-login')
    let main_login = document.createElement('div')
    let inputchk = document.createElement('input')
    let login = document.createElement('div')

    let form_login = document.createElement('form')
    let label_login = document.createElement('label')
    let label_signup = document.createElement('label')

    let inputname_login = document.createElement('input')
    let span_name_login = document.createElement('span')
    // let inputemail_login = document.createElement('input')
    let inputpasswd_login = document.createElement('input')
    let span_passwd_login = document.createElement('span')

    let div_scroll = document.createElement('div')

    let inputname_signup = document.createElement('input')
    let span_name_signup = document.createElement('span')
    let inputemail_signup = document.createElement('input')
    let span_email_signup = document.createElement('span')
    let inputpasswd_signup = document.createElement('input')
    let span_passwd_signup = document.createElement('span')
    let inputpasswd2_signup = document.createElement('input')
    let span_passwd2_signup = document.createElement('span')

    let loginbutton = document.createElement('input')
    let signupbutton = document.createElement('input')

    let signup = document.createElement('div')
    let form_signup = document.createElement('form')

    main_login.className = 'main-login'

    inputchk.type = 'checkbox'
    inputchk.id = 'chk'
    inputchk.ariaHidden = ''

    login.className = 'login'

    form_login.className = 'form-login'
    form_login.id = 'form-login'

    label_login.setAttribute('for', 'chk')
    label_login.setAttribute('aria-hidden', 'true')
    label_login.appendChild(document.createTextNode('Login'))

    label_signup.setAttribute('for', 'chk')
    label_signup.ariaHidden = ''
    label_signup.appendChild(document.createTextNode('Register'))

    inputname_login.type = 'text'
    inputname_login.name = 'name'
    inputname_login.placeholder = 'User name'
    inputname_login.setAttribute('required', '')
    inputname_login.style = 'height: 30px;'
    inputname_login.id = 'name-login'

    // inputemail_login.type = 'email'
    // inputemail_login.name = 'email'
    // inputemail_login.placeholder = 'Email'
    // inputemail_login.setAttribute('required', '')
    // inputemail_login.style = 'height: 30px;'

    inputpasswd_login.type = 'password'
    inputpasswd_login.name = 'passwd'
    inputpasswd_login.placeholder = 'Password'
    inputpasswd_login.setAttribute('required', '')
    inputpasswd_login.style = 'height: 30px;'
    inputpasswd_login.id = 'passwd-login'

    span_name_login.id = 'error_name_login'
    span_name_login.className = 'error'
    span_passwd_login.id = 'error_passwd_login'
    span_passwd_login.className = 'error'

    div_scroll.id = 'container-register'

    inputname_signup.type = 'text'
    inputname_signup.name = 'name'
    inputname_signup.placeholder = 'User name'
    inputname_signup.setAttribute('required', '')
    inputname_signup.style = 'height: 30px;'
    inputname_signup.id = 'name-register'

    inputemail_signup.type = 'email'
    inputemail_signup.name = 'email'
    inputemail_signup.placeholder = 'Email'
    inputemail_signup.setAttribute('required', '')
    inputemail_signup.style = 'height: 30px;'
    inputemail_signup.id = 'email-register'

    inputpasswd_signup.type = 'password'
    inputpasswd_signup.name = 'passwd'
    inputpasswd_signup.placeholder = 'Password'
    inputpasswd_signup.setAttribute('required', '')
    inputpasswd_signup.style = 'height: 30px;'
    inputpasswd_signup.id = 'passwd-register'

    inputpasswd2_signup.type = 'password'
    inputpasswd2_signup.name = 'passwd2'
    inputpasswd2_signup.placeholder = 'Repeat password'
    inputpasswd2_signup.setAttribute('required', '')
    inputpasswd2_signup.style = 'height: 30px;'
    inputpasswd2_signup.id = 'passwd2-register'

    loginbutton.id = 'login-butt'
    loginbutton.type = 'button'
    loginbutton.value = 'Login'

    signupbutton.id = 'register-butt'
    signupbutton.type = 'button'
    signupbutton.value = 'Register'

    signup.className = 'signup'
    form_signup.className = 'form-signup'
    form_signup.id = 'form-signup'

    span_name_signup.id = 'error_name'
    span_name_signup.className = 'error'
    span_email_signup.id = 'error_email'
    span_email_signup.className = 'error'
    span_passwd_signup.id = 'error_passwd'
    span_passwd_signup.className = 'error'
    span_passwd2_signup.id = 'error_passwd2'
    span_passwd2_signup.className = 'error'

    container_login.appendChild(main_login)
    main_login.appendChild(inputchk)

    main_login.appendChild(login)
    login.appendChild(form_login)

    form_login.appendChild(label_login)
    form_login.appendChild(inputname_login)
    form_login.appendChild(span_name_login)
    form_login.appendChild(inputpasswd_login)
    form_login.appendChild(span_passwd_login)
    form_login.appendChild(loginbutton)

    main_login.appendChild(signup)
    signup.appendChild(form_signup)

    form_signup.appendChild(label_signup)
    form_signup.appendChild(div_scroll)
    div_scroll.appendChild(inputname_signup)
    div_scroll.appendChild(span_name_signup)
    div_scroll.appendChild(inputemail_signup)
    div_scroll.appendChild(span_email_signup)
    div_scroll.appendChild(inputpasswd_signup)
    div_scroll.appendChild(span_passwd_signup)
    div_scroll.appendChild(inputpasswd2_signup)
    div_scroll.appendChild(span_passwd2_signup)
    form_signup.appendChild(signupbutton)

}

$(document).ready(function() {
    load_login();
});