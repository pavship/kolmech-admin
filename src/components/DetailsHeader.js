import React, { Fragment } from 'react'

import { graphql, compose, ApolloConsumer  } from 'react-apollo'
// import { getLayout, getLayoutOptions, setLayout } from '../graphql/layout'
// import GlobalContextConsumer from './special/GlobalContext'
import GlobalContext from './special/GlobalContext'

import { Header as SHeader, Icon } from 'semantic-ui-react'
import { Span, Header, CardSection } from './styled-semantic/styled-semantic'

const DetailsHeader = () => {
	return (
        <GlobalContext>
            {({ details, setDetails }) => {return (
                <CardSection head noIndent>
                    <Header m='0' >
                        <Icon link
                            name='cancel'
                            // onClick={() => setLayout({variables: { details: null }})}
                            // onClick={() => client.mutate({ mutation: setLayout, variables: { details: null }})}
                            onClick={() => setDetails(null)}
                        />
                        <SHeader.Content>Новый заказ
                            {/* { entity.id === 'new' 
                                ? 'Новый заказ'
                                : <Fragment>
                                    {`Заявка №${num}`}
                                    <Span ml='10px' fs='1rem' c='rgba(0,0,0,.6)' ws='0.5em' >
                                        {`от ${dateLocal}`}
                                    </Span>
                                </Fragment> } */}
                        </SHeader.Content>
                    </Header>
                </CardSection>
            )}}
        </GlobalContext>
	)
}

export default DetailsHeader
// export default compose(
//     graphql(setLayout, { name: 'setLayout' }),
//     graphql(getLayout, getLayoutOptions),
// )(DetailsHeader)
