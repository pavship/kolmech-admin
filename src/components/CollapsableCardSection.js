import React, { Component, Fragment } from 'react'

import styled from 'styled-components'
import { CardSection } from './styled-semantic/styled-semantic'

import DetailsHeader from './DetailsHeader'

const SCardSection = styled(CardSection)`
  &&&& { padding: 0; }
`
const BCardSection = styled(CardSection)`
  &&&& { padding: 0.5em 1em 1em 55px; }
`

class CollapsableCardSection extends Component {
  state = {
    expanded: false
  }
  render() {
    const { expanded } = this.state
    const { title, children } = this.props
    return (
        <SCardSection>
          <DetailsHeader
            expanded={expanded}
            title={title}
            onClick={() => this.setState({ expanded: !expanded})}
          />
            {expanded &&
              <BCardSection>
                {children}
              </BCardSection>
            }
        </SCardSection>
    )
  }
}

export default CollapsableCardSection
