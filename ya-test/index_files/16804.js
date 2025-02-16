document.addEventListener("reactHydrated", () => {
  const group = document.querySelector("#cards_group");
  if (!group) return;

  const track = group.querySelector(".lc-features__items");
  if (!track) return;

  const isMobile = window.matchMedia("(pointer: coarse)").matches;
  const SPEED_PX_PER_SEC = isMobile ? 60 : 40;

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  class InfiniteSlider {
    constructor(track, { direction = -1, speed = SPEED_PX_PER_SEC, checkActive = true } = {}) {
      this.track = track;
      this.direction = direction;
      this.speed = speed;
      this.checkActive = checkActive;

      this.isDragging = false;
      this.hasMoved = false;
      this.startX = 0;
      this.startY = 0;
      this.draggingType = null;
      this.trackPos = 0;
      this.animationId = null;
      this.lastTime = 0;

      this.DRAG_THRESHOLD = isMobile ? 5 : 1;

      this.lastActiveCheckTime = 0;
      this.ACTIVE_CHECK_THROTTLE = 50; // мс

      // Разрешаем вертикальную прокрутку и включаем аппаратное ускорение
      this.track.style.touchAction = "pan-y";

      this.totalWidth = track.scrollWidth;
      this.singleSetWidth = this.totalWidth / 2;

      // Начальная позиция зависит от направления
      this.trackPos = direction > 0 ? -this.singleSetWidth : 0;

      // Привязка контекста методов
      this.updateTransform = this.updateTransform.bind(this);
      this.animate = this.animate.bind(this);
      this.onPointerDown = this.onPointerDown.bind(this);
      this.onPointerMove = this.onPointerMove.bind(this);
      this.onPointerUp = this.onPointerUp.bind(this);
      this.updateDimensions = this.updateDimensions.bind(this);

      // Для мобильных устройств создаем дебаунс-версию updateDimensions
      if (isMobile) {
        this.debouncedUpdateDimensions = debounce(this.updateDimensions, 200);
      }

      this.init();
    }

    init() {
      this.updateTransform();
      this.startAnimation();
      this.attachEvents();

      if (isMobile) {
        window.addEventListener("resize", this.debouncedUpdateDimensions);
        window.addEventListener("orientationchange", this.debouncedUpdateDimensions);
      } else {
        window.addEventListener("resize", this.updateDimensions);
        window.addEventListener("orientationchange", this.updateDimensions);
      }
    }

    updateTransform() {
      this.track.style.transform = `translate3d(${this.trackPos}px, 0, 0)`;
    }

    wrapPosition() {
      if (this.direction < 0) {
        while (this.trackPos <= -this.singleSetWidth) {
          this.trackPos += this.singleSetWidth;
        }
        while (this.trackPos >= 0) {
          this.trackPos -= this.singleSetWidth;
        }
      } else {
        while (this.trackPos >= 0) {
          this.trackPos -= this.singleSetWidth;
        }
        while (this.trackPos < -this.singleSetWidth) {
          this.trackPos += this.singleSetWidth;
        }
      }
    }

    animate(timestamp) {
      if (!this.lastTime) {
        this.lastTime = timestamp;
      }
      const deltaTime = timestamp - this.lastTime;
      this.lastTime = timestamp;

      if (!this.isDragging) {
        const moveX = this.speed * (deltaTime / 1000);
        this.trackPos += moveX * this.direction;
        this.wrapPosition();
        this.updateTransform();

        if (this.checkActive) {
          this.checkActiveItems();
        }
      }

      this.animationId = requestAnimationFrame(this.animate);
    }

    startAnimation() {
      if (!this.animationId) {
        this.lastTime = 0;
        this.animationId = requestAnimationFrame(this.animate);
      }
    }

    stopAnimation() {
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
        this.lastTime = 0;
      }
    }

    onPointerDown(e) {
      if (e.pointerType === "mouse") {
        e.preventDefault();
      }
      this.isDragging = true;
      this.hasMoved = false;
      this.draggingType = null; // направление пока не определено
      this.startX = e.clientX;
      this.startY = e.clientY;
      this.stopAnimation();
    }

    onPointerMove(e) {
      if (!this.isDragging) return;

      const currentX = e.clientX;
      const currentY = e.clientY;
      const dx = currentX - this.startX;
      const dy = currentY - this.startY;

      // Если направление жеста не определено, определяем его
      if (this.draggingType === null) {
        if (Math.abs(dx) < this.DRAG_THRESHOLD && Math.abs(dy) < this.DRAG_THRESHOLD) {
          return; // недостаточно движения для определения
        }
        if (Math.abs(dx) >= Math.abs(dy)) {
          this.draggingType = "horizontal";
          // Захватываем указатель для горизонтального перетаскивания
          e.target.setPointerCapture(e.pointerId);
        } else {
          this.draggingType = "vertical";
          // Если жест вертикальный – отменяем перетаскивание слайдера
          this.isDragging = false;
          if (e.target.hasPointerCapture(e.pointerId)) {
            e.target.releasePointerCapture(e.pointerId);
          }
          return;
        }
      }

      if (this.draggingType === "horizontal") {
        if (Math.abs(dx) > this.DRAG_THRESHOLD) {
          this.hasMoved = true;
        }
        this.startX = currentX; // обновляем координату для следующего расчёта
        this.trackPos += dx;
        this.updateTransform();

        if (this.checkActive) {
          this.checkActiveItems();
        }
      }
    }

    onPointerUp(e) {
      if (!this.isDragging) return;

      if (this.draggingType === "horizontal") {
        this.wrapPosition();
        this.updateTransform();
        this.startAnimation();

        if (this.checkActive) {
          this.checkActiveItems();
        }
        if (e.target.hasPointerCapture(e.pointerId)) {
          e.target.releasePointerCapture(e.pointerId);
        }
      }
      this.isDragging = false;
      this.draggingType = null;
    }

    attachEvents() {
      // Обрабатываем события только на треке
      this.track.addEventListener("pointerdown", this.onPointerDown);
      this.track.addEventListener("pointermove", this.onPointerMove);
      this.track.addEventListener("pointerup", this.onPointerUp);
      this.track.addEventListener("pointercancel", this.onPointerUp);
      this.track.addEventListener("pointerleave", this.onPointerUp);

      this.track.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", (e) => {
          if (this.hasMoved) {
            e.preventDefault();
          }
        });
      });
    }

    checkActiveItems() {
      const now = performance.now();
      if (now - this.lastActiveCheckTime < this.ACTIVE_CHECK_THROTTLE) {
        return;
      }
      this.lastActiveCheckTime = now;

      const container = this.track.parentElement;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const items = this.track.querySelectorAll(".lc-features__item");
      let closestItem = null;
      let minDistance = Infinity;

      items.forEach(item => {
        const rect = item.getBoundingClientRect();
        const itemCenterX = rect.left + rect.width / 2;
        const itemCenterY = rect.top + rect.height / 2;
        const containerCenterX = containerRect.left + containerRect.width / 2;
        const containerCenterY = containerRect.top + containerRect.height / 2;
        const distance = Math.hypot(
            containerCenterX - itemCenterX,
            containerCenterY - itemCenterY
        );

        if (distance < minDistance) {
          minDistance = distance;
          closestItem = item;
        }
      });

      items.forEach(item => {
        item.classList.toggle("active", item === closestItem);
      });
    }

    updateDimensions() {
      const newTotalWidth = this.track.scrollWidth;
      // Обновляем размеры только если изменение значительное (более 10 пикселей)
      if (Math.abs(newTotalWidth - this.totalWidth) < 10) {
        return;
      }
      this.totalWidth = newTotalWidth;
      this.singleSetWidth = this.totalWidth / 2;
      // Вместо сброса trackPos сохраняем текущую позицию и корректируем её
      this.wrapPosition();
      this.updateTransform();
      if (this.checkActive) {
        this.checkActiveItems();
      }
    }
  }

  // Инициализация бесконечного слайдера
  new InfiniteSlider(track, {
    direction: -1,
    speed: SPEED_PX_PER_SEC,
    checkActive: true
  });
});
