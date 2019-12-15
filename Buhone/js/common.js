document.addEventListener('DOMContentLoaded', function(){
    var headerSlider = new Swiper(document.querySelector('.header').querySelector('.swiper-container'), {
        wrapperClass: 'swiper-wrapper',
        init: false,
        loop: true,
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 0,
        speed:500,
        autoplay: {
            delay: 5000,
        },
        variableWidth: true,
        pagination: {
            el: document.querySelector('.header').querySelector('.swiper-pagination'),
            type: 'bullets',
            clickable: 'true'
        },
        navigation: {
          nextEl: document.querySelector('.header').querySelector('.swiper-button-next'),
          prevEl: document.querySelector('.header').querySelector('.swiper-button-prev'),
        },
      });

      var reviewerSlider = new Swiper(document.querySelector('#section_reviews').querySelector('.swiper-container'), {
        wrapperClass: 'swiper-wrapper',
        init: false,
        loop: true,
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 0,
        speed:500,
        autoplay: {
            delay: 5000,
        },
        variableWidth: true,
        pagination: {
            el: document.querySelector('#section_reviews').querySelector('.swiper-pagination'),
            type: 'bullets',
            clickable: 'true'
        },
        navigation: {
          nextEl: document.querySelector('#section_reviews').querySelector('.swiper-button-next'),
          prevEl: document.querySelector('#section_reviews').querySelector('.swiper-button-prev'),
        },
        /*breakpoints: {
          1280: {
            slidesPerView: 2,
            slidesPerGroup: 1,
          }
        }*/
      });
      headerSlider.init();
      reviewerSlider.init();
});