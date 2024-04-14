window.addEventListener('DOMContentLoaded', ()=> {

    const popupContent = document.querySelector('#popupContent');
    const itemVacancy = document.querySelectorAll('#listVacancies .team-section__item');
    const closeBtnFancy = document.querySelectorAll('.js-close-fancy');
    const burgerBtn = document.querySelectorAll('.burger');
    const popupDropdown = document.querySelector('#popupDropdown');

    if(burgerBtn.length > 0) {

        burgerBtn.forEach(item => {

            item.addEventListener('click', (e) => {

                Fancybox.show(
                    [
                        {
                            src: popupDropdown,
                            type: "inline"
                        }
                    ],
                    {
                        mainClass: 'open-popup-content'
                    });
            });
        });

    }

    if(closeBtnFancy.length > 0) {
        closeBtnFancy.forEach(item => {
            item.addEventListener('click', (e) => {
                Fancybox.close();
            });
        });
    }

    if(itemVacancy.length > 0) {
        itemVacancy.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();

                Fancybox.show(
                    [
                        {
                            src: popupContent,
                            type: "inline"
                        }
                    ],
                    {
                        mainClass: 'open-popup-content'
                    });
            });

        });
    }

    gsap.registerPlugin(ScrollTrigger);

    const screens = document.querySelectorAll('.screen');

    if(screens.length > 1) {

        gsap.utils.toArray(".screen").forEach((screen, i) => {
            ScrollTrigger.create({
                trigger: screen,
                start: "top top",
                pin: true,
                pinSpacing: false,
                scrub: 1,
                //markers: true,
            });
        });
    }

});