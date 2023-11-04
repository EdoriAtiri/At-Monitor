import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { getRegistrars, reset } from '../features/Registrars/registrarSlice'
import RegistrarCard from '../components/RegistrarCard'
import Loading from '../components/Loading'
import NewRegistrar from '../components/NewRegistrar'
import sortByProperty from '../lib/sortByProperty'

const SORT_VALUES = ['date created', 'name', 'status']

const Registrars = () => {
  const [defaultRegistrars, setDefaultRegistrars] = useState([])
  // const [sortValue, setSortValue] = useState('date created')
  const [isForm, setIsForm] = useState(false)
  // Search Params
  const [searchParams, setSearchParams] = useSearchParams({
    activeOnly: false,
    q: '',
    sortBy: '',
  })
  const q = searchParams.get('q')
  const activeOnly = searchParams.get('activeOnly') === 'true'
  // Search Params
  const sortBy = searchParams.get('sortBy')
  // useSearchParams stores values as string, so for booleans and numbers check that you have the val you want

  const { registrars, isSuccess, isLoading } = useSelector(
    (state) => state.registrars
  )
  const [registrarStats, setRegistrarStats] = useState({
    total: '',
    active: '',
    inactive: '',
  })
  // const { isAddRegistrar, setIsAddRegistrar } = useState(false)
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

  // update default registrars
  useEffect(() => {
    if (registrars) {
      setDefaultRegistrars(registrars)
    }
  }, [registrars])

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

  // filter by query or activeOnly or query and activeOnly
  useEffect(() => {
    const filteredRegistrars =
      registrars?.filter((item) => {
        // Check if the item's name includes the provided name (case-insensitive)
        const nameMatch = item?.fullName
          ?.toLowerCase()
          .includes(q?.toLowerCase())

        // Check if the item's activation status matches the provided isActive value
        const activationMatch = activeOnly
          ? item.isActivated
          : item.isActivated || !item.isActivated

        // Return true if both conditions are met
        return nameMatch && activationMatch
      }) ?? []

    setDefaultRegistrars(filteredRegistrars)
  }, [activeOnly, q, registrars])

  // Sort registrars by
  // useEffect(() => {
  //   let sortProperty

  //   if (sortBy === 'name') sortProperty = 'fullName'
  //   if (sortBy === 'status') sortProperty = 'isActivated'
  //   if (sortBy === 'date created') sortProperty = 'createdAt'

  //   // For sort to work defaultRegistrars must be an array
  //   const sortedRegistrars = [...defaultRegistrars]
  //   sortedRegistrars.sort(sortByProperty(sortProperty))
  //   // SortbyProperty returns inactive registrars first, the reverse method flips that
  //   if (sortProperty === 'isActivated') sortedRegistrars.reverse()
  //   setDefaultRegistrars(sortedRegistrars)
  // }, [sortBy])

  // Loading Screen
  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="mx-6 mt-10 mb-6">
      {' '}
      {isForm && <NewRegistrar closeForm={() => setIsForm(false)} />}
      <header className="items-center justify-between flex text-xl font-semibold">
        <h1>Registrars</h1>
        <button
          onClick={() => setIsForm(true)}
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
      {/* Sorting and Filtering */}
      <div className="flex">
        <div>
          <label htmlFor="q">search by name</label>
          <input
            className="input input-bordered w-full max-w-xs"
            type="text"
            id="q"
            value={q}
            onChange={(e) =>
              setSearchParams(
                (prev) => {
                  prev.set('q', e.target.value)

                  return prev
                },
                { replace: true }
              )
            }
          />
        </div>
        <div className="flex items-center gap-1">
          <label className="text-xs" htmlFor="activeOnly">
            Active Registrars Only
          </label>{' '}
          <input
            type="checkbox"
            id="activeOnly"
            checked={activeOnly}
            onChange={(e) =>
              setSearchParams(
                (prev) => {
                  prev.set('activeOnly', e.target.checked)

                  return prev
                },
                { replace: true }
              )
            }
          />
        </div>
      </div>
      {/*  */}
      <div className="dropdown dropdown-end">
        <label htmlFor="sort" className="">
          Sort by:
        </label>

        <select
          className="capitalize"
          name="sort"
          id="sort"
          onChange={(e) =>
            setSearchParams(
              (prev) => {
                prev.set('sortBy', e.target.value)

                return prev
              },
              { replace: true }
            )
          }
        >
          {SORT_VALUES.map((value, index) => (
            <option
              selected={sortBy === value}
              className="capitalize"
              key={index}
              value={value}
            >
              {value}
            </option>
          ))}{' '}
        </select>
      </div>
      {/* Registrars */}
      <section className="w-full flex flex-col mt-8 gap-8">
        {Array.isArray(defaultRegistrars) ? (
          defaultRegistrars.map((registrar) => (
            <RegistrarCard
              name={registrar.fullName}
              createdAt={registrar.createdAt}
              status={registrar.isActivated}
              key={registrar._id}
              id={registrar._id}
            />
          ))
        ) : (
          <p>An error occurred while loading registars</p>
        )}
      </section>
    </div>
  )
}

export default Registrars
