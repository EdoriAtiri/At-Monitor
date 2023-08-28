import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signup, reset } from '../features/Auth/authSlice'
import Logo from '../components/Logo'

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
    <div className="w-full min-h-screen flex flex-row">
      <div className="w-1/2 py-10 flex gap-6 flex-col justify-center items-center">
        <Logo />

        <div className="text-left space-y-1 w-3/4 lg:w-1/2 [&>*]:w-full">
          <h2 className="text-2xl tracking-tight lg:text-3xl font-bold">
            Lets create your account
          </h2>
          <p className="text-sm opacity-80">
            Signing up for AT Monitor is fast and 100% free
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="space-y-7 w-3/4 lg:w-1/2 [&>*]:w-full"
        >
          <div className="space-y-4">
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
          </div>

          <div className="btn mt-36">
            <button className="form-control grid place-content-center active:scale-95 transition-transform font-bold text-white bg-black">
              Continue
            </button>
          </div>
        </form>

        <span className="text-sm text">
          Already have an account?{' '}
          <span className="text-blue-600 font-bold">
            <Link to="/login">Login</Link>
          </span>
        </span>
      </div>

      <div className="w-1/2 py-10 px-10 flex flex-col relative">
        <ul className="text-sm h-fit py-4 xl:text-base flex flex-row gap-6 justify-end w-full">
          <li className="nav">About</li>
          <li className="nav">Contact</li>
        </ul>
        <div className="font-bold text-7xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="text-8xl xl">A</span>
          <span className="-ml-4">M</span>
        </div>
      </div>
    </div>
  )
}

export default Signup
