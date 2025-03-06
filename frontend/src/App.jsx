//import new
import { Box, useColorModeValue } from "@chakra-ui/react";


import { Route, Routes, } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import { Button } from '@chakra-ui/react';

//new updates
import Navbar from './components/ui/dashboard/Navbar'; 


function App() {
  return (
    <>
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      {/* Add more routes as needed */}
      <Route path="*" element={<div></div>} />
    </Routes>
 
    </>
    
  );
}

export default App;