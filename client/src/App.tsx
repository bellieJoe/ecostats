import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/Home/HomePage'
import Login from './pages/Home/Login/Login'
import SignUp from './pages/Home/SignUp/SignUp'
import Users from './pages/Admin/Users/Users'
import ErrorPage from './pages/ErrorPage/ErrorPage'
import { useEffect } from 'react'
import { getUserById, isAuthenticated } from './services/api/userApi'
import { useAuthStore } from './stores/useAuthStore'
import { jwtDecode } from 'jwt-decode'
import Cookies from "js-cookie"
import { ConfigProvider, Layout } from 'antd'
import axios from 'axios'
import Programs from './pages/Admin/Programs/Programs'
import LandTOC from './pages/Reports/DataEntry/Land/LandTOC'
import Land_1 from './pages/Reports/DataEntry/Land/Land_1'
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS for the grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional theme
import Land_2 from './pages/Reports/DataEntry/Land/Land_2'
import Land_3 from './pages/Reports/DataEntry/Land/Land_3'
import Land_4 from './pages/Reports/DataEntry/Land/Land_4'
import Land_6 from './pages/Reports/DataEntry/Land/Land_6'
import Land_5 from './pages/Reports/DataEntry/Land/Land_5'
import Land_7 from './pages/Reports/DataEntry/Land/Land_7'
import Admin from './pages/Admin/Admin'
import Navbar from './components/Navbar/Navbar'
import Reports from './pages/Reports/Reports'
import LandingPage from './pages/Home/LandingPage'
import { FormEnum, Sector } from './types/forms/formNameEnum'
import Forestry_24 from './pages/Reports/DataEntry/Forestry/Forestry_24'
import Forestry_1 from './pages/Reports/DataEntry/Forestry/Forestry_1'
import Forestry_2 from './pages/Reports/DataEntry/Forestry/Forestry_2'
import Forestry_3 from './pages/Reports/DataEntry/Forestry/Forestry_3'
import Forestry_4 from './pages/Reports/DataEntry/Forestry/Forestry_4'
import Forestry_5 from './pages/Reports/DataEntry/Forestry/Forestry_5'
import Biodiversity_2 from './pages/Reports/DataEntry/Biodoversity/Biodiversity_2'
import Biodiversity_3 from './pages/Reports/DataEntry/Biodoversity/Biodiversity_3'
import Biodiversity_4 from './pages/Reports/DataEntry/Biodoversity/Biodiversity_4'
import Biodiversity_5 from './pages/Reports/DataEntry/Biodoversity/Biodiversity_5'
import Biodiversity_6 from './pages/Reports/DataEntry/Biodoversity/Biodiversity_6'
import Biodiversity_7 from './pages/Reports/DataEntry/Biodoversity/Biodiversity_7'
import Biodiversity_8 from './pages/Reports/DataEntry/Biodoversity/Biodiversity_8'
import Biodiversity_9 from './pages/Reports/DataEntry/Biodoversity/Biodiversity_9'
import ErrorLog from './components/ErrorLog'
import { useErrorLogStore } from './stores/useErrorLogStore'

axios.defaults.withCredentials = true;

function App() {
  const {setUser, accessToken} = useAuthStore();
  const errorStore = useErrorLogStore();


  const configTheme = {
    "token": {
      "colorPrimary": "#41a61d",
      "colorInfo": "#41a61d"
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

  return (
    <ConfigProvider
      theme={configTheme}>
      <BrowserRouter >
        <Layout className="h-screen">
            <Navbar />
            <Layout className="h-full">
              <Routes >
                <Route path='/' element={<HomePage />} >
                  <Route path="" element={<LandingPage />} />
                  <Route path="login" element={<Login />} />
                  <Route path="signup" element={<SignUp />} />
                </Route>

                <Route path='admin' element={<Admin />}>
                  {/* <Route path='' element={<Users />} /> */}
                  <Route path='users' element={<Users />} />
                  <Route path='programs' element={<Programs />} />
                </Route>

                <Route path='reports' element={<Reports />}>
                    <Route path={Sector.LAND} >
                      <Route path='toc' element={<LandTOC />} />
                      <Route path='land_1' element={<Land_1 />} />
                      <Route path='land_2' element={<Land_2 />} />
                      <Route path='land_3' element={<Land_3 />} />
                      <Route path='land_4' element={<Land_4 />} />
                      <Route path='land_5' element={<Land_5 />} />
                      <Route path='land_6' element={<Land_6 />} />
                      <Route path='land_7' element={<Land_7 />} />
                    </Route>
                    
                    <Route path={Sector.FORESTRY} >
                      <Route path={FormEnum.FORESTRY_1} element={<Forestry_1 />} />
                      <Route path={FormEnum.FORESTRY_2} element={<Forestry_2 />} />
                      <Route path={FormEnum.FORESTRY_3} element={<Forestry_3 />} />
                      <Route path={FormEnum.FORESTRY_4} element={<Forestry_4 />} />
                      <Route path={FormEnum.FORESTRY_5} element={<Forestry_5 />} />
                      
                      <Route path={FormEnum.FORESTRY_24} element={<Forestry_24 />} />
                    </Route>

                    <Route path={Sector.BIODIVERSITY} >
                      <Route path={FormEnum.BIODIVERSITY_2} element={<Biodiversity_2 />} />
                      <Route path={FormEnum.BIODIVERSITY_3} element={<Biodiversity_3 />} />
                      <Route path={FormEnum.BIODIVERSITY_4} element={<Biodiversity_4 />} />
                      <Route path={FormEnum.BIODIVERSITY_5} element={<Biodiversity_5 />} />
                      <Route path={FormEnum.BIODIVERSITY_6} element={<Biodiversity_6 />} />
                      <Route path={FormEnum.BIODIVERSITY_7} element={<Biodiversity_7 />} />
                      <Route path={FormEnum.BIODIVERSITY_8} element={<Biodiversity_8 />} />
                      <Route path={FormEnum.BIODIVERSITY_9} element={<Biodiversity_9 />} />
                    </Route>
                </Route>

                {/* Error Pages */}
                <Route path="/error/401" element={<ErrorPage code={401} message="Unauthorized Access" />} />

              </Routes>
            </Layout>
        </Layout>

        <ErrorLog  />
        
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
