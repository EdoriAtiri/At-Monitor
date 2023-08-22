import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signup, reset } from '../features/Auth/authSlice'

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
  })

  const { firstName, lastName, email, password, password2 } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { admin, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    // Redirect when logged in
    if (isSuccess || admin) {
      // navigate('/')
      console.log('success')
    }

    dispatch(reset())
  }, [isError, message, isSuccess, admin, navigate])

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      console.log('passwords do not match')
    } else {
      const data = {
        firstName,
        lastName,
        email,
        password,
      }

      dispatch(signup(data))
    }
  }

  if (isLoading) {
    return <div>loading</div>
  }

  return (
    <div className="w-full px-6">
      <h2>Administrator Signup</h2>
      <p>Hey, Enter your details to signup for an account</p>

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={onChange}
            placeholder="Enter your first name"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={onChange}
            placeholder="Enter your last name"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Enter your email address"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Enter password"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            id="password2"
            name="password2"
            value={password2}
            onChange={onChange}
            placeholder="Confirm password"
            required
          />
        </div>

        <div>
          <button>submit</button>
        </div>
      </form>
    </div>
  )
}

export default Signup
