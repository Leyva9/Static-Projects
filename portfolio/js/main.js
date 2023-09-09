document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.getElementById('menuButton');
    const navBar = document.getElementById('navBar');

    let isOpen = false;

    burgerMenu.addEventListener('click', () => {
        isOpen = !isOpen;
        if(isOpen) {
            navBar.classList.add('visible');
        }
        else {
            navBar.classList.remove('visible');   
        }
    });

    const button = document.getElementById('contactButton');
    const heroContainer = document.getElementById('heroContainer');

    heroContainer.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.2)'; 
    });

    heroContainer.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)'; 
    });
});






