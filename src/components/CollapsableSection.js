import React, { Component } from 'react'

import styled from 'styled-components'
import { Section } from './styled-semantic/styled-semantic'

import DetailsHeader from './DetailsHeader'

const OuterSection = styled(Section)`
  &&&& { 
    padding: 0;
    ${props => props.expanded && `{
      margin-top: -1px;
      border-bottom-color: rgba(34, 36, 38, 0.15);
    }`}
  }
`

class CollapsableSection extends Component {
  state = {
    expanded: false
  }
  handleHeaderClick = () => {
    if (!this.props.forceExpanded)
      this.setState({ expanded: !this.state.expanded })
  }
  render() {
    const { children, forceExpanded, ...headerProps } = this.props
    const expanded = this.state.expanded || forceExpanded
    return (
      <OuterSection
        expanded={expanded ? 1 : 0}
        topBorder={expanded}
        bottomBorder={expanded}
      >
        <DetailsHeader
          {...headerProps}
          expanded={expanded}
          disabled={forceExpanded}
          titleSize='small'
          onClick={this.handleHeaderClick}
        />
          {expanded &&
            <Section>
              {children}
            </Section>
          }
      </OuterSection>
    )
  }
}

export default CollapsableSection
