import LoginComponent from "../../components/LoginPage/loginpage.jsx"
import Button from "../../components/Button/Button.jsx"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { jwtDecode } from "jwt-decode"
import InputWithLabel from "../../components/InputWithLabel/inputwithlabel.jsx"
import OpenEye from "../../images/loginpage/eye_lookup.svg"
import CloseEye from "../../images/loginpage/eye_no_lookup.svg"
import "./login.css"

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [revealPassword, setrevealPassword] = useState(false);

    const handleLook = (e) => {
        e.preventDefault();
        setrevealPassword(!revealPassword);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
    
            if (!response.ok) {
                throw new Error("Failed to login. Please check your email and password.");
            }
    
            const jwt_token = await response.json();
            if (jwt_token && jwt_token.token) {
                localStorage.setItem("jwt_token", jwt_token.token);
            }
    
            // Separate token decoding logic
            const decodedToken = jwtDecode(jwt_token.token);
    
            // Redirect to homepage
            navigate("/");
    
        } catch (error) {
            console.log("This is the error: ", error);
            setError(`Failed to login. Please check your email and password. ${error.toString()}`);
        }
    };

    return (

        <LoginComponent
            logData={
                <>
                    <h2>LOG IN TO MENTOR TOKEN</h2>
                    <span>Enter your email and password to login.</span>

                    <form className='login-form' onSubmit={handleLogin}>
                        <InputWithLabel
                            value={email}
                            label='Email'
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="mentortoken@mail.com"
                            required
                            autoComplete="email"
                        />

                        <div className='password-input'>
                            <InputWithLabel
                                value={password}
                                label='Password'
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                type={revealPassword ? "text" : "password"}
                                placeholder="Password"
                                required
                                autoComplete="current-password"
                            />

                            <img src={revealPassword ? CloseEye : OpenEye} onClick={(e) => handleLook(e)} />
                        </div>
                        {/* <p>Forgot password? <Link to="/passwordReset">Password reset.</Link></p> */}

                        <Button name={"Log in"} width={"100%"} />

                    </form>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <p>Don't have account? <Link to="/register"> Register.</Link></p>
                </>
            }
        />
    )
}

export default LoginPage
