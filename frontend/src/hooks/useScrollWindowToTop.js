// Hook
import { useEffect } from 'react'

export const useScrollWindowToTop = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])
}
