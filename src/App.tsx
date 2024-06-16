import { useState } from 'react'
import './App.css'
import Taskbar from './components/Taskbar/Taskbar'
import Background from './components/Background/Background'

function App() {

  const [currentZIndex, setCurrentZIndex] = useState(0)

  return (
    <>
    <Background />
     <Taskbar />
    </>
  )
}

export default App
