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
import { getUserById, isAuthenticated } from './services/api/userApi'
import { useAuthStore } from './stores/useAuthStore'
import { jwtDecode } from 'jwt-decode'
import Cookies from "js-cookie"
import { ConfigProvider, message } from 'antd'
import axios from 'axios'

axios.defaults.withCredentials = true;

function App() {
  const {clearRoles, setRoles} = useRoleStore();
  const {setUser, accessToken} = useAuthStore();


  const configTheme = {
    "token": {
      "colorPrimary": "#41a61d",
      "colorInfo": "#41a61d"
    }
  }
  
  const initRoles = () => {
    try {
      getRoles()
      .then((roles:Role[]) => {
        clearRoles()
        setRoles(roles)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const initUser = () => {
    try {
      isAuthenticated().then(_isAuth => {
        if(_isAuth){
          // fetch user
          const decoded = jwtDecode<any>(Cookies.get("accessToken"))
          const id = decoded.id
          getUserById(id).then(res => {
            setUser(res.data)
          });
        }
        else{
          setUser(null);
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    initUser();
  }, [accessToken])

  useEffect(() => {
    initRoles();
  }, [])

  return (
    <ConfigProvider
      theme={configTheme}>
      <BrowserRouter >
        <Routes >

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
    </ConfigProvider>
  )
}

export default App
