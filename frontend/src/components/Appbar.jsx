import React, { useEffect, useState } from 'react'

const Appbar = () => {
    const[userName,setuserName] = useState('');
    useEffect(()=>{
        const username =  localStorage.getItem('name');
        if (username) {
            setuserName(username)
        } else {
            setuserName("Guest")
        }
    },[])
    
return (
    <div className='shadow h-14 flex justify-between'>
        <div className="flex flex-col justify-center font-semibold text-xl h-full ml-4">
            PayTM App
        </div>
        <div className='flex items-center mr-4'>
            <div className="flex flex-col justify-center h-full mr-4">
                Hello
            </div>
            <div className="flex flex-col justify-center bg-slate-400 p-2 w-auto h-auto rounded-lg text-lg text-center">
                {userName}
            </div>
        </div>
    </div>
  )
}

export default Appbar
