var is_mobile = false;

$( document ).ready(function() {

    if ($(window).width() <= 500) {
        is_mobile = true;
    }

    $(document).on('click', '.js-up', function() {
        $("html, body").animate({
            scrollTop: 0
        }, {
            duration: 500,
            easing: "swing"
        });
    });


    if ($(window).width() <= 500) {
        is_mobile = true;
    }

    if(is_mobile) {

        window.addEventListener('scroll', function() {
            var headerMobile = document.querySelector('.header-mobile');
            var topMobile = document.querySelector('.header-mobile-top');
            var heightTopMobile = topMobile.offsetHeight;
            var wrapTopMobile = document.querySelector('.header-mobile__control');

            if (window.pageYOffset > headerMobile.offsetHeight) {
                topMobile.classList.add('fixed');
                wrapTopMobile.style.paddingBottom = heightTopMobile+'px';
            } else {
                topMobile.classList.remove('fixed');
                wrapTopMobile.style.paddingBottom = '10px';
            }
        });
    } else {

        window.addEventListener('scroll', function() {
            var header = document.querySelector('.header');
            var mainNav = document.querySelector('.main-menu_top');
            var heightMenu = mainNav.offsetHeight;
            var wrapMenu = document.querySelector('.header__row_menu');

            if (window.pageYOffset > header.offsetHeight - heightMenu) {
                mainNav.classList.add('fixed');
                wrapMenu.style.paddingBottom = heightMenu+'px';
            } else {
                mainNav.classList.remove('fixed');
                wrapMenu.style.paddingBottom = 0;
            }
        });
    }


    if($('.mobile-menu').length) {

        $(document).on('click', '.toggle', function (e) {

            Fancybox.show(
                [{ src: "#mobile-menu", type: "inline" }],
                {
                    mainClass: 'mobile-menu-open',
                }
            );

            return false;
        });
    }

    if($('.big-gallery').length) {

        const smallGallery = new Swiper('.small-gallery.swiper', {
            slidesPerView: 4,
            spaceBetween: 8,
            freeMode: true,
            watchSlidesProgress: true,
        });

        const bigGallery = new Swiper('.big-gallery.swiper', {
            slidesPerView: 1,
            spaceBetween: 10,
            effect: 'fade',

            thumbs: {
                swiper: smallGallery,
            },

            navigation: {
                nextEl: '.big-gallery .swiper-button-next',
                prevEl: '.big-gallery .swiper-button-prev',
            },
        });
    }

    if($('.map').length) {

        ymaps.ready(function () {
            var map = new ymaps.Map("map", {
                center: [55.148462, 59.678929],
                zoom: 15
            });

            if (map) {

                map.geoObjects
                    .add(new ymaps.Placemark([55.148462, 59.678929], {
                        balloonContent: 'Художественная литейная мастерская «А-Элит»'
                    }, {
                        iconLayout: 'default#image',
                        iconImageHref: './images/baloon.svg',
                        iconImageSize: [73, 53],
                        iconImageOffset: [-30, -50],
                        preset: 'islands#icon',
                        iconColor: '#0095b6'
                    }))

            }
        });
    }

});