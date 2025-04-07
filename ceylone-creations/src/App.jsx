
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home/index';
import Navbar from './components/Navbar/navbar';
import Navbarartist from './components/Artists/navigation';
import Footer from './components/Footer/footer';
import Registerartisian from './pages/auth/artisansignup';
import CustomerRegister from './pages/auth/customersignup';
import SignIn from './pages/auth/signInpage';
import Artisiandashbord from './pages/artisans/artistdashbord';
import AddProduct from './pages/artisans/itemlisting';
import ProductList from './components/Hero/productgrid';
import ProductCard from './components/Hero/productcard';
import CategoryPage from './controllers/categorycontoller/productcategorycontroller';
import AllproductList from './pages/products/allproduct';
import Myitemlist from './pages/artisans/myitems';
import ProductDetail from './pages/products/productdetails';
import ReviewSection from './pages/ReviewRating/reviewsection';
import FullReviewPage from './pages/ReviewRating/allreviews';


function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation(); // Now inside BrowserRouter 

  const artisanRoutes = ["/artisanDashbord", "/listing", "/myitems", "/editproduct/:id"];
  const isArtisanPage = artisanRoutes.some(route => location.pathname.startsWith(route));

  return (
    <div className="App">
      {isArtisanPage ? <Navbarartist /> : <Navbar />}
      <div className="white-gradient">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registerartist" element={<Registerartisian />} />
          <Route path="/registercustomer" element={<CustomerRegister />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/artisanDashbord" element={<Artisiandashbord />} />
          <Route path="/listing" element={<AddProduct />} />
          <Route path="/productgrid" element={<ProductList />} />
          <Route path="/productcard" element={<ProductCard />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/allproducts" element={<AllproductList />} />
          <Route path="/myitems" element={<Myitemlist />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/review" element={<ReviewSection />} />
          <Route path="/reviews/:productId" element={<FullReviewPage />} />

          
          {/* Add other routes here */}
         
         
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
