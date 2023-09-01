var is_mobile = false;

$(document).ready(function () {

    if ($(window).width() <= 767) {
        is_mobile = true;
    }

    $(document).on('click', '.popup-menu__close', function (e) {
        Fancybox.close();
    });
});