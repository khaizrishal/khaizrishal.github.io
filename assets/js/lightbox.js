(function () {
    function init() {
        var images = document.querySelectorAll('.blog-content img');
        if (!images.length) {
            return;
        }

        var overlay = document.createElement('div');
        overlay.className = 'img-modal';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-label', 'Image preview');
        overlay.innerHTML =
            '<button type="button" class="img-modal-close" aria-label="Close image">&times;</button>' +
            '<img class="img-modal-content" alt="">';
        document.body.appendChild(overlay);

        var modalImg = overlay.querySelector('.img-modal-content');
        var closeBtn = overlay.querySelector('.img-modal-close');

        function open(src, alt) {
            modalImg.src = src;
            modalImg.alt = alt || '';
            overlay.classList.add('is-open');
            document.body.classList.add('img-modal-open');
        }

        function close() {
            overlay.classList.remove('is-open');
            document.body.classList.remove('img-modal-open');
            modalImg.src = '';
        }

        Array.prototype.forEach.call(images, function (img) {
            img.classList.add('img-zoomable');
            img.setAttribute('tabindex', '0');
            img.addEventListener('click', function () {
                open(img.currentSrc || img.src, img.alt);
            });
            img.addEventListener('keydown', function (event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    open(img.currentSrc || img.src, img.alt);
                }
            });
        });

        closeBtn.addEventListener('click', close);

        overlay.addEventListener('click', function (event) {
            if (event.target === overlay) {
                close();
            }
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && overlay.classList.contains('is-open')) {
                close();
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
