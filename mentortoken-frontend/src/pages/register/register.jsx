import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import Button from "../../components/Button/Button";
import InputWithLabel from "../../components/InputWithLabel/inputwithlabel";
import RegisterCompany from "../../components/RegisterPage/RegisterCompany/registercompany.jsx"
import RegisterMentor from "../../components/RegisterPage/RegisterMentor/registermentor.jsx"
import RegisterToggle from "../../components/RegisterPage/RegisterToggle/registertoggle.jsx"
import LoginComponent from "../../components/LoginPage/loginpage.jsx"
import OpenEye from "../../images/loginpage/eye_lookup.svg"
import CloseEye from "../../images/loginpage/eye_no_lookup.svg"
import CheckIcon from "../../components/LoginPage/checkicon.jsx"
import CloseIcon from "../../components/LoginPage/closeicon.jsx"
import "./register.css"

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [type, setType] = useState("company");
  const [name, setName] = useState("");
  const [labelName, setLabelName] = useState("Company name");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [lookPassword, setLookPassword] = useState(false);
  const [lookConfirm, setLookConfirm] = useState(false);

  const [passStrenght, setPassStrenght] = useState(false);
  const [noNameEmail, setNoNameEmail] = useState(false);
  const [eightChar, setEightChar] = useState(false);
  const [numberSymbol, setNumberSymbol] = useState(false);
  const [passMatch, setPassMatch] = useState(false);
  const [emailAddressPattern, setEmailAddressPattern] = useState(false);

  const [continueRegister, setContinueRegister] = useState(false);

  const updateType = (usertype) => {
    setType(usertype);
    setLabelName(
      usertype === "company" ?
        `Company name` : `Mentor name`
    );
  };

  const handleLook = (e, type) => {
    e.preventDefault();
    if (type === "password") {
      setLookPassword(!lookPassword);
    } else if (type === "confirmPassword")
      setLookConfirm(!lookConfirm);
  };

  useEffect(() => {
    (noNameEmail && eightChar && numberSymbol) ? setPassStrenght(true) : setPassStrenght(false);

    (password.toUpperCase().includes(name.toUpperCase()) ||
     password.toUpperCase().includes(email.toUpperCase())) ?
     setNoNameEmail(false) : setNoNameEmail(true);

    /^.{8,}$/.test(password) ? setEightChar(true) : setEightChar(false);

    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/.test(password) ? setNumberSymbol(true) : setNumberSymbol(false);

    ((password === confirmPassword) && password ) ?  setPassMatch(true) : setPassMatch(false);

    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) ? setEmailAddressPattern(true) : setEmailAddressPattern(false);

  },[password, confirmPassword]);


  const registerAccount = async (e) => {
    e.preventDefault();
    const emailaddressPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!emailaddressPattern.test(email)) {
      alert("Please enter valid email")
      throw new Error("Failed to login. Please enter valid email format");
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/checkEmail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`${errorData.message}`)
        throw new Error(errorData.message || "Registration failed");
      }
      const data = await response.json();
      data ?
        alert(`${email} is already taken, please procead with login or create account with different email`) :
        setContinueRegister(true)
    } catch (error) {
      console.log("This is the error: ", error.message);
    }
  };
  return (
    <LoginComponent
      logData={
        (continueRegister && type === "mentor") ?
          <RegisterMentor goBack={() => setContinueRegister(false)}
            name={name}
            email={email}
            password={password}
            confirmPassword={confirmPassword}
            type={type}
          /> :
          (continueRegister && type === "company") ?
            <RegisterCompany goBack={() => setContinueRegister(false)}
              name={name}
              email={email}
              password={password}
              confirmPassword={confirmPassword}
              type={type}
            /> :
            <>
              <h2>CHOOSE ACCOUNT TYPE</h2>
              <RegisterToggle typeUpdate={updateType} />
              <form className="registration-form" onSubmit={registerAccount}>
                
                <InputWithLabel
                  value={name}
                  label={labelName}
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Name"
                  required
                />
                
                <InputWithLabel
                  value={email}
                  label="Email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="mentortoken@mail.com"
                  required
                />
                
                <div className="password-input">
                  <InputWithLabel
                    value={password}
                    label="Password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    type={lookPassword ? "text" : "password"}
                    placeholder="********"
                    required
                  />
                  <img src={lookPassword ? CloseEye : OpenEye} onClick={(e) => handleLook(e, "password")} />
                </div>
                
                <div className="password-input">
                  <InputWithLabel
                    value={confirmPassword}
                    label="Confirm password"
                    id="confirmPassword"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type={lookConfirm ? "text" : "password"}
                    placeholder="********"
                    required
                  />
                  <img src={lookConfirm ? CloseEye : OpenEye} onClick={(e) => handleLook(e, "confirmPassword")} />
                </div>

                <span>{passStrenght ? <CheckIcon /> : <CloseIcon />} Password Strength : {passStrenght ? "Strong" : "Weak"}</span> <br />
                <span>{noNameEmail ? <CheckIcon /> : <CloseIcon />} Cannot contain your name or email address</span><br />
                <span>{eightChar ? <CheckIcon /> : <CloseIcon />} At least 8 characters</span><br />
                <span>{numberSymbol ? <CheckIcon /> : <CloseIcon />} Contains a number or symbol</span><br />
                <span >{passMatch ? <CheckIcon /> : <CloseIcon />} Password match</span>

                <Button
                  disabled={!(passStrenght && passMatch && emailAddressPattern)}
                  name={"Continue"}
                  width={"100%"}
                />
              </form>
              <p>Already have account? <Link to="/login"> Login.</Link></p>
            </>
      }
    />
  )
}

export default RegisterPage