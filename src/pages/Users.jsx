import React, { useEffect, useState } from 'react'
import './styles.css'
import { useNavigate } from 'react-router-dom'
export default function Users() {
  const navigate=useNavigate()
  const [users,setUsers]=useState(null)
  const fetchUserList= async()=>{
    try {
      const result= await fetch('https://jsonplaceholder.typicode.com/users')
      if(!result.ok){
        console.log('error')
      }
      const data= await result.json()
      setUsers(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
  fetchUserList()
  }, [])
  
  return (
    <div>
      <div className="userlist">
          <h1 className='user--title'>Users List</h1>
           {users?.map((items)=>(
             <div key={items.id} className="users-card" onClick={()=>navigate(`user/${items.id}`,{state:{data:items}})}>
             <p>Name : {items?.name}</p>
             <p>Posts : {users?.length}</p>
           </div>
           ))}
      </div>
    </div>
  )
}
