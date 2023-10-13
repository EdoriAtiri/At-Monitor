import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getRegistrars, reset } from '../features/Registrars/registrarSlice'

const Registrars = () => {
  // eslint-disable-next-line no-unused-vars
  const { registrars, isSuccess, isLoading } = useSelector(
    (state) => state.registrars
  )
  const [registrarStats, setRegistrarStats] = useState({
    total: '',
    active: '',
    inactive: '',
  })

  const { total, active, inactive } = registrarStats
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset())
      }
    }
  }, [dispatch, isSuccess])

  // Gets Registrars on mount
  useEffect(() => {
    dispatch(getRegistrars())
  }, [dispatch])

  // Creates stats when getRegistrars is successful
  useEffect(() => {
    if (Array.isArray(registrars)) {
      setRegistrarStats({
        total: registrars.length || 0,
        active:
          registrars.filter((registrar) => registrar.isActivated).length || 0,
        inactive:
          registrars.filter((registrar) => !registrar.isActivated).length || 0,
      })
    }
  }, [registrars])

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div className="mx-6 mt-10 mb-6">
      {' '}
      <header className="items-center justify-between flex text-xl font-semibold">
        <h1>Registrars</h1>
        <button
          //   onClick={() => setIsNewEvent(true)}
          className="text-lg border border-gray-700 p-1 rounded-md"
        >
          Add Registrar
        </button>
      </header>{' '}
      {/* Registrar Stats */}
      <div className="flex gap-4 mb-4 mt-8">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Total Registrars</div>
            <div className="stat-value text-2xl">{total}</div>
          </div>

          <div className="stat">
            <div className="stat-title">Active</div>
            <div className="stat-value text-2xl">{active}</div>
          </div>

          <div className="stat">
            <div className="stat-title">Inactive</div>
            <div className="stat-value text-2xl">{inactive}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Registrars
