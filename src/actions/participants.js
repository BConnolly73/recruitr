import database from '../firebase/firebase';

export const addParticipant = (participant) => ({
    type: 'ADD_PARTICIPANT',
    participant: participant
});

export const startAddParticipant = (participantData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            first_name   = '',
            last_name    = '',
            email        = '',
            year         = 0,
            position     = 0,
            team         = 0,
            about        = ''

        } = participantData;

        const participant = { first_name, last_name, email, year, position, team, about };

        return database.ref(`participants`).push(participant).then((ref) => {
            dispatch(addParticipant({
                id: ref.key,
                ...participant
            }))
        });
    }
}

export const setParticipants = (participants) => {
    return {
        type: 'SET_PARTICIPANTS',
        participants: participants
    }
}

export const startSetParticipants = () => {
    return (dispatch, getState) => {
        return database.ref(`participants`).once('value').then((snapshot) => {
            const participants = [];
            snapshot.forEach((participant) => {
                participants.push({
                    id: participant.key,
                    ...participant.val()
                });
            });

            dispatch(setParticipants(participants));
        })
    }
}