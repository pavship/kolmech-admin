import React, { Component, Fragment } from 'react'

import styled from 'styled-components'
import { Header, Form, Message, Button, Divider } from 'semantic-ui-react'
import { Div, A, Label, CardSection } from './styled-semantic/styled-semantic'
import LocalDatePicker from './common/LocalDatePicker'
import CurrencyInput from './common/CurrencyInput'

import { toLocalISOString }from '../utils/dates'

class EnquiryCommercialOffer extends Component {
    constructor(props){
        super(props)
        this.componentIsMounted = true
        this.isNewCO = props.id === 'new'
        const isNewCO = this.isNewCO
        this.state = {
            loading: false,
        }
        // gather original form fields' values on oriCO object
        const oriCO = isNewCO 
            ? {
                dateLocal: toLocalISOString(new Date()).slice(0, 10),
                amount: ''
              } 
            : {
                dateLocal: props.co.dateLocal,
                amount: props.co.amount
              }
        this.fields = Object.keys(oriCO)
        this.requiredFields = ['dateLocal', 'amount']
        // map through form fields and write helper props
        this.fields.forEach(key => {
            this.state[key] = {
                curVal: oriCO[key],
                // err bool controls weather the field is heighlighted with error (red) style
                err: { message: '' },
                ...this.requiredFields.includes(key) && { required: true },
                ...!isNewCO && {
                    oriVal: oriCO[key],
                    diff: false,
                }
            }
        })
        // console.log(this.state)
    }
    setFieldValue = (field, newVal) => {
        console.log('change ', field, ' to value > ', newVal)
        this.setState({
            [field]: {
                ...this.state[field],
                curVal: newVal,
                ...this.isNewCO && { diff: newVal !== this.state[field].oriVal },
                err: { message: '' },
            }
        })
    }
    setFieldError = (field, err) => {
        this.setState({ [field]: { ...this.state[field], err } })
    }
    submit = () => {
        const co = this.fields.reduce((co, f) => {
            co[f] = this.state[f].curVal
            return co
        }, {})
        this.props.submit(co)
    }
    render() {
        const { dateLocal, amount, loading } = this.state
        const { cancel } = this.props
        const requiredIsEmpty = this.requiredFields.some(f => !this.state[f].curVal)
        const diff = this.isNewCO ? null : this.fields.map(f => this.state[f].diff).includes(true)
        const err = this.fields.map(f => this.state[f].err).find(err => err.message) || {}
        return (
            <Fragment>
            <CardSection head secondary >
                <Header>
                    Коммерческое предложение
                </Header>
            </CardSection>
            <CardSection secondary >
                <Form>
                    <Form.Field inline>
                        <Label>Дата</Label>
                        <LocalDatePicker
                            value={dateLocal.curVal}
                            setFormFieldValue={this.setFieldValue}
                            setFormFieldError={this.setFieldError}
                            err={dateLocal.err} />
                    </Form.Field>
                    <Form.Field inline required>
                        <Label>Сумма</Label>
                        <CurrencyInput
                            value={amount.curVal}
                            placeholder='Введите сумму КП' 
                            setFormFieldValue={this.setFieldValue} />
                    </Form.Field>
                </Form>
            </CardSection>
            <CardSection secondary minor>
                <Message
                    error
                    hidden={!err.message}
                    header={err.title}
                    content={err.message} />
                <Div inline w='formLabelWidth' />
                <Button 
                    primary 
                    content={'Создать'}
                    disabled={(!this.isNewCO && !diff) || !!err.message || loading || requiredIsEmpty}
                    loading={loading}
                    onClick={this.submit} />
                <A cancel onClick={cancel}>Отмена</A>
            </CardSection>
            <Divider fitted/>
            </Fragment>
        )
    }
}

export default EnquiryCommercialOffer