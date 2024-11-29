import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const MainLayout = ({ nav, footer, children }) => {

  return (
    <>
         {nav && <Navbar />}
      <main>{children}</main>
      {footer && <Footer />}
    </>
  )
}

export default MainLayout