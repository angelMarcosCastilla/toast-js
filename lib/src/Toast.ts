import { Error, Info, Success, Warning } from "./icons";

const prefix = "an";
const POSITIONS = {
  "top-left": "top-left",
  "top-right": "top-right",
  "bottom-left": "bottom-left",
  "bottom-right": "bottom-right",
  "top-center": "top-center",
  "bottom-center": "bottom-center",
};

type Position = keyof typeof POSITIONS;

type Config = {
  position?: Position;
};
type Props = {
  title: string;
  description?: string;
};

interface IRenderToast extends Props {
  icon: string;
  type: "success" | "warning" | "error" | "info";
}

export class Toast {
  $container: HTMLDivElement | null = null;
  position: Position = POSITIONS["bottom-center"] as Position;

  constructor(config: Config) {
    if(config.position) {
      this.position = config.position;
    }
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

    $toast.className = `${prefix}-toast-card`;
    $toast.setAttribute("data-position", this.position);
    $toast.setAttribute("data-variant", option.type);
    $title.textContent = option.title;
    $title.className = `title`;
    $containerInfo.appendChild($title);

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
    this.$container?.appendChild($toast);

    setTimeout(() => {
      this.autoClose($toast)
    }, 3000);
  }

  autoClose($toast: HTMLDivElement) {
    $toast.classList.add("exit-left");

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
