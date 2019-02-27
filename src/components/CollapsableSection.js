import React, { Component } from 'react'

import styled from 'styled-components'
import { Section, Div } from './styled/styled-semantic';

import DetailsHeader from './DetailsHeader'
import posed, { PoseGroup } from 'react-pose'

const OuterSection = styled(Section)`
  & {
    width: 100%;
    padding: 0;
    ${props => props.expanded && `{
      margin-top: -1px;
      border-bottom-color: rgba(34, 36, 38, 0.15);
    }`}
  }
`

const InnerSection = styled(posed(Section)({
  enter: { y: 0 },
  exit: { y: '-100%' },
}))`
  & {
    z-index: -1;
    width: 100%;
    padding: 0;
    margin-bottom: -1px;
  }
`

class CollapsableSection extends Component {
  state = {
    expanded: !!this.props.initiallyExpanded
  }
  expand = () => this.setState({ expanded: true })
  render() {
    const {

      children,
      disabled,
      forceExpanded,
      ...headerProps
    } = this.props
    const expanded = !disabled && (forceExpanded || this.state.expanded)
    return (
      <OuterSection
        expanded={expanded ? 1 : 0}
        topBorder={expanded}
        bottomBorder={expanded}
      >
        <DetailsHeader
          {...headerProps}
          expanded={expanded}
          bottomBorder={expanded && 'dark'}
          disabled={forceExpanded}
          titleSize='small'
          onClick={
            !forceExpanded
            && (() => this.setState({ expanded: !this.state.expanded }))
          }
        />
        <Div
          oy='hidden'
        >
          <PoseGroup>
            {expanded &&
              <InnerSection
                key={1}
              >
                {children}
              </InnerSection>
            }
          </PoseGroup>
        </Div>
      </OuterSection>
    )
  }
}

export default CollapsableSection
