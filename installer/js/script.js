var is_mobile = false;

$( document ).ready(function() {

    if ($(window).width() <= 768) {
        is_mobile = true;
    }

    const mainSlider = new Swiper('.main-slider.swiper', {
        effect: 'fade',
        navigation: {
            nextEl: '.main-slider .swiper-button-next',
            prevEl: '.main-slider .swiper-button-prev',
        },
        pagination: {
            el: '.main-slider .swiper-pagination',
            clickable: true,
        },

        on: {

            init: function () {

                if($('.slider-num__cur').length) {
                    $('.slider-num__cur').text(this.activeIndex + 1)
                }
            },

            slideChange: function () {

                if($('.slider-num__cur').length) {
                    $('.slider-num__cur').text(this.activeIndex + 1)
                }
            },
        },
    });


});