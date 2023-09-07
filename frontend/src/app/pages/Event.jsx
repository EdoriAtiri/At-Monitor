import formatDate from '../lib/formatDate'

function Event() {
  return (
    <div className=" mx-6 mt-10 mb-6">
      <h1 className="text-3xl mb-5">Event Name</h1>
      {/* Table for creator and date */}
      <div className="flex ">
        <table className="flex flex-col mb-6 w-full lg:w-96 justify-between relative">
          <tr className="font-bold flex [&>*]:w-28 [&>*]:text-left">
            <th>Created By</th>
            <th>Event Date</th>
          </tr>
          <div className="w-[1px] h-full bg-slate-700 absolute left-24"></div>
          <tr className="flex [&>*]:w-28">
            <td>admin</td>
            <td>{formatDate(2 / 12 / 2030)}</td>
          </tr>
        </table>{' '}
        {/* Actions */}
        <div className="flex items-start gap-3">
          <button className="text-lg border border-gray-700 p-1 rounded-md">
            Edit
          </button>
          <button className="text-lg border border-gray-700 p-1 rounded-md">
            Delete
          </button>
        </div>
      </div>
      {/* Table for description and link */}
      <table className="flex w-full lg:w-96 justify-between ">
        <tr className="font-bold flex gap-2 flex-col [&>*]:h-12 [&>*]:min-h-fit [&>*]:w-24 [&>*]:text-left">
          <th>Description</th>
          <th>Link</th>
        </tr>
        <tr className="flex gap-2 flex-col">
          <td>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos,
            impedit.
          </td>
          <td>t.co/iriwfoifowfj</td>
        </tr>
      </table>{' '}
    </div>
  )
}

export default Event
