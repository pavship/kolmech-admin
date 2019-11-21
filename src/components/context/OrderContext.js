import { graphql } from 'react-apollo'
import * as compose from 'lodash.flowright'
import { orderLocal } from '../../graphql/order'

const OrderContext = ({
	children,
	orderLocal: { orderLocal }
}) => {
  return children({
		orderLocal: orderLocal || [],
	})
}

export default compose(
	graphql(orderLocal, { name: 'orderLocal' }),
)(OrderContext)
