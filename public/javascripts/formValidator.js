const login_form = document.getElementById('loginForm');
const register_form = document.getElementById('registerForm');

const loginFormChanger_el = document.getElementById('loginFormChanger');
const registerFormChanger_el = document.getElementById('registerFormChanger');

const userName_input = document.getElementById('newUserName')
const name_input = document.getElementById('name')
const lastname_input = document.getElementById('lastname')
const password_input = document.getElementById('password')
const confPassword_input = document.getElementById('confPassword')
const uolEmail_input = document.getElementById('uolEmail')

const formErrors_el = document.getElementById("form_errors")

/* Change between forms */
registerFormChanger_el.addEventListener('click', () => {
    login_form.style.display = 'none'
    register_form.style.display = 'block'
})
loginFormChanger_el.addEventListener('click', () => {
    login_form.style.display = 'block'
    register_form.style.display = 'none'
})

/* Trigger validation on change */
userName_input.addEventListener('change', () => validate('userName'))
name_input.addEventListener('change', () => validate('name'))
lastname_input.addEventListener('change', () => validate('lastName'))
password_input.addEventListener('change', () => validate('password'))
confPassword_input.addEventListener('change', () => validate('confPassword'))
uolEmail_input.addEventListener('change', () => validate('uolEmail'))

const formErrors = {
    userName: '',
    name: '',
    lastName: '',
    password: '',
    confPassword: '',
    uolEmail: ''
}

function validate(field) {
    switch (field) {
        case 'userName':
            userName_input.value = userName_input.value.replace(/[^a-z0-9]/gi, '')
            formErrors.userName =
                (userName_input.value === '') ?
                    'Enter a valid alpha-numeric user name' : ''
            break;
        case 'name':
            name_input.value = name_input.value.replace(/[^a-z\s]/gi, '').trim()
            formErrors.name =
                (name_input.value === '') ?
                    'Enter a valid name in latin alphabet' : ''
            break;
        case 'lastName':
            lastname_input.value = lastname_input.value.replace(/[^a-z\s]/gi, '').trim()
            formErrors.lastName =
                (lastname_input.value === '') ?
                    'Enter a valid last name in latin alphabet' : ''
            break;
        case 'password':
            formErrors.password =
                (password_input.value.length < 8) ?
                    'Password must have 8 characters' : ''
            break;
        case 'confPassword':
            formErrors.confPassword =
                (password_input.value !== confPassword_input.value) ?
                    'Passwords are not equal' : ''
            break;
        case 'uolEmail':
            const mailDomain = '@student.london.ac.uk'
            const input = uolEmail_input.value
            if (input.search(mailDomain) !== -1) {
                const userMail = input.replace(mailDomain, '')
                    .replace(/[^a-z0-9.-_]/gi, '').replace(':', '')
                if (userMail === '') {
                    formErrors.uolEmail = 'Enter a valid student email name'
                    uolEmail_input.value = userMail
                    break;
                }
                uolEmail_input.value = userMail + mailDomain
                formErrors.uolEmail = ''
            } else {
                formErrors.uolEmail = 'Enter a valid student email ending with @student.london.ac.uk'
            }
            break;
    }
    updateErrorBox()
}

function updateErrorBox() {
    let errorString = ''
    for (let key in formErrors) {
        const field = formErrors[key].toString()
        if (field !== '') {
            errorString += '<li>' + field + '</li> \n'
        }
    }
    formErrors_el.innerHTML = errorString
}
