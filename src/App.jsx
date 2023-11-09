import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './containers/MainPage';
import ReportingPage from './containers/ReportingPage';
import LoadingPage from './containers/LoadingPage';
import NotFoundPage from './containers/NotFoundPage';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
    return (
        <div className="App">
            <Header />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/loading" element={<LoadingPage />} />
                    <Route path="/result/:rId" element={<ReportingPage />} />
                    {/* Exception Handling Page */}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </BrowserRouter>
            <Footer />
        </div>
    );
}

export default App;
