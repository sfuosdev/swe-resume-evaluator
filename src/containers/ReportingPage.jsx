import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useResumeApi } from '../hooks/useResumeAPI';
import PdfViewer from '../components/pdfViewer';
import Logo from '../components/Logo';
import jobsData from '../resources/jobs.json';

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
    const result = apiResponse?.job_matches;
    const resultJob = jobsData.jobs.find(
        (job) => job.job_name === result.job_name,
    );
    const jobDes = resultJob
        ? resultJob.job_description
        : 'This job is not considered as a proper job';

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
                                            {result.job_name}
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
                                            {result.similarity}
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
                                    {result.job_name}
                                </p>
                                {jobDes}
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
