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
});