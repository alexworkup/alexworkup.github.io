document.addEventListener("DOMContentLoaded", function() {

    let isMobile = false;

    if (window.innerWidth <= 767) {
        isMobile = true;
    }

    const indexSlider = document.querySelector('.index-slider');
    if(indexSlider) {
        const indexSliderSwiper = new Swiper(indexSlider, {
            centeredSlides: true,
            pagination: {
                el: ".swiper-pagination",
                dynamicBullets: true,
            },
        });
    }

    const newsSlider = document.querySelector('.news-slider');
    if(newsSlider) {
        const indexSliderSwiper = new Swiper(newsSlider, {
            centeredSlides: true,
            pagination: {
                el: ".swiper-pagination",
                dynamicBullets: true,
            },
        });
    }
});