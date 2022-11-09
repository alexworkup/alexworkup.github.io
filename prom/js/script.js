var isMobile = false;
$(document).ready(function () {

    if ($(window).width() <= 768) {
        isMobile = true;
    }

    $(window).scroll(function () {
        checkOffset('.header');
    });

    checkOffset('.header');

    if($('.js-slider').length) {
        const mainSlider = new Swiper('.js-slider.js-slider--main .swiper', {
            effect: 'fade',

            pagination: {
                el: '.js-slider .swiper-pagination',
                clickable: true,
            },

            on: {
                slideChange: function () {
                    if($('.fraction').length) {
                        $('.fraction span').text(this.activeIndex + 1);
                    }
                }
            }
        });
    }

    $(window).on('load resize', function () {

        if($(this).innerWidth() <= 768) {
            $(document).on('click', '.header .toggle', function () {
                $(this).toggleClass('active');
                $('.header-mobile').toggleClass('active');
                $('body').toggleClass('open-mobile');
                return false;
            });
        } else {

        }
    });


    /*
    if(isMobile) {

        $(document).on('click', '.header .toggle', function () {
            $(this).toggleClass('active');
            $('.header-mobile').toggleClass('active');
            $('body').toggleClass('open-mobile');
            return false;
        });
    }


    if(!isMobile) {
        $(document).on('click', '.phone__arrow', function () {
            $(this).parents('.phone').toggleClass('active');
            return false;
        });
    }


    if(isMobile) {
        const favoritesSlider = new Swiper('.js-slider-favorites .swiper', {
            slidesPerView: 1.25,

            breakpoints: {

                320: {
                    slidesPerView: 1.25,
                },

                480: {
                    slidesPerView: 2.25,
                },

            }
        });

        const productsSlider = new Swiper('.js-slider-products .swiper', {
            slidesPerView: 1.25,

            breakpoints: {

                320: {
                    slidesPerView: 1.25,
                },

                480: {
                    slidesPerView: 2.25,
                },

            }
        });
    }
     */

    function checkOffset(element) {
        if($(element).length) {
            if($(element).offset().top >= 100) {
                $(element).addClass('header--color');
            } else {
                $(element).removeClass('header--color');
            }
        } else {
            return false;
        }
    }
});