let isMobile = false;

window.addEventListener('DOMContentLoaded', ()=> {

    if (window.innerWidth <= 767) {
        isMobile = true;
    }

    const sortInner = document.querySelectorAll('.sort-popup__inner');
    const sortItems = document.querySelectorAll('.sort-item');
    const weekday = document.querySelectorAll('.schedule-head .f-col');

    if(sortInner.length > 0) {

        sortInner.forEach((innerItem) => {
            const popupItems = innerItem.querySelectorAll('.sort-popup__item');

            if(popupItems.length > 0) {
                let heightItems = 0;
                popupItems.forEach((popupItem) => {
                    const rect = popupItem.getBoundingClientRect();
                    heightItems += rect.height;
                });

                if(heightItems > innerItem.offsetHeight) {
                    innerItem.classList.add('view-scroll');
                }
            }
        });
    }

    if (weekday.length > 0) {
        weekday.forEach((itemDay) => {
            itemDay.addEventListener('click', () => {

                weekday.forEach((item) => {
                    item.classList.remove('active');
                });

                itemDay.classList.add('active');

                const dataColumn = itemDay.getAttribute('data-match-index');
                const columnItems = document.querySelectorAll('[data-match-index="' + dataColumn + '"]:not(.f-col-date)');

                if (columnItems.length > 0) {
                    columnItems.forEach((item) => {
                        document.querySelectorAll('[data-match-index]:not(.f-col-date)').forEach((colItem) => {
                            colItem.classList.remove('active');
                        });
                        item.classList.add('active');
                    });
                }
            });
        });
    }


    const scheduleHead = document.querySelector('.schedule-head__slider');
    const scheduleBody = document.querySelector('.schedule-body__wrap');

    let scheduleBodySlider;
    let scheduleHeadSlider;

    if(scheduleHead) {

        scheduleHeadSlider = new Swiper(scheduleHead, {
            slidesPerView: 7,
            breakpoints: {
                768: {
                    slidesPerView: 3,
                },
                980: {
                    slidesPerView: 5,
                },
                1460: {
                    slidesPerView: 7,
                }
            },
            navigation: {
                nextEl: '.f-arrow_type_right',
                prevEl: '.f-arrow_type_left',
            },
            on: {
                slideChange: function() {
                    if(scheduleBodySlider && !isMobile) {
                        scheduleBodySlider.slideTo(this.activeIndex);
                    }
                },

                click: function () {
                  if(isMobile) {
                      let slideIndex = this.clickedSlide.getAttribute('data-match-index');
                      scheduleBodySlider.slideTo(slideIndex);
                  }
                },
            }
        });
    }

    if(scheduleBody) {
        scheduleBodySlider = new Swiper(scheduleBody, {
            slidesPerView: 1,
            allowTouchMove: true,
            //initialSlide: 2,
            breakpoints: {
                768: {
                    slidesPerView: 3,
                    allowTouchMove: false,
                },
                980: {
                    slidesPerView: 5,
                    allowTouchMove: false,
                },
                1460: {
                    slidesPerView: 7,
                    allowTouchMove: false,
                }
            },
            on: {
                slideChange: function() {
                    if(scheduleHeadSlider && isMobile) {
                        scheduleHeadSlider.slideTo(this.activeIndex);
                        let slideIndex = this.activeIndex;
                        weekday.forEach((item) => {
                            item.classList.remove('active');
                        });
                        document.querySelector('.f-col-date[data-match-index="' + slideIndex + '"]').classList.add('active');
                    }
                },
                
                init: function (swiper) {
                    let indexInitial = document.querySelector('.schedule-body .f-col.current').getAttribute('data-match-index');
                    scheduleHeadSlider.slideTo(indexInitial, 0);
                    swiper.slideTo(indexInitial, 0);
                }
            }
        });
    }

    if(isMobile) {

        const monthsMap = {
            'января': '01', 'февраля': '02', 'марта': '03', 'апреля': '04', 'мая': '05', 'июня': '06',
            'июля': '07', 'августа': '08', 'сентября': '09', 'октября': '10', 'ноября': '11', 'декабря': '12'
        };

        const daysMap = {
            'понедельник': 'пн', 'вторник': 'вт', 'среда': 'ср', 'четверг': 'чт',
            'пятница': 'пт', 'суббота': 'сб', 'воскресенье': 'вс'
        };

        const dateElements = document.querySelectorAll('.f-col-date');

        dateElements.forEach(element => {
            const dayPart = element.querySelector('.f-date i').textContent;
            const datePart = element.querySelector('.f-date span').textContent.trim().split(' ');

            const dayShort = daysMap[dayPart.toLowerCase()];
            const monthShort = monthsMap[datePart[1].toLowerCase()];
            const dateShort = `${datePart[0]}.${monthShort}`;

            element.querySelector('.f-date').innerHTML = `${dayShort}<br><span>${dateShort}</span>`;
        });
    }

    const btnSign = document.querySelector('.js-sign');
    const btnSubmit = document.querySelector('.js-submit');
    const scheduleForm = document.querySelector('.schedule-form');
    const inputName = document.querySelector('.schedule-form input[name=name]');
    const closeBtnPopup = document.querySelector('.popup-schedule__close');

    if(btnSign && scheduleForm) {

        btnSign.addEventListener('click', (e) => {
            e.preventDefault();
            scheduleForm.classList.add('show');
            btnSign.classList.add('hide');
            btnSubmit.classList.add('show');
            inputName.focus();
        });
    }

    btnSubmit.addEventListener('click', (e) => {
        e.preventDefault();
    });

    if(closeBtnPopup) {

        closeBtnPopup.addEventListener('click', () => {
            Fancybox.close();
        });
    }

    const fitCards = document.querySelectorAll('.fit-card');
    const popupForm = document.querySelector('.popup-schedule');
    const wrapSchedule = document.querySelector('.fit-schedule');

    if(fitCards.length > 0) {

        fitCards.forEach((itemCard) => {

            itemCard.addEventListener('click', () => {

                Fancybox.show([{
                        src: popupForm,
                        type: "inline",
                    }],
                    {
                        mainClass: 'open-popup-schedule',
                    });

                const workoutCard = itemCard.querySelector('.fit-card__name b').textContent;
                const hallCard = itemCard.querySelector('.fit-card__name span').textContent;
                const trainer = itemCard.querySelector('.fit-card__trainer').textContent;

                popupForm.querySelector('.popup-schedule__title b').textContent = workoutCard;
                popupForm.querySelector('.popup-schedule__title i').textContent = hallCard;
                popupForm.querySelector('.popup-schedule__name').textContent = trainer;

                /*
                popupForm.classList.toggle('show');
                wrapSchedule.classList.toggle('open-popup');
                 */
            })
        });
    }
});

window.addEventListener('load', ()=> {

    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    function adjustHeights() {

        const timeGroups = {};
        document.querySelectorAll('.schedule-body__time').forEach(element => {
            const time = element.dataset.time;
            if (!timeGroups[time]) {
                timeGroups[time] = [];
            }
            timeGroups[time].push(element);
        });

        Object.keys(timeGroups).forEach(time => {
            let maxHeight = 0;
            timeGroups[time].forEach(element => {
                element.style.height = '';
                if (element.offsetHeight > maxHeight) {
                    maxHeight = element.offsetHeight;
                }
            });
            timeGroups[time].forEach(element => {
                element.style.height = `${maxHeight}px`;
            });
            document.querySelectorAll(`.f-time[data-time="${time}"]`).forEach(fTimeElement => {
                fTimeElement.style.height = `${maxHeight}px`;
            });
        });
    }

    if(!isMobile) {
        adjustHeights();
        window.addEventListener('resize', debounce(adjustHeights, 150));
    }
});