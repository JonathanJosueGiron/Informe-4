import { Routes, Route } from 'react-router-dom'
import './App.css'

import Feed from './pages/Feed.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import Comments from './pages/Comments.jsx'
import CreateComment from './pages/CreateComment.jsx'
import CreatePost from './pages/CreatePost.jsx'

function App() {
  const login      = "/login"
  const register   = "/register"
  const resetPassw = "/resetpassword"
  const feed       = "/feed"
  const comments   = "/comments/:id"
  const createPost = "/postcreate"
  const filter     = "/filter"
  return (
    <Routes>
      <Route path={feed} element={<Feed/>}/>

      <Route path={login} element={<Login/>}/>
      <Route path={register} element={<Register/>}/>
      <Route path={resetPassw} element={<ResetPassword/>}/>
      <Route path={feed+comments} element={<Comments/>}/>
      <Route path={feed+comments+"/post"} element={<CreateComment/>}/>

      <Route path={createPost} element={<CreatePost/>}/>
      <Route path={filter} element={<Feed/>}/>

    </Routes>
  )

}

export default App
