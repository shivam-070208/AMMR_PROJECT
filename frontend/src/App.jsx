import { useState } from 'react';
import './App.css'
import Navbar from './components/Navbar'
import { motion } from 'motion/react';
import { Route, Routes } from 'react-router-dom';
import Add from './components/Add';
import View from './components/View';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className='max-w-screen overflow-x-hidden '>
         <motion.div animate={{ width:darkMode?'200%':'0%', height:darkMode?'200%':'0%' }} transition={{duration:0.3}} className="div rounded-full bg-black fixed -top-60 -left-60 -z-1" />
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className='w-screen p-2'>
        
     <Routes>
      <Route path='/' element={<View />} />
       <Route path='/add' element={<Add />} />
     </Routes>
      </div>
    </div>
  )
}

export default App;
