import React from 'react'

import { Link } from 'react-router-dom'

import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'
import { Header } from './styled/styled-semantic'

import { Query } from 'react-apollo'
import { meLocal } from '../graphql/user'

const Container = styled.div`
  height: 36px;
	display: flex;
	align-items: center;
	border-bottom: 1px solid #7e7e81;
  background: white;
`

export default ({
  children,
  title,
  titleLinkTo,
	refreshToken
}) => {
	return (
    <Container>
      <Link
        to={titleLinkTo || ''}
        onClick={titleLinkTo
          ? undefined
          : e => e.preventDefault()
        }
      >
        <Header inline
          size='medium'
          content={title}
        />
      </Link>
      {children}
      <Query query={meLocal}>
        { ({ data }) => {
          if (data && data.me) {
            const { fName, lName } = data.me.person
            const menuNameTitle = fName + ' ' + (lName ? `${lName.slice(0,1)}.` : '')
            return (
              <Header inline
                ml='auto'
                size='small'
                content={menuNameTitle} 
              />
          )} else return null
        }}
      </Query>
      <Icon link
        name='log out'
        size='large'
        onClick={() => refreshToken(null)} 
      />
    </Container>
	)
}
