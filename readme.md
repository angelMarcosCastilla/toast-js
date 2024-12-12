# Toast notificación

![image](https://github.com/user-attachments/assets/9da89c24-4c9e-4d25-afcc-696ccca59292)

## instalación
Instale la librería con el siguiente comando:
```bash
npm i an-toastjs
```

## Uso
```js
import { Toast } from "an-toastjs";

const toast = new Toast({
  position: "top-center"
});

toast.success({
    title: "Success 🔥",
    description: "Este es un mensaje de éxito",
  });
```
