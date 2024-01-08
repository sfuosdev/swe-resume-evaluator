import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PdfViewer from '../components/pdfViewer';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const Heading = styled.h2`
    font-weight: bold;
    margin-bottom: 10px;
    text-align: left;
    margin-left: 80px;
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: row; /* Change to 'row' for right-left layout */
    width: 100%;
`;

const PdfViewerWrapper = styled.div`
    flex: 1;
`;

const ResultWrapper = styled.div`
    flex: 1;
`;

const testPDFpath = require('../resources/sample.pdf');

function ReportingPage({ file }) {
    return (
        <Wrapper>
            <Heading>Resume Report</Heading>
            <ContentWrapper>
                <PdfViewerWrapper>
                    <PdfViewer file={file} width={600} height={800} />
                </PdfViewerWrapper>
                <ResultWrapper>result</ResultWrapper>
            </ContentWrapper>
        </Wrapper>
    );
}

ReportingPage.propTypes = {
    file: PropTypes.string,
};
ReportingPage.defaultProps = {
    file: testPDFpath,
};

export default ReportingPage;
