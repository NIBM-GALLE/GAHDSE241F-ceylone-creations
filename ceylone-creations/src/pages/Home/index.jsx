import React from 'react';
import BannerSlider from '../../components/Hero/bannerslider';
import CategoryList from '../../components/Hero/categorylist';
import FeatureSection from '../../components/Hero/featuresection';
import MaterialSlider from '../../components/Hero/materialslider';
import Gallery from '../../components/Hero/craftgalary';
import ProductList from '../../components/Hero/productgrid';

const Home = () => {
    return (
        <div className="home-container">
         <BannerSlider />
         <CategoryList />
         <MaterialSlider/>
         <FeatureSection />
         <ProductList />
         <Gallery />
        </div>
    );
}
export default Home;