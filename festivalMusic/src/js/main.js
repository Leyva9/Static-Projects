document.addEventListener('DOMContentLoaded', function() {
    startapp();
});

function startapp() {
    const title = document.querySelector('.header-container h1');
    
    if (window.innerWidth < 480) {
        title.innerHTML = '<span class="w1">W</span>orld<br><span class="w2">W</span>ide<br><span class="m">M</span>usic<br><span class="punto">.</span>org</h1>';
    } else {
        title.innerHTML = '<span class="w1">W</span>orld<span class="w2">W</span>ide<span class="m">M</span>usic<span class="punto">.</span>org</h1>';
    }
    
    window.addEventListener('resize', () => {
        if(window.innerWidth < 480) {
            title.innerHTML = '<span class="w1">W</span>orld<br><span class="w2">W</span>ide<br><span class="m">M</span>usic<br><span class="punto">.</span>org</h1>';
        } else {
            title.innerHTML = '<span class="w1">W</span>orld<span class="w2">W</span>ide<span class="m">M</span>usic<span class="punto">.</span>org</h1>';
        }
    });

    fixedNav();
    scrollNav();
    createGallery();
}

function createGallery() {
    const gallery = document.querySelector('.gallery-images');

    for(let i = 1; i <= 12; i++)
    {
        const images = document.createElement('picture');
        images.innerHTML = `
            <source srcset="./build/img/thumb/${i}.avif" type="img/avif">
            <source srcset="./build/img/thumb/${i}.webp">
            <img loading="lazy" width="200" height="300" src="./build/img/thumb/${i}.jpg" alt="gallery-image">
        `;
        // images.addEventListener('click', function(){

        // });
        images.onclick = () => {
            showimage(i);
        }
        gallery.appendChild(images);
    }
}

function showimage(img) {
    const images = document.createElement('picture');
    images.innerHTML = `
            <source srcset="./build/img/grande/${img}.avif" type="img/avif">
            <source srcset="./build/img/grande/${img}.webp">
            <img loading="lazy" width="200" height="300" src="./build/img/grande/${img}.jpg" alt="gallery-image">
        `;
    // Crea el overlay con la imagen
    const overlay = document.createElement('div');
    overlay.appendChild(images);
    overlay.classList.add('overlay');
    overlay.onclick = () => {
        overlay.remove();
        body.classList.remove('body-fixed');
    }

    // Lo anade al HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('body-fixed');
}

function scrollNav() {
    const links = document.querySelectorAll('.main-nav a');
    links.forEach( link => {
        link.addEventListener('click', e => {
            e.preventDefault();

            const scrollSection = e.target.attributes.href.value;
            const section = document.querySelector(scrollSection);
            section.scrollIntoView( { behavior: "smooth" } );
        });
    })
}

function fixedNav() {
    const navBar = document.querySelector('.header');
    const hero = document.querySelector('.concerts-about');
    const body = document.querySelector('body');

    window.addEventListener('scroll', e => {
        if( hero.getBoundingClientRect().top < 0 ) {
            navBar.classList.add('fixedBar');
            body.classList.add('bodyScroll');
        } else {
            navBar.classList.remove('fixedBar');
            body.classList.remove('bodyScroll');
        }
    });
}
