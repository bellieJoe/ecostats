import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/Home/HomePage'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import MainPage from './pages/MainPage/MainPage'
import Users from './pages/MainPage/Users/Users'
import Dashboard from './pages/MainPage/Dashboard/Dashboard'
import ErrorPage from './pages/ErrorPage/ErrorPage'
import { useEffect } from 'react'
import { getRoles } from './services/api/roleApi'
import { Role } from './types/Role'
import { useRoleStore } from './stores/useRoleStore'

function App() {
  const {clearRoles, setRoles} = useRoleStore()
  
  useEffect(() => {
    try {
      getRoles()
      .then((roles:Role[]) => {
        clearRoles()
        setRoles(roles)
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <BrowserRouter >
      <Routes>

        <Route path='/' element={<HomePage />} >
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>

          <Route path='/app' element={<MainPage />} >
              <Route path='users' element={<Users />} />
              <Route path='' element={<Dashboard />} />
          </Route>

        {/* Error Pages */}
        <Route path="/error/401" element={<ErrorPage code={401} message="Unauthorized Access" />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
