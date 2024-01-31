$(function() {

    let isMobile = false;

    if (window.innerWidth <= 767) {
        isMobile = true;
    }

    const buttonsToggle = document.querySelectorAll('.js-toggle-btn, .js-toggle-close');
    const boxToggle = document.querySelector('.js-toggle-box');
    const body = document.querySelector('body');

    if(boxToggle) {

        buttonsToggle.forEach((item) => {
            item.addEventListener('click', (e) => {
                boxToggle.classList.toggle('active');

                if(isMobile) {
                    body.classList.toggle('open-burger');
                }

                e.preventDefault();
                buttonsToggle.forEach((el) => {
                    el.classList.toggle('active');
                });
            });
        })
    }

    const bigGallery = document.querySelector('.js-big-gallery');
    const smallGallery = document.querySelector('.js-small-gallery');

    let swiperBigGallery, swiperSmallGallery;

    if(smallGallery) {
        swiperSmallGallery = new Swiper(smallGallery, {
            spaceBetween: 5,
            slidesPerView: 5,
            watchSlidesProgress: true,
        });
    }

    if(bigGallery) {
        swiperBigGallery = new Swiper(bigGallery, {
            spaceBetween: 10,
            slidesPerView: 1,
            effect: 'fade',
            thumbs: {
                swiper: swiperSmallGallery,
            },
        });
    }

});