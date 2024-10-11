import { Button } from "@mui/material";
import "./Navbar.css"
import {  Avatar, Dropdown, Flex, Layout, MenuProps, Space, Button as AntButton } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import GuestGuard from "../../Guards/GuestGuard";
import { useAuthStore } from "../../../stores/useAuthStore";
import RouteGuard from "../../Guards/RouteGuard";
import { DownOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import Cookies from "js-cookie"

const { Header } = Layout;

const Navbar = () => {
    const button : React.CSSProperties = {
        fontSize: '12px',
        fontWeight: '700',
        padding: '0.3rem 1.4rem',
        background: '#fff',
        borderRadius: '40px',
        color: '#333',
        boxShadow: '0 0 10px rgba(0, 0, 0, .1)',
        textTransform: 'none',
        fontFamily: '"Poppins", sans-serif',
    };

    const { user, setUser, clearTokens } = useAuthStore();
    const navigate = useNavigate();

    const items: MenuProps['items'] = [
        {
            label: 'Profile',
            key: '1',
            icon: (<UserOutlined />)
          },
        {
          type: 'divider',
        },
        {
          label: 'Logout',
          key: '3',
          icon: (<LogoutOutlined />),
          onClick: () => {
            Cookies.remove("accessToken")
            Cookies.remove("refreshToken")
            clearTokens()
            setUser(null)
            navigate("/")
          }
        },
      ];

    return (
        <Header className="navbar" style={{ display: 'flex', alignItems: 'center' }}>
            <div className="logo" style={{ color: 'white', fontSize: '24px' }}>
                <img src="/logo.png" alt="" />
                EcoStats
            </div>
            <Flex gap="small">
                <GuestGuard>
                    <Link to="/login">
                        <Button variant="contained" style={button} >
                                Login 
                        </Button>
                    </Link>

                    <Link to="/signup">
                        <Button variant="contained" style={button} >
                                Sign Up 
                        </Button>
                    </Link>
                </GuestGuard>
                <RouteGuard>
                    {/* <Button variant="contained" style={button} >
                            Logout 
                    </Button> */}
                    <Dropdown.Button  menu={{ items }} trigger={['click']}>
                        <Space>
                            <img style={{width:"1rem"}} src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${user?.name}`} />
                            {user?.name}
                        </Space>
                    </Dropdown.Button>
                </RouteGuard>
            </Flex>
        </Header>
    );
};

export default Navbar;
