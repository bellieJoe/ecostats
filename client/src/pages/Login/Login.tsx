import { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'boxicons/css/boxicons.min.css';
import { Link, Button, Paper, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";


const Login = () => {


    const containerStyle : React.CSSProperties = {
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundSize: "cover",
        backgroundPosition: "center",
    };
    
    const paperStyle : React.CSSProperties = {
        padding: "2rem",
        borderRadius: "15px",
        backdropFilter: "blur(10px)",  
        backgroundColor: "rgba(255, 255, 255, 0.1)", 
        boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
        textAlign: "center",
        width: "100%",
        maxWidth: "400px",
    };
    
    const heading : React.CSSProperties = {
        fontSize: "2rem",
        fontWeight: "600",
        color: "#fff",
        marginBottom: "1.5rem",
        fontFamily: '"Poppins", sans-serif',
    };
    
    const row : React.CSSProperties = {
        display: "flex",
        marginTop: "1rem",
        marginBottom: "1rem",
        alignItems: "center",
        color: "#fff",
    };
    
    const textFieldStyle : React.CSSProperties = {
        '& .MuiInputBase-root': {
            color: "#fff",
        },
        '& .MuiInputLabel-root': {
            color: "rgba(255, 255, 255, 0.7)",
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.5)',
            },
            '&:hover fieldset': {
                borderColor: '#fff',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#fff',
            },
        },
    };
    
    const btnStyle : React.CSSProperties = {
        marginTop: "1.5rem",
        padding: "0.7rem",
        fontSize: "1rem",
        fontWeight: "700",
        borderRadius: "30px",
        backgroundColor: "#fff",
        color: "#333",
        width: "100%",
        textTransform: "none",
    };
    
    const linkStyle : React.CSSProperties = {
        color: "#fff",
        fontWeight: "600",
        textDecoration: "none",
        marginTop: "1rem",
    };
    
    return (
        <div style={containerStyle}>
            <Grid>
                <Paper style={paperStyle} sx={{ width: { xs: '80vw', sm: '50vw', md: '40vw', lg: '30vw', xl: '20vw' }, height: { lg: '50vh' } }}>
                    <Typography component="h1" variant="h5" style={heading}>Login</Typography>
                    <form >
                        <span style={row}>
                            <TextField sx={textFieldStyle} label="Email" fullWidth variant="outlined" type="email" placeholder="Enter Email" name="email" onChange={(e) => setEmail(e.target.value)} />
                        </span>
                        <span style={row}>
                            <TextField sx={textFieldStyle} label="Password" fullWidth variant="outlined" type="password" placeholder="Enter Password" name="password" onChange={(e) => setPassword(e.target.value)} />
                        </span>
                        <Button style={btnStyle} variant="contained" type="submit">Login</Button>
                    </form>
                    <p style={linkStyle}>Don't have an account? <Link href="/signup" style={{ color: "#fff", textDecoration: "underline" }}>SignUp</Link></p>
                </Paper>
            </Grid>
        </div>
    );
}

export default Login;