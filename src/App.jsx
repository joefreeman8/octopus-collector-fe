import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './components/common/Home'
import OctopusIndex from './components/octopus/OctopusIndex'

function App() {

  return (
    // <div data-theme="aqua" className='h-full'>
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/octopus' element={<OctopusIndex />} />
      </Routes>
    </Router>
    // </div >
  )
}

export default App
