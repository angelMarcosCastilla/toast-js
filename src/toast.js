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
    if (this.toasts.length >= this.options.maxToasts ) {
      this.removeToast(this.toasts[0]);
      this.toasts.shift();
    }

    const toast = document.createElement("div");
    toast.dataset.variant = type;
    toast.className = `toast`;
    toast.innerHTML = `
      <div class="toast-content">
        ${message}
      </div>
    `;

    this.container.appendChild(toast);
    this.toasts.push(toast);

    setTimeout(() => {
      this.removeToast(toast);
    }, this.options.duration);

    return toast;
  }

  removeToast($toast) {
    $toast.remove();
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
