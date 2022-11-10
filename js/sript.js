//Burger menu
let burger = document.querySelector('.header__burger-menu');
let menu = document.querySelector('.header-bot__menu');
let body = document.body;
burger.addEventListener("click", function(e){
   burger.classList.toggle('active');
   menu.classList.toggle('active');
   body.classList.toggle('lock');
})
//--------------------------------------------------------------------
//swiper
if (document.querySelector('.swiper')){
const swiper = new Swiper('.swiper', {
   // Optional parameters
   direction: 'horizontal',
   slidesPerView: 1,
   spaceBetween: 10,
   centeredSlides: true,
   loop: true,
   speed: 800,
   autoplay: {
      delay: 5000,
   },
   on: {
      slideChange: function (swiper) {
         let label = document.querySelectorAll('.slide__name');
         for (i=0; i<label.length; i++){
            label[i].classList.remove('active')
         }
         label[swiper.activeIndex].classList.add('active');
      },
   },
   breakpoints: {
      // when window width is >= 700px
      700: {
         slidesPerView: 2,
      },
   },
   // Navigation arrows
   navigation: {
   nextEl: '.swiper-button-next',
   prevEl: '.swiper-button-prev',
   },
});
};
//---------------------------------------------------------------------------------
// Рейтинг
const ratings = document.querySelectorAll('.rating');

if(ratings.length>0){
   initRatings();
}
// Основная функция
function initRatings(){
   let ratingActive;
   let ratingValue;
   for(index=0; index<ratings.length; index++){
      const rating = ratings[index];
      initRating(rating);

   }
   // Инициализируем конкретный рейтинг
   function initRating(rating){
      initRatingVars(rating);
      setRatingActiveWidth();
      if(rating.classList.contains('rating-set')){
         setRating(rating);
      }
   }
   // Инициализация переменных
   function initRatingVars(rating){
      ratingActive = rating.querySelector('.rating__active');
      ratingValue = rating.querySelector('.rating__value');
   }
   // Изменяем ширину активных звезд
   function setRatingActiveWidth(i = ratingValue.innerHTML){
      const ratingActiveWidth = i/0.05;
      ratingActive.style.width= `${ratingActiveWidth}%`;
   }
   // Возможность указать оценку
   function setRating(rating){
      const ratingItems = rating.querySelectorAll('.rating__item');
      for (let index=0; index<ratingItems.length; index++){
         const ratingItem = ratingItems[index];
         ratingItem.addEventListener("mouseenter", function(e){
            // Обновление переменных
            initRatingVars(rating);
            // Обновление активных звезд
            setRatingActiveWidth(ratingItem.value);
         });
         ratingItem.addEventListener("mouseleave", function(e){
            // Обновление активных звезд
            setRatingActiveWidth();
         });
         ratingItem.addEventListener("click", function(e){
            initRatingVars(rating);
            ratingValue.innerHTML = index + 1;
            setRatingActiveWidth();
         });
      }
   }
}
//--------------------------------------------------------------------------------
//swiper
if(document.querySelector('.swiper-products')){
   const swiper = new Swiper('.swiper-products', {
      // Optional parameters
      direction: 'horizontal',
      slidesPerView: 1,
      centeredSlides: true,
      centeredSlidesBounds: true,
      breakpoints: {
      980: {
         slidesPerView: 4,
         spaceBetween: 15,
         centeredSlides: false,
      },
      755: {
         slidesPerView: 3,
         spaceBetween: 15,
         centeredSlides: false,
      },
      510: {
         slidesPerView: 2,
         spaceBetween: 15,
         centeredSlides: false,
      },
   },
      // Navigation arrows
      navigation: {
         nextEl: '.swiper-products-button-next',
         prevEl: '.swiper-products-button-prev',
      },
   
   });
};
//----------------------------------------------------------------------
// Кнопка  Scroll-Up
let scrollUp = document.querySelector('.scroll-up');
function getTop(){
   return (window.pageYOffset || document.documentElement.scrollTop);
}
scrollUp.addEventListener('click', function(e){
   window.scrollTo({
      top: 0,
      behavior: 'smooth',
   });
});

window.addEventListener('scroll', function(e){
   if(getTop() > 350){
      scrollUp.classList.add('active');
   }else{
      scrollUp.classList.remove('active');
   }
})

// cart

let buyButtons = document.querySelectorAll('.card-textblock__buy-add-button');
for (i=0; buyButtons.length>i; i++){
   let buyButton = buyButtons[i];
   buyButton.addEventListener('click', function(e){
      const productId = buyButton.closest('.card').dataset.cid;
      addToCart(buyButton, productId);
      e.preventDefault;
               
   })
}

function addToCart(productButton, productId){
   if(!productButton.classList.contains('_hold')){
      productButton.classList.add('_hold');
      productButton.classList.add('_fly');

      const cart = document.querySelector('.header-cartblock__cart');
      const product = document.querySelector(`[data-cid="${productId}"]`);
      
      const productImg = product.querySelector('.card__cover-img');

      const productImgFly = productImg.cloneNode(true);
      const productImgFlyWidth = productImg.offsetWidth;
      const productImgFlyHeight = productImg.offsetHeight;
      const productImgFlyTop = productImg.getBoundingClientRect().top;
      const productImgFlyLeft = productImg.getBoundingClientRect().left;

      productImgFly.setAttribute('class', '_flyImg');
      productImgFly.style.cssText = 
         `
      left: ${productImgFlyLeft}px;
      top: ${productImgFlyTop}px;
      width: ${productImgFlyWidth};
      height: ${productImgFlyHeight};
      `;

      document.body.append(productImgFly);

      const cartFlyLeft = cart.getBoundingClientRect().left;
      const cartFlyTop = cart.getBoundingClientRect().top;

      productImgFly.style.cssText = 
      `
      left: ${cartFlyLeft}px;
      top: ${cartFlyTop}px;
      `;

      productImgFly.addEventListener('transitionend', function(){
         if(productButton.classList.contains('_fly')){
            productImgFly.remove();
            updateCart(productButton, productId);
            productButton.classList.remove('_fly');
         }
      })
   }
}

function updateCart(productButton, productId, productAdd = true){
   const cart = document.querySelector('.header-cartblock__cart');
   const cartLable = cart.querySelector('.header-cart__lable');
   const cartQuantity = cartLable.querySelector('span');
   const cartProduct = document.querySelector(`[data-cart-cid="${productId}"]`);
   const cartList = document.querySelector('.cart-list');

   // Добавляем
   if(productAdd){
      if (cartQuantity){
         cartQuantity.innerHTML = ++cartQuantity.innerHTML;
      }else{
         cartLable.insertAdjasmentHTML('beforeend', `<span>1</span>`);
      }
      if(!cartProduct){
         const product = document.querySelector(`[data-cid="${productId}"]`);
         const cartProductImg = product.querySelector('.card__cover-image').innerHTML;
         const cartProductTitle = product.querySelector('.card-textblock__title-name').innerHTML;
         const cartProductArtist = product.querySelector('.card-textblock__title-artist').innerHTML;
         const cartProductPrice = product.querySelector('.card-textblock__buy-price').innerHTML;
         let cartRealPrice;
         if(product.querySelector('.card-textblock__buy-price-sale')){
            const cartProductSale = product.querySelector('.card-textblock__buy-price-sale').innerHTML;
            cartRealPrice = cartProductSale;
         }else{
            cartRealPrice = cartProductPrice;
         }
         const cartProductContent = `
            <a href="#" class="cart-list__img">${cartProductImg}</a>
            <div class="cart-list__body">
            <div class="cart-list__mainblock">
            <div class="cart-list__quantity"><span>1</span>x</div>
            <a href="#" class="cart-list__title">${cartProductTitle}</a>
            <a href="#" class="cart-list__artist">${cartProductArtist}</a>
            </div>
            <div class="cart-list__priceblock">
            <a href="#" class="cart-list__price">${cartRealPrice}</a>
            <a href="#" class="cart-list__delete">X</a>
            </div>
            </div>`;
            cartList.insertAdjacentHTML('beforeend', `<li data-cart-cid="${productId}" class="cart-list__item">${cartProductContent}</li>`);
            // расчет общей суммы
            calcTotal(cartProduct);
      }else{
         const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
         cartProductQuantity.innerHTML = ++cartProductQuantity.innerHTML;
         // расчет цены каждого товара
         const product = document.querySelector(`[data-cid="${productId}"]`);
         let Price = product.querySelector('.card-textblock__buy-price').innerHTML;
         let cartRealPrice;
         if(product.querySelector('.card-textblock__buy-price-sale')){
            const cartProductSale = product.querySelector('.card-textblock__buy-price-sale').innerHTML;
            cartRealPrice = cartProductSale;
         }else{
            cartRealPrice = Price;
         }
         let cartProductTotal = cartProduct.querySelector('.cart-list__price');
         let cartRealPricce = parseFloat(cartRealPrice.slice(1)) * cartProductQuantity.innerHTML;
         cartProductTotal.innerHTML = "$" + cartRealPricce;
         // расчет общей суммы
         calcTotal(cartProduct);
      }
      //после всех действий
      productButton.classList.remove('_hold');
      
   }else{
      const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
      cartProductQuantity.innerHTML = --cartProductQuantity.innerHTML;
      // расчет цены каждого товара
      const product = document.querySelector(`[data-cid="${productId}"]`);
      let Price = product.querySelector('.card-textblock__buy-price').innerHTML;
      let cartRealPrice;
      if(product.querySelector('.card-textblock__buy-price-sale')){
         const cartProductSale = product.querySelector('.card-textblock__buy-price-sale').innerHTML;
         cartRealPrice = cartProductSale;
      }else{
         cartRealPrice = Price;
      }
      let cartProductTotal = cartProduct.querySelector('.cart-list__price');
      let cartRealPricce = parseFloat(cartRealPrice.slice(1)) * cartProductQuantity.innerHTML;
      cartProductTotal.innerHTML = "$" + cartRealPricce;
      // расчет общей суммы
      calcTotal(cartProduct);
      if(!parseInt(cartProductQuantity.innerHTML)){
         cartProduct.remove();
      }
      // если надо удалять значок количества возле корзины
      const cartQuantityValue = --cartQuantity.innerHTML;
      if(cartQuantityValue){
         cartQuantity.innerHTML = cartQuantityValue;
      }else{
         cartQuantity.remove;
         document.querySelector('.header-cart__body').classList.remove('_active')
      }

   }
}




window.onload = function(){
   document.addEventListener('click', documentAction);

   function documentAction(e){
      const targetElement = e.target;
      // открытие окна корзины
      if(targetElement.closest('.header-cartblock__cart')){
         if(document.querySelector('.cart-list').children.length > 0){
            document.querySelector('.header-cart__body').classList.toggle('_active');
         }
         e.preventDefault();
      }else if(!targetElement.closest('.header-cart__body') && !targetElement.closest('.card-textblock__buy-add-button')){
         document.querySelector('.header-cart__body').classList.remove('_active');
      }
      // удаление из корзины
      if(targetElement.closest('.cart-list__delete')){
         const productId = targetElement.closest('.cart-list__item').dataset.cartCid;
         updateCart(targetElement, productId, false);
         e.preventDefault();
      }
   }
}
// функция рачета и вывода общей суммы корзины
function calcTotal(product){
let total = 0;
const cartBody = document.querySelector('.header-cart__body');
let costs = cartBody.querySelectorAll('.cart-list__price');
let totalCost = document.querySelector('.header-cart__total-cost');
for (i=0; costs.length>i; ++i){
   let cost = (costs[i].innerHTML);
   total = total + parseFloat(cost.slice(1));
   //return total;
};
totalCost.innerHTML = "$" + total.toFixed(2);
};