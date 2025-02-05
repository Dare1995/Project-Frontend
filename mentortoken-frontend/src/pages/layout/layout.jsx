import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import SidebarLayout from "../../components/SideBar/SidebarLayout/sidebarlayout";

// const MainLayout = ({ nav, footer, children }) => {

//   return (
//     <>
//       {nav && <Navbar />}
//       <main>{children}</main>
//       {footer && <Footer />}
//     </>
//   )
// }

// export default MainLayout

const MainLayout = ({nav=false, footer=false, sidebarLayout=false, type="", children}) => {

  return (
    <>
        {nav && <Navbar/>}
        {sidebarLayout && <SidebarLayout type={type} children={children}/>}
        {!sidebarLayout && children}
        {footer && <Footer/>}
    </>
  )
}

export default MainLayout