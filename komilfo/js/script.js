var is_mobile = false;

$( document ).ready(function() {

    if ($(window).width() <= 768) {
        is_mobile = true;
    }

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
        slidesPerView: 1,

        pagination: {
            el: '.clients-slider .swiper-pagination',
            clickable: true,
        },

        navigation: {
            nextEl: '.our-clients .slider-arrow--next',
            prevEl: '.our-clients .slider-arrow--prev',
        },

        breakpoints: {
            320: {
                slidesPerView: 1,
            },

            480: {
                slidesPerView: 2,
                spaceBetween: 30
            },

            1280: {
                slidesPerView: 4,
                spaceBetween: 40
            },

            1680: {
                slidesPerView: 5,
                spaceBetween: 40
            },
        }
    });

    const cards = new Swiper('.card-slider .swiper', {
        slidesPerView: 4,

        navigation: {
            nextEl: '.card-slider .slider-arrow--next',
            prevEl: '.card-slider .slider-arrow--prev',
        },

        breakpoints: {
            320: {
                slidesPerView: 1.1,
            },

            480: {
                slidesPerView: 2,
            },

            1280: {
                slidesPerView: 4,
            },

        }
    });

    const subSlider = new Swiper('.sub-slider .swiper', {
        slidesPerView: 'auto',
        spaceBetween: 10,

        navigation: {
            nextEl: '.sub-slider .sub-slider__arrow',
        },
    });


    let productGallery = null;
    let mediaQuerySize = 500;

    function catalogSliderInit () {
        if (!productGallery) {
            productGallery = new Swiper('.product-gallery .swiper', {
                spaceBetween: 1,
                pagination: {
                    el: '.product-gallery .swiper-pagination',
                    clickable: true,
                },
            });
        }
    }

    function catalogSliderDestroy () {
        if (productGallery) {
            productGallery.destroy();
            productGallery = null;
        }
    }

    $(window).on('load resize', function () {

        // Берём текущую ширину экрана
        var windowWidth = $(this).innerWidth();

        // Если ширина экрана меньше или равна mediaQuerySize(500)
        if (windowWidth <= mediaQuerySize) {
            // Инициализировать слайдер если он ещё не был инициализирован
            catalogSliderInit()
        } else {
            // Уничтожить слайдер если он был инициализирован
            catalogSliderDestroy()
        }
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

    // Яндекс карта


    // Стилизация select

    if($('.prop-select').length) {

        $('.prop-select').each(function() {
            const _this = $(this),
                selectOption = _this.find('option'),
                selectOptionLength = selectOption.length,
                selectedOption = selectOption.filter(':selected'),
                duration = 250; // длительность анимации

            _this.hide();
            _this.wrap('<div class="prop-select"></div>');
            $('<div>', {
                class: 'new-select',
                text: _this.children('option:disabled').text()
            }).insertAfter(_this);

            const selectHead = _this.next('.new-select');

            selectHead.text( selectedOption[0].innerHTML );

            $('<div>', {
                class: 'new-select__list'
            }).insertAfter(selectHead);

            const selectList = selectHead.next('.new-select__list');
            for (let i = 1; i < selectOptionLength; i++) {
                $('<div>', {
                    class: 'new-select__item',
                    html: $('<span>', {
                        text: selectOption.eq(i).text()
                    })
                })
                    .attr('data-value', selectOption.eq(i).val())
                    .appendTo(selectList);
            }

            const selectItem = selectList.find('.new-select__item');
            selectList.slideUp(0);

            selectHead.on('click', function() {
                if ( !$(this).hasClass('on') ) {
                    $(this).addClass('on');
                    selectList.slideDown(duration);

                    selectItem.on('click', function() {
                        let chooseItem = $(this).data('value');

                        $('select').val(chooseItem).attr('selected', 'selected');
                        selectHead.text( $(this).find('span').text() );

                        selectList.slideUp(duration);
                        selectHead.removeClass('on');
                    });

                } else {
                    $(this).removeClass('on');
                    selectList.slideUp(duration);
                }

            });

            $(document).click('on', function(e) {
                let box = $('.prop-select');
                if (!box.is(e.target) && box.has(e.target).length === 0) {
                    selectList.slideUp(duration);
                    $(selectHead).removeClass('on');
                }
            });

        });
    }

    // Стилизация select


    // Переключение вида каталога

    if(!is_mobile) {

        $(document).on('click', '.view-change__item.in-line', function () {
            $('.view-change__item').removeClass('active');
            $(this).addClass('active');
            $('.catalog-list').removeClass('view-tile');
            $('.catalog-list').addClass('view-line');
            return false;
        });

        $(document).on('click', '.view-change__item.in-tiles', function () {
            $('.view-change__item').removeClass('active');
            $(this).addClass('active');
            $('.catalog-list').removeClass('view-line');
            $('.catalog-list').addClass('view-tile');
            return false;
        });
    }

    // Переключение вида каталога


    // Переключение вида каталога

    $('.gallery-small__item').on('click', function(e){
        let id = $(this).attr('data-id');
        $('html,body').stop().animate({ scrollTop: $('#'+id+'').offset().top }, 500);
        e.preventDefault();
    });

    // Переключение вида каталога

    // Popup

    $(document).on('click', '.form-header__close', function (e) {
        Fancybox.close();
    });

    $(document).on('click', '*[data-popup]', function () {
        let idPopup = $(this).data('popup');
        $(idPopup).toggleClass('active');
        $('body').toggleClass('popup-open');
        return false;
    });

    $(document).on('click', '.popup-custom__close', function () {
        $(this).parents('.popup-custom').toggleClass('active');
        $('body').toggleClass('popup-open');
    });

    $(document).click('on', function(e) {
        let box = $('.popup-custom');
        if (!$('.remove-item').is(e.target) && !box.is(e.target) && box.has(e.target).length === 0) {
            $(box).removeClass('active');
            $('body').removeClass('popup-open');
        }
    });

    $(document).on('click', '.side .remove-item', function () {
        $(this).parents('.card').remove();
    });

    // Popup


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


    if(is_mobile) {

        $(document).on('click', '.mobile-top__col--toggle, .mobile-app__close .close-app', function () {
            $(this).toggleClass('active');
            $('.mobile-app').toggleClass('active');
            $('.submenu-inner').removeClass('active');
            $('body').toggleClass('mobile-menu');
        });

        $(document).on('click', '.app-nav__item', function () {
            $(this).find('.submenu-inner').toggleClass('active');
            $('.mobile-app').removeClass('active');
            $('.mobile-app').css('opacity', '1');
            return false;
        });

        $(document).on('click', '.submenu-inner .back, .submenu-inner .close-app', function () {
            $('.mobile-app').addClass('active');
            $('.submenu-inner').toggleClass('active');
            return false;
        });

    }
});