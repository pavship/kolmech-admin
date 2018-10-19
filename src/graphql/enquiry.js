import gql from 'graphql-tag'
import { orderFragmentBasic } from './order'

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
			curStatusEvents: events ( where: { status: { id_not: null } }, last: 1 ) {
				id
				status {
					id
					name
					stage
				}
			}
			lastCoEvents: events ( where: { doc: { type: CO } }, last: 1 ) {
				id
				doc {
					id
					amount
				}
			}
			orders {
				...OrderFragmentBasic
				prods {
					id
				}
			}
		}
	}
	${orderFragmentBasic}
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
export const enquiryLocal = gql`
	query EnquiryLocal ($id: ID!) {
		enquiryLocal (id: $id) {
			id
			num
			dateLocal
			lastCoEvents: events ( where: { doc: { type: CO } }, last: 1 ) {
				id
			}
		}
	}
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
			curStatusEvents: events ( where: { status: { id_not: null } }, last: 1 ) {
				id
				status {
					id
					name
					stage
				}
			}
			lastCoEvents: events ( where: { doc: { type: CO } }, last: 1 ) {
				id
				doc {
					id
					amount
				}
			}
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
			orders {
				id
				num
				dateLocal
				qty
				amount
			}
		}
	}
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
	}
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