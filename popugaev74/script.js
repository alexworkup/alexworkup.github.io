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

});