import React from 'react';
import Logo from '../components/Logo';
import Dropzone from '../components/Dropzone';

function MainPage() {
    return (
        <div>
            <Logo width={250} height={250} />
            <Dropzone />
        </div>
    );
}

export default MainPage;
