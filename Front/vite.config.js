import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Cambia el puerto si es necesario
    port: 5175,
    // Cambia el host a tu dirección deseada
    host: "localhost", // Cambia 'mihost.local' por tu dirección deseada
  },
});
