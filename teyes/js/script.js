$(function() {

    let isMobile = false;

    if (window.innerWidth <= 767) {
        isMobile = true;
    }

    /* Toggle */

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


    /* Product gallery */

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


    /* Product SKU */

    const skuTitle = document.querySelectorAll('.js-sku-title');

    if(skuTitle.length > 0) {
        skuTitle.forEach(function (item) {
            item.addEventListener('click', function () {
                this.classList.toggle('active');
                const parentItem = this.closest('.product-sku__item');
                if (parentItem) {
                    parentItem.classList.toggle('active');
                }
            });
        });
    }


    /* Product tabs */

    const tabLinks = document.querySelectorAll('.product .nav-tab__link');
    const tabContents = document.querySelectorAll('.content-tab__item');

    tabLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            tabLinks.forEach(item => {
                item.classList.remove('active');
            });

            link.classList.add('active');

            const activeTabId = link.getAttribute('data-id');

            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.getAttribute('id') === activeTabId) {
                    content.classList.add('active');
                }
            });
        });
    });

});