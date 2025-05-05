$(document).ready(function () {

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