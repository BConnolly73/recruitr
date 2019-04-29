import database from './../firebase/firebase';

export const getDrills = (drills) => ({
    type: 'GET_DRILLS',
    drills
});

export const startGetDrills = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`drills`).once('value').then((snapshot) => {
            const drills = [];
            snapshot.forEach((childSnapshot) => {
                drills.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });

            dispatch(getDrills(drills));
        });
    };
};

// Create Drill
export const createDrill = (drill) => ({
    type: 'CREATE_DRILL',
    drill
});

export const startCreateDrill = (drillData = {}) => {
    return (dispatch, getState) => {
        const drill = drillData;

        return database.ref(`drills`).push(drill).then((ref) => {
            dispatch(createDrill({...drill}))
        });
    };
};