---
title: Getting Started
description: Getting Started
---

## Instalación

1. Instala el paquete usando npm, yarn o pnpm.

```bash
# Using npm:
npm install an-toastjs

# Using pnpm:
pnpm add an-toastjs

# Using yarn:
yarn add an-toastjs
```

2. Uso

```js
import { Toast } from "an-toastjs";
const toast = new Toast();

toast.success({
  title: "Success",
  description: "This is a success message",
});
```

## Usando Import Module

```js
import { Toast } from "https://cdn.jsdelivr.net/npm/an-toastjs@1.0.2";
const toast = new Toast({ position: "top-right" });

toast.success({
  title: "Success",
  description: "This is a success message",
});
```
