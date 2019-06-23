import { useState } from 'react'

const useFileReader = (file) => {
  const [response, setResponse] = useState(undefined)

  const reader = new FileReader()

  reader.onloadend = () => {
    setResponse(reader.result)
  }

  reader.readAsDataURL(file)

  return response
}

export default useFileReader