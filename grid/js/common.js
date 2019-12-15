document.addEventListener('DOMContentLoaded', function(){

    function accordion(accordions, time = 0.5) {        
        document.querySelectorAll(accordions).forEach(accordionParams);

        function accordionParams(accordion) {               
            var accordionControl = accordion.firstElementChild || null;
            var accordionBody = accordion.lastElementChild || null;
            var accordionMain = accordionBody.closest(accordions);

            if (!accordionBody.hasAttribute('data-accordion-body') || !accordionControl.hasAttribute('data-accordion-control')) {
                return;                
            }
            
            var timeOut = time;
            accordionBody.style.minHeight = '0';
            accordionBody.style.maxHeight = '0';
            accordionBody.style.overflow = 'hidden';
            accordionControl.setAttribute('data-status-accordion', 'close');  

            accordionControl.addEventListener('click', function () {
                var accordionNewHeight = 0;

                //для максимальной высоты, чтобы могли видеть весь контенет даже после ресайза страницы               
                accordion.querySelectorAll('[data-accordion-body]').forEach(function (item) {
                    accordionNewHeight = accordionNewHeight + item.scrollHeight;                                        
                });
                
                if (this.getAttribute('data-status-accordion') === 'close') {
                    accordionBody.style.transition = 'max-height ' + timeOut + 's ease';
                    accordionControl.setAttribute('data-status-accordion', 'open');
                    accordionControl.classList.add('active');
                    accordionBody.classList.add('active');
                    accordionBody.style.maxHeight = (accordionNewHeight) + 'px';
                } else if (this.getAttribute('data-status-accordion') === 'open') {
                    accordionBody.style.transition = 'max-height ' + timeOut / 2 + 's ease';
                    accordionControl.setAttribute('data-status-accordion', 'close');
                    accordionControl.classList.remove('active');
                    accordionBody.classList.remove('active');
                    accordionBody.style.maxHeight = '0';
                }
            });            
            
            window.addEventListener('resize', function (e) {               
                accordionMain.querySelectorAll('[data-accordion-body]').forEach(function (item) {
                    accordionBody.style.transition = 'max-height ' + timeOut / 2 + 's ease';
                    accordionControl.setAttribute('data-status-accordion', 'close');
                    accordionControl.classList.remove('active');
                    accordionBody.classList.remove('active');
                    accordionBody.style.maxHeight = '0';
                });              
            });
        }
    }

    var accordions = new accordion('[data-accordion]');
});