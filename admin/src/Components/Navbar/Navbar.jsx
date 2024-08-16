
import './Navbar.css'
import logo from '../../assets/logo.jpg'
import navProfile from '../../assets/navprofile.jpg'


const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={logo} alt="" className='logo'/>
<img src={navProfile} alt="" className='navprofile'/>
    </div>
  )
}

export default Navbar