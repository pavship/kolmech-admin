import gql from 'graphql-tag'
import { dealStatusFragmentBasic, dealStatusFragmentFull } from './dealStatus'
import { orgFragmentBasic } from './org'
import { batchFragmentBasic } from './batch'

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
		org { ...OrgFragmentBasic}
		batches { ...BatchFragmentBasic}
  }
  ${dealFragmentBasic}
  ${orgFragmentBasic}
  ${batchFragmentBasic}
`

export const dealFragmentFull = gql`
	fragment DealFragmentFull on Deal {
		...DealFragmentBasic
    status { ...DealStatusFragmentFull } 
	}
	${dealFragmentBasic}
	${dealStatusFragmentFull}
`

export const dealsPage = gql`
	query Deals {
		deals { ...DealFragmentMiddle }
		orgs { ...OrgFragmentBasic }
	}
	${dealFragmentMiddle}
	${orgFragmentBasic}
`

export const connectDealToOrg = gql`
	mutation ConnectDealToOrg($orgId: ID! $dealId: ID!) {
		connectDealToOrg(orgId: $orgId dealId: $dealId) {
			...DealFragmentMiddle
		}
	}
	${dealFragmentMiddle}
`

export const upsertDeal = gql`
	mutation upsertDeal($input: DealInput!) {
		upsertDeal(input: $input) {
			...DealFragmentMiddle
		}
	}
	${dealFragmentMiddle}
`