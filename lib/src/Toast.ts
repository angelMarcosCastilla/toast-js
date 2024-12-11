import { EXIT_AMIMATION, POSITIONS, prefix } from "./constants";
import { closeIcon, Error, Info, Success, Warning } from "./icons";
import { Config, IRenderToast, Position, Props } from "./type";

export class Toast {
  $container: HTMLDivElement | null = null;
  position: Position = POSITIONS["bottom-center"] as Position;
  maxShow = 3;
  constructor(config: Config) {
    if (config.position) {
      this.position = config.position;
    }
    this.maxShow = config.maxShow || 3;
    this.$container = this.createContainer();
  }

  generateId(): string {
    return crypto.randomUUID();
  }

  createContainer(): HTMLDivElement {
    const container = document.createElement("div");
    container.className = `${prefix}-toast-container`;
    container.setAttribute("role", "alert");
    container.setAttribute("aria-live", "polite");
    container.setAttribute("data-position", this.position);

    document.body.appendChild(container);
    return container;
  }

  renderToast(option: IRenderToast) {
    const $toast = document.createElement("div");
    const $title = document.createElement("p");
    const $containerInfo = document.createElement("div");
    const $btnClose = document.createElement("button");

    $btnClose.innerHTML = closeIcon;
    $btnClose.className = "close-btn";
    $toast.className = `${prefix}-toast-card`;
    $toast.setAttribute("data-position", this.position);
    $toast.setAttribute("data-variant", option.type);
    $title.textContent = option.title;
    $title.className = `title`;
    $containerInfo.appendChild($title);
    $containerInfo.classList.add("container-info");

    if (option.description) {
      const $description = document.createElement("p");
      $description.textContent = option.description;
      $description.className = `description`;
      $containerInfo.appendChild($description);
    }

    if (option.icon) {
      const $icon = document.createElement("div");
      $icon.className = `${prefix}-toast-icon`;
      $icon.innerHTML = option.icon;
      $toast.appendChild($icon);
    }

    $toast.appendChild($containerInfo);
    $toast.appendChild($btnClose);

    this.$container?.appendChild($toast);

    const countCard = this.$container?.children.length || 0
    
    if (countCard > this.maxShow) {
      this.$container?.children[0].remove();
    }

    this.handleClose($toast);
    setTimeout(() => {
      this.autoClose($toast);
    }, 3000);
  }

  handleClose(toast: HTMLDivElement) {
    const $buttonClose = toast.querySelector(`.close-btn`);
    $buttonClose?.addEventListener("click", () => {
      this.autoClose(toast);
    });
  }

  autoClose($toast: HTMLDivElement) {
    const currentPosition = $toast.getAttribute("data-position");

    const animationExit = EXIT_AMIMATION[currentPosition as Position];
    $toast.classList.add(animationExit);

    $toast.addEventListener("animationend", () => {
      $toast?.remove();
    });
  }
  success(options: Props) {
    this.renderToast({
      ...options,
      icon: Success,
      type: "success",
    });
  }

  error(options: Props) {
    this.renderToast({
      ...options,
      icon: Error,
      type: "error",
    });
  }
  info(options: Props) {
    this.renderToast({
      ...options,
      icon: Info,
      type: "info",
    });
  }
  warning(options: Props) {
    this.renderToast({
      ...options,
      icon: Warning,
      type: "warning",
    });
  }
}
