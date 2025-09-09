import React from 'react'
import { Link } from 'react-router-dom'

const ButtonWarning = ({label,buttonText,to}) => {
  return (
    <div className='py-2 cursor-pointer'>
      {label}
      <Link className='text-blue-600 hover:underline' to = {to}> 
        {buttonText}
      </Link>
    </div>
  )
}

export default ButtonWarning
