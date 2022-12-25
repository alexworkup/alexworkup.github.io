$(document).ready(function() {

    Fancybox.bind("[data-fancybox]", {
        dragToClose: false,
        on : {
            done : (fancybox) => {
                $('.popup-form__bg').css('top', -$('.popup-form').offset().top+'px');
                console.log('test');
            }
        }
    });

    if($('.popup-form').length) {

        $('.popup-form__bg').css('top', -$('.popup-form').offset().top+'px')

        $(window).on('resize', function () {
            $('.popup-form__bg').css('top', -$('.popup-form').offset().top+'px')
        });
    }

    $(document).on('click', '.popup-form .close', function () {
        Fancybox.close();
    });

});