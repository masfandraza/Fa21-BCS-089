const form = document.getElementById('checkoutForm');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    let isValid = true;

    const fields = [
        { id: 'fullname', message: 'Full Name is required and should contain only alphabets.' },
        { id: 'email', message: 'Please enter a valid email address.' },
        { id: 'phone', message: 'Phone Number must contain 10 to 15 digits.' },
        { id: 'address', message: 'Address is required.' },
        { id: 'card', message: 'Credit Card Number must be 16 digits.' },
        { id: 'expiry', message: 'Expiry Date must be in the future.' },
        { id: 'cvv', message: 'CVV must be exactly 3 digits.' }
    ];

    fields.forEach(field => {
        const input = document.getElementById(field.id);
        const errorMsg = input.nextElementSibling;

        if (!input.checkValidity()) {
            errorMsg.innerText = field.message;
            errorMsg.style.display = 'block';
            input.classList.add('error');
            isValid = false;
        } else if (field.id === 'expiry' && new Date(input.value + '-01') <= new Date()) {
            errorMsg.innerText = 'Expiry Date must be in the future.';
            errorMsg.style.display = 'block';
            input.classList.add('error');
            isValid = false;
        } else {
            errorMsg.innerText = '';
            errorMsg.style.display = 'none';
            input.classList.remove('error');
        }
    });

    if (isValid) {
        alert('Form submitted successfully!');
        form.reset();
    }
});
