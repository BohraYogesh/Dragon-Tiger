import React from 'react'
import DreagonTiger from './DragonTiger/DragonTiger'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import Home from './Home/Home'

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="dragon" element={<DreagonTiger />} />
      </Route>
    </Routes>
  </BrowserRouter>
  )
}
