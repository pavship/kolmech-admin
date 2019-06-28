import React from 'react'
import { Mutation } from 'react-apollo'
import { highlightFolder } from '../../graphql/disk'

const DiskContext = React.createContext()
export default DiskContext

export const DiskProvider = ({
  children
}) => {
  return (
    <Mutation
      mutation={highlightFolder}
    >
      {(highlightFolder) =>
        <DiskContext.Provider
          value={{
            highlightFolder: ({ orgId, dealId }) => highlightFolder({
              variables: { orgId, dealId }
            })
          }}
        >
          {children}
        </DiskContext.Provider>
      }
    </Mutation>
  )
}