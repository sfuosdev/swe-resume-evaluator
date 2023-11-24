import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Dropzone from '../components/Dropzone';
import DragAndDropIndicator from '../components/DragAndDropIndicator';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Heading = styled.h2`
    font-weight: bold;
    margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 600px;
`;
const DeclineButton = styled.button`
    position: relative;
    z-index: 2;
    font-size: 16px;
    margin-top: 20px; /* Adjust the margin to your preference */
    background-color: white;
    color: grey;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 4px;
    align-items: center;
    border-style: solid;
    border-color: grey;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #e6e6e6;
    }
`;

const AcceptButton = styled.button`
    position: relative;
    z-index: 2;
    font-size: 16px;
    margin-top: 20px; /* Adjust the margin to your preference */
    background-color: #01dfa5;
    color: white;
    padding: 10px 20px;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    align-items: center;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #008e74;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

const ErrorMessage = styled.p`
    color: red;
    margin-top: 10px;
`;

function UploadPage() {
    const [fileType, setFileType] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [fileUploaded, setFileUploaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();

    const allowedFileTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    // eslint-disable-next-line no-unused-vars
    const handleFileChange = (file) => {
        setFileType(file.type);
        setFileUploaded(true);

        if (!allowedFileTypes.includes(file.type)) {
            setErrorMessage(
                'Invalid file type. Please upload a PDF or Word document.',
            );
        } else {
            setErrorMessage(null);
        }
    };

    const handleAcceptButtonClick = () => {
        if (allowedFileTypes.includes(fileType)) {
            navigate('/loading');
        } else {
            setErrorMessage(
                'Invalid file type. Please upload a PDF or Word document.',
            );
        }
    };
    const handleDeclineButtonClick = () => {
        navigate('/termAndCondition');
    };

    return (
        <Wrapper>
            <Heading>File Upload</Heading>
            <Dropzone
                onFileChange={handleFileChange}
                width={600}
                height={150}
            />
            <DragAndDropIndicator onFileChange={handleFileChange} />
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <ButtonContainer>
                <DeclineButton type="button" onClick={handleDeclineButtonClick}>
                    Back
                </DeclineButton>
                <AcceptButton
                    type="button"
                    onClick={handleAcceptButtonClick}
                    disabled={
                        !fileUploaded || !allowedFileTypes.includes(fileType)
                    }
                >
                    Evaluate
                </AcceptButton>
            </ButtonContainer>
        </Wrapper>
    );
}

export default UploadPage;
