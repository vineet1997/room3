import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
    plugins: [react()],
    build: {
        target: 'es2020',
        cssMinify: 'esbuild',
        rollupOptions: {
            output: {
                manualChunks: {
                    // Pretext is dynamic-imported only on desktop within Section 2,
                    // so it lives in its own chunk by virtue of dynamic import.
                    react: ['react', 'react-dom'],
                },
            },
        },
    },
});
