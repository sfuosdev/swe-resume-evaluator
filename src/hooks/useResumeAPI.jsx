import { useCallback, useEffect, useState } from 'react';

export const useResumeApi = () => {
    const [apiResponse, setResponse] = useState('');
    const [file, setFile] = useState(null);

    const fileChange = (upload) => {
        if (!upload) {
            console.log('upload is undefined');
        }
        setFile(upload);
    };

    const callApi = useCallback(async () => {
        if (file) {
            const data = new FormData();
            data.append('file', file);
            try {
                await fetch('http://localhost:4000/resume', {
                    method: 'POST',
                    body: data,
                    mode: 'cors',
                })
                    .then((response) => response.json())
                    .then((res) => {
                        setResponse(res);
                        console.log(apiResponse);
                    });
            } catch (error) {
                console.log(error);
            }
        }
    }, [file, apiResponse]);

    useEffect(() => {
        callApi();
    }, [callApi]);

    return [fileChange, callApi, apiResponse];
};
