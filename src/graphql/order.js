import gql from 'graphql-tag'

export const orderFragmentBasic = gql`
	fragment OrderFragmentBasic on Order {
		id
		num
		dateLocal
		qty
		amount
	}
`

export const orderFragmentFull = gql`
	fragment OrderFragmentFull on Order {
		...OrderFragmentBasic
		htmlNote
		org {
			id
			name
		}
		model {
			id
			name
		}
		prods {
			id
			fullnumber,
			hasDefect,
			isSpoiled,
			progress,
			dept {
				id
				name
				type
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
	}
	${orderFragmentBasic}
`

export const upsertOrder = gql`
	mutation UpsertOrder($id: ID, $enquiryId: ID, $dateLocal: String!, $qty: Int, $amount: Float) {
		upsertOrder(id: $id, enquiryId: $enquiryId, dateLocal: $dateLocal, qty: $qty, amount: $amount) {
			...OrderFragmentBasic
			enquiry {
				id
			}
		}
	}
	${orderFragmentBasic}
`
export const orderLocal = gql`
	query OrderLocal ($id: ID!) {
		orderLocal (id: $id) {
			id
			num
			dateLocal
			qty
			amount
		}
	}
`
export const orderDetails = gql`
	query OrderDetails ($id: ID!) {
		order (id: $id) {
			...OrderFragmentFull
		}
	}
	${orderFragmentFull}
`
export const reserveProds = gql`
	mutation ReserveProds ($orderId: ID!, $prodIds: [ID!]!) {
		reserveProds (orderId: $orderId, prodIds: $prodIds) {
			...OrderFragmentFull
		}
	}
	${orderFragmentFull}
`