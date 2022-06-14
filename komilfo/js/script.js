
$( document ).ready(function() {

    const mainSlider = new Swiper('.main-slider.swiper', {
        loop: true,
        effect: "fade",

        pagination: {
            el: '.main-slider .swiper-pagination',
            clickable: true,
        },

    });
});