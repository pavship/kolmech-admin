import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import { mergeOrg } from '../../../graphql/org'
import { Input } from 'semantic-ui-react'
import { Div } from '../../styled/styled-semantic'

export default ({
  org
}) => {
  const [ val, setVal ] = useState('')
  return <>
    {/* <Mutation
      mutation={mergeOrg}
      variables={{ id }}
      onCompleted={() => {
        // refetchPersons()
        notify({
          type: 'success',
          title: 'ИНН присвоен'
        })
      }}
      onError={err => notify({
        type: 'error',
        title: 'Ошибка присвоения ИНН',
        content: err.message,
      })}
    >
      {( mergeOrg, { loading } ) =>
        <Div
          p='1em 1em 1em 55px'
        >
          <Input
            value={val}
            onChange={(e, { value }) => setVal(value)}
            placeholder='ИНН'
            onBlur={() => mergeOrg({ variables: { id, inn: val } })}
            loading={loading}
          />
        </Div>
      }
    </Mutation> */}
  </>
}