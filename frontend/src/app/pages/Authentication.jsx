import { useState } from 'react'
import Signup from '../components/Signup'
import Login from '../components/Login'

function Authentication() {
  // eslint-disable-next-line no-unused-vars
  const [loginOrSignup, setLoginOrSignup] = useState('signup')

  if (loginOrSignup === 'login') {
    return <Login />
  }
  if (loginOrSignup === 'signup') {
    return <Signup />
  }
}

export default Authentication
