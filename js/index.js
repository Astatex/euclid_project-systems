// Burger меню
function setBurger(params) {
  const btn = document.querySelector(`.${params.btnClass}`);
  const menu = document.querySelector(`.${params.menuClass}`);
  const burgerLinks = document.querySelectorAll('.js-burger-link');

  btn.setAttribute('aria-expanded', false);

  menu.addEventListener("animationend", function () {
    if (this.classList.contains(params.hiddenClass)) {
      this.classList.remove(params.activeClass);
      this.classList.remove(params.hiddenClass);
    }
  });

  function open() {
    btn.classList.add(params.activeClass);
    menu.classList.add(params.activeClass);
    document.body.style.overflow = 'hidden';
    btn.setAttribute('aria-expanded', true);
  }

  function close() {
    btn.classList.remove(params.activeClass);
    menu.classList.add(params.hiddenClass);
    document.body.removeAttribute('style');
    btn.setAttribute('aria-expanded', false);
  }

  btn.addEventListener("click", function () {
    if (
      !menu.classList.contains(params.activeClass) &&
      !menu.classList.contains(params.hiddenClass)
    ) {
      open();
    } else {
      close();
    }
  });

  burgerLinks.forEach(function (link) {
    if (screen.width <= 1280) {
      link.addEventListener('click', close);
    }
  });
}

setBurger({
  btnClass: "js-burger",
  menuClass: "js-menu-wrap",
  activeClass: "is-active",
  hiddenClass: "is-closed",
});

// Окно поиска
function setSearch(params) {
  const openBtn = document.querySelector(`.${params.openBtnClass}`);
  const search = document.querySelector(`.${params.searchClass}`);
  const closeBtn = search.querySelector(`.${params.closeBtnClass}`);

  search.addEventListener("animationend", function (evt) {
    if (this._isOpened) {
      this.classList.remove(params.activeClass);
      this.classList.remove(params.hiddenClass);
      this._isOpened = false;
    } else {
      this._isOpened = true;
    }
  });

  search.addEventListener('click', function(evt) {
    evt._isSearch = true;
  });

  openBtn.addEventListener("click", function (evt) {
    this.disabled = true;

    if (
      !search.classList.contains(params.activeClass) &&
      !search.classList.contains(params.hiddenClass)
    ) {
      search.classList.add(params.activeClass);
    }
  });

  closeBtn.addEventListener('click', function () {
    openBtn.disabled = false;
    search.classList.add(params.hiddenClass);
  });

  document.body.addEventListener('click', function (evt) {
    if (!evt._isSearch && search._isOpened) {
      openBtn.disabled = false;
      search.classList.add(params.hiddenClass);
    }
  });
}

setSearch({
  openBtnClass: "js-open-search", // класс кнопки открытия
  closeBtnClass: "js-close-search", // класс кнопки закрытия
  searchClass: "js-form", // класс формы поиска
  activeClass: "is-opened", // класс открытого состояния
  hiddenClass: "is-closed" // класс закрывающегося состояния (удаляется сразу после закрытия)
});

// Слайдер в разделе hero
const swiper = new Swiper('.js-hero-slider', {
  slidesPerView: 1,
  loop: true,
  pagination: {
    el: '.js-hero-pagination',
    clickable: true,
  },
  // для читалок с экрана
  a11y: {
    paginationBulletMessage: 'Перейти к слайду {{index}}',
  },
});

let tabsBtn = document.querySelectorAll('.works-tabs-nav__btn');
let tabsItem = document.querySelectorAll('.works-tabs-list');

tabsBtn.forEach(function(element){
  element.addEventListener('click', function(e){
    const path = e.currentTarget.dataset.path;

    tabsBtn.forEach(function(btn){ btn.classList.remove('works-tabs-nav__btn--active')});
    e.currentTarget.classList.add('works-tabs-nav__btn--active');

    tabsItem.forEach(function(element){ element.classList.remove('works-tabs-list--active')});
    document.querySelector(`[data-target="${path}"]`).classList.add('works-tabs-list--active');
  });
});

// Аккордион в разделе works
(() => {
  new Accordion(".accordion-container");
})();

