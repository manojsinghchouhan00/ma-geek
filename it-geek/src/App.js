import React, { createContext, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './component/Dashboard';
import Login from './component/Login';
import Statenew from './Statenew';
import QrCode from './qrcode';
import QrTablList from './qrTablList';
import GetBootstarp from './GetBootstarp';

export const userContext = createContext();

export default function App() {

  const [name, setName] = useState("Jay");

  // const handleProps = (data) => {
  //   console.log("Hnadhe props :-", data)
  //   setName(data)
  // }
  return (

    <BrowserRouter>
      <Dashboard />
      <h1>App page name :- {name}  </h1>

      <userContext.Provider value={[name, setName]} >
        <Routes>
          {/* <Route path="/" element={<Home handleProps={handleProps} />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/state" element={<Statenew />} />
          {/* <Route path="/qrapp" element={<QrCode />} /> */}
          {/* <Route path="/qrlist" element={<QrTablList />} /> */}
          <Route path="/boot" element={<GetBootstarp/>} />

        </Routes>
      </userContext.Provider>
    </BrowserRouter>

  )
}

