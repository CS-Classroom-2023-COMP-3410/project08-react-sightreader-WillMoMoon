import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Use '@' for cleaner imports
      '@css': path.resolve(__dirname, 'src/assets/css') // Alias for CSS files
    }
  },
  server: {
    port: 3000, // Set development server port
    open: true  // Automatically open browser on startup
  },
  optimizeDeps: {
    include: ['abcjs', 'pitchfinder'], // Ensure these libraries are pre-bundled by Vite
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      external: [
        '/js/ext/jquery-3.3.1.min.js',
        '/js/ext/js.cookie.min.js',
        '/js/ext/volume-meter.js',
        '/js/ext/pitchdetector.js',
        '/js/ext/abcjs_midi_6.0.0-beta.25-min.js',
        '/js/ext/bootstrap.min.js'
      ]
    }
  }
});
