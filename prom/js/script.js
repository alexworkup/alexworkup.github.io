var isMobile = false;
$(document).ready(function () {

    if ($(window).width() <= 768) {
        isMobile = true;
    }

    /* HEADER */
    if(isMobile) {

        $(document).on('click', '.header .toggle', function () {
            $(this).toggleClass('active');
            $('.header-mobile').toggleClass('active');
            $('body').toggleClass('open-mobile');
            return false;
        });
    }

    var header = $('.header');

    if(header.offset().top >= 100) {
        header.addClass('header--color');
    } else {
        header.removeClass('header--color');
    }

    $(window).scroll(function () {
        if($(window).scrollTop() >= 100) {
            header.addClass('header--color');
        } else {
            header.removeClass('header--color');
        }
    });
    /* HEADER */

    /* PHONE */
    if(!isMobile) {
        $(document).on('click', '.phone__arrow', function () {
            $(this).parents('.phone').toggleClass('active');
            return false;
        });
    }
    /* PHONE */

    /* SLIDER */
    const mainSlider = new Swiper('.js-slider .swiper', {
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
    /* SLIDER */
});