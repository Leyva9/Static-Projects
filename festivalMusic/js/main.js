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
