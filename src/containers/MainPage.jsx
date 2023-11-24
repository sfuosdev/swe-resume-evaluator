import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../components/Logo';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const NextButton = styled.button`
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
`;

function MainPage() {
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/termAndCondition');
    };

    return (
        <Wrapper>
            <Logo width={250} height={250} />
            <NextButton type="button" onClick={handleButtonClick}>
                Upload Resume
            </NextButton>
        </Wrapper>
    );
}

export default MainPage;
