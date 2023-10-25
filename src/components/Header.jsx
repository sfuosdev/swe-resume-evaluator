import React, { useState } from 'react';
import styled from 'styled-components';
import LoginModal from './LoginModal';

const Wrapper = styled.div`
    display: flex;
    padding: 5px;
    border-size: 1px;
    border-width: 2px;
    border-style: dashed;
    justify-content: space-between;
    align-items: center;
`;

function Header() {
    const [isOn, setIsOn] = useState(false);
    const OnClose = () => {
        setIsOn(false);
    };

    return (
        <Wrapper>
            <div />
            <button type="button" onClick={() => setIsOn(true)}>
                Login
            </button>
            <LoginModal isOn={isOn} width={250} height={270} OnClose={OnClose}>
                <p>Login</p>
                <p>Sign up</p>
            </LoginModal>
        </Wrapper>
    );
}

export default Header;
