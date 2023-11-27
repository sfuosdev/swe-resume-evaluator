import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { useResumeApi } from '../hooks/useResumeAPI';

const ResumeContext = createContext();

function ResumeContextProvider({ children }) {
    const [apiResponse] = useResumeApi();

    return (
        <ResumeContext.Provider value={apiResponse}>
            {children}
        </ResumeContext.Provider>
    );
}

ResumeContextProvider.propTypes = {
    children: PropTypes.node,
};

ResumeContextProvider.defaultProps = {
    children: null,
};

// use useContext(ResumeContext) to get apiResponse
export { ResumeContext, ResumeContextProvider };
