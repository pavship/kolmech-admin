import gql from 'graphql-tag'
import { orderFragmentBasic } from './order'
import { docFragmentBasic } from './doc'
import { statusFragment } from './status'

export const allEnquiries = gql`
	query AllEnquiries {
		enquiries {
			id
			num
			dateLocal
			htmlNote
			isExpanded @client
			org {
				id
				name
			}
			model {
				id
				article
				name
			}
			qty
			orders {
				...OrderFragmentBasic
				prods {
					id
				}
			}
			status { ...StatusFragment }
			docs { ...DocFragmentBasic }
		}
	}
	${orderFragmentBasic}
	${docFragmentBasic}
	${statusFragment}
`
export const enquiryDetails = gql`
	query EnquiryDetails ($id: ID!) {
		enquiry (id: $id) {
			id
			num
			dateLocal
			htmlNote
			org {
				id
				name
			}
			model {
				id
				article
				name
			}
			qty
			events {
				id
				datetimeLocal
				htmlText
				type
				user {
					id
					person {
						id
						fName
						lName 
					}
				}
				status { ...StatusFragment }
				doc { ...DocFragmentBasic }
			}
		}
		statuses {
			id
			stage
			name
			prev {
				id
			}
			next {
				id
			}
		}
	}
	${docFragmentBasic}
	${statusFragment}
`
export const enquiryLocal = gql`
	query EnquiryLocal ($id: ID!) {
		enquiryLocal (id: $id) {
			id
			num
			dateLocal
			docs { ...DocFragmentBasic }
		}
	}
	${docFragmentBasic}
`
export const newEnquiry = gql`
	query {
		newEnquiry @client {
			id
		}
		statuses {
			id
			stage
			name
			prev {
				id
			}
			next {
				id
			}
		}
	}
`
export const createEnquiry = gql`
	mutation createEnquiry($dateLocal: String!, $orgId: ID!, $modelId: ID!, $qty: Int!) {
		createEnquiry(dateLocal: $dateLocal, orgId: $orgId, modelId: $modelId, qty: $qty) {
			id
			num
			dateLocal
			htmlNote
			org {
				id
				name
			}
			model {
				id
				article
				name
			}
			qty
			status { ...StatusFragment }
			docs { ...DocFragmentBasic }
			events {
				id
				datetimeLocal
				htmlText
				type
				user {
					id
					person {
						id
						fName
						lName 
					}
				}
				status { ...StatusFragment }
				doc { ...DocFragmentBasic }
			}
			orders {
				id
				num
				dateLocal
				qty
				amount
			}
		}
	}
	${docFragmentBasic}
	${statusFragment}
`
export const updateEnquiry = gql`
	mutation UpdateEnquiry($input: EnquiryInput!) {
		updateEnquiry(input: $input) {
			id
			num
			dateLocal
			htmlNote
			org {
				id
				name
			}
			model {
				id
				article
				name
			}
			qty
			events {
				id
				datetimeLocal
				htmlText
				type
				user {
					id
					person {
						id
						fName
						lName
					}
				}
				status { ...StatusFragment }
				doc { ...DocFragmentBasic }
			}
		}
	}
	${docFragmentBasic}
	${statusFragment}
`

export const createEnquiryEvent = gql`
	mutation CreateEnquiryEvent($enquiryId: ID!, $htmlText: String, $statusId: ID, $doc: DocCreateInput) {
		createEnquiryEvent(enquiryId: $enquiryId, htmlText: $htmlText, statusId: $statusId, doc: $doc) {
			id
			datetimeLocal
			htmlText
			type
			user {
				id
				person {
					id
					fName
					lName
				}
			}
			status { ...StatusFragment }
			doc { ...DocFragmentBasic }
		}
	}
	${docFragmentBasic}
	${statusFragment}
`

export const enquiryFragment = gql`
	fragment myEnquiry on Enquiry {
		id
		num
		dateLocal
		htmlNote
		isExpanded
		org {
			id
			name
		}
		model {
			id
			article
			name
		}
		qty
		events {
			id
			datetimeLocal
			htmlText
			type
			user {
				id
				person {
					id
					fName
					lName 
				}
			}
			status {
				id
				name
				stage 
			}
			doc {
				id
				dateLocal
				amount
			}
		}
	}
`


// export const alteredEnquiry = gql`
//     query AlteredEnquiry($id: ID!) {
//         alteredEnquiry(id: $id) @client
//     }
// `

// export const updateAlteredEnquiry = gql`
//     mutation UpdateAlteredEnquiry($key: String!, $value: String!) {
//         updateAlteredEnquiry(key: $key, value: $value) @client
//     }
// `