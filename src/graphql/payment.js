import gql from 'graphql-tag'
import { articleFragmentBasic, articleFragmentFull } from './article'
import { accountFragmentBasic, accountFragmentFull } from './account'
import { mpProjectFragmentFull } from './mpProject'
import { mdKontragentFragmentBasic } from './mdKontragent'
import { orgFragmentBasic } from './org'
import { personFragmentBasic } from './person'
import { userFragmentBasic } from './user'

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
		createdBy { ...userFragmentBasic }
		mpProjectId
		org { ...OrgFragmentBasic }
		person { ...PersonFragmentBasic }
		updatedBy { ...userFragmentBasic }
	}
	${accountFragmentBasic}
	${articleFragmentBasic}
	${orgFragmentBasic}
	${personFragmentBasic}
	${userFragmentBasic}
`

export const payments = gql`
	query Payments {
		payments { ...PaymentFragmentBasic }
	}
	${paymentFragmentBasic}
`

// accounts { ...accountFragmentFull }
// ${accountFragmentFull}
export const paymentsPage = gql`
	query PaymentsPage {
		articles { ...ArticleFragmentFull }
		mdKontragents { ...mdKontragentFragmentBasic }
		mpProjects { ...mpProjectFragmentFull }
		orgs { ...OrgFragmentBasic }
		payments { ...PaymentFragmentBasic }
	}
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
