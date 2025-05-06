$(document).ready(function () {

    // Открытие
    document.querySelectorAll('[data-popup-open]').forEach(btn => {
        const popup = document.getElementById(btn.dataset.popupOpen);
        btn.addEventListener('click', () => popup.classList.add('show'));
    });

    // Закрытие через крестик
    document.querySelectorAll('[data-popup-close]').forEach(btn => {
        const popup = btn.closest('.popup');
        btn.addEventListener('click', () => popup.classList.remove('show'));
    });

    // Клик вне попапа
    document.addEventListener('click', e => {
        document.querySelectorAll('.popup.show').forEach(popup => {
            const openBtn = document.querySelector(`[data-popup-open="${popup.id}"]`);
            if (
                !popup.contains(e.target) &&
                !(openBtn && openBtn.contains(e.target))
            ) {
                popup.classList.remove('show');
            }
        });
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