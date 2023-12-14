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

    const controlCard = document.querySelectorAll('.control-card__item');

    if(controlCard) {
        controlCard.forEach((item) => {

            item.addEventListener('click', (e) => {
                e.preventDefault();
                item.classList.toggle('added');
            });
        });
    }

});