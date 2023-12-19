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

    if (!isLoading && state.routes.resume) {
        // Navigate to the result page when "loaded" becomes true
        navigate('/result/0x00', { replace: true }); // Handle :rID value here
    }

    useEffect(() => {
        const loadingTimeout = setTimeout(() => {
            setLoading(false);
        }, 10000); // 10 seconds

        return () => clearTimeout(loadingTimeout);
    }, []);

    return (
        <div>
            <ProgressText loading />
        </div>
    );
}

export default Loading;
