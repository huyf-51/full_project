import './App.css';
import Navbar from './Components/Navbar/Navbar'
import {BrowserRouter,Routes,Route} from 'react-router-dom'; 
import ShopCategory from './Pages/ShopCategory';
import Menu from './Pages/Menu';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
import iphone_banner from './Components/Assets/banner/banner_iphone.jpg'
import mac_banner from './Components/Assets/banner/banner_mac.png'
import watch_banner from './Components/Assets/banner/banner_watch.jpg'
import ipad_banner from './Components/Assets/banner/banner_ipad.png'
import Shipping from './Pages/Order/Shipping';
import Checkout from './Pages/Order/Checkout';
import Promotion from './Pages/Promotion';


function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      {/* routing url for all route in frontend*/}
      <Routes>
        <Route path='/' element={<Menu/>}/>
        <Route path='/iPhone' element={<ShopCategory banner={iphone_banner} category="iphone"/>}/> 
        <Route path='/iPad' element={<ShopCategory banner={ipad_banner} category="ipad"/>}/>
        <Route path='/Mac' element={<ShopCategory banner={mac_banner} category="mac"/>}/>
        <Route path='/Watch' element={<ShopCategory banner={watch_banner} category="watch"/>}/>
        <Route path='/Promotion' element={<Promotion/>}/>
        <Route path="/product" element={<Product/>}>
          <Route path=':productId' element={<Product/>}/> {/* routing url for specified product*/}
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}/>
        <Route path='/shipping' element={<Shipping/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
