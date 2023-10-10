const Registrars = () => {
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
            <div className="stat-value text-2xl">{}</div>
          </div>

          <div className="stat">
            <div className="stat-title">Active</div>
            <div className="stat-value text-2xl">{}</div>
          </div>

          <div className="stat">
            <div className="stat-title">Inactive</div>
            <div className="stat-value text-2xl">{}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Registrars
