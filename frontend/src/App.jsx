import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './app/pages/Home.jsx'
import Signup from './app/pages/Signup.jsx'
import Login from './app/pages/Login.jsx'

function App() {
  return (
    <>
      <Router>
        <div className="w-full min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
