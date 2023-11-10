import React from 'react';
import PropTypes from 'prop-types';
import { Document, Page } from 'react-pdf';

/**
 * PdfViewer Component.
 *
 * @component
 *
 * @param {Object} props
 * @param {string} props.file The URL or file path of the PDF to display.
 * @param {number} props.width The width of the PDF viewer.
 * @param {number} props.height The height of the PDF viewer.
 *
 * @returns {ReactElement} Rendered component.
 */

function PdfViewer(props) {
    const { file, width, height } = props;
    return (
        <div style={{ width, height }}>
            <Document file={file}>
                <Page pageNumber={1} width={width} height={height} />
            </Document>
        </div>
    );
}

PdfViewer.propTypes = {
    file: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
};

export default PdfViewer;
