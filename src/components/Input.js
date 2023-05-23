import React from 'react'

const Input = ({type,placeholder,className,label}) => {
  return (
    <div className='input'>
        <label className="label">{label}</label>
       <input className={className} type={type} placeholder={placeholder} required/>
    </div>
  )
}

export default Input
