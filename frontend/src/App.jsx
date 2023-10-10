import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './app/pages/Home.jsx'
import Signup from './app/pages/Signup.jsx'
import Login from './app/pages/Login.jsx'
import Dashboard from './app/pages/Dashboard.jsx'
import PrivateRoute from './app/components/PrivateRoute.jsx'
import Events from './app/pages/Events.jsx'
import Event from './app/pages/Event.jsx'
import Profile from './app/pages/Profile.jsx'
import Registrars from './app/pages/Registrars.jsx'

function App() {
  return (
    <>
      <ToastContainer />

      <Router>
        <div className="w-full min-h-screen">
          <Routes>
            {/* <Route path="/" element={<PrivateRoute />}>
            </Route> */}
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />}>
                <Route path="profile" element={<Profile />} />
                <Route path="registrars" element={<Registrars />} />
                <Route path="events" element={<Events />} />
                <Route path="events/:eventId" element={<Event />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
