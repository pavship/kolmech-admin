import { conformToMask } from 'react-text-mask'

export const formatTel = ({ number, country }) => {
	return country === 'rus'
		? '+7 ' + conformToMask(
				number,
				['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/],
				{guide: false}
			).conformedValue
		: '+ ' + number
}

export const currency = (num, trailing) => {
	let curNum = (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ').replace(/\./, ',')
	if (!trailing) curNum = curNum.slice(0,-3)
	return curNum + ' ₽'
}
export const isNaN = Number.isNaN || function(value) {
	return value !== value;
}
