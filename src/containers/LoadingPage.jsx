import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProgressText from '../components/ProgressText';
import { useApiResponseContext } from '../context/apiResponseContext';

function Loading() {
    const [isLoading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const fileURL = location.state?.fileURL;
    const [state] = useApiResponseContext();

    useEffect(() => {
        const loadingTimeout = setTimeout(() => {
            setLoading(false);
        }, 5000); // 5 seconds

        return () => clearTimeout(loadingTimeout);
    }, []);

    useEffect(() => {
        if (!isLoading) {
            if (state.routes.resume) {
                // Navigate to the worked result page when "loaded" is available
                navigate('/result/worked', {
                    replace: true,
                    state: { fileURL },
                }); // Handle :rID value here
            }
        }
    }, [isLoading, state.routes.resume, navigate, fileURL]);

    return (
        <div>
            <ProgressText loading />
        </div>
    );
}

export default Loading;
