import { graphql } from 'react-apollo'
import * as compose from 'lodash.flowright'

import { enquiryDetails, enquiryLocal } from '../../graphql/enquiry'
import { orderDetails, orderLocal } from '../../graphql/order'
import { modelDetails, modelLocal } from '../../graphql/model'

const DetailsDataProvider = ({
  children,
  type,
  id,
  query1,
  query2,
  query3,
  localQuery1,
  localQuery2,
  localQuery3,
}) => {
  const query = query1 || query2 || query3
  const { loading, error, refetch } = query
  const entity =
    type === 'Enquiry' ? query.enquiry :
    type === 'Order' ? query.order :
    type === 'Model' ? query.model
    : null
  const localQuery = localQuery1 || localQuery2 || localQuery3
  const localEntity =
    id === 'new' ? null :
    type === 'Enquiry' ? localQuery.enquiryLocal :
    type === 'Order' ? localQuery.orderLocal :
    type === 'Model' ? localQuery.modelLocal
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
  graphql(modelDetails, {
    name: 'query3',
    skip: ({ type }) => type !== 'Model'
  }),
  graphql(enquiryLocal, {
    name: 'localQuery1',
    skip: ({ type, id }) => type !== 'Enquiry' || id === 'new',
  }),
  graphql(orderLocal, {
    name: 'localQuery2',
    skip: ({ type, id }) => type !== 'Order' || id === 'new',
  }),
  graphql(modelLocal, {
    name: 'localQuery3',
    skip: ({ type, id }) => type !== 'Model' || id === 'new',
  }),
)(DetailsDataProvider)