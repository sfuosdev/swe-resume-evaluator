import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
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
    const [numPages, setNumPages] = useState(0);

    // eslint-disable-next-line no-shadow
    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };
    const onDocumentError = (error) => {
        console.error('pdf viewer error', error);
    };
    return (
        <div style={{ width, height }}>
            <Document
                file={file}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentError}
            >
                {Array.from(new Array(numPages), (_, index) => {
                    return (
                        <Page
                            key={`page_${index + 1}`}
                            pageNumber={index + 1}
                            width={width}
                            height={height}
                            renderAnnotationLayer={false}
                            renderTextLayer={false}
                        />
                    );
                })}
            </Document>
        </div>
    );
}

PdfViewer.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    file: PropTypes.any.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
};

export default PdfViewer;
