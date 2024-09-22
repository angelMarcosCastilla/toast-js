# Toast

Toast.js es una biblioteca ligera en VanillaJS para mostrar notificaciones rápidas (toasts) en tu aplicación. Este proyecto está en desarrollo y admite diferentes tipos de notificaciones, como mensajes de éxito, error, información, advertencia y por defecto.

# Uso

1.  Incluir los archivos en tu proyecto:

```html
<link rel="stylesheet" href="toast.css" />
<script src="toast.js"></script>
```

2.  Creamos una instancia de Toast:

```javascript
const toast = new Toast();
```

3.  Mostrar un Toast:

```javascript
toast.success("Este es un mensaje de éxito");
toast.error("Este es un mensaje de error");
toast.info("Este es un mensaje de información");
toast.warning("Este es un mensaje de advertencia");
```
