# GridControl F1 Mobile (React Native)

App movil con Expo para Android conectada a la API del proyecto principal.

## Funcionalidades

- Login con roles (`user` / `admin`) contra API.
- Navegacion por tabs y stack.
- Catalogo de coches con detalle.
- Favoritos persistidos en `AsyncStorage`.
- Panel admin con:
  - `POST` crear coche
  - `PUT` editar coche
  - `PATCH` cambiar tipo
  - `DELETE` eliminar coche

## Arranque local

1. En la raiz web, levantar API:
```bash
npm run server
```

2. En `mobile/`, crear entorno:
```bash
cp .env.example .env
```

3. Instalar dependencias y arrancar Expo:
```bash
npm install
npm run android
```

Nota:
- Emulador Android usa `http://10.0.2.2:3000`.
- Dispositivo fisico: cambia `EXPO_PUBLIC_API_URL` por la IP local de tu PC, por ejemplo `http://192.168.1.10:3000`.

## Compilar para Android (APK/AAB)

1. Instalar EAS CLI:
```bash
npm i -g eas-cli
```

2. Login en Expo:
```bash
eas login
```

3. Configurar build:
```bash
eas build:configure
```

4. Generar APK de prueba:
```bash
eas build -p android --profile preview
```

5. Generar AAB (Play Store):
```bash
eas build -p android --profile production
```
