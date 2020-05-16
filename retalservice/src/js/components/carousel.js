import Swiper from 'swiper'

export default function carousel() {
    const carouselTrust = new Swiper(document.querySelector('.trust .swiper-container'), {
        // Optional parameters
        wrapperClass: 'swiper-wrapper',
        slideClass: 'swiper-slide',
        direction: 'horizontal',
        loop: true,
        simulateTouch: true,
        autoplay: {
            delay: 3000,
        },
        speed: 800,
        // Navigation arrows
        navigation: {
            nextEl: document.querySelector('.trust .swiper-button-next'),
            prevEl: document.querySelector('.trust .swiper-button-prev'),
        },
        breakpoints: {
            1: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            690: {
                spaceBetween: 40,
                slidesPerView: 3,
            },
            960: {
                spaceBetween: 40,
                slidesPerView: 4,
            },
        }
    })

    const carouselWorks= new Swiper(document.querySelector('.works .swiper-container'), {
        // Optional parameters
        wrapperClass: 'swiper-wrapper',
        slideClass: 'swiper-slide',
        direction: 'horizontal',
        loop: true,
        simulateTouch: true,
        autoplay: {
            delay: 3000,
        },
        speed: 800,
        // Navigation arrows
        navigation: {
            nextEl: document.querySelector('.works .swiper-button-next'),
            prevEl: document.querySelector('.works .swiper-button-prev'),
        },
        breakpoints: {
            1: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            480: {
                spaceBetween: 40,
                slidesPerView: 4,
            },
        }
    })
}