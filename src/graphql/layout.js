import gql from 'graphql-tag'

export const getLayout = gql`
	query getLayout {
		layout @client {
			details
			extra
			bottomPanel
		}
	}
`

export const getLayoutOptions = ({
	props: ({ data: { layout } }) => {
		return {
			layout: layout || {}
		}
	}
})

export const setLayout = gql`
	mutation SetLayout($details: json, $extra: json, $bottomPanel: json) {
		setLayout(details: $details, extra: $extra, bottomPanel: $bottomPanel) @client {
			result
		}
	}
`

export const setExpanded = gql`
	mutation SetExpanded($args: json) {
		setExpanded(args: $args) @client {
			args
		}
	}
`