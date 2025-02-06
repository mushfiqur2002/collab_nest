const forms = document.querySelectorAll('form');
const buttons = document.querySelectorAll('.form_container .btn_container button');

// Set default form and active button
forms.forEach(form => {
    if (form.getAttribute('data-set') === 'versity') {
        form.style.display = 'flex'; // Show Versity form by default
    } else {
        form.style.display = 'none'; // Hide the other form
    }
});

// Set default active button style
buttons.forEach(button => {
    if (button.getAttribute('data-set') === 'versity') {
        button.style.backgroundColor = '#007BFF'; // Active button color (Blue)
        button.style.color = '#fff'; // White text for active button
    } else {
        button.style.backgroundColor = ''; // Default
        button.style.color = ''; // Default
    }
});


buttons.forEach(button => {
    button.addEventListener('click', () => {
        const targetForm = button.getAttribute('data-set');
        forms.forEach(form => {
            if (form.getAttribute('data-set') === targetForm) {
                form.style.display = 'flex';
            } else {
                form.style.display = 'none';
            }
        });

        buttons.forEach(btn => {
            btn.style.backgroundColor = '';
            btn.style.color = '';
        })

        button.style.backgroundColor = '#007BFF';
        button.style.color = '#fff';
    });
});

