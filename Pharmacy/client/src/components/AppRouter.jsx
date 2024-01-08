import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import FAQ from '../pages/FAQ';
import Medicines from '../pages/Medicines';
import Types from '../pages/Types';
import NotFound from '../pages/NotFound';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Logout from './Logout';
import Manufacturers from "../pages/Manufacturers";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/medicines" element={<Medicines />} />
            <Route path="/types" element={<Types />} />
            <Route path="/manufacturers" element={<Manufacturers />} />

            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRouter;
