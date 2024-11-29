import { Route, Routes } from "react-router-dom"
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import HomePage from './pages/home/home'
import "@fontsource/inter";
import AboutPage from "./pages/about/about";
import ContactPage from "./pages/contact/contact";
import LoginPage from "./pages/login/login";
import MainLayout from "./pages/layout/layout";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout nav={true} footer={true}> <HomePage /> </MainLayout>}></Route>
        <Route path="/about" element={<MainLayout nav={true} footer={true}> <AboutPage /> </MainLayout>} />
        <Route path="/contact" element={<MainLayout nav={true} footer={true}> <ContactPage /> </MainLayout>} />
        <Route path="login" element={<LoginPage />}></Route>
      </Routes>
    </>
  )
}

export default App
