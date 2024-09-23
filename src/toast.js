class Toast {
  toastHeight = {};
  gap = 12;

  #positionsValidate = [
    "top-right",
    "top-left",
    "bottom-right",
    "bottom-left",
    "top-center",
    "bottom-center",
  ];
  position = "top";

  constructor(options = {}) {
    this.options = {
      duration: 3000,
      maxToasts: 3,
      closeButton: true,
      ...options,
    };

    if (!this.#positionsValidate.includes(this.options.position)) {
      this.options.position = "top-right";
    }

    this.position = this.options.position.split("-")[0];
    this.container = this.createContainer();
    this.toasts = [];
  }

  generateId() {
    return crypto.randomUUID();
  }

  createContainer() {
    const container = document.createElement("div");
    container.className = "toast-container";
    container.setAttribute("role", "alert");
    container.setAttribute("aria-live", "polite");
    container.dataset.position = this.options.position;
    document.body.appendChild(container);
    return container;
  }

  createToast(message, type = "default") {
    const toast = document.createElement("div");
    const currentToastId = this.generateId();
    toast.dataset.variant = type;
    toast.dataset.toastId = currentToastId;
    toast.className = `toast`;
    toast.style.setProperty(
      "--translateY",
      this.position === "top" ? "-200%" : "200%"
    );
    toast.innerHTML = `
      <div class="toast-content">
        ${message}
      </div>
    `;

    if (this.options.closeButton) {
      let closeButton = document.createElement("button");
      closeButton.className = "toast-close-button";
      closeButton.innerHTML = `<svg height="12" stroke-linejoin="round" viewBox="0 0 16 16" width="12" style="color: currentcolor;"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.4697 13.5303L13 14.0607L14.0607 13L13.5303 12.4697L9.06065 7.99999L13.5303 3.53032L14.0607 2.99999L13 1.93933L12.4697 2.46966L7.99999 6.93933L3.53032 2.46966L2.99999 1.93933L1.93933 2.99999L2.46966 3.53032L6.93933 7.99999L2.46966 12.4697L1.93933 13L2.99999 14.0607L3.53032 13.5303L7.99999 9.06065L12.4697 13.5303Z" fill="currentColor"></path></svg>`;
      toast.appendChild(closeButton);

      closeButton.addEventListener("click", () => {
        this.removeToast(currentToastId);
      });
    }

    this.container.appendChild(toast);
    this.toasts.push(currentToastId);
    this.#calculateHeight(toast);
    this.#autoClose(currentToastId);

    this.#reposition();

    if (this.toasts.length > this.options.maxToasts) {
      const lastIndexToHidden = this.toasts.length - this.options.maxToasts;
      const $toastToHidden = this.toasts.slice(0, lastIndexToHidden);
      $toastToHidden.forEach((toastId) => {
        const $toast = document.querySelector(`[data-toast-id="${toastId}"]`);
        $toast.style.opacity = 0;
        $toast.style.pointerEvents = "none";
      });
    }

    return toast;
  }

  removeToast(toastId) {
    let index = this.toasts.indexOf(toastId);
    if (index !== -1) {
      const $toast = document.querySelector(`[data-toast-id="${toastId}"]`);
      $toast.style.opacity = 0;
      $toast.remove();

      if (this.toasts.length > this.options.maxToasts) {
        const lastIndexToHidden = this.toasts.length - this.options.maxToasts;
        const idToastToVissible = this.toasts[lastIndexToHidden - 1];
        const $toastToVissible = document.querySelector(
          `[data-toast-id="${idToastToVissible}"]`
        );
        $toastToVissible.style.opacity = 1;
        $toastToVissible.style.pointerEvents = "auto";
      }
      this.#reposition();
      this.toasts.splice(index, 1);
    }
  }

  success(message) {
    return this.createToast(message, "success");
  }

  error(message) {
    return this.createToast(message, "error");
  }

  info(message) {
    return this.createToast(message, "info");
  }

  warning(message) {
    return this.createToast(message, "warning");
  }

  default(message) {
    return this.createToast(message, "default");
  }

  #calculateHeight($toast) {
    const id = $toast.dataset.toastId;
    const height = $toast.offsetHeight;
    this.toastHeight[id] = height;
  }

  #autoClose(toastId) {
    let timer = setTimeout(() => {
      const hasId = this.toasts.includes(toastId);
      if (hasId) {
        this.removeToast(toastId);
      } else {
        clearTimeout(timer);
      }
    }, this.options.duration);
  }

  #reposition() {
    let toasts = document.querySelectorAll(".toast");
    toasts = [...toasts].reverse();
    let height = 0;

    if (this.position === "top") {
      toasts.forEach(($toast, index) => {
        if (index === 0) {
          $toast.style.setProperty("--translateY", `0`);
          $toast.style.opacity = 1;
          return;
        }

        height += this.toastHeight[$toast.dataset.toastId];

        const gap = this.gap * index;
        const translateY = height + gap;
        $toast.style.setProperty("--translateY", `${translateY}px`);
      });
      return;
    }

    toasts.forEach(($toast, index) => {
      if (index === 0) {
        $toast.style.opacity = 1;
      }
      height +=
        this.toastHeight[$toast.dataset.toastId] + (index === 0 ? 0 : this.gap);
      $toast.style.setProperty("--translateY", `-${height}px`);
    });
  }

  setPosition(position) {
    this.container.dataset.position = position;
    this.options.position = position;
    this.position = position.split("-")[0];
    this.#reposition();
  }
}
