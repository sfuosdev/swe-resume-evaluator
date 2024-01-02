import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProgressText from '../components/ProgressText';
import { useApiResponseContext } from '../context/apiResponseContext';

function Loading() {
    const [isLoading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    // eslint-disable-next-line no-unused-vars
    const encodedFile = { ...location.state }; // received file object
    const [state] = useApiResponseContext();

    useEffect(() => {
        const loadingTimeout = setTimeout(() => {
            setLoading(false);
        }, 10000); // 10 seconds

        return () => clearTimeout(loadingTimeout);
    }, []);

    useEffect(() => {
        if (!isLoading) {
            if (state.routes.resume) {
                // Navigate to the worked result page when "loaded" is available
                navigate('/result/worked', { replace: true }); // Handle :rID value here
            }
        }
    }, [isLoading, state.routes.resume, navigate]);

    return (
        <div>
            <ProgressText loading />
        </div>
    );
}

export default Loading;
