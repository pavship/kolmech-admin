import React from 'react'
import styled from 'styled-components'
import { Label as SLabel, Dropdown, Select } from 'semantic-ui-react'
import { Input } from '../styled/styled-semantic';

const priceForOptions = [
  { key: 'all', text: 'за все', value: 'all' },
  { key: 'one', text: 'за 1 шт.', value: 'one' },
]

const SInput = styled(Input)`
  &&&&&&& {
    display: inline-flex;
    width: 270px;
    >input {
      flex-shrink: 1;
      width: 100%;
    }
    >div[role=listbox] {
      flex: 0 0 auto;
      background-color: rgb(232, 232, 232);
      color: rgba(0,0,0,.6);
      font-weight: 700;
      border: 0 solid transparent;
      &.active {
        background-color: rgb(208, 208, 208);
        border-color: rgb(208, 208, 208);
        color: rgba(0,0,0,.95);
        >div.text {
          font-weight: 700;
        }
        >div.menu {
          box-shadow: 0 2px 3px 0 rgba(34,36,38,.15);
          border: 1px solid rgba(34,36,38,.15);
        }
      }
    }
  }
`

const Label = styled(SLabel)`
  &&& {
    font-weight: normal;
    word-spacing: .15rem;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right-width: 0;
  }
`

export default (props) => {
  return (
    <SInput
      {...props}
      labelPosition='right'
      action
    >
      <input />
      <Label basic>₽ с НДС</Label>
      <Dropdown
        selection
        compact
        tabIndex={-1}
        defaultValue='all'
        options={priceForOptions}
        // onChange={(e, { value }) => setField('period', { value })}
      />
    </SInput>
  )
}
