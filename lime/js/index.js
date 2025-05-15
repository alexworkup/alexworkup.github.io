$(document).ready(function () {

    // Часы
    function updateClock() {
        const now = new Date();
        const hh = String(now.getHours()).padStart(2, '0');
        const mm = String(now.getMinutes()).padStart(2, '0');
        const hoursElem = document.getElementById('hours');
        const minutesElem = document.getElementById('minutes');
        if (hoursElem) hoursElem.textContent = hh;
        if (minutesElem) minutesElem.textContent = mm;
    }
    setInterval(updateClock, 1000);
    updateClock();

    // Попапы (открытие/закрытие)
    document.addEventListener('click', e => {
        const opener = e.target.closest('[data-popup-open]');
        if (opener) {
            e.preventDefault();
            document.querySelectorAll('.popup.show').forEach(popup => {
                popup.classList.remove('show');
            });
            const popupId = opener.dataset.popupOpen;
            const popup = document.getElementById(popupId);

            if (popup && opener.dataset.title) {
                var titleElem = popup.querySelector('.inline-form__title');
                if (titleElem) {
                    titleElem.textContent = opener.dataset.title;
                }
            }

            if (popup) popup.classList.add('show');
            return;
        }
        const closer = e.target.closest('[data-popup-close]');
        if (closer) {
            e.preventDefault();
            const popup = closer.closest('.popup');
            if (popup) popup.classList.remove('show');
            return;
        }
        document.querySelectorAll('.popup.show').forEach(popup => {
            if (!popup.contains(e.target)) {
                popup.classList.remove('show');
            }
        });
    });

    // Swiper для .area__list и .benefit
    const areaListElem = document.querySelector('.area__list.swiper');
    const benefitElem = document.querySelector('.benefit.swiper');
    if (areaListElem || benefitElem) {
        let areaSwiper = null;
        let benefitSwiper = null;
        const initAreaSwiper = () => {
            if (!areaSwiper && areaListElem) {
                areaSwiper = new Swiper('.area__list.swiper', {
                    slidesPerView: 1.5,
                    spaceBetween: 10,
                    watchOverflow: true,
                });
            }
        };
        const destroyAreaSwiper = () => {
            if (areaSwiper) {
                areaSwiper.destroy(true, true);
                areaSwiper = null;
            }
        };
        const initBenefitSwiper = () => {
            if (!benefitSwiper && benefitElem) {
                benefitSwiper = new Swiper('.benefit.swiper', {
                    slidesPerView: 1,
                    spaceBetween: 10,
                    watchOverflow: true,
                });
            }
        };
        const destroyBenefitSwiper = () => {
            if (benefitSwiper) {
                benefitSwiper.destroy(true, true);
                benefitSwiper = null;
            }
        };
        const mobileQuery = window.matchMedia('(max-width: 767px)');
        const checkBreakpoint = () => {
            if (mobileQuery.matches) {
                initAreaSwiper();
                initBenefitSwiper();
            } else {
                destroyAreaSwiper();
                destroyBenefitSwiper();
            }
        };
        checkBreakpoint();
        mobileQuery.addEventListener('change', checkBreakpoint);
    }

    // Фотогалерея
    const galleryListElem = document.querySelector('.main-gallery__list');
    if (galleryListElem) {
        const gallerySwiperElem = document.querySelector('.main-gallery .swiper');
        if (gallerySwiperElem) {
            new Swiper(gallerySwiperElem, {
                slidesPerView: 'auto',
                freeMode: true,
                autoplay: true,
                loop: true,
                speed: 5000,
                pagination: {
                    type: 'progressbar',
                    el: '.main-gallery .slider-progressbar'
                }
            });
        }
        let photogallerySlide = $('.main-gallery__slide').packery({
            itemSelector: '.main-gallery__item',
            gutter: 20,
        });
        function layoutPackery() {
            photogallerySlide.packery();
        }
        layoutPackery();
        $(window).resize(function () {
            layoutPackery();
        });
    }

    // Навигация about-scheme
    const navLinks = document.querySelectorAll('.about-scheme__nav a');
    const items = document.querySelectorAll('.about-scheme__item');
    const images = document.querySelectorAll('.about-scheme__floor a');
    if (navLinks.length && items.length && images.length) {
        navLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                navLinks.forEach(l => l.classList.remove('active'));
                items.forEach(item => item.classList.remove('active'));
                images.forEach(img => img.classList.remove('active'));
                this.classList.add('active');
                const id = this.getAttribute('href').replace('#', '');
                const targetItem = document.querySelector(`.about-scheme__item[data-id="${id}"]`);
                const targetImgLink = document.querySelector(`.about-scheme__floor a[data-id="${id}"]`);
                if (targetItem) targetItem.classList.add('active');
                if (targetImgLink) {
                    targetImgLink.classList.add('active');
                    if (window.innerWidth <= 768) {
                        setTimeout(() => {
                            targetImgLink.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }, 50);
                    }
                }
            });
        });
    }

    // side-panel__logo show on scroll
    const sidePanelLogo = document.querySelector('.side-panel__logo');
    if (sidePanelLogo) {
        window.addEventListener('scroll', function () {
            if (window.scrollY >= 100) {
                sidePanelLogo.classList.add('show');
            } else {
                sidePanelLogo.classList.remove('show');
            }
        });
    }

    // Кнопка наверх
    const upBtn = document.querySelector('.up.js-up');
    if (upBtn) {
        upBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Анимация появления .benefit__item только на десктопе
    if (
        window.gsap &&
        window.ScrollTrigger &&
        document.querySelectorAll('.benefit__item').length &&
        window.matchMedia('(min-width: 768px)').matches
    ) {
        gsap.registerPlugin(ScrollTrigger);

        document.querySelectorAll('.benefit__item').forEach(function(item, idx) {
            gsap.fromTo(item,
                { opacity: 0, y: 100 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    delay: idx * 0.15,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });
    }


});
