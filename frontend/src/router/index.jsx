import React, {useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ThemeProvider from "../layout/provider";
import WebsiteIntro from "../pages/Website/Home";
import LoginPage from "../pages/Website/Login";
import CreateAccountPage from "../pages/Website/CreateAccount";

//app
import AppDashboard from "../pages/App/Dashboard";


//admin
import AdminDashboard from "../pages/Admin/Dashboard";


import { useLocation } from "react-router";

const ScrollToTop = (props) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>
};

function Router() {
    return (
        <BrowserRouter>
            <ScrollToTop>
                <Routes>
                    <Route element={<ThemeProvider />}>
                        <Route index element={<WebsiteIntro />} />
                            <Route path="login" element={<LoginPage />} />
                            <Route path="create-account" element={<CreateAccountPage />} />
                        
                        <Route path="dashboard">
                            <Route index element={<AppDashboard />} />
                        </Route>
                        <Route path="app">
                            <Route index element={<AdminDashboard />} />
                            <Route path="dashboard" element={<AdminDashboard />} />
                        </Route>
                    </Route>
                </Routes>
            </ScrollToTop>
        </BrowserRouter>
    );
}

export default Router;
