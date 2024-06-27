
import './App.css'
import {Outlet} from 'react-router-dom'

function App() {
  
  return (
    <div className='p-4 h-screen flex justify-center items-center'>
        <main>
          <Outlet />
        </main>
    </div>
      
  )
}

export default App
