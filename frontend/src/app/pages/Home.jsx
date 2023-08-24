import Button from '../components/Button'

function Home() {
  return (
    <div className="w-100 flex flex-row ">
      <div className="w-1/2 py-10 space-y-32">
        <div className="font-bold text-2xl ml-10">
          <span className="text-3xl">A</span>
          <span className="-ml-2">M</span>
        </div>
        <div className="px-10 xl:px-20 m-auto space-y-6">
          <h1 className="font-bold text-4xl lg:text-6xl">
            Track Event Attendance{' '}
          </h1>
          <p className="text-sm lg:text-lg">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur ad
            provident, deleniti ipsum molestias illo aut!
          </p>
          <div className="flex flex-row space-x-4 lg:space-x-6 xl:space-x-8">
            <Button text="Sign Up" />
            <Button text="Login" />
          </div>
        </div>
      </div>

      <div className="w-1/2">
        <ul>
          <li>About</li>
        </ul>
      </div>
    </div>
  )
}

export default Home
