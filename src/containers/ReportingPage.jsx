import React from 'react';
import { useResumeApi } from '../hooks/useResumeAPI';

function ReportingPage() {
    const { apiResponse } = useResumeApi();
    console.log(apiResponse);
    return (
        <div>
            <p>Reporting Page</p>
            {apiResponse && (
                <p>
                    Your job is {apiResponse.job_matches.job_name}, which is{' '}
                    {apiResponse.job_matches.is_IT}. Your score is{' '}
                    {apiResponse.job_matches.similarity}
                </p>
            )}
        </div>
    );
}

export default ReportingPage;
