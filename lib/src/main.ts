import { Toast } from "./Toast";

const toast = new Toast({
  position: "bottom-left",
});

document.querySelector("button")?.addEventListener("click", () => {
  toast.success({
    title: "Success",
    description: "Este es un mensaje de éxito",
  });
  toast.warning({
    title: "Warning",
    description: "Este es un mensaje de éxito",
  });
  toast.error({
    title: "Error",
    description: "Este es un mensaje de éxito",
  });
  toast.info({
    title: "Info",
    description: "Este es un mensaje de éxito",
  });
});
