document.addEventListener("reactHydrated", () => {
  const track = document.querySelector("#cards_desk .lc-features__items");
  if (!track) return;

  const isMobile = window.matchMedia("(pointer: coarse)").matches;
  const SPEED_PX_PER_SEC = isMobile ? 60 : 40;

  // Функция debounce
  function debounce(func, wait) {
    let timeout;
    return function(...args) {
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
      this.trackPos = 0;
      this.animationId = null;
      this.lastTime = 0;

      // Порог для определения "реального" перетаскивания
      this.DRAG_THRESHOLD = 1;

      this.totalWidth = track.scrollWidth;
      this.singleSetWidth = this.totalWidth / 2;

      this.trackPos = direction > 0 ? -this.singleSetWidth : 0;

      this.updateTransform = this.updateTransform.bind(this);
      this.animate = this.animate.bind(this);
      this.onPointerDown = this.onPointerDown.bind(this);
      this.onPointerMove = this.onPointerMove.bind(this);
      this.onPointerUp = this.onPointerUp.bind(this);
      this.updateDimensions = this.updateDimensions.bind(this);

      this.init();
    }

    init() {
      this.updateTransform();
      this.startAnimation();
      this.attachEvents();

      // Для мобильных устройств используем debounced-версию updateDimensions
      if (isMobile) {
        const debouncedUpdate = debounce(this.updateDimensions, 200);
        window.addEventListener("resize", debouncedUpdate);
        window.addEventListener("orientationchange", debouncedUpdate);
      } else {
        window.addEventListener("resize", this.updateDimensions);
        window.addEventListener("orientationchange", this.updateDimensions);
      }
    }

    updateTransform() {
      this.track.style.transform = `translateX(${this.trackPos}px)`;
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
      this.startX = e.clientX;
      this.stopAnimation();
    }

    onPointerMove(e) {
      if (!this.isDragging) return;

      const x = e.clientX;
      const dx = x - this.startX;
      if (Math.abs(dx) > this.DRAG_THRESHOLD) {
        this.hasMoved = true;
      }
      this.startX = x;
      this.trackPos += dx;
      this.updateTransform();

      if (this.checkActive) {
        this.checkActiveItems();
      }
    }

    onPointerUp() {
      if (!this.isDragging) return;
      this.isDragging = false;
      this.wrapPosition();
      this.updateTransform();
      this.startAnimation();

      if (this.checkActive) {
        this.checkActiveItems();
      }
    }

    attachEvents() {
      this.track.addEventListener("pointerdown", this.onPointerDown);
      window.addEventListener("pointermove", this.onPointerMove);
      window.addEventListener("pointerup", this.onPointerUp);

      this.track.addEventListener("pointerleave", this.onPointerUp);
      this.track.addEventListener("pointercancel", this.onPointerUp);

      this.track.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", (e) => {
          if (this.hasMoved) {
            e.preventDefault();
          }
        });
      });
    }

    checkActiveItems() {
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
      // Обновляем размеры и позицию только если изменение значительное (более 10 пикселей)
      if (Math.abs(newTotalWidth - this.totalWidth) < 10) {
        return;
      }
      this.totalWidth = newTotalWidth;
      this.singleSetWidth = this.totalWidth / 2;
      // Вместо сброса trackPos полностью корректируем позицию
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
