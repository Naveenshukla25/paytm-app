import React, { useEffect, useState } from 'react'
import InputBox from './InputBox'
import axios from 'axios'
import Button from './Button'
import { useNavigate } from 'react-router-dom'

const Users = () => {
  const [users,setUser] = useState([])
  const [filter,setFilter] = useState('')
  const handleFilterChange = async(e)=>{
    const newFilter = e.target.value;
    setFilter(newFilter)
    const res = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${newFilter}`)
    setUser(res.data.user);
  }
  return (
    <div className='w-300 m-auto'>
        <InputBox label={'Users'} placeholder={'Search Users.....'} onChange={handleFilterChange} />
        <div>
          {users.map(user => <User user={user}/>)}
        </div>
    </div>
  )
}

const User = ({user}) => {
    const navigate = useNavigate();
  return (
      <div className='flex mt-2 justify-between '>
          <div className='flex justify-center'>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center">
              <div className="flex flex-col justify-center h-full text-center">
                {user.firstName[0]}
              </div>
            </div>
            <div className='flex flex-col justify-center ml-4'>
              {user.firstName} {user.lastName}
            </div>
          </div>
            <div className='w-32'>
              <Button onPress={(e)=>{
                  navigate("/send?id="+user._id+"&name="+user.firstName);
              }} label={'Send Money'}/>
            </div>
      </div>
  )
}

export default Users
