import { Route, Routes } from "react-router-dom"
import MainLayout from "./pages/layout/layout";
import HomePage from './pages/home/home'
import "@fontsource/inter";
import AboutPage from "./pages/about/about";
import ContactPage from "./pages/contact/contact";
import LoginPage from "./pages/login/login";
import RegisterPage from "./pages/register/register"
import ForgotPassword from "./pages/resetpassword/resetpassword";
import MentorDashboard from "./pages/dashboard/MentorDashboard/MentorDashboard";
import CompanyDashboard from "./pages/dashboard/CompanyDashboard/CompanyDashboard";
import MentorStats from "./pages/dashboard/MentorStats/MentorStats";
import ProtectedRoutes from "./pages/protected/protectedRoutes";
import MentorJobFeed from "./pages/dashboard/MentorJobFeed/MentorJobFeed";
import CompanyMentors from "./pages/dashboard/CompanyMentors/CompanyMentors";
import CompanyJobs from "./pages/dashboard/CompanyJobs/CompanyJobs";

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
        <Route path="/mentorDashboard" element={<ProtectedRoutes><MainLayout sidebarLayout={true} type="mentor"><MentorDashboard /></MainLayout></ProtectedRoutes>} />
        <Route path="/mentorStats" element={<ProtectedRoutes><MainLayout sidebarLayout={true} type="mentor"><MentorStats /></MainLayout></ProtectedRoutes>} />
        <Route path="/mentorJobFeed" element={<ProtectedRoutes><MainLayout sidebarLayout={true} type="mentor"><MentorJobFeed /></MainLayout></ProtectedRoutes>} />
        <Route path="/companyDashboard" element={<ProtectedRoutes><MainLayout sidebarLayout={true} type="company"><CompanyDashboard /></MainLayout></ProtectedRoutes>} />
        <Route path="/companyMentors" element={<ProtectedRoutes><MainLayout sidebarLayout={true} type="company"><CompanyMentors /></MainLayout></ProtectedRoutes>} />
        <Route path="/companyJobs" element={<ProtectedRoutes><MainLayout sidebarLayout={true} type="company"><CompanyJobs /></MainLayout></ProtectedRoutes>} />
      </Routes>
    </>
  )
}

export default App
