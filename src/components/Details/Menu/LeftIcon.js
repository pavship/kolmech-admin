import React from 'react'
import { Div, Icon } from '../../styled/styled-semantic'
// import { Icon } from 'semantic-ui-react'

export default props =>
  <Div
    w='55px'
    ta='center'
  >
    <Icon
      link
      {...props}
    />
  </Div>