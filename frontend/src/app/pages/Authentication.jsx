import { useState } from 'react'
import Signup from '../components/Signup'
import Login from '../components/Login'

function Authentication() {
  // eslint-disable-next-line no-unused-vars
  const [loginOrSignup, setLoginOrSignup] = useState('signup')

  return (
    <div className="w-full sm:min-h-screen grid place-content-center">
      <div className="w-72 h-96 bg-blue-500 rounded-lg ">
        {loginOrSignup === 'login' ? <Login /> : <Signup />}
      </div>
    </div>
  )
}

export default Authentication
