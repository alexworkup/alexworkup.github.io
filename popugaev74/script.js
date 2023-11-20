var is_mobile = false;

$(document).ready(function() {

    const swiper = new Swiper('.sections.swiper', {
        effect: 'fade',
        speed: 1500,
        autoplay: false,
        mousewheel: true,

        pagination: {
            el: ".main-slider .swiper-pagination",
            clickable: true,
        },
    });

    const $btnToggle = document.querySelector('.menu-fixed');
    const $btnClose = document.querySelector('.menu-toggle__close');
    const $menuToggle = document.querySelector('.menu-toggle');

    if($menuToggle) {

        $btnToggle.addEventListener('click', () => {
            $menuToggle.classList.add('active');
        });

        $btnClose.addEventListener('click', () => {
            $menuToggle.classList.remove('active');
        });
    }
});