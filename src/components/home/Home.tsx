import AudioGear from "../layout/AudioGear";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import ProductShowcase from "../layout/ProductShowcase";
import CategoriesSection from "./CategoriesSection";
import HeroSection from "./HeroSection";

export default function HomePage() {
    return (
        <>
            <Header />
            <HeroSection />
            <CategoriesSection />
            <ProductShowcase />
            <AudioGear />
            <Footer />
        </>
    )
}

