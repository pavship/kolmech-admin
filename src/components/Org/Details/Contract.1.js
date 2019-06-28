import React, { useState, useEffect } from 'react'
// import { Mutation } from 'react-apollo'
// import { mergeOrg } from '../../../graphql/org'
// import { Input } from 'semantic-ui-react'
// import { Div } from '../../styled/styled-semantic'
import styled from 'styled-components'
import CollapsableSection from '../../presentational/CollapsableSection'
import { Icon } from '../../styled/styled-semantic'
import posed, { PoseGroup } from 'react-pose'
import LeftIcon from '../../Details/Menu/LeftIcon';

const MenuOverlay = styled(posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0 },
}))`
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
  const [ createMode, setCreateMode ] = useState(false)
  useEffect(() => undefined, [createMode])
  console.log('load, createMode > ', createMode)
  return <>
    
    <CollapsableSection
      initiallyExpanded={initiallyExpanded}
      // title='Договор'
      title={'Договор ' + createMode}
      buttons={<>
        <Icon link 
          // circular
          activeColor='green'
          name='plus'
          onClick={e => {
            e.stopPropagation()
            console.log('setCreateMode > ', setCreateMode) ||setCreateMode(true)
            notify({
              type: 'warning',
              content: 'Чтобы загрузить файлы, перетащите их в раздел',
            })
          }}
          // loading={creating}
        />
      </>}
    >
      <PoseGroup>
        {createMode && 
            // {/* <div><button onClick={() => setCreateMode(false)} >sdfsdf</button></div> */}
          <MenuOverlay key='1'>
            <LeftIcon
              size='large'
              name='cancel'
              onClick={() => console.log('setCreateMode > ', setCreateMode) || setCreateMode(_ => {console.log('false > ', false); return false})}
            />
            <Icon
              name='download'
              size='large'
              c='black'
              onClick={() => console.log('setCreateMode > ', setCreateMode) || setCreateMode(false)}
            />
          </MenuOverlay>
        }

      </PoseGroup>
      <div>ldskfjlkj</div>
    </CollapsableSection>
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