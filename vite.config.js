import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  build: {
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
          ui: ['@heroicons/vue', '@fortawesome/fontawesome-free'],
          charts: ['chart.js', 'd3'],
          utils: ['lodash-es', 'date-fns', 'uuid']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  esbuild: {
    supported: {
      'top-level-await': true,
    },
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      { find: '@dfinity/agent', replacement: fileURLToPath(new URL('./src/stubs/dfinity-agent.js', import.meta.url)) },
      { find: '@dfinity/principal', replacement: fileURLToPath(new URL('./src/stubs/dfinity-principal.js', import.meta.url)) },
      { find: '@dfinity/identity', replacement: fileURLToPath(new URL('./src/stubs/dfinity-identity.js', import.meta.url)) },
      { find: '@dfinity/auth-client', replacement: fileURLToPath(new URL('./src/stubs/dfinity-auth-client.js', import.meta.url)) },
      { find: '@dfinity/ledger-icp', replacement: fileURLToPath(new URL('./src/stubs/dfinity-ledger-icp.js', import.meta.url)) },
      { find: '@dfinity/ledger-icrc', replacement: fileURLToPath(new URL('./src/stubs/dfinity-ledger-icrc.js', import.meta.url)) },
      { find: '@dfinity/candid', replacement: fileURLToPath(new URL('./src/stubs/dfinity-candid.js', import.meta.url)) },
      { find: '@dfinity/nns', replacement: fileURLToPath(new URL('./src/stubs/dfinity-nns.js', import.meta.url)) },
      { find: '@solana/web3.js', replacement: fileURLToPath(new URL('./src/stubs/solana-web3.js', import.meta.url)) },
      { find: 'ethers', replacement: fileURLToPath(new URL('./src/stubs/ethers.js', import.meta.url)) },
      { find: 'bip39', replacement: fileURLToPath(new URL('./src/stubs/bip39.js', import.meta.url)) },
      { find: 'tweetnacl', replacement: fileURLToPath(new URL('./src/stubs/tweetnacl.js', import.meta.url)) },
      { find: 'jssha', replacement: fileURLToPath(new URL('./src/stubs/jssha.js', import.meta.url)) },
    ],
  }
});
