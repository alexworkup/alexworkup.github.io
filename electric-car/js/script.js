$( document ).ready(function() {

    let $canplay ='';
    const $video = $('.video');

    $video.on("canplaythrough", function() {
        $('.load').addClass('hide');
        $(this).attr('autoplay', 'true');
        $(this).trigger('play');
        $canplay = true;
    });

    $video.on("waiting", function() {
        $('.load').removeClass('hide');
    });

    $video.on("playing", function() {
        $('.load').addClass('hide');
    });

    $(document).on('click', '.sound', function () {
        $(this).toggleClass('active');
        if( $video.prop('muted') ) {
            $video.prop('muted', false);
        } else {
            $video.prop('muted', true);
        }
    });

    $("[data-fancybox]").fancybox({
        baseClass: 'popup-form',
    });

    $(document).on('click', '.burger, .sidebar__close', function () {
        $('.sidebar').toggleClass('active');
        if ($video.get(0).paused) {
            $video.get(0).play();
        } else {
            $video.get(0).pause();
        }
    });

    document.addEventListener('swiped', function(e) {

        if(e.target.className === 'sidebar active' && e.detail.dir === 'left') {

            $('.sidebar').toggleClass('active');

            if ($video.get(0).paused) {
                $video.get(0).play();
            } else {
                $video.get(0).pause();
            }
        }

    });


    if($('.viewer').length) {

        const jsv = new JavascriptViewer({
            mainHolderId: 'jsv-holder',
            mainImageId: 'jsv-image',
            imageUrlFormat: '0xx.png',
            totalFrames:  36,
            defaultProgressBar:  true,
            speed: 90,
            inertia: 12,
            reverse:true,
            zoom:true,
            autoRotate: 1,
            notificationConfig:{
                dragToRotate:{
                    showStartToRotateDefaultNotification:false,
                    mainColor:"rgba(0,0,0,0.20)",
                    textColor:"rgba(243,237,237,0.80)",
                }
            }});

        jsv.start()
            .then(() => console.log('viewer started'))
            .catch((e) => console.log('failed loading 360 viewer: ' + e))
    }

});