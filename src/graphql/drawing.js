import gql from 'graphql-tag'
import { fileFragmentFull } from './file'

export const drawingFragmentBasic = gql`
	fragment DrawingFragmentBasic on Drawing {
		id
		name
		sortOrder
	}
`

export const drawingFragmentFull = gql`
	fragment DrawingFragmentFull on Drawing {
		...DrawingFragmentBasic
		files { ...FileFragmentFull }
	}
	${drawingFragmentBasic}
	${fileFragmentFull}
`

export const createDrawings = gql`
	mutation CreateDrawings(
		$modelId: ID!
		$files: [Upload!]!
	) {
		createDrawings(
			modelId: $modelId
			files: $files
		) {
			...DrawingFragmentFull
		}
	}
	${drawingFragmentFull}
`

export const deleteDrawings = gql`
	mutation DeleteDrawings( $ids: [ID!]! ) {
		deleteDrawings(ids: $ids) { count }
	}
`

export const setDrawingsSortOrder = gql`
	mutation SetDrawingsSortOrder( $ids: [ID!]! ) {
		setDrawingsSortOrder(ids: $ids) { count }
	}
`
