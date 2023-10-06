import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import Dropzone from '../components/Dropzone';

function MainPage() {
    return (
        <div>
            <Header />
            <Logo width={250} height={250} />
            <Dropzone />
            <Footer />
        </div>
    );
}

export default MainPage;
