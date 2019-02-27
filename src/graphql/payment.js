import gql from 'graphql-tag'
import { articleFragmentBasic, articleFragmentFull } from './article'
import { personFragmentBasic } from './person'
import { accountFragmentBasic, accountFragmentFull } from './account'
import { equipmentFragmentBasic } from './equipment'

export const paymentFragmentBasic = gql`
	fragment PaymentFragmentBasic on Payment {
		id
		dateLocal
		amount
		purpose
		account { ...AccountFragmentBasic }
		article { ...ArticleFragmentBasic }
		equipment { ...EquipmentFragmentBasic }
		person { ...PersonFragmentBasic }
	}
	${accountFragmentBasic}
	${articleFragmentBasic}
	${equipmentFragmentBasic}
	${personFragmentBasic}
`

export const payments = gql`
	query Payments {
		payments { ...PaymentFragmentBasic }
	}
	${paymentFragmentBasic}
`

export const paymentsPage = gql`
	query PaymentsPage {
		accounts { ...AccountFragmentFull }
		articles { ...ArticleFragmentFull }
		equipments { ...EquipmentFragmentBasic }
		payments { ...PaymentFragmentBasic }
	}
	${accountFragmentFull}
	${articleFragmentFull}
	${equipmentFragmentBasic}
	${paymentFragmentBasic}
`

export const upsertPayment = gql`
	mutation UpsertPayment(
		$input: PaymentInput!
	) {
		upsertPayment(
			input: $input
		) {
			...PaymentFragmentBasic
		}
	}
	${paymentFragmentBasic}
`
