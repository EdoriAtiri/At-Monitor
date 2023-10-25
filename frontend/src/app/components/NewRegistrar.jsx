import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
// import { createEvent } from '../features/Events/eventSlice'

function NewRegistrar({ closeForm }) {
  const [registrarData, setRegistrarData] = useState({
    fullName: '',
    email: '',
  })

  const { isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.myEvents
  )

  const dispatch = useDispatch()

  const { fullName, email } = registrarData

  const onChange = (e) => {
    setRegistrarData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  // Submit registrar data
  const onSubmit = (e) => {
    e.preventDefault()

    // const data = {
    //   ...registrarData,
    // }
    // dispatch(createEvent(data))
    closeForm()
  }

  // Convert to error and success pop ups
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      console.log('success')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, message])

  if (isLoading) {
    return <div>loading...</div>
  }

  return (
    <div className="absolute top-0 left-0  w-screen h-screen">
      <button
        onClick={closeForm}
        className="position absolute top-0 left-0 bg-black h-full w-full opacity-30"
      ></button>

      <div className="w-80 bg-white h-fit z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-6 py-6 rounded">
        <button
          onClick={closeForm}
          className="text-lg p-1 uppercase font-bold absolute right-0 pr-2 top-0"
        >
          x
        </button>
        <form
          onSubmit={onSubmit}
          className="space-y-7 w-full h-full [&>*]:w-full"
        >
          <div className="space-y-4">
            {/*  */}
            <div className="space-y-2">
              <label
                htmlFor="fullName"
                className="text-sm md:text-base lg:text-xl"
              >
                Full Name
              </label>
              <input
                type="text"
                className="form-input-style"
                id="fullName"
                name="fullName"
                value={fullName}
                onChange={onChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm md:text-base lg:text-xl"
              >
                Email{' '}
              </label>
              <input
                type="text"
                className="form-input-style"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
                required
              />
            </div>
          </div>

          <div className="btn mt-36">
            <button className="form-input-style grid place-content-center active:scale-95 transition-transform font-bold text-white bg-black">
              Create Registrar
            </button>
          </div>
        </form>{' '}
      </div>
    </div>
  )
}

NewRegistrar.propTypes = {
  closeForm: PropTypes.func,
}

export default NewRegistrar
