import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0', // Bind to all network interfaces
    allowedHosts: ['127.0.0.1', '9zsp6-34455.csb.app'], // Allow only these hosts
    port: 34455, // Use a different port if 5173 is unavailable
  },
});