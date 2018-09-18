// import { Link } from "react-router-dom"
import React, { Component } from 'react'
// import { Auth } from "aws-amplify"
import styled from 'styled-components'
import { Menu, Icon } from 'semantic-ui-react'

const MenuSt = styled(Menu) `
	&& {
		margin-bottom: 0;
		border-radius: 0;
	}
`
const IconSt = styled(Icon) `
	margin-right: 5px !important;
`

export default class NavBar extends Component {
  newEnquiry = () => console.log('ye')
  render() {
    // const { user } = this.props
    return (
      <MenuSt icon inverted className='komz-navbar' size='small'>
        {/* <Menu.Menu>
          <Menu.Item name='день' as={Link} to='/day' />
          <Menu.Item name='месяц' as={Link} to='/month' />
          <Menu.Item name='продукция' as={Link} to='/prods' />
        </Menu.Menu> */}
        <Menu.Menu position='right'>
          <Menu.Item name='Заявка' onClick={this.newEnquiry}>
            <IconSt name='plus' />
						Заявка
          </Menu.Item>
          {/* <Menu.Item name={user.name} />
          <Menu.Item name='sign out' onClick={this.signOut}>
            <Icon name='sign out' />
          </Menu.Item> */}
        </Menu.Menu>
      </MenuSt>
    )
  }
}
