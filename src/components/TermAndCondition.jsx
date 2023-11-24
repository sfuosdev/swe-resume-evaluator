import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Text from '../resources/termAndCondition.txt';

const TextBox = styled.div`
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    border: 1px solid #ccc;
    overflow: auto;
    text-align: left;
    line-height: 1.5;
    margin-bottom: 10px;
`;

/**
 * TermAndCondtion component displays the term and condition text
 */
function TermAndCondition({ width, height }) {
    const [termAndConditionText, setTermAndConditionText] = useState('');
    useEffect(() => {
        fetch(Text)
            .then((response) => response.text())
            .then((text) => setTermAndConditionText(text));
    }, []);
    return (
        <TextBox width={width} height={height}>
            {termAndConditionText}
        </TextBox>
    );
}

TermAndCondition.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
};

TermAndCondition.defaultProps = {
    width: 150,
    height: 150,
};

export default TermAndCondition;
