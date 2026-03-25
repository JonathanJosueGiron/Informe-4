import { Routes, Route } from 'react-router-dom'
import './App.css'

import Feed from './pages/Feed.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import ResetPassword from './pages/ResetPassword.jsx'

function App() {
  const login      = "/login"
  const register   = "/register"
  const resetPassw = "/resetpassword"
  const feed      = "/principal"
  return (
    <Routes>
      <Route path={feed} element={<Feed/>}/>
      <Route path={login} element={<Login/>}/>
      <Route path={register} element={<Register/>}/>
      <Route path={resetPassw} element={<ResetPassword/>}/>

    </Routes>
  )

}

export default App
