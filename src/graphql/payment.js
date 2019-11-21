import gql from 'graphql-tag'
import { articleFragmentBasic, articleFragmentFull } from './article'
import { accountFragmentBasic, accountFragmentFull } from './account'
import { equipmentFragmentBasic } from './equipment'
import { mpProjectFragmentFull } from './mpProject'
import { orgFragmentBasic } from './org'
import { personFragmentBasic } from './person'

export const paymentFragmentBasic = gql`
	fragment PaymentFragmentBasic on Payment {
		id
		isIncome
		dateLocal
		amount
		purpose
		account { ...AccountFragmentBasic }
		article { ...ArticleFragmentBasic }
		equipment { ...EquipmentFragmentBasic }
		mpProjectId
		org { ...OrgFragmentBasic }
		person { ...PersonFragmentBasic }
	}
	${accountFragmentBasic}
	${articleFragmentBasic}
	${equipmentFragmentBasic}
	${orgFragmentBasic}
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
		mpProjects { ...mpProjectFragmentFull }
		orgs { ...OrgFragmentBasic }
		payments { ...PaymentFragmentBasic }
	}
	${accountFragmentFull}
	${articleFragmentFull}
	${equipmentFragmentBasic}
	${orgFragmentBasic}
	${mpProjectFragmentFull}
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
