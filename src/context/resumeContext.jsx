import React, { createContext, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useResumeApi } from '../hooks/useResumeAPI';

const ResumeContext = createContext();

function ResumeContextProvider({ children }) {
    const [apiResponse] = useResumeApi();
    console.log(apiResponse);
    const contextValue = useMemo(() => {
        return apiResponse;
    }, [apiResponse]);
    return (
        <ResumeContext.Provider value={contextValue}>
            {children}
        </ResumeContext.Provider>
    );
}

function useResumeContext() {
    return useContext(ResumeContext);
}

ResumeContextProvider.propTypes = {
    children: PropTypes.node,
};

ResumeContextProvider.defaultProps = {
    children: null,
};

// use useContext(ResumeContext) to get apiResponse
export { ResumeContextProvider, useResumeContext };
