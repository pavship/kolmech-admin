import gql from 'graphql-tag'
import { orderFragmentBasic } from './order'
import { docFragmentBasic } from './doc'
import { statusFragment } from './status'
import { modelFragmentWithDrawings, modelFragmentBasic } from './model';

export const enquiryFragmentBasic = gql`
	fragment EnquiryFragmentBasic on Enquiry {
		id
		num
		dateLocal
	}
`

export const allEnquiries = gql`
	query AllEnquiries {
		enquiries {
			...EnquiryFragmentBasic
			htmlNote
			org {
				id
				name
				employees {
					id
				}
			}
			model { ...ModelFragmentWithDrawings }
			qty
			orders {
				...OrderFragmentBasic
				prods {
					id
				}
			}
			status { ...StatusFragment }
			docs { ...DocFragmentBasic }
			isExpanded @client
		}
	}
	${enquiryFragmentBasic}
	${modelFragmentWithDrawings}
	${orderFragmentBasic}
	${docFragmentBasic}
	${statusFragment}
`
export const enquiryDetails = gql`
	query EnquiryDetails ($id: ID!) {
		enquiry (id: $id) {
			...EnquiryFragmentBasic
			htmlNote
			org {
				id
				name
			}
			model { ...ModelFragmentBasic }
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
	${enquiryFragmentBasic}
	${modelFragmentBasic}
	${docFragmentBasic}
	${statusFragment}
`
export const enquiryLocal = gql`
	query EnquiryLocal ($id: ID!) {
		enquiryLocal (id: $id) {
			...EnquiryFragmentBasic
			docs { ...DocFragmentBasic }
		}
	}
	${enquiryFragmentBasic}
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
			...EnquiryFragmentBasic
			htmlNote
			org {
				id
				name
			}
			model { ...ModelFragmentWithDrawings }
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
				fullnum
				dateLocal
				qty
				amount
			}
		}
	}
	${enquiryFragmentBasic}
	${modelFragmentWithDrawings}
	${docFragmentBasic}
	${statusFragment}
`
export const updateEnquiry = gql`
	mutation UpdateEnquiry($input: EnquiryInput!) {
		updateEnquiry(input: $input) {
			...EnquiryFragmentBasic
			htmlNote
			org {
				id
				name
			}
			model { ...ModelFragmentWithDrawings }
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
	${enquiryFragmentBasic}
	${modelFragmentWithDrawings}
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
		model { ...ModelFragmentBasic }
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
	${modelFragmentBasic}
`