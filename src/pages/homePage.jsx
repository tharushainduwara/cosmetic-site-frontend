import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import { ProductPage } from "./productPage";
import ProductOverview from "./productOverview";
import CartPage from "./cart";
import CheckoutPage from "./checkout";
import LandingPage from "./landingPage";
import AboutPage from "./aboutPage";
import ContactPage from "./contactPage";
import TermsPage from "./termsPage";
import PrivacyPage from "./privacyPage";

export default function HomePage(){
    return(
        <div className="w-full h-full bg-primary">
            <Header/>
            <Routes path="/">
               <Route path="/" element={<LandingPage/>}/>
               <Route path="/products" element={<ProductPage/>}/>
               <Route path="/contact" element={<ContactPage/>}/>
               <Route path="/about" element={<AboutPage/>}/>
               <Route path="/overview/:id" element={<ProductOverview/>}/>
               <Route path="/cart" element={<CartPage/>}/>
               <Route path="/checkout" element={<CheckoutPage/>}/>
            </Routes>
        </div>
    )
}