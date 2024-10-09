import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/Home/HomePage'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'

function App() {

  return (
    <BrowserRouter >
      <Routes>
        <Route path='/' element={<HomePage />} >
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
