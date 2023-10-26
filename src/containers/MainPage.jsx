import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import DragAndDropIndicator from '../components/DragAndDropIndicator';

function MainPage() {
    return (
        <div>
            <Header />
            <Logo width={250} height={250} />
            <DragAndDropIndicator />
            <Footer />
        </div>
    );
}

export default MainPage;
