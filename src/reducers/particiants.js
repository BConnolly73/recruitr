// Participant reducer
const particiapntsReducerDefaultState = {};
export const participantsReducer = (state = particiapntsReducerDefaultState, action) => {
    switch (action.type) {
        case 'GET_PARTICIPANTS':
            return action.participants;
        case 'CREATE_PARTICIPANT':
            return [
                ...state,
                action.participant
            ];
        default:
            return state;
    }
};

export { participantsReducer as default };