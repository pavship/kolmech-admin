import { useEffect, useRef } from 'react'

const useRefMounted = RefObject => {
  const refMounted = useRef(false)

  useEffect(() => {
    refMounted.current = true

    return () => {
      refMounted.current = false
    }
  }, [])

  return refMounted
};

export default useRefMounted