import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Authentication from './app/pages/Authentication.jsx'

function App() {
  return (
    <>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/authentication" element={<Authentication />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
