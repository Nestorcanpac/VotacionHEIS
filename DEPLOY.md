# Guía de Despliegue en GitHub Pages

## Configuración de Variables de Entorno

GitHub Pages no soporta variables de entorno directamente. Para que tu aplicación funcione, necesitas configurar las variables de Supabase de una de estas formas:

### Opción 1: Usar GitHub Secrets (Recomendado)

1. Ve a tu repositorio en GitHub: https://github.com/Nestorcanpac/VotacionHEIS
2. Ve a **Settings** → **Secrets and variables** → **Actions**
3. Haz clic en **New repository secret**
4. Agrega estos dos secrets:
   - **Name**: `VITE_SUPABASE_URL`
     **Value**: `https://nvnfavozhnpzeuwhmgka.supabase.co`
   - **Name**: `VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY`
     **Value**: `sb_publishable_QB1TLnP-I2tb7FuNK_N6RQ_VJER1N4W`

5. Actualiza el workflow `.github/workflows/deploy.yml` para usar estos secrets (ya está configurado)

### Opción 2: Modificar el workflow para inyectar variables

El workflow ya está configurado para usar secrets. Solo necesitas agregar los secrets en GitHub como se explica arriba.

## Pasos para Activar GitHub Pages

1. **Habilitar GitHub Pages:**
   - Ve a **Settings** → **Pages**
   - En **Source**, selecciona **GitHub Actions**
   - Guarda los cambios

2. **Hacer commit y push de los cambios:**
   ```bash
   git add .
   git commit -m "Configurar GitHub Pages"
   git push origin main
   ```

3. **Verificar el despliegue:**
   - Ve a la pestaña **Actions** en tu repositorio
   - Deberías ver un workflow ejecutándose
   - Cuando termine, tu sitio estará disponible en:
     **https://nestorcanpac.github.io/VotacionHEIS/**

## Solución de Problemas

- Si el build falla, revisa los logs en la pestaña **Actions**
- Asegúrate de que los secrets estén configurados correctamente
- Verifica que el archivo `.env` no esté en el repositorio (debe estar en `.gitignore`)

