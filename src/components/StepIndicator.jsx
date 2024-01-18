import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 800px;
`;

const StepContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;
`;

const Step = styled.div`
    padding: 10px;
    margin: 5px;
    width: 20px;
    height: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    border-color: ${(props) => (props.active ? '#01dfa5' : '#E4E2E2')};
    text-align: center;
    font-size: 15px;
    font-weight: bold;
    background-color: #e4e2e2;
`;

const StepName = styled.div`
    font-size: 15px;
    font-weight: bold;
    margin-top: 5px;
    color: black;
    margin: 5px;
`;

const Bar = styled.div`
    height: 2px;
    width: 120px;
    background-color: ${(props) => (props.active ? '#01dfa5' : '#E4E2E2')};
    position: absolute;
    top: 50%;
    left: calc(100% + 30px);
    transform: translateY(-50%);
`;

/**
 * StepIndicator component indicate user's current step in page indexes
 */
function StepIndicator({ pageNum }) {
    const steps = [
        { page: '1', name: 'Term & Condition' },
        { page: '2', name: 'Guideline' },
        { page: '3', name: 'File Upload' },
    ];

    return (
        <Wrapper>
            {steps.map((step, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <StepContainer key={index}>
                    <Step active={index <= pageNum - 1}>{step.page}</Step>
                    {index < steps.length - 1 && (
                        <Bar active={index < pageNum - 1} />
                    )}
                    <StepName>{step.name}</StepName>
                </StepContainer>
            ))}
        </Wrapper>
    );
}

StepIndicator.propTypes = {
    pageNum: PropTypes.number.isRequired,
};

export default StepIndicator;
