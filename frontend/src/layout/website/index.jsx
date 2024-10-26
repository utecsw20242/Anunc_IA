import React, {useState,useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet, HelmetProvider } from "react-helmet-async";

function DefaultLayout({ title, children, className }) {
    const [mobile, setMobile] = useState(false);
    const [menuVisibility, setMenuVisibility] = useState(false);
    
    useEffect(() => {
        const handleMobile = () => {
            if (window.innerWidth < 1140) {
                setTimeout(setMobile(true), 3000);
            } else {
                setMobile(false);
                setMenuVisibility(false);
            }
        }
    
        handleMobile();
        window.addEventListener('resize', handleMobile);
        return () => {
            window.removeEventListener('resize', handleMobile);
        };
    }, []);
    return (
        <HelmetProvider>
            <Helmet>
                <title>{`${title ? title + " - " : '' }AnuncIA`}</title>
            </Helmet>
            <div className={`flex flex-col min-h-screen overflow-x-hidden max-w-full pt-16 ${className}`}>
                <Header mobile={mobile} visibility={menuVisibility} setVisibility={setMenuVisibility} />
                {children}
                <Footer />
            </div>
        </HelmetProvider>
    );
}

export default DefaultLayout;
