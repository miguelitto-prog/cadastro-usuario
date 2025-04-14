
function toggleForms() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    loginForm.classList.toggle('hidden');
    registerForm.classList.toggle('hidden');
}

document.querySelectorAll('.toggle-password').forEach(toggle => {
    toggle.addEventListener('click', function() {
        const input = this.previousElementSibling;
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });
});


const passwordInput = document.getElementById('register-password');
const requirements = {
    length: document.getElementById('length'),
    uppercase: document.getElementById('uppercase'),
    lowercase: document.getElementById('lowercase'),
    number: document.getElementById('number'),
    special: document.getElementById('special')
};

passwordInput.addEventListener('input', function() {
    const password = this.value;
    
    
    if (password.length >= 8) {
        requirements.length.classList.add('valid');
    } else {
        requirements.length.classList.remove('valid');
    }
    
    
    if (/[A-Z]/.test(password)) {
        requirements.uppercase.classList.add('valid');
    } else {
        requirements.uppercase.classList.remove('valid');
    }
    
    // Check lowercase
    if (/[a-z]/.test(password)) {
        requirements.lowercase.classList.add('valid');
    } else {
        requirements.lowercase.classList.remove('valid');
    }
    
     
    if (/[0-9]/.test(password)) {
        requirements.number.classList.add('valid');
    } else {
        requirements.number.classList.remove('valid');
    }
    
    
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        requirements.special.classList.add('valid');
    } else {
        requirements.special.classList.remove('valid');
    }
});


const phoneInput = document.getElementById('register-phone');
phoneInput.addEventListener('input', function(e) {
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
});


function validateLoginForm(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    if (!email || !password) {
        showError('Por favor, preencha todos os campos.');
        return false;
    }
    
    
    console.log('Login form submitted');
    return false;
}

function validateRegisterForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const phone = document.getElementById('register-phone').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    const termsCheckbox = document.getElementById('terms-checkbox');
    
    if (!name || !email || !phone || !password || !confirmPassword) {
        showError('Por favor, preencha todos os campos.');
        return false;
    }
    
    if (password !== confirmPassword) {
        showError('As senhas não coincidem.');
        return false;
    }
    
    if (!isPasswordValid(password)) {
        showError('A senha não atende aos requisitos mínimos.');
        return false;
    }
    
    if (!termsCheckbox.checked) {
        showError('Você precisa aceitar os termos de uso e política de privacidade.');
        return false;
    }
    
    
    console.log('Registration form submitted');
    return false;
}

function isPasswordValid(password) {
    const minLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return minLength && hasUppercase && hasLowercase && hasNumber && hasSpecial;
}

function showError(message) {
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        background-color: #ffebee;
        color: #c62828;
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 15px;
        text-align: center;
        animation: fadeIn 0.3s ease-in-out;
    `;
    errorDiv.textContent = message;
    
    
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    
    const activeForm = document.querySelector('.form-section:not(.hidden)');
    activeForm.insertBefore(errorDiv, activeForm.firstChild);
    
    
    setTimeout(() => {
        errorDiv.style.animation = 'fadeOut 0.3s ease-in-out';
        setTimeout(() => errorDiv.remove(), 300);
    }, 5000);
}
