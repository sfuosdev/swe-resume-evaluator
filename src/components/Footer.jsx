import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 5px;
    border-size: 1px;
    border-width: 2px;
    padding: 0px 25px 25px 25px;
    align-items: center;
`;

const WrapperLeft = styled.div`
    display: flex;
    flex-direction: row;
    color: green;

    > * {
        margin-left: 25px;
        margin-right: 25px;
    }
`;

function Footer() {
    return (
        <Wrapper>
            <WrapperLeft>
                <div>Term of Service</div>
                <div>About Us</div>
            </WrapperLeft>
            <div>2023 SFU OS Development club</div>
        </Wrapper>
    );
}

export default Footer;
