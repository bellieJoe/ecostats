import { Button } from "@mui/material";
import "./Navbar.css"
import {  Flex, Layout } from 'antd';
import { Link } from "react-router-dom";
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

    return (
        <Header className="navbar" style={{ display: 'flex', alignItems: 'center' }}>
            <div className="logo" style={{ color: 'white', fontSize: '24px' }}>
                <img src="/logo.png" alt="" />
                EcoStats
            </div>
            <Flex gap="small">
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
            </Flex>
        </Header>
    );
};

export default Navbar;
