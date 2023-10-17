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

    // Crear boton para cerrar el overlay
    const buttonOverlay = document.createElement('P');
    buttonOverlay.textContent = 'X';
    buttonOverlay.classList.add('close-button')
    buttonOverlay.onclick = () => {
        overlay.remove();
        body.classList.remove('body-fixed');
    }
    overlay.appendChild(buttonOverlay);

    // Lo anade al HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('body-fixed');
}

