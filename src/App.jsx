import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './components/common/Home'
import OctopusIndex from './components/octopus/OctopusIndex'
import OctopusShow from './components/octopus/OctopusShow'

function App() {

  const bubbles = [
    'bubble--1',
    'bubble--2',
    'bubble--3',
    'bubble--4',
    'bubble--5',
    'bubble--6',
    'bubble--7',
    'bubble--8',
    'bubble--9',
    'bubble--10',
    'bubble--11',
    'bubble--12'
  ]

  return (
    <div data-theme="aqua" className='bg-custom-gradient'>
      {/* Generate Bubbles on background */}
      {bubbles.map((bubbleClass, idx) => (
        <div key={idx} className={`bubble ${bubbleClass}`}></div>
      ))}


      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/octopus/:id' element={<OctopusShow />} />
          <Route path='/octopus' element={<OctopusIndex />} />
        </Routes>
      </Router>

    </div>
  )
}

export default App
