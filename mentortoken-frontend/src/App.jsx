import { Route, Routes } from "react-router-dom"
import MainLayout from "./pages/layout/layout";
import HomePage from './pages/home/home'
import "@fontsource/inter";
import AboutPage from "./pages/about/about";
import ContactPage from "./pages/contact/contact";
import LoginPage from "./pages/login/login";
import RegisterPage from "./pages/register/register"
import ForgotPassword from "./pages/resetpassword/resetpassword";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout nav={true} footer={true}> <HomePage /> </MainLayout>}></Route>
        <Route path="/about" element={<MainLayout nav={true} footer={true}> <AboutPage /> </MainLayout>} />
        <Route path="/contact" element={<MainLayout nav={true} footer={true}> <ContactPage /> </MainLayout>} />
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
      </Routes>
    </>
  )
}

export default App
