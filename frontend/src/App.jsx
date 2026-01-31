import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/index'
import Events from './pages/events'
import Login from './pages/login'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
