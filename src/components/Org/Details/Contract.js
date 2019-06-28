import React, { useState, useEffect } from 'react'
import { Mutation } from 'react-apollo'
import { createContract } from '../../../graphql/org'
import styled from 'styled-components'
import { animated, useTransition } from 'react-spring'
import CollapsableSection from '../../presentational/CollapsableSection'
import { Icon, Div } from '../../styled/styled-semantic'
import LeftIcon from '../../Details/Menu/LeftIcon'
import Field from '../../form/Field'
import { toLocalDateString } from '../../../utils/dates'

const MenuOverlay = styled(animated.div)`
  position: absolute;
  z-index: 10;
  top: 0;
  right: 0;
  left: 0;
  height: 48px;
  padding-right: 0.7em;
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
  const transitions = useTransition(createMode, null, {
    from: { opacity: 0 }, enter: { opacity: 1 }, leave: { opacity: 0 },
  })
  const [ date, setDate ] = useState(toLocalDateString(new Date()))
  return <>
    <Mutation
      mutation={createContract}
      onCompleted={res => {
        // console.log('res > ', res)
        notify({
          type: 'success',
          title: 'Договор добавлен'
        })
      }}
    >
      {( createContract, { loading } ) =>
        <CollapsableSection
          initiallyExpanded={initiallyExpanded}
          // title='Договор'
          title='Договор'
          overflowVisible
          buttons={<>
            <Icon link
              // circular
              activeColor='green'
              name='plus'
              onClick={e => {
                e.stopPropagation()
                setCreateMode(true)
                // notify({
                //   type: 'warning',
                //   content: 'Чтобы загрузить файлы, перетащите их в раздел',
                // })
              }}
              // loading={creating}
            />
          </>}
        >
          {transitions.map(({ item, key, props }) => 
            item && 
              <MenuOverlay
                key={key}
                style={props}
              >
                <LeftIcon
                  size='large'
                  name='check'
                  color='green'
                  onClick={async () =>
                    await createContract({ variables: { id: org.id, date } })
                    && setCreateMode(false)
                  }
                />
                <Div
                  fs='1.1em'
                  c='rgba(0,0,0,.75)'
                  fw='700'
                >
                  Создание договора
                </Div>
                <Icon link
                  name='cancel'
                  ml='auto'
                  size='large'
                  onClick={() => setCreateMode(false)}
                />
            </MenuOverlay>
          )}
            
          <Div
            p='1em 1em 1em 55px'
          >
            <Field
              label='Дата договора'
              type='date'
              value={date}
              onChange={date => setDate(date)}
            />
          </Div>
        </CollapsableSection>

      }
    </Mutation>
  </>
}