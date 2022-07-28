var is_mobile = false;

$(document).ready(function() {

    if ($(window).width() <= 768) {
        is_mobile = true;
    }

    const label = [];

    if($('.main-slider').length) {

        $('.slider-item').each(function (index) {
            label.push($(this).attr('data-label'));
        });
    }

    const swiper = new Swiper('.main-slider .swiper', {
        effect: 'fade',
        speed: 1000,
        autoplay: true,
        mousewheel: true,

        pagination: {
            el: ".main-slider .swiper-pagination",
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + '0' + (index + 1) + '<i>' + label[index] + '</i>' + "</span>";
            },
        },
    });

    swiper.on('slideChange', function () {

        if($('.slider-item').length === (swiper.activeIndex + 1)) {
            $('.footer').addClass('active');
        } else {
            $('.footer').removeClass('active');
        }

    });

    $(document).on('click', '.toggle', function () {
        $('.side-panel').addClass('active');
        $('body').addClass('open-side');
        $('.close-panel').addClass('active');
        return false;
    });

    $(document).click('on', function(e) {
        let box = $('.side-panel');
        if (!box.is(e.target) && box.has(e.target).length === 0 && box.hasClass('active')) {
            $(box).removeClass('active');
            $('body').removeClass('open-side');
            $('.close-panel').removeClass('active');
        }
    });


    if(!is_mobile) {

        const cursorRounded = document.querySelector('.close-panel');

        const moveCursor = (e)=> {
            const mouseY = e.clientY;
            const mouseX = e.clientX;
            cursorRounded.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

        };

        window.addEventListener('mousemove', moveCursor)
    }

    if(is_mobile) {
        let truncate = document.querySelector(".slider-item__text--wide .slider-item__anons");

        $clamp(truncate, {
            clamp: 5, // Число строк
            useNativeClamp: false // НЕ используем -webkit-line-clamp
        });
    }

});