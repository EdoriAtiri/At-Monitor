import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './app/pages/Login.jsx'

function App() {
  return (
    <>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
