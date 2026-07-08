// Свайпер категорий прав — на всех разрешениях, слайды с авто-шириной
(() => {
  const sliderEl = document.querySelector('[data-license-cats-slider]');
  if (!sliderEl || typeof Swiper === 'undefined') return;

  new Swiper(sliderEl, {
    slidesPerView: 'auto',
    spaceBetween: 16,
    freeMode: true,
  });
})();


// Свайпер приложения — только на мобилках, с progressbar-пагинацией
(() => {
  const sliderEl = document.querySelector('[data-student-app-slider]');
  if (!sliderEl || typeof Swiper === 'undefined') return;

  const mq = window.matchMedia('(max-width: 767px)');
  let swiper = null;

  const initSlider = () => {
    if (swiper) return;

    const paginationEl = sliderEl.querySelector('.swiper-pagination');

    swiper = new Swiper(sliderEl, {
      slidesPerView: 1.14,
      spaceBetween: 14,
      watchOverflow: true,
      pagination: {
        el: paginationEl,
        type: 'progressbar',
      },
    });
  };

  const destroySlider = () => {
    if (!swiper) return;

    swiper.destroy(true, true);
    swiper = null;
  };

  const sync = (e) => {
    if (e.matches) initSlider();
    else destroySlider();
  };

  sync(mq);
  mq.addEventListener('change', sync);
})();

// Свайпер преимуществ — только на мобилках, с progressbar-пагинацией
(() => {
  const sliderEl = document.querySelector('[data-advantages-slider]');
  if (!sliderEl || typeof Swiper === 'undefined') return;

  const mq = window.matchMedia('(max-width: 767px)');
  let swiper = null;

  const initSlider = () => {
    if (swiper) return;

    const paginationEl = sliderEl.querySelector('.swiper-pagination');

    swiper = new Swiper(sliderEl, {
      slidesPerView: 1.14,
      spaceBetween: 14,
      watchOverflow: true,
      pagination: {
        el: paginationEl,
        type: 'progressbar',
      },
    });
  };

  const destroySlider = () => {
    if (!swiper) return;

    swiper.destroy(true, true);
    swiper = null;
  };

  const sync = (e) => {
    if (e.matches) initSlider();
    else destroySlider();
  };

  sync(mq);
  mq.addEventListener('change', sync);
})();

// Свайпер отзывов — на всех разрешениях
(() => {
  const sliderEl = document.querySelector('[data-reviews-slider]');
  if (!sliderEl || typeof Swiper === 'undefined') return;

  const paginationEl = sliderEl.querySelector('.swiper-pagination');

  new Swiper(sliderEl, {
    slidesPerView: 1.08,
    spaceBetween: 16,
    watchOverflow: true,
    watchSlidesProgress: true,
    grabCursor: true,
    pagination: {
      el: paginationEl,
      type: 'progressbar',
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });
})();

// FAQ — плавное раскрытие details
(() => {
  const items = document.querySelectorAll('.faq__item');

  if (!items.length) return;

  items.forEach((item) => {
    const summary = item.querySelector('.faq__question');
    const answer = item.querySelector('.faq__answer');

    if (!summary || !answer) return;

    summary.addEventListener('click', (event) => {
      event.preventDefault();

      if (item.dataset.animating === 'true') return;

      item.open ? closeItem(item, answer) : openItem(item, answer);
    });
  });

  function openItem(item, answer) {
    item.dataset.animating = 'true';
    item.open = true;

    // полная высота уже раскрытого ответа (с учётом padding-bottom)
    const fullHeight = answer.scrollHeight;

    // стартуем из истинного нуля: и высота, и нижний отступ.
    // padding-bottom держим в 0 на всё время анимации (он уже учтён в fullHeight)
    answer.style.height = '0px';
    answer.style.paddingBottom = '0px';
    answer.style.opacity = '0';

    // принудительный reflow, чтобы стартовые значения зафиксировались
    void answer.offsetHeight;

    answer.style.height = `${fullHeight}px`;
    answer.style.opacity = '1';

    answer.addEventListener('transitionend', function handler(event) {
      if (event.propertyName !== 'height') return;

      // высота -> auto и отступ -> 2rem одновременно: суммарная высота не меняется
      answer.style.height = 'auto';
      answer.style.paddingBottom = '';
      item.dataset.animating = 'false';

      answer.removeEventListener('transitionend', handler);
    });
  }

  function closeItem(item, answer) {
    item.dataset.animating = 'true';

    // фиксируем текущую высоту как стартовую точку и сразу убираем отступ:
    // высота уже включает его, поэтому суммарная высота на старте не прыгает
    answer.style.height = `${answer.scrollHeight}px`;
    answer.style.paddingBottom = '0px';
    answer.style.opacity = '1';

    // принудительный reflow перед сворачиванием
    void answer.offsetHeight;

    answer.style.height = '0px';
    answer.style.opacity = '0';

    answer.addEventListener('transitionend', function handler(event) {
      if (event.propertyName !== 'height') return;

      item.open = false;
      answer.style.height = '';
      answer.style.paddingBottom = '';
      answer.style.opacity = '';
      item.dataset.animating = 'false';

      answer.removeEventListener('transitionend', handler);
    });
  }
})();

// Header: перенос лишних пунктов меню в "Ещё"
(() => {
  const mobileMq = window.matchMedia('(max-width: 767px)');

  const menus = [
    {
      name: 'top',
      container: document.querySelector('.header__top-inner'),
      nav: document.querySelector('[data-header-overflow-nav="top"]'),
      more: document.querySelector('[data-header-more="top"]'),
      moreList: document.querySelector('[data-header-more-list="top"]'),
    },
    {
      name: 'main',
      container: document.querySelector('.header__main-inner'),
      nav: document.querySelector('[data-header-overflow-nav="main"]'),
      more: document.querySelector('[data-header-more="main"]'),
      moreList: document.querySelector('[data-header-more-list="main"]'),
    },
  ].filter((menu) => menu.container && menu.nav && menu.more && menu.moreList);

  if (!menus.length) return;

  const originalLinks = new Map();
  let rafId = null;

  menus.forEach((menu) => {
    originalLinks.set(menu.name, Array.from(menu.nav.children));
  });

  const hasOverflow = (menu) => {
    return (
        menu.container.scrollWidth > menu.container.clientWidth ||
        menu.nav.scrollWidth > menu.nav.clientWidth
    );
  };

  const restoreMenu = (menu) => {
    originalLinks.get(menu.name).forEach((link) => {
      menu.nav.appendChild(link);
    });

    menu.more.classList.remove('is-active');
    menu.more.open = false;
  };

  const updateMenu = (menu) => {
    restoreMenu(menu);

    if (mobileMq.matches) return;

    if (!hasOverflow(menu)) return;

    menu.more.classList.add('is-active');

    while (hasOverflow(menu) && menu.nav.children.length > 1) {
      menu.moreList.prepend(menu.nav.lastElementChild);
    }

    if (!menu.moreList.children.length) {
      menu.more.classList.remove('is-active');
      menu.more.open = false;
    }
  };

  const updateAll = () => {
    menus.forEach(updateMenu);
  };

  const scheduleUpdate = () => {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(updateAll);
  };

  window.addEventListener('resize', scheduleUpdate);
  mobileMq.addEventListener('change', scheduleUpdate);

  if (document.fonts) {
    document.fonts.ready.then(scheduleUpdate);
  }

  document.addEventListener('click', (event) => {
    menus.forEach((menu) => {
      if (!menu.more.contains(event.target)) {
        menu.more.open = false;
      }
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      menus.forEach((menu) => {
        menu.more.open = false;
      });
    }
  });

  scheduleUpdate();
})();

// Мобильное меню
(() => {
  const header = document.querySelector('[data-mobile-header]');
  if (!header) return;

  const toggle = header.querySelector('[data-mobile-menu-toggle]');
  const menu = header.querySelector('[data-mobile-menu]');

  if (!toggle || !menu) return;

  const openMenu = () => {
    header.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Закрыть меню');
    document.body.classList.add('is-menu-open');
  };

  const closeMenu = () => {
    header.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Открыть меню');
    document.body.classList.remove('is-menu-open');
  };

  const toggleMenu = () => {
    header.classList.contains('is-open') ? closeMenu() : openMenu();
  };

  toggle.addEventListener('click', toggleMenu);

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });
})();

// Филиалы: поиск, раскрытие карточек, Яндекс.Карта и балуны
(() => {
  const block = document.querySelector('.branches');

  if (!block) return;

  const mapEl = block.querySelector('[data-branches-map]');
  const cards = Array.from(block.querySelectorAll('.branch-card[data-branch-id]'));
  const searchForm = block.querySelector('[data-site-search]');
  const searchInput = block.querySelector('[data-site-search-input]');
  const searchClear = block.querySelector('[data-site-search-clear]');

  if (!cards.length) return;

  let map = null;
  let activePlacemark = null;
  const placemarks = new Map();

  initSearch();
  initCards();

  if (mapEl && typeof ymaps !== 'undefined') {
    ymaps.ready(initMap);
  } else {
    const activeCard = block.querySelector('.branch-card.is-active[data-branch-id]') || cards[0];
    setActiveBranch(activeCard.dataset.branchId, { openBalloon: false, moveMap: false });
  }

  function initSearch() {
    if (!searchForm || !searchInput) return;

    const updateSearchState = () => {
      const value = searchInput.value.trim().toLowerCase();

      searchForm.classList.toggle('has-value', value.length > 0);

      cards.forEach((card) => {
        const searchableText = [
          card.dataset.branchTitle,
          card.dataset.branchArea,
          card.dataset.branchAddress,
          card.textContent,
        ]
            .join(' ')
            .toLowerCase();

        card.hidden = value.length > 0 && !searchableText.includes(value);
      });
    };

    searchInput.addEventListener('input', updateSearchState);

    if (searchClear) {
      searchClear.addEventListener('click', () => {
        searchInput.value = '';
        updateSearchState();
        searchInput.focus();
      });
    }

    if (searchForm) {
      searchForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const firstVisibleCard = cards.find((card) => !card.hidden);

        if (firstVisibleCard) {
          setActiveBranch(firstVisibleCard.dataset.branchId, {
            openBalloon: true,
            moveMap: true,
            scrollCard: true,
          });
        }
      });
    }

    updateSearchState();
  }

  function initCards() {
    cards.forEach((card) => {
      const head = card.querySelector('.branch-card__head');

      if (!head) return;

      head.addEventListener('click', () => {
        setActiveBranch(card.dataset.branchId, {
          openBalloon: true,
          moveMap: true,
          scrollCard: true,
        });
      });
    });
  }

  function initMap() {
    const branches = cards
        .map((card) => {
          const coords = parseCoords(card.dataset.branchCoords);

          if (!coords) return null;

          return {
            id: card.dataset.branchId,
            title: card.dataset.branchTitle || '',
            area: card.dataset.branchArea || '',
            address: card.dataset.branchAddress || '',
            phone: card.dataset.branchPhone || '',
            email: card.dataset.branchEmail || '',
            vk: card.dataset.branchVk || '',
            coords,
            card,
          };
        })
        .filter(Boolean);

    if (!branches.length) return;

    map = new ymaps.Map(mapEl, {
      center: branches[0].coords,
      zoom: 11,
      controls: ['zoomControl'],
    });

    map.behaviors.disable('scrollZoom');

    branches.forEach((branch) => {
      const placemark = new ymaps.Placemark(
          branch.coords,
          {
            hintContent: branch.title,
            balloonContent: createBalloonContent(branch),
          },
          {
            iconLayout: 'default#image',
            iconImageHref: 'images/map-pin.svg',
            iconImageSize: [52, 62],
            iconImageOffset: [-26, -62],
            hideIconOnBalloonOpen: true,
            balloonCloseButton: false,
            balloonPanelMaxMapArea: 0,
          }
      );

      placemark.events.add('click', () => {
        setActiveBranch(branch.id, {
          openBalloon: false,
          moveMap: false,
        });
      });

      placemark.events.add('balloonopen', () => {
        activePlacemark = placemark;

        setActiveBranch(branch.id, {
          openBalloon: false,
          moveMap: false,
        });
      });

      placemarks.set(branch.id, placemark);
      map.geoObjects.add(placemark);
    });

    const bounds = map.geoObjects.getBounds();

    if (bounds) {
      map.setBounds(bounds, {
        checkZoomRange: true,
        zoomMargin: 48,
      });
    }

    mapEl.addEventListener('click', (event) => {
      const closeButton = event.target.closest('[data-map-balloon-close]');

      if (!closeButton) return;

      event.preventDefault();

      if (activePlacemark) {
        activePlacemark.balloon.close();
      }
    });

    const activeCard = block.querySelector('.branch-card.is-active[data-branch-id]') || cards[0];

    setActiveBranch(activeCard.dataset.branchId, {
      openBalloon: true,
      moveMap: false,
    });
  }

  function setActiveBranch(id, options = {}) {
    const { openBalloon = false, moveMap = false, scrollCard = false } = options;

    cards.forEach((card) => {
      const isActive = card.dataset.branchId === id;
      const details = card.querySelector('.branch-card__details');
      const toggle = card.querySelector('.branch-card__toggle');

      card.classList.toggle('is-active', isActive);

      if (details) {
        details.hidden = !isActive;
      }

      if (toggle) {
        toggle.setAttribute('aria-expanded', String(isActive));
        toggle.setAttribute('aria-label', isActive ? 'Свернуть' : 'Подробнее');
      }

      if (isActive && scrollCard) {
        const isMobile = window.matchMedia('(max-width: 767px)').matches;
        const scrollTarget = isMobile && mapEl ? mapEl : card;

        scrollTarget.scrollIntoView({
          block: isMobile ? 'start' : 'nearest',
          behavior: 'smooth',
        });
      }
    });

    placemarks.forEach((placemark, placemarkId) => {
      const isActive = placemarkId === id;

      placemark.options.set({
        iconImageHref: isActive ? 'images/map-pin-active.svg' : 'images/map-pin.svg',
        iconImageSize: isActive ? [58, 68] : [52, 62],
        iconImageOffset: isActive ? [-29, -68] : [-26, -62],
      });
    });

    const activeCard = cards.find((card) => card.dataset.branchId === id);
    const activeCoords = parseCoords(activeCard?.dataset.branchCoords);
    const placemark = placemarks.get(id);

    if (map && activeCoords && moveMap) {
      map.setCenter(activeCoords, 13, {
        duration: 300,
      });
    }

    if (placemark && openBalloon) {
      placemark.balloon.open();
      activePlacemark = placemark;
    }
  }

  function createBalloonContent(branch) {
    return `
      <div class="map-popup">
        <div class="map-popup__head">
          <div class="map-popup__address">
            ${escapeHtml(branch.address)}
          </div>

          <button
            class="map-popup__close"
            type="button"
            aria-label="Закрыть"
            data-map-balloon-close
          ></button>
        </div>

        <div class="map-popup__body">
          ${
        branch.phone
            ? `
                <a class="map-popup__contact map-popup__contact--phone" href="${getPhoneHref(branch.phone)}">
                  ${escapeHtml(branch.phone)}
                  <span>общий номер</span>
                </a>
              `
            : ''
    }

          ${
        branch.email
            ? `
                <a class="map-popup__contact map-popup__contact--email" href="mailto:${escapeHtml(branch.email)}">
                  ${escapeHtml(branch.email)}
                </a>
              `
            : ''
    }
        </div>
      </div>
    `;
  }

  function parseCoords(value) {
    if (!value) return null;

    const coords = value.split(',').map((item) => Number(item.trim()));

    if (coords.length !== 2 || coords.some(Number.isNaN)) {
      return null;
    }

    return coords;
  }

  function getPhoneHref(phone) {
    let digits = phone.replace(/\D/g, '');

    if (digits.length === 11 && digits.startsWith('8')) {
      digits = `7${digits.slice(1)}`;
    }

    if (digits.length === 10) {
      digits = `7${digits}`;
    }

    return `tel:+${digits}`;
  }

  function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
  }
})();

// Попап «Записаться» (Fancybox)
(() => {
  if (typeof Fancybox === 'undefined') return;

  const popup = document.querySelector('#callback-popup');
  const triggers = document.querySelectorAll('a[href="#callback"]');

  if (!popup || !triggers.length) return;

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();

      Fancybox.show(
          [{ src: '#callback-popup', type: 'inline' }],
          { mainClass: 'fancybox--callback' }
      );
    });
  });
})();

// Ripple-эффект — при наведении и при клике.
// Работает для всех .btn, а также для любого элемента с классом .js-ripple.
(() => {
  if (typeof jQuery === 'undefined' || typeof jQuery.ripple !== 'function') return;

  const selector = '.btn, .js-ripple';

  jQuery.ripple(selector, { on: 'mouseenter' });
  jQuery.ripple(selector, { on: 'mousedown' });
})();

// Маска телефона +7 (___) ___-__-__ для всех полей с data-phone (Inputmask)
(() => {
  if (typeof Inputmask === 'undefined') return;

  const inputs = document.querySelectorAll('input[data-phone]');
  if (!inputs.length) return;

  // Вставка/автозаполнение: «8 (900)…», «+7 900…», «9001234567» → 10 цифр.
  // Префикс страны (8 или 7) срезаем только когда цифр ровно 11.
  const normalize = (value) => {
    let digits = String(value).replace(/\D/g, '');
    if (digits.length === 11 && (digits[0] === '8' || digits[0] === '7')) {
      digits = digits.slice(1);
    }
    return digits;
  };

  const mask = new Inputmask({
    mask: '+7 (c99) 999-99-99',
    definitions: {
      // Первая цифра кода: что угодно, кроме 8 и 7. Привычный «выход на
      // межгород» 8 (и 7 от +7) просто не вводится — мобильный код всегда с 9.
      c: { validator: '[0-69]', cardinality: 1, placeholder: '_' },
    },
    showMaskOnHover: false,
    clearIncomplete: true, // неполный номер очищается при потере фокуса
    onBeforeMask: normalize,
    onBeforePaste: normalize,
  });

  inputs.forEach((input) => mask.mask(input));
})();

// Стилизованный выпадающий список — кастомный дропдаун поверх нативного select.
// Прогрессивное улучшение: без JS остаётся рабочий нативный <select>.
(() => {
  const wrappers = document.querySelectorAll('.lead-form__select');
  if (!wrappers.length) return;

  wrappers.forEach((wrapper) => {
    const select = wrapper.querySelector('select');
    if (!select || wrapper.classList.contains('is-enhanced')) return;

    const allOptions = Array.from(select.options);
    // В меню показываем только реальные пункты (без плейсхолдера value="").
    const items = allOptions
        .map((opt, index) => ({ opt, index }))
        .filter(({ opt }) => opt.value !== '');
    if (!items.length) return;

    const baseId = `${select.name || 'cselect'}-${Math.random().toString(36).slice(2, 7)}`;

    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'lead-form__control cselect__trigger';
    trigger.id = `${baseId}-trigger`;
    trigger.setAttribute('aria-haspopup', 'listbox');
    trigger.setAttribute('aria-expanded', 'false');

    const menu = document.createElement('ul');
    menu.className = 'cselect__menu';
    menu.tabIndex = -1;
    menu.setAttribute('role', 'listbox');
    menu.setAttribute('aria-labelledby', trigger.id);

    const optionEls = items.map(({ opt }, i) => {
      const li = document.createElement('li');
      li.className = 'cselect__option';
      li.id = `${baseId}-opt-${i}`;
      li.setAttribute('role', 'option');
      li.textContent = opt.textContent;
      menu.appendChild(li);
      return li;
    });

    wrapper.classList.add('is-enhanced');
    wrapper.appendChild(trigger);
    wrapper.appendChild(menu);

    let active = 0; // позиция подсветки внутри items

    const selectedPos = () => items.findIndex(({ index }) => index === select.selectedIndex);

    const syncTrigger = () => {
      const sel = allOptions[select.selectedIndex];
      const placeholder = !sel || sel.value === '';
      trigger.textContent = placeholder ? allOptions[0].textContent : sel.textContent;
      trigger.classList.toggle('cselect__trigger--placeholder', placeholder);
    };

    const paint = () => {
      const pos = selectedPos();
      optionEls.forEach((el, i) => {
        el.classList.toggle('is-active', i === active);
        el.setAttribute('aria-selected', i === pos ? 'true' : 'false');
      });
      const el = optionEls[active];
      if (el) {
        menu.setAttribute('aria-activedescendant', el.id);
        el.scrollIntoView({ block: 'nearest' });
      }
    };

    const isOpen = () => wrapper.classList.contains('is-open');

    const open = () => {
      if (isOpen()) return;
      active = Math.max(selectedPos(), 0);
      wrapper.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
      paint();
    };

    const close = () => {
      if (!isOpen()) return;
      wrapper.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    };

    const choose = (i) => {
      select.selectedIndex = items[i].index;
      select.dispatchEvent(new Event('change', { bubbles: true }));
      syncTrigger();
      close();
      trigger.focus();
    };

    trigger.addEventListener('click', () => (isOpen() ? close() : open()));

    menu.addEventListener('click', (event) => {
      const li = event.target.closest('.cselect__option');
      if (li) choose(optionEls.indexOf(li));
    });

    menu.addEventListener('mousemove', (event) => {
      const li = event.target.closest('.cselect__option');
      if (li) {
        active = optionEls.indexOf(li);
        paint();
      }
    });

    // Поиск пункта по набранным буквам
    let typed = '';
    let typedTimer = null;

    trigger.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          if (!isOpen()) { open(); break; }
          active = Math.min(active + 1, items.length - 1);
          paint();
          break;
        case 'ArrowUp':
          event.preventDefault();
          if (!isOpen()) { open(); break; }
          active = Math.max(active - 1, 0);
          paint();
          break;
        case 'Home':
          if (isOpen()) { event.preventDefault(); active = 0; paint(); }
          break;
        case 'End':
          if (isOpen()) { event.preventDefault(); active = items.length - 1; paint(); }
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          if (isOpen()) choose(active);
          else open();
          break;
        case 'Escape':
          if (isOpen()) { event.preventDefault(); close(); }
          break;
        case 'Tab':
          close();
          break;
        default:
          if (event.key.length === 1) {
            if (!isOpen()) open();
            typed += event.key.toLowerCase();
            clearTimeout(typedTimer);
            typedTimer = setTimeout(() => { typed = ''; }, 600);
            const match = items.findIndex(({ opt }) =>
                opt.textContent.trim().toLowerCase().startsWith(typed));
            if (match >= 0) { active = match; paint(); }
          }
          break;
      }
    });

    // Клик вне компонента — закрываем
    document.addEventListener('click', (event) => {
      if (!wrapper.contains(event.target)) close();
    });

    syncTrigger();
  });
})();

// Плавное появление блоков при прокрутке (IntersectionObserver + CSS)
(() => {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Группы блоков. items — одиночные элементы; container+item — сетка с
  // каскадом (step — задержка между соседними элементами, мс).
  const groups = [
    { items: '.section-head' },
    // Слайдеры Swiper показываем контейнером целиком: отдельные слайды каскадить
    // нельзя — на мобиле сдвинутые по горизонтали слайды «застряли» бы скрытыми.
    { items: '.license-cats__slider, .advantages__slider, .student-app__slider, .reviews__slider' },
    { container: '.school-stats__list', item: ':scope > *', step: 70 },
    { container: '.learning-formats__grid', item: '.format-card', step: 70 },
    { container: '.course-process__list', item: '.course-process__item', step: 80 },
    { container: '.instructors__grid', item: '.instructor-card', step: 60 },
    { container: '.faq', item: '.faq__item', step: 60 },
    { container: '.quick-start__container', item: ':scope > *', step: 80 },
  ];

  const targets = [];

  const tag = (el, delay) => {
    if (!el || el.hasAttribute('data-reveal')) return;
    if (el.closest('.swiper-wrapper')) return; // слайды Swiper не трогаем
    if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`);
    el.setAttribute('data-reveal', '');
    targets.push(el);
  };

  groups.forEach((group) => {
    if (group.items) {
      document.querySelectorAll(group.items).forEach((el) => tag(el, 0));
      return;
    }
    document.querySelectorAll(group.container).forEach((container) => {
      container.querySelectorAll(group.item).forEach((el, i) => {
        // задержку каскада ограничиваем, чтобы дальние элементы не «зависали»
        tag(el, Math.min(i, 6) * (group.step || 60));
      });
    });
  });

  if (!targets.length) return;

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-revealed');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  // Наблюдатель сам покажет то, что уже в зоне видимости (верхние блоки мягко
  // проявятся при загрузке), остальное — по мере прокрутки.
  targets.forEach((el) => io.observe(el));
})();