'use strict';
//import * as gasArt from './modules/functions.js';
// console.log(gasArt.block());

import { isWebp } from './modules/functions.js';

isWebp();

window.onload = function () {

   document.addEventListener('click', documentActions);
   const menuBody = document.querySelector('.menu__body');
   const menuButton = document.querySelectorAll('.menu__item-button');
   const searchForm = document.querySelector('.search-form__form');
   const searchButton = document.querySelector('.search-form__button');
   const searchFormAction = document.querySelector('.search-form__form');
   const burger = document.querySelector('.icon-menu');

   burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      menuBody.classList.toggle('active');
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

}




