import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import LoginComponent from "../../components/LoginPage/loginpage.jsx";
import InputWithLabel from "../../components/InputWithLabel/inputwithlabel.jsx";
import Button from "../../components/Button/Button.jsx";
import CheckIcon from "../../components/LoginPage/checkicon.jsx";
import CloseIcon from "../../components/LoginPage/closeicon.jsx";
import OpenEye from "../../images/loginpage/eye_lookup.svg";
import CloseEye from "../../images/loginpage/eye_no_lookup.svg";
import "./resetpassword.css";

const useQuery = () => new URLSearchParams(useLocation().search);

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [tokenExpirationTime, setTokenExpirationTime] = useState(0);
    const [timer, setTimer] = useState(0);
    const [message, setMessage] = useState("");
    const [resetToken, setResetToken] = useState(null);
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [lookNewPassword, setLookNewPassword] = useState(false);
    const [lookNewConfirm, setLookNewConfirm] = useState(false);
    const [tokenEmailChecked, setTokenEmailChecked] = useState(false);

    const [eightChar, setEightChar] = useState(false);
    const [noNameEmail, setNoNameEmail] = useState(false);
    const [numberSymbol, setNumberSymbol] = useState(false);
    const [passMatch, setPassMatch] = useState(false);
    const [passStrength, setPassStrength] = useState(false);

    const query = useQuery();
    const navigate = useNavigate();

    const handleResetLink = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const result = await response.json();

            if (response.ok) {
                setMessage(`Password reset link sent to ${result.accepted}! Please check your email.`);
            } else {
                setMessage(`Error: ${result.rejected || "Could not send the email."}`);
            }
        } catch (error) {
            console.error("Error sending reset link:", error);
        }
    };

    const handleTokenEmailCheck = async (token) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/checkResetToken/${token}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            const result = await response.json();
            setEmail(result.email);
            const expirationTime = Math.floor(result.expiration - new Date().getTime() / 1000);
            setTokenExpirationTime(expirationTime);
            setTimer(expirationTime);
        } catch (error) {
            console.error("Error verifying token:", error);
        }
    };

    // const handleResetPassword = async () => {
    //     if (newPassword !== confirmNewPassword) {
    //         alert("Passwords do not match. Please try again.");
    //         return;
    //     }

    //     try {
    //         const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/reset-password/${resetToken}`, {
    //             method: "PUT",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ newPassword }),
    //         });
    //         const result = await response.json();

    //         alert(result.message);
    //         if (response.ok) navigate("/login");
    //     } catch (error) {
    //         console.error("Error resetting password:", error);
    //     }
    // };
    const handleResetPassword = async () => {
        try {
            // Check if newPassword and confirmNewPassword match
            if (newPassword !== confirmNewPassword) {
                alert("Passwords do not match!");
                return;
            }

            const passwordResetResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/reset-password/${resetToken}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    newPassword,
                    confirmNewPassword,
                }),
            });

            const passwordReset = await passwordResetResponse.json();

            if (passwordReset.status) {
                alert(passwordReset.message);
                navigate("/login"); // Redirect to login page on success
            } else {
                alert(passwordReset.message); // Show error message
            }
        } catch (error) {
            console.log("This is the error: ", error);
        }
    };


    const handlePasswordVisibilityToggle = (type) => {
        if (type === "password") setLookNewPassword(!lookNewPassword);
        else if (type === "confirmPassword") setLookNewConfirm(!lookNewConfirm);
    };

    useEffect(() => {
        const token = query.get("resetToken");
        if (token) setResetToken(token);
    }, [query]);

    useEffect(() => {
        if (resetToken && !tokenEmailChecked) {
            handleTokenEmailCheck(resetToken);
            setTokenEmailChecked(true);
        }
    }, [resetToken, tokenEmailChecked]);

    useEffect(() => {
        if (tokenExpirationTime > 0 && timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => (prev > 0 ? prev - 1 : prev));
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [tokenExpirationTime, timer]);

    useEffect(() => {
        setPassStrength(noNameEmail && eightChar && numberSymbol);
        setNoNameEmail(!newPassword.toUpperCase().includes(email.toUpperCase()));
        setEightChar(/^.{8,}$/.test(newPassword));
        setNumberSymbol(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/.test(newPassword));
        setPassMatch(newPassword === confirmNewPassword && newPassword);
    }, [newPassword, confirmNewPassword, email]);

    return (
        <LoginComponent
            logData={
                resetToken && timer > 0 ? (
                    <div className="reset-password-container">
                        <h2>PASSWORD RESET</h2>
                        <span>Enter a new password.</span>
                        <p>Time remaining: {Math.floor(timer / 60)} min {timer % 60} sec</p>

                        <form className="reset-password-form" onSubmit={(e) => e.preventDefault()}>
                            <div className="password-input">
                                <InputWithLabel
                                    value={newPassword}
                                    label="New Password"
                                    id="newPassword"
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    type={lookNewPassword ? "text" : "password"}
                                    placeholder="********"
                                    autoComplete="new-password"
                                />
                                <img
                                    src={lookNewPassword ? CloseEye : OpenEye}
                                    onClick={() => handlePasswordVisibilityToggle("password")}
                                    alt={lookNewPassword ? "Hide password" : "Show password"}
                                />
                            </div>

                            <div className="password-input">
                                <InputWithLabel
                                    value={confirmNewPassword}
                                    label="Confirm New Password"
                                    id="confirmNewPassword"
                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    type={lookNewConfirm ? "text" : "password"}
                                    placeholder="********"
                                    autoComplete="new-password"
                                    required
                                />
                                <img
                                    src={lookNewConfirm ? CloseEye : OpenEye}
                                    onClick={() => handlePasswordVisibilityToggle("confirmPassword")}
                                    alt={lookNewConfirm ? "Hide password" : "Show password"}
                                />
                            </div>

                            <span>{passStrength ? <CheckIcon /> : <CloseIcon />} Password Strength: {passStrength ? "Strong" : "Weak"}</span>
                            <span>{noNameEmail ? <CheckIcon /> : <CloseIcon />} Cannot contain your email address</span>
                            <span>{eightChar ? <CheckIcon /> : <CloseIcon />} At least 8 characters</span>
                            <span>{numberSymbol ? <CheckIcon /> : <CloseIcon />} Contains a number or symbol</span>
                            <span>{passMatch ? <CheckIcon /> : <CloseIcon />} Passwords match</span>

                            <Button name="Reset Password" width="100%" mySubmit={handleResetPassword} />
                            <p>Go to <Link to="/login">Login</Link></p>
                        </form>

                    </div>
                ) : (
                    <div className="reset-password-container">
                        <h2>PASSWORD RESET</h2>
                        <span>Enter your email to receive a reset link.</span>
                        <form className="reset-password-email-form" onSubmit={(e) => e.preventDefault()}>
                            <InputWithLabel
                                value={email}
                                label="Email"
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="yourname@example.com"
                                required
                            />
                            <Button name="Send Email" width="100%" mySubmit={handleResetLink} />
                            {message && <p className="success-message">{message}</p>}
                            <p>Go to <Link to="/login">Login</Link></p>
                        </form>
                    </div>
                )
            }
        />
    );
};

export default ForgotPassword;

