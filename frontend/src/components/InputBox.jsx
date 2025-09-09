import React from 'react'

const InputBox = ({label,placeholder,onChange}) => {
  return (
    <div>
      <div className='text-lg font-semibold text-left py-2'>
      {label}
      </div>
      <input onChange={onChange} placeholder={placeholder} className='w-full px-2 py-1 border border-slate-300 rounded-md'>
      </input>
    </div>
  )
}

export default InputBox
