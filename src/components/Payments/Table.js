import React from 'react'

import Table from '../common/Table'
import TableRow from '../common/TableRow'

import styled from 'styled-components'

const Container = styled.div`
  margin-top: 1rem;
  max-height: 100%;
  border-radius: 0.285714rem;
  .fz-tableHeaderRow {
    border-top: none !important;
  }
`

const fields = [{
  name: 'copy',
	width: '35px'
},{
  name: 'edit',
	width: '35px'
},{
  name: 'dateLocal',
  path: 'dateLocal',
	title: 'Дата и время',
	width: '145px'
},{
  name: 'counterparty',
  title: 'Контрагент',
  width: '200px',
  truncated: true
},{
  name: 'project',
	title: 'Проект',
	width: '230px',
  truncated: true
},{
  name: 'article',
  path: 'article.rusName',
	title: 'Статья',
	width: '200px',
  truncated: true
},{
  name: 'purpose',
  path: 'purpose',
  title: 'Назначение',
  width: '300px',
  truncated: true
},{
  name: 'amount',
  path: 'amount',
  title: 'Сумма',
  width: '140px'
},{
  name: 'account',
  path: 'account',
  title: 'Счет',
  width: '100px'
},{
  name: 'createdBy',
  title: 'Автор',
  width: '100px'
},{
  name: 'updatedBy',
  title: 'Редактор',
  width: '100px'
}]

export default function PaymentTable ({
  accounts,
  activePayment,
  mdKontragents,
  mpProjects,
  onClickEdit,
  onClickCopy,
  payments
}) {
  //  TODO add CollectionUtils to support sorting
  return (
    <Container>
      <Table
        fields={fields}
        noServiceField
      >
        {({ tableFields }) => 
          payments.map(payment => {
            const { id, dateLocal, amount, person, inn, createdBy, updatedBy } = payment
            const isIncome = payment.article ? payment.article.isIncome : payment.isIncome
            const kontragent = inn ? mdKontragents.find(k => k.Inn === inn) : null
            const account = accounts.find(a => a.id === payment.account.id)
            return (
              <TableRow
                key={id}
                entity={payment}
                tableFields={tableFields}
                rowFields={[
                  {
                    name: 'copy',
                    icon: 'redo alternate',
                    iconColor: 'grey',
                    hoverable: true,
                    hideUnhovered: true,
                    hasEntries: false,
                    value: ' ',
                    onClick: () => onClickCopy(id),
                  },
                  {
                    name: 'edit',
                    icon: 'edit',
                    iconColor: 'grey',
                    hoverable: true,
                    hideUnhovered: true,
                    hasEntries: false,
                    value: ' ',
                    onClick: () => onClickEdit(id),
                    active: activePayment
                      && activePayment.id === id
                  },
                  {
                    name: 'dateLocal',
                    value: dateLocal.slice(0,16).replace('T', ' '),
                  },
                  {
                    name: 'counterparty',
                    value: person
                      ? person.amoName
                      : kontragent
                        ? kontragent.Name
                        : inn,
                    color: (inn && !kontragent) ? '#9f3a38' : undefined
                  },
                  {
                    name: 'project',
                    value: payment.mpProjectId ? mpProjects.find(mp => mp.Id === payment.mpProjectId).Name : '',
                  },
                  {
                    name: 'amount',
                    value: isIncome ? amount : -amount,
                    color: isIncome ? '#016936' : '#9f3a38'
                  },
                  {
                    name: 'account',
                    value: account.name,
                  },
                  {
                    name: 'createdBy',
                    value: createdBy && createdBy.person.amoName.split(' ')[0] || 'авто',
                  },
                  {
                    name: 'updatedBy',
                    value: updatedBy && updatedBy.person.amoName.split(' ')[0],
                  }
                ]}
                // onClick={() => onClickEdit(id)}
              />
            )
          }
        )}
      </Table>
    </Container>
  )
}
