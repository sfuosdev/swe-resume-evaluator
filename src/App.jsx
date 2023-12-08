import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import MainPage from './containers/MainPage';
import ReportingPage from './containers/ReportingPage';
import TermAndConditionPage from './containers/TermAndConditionPage';
import LoadingPage from './containers/LoadingPage';
import NotFoundPage from './containers/NotFoundPage';
import UploadPage from './containers/UploadPage';
import Header from './components/Header';
import Footer from './components/Footer';

const AppWrapper = styled.div`
    display: flex;
    height: 100vh;
    flex-direction: column;
    justify-content: space-between;
`;

function App() {
    return (
        <div className="App">
            <AppWrapper>
                <Header />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route
                            path="/termAndCondition"
                            element={<TermAndConditionPage />}
                        />
                        <Route path="/upload" element={<UploadPage />} />
                        <Route path="/loading" element={<LoadingPage />} />
                        <Route
                            path="/result/:rId"
                            element={<ReportingPage />}
                        />
                        {/* Exception Handling Page */}
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </AppWrapper>
        </div>
    );
}

export default App;
