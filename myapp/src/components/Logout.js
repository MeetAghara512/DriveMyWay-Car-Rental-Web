import React, { useContext } from 'react'
import { AppContext } from '../Context/AppContext'

export default function Logout() {

  const {resetState}=useContext(AppContext);

  const handleLogout=()=>{
    resetState();
  }
  return (
    <div>
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}
