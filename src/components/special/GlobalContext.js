import { compose, graphql } from 'react-apollo'
import { getLayout, getLayoutOptions, setLayout, setExpanded } from '../../graphql/layout'
import { getLists, getListsOptions, setList } from '../../graphql/lists'

// const GlobalContext = React.createContext()

// class GlobalContextProvider extends Component {
// 	// setDetails = (details) => {
// 	// 	this.props.setLayout({variables: { details }})
// 	// }
// 	render() {
// 		const { children, getLayout: { details }, setLayout } = this.props
// 		return (
// 			<GlobalContext.Provider 
// 				value={{
// 					details,
// 					setDetails: (details) => setLayout({variables: { details }})
// 				}}
// 			>
// 				{children}
// 			</GlobalContext.Provider>
// 		)
// 	}
// }

const GlobalContext = ({
		children,
		layout: { details, extra, bottomPanel },
		setLayout,
		setExpanded,
		lists: { selectedProdIds },
		setList
}) => {
	// setLayout({ variables: { 
	// 	details: {"type":"Order","id":"cjmzkpstb00170983jkb7bcbq"},
	// 	extra: {"type":"Store","modelId":"cjcfy68q55d3x0149fcpq7l63","orderId":"cjmzkpstb00170983jkb7bcbq"}
	// } })
  return children({
		details,
		extra,
		bottomPanel,
		setDetails: (details) => {
			setLayout({ variables: { 
				details,
				extra: null
				// ...details.type === 'Enquiry' && { extra: null }
			}})
		},
		setExtra: (extra) => setLayout({ variables: { extra } }),
		setBottomPanel: (bottomPanel) => setLayout({ variables: { bottomPanel } }),
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
	
// export default GlobalContextProvider
// export const GlobalContextConsumer = GlobalContext.Consumer