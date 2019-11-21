import gql from 'graphql-tag'
import { opTypeFragmentBasic } from './opType'

export const orgFragmentBasic = gql`
	fragment OrgFragmentBasic on Org {
		id
		inn
		name
	}
`

export const orgFragmentFull = gql`
	fragment OrgFragmentFull on Org {
		...OrgFragmentBasic
	}
	${orgFragmentBasic}
`


export const orgExecFragment = gql`
	fragment orgExecFragment on Org {
		id
		name
		exec {
			id
			opTypes { ...opTypeFragmentBasic }
		}
	}
	${opTypeFragmentBasic}
`

export const org = gql`
	query org ($id: ID!) {
		org (id: $id) {
			...OrgFragmentBasic
		}
	}
	${orgFragmentBasic}
`

export const allOrgs = gql`
	query allOrgs {
		orgs {
			...OrgFragmentBasic
		}
	}
	${orgFragmentBasic}
`

export const createContract = gql`
	mutation createContract($id: ID!, $date: String) {
		createContract(id: $id, date: $date) {
			statusText
		}
	}
`

export const createPostEnvelopeAddressInsert = gql`
	mutation createPostEnvelopeAddressInsert($orgId: ID!) {
		createPostEnvelopeAddressInsert(orgId: $orgId) {
			statusText
		}
	}
`

export const createOrg = gql`
	mutation createOrg($inn: String!) {
		createOrg(inn: $inn) {
			...OrgFragmentBasic
		}
	}
	${orgFragmentBasic}
`

export const mergeOrg = gql`
	mutation mergeOrg($id: ID!, $inn: String!) {
		mergeOrg(id: $id, inn: $inn) {
			...OrgFragmentFull
		}
	}
	${orgFragmentFull}
`

export const orgLocal = gql`
	query OrgLocal ($id: ID!) {
		orgLocal (id: $id) {
			...OrgFragmentBasic
		}
	}
	${orgFragmentBasic}
`

export const orgDetails = gql`
	query orgDetails ($id: ID!) {
		orgDetails (id: $id) {
			...OrgFragmentFull
		}
	}
	${orgFragmentFull}
`

export const upsertOrgExec = gql`
	mutation upsertOrg($input: OrgInput!) {
		upsertOrg(input: $input) {
			...orgExecFragment
		}
	}
	${orgExecFragment}
`