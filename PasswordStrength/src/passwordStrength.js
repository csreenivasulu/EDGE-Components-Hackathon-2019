import React from 'react'
import './styles.css'

export default function PasswordStrengthMater(props) {
	const pswStrength = meterIndicator(props.value)
	const str = meterColor(pswStrength)
	return (
		<div className="inputField">
			<input
				type="password"
				value={props.value}
				className="inputPassword"
				placeholder={props.placeholder}
				onChange={props.onChangeHandler}
				
			/>
      <div className="meter">
        <div  style={{     backgroundColor: `${str.color}`,
        width:`${str.width}`
          }}
          ></div>
      </div>
			<label className="passwordStrengthLabel"
				  style={{
				  	color: `${str.color}`
				  }}
			>{str.label}</label>
      
		</div>
    
	)
}
const forNumbers = value => {
	return new RegExp(/[0-9]/).test(value)
}

const forSpecialCharecter = value => {
	return (/[!@#$^&*)(+=._-]/.test(value))
}

const forAllChar = value => {
	return  new RegExp(/[a-z]/).test(value) && 
			new RegExp(/[A-Z]/).test(value)
}

const meterColor = count => {
	if(count < 1) return '#ffffff'
	if(count < 3) return {label: 'Very Weak', color: 'red', width:'20%'}
	if(count < 4) return {label: 'Weak', color: 'orange', width:'40%'}
	if(count < 5) return {label: 'Strong', color: '#54ecbb', width:'70%'}
	if(count < 6) return {label: 'Very Strong', color: 'green', width:'100%'}
}

const meterIndicator = value => {
	const matched = []
	if (value.length > 1) matched.push('greaterThan-5')
	if (value.length > 7) matched.push('greaterThan-7')
	if(forNumbers(value)) matched.push('forNumbers')
	if(forAllChar(value)) matched.push('forAllChar')
	if(forSpecialCharecter(value)) matched.push('forSpecialCharecter')
	return matched.length
}