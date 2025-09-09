import React from 'react'

const Button = ({label,onPress}) => {
  return (
    <div onClick={onPress} className='bg-black text-white w-full py-2 text-center rounded-md coursor-pointer hover:opacity-70'>
      {label}
    </div>
  )
}

export default Button
