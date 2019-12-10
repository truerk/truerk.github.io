document.addEventListener('DOMContentLoaded', function () {
    function accordion(accordion) {
        var accordion = document.querySelectorAll(accordion);

        accordion.forEach((accordion) => {
            var accordionBody = accordion.querySelector('[data-accordion-body]') || null;
            var accordionButton = accordion.querySelector('[data-accordion-button]') || null;

            if (!accordionBody || !accordionButton) {
                return;
            }

            var timeOut = 0.3;
            accordionBody.style.minHeight = '0';
            accordionBody.style.transition = 'max-height ' + timeOut + 's ease';
            accordionBody.style.maxHeight = '0';
            accordionBody.style.overflow = 'hidden';
            accordionButton.setAttribute('data-status-accordion', 'close');

            accordionButton.addEventListener('click', function () {
                if (this.getAttribute('data-status-accordion') === 'close') {
                    this.setAttribute('data-status-accordion', 'open');
                    accordionButton.classList.add('active');
                    accordionBody.classList.add('active');
                    accordionBody.style.maxHeight = (accordionBody.scrollHeight) + 'px';
                } else if (this.getAttribute('data-status-accordion') === 'open') {
                    this.setAttribute('data-status-accordion', 'close');
                    accordionButton.classList.remove('active');
                    accordionBody.classList.remove('active');
                    accordionBody.style.maxHeight = '0';
                }
            });
        });
    }

    var menuNav = new accordion('.menu__nav');



    
});