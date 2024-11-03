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
import Biodiversity_2 from './pages/Reports/DataEntry/Biodiversity/Biodiversity_2'
import Biodiversity_3 from './pages/Reports/DataEntry/Biodiversity/Biodiversity_3'
import Biodiversity_4 from './pages/Reports/DataEntry/Biodiversity/Biodiversity_4'
import Biodiversity_5 from './pages/Reports/DataEntry/Biodiversity/Biodiversity_5'
import Biodiversity_6 from './pages/Reports/DataEntry/Biodiversity/Biodiversity_6'
import Biodiversity_7 from './pages/Reports/DataEntry/Biodiversity/Biodiversity_7'
import Biodiversity_8 from './pages/Reports/DataEntry/Biodiversity/Biodiversity_8'
import Biodiversity_9 from './pages/Reports/DataEntry/Biodiversity/Biodiversity_9'
import ErrorLog from './components/ErrorLog'
import { useErrorLogStore } from './stores/useErrorLogStore'
import ToApprove from './pages/Reports/ApprovalWorkFlow/ToApprove'
import ToReview from './pages/Reports/ApprovalWorkFlow/ToReview'
import Dashboard from './pages/Dashboard/Dashboard'
import Overview from './pages/Dashboard/Overview'
import Land_2_Dashboard from './pages/Dashboard/Land/Land_2_dashboard'
import Land_1_Dashboard from './pages/Dashboard/Land/land_1_dashboard'
import Land_3_Dashboard from './pages/Dashboard/Land/Land_3_dashboard'
import Land_4_Dashboard from './pages/Dashboard/Land/Land_4_dashboard'
import Land_5_Dashboard from './pages/Dashboard/Land/Land_5_dashboard'
import Land_6_Dashboard from './pages/Dashboard/Land/Land_6_dashboard'
import Land_7_Dashboard from './pages/Dashboard/Land/Land_7_dashboard'
import Forestry_1_Dashboard from './pages/Dashboard/Forestry/Forestry_1_dashboard'
import Forestry_2_Dashboard from './pages/Dashboard/Forestry/Forestry_2_dashboard'
import Forestry_3_Dashboard from './pages/Dashboard/Forestry/Forestry_3_dashboard'
import Forestry_4_Dashboard from './pages/Dashboard/Forestry/Forestry_4_dashboard'
import Forestry_5_Dashboard from './pages/Dashboard/Forestry/Forestry_5_dashboard'
import Forestry_24_Dashboard from './pages/Dashboard/Forestry/Forestry_24_dashboard'
import Biodiversity_3_Dashboard from './pages/Dashboard/Biodiversity/Biodiversity_3_dashboard'
import Biodiversity_2_Dashboard from './pages/Dashboard/Biodiversity/Biodiversity_2_dashboard'
import Biodiversity_4_Dashboard from './pages/Dashboard/Biodiversity/Biodiversity_4_dashboard'
import Biodiversity_5_Dashboard from './pages/Dashboard/Biodiversity/Biodiversity_5_dashboard'
import Biodiversity_6_Dashboard from './pages/Dashboard/Biodiversity/Biodiversity_6_dashboard'
import Biodiversity_7_Dashboard from './pages/Dashboard/Biodiversity/Biodiversity_7_dashboard'
import Biodiversity_8_Dashboard from './pages/Dashboard/Biodiversity/Biodiversity_8_dashboard'
import Biodiversity_9_Dashboard from './pages/Dashboard/Biodiversity/Biodiversity_9_dashboard'
import Biodiversity_10 from './pages/Reports/DataEntry/Biodiversity/Biodiversity_10'
import Biodiversity_10_Dashboard from './pages/Dashboard/Biodiversity/Biodiversity_10_dashboard'
import Biodiversity_11 from './pages/Reports/DataEntry/Biodiversity/Biodiversity_11'
import Biodiversity_11_Dashboard from './pages/Dashboard/Biodiversity/Biodiversity_11_dashboard'
import Biodiversity_12 from './pages/Reports/DataEntry/Biodiversity/Biodiversity_12'
import Biodiversity_12_Dashboard from './pages/Dashboard/Biodiversity/Biodiversity_12_dashboard'
import Biodiversity_15 from './pages/Reports/DataEntry/Biodiversity/Biodiversity_15'
import Biodiversity_15_Dashboard from './pages/Dashboard/Biodiversity/Biodiversity_15_dashboard'
import Biodiversity_16 from './pages/Reports/DataEntry/Biodiversity/Biodiversity_16'
import Biodiversity_16_Dashboard from './pages/Dashboard/Biodiversity/Biodiversity_16_dashboard'
import Biodiversity_17 from './pages/Reports/DataEntry/Biodiversity/Biodiversity_17'
import Biodiversity_17_Dashboard from './pages/Dashboard/Biodiversity/Biodiversity_17_dashboard'
import Biodiversity_19 from './pages/Reports/DataEntry/Biodiversity/Biodiversity_19'
import Biodiversity_19_Dashboard from './pages/Dashboard/Biodiversity/Biodiversity_19_dashboard'
import Biodiversity_20 from './pages/Reports/DataEntry/Biodiversity/Biodiversity_20'
import Biodiversity_20_Dashboard from './pages/Dashboard/Biodiversity/Biodiversity_20_dashboard'
import Biodiversity_21 from './pages/Reports/DataEntry/Biodiversity/Biodiversity_21'
import Biodiversity_21_Dashboard from './pages/Dashboard/Biodiversity/Biodiversity_21_dashboard'
import Biodiversity_22 from './pages/Reports/DataEntry/Biodiversity/Biodiversity_22'
import Biodiversity_22_Dashboard from './pages/Dashboard/Biodiversity/Biodiversity_22_dashboard'
import Biodiversity_23 from './pages/Reports/DataEntry/Biodiversity/Biodiversity_23'
import Biodiversity_23_Dashboard from './pages/Dashboard/Biodiversity/Biodiversity_23_dashboard'
import Biodiversity_24 from './pages/Reports/DataEntry/Biodiversity/Biodiversity_24'
import Biodiversity_24_Dashboard from './pages/Dashboard/Biodiversity/Biodiversity_24_dashboard'
import Biodiversity_25 from './pages/Reports/DataEntry/Biodiversity/Biodiversity_25'
import Biodiversity_25_Dashboard from './pages/Dashboard/Biodiversity/Biodiversity_25_dashboard'
import Biodiversity_26 from './pages/Reports/DataEntry/Biodiversity/Biodiversity_26'
import Biodiversity_26_Dashboard from './pages/Dashboard/Biodiversity/Biodiversity_26_dashboard'
import Biodiversity_27 from './pages/Reports/DataEntry/Biodiversity/Biodiversity_27'
import Biodiversity_27_Dashboard from './pages/Dashboard/Biodiversity/Biodiversity_27_dashboard'
import Biodiversity_28 from './pages/Reports/DataEntry/Biodiversity/Biodiversity_28'
import Biodiversity_28_Dashboard from './pages/Dashboard/Biodiversity/Biodiversity_28_dashboard'
import Biodiversity_29 from './pages/Reports/DataEntry/Biodiversity/Biodiversity_29'
import Biodiversity_29_Dashboard from './pages/Dashboard/Biodiversity/Biodiversity_29_dashboard'
import Biodiversity_30 from './pages/Reports/DataEntry/Biodiversity/Biodiversity_30'
import Biodiversity_30_Dashboard from './pages/Dashboard/Biodiversity/Biodiversity_30_dashboard'
import Biodiversity_31 from './pages/Reports/DataEntry/Biodiversity/Biodiversity_31'
import Biodiversity_31_Dashboard from './pages/Dashboard/Biodiversity/Biodiversity_31_dashboard'
import Biodiversity_32 from './pages/Reports/DataEntry/Biodiversity/Biodiversity_32'
import Biodiversity_32_Dashboard from './pages/Dashboard/Biodiversity/Biodiversity_32_dashboard'
import Biodiversity_33 from './pages/Reports/DataEntry/Biodiversity/Biodiversity_33'
import Biodiversity_33_Dashboard from './pages/Dashboard/Biodiversity/Biodiversity_33_dashboard'
import ForgotPassword from './pages/Home/ForgotPassword.tsx/ForgotPassword'
import ResetPassword from './pages/Home/ForgotPassword.tsx/ResetPassword'
import Data from './pages/Admin/Budget/Data'
import BudgetAnalytics from './pages/Admin/Budget/BudgetAnalytics'

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
                  <Route path="forgot-password" element={<ForgotPassword />} />
                  <Route path="reset-password/:token" element={<ResetPassword />} />
                </Route>

                <Route path='admin' element={<Admin />}>
                  {/* <Route path='' element={<Users />} /> */}
                  <Route path='users' element={<Users />} />
                  <Route path='programs' element={<Programs />} />
                  <Route path='budgets'  > 
                    <Route path='data' element={<Data />} />
                    <Route path='' element={<BudgetAnalytics />} />
                  </Route>
                </Route>

                <Route path='dashboard' element={<Dashboard />}>
                  <Route path='' element={<Overview />} />

                  <Route path='land_1' element={<Land_1_Dashboard />} />
                  <Route path='land_2' element={<Land_2_Dashboard />} />
                  <Route path='land_3' element={<Land_3_Dashboard />} />
                  <Route path='land_4' element={<Land_4_Dashboard />} />
                  <Route path='land_5' element={<Land_5_Dashboard />} />
                  <Route path='land_6' element={<Land_6_Dashboard />} />
                  <Route path='land_7' element={<Land_7_Dashboard />} />

                  <Route path='forestry_1' element={<Forestry_1_Dashboard />} />
                  <Route path='forestry_2' element={<Forestry_2_Dashboard />} />
                  <Route path='forestry_3' element={<Forestry_3_Dashboard />} />
                  <Route path='forestry_4' element={<Forestry_4_Dashboard />} />
                  <Route path='forestry_5' element={<Forestry_5_Dashboard />} />

                  <Route path='forestry_24' element={<Forestry_24_Dashboard />} />


                  <Route path='biodiversity_2' element={<Biodiversity_2_Dashboard />} />
                  <Route path='biodiversity_3' element={<Biodiversity_3_Dashboard />} />
                  <Route path='biodiversity_4' element={<Biodiversity_4_Dashboard />} />
                  <Route path='biodiversity_5' element={<Biodiversity_5_Dashboard />} />
                  <Route path='biodiversity_6' element={<Biodiversity_6_Dashboard />} />
                  <Route path='biodiversity_7' element={<Biodiversity_7_Dashboard />} />
                  <Route path='biodiversity_8' element={<Biodiversity_8_Dashboard />} />
                  <Route path='biodiversity_9' element={<Biodiversity_9_Dashboard />} />
                  <Route path='biodiversity_10' element={<Biodiversity_10_Dashboard />} />
                  <Route path='biodiversity_11' element={<Biodiversity_11_Dashboard />} />
                  <Route path='biodiversity_12' element={<Biodiversity_12_Dashboard />} />

                  <Route path='biodiversity_15' element={<Biodiversity_15_Dashboard />} />
                  <Route path='biodiversity_16' element={<Biodiversity_16_Dashboard />} />
                  <Route path='biodiversity_17' element={<Biodiversity_17_Dashboard />} />

                  <Route path='biodiversity_19' element={<Biodiversity_19_Dashboard />} />
                  <Route path='biodiversity_20' element={<Biodiversity_20_Dashboard />} />
                  <Route path='biodiversity_21' element={<Biodiversity_21_Dashboard />} />
                  <Route path='biodiversity_22' element={<Biodiversity_22_Dashboard />} />
                  <Route path='biodiversity_23' element={<Biodiversity_23_Dashboard />} />
                  <Route path='biodiversity_24' element={<Biodiversity_24_Dashboard />} />
                  <Route path='biodiversity_25' element={<Biodiversity_25_Dashboard />} />
                  <Route path='biodiversity_26' element={<Biodiversity_26_Dashboard />} />
                  <Route path='biodiversity_27' element={<Biodiversity_27_Dashboard />} />
                  <Route path='biodiversity_28' element={<Biodiversity_28_Dashboard />} />
                  <Route path='biodiversity_29' element={<Biodiversity_29_Dashboard />} />
                  <Route path='biodiversity_30' element={<Biodiversity_30_Dashboard />} />
                  <Route path='biodiversity_31' element={<Biodiversity_31_Dashboard />} />
                  <Route path='biodiversity_32' element={<Biodiversity_32_Dashboard />} />
                  <Route path='biodiversity_33' element={<Biodiversity_33_Dashboard />} />
                </Route>

                <Route path='reports' element={<Reports />}>
                    <Route path='to-approve' element={<ToApprove />} />
                    <Route path='to-review' element={<ToReview />} />
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
                      <Route path={FormEnum.BIODIVERSITY_10} element={<Biodiversity_10 />} />
                      <Route path={FormEnum.BIODIVERSITY_11} element={<Biodiversity_11 />} />
                      <Route path={FormEnum.BIODIVERSITY_12} element={<Biodiversity_12 />} />

                      <Route path={FormEnum.BIODIVERSITY_15} element={<Biodiversity_15 />} />
                      <Route path={FormEnum.BIODIVERSITY_16} element={<Biodiversity_16 />} />
                      <Route path={FormEnum.BIODIVERSITY_17} element={<Biodiversity_17 />} />

                      <Route path={FormEnum.BIODIVERSITY_19} element={<Biodiversity_19 />} />
                      <Route path={FormEnum.BIODIVERSITY_20} element={<Biodiversity_20 />} />
                      <Route path={FormEnum.BIODIVERSITY_21} element={<Biodiversity_21 />} />
                      <Route path={FormEnum.BIODIVERSITY_22} element={<Biodiversity_22 />} />
                      <Route path={FormEnum.BIODIVERSITY_22} element={<Biodiversity_22 />} />
                      <Route path={FormEnum.BIODIVERSITY_23} element={<Biodiversity_23 />} />
                      <Route path={FormEnum.BIODIVERSITY_24} element={<Biodiversity_24 />} />
                      <Route path={FormEnum.BIODIVERSITY_25} element={<Biodiversity_25 />} />
                      <Route path={FormEnum.BIODIVERSITY_26} element={<Biodiversity_26 />} />
                      <Route path={FormEnum.BIODIVERSITY_27} element={<Biodiversity_27 />} />
                      <Route path={FormEnum.BIODIVERSITY_28} element={<Biodiversity_28 />} />
                      <Route path={FormEnum.BIODIVERSITY_29} element={<Biodiversity_29 />} />
                      <Route path={FormEnum.BIODIVERSITY_30} element={<Biodiversity_30 />} />
                      <Route path={FormEnum.BIODIVERSITY_31} element={<Biodiversity_31 />} />
                      <Route path={FormEnum.BIODIVERSITY_32} element={<Biodiversity_32 />} />
                      <Route path={FormEnum.BIODIVERSITY_33} element={<Biodiversity_33 />} />
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
