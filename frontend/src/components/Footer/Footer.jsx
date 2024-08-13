
import'./Footer.css'
import logo from '../Assets/logo.jpg'
import instagram_icon from '../Assets/instagram_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.jpeg'
import facebook_icon from '../Assets/facebook_icon.png'
const Footer = () => {
  return (
    <div className='footer'>
     <div className="footer-logo">
        <img src={logo} alt=""/>
       <p>ALANKARA</p>
        </div> 
        <ul className="footer-links">
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className="footer-social-icon">
          <div className="footer-icons-conmtainer">
            <img src={instagram_icon} alt=""/>
            </div>  
            <div className="footer-icons-conmtainer">
            <img src={whatsapp_icon} alt=""/>
            </div>  
            <div className="footer-icons-conmtainer">
            <img src={facebook_icon} alt=""/>
            </div>  

        </div>

<div className="footer-copyright">
    <hr/>
    <p>Copyright @2024 -All Rights Reserved</p>
</div>
    </div>
  )
}

export default Footer