
$( document ).ready(function() {


    // Слайдеры

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

        navigation: {
            nextEl: '.our-clients .slider-arrow--next',
            prevEl: '.our-clients .slider-arrow--prev',
        },
    });

    const cards = new Swiper('.card-slider .swiper', {
        slidesPerView: 4,

        navigation: {
            nextEl: '.card-slider .slider-arrow--next',
            prevEl: '.card-slider .slider-arrow--prev',
        },
    });

    // Слайдеры


    // Яндекс карта
    ymaps.ready(function () {
        var map = new ymaps.Map("map", {
            center: [55.648484, 37.501950],
            zoom: 15
        });

        if (map) {

            map.geoObjects
                .add(new ymaps.Placemark([55.648484, 37.501950], {
                    balloonContent: 'Комильфо сервис<br> <a href="tel:+74957237444">8 (495) 723-74-44</a>'
                }, {
                    preset: 'islands#icon',
                    iconColor: '#0095b6'
                }))

        }
    });

});