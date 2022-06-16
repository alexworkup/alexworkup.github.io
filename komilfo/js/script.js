
$( document ).ready(function() {

    const mainSlider = new Swiper('.main-slider.swiper', {
        loop: true,
        effect: "fade",

        pagination: {
            el: '.main-slider .swiper-pagination',
            clickable: true,
        },

    });

    const ourClients = new Swiper('.clients-slider.swiper', {
        slidesPerView: 5,

        pagination: {
            el: '.clients-slider .swiper-pagination',
            clickable: true,
        },

    });
});