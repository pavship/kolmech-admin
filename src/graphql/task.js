import gql from 'graphql-tag'
import { execFragmentBasic } from './exec'

export const taskFragmentBasic = gql`
	fragment taskFragmentBasic on Task {
		id
	}
`

export const taskFragmentMiddle = gql`
	fragment taskFragmentMiddle on Task {
		...taskFragmentBasic
    end
		from
		order
		status
		text
    to
  }
  ${taskFragmentBasic}
`

export const taskFragmentFull = gql`
	fragment taskFragmentFull on Task {
		...taskFragmentMiddle
    appoint {
			id
			exec { ...execFragmentBasic }
		}
	}
	${execFragmentBasic}
  ${taskFragmentMiddle}
`

export const taskDetails = gql`
	query task ($id: ID!) {
		task (id: $id) { ...taskFragmentFull }
	}
	${taskFragmentFull}
`

export const tasksDetails = gql`
	query tasks {
		tasks { ...taskFragmentFull }
	}
	${taskFragmentFull}
`

export const upsertTask = gql`
	mutation upsertTask($input: TaskInput!) {
		upsertTask(input: $input) {
			...taskFragmentFull
		}
	}
	${taskFragmentFull}
`