export const startServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const registerRequest = async () => {
        try {
          const res = await navigator.serviceWorker.register(
            './service-worker.ts',
            { scope: '/' }
          )
          console.log(res)
        } catch (error) {
          console.error('ServiceWorker registration failed: ', error)
        }
      }

      registerRequest()
    })
  }
}
