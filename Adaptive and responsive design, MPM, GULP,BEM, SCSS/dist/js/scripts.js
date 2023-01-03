const burgerButton = document.querySelector('.burger-button');
const headerNav = document.querySelector('.header-nav');

const burgerMenu = () => {
    burgerButton.addEventListener('click', () => {
        burgerButton.classList.toggle('burger-button--active');
        headerNav.classList.toggle('header-nav--active');
    })
}
burgerMenu();

window.addEventListener('resize', () => {
    if (window.innerWidth > 480) {
        burgerButton.classList.replace('burger-button--active', 'burger-button');
        headerNav.classList.replace('header-nav--active', 'header-nav');

    }
});

const links = document.querySelectorAll('a');
links.forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
    })
});