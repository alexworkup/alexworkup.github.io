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
                itemDay.classList.toggle('active');
                const dataColumn = itemDay.getAttribute('data-column');
                const columnItems = document.querySelectorAll('[data-column="'+dataColumn+'"]:not(.f-date)');

                if(columnItems.length > 0) {

                    columnItems.forEach((item)=> {
                        item.classList.toggle('active');
                    });
                }
            });
        });
    }

});