import gql from 'graphql-tag'
import { drawingFragmentBasic } from './drawing';

export const workpieceFragmentBasic = gql`
	fragment WorkpieceFragmentBasic on Workpiece {
    id
    hardness
    material
    name
	}
`

export const workpieceFragmentWithDrawings = gql`
	fragment WorkpieceFragmentWithDrawings on Workpiece {
		...WorkpieceFragmentBasic
		drawing { ...DrawingFragmentBasic }
	}
	${workpieceFragmentBasic}
	${drawingFragmentBasic}
`