(function () {
    const $html = document.querySelector('html');
    const $body = document.querySelector('body');

    $html.style['overflow-y'] = 'hidden';
    $body.style['overflow-y'] = 'hidden';

    window.addEventListener('lpc:load', function () {
        const $splash = document.querySelector('#splash');
        const $video = document.querySelector('#video-primer video');

        function hideSplash () {
            $html.style['overflow-y'] = 'auto';
            $body.style['overflow-y'] = 'auto';
            $splash.classList.add('splash_hidden');
        }

        if (!$video || $video.readyState >= 2) {
            hideSplash();

            return;
        }

        $video.addEventListener('loadeddata', function () {
            hideSplash();
        });

        $video.addEventListener('playing', function () {
            hideSplash();
        });
    });
})();
