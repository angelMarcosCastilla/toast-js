class Toast {
  constructor(options = {}) {
    this.options = {
      position: "top-right",
      duration: 3000,
      maxToasts: 3,
      closeButton: true,
      ...options,
    };
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
    container.style.cssText = `
      position: fixed;
      z-index: 9999;
      ${this.options.position.includes("top") ? "top: 16px;" : "bottom: 16px;"}
      ${
        this.options.position.includes("right") ? "right: 16px;" : "left: 16px;"
      }
    `;
    document.body.appendChild(container);
    return container;
  }

  createToast(message, type = "default") {
    const toast = document.createElement("div");
    const currentToastId = this.generateId();
    toast.dataset.variant = type;
    toast.dataset.toastId = currentToastId;
    toast.className = `toast`;
    toast.innerHTML = `
      <div class="toast-content">
        ${message}
      </div>
    `;

    if (this.options.closeButton) {
      let closeButton = document.createElement("button");
      closeButton.className = "toast-close-button";
      closeButton.innerHTML = "❌";
      toast.appendChild(closeButton);
      closeButton.addEventListener(
        "click",
        () => {
          this.removeToast(currentToastId);
        },
        { once: true }
      );
    }

    this.container.appendChild(toast);
    this.toasts.push(currentToastId);
    let timer = setTimeout(() => {
      const hasId = this.toasts.includes(currentToastId);
      if (hasId) {
        this.removeToast(currentToastId);
      } else {
        clearTimeout(timer);
      }
    }, this.options.duration);
    if (this.toasts.length > this.options.maxToasts) {
      const id = this.toasts[0];
      this.removeToast(id);
    }

    return toast;
  }

  removeToast(toastId) {
    let index = this.toasts.indexOf(toastId);
    if (index !== -1) {
      const $toast = document.querySelector(`[data-toast-id="${toastId}"]`);
      $toast.remove();
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
}
