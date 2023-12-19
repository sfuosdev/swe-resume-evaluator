import React from 'react';
import { useResumeApi } from '../hooks/useResumeAPI';

function ReportingPage() {
    const { apiResponse } = useResumeApi();
    console.log(apiResponse);
    return (
        <div>
            <p>Reporting Page</p>
        </div>
    );
}

export default ReportingPage;
