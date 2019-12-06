document.addEventListener('DOMContentLoaded', function(){
 
    function accordion(accordion){
        var accordion = document.querySelectorAll(accordion);
        
        accordion.forEach((accordion)=>{
            var accordionBody = accordion.querySelector('.accordion-body');
            var accordionButton =  accordion.querySelector('.accordion-button');              
            var timeOut = 0.5;
            accordionBody.style.minHeight = '0';
            accordionBody.style.transition = 'max-height '+ timeOut +'s ease';
            accordionBody.style.maxHeight = '0';        
            accordionBody.style.overflow = 'hidden';  
            accordionButton.setAttribute('data-status-accordion', 'close');
    
            accordionButton.addEventListener('click', function(){          
                if (this.getAttribute('data-status-accordion') === 'close') {
                    this.setAttribute('data-status-accordion', 'open');             
                    accordionButton.classList.add('active');
                    accordionBody.classList.add('active');
                    accordionBody.style.maxHeight = (accordionBody.scrollHeight) + 'px'; 
                   
                } else if (this.getAttribute('data-status-accordion') === 'open'){
                    this.setAttribute('data-status-accordion', 'close');                                
                    accordionButton.classList.remove('active');
                    accordionBody.classList.remove('active');                
                    accordionBody.style.maxHeight = '0';                
                }
            });
        });
        
    }

    function scrollBar (scrollBar){
        var scrollBar = document.querySelectorAll(scrollBar);

        scrollBar.forEach((scrollBar) => {             
            fill(scrollBar);
        });
    }

    function fill(scrollBar) {
        var scrollSlider = scrollBar.querySelector('.scroll-slider');
        var scrollFillBefore = scrollBar.querySelector('.scroll-fill-before');
        var scrollFillAfter = scrollBar.querySelector('.scroll-fill-after');                
        var max = scrollSlider.getAttribute('max');
        var min = scrollSlider.getAttribute('min');            
        if (max == null || max.length == 0) {
            scrollSlider.setAttribute('max', '100');
            max = scrollSlider.getAttribute('max');
        }
        if (min == null || min.length == 0) {
            scrollSlider.setAttribute('min', '0');
            min = scrollSlider.getAttribute('min'); 
        }
        var percent = (max - min) / 100; 

        scrollFillBefore.style.width = 'calc((' + (scrollSlider.value-min)/percent  + '%) )';
        scrollFillAfter.style.width = 'calc((' + (100 - (scrollSlider.value-min)/percent)  + '%) )';

        scrollSlider.addEventListener('input', e => {            
            scrollFillBefore.style.width = 'calc((' + (scrollSlider.value-min)/percent  + '%) )';
            scrollFillAfter.style.width = 'calc((' + (100 - (scrollSlider.value-min)/percent)  + '%) )';
        });
    }
    
    var accordionCalculate = new accordion('.accordion');
    var scroll = new scrollBar('.scroll-bar');

    //изменяем input со значением скролла
    document.querySelectorAll('.scroll-slider')
        .forEach(scroll => {            
            if(scroll.closest('#scrollDeposit')){
                scroll.closest('.scroll-group')
                .querySelector('#depositValue').value = scroll.value + '%';
            }
            if(scroll.closest('#scrollCreditDate')){
                scroll.closest('.scroll-group')
                .querySelector('#dateValue').value = scroll.value + ' мес.';
            }

            scroll.addEventListener('input', e =>{
                if(e.target.closest('#scrollDeposit')){
                    e.target.closest('.scroll-group')
                    .querySelector('.scroll-value').value = e.target.value + '%';
                }
                if(e.target.closest('#scrollCreditDate')){
                    e.target.closest('.scroll-group')
                    .querySelector('.scroll-value').value = e.target.value + ' мес.';
                }                
            });
        });
    
    //изменяем скролл со значением инпута
    document.querySelectorAll('.scroll-value')
        .forEach(input => { 
            var valueInput = '';
            var max = input.closest('.scroll-group').querySelector('.scroll-slider').getAttribute('max');
            var min = input.closest('.scroll-group').querySelector('.scroll-slider').getAttribute('min'); 

            input.addEventListener('focus', e =>{  
                if (input.getAttribute('id') == 'depositValue') {
                    valueInput = e.target.value.replace('%', ''); 
                    e.target.value = ''; 
                    max = input.closest('.scroll-group').querySelector('.scroll-slider').getAttribute('max');
                    min = input.closest('.scroll-group').querySelector('.scroll-slider').getAttribute('min'); 
                }
                if (input.getAttribute('id') == 'dateValue') {
                    valueInput = e.target.value.replace('мес.', ''); 
                    e.target.value = ''; 
                    max = input.closest('.scroll-group').querySelector('.scroll-slider').getAttribute('max');
                    min = input.closest('.scroll-group').querySelector('.scroll-slider').getAttribute('min'); 
                }
            });
            input.addEventListener('blur', e =>{
                if (input.getAttribute('id') == 'depositValue') {
                    if (e.target.value <= 0) {
                        e.target.value = valueInput + '%';
                    } else {
                        if (!Number.isNaN(Math.round(e.target.value))) {
                            if (Math.round(e.target.value) >= min && Math.round(e.target.value) <= max) {
                                input.closest('.scroll-group').querySelector('.scroll-slider').value = Math.round(e.target.value);
                                fill( input.closest('.scroll-group').querySelector('.scroll-bar'));
                                e.target.value = Math.round(e.target.value) + '%';                             
                            } else {
                                e.target.value = valueInput + '%';
                            }                                            
                        } else {
                            e.target.value = valueInput + '%';
                        }
                        //console.log(parseInt(e.target.value.replace('%', '')));
                    }   
                }  

                if (input.getAttribute('id') == 'dateValue') {
                    if (e.target.value <= 0) {
                        e.target.value = valueInput + ' мес.';
                    } else {
                        if (!Number.isNaN(Math.round(e.target.value))) {
                            if (Math.round(e.target.value) >= min && Math.round(e.target.value) <= max) {
                                input.closest('.scroll-group').querySelector('.scroll-slider').value = Math.round(e.target.value);
                                fill( input.closest('.scroll-group').querySelector('.scroll-bar'));
                                e.target.value = Math.round(e.target.value) + ' мес.';                             
                            } else {
                                e.target.value = valueInput + 'мес.';
                            }                                            
                        } else {
                            e.target.value = valueInput + ' мес.';
                        }
                        //console.log(parseInt(e.target.value.replace('%', '')));
                    }   
                }                
            });            
        });
});