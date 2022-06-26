import { useCallback, useRef } from 'react';

export default function useDebounce(cb, ms){
  const lastChange = useRef(Date.now())
  const caller = useCallback(() => {
    const now = Date.now()
    lastChange.current = now
    if(Date.now() - now > ms){
      cb()
    }    
  }, [])
  return caller
}