import React, { createContext, useContext, useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';
import apiResponseReducer, { initialState } from './apiResponseReducer';

const ApiResponseContext = createContext();

function ApiResponseContextProvider({ children }) {
    const [state, dispatch] = useReducer(apiResponseReducer, initialState);
    return (
        <ApiResponseContext.Provider
            value={useMemo(() => {
                return [state, dispatch];
            }, [state, dispatch])}
        >
            {children}
        </ApiResponseContext.Provider>
    );
}

function useApiResponseContext() {
    return useContext(ApiResponseContext);
}

ApiResponseContextProvider.propTypes = {
    children: PropTypes.node,
};

ApiResponseContextProvider.defaultProps = {
    children: null,
};

// use useApiResponseContext to get apiResponse
export { ApiResponseContextProvider, useApiResponseContext };
