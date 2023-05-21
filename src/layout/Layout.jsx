import Footer from '../components/Footer'
import Navbar from '../components/Nav'

const Layout = ({children}) => {
 return (
  <div>
    <>
    <Navbar/>
    <main style={{ marginTop: '70px', paddingTop: '60px' }}>{children}</main>
    <Footer />
    </>
  </div>
 )
}

export default Layout