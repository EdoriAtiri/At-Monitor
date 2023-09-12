import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { editEvent } from '../features/Events/eventSlice'

function EventForm({ eventId }) {
  const [eventData, setEventData] = useState({
    eventName: '',
    eventDate: '',
    description: '',
    linkId: '',
  })

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toISOString().split('T')[0] // Extract yyyy-mm-dd
  }

  const dispatch = useDispatch()
  // console.log(eventId)

  const { myEvent, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.myEvents
  )

  //   If editing event data, get the existing data
  useEffect(() => {
    if (myEvent) {
      setEventData({
        eventName: myEvent.eventName || '1',
        eventDate: myEvent.eventDate || '',
        description: myEvent.description || '',
        linkId: myEvent.linkId || '',
      })
    }
  }, [myEvent])

  const { eventName, eventDate, description, linkId } = eventData

  const onChange = (e) => {
    setEventData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const data = {
      ...eventData,
    }
    // console.log(data, eventId)

    dispatch(editEvent({ data, eventId }))
  }

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (isSuccess) {
      console.log('success')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, message, isSuccess])

  if (isLoading) {
    return <div>loading...</div>
  }
  if (isError) {
    return <div>failed...</div>
  }

  return (
    <div className="absolute top-0 left-0  w-screen h-screen">
      <div className="position absolute top-0 left-0 bg-black h-full w-full opacity-30"></div>

      <div className="w-80 bg-white h-fit z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-6 py-6 rounded">
        <form
          onSubmit={onSubmit}
          className="space-y-7 w-full h-full [&>*]:w-full"
        >
          <div className="space-y-4">
            {/*  */}
            <div className="form-group space-y-2">
              <label
                htmlFor="eventName"
                className="text-sm md:text-base lg:text-xl"
              >
                Event Name
              </label>
              <input
                type="text"
                className="form-control"
                id="eventName"
                name="eventName"
                value={eventName}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group space-y-2">
              <label
                htmlFor="eventDate"
                className="text-sm md:text-base lg:text-xl"
              >
                Date
              </label>
              <input
                type="date"
                className="form-control pr-2"
                id="eventDate"
                name="eventDate"
                value={formatDate(eventDate)}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group space-y-2">
              <label
                htmlFor="description"
                className="text-sm md:text-base lg:text-xl"
              >
                Event Name
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={description}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group space-y-2">
              <label
                htmlFor="linkId"
                className="text-sm md:text-base lg:text-xl"
              >
                Event Name
              </label>
              <input
                type="text"
                className="form-control"
                id="linkId"
                name="linkId"
                value={linkId}
                onChange={onChange}
                required
              />
            </div>
          </div>

          <div className="btn mt-36">
            <button className="form-control grid place-content-center active:scale-95 transition-transform font-bold text-white bg-black">
              Edit
            </button>
          </div>
        </form>{' '}
      </div>
    </div>
  )
}

EventForm.propTypes = {
  eventId: PropTypes.string,
  type: PropTypes.string,
}

EventForm.defaultProps = {
  eventId: 'eventId',
  type: 'Edit',
}

export default EventForm
