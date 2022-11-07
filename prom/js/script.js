var isMobile = false;
$(document).ready(function () {

    if ($(window).width() <= 768) {
        isMobile = true;
    }

    var header = $('.header');

    if(header.offset().top >= 100 && !isMobile) {
        header.addClass('header--color');
    } else {
        header.removeClass('header--color');
    }

    $(window).scroll(function () {
        if($(window).scrollTop() >= 100 && !isMobile) {
            header.addClass('header--color');
        } else {
            header.removeClass('header--color');
        }
    });
});