import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Button from '../components/Button';
import axios from 'axios';

const SendMoney = () => {
    const[amount,setAmount] = useState();
    const[searchParam] = useSearchParams();
    const id = searchParam.get("id");
    const name = searchParam.get('name');
    return (
    <div className='flex justify-center h-screen bg-gray-100'>
        <div className='h-full flex flex-col justify-center'>
            <div className='h-min text-card-foreground bg-white shadow-lg rounded-lg'>
                <div className=''>
                    <h2 className='text-3xl font-bold text-center'>Send Money</h2>
                </div>
                <div className='p-6'>
                <div className='flex items-center space-x-4'>
                    <div className='flex items-center space-x-4'>
                        <div className='w-12 h-12 rounded-full bg-green-500 flex items-center justify-center'>
                            <span className='text-2xl font-white'>{name[0].toUpperCase()}</span>
                        </div>
                        <h3 className='text-2xl text-black'> {name} </h3>
                    </div>
                </div>
                <div className='space-y-4'>
                    <div className='p-4'>
                    <input label={'Amount'} placeholder={'Enter Amount'} onChange={(e)=>{
                        setAmount(e.target.value);
                    }}/>
                    </div>
                    <Button label={'Send Money'} onPress={()=>{
                        axios.post("http://localhost:3000/api/v1/account/transfer",{
                            to:id,
                            amount
                        },{
                            headers:{
                                token:localStorage.getItem('token')
                            }
                        })
                    }}/>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SendMoney
