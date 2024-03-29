import { useEffect, useRef, useState } from "react"

export const useInput = <T>(initVal: T) => {
  const [values, setValues] = useState<T>(initVal)

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    setValues((prevVals) => ({
      ...prevVals,
      [name]: value
    }))
  }

  const reset = () => setValues(initVal)

  return { values, handleChange, setValues, reset }
}

export const useMounted = () => {
  const isMountedRef = useRef(false)

  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])

  return isMountedRef
}
