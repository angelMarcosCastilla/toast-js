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

  #icons = {
    "success": `<svg  height="16" stroke-linejoin="round" viewBox="0 0 16 16" width="16" style="color: currentcolor;"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.5607 3.99999L15.0303 4.53032L6.23744 13.3232C5.55403 14.0066 4.44599 14.0066 3.76257 13.3232L4.2929 12.7929L3.76257 13.3232L0.969676 10.5303L0.439346 9.99999L1.50001 8.93933L2.03034 9.46966L4.82323 12.2626C4.92086 12.3602 5.07915 12.3602 5.17678 12.2626L13.9697 3.46966L14.5 2.93933L15.5607 3.99999Z" fill="currentColor"></path></svg>`,
    "error": `<svg  height="16" stroke-linejoin="round" viewBox="0 0 16 16" width="16" style="color: currentcolor;"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM5.5 11.5607L6.03033 11.0303L8 9.06066L9.96967 11.0303L10.5 11.5607L11.5607 10.5L11.0303 9.96967L9.06066 8L11.0303 6.03033L11.5607 5.5L10.5 4.43934L9.96967 4.96967L8 6.93934L6.03033 4.96967L5.5 4.43934L4.43934 5.5L4.96967 6.03033L6.93934 8L4.96967 9.96967L4.43934 10.5L5.5 11.5607Z" fill="currentColor"></path></svg>`,
    "info": `<svg  height="16" stroke-linejoin="round" viewBox="0 0 16 16" width="16" style="color: currentcolor;"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5ZM8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM6.25 7H7H7.74999C8.30227 7 8.74999 7.44772 8.74999 8V11.5V12.25H7.24999V11.5V8.5H7H6.25V7ZM8 6C8.55229 6 9 5.55228 9 5C9 4.44772 8.55229 4 8 4C7.44772 4 7 4.44772 7 5C7 5.55228 7.44772 6 8 6Z" fill="currentColor"></path></svg>`,
    "warning": `<svg  height="16" stroke-linejoin="round" viewBox="0 0 16 16" width="16" style="color: currentcolor;"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.55846 2H7.44148L1.88975 13.5H14.1102L8.55846 2ZM9.90929 1.34788C9.65902 0.829456 9.13413 0.5 8.55846 0.5H7.44148C6.86581 0.5 6.34092 0.829454 6.09065 1.34787L0.192608 13.5653C-0.127943 14.2293 0.355835 15 1.09316 15H14.9068C15.6441 15 16.1279 14.2293 15.8073 13.5653L9.90929 1.34788ZM8.74997 4.75V5.5V8V8.75H7.24997V8V5.5V4.75H8.74997ZM7.99997 12C8.55226 12 8.99997 11.5523 8.99997 11C8.99997 10.4477 8.55226 10 7.99997 10C7.44769 10 6.99997 10.4477 6.99997 11C6.99997 11.5523 7.44769 12 7.99997 12Z" fill="currentColor"></path></svg>`,
  }
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
        ${this.#icons[type] || this.#icons.info}
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

    this.visbleMaxToasts();

    return toast;
  }

  removeToast(toastId) {
    let index = this.toasts.indexOf(toastId);
    if (index !== -1) {
      const $toast = document.querySelector(`[data-toast-id="${toastId}"]`);
      $toast.style.opacity = 0;
      $toast.style.scale = 0.5;
      this.toasts.splice(index, 1);
      setTimeout(() => {
        $toast.remove();
        this.#reposition();
        this.visbleMaxToasts();
      }, 50);
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

  visbleMaxToasts() {
    if (this.toasts.length > this.options.maxToasts) {
      let $$toasts = document.querySelectorAll(".toast");
      $$toasts = [...$$toasts].reverse();
      $$toasts.forEach(($toast, index) => {
        const isVisible = index < this.options.maxToasts;
        $toast.style.opacity = isVisible ? 1 : 0;
        $toast.style.pointerEvents = isVisible ? "auto" : "none";
      });
    }
  }
}
