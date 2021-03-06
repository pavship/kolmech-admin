import React, { useState, useEffect } from 'react'

import styled from 'styled-components'
import { Section, Div } from '../styled/styled-semantic';

import DetailsHeader from '../DetailsOld/DetailsHeader'
import posed, { PoseGroup } from 'react-pose'

const OuterSection = styled(Section)`
  & {
    width: 100%;
    position: relative;
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

export default ({
  children,
  initiallyExpanded,
  disabled,
  forceExpanded,
  headerModes,
  mode,
  ...headerProps,
}) => {
  const [ expanded, expand ] = useState(!!initiallyExpanded
    || (!disabled && (forceExpanded || this.state.expanded)))
  useEffect(() => expand(!!initiallyExpanded
    || (!disabled && (forceExpanded || this.state.expanded))),
  [initiallyExpanded, disabled, forceExpanded])
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
          && (() => expand(!expanded))
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

