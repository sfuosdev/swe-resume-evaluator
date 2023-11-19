import React, { useState } from 'react';
import { SlUser } from 'react-icons/sl';
import styled from 'styled-components';
import LoginModal from './LoginModal';

const Wrapper = styled.div`
    display: flex;
    padding: 5px;
    border-size: 1px;
    border-width: 2px;
    justify-content: space-between;
    padding: 25px 25px 0px 25px;
    align-items: center;
`;

const LoginButton = styled.button`
    background-color: rgba(51, 51, 51, 0.05);
    border-radius: 8px;
    border-width: 0;
    color: #333333;
    cursor: pointer;
    display: inline-block;
    font-family: 'Haas Grot Text R Web', 'Helvetica Neue', Helvetica, Arial,
        sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    list-style: none;
    margin: 0;
    padding: 10px 12px;
    text-align: center;
    transition: all 200ms;
    vertical-align: baseline;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
`;

function Header() {
    const [isLoginModalOn, setLoginModalOn] = useState(false);
    const OnClose = () => {
        setLoginModalOn(false);
    };

    return (
        <Wrapper>
            <div />
            <LoginButton type="button" onClick={() => setLoginModalOn(true)}>
                <SlUser size={30} />
            </LoginButton>
            <LoginModal
                isOn={isLoginModalOn}
                width={250}
                height={300}
                OnClose={OnClose}
            />
        </Wrapper>
    );
}

export default Header;
