const themeSwitch = document.getElementById('theme-switch');
const moonIcon = document.getElementById('moon-icon');
const sunIcon = document.getElementById('sun-icon');

// Set the initial state of the theme based on the value of the "data-bs-theme" attribute on the body element
if (document.body.getAttribute('data-bs-theme') === 'dark') {
    themeSwitch.checked = true;
    moonIcon.style.display = 'block';
    sunIcon.style.display = 'none';
}

// Handle the change event of the theme switch
themeSwitch.addEventListener('change', (event) => {
if (event.target.checked) {
    document.body.setAttribute('data-bs-theme', 'dark');
    moonIcon.style.display = 'block';
    sunIcon.style.display = 'none';
} else {
    document.body.setAttribute('data-bs-theme', 'light');
    moonIcon.style.display = 'none';
    sunIcon.style.display = 'block';
}
});
