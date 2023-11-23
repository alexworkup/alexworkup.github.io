var is_mobile = false;

$(document).ready(function() {

    const swiper = new Swiper('.sections.swiper', {
        effect: 'fade',
        speed: 1500,
        autoplay: false,
        mousewheel: true,

        pagination: {
            el: ".main-slider .swiper-pagination",
            clickable: true,
        },

        on: {
            slideChange: function () {
                if (this.slides[this.activeIndex].classList.contains('js-parallax')) {
                    activateParallax();
                }
            }
        }
    });

    const $btnToggle = document.querySelector('.burger-fixed');
    const $btnClose = document.querySelector('.menu-toggle__close');
    const $menuToggle = document.querySelector('.menu-toggle');

    if($menuToggle) {

        $btnToggle.addEventListener('click', () => {
            $menuToggle.classList.add('active');
        });

        $btnClose.addEventListener('click', () => {
            $menuToggle.classList.remove('active');
        });
    }


    const $itemsForm = document.querySelectorAll('.open-form input');

    if($itemsForm) {
        $itemsForm.forEach((item) => {
            item.addEventListener('focus', () => {
                item.parentNode.classList.add('select');
            });
            item.addEventListener('blur', () => {
                item.parentNode.classList.remove('select');
            });
        });
    }



    /*
    // Параллакс по движению мышки
    var rect = document.querySelector('#nav').getBoundingClientRect();
    var mouse = { x: 0, y: 0, moved: false };

    document.querySelector('#nav').addEventListener("mousemove", function(e) {
        mouse.moved = true;
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    // Событие ticker будет вызываться в каждом кадре
    gsap.ticker.add(() => {
        if (mouse.moved) {
            parallaxIt("#nav-item-1", 30);
            parallaxIt("#nav-item-2", 20);
            parallaxIt("#nav-item-3", 40);
        }
        mouse.moved = false;
    });

    function parallaxIt(target, movement) {
        gsap.to(target, {
            duration: 0.5,
            x: (mouse.x - rect.width / 2) / rect.width * movement,
            y: (mouse.y - rect.height / 2) / rect.height * movement
        });
    }

    window.addEventListener('resize scroll', function() {
        rect = document.querySelector('#nav').getBoundingClientRect();
    });
    */

    console.log(document.querySelectorAll('.nav')[0].getBoundingClientRect());

    /**/
    function activateParallax() {

        document.querySelectorAll('.nav').forEach(nav => {
            let mouse = { x: 0, y: 0, moved: false };

            nav.addEventListener("mousemove", (e) => {
                const rect = nav.getBoundingClientRect();
                mouse.x = e.clientX - rect.left;
                mouse.y = e.clientY - rect.top;

                gsap.to(nav.querySelectorAll('.nav__link'), {
                    duration: 0.5,
                    x: index => (mouse.x - nav.offsetWidth / 2) / (30 + index * 500),
                    y: index => (mouse.y - nav.offsetHeight / 2) / (30 + index * 500)
                });
            });
        });
    }

});