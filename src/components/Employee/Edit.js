import React, { Component } from 'react'

import DetailsHeader from '../DetailsOld/DetailsHeader'
import EmployeeForm from './Form'
import { Div } from '../styled/styled-semantic'

export default class EmployeeEdit extends Component {
  render() {
    const { 
      emp,
      orgId,
      toggleEditMode,
      refetchQueries
    } = this.props
    return <>
      <DetailsHeader
        title={
          emp
          ? 'Редактировать'
          : 'Добавить представителя'
        }
        size='small'
        noIndent
        bottomBorder='dark'
        buttons={<>
          {/* <Icon
            link
            name='save'
            color='blue'
            onClick={(emp) => console.log('upsert emp -> ', emp)}
          /> */}
        </>}
      />
      <Div
        p='1em'
        oy='auto'
        h='315px'
      >
        <EmployeeForm
          emp={emp}
          orgId={orgId}
          toggleEditMode={toggleEditMode}
          refetchQueries={refetchQueries}
        />
      </Div>
    </>
  }
}
