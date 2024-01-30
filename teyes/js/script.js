$(function() {

    let isMobile = false;

    if (window.innerWidth <= 767) {
        isMobile = true;
    }

    const elementToggle = document.querySelectorAll('.js-toggle, .js-toggle-box, .js-toggle-close');

    elementToggle.forEach((item) => {
        console.log(item);
        item.addEventListener('click', ()=> {
            this.classList.toggle('active');
        })
    });
});