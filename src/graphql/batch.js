import gql from 'graphql-tag'
import { modelFragmentBasic, modelFragmentWithDrawings } from './model'
import { procFragmentBasic, procFragmentMiddle, procFragmentDetails } from './proc'
import { workpieceFragmentWithDrawings } from './workpiece'
import { opFragmentMiddle } from './op'

export const batchFragmentBasic = gql`
	fragment batchFragmentBasic on Batch {
		id
		qty
		model { ...ModelFragmentBasic }
		procs { ...procFragmentBasic }
	}
	${modelFragmentBasic}
	${procFragmentBasic}
`

export const batchFragmentMiddle = gql`
	fragment batchFragmentMiddle on Batch {
		...batchFragmentBasic
		model { ...ModelFragmentBasic }
		ops { ...opFragmentMiddle }
		procs { ...procFragmentMiddle }
	}
	${batchFragmentBasic}
	${modelFragmentBasic}
	${opFragmentMiddle}
	${procFragmentMiddle}
`

export const batchFragmentDetails = gql`
	fragment batchFragmentDetails on Batch {
		...batchFragmentBasic
		info
		warning
		model { ...ModelFragmentWithDrawings }
		procs { ...procFragmentDetails }
		workpiece { ...WorkpieceFragmentWithDrawings }
	}
	${modelFragmentWithDrawings}
	${batchFragmentBasic}
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