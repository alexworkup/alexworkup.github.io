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

    const workSlider = new Swiper('.work-list.swiper', {
        slidesPerView: 4,
        spaceBetween: 30,
        navigation: {
            nextEl: '.our-work .swiper-button-next',
            prevEl: '.our-work .swiper-button-prev',
        },
    });

    const manufacturersSlider = new Swiper('.manufacturers-list.swiper', {
        slidesPerView: 6,
        spaceBetween: 0,
        navigation: {
            nextEl: '.manufacturers .swiper-button-next',
            prevEl: '.manufacturers .swiper-button-prev',
        },
    });

    const reviewsSlider = new Swiper('.reviews-list.swiper', {
        slidesPerView: 3,
        spaceBetween: 26,
        navigation: {
            nextEl: '.reviews .swiper-button-next',
            prevEl: '.reviews .swiper-button-prev',
        },
    });


});