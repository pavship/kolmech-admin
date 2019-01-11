import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  height: calc(100vh - 36px) !important;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Main = styled.div`
  flex: 1 0 50px;
  min-height: 50px;
  overflow-y: auto;
  overflow-x: hidden;
`

const Panel = styled.div`
  flex: 0 0 0;
  min-height: 387px;
  background: #fff;
  z-index: 10;
  /* box-shadow: 0 0 20px rgba(34,36,38,.15); shadow of semantic-ui Sidebar*/
  box-shadow: 0 0 20px 5px #fff;
  transition: min-height .4s ease-out;
  ${props => !props.panelVisible && `
    min-height: 0;
  `}
`

export default class PanelPusher extends Component {
  render() {
    const {
      children,
      panel,
      panelVisible,
      panelRendered
    } = this.props
    return (
      <Container>
        <Main
          panelVisible={panelVisible}
        >
          {children}
        </Main>
        <Panel
          panelVisible={panelVisible}
        >
          { panelRendered &&
            panel
          }
        </Panel>
      </Container>
    )
  }
}
