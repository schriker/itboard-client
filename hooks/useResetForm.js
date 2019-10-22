import { useEffect } from 'react'

const useResetForm = (resetForm, condition, isSending) => {
  useEffect(() => {
    if (condition) {
      resetForm()
    }
  }, [isSending])
}

export default useResetForm