document.addEventListener('DOMContentLoaded', function () {
  var mobileButton = document.querySelector('.mobile-menu-button');
  var mobileMenu = document.querySelector('.menu__nav');
  
  var headerSlider = new Swiper(document.querySelector('.header').querySelector('.swiper-container'), {
    wrapperClass: 'swiper-wrapper',
    init: false,
    loop: true,
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 0,
    speed: 500,
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
    speed: 500,
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

  mobileButton.addEventListener('click', function (e) {
    this.classList.toggle('menu-open');
    mobileMenu.classList.toggle('menu-open');   
  });
  document.addEventListener('click', function (e) {
    if(!e.target.closest('.menu')) {
      mobileButton.classList.remove('menu-open');
      mobileMenu.classList.remove('menu-open');
    }
  });
  window.addEventListener('resize', function (e) {    
      mobileButton.classList.remove('menu-open');
      mobileMenu.classList.remove('menu-open');    
  });


});