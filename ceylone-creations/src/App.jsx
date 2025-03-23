//import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/index';
import Navbar from './components/Navbar/navbar';
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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <div className="white-gradient">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/registerartist" element={<Registerartisian/>} />
          <Route path="/registercustomer" element={<CustomerRegister/>} />
          <Route path="/login" element={<SignIn/>} />
          <Route path="/artisanDashbord" element={<Artisiandashbord/>}/>
          <Route path="/listing" element={<AddProduct/>}/>
          <Route path="/productgrid" element={<ProductList/>}/>
          <Route path="/productcard" element={<ProductCard/>}/> 
          <Route path="/category/:categoryId" element={<CategoryPage />}/>
          <Route path="/allproducts" element={<AllproductList/>}/>
        </Routes>
      
      </div>
      <Footer/>
    </BrowserRouter>

    
    </div>
  );
}

export default App;
