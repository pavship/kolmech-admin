import React, { Component, Fragment } from 'react'

import { Header as SHeader, Icon, Label, Form, Comment, 
	Message, Dropdown } from 'semantic-ui-react'
import { P, Div, Button, Section } from './styled-semantic/styled-semantic'
import styled from 'styled-components'

import { graphql, compose } from 'react-apollo'
import { enquiryDetails, newEnquiry, createEnquiryEvent, 
	enquiryFragment, allEnquiries, updateEnquiry } from '../graphql/enquiry'

import GlobalContext from './special/GlobalContext'

import WrappedDraftEditor from './common/WrappedDraftEditor'
import { sanitize } from 'dompurify'
import { currency } from '../utils/format'

import EnquiryEdit from './EnquiryEdit'
import EnquiryCommercialOffer from './EnquiryCommercialOffer'

const Table = styled.table`
	/* table-layout: fixed; */
	width: 100%;
	border-collapse: collapse;
`

const Tr = styled.tr`
  margin: 0 0 1em;
  line-height: 1.4285em;
  color: rgba(0,0,0,.87);
`

const Td = styled.td`
  :nth-child(1) {
		width: ${props => props.theme.widths.formLabel};
	// color: rgba(0,0,0,.87);
	/* font-size: .92857143em; */
	/* line-height: 32px; */
		line-height: 1.21428571em;
		padding: .67857143em 0;
		vertical-align: top;
  }
  :nth-child(2) {
		// width: 100px;
		font-size: 1em;
		font-weight: bold;
		line-height: 1.21428571em;
		padding: .67857143em 0;
  }
`
const InputTd = Td.extend`
	padding-top: 0 !important;
`

const EditorTd = InputTd.extend`
	font-weight: unset !important;
	/* padding-bottom: 0 !important; */
`

const SDropdown = styled(Dropdown)`
	& .active.item {
		display: none !important;
	}
	& .selected.item {
		background: none !important;
	}
`

// const DarkGreenButton = styled(Button)`
// 	&&&& {
// 		color: #178230 !important;
// 		&:hover {
// 			color: #0c5a1e !important;
// 		}
// 	}
// `

const Comments = styled(Comment.Group)`
	margin: 1.5em 1.5em 1.5em 55px !important;
	/* margin: 1.5em 1.5em 1.5em 0 !important; */
`

const CIcon = styled(Icon)`
	// apply horizontal offset correction for different icons to be vertically alined
  width: ${props => (props.type === 'CREATE') ? '1.73em' : '1.4em' } !important;
	${props => (props.type === 'CREATE') && 'margin-left: -0.33em !important;'}
  margin-top: .15em !important;
	float: left;
	opacity: 0.6 !important;
`

const UserLabel = styled(Label)`
  width: 2em;
  height: 2em;
  margin-left: 0 !important;
  padding: .4em 0em !important;
  float: left;
	text-align: center;
	${props => props.indent && 'margin-left: 42.69px !important;'}
	// ${props => props.indent && 'margin-left: calc(1.4em + 0.25rem) !important;'}
`

const CContent = styled(Comment.Content)`
  margin-left: 6.5em !important;
`

const CMetadata = styled(Comment.Metadata)`
	margin-left: 0 !important;
  color: rgba(0,0,0,.6) !important;
`

const CText = styled(Comment.Text)`
	& p { margin: 0 !important; }
	&>table { 
		width: 100%;
		border-collapse: collapse; 
	}
	&>table>tbody>tr>td {
		padding-left: 4px;
		vertical-align: top;
	}
	&>table>tbody>tr>td:nth-child(1) {
		width: 5px;
	}
	&>table>tbody>tr>td:nth-child(2) {
		width: 25px;
		min-width: 90px;
	}
	&>table>tbody>tr>td:nth-child(3) {
		padding-left: 10px;
		width: 1000px;
		min-width: 240px;
	}
	&>table>tbody>tr>td>span {
		margin-right: 5px;
	}
`

const CMessage = styled(Message)`
	margin-left: 6.35em !important;
`
	
class EnquiryDetails extends Component {
	isNewEnquiry = this.props.id === 'new'
	editorRef = React.createRef()
	noteEditorRef = React.createRef()
	componentIsMounted = true
  state = {
	editMode: this.isNewEnquiry ? true : false,
		editorHasText: false,
		noteEditorDiff: false,
		noteKey: 1,
		activeCO: '',
		loading: false,
		creatingComment: false,
		changingStatus: false,
		statusPending: false,
		savingNote: false,
		error: ''
	}
	// refetchEnquiry = async () => {
	// 	this.setState({ loading: true })
	// 	const res = await this.props.enquiryQuery.refetch()
	// 	this.setState({ loading: false })
	// }
	enableEditMode = () => this.setState({ editMode: true })
	exitEditMode = () => this.setState({ editMode: false })
	setEditorHasText = (bool) => this.setState({ editorHasText: bool })
	setNoteEditorDiff = (bool) => this.setState({ noteEditorDiff: bool })
	cancelEdit = () => {
		if (this.isNewEnquiry) return this.props.closeDetails()
		this.exitEditMode()
  }
  createComment = async () => {
		try {
			const htmlText = this.editorRef.current.exportHtml()
			// if (htmlText === '<p><br></p>') return
			if (htmlText === null) return
			this.setState({creatingComment: true})
			await this.props.createEnquiryEvent({
				variables: {
					enquiryId: this.props.id,
					htmlText
				}
			})
			this.setState({ creatingComment: false, editorHasText: false, error: '' })
			this.editorRef.current.clear()
		} catch(err) {
			this.setState({ creatingComment: false, error: err.message })
			console.log(err)
		}
	}
	changeStatus = async (e, { value, co }) => {
		const coStatusId = this.props.enquiryQuery.statuses.find(s => s.name === 'Выставлено КП').id
		if (value === coStatusId) {
			if (!this.state.statusPending) return this.setState({ statusPending: true, activeCO: 'new' })
			else this.setState({ statusPending: false })
		}
		try {
			this.setState({ changingStatus: true })
			await this.props.createEnquiryEvent({
				variables: {
					enquiryId: this.props.id,
					statusId: value,
					...(co && { doc: { ...co } })
				}
			})
			this.setState({ changingStatus: false, activeCO: '' })
		} catch (err) {
			this.setState({ changingStatus: false, error: err.message })
			console.log(err)
		}
	}
	cancelPendingStatusChange = () => {
		this.setState({ statusPending: false, activeCO: '' })
	}
	saveNote = async () => {
		try {
			let htmlNote = this.noteEditorRef.current.exportHtml()
			if (htmlNote === this.props.enquiryQuery.enquiry.htmlNote) {
				return this.setState({ noteKey: this.state.noteKey + 1, noteEditorDiff: false })
			}
			this.setState({ savingNote: true })
			await this.props.updateEnquiry({ 
				variables: { input: { id: this.props.id, htmlNote } } })
			if (!this.componentIsMounted) return
			this.setState({ savingNote: false, error: '', noteKey: this.state.noteKey + 1, noteEditorDiff: false })
		} catch (err) {
			if (!this.componentIsMounted) return
			this.setState({ savingNote: false, error: err.message })
			console.log(err)
		}
	}
  render() { 
		const { editorHasText, creatingComment, changingStatus, statusPending, 
				error, noteEditorDiff, noteKey, savingNote, activeCO } = this.state
		const { enquiryQuery } = this.props
		const isNewEnquiry = this.isNewEnquiry
		if (enquiryQuery.loading) return <Section>Загрузка...</Section>
		if (enquiryQuery.error) return <Section>Ошибка {enquiryQuery.error.message}</Section>
		const enquiry = isNewEnquiry ? enquiryQuery.newEnquiry : enquiryQuery.enquiry
		const { org, model, qty, htmlNote, events } = enquiry
		const coEvents = events && events.filter(e => e.doc)
		const curStatus = events && events.filter(e => e.status).pop().status
		// rawStatuses - received from server
		const rawStatuses = enquiryQuery.statuses.slice()
		const coStatusId = rawStatuses.find(s => s.name === 'Выставлено КП').id
		const orderStatusId = rawStatuses.find(s => s.name === 'Заказ').id
		const refusalStatusIds = rawStatuses.filter(s => ['Нет возможности', 'Отказ'].includes(s.name)).map(s => s.id)
		// sort statuses so that refusal statuses are at the end of their stage block
		const statuses = rawStatuses.sort((a, b) => a.stage === b.stage && refusalStatusIds.includes(a.id))
		let stage = 0
		const eventStatusPresentationHelpers = events && events.reduce((res, e, i) => {
			if (!e.status || i === 0) return res = [...res, null]
			if (refusalStatusIds.includes(e.status.id)) return [...res, 'refuse']
			if (e.status.id === orderStatusId) return [...res, 'order']
			res.push(e.status.stage - stage > 0 ? 'up' : 'down')
			stage = e.status.stage
			return res
		}, [])
		return (
			<GlobalContext>
				{({ details, setDetails }) => {
					const { id, editMode } = details
					const isNewEnquiry = id === 'new'
					return (
						<Fragment>
							{ (editMode || isNewEnquiry) &&
								<EnquiryEdit
									id={id}
									enquiry={enquiry}
									setDetails={setDetails}
								/>
							}
							{ !(editMode || isNewEnquiry) && <Fragment>
								<Section>
									<Table><tbody>
										<Tr>
											<Td>Организация</Td>
											<Td>{org && org.name}</Td>
											<Td></Td>
										</Tr>
										<Tr>
											<Td>Изделие</Td>
											<Td>{model && model.name}</Td>
											<Td></Td>
										</Tr>
										<Tr>
											<Td>Кол-во, шт.</Td>
											<Td>{qty}</Td>
											<Td></Td>
										</Tr>
										{ !!coEvents.length &&
											<Tr>
												<Td>КП</Td>
												<Td>
													{coEvents.map(({ doc: { id, dateLocal, amount } }) => (
														<P key={id} 
															fw='normal'
															lh='1.21428571em' >
															<b>{currency(amount)} </b> ( от {dateLocal} )
														</P>
													))}
												</Td>
												<Td></Td>
											</Tr> }
										<Tr>
											<Td>Примечания</Td>
											<EditorTd>
												<WrappedDraftEditor
													key={noteKey}
													borderless
													ref={this.noteEditorRef}
													initFromHtml={htmlNote}
													setEditorDiff={this.setNoteEditorDiff}
													diff={noteEditorDiff}
													onSave={this.saveNote}
												/>
												{noteEditorDiff &&
													<Button
														mt='.67857143em'
														content='Сохранить примечание'
														labelPosition='left'
														icon='save'
														primary
														floated='left'
														onClick={this.saveNote}
														disabled={savingNote}
														loading={savingNote}
													/>
												}
											</EditorTd>
											<Td></Td>
										</Tr>
										<Tr>
											<Td>Статус</Td>
											<InputTd>
												<SDropdown labeled button className='icon'
													loading={changingStatus}
													disabled={changingStatus || statusPending}
													value={curStatus.id}
													text={curStatus.name}
													options={statuses
														.filter(s => (s.id === curStatus.id
																	|| Math.abs(s.stage - curStatus.stage) === 1)
																	&& !(s.stage === 0 && curStatus.stage !== 0))
																	// && !(s.name === 'Выставлено КП'))
														.map(s => ({
															key: s.id,
															text: s.name,
															value: s.id,
															label: { 
																basic: true, 
																content: 'ст', 
																detail: s.stage, 
																icon:   refusalStatusIds.includes(s.id) ? 'minus circle' :
																		s.id === orderStatusId ? 'checkmark' :
																		`long arrow alternate ${(s.stage - curStatus.stage) > 0 ? 'up' : 'down' }`
															}
														}))
													}
													onChange={this.changeStatus} 
													selectOnBlur={false}
													selectOnNavigation={false} >
												</SDropdown>
												<Label basic size='large' content='стадия' detail={ curStatus.stage} />
											</InputTd>
											<Td></Td>
										</Tr>
									</tbody></Table>
								</Section>
								{ activeCO && 
									<EnquiryCommercialOffer 
										id={activeCO} 
										submit={(co) => this.changeStatus(null, { value: coStatusId, co })}
										cancel={this.cancelPendingStatusChange} />}
								<Comments minimal>
									<SHeader as='h3' dividing content='Комментарии и события' />
									{ events.map((e, i) => {
										const { fName, lName } = e.user.person
										const userInitials = (lName ? fName.slice(0,1) : fName.slice(0,2)) + (lName ? lName.slice(0,1) : '')
										return (
											<Comment key={e.id}>
												{ e.type && (e.type !== 'COMMENT') &&
												<CIcon 
													size='big' type={e.type}
													color={ e.type === 'CREATE' ? 'green' : 
															e.type === 'UPDATE' ? 'blue' : 
															e.type === 'STATUS' && eventStatusPresentationHelpers[i] === 'up' ? 'yellow' :
															e.type === 'STATUS' && eventStatusPresentationHelpers[i] === 'down' ? 'brown' :
															e.type === 'STATUS' && eventStatusPresentationHelpers[i] === 'refuse' ? 'red' :
															e.type === 'STATUS' && eventStatusPresentationHelpers[i] === 'order' ? 'green' : 'grey'}
													name ={ e.type === 'CREATE' ? 'plus' : 
															e.type === 'UPDATE' ? 'write square' : 
															e.type === 'STATUS' && eventStatusPresentationHelpers[i] === 'refuse' ? 'minus circle' :
															e.type === 'STATUS' && eventStatusPresentationHelpers[i] === 'order' ? 'checkmark' :
															e.type === 'STATUS' ? `long arrow alternate ${eventStatusPresentationHelpers[i]}` : 'question'} /> }
												<UserLabel 
													size='big' 
													content={userInitials}
													indent={!e.type || e.type === 'COMMENT' ? 1 : 0} />
												{/* <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' /> */}
												<CContent>
													{/* <Comment.Author 
														as='span' 
														content={fName + ' ' + lName} /> */}
													<CMetadata
														content={e.datetimeLocal.slice(0,16)} />
													<CText dangerouslySetInnerHTML={{__html: sanitize(e.htmlText)}} />
													{/* <Comment.Actions
														content={( <a>Reply</a> )} /> */}
												</CContent>
											</Comment>
										)
									})}
									<Form reply error={!!error}>
										<Div m='0 0 1em 6.35em'>
											<WrappedDraftEditor
												ref={this.editorRef} 
												setEditorHasText={this.setEditorHasText}
												onSave={this.createComment}
											/>
										</Div>
										<CMessage
											error
											header='Коммент добавить не удалось..'
											content={error}
										/>
										<Button content='Добавить коммент' labelPosition='left' icon='edit' primary floated='right' 
											onClick={this.createComment}
											disabled={!editorHasText}
											loading={creatingComment}
										/>
									</Form>
								</Comments>
							</Fragment> }
						</Fragment>
					)
				}}
			</GlobalContext>
		)
  }
}

export default compose(
	graphql(updateEnquiry, { name: 'updateEnquiry' }),
	graphql(createEnquiryEvent, { 
		name: 'createEnquiryEvent',
		options: (props) => ({
			update: (cache, {data: reponseData}) => {
				const newEvent = reponseData.createEnquiryEvent
				// @ts-ignore
				const id = `Enquiry:${props.id}`
				const fragment = enquiryFragment
				let data = cache.readFragment({
					id,
					fragment
				})
				data.events.push(newEvent)
				cache.writeFragment({
					id,
					fragment,
					data
				})
				// also update allEnquiries if status changed (for EnquiryTable view update)
				if (! newEvent.status) return
				const query = allEnquiries
				data = cache.readQuery({ query })
				// @ts-ignore
				const enquiry = data.enquiries.find(e => e.id === props.id)
				enquiry.status = newEvent.status
				if (newEvent.doc) enquiry.docs.push(newEvent.doc)
				cache.writeQuery({ query, data })
			},
			// refetchQueries:[ 'allEnquiries' ]
		})
  }),
	graphql(newEnquiry, { name: 'enquiryQuery', skip: (props) => props.id !== 'new' }),
	graphql(enquiryDetails, { name: 'enquiryQuery', skip: (props) => props.id === 'new' })
)(EnquiryDetails)