window.addEventListener('DOMContentLoaded', ()=> {

    const mainBlock = document.querySelector('.main');
    const popupContent = document.querySelector('#popupContent');
    const itemEvent = document.querySelectorAll('.event');
    const itemVacancy = document.querySelectorAll('#listVacancies .team-section__item');
    const closeBtnFancy = document.querySelectorAll('.js-close-fancy');
    const burgerBtn = document.querySelectorAll('.burger');
    const popupDropdown = document.querySelector('#popupDropdown');
    const popupOrder = document.querySelector('#popupOrder');
    const moreDesc = document.querySelectorAll('.js-more-desc');
    const mapSection = document.querySelector('#map');
    const clubDesc = document.querySelectorAll('.club-cards__desc');
    const itemsSelect = document.querySelectorAll('.js-select');
    const orderBtn = document.querySelectorAll('.js-order');

    if (itemsSelect.length > 0) {
        itemsSelect.forEach((select) => {
            $(select).select2({
                theme: "custom",
                minimumResultsForSearch: -1,
            });
        });
    }

    if(moreDesc.length > 0) {

        moreDesc.forEach((itemDesc)=> {

            tippy(itemDesc, {
                content: itemDesc.closest('.club-cards__desc').querySelector('ul').cloneNode(true),
                allowHTML: true,
                trigger: 'click',
                theme: 'tippy-desc',
                placement: 'top-start',
                onShow: function(instance) {
                    document.querySelector('body').classList.add('show-tippy');
                },
                onHide: function(instance) {
                    document.querySelector('body').classList.remove('show-tippy');
                },
            });
        });

    }

    if(burgerBtn.length > 0) {

        burgerBtn.forEach(item => {

            item.addEventListener('click', (e) => {

                Fancybox.show(
                    [
                        {
                            src: popupDropdown,
                            type: "inline"
                        }
                    ],
                    {
                        mainClass: 'open-toggle'
                    });
            });
        });

    }

    if(orderBtn.length > 0) {

        orderBtn.forEach(item => {

            item.addEventListener('click', (e) => {
                e.preventDefault();

                Fancybox.show(
                    [
                        {
                            src: popupOrder,
                            type: "inline",
                        }
                    ],
                    {
                        mainClass: 'open-order',
                        closeButton: false
                    });
            });
        });

    }

    if(closeBtnFancy.length > 0) {
        closeBtnFancy.forEach(item => {
            item.addEventListener('click', (e) => {
                Fancybox.close();
            });
        });
    }

    if(itemEvent.length > 0) {
        itemEvent.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();

                Fancybox.show(
                    [
                        {
                            src: popupContent,
                            type: "inline"
                        }
                    ],
                    {
                        mainClass: 'open-popup-content'
                    });
            });

        });
    }

    if(itemVacancy.length > 0) {
        itemVacancy.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();

                Fancybox.show(
                    [
                        {
                            src: popupContent,
                            type: "inline"
                        }
                    ],
                    {
                        mainClass: 'open-popup-content'
                    });
            });

        });
    }

    gsap.registerPlugin(ScrollTrigger);

    const screen = gsap.utils.toArray('.screen');

    /*
    if(screen.length > 0) {
        gsap.to(screen, {
            yPercent: -100 * (screen.length - 1),
            ease: 'none',
            scrollTrigger: {
                trigger: '.main',
                pin: true,
                scrub: 1,
                snap: 1 / (screen.length - 1),
                end: () => "+=" +
                    document.querySelector('.main').offsetWidth,
                markers: true,
            }
        });
    }
    */


    // .screen-play
    /*
    const elAnimation = document.querySelectorAll('.js-animation');

    elAnimation.forEach((item) => {
        let delay = item.getAttribute('data-delay');

        gsap.from(item, {
            duration: 1,
            y: '50%',
            opacity: 0,
            ease: 'power2.out',
            delay: delay ? delay : 0,
            scrollTrigger: {
                trigger: item.closest('.screen'),
                start: "80% bottom",
                toggleActions: 'restart pause reverse reverse'
            }
        });
    });
    */


    /*
    document.querySelectorAll('.screen-play').forEach((section) => {
        gsap.from('.play-section__title', {
            duration: 1,
            y: '50%',
            opacity: 0,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: section,
                start: "80% bottom",
                toggleActions: 'restart pause reverse reverse'
            }
        });

        gsap.from('.play-section__button', {
            duration: 1,
            y: '20%',
            opacity: 0,
            ease: 'power2.out',
            delay: 0.3,
            scrollTrigger: {
                trigger: section,
                start: "80% bottom",
                toggleActions: 'restart pause reverse reverse'
            }
        });
    });
     */



    /*
    const screens = document.querySelectorAll('.screen');

    if(screens.length > 1) {

        gsap.utils.toArray(".screen").forEach((screen, i) => {
            ScrollTrigger.create({
                trigger: screen,
                start: "top top",
                pin: true,
                pinSpacing: false,
                scrub: 1,
                //markers: true,
            });
        });
    }
    */

    if(mainBlock) {
        const speed = window.innerWidth <= 979 ? 800 : 1400;
        const screenSwiper = new Swiper(".main", {
            direction: "vertical",
            slidesPerView: 1,
            mousewheel: true,
            allowTouchMove: window.innerWidth <= 979,
            effect: 'fade',
            autoHeight: true,
            //parallax: true,
            speed: speed,
            pagination: {
                el: '.screen-pagination',
                clickable: true,
                renderBullet: function (index, className) {
                    return '<span class="side-pagination__item ' + className + '"><span>' + (this.slides[index].getAttribute('data-title')) + '</span></span>';
                }
            },
            on: {
                slideChange: function () {
                    if(this.activeIndex === 1) {
                        document.querySelector('.side-panel__logo').classList.add('active');
                    }
                },
            },
        });

        screenSwiper.on("slideNextTransitionStart", () => {
            const elementsAnimation = screenSwiper.slides[screenSwiper.activeIndex].querySelectorAll('.js-animation');
            if(elementsAnimation.length > 0) {
                elementsAnimation.forEach((el, index) => {
                    gsap.fromTo(el,
                        { opacity: 0, translateY: '50%' },
                        {
                            opacity: 1,
                            translateY: '0%',
                            duration: speed / 1000,
                            ease: "power2.out",
                            delay: 0.2 * index
                        });
                });
            }
        });

    }


    function initMap(mapId, locations) {
        ymaps.ready(function () {
            const mapElement = document.getElementById(mapId);
            if (!mapElement) return;

            let isMobile = window.innerWidth < 768;
            let zoomLevel = isMobile ? 15 : 16;
            let offsetLng = isMobile ? 0.000 : 0.006;
            let offsetLat = isMobile ? -0.003 : 0;

            // Вычисляем средние координаты для исходного центра
            let avgLat = 0, avgLng = 0;
            locations.forEach(function (location) {
                avgLat += location.centerCoords[0];
                avgLng += location.centerCoords[1];
            });
            avgLat /= locations.length;
            avgLng /= locations.length;

            // Создаем карту с начальным центром
            var map = new ymaps.Map(mapId, {
                center: [avgLat, avgLng],
                zoom: zoomLevel,
                type: 'yandex#map',
                controls: ['zoomControl']
            }, {
                suppressMapOpenBlock: true,
                yandexMapDisablePoiInteractivity: true
            });

            // Добавляем метки на карту
            locations.forEach(function (location) {
                map.geoObjects.add(new ymaps.Placemark(location.centerCoords, {
                    balloonContent: location.balloonContent
                }, {
                    iconLayout: 'default#image',
                    iconImageHref: './images/baloon.svg',
                    iconImageSize: [65, 65],
                    iconImageOffset: [-19, -46],
                    preset: 'islands#icon',
                    iconColor: '#0095b6'
                }));
            });

            // Обновляем центр карты, смещая его в зависимости от устройства
            map.setCenter([avgLat + offsetLat, avgLng - offsetLng]);
        });
    }

    var locations = [
        {
            centerCoords: [55.193448, 61.298960],
            balloonContent: 'Офис: Комсомольский пр., д. 90'
        },
        {
            centerCoords: [55.195031, 61.298663],
            balloonContent: 'Склад: ул. Молдавская, д. 10'
        }
    ];

    if(mapSection) {
        initMap('map', locations);
    }

});