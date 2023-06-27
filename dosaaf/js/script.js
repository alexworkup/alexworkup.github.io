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

    $(document).on('click', '.close-fancy', function() {
        Fancybox.close();
        return false;
    });

    $(document).on('click', '.question-item', function (e) {
        $(this).find('.question-item__body').slideToggle();
        $(this).toggleClass('active');
    });


// Регистрируем плагин ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    const animateWhyItems = () => {

        const whyItems = document.querySelectorAll(".why-item");
        const whyWe = document.querySelector(".why-we");
        const weWork = document.querySelector(".we-work");
        const about = document.querySelector(".about");

        if(whyItems) {

            whyItems.forEach((item, index) => {
                gsap.set(item, { opacity: .5, y: (index + 1) * 50 }); // Начальные стили (невидимый и смещение по оси Y)

                gsap.to(item, {
                    opacity: 1,
                    y: 0,
                    duration: 1.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".why-we",
                        start: "top 80%",
                        //end: "bottom 100%",
                        scrub: false,
                        delay: index * 0.2,
                    },
                });
            });
        }


        if(whyWe) {

            gsap.set(whyWe, { opacity: 0, y: 100 });
            gsap.to(whyWe, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: whyWe,
                    start: "top 90%",
                    //end: "bottom 100%",
                    scrub: false,
                },
            });
        }

        if(weWork) {

            gsap.set(weWork, { opacity: 0, y: 100 });
            gsap.to(weWork, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: weWork,
                    start: "top 90%",
                    //end: "bottom 100%",
                    scrub: false,
                },
            });
        }

        if(about) {

            gsap.set('.about__wrap', {y: 300 });
            gsap.to('.about__wrap', {
                y: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: about,
                    start: "top 90%",
                    //end: "bottom 100%",
                    scrub: true,
                },
            });
        }

        const WorkItem1 = document.querySelector(".work-item-1");
        const WorkItem2 = document.querySelector(".work-item-2");
        const WorkItem3 = document.querySelector(".work-item-3");
        const openOrder = document.querySelector(".open-order .order");
        const car = document.querySelector(".car");

        if(weWork) {

            gsap.set(WorkItem1, {x: -WorkItem1.clientWidth });
            gsap.to(WorkItem1, {
                x: 0,
                duration: 1.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".we-work",
                    start: "top 80%",
                    //end: "bottom 50%",
                    scrub: false,
                },
            });

            gsap.set(WorkItem3, {x: WorkItem3.clientWidth });
            gsap.to(WorkItem3, {
                x: 0,
                duration: 1.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".we-work",
                    start: "top 80%",
                    //end: "bottom 50%",
                    scrub: false,
                },
            });

            gsap.set(WorkItem2, {y: WorkItem2.clientHeight });
            gsap.to(WorkItem2, {
                y: 0,
                duration: 1.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".we-work",
                    start: "top 80%",
                    //end: "bottom 50%",
                    scrub: false,
                },
            });
        }

        if(openOrder) {

            gsap.set(openOrder, {y: openOrder.clientHeight * 1.5 });
            gsap.to(openOrder, {
                y: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".open-order",
                    start: "top 90%",
                    //end: "bottom 10%",
                    scrub: true,
                },
            });
        }


        if(car) {

            gsap.set(car, { y: 200, x: 200 });
            gsap.to(car, {
                y: 0,
                x: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".open-order",
                    start: "top 20%",
                    //end: "bottom 10%",
                    scrub: false,
                },
                onComplete: function() {
                    car.classList.add("stop");
                },
            });
        }


    };

    if(!is_mobile) {

        // Вызываем функцию анимации при загрузке страницы
        window.addEventListener("load", animateWhyItems);

        window.addEventListener('scroll', function() {
            var menu = document.querySelector('.main-menu_fixed');
            var heightMenu = menu.offsetHeight;

            if (window.pageYOffset > heightMenu) {
                menu.style.top = '10px';
            } else {
                menu.style.top = '40px';
            }
        });
    }

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

    if($('.map').length) {

        ymaps.ready(function () {
            var map = new ymaps.Map("map", {
                center: [55.345248, 61.337704],
                zoom: 15
            });

            if (map) {

                map.geoObjects
                    .add(new ymaps.Placemark([55.345248, 61.337704], {
                        balloonContent: 'АВТОШКОЛА B Долгодеревенском - КАТЕГОРИЯ «B»'
                    }, {
                        iconLayout: 'default#image',
                        iconImageHref: './images/baloon.svg',
                        iconImageSize: [51, 55],
                        iconImageOffset: [-20, -50],
                        preset: 'islands#icon',
                        iconColor: '#0095b6'
                    }))

            }
        });
    }

});