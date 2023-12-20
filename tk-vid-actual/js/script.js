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

    const categoryList = document.getElementById('category-slider');

    let categoryListSwiper;

    function initializeSwiper() {
        if (window.innerWidth >= 768) {

            if (!categoryListSwiper) {

                categoryListSwiper = new Swiper('#category-slider .swiper', {
                    slidesPerView: 1.2,
                    spaceBetween: 10,
                    navigation: {
                        nextEl: '#category-slider .swiper-button-next',
                        prevEl: '#category-slider .swiper-button-prev',
                    },
                    breakpoints: {
                        425: {
                            slidesPerView: 2,
                            spaceBetween: 15
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 15
                        },
                        979: {
                            slidesPerView: 3,
                            spaceBetween: 15
                        },
                        1280: {
                            slidesPerView: 4,
                            spaceBetween: 26,
                        },
                    }
                });
            }
        } else if (categoryListSwiper) {

            categoryListSwiper.destroy(true, true);
            categoryListSwiper = null;
        }
    }

    initializeSwiper();

    window.addEventListener('resize', initializeSwiper);
});