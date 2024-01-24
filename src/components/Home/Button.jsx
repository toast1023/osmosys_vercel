import React from 'react'

const Button = ({styles}) => {
	return (
		<button type="button" onClick ={event =>  window.location.href='https://discord.com/oauth2/authorize?client_id=1152436728125206628&permissions=21983791152192&scope=bot'} className={`py-4 px-6 bg-blue-gradient font-poppins font-medium text-[18px] text-primary outline-none ${styles} hover:scale-110`}>
			Try Free!
		</button>
	)
}

export default Button