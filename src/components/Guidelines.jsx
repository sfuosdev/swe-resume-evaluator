import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display flex;
    flex-direction: column;
    align-items: center;
    margin: 2rem 0;
`;

const Body = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const Guideline = styled.p`
    margin: 0.3rem 0;
    font-weight: 600;
`;

const Title = styled.h2`
    font-weight: 700;
`;

/**
 * Represents a component of guidelines explaining how to use ResumeEvaluator
 * @returns Guidelines
 */
function Guidelines() {
    return (
        <Wrapper>
            <Body>
                <Title>How To Use Our Service?</Title>
                <Guideline>
                    &#8594; Digitally Created PDF document Or Word Document
                </Guideline>
                <Guideline>&#8594; Is In English</Guideline>
                <Guideline>&#8594; Contains Readable Text</Guideline>
                <Guideline>&#8594; Not Password Protected</Guideline>
                <Guideline>&#8594; Only Your Resume</Guideline>
            </Body>
        </Wrapper>
    );
}

export default Guidelines;
