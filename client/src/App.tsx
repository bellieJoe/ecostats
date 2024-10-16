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
import Programs from './pages/MainPage/Programs/Programs'
import LandTOC from './pages/MainPage/Forms/Land/LandTOC'
import Land_1 from './pages/MainPage/Forms/Land/Land_1'
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS for the grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional theme
import Land_2 from './pages/MainPage/Forms/Land/Land_2'
import Land_3 from './pages/MainPage/Forms/Land/Land_3'
import Land_4 from './pages/MainPage/Forms/Land/Land_4'
import Land_6 from './pages/MainPage/Forms/Land/Land_6'
import Land_5 from './pages/MainPage/Forms/Land/Land_5'
import Land_7 from './pages/MainPage/Forms/Land/Land_7'

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
                <Route path='' element={<Dashboard />} />
                <Route path='users' element={<Users />} />
                <Route path='programs' element={<Programs />} />

                <Route path="land" >
                  <Route path='toc' element={<LandTOC />} />
                  <Route path='land_1' element={<Land_1 />} />
                  <Route path='land_2' element={<Land_2 />} />
                  <Route path='land_3' element={<Land_3 />} />
                  <Route path='land_4' element={<Land_4 />} />
                  <Route path='land_5' element={<Land_5 />} />
                  <Route path='land_6' element={<Land_6 />} />
                  <Route path='land_7' element={<Land_7 />} />
                </Route>
            </Route>

          {/* Error Pages */}
          <Route path="/error/401" element={<ErrorPage code={401} message="Unauthorized Access" />} />



        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
