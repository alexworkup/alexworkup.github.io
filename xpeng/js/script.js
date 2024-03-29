$(document).ready(function() {

    Fancybox.bind("[data-fancybox]", {
        dragToClose: false,
        on : {
            done: (fancybox) => {
                $('.popup-form__bg').each(function () {
                    $(this).css('top', -$(this).parents('.popup-form').offset().top+'px');
                });

                if($('.control').length) {
                    $('.control').addClass('hide');
                }
            },
            closing: (fancybox) => {
                if($('.control').length) {
                    $('.control').removeClass('hide');
                }
            }
        },
    });

    if($('.popup-form').length) {

        $('.popup-form__bg').each(function () {
            $(this).css('top', -$(this).parents('.popup-form').offset().top+'px');
        });

        $(window).on('resize', function () {
            $('.popup-form__bg').each(function () {
                $(this).css('top', -$(this).parents('.popup-form').offset().top+'px');
            });
        });
    }

    $(document).on('click', '.popup-form .close', function () {
        Fancybox.close();
    });

});