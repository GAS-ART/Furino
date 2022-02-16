'use strict';
//import * as gasArt from './modules/functions.js';
// console.log(gasArt.block());

import { isWebp } from './modules/functions.js';
import { validate } from './modules/formValidate.js';
import "./modules/sliders.js";


isWebp();

window.onload = function () {
   document.addEventListener('click', documentActions);
   const menuBody = document.querySelector('.menu__body');
   const menuButton = document.querySelectorAll('.menu__item-button');
   const searchForm = document.querySelector('.search-form__form');
   const searchButton = document.querySelector('.search-form__button');
   const searchFormAction = document.querySelector('.search-form__form');
   const burger = document.querySelector('.icon-menu');
   const emailSubmitForm = document.getElementById('form');

   emailSubmitForm.addEventListener('submit', formSend);

   function formSend(e) {
      validate(emailSubmitForm)
      e.preventDefault();
   }

   burger.addEventListener('click', (e) => {
      burger.classList.toggle('open');
      menuBody.classList.toggle('active');
      e.preventDefault;
   });

   //Active для выпадающего меню на тачскринах
   menuButton.forEach((item) => {
      item.addEventListener('click', function (e) {
         let currentBtn = e.target
         //Удаляем лишний active
         menuButton.forEach((subItem) => {
            if (currentBtn != subItem) {
               subItem.classList.remove('active');
               subItem.closest('.menu__item').classList.remove('active');
            }
         })
         //
         if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) { // Устройства без мыши
            e.target.classList.toggle('active');
            e.target.closest('.menu__item').classList.toggle('active');
         }
      })
   });

   //Active для поиска
   searchButton.addEventListener('click', function () {
      searchForm.classList.toggle('active');
   });
   searchFormAction.addEventListener('click', function (e) {
      e.preventDefault;
   });

   //Убираем active при клике
   function documentActions(e) {
      //Убираем active у формы поиска
      if (!e.target.closest('.search-form')) {
         searchForm.classList.remove('active');
      }

      //Убираем active у меню
      if (!e.target.closest('.menu__item')) {
         menuButton.forEach((item) => {
            item.classList.remove('active');
            item.closest('.menu__item').classList.remove('active');
         });
      }
   }

   //Акардеон для футера
   function windowSize() {
      if ($(window).width() > '768') {
         $('.toggle-block').siblings('.body-item-footer__content').slideDown();
         $('.toggle-block').removeClass('active');
      }
      else {
         $('.toggle-block').siblings('.body-item-footer__content').slideUp()
      }
   }
   $('.toggle-block').click(function (event) {
      if ($(window).width() <= '768') {
         $('.toggle-block').not($(event.target)).removeClass('active');
         $('.toggle-block').not($(event.target)).next().slideUp(300);
         $(event.target).toggleClass('active').next().slideToggle(300);
      }
   })

   $(window).on('load resize', windowSize);
   windowSize();

   //Прокрутка header
   const headerElement = document.querySelector('.header');

   function watchHeader(entries) {
      if (entries[0].isIntersecting) {
         entries[0].target.classList.remove('_scroll')
      } else {
         entries[0].target.classList.add('_scroll')
      }

   }



   const headerObserver = new IntersectionObserver(watchHeader);
   headerObserver.observe(headerElement);

}




