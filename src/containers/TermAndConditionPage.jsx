import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TermAndCondition from '../components/TermAndCondition';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.h2`
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
`;

function TermAndConditionPage() {
    const navigate = useNavigate();
    const handleAcceptButtonClick = () => {
        navigate('/upload');
    };
    const handleDeclineButtonClick = () => {
        navigate('/');
    };

    return (
        <Wrapper>
            <Title>Terms And Conditions</Title>
            <TermAndCondition width={600} height={300} />
            <ButtonContainer>
                <DeclineButton type="button" onClick={handleDeclineButtonClick}>
                    Decline
                </DeclineButton>
                <AcceptButton type="button" onClick={handleAcceptButtonClick}>
                    Accept
                </AcceptButton>
            </ButtonContainer>
        </Wrapper>
    );
}

export default TermAndConditionPage;
