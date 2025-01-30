import React from 'react'
import Mainprofile from './Mainprofile'
import { useUserAuth } from '../../context/userauth'

function Profiles() {
  // const user = {
  //   displayName: 'Coderado',
  //   email: 'Coderado@gmail.com',
  // }
  const {logout,user} = useUserAuth()
  return (
    <>
    <Mainprofile user={user}/>
    </>
  )
}

export default Profiles