import { useState, useEffect, useRef } from 'react'

const useDropdown = (initialIsVisible) => {
  const [isOpen, setIsOpen] = useState(initialIsVisible)
  const ref = useRef(null)

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  })

  return { ref, isOpen, setIsOpen }
}

export default useDropdown
