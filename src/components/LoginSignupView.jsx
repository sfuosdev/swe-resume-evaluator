import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Social = styled.button`
    background-color: #0077b5;
    justify-content: center;
    width: 80%;
    color: white;
    border: none;
    padding: 10px 20px;
    margin: 0px 0px 4px;
    cursor: pointer;
`;

const TextBox = styled.input`
    width: 80%;
    padding: 10px;
    margin: 2px 0px 0px;
`;

const ActionButton = styled.button`
    margin: 10px 0px 0px;
`;

const SwitchButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    background: none;
    border: none;
    padding: 0;
    font-size: 14px;
    cursor: pointer;
    color: #000000;

    &:focus {
        outline: none;
    }
`;

const Header = styled.div`
    height: 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    border-bottom: 1px solid grey;
`;

const Body = styled.div`
    height: 67%;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 10px;
    justify-content: flex-start;
`;

const Footer = styled.div`
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3px;
    border-top: 1px solid grey;
`;

function LoginSignupView({ isLogin, toggleView }) {
    const [username, setID] = useState('');
    const [password, setPassword] = useState('');

    const toggleViewHandler = (event) => {
        const newIsLogin = typeof event === 'boolean' ? event : !isLogin;
        toggleView(newIsLogin);
    };

    return (
        <>
            <Header>{isLogin ? 'LOG IN' : 'SIGN UP'}</Header>
            <Body>
                <Social>
                    {isLogin ? 'Log In with Facebook' : 'Sign Up with Facebook'}
                </Social>
                <Social>
                    {isLogin ? 'Log In with Google' : 'Sign Up with Google'}
                </Social>
                <TextBox
                    type="text"
                    placeholder="ID"
                    value={username}
                    onChange={(e) => setID(e.target.value)}
                />
                <TextBox
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <ActionButton type="button">
                    {isLogin ? 'Log In' : 'Sign Up'}
                </ActionButton>
            </Body>
            <Footer>
                <SwitchButton type="button" onClick={toggleViewHandler}>
                    {isLogin
                        ? 'Do not have an account? Sign up'
                        : 'Already have an account? Log in'}
                </SwitchButton>
            </Footer>
        </>
    );
}

LoginSignupView.propTypes = {
    isLogin: PropTypes.bool,
    toggleView: PropTypes.func,
};

LoginSignupView.defaultProps = {
    isLogin: true,
    toggleView: null,
};

export default LoginSignupView;
