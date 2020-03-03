import gql from 'graphql-tag'
import { articleFragmentBasic, articleFragmentFull } from './article'
import { accountFragmentBasic, accountFragmentFull } from './account'
import { mpProjectFragmentFull } from './mpProject'
import { mdKontragentFragmentBasic } from './mdKontragent'
import { orgFragmentBasic } from './org'
import { personFragmentBasic } from './person'

export const paymentFragmentBasic = gql`
	fragment PaymentFragmentBasic on Payment {
		id
		inn
		isIncome
		dateLocal
		amount
		purpose
		account { ...accountFragmentBasic }
		article { ...ArticleFragmentBasic }
		mpProjectId
		org { ...OrgFragmentBasic }
		person { ...PersonFragmentBasic }
	}
	${accountFragmentBasic}
	${articleFragmentBasic}
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
		accounts { ...accountFragmentFull }
		articles { ...ArticleFragmentFull }
		mdKontragents { ...mdKontragentFragmentBasic }
		mpProjects { ...mpProjectFragmentFull }
		orgs { ...OrgFragmentBasic }
		payments { ...PaymentFragmentBasic }
	}
	${accountFragmentFull}
	${articleFragmentFull}
	${orgFragmentBasic}
	${mdKontragentFragmentBasic}
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
