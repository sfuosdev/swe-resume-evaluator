import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProgressText from '../components/ProgressText';

function Loading() {
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    // eslint-disable-next-line no-unused-vars
    const encodedFile = { ...location.state }; // received file object

    useEffect(() => {
        const loadingTimeout = setTimeout(() => {
            setLoaded(true);
        }, 10000); // 10 seconds

        return () => clearTimeout(loadingTimeout);
    }, []);

    useEffect(() => {
        if (loaded) {
            // Navigate to the result page when "loaded" becomes true
            navigate('/result/0x00', { replace: true }); // Handle :rID value here
        }
    }, [loaded, navigate]);

    return (
        <div>
            <ProgressText loading />
        </div>
    );
}

export default Loading;
