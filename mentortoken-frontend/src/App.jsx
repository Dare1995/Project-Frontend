import { Route, Routes } from "react-router-dom"
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import HomePage from './pages/home/home'
import "@fontsource/inter";
import AboutPage from "./pages/about/about";
import ContactPage from "./pages/contact/contact";
import LoginPage from "./pages/login/login";

function App() {
 
return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/about" element={<AboutPage/>} />
        <Route path="/contact" element={<ContactPage/>} />
        <Route path="/login" element={<LoginPage/>} />     
      </Routes>
      <Footer />
     </>
  )
}

export default App
