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

    var favoritesSlider = null;
    var productsSlider = null;
    var partnersSlider = null;

    $(window).on('load resize', function () {

        if($(this).innerWidth() <= 768) {

            if($('.header .toggle').length) {
                $('.header .toggle').addClass('js-click');
            }

            if (!favoritesSlider) {
                favoritesSlider = new Swiper('.js-slider.js-slider--favorites .swiper', {
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

            if(!productsSlider) {

                productsSlider = new Swiper('.js-slider.js-slider--products .swiper', {
                    slidesPerView: 1,

                    breakpoints: {

                        480: {
                            slidesPerView: 1.5,
                        },
                    }
                });
            }

            if(!partnersSlider) {

                partnersSlider = new Swiper('.js-slider.js-slider--partners .swiper', {
                    slidesPerView: 2,

                    breakpoints: {

                        480: {
                            slidesPerView: 3,
                        },
                    }
                });
            }

            console.log('mobile');
        } else {

            if($('.header .toggle').length) {
                $('.header .toggle').removeClass('js-click');
            }

            $(document).on('click', '.header .phone__arrow', function () {
                $(this).parents('.phone').toggleClass('active');
                return false;
            });

            if (favoritesSlider) {
                favoritesSlider.destroy();
                favoritesSlider = null;
            }

            if (productsSlider) {
                productsSlider.destroy();
                productsSlider = null;
            }

            if (partnersSlider) {
                partnersSlider.destroy();
                partnersSlider = null;
            }

            console.log('NOT mobile');
        }
    });

    $(document).on('click', '.header .toggle.js-click', function (event) {
        $(this).toggleClass('active');
        $('.header-mobile').toggleClass('active');
        $('body').toggleClass('open-mobile');
        event.preventDefault();
        return false;
    });

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