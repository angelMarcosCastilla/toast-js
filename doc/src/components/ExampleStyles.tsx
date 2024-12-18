import { Button } from "@/components/ui/button";
import Styles from "@/components/ExampleStyle.module.css";
import { useEffect } from "react";

export default function ExampleStyles() {
  useEffect(() => {
    import("an-toastjs").then(({ Toast }) => {
      const $success = document.getElementById("theme-success");
      const $warning = document.getElementById("theme-warning");
      const $error = document.getElementById("theme-error");
      const $info = document.getElementById("theme-info");
      const toast = new Toast({
        position: "bottom-right",
        maxShow: 2,
      });

      $success?.addEventListener("click", () => {
        toast.success({
          title: "Success",
          description: "This is a success message",
        });
      });

      $warning?.addEventListener("click", () => {
        toast.warning({
          title: "Warning",
          description: "This is a warning message",
        });
      });

      $error?.addEventListener("click", () => {
        toast.error({
          title: "Error",
          description: "This is an error message",
        });
      });

      $info?.addEventListener("click", () => {
        toast.info({
          title: "Info",
          description: "This is an info message",
        });
      });
    });
  }, []);

  return (
    <div className={`flex space-x-2 ${Styles.theme}`}>
      <Button variant="outline" id="theme-success">
        Success
      </Button>
      <Button variant="outline" id="theme-warning">
        Warning
      </Button>
      <Button variant="outline" id="theme-error">
        Error
      </Button>
      <Button variant="outline" id="theme-info">
        Info
      </Button>
    </div>
  );
}
