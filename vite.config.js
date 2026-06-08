import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ఒకవేళ ఈ కింద ఉన్న ప్లగిన్ కాన్ఫిగరేషన్ లేకపోతే స్టైల్స్ లోడ్ అవ్వవు
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  }
})
