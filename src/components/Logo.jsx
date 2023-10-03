import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import logo from '../resources/logo.png';

const Image = styled.img`
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
`;

/**
 * Logo component displays a logo image or an alt text for a width and height given by the props
 */
function Logo({ width, height }) {
    return <Image src={logo} width={width} height={height} alt="logo" />;
}

Logo.propTypes = {
    /** Width size in pixel for the logo component.  */
    width: PropTypes.number,
    /** Height size in pixel for the logo component.  */
    height: PropTypes.number,
};

Logo.defaultProps = {
    width: 150,
    height: 150,
};

export default Logo;
