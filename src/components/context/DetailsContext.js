import React, { useState } from 'react'

const DetailsContext = React.createContext()
export default DetailsContext

export const DetailsProvider = ({
  children
}) => {
  [ details, setDetails ] = useState({})
  return (
    <DetailsContext.Provider
      value={{ details, setDetails }}
    >
      {children}
    </DetailsContext.Provider>
  )
}