import { useEffect } from 'react'
import { toast } from 'react-toastify'

const useToast = (message?: string) => {
  useEffect(() => {
    message &&
      toast.error(message, {
        toastId: message,
      })
  }, [message])
}

export default useToast
