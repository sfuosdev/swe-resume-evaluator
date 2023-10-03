import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    padding: 5px;
    border-size: 1px;
    border-width: 2px;
    border-style: dashed;
    justify-content: space-between;
    align-items: center;
`;

function Footer() {
    return (
        <Wrapper>
            <div />
            About Us
        </Wrapper>
    );
}

export default Footer;
