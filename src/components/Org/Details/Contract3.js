import React, { useState, useEffect } from 'react'
// import { Mutation } from 'react-apollo'
// import { mergeOrg } from '../../../graphql/org'
// import { Input } from 'semantic-ui-react'
// import { Div } from '../../styled/styled-semantic'
import styled from 'styled-components'
import posed, { PoseGroup } from 'react-pose'
import { animated, useTransition } from 'react-spring'
import CollapsableSection from '../../presentational/CollapsableSection'
import { Icon, Div } from '../../styled/styled-semantic'
import LeftIcon from '../../Details/Menu/LeftIcon';
import Menu from '../../Details/Menu/Menu';

const Container = styled.div`
  width: 100%;
  position: relative;
  padding: 0;
  ${props => props.expanded && `{
    margin-top: -1px;
    border-bottom-color: rgba(34, 36, 38, 0.15);
  }`}
`

const MenuOverlay = styled(animated.div)`
  position: absolute;
  z-index: 10;
  top: 0;
  right: 0;
  left: 0;
  height: 48px;
  display: flex;
  align-items: center;
  background-color: rgba(255,255,255,1);
`

export default ({
  notify,
  org,
  initiallyExpanded
}) => {
  const [ mode, setMode ] = useState(true)
  // useEffect(() => undefined, [mode])
  const transitions = useTransition(mode, null, {
    from: { opacity: 0 }, enter: { opacity: 1 }, leave: { opacity: 0 },
  })
  return <>
    <Container>
      sdfsdf
    {transitions.map(({ mode, key, props }) => mode && <animated.div
            key={key}
            style={props}
          >
            <LeftIcon
              size='large'
              name='cancel'
              onClick={() => setMode(false)}
            />
            <Div
              fs='1.1em'
              c='rgba(0,0,0,.75)'
              fw='700'
            >
              Создание договора
            </Div>
            {/* <Icon
              name='download'
              size='large'
              c='black'
              onClick={() => setCreateMode(false)}
            /> */}
          </animated.div>
      )}
    </Container>
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