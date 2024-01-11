import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useResumeApi } from '../hooks/useResumeAPI';
import PdfViewer from '../components/pdfViewer';
import Logo from '../components/Logo';

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
    flex-direction: row;
    width: 100%;
`;

const PdfViewerWrapper = styled.div`
    flex: 1;
`;

const ResultWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const JobWrapper = styled.div`
    flex: 1;
    font-weight: bold;
    font-size: 20px;
    padding: 5px;
    margin-bottom: 50px;
    text-align: left;
`;
const ScoreWrapper = styled.div`
    flex: 1;
    font-weight: bold;
    font-size: 20px;
    padding: 5px;
    text-align: left;
    margin-bottom: 50px;
    border-top: 2px solid #ccc;
`;
const JobScoreWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const ValidWrapper = styled.div`
    flex: 1;
`;
const UpperComentWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
`;
const CommentWrapper = styled.div`
    flex: 2;
    text-align: left;
    padding: 5px;
`;

function ReportingPage() {
    const { apiResponse } = useResumeApi();
    const location = useLocation();
    const fileURL = location.state?.fileURL;
    return (
        <Wrapper>
            <Heading>Resume Report</Heading>
            <ContentWrapper>
                <PdfViewerWrapper>
                    <PdfViewer file={fileURL} width={600} height={800} />
                </PdfViewerWrapper>
                <ResultWrapper>
                    {apiResponse ? (
                        <>
                            <UpperComentWrapper>
                                <JobScoreWrapper>
                                    <JobWrapper>
                                        Matching Job
                                        <p style={{ fontSize: '30px' }}>
                                            {apiResponse.job_matches
                                                ? apiResponse.job_matches
                                                      .job_name
                                                : 'DEFAULT JOB'}
                                        </p>
                                    </JobWrapper>
                                    <ScoreWrapper>
                                        Resume Score
                                        <span
                                            style={{
                                                marginLeft: '50px',
                                                fontWeight: 'bold',
                                                fontSize: '30px',
                                                color: '#ECAD62',
                                            }}
                                        >
                                            {apiResponse.job_matches
                                                ? apiResponse.job_matches
                                                      .similarity
                                                : '##'}
                                        </span>
                                    </ScoreWrapper>
                                </JobScoreWrapper>
                                <ValidWrapper>
                                    <Logo width={200} height={200} />
                                </ValidWrapper>
                            </UpperComentWrapper>
                            <CommentWrapper>
                                <p
                                    style={{
                                        fontWeight: 'bold',
                                        fontSize: '16px',
                                    }}
                                >
                                    DEFAULT JOB
                                </p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum
                                dolore eu fugiat nulla pariatur. Excepteur sint
                                occaecat cupidatat non proident, sunt in culpa
                                qui officia deserunt mollit anim id est laborum.
                            </CommentWrapper>
                        </>
                    ) : (
                        <p>apiResponse not Returned</p>
                    )}
                </ResultWrapper>
            </ContentWrapper>
        </Wrapper>
    );
}
export default ReportingPage;
