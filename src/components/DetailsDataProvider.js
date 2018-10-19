import { compose, graphql } from 'react-apollo'

import { enquiryDetails, enquiryLocal } from '../graphql/enquiry'
import { orderDetails, orderLocal } from '../graphql/order'

const DetailsDataProvider = ({
  children,
  type,
  query1,
  query2,
  localQuery1,
  localQuery2,
}) => {
  const query = query1 || query2
  const { loading, error, refetch } = query
  const entity =
    type === 'Enquiry' ? query.enquiry :
    type === 'Order' ? query.order
    : null
  const localQuery = localQuery1 || localQuery2
  const localEntity =
    type === 'Enquiry' ? localQuery.enquiryLocal :
    type === 'Order' ? localQuery.orderLocal
    : null
  return children({
    loading,
    error,
    refetch,
    entity,
    localEntity
  })
}

export default compose(
  graphql(enquiryDetails, {
    name: 'query1',
    skip: ({ type }) => type !== 'Enquiry'
  }),
  graphql(orderDetails, {
    name: 'query2',
    skip: ({ type }) => type !== 'Order'
  }),
  graphql(enquiryLocal, {
    name: 'localQuery1',
    skip: ({ type }) => type !== 'Enquiry',
    // options: props => ({
    //   variables: { id: props.id }
    // })
  }),
  graphql(orderLocal, {
    name: 'localQuery2',
    skip: ({ type }) => type !== 'Order',
    // options: props => ({
    //   variables: { id: props.id }
    // })
  }),
)(DetailsDataProvider)