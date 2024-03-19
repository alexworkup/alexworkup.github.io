window.addEventListener('DOMContentLoaded', ()=> {
    const sortInner = document.querySelectorAll('.sort-popup__inner');
    const sortItems = document.querySelectorAll('.sort-item');
    const weekday = document.querySelectorAll('.f-date');

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

    if(weekday.length > 0) {

        weekday.forEach((itemDay)=> {
            itemDay.addEventListener('click', () => {
                itemDay.classList.toggle('current');
                const dataColumn = itemDay.getAttribute('data-column');
                const columnItems = document.querySelectorAll('[data-column="'+dataColumn+'"]:not(.f-date)');

                if(columnItems.length > 0) {

                    columnItems.forEach((item)=> {
                        item.classList.toggle('current');
                    });
                }
            });
        });
    }

    const scheduleHead = document.querySelector('.schedule-head__slider');
    const scheduleBody = document.querySelector('.schedule-body__wrap');

    let scheduleBodySlider;

    if(scheduleHead) {
        const scheduleHeadSlider = new Swiper(scheduleHead, {
            slidesPerView: 7,
            navigation: {
                nextEl: '.f-arrow_type_right',
                prevEl: '.f-arrow_type_left',
            },
            on: {
                slideChange: function() {
                    if(scheduleBodySlider) {
                        scheduleBodySlider.slideTo(this.activeIndex);
                    }
                }
            }
        });
    }

    if(scheduleBody) {
        scheduleBodySlider = new Swiper(scheduleBody, {
            slidesPerView: 7,
            allowTouchMove: false,
            on: {
                slideChange: function() {
                    if(scheduleHeadSlider) {
                        scheduleHeadSlider.slideTo(this.activeIndex);
                    }
                }
            }
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
    adjustHeights();
    window.addEventListener('resize', debounce(adjustHeights, 150));
});