import React from 'react'

import { Div, Icon } from '../styled/styled-semantic'
import DetailsHeader from '../DetailsHeader'
import List from '../list/List'
import { listSchema } from '../../schema/employee'

export default ({
  emp,
  toggleEditMode
}) => {
  return <>
    <DetailsHeader
      title={emp.person.fullname}
      size='small'
      noIndent
      bottomBorder='dark'
      buttons={<>
        <Icon
          link
          name='edit'
          activeColor='blue'
          onClick={toggleEditMode}
        />
      </>}
    />
    <Div
      p='1em'
    >
      <List
        entity={emp}
        schema={listSchema}
      />
    </Div>
  </>
}
