import React, { useState } from 'react'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import ButtonWarning from '../components/ButtonWarning'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [userName, setuserName] = useState('');
  const navigate = useNavigate();
  const [password,setPassword] = useState('');
  return (
      <div className='bg-slate-300 h-screen flex justify-center'>
      <div className='flex flex-col justify-center'>
        <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
          <Heading label={"Login"}/>
          <SubHeading label={"Enter your credential to access account"} />
          <InputBox onChange={e =>{
              setuserName(e.target.value)
          }}placeholder="naveenshukla.com" label={"User Name"}/>
          <InputBox onChange={e =>{
              setPassword(e.target.value)
          }}placeholder="123456f" label={"Password"}/>
          <div className='pt-4'>
            <Button onPress={async ()=>{
                const res =  await axios.post("http://localhost:3000/api/v1/user/login",{
                  userName,
                  password
                })
                localStorage.setItem('token',res.data.token)
                localStorage.setItem("name",res.data.users.firstName)
                navigate('/dashboard')
            }} label={'login'}/>
          </div>
          <ButtonWarning label={'I dont have an account ?'} buttonText={'signup'} to={'/'} />
        </div>
      </div>
    </div>
  )
}

export default Login
