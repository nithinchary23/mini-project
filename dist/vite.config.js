import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
// Get the directory name using ES module compatible approach
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            // Resolve '@' to the 'src' directory
            '@': path.resolve(__dirname, './src'),
        },
    },
});
