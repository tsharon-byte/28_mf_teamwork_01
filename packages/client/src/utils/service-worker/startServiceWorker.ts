export const startServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const registerRequest = async () => {
        try {
          await navigator.serviceWorker.register('./service-worker.ts', {
            scope: '/',
          })
        } catch (error) {
          console.error('ServiceWorker registration failed: ', error)
        }
      }

      registerRequest()
    })
  }
}
