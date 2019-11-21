import React, { Component, Fragment } from 'react'

import cloneDeep from 'lodash/cloneDeep'
import validateInn from '../../utils/validateInn'
import { isValidDate, toLocalISOString, fromLocalISOString }from '../../utils/dates'

import { graphql } from 'react-apollo'
import * as compose from 'lodash.flowright'
import { allEnquiries, createEnquiry, updateEnquiry } from '../../graphql/enquiry'
import { createOrg } from '../../graphql/org'
import { allOrgsAndModels } from '../../graphql/combinedQueries'

import styled from 'styled-components'
import { Form, Input, Message, Dropdown as SDropdown } from 'semantic-ui-react'
import { Div, Span, A, Label, Button, Section } from '../styled/styled-semantic.js'
import DatePicker from '../common/DatePicker'
import SecondarySection from '../presentational/SecondarySection'
import ModelForm from '../Model/Form'

const Dropdown = styled(SDropdown)`
	&&&&&& {
		width: 350px;
		&:hover {
			border-color: rgba(34, 36, 38, 0.15);
		}
	}
`

class EnquiryEdit extends Component {
	constructor(props){
		super(props)
		this.componentIsMounted = true
		this.isNewEnquiry = props.id === 'new'
		const isNewEnquiry = this.isNewEnquiry
		this.state = {
			loading: false,
			// if any of the form fields has error, the following err prop should always contain non empty string error message with explanaition 
			err: {
				message: ''
			},
			orgDdn: {
				search: '',
				loading: false
			},
			modelDdn: {
				search: '',
				loading: false
			},
			newModelMode: false
		}
		// gather form fields on oriEnquiry object
		const oriEnquiry = cloneDeep(props.enquiry)
		// console.log('props.enquiry > ', props.enquiry)
		if (isNewEnquiry) oriEnquiry.dateLocal = toLocalISOString(new Date()).slice(0, 10)
		delete oriEnquiry.events
		oriEnquiry.orgId = oriEnquiry.org ? oriEnquiry.org.id : null
		oriEnquiry.modelId = oriEnquiry.model ? oriEnquiry.model.id : null
		oriEnquiry.qty = oriEnquiry.qty ? oriEnquiry.qty : ''
		// console.log('oriEnquiry > ', oriEnquiry)
		this.fields = Object.keys(oriEnquiry)
			.filter(key => !['__typename', 'id', 'num', 'org', 'model'].includes(key))
		// console.log('this.fields > ', this.fields)
		this.requiredFields = ['dateLocal', 'orgId', 'modelId', 'qty']
		// map through form fields and write helper props
		this.fields.forEach(key => {
			// console.log(key, oriEnquiry[key])
			this.state[key] = {
				curVal: oriEnquiry[key],
				// err bool controls weather the field is heighlighted with error (red) style
				err: false,
				...this.requiredFields.includes(key) && { required: true },
				...!isNewEnquiry && {
					oriVal: oriEnquiry[key],
					diff: false,
				}
			}
		})
		if (!isNewEnquiry) this.state.diff = false
		// console.log(this.state)
	}
	closeNewModelSection = () => this.setState({ newModelMode: false })
	changeFieldValue = (field, newVal) => {
		console.log('change ', field, ' to value > ', newVal)
		const fieldObj = cloneDeep(this.state[field])
		fieldObj.curVal = newVal
		fieldObj.err = false
		if (!this.isNewEnquiry) fieldObj.diff = fieldObj.curVal !== fieldObj.oriVal
		const diff = this.fields.filter(f => f !== field).map(f => this.state[f].diff).includes(true) || fieldObj.diff
		this.setState({ [field]: fieldObj, diff, err: { message: '' } })
	}
	selectDay = (pickedDate) => {
		if (!isValidDate(pickedDate)) return this.setState({ 
			dateLocal: { ...this.state.dateLocal, err: true },
			err: { title: 'Ошибка ввода даты', message: 'Дата заявки не соответствует формату дат' } 
		})
		this.changeFieldValue('dateLocal', toLocalISOString(pickedDate).slice(0, 10))
	}
	handleOrgDropdownSearchChange = (e, { searchQuery }) => {
		this.setState({ 
			orgDdn: { search: searchQuery, err: false },
		})
	}
	handleModelDropdownSearchChange = (e, { searchQuery }) => {
		this.setState({ 
			modelDdn: { search: searchQuery, err: false },
		})
	}
	handleQtyInputChange = ( e, { value } ) => {
		const newVal = parseInt(value, 10) || ''
		this.changeFieldValue('qty', newVal)
	}
	selectOrg = (e, { value }) => {
		this.setState({ orgDdn: { search: '', loading: false } })
		this.changeFieldValue('orgId', value)
	}
	selectModel = (e, { value }) => {
		this.setState({ modelDdn: { search: '', loading: false } })
		this.changeFieldValue('modelId', value)
	}
	submitNewModel = (modelId) => {
		this.changeFieldValue('modelId', modelId)
		this.closeNewModelSection()
	}
	createOrg = async (e, { value: inn }) => {
		try {
			let err = {}
			const isValidInn = validateInn(inn, err)
			if (!isValidInn) throw new Error(err.message)
			this.setState({ orgDdn: { search: inn, loading: true} })
			const data = await this.props.createOrg({ variables: { inn } })
			if (!this.componentIsMounted) return
			this.selectOrg(null, { value: data.data.createOrg.id } )
		} catch (err) {
			if (!this.componentIsMounted) return
			this.setState({
				err: {
					title: 'Добавить организацию по ИНН не удалось..',
					message: err.message
				},
				orgDdn: {
					search: inn,
					loading: false
				},
				orgId: {
					...this.state.orgId,
					err: true
				}
			 })
			console.log(err)
		}
	}
	submit = () => {
		const enquiry = {}
		// take out only changed fields for update
		this.fields.forEach(f => {
			if (this.isNewEnquiry || this.state[f].diff) enquiry[f] = this.state[f].curVal
		})
		const variables = { ...enquiry }
		if (this.isNewEnquiry) return this.createEnquiry(variables)
		variables.id = this.props.id
		this.updateEnquiry(variables)
	}
	createEnquiry = async (variables) => {
		try {
			this.setState({ loading: true })
			const res = await this.props.createEnquiry({ variables })
			if (!this.componentIsMounted) return
			this.setState({ loading: false, err: '' })
			this.props.setDetails({
				type: 'Enquiry',
				id: res.data.createEnquiry.id
			})
		} catch (err) {
			if (!this.componentIsMounted) return
			this.setState({
				loading: false,
				err: {
					title: 'Создать не удалось..',
					message: err.message
				}
			})
			console.log(err)
		}
	}
	updateEnquiry = async (variables) => {
		const { id, updateEnquiry, setDetails } = this.props
		try {
			this.setState({ loading: true })
			await updateEnquiry({ variables: { input: variables } })
			if (!this.componentIsMounted) return
			this.setState({ loading: false, err: '' })
			setDetails({
				type: 'Enquiry',
				id
			})
		} catch (err) {
			if (!this.componentIsMounted) return
			this.setState({ 
				loading: false,
				err: {
					title: 'Сохранить не удалось..',
					message: err.message
				}
			})
			console.log(err)
		}
	}
	componentWillUnmount() {
		this.componentIsMounted = false
	}
	render() {
		const { dateLocal, orgId, orgDdn, modelId, modelDdn, qty, diff, loading, err, newModelMode } = this.state
		const { id, setDetails, allOrgsAndModels } = this.props
		const selectedDate = fromLocalISOString(dateLocal.curVal)
		const orgs = allOrgsAndModels.orgs
		const models = allOrgsAndModels.models
		const requiredIsEmpty = this.requiredFields.some(f => !this.state[f].curVal)
		const someFieldHasError = this.fields.some(f => !!this.state[f].err)
		return (
					<Fragment>
						<Section
							bottomBorder
						>
							<Form>
								<Form.Field inline>
									<Label>Дата</Label>
									<DatePicker
										error={dateLocal.err}
										selectedDate={selectedDate}
										selectDay={this.selectDay} />
								</Form.Field>
								<Form.Field inline error={orgId.err} required>
									<Label>Организация</Label>
									<Dropdown
										loading={!orgs || orgDdn.loading}
										disabled={id !== 'new' || !orgs || orgDdn.loading} //org cannot be changed when editing existing enquiry
										selection //render as a formControl
										placeholder='Поиск по наименованию или ИНН'
										options={ orgs ? orgs.map(o => ({key:o.id, value: o.id, text: o.name})) : [] }
										value={orgId.curVal}
										onChange={this.selectOrg}
										selectOnBlur={false}
										selectOnNavigation={false}
										search
										searchQuery={orgDdn.search}
										onSearchChange={this.handleOrgDropdownSearchChange}
										noResultsMessage='Если не найдено, введите ИНН, чтобы добавить.'
										allowAdditions
										additionLabel='Добавить по ИНН: '
										onAddItem={this.createOrg}
									/>
								</Form.Field>
								{!newModelMode
									? <Form.Field
											inline
											required
											error={modelId.err}
										>
											<Label>Изделие</Label>
											<Dropdown
												loading={!models || modelDdn.loading}
												disabled={!models || modelDdn.loading}
												selection //render as a formControl
												placeholder='Поиск по наименованию или артикулу'
												options={ models ? models.map(m => ({key:m.id, value: m.id, text: m.name})) : [] }
												value={modelId.curVal}
												onChange={this.selectModel}
												selectOnBlur={false}
												selectOnNavigation={false}
												search
												searchQuery={modelDdn.search}
												onSearchChange={this.handleModelDropdownSearchChange}
												noResultsMessage='Если не найдено, выберите "Нет в списке"'
											/>
											<Button
												ml='5px'
												icon='plus'
												activeColor='green'
												active={newModelMode}
												onClick={() => this.setState({ newModelMode: true })}
											/>
										</Form.Field>
									: <SecondarySection
											title='Новое изделие'
											onClose={this.closeNewModelSection}
											content={
												<ModelForm
													model={undefined}
													orgId={orgId.curVal || undefined}
													refetchQueries={allOrgsAndModels.refetch}
													onSubmit={this.submitNewModel}
												/>
											}
										/>
								}
								<Form.Field inline required>
									<Label>Кол-во</Label>
									<Input type='number'
										placeholder='Введите кол-во шт.' 
										value={qty.curVal}
										onChange={this.handleQtyInputChange} />
									<Span pl='6px'>шт.</Span>
								</Form.Field>
							</Form>
						</Section>
						<Section>
							<Message
								error
								hidden={!err.message}
								header={err.title}
								content={err.message} />
							<Div inline w='formLabel' />
							<Button 
								primary 
								content={this.isNewEnquiry ? 'Создать' : 'Сохранить'}
								disabled={(!this.isNewEnquiry && !diff) || !!err.message || someFieldHasError || !!orgId.loading || requiredIsEmpty}
								loading={loading}
								onClick={this.submit} />
							<A cancel 
								onClick={
									id === 'new'
									? () => setDetails(null)
									: () => setDetails({
											type: 'Enquiry',
											id
										})
								}
							>
								Отмена
							</A>
						</Section>
					</Fragment>
		)
	}
}

export default compose(
	graphql(createOrg, { 
		name: 'createOrg',
		options: {
			update: (cache, {data: { createOrg }}) => {
				const query = allOrgsAndModels
				const data = cache.readQuery({ query })
				data.orgs.push(createOrg)
				data.orgs.sort((a, b) => a.name > b.name)
				cache.writeQuery({ query, data })
			}
		}
	}),
	graphql(allOrgsAndModels, { name: 'allOrgsAndModels' }),
	graphql(updateEnquiry, { name: 'updateEnquiry' }),
	graphql(createEnquiry, { 
		name: 'createEnquiry',
		options: {
			update: (cache, {data: { createEnquiry }}) => {
				const query = allEnquiries
				const data = cache.readQuery({ query })
				createEnquiry.isExpanded = false
				data.enquiries.unshift(createEnquiry)
				cache.writeQuery({ query, data })
			}
		}
	}),
)(EnquiryEdit)