import React from 'react'

export const DealsContext = React.createContext()

export const DealsContextProvider = ({
  children,
  opTypes
}) => {
  return (
    <DealsContext.Provider
      value={{
        opTypes
      }}
    >
      {children}
    </DealsContext.Provider>
  )
}

// export const BatchContext = React.createContext()

// export const BatchContextProvider = ({
//   children,
//   dealId,
//   batchId
// }) => {
//   return (
//     <BatchContext.Provider
//       value={{
//         dealId,
//         batchId
//       }}
//     >
//       {children}
//     </BatchContext.Provider>
//   )
// }