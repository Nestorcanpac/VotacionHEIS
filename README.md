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

Este proyecto está configurado para desplegarse automáticamente en GitHub Pages.

### Configuración inicial (solo la primera vez):

1. Ve a tu repositorio en GitHub: https://github.com/Nestorcanpac/VotacionHEIS
2. Ve a **Settings** → **Pages**
3. En **Source**, selecciona **GitHub Actions**
4. Guarda los cambios

### Despliegue automático:

Una vez configurado, cada vez que hagas push a la rama `main`, el proyecto se desplegará automáticamente.

La aplicación estará disponible en:
**https://nestorcanpac.github.io/VotacionHEIS/**

### Nota importante:

Asegúrate de que el archivo `.env` con las variables de entorno de Supabase **NO** se suba al repositorio (ya está en `.gitignore`). Para GitHub Pages, necesitarás configurar las variables de entorno como secrets del repositorio o usar otro método para las variables de entorno en producción.

