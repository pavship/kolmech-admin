import { compose, graphql } from 'react-apollo'
import { prodsLocal } from '../../graphql/prod'

const ProdContext = ({
	children,
	prodsLocal: { prodsLocal }
}) => {
  return children({
		prodsLocal: prodsLocal || [],
	})
}

export default compose(
	graphql(prodsLocal, { name: 'prodsLocal' }),
)(ProdContext)
