import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DarkBG = styled.div`
    position: absolute;
    background-color: rgba(0, 0, 0, 0.2);
    width: 100vw;
    height: 100vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const ModalBox = styled.div`
    position: absolute;
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    background-color: white;
    border: 2px black solid;
    top: 2rem;
    right: 0;
`;

/** a simple Modal component */
function Modal({ isOn, width, height, OnClose, children }) {
    return (
        <DarkBG
            style={isOn ? { display: 'block' } : { display: 'none' }}
            onClick={OnClose}
            data-testid="darkBG"
        >
            <ModalBox
                width={width}
                height={height}
                data-testid="modal"
                onClick={(e) => e.stopPropagation()}
            >
                <h1>Modal</h1>
                <button type="button" onClick={OnClose}>
                    Close
                </button>
                {children}
            </ModalBox>
        </DarkBG>
    );
}

Modal.propTypes = {
    isOn: PropTypes.bool,
    width: PropTypes.number,
    height: PropTypes.number,
    children: PropTypes.arrayOf(PropTypes.element),
    OnClose: PropTypes.func,
};

Modal.defaultProps = {
    isOn: true,
    width: 250,
    height: 270,
    children: null,
    OnClose: null,
};

export default Modal;
