import database from './../firebase/firebase';

export const getParticipants = (participants) => ({
    type: 'GET_PARTICIPANTS',
    participants
});

export const startGetParticipants = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`participants`).once('value').then((snapshot) => {
            const participants = [];
            snapshot.forEach((childSnapshot) => {
                participants.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });

            dispatch(getParticipants(participants));
        });
    };
};

// Create Participant
export const createParticipant = (participant) => ({
    type: 'CREATE_PARTICIPANT',
    participant
});

export const startCreateParticipant = (participantData = {}) => {
    return (dispatch, getState) => {
        const participants = participantData;

        return database.ref(`participants`).push(participants).then((ref) => {
            dispatch(createParticipant({...participants}))
        });
    };
};