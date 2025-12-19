import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY

if (!supabaseUrl) {
  throw new Error('VITE_SUPABASE_URL no está definida. Por favor, crea un archivo .env con las variables de entorno.')
}

if (!supabaseKey) {
  throw new Error('VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY no está definida. Por favor, crea un archivo .env con las variables de entorno.')
}

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase

