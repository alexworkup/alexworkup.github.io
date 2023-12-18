$(function() {

    if($('.main-slider').length) {

        const mainSlaiderSwiper = new Swiper('.main-slider .swiper', {
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            pagination: {
                el: '.main-slider .swiper-pagination',
                clickable: true,
            },
        });
    }
});