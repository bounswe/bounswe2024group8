import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const loadEnvironmentVariables = (mode: string) => {
  const env = loadEnv(mode, `${process.cwd()}`, '')
  return {
      API_URL: env.VITE_API_URL
  }
}

export default defineConfig(({ mode }) => {
  const { API_URL } = loadEnvironmentVariables(mode);

  return {
    define: {
      VITE_API_URL: JSON.stringify(API_URL),
    },
    plugins: [react()],
  };
});
