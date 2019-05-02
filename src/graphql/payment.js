import gql from 'graphql-tag'
import { articleFragmentBasic, articleFragmentFull } from './article'
import { personFragmentBasic } from './person'
import { accountFragmentBasic, accountFragmentFull } from './account'
import { equipmentFragmentBasic } from './equipment'
import { orgFragmentBasic } from './org';

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
		orgs { ...OrgFragmentBasic }
		equipments { ...EquipmentFragmentBasic }
		payments { ...PaymentFragmentBasic }
	}
	${accountFragmentFull}
	${articleFragmentFull}
	${orgFragmentBasic}
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
