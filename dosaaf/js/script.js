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

    $(document).on('click', '.close-fancy', function() {
        Fancybox.close();
        return false;
    });

    $(document).on('click', '.question-item', function (e) {
        $(this).find('.question-item__body').slideToggle();
        $(this).toggleClass('active');
    });

    if(!is_mobile) {

        window.addEventListener('scroll', function() {
            var menu = document.querySelector('.main-menu_fixed');
            var heightMenu = menu.offsetHeight;

            console.log( heightMenu );

            if (window.pageYOffset > heightMenu) {
                menu.style.top = '10px';
            } else {
                menu.style.top = '40px';
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