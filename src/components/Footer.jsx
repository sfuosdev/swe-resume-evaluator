import React from 'react';
import { css } from '@emotion/react';

function Footer() {
    return (
        <div
            css={css`
                display: flex;
                padding: 5px;
                border-size: 1px;
                border-width: 2px;
                border-style: dashed;
                justify-content: space-between;
                align-items: center;
            `}
        >
            <div />
            About Us
        </div>
    );
}

export default Footer;
