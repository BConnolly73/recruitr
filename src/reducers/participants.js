const participantsReducerDefaultState = [];
export const participantsReducer = (state = participantsReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_PARTICIPANT':
            return [
                ...state,
                action.participant
            ];
        default:
            return state;
    }
};

export { participantsReducer as default };