import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>ACM Catalog</h1>
        <p>Andres Wrote this</p>
      </div>
    </>
  )
}

export default App
