import { getLayout } from '../graphql/layout'
import { allEnquiries } from '../graphql/enquiry'
import { getLists } from '../graphql/lists'
import { cloneDeep } from 'apollo-utilities'

const resolvers = {
	Enquiry: {
		isExpanded: () => false
	},
	Mutation: {
		setLayout: (_, { input }, { cache }) => {
			const query = getLayout
			const data = cache.readQuery({ query })
			data.layout = {
				...data.layout,
				...cloneDeep(input)
			}
			cache.writeQuery({ query, data })
			return null
		},
		setExpanded: (_, { args: { id: enquiryId, value } }, { cache }) => {
			const query = allEnquiries
			const data = cache.readQuery({ query })
			const enquiry = data.enquiries.find(e => e.id === enquiryId)
			enquiry.isExpanded = value
			cache.writeQuery({ query, data })
			return null
		},
		setList: (_, { name, value }, { cache }) => {
			const query = getLists
			const data = cache.readQuery({ query })
			data.lists[name] = value
			cache.writeQuery({ query, data })
			return null
		},
	}
}

export default resolvers