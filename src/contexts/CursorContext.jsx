import { createContext, useContext, useState } from 'react'

const CursorContext = createContext({
  serviceVideo: null,
  setServiceVideo: () => {},
})

export function CursorProvider({ children }) {
  const [serviceVideo, setServiceVideo] = useState(null) // null | string URL

  return (
    <CursorContext.Provider value={{ serviceVideo, setServiceVideo }}>
      {children}
    </CursorContext.Provider>
  )
}

export function useCursor() {
  return useContext(CursorContext)
}
