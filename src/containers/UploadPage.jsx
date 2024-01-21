import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Dropzone from '../components/Dropzone';
import { useResumeApi } from '../hooks/useResumeAPI';
import StepIndicator from '../components/StepIndicator';

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
    const [fileToUpload, setFileToUpload] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const { evaluateResume } = useResumeApi();

    const navigate = useNavigate();

    const allowedFileTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    // eslint-disable-next-line no-unused-vars
    const handleFileChange = (file) => {
        if (!allowedFileTypes.includes(file.type)) {
            setErrorMessage(
                'Invalid file type. Please upload a PDF or Word document.',
            );
        } else {
            setFileType(file.type);
            setFileToUpload(file);
            setErrorMessage(null);
        }
    };

    const handleAcceptButtonClick = () => {
        if (fileToUpload && allowedFileTypes.includes(fileType)) {
            evaluateResume(fileToUpload);
            navigate('/loading', {
                state: { fileURL: fileToUpload },
            });
        } else {
            setErrorMessage(
                'Invalid file type. Please upload a PDF or Word document.',
            );
        }
    };
    const handleDeclineButtonClick = () => {
        navigate('/guideline');
    };

    return (
        <Wrapper>
            <Heading>File Upload</Heading>
            <Dropzone
                onFileChange={handleFileChange}
                width={600}
                height={150}
            />
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <ButtonContainer>
                <DeclineButton type="button" onClick={handleDeclineButtonClick}>
                    Back
                </DeclineButton>
                <AcceptButton
                    type="button"
                    onClick={handleAcceptButtonClick}
                    disabled={
                        !fileToUpload || !allowedFileTypes.includes(fileType)
                    }
                >
                    Evaluate
                </AcceptButton>
            </ButtonContainer>
            <StepIndicator pageNum={3} />
        </Wrapper>
    );
}

export default UploadPage;
