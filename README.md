# Votación HEIS

Sistema de votación para los premios HEIS Global - Proyecto React con Vite

## 🚀 Instalación

```bash
npm install
```

## 💻 Desarrollo

```bash
npm run dev
```

## 📦 Build

```bash
npm run build
```

## 👀 Preview

```bash
npm run preview
```

## 🌐 GitHub Pages

Este proyecto está configurado para desplegarse en GitHub Pages usando la rama `gh-pages`.

### Configuración inicial (solo la primera vez):

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar variables de entorno:**
   Asegúrate de tener el archivo `.env` con:
   ```
   VITE_SUPABASE_URL=https://nvnfavozhnpzeuwhmgka.supabase.co
   VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_QB1TLnP-I2tb7FuNK_N6RQ_VJER1N4W
   ```

3. **Hacer el despliegue:**
   ```bash
   npm run deploy
   ```

4. **Configurar GitHub Pages:**
   - Ve a tu repositorio: https://github.com/Nestorcanpac/VotacionHEIS
   - Ve a **Settings** → **Pages**
   - En **Source**, selecciona **Deploy from a branch**
   - Selecciona la rama `gh-pages` y la carpeta `/ (root)`
   - Guarda los cambios

### Despliegue:

Cada vez que quieras actualizar el sitio:
```bash
npm run deploy
```

La aplicación estará disponible en:
**https://nestorcanpac.github.io/VotacionHEIS/**

