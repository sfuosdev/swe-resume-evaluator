import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Dropzone from '../components/Dropzone';
import DragAndDropIndicator from '../components/DragAndDropIndicator';

function MainPage() {
    // eslint-disable-next-line no-unused-vars
    const [fileUploaded, setFileUploaded] = useState(false);
    const navigate = useNavigate();

    // eslint-disable-next-line no-unused-vars
    const handleFileChange = (file) => {
        // Perform any necessary operations with the uploaded file here
        setFileUploaded(true);
        navigate('/loading');
        setTimeout(() => {
            navigate('/result/0x16', { replace: true }); // Have to add rID from 'file' later
        }, 10000); // 10 sec delay
    };
    return (
        <div>
            <Logo width={250} height={250} />
            <Dropzone onFileChange={handleFileChange} />
            <DragAndDropIndicator onFileChange={handleFileChange} />
        </div>
    );
}

export default MainPage;
