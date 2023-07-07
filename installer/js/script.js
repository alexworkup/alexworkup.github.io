var is_mobile = false;

$( document ).ready(function() {

    if ($(window).width() <= 767) {
        is_mobile = true;
    }

    $(document).on('click', '.question-item', function (e) {
        $(this).find('.question-item__body').slideToggle();
        $(this).toggleClass('active');
    });


    if(is_mobile) {

        const serviceSlider = new Swiper('.services-list.swiper', {
            slidesPerView: 1.15,
            spaceBetween: 11,
        });
    }

    $('input[type=tel]').inputmask({
        mask: '+7 (*{1}99) 999-99-99',
        placeholder: "+7 (___) ___-__-__",
        androidHack: "rtfm",
        definitions: {
            '*': {
                validator: "[0-6,9]"
            }
        }
    });

    $(document).on('click', '.close-fancy', function() {
        Fancybox.close();
        return false;
    });

    if(!is_mobile) {

        var mainMenu = document.querySelector('.header .main-menu');

        window.addEventListener('scroll', function() {
            var mainMenuRect = mainMenu.getBoundingClientRect();
            var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollPosition >= mainMenuRect.top) {
                mainMenu.classList.add('fixed');
            } else {
                mainMenu.classList.remove('fixed');
            }
        });
    }

    var submenu = document.querySelector('.submenu');
    var mainNavLinks = document.querySelectorAll('.main-nav__link[data-submenu]');

    if(mainNavLinks) {

        mainNavLinks.forEach(function (link) {
            var submenuId = link.getAttribute('data-submenu');
            var submenuElement = document.getElementById(submenuId);

            link.addEventListener('mouseover', function (event) {
                submenuElement.classList.add('active');
                link.classList.add('active');
                getHeight(this, event.type);
            });

            link.addEventListener('mouseout', function (event) {
                submenuElement.classList.remove('active');
                link.classList.remove('active');
                getHeight(this, event.type);
            });

        });
    }

    submenu.addEventListener('mouseover', function (event) {
        this.classList.add('active');
        document.querySelector('.main-nav__link[data-submenu="' + this.getAttribute('id') + '"]').classList.add('selected');
        getHeight(this, event.type);
    });

    submenu.addEventListener('mouseout', function (event) {
        this.classList.remove('active');
        document.querySelector('.main-nav__link[data-submenu="' + this.getAttribute('id') + '"]').classList.remove('selected');
        getHeight(this, event.type);
    });

    function getHeight(element, event) {
        var submenuElement;

        if(element.getAttribute('data-submenu')) {
            submenuElement = document.getElementById(element.getAttribute('data-submenu'));
        }

        if(element.getAttribute('id')) {
            submenuElement = document.getElementById(element.getAttribute('id'));
        }

        if(submenuElement) {
            var ulList = submenuElement.querySelectorAll('ul');
            var maxHeight = 0;

            ulList.forEach(function(ul) {

                var ulHeight = ul.offsetHeight;
                if (ulHeight > maxHeight) {
                    maxHeight = ulHeight;
                }
            });

            if(event === 'mouseover') {
                submenuElement.style.minHeight = maxHeight + 'px';
            }

            if(event === 'mouseout') {
                submenuElement.style.minHeight = 0 + 'px';
            }
        }

    }

    const mainSlider = new Swiper('.main-slider.swiper', {
        effect: 'fade',
        navigation: {
            nextEl: '.main-slider .swiper-button-next',
            prevEl: '.main-slider .swiper-button-prev',
        },
        pagination: {
            el: '.main-slider .swiper-pagination',
            clickable: true,
        },

        on: {

            init: function () {

                if($('.slider-num__cur').length) {
                    $('.slider-num__cur').text(this.activeIndex + 1)
                }
            },

            slideChange: function () {

                if($('.slider-num__cur').length) {
                    $('.slider-num__cur').text(this.activeIndex + 1)
                }
            },
        },
    });

    if(!is_mobile) {
        const workSlider = new Swiper('.work-list.swiper', {
            slidesPerView: 1,
            spaceBetween: 10,
            breakpoints: {
                // when window width is >= 500px
                500: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                // when window width is >= 768px
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                // when window width is >= 1440px
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                // when window width is >= 1680px
                1680: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                }
            },
            navigation: {
                nextEl: '.our-work .swiper-button-next',
                prevEl: '.our-work .swiper-button-prev',
            },
        });
    }

    const manufacturersSlider = new Swiper('.manufacturers-list.swiper', {
        slidesPerView: 1,
        spaceBetween: 0,
        breakpoints: {
            // when window width is >= 500px
            500: {
                slidesPerView: 2,
            },
            // when window width is >= 1024px
            1024: {
                slidesPerView: 3,
            },
            // when window width is >= 1440px
            1440: {
                slidesPerView: 4,
            },
            // when window width is >= 1680px
            1680: {
                slidesPerView: 6,
            }
        },
        navigation: {
            nextEl: '.manufacturers .swiper-button-next',
            prevEl: '.manufacturers .swiper-button-prev',
        },
    });

    const reviewsSlider = new Swiper('.reviews-list.swiper', {
        slidesPerView: 1,
        spaceBetween: 10,
        breakpoints: {
            // when window width is >= 1024px
            1024: {
                slidesPerView: 2,
            },
            // when window width is >= 1440px
            1440: {
                slidesPerView: 2,
            },
            // when window width is >= 1680px
            1680: {
                slidesPerView: 3,
            }
        },
        navigation: {
            nextEl: '.reviews .swiper-button-next',
            prevEl: '.reviews .swiper-button-prev',
        },
    });


    if (!is_mobile) {
        $(document).on("mouseover", ".card-pics__control span", function() {
            var a = $(this).attr("data-num");
            var b = $(this).parents(".card-pics");
            $(b).find(".show").removeClass("show");
            $(this).addClass("show");
            $(b).find('.card-pics__list a[data-num="' + a + '"]').addClass("show");
        });
    }


    var check_if_load = false;
    //Необходимые переменные для того, чтобы задать координаты на Яндекс.Карте
    var myMapTemp, myPlacemarkTemp;

    //Функция создания карты сайта и затем вставки ее в блок с идентификатором &#34;map-yandex&#34;
    function init() {
        var myMapTemp = new ymaps.Map("map-yandex",{
            center: [55.127631, 61.378874],
            zoom: 15,
            controls: ['zoomControl'],
        });
        var myPlacemarkTemp = new ymaps.Placemark([55.127631, 61.378874],{
            balloonContent: "Рылеева, 16А",
        },{
            // Опции.
            iconLayout: 'default#image',
            iconImageHref: './images/map-pin.svg',
            iconImageSize: [98, 56],
            //iconImageOffset: [-90, -50],
            cursor: 'default'
        });
        myMapTemp.geoObjects.add(myPlacemarkTemp);
        // помещаем флажок на карту

        // Получаем первый экземпляр коллекции слоев, потом первый слой коллекции
        var layer = myMapTemp.layers.get(0).get(0);

        // Решение по callback-у для определения полной загрузки карты
        waitForTilesLoad(layer).then(function() {
            // Скрываем индикатор загрузки после полной загрузки карты
            //spinner.removeClass('is-active');

            if(is_mobile) {
                myMapTemp.behaviors.disable('drag');
            }

        });
    }

    // Функция для определения полной загрузки карты (на самом деле проверяется загрузка тайлов)
    function waitForTilesLoad(layer) {
        return new ymaps.vow.Promise(function(resolve, reject) {
                var tc = getTileContainer(layer)
                    , readyAll = true;
                tc.tiles.each(function(tile, number) {
                    if (!tile.isReady()) {
                        readyAll = false;
                    }
                });
                if (readyAll) {
                    resolve();
                } else {
                    tc.events.once("ready", function() {
                        resolve();
                    });
                }
            }
        );
    }

    function getTileContainer(layer) {
        for (var k in layer) {
            if (layer.hasOwnProperty(k)) {
                if (layer[k]instanceof ymaps.layer.tileContainer.CanvasContainer || layer[k]instanceof ymaps.layer.tileContainer.DomContainer) {
                    return layer[k];
                }
            }
        }
        return null;
    }

    // Функция загрузки API Яндекс.Карт по требованию (в нашем случае при наведении)
    function loadScript(url, callback) {
        var script = document.createElement("script");

        if (script.readyState) {
            // IE
            script.onreadystatechange = function() {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            }
            ;
        } else {
            // Другие браузеры
            script.onload = function() {
                callback();
            }
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    // Основная функция, которая проверяет когда мы навели на блок с классом &#34;ymap-container&#34;
    function ymap() {

        $(document).on('mouseover', '.map__container', function() {

            if (!check_if_load) {
                // проверяем первый ли раз загружается Яндекс.Карта, если да, то загружаем

                // Чтобы не было повторной загрузки карты, мы изменяем значение переменной
                check_if_load = true;
                // Показываем индикатор загрузки до тех пор, пока карта не загрузится
                //spinner.addClass('is-active');

                // Загружаем API Яндекс.Карт
                loadScript("https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;loadByRequire=1", function() {
                    // Как только API Яндекс.Карт загрузились, сразу формируем карту и помещаем в блок с идентификатором &#34;map-yandex&#34;
                    ymaps.load(init);
                });
            }
        });
    }

    ymap();
});