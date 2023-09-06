function Event() {
  return (
    <div className=" mx-6 mt-10 mb-6">
      <h1>Event Name</h1>
      {/* Table for creator and date */}
      <div className="flex ">
        <table className="flex flex-col mb-6 w-full lg:w-96 justify-between  ">
          <tr className="font-bold flex [&>*]:w-32 [&>*]:text-left">
            <th>Created By</th>
            <th>Event Date</th>
          </tr>
          <tr className="flex [&>*]:w-32">
            <td>admin</td>
            <td>0/0/0</td>
          </tr>
        </table>{' '}
        <div className="flex items-start">
          <button>Edit</button>
          <button>Delete</button>
        </div>
      </div>
      {/* Table for description and link */}
      <table className="flex w-full lg:w-96 justify-between">
        <tr className="font-bold flex gap-2 flex-col [&>*]:text-left">
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
