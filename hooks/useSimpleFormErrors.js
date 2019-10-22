import { useState, useEffect } from 'react'

const useFormError = (isSending, isValidating, formErrors, apiErrors) => {
  let errorsArray = Object.values(formErrors)

  if (apiErrors.length > 0) {
    errorsArray = [
      ...errorsArray,
      ...apiErrors
    ]
  }

  const [withErrors, setWithErrors] = useState(false)
  
  useEffect(() => {
    if ((errorsArray.length > 0  && !isSending && !isValidating)) {
      setWithErrors(true)
    } else if (withErrors) {
      setWithErrors(false)
    }
  }, [isValidating, isSending])

  return [
    withErrors,
    setWithErrors,
    errorsArray
  ]
}

export default useFormError