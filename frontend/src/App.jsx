import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './app/pages/Home.jsx'
import Signup from './app/pages/Signup.jsx'

function App() {
  return (
    <>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
