import React, { useEffect, useState } from 'react'
import Appbar from '../components/Appbar'
import User from '../components/User'
import axios from 'axios';

const Dashboard = () => {
  const[balance,setBalance]= useState('');
  useEffect(()=>{
    const fetch =  async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/v1/account/balance',{
      headers:{
          token:localStorage.getItem('token')
        }
      }) 
    setBalance(res.data.balance);
    } catch (error) {
      console.log(error);
    }
  }
  fetch();
  },[])
  return (
    <div>
      <Appbar />
      <div className='text-3xl font-bold text-center mt-10'>
        Your Balance is : ₹{ balance }
      </div>
      <User />
    </div>
  )
}

export default Dashboard
