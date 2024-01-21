import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

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
                <div>
                    <a href="https://github.com/sfuosdev">
                        <FontAwesomeIcon
                            icon={faGithub}
                            style={{ marginRight: '10px' }}
                        />
                        About Us
                    </a>
                </div>
            </WrapperLeft>
            <div>SFU OS Devlopment Club</div>
        </Wrapper>
    );
}

export default Footer;
