---
title: Positions
description: Positions
---

## Configuración

1. Para configurar la librería, se debe realizar al momento instanciarla la clase.

```js
const toast = new Toast({
  position: "top-left",
  maxShow: 2,
  time: 4000,
});
```

## Opciones de configuración

| Opciones | Tipo | Descripción | Valores |
| --- | --- | --- | --- |
| position | string | Posición de la notificación. | top-left, top-right, bottom-left, bottom-right |
| maxShow | number | Cantidad máxima de notificaciones que se mostrarán. | number |
| time | number | Tiempo de vida de la notificación, en milisegundos. | number |

