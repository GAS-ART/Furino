//import Swiper from "swiper"; // npm i swiper


function initSliders() {

   new Swiper('.swiper', {
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 32,
      loop: true,
      loopAdditionalSlides: 5,
      speed: 800,
      parallax: true,
      pagination: {
         el: '.controls__dots',
         clickable: true,
      },
      // Arrows
      navigation: {
         nextEl: '.controls__right-btn',
         prevEl: '.controls__left-btn ',
      },
   });
}



window.addEventListener("load", function (e) {
   // Запуск инициализации слайдеров
   initSliders();
   // Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
   //initSlidersScroll();
});