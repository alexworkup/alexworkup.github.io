$(function() {

    let isMobile = false;

    if (window.innerWidth <= 767) {
        isMobile = true;
    }

    function setupFancyboxForSelector(selector, fancyboxSrc, fancyboxMainClass) {
        const elements = document.querySelectorAll(selector);

        if (elements.length > 0) {
            elements.forEach(item => {
                item.addEventListener('click', () => {
                    Fancybox.show([{
                            src: fancyboxSrc,
                            type: "inline",
                        }],
                        {
                            mainClass: fancyboxMainClass,
                        });

                    return false;
                });
            });
        }

        if(fancyboxMainClass === 'popup-search') {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const popupBlock = document.querySelector(fancyboxSrc);

            if(headerHeight) {
                popupBlock.style.paddingTop = (headerHeight + 24) + 'px';
            }

        }
    }
    setupFancyboxForSelector('[data-open="#order-call"]', "#order-call", 'popup-order');
    setupFancyboxForSelector('[data-open="#open-search"]', "#open-search", 'popup-search');



    const closePopupSearch = document.querySelector('.popup-search__close');
    closePopupSearch.addEventListener('click', () => {
        Fancybox.close();
    });

    const elementsHoverSubmenu = document.querySelectorAll('.nav__link_submenu, .submenu');
    if(elementsHoverSubmenu.length > 0) {

        elementsHoverSubmenu.forEach(item => {

            item.addEventListener('mouseenter', () => {
                document.querySelector('.nav__link_submenu').classList.add('active');
                document.querySelector('.header').classList.add('open-submenu');
            });

            item.addEventListener('mouseleave', () => {
                document.querySelector('.nav__link_submenu').classList.remove('active');
                document.querySelector('.header').classList.remove('open-submenu');
            });
        });
    }

    const mainSlaider = document.querySelector('.main-slider');
    if(mainSlaider) {

        const mainSlaiderSwiper = new Swiper('.main-slider .swiper', {
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            pagination: {
                el: '.main-slider .swiper-pagination',
                clickable: true,
            },
        });
    }

    const wrapperSectionNav = document.querySelector(".section-nav__wrap");
    if(wrapperSectionNav) {
        const nav = priorityNav.init({
            mainNavWrapper: ".section-nav__wrap",
            breakPoint: 0,
            throttleDelay: '50'
        });
    }


    const aboutContent = document.querySelector(".index-about__content");
    let isClamped = false;

    function applyClamp() {

        if (window.innerWidth <= 768 && !isClamped) {
            $clamp(aboutContent, {clamp: 10});
            isClamped = true;
        } else if (window.innerWidth > 768 && isClamped) {
            aboutContent.style = '';
            isClamped = false;
        }
    }

    if(aboutContent) {
        applyClamp();
        window.addEventListener('resize', applyClamp);
    }

    const categoryList = document.getElementById('category-slider');

    let categoryListSwiper;

    function initializeSwiper() {
        if (window.innerWidth >= 768) {

            if (!categoryListSwiper) {

                categoryListSwiper = new Swiper('#category-slider .swiper', {
                    slidesPerView: 1.2,
                    spaceBetween: 10,
                    navigation: {
                        nextEl: '#category-slider .swiper-button-next',
                        prevEl: '#category-slider .swiper-button-prev',
                    },
                    breakpoints: {
                        425: {
                            slidesPerView: 2,
                            spaceBetween: 15
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 15
                        },
                        979: {
                            slidesPerView: 3,
                            spaceBetween: 15
                        },
                        1280: {
                            slidesPerView: 4,
                            spaceBetween: 26,
                        },
                    }
                });
            }
        } else if (categoryListSwiper) {

            categoryListSwiper.destroy(true, true);
            categoryListSwiper = null;
        }
    }

    initializeSwiper();

    window.addEventListener('resize', initializeSwiper);

    // Функция для инициализации карты с меткой
    function initMap(mapId, centerCoords, balloonContent) {
        ymaps.ready(function () {
            var map = new ymaps.Map(mapId, {
                center: centerCoords,
                zoom: 15
            });

            map.geoObjects
                .add(new ymaps.Placemark(centerCoords, {
                    balloonContent: balloonContent
                }, {
                    iconLayout: 'default#image',
                    iconImageHref: './images/balloon.svg',
                    iconImageSize: [38, 46],
                    iconImageOffset: [-30, -50],
                    preset: 'islands#icon',
                    iconColor: '#0095b6'
                }));
        });
    }

    // Конфигурация карт
    var mapsConfig = [
        {
            mapId: 'map-1',
            centerCoords: [55.165786, 61.409947],
            balloonContent: 'Офис: Челябинск, ул. Маркса, 46, оф. 405'
        },
        {
            mapId: 'map-2',
            centerCoords: [55.098444, 61.367429],
            balloonContent: 'Склад: Челябинск, ул. 2-я Потребительская, 26. График работы с 9-17, пн-пт'
        }
    ];

    // Инициализация всех карт
    mapsConfig.forEach(function(config) {
        if($('#' + config.mapId).length) {
            initMap(config.mapId, config.centerCoords, config.balloonContent);
        }
    });

    const tabLinks = document.querySelectorAll('.product .nav-tab__link');
    let isTrim = false;

    function updateTextContent() {
        if (window.innerWidth <= 768 && !isTrim) {
            tabLinks.forEach((item) => {
                if (item.textContent.trim() === "Характеристики") {
                    item.textContent = "Хар-ки";
                    isTrim = true;
                }
            });
        } else if (window.innerWidth > 768 && isTrim) {
            tabLinks.forEach((item) => {
                if (item.textContent.trim() === "Хар-ки") {
                    item.textContent = "Характеристики";
                    isTrim = false;
                }
            });
        }
    }

    // Проверка при первоначальной загрузке
    updateTextContent();

    // Добавление debounce к обработчику resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(updateTextContent, 250);
    });


    const headerMobileClose = document.querySelector('.header-mobile__close');
    const headerMobile = document.querySelector('.header-mobile');
    const body = document.querySelector('body');
    const toggle = document.querySelector('.toggle');

    if (headerMobileClose && headerMobile && toggle) {

        headerMobileClose.addEventListener('click', () => {
            headerMobile.classList.remove('open');
            body.classList.remove('open-burger');
        });

        toggle.addEventListener('click', () => {
            headerMobile.classList.add('open');
            body.classList.add('open-burger');
        });
    }
});