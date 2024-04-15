window.addEventListener('DOMContentLoaded', ()=> {

    const popupContent = document.querySelector('#popupContent');
    const itemVacancy = document.querySelectorAll('#listVacancies .team-section__item');
    const closeBtnFancy = document.querySelectorAll('.js-close-fancy');
    const burgerBtn = document.querySelectorAll('.burger');
    const popupDropdown = document.querySelector('#popupDropdown');
    const moreDesc = document.querySelectorAll('.js-more-desc');
    const clubDesc = document.querySelectorAll('.club-cards__desc');

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
                        mainClass: 'open-popup-content'
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

    function initMap(mapId, locations) {
        ymaps.ready(function () {
            const mapElement = document.getElementById(mapId);
            if (!mapElement) return;

            // Определяем начальные параметры для карты
            let isMobile = window.innerWidth < 768; // Примерная ширина для определения мобильного устройства
            let zoomLevel = isMobile ? 15 : 16; // Уменьшаем масштаб на мобильных
            let offsetLng = isMobile ? 0.000 : 0.006; // Уменьшаем смещение на мобильных
            let offsetLat = isMobile ? -0.003 : 0; // Смещаем карту вверх на мобильных

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

    initMap('map', locations);



});