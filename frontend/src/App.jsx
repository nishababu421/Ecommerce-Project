import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShopCategory from './pages/ShopCategory';
import Shop from './pages/Shop';
import Product from './pages/Product';  // Assuming Product component exists
import Cart from './pages/Cart';  // Assuming Cart component exists
import LoginSignup from './pages/LoginSignup';  // Assuming LoginSignup component exists
 import Footer from './components/Footer/Footer';
 import men_banner from './components/Assets/men_banner.png'
 import women_banner from './components/Assets/women_banner.png'
  import kid_banner from './components/Assets/kid_banner.png'
 function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/mens' element={<ShopCategory banner={men_banner} category="men" />} />
          <Route path='/womens' element={<ShopCategory banner={women_banner} category="women" />} />
          <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid" />} />
          <Route path='/product' element={<Product />} >
          <Route path=':productId' element={<product/>}/>
          </Route>
          <Route path='/cart' element={<Cart/>} />
          <Route path='/login' element={<LoginSignup/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
