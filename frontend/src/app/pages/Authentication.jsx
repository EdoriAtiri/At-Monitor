import { useState } from 'react'
import Register from '../components/Register'
import Login from '../components/Login'

function Authentication() {
  // eslint-disable-next-line no-unused-vars
  const [loginOrRegister, setLoginOrRegister] = useState('register')

  if (loginOrRegister === 'login') {
    return <Login />
  }
  if (loginOrRegister === 'register') {
    return <Register />
  }
}

export default Authentication
