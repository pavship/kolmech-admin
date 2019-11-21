import React, { useState, useMemo } from 'react'

import styled from 'styled-components'
import posed, { PoseGroup } from 'react-pose'
import OrgDetails from '../Org/Details/Details'
import CreateComOfferDetails from '../ComOffer/CreateComOfferDetails'
import CreateTaskDetails from '../Task/CreateTaskDetails'
import SelectExecDetails from '../Exec/SelectExecDetails'
import TasksDetails from '../Task/TasksDetails';

const Sidebar = styled(posed.div({
  enter: { 
    x: 0,
    transition: { ease: 'easeInOut' }
  },
  exit: {
    x: '100%',
    transition: { ease: 'easeInOut' }
  }
}))`
  position: absolute;
  z-index: 12;
  top: 36px;
  right: 0;
  width: ${props =>
    ['CreateComOffer', 'createTask', 'tasks']
      .includes(props.type)
        ? '470px'
        : '600px'
  };
  height: calc(100% - 36px);
	background-color: rgba(255,255,255,1);
	box-shadow: 0 0 20px rgba(34,36,38,.15);
`

const DetailsContext = React.createContext()
export default DetailsContext

export const DetailsProvider = ({
  children
}) => {
  const [ details, setDetails ] = useState(null)
  const { type } = details || {}
  const providerValue = useMemo(() => ({ setDetails }), [])
  return (
    <DetailsContext.Provider
      value={providerValue}
    >
      <PoseGroup>
        {details &&
          <Sidebar key='1'
            type={type}
          >
            { type === 'Org' ?	<OrgDetails
                details={details}
                setDetails={setDetails}
              /> :
              type === 'CreateComOffer' ?	<CreateComOfferDetails
                details={details}
                setDetails={setDetails}
              /> :
              type === 'tasks' ?	<TasksDetails
                details={details}
                setDetails={setDetails}
                /> :
              type === 'createTask' ?	<CreateTaskDetails
                details={details}
                setDetails={setDetails}
                /> :
              type === 'SelectExec' ?	<SelectExecDetails
                details={details}
                setDetails={setDetails}
              />
              : null
            }
          </Sidebar>
        }
      </PoseGroup>
      {children}
    </DetailsContext.Provider>
  )
}