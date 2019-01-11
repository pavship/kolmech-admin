import React from 'react'
import { formatTel } from '../../utils/format'

import GlobalContext from '../special/GlobalContext'

import Table from '../common/Table'
import TableRow from '../common/TableRow'

const fields = [{
	name: 'fullname',
	title: 'ФИО',
	width: '250px'
},{
  name: 'tel',
  title: 'Телефон',
  width: '140px'
}]

export default ({
  emps
}) => {
  return (
    <GlobalContext>
			{({ bottomPanel, setBottomPanel }) =>
				<Table
					fields={fields}
				>
					{({ tableFields }) => 
						emps.map(emp => {
              const { id, person } = emp
              const { lName, fName, mName, tels } = person || {}
							const active = bottomPanel.id === id
							return (
                <TableRow
                  key={id}
                  entity={emp}
                  tableFields={tableFields}
                  rowFields={[{
                    name: 'fullname',
                    value: person
                      ? [lName, fName, mName].join(' ')
                      : 'Персональные данные удалены'
                  },{
                    name: 'tel',
                    value: tels && tels.length && formatTel(tels[0]) || ''
                  }
                  // ,{
                  //   name: 'emps',
                  //   icon: org.employees.length ? 'user' : 'user plus',
                  //   iconColor: 'grey',
                  //   type: 'onHover',
                  //   styles: ['center'],
                  //   value: org.employees.length || ' ',
                  //   onClick: () => {
                  //     setBottomPanel({
                  //       type: 'Employees',
                  //       orgId: org.id
                  //     })
                  //   },
                  //   active: bottomPanel
                  //     && bottomPanel.type === 'Employees'
                  //     && bottomPanel.orgId === org.id
                  // }
                  ]}
                  active={active}
                  onClick={() => {
                    setBottomPanel({
                      ...bottomPanel,
                      editMode: false,
                      id
                    })
                  }}
                />
							)
						}
					)}
				</Table>
			}
		</GlobalContext>
  )
}
