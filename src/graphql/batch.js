import gql from 'graphql-tag'
import { elementFragmentBasic, elementFragmentMiddle, elementFragmentDetails } from './element'
import { modelFragmentBasic, modelFragmentWithDrawings } from './model'
import { procFragmentBasic, procFragmentMiddle, procFragmentDetails } from './proc'
import { workpieceFragmentWithDrawings } from './workpiece'
import { opFragmentMiddle } from './op'
import { bpStatFragmentMiddle } from './bpStat'

export const batchFragmentBasic = gql`
	fragment batchFragmentBasic on Batch {
		id
		qty
		model { ...ModelFragmentBasic }
		elements (orderBy: sort_ASC) { ...elementFragmentBasic }
		procs { ...procFragmentBasic }
	}
	${modelFragmentBasic}
	${elementFragmentBasic}
	${procFragmentBasic}
`

export const batchFragmentMiddle = gql`
	fragment batchFragmentMiddle on Batch {
		...batchFragmentBasic
		sort
		bpStat { ...bpStatFragmentMiddle }
		elements (orderBy: sort_ASC) { ...elementFragmentMiddle }
		model { ...ModelFragmentBasic }
		ops { ...opFragmentMiddle }
		procs { ...procFragmentMiddle }
	}
	${bpStatFragmentMiddle}
	${batchFragmentBasic}
	${elementFragmentMiddle}
	${modelFragmentBasic}
	${opFragmentMiddle}
	${procFragmentMiddle}
`

export const batchFragmentDetails = gql`
	fragment batchFragmentDetails on Batch {
		...batchFragmentBasic
		descript
		info
		warning
		elements (orderBy: sort_ASC) { ...elementFragmentDetails }
		model { ...ModelFragmentWithDrawings }
		procs { ...procFragmentDetails }
		workpiece { ...WorkpieceFragmentWithDrawings }
	}
	${modelFragmentWithDrawings}
	${batchFragmentBasic}
	${elementFragmentDetails}
	${procFragmentDetails}
	${workpieceFragmentWithDrawings}
`

export const batchDetails = gql`
	query batch ($id: ID!) {
		batch (id: $id) {
			...batchFragmentDetails
		}
	}
	${batchFragmentDetails}
`

export const upsertBatch = gql`
	mutation upsertBatch($input: BatchInput!) {
		upsertBatch(input: $input) {
			...batchFragmentMiddle
			...batchFragmentDetails
		}
	}
	${batchFragmentMiddle}
	${batchFragmentDetails}
`