import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Admin from '../Admin'
import Client from '../Client'

export default function () {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Client />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}

