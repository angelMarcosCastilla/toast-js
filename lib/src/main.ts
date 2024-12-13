import { Toast } from "./Toast";

const toast = new Toast({
  position: "top-center",
  maxShow: 4,
  time: 6000
});

document.querySelector(".success")?.addEventListener("click", () => {
  toast.success({
    title: "Success 🔥",
    description: "Este es un mensaje de éxito",
  });
});

document.querySelector(".warning")?.addEventListener("click", () => {
  toast.warning({
    title: "Warning",
    description: "Este es un mensaje de éxito",
  });
});

document.querySelector(".error")?.addEventListener("click", () => {
  toast.error({
    title: "Error",
    description: "Este es un mensaje de éxito",
  });
});

document.querySelector(".info")?.addEventListener("click", () => {
  toast.info({
    title: "Info",
    description: "Este es un mensaje de éxito",
  });
 
});




/* document.querySelector("button")?.addEventListener("click", () => {
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
 */