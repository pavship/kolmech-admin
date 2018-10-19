import gql from 'graphql-tag'

export const getLayout = gql`
	query getLayout {
		layout @client {
			details
			extra
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
	mutation SetLayout($details: json, $extra: json) {
		setLayout(details: $details, extra: $extra) @client {
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