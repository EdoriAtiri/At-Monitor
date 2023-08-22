import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './app/pages/Signup.jsx'

function App() {
  return (
    <>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
