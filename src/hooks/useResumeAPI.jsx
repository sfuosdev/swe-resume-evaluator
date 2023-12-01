import { useState } from 'react';

export const useResumeApi = () => {
    const [apiResponse, setResponse] = useState('');
    const [file, setFile] = useState(null);

    const fileChange = (upload) => {
        setFile(upload);
    };

    const callApi = async () => {
        if (file) {
            const data = new FormData();
            data.append('file', file);
            try {
                await fetch('http://localhost:4000/resume', {
                    method: 'POST',
                    body: data,
                })
                    .then((response) => response.json())
                    .then((res) => setResponse(res));
            } catch (error) {
                console.log(error);
            }
        }
    };

    return [fileChange, callApi, apiResponse];
};
