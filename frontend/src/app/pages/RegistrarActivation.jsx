import { getRegForActivation } from '../features/Registrars/registrarSlice'

const RegistrarActivation = () => {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600">
        <div className="text-center flex justify-center items-center gap-2">
          <div className="font-bold text-2xl">
            <span className="text-3xl">A</span>
            <span className="-ml-2">M</span>
          </div>{' '}
          <div className="space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold s">Sign up</h3>
          </div>
        </div>
        <p className="text-center text-xl">Complete Your Registration</p>
        <form onSubmit={(e) => e.preventDefault()} className="mt-8 space-y-5">
          <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              disabled
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Password</label>
            <input
              type="password"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
            Create account
          </button>
        </form>
      </div>
    </main>
  )
}

export default RegistrarActivation
