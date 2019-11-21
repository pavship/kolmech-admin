import { graphql } from 'react-apollo'
import * as compose from 'lodash.flowright'
import { getLayout, getLayoutOptions, setLayout, setExpanded } from '../../graphql/layout'
import { getLists, getListsOptions, setList } from '../../graphql/lists'

const GlobalContext = ({
		children,
		layout: { details, extra, bottomPanel },
		setLayout,
		setExpanded,
		lists: { selectedProdIds },
		setList
}) => {
  return children({
		details,
		extra,
		bottomPanel,
		setDetails: (details) => setLayout({ variables: { input: { details, extra: null } }}),
		setExtra: (extra) => setLayout({ variables: { input: { extra } } }),
		setBottomPanel: (bottomPanel) => setLayout({ variables: { input: { bottomPanel } } }),
		setExpanded: (args) => setExpanded({variables: { args }}),
		selectedProdIds,
		setSelectedProdIds: (value) => 
			setList({variables: { name: 'selectedProdIds', value }}),
	})
}

export default compose(
	graphql(getLayout, getLayoutOptions),
	graphql(setLayout, { name: 'setLayout' }),
	graphql(setExpanded, { name: 'setExpanded' }),
	graphql(getLists, getListsOptions),
	graphql(setList, { name: 'setList' }),
)(GlobalContext)