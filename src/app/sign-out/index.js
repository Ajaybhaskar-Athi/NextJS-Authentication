'use client'

import { Button } from '@/components/ui/button';
import { logoutAction } from '@/server-actions'
// import { useRouter } from 'next/navigation';
import React from 'react'

const SignOut=async () => {
    const handleLogout=async()=>{
      await logoutAction();
    }
  return (
    <div>
      <Button onClick={handleLogout}>Log Out</Button>
      {/* <h1>Succesfully logged out </h1> */}
    </div>
  )
}

export default SignOut
