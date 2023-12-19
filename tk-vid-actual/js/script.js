$(function() {

    let isMobile = false;

    if (window.innerWidth <= 767) {
        isMobile = true;
    }

    const mainSlaider = document.querySelector('.main-slider');

    if(mainSlaider) {

        const mainSlaiderSwiper = new Swiper('.main-slider .swiper', {
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            pagination: {
                el: '.main-slider .swiper-pagination',
                clickable: true,
            },
        });
    }

    /* Ссылки на разделы на главной странице section-nav, при сужении окна, лишние пункты убираем в выпадающее меню */
    const wrapperSectionNav = document.querySelector(".section-nav__wrap");
    if(wrapperSectionNav) {

        const nav = priorityNav.init({
            mainNavWrapper: ".section-nav__wrap",
            breakPoint: 0,
            throttleDelay: '50'
        });
    }


    const aboutContent = document.querySelector(".index-about__content");
    let isClamped = false;

    function applyClamp() {

        if (window.innerWidth <= 768 && !isClamped) {
            $clamp(aboutContent, {clamp: 10});
            isClamped = true;
        } else if (window.innerWidth > 768 && isClamped) {
            aboutContent.style = '';
            isClamped = false;
        }
    }

    applyClamp();
    window.addEventListener('resize', applyClamp);

});