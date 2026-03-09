# GridControl F1

Aplicacion web desarrollada con React para gestionar un catalogo de coches de Formula 1 con autenticacion por roles, favoritos de usuario y panel de administracion con operaciones CRUD contra API.

## Descripcion del proyecto

El proyecto incluye:
- Rutas publicas y privadas con React Router.
- Login contra API (`json-server`) con roles `user` y `admin`.
- Apartado de usuario (perfil y favoritos).
- Apartado de administrador (crear, editar, parchear y eliminar coches).
- Diseno responsive para desktop y multiples breakpoints moviles.
- PWA instalable con Service Worker.

## Framework y librerias (versiones)

- `react` `^19.2.0`
- `react-dom` `^19.2.0`
- `react-router-dom` `^7.13.0`
- `tailwindcss` `^3.4.17`
- `framer-motion` `^12.34.1`
- `react-hook-form` `^7.71.1`
- `react-hot-toast` `^2.6.0`
- `json-server` `^1.0.0-beta.6`
- `vite-plugin-pwa` `^1.1.0`
- `vite` `7.2.5` (via `rolldown-vite`)

## Licencia de uso

Este proyecto se distribuye bajo licencia MIT.

## Guia de instalacion

1. Clonar el repositorio:
```bash
git clone <URL_DEL_REPO>
cd GridControlF1
```

2. Instalar dependencias:
```bash
npm install
```

3. Crear variables de entorno:
```bash
cp .env.example .env
```

4. Levantar API local:
```bash
npm run server
```

5. Levantar aplicacion web:
```bash
npm run dev
```

## Credenciales de prueba

- Usuario:
  - Email: `user@test.com`
  - Password: `1234`
- Admin:
  - Email: `admin@test.com`
  - Password: `1234`

## Scripts disponibles

- `npm run dev`: entorno de desarrollo.
- `npm run build`: build de produccion.
- `npm run preview`: previsualizacion del build.
- `npm run server`: API local con `json-server`.
- `npm run lint`: lint del proyecto.

## Despliegue en hosting estatico gratuito (GitHub Pages)

1. El repositorio incluye workflow automatico: [deploy-pages.yml](.github/workflows/deploy-pages.yml)
2. En GitHub activa `Settings > Pages > Source: GitHub Actions`.
3. Cada push a `main` compila y publica `dist/` automaticamente.

## Backend remoto para la demo publica

En local puedes usar `npm run server`, pero en GitHub Pages necesitas una API online:

1. Publica la API (Render/Railway/otro) usando el mismo `db.json`.
2. Configura en GitHub Actions el secreto/repositorio variable `VITE_API_URL` con tu URL (ej: `https://tu-api.onrender.com`).
3. La app usa `VITE_API_URL` y, si no existe, cae a `http://localhost:3000`.
