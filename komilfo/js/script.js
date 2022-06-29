
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

    const subSlider = new Swiper('.sub-slider .swiper', {
        slidesPerView: 'auto',
        spaceBetween: 10,

        navigation: {
            nextEl: '.sub-slider .sub-slider__arrow',
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
                var box = $('.prop-select');
                if (!box.is(e.target) && box.has(e.target).length === 0) {
                    selectList.slideUp(duration);
                    $(selectHead).removeClass('on');
                }
            });

        });
    }

    // Стилизация select


    // Переключение вида каталога

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

    // Переключение вида каталога


    // Переключение вида каталога

    $('.gallery-small__item').on('click', function(e){
        let id = $(this).attr('data-id');
        $('html,body').stop().animate({ scrollTop: $('#'+id+'').offset().top }, 500);
        e.preventDefault();
    });

    // Переключение вида каталога

});