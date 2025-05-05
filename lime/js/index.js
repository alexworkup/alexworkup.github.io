$(document).ready(function () {

    const btnBurger     = document.getElementById('btn-burger');
    const popupDropdown = document.querySelector('.popup-dropdown');
    const btnClose      = popupDropdown.querySelector('.popup-dropdown__close');

    btnBurger.addEventListener('click', () => {
        popupDropdown.classList.add('show');
    });

    btnClose.addEventListener('click', () => {
        popupDropdown.classList.remove('show');
    });

    // (опционально) клик вне дропдауна закрывает его
    document.addEventListener('click', (e) => {
        if (
            popupDropdown.classList.contains('show') &&
            !popupDropdown.contains(e.target) &&     // клик не внутри дропдауна
            !btnBurger.contains(e.target)            // И клик не внутри кнопки «бургер»
        ) {
            popupDropdown.classList.remove('show');
        }
    });

    if (document.querySelector('.main-gallery__list')) {

        const photogallerySlider = new Swiper('.main-gallery .swiper', {
            slidesPerView: 0.46,
            freeMode: true,
            pagination: {
                type: 'progressbar',
                el: '.main-gallery .slider-progressbar'
            },
            breakpoints: {
                993: {
                    slidesPerView: 'auto'
                },
                769: {
                    slidesPerView: 0.93
                },
                577: {
                    slidesPerView: 0.7
                }
            }
        });

        let photogallerySlide = $('.main-gallery__slide').packery({
            itemSelector: '.main-gallery__item',
            gutter: 20
        });

        function layoutPackery() {
            var windowWidth = $(window).width();
            photogallerySlide.packery();
        }

        layoutPackery();

        $(window).resize(function() {
            layoutPackery();
        });
    }
});