import React from 'react'

import styled from 'styled-components'
import { Header, Icon } from 'semantic-ui-react'

import ButtonColoredOnHover from './common/ButtonColoredOnHover'

import { Query } from 'react-apollo'
import { meLocal } from '../graphql/user'

const MenuDiv = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid #7e7e81;
`

const MenuHeader = styled(Header)`
    margin: 0 !important;
    padding: 0 1rem !important;
    cursor: default;
`

const MenuButton = styled(ButtonColoredOnHover)`
    && {
        margin: .25rem 0 .25rem 0.5rem;
        padding: .5rem 1rem;
    }
`

const LoadButton = MenuButton.extend`
    ${props => props.increaserightpadding && `
        padding-right: calc(14px + 9.125px) !important;
    `}
`

const UserName = styled(Header)`
    margin: 0 0 0 auto !important;
    padding: 0 1rem !important;
    cursor: default;
`

const EnquiriesMenu = ({ refetchEnquiries, enquiriesAreLoading, addNewEnquiry, newEnquiryButtonActive, refreshToken }) => {
    return (
        <MenuDiv>
            <MenuHeader content='Заявки и заказы' size='medium' />
            <LoadButton coloronhover='blue' circular onClick={refetchEnquiries} increaserightpadding={enquiriesAreLoading ? 1: 0}>
                <Icon name='refresh' loading={enquiriesAreLoading} color={enquiriesAreLoading ? 'blue' : undefined} />
                {enquiriesAreLoading ? 'Загрузка' : 'Обновить'}
            </LoadButton>
            <MenuButton coloronhover='green' circular icon='plus' content=' Заявка'
                onClick={addNewEnquiry} active={newEnquiryButtonActive} />
            <Query query={meLocal}>
                { ({ data }) => {
                    if (data && data.me) {
                        const { fName, lName } = data.me.person
                        const menuNameTitle = fName + ' ' + (lName ? `${lName.slice(0,1)}.` : '')
                        return (
                            // <MenuHeader content={fName + ' ' + (lName ? (lName.slice(0,1) + '.') : '')} size='small' />
                            <UserName content={menuNameTitle} size='small' />
                    )} else return null
                }}
            </Query>
            {/* <MenuButton circular icon='log out' /> */}
            <Icon name='log out' size='large' link onClick={() => refreshToken(null)} />
        </MenuDiv>
    )
}

export default EnquiriesMenu
