var is_mobile = false;

$( document ).ready(function() {

    if ($(window).width() <= 500) {
        is_mobile = true;
    }

    $(document).on('click', '.js-up', function() {
        $("html, body").animate({
            scrollTop: 0
        }, {
            duration: 500,
            easing: "swing"
        });
    });

    if($('.mobile-menu').length) {

        $(document).on('click', '.toggle', function (e) {

            Fancybox.show(
                [{ src: "#mobile-menu", type: "inline" }],
                {
                    mainClass: 'mobile-menu-open',
                }
            );

            return false;
        });
    }

    if($('.big-gallery').length) {

        const smallGallery = new Swiper('.small-gallery.swiper', {
            slidesPerView: 4,
            spaceBetween: 8,
            freeMode: true,
            watchSlidesProgress: true,
        });

        const bigGallery = new Swiper('.big-gallery.swiper', {
            slidesPerView: 1,
            spaceBetween: 10,
            effect: 'fade',

            thumbs: {
                swiper: smallGallery,
            },
        });
    }
});