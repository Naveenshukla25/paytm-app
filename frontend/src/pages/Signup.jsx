import React, { useState } from 'react'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import ButtonWarning from '../components/ButtonWarning'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate();
  const [userName, setuserName] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='bg-slate-300 h-screen flex justify-center'>
      <div className='flex flex-col justify-center'>
        <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
          <Heading label={"Sign up"}/>
          <SubHeading label={"Enter your credential to access account"} />
          <InputBox onChange={(e) => { 
              setuserName(e.target.value)
          }}placeholder="naveenshukla.com" label={"User Name"}/>
          <InputBox onChange={(e) => { 
              setfirstName(e.target.value)
          }}placeholder="naveen" label={"First Name"}/>
          <InputBox onChange={(e) => { 
              setlastName(e.target.value)
          }}placeholder="shukla" label={"Last Name"}/>
          <InputBox onChange={(e) => { 
              setPassword(e.target.value)
          }}placeholder="password" label={"Password"}/>
          
          <div className='pt-4'>
            <Button onPress= {async ()=>{
              const res = await axios.post("http://localhost:3000/api/v1/user/signup",{
                userName,
                firstName,
                lastName,
                password
              })
              localStorage.setItem('token', res.data.token)
              navigate('/login')
            }}label={'Sign up'}/>
          </div>

          <ButtonWarning label={'Already have an account ?'} buttonText={'login'} to={'/login'} />
        </div>
      </div>
    </div>
  )
}

export default Signup
