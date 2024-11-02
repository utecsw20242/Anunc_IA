// Router.js
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ThemeProvider from "../layout/provider";
import WebsiteIntro from "../pages/Website/Home";
import LoginPage from "../pages/Website/Login";
import CreateAccountPage from "../pages/Website/CreateAccount";
import TemplatesPage from "../pages/App/Templates";
import TemplatesWriterPage from "../pages/App/Templates/Writer";

// app
import AppDashboard from "../pages/App/Dashboard";

// Importa el componente ProtectedRoute
import ProtectedRoute from "./ProtectedRoute";

const ScrollToTop = (props) => {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return <>{props.children}</>;
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
                        <Route path="template">
                            <Route index element={<TemplatesPage />} />
                            <Route path=":writerslug" element={<TemplatesWriterPage />} />
                        </Route>
                        {/* Ruta protegida del dashboard */}
                        <Route
                            path="dashboard"
                            element={
                                <ProtectedRoute>
                                    <AppDashboard />
                                </ProtectedRoute>
                            }
                        />
                    </Route>
                </Routes>
            </ScrollToTop>
        </BrowserRouter>
    );
}

export default Router;
