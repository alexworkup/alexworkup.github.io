$(document).ready(function () {

    /* Clock */
    function updateClock() {
        const now = new Date();
        const hh = String(now.getHours()).padStart(2, '0');
        const mm = String(now.getMinutes()).padStart(2, '0');

        document.getElementById('hours').textContent = hh;
        document.getElementById('minutes').textContent = mm;
    }

    setInterval(updateClock, 1000);
    updateClock();

    document.addEventListener('click', e => {

        const opener = e.target.closest('[data-popup-open]');
        if (opener) {
            e.preventDefault();
            const popupId = opener.dataset.popupOpen;
            const popup = document.getElementById(popupId);
            if (popup) popup.classList.add('show');
            return;
        }


        const closer = e.target.closest('[data-popup-close]');
        if (closer) {
            e.preventDefault();
            const popup = closer.closest('.popup');
            if (popup) popup.classList.remove('show');
            return;
        }


        document.querySelectorAll('.popup.show').forEach(popup => {
            if (!popup.contains(e.target)) {
                popup.classList.remove('show');
            }
        });
    });

    if (document.querySelector('.area__list.swiper') || document.querySelector('.benefit.swiper')) {
        let areaSwiper = null;
        let benefitSwiper = null;

        const initAreaSwiper = () => {
            if (!areaSwiper && document.querySelector('.area__list.swiper')) {
                areaSwiper = new Swiper('.area__list.swiper', {
                    slidesPerView: 1.5,
                    spaceBetween: 10,
                    watchOverflow: true,
                });
            }
        };
        const destroyAreaSwiper = () => {

            if (areaSwiper) {
                areaSwiper.destroy(true, true);
                areaSwiper = null;
            }
        };

        const initBenefitSwiper = () => {
            if (!benefitSwiper && document.querySelector('.benefit.swiper')) {
                benefitSwiper = new Swiper('.benefit.swiper', {
                    slidesPerView: 1,
                    spaceBetween: 10,
                    watchOverflow: true,
                });
            }
        };
        const destroyBenefitSwiper = () => {
            if (benefitSwiper) {
                benefitSwiper.destroy(true, true);
                benefitSwiper = null;
            }
        };

        const mobileQuery = window.matchMedia('(max-width: 767px)');

        const checkBreakpoint = () => {
            if (mobileQuery.matches) {
                initAreaSwiper();
                initBenefitSwiper();
            } else {
                destroyAreaSwiper();
                destroyBenefitSwiper();
            }
        };

        // initial check
        checkBreakpoint();

        // слушаем изменения вьюпорта
        mobileQuery.addEventListener('change', checkBreakpoint);
    }


    if (document.querySelector('.main-gallery__list')) {

        const photogallerySlider = new Swiper('.main-gallery .swiper', {
            slidesPerView: 'auto',
            freeMode: true,
            autoplay: true,
            loop: true,
            speed: 5000,
            pagination: {
                type: 'progressbar',
                el: '.main-gallery .slider-progressbar'
            }
        });

        let photogallerySlide = $('.main-gallery__slide').packery({
            itemSelector: '.main-gallery__item',
            gutter: 20,
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