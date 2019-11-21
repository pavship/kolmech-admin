import gql from 'graphql-tag'
import { dealStatusFragmentBasic, dealStatusFragmentFull } from './dealStatus'
import { orgFragmentBasic } from './org'
import { batchFragmentMiddle, batchFragmentDetails } from './batch'
import { opTypeFragmentBasic } from './opType'

export const dealFragmentBasic = gql`
	fragment DealFragmentBasic on Deal {
    id
    amoId
    name
		status { ...DealStatusFragmentBasic }
  }
  ${dealStatusFragmentBasic}
`

export const dealFragmentMiddle = gql`
	fragment DealFragmentMiddle on Deal {
		...DealFragmentBasic
		date
		batches (orderBy: sort_ASC) { ...batchFragmentMiddle}
		org { ...OrgFragmentBasic}
  }
  ${dealFragmentBasic}
  ${orgFragmentBasic}
  ${batchFragmentMiddle}
`

export const dealFragmentFull = gql`
	fragment DealFragmentFull on Deal {
		...DealFragmentMiddle
    status { ...DealStatusFragmentFull }
	}
	${dealFragmentMiddle}
	${dealStatusFragmentFull}
`

export const dealsPage = gql`
	query Deals {
		deals { ...DealFragmentMiddle }
		opTypes { ...opTypeFragmentBasic }
	}
	${dealFragmentMiddle}
	${opTypeFragmentBasic}
`

export const dealDetails = gql`
	query deal ($id: ID!) {
		deal (id: $id) {
			id
			batches (orderBy: sort_ASC) { ...batchFragmentDetails}
		}
	}
	${batchFragmentDetails}
`

export const createComOffer = gql`
	mutation createComOffer($dealId: ID!, $date: String) {
		createComOffer(dealId: $dealId, date: $date) {
			statusText
		}
	}
`

export const connectDealToOrg = gql`
	mutation ConnectDealToOrg($orgId: ID! $dealId: ID!) {
		connectDealToOrg(orgId: $orgId dealId: $dealId) {
			...DealFragmentMiddle
		}
	}
	${dealFragmentMiddle}
`

export const syncDeals = gql`
	mutation syncDeals {
		syncDeals {
			count
		}
	}
`

export const upsertDeal = gql`
	mutation upsertDeal($input: DealInput!) {
		upsertDeal(input: $input) {
			...DealFragmentMiddle
		}
	}
	${dealFragmentMiddle}
`