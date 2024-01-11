/**
 * Initial State
 */
export const initialState = {
    routes: {
        user: null,
        resume: null,
    },
};

/**
 * Action Reducer
 */
function apiResponseReducer(prevState, dispatch) {
    let state;

    switch (dispatch.action) {
        case 'UPDATE_USER_RESPONSE':
            state = {
                routes: {
                    ...prevState.routes,
                    user: dispatch.value,
                },
            };
            break;
        case 'UPDATE_RESUME_RESPONSE':
            state = {
                routes: {
                    ...prevState.routes,
                    resume: dispatch.value,
                },
            };
            break;
        default:
            throw new Error(
                `API Response Reducer: Unhandled action type: ${dispatch.action}`,
            );
    }
    return state;
}

export default apiResponseReducer;
