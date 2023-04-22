import Footer from '../components/Footer'
import Navbar from '../components/Nav'

const Layout = ({children}) => {
 return (
  <div>
    <>
    <Navbar/>
    <main>{children}</main>
    <Footer />
    </>
  </div>
 )
}

export default Layout