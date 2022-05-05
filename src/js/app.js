'use strict';
//import * as gasArt from './modules/functions.js';
// console.log(gasArt.block());

import { isWebp } from './modules/functions.js';
import { validate } from './modules/formValidate.js';
import "./modules/sliders.js";
import { popUp } from './modules/popup.js';
import lightGallery from './modules/lightgallery/lightgallery.es5.js';


isWebp();

window.onload = function () {
   document.addEventListener('click', documentActions);
   const menuBody = document.querySelector('.menu__body');
   const menuButton = document.querySelectorAll('.menu__item-button');
   const searchForm = document.querySelector('.search-form__form');
   const searchButton = document.querySelector('.search-form__button');
   const burger = document.querySelector('.icon-menu');
   const emailSubmitForm = document.getElementById('form');

   //Popup-links
   let linksPopup = document.querySelectorAll('.link-on-popup');
   function popupLinkClick() {
      linksPopup.forEach(link => {
         link.addEventListener('click', function (e) {
            const popupId = this.dataset.popupId;
            popUp(popupId);
            e.preventDefault();
         });
      });
   }
   popupLinkClick();

   //verify email
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
   searchForm.addEventListener('submit', stopSearch);
   function stopSearch(e) {
      popUp(e.target.dataset.popupId);
      e.target.reset();
      e.preventDefault();
      return false;
   }

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
      //Кнопка + в корзине
      if (e.target.classList.contains('cart-list__btn-plus')) {
         let productId = e.target.closest('.cart-list__item').dataset.cartId;
         let productBtn = e.target;
         updateCart(productBtn, productId);
         // e.preventDefault();
      }
      //Кнопка - в корзине
      if (e.target.classList.contains('cart-list__btn-minus')) {
         let productId = e.target.closest('.cart-list__item').dataset.cartId;
         let productBtn = e.target;
         updateCart(productBtn, productId, false);
         // e.preventDefault();
      }
      //Кнопка удаления товара из корзины
      if (e.target.classList.contains('cart-list__delete')) {
         let productId = e.target.closest('.cart-list__item').dataset.cartId;
         let productBtn = e.target;
         deleteFromCart(productBtn, productId);
         e.preventDefault();
      }
      //Кнопка заказа товара
      if (e.target.classList.contains('cart-list__make-order-btn')) {
         let productBtn = e.target;
         makeOrder(productBtn);
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
                  <a data-popup-id="linkPopup" href="${product.shareUrl}" class="hover-product__share link-on-popup _icon-share">Share</a>
                  <a data-popup-id="linkPopup" href="${product.likeUrl}" class="hover-product__like link-on-popup _icon-favorite">Like</a>
               </div>
            </div>
            <a data-popup-id="linkPopup" href="${product.linkUrl}" class="hover-product__look link-on-popup">
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
      linksPopup = document.querySelectorAll('.link-on-popup');
      popupLinkClick();
   }

   /*===================================================КОРЗИНА===================================================*/
   const cart = document.querySelector('.cart-header');
   const cartBtn = document.querySelector('.cart-header__icon');
   const cartList = document.querySelector('.cart-list');

   //Открытие корзины
   cartBtn.addEventListener('click', function (e) {
      if (cartList.querySelectorAll('.cart-list__item').length > 0) {
         cartList.classList.toggle('active');
      }
      e.preventDefault();
   });
   // Добавление товара в корзину
   function addToCart(productBtn, productId) {
      if (!productBtn.classList.contains('_hold')) {
         productBtn.classList.add('_hold');
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
      }, 500);
   }

   function updateCart(productBtn, productId, productAdd = true) {
      const cartIcon = document.querySelector('.cart-header__icon');
      const cartQuantity = cartIcon.querySelector('span');
      const cartProduct = document.querySelector(`[data-cart-id="${productId}"]`);

      if (productAdd) {
         if (cartQuantity) {
            cartQuantity.innerHTML = ++cartQuantity.innerHTML;
         } else {
            cartIcon.insertAdjacentHTML('beforeend', `<span>1</span>`);
         }
         getPrice(cartProduct, productId, productBtn);
      } else {
         if (!(cartQuantity.innerHTML == 1 || 0)) {
            cartQuantity.innerHTML = --cartQuantity.innerHTML;
         } else {
            cartQuantity.remove();
         }
         getPrice(cartProduct, productId, productBtn, false);
      }
   }

   function makeOrder(productBtn) {
      if (document.querySelectorAll('.ordered-table-popup__item').length > 0) {
         document.querySelectorAll('.ordered-table-popup__item').forEach((item) => {
            item.remove();
         });
         document.querySelector('.ordered-table-popup__total').remove();;
      }
      const cartProducts = cartList.querySelectorAll('.cart-list__item');
      const cartPopup = document.getElementById('cartPopup');
      const popupTable = cartPopup.querySelector('.popup__table');
      let productsId = [];
      cartProducts.forEach((item) => {
         productsId.push(item.dataset.cartId);
      })
      let totalPrice = 0;
      let prices = getPrice(cartProducts, productsId, productBtn, true, true);
      prices.then((data) => {
         for (let i = 0; i < data.length; i++) {
            let price = +data[i];
            const cartProductImg = cartProducts[i].querySelector('.cart-list__img picture').innerHTML;
            let productName = cartProducts[i].querySelector('.cart-list__name').innerHTML;
            let productQuantity = cartProducts[i].querySelector('.cart-list__quantity span').innerHTML;
            let totalProductPrice = price * productQuantity;
            totalPrice += +totalProductPrice;
            popupTable.insertAdjacentHTML('beforeend', `<div class="ordered-table-popup__item">
            <div class="ordered-table-popup__img"><div class="ordered-table-popup__name">${productName}</div>${cartProductImg}</div>
            <div class="ordered-table-popup__price">${price.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0, })}</div>
            <div class="ordered-table-popup__quantity">${productQuantity}</div>
            <div class="ordered-table-popup__total-product-price">${totalProductPrice}</div>
         </div>`);
            if (i == data.length - 1) {
               popupTable.insertAdjacentHTML('beforeend', `<div class="ordered-table-popup__total">Total: ${totalPrice.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', currencyDisplay: 'name', maximumFractionDigits: 0, })}</div>`);
            }
            cartProducts[i].remove();
         }
      });
      removeCart();
      popUp(productBtn.dataset.popupId);
   }

   async function getPrice(cartProduct, productId, productBtn, productAdd = true, makeOrder = false) {
      const file = "json/products.json";
      let responce = await fetch(file, {
         method: 'GET',
      });
      if (responce.ok) {
         let result = await responce.json();
         //Отправка данных о цене при подтверждении заказа
         if (makeOrder) {
            let prices = [];
            productId.forEach((item) => {
               let price = result.products.find((product) => product.id == item).price;
               prices.push(price.slice(3).replace('.', '').trim());
            })
            return prices;
         }

         //Отправка данных о цене при добавлении / удалении товара в корзину
         let cartProductPrice = result.products.find(item => item.id == productId).price;
         cartProductPrice = cartProductPrice.slice(3).replace('.', '');
         // const cartList = document.querySelector('.cart-header__header-list');
         if (productAdd) {
            addPriceToCart(+cartProductPrice, cartProduct, productId, productBtn, cartList);
         } else {
            removePriceFromCart(+cartProductPrice, cartProduct, productBtn, cartList);
         }
         let productsInCart = cartList.querySelectorAll('.cart-list__item');
         let currentPrices = [];
         productsInCart.forEach((item) => {
            let price = result.products.find(product => product.id == item.dataset.cartId).price;
            price = price.slice(3).replace('.', '').trim();
            currentPrices.push(price);
         });
         makeTotalPrice(cartList, currentPrices);
      } else {
         alert('Ошибка загрузки цени товара');
      }

   }

   function addPriceToCart(cartProductPrice, cartProduct, productId, productBtn, cartList) {
      const product = document.querySelector(`[data-id="${productId}"]`);
      const cartProductImg = product.querySelector('.item-product__img').innerHTML;
      const cartPproductName = product.querySelector('.description-product__tittle').innerHTML;
      if (!cartProduct) {
         const cartProductContent = `

<a data-popup-id="linkPopup" href="#" class="cart-list__img link-on-popup">${cartProductImg}<div class="cart-list__price-item">${cartProductPrice.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0, })}</div></a>


<div class="cart-list__body">
   <a data-popup-id="linkPopup" href="#" class="cart-list__name link-on-popup">${cartPproductName}</a>
   <div class="cart-list__quantity"><div class="cart-list__price">${cartProductPrice.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0, })}</div><button class="cart-list__btn-plus">+</button><span> 1 </span><button class="cart-list__btn-minus">-</button></div>
   <a href="#" class="cart-list__delete">Delete</a>
</div>`;
         cartList.insertAdjacentHTML('beforeend', `<li data-cart-id="${productId}" class="cart-list__item" ">${cartProductContent}</li>`);
      } else {
         cartProduct.querySelector('.cart-list__quantity span').innerHTML++;
         let sum = +cartProductPrice * +cartProduct.querySelector('.cart-list__quantity span').innerHTML;
         cartProduct.querySelector('.cart-list__price').innerHTML = sum.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
      }
      productBtn.classList.remove('_hold');
      linksPopup = document.querySelectorAll('.link-on-popup');
      popupLinkClick();
   }

   function removePriceFromCart(cartProductPrice, cartProduct, productBtn, cartList) {
      cartProduct.querySelector('.cart-list__quantity span').innerHTML--;
      let sum = +cartProductPrice * +cartProduct.querySelector('.cart-list__quantity span').innerHTML;
      cartProduct.querySelector('.cart-list__price').innerHTML = sum.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
      if (cartProduct.querySelector('.cart-list__quantity span').innerHTML == 0) {
         cartList.removeChild(cartProduct);
      }
      productBtn.classList.remove('_hold');
   }

   function deleteFromCart(productBtn, productId) {
      const currentProduct = productBtn.closest('.cart-list__item');
      const currentProductQuantityBlock = currentProduct.querySelector('.cart-list__quantity span');
      const allProductsQuantityBlock = document.querySelector('.cart-header__icon span');

      let currentProductQuantity = currentProductQuantityBlock.innerHTML;
      let allProductsQuantity = allProductsQuantityBlock.innerHTML;
      let сalculationQuantityProducts = allProductsQuantity - currentProductQuantity;

      currentProductQuantityBlock.innerHTML = 1;
      allProductsQuantityBlock.innerHTML = сalculationQuantityProducts + 1;

      updateCart(productBtn, productId, false);
   }

   function makeTotalPrice(cartList, currentPrices) {
      let totalPrice = 0;
      for (let i = 0; i < currentPrices.length; i++) {
         let totalPriceItem = +currentPrices[i] * +cartList.querySelectorAll('.cart-list__quantity span')[i].innerHTML;
         totalPrice += totalPriceItem;
      }
      if (!totalPrice) {
         if (document.querySelector('.cart-list__total-price')) {
            document.querySelector('.cart-list__total-price').remove();
            document.querySelector('.cart-list__make-order').remove();
         }
         cartList.insertAdjacentHTML('beforeend', `<div class="cart-list__total-price">Total: <span>${totalPrice.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', currencyDisplay: "name", maximumFractionDigits: 0 })}</span></div><div class="cart-list__make-order"><button data-popup-id="cartPopup" class="cart-list__make-order-btn">Make order</button></div>`);
         if (cartList.querySelectorAll('.cart-list__item').length == 0) {
            removeCart();
         }
      } else {
         if (document.querySelector('.cart-list__total-price')) {
            document.querySelector('.cart-list__total-price').remove();
            document.querySelector('.cart-list__make-order').remove();
         }
         cartList.insertAdjacentHTML('beforeend', `<div class="cart-list__total-price">Total: <span>${totalPrice.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', currencyDisplay: "name", maximumFractionDigits: 0 })}</span></div><div class="cart-list__make-order"><button data-popup-id="cartPopup" class="cart-list__make-order-btn">Make order</button></div>`);
      }
   }
   function removeCart() {
      document.querySelector('.cart-list__total-price').remove();
      document.querySelector('.cart-list__make-order').remove();
      cartList.classList.remove('active');
      if (cartList.previousElementSibling.querySelector('span')) {
         cartList.previousElementSibling.querySelector('span').remove();
      }
   }
   /*===================================================КОРЗИНА===================================================*/

   //Gallery furniture
   const gallery = document.querySelector('.gallery-furniture');

   if (gallery) {
      lightGallery(gallery, {
         selector: '.gallery-furniture__img',
      });
   }
   if (gallery && window.matchMedia && window.matchMedia("(pointer: fine)").matches) {
      const galeryBody = gallery.querySelector('.gallery-furniture__body');
      const galeryRows = gallery.querySelectorAll('.gallery-furniture__row');

      //Скорость
      const speed = galeryBody.dataset.speed;

      //Переменные
      let positionX = 0;
      let coordXprocent = 0;

      function setMouseGalleryStyle() {
         let galleryRowsWidth = 0;
         galeryRows.forEach(row => {
            galleryRowsWidth += row.offsetWidth;
         });
         const galleryDifferent = galleryRowsWidth - galeryBody.offsetWidth;
         const distX = Math.floor(coordXprocent - positionX);

         positionX = positionX + (distX * speed);
         let position = galleryDifferent / 200 * positionX;

         galeryBody.style.cssText = `transform: translate3d(${-position}px, 0, 0);`;

         if (Math.abs(distX) > 0) {
            requestAnimationFrame(setMouseGalleryStyle);
         } else {
            galeryBody.classList.remove('_init');
         }
      }
      galeryBody.addEventListener('mousemove', function (e) {
         //Получение ширины
         const galeryBodyWidth = galeryBody.offsetWidth;

         //Ноль по середине
         const coordX = e.pageX - galeryBodyWidth / 2;

         //Получаем проценты
         coordXprocent = coordX / galeryBodyWidth * 200;

         if (!galeryBody.classList.contains('_init')) {
            requestAnimationFrame(setMouseGalleryStyle);
            galeryBody.classList.add('_init');
         }
      });
      galeryBody.addEventListener('mouseleave', function (e) {
         //Получение ширины
         const galeryBodyWidth = galeryBody.offsetWidth;

         //Ноль по середине
         const coordX = galeryBodyWidth / 2;

         //Получаем проценты
         coordXprocent = -(coordX / galeryBodyWidth);

         requestAnimationFrame(setMouseGalleryStyle);
         galeryBody.classList.remove('_init');
      });
   }
}


