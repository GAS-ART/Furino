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
      //Кнопка добавлениятовара в корзину
      if (e.target.classList.contains('hover-product__btn')) {

         let productId = e.target.closest('.item-product').dataset.id;
         let productBtn = e.target;
         addToCart(productBtn, productId);

         e.preventDefault();
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

   //Подгрузка товаров
   const productsBlock = document.querySelector('.products__items');
   const loadMoreBtn = document.querySelector('.products__footer--link');
   loadMoreBtn.addEventListener('click', function (e) {
      getProducts(e.target);
      e.preventDefault();
   });
   async function getProducts(btn) {
      if (!btn.classList.contains('_hold')) {
         btn.classList.add('_hold');
      }
      const file = "json/products.json";
      let responce = await fetch(file, {
         method: 'GET',
      });
      if (responce.ok) {
         let result = await responce.json();
         loadProducts(result);
         btn.classList.remove('_hold');
      } else {
         alert('Ошибка при загрузке товаров');
      }
   }
   function loadProducts(data) {
      let currentLastProductBlockId = productsBlock.lastElementChild.dataset.id;
      data.products.forEach((product) => {
         if (product.id > +currentLastProductBlockId && product.id < +currentLastProductBlockId + 5) {
            let productCard = `<div data-id="${product.id}" class="products__item item-product">
               <a href="${product.linkUrl}" class="item-product__img">
               <picture><source srcset="img/products/${product.image}.webp" type="image/webp"><img src="img/products/${product.image}.jpg" alt="${product.name}"></picture>
               </a>
               <div class="item-product__description description-product">
               <h5 class="description-product__tittle">${product.name}</h5>
               <div class="description-product__text">${product.description}</div>
               <div class="description-product__price price-product">
               <div class="price-product__current">${product.price}</div>
               <div class="price-product__old">${product.oldPrice}</div>
               </div>
               </div>`;
            if (product.label) {
               productCard += `<div class="item-product__label label-product">`;
               product.label.forEach((item) => {
                  productCard += `<div class="label-product__${item.type} active">${item.value}</div>`
               });
               productCard += '</div>';
            }
            productCard += `<div class="item-product__hover hover-product">
            <div class="hover-product__actions">
               <div class="hover-product__btn">Add to cart</div>
               <div class="hover-product__social">
                  <a href="${product.shareUrl}" class="hover-product__share _icon-share">Share</a>
                  <a href="${product.likeUrl}" class="hover-product__like _icon-favorite">Like</a>
               </div>
            </div>
            <a href="${product.linkUrl}" class="hover-product__look">
               <p>Learn more</p>
               <div class="_icon-arrow-link"></div>
            </a>
         </div>
      </div>`;
            productsBlock.insertAdjacentHTML('beforeend', productCard);
            if (data.products.length == product.id) {
               loadMoreBtn.remove();
            }
         }
      });

   }
   // Добавление товара в корзину
   /* const cartIconBtn = document.querySelector('.art-header__icon');
    cartIconBtn.addEventListener('click', function (e) {
       e.preventDefault();
       // cart.classList.toggle('active');
    })*/
   const cart = document.querySelector('.cart-header');

   function addToCart(productBtn, productId) {


      if (!productBtn.classList.contains('_hold')) {
         productBtn.classList.add('_hold');
         productBtn.classList.add('_fly');
      }
      let product = document.querySelector(`.item-product[data-id="${productId}"]`);
      let productImg = product.querySelector('.item-product__img');

      let productImgFly = productImg.cloneNode(true);

      productImgFly.classList.add('_fly');

      let productImgHieght = productImg.offsetHeight;
      let productImgWidth = productImg.offsetWidth;
      let productImgTop = productImg.getBoundingClientRect().top;
      let productImgLeft = productImg.getBoundingClientRect().left;

      productImgFly.style.cssText = `
      left: ${productImgLeft}px;
      top: ${productImgTop}px;
      width: ${productImgWidth}px;
      height: ${productImgHieght}px;
      `;

      document.body.append(productImgFly);

      const cartFlyLeft = cart.getBoundingClientRect().left;
      const cartFlyTop = cart.getBoundingClientRect().top;

      productImgFly.style.cssText = `
      left: ${cartFlyLeft}px;
      top: ${cartFlyTop}px;
      width: 0px;
      height: 0px;
      opacity: 0;`

      setTimeout(() => {
         productImgFly.remove();
         updateCart(productBtn, productId);
         productBtn.classList.remove('_fly');
      }, 500);
   }

   function updateCart(productBtn, productId, productAdd = true) {
      const cartIcon = document.querySelector('.cart-header__icon');
      const cartQuantity = cartIcon.querySelector('span');
      const cartProduct = document.querySelector(`[data-cart-id="${productId}"]`);
      const cartList = document.querySelector('.cart-header__header-list');

      if (productAdd) {
         if (cartQuantity) {
            cartQuantity.innerHTML = ++cartQuantity.innerHTML;
         } else {
            cartIcon.insertAdjacentHTML('beforeend', `<span>1</span>`);
         }
         const product = document.querySelector(`[data-id="${productId}"]`);
         const cartProductImg = product.querySelector('.item-product__img').innerHTML;
         const cartPproductName = product.querySelector('.description-product__tittle').innerHTML;

         async function getPrice() {
            const file = "json/products.json";
            let responce = await fetch(file, {
               method: 'GET',
            });
            if (responce.ok) {
               let result = await responce.json();
               let cartProductPrice = result.products.find(item => item.id == productId).price;
               cartProductPrice = cartProductPrice.slice(3).replace('.', '');
               addPriceToCart(+cartProductPrice);
            } else {
               alert('Ошибка загрузки цени товара');
            }
         }
         getPrice();
         function addPriceToCart(cartProductPrice) {
            if (!cartProduct) {
               const cartProductContent = `
            <a href="#" class="cart-list__img">${cartProductImg}</a>
            <div class="cart-list__body">
               <a href="#" class="cart-list__name">${cartPproductName}</a>
               <div class="cart-list__quantity"><div class="cart-list__price">${cartProductPrice.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })}</div><button class="cart-list__btn-plus">+</button><span> 1 </span><button class="cart-list__btn-minus">-</button></div>
               <a href="#" class="cart-list__delete">Delete</a>
            </div>`;
               cartList.insertAdjacentHTML('beforeend', `<li data-cart-id="${productId}" class="cart-list__item" ">${cartProductContent}</li>`);
            } else {
               cartProduct.querySelector('.cart-list__quantity span').innerHTML++;
               let sum = +cartProductPrice * +cartProduct.querySelector('.cart-list__quantity span').innerHTML;
               cartProduct.querySelector('.cart-list__price').innerHTML = sum.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
            }
         }
         productBtn.classList.remove('_hold');
      }
   }
}




