export const postActions = {
    SUBMIT_POST: 'SUBMIT_POST',
    HANDLE_ERROR: 'HANDLE_ERROR',
};

export const postsStates = {
    error: false,
    posts : [],
};

export const PostReducer = (state, action) => {
    switch (action.type) {
        case postActions.SUBMIT_POST:
            return {
                ...state,
                error: false,
                posts: action.posts,
            };
        case postActions.HANDLE_ERROR:
            return {
                ...state,
                error: true,
                posts: [],
            };
        default:
            return state;
    }
}