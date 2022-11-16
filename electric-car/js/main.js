$(document).ready( function() {

    /* ---- SLIDER main page ---- */
    const swiperMainSlider = new Swiper('.slider', {

        effect: 'fade',
        preloadImages: false,
        watchOverflow: true,

        lazy: {
            loadPrevNext: true,
        },

        navigation: {
            nextEl: '.slider .slider-arrow__item--next',
            prevEl: '.slider .slider-arrow__item--prev'
        },

        breakpoints: {

            320: {
                autoHeight: true,
            },

            1280: {
                autoHeight: false,
            },

        }
    });

    /* ---- SLIDER benefit ---- */
    const swiperBenefit = new Swiper('.benefit .swiper', {

        slidesPerView: 1,
        spaceBetween: 50,
        speed: 800,
        watchOverflow: true,

        breakpoints: {

            768: {
                slidesPerView: 4,
            },

        },

        navigation: {
            nextEl: '.benefit .swiper-button-next',
            prevEl: '.benefit .swiper-button-prev'
        },

    });

    /* ---- SLIDER partners ---- */
    const swiperPartnersPage = new Swiper('.partners .swiper', {

        slidesPerView: 1,
        spaceBetween: 13,
        speed: 800,
        preloadImages: false,
        watchOverflow: true,

        lazy: {
            loadPrevNext: true,
        },

        breakpoints: {

            768: {
                slidesPerView: 3,
            },

            1024: {
                slidesPerView: 4,
            },

            1366: {
                slidesPerView: 5,
            },

        },

        navigation: {
            nextEl: '.partners .slider-arrow__item--next',
            prevEl: '.partners .slider-arrow__item--prev'
        },

        scrollbar: {
            el: '.partners .swiper-scrollbar',
            draggable: true,
            dragSize: 150
        },
    });

    /* ---- SLIDER document ---- */
    const swiperDocumentPage = new Swiper('.document-slider .swiper', {

        slidesPerView: 1.5,
        spaceBetween: 10,
        speed: 800,
        initialSlide: 1,
        preloadImages: false,
        watchOverflow: true,
        centeredSlides: true,

        breakpoints: {

            768: {
                slidesPerView: 3,
                centeredSlides: false,
            },

            1024: {
                slidesPerView: 4,
                centeredSlides: false,
            },

            1440: {
                slidesPerView: 5,
                centeredSlides: false,
                spaceBetween: 50,
            },

        },

        lazy: {
            loadPrevNext: true,
        },

        navigation: {
            nextEl: '.document-slider .slider-arrow__item--next',
            prevEl: '.document-slider .slider-arrow__item--prev'
        },

        scrollbar: {
            el: '.document-slider .swiper-scrollbar',
            draggable: true,
            dragSize: 150
        },
    });

    /* ---- SLIDER catalog main page ---- */
    const swiperCatalogPage = new Swiper('.catalog-page .swiper', {

        slidesPerView: 1.15,
        spaceBetween: 13,
        speed: 800,
        watchOverflow: true,
        preloadImages: false,
        centeredSlides: true,
        initialSlide: 0,

        lazy: {
            loadPrevNext: true,
        },

        navigation: {
            nextEl: '.catalog-page .slider-arrow__item--next',
            prevEl: '.catalog-page .slider-arrow__item--prev'
        },

        breakpoints: {

            768: {
                slidesPerView: 2,
                centeredSlides: false,
            },

            1024: {
                slidesPerView: 3,
                centeredSlides: false,
            },

            1366: {
                slidesPerView: 4,
                centeredSlides: false,
            },

        },

        scrollbar: {
            el: '.catalog-page .swiper-scrollbar',
            draggable: true,
            dragSize: 150
        },
    });

    /* ---- SLIDER card small gallery ---- */
    const swiperSmallGallery = new Swiper('.small-gallery .swiper', {

        slidesPerView: 4,
        spaceBetween: 10,
        preloadImages: false,
        watchOverflow: true,
        speed: 800,

        lazy: {
            loadPrevNext: true,
        },

        navigation: {
            nextEl: '.small-gallery__arrow--next',
            prevEl: '.small-gallery__arrow--prev'
        },

    });

    /* ---- SLIDER card big gallery ---- */
    const swiperCardGallery = new Swiper('.card-gallery', {

        slidesPerView: 1,
        effect: 'fade',
        preloadImages: false,
        watchOverflow: true,
        thumbs: {
            swiper: swiperSmallGallery,
        },

        lazy: {
            loadPrevNext: true,
        },

    });
});


/* ---- Form page ---- */
$( document ).ready(function() {

    $(document).on('focus blur', '.form-page input', function () {

        if($(this).val().length > 1) {
            $(this).addClass('active');
        } else {
            $(this).removeClass('active');
        }
    });

    $(document).on('click', '.popup-form__close', function () {
        $.fancybox.close();
    });
});


/* ---- Mask phone ---- */
window.addEventListener("DOMContentLoaded", function() {
    [].forEach.call( document.querySelectorAll('input[type=tel]'), function(input) {
        let keyCode;
        function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            let pos = this.selectionStart;
            if (pos < 3) event.preventDefault();
            let matrix = "+7 (___) ___ ____",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, ""),
                new_value = matrix.replace(/[_\d]/g, function(a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a
                });
            i = new_value.indexOf("_");
            if (i != -1) {
                i < 5 && (i = 3);
                new_value = new_value.slice(0, i)
            }
            let reg = matrix.substr(0, this.value.length).replace(/_+/g,
                function(a) {
                    return "\\d{1," + a.length + "}"
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
            if (event.type == "blur" && this.value.length < 5)  this.value = ""
        }

        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", mask, false)

    });

});


/* ---- Yandex map ---- */
$( document ).ready(function() {

    if ($('#map-page').length) {
        ymaps.ready(function () {
            var myMap = new ymaps.Map('map-page', {
                center: [
                    55.141037, 61.482531
                ],
                zoom: 15,
                controls: ['zoomControl'],
            });

            myMap.geoObjects.add(new ymaps.Placemark(myMap.getCenter(), {}, {
                iconLayout: 'default#image',
                iconImageHref: '/local/templates/r-anticor/images/icons/pin_map.svg',
                iconImageSize: [38, 49],
                cursor: 'default'
            }));
            myMap.behaviors.disable('scrollZoom');
        })
    }
});


/* ---- Lazy images ---- */
document.addEventListener('DOMContentLoaded', function () {

    let lazyImages = [].slice.call(document.querySelectorAll(".lazy-loaded-image.lazy"));

    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {

        entries.forEach(function(entry) {

            if (entry.isIntersecting) {
                let lazyImage = entry.target;
                lazyImage.src = lazyImage.dataset.src;
                lazyImage.classList.remove("lazy");
                lazyImageObserver.unobserve(lazyImage);
            }
        });

    }, {threshold: 0.25});

    lazyImages.forEach(function(lazyImage) {
        lazyImageObserver.observe(lazyImage);
    });

});


/* ---- Header fix ---- */
$( document ).ready(function() {

    let heightHeader = $('.header').height();

    $(window).scroll(function() {

        if ($(window).scrollTop() >= heightHeader) {
            $('.header').addClass('hidden');
        } else {
            $('.header').removeClass('hidden');
        }

    });
});


/* ---- Top search ---- */
$( document ).ready(function() {

    $(document).on('click', '.mini-search, .top-search__close', function () {
        $('.top-search').toggleClass('active');
        return false;
    });
});


/* ---- Side---- */
$( document ).ready(function() {

    $(document).on('click', '.sidebar__link .arrow-down', function () {
        $(this).parents('.sidebar__link').toggleClass('selected');
        $(this).parents('.sidebar__item').find('.sidebar__submenu').slideToggle( "slow" );
    });
});



/* ---- Header mobile---- */

$( document ).ready(function() {

    $(document).on('click', '.header-mobile .burger', function () {
        $(this).toggleClass('active');
        $('.sidebar-mobile, .wrapper').toggleClass('active');
    });

    document.getElementById('sidebar-mobile').addEventListener('swiped-left', function(e) {
        $('.sidebar-mobile, .wrapper, .header-mobile .burger').toggleClass('active');
    });

});


/* ---- Top filter ---- */
$( document ).ready(function() {

    $(document).on('click', '.top-filter__type', function () {
        $(this).parents('.top-filter').find('.dropdown-menu').toggleClass('active');
        return false;
    });

    $(document).mouseup(function (e){

        let topFilter = $(".top-filter");
        if (!topFilter.is(e.target)
            && topFilter.has(e.target).length === 0) {
            topFilter.find('.dropdown-menu').removeClass('active');
        }
    });
});



/* ---- UP link ---- */
$( document ).ready(function() {

    if($('.up').length) {
        $('.up').on('click', function () {
            $('body,html').animate({
                scrollTop:0
            }, 800);
            return false;
        });

        $(document).on("scroll", window, function () {

            let scroll = $(window).scrollTop() + $(window).height();
            let offset = $('.footer').offset().top

            if (scroll > offset) {
                $(".up").addClass('active');
            }
            else
            {
                $(".up").removeClass('active');
            }
        });
    }
});

