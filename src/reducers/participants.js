const participantsReducerDefaultState = [];
export const participantsReducer = (state = participantsReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_PARTICIPANT':
            return [
                ...state,
                action.participant
            ];
        case 'SET_PARTICIPANTS':
            return action.participants;
        case 'EDIT_PARTICIPANT':
            return state.map((participant) => {
                if (participant.id === action.id) {
                    return {
                        ...participant,
                        ...action.updates
                    }
                } else {
                    return participant;
                }
            });
        default:
            return state;
    }
};

export { participantsReducer as default };