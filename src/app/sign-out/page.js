'use server'

import { logoutAction } from '@/server-actions'
import React from 'react'

const SignOut=async () => {
    await logoutAction();
  return (
    <div>
      <h1>Succesfully logged out </h1>
    </div>
  )
}

export default SignOut
