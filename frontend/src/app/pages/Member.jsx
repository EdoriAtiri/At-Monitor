const Member = () => {
  return (
    <div>
      <table className="flex w-full lg:w-96 justify-between border border-gray-700 py-2 px-4 lg:p-4 rounded-md">
        <thead>
          <tr className="font-bold flex gap-2 flex-col text-left ">
            <th>Full Name:</th>
            <th>Gender:</th>
            <th>Category:</th>
            <th>Membership Status:</th>
          </tr>
        </thead>
        <tbody>
          <tr className="flex gap-2 flex-col text-right">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Member
