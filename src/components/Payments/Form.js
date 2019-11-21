import React, { useState, useEffect } from 'react'

import { Mutation, Query } from 'react-apollo'
import { upsertPayment, paymentsPage } from '../../graphql/payment'
import { syncWithAmoContacts } from '../../graphql/amo'

import { Formik } from 'formik'
import { projectEntity, preparePayload } from '../form/utils'
import { formikSchema, validationSchema } from '../../schema/payment'
import Field from '../form/FormikField'

import { NotificationsConsumer } from '../notifications/NotificationsContext'

import styled from 'styled-components'
import { Button, A, Div } from '../styled/styled-semantic'
import { persons } from '../../graphql/person'
import produce from 'immer'
import { createOrg } from '../../graphql/org'

const Container = styled.div`
	min-height: content;
	max-width: 50%;
	min-width: 430px;
	flex: 0 0 430px;
	box-shadow: 0 2px 4px 0 rgba(34,36,38,.12), 0 2px 10px 0 rgba(34,36,38,.15);
	border: 1px solid rgba(34,36,38,.15);
	border-radius: .28571429rem;
`

const Header = styled.div`
	display: flex;
	align-items: center;
	height: 52px;
	padding: 0 2rem;
	font-size: 1.28571429rem;
	line-height: 1.28571429em;
	font-weight: bold;
	border-bottom: 1px solid rgba(34,36,38,.15);
`

const Fields = styled.div`
	.fz-formFieldLabel {
		${({ labelWidth }) => labelWidth ? `flex-basis: ${labelWidth} !important;` : ''}
	}
`

const CounterpartyFieldSwitch = ({
	children,
	payment
}) => {
	const [orgCounterparty, setOrgCounterparty] = useState(!!(payment && payment.org))
	useEffect(() => {
		setOrgCounterparty(!!(payment && payment.org))
	}, [payment])
	return (
		children({
			orgCounterparty,
			setOrgCounterparty
		})
	)
}

export default ({
	articles,
	equipment,
	mpProjects,
	orgs,
	reset,
	payment,
}) => {
	let schema = formikSchema(new Date())
	let initialValues = payment ? projectEntity(payment, schema) : schema
	const formLabelWidth = '110px'
	const articleOptions = articles.map(a => 
		({ key: a.id, text: a.rusName, value: a.id })
	)
	const mpProjectOptions = mpProjects.map(p => 
		({ key: p.Id, text: p.Id - 1000000 + '. ' + p.Name, value: p.Id })
	)
	const bankPayment = payment && payment.isIncome !== null
	return (
		<NotificationsConsumer>
			{({ notify }) =>
				<Container>
					<Query
						query={persons}
						onError={err => notify({
							type: 'error',
							title: 'Ошибка загрузки контактов',
							content: err.message,
						})}
					>
						{({ loading: personsLoading,
								data,
								refetch: refetchPersons
							}) => <>
							<Mutation
								mutation={syncWithAmoContacts}
								onCompleted={() => {
									refetchPersons()
									notify({
										type: 'success',
										title: 'Контакты синхронизированы'
									})
								}}
								onError={err => notify({
									type: 'error',
									title: 'Ошибка синхронизации с Амо',
									content: err.message,
								})}
							>
								{(syncWithAmoContacts, { loading }) => 
									<Header>
										{(payment ? 'Изменить' : 'Добавить') + ' платеж'}
										<Button
											ml='auto'
											icon='sync alternate'
											content='Контакты AmoCRM'
											onClick={() => syncWithAmoContacts()}
											loading={loading}
										/>
									</Header>
								}
							</Mutation>
							<Div
								p='1rem 2rem'
							>
								<Mutation
									mutation={upsertPayment}
									onCompleted={() => notify({
										type: 'success',
										title: 'Платеж сохранен'
									})}
									onError={err => notify({
										type: 'error',
										title: 'Ошибка сохранения',
										content: err.message,
									})}
									update={(cache, { data: { upsertPayment } }) => {
										const { payments } = cache.readQuery({ query: paymentsPage })
										cache.writeQuery({
											query: paymentsPage,
											data: {
												payments: produce(payments, draft => {
													const foundIndex = payments.findIndex(p => p.id === upsertPayment.id)
													foundIndex !== -1
														? draft.splice(foundIndex, 1, upsertPayment)
														: draft.unshift(upsertPayment)
												})
											}
										})
									}}
								>
									{(upsertPayment, { loading }) =>
										<Formik
											initialValues={initialValues}
											enableReinitialize={true}
											validationSchema={validationSchema}
											onSubmit={async (values, { resetForm }) => {
												const input = preparePayload(values, initialValues, schema)
												if (!payment && !input.dateLocal) 
													input.dateLocal = initialValues.dateLocal
												await upsertPayment({ variables: { input } })
												return payment ? reset() : resetForm()
											}}
										>
											{({
												values,
												handleSubmit,
												handleReset,
												setFieldValue,
											}) =>
												<Fields
													labelWidth={formLabelWidth}
												>
													{!bankPayment &&
														<Field
															label='Дата'
															required
															name='dateLocal'
															type='date'
														/>
													}
													<Field
														label='Статья'
														required
														name='articleId'
														options={articleOptions}
													/>
													<Field
														label='Проект'
														name='mpProjectId'
														options={mpProjectOptions}
													/>
													{!bankPayment && (
														<CounterpartyFieldSwitch
															key={payment}
															payment={payment}
														>
															{({orgCounterparty, setOrgCounterparty}) =>
															orgCounterparty
															? <Mutation
																	mutation={createOrg}
																	onCompleted={(res) => console.log('res > ', res) || notify({
																		type: 'success',
																		title: 'Организация добавлена'
																	})}
																	onError={err => notify({
																		type: 'error',
																		title: 'Ошибка. Организация не добавлена',
																		content: err.message,
																	})}
																	update={(cache, { data: { createOrg } }) => {
																		const { orgs } = cache.readQuery({ query: paymentsPage })
																		cache.writeQuery({
																			query: paymentsPage,
																			data: {
																				orgs: produce(orgs, draft => {
																					const foundIndex = orgs.findIndex(o => o.id === createOrg.id)
																					foundIndex !== -1
																						? draft.splice(foundIndex, 1, createOrg)
																						: draft.unshift(createOrg)
																				})
																			}
																		})
																		
																	}}
																>
																	{(createOrg, { loading: orgsLoading }) =>
																		<Field
																			label='Контрагент'
																			required
																			name='orgId'
																			options={orgs
																				? orgs.map(o => 
																					({ key: o.id, text: o.name + ' (ИНН: ' + o.inn + ')', value: o.id })
																				)
																				: []
																			}
																			loading={orgsLoading}
																			disabled={orgsLoading}
																			allowAdditions
																			additionLabel='Добавить по ИНН: '
																			onAddItem={async (e, { value: inn }) => {
																				const created = await createOrg({ variables: { inn: inn.toString() } })
																				setFieldValue('orgId', created && created.data && created.data.createOrg.id)
																			}}
																			contentBeforeField={<div>
																				Организация или <A
																					onClick={() => {
																						setOrgCounterparty(false)
																						setFieldValue('orgId', '')
																					}}
																				>Персона</A>
																			</div>}
																		/>
																	}
																</Mutation>
															: <Field
																	label='Контрагент'
																	required
																	name='personId'
																	options={data.persons
																		? data.persons.map(p => 
																			({ key: p.id, text: p.amoName || p.fName, value: p.id })
																		)
																		: []
																	}
																	loading={personsLoading}
																	disabled={personsLoading}
																	contentBeforeField={<div>
																		Персона или <A
																			onClick={() => {
																				setOrgCounterparty(true)
																				setFieldValue('personId', '')
																			}}
																		>Организация</A>
																	</div>}
																/>
															}
														</CounterpartyFieldSwitch>
													)}
													{values.articleId
														&& articles.find(a => a.id === values.articleId).relations
														&& articles.find(a => a.id === values.articleId).relations.includes('EQUIPMENT') &&
															<Field
																label='Оборудование'
																required
																name='equipmentId'
																options={equipment.map(e => 
																	({ key: e.id, text: e.name, value: e.id })
																)}
															/>
													}
													{!bankPayment && <>
														<Field
															label='Назначение'
															name='purpose'
														/>
														<Field
															label='Сумма'
															required
															name='amount'
														/>
													</>}
													<Button
														ml={formLabelWidth}
														type='button'
														primary
														content={payment ? 'Сохранить' : 'Добавить'}
														loading={loading}
														onClick={handleSubmit}
													/>
													<A cancel
														onClick={payment ? () => reset() : handleReset}
													>
														{payment ? 'Отмена' : 'Очистить'}
													</A>
												</Fields>
											}
										</Formik>
									}
								</Mutation>
							</Div>
						</>}
					</Query>
				</Container>
			}
		</NotificationsConsumer>
	)
}
