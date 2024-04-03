window.addEventListener('DOMContentLoaded', ()=> {

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