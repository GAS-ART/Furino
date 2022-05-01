//import Swiper from "swiper"; // npm i swiper


function initSliders() {

   new Swiper('.slider-main__slider', {
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 32,
      loop: true,
      loopAdditionalSlides: 5,
      speed: 800,
      parallax: true,
      pagination: {
         el: '.slider-main .controls__dots',
         clickable: true,
      },
      // Arrows
      navigation: {
         nextEl: '.slider-main .controls__right-btn',
         prevEl: '.slider-main .controls__left-btn ',
      },
   });

   new Swiper('.rooms__slider', {
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      watchOverflow: true,
      loopAdditionalSlides: 5,
      preloadImages: false,
      speed: 800,
      parallax: true,
      pagination: {
         el: '.rooms-slider .controls__dots',
         clickable: true,
      },
      // Arrows
      navigation: {
         nextEl: '.rooms__slider-body .controls__right-btn',
         prevEl: '.rooms__slider-body .controls__left-btn ',
      },
      breakpoints: {
         479: {
            slidesPerView: 'auto',
         }
      },
   });

   new Swiper('.slider-tips__swiper', {
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      watchOverflow: true,
      loopAdditionalSlides: 3,
      preloadImages: false,
      speed: 800,
      parallax: false,
      pagination: {
         el: '.slider-tips__body .controls__dots',
         clickable: true,
      },

      // Arrows
      navigation: {
         nextEl: '.tips__slider .controls__right-btn',
         prevEl: '.tips__slider .controls__left-btn ',
      },
      breakpoints: {
         479: {
            slidesPerView: 2,
            spaceBetween: 16,
         },
         992: {
            slidesPerView: 3,
            spaceBetween: 32,
         },
      },
   });
}




window.addEventListener("load", function (e) {
   // Запуск инициализации слайдеров
   initSliders();
   // Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
   //initSlidersScroll();
});