import React, { Fragment } from 'react'
import styled from 'styled-components'

import Tel from './Tel'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: .67857143rem;
`

const Label = styled.div`
  flex: 0 0 122px;
  color: rgba(0,0,0,.87);
  line-height: 1.21428571rem;
  padding-top: .67857143rem;
  vertical-align: top;
`

const Content = styled.div`
  flex: 1 1 auto;
  min-width: 210px;
  font-size: calc(15rem/14);
  font-weight: bold;
  line-height: 1.21428571rem;
  padding-top: .67857143rem;
`

export default ({
  type,
  label,
  content
}) => {
  const component = data =>
    type === 'string' ? data :
    type === 'tel' ? <Tel tel={data} />
    : null
  return (
    <Container>
      <Label>
        {label}
      </Label>
      <Content>
        {Array.isArray(content)
          ? content.map((item, i) => 
              <Fragment key={i}>
                {component(item)}
              </Fragment>
            )
          : component(content)
        }
      </Content>
    </Container>
  )
}
